from sentence_transformers import CrossEncoder
import threading

_reranker_model = None
_lock = threading.Lock()

def get_reranker():
    global _reranker_model
    if _reranker_model is None:
        # Smallest cross-encoder to keep demo speeds fast
        _reranker_model = CrossEncoder("cross-encoder/ms-marco-MiniLM-L-6-v2", max_length=512)
    return _reranker_model

def rerank_results(query: str, docs: list, relative_gap: float = 4.0) -> list:
    """
    Reranks a list of retrieved documents (dict format) using a Cross-Encoder.
    Instead of a fragile absolute cutoff, drops results that score meaningfully
    worse than THIS query's own best match.
    """
    if not docs:
        return docs
        
    pairs = [[query, doc.get("content", "")] for doc in docs]
    
    with _lock:
        scores = get_reranker().predict(pairs)
    
    # Assign scores back to docs
    for i, doc in enumerate(docs):
        doc["rerank_score"] = float(scores[i])
        
    # Sort by rerank score descending
    reranked_docs = sorted(docs, key=lambda x: x["rerank_score"], reverse=True)
    
    if not reranked_docs:
        return reranked_docs
        
    best_score = reranked_docs[0]["rerank_score"]
    # Keep anything within `relative_gap` logits of the best match in THIS result set
    # Note: we previously tried an absolute min_score=-10.0 but found it fragile across queries
    return [d for d in reranked_docs if best_score - d["rerank_score"] <= relative_gap]
