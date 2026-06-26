import { o as __toESM } from "../_runtime.mjs";
import { t as api } from "./api-DhfdxvtO.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { l as require_jsx_runtime } from "../_libs/@radix-ui/react-arrow+[...].mjs";
import { a as PageHeader, i as LoadingBlock, n as ErrorBlock, r as ForgePanel, s as Tag, t as EquipmentTag } from "./forge-BNQrx77c.mjs";
import { n as useQuery, t as useMutation } from "../_libs/tanstack__react-query.mjs";
import { C as TriangleAlert, E as FileExclamationPoint, c as ShieldCheck, y as Flame } from "../_libs/lucide-react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/audit-CCTYrBQj.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function Audit() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
		eyebrow: "Plant Head View",
		title: "Operations & Compliance Shadow Audit",
		description: "Audit procedural deviations vs. the written SOP, watch documentation rot in real time, and surface predictive warnings from raw shift logs."
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "p-6 space-y-6",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShiftNoteAnalyzer, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid gap-4 lg:grid-cols-2",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SopTable, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FreshnessHeatmap, {})]
		})]
	})] });
}
function ShiftNoteAnalyzer() {
	const [note, setNote] = (0, import_react.useState)("Boiler 101 outlet temp drifting +4°C since shift start. Positioner cycling more often than usual; suspected sticky stem. Operator notes no alarms.");
	const m = useMutation({ mutationFn: () => api.analyzeShiftNote(note) });
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ForgePanel, {
		className: "p-5",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center gap-2 mb-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, { className: "h-4 w-4 text-accent" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-display uppercase tracking-wider text-lg",
						children: "Shift-Note Anomaly Analyzer"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-xs text-muted-foreground ml-2",
						children: "Paste a raw shift entry — DeadMind cross-references it against the preserved corpus."
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-3 lg:grid-cols-[1fr_auto]",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
					value: note,
					onChange: (e) => setNote(e.target.value),
					rows: 3,
					className: "w-full bg-popover border border-border text-foreground px-3 py-2 rounded-none focus:outline-none focus:border-primary font-mono text-sm"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					onClick: () => m.mutate(),
					disabled: m.isPending || !note.trim(),
					className: "bg-primary text-primary-foreground px-4 py-2 font-display uppercase tracking-wider text-sm hover:bg-primary/90 disabled:opacity-40 self-start",
					children: m.isPending ? "Analyzing…" : "Analyze"
				})]
			}),
			m.data && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-4 animate-fade-in",
				children: m.data.triggered && m.data.details ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "border border-destructive/60 bg-destructive/10 p-3 grid gap-2 md:grid-cols-3",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "section-label text-destructive",
							children: "Anomaly on"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-1 flex items-center gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(EquipmentTag, { tag: m.data.details.tag }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tag, {
								tone: "fire",
								children: "flagged"
							})]
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "section-label",
							children: "Closest expert"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "text-sm mt-1",
							children: m.data.details.expert
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "section-label",
							children: "Causal warning"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "text-xs text-muted-foreground mt-1",
							children: m.data.details.causal_warning
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "md:col-span-3 border-t border-destructive/40 pt-2",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "section-label",
									children: "Recommended guide"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-sm mt-1 text-foreground leading-relaxed",
									children: m.data.details.guide
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "mt-1 text-xs text-destructive",
									children: m.data.details.alert
								})
							]
						})
					]
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "border border-border bg-card p-3 text-sm text-muted-foreground",
					children: "No anomalies detected — this entry matches normal operating envelope."
				})
			})
		]
	});
}
function SopTable() {
	const q = useQuery({
		queryKey: ["sop-audit"],
		queryFn: api.sopAudit
	});
	if (q.isError) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ErrorBlock, { error: q.error });
	const sopId = q.data?.[0]?.sop_id ?? "SOP-2019-047";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ForgePanel, {
		className: "p-5",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center gap-2 mb-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, { className: "h-4 w-4 text-primary" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-display uppercase tracking-wider text-lg",
					children: "Shadow SOP Compliance Auditor"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "text-xs text-muted-foreground mb-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "font-mono text-foreground",
					children: sopId
				}), " · Boiler Startup — measured vs. written sequence."]
			}),
			q.isLoading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoadingBlock, {}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "overflow-x-auto",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
					className: "w-full text-sm",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
						className: "text-[0.65rem] uppercase tracking-widest text-muted-foreground border-b border-border",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "text-left py-2 px-2 w-10",
								children: "#"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "text-left py-2 px-2",
								children: "Step"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "text-left py-2 px-2 w-40",
								children: "Compliance"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "text-left py-2 px-2 w-44",
								children: "Workaround"
							})
						]
					}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: (q.data ?? []).map((r) => {
						const rate = r.compliance_rate;
						const tone = rate >= 90 ? "steel" : rate >= 70 ? "gold" : "fire";
						const bar = rate >= 90 ? "oklch(0.65 0.18 165)" : rate >= 70 ? "oklch(0.80 0.14 85)" : "oklch(0.65 0.24 28)";
						return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
							className: "border-b border-border/40 hover:bg-muted/20 align-top",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "py-2 px-2 font-counter text-primary tabular-nums",
									children: r.step_number
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "py-2 px-2",
									children: r.step_desc
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "py-2 px-2",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center gap-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "flex-1 h-2 bg-muted/40 border border-border",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "h-full",
												style: {
													width: `${rate}%`,
													background: bar
												}
											})
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Tag, {
											tone,
											children: [rate, "%"]
										})]
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "py-2 px-2 text-xs",
									children: r.workaround_detected && r.workaround_detected !== "None" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-destructive",
										children: r.workaround_detected
									}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-muted-foreground",
										children: "—"
									})
								})
							]
						}, r.id);
					}) })]
				})
			})
		]
	});
}
function freshnessGrade(d) {
	if (d.status === "CRITICAL" || d.freshness_score < .34) return {
		tone: "fire",
		label: "CRITICAL DANGER",
		bg: "border-destructive/60 bg-destructive/10",
		icon: Flame
	};
	if (d.status === "STALE" || d.freshness_score < .67) return {
		tone: "gold",
		label: "STALE WARNING",
		bg: "border-primary/40 bg-primary/5",
		icon: FileExclamationPoint
	};
	return {
		tone: "steel",
		label: "FRESH",
		bg: "border-accent/50 bg-accent/5",
		icon: ShieldCheck
	};
}
function FreshnessHeatmap() {
	const q = useQuery({
		queryKey: ["half-life"],
		queryFn: api.halfLife
	});
	const [filter, setFilter] = (0, import_react.useState)("all");
	const docs = q.data ?? [];
	const filtered = (0, import_react.useMemo)(() => docs.filter((d) => {
		if (filter === "all") return true;
		return freshnessGrade(d).label.toLowerCase().includes(filter);
	}), [docs, filter]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ForgePanel, {
		className: "p-5",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-center justify-between mb-3 flex-wrap gap-2",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Flame, { className: "h-4 w-4 text-accent" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-display uppercase tracking-wider text-lg",
					children: "Knowledge Freshness Heatmap"
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex gap-1 text-[0.65rem] uppercase tracking-widest",
				children: [
					"all",
					"fresh",
					"stale",
					"critical"
				].map((f) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					onClick: () => setFilter(f),
					className: `px-2 py-1 border ${filter === f ? "border-primary text-primary" : "border-border text-muted-foreground hover:text-foreground"}`,
					children: f
				}, f))
			})]
		}), q.isLoading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoadingBlock, {}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid gap-2 sm:grid-cols-2",
			children: [filtered.map((d) => {
				const g = freshnessGrade(d);
				const Icon = g.icon;
				return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: `border ${g.bg} p-3`,
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center justify-between mb-1",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tag, {
								tone: g.tone,
								children: g.label
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: `h-4 w-4 ${g.tone === "fire" ? "text-destructive" : g.tone === "gold" ? "text-primary" : "text-accent"}` })]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "font-display text-sm leading-tight mb-1",
							children: d.title
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "text-[0.65rem] text-muted-foreground uppercase tracking-widest mb-2",
							children: [
								d.engineer_author,
								" · ",
								d.hardware_generation
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid grid-cols-3 gap-1 text-[0.65rem]",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat2, {
									label: "Age",
									value: `${d.age_years}y`
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat2, {
									label: "Refs",
									value: d.reference_count
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat2, {
									label: "Conflicts",
									value: d.contradiction_count,
									danger: d.contradiction_count > 0
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-2 h-1 bg-muted/40 border border-border",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "h-full",
								style: {
									width: `${d.freshness_score * 100}%`,
									background: g.tone === "fire" ? "oklch(0.65 0.24 28)" : g.tone === "gold" ? "oklch(0.80 0.14 85)" : "oklch(0.65 0.18 165)"
								}
							})
						})
					]
				}, d.id);
			}), filtered.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "col-span-full text-sm text-muted-foreground text-center py-6",
				children: "No documents match this filter."
			})]
		})]
	});
}
function Stat2({ label, value, danger }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "border border-border/60 px-1.5 py-1",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "text-muted-foreground uppercase tracking-widest",
			children: label
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: `font-counter tabular-nums ${danger ? "text-destructive" : "text-foreground"}`,
			children: value
		})]
	});
}
//#endregion
export { Audit as component };
