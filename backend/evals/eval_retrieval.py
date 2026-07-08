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
    ("What's the failure signature for pump cavitation?", "P-302"),
    ("Heater is drifting on temperature", "B-101"),
    ("valve controller keeps sticking", "V-205"),
    ("air unit overhaul tightening instructions", "C-104"),
    ("air unit housing screw tightening", "C-104"),
    ("water mover intake blockage", "P-302"),
    ("cold weather controller inaccuracy", "V-205"),
    ("steam generator wobbling at night", "B-101"),
    ("power panel running hot on Phase-B", "S-501"),
    ("power distribution rust on connections", "S-501"),
    ("spinning machine controller delay on cold start", "TURBINE-04"),
    ("gas switch overheating", "BOILER-2"),
    ("air unit clicking sound due to loose screws", "C-104"),
    ("water system zeroing process", "V-205"),
    ("steam maker switch cooling vent change", "BOILER-2"),
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
