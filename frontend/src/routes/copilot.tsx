import { createFileRoute } from "@tanstack/react-router";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useEffect, useRef, useState } from "react";
import { api, type ChatResponse, type ConsensusResponse } from "@/lib/api";
import { PageHeader, ForgePanel, ErrorBlock, LoadingBlock, Tag, EquipmentTag } from "@/components/forge";
import { CognitiveRadar } from "@/components/cognitive-radar";
import { Send, Users, Sparkles, X } from "lucide-react";
import { toast } from "sonner";

type Search = { engineer?: string };

export const Route = createFileRoute("/copilot")({
  validateSearch: (s: Record<string, unknown>): Search => ({
    engineer: typeof s.engineer === "string" ? s.engineer : undefined,
  }),
  head: () => ({
    meta: [
      { title: "Expert Persona Copilot — DeadMind" },
      { name: "description", content: "Chat with a preserved engineer's cognitive twin. Grounded, cited, uncertainty-quantified." },
    ],
  }),
  component: Copilot,
});

interface Msg { role: "user" | "assistant"; text: string; meta?: ChatResponse; }

function uncertaintyTone(level: string): "fire" | "gold" | "steel" | "muted" {
  if (level === "HIGH") return "fire";
  if (level === "MEDIUM") return "gold";
  if (level === "LOW") return "steel";
  return "muted";
}

const SUGGESTIONS = [
  "How do you zero-span the positioner on B-101?",
  "Walk me through pre-startup checks for the V-205 vessel.",
  "What's the failure signature for P-302 cavitation?",
  "Compare overhaul approaches for C-104.",
];

function formatMarkdown(text: string) {
  return text.split("\n").map((line, idx) => {
    // Check if it's a numbered list item
    const match = line.match(/^(\d+)\.\s(.*)/);
    if (match) {
      const num = match[1];
      const rest = match[2];
      const restParts = rest.split(/(\*\*.*?\*\*)/g);
      const restContent = restParts.map((part, pIdx) => {
        if (part.startsWith("**") && part.endsWith("**")) {
          return <strong key={pIdx} className="font-semibold text-primary">{part.slice(2, -2)}</strong>;
        }
        return part;
      });
      return (
        <div key={idx} className="flex gap-2 my-1.5 pl-2">
          <span className="font-bold text-primary">{num}.</span>
          <div className="flex-1">{restContent}</div>
        </div>
      );
    }

    // Check if it's a bullet list item
    const bulletMatch = line.match(/^([*\-])\s(.*)/);
    if (bulletMatch) {
      const rest = bulletMatch[2];
      const restParts = rest.split(/(\*\*.*?\*\*)/g);
      const restContent = restParts.map((part, pIdx) => {
        if (part.startsWith("**") && part.endsWith("**")) {
          return <strong key={pIdx} className="font-semibold text-primary">{part.slice(2, -2)}</strong>;
        }
        return part;
      });
      return (
        <div key={idx} className="flex gap-2 my-1 pl-4">
          <span className="text-primary">•</span>
          <div className="flex-1">{restContent}</div>
        </div>
      );
    }

    // Standard paragraph line with potential inline bold text
    const parts = line.split(/(\*\*.*?\*\*)/g);
    const content = parts.map((part, pIdx) => {
      if (part.startsWith("**") && part.endsWith("**")) {
        return <strong key={pIdx} className="font-semibold text-primary">{part.slice(2, -2)}</strong>;
      }
      return part;
    });

    return (
      <div key={idx} className="min-h-[1.2em] my-1">
        {content}
      </div>
    );
  });
}

function Copilot() {
  const search = Route.useSearch();
  const navigate = Route.useNavigate();
  const engineersQ = useQuery({ queryKey: ["engineers"], queryFn: api.engineers });
  const [engineer, setEngineer] = useState<string>("");
  const [input, setInput] = useState("");
  const [msgs, setMsgs] = useState<Msg[]>([]);
  const [consensus, setConsensus] = useState<ConsensusResponse | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [mobileTab, setMobileTab] = useState<"chat" | "radar">("chat");

  useEffect(() => {
    if (!engineer) {
      const fromUrl = search.engineer;
      if (fromUrl) {
        setEngineer(fromUrl);
      } else if (engineersQ.data && engineersQ.data.length > 0) {
        const defaultEng = engineersQ.data.find(e => e.name.includes("Nayar")) || engineersQ.data[0];
        setEngineer(defaultEng.name);
      }
    }
  }, [search.engineer, engineersQ.data, engineer]);

  const chat = useMutation({
    mutationFn: ({ q, e }: { q: string; e: string }) => api.chat(q, e),
    onSuccess: (data) => setMsgs((m) => [...m, { role: "assistant", text: data.answer, meta: data }]),
    onError: (err) => {
      setMsgs((m) => [...m, { role: "assistant", text: `Error: ${err instanceof Error ? err.message : String(err)}` }]);
      toast.error(err instanceof Error ? err.message : "Consultation failed");
    },
  });

  const cons = useMutation({
    mutationFn: ({ q, e }: { q: string; e: string }) => api.consensus(q, e),
    onSuccess: (d) => setConsensus(d),
  });

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [msgs, chat.isPending]);

  if (engineersQ.isError) return <ErrorBlock error={engineersQ.error} />;
  if (engineersQ.isLoading) {
    return (
      <div className="p-6">
        <LoadingBlock label="Reconstructing expert cognitive twin interfaces..." />
      </div>
    );
  }

  const engObj = (engineersQ.data ?? []).find((e) => e.name === engineer);

  function send(query?: string) {
    const q = (query ?? input).trim();
    if (!q || !engineer || chat.isPending) return;
    setMsgs((m) => [...m, { role: "user", text: q }]);
    chat.mutate({ q, e: engineer });
    if (!query) setInput("");
  }

  function arbitrate() {
    const lastUser = [...msgs].reverse().find((m) => m.role === "user");
    const q = input.trim() || lastUser?.text || SUGGESTIONS[0];
    if (!engineer) return;
    cons.mutate({ q, e: engineer });
  }

  return (
    <div className="flex flex-col h-[calc(100vh-7rem)] max-md:h-[calc(100vh-9.5rem)]">
      <PageHeader
        eyebrow="Technician View"
        title="Expert Persona Copilot"
        description="Grounded Q&A with preserved engineer minds. Citations, uncertainty, and cross-bench consensus."
      />

      {/* Mobile Tab Switcher */}
      <div className="lg:hidden flex border-b border-border bg-card font-display text-[10px] uppercase tracking-wider">
        <button
          type="button"
          onClick={() => setMobileTab("chat")}
          className={`flex-1 py-3 text-center border-r border-border transition-colors cursor-pointer ${
            mobileTab === "chat" ? "bg-accent/10 text-primary font-semibold" : "text-muted-foreground"
          }`}
        >
          Chat Console
        </button>
        <button
          type="button"
          onClick={() => setMobileTab("radar")}
          className={`flex-1 py-3 text-center transition-colors cursor-pointer ${
            mobileTab === "radar" ? "bg-accent/10 text-primary font-semibold" : "text-muted-foreground"
          }`}
        >
          Preserved Mind Info
        </button>
      </div>

      <div className="flex-1 grid grid-cols-1 lg:grid-cols-[320px_1fr] gap-px bg-border overflow-hidden">
        {/* LEFT: Radar + engineer selector */}
        <div className={`bg-background p-4 overflow-y-auto ${mobileTab === "radar" ? "block" : "hidden lg:block"}`}>
          <div className="section-label mb-2">Engineer</div>
          <select
            value={engineer}
            onChange={(ev) => {
              const v = ev.target.value;
              setEngineer(v);
              setMsgs([]);
              setConsensus(null);
              navigate({ search: { engineer: v } });
            }}
            className="w-full bg-popover border border-border text-foreground font-display uppercase tracking-wider text-sm px-3 py-2 rounded-none mb-4 appearance-none cursor-pointer focus:border-primary pr-8 bg-[url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%23FFD500%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E')] bg-[length:10px] bg-[position:right_12px_center] bg-no-repeat"
            aria-label="Select engineer persona to consult"
          >
            {(engineersQ.data ?? []).map((e) => (
              <option key={e.name} value={e.name}>{e.name}</option>
            ))}
          </select>

          {engObj ? (
            <>
              <div className="text-xs text-muted-foreground mb-1">{engObj.role}</div>
              <div className="flex items-center gap-2 mb-3">
                <Tag tone="gold">retires {engObj.retirement_year}</Tag>
                <Tag tone={engObj.risk_score > 70 ? "fire" : "steel"}>risk {engObj.risk_score}</Tag>
              </div>
              <ForgePanel className="p-3 flex justify-center">
                <CognitiveRadar
                  scores={{
                    systematic: engObj.cognitive_systematic,
                    intuitive: engObj.cognitive_intuitive,
                    mechanical: engObj.cognitive_mechanical,
                    electrical: engObj.cognitive_electrical,
                    instrumentation: engObj.cognitive_instrumentation,
                    process: engObj.cognitive_process,
                  }}
                />
              </ForgePanel>
              <div className="mt-3 space-y-1.5">
                {[
                  ["Systematic", engObj.cognitive_systematic],
                  ["Intuitive", engObj.cognitive_intuitive],
                  ["Mechanical", engObj.cognitive_mechanical],
                  ["Electrical", engObj.cognitive_electrical],
                  ["Instrumentation", engObj.cognitive_instrumentation],
                  ["Process", engObj.cognitive_process],
                ].map(([l, v]) => (
                  <div key={l as string} className="flex items-center gap-2 text-xs">
                    <span className="w-32 uppercase tracking-wider text-muted-foreground">{l}</span>
                    <div className="flex-1 h-1.5 bg-muted/40 border border-border">
                      <div className="h-full bg-primary" style={{ width: `${v}%` }} />
                    </div>
                    <span className="font-counter w-6 text-right tabular-nums text-primary">{v}</span>
                  </div>
                ))}
              </div>
              <div className="section-label mt-4 mb-1">Specialties</div>
              <div className="flex flex-wrap gap-1">
                {engObj.specialties.split(",").map((s) => (
                  <Tag key={s} tone="muted">{s.trim()}</Tag>
                ))}
              </div>
            </>
          ) : (
            <LoadingBlock />
          )}
        </div>

        {/* RIGHT: Chat */}
        <div className={`bg-background flex flex-col relative min-h-0 h-full overflow-hidden ${mobileTab === "chat" ? "flex" : "hidden lg:flex"}`}>
          <div className="px-6 py-2 border-b border-border bg-sidebar/20 flex items-center justify-between">
            <span className="section-label">Active Session: {engineer}</span>
            {msgs.length > 0 && (
              <button
                type="button"
                onClick={() => {
                  setMsgs([]);
                  setConsensus(null);
                  toast.success("Chat history cleared");
                }}
                className="text-[10px] uppercase font-mono tracking-wider border border-border px-2 py-0.5 hover:bg-destructive/10 hover:text-destructive transition-colors cursor-pointer"
              >
                Clear Chat
              </button>
            )}
          </div>
          <div ref={scrollRef} className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
            {msgs.length === 0 && (
              <ForgePanel className="p-6 text-sm text-muted-foreground flex flex-col items-start gap-3">
                <p>Ask {engineer || "the expert"} how they'd handle a failure pattern, a calibration, or a procedure.</p>
                <button
                  type="button"
                  onClick={() => send("How do you zero-span the positioner on B-101?")}
                  className="bg-primary/20 border border-primary text-primary px-3 py-1.5 text-xs font-mono uppercase hover:bg-primary/30 transition-colors cursor-pointer"
                >
                  ⚡ Try a prompt: "How do you zero-span the positioner on B-101?"
                </button>
              </ForgePanel>
            )}
            {msgs.map((m, i) =>
              m.role === "user" ? (
                <div key={i} className="flex justify-end">
                  <div className="max-w-[80%] bg-primary text-primary-foreground px-4 py-2 rounded-sm font-medium">{m.text}</div>
                </div>
              ) : (
                <div key={i} className="max-w-3xl">
                  <div className="bg-muted/30 border border-border p-4">
                    <div className="text-xs section-label mb-2">{m.meta?.engineer ?? engineer}</div>
                    <div className="whitespace-pre-wrap text-foreground leading-relaxed">{formatMarkdown(m.text)}</div>
                    {m.meta && (
                      <>
                        <div className="mt-3">
                          <div className="flex items-center justify-between text-xs mb-1">
                            <span className="section-label">Grounding confidence</span>
                            <span className="font-counter tabular-nums text-primary">{m.meta.confidence}%</span>
                          </div>
                          <div className="h-1.5 bg-muted/40 border border-border">
                            <div className="h-full bg-primary" style={{ width: `${m.meta.confidence}%` }} />
                          </div>
                        </div>
                        {m.meta.related_context.length > 0 && (
                          <div className="mt-3 text-xs">
                            <span className="section-label">Cross-links:</span>{" "}
                            <span className="text-foreground">{m.meta.related_context.join(", ")}</span>
                          </div>
                        )}
                        <div className="mt-3 grid gap-3 md:grid-cols-2">
                          <div className="border border-border p-3">
                            <div className="section-label mb-2">Citations</div>
                            {m.meta.citations.length === 0 ? (
                              <div className="text-xs text-muted-foreground">No citations returned.</div>
                            ) : (
                              <ul className="space-y-1 text-xs">
                                {m.meta.citations.map((c) => (
                                  <li key={c.id} className="flex items-center gap-2 flex-wrap">
                                    <EquipmentTag tag={c.equipment_tag} />
                                    <span className="text-foreground">{c.title}</span>
                                    <span className="text-muted-foreground">· {c.author}</span>
                                  </li>
                                ))}
                              </ul>
                            )}
                          </div>
                          <div className="border border-border p-3">
                            <div className="section-label mb-2">Epistemic Uncertainty · risk {m.meta.uncertainty.risk_score}</div>
                            <div className="grid grid-cols-2 gap-2 text-xs">
                              {(["sparsity", "staleness", "disagreement", "causal"] as const).map((k) => (
                                <div key={k} className="flex items-center justify-between border border-border/60 px-2 py-1">
                                  <span className="uppercase tracking-wider text-muted-foreground">{k}</span>
                                  <Tag tone={uncertaintyTone(m.meta!.uncertainty[k])}>{m.meta!.uncertainty[k]}</Tag>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              ),
            )}
            {chat.isPending && <LoadingBlock label={`${engineer} is reconstructing…`} />}
          </div>

          {consensus && (
            <div className="absolute inset-x-0 bottom-[64px] mx-4 mb-4 animate-fade-in z-10">
              <ForgePanel className="p-4 border-primary/60 shadow-2xl bg-card/95 backdrop-blur">
                <button onClick={() => setConsensus(null)} className="absolute top-3 right-3 text-muted-foreground hover:text-foreground">
                  <X className="h-4 w-4" />
                </button>
                <div className="flex items-center gap-2 mb-2">
                  <Users className="h-4 w-4 text-primary" />
                  <span className="font-display uppercase tracking-wider text-sm">Consensus Panel</span>
                </div>
                <div className="text-sm text-foreground leading-relaxed mb-2">{formatMarkdown(consensus.consensus)}</div>
                <p className="mt-2 text-xs text-muted-foreground"><strong className="text-foreground">Agreement:</strong> {consensus.agreement}</p>
                <p className="mt-1 text-xs text-destructive"><strong>Dissent:</strong> {consensus.dissent}</p>
                <div className="mt-3 grid gap-1.5">
                  {Object.entries(consensus.weights).map(([n, w]) => (
                    <div key={n} className="flex items-center gap-2 text-xs">
                      <span className="w-32">{n}</span>
                      <div className="flex-1 h-1.5 bg-muted/40 border border-border">
                        <div className="h-full bg-primary" style={{ width: `${w}%` }} />
                      </div>
                      <span className="font-counter w-8 text-right tabular-nums text-primary">{w}</span>
                    </div>
                  ))}
                </div>
              </ForgePanel>
            </div>
          )}

          <div className="border-t border-border bg-sidebar/40 p-3">
            <div className="flex flex-wrap gap-1.5 mb-2">
              {SUGGESTIONS.map((s) => (
                <button
                  key={s}
                  onClick={() => send(s)}
                  className="text-[0.7rem] uppercase tracking-wider border border-border px-2 py-1 hover:border-primary hover:text-primary text-muted-foreground transition-colors"
                  aria-label={`Ask suggestion: ${s}`}
                >
                  {s}
                </button>
              ))}
            </div>
            <form
              onSubmit={(e) => { e.preventDefault(); send(); }}
              className="flex gap-2"
            >
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={`Ask ${engineer || "the expert"}…`}
                className="flex-1 bg-popover border border-border text-foreground px-3 py-2 rounded-none focus:outline-none focus:border-primary"
                aria-label="Consultation query input"
              />
              <button
                type="button"
                onClick={arbitrate}
                disabled={cons.isPending || !engineer}
                className="bg-transparent border border-primary/60 text-primary px-3 py-2 font-display uppercase tracking-wider text-xs hover:bg-primary/10 disabled:opacity-40 flex items-center gap-1.5"
                aria-label="Request consensus view on query"
              >
                <Users className="h-4 w-4" /> {cons.isPending ? "Weighing…" : "Consensus"}
              </button>
              <button
                type="submit"
                disabled={chat.isPending || !engineer || !input.trim()}
                className="bg-primary text-primary-foreground px-4 py-2 font-display uppercase tracking-wider text-sm hover:bg-primary/90 disabled:opacity-40 flex items-center gap-1.5"
                aria-label="Submit query to expert"
              >
                <Send className="h-4 w-4" /> Consult
              </button>
            </form>
            {cons.isError && <div className="text-xs text-destructive mt-1">{(cons.error as Error).message}</div>}
            {!engObj && engineer && <div className="text-xs text-muted-foreground mt-1 flex items-center gap-1"><Sparkles className="h-3 w-3" /> Loading expert…</div>}
          </div>
        </div>
      </div>
    </div>
  );
}
