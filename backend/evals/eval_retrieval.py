"""
Run: python -m backend.evals.eval_retrieval
Measures retrieval precision using a small hand-labeled gold set of 
(query -> expected equipment_tag) pairs, comparing keyword vs semantic retrieval.
"""
import os
import sys

sys.path.append(os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__)))))

from backend.retrieval import retrieve_expert_knowledge, retrieve_expert_knowledge_semantic
from backend.hybrid_retrieval import reciprocal_rank_fusion

GOLD_SET = [
    # Category 1: Exact equipment-tag matches
    ("What's the failure signature for pump cavitation on P-302?", "P-302"),
    ("Heater B-101 is drifting on temperature", "B-101"),
    ("V-205 valve controller keeps sticking", "V-205"),
    ("C-104 air unit overhaul tightening instructions", "C-104"),
    ("What are the tightening specs for C-104?", "C-104"),
    ("S-501 power panel running hot", "S-501"),
    ("TURBINE-04 controller delay on cold start", "TURBINE-04"),
    ("BOILER-2 gas switch overheating", "BOILER-2"),
    ("V-205 water system zeroing process", "V-205"),
    ("C-104 air unit clicking sound", "C-104"),
    
    # Category 2: Colloquial/field-language paraphrases
    ("water mover intake blockage", "P-302"),
    ("cold weather controller inaccuracy", "V-205"),
    ("steam generator wobbling at night", "B-101"),
    ("power distribution rust on connections", "S-501"),
    ("steam maker switch cooling vent change", "BOILER-2"),
    ("spinning machine controller delay", "TURBINE-04"),
    ("the big water pump keeps hunting", "P-302"),
    ("the boiler feed is shaking too much", "B-101"),
    ("air box keeps making that clicking noise", "C-104"),
    ("main spark panel getting way too hot", "S-501"),

    # Category 3: Misspelled or informally-written equipment tags
    ("p302 cavitation history", "P-302"),
    ("b101 temp drift", "B-101"),
    ("v 205 sticking again", "V-205"),
    ("c104 overhaul", "C-104"),
    ("s 501 phase b", "S-501"),
    ("turbine04 cold start", "TURBINE-04"),
    ("boiler 2 overheating", "BOILER-2"),
    ("p-302 pump is loud", "P-302"),
    ("v-205 zero process", "V-205"),
    ("c-104 screw tightening", "C-104"),

    # Category 4: Multi-hop questions requiring cross-document reasoning
    ("what did whoever last handled a cavitation issue on P-302 recommend", "P-302"),
    ("how does the temperature drift on B-101 affect the downstream process", "B-101"),
    ("does the sticking V-205 cause the same issue as last year", "V-205"),
    ("who worked on the C-104 clicking sound recently", "C-104"),
    ("compare S-501 rust to the previous phase-b hot run", "S-501"),
    ("how did we fix the BOILER-2 gas switch last time it overheated", "BOILER-2"),
    ("what are the common causes of TURBINE-04 cold start delays based on logs", "TURBINE-04"),
    ("did the C-104 overhaul fix the loose screws issue permanently", "C-104"),
    ("what's the consensus on P-302 intake blockage", "P-302"),
    ("which engineer documented the V-205 cold weather inaccuracy", "V-205"),

    # Category 5: Negative/no-match controls
    ("where is the cafeteria menu posted", None),
    ("how many vacation days do I have left", None),
    ("who is the CEO of the company", None),
    ("how to connect to the guest wifi", None),
    ("what time does the morning shift start", None),
    ("where do I submit my timesheet", None),
    ("is there a holiday party this year", None),
    ("how to reset my email password", None),
    ("where is the nearest fire extinguisher", None),
    ("can I park in the visitor lot", None),
]

def precision_at_k(retrieve_fn, k=3):
    hits = 0
    for query, expected_tag in GOLD_SET:
        results = retrieve_fn(query, limit=k) if retrieve_fn != reciprocal_rank_fusion else retrieve_fn(query, k=k)
        if any(r.get("equipment_tag") == expected_tag for r in results):
            hits += 1
    return hits / len(GOLD_SET)

if __name__ == "__main__":
    print(f"Keyword retrieval  P@3: {precision_at_k(retrieve_expert_knowledge):.0%}")
    print(f"Semantic retrieval P@3: {precision_at_k(retrieve_expert_knowledge_semantic):.0%}")
    print(f"Hybrid RRF + Cross-Encoder Reranker P@3: {precision_at_k(reciprocal_rank_fusion):.0%}")
