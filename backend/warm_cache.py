from backend.vector_store import get_model

if __name__ == "__main__":
    print("Downloading and caching embedding model for offline use...")
    get_model()
    print("Done. Model is now cached locally in ~/.cache/huggingface — safe to run offline.")
