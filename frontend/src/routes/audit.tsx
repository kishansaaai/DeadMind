import { createFileRoute } from "@tanstack/react-router";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useMemo, useState } from "react";
import { api, type HalfLifeDoc } from "@/lib/api";
import { PageHeader, ForgePanel, LoadingBlock, ErrorBlock, Tag, EquipmentTag, Stat } from "@/components/forge";
import { ShieldCheck, Flame, FileWarning, AlertTriangle } from "lucide-react";
import { useYear } from "@/lib/year-context";

export const Route = createFileRoute("/audit")({
  head: () => ({
    meta: [
      { title: "Operations & Compliance Audit — DeadMind" },
      { name: "description", content: "Plant head view: SOP compliance shadow audit, knowledge freshness heatmap, and shift-note anomaly analysis." },
    ],
  }),
  component: Audit,
});

function Audit() {
  const { year } = useYear();
  const q = useQuery({ queryKey: ["engineers"], queryFn: api.engineers });
  const engs = q.data ?? [];
  const remainingYears = engs.filter((e) => e.retirement_year > year).map((e) => e.retirement_year - year);
  const khi = remainingYears.length === 0 ? 0.0 : parseFloat((remainingYears.reduce((a, b) => a + b, 0) / remainingYears.length).toFixed(1));

  const baseFreshness = 65.3;
  const currentFreshness = parseFloat(Math.max(20.0, baseFreshness - (year - 2026) * 4.5).toFixed(1));
  const activeAnomalies = Math.round(1 + (year - 2026) * 0.6);

  return (
    <div>
      <PageHeader
        eyebrow="Plant Head View"
        title="Operations & Compliance Shadow Audit"
        description="Audit procedural deviations vs. the written SOP, watch documentation rot in real time, and surface predictive warnings from raw shift logs."
      />
      <div className="p-6 space-y-6">
        <div className="grid gap-4 md:grid-cols-4">
          <Stat
            label="Knowledge Half-Life (KHI)"
            value={`${khi} years`}
            tone={khi < 2.0 ? "fire" : khi < 4.0 ? "gold" : "steel"}
            hint={`Simulation year ${year} (Remaining: ${engs.filter((e) => e.retirement_year > year).length}/${engs.length} experts)`}
            delta={year > 2026 ? -15.4 : undefined}
          />
          <Stat
            label="SOP Audited"
            value="SOP-2019-047"
            tone="steel"
            hint="Boiler Startup Compliance"
          />
          <Stat
            label="Avg Freshness"
            value={`${currentFreshness}%`}
            tone={currentFreshness < 40 ? "fire" : currentFreshness < 60 ? "gold" : "steel"}
            hint="Documentation health score"
            delta={year > 2026 ? -parseFloat(((baseFreshness - currentFreshness) / baseFreshness * 100).toFixed(1)) : undefined}
          />
          <Stat
            label="Active Anomalies"
            value={`${activeAnomalies} Alert${activeAnomalies > 1 ? "s" : ""}`}
            tone={activeAnomalies > 4 ? "fire" : activeAnomalies > 1 ? "gold" : "steel"}
            hint="Flagged in shift notes"
            delta={year > 2026 ? (activeAnomalies - 1) * 100 : undefined}
          />
        </div>
        <ShiftNoteAnalyzer />
        <div className="grid gap-4 lg:grid-cols-2">
          <SopTable />
          <FreshnessHeatmap />
        </div>
      </div>
    </div>
  );
}

function ShiftNoteAnalyzer() {
  const [note, setNote] = useState(
    "Boiler 101 outlet temp drifting +4°C since shift start. Positioner cycling more often than usual; suspected sticky stem. Operator notes no alarms.",
  );
  const m = useMutation({ mutationFn: () => api.analyzeShiftNote(note) });

  return (
    <ForgePanel className="p-5">
      <div className="flex items-center gap-2 mb-3">
        <AlertTriangle className="h-4 w-4 text-accent" />
        <h2 className="font-display uppercase tracking-wider text-lg">Shift-Note Anomaly Analyzer</h2>
        <span className="text-xs text-muted-foreground ml-2">Paste a raw shift entry — DeadMind cross-references it against the preserved corpus.</span>
      </div>
      <div className="grid gap-3 lg:grid-cols-[1fr_auto]">
        <textarea
          value={note}
          onChange={(e) => setNote(e.target.value)}
          rows={3}
          className="w-full bg-popover border border-border text-foreground px-3 py-2 rounded-none focus:outline-none focus:border-primary font-mono text-sm"
        />
        <button
          onClick={() => m.mutate()}
          disabled={m.isPending || !note.trim()}
          className="bg-primary text-primary-foreground px-4 py-2 font-display uppercase tracking-wider text-sm hover:bg-primary/90 disabled:opacity-40 self-start"
        >
          {m.isPending ? "Analyzing…" : "Analyze"}
        </button>
      </div>
      {m.data && (
        <div className="mt-4 animate-fade-in">
          {m.data.triggered && m.data.details ? (
            <div className="border border-destructive/60 bg-destructive/10 p-3 grid gap-2 md:grid-cols-3">
              <div>
                <div className="section-label text-destructive">Anomaly on</div>
                <div className="mt-1 flex items-center gap-2">
                  <EquipmentTag tag={m.data.details.tag} />
                  <Tag tone="fire">flagged</Tag>
                </div>
              </div>
              <div>
                <div className="section-label">Closest expert</div>
                <div className="text-sm mt-1">{m.data.details.expert}</div>
              </div>
              <div>
                <div className="section-label">Causal warning</div>
                <div className="text-xs text-muted-foreground mt-1">{m.data.details.causal_warning}</div>
              </div>
              <div className="md:col-span-3 border-t border-destructive/40 pt-2">
                <div className="section-label">Recommended guide</div>
                <p className="text-sm mt-1 text-foreground leading-relaxed">{m.data.details.guide}</p>
                <div className="mt-1 text-xs text-destructive">{m.data.details.alert}</div>
              </div>
            </div>
          ) : (
            <div className="border border-border bg-card p-3 text-sm text-muted-foreground">No anomalies detected — this entry matches normal operating envelope.</div>
          )}
        </div>
      )}
    </ForgePanel>
  );
}

function SopTable() {
  const q = useQuery({ queryKey: ["sop-audit"], queryFn: api.sopAudit });
  if (q.isError) return <ErrorBlock error={q.error} />;
  const sopId = q.data?.[0]?.sop_id ?? "SOP-2019-047";

  return (
    <ForgePanel className="p-5">
      <div className="flex items-center gap-2 mb-3">
        <ShieldCheck className="h-4 w-4 text-primary" />
        <h2 className="font-display uppercase tracking-wider text-lg">Shadow SOP Compliance Auditor</h2>
      </div>
      <div className="text-xs text-muted-foreground mb-3">
        <span className="font-mono text-foreground">{sopId}</span> · Boiler Startup — measured vs. written sequence.
      </div>
      {q.isLoading ? (
        <LoadingBlock />
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-[0.65rem] uppercase tracking-widest text-muted-foreground border-b border-border">
                <th className="text-left py-2 px-2 w-10">#</th>
                <th className="text-left py-2 px-2">Step</th>
                <th className="text-left py-2 px-2 w-40">Compliance</th>
                <th className="text-left py-2 px-2 w-44">Workaround</th>
              </tr>
            </thead>
            <tbody>
              {(q.data ?? []).map((r) => {
                const rate = r.compliance_rate;
                const tone = rate >= 90 ? "steel" : rate >= 70 ? "gold" : "fire";
                const bar = rate >= 90 ? "oklch(0.65 0.18 165)" : rate >= 70 ? "oklch(0.80 0.14 85)" : "oklch(0.65 0.24 28)";
                return (
                  <tr key={r.id} className="border-b border-border/40 hover:bg-muted/20 align-top">
                    <td className="py-2 px-2 font-counter text-primary tabular-nums">{r.step_number}</td>
                    <td className="py-2 px-2">{r.step_desc}</td>
                    <td className="py-2 px-2">
                      <div className="flex items-center gap-2">
                        <div className="flex-1 h-2 bg-muted/40 border border-border overflow-hidden">
                          <div className="h-full" style={{ width: `${rate}%`, background: bar }} />
                        </div>
                        <Tag tone={tone}>{rate}%</Tag>
                      </div>
                    </td>
                    <td className="py-2 px-2 text-xs">
                      {r.workaround_detected && r.workaround_detected !== "None" ? (
                        <span className="text-destructive">{r.workaround_detected}</span>
                      ) : (
                        <span className="text-muted-foreground">—</span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </ForgePanel>
  );
}

function freshnessGrade(d: HalfLifeDoc): { tone: "fire" | "gold" | "steel"; label: string; bg: string; icon: typeof Flame } {
  if (d.status?.includes("CRITICAL") || d.freshness_score < 0.34)
    return { tone: "fire", label: "CRITICAL DANGER", bg: "border-destructive/60 bg-destructive/10", icon: Flame };
  if (d.status?.includes("STALE") || d.freshness_score < 0.67)
    return { tone: "gold", label: "STALE WARNING", bg: "border-primary/40 bg-primary/5", icon: FileWarning };
  return { tone: "steel", label: "FRESH", bg: "border-accent/50 bg-accent/5", icon: ShieldCheck };
}

function FreshnessHeatmap() {
  const q = useQuery({ queryKey: ["half-life"], queryFn: api.halfLife });
  const [filter, setFilter] = useState<"all" | "fresh" | "stale" | "critical">("all");

  const docs = q.data ?? [];
  const filtered = useMemo(
    () =>
      docs.filter((d) => {
        if (filter === "all") return true;
        const g = freshnessGrade(d).label.toLowerCase();
        return g.includes(filter);
      }),
    [docs, filter],
  );

  return (
    <ForgePanel className="p-5">
      <div className="flex items-center justify-between mb-3 flex-wrap gap-2">
        <div className="flex items-center gap-2">
          <Flame className="h-4 w-4 text-accent" />
          <h2 className="font-display uppercase tracking-wider text-lg">Knowledge Freshness Heatmap</h2>
        </div>
        <div className="flex gap-1 text-[11px] uppercase tracking-widest">
          {(["all", "fresh", "stale", "critical"] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-2 py-1 border ${filter === f ? "border-primary text-primary" : "border-border text-muted-foreground hover:text-foreground"}`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>
      {q.isLoading ? (
        <LoadingBlock />
      ) : (
        <div className="grid gap-2 sm:grid-cols-2">
          {filtered.map((d) => {
            const g = freshnessGrade(d);
            const Icon = g.icon;
            return (
              <div key={d.id} className={`border ${g.bg} p-3`}>
                <div className="flex items-center justify-between mb-1">
                  <Tag tone={g.tone}>{g.label}</Tag>
                  <Icon className={`h-4 w-4 ${g.tone === "fire" ? "text-destructive" : g.tone === "gold" ? "text-primary" : "text-accent"}`} />
                </div>
                <div className="font-display text-sm leading-tight mb-1">{d.title}</div>
                <div className="text-xs text-muted-foreground uppercase tracking-widest mb-2">
                  {d.engineer_author} · {d.hardware_generation}
                </div>
                <div className="grid grid-cols-3 gap-1 text-xs">
                  <Stat2 label="Age" value={`${d.age_years}y`} />
                  <Stat2 label="Refs" value={d.reference_count} />
                  <Stat2 label="Conflicts" value={d.contradiction_count} danger={d.contradiction_count > 0} />
                </div>
                <div className="mt-2 h-1 bg-muted/40 border border-border overflow-hidden">
                  <div
                    className="h-full"
                    style={{
                      width: `${Math.min(100, Math.max(0, d.freshness_score * 100))}%`,
                      background:
                        g.tone === "fire"
                          ? "oklch(0.65 0.24 28)"
                          : g.tone === "gold"
                          ? "oklch(0.80 0.14 85)"
                          : "oklch(0.65 0.18 165)",
                    }}
                  />
                </div>
              </div>
            );
          })}
          {filtered.length === 0 && (
            <div className="col-span-full text-sm text-muted-foreground text-center py-6">No documents match this filter.</div>
          )}
        </div>
      )}
    </ForgePanel>
  );
}

function Stat2({ label, value, danger }: { label: string; value: string | number; danger?: boolean }) {
  return (
    <div className="border border-border/60 px-1.5 py-1">
      <div className="text-muted-foreground uppercase tracking-widest text-[10px]">{label}</div>
      <div className={`font-counter tabular-nums text-xs ${danger ? "text-destructive" : "text-foreground"}`}>{value}</div>
    </div>
  );
}
