import os
import base64
from fastapi import FastAPI, UploadFile, File, Form, HTTPException, Request
from fastapi.staticfiles import StaticFiles
from fastapi.responses import HTMLResponse
from pydantic import BaseModel
from typing import Optional, List
import time
from collections import defaultdict

REDIS_URL = os.environ.get("REDIS_URL")
AI_LIMIT = 10
AI_WINDOW = 60

if REDIS_URL:
    import redis
    r = redis.from_url(REDIS_URL)

    def check_rate_limit(request: Request):
        client_ip = request.client.host if request.client else "unknown"
        key = f"ratelimit:{client_ip}"
        now = time.time()
        pipe = r.pipeline()
        pipe.zremrangebyscore(key, 0, now - AI_WINDOW)
        pipe.zadd(key, {str(now): now})
        pipe.zcard(key)
        pipe.expire(key, AI_WINDOW)
        _, _, count, _ = pipe.execute()
        if count > AI_LIMIT:
            raise HTTPException(429, "Too Many Requests")
else:
    # Simple In-Memory Rate Limiter (10 requests per minute for AI endpoints)
    RATE_LIMIT_STRIKES = defaultdict(list)
    def check_rate_limit(request: Request):
        client_ip = request.client.host if request.client else "unknown"
        now = time.time()
        RATE_LIMIT_STRIKES[client_ip] = [t for t in RATE_LIMIT_STRIKES[client_ip] if now - t < AI_WINDOW]
        if len(RATE_LIMIT_STRIKES[client_ip]) >= AI_LIMIT:
            raise HTTPException(
                status_code=429,
                detail="Too Many Requests. AI endpoints are rate-limited to 10 requests per minute."
            )
        RATE_LIMIT_STRIKES[client_ip].append(now)
from typing import Optional, List

from backend.database import init_db, get_db_connection
from backend.ingestion import ingest_document
from backend.llm import generate_expert_answer

# Initialize database
init_db()

app = FastAPI(title="DeadMind API", version="1.0")

from fastapi.responses import JSONResponse
from fastapi import Request as FastAPIRequest

@app.exception_handler(Exception)
async def global_exception_handler(request: FastAPIRequest, exc: Exception):
    print(f"[ERROR] Unhandled exception on {request.url.path}: {type(exc).__name__}: {exc}")
    return JSONResponse(
        status_code=500,
        content={
            "error": "Something went wrong processing that request.",
            "detail": str(exc) if os.environ.get("DEBUG") == "1" else "Internal error — check server logs.",
            "path": str(request.url.path)
        }
    )

from fastapi.middleware.cors import CORSMiddleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.on_event("startup")
def startup_event():
    from backend.hybrid_retrieval import build_bm25_index
    build_bm25_index()

# Setup pathing
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

FRONTEND_DIR = os.path.join(BASE_DIR, "frontend")

# API Models
class ChatQuery(BaseModel):
    query: str
    engineer: Optional[str] = "Auto-Route"

class Citation(BaseModel):
    id: int
    title: str
    author: str
    equipment_tag: str
    failure_code: str

class ExpertAnswerResponse(BaseModel):
    answer: str
    citations: list[Citation]
    confidence: int
    engineer: str
    related_context: list[str]
    uncertainty: Optional[dict] = None


class VoiceNotePayload(BaseModel):
    engineer: str
    audio_base64: str
    transcript: str

class ShiftNotePayload(BaseModel):
    note: str

class FeedbackPayload(BaseModel):
    doc_id: int
    query: str
    is_positive: bool

# Endpoints
@app.get("/", response_class=HTMLResponse)
async def read_index():
    index_path = os.path.join(FRONTEND_DIR, "index.html")
    if not os.path.exists(index_path):
        raise HTTPException(status_code=404, detail="Frontend index.html not found.")
    with open(index_path, "r", encoding="utf-8") as f:
        return f.read()

@app.get("/api/engineers")
def get_engineers():
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM engineers")
    rows = cursor.fetchall()
    conn.close()
    return [dict(row) for row in rows]

@app.get("/api/vulnerability-map")
def get_vulnerability_map():
    conn = get_db_connection()
    cursor = conn.cursor()
    
    cursor.execute("SELECT * FROM equipment_nodes")
    nodes_rows = cursor.fetchall()
    nodes = [dict(row) for row in nodes_rows]
    
    vulnerability_data = []
    for node in nodes:
        tag = node["tag"]
        cursor.execute("SELECT DISTINCT engineer_author FROM documents WHERE equipment_tag = ?", (tag,))
        authors_rows = cursor.fetchall()
        authors = [r["engineer_author"] for r in authors_rows]
        
        active_authors = []
        retired_authors = []
        for author in authors:
            cursor.execute("SELECT status, retirement_year FROM engineers WHERE name = ?", (author,))
            status_row = cursor.fetchone()
            if status_row:
                status = status_row["status"]
                ret_year = status_row["retirement_year"]
                if status == "Active":
                    active_authors.append({"name": author, "retirement_year": ret_year})
                else:
                    retired_authors.append({"name": author, "retirement_year": ret_year})
            else:
                retired_authors.append({"name": author, "retirement_year": 2026})
                
        active_count = len(active_authors)
        
        if active_count >= 3:
            status_color = "green"
            risk_level = "Low"
        elif active_count >= 1:
            status_color = "yellow"
            risk_level = "Medium"
        else:
            status_color = "red"
            risk_level = "High"
            
        vulnerability_data.append({
            "tag": tag,
            "name": node["name"],
            "process_area": node["process_area"],
            "x": node["coordinates_x"],
            "y": node["coordinates_y"],
            "criticality": node["criticality"],
            "downtime_cost": node["downtime_cost"],
            "active_engineers": active_authors,
            "retired_engineers": retired_authors,
            "risk_level": risk_level,
            "color": status_color
        })
        
    conn.close()
    return vulnerability_data

@app.get("/api/conflicts")
def get_conflicts():
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM conflicts")
    rows = cursor.fetchall()
    conn.close()
    return [dict(row) for row in rows]

# Endpoint 1: Temporal Causal Chains
@app.get("/api/causal-chains/{equipment_tag}")
def get_causal_chains(equipment_tag: str):
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM causal_links WHERE equipment_tag = ?", (equipment_tag,))
    rows = cursor.fetchall()
    conn.close()
    return [dict(row) for row in rows]

# Endpoint 2: Semantic Linguistic Drift
@app.get("/api/semantic-drift/{equipment_tag}")
def get_semantic_drift(equipment_tag: str):
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM semantic_drift WHERE equipment_tag = ? ORDER BY year ASC", (equipment_tag,))
    rows = cursor.fetchall()
    conn.close()
    return [dict(row) for row in rows]

# Endpoint 3: Knowledge Half-Life fresh levels
@app.get("/api/half-life")
def get_half_life():
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute("SELECT id, title, engineer_author, age_years, reference_count, contradiction_count, hardware_generation FROM documents")
    rows = cursor.fetchall()
    conn.close()
    
    docs = []
    for r in rows:
        d = dict(r)
        age_penalty = d["age_years"] * 4
        contra_penalty = d["contradiction_count"] * 20
        ref_bonus = d["reference_count"] * 3
        freshness = 100 - (age_penalty + contra_penalty - ref_bonus)
        freshness = max(0, min(100, freshness))
        
        d["freshness_score"] = freshness / 100.0
        d["status"] = "FRESH" if freshness > 70 else ("STALE WARNING" if freshness > 40 else "CRITICAL DANGER")
        docs.append(d)
    return docs

from backend.consensus import synthesize_consensus

# Endpoint 4: Multi-Expert Consensus Synthesis
@app.post("/api/consensus")
def post_consensus(payload: ChatQuery, request: Request):
    check_rate_limit(request)
    experts = ["Rajan Sharma", "Amit Patel", "Vikram Sen"]
    return synthesize_consensus(payload.query, experts)

# Endpoint 5: Anomaly-Triggered Knowledge Surfacing
@app.post("/api/analyze-shift-note")
def post_analyze_shift_note(payload: ShiftNotePayload):
    from backend.shift_analyzer import analyze_shift_note
    return analyze_shift_note(payload.note)

# Research Endpoint 1: Counterfactual Failure Simulation
@app.get("/api/counterfactuals/{equipment_tag}")
def get_counterfactuals(equipment_tag: str):
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM counterfactuals WHERE equipment_tag = ?", (equipment_tag,))
    rows = cursor.fetchall()
    conn.close()
    return [dict(row) for row in rows]

# Research Endpoint 2: Cross-Document Coreferences
@app.get("/api/coreference")
def get_coreference():
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM coreference_map")
    rows = cursor.fetchall()
    conn.close()
    res = []
    for row in rows:
        d = dict(row)
        if d.get("confidence") is not None:
            d["confidence"] = d["confidence"] / 100.0
        res.append(d)
    return res

# Research Endpoint 3: Organisational Knowledge Network
@app.get("/api/network")
def get_network():
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM org_network")
    rows = cursor.fetchall()
    conn.close()
    return [dict(row) for row in rows]

# Research Endpoint 4: Procedural Compliance shadow auditing
@app.get("/api/sop-audit")
def get_sop_audit():
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM sop_compliance")
    rows = cursor.fetchall()
    conn.close()
    return [dict(row) for row in rows]

@app.post("/api/upload")
async def upload_document(
    title: str = Form(...),
    content: str = Form(...),
    doc_type: str = Form("Maintenance Log"),
    engineer: Optional[str] = Form(None)
):
    try:
        res = ingest_document(title, content, doc_type, engineer)
        return {"status": "success", "data": res}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/api/feedback")
def submit_feedback(payload: FeedbackPayload):
    try:
        conn = get_db_connection()
        cursor = conn.cursor()
        import datetime
        timestamp = datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S")
        cursor.execute("""
        INSERT INTO feedback (doc_id, query, is_positive, timestamp)
        VALUES (?, ?, ?, ?)
        """, (payload.doc_id, payload.query, 1 if payload.is_positive else 0, timestamp))
        conn.commit()
        conn.close()
        return {"status": "success"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/api/chat", response_model=ExpertAnswerResponse)
def chat_expert(payload: ChatQuery, request: Request):
    check_rate_limit(request)
    try:
        # Perform entity normalization mapping standard names first!
        query = payload.query
        conn = get_db_connection()
        cursor = conn.cursor()
        cursor.execute("SELECT standard_name, alias_name FROM coreference_map")
        coref_rows = cursor.fetchall()
        conn.close()
        
        # Replace aliases with standard names to perform clean retrieval
        for row in coref_rows:
            alias = row["alias_name"].lower()
            if alias in query.lower():
                query = query.lower().replace(alias, row["standard_name"])
                
        answer = generate_expert_answer(query, payload.engineer)
        from backend.hybrid_retrieval import reciprocal_rank_fusion
        from backend.uncertainty import compute_uncertainty
        sources_for_uncertainty = reciprocal_rank_fusion(query)
        answer["uncertainty"] = compute_uncertainty(query, sources_for_uncertainty, payload.engineer)
        
        return answer
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

from fastapi.responses import StreamingResponse
import json as json_lib

@app.post("/api/chat/stream")
async def chat_expert_stream(payload: ChatQuery, request: Request):
    check_rate_limit(request)

    async def event_generator():
        # Reuse existing retrieval + fingerprint logic, but stream Groq's response token-by-token
        from backend.llm import get_groq_response_stream
        from backend.hybrid_retrieval import reciprocal_rank_fusion
        sources = reciprocal_rank_fusion(payload.query)
        citations = [{"id": s["id"], "title": s["title"], "author": s.get("author", "")} for s in sources]
        yield f"data: {json_lib.dumps({'type': 'citations', 'data': citations})}\n\n"
        async for token in get_groq_response_stream(payload.query, sources):
            yield f"data: {json_lib.dumps({'type': 'token', 'data': token})}\n\n"
        yield f"data: {json_lib.dumps({'type': 'done'})}\n\n"

    return StreamingResponse(event_generator(), media_type="text/event-stream")

@app.post("/api/voice-note")
def save_voice_note(payload: VoiceNotePayload):
    try:
        try:
            from backend.transcription import transcribe_audio
            transcript = transcribe_audio(payload.audio_base64)
            if not transcript.strip():
                transcript = payload.transcript  # fallback to client-provided text
        except Exception as e:
            print(f"[STT] Whisper failed, falling back to client transcript: {e}")
            transcript = payload.transcript

        conn = get_db_connection()
        cursor = conn.cursor()
        import datetime
        timestamp = datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S")
        cursor.execute("""
        INSERT INTO voice_notes (engineer, audio_base64, transcript, timestamp)
        VALUES (?, ?, ?, ?)
        """, (payload.engineer, payload.audio_base64, transcript, timestamp))
        conn.commit()
        conn.close()
        
        ingest_document(
            title=f"Voice Note Capture - {payload.engineer}",
            content=transcript,
            doc_type="Voice Note",
            forced_author=payload.engineer
        )
        
        return {"status": "success", "message": "Voice note transcribed and indexed.", "transcript": transcript}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/api/health")
def get_health():
    try:
        conn = get_db_connection()
        cursor = conn.cursor()
        cursor.execute("SELECT 1")
        cursor.fetchone()
        conn.close()
        return {"status": "healthy", "database": "connected", "engine": "FastAPI"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Unhealthy: {str(e)}")

# Mount static files
app.mount("/static", StaticFiles(directory=FRONTEND_DIR), name="static")

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
