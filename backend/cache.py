import hashlib
import json
from functools import lru_cache

# Simple in-memory cache for repeated RRF queries to save DB/Vector lookups
_query_cache = {}

def get_cache_key(query: str, k: int) -> str:
    return hashlib.md5(f"{query}:{k}".encode('utf-8')).hexdigest()

def get_cached_results(query: str, k: int):
    return _query_cache.get(get_cache_key(query, k))

def set_cached_results(query: str, k: int, results: list):
    _query_cache[get_cache_key(query, k)] = results
