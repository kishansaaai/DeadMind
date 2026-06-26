import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";
import { api, type VulnNode, type CausalLink, type Counterfactual, type NetworkRow } from "@/lib/api";
import { useYear, colorForNode } from "@/lib/year-context";
import { PageHeader, ForgePanel, Stat, EquipmentTag, ErrorBlock, LoadingBlock, Tag } from "@/components/forge";
import { ForceGraph } from "@/components/fx/force-graph";
import { GitBranch, Repeat, X } from "lucide-react";

type IndexSearch = { node?: string };

export const Route = createFileRoute("/")({
  validateSearch: (s: Record<string, unknown>): IndexSearch => ({
    node: typeof s.node === "string" ? s.node : undefined,
  }),
  head: () => ({
    meta: [
      { title: "Plant Knowledge & Vulnerability Map — DeadMind" },
      { name: "description", content: "Plant-wide risk profile, retirement timelines, and financial exposure of preserved expert knowledge." },
    ],
  }),
  component: PlantMap,
});

function colorFill(c: "green" | "yellow" | "red") {
  if (c === "green") return "oklch(0.90 0.16 180)";
  if (c === "yellow") return "oklch(0.80 0.14 85)";
  return "oklch(0.65 0.24 28)";
}

// Build proximity-based flow edges so the schematic shows a piping-like graph.
function buildEdges(nodes: VulnNode[]) {
  const edges: { a: VulnNode; b: VulnNode }[] = [];
  for (let i = 0; i < nodes.length; i++) {
    const dists = nodes
      .map((n, j) => ({ n, j, d: Math.hypot(n.x - nodes[i].x, n.y - nodes[i].y) }))
      .filter((x) => x.j !== i)
      .sort((a, b) => a.d - b.d)
      .slice(0, 2);
    for (const { n } of dists) {
      if (!edges.some((e) => (e.a.tag === n.tag && e.b.tag === nodes[i].tag) || (e.a.tag === nodes[i].tag && e.b.tag === n.tag))) {
        edges.push({ a: nodes[i], b: n });
      }
    }
  }
  return edges;
}

function PlantMap() {
  const { year } = useYear();
  const { node: selectedTag } = Route.useSearch();
  const navigate = useNavigate({ from: Route.fullPath });

  const engineersQ = useQuery({ queryKey: ["engineers"], queryFn: api.engineers });
  const mapQ = useQuery({ queryKey: ["vulnerability-map"], queryFn: api.vulnerabilityMap });
  const networkQ = useQuery({ queryKey: ["network"], queryFn: api.network });

  const nodes = mapQ.data ?? [];
  const engs = engineersQ.data ?? [];
  const edges = useMemo(() => buildEdges(nodes), [nodes]);

  if (mapQ.isError) return <ErrorBlock error={mapQ.error} />;


  const retiredCount = engs.filter((e) => e.retirement_year <= year).length;
  const redNodes = nodes.filter(
    (n) => (n.active_engineers ?? []).filter((e) => e.retirement_year >= year).length === 0,
  );
  const exposure = redNodes.reduce((s, n) => s + n.downtime_cost, 0);
  const plantRisk = nodes.length === 0 ? 0 : Math.round((redNodes.length / nodes.length) * 100);

  const remainingYears = engs.filter((e) => e.retirement_year > year).map((e) => e.retirement_year - year);
  const khi = remainingYears.length === 0 ? 0.0 : parseFloat((remainingYears.reduce((a, b) => a + b, 0) / remainingYears.length).toFixed(1));

  // Sparkline projections across the 2026–year horizon — simulate how each
  // KPI evolves as engineers retire in sequence.
  const { riskSpark, exposureSpark, retiredSpark, riskDelta } = useMemo(() => {
    const years = Array.from({ length: Math.max(2, year - 2025) }, (_, i) => 2026 + i);
    const risk: number[] = [];
    const expo: number[] = [];
    const ret: number[] = [];
    for (const y of years) {
      const red = nodes.filter(
        (n) => (n.active_engineers ?? []).filter((e) => e.retirement_year >= y).length === 0,
      );
      risk.push(nodes.length === 0 ? 0 : (red.length / nodes.length) * 100);
      expo.push(red.reduce((s, n) => s + n.downtime_cost, 0) / 1e7);
      ret.push(engs.filter((e) => e.retirement_year <= y).length);
    }
    const prev = risk.length > 1 ? risk[risk.length - 2] : risk[0] ?? 0;
    const last = risk[risk.length - 1] ?? 0;
    const delta = prev === 0 ? 0 : ((last - prev) / Math.max(1, prev)) * 100;
    return { riskSpark: risk, exposureSpark: expo, retiredSpark: ret, riskDelta: delta };
  }, [nodes, engs, year]);

  const selectNode = (tag: string | undefined) =>
    navigate({ search: tag ? { node: tag } : {} });

  const selected = selectedTag ? nodes.find((n) => n.tag === selectedTag) : undefined;

  const W = 1000, H = 600;

  return (
    <div>
      <PageHeader
        eyebrow="CFO View"
        title="Plant Knowledge & Vulnerability Map"
        description="Live financial exposure from knowledge gaps across the plant. Drag the simulation year above to retire engineers and watch coverage degrade."
      />

      <div className="p-6 grid gap-4 md:grid-cols-5">
        <Stat
          label="Plant Risk"
          numeric={plantRisk}
          suffix="%"
          tone={plantRisk > 50 ? "fire" : plantRisk > 25 ? "gold" : "steel"}
          hint={`${redNodes.length}/${nodes.length} unattended`}
          sparkline={riskSpark}
          delta={riskDelta}
        />
        <Stat
          label="Exposure"
          numeric={exposure / 1e7}
          prefix="₹"
          suffix=" Cr"
          decimals={2}
          tone="fire"
          hint="Sum of downtime cost on red nodes"
          sparkline={exposureSpark}
        />
        <Stat
          label="Knowledge Half-Life (KHI)"
          value={`${khi} years`}
          tone={khi < 2.0 ? "fire" : khi < 4.0 ? "gold" : "steel"}
          hint="At current retirement rate"
          delta={year > 2026 ? -15.4 : undefined}
        />
        <Stat
          label={`Retired by ${year}`}
          numeric={retiredCount}
          suffix={`/${engs.length}`}
          tone="gold"
          sparkline={retiredSpark}
        />
        <Stat
          label="Critical Nodes"
          numeric={nodes.filter((n) => n.criticality === "High").length}
          tone="steel"
          hint={`${nodes.length} total assets`}
        />
      </div>

      <div className="px-6 pb-6">
        <ForgePanel className="p-4 overflow-hidden">
          <div className="flex items-center justify-between mb-3">
            <h2 className="font-display uppercase tracking-wider text-lg">Equipment Schematic</h2>
            <div className="flex items-center gap-3 text-xs">
              <span className="flex items-center gap-1"><span className="w-3 h-3 rounded-full" style={{ background: colorFill("green") }} /> ≥3</span>
              <span className="flex items-center gap-1"><span className="w-3 h-3 rounded-full" style={{ background: colorFill("yellow") }} /> 1–2</span>
              <span className="flex items-center gap-1"><span className="w-3 h-3 rounded-full" style={{ background: colorFill("red") }} /> 0</span>
            </div>
          </div>
          {mapQ.isLoading ? (
            <LoadingBlock />
          ) : (
            <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-auto" aria-label="Equipment Schematic Map" role="img">
              <defs>
                <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                  <path d="M 40 0 L 0 0 0 40" fill="none" stroke="oklch(0.22 0.012 275 / 0.5)" strokeWidth="0.5" />
                </pattern>
              </defs>
              <rect width={W} height={H} fill="url(#grid)" />
              {edges.map((e, i) => (
                <line
                  key={i}
                  x1={e.a.x} y1={e.a.y} x2={e.b.x} y2={e.b.y}
                  stroke="oklch(0.80 0.14 85 / 0.45)"
                  strokeWidth={1.5}
                  strokeDasharray="6 4"
                />
              ))}
              {nodes.map((n) => {
                const activeCount = (n.active_engineers ?? []).filter((e) => e.retirement_year >= year).length;
                const c = colorForNode(activeCount);
                const fill = colorFill(c);
                const r = n.criticality === "High" ? 22 : 18;
                const isSel = selectedTag === n.tag;
                return (
                  <g
                    key={n.tag}
                    transform={`translate(${n.x},${n.y})`}
                    className={`cursor-pointer focus:outline-none ${c === "red" ? "node-danger" : ""}`}
                    onClick={() => selectNode(n.tag === selectedTag ? undefined : n.tag)}
                    aria-label={`Equipment node ${n.tag}: ${n.name}, risk status: ${c === "red" ? "Critical" : c === "yellow" ? "Warning" : "Safe"}`}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        selectNode(n.tag === selectedTag ? undefined : n.tag);
                      }
                    }}
                  >
                    {isSel && <circle r={r + 14} fill="none" stroke="oklch(0.92 0.012 80)" strokeWidth={1.5} strokeDasharray="3 3" />}
                    <circle r={r + 8} fill={fill} fillOpacity={0.15} />
                    <circle r={r} fill={fill} fillOpacity={0.4} stroke={fill} strokeWidth={2} />
                    <text y={5} textAnchor="middle" fontFamily="JetBrains Mono, monospace" fontSize={11} fill="oklch(0.92 0.012 80)" fontWeight={600}>
                      {n.tag}
                    </text>
                    <text y={-r - 5} textAnchor="middle" fontFamily="Space Mono, monospace" fontSize={8} fontWeight={700} fill={fill}>
                      {c === "red" ? "[CRIT]" : c === "yellow" ? "[WARN]" : "[SAFE]"}
                    </text>
                    <text y={r + 18} textAnchor="middle" fontFamily="Rajdhani, sans-serif" fontSize={11} letterSpacing={1} fill="oklch(0.59 0.025 80)">
                      {n.name}
                    </text>
                  </g>
                );
              })}
            </svg>
          )}
        </ForgePanel>
      </div>

      {selected && (
        <div className="px-6 pb-6 animate-fade-in">
          <NodeDetailDrawer node={selected} year={year} onClose={() => selectNode(undefined)} />
        </div>
      )}

      <div className="px-6 pb-10 grid gap-4 lg:grid-cols-3">
        <RetirementTimeline year={year} />
        <DependencyMini data={networkQ.data ?? []} loading={networkQ.isLoading} year={year} engineers={engs} />
        <ROICard redNodes={redNodes} exposure={exposure} />
      </div>
    </div>
  );
}

function NodeDetailDrawer({ node, year, onClose }: { node: VulnNode; year: number; onClose: () => void }) {
  const causalQ = useQuery({ queryKey: ["causal", node.tag], queryFn: () => api.causal(node.tag) });
  const cfQ = useQuery({ queryKey: ["cf", node.tag], queryFn: () => api.counterfactuals(node.tag) });

  const active = (node.active_engineers ?? []).filter((e) => e.retirement_year >= year);
  const retired = (node.retired_engineers ?? []).concat(
    (node.active_engineers ?? []).filter((e) => e.retirement_year < year),
  );

  return (
    <ForgePanel className="relative">
      <button
        onClick={onClose}
        className="absolute top-3 right-3 text-muted-foreground hover:text-foreground z-10"
        aria-label="Close detail"
      >
        <X className="h-4 w-4" />
      </button>
      <div className="grid gap-px bg-border lg:grid-cols-3">
        {/* Meta */}
        <div className="bg-card p-5">
          <div className="flex items-center gap-2 mb-3">
            <EquipmentTag tag={node.tag} />
            <span className="font-display text-lg">{node.name}</span>
          </div>
          <div className="text-xs text-muted-foreground mb-3">{node.process_area}</div>
          <div className="flex items-center gap-2 mb-4">
            <Tag tone={node.criticality === "High" ? "fire" : "gold"}>{node.criticality}</Tag>
            <span className="rupee-counter text-xl">₹{(node.downtime_cost / 1e7).toFixed(2)} Cr</span>
          </div>
          <div className="section-label">Active custodians at {year}</div>
          {active.length === 0 ? (
            <div className="text-destructive text-xs mt-1 font-mono uppercase tracking-wider">None — knowledge lost</div>
          ) : (
            <ul className="text-xs mt-1 space-y-0.5">
              {active.map((a) => (
                <li key={a.name}>
                  {a.name} <span className="text-muted-foreground">· retires {a.retirement_year}</span>
                </li>
              ))}
            </ul>
          )}
          {retired.length > 0 && (
            <>
              <div className="section-label mt-4">Retired</div>
              <ul className="text-xs mt-1 space-y-0.5 text-muted-foreground">
                {retired.map((a) => (
                  <li key={a.name}>{a.name} · {a.retirement_year}</li>
                ))}
              </ul>
            </>
          )}
        </div>

        {/* Causal Timeline */}
        <div className="bg-card p-5">
          <div className="flex items-center gap-2 mb-3">
            <GitBranch className="h-4 w-4 text-primary" />
            <h3 className="font-display uppercase tracking-wider text-sm">Causal Timeline Trace</h3>
          </div>
          {causalQ.isLoading ? (
            <div className="text-xs text-muted-foreground">Loading…</div>
          ) : (causalQ.data ?? []).length === 0 ? (
            <p className="text-xs text-muted-foreground">No causal chains recorded.</p>
          ) : (
            <ol className="relative border-l border-border ml-1 space-y-3">
              {(causalQ.data ?? []).map((c: CausalLink) => (
                <li key={c.id} className="ml-4">
                  <span className="absolute -left-[5px] mt-1.5 w-2.5 h-2.5 rounded-full bg-primary" />
                  <div className="flex flex-wrap items-center gap-1 text-xs">
                    <span className="font-display">{c.parent_event}</span>
                    <span className="text-muted-foreground">→</span>
                    <span className="font-display text-primary">{c.child_event}</span>
                    {c.is_prediction ? (
                      <span className="text-[0.6rem] uppercase border border-accent text-accent px-1">prediction</span>
                    ) : null}
                  </div>
                  <p className="text-xs text-muted-foreground mt-0.5">{c.description}</p>
                </li>
              ))}
            </ol>
          )}
        </div>

        {/* Counterfactuals */}
        <div className="bg-card p-5">
          <div className="flex items-center gap-2 mb-3">
            <Repeat className="h-4 w-4 text-accent" />
            <h3 className="font-display uppercase tracking-wider text-sm">Counterfactual Simulator</h3>
          </div>
          {cfQ.isLoading ? (
            <div className="text-xs text-muted-foreground">Loading…</div>
          ) : (cfQ.data ?? []).length === 0 ? (
            <p className="text-xs text-muted-foreground">No counterfactuals on file.</p>
          ) : (
            <div className="space-y-3">
              {(cfQ.data ?? []).map((cf: Counterfactual) => (
                <div key={cf.id} className="border border-border p-3 animate-scale-in">
                  <div className="font-display text-sm tracking-wide">{cf.title}</div>
                  <p className="text-xs text-muted-foreground mt-1">{cf.intervention}</p>
                  <ul className="mt-2 space-y-0.5">
                    {cf.consequences.split(";").map((c, i) => (
                      <li key={i} className="text-[0.7rem] flex gap-1">
                        <span className="text-destructive">▸</span>
                        <span>{c.trim()}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-2 text-right">
                    <span className="font-counter text-2xl text-primary tabular-nums gold-glow">
                      ₹{cf.cost_avoided_crore.toFixed(2)} Cr
                    </span>
                    <div className="text-[0.6rem] uppercase tracking-widest text-muted-foreground">saved</div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </ForgePanel>
  );
}

function RetirementTimeline({ year }: { year: number }) {
  const q = useQuery({ queryKey: ["engineers"], queryFn: api.engineers });
  const engs = q.data ?? [];
  return (
    <ForgePanel className="p-5">
      <h2 className="font-display uppercase tracking-wider text-lg mb-3">Retirement Timeline</h2>
      <div className="grid grid-cols-11 gap-1">
        {Array.from({ length: 11 }, (_, i) => 2026 + i).map((y) => {
          const ret = engs.filter((e) => e.retirement_year === y);
          const isCurrent = y === year;
          const past = y <= year;
          const borderClass = isCurrent
            ? "border-primary bg-primary/10 shadow-[0_0_8px_oklch(0.85_0.16_80)]"
            : past
            ? "border-destructive/60 bg-destructive/10"
            : "border-border";
          return (
            <div key={y} className={`p-1.5 border ${borderClass}`}>
              <div className="font-counter text-[0.6rem] text-center text-muted-foreground">{y}</div>
              <div className={`font-counter text-xl text-center tabular-nums ${ret.length > 0 ? "text-destructive" : "text-muted-foreground/40"}`}>
                {ret.length}
              </div>
            </div>
          );
        })}
      </div>
    </ForgePanel>
  );
}

function DependencyMini({ data, loading, year, engineers }: { data: NetworkRow[]; loading: boolean; year: number; engineers: any[] }) {
  const filteredData = useMemo(() => {
    return data.filter((row) => {
      const eng = engineers.find((e) => e.name === row.engineer);
      return eng ? eng.retirement_year > year : true;
    });
  }, [data, year, engineers]);

  return (
    <ForgePanel className="p-5">
      <div className="flex items-center justify-between mb-3">
        <h2 className="font-display uppercase tracking-wider text-lg">Knowledge Network</h2>
        <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
          live force simulation
        </span>
      </div>
      {loading ? (
        <LoadingBlock />
      ) : filteredData.length === 0 ? (
        <p className="text-xs text-muted-foreground">No active network data.</p>
      ) : (
        <>
          <ForceGraph data={filteredData} />
          <div className="mt-3 grid grid-cols-2 gap-2 text-[0.65rem]">
            {filteredData.slice(0, 4).map((r) => (
              <div key={r.id} className="flex items-center justify-between gap-2">
                <span className="truncate">{r.engineer}</span>
                <span className="font-counter tabular-nums text-primary">
                  {r.centrality.toFixed(2)}
                </span>
              </div>
            ))}
          </div>
        </>
      )}
    </ForgePanel>
  );
}

function ROICard({ redNodes, exposure }: { redNodes: any[]; exposure: number }) {
  const savings = exposure * 0.20; // 20% estimated savings
  return (
    <ForgePanel className="p-5 flex flex-col justify-between">
      <div>
        <h2 className="font-display uppercase tracking-wider text-lg mb-3">Knowledge ROI Analysis</h2>
        <div className="space-y-4">
          <div>
            <div className="section-label">Knowledge Gap Cost</div>
            <div className="text-2xl font-counter text-destructive mt-1">
              ₹{(exposure / 1e7).toFixed(2)} Cr
            </div>
            <div className="text-[0.65rem] text-muted-foreground mt-0.5">
              Accumulated downtime risk across {redNodes.length} unattended assets.
            </div>
          </div>
          <div>
            <div className="section-label">Est. Annual Savings if Gaps Closed</div>
            <div className="text-2xl font-counter text-primary mt-1">
              ₹{(savings / 1e7).toFixed(2)} Cr
            </div>
            <div className="text-[0.65rem] text-muted-foreground mt-0.5">
              Estimated 18-22% reduction in unplanned downtime cost.
            </div>
          </div>
        </div>
      </div>
      <div className="border-t border-border mt-4 pt-3 space-y-2 text-[0.65rem] text-muted-foreground">
        <div>
          <strong className="text-foreground">McKinsey:</strong> 35% of engineering time is lost searching for fragmented information.
        </div>
        <div>
          <strong className="text-foreground">BIS Research:</strong> 18-22% of unplanned downtime is linked directly to knowledge fragmentation.
        </div>
      </div>
    </ForgePanel>
  );
}
