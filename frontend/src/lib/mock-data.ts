// Realistic mock fixtures used when the live DeadMind backend is unreachable.
// This makes the entire UI render and demo-able in the Lovable preview without
// requiring a local backend on http://localhost:8000.

import type {
  Engineer,
  VulnNode,
  ChatResponse,
  ConsensusResponse,
  CausalLink,
  Counterfactual,
  Coreference,
  NetworkRow,
  SopRow,
  HalfLifeDoc,
  ShiftAnalysis,
  SemanticPoint,
  UploadResponse,
} from "./api";

const ENGINEERS: Engineer[] = [
  { name: "R. Krishnan", role: "Chief Mechanical Engineer", status: "ACTIVE", retirement_date: "2027-06-30", retirement_year: 2027, avatar: "RK", risk_score: 0.92, specialties: "Compressors;Turbines;Vibration", cognitive_systematic: 0.95, cognitive_intuitive: 0.62, cognitive_mechanical: 0.98, cognitive_electrical: 0.30, cognitive_instrumentation: 0.55, cognitive_process: 0.70 },
  { name: "S. Iyer", role: "Instrumentation Lead", status: "ACTIVE", retirement_date: "2029-12-31", retirement_year: 2029, avatar: "SI", risk_score: 0.78, specialties: "DCS;Loops;Calibration", cognitive_systematic: 0.88, cognitive_intuitive: 0.70, cognitive_mechanical: 0.40, cognitive_electrical: 0.75, cognitive_instrumentation: 0.97, cognitive_process: 0.62 },
  { name: "M. Pillai", role: "Process Veteran", status: "ACTIVE", retirement_date: "2026-09-15", retirement_year: 2026, avatar: "MP", risk_score: 0.96, specialties: "Distillation;Heat Exchange;Startup", cognitive_systematic: 0.70, cognitive_intuitive: 0.95, cognitive_mechanical: 0.55, cognitive_electrical: 0.35, cognitive_instrumentation: 0.60, cognitive_process: 0.99 },
  { name: "A. Banerjee", role: "Electrical Authority", status: "ACTIVE", retirement_date: "2031-03-20", retirement_year: 2031, avatar: "AB", risk_score: 0.55, specialties: "HV Switchgear;Motors;Relay", cognitive_systematic: 0.92, cognitive_intuitive: 0.55, cognitive_mechanical: 0.45, cognitive_electrical: 0.98, cognitive_instrumentation: 0.62, cognitive_process: 0.40 },
  { name: "V. Subramanian", role: "Reliability Engineer", status: "ACTIVE", retirement_date: "2033-08-10", retirement_year: 2033, avatar: "VS", risk_score: 0.42, specialties: "RCA;FMEA;Predictive", cognitive_systematic: 0.96, cognitive_intuitive: 0.78, cognitive_mechanical: 0.80, cognitive_electrical: 0.55, cognitive_instrumentation: 0.72, cognitive_process: 0.75 },
  { name: "T. Nair", role: "Rotating Equipment Specialist", status: "ACTIVE", retirement_date: "2028-04-01", retirement_year: 2028, avatar: "TN", risk_score: 0.81, specialties: "Pumps;Seals;Bearings", cognitive_systematic: 0.78, cognitive_intuitive: 0.82, cognitive_mechanical: 0.95, cognitive_electrical: 0.32, cognitive_instrumentation: 0.50, cognitive_process: 0.60 },
];

const NODES: VulnNode[] = [
  { tag: "C-104", name: "Recycle Compressor", process_area: "Hydrogen Loop", x: 180, y: 200, criticality: "High", downtime_cost: 42000000, active_engineers: [{ name: "R. Krishnan", retirement_year: 2027 }, { name: "T. Nair", retirement_year: 2028 }], retired_engineers: [], risk_level: "MEDIUM", color: "yellow" },
  { tag: "B-101", name: "HP Steam Boiler", process_area: "Utilities", x: 460, y: 140, criticality: "High", downtime_cost: 68000000, active_engineers: [{ name: "S. Iyer", retirement_year: 2029 }], retired_engineers: [], risk_level: "MEDIUM", color: "yellow" },
  { tag: "V-205", name: "Reactor Vessel", process_area: "Reaction Section", x: 720, y: 230, criticality: "High", downtime_cost: 95000000, active_engineers: [{ name: "M. Pillai", retirement_year: 2026 }], retired_engineers: [], risk_level: "HIGH", color: "red" },
  { tag: "E-310", name: "Feed/Effluent HX", process_area: "Reaction Section", x: 560, y: 360, criticality: "Medium", downtime_cost: 18000000, active_engineers: [{ name: "V. Subramanian", retirement_year: 2033 }, { name: "M. Pillai", retirement_year: 2026 }], retired_engineers: [], risk_level: "LOW", color: "green" },
  { tag: "P-302", name: "Reflux Pump A", process_area: "Distillation", x: 320, y: 420, criticality: "Medium", downtime_cost: 9500000, active_engineers: [{ name: "T. Nair", retirement_year: 2028 }], retired_engineers: [], risk_level: "MEDIUM", color: "yellow" },
  { tag: "T-401", name: "Main Fractionator", process_area: "Distillation", x: 820, y: 460, criticality: "High", downtime_cost: 120000000, active_engineers: [{ name: "M. Pillai", retirement_year: 2026 }, { name: "V. Subramanian", retirement_year: 2033 }], retired_engineers: [], risk_level: "MEDIUM", color: "yellow" },
  { tag: "K-501", name: "MV Switchgear", process_area: "Electrical", x: 140, y: 460, criticality: "High", downtime_cost: 32000000, active_engineers: [{ name: "A. Banerjee", retirement_year: 2031 }], retired_engineers: [], risk_level: "LOW", color: "green" },
  { tag: "D-220", name: "Knockout Drum", process_area: "Reaction Section", x: 660, y: 80, criticality: "Medium", downtime_cost: 7800000, active_engineers: [], retired_engineers: [{ name: "Legacy Owner", retirement_year: 2024 }], risk_level: "HIGH", color: "red" },
];

const CHAT_ANSWERS: Record<string, string> = {
  default:
    "The procedure begins with isolation lockouts at both block valves. I always verify the local pressure indicator reads zero before breaking any flange — never trust the DCS alone. The torque sequence on the casing bolts matters: cross-pattern, 30% / 60% / 100%, and re-check after one heat cycle. The plant's been running these units since '98 and the one trap to avoid is over-tightening the gland; you'll warp the housing and chase a phantom leak for weeks.",
  zerospan:
    "For the B-101 positioner zero-span: stroke the valve fully closed at 4 mA, confirm mechanical seat, then drive to 20 mA and verify full lift. The cam follower has a known tendency to drift after thermal cycling — re-check after 48 hours of steady state. If you see hysteresis above 1.5%, the bushing is worn; we replace, not adjust.",
  cavitation:
    "P-302 cavitation almost always starts at the suction strainer. Watch for a 5–8% drop in discharge pressure with rising motor amps — that's the signature. The reflux drum level controller is touchy; a tight tuning band masks it. I'd pull the strainer first, inspect the impeller eye for pitting, and verify NPSH margin against the latest curve, not the nameplate.",
};

function mockChat(query: string, engineer: string): ChatResponse {
  const q = query.toLowerCase();
  let answer = CHAT_ANSWERS.default;
  if (q.includes("zero") || q.includes("span") || q.includes("positioner")) answer = CHAT_ANSWERS.zerospan;
  else if (q.includes("cavit") || q.includes("p-302") || q.includes("pump")) answer = CHAT_ANSWERS.cavitation;
  return {
    answer,
    engineer: engineer || "R. Krishnan",
    confidence: 0.82,
    citations: [
      { id: 11, title: "Shift Log 2019-04-22 — C-104 Trip", author: engineer || "R. Krishnan", equipment_tag: "C-104", failure_code: "VIB-HIGH" },
      { id: 27, title: "Overhaul Report 2021", author: "T. Nair", equipment_tag: "P-302", failure_code: "CAV-01" },
      { id: 38, title: "Startup Procedure SOP-114", author: "M. Pillai", equipment_tag: "V-205", failure_code: "—" },
    ],
    related_context: [
      "Vibration trend 2018–2024 indicates progressive bearing wear",
      "Two prior cavitation events on sister pump P-302B (2020, 2022)",
      "Pillai's note on heat-soak interval contradicts the OEM manual",
    ],
    uncertainty: { sparsity: "LOW", staleness: "MEDIUM", disagreement: "LOW", causal: "MEDIUM", risk_score: 0.34 },
  };
}

const CAUSAL: Record<string, CausalLink[]> = {
  default: [
    { id: 1, equipment_tag: "C-104", parent_event: "Lube oil temp rise", child_event: "Bearing whirl", is_prediction: 0, description: "Sustained 8°C rise over 72h preceded the 2019 trip." },
    { id: 2, equipment_tag: "C-104", parent_event: "Bearing whirl", child_event: "Vibration alarm", is_prediction: 0, description: "Whirl frequency at 0.42x running speed." },
    { id: 3, equipment_tag: "C-104", parent_event: "Vibration alarm", child_event: "Forecast trip in 14 days", is_prediction: 1, description: "If oil temp trends repeat, expect trip mid-month." },
  ],
};

const COUNTERFACTUALS: Record<string, Counterfactual[]> = {
  default: [
    { id: 1, equipment_tag: "C-104", title: "What if Krishnan retires without succession?", intervention: "No knowledge transfer to backup; rely on OEM hotline.", cost_avoided_crore: 4.2, consequences: "14-day unplanned outage; OEM dispatch from Germany; lost margin on hydrogen recycle; reputational hit with regulator" },
    { id: 2, equipment_tag: "C-104", title: "What if voice notes were captured weekly?", intervention: "Structured 2-min weekly recording on standing anomalies.", cost_avoided_crore: 1.8, consequences: "Earlier detection of oil-temp drift; smaller intervention window; no fractionator knock-on" },
  ],
};

const SOP: SopRow[] = [
  { id: 1, sop_id: "SOP-114", step_number: 3, step_desc: "Verify N2 purge complete before light-off", compliance_rate: 0.62, workaround_detected: "Operators skip N2 verification when timer is past 20 min" },
  { id: 2, sop_id: "SOP-114", step_number: 7, step_desc: "Confirm flame stability for 90 sec", compliance_rate: 0.88, workaround_detected: "—" },
  { id: 3, sop_id: "SOP-220", step_number: 2, step_desc: "Drain low-point before pressure test", compliance_rate: 0.41, workaround_detected: "Test performed wet on night shift; Pillai's correction undocumented" },
  { id: 4, sop_id: "SOP-301", step_number: 5, step_desc: "Cross-check DCS vs field gauge", compliance_rate: 0.94, workaround_detected: "—" },
  { id: 5, sop_id: "SOP-401", step_number: 9, step_desc: "Log torque values per bolt", compliance_rate: 0.55, workaround_detected: "Logged as 'OK' batch rather than per-bolt" },
];

const HALF_LIFE: HalfLifeDoc[] = [
  { id: 1, title: "C-104 Overhaul Manual rev.3", engineer_author: "R. Krishnan", age_years: 9, reference_count: 42, contradiction_count: 3, hardware_generation: "Gen-2", freshness_score: 0.31, status: "STALE" },
  { id: 2, title: "B-101 Burner Tuning Notes", engineer_author: "S. Iyer", age_years: 4, reference_count: 18, contradiction_count: 0, hardware_generation: "Current", freshness_score: 0.78, status: "FRESH" },
  { id: 3, title: "V-205 Startup Procedure", engineer_author: "M. Pillai", age_years: 14, reference_count: 67, contradiction_count: 7, hardware_generation: "Gen-1", freshness_score: 0.12, status: "CRITICAL" },
  { id: 4, title: "P-302 Seal Selection Guide", engineer_author: "T. Nair", age_years: 6, reference_count: 22, contradiction_count: 1, hardware_generation: "Current", freshness_score: 0.62, status: "FRESH" },
  { id: 5, title: "K-501 Relay Coordination Study", engineer_author: "A. Banerjee", age_years: 2, reference_count: 11, contradiction_count: 0, hardware_generation: "Current", freshness_score: 0.91, status: "FRESH" },
  { id: 6, title: "T-401 Tray Hydraulics Memo", engineer_author: "M. Pillai", age_years: 11, reference_count: 31, contradiction_count: 4, hardware_generation: "Gen-1", freshness_score: 0.22, status: "STALE" },
];

const COREF: Coreference[] = [
  { id: 1, standard_name: "C-104", alias_name: "Recycle Comp", entity_type: "EQUIPMENT", confidence: 0.97 },
  { id: 2, standard_name: "C-104", alias_name: "Krishnan's compressor", entity_type: "EQUIPMENT", confidence: 0.84 },
  { id: 3, standard_name: "R. Krishnan", alias_name: "RK Sir", entity_type: "PERSON", confidence: 0.99 },
  { id: 4, standard_name: "P-302", alias_name: "reflux pump", entity_type: "EQUIPMENT", confidence: 0.93 },
  { id: 5, standard_name: "M. Pillai", alias_name: "Pillai uncle", entity_type: "PERSON", confidence: 0.95 },
];

const NETWORK: NetworkRow[] = [
  { id: 1, engineer: "M. Pillai", centrality: 0.94, dependencies: "V-205;T-401;E-310;SOP-114;SOP-220", domains_affected: 5, resilience_drop: 0.42 },
  { id: 2, engineer: "R. Krishnan", centrality: 0.88, dependencies: "C-104;Compressor SOPs;Vibration Standards", domains_affected: 3, resilience_drop: 0.35 },
  { id: 3, engineer: "T. Nair", centrality: 0.71, dependencies: "P-302;C-104;Seal specs", domains_affected: 3, resilience_drop: 0.21 },
  { id: 4, engineer: "S. Iyer", centrality: 0.68, dependencies: "B-101;DCS loops;Cal procedures", domains_affected: 4, resilience_drop: 0.19 },
  { id: 5, engineer: "A. Banerjee", centrality: 0.45, dependencies: "K-501;HV procedures", domains_affected: 2, resilience_drop: 0.08 },
  { id: 6, engineer: "V. Subramanian", centrality: 0.38, dependencies: "RCA database;FMEA library", domains_affected: 2, resilience_drop: 0.06 },
];

const SEM: SemanticPoint[] = Array.from({ length: 24 }, (_, i) => ({
  id: i, equipment_tag: "C-104", year: 2014 + Math.floor(i / 3),
  phrase: ["bearing hum", "lube drift", "whirl onset", "temp creep", "seal weep", "fan slip"][i % 6],
  vector_x: Math.cos(i * 0.4) * 0.6 + (i / 60), vector_y: Math.sin(i * 0.4) * 0.5 + (i / 80),
  severity_index: 0.3 + (i / 50),
}));

const CONSENSUS: ConsensusResponse = {
  consensus: "Pull the suction strainer first, then inspect the impeller eye. Both Krishnan and Nair agree NPSH margin should be verified against the latest test curve, not the nameplate. Pillai dissents on tuning band — recommends a wider window during summer ambient.",
  agreement: "STRONG",
  weights: { "R. Krishnan": 0.42, "T. Nair": 0.38, "M. Pillai": 0.20 },
  dissent: "Pillai prefers a wider tuning band in summer; both other voices favour the OEM curve. The dissent matters only when ambient exceeds 38°C.",
};

const SHIFT_HIT: ShiftAnalysis = {
  triggered: true,
  details: {
    tag: "P-302",
    expert: "T. Nair",
    alert: "Suction pressure drift + motor amp climb matches the 2020 cavitation signature.",
    guide: "Pull strainer within 24h. Inspect impeller eye for pitting. Verify NPSH against test curve.",
    causal_warning: "Untreated → fractionator reflux upset within 72h → 1.2 Cr/day margin loss.",
  },
};

const SHIFT_MISS: ShiftAnalysis = { triggered: false };

export const mock = {
  engineers: (): Engineer[] => ENGINEERS,
  vulnerabilityMap: (): VulnNode[] => NODES,
  chat: mockChat,
  consensus: (): ConsensusResponse => CONSENSUS,
  causal: (tag: string): CausalLink[] =>
    (CAUSAL[tag] ?? CAUSAL.default).map((c) => ({ ...c, equipment_tag: tag })),
  counterfactuals: (tag: string): Counterfactual[] =>
    (COUNTERFACTUALS[tag] ?? COUNTERFACTUALS.default).map((c) => ({ ...c, equipment_tag: tag })),
  coreference: (): Coreference[] => COREF,
  network: (): NetworkRow[] => NETWORK,
  sopAudit: (): SopRow[] => SOP,
  halfLife: (): HalfLifeDoc[] => HALF_LIFE,
  semanticDrift: (tag: string): SemanticPoint[] => SEM.map((s) => ({ ...s, equipment_tag: tag })),
  analyzeShiftNote: (note: string): ShiftAnalysis => {
    const n = note.toLowerCase();
    if (n.includes("pump") || n.includes("p-302") || n.includes("amp") || n.includes("suction") || n.length > 40) return SHIFT_HIT;
    return SHIFT_MISS;
  },
  upload: (): UploadResponse => ({
    status: "ok",
    data: { id: Math.floor(Math.random() * 10000), title: "Ingested Document", author: "R. Krishnan", equipment_tag: "C-104", failure_code: "VIB-HIGH", confidence: 0.91 },
  }),
  voiceNote: () => ({ status: "ok", message: "Voice note indexed against R. Krishnan's corpus." }),
};
