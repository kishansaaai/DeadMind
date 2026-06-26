import sqlite3
import os

DB_PATH = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), "deadmind.db")

def get_db_connection():
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row
    return conn

def init_db():
    conn = get_db_connection()
    cursor = conn.cursor()
    
    # 1. Engineers
    cursor.execute("""
    CREATE TABLE IF NOT EXISTS engineers (
        name TEXT PRIMARY KEY,
        role TEXT,
        status TEXT, -- 'Active', 'Retired', 'Resigned'
        retirement_date TEXT,
        retirement_year INTEGER,
        avatar TEXT,
        risk_score INTEGER, -- 1-100
        specialties TEXT, -- Comma-separated domains
        
        -- Cognitive Fingerprint (0-100)
        cognitive_systematic INTEGER DEFAULT 50,
        cognitive_intuitive INTEGER DEFAULT 50,
        cognitive_mechanical INTEGER DEFAULT 50,
        cognitive_electrical INTEGER DEFAULT 50,
        cognitive_instrumentation INTEGER DEFAULT 50,
        cognitive_process INTEGER DEFAULT 50
    )
    """)
    
    # 2. Documents (with Half-Life metrics)
    cursor.execute("""
    CREATE TABLE IF NOT EXISTS documents (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT,
        content TEXT,
        engineer_author TEXT,
        upload_date TEXT,
        doc_type TEXT, -- 'Maintenance Log', 'Inspection Report', 'Voice Note', 'P&ID'
        equipment_tag TEXT, -- e.g., 'B-101', 'P-302'
        failure_code TEXT, -- e.g., 'F-402'
        confidence REAL,
        
        -- Document freshness indicators
        age_years INTEGER DEFAULT 0,
        reference_count INTEGER DEFAULT 0,
        contradiction_count INTEGER DEFAULT 0,
        hardware_generation TEXT DEFAULT 'Gen 1',
        
        FOREIGN KEY (engineer_author) REFERENCES engineers(name)
    )
    """)

    # 3. Voice Notes
    cursor.execute("""
    CREATE TABLE IF NOT EXISTS voice_notes (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        engineer TEXT,
        audio_base64 TEXT,
        transcript TEXT,
        timestamp TEXT,
        FOREIGN KEY (engineer) REFERENCES engineers(name)
    )
    """)

    # 4. Equipment Risk Nodes
    cursor.execute("""
    CREATE TABLE IF NOT EXISTS equipment_nodes (
        tag TEXT PRIMARY KEY,
        name TEXT,
        process_area TEXT,
        coordinates_x REAL,
        coordinates_y REAL,
        criticality TEXT, -- 'High', 'Medium', 'Low'
        downtime_cost INTEGER DEFAULT 5000000 -- Cost of failure in Rupees (e.g. 50 Lakhs)
    )
    """)

    # 5. Cross-Expert Conflicts
    cursor.execute("""
    CREATE TABLE IF NOT EXISTS conflicts (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        equipment_tag TEXT,
        title TEXT,
        expert_a TEXT,
        expert_b TEXT,
        rec_a TEXT,
        rec_b TEXT,
        outcome_a TEXT,
        outcome_b TEXT,
        ai_recommendation TEXT,
        confidence INTEGER
    )
    """)

    # 6. Temporal Causal Links
    cursor.execute("""
    CREATE TABLE IF NOT EXISTS causal_links (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        equipment_tag TEXT,
        parent_event TEXT,
        child_event TEXT,
        is_prediction INTEGER DEFAULT 0, -- 0 = historic, 1 = predicted future
        description TEXT
    )
    """)

    # 7. Semantic Linguistic Drift History
    cursor.execute("""
    CREATE TABLE IF NOT EXISTS semantic_drift (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        equipment_tag TEXT,
        year INTEGER,
        phrase TEXT,
        vector_x REAL,
        vector_y REAL,
        severity_index REAL
    )
    """)

    # 8. Counterfactual failure propagation
    cursor.execute("""
    CREATE TABLE IF NOT EXISTS counterfactuals (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        equipment_tag TEXT,
        title TEXT,
        intervention TEXT,
        cost_avoided_crore REAL,
        consequences TEXT -- Semicolon-separated statements
    )
    """)

    # 9. Cross-Document Coreferences
    cursor.execute("""
    CREATE TABLE IF NOT EXISTS coreference_map (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        standard_name TEXT,
        alias_name TEXT,
        entity_type TEXT, -- 'Equipment', 'Person', 'Phenomenon'
        confidence INTEGER
    )
    """)

    # 10. Organisational Network Metrics
    cursor.execute("""
    CREATE TABLE IF NOT EXISTS org_network (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        engineer TEXT,
        centrality REAL,
        dependencies TEXT, -- Comma-separated names
        domains_affected INTEGER,
        resilience_drop REAL
    )
    """)

    # 11. Procedural compliance shadow auditing
    cursor.execute("""
    CREATE TABLE IF NOT EXISTS sop_compliance (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        sop_id TEXT,
        step_number INTEGER,
        step_desc TEXT,
        compliance_rate INTEGER, -- Percentage 0-100
        workaround_detected TEXT
    )
    """)

    conn.commit()
    conn.close()

if __name__ == "__main__":
    init_db()
    print("Database initialized successfully at:", DB_PATH)
