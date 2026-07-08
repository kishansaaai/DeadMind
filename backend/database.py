import sqlite3
import os
from backend.db_engine import USE_POSTGRES, ensure_pgvector_schema

DB_PATH = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), "deadmind.db")

def get_db_connection():
    if USE_POSTGRES:
        raise NotImplementedError("Postgres wiring is scaffolded in db_engine.py but requires query rewrites from SQLite to use SQLAlchemy.")
        
    conn = sqlite3.connect(DB_PATH, timeout=30.0)
    conn.execute("PRAGMA journal_mode=WAL;")
    conn.row_factory = sqlite3.Row
    return conn

def init_db():
    if USE_POSTGRES:
        ensure_pgvector_schema()
        return
        
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

    # 12. Document Feedback
    cursor.execute("""
    CREATE TABLE IF NOT EXISTS feedback (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        doc_id INTEGER,
        query TEXT,
        is_positive INTEGER,
        timestamp TEXT,
        FOREIGN KEY (doc_id) REFERENCES documents(id)
    )
    """)

    # 13. Regulatory Requirements Registry
    cursor.execute("""
    CREATE TABLE IF NOT EXISTS regulatory_requirements (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        source TEXT,           -- 'OISD-STD-118', 'Factory Act 1948 Sec 87', 'PESO Rule 34', 'CPCB Norm', ...
        clause_id TEXT,        -- e.g. 'OISD-118-7.3.2'
        clause_text TEXT,      -- normative requirement text, plain English paraphrase
        applies_to_equipment TEXT,   -- comma-separated equipment tags or 'ALL'
        applies_to_doc_type TEXT,    -- 'SOP', 'Inspection Report', 'Maintenance Log', 'ALL'
        criticality TEXT,       -- 'Statutory', 'Advisory'
        review_frequency_months INTEGER
    )
    """)

    # 14. Compliance Gaps (computed + cached results of the mapper)
    cursor.execute("""
    CREATE TABLE IF NOT EXISTS compliance_gaps (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        requirement_id INTEGER,
        equipment_tag TEXT,
        gap_type TEXT,          -- 'Missing Evidence', 'Stale Evidence', 'Contradicted', 'Compliant'
        evidence_doc_id INTEGER,
        confidence REAL,
        detected_on TEXT,
        severity TEXT,          -- 'Critical', 'Major', 'Minor'
        recommended_action TEXT,
        FOREIGN KEY (requirement_id) REFERENCES regulatory_requirements(id),
        FOREIGN KEY (evidence_doc_id) REFERENCES documents(id)
    )
    """)

    # 15. Incidents / Near-Misses (feeds the pattern engine)
    cursor.execute("""
    CREATE TABLE IF NOT EXISTS incidents (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        equipment_tag TEXT,
        incident_type TEXT,     -- 'Incident', 'Near-Miss', 'Audit Finding', 'Non-Conformance'
        description TEXT,
        reported_by TEXT,
        reported_on TEXT,
        severity TEXT           -- 'High', 'Medium', 'Low'
    )
    """)

    # 16. Detected Failure Patterns (output of clustering incidents/near-misses)
    cursor.execute("""
    CREATE TABLE IF NOT EXISTS failure_patterns (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        pattern_summary TEXT,
        equipment_tags TEXT,     -- comma-separated, all equipment showing the pattern
        member_incident_ids TEXT,-- comma-separated incident ids in this cluster
        confidence REAL,
        first_seen TEXT,
        last_seen TEXT,
        recommended_warning TEXT,
        status TEXT DEFAULT 'Active'  -- 'Active', 'Acknowledged', 'Resolved'
    )
    """)

    conn.commit()
    
    # Auto-seed if engineers table is empty
    cursor.execute("SELECT COUNT(*) FROM engineers")
    count = cursor.fetchone()[0]
    if count == 0:
        auto_seed_db(conn)
        
    conn.close()

def auto_seed_db(conn):
    cursor = conn.cursor()
    print("[DeadMind] Database is empty. Seeding demo data...")
    
    # 1. Engineers
    engineers = [
        ("Rajan Sharma", "Senior Boiler & Turbine Lead", "Retired", "2026-03-15", 2026, "RS", 92, 
         "Boiler Operations, Steam Turbines, High Pressure Systems", 85, 20, 90, 30, 45, 80),
        ("Amit Patel", "Electrical Maintenance Lead", "Active", "2031-08-10", 2031, "AP", 45, 
         "Switchgears, Transformers, Power Distribution", 40, 85, 25, 92, 50, 40),
        ("Vikram Sen", "Instrumentation & Control Expert", "Active", "2033-05-12", 2033, "VS", 30, 
         "Control Valves, Loop Calibration, PLC Systems", 75, 55, 35, 45, 95, 70),
        ("T. Nair", "Rotating Equipment Specialist", "Active", "2028-04-01", 2028, "TN", 81, 
         "Pumps, Seals, Bearings, Vibration Trend Analysis", 78, 82, 95, 32, 50, 60),
        ("M. Pillai", "Process Veteran", "Active", "2026-09-15", 2026, "MP", 96, 
         "Distillation, Heat Exchange, Startup Procedures", 70, 95, 55, 35, 60, 99),
        ("R. Nayar", "Senior Instrument Systems Engineer", "Active", "2027-06-30", 2027, "RN", 88, 
         "Positioner Calibration, Signal Drift, Field Devices", 92, 45, 70, 40, 98, 75),
        ("S. Kulkarni", "High Pressure Safety Auditor", "Active", "2030-10-15", 2030, "SK", 55, 
         "Safety Valves, Relief Systems, Hazard Analysis", 90, 60, 60, 50, 80, 85),
        ("H. Mehta", "Auxiliary Systems Technician", "Active", "2029-12-31", 2029, "HM", 72, 
         "Compressors, Heat Exchangers, Auxiliary Steam", 65, 70, 85, 60, 55, 60),
        ("A. Joshi", "Automation & PLC Engineer", "Active", "2035-05-20", 2035, "AJ", 25, 
         "SCADA systems, Logic Controller, Network architecture", 95, 80, 40, 85, 90, 80)
    ]
    cursor.executemany("""
    INSERT INTO engineers (
        name, role, status, retirement_date, retirement_year, avatar, risk_score, specialties,
        cognitive_systematic, cognitive_intuitive, cognitive_mechanical, cognitive_electrical,
        cognitive_instrumentation, cognitive_process
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    """, engineers)

    # 2. Nodes
    nodes = [
        ("TURBINE-04", "Auxiliary Steam Turbine", "Utility Section", 200.0, 120.0, "High", 15000000),
        ("BOILER-2", "High-Pressure Boiler 2", "Utility Section", 500.0, 110.0, "High", 18000000),
        ("P-302", "Boiler Feedwater Pump A", "Feedwater Station", 320.0, 420.0, "High", 8000000),
        ("B-101", "Primary Steam Boiler", "Utility Section", 460.0, 140.0, "High", 12000000),
        ("V-205", "Low-Ambient Control Valve", "Feedwater Station", 650.0, 250.0, "Medium", 5000000),
        ("C-104", "Main Air Compressor", "Instrument Air Section", 180.0, 200.0, "High", 10000000),
        ("S-501", "Main Electrical Switchgear", "Power House", 750.0, 380.0, "High", 12000000),
        ("E-310", "Feed/Effluent HX", "Reaction Section", 560.0, 360.0, "Medium", 1800000),
        ("T-401", "Main Fractionator Column", "Distillation", 820.0, 460.0, "High", 20000000),
        ("D-220", "Reactor Knockout Drum", "Reaction Section", 660.0, 80.0, "Medium", 7800000),
        ("P-304", "Emergency Backup Pump", "Feedwater Station", 380.0, 480.0, "Medium", 6000000),
        ("H-102", "Primary Flue Gas Heater", "Utility Section", 580.0, 180.0, "Low", 4000000),
        ("V-206", "High-Pressure Safety Vessel", "Reaction Section", 700.0, 150.0, "High", 14000000),
        ("TURBINE-02", "Main Generator Turbine", "Power House", 850.0, 280.0, "High", 25000000)
    ]
    cursor.executemany("""
    INSERT INTO equipment_nodes (tag, name, process_area, coordinates_x, coordinates_y, criticality, downtime_cost)
    VALUES (?, ?, ?, ?, ?, ?, ?)
    """, nodes)

    # 3. Conflicts
    conflicts = [
        ("P-302", "Feedwater Pump P-302 Cavitation Correction", "Rajan Sharma", "Vikram Sen", 
         "Reduce pump suction throttling immediately by 15% and increase flow rate.",
         "Recalibrate the suction pressure gauge and check for air leaks in the seal housing.",
         "Resolved cavitation warning in 4 hours.",
         "Required 12 hours of testing; did not fully resolve sensor drift.",
         "Follow Rajan Sharma's suction throttling sequence first. It addresses the primary hydrodynamic pressure threshold directly, yielding 3x faster stabilization. Calibrate Vikram's sensor seals as a secondary preventive measure.",
         90),
        ("C-104", "Compressor C-104 Valve Chattering", "Amit Patel", "Rajan Sharma",
         "Bypass the electronic solenoid interlock and reset the PLC control cycle.",
         "Perform physical cleaning of the discharge check valve seat and replace mechanical springs.",
         "Bypassed solenoid in 2 hours but chattering recurred 3 days later.",
         "Completed mechanical rebuild in 8 hours. Resolved issue permanently.",
         "Follow Rajan Sharma's mechanical spring replacement guide. Amit's solenoid bypass is a temporary workaround that leads to premature mechanical wear and system recurrence.",
         87)
    ]
    cursor.executemany("""
    INSERT INTO conflicts (
        equipment_tag, title, expert_a, expert_b, rec_a, rec_b, outcome_a, outcome_b, ai_recommendation, confidence
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    """, conflicts)

    # 4. Causal Links
    causal_links = [
        ("B-101", "B-101 Boiler Bearing Wear (Rajan, 2016)", "P-302 Feedwater Cavitation (Vikram, 2018)", 0, 
         "Boiler discharge pressure fluctuations induced severe transient cavitation on the feedwater pump impeller."),
        ("B-101", "P-302 Feedwater Cavitation (Vikram, 2018)", "V-205 Control Valve Positioner Drift (Vikram, 2021)", 0,
         "Micro-vibrations from pump cavitation loosened positioner linkages on V-205 control valve over 3 years."),
        ("B-101", "V-205 Control Valve Positioner Drift (Vikram, 2021)", "C-104 Compressor Interlock Shutdown (PREDICTED, late 2026)", 1,
         "Drift in V-205 feedback loops under freezing ambient temperature causes secondary air line pressure drops, causing C-104 startup trips.")
    ]
    cursor.executemany("""
    INSERT INTO causal_links (equipment_tag, parent_event, child_event, is_prediction, description)
    VALUES (?, ?, ?, ?, ?)
    """, causal_links)

    # 5. Semantic Drift
    semantic_drift = [
        ("C-104", 2016, "Minor vibration noted on startup", 12.0, 15.0, 0.1),
        ("C-104", 2018, "Vibration within acceptable range", 20.0, 22.0, 0.2),
        ("C-104", 2020, "Vibration elevated, monitoring recommended", 42.0, 35.0, 0.5),
        ("C-104", 2022, "Persistent vibration, cause unclear", 65.0, 58.0, 0.7),
        ("C-104", 2024, "CRITICAL: vibration exceeding thresholds", 88.0, 80.0, 0.9),
        
        ("B-101", 2016, "Normal pressure levels observed", 10.0, 10.0, 0.0),
        ("B-101", 2019, "Boiler flue gas temp slightly high", 25.0, 18.0, 0.2),
        ("B-101", 2022, "Transient pressure spikes during night shifts", 48.0, 38.0, 0.4),
        ("B-101", 2025, "Accumulating carbon scaling in secondary superheater tubes", 78.0, 72.0, 0.7)
    ]
    cursor.executemany("""
    INSERT INTO semantic_drift (equipment_tag, year, phrase, vector_x, vector_y, severity_index)
    VALUES (?, ?, ?, ?, ?, ?)
    """, semantic_drift)

    # 6. Counterfactuals
    counterfactuals = [
        ("P-302", "Rajan's 2018 valve calibration on P-302", "Calibrated zero span feedback arm instead of standard loop reset", 2.3, 
         "P-302 cavitation would have progressed to complete rotor impeller seizure;Starved B-101 feedwater loop, triggering dry boiler thermal stress interlock;Forced 340 hours of high-pressure pipeline rebuilds (₹2.3 Cr downtime avoided)"),
        ("S-501", "Amit's 2024 switchgear grease on S-501", "Cleaned oxide layer and applied conductive thermal grease before monsoon", 1.1,
         "Busbar connection overheating would have escalated to switchgear substation fire;Shutdown of plant Utility section due to main switchgear offline;Forced backup diesel generator usage costing 15 Lakhs/day")
    ]
    cursor.executemany("""
    INSERT INTO counterfactuals (equipment_tag, title, intervention, cost_avoided_crore, consequences)
    VALUES (?, ?, ?, ?, ?)
    """, counterfactuals)

    # 7. Coreferences
    coreferences = [
        ("B-101 Primary Steam Boiler", "B-101", "Equipment", 98),
        ("B-101 Primary Steam Boiler", "Boiler 101", "Equipment", 95),
        ("B-101 Primary Steam Boiler", "the main boiler", "Equipment", 88),
        ("Rajan Sharma", "R. Sharma", "Person", 95),
        ("Rajan Sharma", "Rajan S.", "Person", 99),
        ("Feedwater Cavitation", "pump surge", "Phenomenon", 82),
        ("Feedwater Cavitation", "flow instability", "Phenomenon", 85),
        ("R. Nayar", "Nayar", "Person", 99),
        ("R. Nayar", "R. Nayar", "Person", 100),
        ("Senior Instrument Engineer", "R. Nayar", "Person", 90),
        ("BOILER-2", "Boiler 2", "Equipment", 97),
        ("TURBINE-04", "Aux Turbine", "Equipment", 94)
    ]
    cursor.executemany("""
    INSERT INTO coreference_map (standard_name, alias_name, entity_type, confidence)
    VALUES (?, ?, ?, ?)
    """, coreferences)

    # 8. Org Network
    network = [
        ("Vikram Sen", 0.89, "Rajan Sharma, Amit Patel", 3, 0.33),
        ("Rajan Sharma", 0.72, "Vikram Sen", 2, 0.24),
        ("Amit Patel", 0.45, "Vikram Sen", 1, 0.12),
        ("T. Nair", 0.65, "Rajan Sharma", 2, 0.20),
        ("M. Pillai", 0.82, "R. Nayar, Rajan Sharma", 4, 0.38),
        ("R. Nayar", 0.78, "Vikram Sen", 3, 0.30)
    ]
    cursor.executemany("""
    INSERT INTO org_network (engineer, centrality, dependencies, domains_affected, resilience_drop)
    VALUES (?, ?, ?, ?, ?)
    """, network)

    # 9. SOP Compliance
    compliance = [
        ("SOP-2019-047 (Boiler Startup)", 1, "Verify feedwater pump suction valves are open", 100, "None"),
        ("SOP-2019-047 (Boiler Startup)", 2, "Check mechanical positioner feedback arm alignment", 82, "Often verified visually rather than dial gauge calibration"),
        ("SOP-2019-047 (Boiler Startup)", 3, "Calibrate zero pressure baseline offsets", 34, "Skipped on warm startup to save 45 minutes; leads to sensor drift risk"),
        ("SOP-2019-047 (Boiler Startup)", 4, "Run two-engineer sign-off interlock check", 17, "Engineers consistently skip and perform Step 4 before Step 3. Rajan's custom sequence has 100% success rate.")
    ]
    cursor.executemany("""
    INSERT INTO sop_compliance (sop_id, step_number, step_desc, compliance_rate, workaround_detected)
    VALUES (?, ?, ?, ?, ?)
    """, compliance)

    # 13. Regulatory Requirements (representative subset — extend with real OISD/PESO text for production)
    regulatory_requirements = [
        ("OISD-STD-118", "OISD-118-7.3.2",
         "Pressure relief valves on high-pressure boilers shall be tested and re-certified at least once every 12 months.",
         "B-101,BOILER-2", "Inspection Report", "Statutory", 12),
        ("Factory Act 1948", "FACT-87-1",
         "Every hazardous process shall have a documented safe operating procedure reviewed at least every 24 months.",
         "ALL", "SOP", "Statutory", 24),
        ("PESO Rule 34", "PESO-34-2",
         "Static and rotating equipment handling flammable process fluids shall undergo vibration/leak inspection every 6 months.",
         "P-302,P-304,C-104,TURBINE-02,TURBINE-04", "Inspection Report", "Statutory", 6),
        ("CPCB Environmental Norm", "CPCB-ENV-9",
         "Flue gas emission monitoring reports for utility boilers shall be filed at least quarterly.",
         "B-101,BOILER-2", "Inspection Report", "Statutory", 3),
        ("OISD-STD-105", "OISD-105-4.1",
         "Electrical switchgear rooms shall have thermographic inspection records updated at least every 6 months.",
         "S-501", "Inspection Report", "Statutory", 6),
    ]
    cursor.executemany("""
    INSERT INTO regulatory_requirements (
        source, clause_id, clause_text, applies_to_equipment, applies_to_doc_type,
        criticality, review_frequency_months
    ) VALUES (?, ?, ?, ?, ?, ?, ?)
    """, regulatory_requirements)
    
    # 14. Incidents & Near-Misses
    incidents = [
        ("P-302", "Near-Miss", "Operator noticed unusual noise before cavitation alarm triggered; caught early.", "Shift Team B", "2023-02-10", "Medium"),
        ("P-304", "Near-Miss", "Backup pump showed early suction pressure drop similar to P-302's historic pattern.", "Shift Team A", "2024-05-02", "Medium"),
        ("C-104", "Incident", "Compressor valve chattering recurred 3 days after an electrical-only fix, consistent with earlier mechanical root cause.", "Amit Patel", "2019-04-25", "High"),
        ("S-501", "Audit Finding", "Thermography inspection interval exceeded 6 months before switchgear overheating was caught.", "Internal Audit", "2024-02-15", "High"),
        ("V-205", "Non-Conformance", "Positioner cold-weather drift reappeared at a different valve after being 'resolved' at V-205 in 2021.", "Vikram Sen", "2023-12-01", "Medium"),
    ]
    cursor.executemany("""
    INSERT INTO incidents (equipment_tag, incident_type, description, reported_by, reported_on, severity)
    VALUES (?, ?, ?, ?, ?, ?)
    """, incidents)

    # 10. Documents
    import datetime
    now = datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    documents = [
        ("Boiler Pressure Fluctuation Investigation - B-101", "EQUIPMENT: B-101 Primary Steam Boiler\nDATE: Aug 2016\nAUTHOR: Rajan Sharma (Senior Boiler & Turbine Lead)\n\nOBSERVATION:\nBoiler pressure fluctuating approximately 0.3 bar at 3am, with feedwater flow remaining stable.\n\nDIAGNOSIS & ACTIONS:\nI checked the feedwater control valve positioner calibration first, not the system setpoints.\nDiscovered feedwater control valve positioner drift at low ambient temperatures during the night shift.\nCalibrated the positioner feedback arm and lubricated the mechanical linkages. Pressure stabilized post-calibration.\n\nRECOMMENDATION:\nAlways perform verification of mechanical positioner alignment before adjusting digital controller loop gains.", "Rajan Sharma", now, "Maintenance Log", "B-101", "None", 0.95, 10, 6, 2, "Gen 1"),
        ("Turbine Blade Vibration Incident Report - B-101", "EQUIPMENT: B-101 Primary Steam Boiler / Steam Turbine Loop\nDATE: Jan 2018\nAUTHOR: Rajan Sharma (Senior Boiler & Turbine Lead)\n\nOBSERVATION:\nDuring startup, minor pressure fluctuations of 0.3 bar were noted, followed by high vibration alerts on the auxiliary steam line.\n\nDIAGNOSIS & RESOLUTION:\nFeedwater flow was reported as stable by shift operators, but valve positioner drift was observed.\nRe-calibrated the valve feedback system which corrected the boiler pressure fluctuations.", "Rajan Sharma", now, "Inspection Report", "B-101", "None", 0.95, 8, 3, 0, "Gen 1"),
        ("Switchgear Busbar Overheating - S-501", "EQUIPMENT: S-501 Main Electrical Switchgear\nDATE: Mar 2024\nAUTHOR: Amit Patel (Electrical Maintenance Lead)\n\nOBSERVATION:\nThermography scan showed a temperature rise of 24 degrees Celsius on Phase-B busbar connection.\n\nDIAGNOSIS & ACTION:\nIsolated the switchgear panel. Cleaned oxide layers off the contact surfaces and applied conductive contact grease.\nTorqued all connection bolts to OEM specs (85 Nm). Temperature returned to normal.", "Amit Patel", now, "Inspection Report", "S-501", "None", 0.95, 2, 1, 0, "Gen 2"),
        ("Feedwater Valve Positioner Calibration - V-205", "EQUIPMENT: V-205 Low-Ambient Control Valve\nDATE: Apr 2025\nAUTHOR: Vikram Sen (Instrumentation & Control Expert)\n\nOBSERVATION:\nPositioner feedback signal mismatched from controller output by 4.2%.\n\nDIAGNOSIS:\nAdjusted the zero and span pots on the positioner. Feedwater loop response improved.\nCross-checked with Rajan's old notes from 2018, which also flagged cold-weather drift issues.", "Vikram Sen", now, "Maintenance Log", "V-205", "None", 0.95, 1, 0, 0, "Gen 2"),
        ("Shift Log 2019-04-22 — C-104 Trip", "EQUIPMENT: C-104 Recycle Compressor\nDATE: 2019-04-22\nAUTHOR: Amit Patel (Electrical Maintenance Lead)\n\nOBSERVATION:\nCompressor C-104 tripped due to elevated transient vibration thresholds.\n\nDIAGNOSIS & ACTIONS:\nVerified electrical feed. Amit Patel checked mechanical casing torque and noted loose anchor bolts. Cross-pattern tightening performed.", "Amit Patel", now, "Maintenance Log", "C-104", "None", 0.95, 7, 5, 0, "Gen 2"),
        ("Overhaul Report 2021 — P-302 Cavitation", "EQUIPMENT: P-302 Reflux Pump A\nDATE: Jun 2021\nAUTHOR: T. Nair (Rotating Equipment Specialist)\n\nOBSERVATION:\nPrior cavitation events in 2020 and 2022 on sister pump P-302B match current signature.\n\nDIAGNOSIS:\nCavitation occurs due to suction strainer restriction. T. Nair checked impeller eye pitting.", "T. Nair", now, "Inspection Report", "P-302", "None", 0.95, 5, 8, 1, "Gen 2"),
        ("Startup Procedure SOP-114 — V-205 Vessel", "EQUIPMENT: V-205 Low-Ambient Control Valve\nDATE: Oct 2022\nAUTHOR: M. Pillai (Process Veteran)\n\nOBSERVATION:\nContradictions found on heat-soak intervals.\n\nDIAGNOSIS:\nM. Pillai noted that heat-soak interval must be verified against the plant standard SOP-114, even if it contradicts the OEM manual.", "M. Pillai", now, "Maintenance Log", "V-205", "None", 0.95, 4, 12, 3, "Gen 1"),
        ("Zero-Span Calibration Standard - TURBINE-04", "EQUIPMENT: TURBINE-04 Auxiliary Steam Turbine\nDATE: Nov 2023\nAUTHOR: R. Nayar (Senior Instrument Systems Engineer)\n\nOBSERVATION:\nTurbine speed governor signal showing minor feedback lag on cold startup.\n\nDIAGNOSIS:\nAdjusted governor feedback loop. Re-zeroed the signal offset at 4mA and 20mA span limit.\nFeedback now perfectly linear.", "R. Nayar", now, "Maintenance Log", "TURBINE-04", "None", 0.95, 2, 14, 0, "Gen 2"),
        ("Boiler-2 Fuel Gas Solenoid Overhaul", "EQUIPMENT: BOILER-2 High-Pressure Boiler 2\nDATE: Dec 2024\nAUTHOR: R. Nayar (Senior Instrument Systems Engineer)\n\nOBSERVATION:\nIntermittent solenoid trips during peak loads.\n\nDIAGNOSIS:\nFound solenoid coil temperature exceeding 85°C. Cleaned dust coating and re-routed instrumentation air duct to supply cooling air. Trips resolved.", "R. Nayar", now, "Inspection Report", "BOILER-2", "None", 0.95, 1, 9, 1, "Gen 2")
    ]
    cursor.executemany("""
    INSERT INTO documents (
        title, content, engineer_author, upload_date, doc_type, equipment_tag, failure_code, confidence,
        age_years, reference_count, contradiction_count, hardware_generation
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    """, documents)
    conn.commit()
    print("[DeadMind] Database seed injection complete.")

if __name__ == "__main__":
    init_db()
    print("Database initialized successfully at:", DB_PATH)
