"""
Concurrent load test against the live FastAPI server.

Run the server first:   python run.py
Then run this script:   python -m backend.evals.load_test_concurrent

Fires CONCURRENCY workers simultaneously, each sending REQUESTS_PER_WORKER
POST /api/chat calls, and reports wall-clock throughput and p50/p95/p99 latency.
No external dependencies beyond httpx (already in requirements.txt).
"""
import asyncio
import statistics
import time

import httpx

BASE_URL = "http://localhost:8000"
CONCURRENCY = 50
REQUESTS_PER_WORKER = 5

QUERIES = [
    "cavitation pattern on P-302",
    "bearing wear B-101 startup sequence",
    "zero-span positioner procedure",
    "SOP compliance for boiler inspection",
    "OISD-118 evidence status",
]


async def worker(client: httpx.AsyncClient, worker_id: int, latencies: list):
    for i in range(REQUESTS_PER_WORKER):
        q = QUERIES[(worker_id + i) % len(QUERIES)]
        t0 = time.time()
        try:
            resp = await client.post(
                "/api/chat",
                json={"query": q, "engineer_name": "Auto-Route"},
                timeout=30,
            )
            resp.raise_for_status()
        except Exception as e:
            print(f"[worker {worker_id}] request failed: {e}")
            continue
        latencies.append(time.time() - t0)


async def run():
    latencies: list = []
    async with httpx.AsyncClient(base_url=BASE_URL) as client:
        t_start = time.time()
        await asyncio.gather(*[worker(client, w, latencies) for w in range(CONCURRENCY)])
        total_time = time.time() - t_start

    if not latencies:
        print("No successful requests recorded.")
        return

    latencies.sort()
    n = len(latencies)
    p50 = statistics.median(latencies)
    p95 = latencies[min(int(n * 0.95), n - 1)]
    p99 = latencies[min(int(n * 0.99), n - 1)]

    print()
    print("## Concurrent Load Test Results")
    print()
    print("| Metric | Value |")
    print("|---|---|")
    print(f"| Concurrent users | {CONCURRENCY} |")
    print(f"| Total requests | {CONCURRENCY * REQUESTS_PER_WORKER} |")
    print(f"| Successful | {n} |")
    print(f"| Wall clock time | {total_time:.2f}s |")
    print(f"| Throughput | {n / total_time:.1f} req/sec |")
    print(f"| p50 latency | {p50 * 1000:.0f}ms |")
    print(f"| p95 latency | {p95 * 1000:.0f}ms |")
    print(f"| p99 latency | {p99 * 1000:.0f}ms |")
    print()


if __name__ == "__main__":
    asyncio.run(run())
