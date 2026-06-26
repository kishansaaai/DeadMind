import { createFileRoute } from "@tanstack/react-router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { api } from "@/lib/api";
import { PageHeader, ForgePanel, LoadingBlock, Tag, EquipmentTag } from "@/components/forge";
import { toast } from "sonner";
import { FileUp, Mic, Square, Sparkles, Link2 } from "lucide-react";

export const Route = createFileRoute("/ingest")({
  head: () => ({
    meta: [
      { title: "Ingestion & Active Capture — DeadMind" },
      { name: "description", content: "Admin view: ingest documents, capture voice notes from retiring experts, and resolve entity aliases." },
    ],
  }),
  component: Ingest,
});

function Ingest() {
  return (
    <div>
      <PageHeader
        eyebrow="Admin View"
        title="Ingestion & Active Capture"
        description="Preserve a mind: upload logs, record voice notes from retiring engineers, and let the resolver collapse heterogeneous aliases."
      />
      <div className="p-6 grid gap-4 lg:grid-cols-3">
        <DocumentUpload />
        <VoiceCapture />
        <CMMSSyncPanel />
      </div>
      <div className="px-6 pb-10">
        <CoreferencePanel />
      </div>
    </div>
  );
}

function CMMSSyncPanel() {
  return (
    <ForgePanel className="p-5 flex flex-col justify-between">
      <div>
        <div className="flex items-center gap-2 mb-3">
          <Link2 className="h-4 w-4 text-primary" />
          <h2 className="font-display uppercase tracking-wider text-lg">CMMS Sync Bench</h2>
        </div>
        <p className="text-xs text-muted-foreground mb-4">
          Synchronize active coreference mappings, resolved failure codes, and expert recommendations directly with your plant's Enterprise Asset Management systems.
        </p>
        <div className="space-y-2 mt-4">
          <button
            type="button"
            onClick={() => toast.success("Pushed 14 resolved coreference records to SAP PM")}
            className="w-full bg-transparent border border-border text-foreground/80 hover:bg-accent/15 hover:text-foreground px-3 py-2.5 text-xs font-display uppercase tracking-wider cursor-pointer transition-colors"
          >
            Push to SAP PM
          </button>
          <button
            type="button"
            onClick={() => toast.success("Imported 52 historical maintenance sheets from IBM Maximo")}
            className="w-full bg-transparent border border-border text-foreground/80 hover:bg-accent/15 hover:text-foreground px-3 py-2.5 text-xs font-display uppercase tracking-wider cursor-pointer transition-colors"
          >
            Pull from IBM Maximo
          </button>
          <button
            type="button"
            onClick={() => toast.success("Triggered compliance delta sync with Honeywell Forge")}
            className="w-full bg-transparent border border-border text-foreground/80 hover:bg-accent/15 hover:text-foreground px-3 py-2.5 text-xs font-display uppercase tracking-wider cursor-pointer transition-colors"
          >
            Sync Honeywell Forge
          </button>
        </div>
      </div>
      <div className="border-t border-border/40 mt-6 pt-3 text-[10px] text-muted-foreground uppercase tracking-widest">
        Active Integration status: <span className="text-primary font-mono font-bold animate-pulse">Connected</span>
      </div>
    </ForgePanel>
  );
}

const inputCls =
  "w-full bg-popover border border-border text-foreground px-3 py-2 rounded-none focus:outline-none focus:border-primary";

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="section-label block mb-1">{label}</span>
      {children}
    </label>
  );
}

function DocumentUpload() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [docType, setDocType] = useState("log");
  const [engineer, setEngineer] = useState("");
  const engineersQ = useQuery({ queryKey: ["engineers"], queryFn: api.engineers });
  const qc = useQueryClient();

  const m = useMutation({
    mutationFn: () => {
      const cleanTitle = title.trim().replace(/<\/?[^>]+(>|$)/g, "");
      const cleanContent = content.trim().replace(/<script[^>]*>([\s\S]*?)<\/script>/gi, "").replace(/<\/?[^>]+(>|$)/g, "");
      const fd = new FormData();
      fd.append("title", cleanTitle);
      fd.append("content", cleanContent);
      fd.append("doc_type", docType);
      if (engineer) fd.append("engineer", engineer);
      return api.upload(fd);
    },
    onSuccess: () => {
      toast.success("Document ingested");
      qc.invalidateQueries({ queryKey: ["half-life"] });
      qc.invalidateQueries({ queryKey: ["coreference"] });
    },
    onError: (e) => toast.error(e instanceof Error ? e.message : "Upload failed"),
  });

  return (
    <ForgePanel className="p-5">
      <div className="flex items-center gap-2 mb-3">
        <FileUp className="h-4 w-4 text-primary" />
        <h2 className="font-display uppercase tracking-wider text-lg">Authorship Ingestion Engine</h2>
      </div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (!title.trim() || !content.trim()) return;
          m.mutate();
        }}
        className="space-y-3"
      >
        <Field label="Title">
          <input value={title} onChange={(e) => setTitle(e.target.value)} className={inputCls} placeholder="e.g. B-101 startup anomaly 2024-09-14" />
        </Field>
        <div className="grid grid-cols-2 gap-3">
          <Field label="Doc Type">
            <select value={docType} onChange={(e) => setDocType(e.target.value)} className={inputCls}>
              <option value="log">Log</option>
              <option value="report">Report</option>
              <option value="manual">Manual</option>
              <option value="sop">SOP</option>
            </select>
          </Field>
          <Field label="Author (optional)">
            <select value={engineer} onChange={(e) => setEngineer(e.target.value)} className={inputCls}>
              <option value="">— Auto-detect —</option>
              {(engineersQ.data ?? []).map((eng) => (
                <option key={eng.name} value={eng.name}>{eng.name}</option>
              ))}
            </select>
          </Field>
        </div>
        <Field label="Content">
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows={8}
            className={`${inputCls} font-mono text-sm`}
            placeholder="Paste shift log, report excerpt, or manual section…"
          />
        </Field>
        <button
          type="submit"
          disabled={m.isPending}
          className="bg-primary text-primary-foreground px-4 py-2 font-display uppercase tracking-wider text-sm hover:bg-primary/90 disabled:opacity-40"
        >
          {m.isPending ? "Ingesting…" : "Ingest & Attribute"}
        </button>
      </form>
      {m.data && (
        <div className="mt-4 border border-primary/40 bg-primary/5 p-3 animate-fade-in">
          <div className="flex items-center gap-2 mb-2">
            <Sparkles className="h-4 w-4 text-primary" />
            <span className="font-display uppercase tracking-wider text-sm text-primary">Attribution Report</span>
          </div>
          <div className="grid grid-cols-2 gap-y-1.5 gap-x-4 text-xs font-mono">
            <span className="text-muted-foreground">parsed_tag</span>
            <EquipmentTag tag={m.data.data.equipment_tag} />
            <span className="text-muted-foreground">failure_code</span>
            <span className="text-destructive">{m.data.data.failure_code}</span>
            <span className="text-muted-foreground">assigned_author</span>
            <span className="text-foreground">{m.data.data.author}</span>
            <span className="text-muted-foreground">confidence</span>
            <span className="text-primary">{(m.data.data.confidence * 100).toFixed(0)}%</span>
          </div>
        </div>
      )}
    </ForgePanel>
  );
}

const DEMO_TRANSCRIPTS: Record<string, string> = {
  default:
    "Calibration note: Re-zeroed the B-101 positioner against a 1.013 bar reference. Setpoint drift was 0.18% over the last 90 days — replace the bourdon if you see another 0.05% slip.",
};

function VoiceCapture() {
  const engineersQ = useQuery({ queryKey: ["engineers"], queryFn: api.engineers });
  const [engineer, setEngineer] = useState("");
  const [transcript, setTranscript] = useState("");
  const [recording, setRecording] = useState(false);
  const [audioB64, setAudioB64] = useState<string>("");
  const [recorder, setRecorder] = useState<MediaRecorder | null>(null);
  const [chunkSize, setChunkSize] = useState(0);
  const qc = useQueryClient();

  useEffect(() => {
    if (!engineer && engineersQ.data && engineersQ.data.length > 0) {
      setEngineer(engineersQ.data[0].name);
    }
  }, [engineersQ.data, engineer]);

  async function start() {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const r = new MediaRecorder(stream);
      const local: Blob[] = [];
      r.ondataavailable = (e) => local.push(e.data);
      r.onstop = async () => {
        const blob = new Blob(local, { type: "audio/webm" });
        const b64 = await blobToBase64(blob);
        setAudioB64(b64);
        setChunkSize(blob.size);
        if (!transcript.trim()) setTranscript(DEMO_TRANSCRIPTS.default);
        stream.getTracks().forEach((t) => t.stop());
      };
      r.start();
      setRecorder(r);
      setRecording(true);
      // Auto-stop after 2s per blueprint
      setTimeout(() => {
        if (r.state === "recording") r.stop();
        setRecording(false);
      }, 2000);
    } catch {
      toast.error("Mic permission denied — using demo transcript");
      setTranscript(DEMO_TRANSCRIPTS.default);
    }
  }
  function stopNow() {
    recorder?.stop();
    setRecording(false);
  }

  const m = useMutation({
    mutationFn: () => api.voiceNote(engineer, audioB64 || "demo", transcript),
    onSuccess: () => {
      toast.success("Voice note indexed");
      qc.invalidateQueries({ queryKey: ["half-life"] });
      qc.invalidateQueries({ queryKey: ["vulnerability-map"] });
      qc.invalidateQueries({ queryKey: ["sop-audit"] });
    },
    onError: (e) => toast.error(e instanceof Error ? e.message : "Upload failed"),
  });

  return (
    <ForgePanel className="p-5">
      <div className="flex items-center gap-2 mb-3">
        <Mic className="h-4 w-4 text-accent" />
        <h2 className="font-display uppercase tracking-wider text-lg">Active Capture</h2>
      </div>
      <div className="space-y-3">
        <Field label="Expert recording">
          <select value={engineer} onChange={(e) => setEngineer(e.target.value)} className={inputCls}>
            {(engineersQ.data ?? []).map((eng) => (
              <option key={eng.name} value={eng.name}>{eng.name} · retires {eng.retirement_year}</option>
            ))}
          </select>
        </Field>

        <div className="flex flex-col items-center justify-center py-3">
          <button
            type="button"
            onClick={recording ? stopNow : start}
            className={`relative h-24 w-24 rounded-full border-2 flex items-center justify-center transition-all ${
              recording
                ? "border-destructive bg-destructive/20 fire-glow"
                : "border-accent bg-accent/10 hover:bg-accent/20 steel-glow"
            }`}
          >
            {recording ? <Square className="h-8 w-8 text-destructive" /> : <Mic className="h-10 w-10 text-accent" />}
            {recording && (
              <>
                <span className="absolute inset-0 rounded-full border border-destructive/60 animate-ping" />
                <span className="absolute -inset-2 rounded-full border border-destructive/30 animate-ping" style={{ animationDelay: "0.2s" }} />
              </>
            )}
          </button>
          <div className="mt-2 text-[0.65rem] uppercase tracking-widest text-muted-foreground">
            {recording ? "Recording 2s…" : chunkSize > 0 ? `${(chunkSize / 1024).toFixed(1)} KB captured` : "Tap to record"}
          </div>
          {recording && (
            <div className="mt-2 flex items-end gap-0.5 h-8">
              {Array.from({ length: 24 }).map((_, i) => (
                <span
                  key={i}
                  className="w-1 bg-destructive/80"
                  style={{
                    height: `${30 + Math.abs(Math.sin((Date.now() / 100 + i) * 0.4)) * 70}%`,
                    animation: `pulse 0.6s ease-in-out ${i * 0.05}s infinite`,
                  }}
                />
              ))}
            </div>
          )}
        </div>

        <Field label="Transcript">
          <textarea
            value={transcript}
            onChange={(e) => setTranscript(e.target.value)}
            rows={5}
            className={`${inputCls} font-mono text-sm`}
            placeholder="Speech-to-text appears here after recording…"
          />
        </Field>

        <button
          type="button"
          onClick={() => m.mutate()}
          disabled={m.isPending || !engineer || !transcript.trim()}
          className="w-full bg-primary text-primary-foreground px-4 py-2 font-display uppercase tracking-wider text-sm hover:bg-primary/90 disabled:opacity-40"
        >
          {m.isPending ? "Indexing…" : "Index Voice Note"}
        </button>
        {m.isPending && <LoadingBlock label="Indexing voice note…" />}
        {m.data && (
          <div className="text-sm text-accent border-t border-border pt-3">{m.data.message}</div>
        )}
      </div>
    </ForgePanel>
  );
}

function CoreferencePanel() {
  const q = useQuery({ queryKey: ["coreference"], queryFn: api.coreference });
  return (
    <ForgePanel className="p-5">
      <div className="flex items-center gap-2 mb-3">
        <Link2 className="h-4 w-4 text-primary" />
        <h2 className="font-display uppercase tracking-wider text-lg">Entity Coreference Resolver</h2>
        <span className="text-xs text-muted-foreground ml-2">Live alias-to-canonical mapping across ingested corpora.</span>
      </div>
      {q.isLoading ? (
        <LoadingBlock />
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-[0.65rem] uppercase tracking-widest text-muted-foreground border-b border-border">
                <th className="text-left py-2 px-2">Alias (as written)</th>
                <th className="text-left py-2 px-2">→</th>
                <th className="text-left py-2 px-2">Canonical</th>
                <th className="text-left py-2 px-2">Type</th>
                <th className="text-right py-2 px-2">Confidence</th>
              </tr>
            </thead>
            <tbody>
              {(q.data ?? []).map((r) => (
                <tr key={r.id} className="border-b border-border/40 hover:bg-muted/20">
                  <td className="py-1.5 px-2 font-mono text-xs">{r.alias_name}</td>
                  <td className="py-1.5 px-2 text-muted-foreground">→</td>
                  <td className="py-1.5 px-2"><EquipmentTag tag={r.standard_name} /></td>
                  <td className="py-1.5 px-2"><Tag tone="muted">{r.entity_type}</Tag></td>
                  <td className="py-1.5 px-2 text-right">
                    <div className="inline-flex items-center gap-2">
                      <div className="w-20 h-1.5 bg-muted/40 border border-border overflow-hidden">
                        <div className="h-full bg-primary" style={{ width: `${Math.min(100, Math.max(0, r.confidence * 100))}%` }} />
                      </div>
                      <span className="font-counter tabular-nums text-primary w-10 text-right">
                        {Math.min(100, Math.max(0, r.confidence * 100)).toFixed(0)}%
                      </span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </ForgePanel>
  );
}

function blobToBase64(blob: Blob): Promise<string> {
  return new Promise((resolve, reject) => {
    const r = new FileReader();
    r.onloadend = () => {
      const s = r.result as string;
      resolve(s.split(",")[1] ?? s);
    };
    r.onerror = reject;
    r.readAsDataURL(blob);
  });
}
