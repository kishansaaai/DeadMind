import os
import json
import urllib.request
from backend.retrieval import retrieve_expert_knowledge
from backend.database import get_db_connection

# Load .env file if present
try:
    from dotenv import load_dotenv
    # Try loading from project root (one level above /backend/)
    _env_path = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), ".env")
    load_dotenv(_env_path)
    print(f"[LLM] Loaded .env from: {_env_path}")
except ImportError:
    pass

# Retrieve Groq key
class APIConfig:
    key = os.environ.get("GROQ_API_KEY", "")
    if key:
        print(f"[LLM] GROQ_API_KEY loaded: {key[:8]}...")
    else:
        print("[LLM] WARNING: GROQ_API_KEY not set — will use mock fallback responses!")

def get_groq_response(prompt: str, system_prompt: str) -> str:
    """
    Sends request to Groq via direct urllib.
    """
    if not APIConfig.key:
        raise ValueError("No Groq API key configured.")
        
    url = "https://api.groq.com/openai/v1/chat/completions"
    headers = {
        "Content-Type": "application/json",
        "Authorization": f"Bearer {APIConfig.key}",
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
    }
    
    data = {
        "model": "llama-3.3-70b-versatile",
        "messages": [
            {"role": "system", "content": system_prompt},
            {"role": "user", "content": prompt}
        ],
        "temperature": 0.5
    }
    
    req = urllib.request.Request(url, data=json.dumps(data).encode('utf-8'), headers=headers, method='POST')
    try:
        with urllib.request.urlopen(req, timeout=10) as response:
            res_data = json.loads(response.read().decode('utf-8'))
            return res_data['choices'][0]['message']['content']
    except Exception as e:
        print("Error calling Groq API:", e)
        raise e



def generate_expert_answer(query: str, engineer_name: str = None) -> dict:
    """
    Retrieves knowledge for the query & engineer, and generates a structured, grounded answer.
    Biases responses with the expert's cognitive fingerprint style.
    """
    # 1. Retrieve matching sources
    sources = retrieve_expert_knowledge(query, engineer_name)
    
    if not sources:
        resolved_engineer = engineer_name
        if not resolved_engineer or resolved_engineer == "Auto-Route":
            resolved_engineer = "R. Nayar"
            
        conn = get_db_connection()
        cursor = conn.cursor()
        cursor.execute("SELECT * FROM engineers WHERE name = ?", (resolved_engineer,))
        eng_row = cursor.fetchone()
        conn.close()
        
        fingerprint = {
            "systematic": eng_row["cognitive_systematic"] if eng_row else 50,
            "intuitive": eng_row["cognitive_intuitive"] if eng_row else 50,
            "mechanical": eng_row["cognitive_mechanical"] if eng_row else 50,
            "electrical": eng_row["cognitive_electrical"] if eng_row else 50,
            "instrumentation": eng_row["cognitive_instrumentation"] if eng_row else 50,
            "process": eng_row["cognitive_process"] if eng_row else 50
        }
        
        answer = build_mocked_grounded_answer(query, resolved_engineer, [], fingerprint)
        return {
            "answer": answer,
            "citations": [
                { "id": 99, "title": "Preserved Expertise Guideline", "author": resolved_engineer, "equipment_tag": "GEN-01", "failure_code": "—" }
            ],
            "confidence": 85,
            "engineer": resolved_engineer,
            "related_context": []
        }
        
    # Resolve engineer name
    resolved_engineer = engineer_name
    if not resolved_engineer or resolved_engineer == "Auto-Route":
        resolved_engineer = sources[0]["author"]
        
    # Load cognitive fingerprint from database
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM engineers WHERE name = ?", (resolved_engineer,))
    eng_row = cursor.fetchone()
    conn.close()
    
    fingerprint = {}
    if eng_row:
        fingerprint = {
            "systematic": eng_row["cognitive_systematic"],
            "intuitive": eng_row["cognitive_intuitive"],
            "mechanical": eng_row["cognitive_mechanical"],
            "electrical": eng_row["cognitive_electrical"],
            "instrumentation": eng_row["cognitive_instrumentation"],
            "process": eng_row["cognitive_process"]
        }
    else:
        fingerprint = {
            "systematic": 50, "intuitive": 50, "mechanical": 50, 
            "electrical": 50, "instrumentation": 50, "process": 50
        }
        
    # Ground the response in the retrieved sources
    source_texts = []
    citations = []
    for idx, s in enumerate(sources):
        source_texts.append(f"[Source {idx+1}] (Title: {s['title']}, Author: {s['author']}, Tag: {s['equipment_tag']}):\n{s['content']}")
        citations.append({
            "id": s["id"],
            "title": s["title"],
            "author": s["author"],
            "equipment_tag": s["equipment_tag"],
            "failure_code": s["failure_code"]
        })
        
    # Format persona style based on fingerprint
    style_desc = f"Your Cognitive Fingerprint: Systematic={fingerprint['systematic']}%, Intuitive={fingerprint['intuitive']}%, Mechanical={fingerprint['mechanical']}%, Electrical={fingerprint['electrical']}%, Instrumentation={fingerprint['instrumentation']}%, Process={fingerprint['process']}%."
    
    system_prompt = (
        f"You are speaking as {resolved_engineer}, a senior plant engineer. "
        f"Style Constraints: {style_desc}. "
        "Apply these priorities: "
        "- If Systematic > 70%: Structure answer as a strict step-by-step diagnostic tree. "
        "- If Intuitive > 70%: Summarize the diagnostic root cause immediately in 1-2 sentences. "
        "- Skew diagnostic focus (Mechanical, Electrical, Instrumentation) according to your higher percentages. "
        "Explain the query by utilizing the provided historic documents as primary grounded facts, but feel free to supplement "
        "using your general plant engineering and operations knowledge to provide a complete response. "
        "If you use details from the documents, cite them using [Source 1], [Source 2], etc. otherwise explain naturally."
    )
    
    prompt = (
        f"Query: {query}\n\n"
        f"Retrieved Documents:\n" + "\n\n".join(source_texts) + "\n\n"
        "Generate your expert response grounding in the documents where applicable, otherwise answering as a general knowledgeable assistant in persona."
    )
    
    # 2. Query Groq or generate cognitive-biased mock fallback
    # Re-read key each request in case env var was set after startup
    live_key = os.environ.get("GROQ_API_KEY", "") or APIConfig.key
    if live_key:
        try:
            old_key = APIConfig.key
            APIConfig.key = live_key
            answer = get_groq_response(prompt, system_prompt)
            confidence = 88
        except Exception as e:
            print(f"[LLM] Groq API error: {type(e).__name__}: {e}")
            answer = build_mocked_grounded_answer(query, resolved_engineer, sources, fingerprint)
            confidence = 85
    else:
        print("[LLM] No API key — using mock fallback")
        answer = build_mocked_grounded_answer(query, resolved_engineer, sources, fingerprint)
        confidence = 85
        
    # Related context: find other engineers who worked on this same equipment
    conn = get_db_connection()
    cursor = conn.cursor()
    related_context = []
    if sources:
        target_tag = sources[0]["equipment_tag"]
        cursor.execute("SELECT DISTINCT engineer_author FROM documents WHERE equipment_tag = ? AND engineer_author != ?", (target_tag, resolved_engineer))
        others = cursor.fetchall()
        related_context = [o["engineer_author"] for o in others]
    conn.close()
    
    return {
        "answer": answer,
        "citations": citations,
        "confidence": confidence,
        "engineer": resolved_engineer,
        "related_context": related_context
    }

def build_mocked_grounded_answer(query: str, engineer: str, sources: list, fp: dict) -> str:
    """
    Generates dynamic mock responses that change structure based on cognitive radar metrics or return specific prompt answers.
    """
    q = query.lower()
    if "zero" in q or "span" in q or "positioner" in q:
        return (
            f"For the B-101 and V-205 positioner zero-span calibration, my usual sequence is:\n\n"
            f"1. **Isolate Valve**: Stroke the valve fully closed at 4 mA and confirm mechanical seat closure.\n"
            f"2. **Full Stroke**: Drive the controller to 20 mA and verify full lift.\n"
            f"3. **Thermal Drift Check**: The cam follower has a known tendency to drift after thermal cycling. Re-check after 48 hours of steady state.\n\n"
            f"If you see hysteresis above 1.5%, the bushing is worn. We replace the bushing, not adjust it."
        )
    elif "cavit" in q or "p-302" in q or "pump" in q:
        return (
            f"P-302 cavitation almost always starts at the suction strainer. Watch for a 5–8% drop in discharge pressure with rising motor amps — that's the signature.\n\n"
            f"The reflux drum level controller is touchy; a tight tuning band masks it. I'd pull the strainer first, inspect the impeller eye for pitting, and verify NPSH margin against the latest curve, not the nameplate."
        )
    elif "startup" in q or "v-205" in q or "checks" in q:
        return (
            f"For the V-205 vessel pre-startup checks:\n\n"
            f"1. Check the pressure baseline sensor offsets first.\n"
            f"2. Ensure the local isolation block valves are verified physically open.\n"
            f"3. Run the standard SOP-114 nitrogen purge sequence.\n\n"
            f"Watch for low-temperature feedback drift which can trip the downstream line interlocks."
        )
    elif "overhaul" in q or "c-104" in q or "compressor" in q:
        return (
            f"The procedure begins with isolation lockouts at both C-104 block valves. I always verify the local pressure indicator reads zero before breaking any flange — never trust the DCS alone.\n\n"
            f"The torque sequence on the casing bolts matters: cross-pattern, 30% / 60% / 100%, and re-check after one heat cycle. The plant's been running these units since '98 and the one trap to avoid is over-tightening the gland; you'll warp the housing and chase a phantom leak for weeks."
        )

    primary_source = sources[0] if sources else {"title": "General System Log", "equipment_tag": "GEN-01"}
    title = primary_source.get("title", "General System Log")
    tag = primary_source.get("equipment_tag", "GEN-01")
    
    # Build dynamic diagnosis sentences based on skew
    bias_focus = "process diagnostics"
    if fp["mechanical"] > fp["electrical"] and fp["mechanical"] > fp["instrumentation"]:
        bias_focus = "physical mechanical tolerances, alignment checks, and hardware inspections"
    elif fp["electrical"] > fp["mechanical"] and fp["electrical"] > fp["instrumentation"]:
        bias_focus = "insulator integrity, power supply continuity, and wire heat profiling"
    elif fp["instrumentation"] > fp["mechanical"] and fp["instrumentation"] > fp["electrical"]:
        bias_focus = "feedback loop calibration, signal levels, and digital transducer zeros"

    if fp["systematic"] > 70:
        # Systematic: Structured Checklist
        answer = (
            f"Based on my historical logs in '{title}' ([Source 1]), I recommend a systematic sequence:\n\n"
            f"1. **Isolate Tag {tag}**: Ensure system is bypassed to prevent transient interlocks.\n"
            f"2. **Verify Feedback**: Prioritize checking the {bias_focus} immediately.\n"
            f"3. **Physical Validation**: Check for drift in the control loop. Do not adjust digital loop gains before completing this validation step."
        )
    else:
        # Intuitive: Quick Summary
        answer = (
            f"In my experience with {tag} in '{title}' ([Source 1]), this is almost certainly caused by feedback drift. "
            f"I always look at {bias_focus} first. I suggest doing a quick zero/span calibration loop reset "
            f"before executing full system teardowns."
        )
    return answer
