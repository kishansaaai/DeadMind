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
        if APIConfig.key:
            resolved_engineer = engineer_name
            if not resolved_engineer or resolved_engineer == "Auto-Route":
                resolved_engineer = "Rajan Sharma" # default to Rajan
            system_prompt = (
                f"You are speaking as {resolved_engineer}, a senior plant engineer. "
                "The technician is asking you a general question or greeting you. "
                "Respond in-character, using your general engineering and operations knowledge to answer their query. "
                "Keep your response friendly, detailed, and completely in persona."
            )
            prompt = f"Query: {query}"
            try:
                answer = get_groq_response(prompt, system_prompt)
                return {
                    "answer": answer,
                    "citations": [],
                    "confidence": 60,
                    "engineer": resolved_engineer,
                    "related_context": []
                }
            except Exception:
                pass

        return {
            "answer": "No record found — escalate. None of the preserved engineer models contain historical records matching this failure pattern or process tag.",
            "citations": [],
            "confidence": 0,
            "engineer": engineer_name or "System",
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
    Generates dynamic mock responses that change structure based on cognitive radar metrics.
    """
    primary_source = sources[0]
    title = primary_source["title"]
    tag = primary_source["equipment_tag"]
    
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
