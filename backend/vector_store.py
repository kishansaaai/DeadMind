import faiss
import numpy as np
import pickle
import os
from sentence_transformers import SentenceTransformer

MODEL_NAME = "all-MiniLM-L6-v2"
INDEX_PATH = "backend/data/faiss.index"
META_PATH = "backend/data/faiss_meta.pkl"

_model = None
def get_model():
    global _model
    if _model is None:
        _model = SentenceTransformer(MODEL_NAME)
    return _model

class VectorStore:
    def __init__(self, dim: int = 384):
        self.dim = dim
        self.index = faiss.IndexFlatIP(dim)
        self.metadata = []
        self._load()

    def _load(self):
        if os.path.exists(INDEX_PATH) and os.path.exists(META_PATH):
            self.index = faiss.read_index(INDEX_PATH)
            with open(META_PATH, "rb") as f:
                self.metadata = pickle.load(f)

    def save(self):
        os.makedirs(os.path.dirname(INDEX_PATH), exist_ok=True)
        faiss.write_index(self.index, INDEX_PATH)
        with open(META_PATH, "wb") as f:
            pickle.dump(self.metadata, f)

    def add_document(self, doc_id: int, text: str, meta: dict):
        vec = get_model().encode([text], normalize_embeddings=True)
        self.index.add(np.array(vec, dtype="float32"))
        self.metadata.append({**meta, "id": doc_id})
        self.save()

    def search(self, query: str, k: int = 5, engineer_filter: str = None):
        if self.index.ntotal == 0:
            return []
        qvec = get_model().encode([query], normalize_embeddings=True)
        scores, idxs = self.index.search(np.array(qvec, dtype="float32"), min(k * 3, self.index.ntotal))
        results = []
        for score, idx in zip(scores[0], idxs[0]):
            if idx == -1:
                continue
            meta = self.metadata[idx]
            if engineer_filter and engineer_filter != "Auto-Route" and meta.get("author") != engineer_filter:
                continue
            results.append({**meta, "score": float(score)})
            if len(results) >= k:
                break
        return results

store = VectorStore()
