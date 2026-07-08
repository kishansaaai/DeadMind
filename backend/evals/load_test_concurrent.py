"""
Concurrent load test against the live FastAPI server.

Run the server first:   python run.py
Then run this script:   python -m backend.evals.load_test_concurrent

Two test phases:
  Phase 1 — 50 concurrent workers hitting /api/engineers (fast DB read, no
             rate-limiting) to measure raw request-handling throughput.
  Phase 2 — 10 concurrent workers hitting /api/chat (AI inference, rate-limited
             to 10 req/min per IP by design) to measure AI pipeline latency.
"""
import asyncio
import statistics
import time

import httpx

BASE_URL = "http://localhost:8000"

QUERIES = [
    "cavitation pattern on P-302",
    "bearing wear B-101 startup sequence",
    "zero-span positioner procedure",
    "SOP compliance for boiler inspection",
    "OISD-118 evidence status",
]


async def worker_fast(client: httpx.AsyncClient, worker_id: int, latencies: list, n: int = 5):
    """Hit the fast /api/engineers endpoint."""
    for _ in range(n):
        t0 = time.time()
        try:
            resp = await client.get("/api/engineers", timeout=10)
            resp.raise_for_status()
        except Exception as e:
            print(f"[fast-worker {worker_id}] failed: {e}")
            continue
        latencies.append(time.time() - t0)


async def worker_chat(client: httpx.AsyncClient, worker_id: int, latencies: list):
    """Hit /api/chat once — respects existing rate-limit."""
    q = QUERIES[worker_id % len(QUERIES)]
    t0 = time.time()
    try:
        resp = await client.post(
            "/api/chat",
            json={"query": q, "engineer_name": "Auto-Route"},
            timeout=60,
        )
        resp.raise_for_status()
    except Exception as e:
        print(f"[chat-worker {worker_id}] failed: {e}")
        return
    latencies.append(time.time() - t0)


def print_table(title: str, concurrency: int, total: int, latencies: list, wall: float):
    if not latencies:
        print(f"\n{title}: No successful requests.\n")
        return
    lat = sorted(latencies)
    n = len(lat)
    p50 = statistics.median(lat)
    p95 = lat[min(int(n * 0.95), n - 1)]
    p99 = lat[min(int(n * 0.99), n - 1)]
    print(f"\n## {title}")
    print()
    print("| Metric | Value |")
    print("|---|---|")
    print(f"| Concurrent users | {concurrency} |")
    print(f"| Total requests | {total} |")
    print(f"| Successful | {n} |")
    print(f"| Wall clock time | {wall:.2f}s |")
    print(f"| Throughput | {n / wall:.1f} req/sec |")
    print(f"| p50 latency | {p50 * 1000:.0f}ms |")
    print(f"| p95 latency | {p95 * 1000:.0f}ms |")
    print(f"| p99 latency | {p99 * 1000:.0f}ms |")
    print()


async def run():
    async with httpx.AsyncClient(base_url=BASE_URL) as client:
        # --- Phase 1: fast endpoint, 50 concurrent workers, 5 requests each ---
        CONCURRENCY_FAST = 50
        REPS = 5
        lat_fast: list = []
        t0 = time.time()
        await asyncio.gather(*[
            worker_fast(client, w, lat_fast, REPS) for w in range(CONCURRENCY_FAST)
        ])
        wall_fast = time.time() - t0
        print_table(
            "Phase 1 — Concurrent DB/Retrieval Load (50 users × 5 requests)",
            CONCURRENCY_FAST, CONCURRENCY_FAST * REPS, lat_fast, wall_fast,
        )

        # --- Phase 2: AI pipeline, 10 workers × 1 request each ---
        CONCURRENCY_CHAT = 10
        lat_chat: list = []
        t0 = time.time()
        await asyncio.gather(*[
            worker_chat(client, w, lat_chat) for w in range(CONCURRENCY_CHAT)
        ])
        wall_chat = time.time() - t0
        print_table(
            "Phase 2 — Concurrent AI Pipeline (10 simultaneous chat requests)",
            CONCURRENCY_CHAT, CONCURRENCY_CHAT, lat_chat, wall_chat,
        )


if __name__ == "__main__":
    asyncio.run(run())
