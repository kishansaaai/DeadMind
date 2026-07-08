from sentence_transformers import CrossEncoder

_reranker_model = None

def get_reranker():
    global _reranker_model
    if _reranker_model is None:
        # Smallest cross-encoder to keep demo speeds fast
        _reranker_model = CrossEncoder("cross-encoder/ms-marco-MiniLM-L-6-v2", max_length=512)
    return _reranker_model

def rerank_results(query: str, docs: list) -> list:
    """
    Reranks a list of retrieved documents (dict format) using a Cross-Encoder.
    docs should contain a 'content' field.
    """
    if not docs:
        return docs
        
    pairs = [[query, doc.get("content", "")] for doc in docs]
    scores = get_reranker().predict(pairs)
    
    # Assign scores back to docs
    for i, doc in enumerate(docs):
        doc["rerank_score"] = float(scores[i])
        
    # Sort by rerank score descending
    reranked_docs = sorted(docs, key=lambda x: x["rerank_score"], reverse=True)
    return reranked_docs
