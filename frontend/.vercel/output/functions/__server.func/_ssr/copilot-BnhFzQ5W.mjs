import { o as __toESM } from "../_runtime.mjs";
import { t as api } from "./api-DhfdxvtO.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { l as require_jsx_runtime } from "../_libs/@radix-ui/react-arrow+[...].mjs";
import { a as PageHeader, i as LoadingBlock, n as ErrorBlock, r as ForgePanel, s as Tag, t as EquipmentTag } from "./forge-BNQrx77c.mjs";
import { n as useQuery, t as useMutation } from "../_libs/tanstack__react-query.mjs";
import { i as Users, l as Send, t as X, w as Sparkles } from "../_libs/lucide-react.mjs";
import { t as Route } from "./copilot-2iWoFE4c.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/copilot-BnhFzQ5W.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var AXES = [
	"Systematic",
	"Intuitive",
	"Mechanical",
	"Electrical",
	"Instrumentation",
	"Process"
];
function CognitiveRadar({ scores, size = 320 }) {
	const cx = size / 2;
	const cy = size / 2;
	const r = size / 2 - 40;
	const values = [
		scores.systematic,
		scores.intuitive,
		scores.mechanical,
		scores.electrical,
		scores.instrumentation,
		scores.process
	];
	const angle = (i) => Math.PI / 3 * i - Math.PI / 2;
	const pt = (i, v) => {
		const ratio = Math.max(0, Math.min(100, v)) / 100;
		return {
			x: cx + r * ratio * Math.cos(angle(i)),
			y: cy + r * ratio * Math.sin(angle(i))
		};
	};
	const axisEnd = (i) => ({
		x: cx + r * Math.cos(angle(i)),
		y: cy + r * Math.sin(angle(i))
	});
	const labelPos = (i) => ({
		x: cx + (r + 22) * Math.cos(angle(i)),
		y: cy + (r + 22) * Math.sin(angle(i))
	});
	const poly = values.map((v, i) => {
		const p = pt(i, v);
		return `${p.x},${p.y}`;
	}).join(" ");
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
		viewBox: `0 0 ${size} ${size}`,
		className: "w-full max-w-md",
		children: [
			[
				.25,
				.5,
				.75,
				1
			].map((k) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("polygon", {
				points: Array.from({ length: 6 }, (_, i) => {
					return `${cx + r * k * Math.cos(angle(i))},${cy + r * k * Math.sin(angle(i))}`;
				}).join(" "),
				fill: "none",
				stroke: "oklch(0.22 0.012 275)",
				strokeWidth: 1
			}, k)),
			AXES.map((_, i) => {
				const e = axisEnd(i);
				return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("line", {
					x1: cx,
					y1: cy,
					x2: e.x,
					y2: e.y,
					stroke: "oklch(0.22 0.012 275)",
					strokeWidth: 1
				}, i);
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("polygon", {
				points: poly,
				fill: "oklch(0.80 0.14 85 / 0.25)",
				stroke: "oklch(0.80 0.14 85)",
				strokeWidth: 2,
				style: { filter: "drop-shadow(0 0 8px oklch(0.80 0.14 85 / 0.5))" }
			}),
			values.map((v, i) => {
				const p = pt(i, v);
				return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
					cx: p.x,
					cy: p.y,
					r: 3,
					fill: "oklch(0.90 0.16 180)"
				}, i);
			}),
			AXES.map((label, i) => {
				const l = labelPos(i);
				return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("text", {
					x: l.x,
					y: l.y,
					textAnchor: "middle",
					dominantBaseline: "middle",
					fontFamily: "Rajdhani, sans-serif",
					fontSize: 11,
					letterSpacing: 1.5,
					fill: "oklch(0.59 0.025 80)",
					style: { textTransform: "uppercase" },
					children: label
				}, label);
			}),
			values.map((v, i) => {
				const p = pt(i, v);
				return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("text", {
					x: p.x,
					y: p.y - 8,
					textAnchor: "middle",
					fontFamily: "Orbitron, monospace",
					fontSize: 10,
					fontWeight: 700,
					fill: "oklch(0.80 0.14 85)",
					children: v
				}, `v${i}`);
			})
		]
	});
}
function uncertaintyTone(level) {
	if (level === "HIGH") return "fire";
	if (level === "MEDIUM") return "gold";
	if (level === "LOW") return "steel";
	return "muted";
}
var SUGGESTIONS = [
	"How do you zero-span the positioner on B-101?",
	"Walk me through pre-startup checks for the V-205 vessel.",
	"What's the failure signature for P-302 cavitation?",
	"Compare overhaul approaches for C-104."
];
function formatMarkdown(text) {
	return text.split("\n").map((line, idx) => {
		const match = line.match(/^(\d+)\.\s(.*)/);
		if (match) {
			const num = match[1];
			const restContent = match[2].split(/(\*\*.*?\*\*)/g).map((part, pIdx) => {
				if (part.startsWith("**") && part.endsWith("**")) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
					className: "font-semibold text-primary",
					children: part.slice(2, -2)
				}, pIdx);
				return part;
			});
			return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex gap-2 my-1.5 pl-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "font-bold text-primary",
					children: [num, "."]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex-1",
					children: restContent
				})]
			}, idx);
		}
		const bulletMatch = line.match(/^([*\-])\s(.*)/);
		if (bulletMatch) {
			const restContent = bulletMatch[2].split(/(\*\*.*?\*\*)/g).map((part, pIdx) => {
				if (part.startsWith("**") && part.endsWith("**")) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
					className: "font-semibold text-primary",
					children: part.slice(2, -2)
				}, pIdx);
				return part;
			});
			return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex gap-2 my-1 pl-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "text-primary",
					children: "•"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex-1",
					children: restContent
				})]
			}, idx);
		}
		return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "min-h-[1.2em] my-1",
			children: line.split(/(\*\*.*?\*\*)/g).map((part, pIdx) => {
				if (part.startsWith("**") && part.endsWith("**")) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
					className: "font-semibold text-primary",
					children: part.slice(2, -2)
				}, pIdx);
				return part;
			})
		}, idx);
	});
}
function Copilot() {
	const search = Route.useSearch();
	const navigate = Route.useNavigate();
	const engineersQ = useQuery({
		queryKey: ["engineers"],
		queryFn: api.engineers
	});
	const [engineer, setEngineer] = (0, import_react.useState)("");
	const [input, setInput] = (0, import_react.useState)("");
	const [msgs, setMsgs] = (0, import_react.useState)([]);
	const [consensus, setConsensus] = (0, import_react.useState)(null);
	const scrollRef = (0, import_react.useRef)(null);
	(0, import_react.useEffect)(() => {
		if (!engineer) {
			const fromUrl = search.engineer;
			if (fromUrl) setEngineer(fromUrl);
			else if (engineersQ.data && engineersQ.data.length > 0) setEngineer(engineersQ.data[0].name);
		}
	}, [
		search.engineer,
		engineersQ.data,
		engineer
	]);
	const chat = useMutation({
		mutationFn: ({ q, e }) => api.chat(q, e),
		onSuccess: (data) => setMsgs((m) => [...m, {
			role: "assistant",
			text: data.answer,
			meta: data
		}]),
		onError: (err) => setMsgs((m) => [...m, {
			role: "assistant",
			text: `Error: ${err instanceof Error ? err.message : String(err)}`
		}])
	});
	const cons = useMutation({
		mutationFn: ({ q, e }) => api.consensus(q, e),
		onSuccess: (d) => setConsensus(d)
	});
	(0, import_react.useEffect)(() => {
		scrollRef.current?.scrollTo({
			top: scrollRef.current.scrollHeight,
			behavior: "smooth"
		});
	}, [msgs, chat.isPending]);
	if (engineersQ.isError) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ErrorBlock, { error: engineersQ.error });
	const engObj = (engineersQ.data ?? []).find((e) => e.name === engineer);
	function send(query) {
		const q = (query ?? input).trim();
		if (!q || !engineer || chat.isPending) return;
		setMsgs((m) => [...m, {
			role: "user",
			text: q
		}]);
		chat.mutate({
			q,
			e: engineer
		});
		if (!query) setInput("");
	}
	function arbitrate() {
		const lastUser = [...msgs].reverse().find((m) => m.role === "user");
		const q = input.trim() || lastUser?.text || SUGGESTIONS[0];
		if (!engineer) return;
		cons.mutate({
			q,
			e: engineer
		});
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex flex-col h-[calc(100vh-7rem)]",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
			eyebrow: "Technician View",
			title: "Expert Persona Copilot",
			description: "Grounded Q&A with preserved engineer minds. Citations, uncertainty, and cross-bench consensus."
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex-1 grid grid-cols-1 lg:grid-cols-[320px_1fr] gap-px bg-border overflow-hidden",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "bg-background p-4 overflow-y-auto",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "section-label mb-2",
						children: "Engineer"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
						value: engineer,
						onChange: (ev) => {
							const v = ev.target.value;
							setEngineer(v);
							setMsgs([]);
							setConsensus(null);
							navigate({ search: { engineer: v } });
						},
						className: "w-full bg-popover border border-border text-foreground font-display uppercase tracking-wider text-sm px-3 py-2 rounded-none mb-4",
						children: (engineersQ.data ?? []).map((e) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
							value: e.name,
							children: e.name
						}, e.name))
					}),
					engObj ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "text-xs text-muted-foreground mb-1",
							children: engObj.role
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-2 mb-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Tag, {
								tone: "gold",
								children: ["retires ", engObj.retirement_year]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Tag, {
								tone: engObj.risk_score > 70 ? "fire" : "steel",
								children: ["risk ", engObj.risk_score]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ForgePanel, {
							className: "p-3 flex justify-center",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CognitiveRadar, { scores: {
								systematic: engObj.cognitive_systematic,
								intuitive: engObj.cognitive_intuitive,
								mechanical: engObj.cognitive_mechanical,
								electrical: engObj.cognitive_electrical,
								instrumentation: engObj.cognitive_instrumentation,
								process: engObj.cognitive_process
							} })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-3 space-y-1.5",
							children: [
								["Systematic", engObj.cognitive_systematic],
								["Intuitive", engObj.cognitive_intuitive],
								["Mechanical", engObj.cognitive_mechanical],
								["Electrical", engObj.cognitive_electrical],
								["Instrumentation", engObj.cognitive_instrumentation],
								["Process", engObj.cognitive_process]
							].map(([l, v]) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-2 text-xs",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "w-32 uppercase tracking-wider text-muted-foreground",
										children: l
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "flex-1 h-1.5 bg-muted/40 border border-border",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "h-full bg-primary",
											style: { width: `${v}%` }
										})
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "font-counter w-6 text-right tabular-nums text-primary",
										children: v
									})
								]
							}, l))
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "section-label mt-4 mb-1",
							children: "Specialties"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "flex flex-wrap gap-1",
							children: engObj.specialties.split(",").map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tag, {
								tone: "muted",
								children: s.trim()
							}, s))
						})
					] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoadingBlock, {})
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "bg-background flex flex-col relative min-h-0 h-full overflow-hidden",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						ref: scrollRef,
						className: "flex-1 overflow-y-auto px-6 py-4 space-y-4",
						children: [
							msgs.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ForgePanel, {
								className: "p-6 text-sm text-muted-foreground",
								children: [
									"Ask ",
									engineer || "the expert",
									" how they'd handle a failure pattern, a calibration, or a procedure."
								]
							}),
							msgs.map((m, i) => m.role === "user" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "flex justify-end",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "max-w-[80%] bg-primary text-primary-foreground px-4 py-2 rounded-sm font-medium",
									children: m.text
								})
							}, i) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "max-w-3xl",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "bg-muted/30 border border-border p-4",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "text-xs section-label mb-2",
											children: m.meta?.engineer ?? engineer
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "whitespace-pre-wrap text-foreground leading-relaxed",
											children: formatMarkdown(m.text)
										}),
										m.meta && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "mt-3",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "flex items-center justify-between text-xs mb-1",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
														className: "section-label",
														children: "Grounding confidence"
													}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
														className: "font-counter tabular-nums text-primary",
														children: [m.meta.confidence, "%"]
													})]
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
													className: "h-1.5 bg-muted/40 border border-border",
													children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
														className: "h-full bg-primary",
														style: { width: `${m.meta.confidence}%` }
													})
												})]
											}),
											m.meta.related_context.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "mt-3 text-xs",
												children: [
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
														className: "section-label",
														children: "Cross-links:"
													}),
													" ",
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
														className: "text-foreground",
														children: m.meta.related_context.join(", ")
													})
												]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "mt-3 grid gap-3 md:grid-cols-2",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "border border-border p-3",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
														className: "section-label mb-2",
														children: "Citations"
													}), m.meta.citations.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
														className: "text-xs text-muted-foreground",
														children: "No citations returned."
													}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
														className: "space-y-1 text-xs",
														children: m.meta.citations.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
															className: "flex items-center gap-2 flex-wrap",
															children: [
																/* @__PURE__ */ (0, import_jsx_runtime.jsx)(EquipmentTag, { tag: c.equipment_tag }),
																/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
																	className: "text-foreground",
																	children: c.title
																}),
																/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
																	className: "text-muted-foreground",
																	children: ["· ", c.author]
																})
															]
														}, c.id))
													})]
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "border border-border p-3",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
														className: "section-label mb-2",
														children: ["Epistemic Uncertainty · risk ", m.meta.uncertainty.risk_score]
													}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
														className: "grid grid-cols-2 gap-2 text-xs",
														children: [
															"sparsity",
															"staleness",
															"disagreement",
															"causal"
														].map((k) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
															className: "flex items-center justify-between border border-border/60 px-2 py-1",
															children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
																className: "uppercase tracking-wider text-muted-foreground",
																children: k
															}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tag, {
																tone: uncertaintyTone(m.meta.uncertainty[k]),
																children: m.meta.uncertainty[k]
															})]
														}, k))
													})]
												})]
											})
										] })
									]
								})
							}, i)),
							chat.isPending && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoadingBlock, { label: `${engineer} is reconstructing…` })
						]
					}),
					consensus && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "absolute inset-x-0 bottom-[64px] mx-4 mb-4 animate-fade-in z-10",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ForgePanel, {
							className: "p-4 border-primary/60 shadow-2xl bg-card/95 backdrop-blur",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									onClick: () => setConsensus(null),
									className: "absolute top-3 right-3 text-muted-foreground hover:text-foreground",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "h-4 w-4" })
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center gap-2 mb-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Users, { className: "h-4 w-4 text-primary" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "font-display uppercase tracking-wider text-sm",
										children: "Consensus Panel"
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "text-sm text-foreground leading-relaxed mb-2",
									children: formatMarkdown(consensus.consensus)
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "mt-2 text-xs text-muted-foreground",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
											className: "text-foreground",
											children: "Agreement:"
										}),
										" ",
										consensus.agreement
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "mt-1 text-xs text-destructive",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Dissent:" }),
										" ",
										consensus.dissent
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "mt-3 grid gap-1.5",
									children: Object.entries(consensus.weights).map(([n, w]) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center gap-2 text-xs",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "w-32",
												children: n
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "flex-1 h-1.5 bg-muted/40 border border-border",
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
													className: "h-full bg-primary",
													style: { width: `${w}%` }
												})
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "font-counter w-8 text-right tabular-nums text-primary",
												children: w
											})
										]
									}, n))
								})
							]
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "border-t border-border bg-sidebar/40 p-3",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "flex flex-wrap gap-1.5 mb-2",
								children: SUGGESTIONS.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									onClick: () => send(s),
									className: "text-[0.7rem] uppercase tracking-wider border border-border px-2 py-1 hover:border-primary hover:text-primary text-muted-foreground transition-colors",
									children: s
								}, s))
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
								onSubmit: (e) => {
									e.preventDefault();
									send();
								},
								className: "flex gap-2",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										value: input,
										onChange: (e) => setInput(e.target.value),
										placeholder: `Ask ${engineer || "the expert"}…`,
										className: "flex-1 bg-popover border border-border text-foreground px-3 py-2 rounded-none focus:outline-none focus:border-primary"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
										type: "button",
										onClick: arbitrate,
										disabled: cons.isPending || !engineer,
										className: "bg-transparent border border-primary/60 text-primary px-3 py-2 font-display uppercase tracking-wider text-xs hover:bg-primary/10 disabled:opacity-40 flex items-center gap-1.5",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Users, { className: "h-4 w-4" }),
											" ",
											cons.isPending ? "Weighing…" : "Consensus"
										]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
										type: "submit",
										disabled: chat.isPending || !engineer || !input.trim(),
										className: "bg-primary text-primary-foreground px-4 py-2 font-display uppercase tracking-wider text-sm hover:bg-primary/90 disabled:opacity-40 flex items-center gap-1.5",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Send, { className: "h-4 w-4" }), " Consult"]
									})
								]
							}),
							cons.isError && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "text-xs text-destructive mt-1",
								children: cons.error.message
							}),
							!engObj && engineer && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "text-xs text-muted-foreground mt-1 flex items-center gap-1",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "h-3 w-3" }), " Loading expert…"]
							})
						]
					})
				]
			})]
		})]
	});
}
//#endregion
export { Copilot as component };
