import { o as __toESM } from "../_runtime.mjs";
import { t as api } from "./api-DhfdxvtO.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { l as require_jsx_runtime } from "../_libs/@radix-ui/react-arrow+[...].mjs";
import { a as PageHeader, i as LoadingBlock, n as ErrorBlock, o as Stat, r as ForgePanel, s as Tag, t as EquipmentTag } from "./forge-BNQrx77c.mjs";
import { n as useQuery } from "../_libs/tanstack__react-query.mjs";
import { t as X, u as Repeat, v as GitBranch } from "../_libs/lucide-react.mjs";
import { N as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { i as useYear, r as colorForNode, t as Route } from "./routes-BjJVROom.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-v_qHouBS.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
/**
* Tiny force-directed graph — verlet-style simulation in requestAnimationFrame.
* No external deps. Edges are derived from shared dependency tokens between rows.
*/
function ForceGraph({ data, width = 560, height = 340, onSelect }) {
	const svgRef = (0, import_react.useRef)(null);
	const [hover, setHover] = (0, import_react.useState)(null);
	const [, setTick] = (0, import_react.useState)(0);
	const { nodes, edges } = (0, import_react.useMemo)(() => {
		const ns = data.map((r, i) => ({
			id: r.engineer,
			r: 12 + r.centrality * 18,
			centrality: r.centrality,
			x: width / 2 + Math.cos(i / data.length * Math.PI * 2) * 120,
			y: height / 2 + Math.sin(i / data.length * Math.PI * 2) * 90,
			vx: 0,
			vy: 0
		}));
		const tokens = data.map((r) => new Set(r.dependencies.split(";").map((s) => s.trim().toLowerCase())));
		const es = [];
		for (let i = 0; i < data.length; i++) for (let j = i + 1; j < data.length; j++) {
			let shared = 0;
			tokens[i].forEach((t) => {
				if (tokens[j].has(t)) shared++;
			});
			if (shared > 0) es.push({
				a: data[i].engineer,
				b: data[j].engineer
			});
		}
		return {
			nodes: ns,
			edges: es
		};
	}, [
		data,
		width,
		height
	]);
	const stateRef = (0, import_react.useRef)({
		nodes,
		edges,
		width,
		height
	});
	stateRef.current = {
		nodes,
		edges,
		width,
		height
	};
	(0, import_react.useEffect)(() => {
		let raf = 0;
		const step = () => {
			const { nodes: ns, edges: es, width: W, height: H } = stateRef.current;
			const cx = W / 2, cy = H / 2;
			for (let i = 0; i < ns.length; i++) for (let j = i + 1; j < ns.length; j++) {
				const a = ns[i], b = ns[j];
				let dx = b.x - a.x, dy = b.y - a.y;
				let d2 = dx * dx + dy * dy;
				if (d2 < 1) {
					d2 = 1;
					dx = .5;
					dy = .5;
				}
				const f = 2400 / d2;
				const d = Math.sqrt(d2);
				const fx = dx / d * f, fy = dy / d * f;
				a.vx -= fx;
				a.vy -= fy;
				b.vx += fx;
				b.vy += fy;
			}
			for (const e of es) {
				const a = ns.find((n) => n.id === e.a);
				const b = ns.find((n) => n.id === e.b);
				if (!a || !b) continue;
				const dx = b.x - a.x, dy = b.y - a.y;
				const d = Math.max(.01, Math.hypot(dx, dy));
				const f = (d - 110) * .012;
				a.vx += dx / d * f;
				a.vy += dy / d * f;
				b.vx -= dx / d * f;
				b.vy -= dy / d * f;
			}
			for (const n of ns) {
				n.vx += (cx - n.x) * .002;
				n.vy += (cy - n.y) * .002;
				n.vx *= .82;
				n.vy *= .82;
				n.x += n.vx;
				n.y += n.vy;
				const pad = n.r + 6;
				if (n.x < pad) n.x = pad;
				if (n.x > W - pad) n.x = W - pad;
				if (n.y < pad) n.y = pad;
				if (n.y > H - pad) n.y = H - pad;
			}
			setTick((t) => (t + 1) % 1e6);
			raf = requestAnimationFrame(step);
		};
		raf = requestAnimationFrame(step);
		return () => cancelAnimationFrame(raf);
	}, []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
		ref: svgRef,
		viewBox: `0 0 ${width} ${height}`,
		className: "w-full h-auto select-none",
		role: "img",
		"aria-label": "Knowledge dependency graph",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("defs", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("radialGradient", {
					id: "fg-node",
					cx: "0.35",
					cy: "0.3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
						offset: "0%",
						stopColor: "oklch(0.92 0.15 80)",
						stopOpacity: "1"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
						offset: "100%",
						stopColor: "oklch(0.72 0.18 60)",
						stopOpacity: "0.95"
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("radialGradient", {
					id: "fg-node-hot",
					cx: "0.35",
					cy: "0.3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
						offset: "0%",
						stopColor: "oklch(0.85 0.22 28)",
						stopOpacity: "1"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
						offset: "100%",
						stopColor: "oklch(0.55 0.24 28)",
						stopOpacity: "0.95"
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("filter", {
					id: "fg-glow",
					x: "-50%",
					y: "-50%",
					width: "200%",
					height: "200%",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("feGaussianBlur", {
						stdDeviation: "3",
						result: "b"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("feMerge", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("feMergeNode", { in: "b" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("feMergeNode", { in: "SourceGraphic" })] })]
				})
			] }),
			edges.map((e, i) => {
				const a = nodes.find((n) => n.id === e.a);
				const b = nodes.find((n) => n.id === e.b);
				if (!a || !b) return null;
				const active = hover && (hover === e.a || hover === e.b);
				const pathId = `fg-edge-${i}`;
				const d = `M ${a.x} ${a.y} L ${b.x} ${b.y}`;
				const dur = 2.4 + i % 5 * .4;
				return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("g", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
					id: pathId,
					d,
					fill: "none",
					stroke: active ? "oklch(0.85 0.18 60)" : "oklch(0.6 0.05 80 / 0.35)",
					strokeWidth: active ? 1.6 : 1,
					strokeDasharray: active ? void 0 : "4 4"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
					r: active ? 2.6 : 1.8,
					fill: active ? "oklch(0.92 0.18 75)" : "oklch(0.8 0.14 75 / 0.85)",
					opacity: .9,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("animateMotion", {
						dur: `${dur}s`,
						repeatCount: "indefinite",
						rotate: "auto",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("mpath", { href: `#${pathId}` })
					})
				})] }, i);
			}),
			nodes.map((n) => {
				const isHot = n.centrality >= .8;
				const isHover = hover === n.id;
				return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("g", {
					transform: `translate(${n.x.toFixed(2)},${n.y.toFixed(2)})`,
					onMouseEnter: () => setHover(n.id),
					onMouseLeave: () => setHover((h) => h === n.id ? null : h),
					onClick: () => onSelect?.(n.id),
					style: { cursor: onSelect ? "pointer" : "default" },
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
							r: n.r + 8,
							fill: isHot ? "oklch(0.65 0.24 28)" : "oklch(0.8 0.14 85)",
							opacity: isHover ? .25 : .12
						}),
						isHot && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("circle", {
							r: n.r + 4,
							fill: "none",
							stroke: "oklch(0.85 0.22 28 / 0.7)",
							strokeWidth: 1.2,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("animate", {
								attributeName: "r",
								values: `${n.r + 4};${n.r + 16};${n.r + 4}`,
								dur: "1.8s",
								repeatCount: "indefinite"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("animate", {
								attributeName: "opacity",
								values: "0.8;0;0.8",
								dur: "1.8s",
								repeatCount: "indefinite"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
							r: n.r,
							fill: isHot ? "url(#fg-node-hot)" : "url(#fg-node)",
							stroke: isHot ? "oklch(0.85 0.22 28)" : "oklch(0.92 0.012 80)",
							strokeWidth: 1.4,
							filter: isHover ? "url(#fg-glow)" : void 0
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("text", {
							y: 4,
							textAnchor: "middle",
							fontFamily: "Space Mono, monospace",
							fontSize: 10,
							fontWeight: 700,
							fill: "oklch(0.15 0.01 80)",
							children: n.id.split(" ").map((p) => p[0]).join("")
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("text", {
							y: n.r + 14,
							textAnchor: "middle",
							fontFamily: "Space Grotesk, sans-serif",
							fontSize: 10,
							fill: "oklch(0.78 0.02 80)",
							opacity: isHover ? 1 : .65,
							children: n.id
						})
					]
				}, n.id);
			})
		]
	});
}
function colorFill(c) {
	if (c === "green") return "oklch(0.90 0.16 180)";
	if (c === "yellow") return "oklch(0.80 0.14 85)";
	return "oklch(0.65 0.24 28)";
}
function buildEdges(nodes) {
	const edges = [];
	for (let i = 0; i < nodes.length; i++) {
		const dists = nodes.map((n, j) => ({
			n,
			j,
			d: Math.hypot(n.x - nodes[i].x, n.y - nodes[i].y)
		})).filter((x) => x.j !== i).sort((a, b) => a.d - b.d).slice(0, 2);
		for (const { n } of dists) if (!edges.some((e) => e.a.tag === n.tag && e.b.tag === nodes[i].tag || e.a.tag === nodes[i].tag && e.b.tag === n.tag)) edges.push({
			a: nodes[i],
			b: n
		});
	}
	return edges;
}
function PlantMap() {
	const { year } = useYear();
	const { node: selectedTag } = Route.useSearch();
	const navigate = useNavigate({ from: Route.fullPath });
	const engineersQ = useQuery({
		queryKey: ["engineers"],
		queryFn: api.engineers
	});
	const mapQ = useQuery({
		queryKey: ["vulnerability-map"],
		queryFn: api.vulnerabilityMap
	});
	const networkQ = useQuery({
		queryKey: ["network"],
		queryFn: api.network
	});
	const nodes = mapQ.data ?? [];
	const engs = engineersQ.data ?? [];
	const edges = (0, import_react.useMemo)(() => buildEdges(nodes), [nodes]);
	if (mapQ.isError) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ErrorBlock, { error: mapQ.error });
	const retiredCount = engs.filter((e) => e.retirement_year <= year).length;
	const redNodes = nodes.filter((n) => (n.active_engineers ?? []).filter((e) => e.retirement_year >= year).length === 0);
	const exposure = redNodes.reduce((s, n) => s + n.downtime_cost, 0);
	const plantRisk = nodes.length === 0 ? 0 : Math.round(redNodes.length / nodes.length * 100);
	const { riskSpark, exposureSpark, retiredSpark, riskDelta } = (0, import_react.useMemo)(() => {
		const years = Array.from({ length: Math.max(2, year - 2025) }, (_, i) => 2026 + i);
		const risk = [];
		const expo = [];
		const ret = [];
		for (const y of years) {
			const red = nodes.filter((n) => (n.active_engineers ?? []).filter((e) => e.retirement_year >= y).length === 0);
			risk.push(nodes.length === 0 ? 0 : red.length / nodes.length * 100);
			expo.push(red.reduce((s, n) => s + n.downtime_cost, 0) / 1e7);
			ret.push(engs.filter((e) => e.retirement_year <= y).length);
		}
		const prev = risk.length > 1 ? risk[risk.length - 2] : risk[0] ?? 0;
		const last = risk[risk.length - 1] ?? 0;
		return {
			riskSpark: risk,
			exposureSpark: expo,
			retiredSpark: ret,
			riskDelta: prev === 0 ? 0 : (last - prev) / Math.max(1, prev) * 100
		};
	}, [
		nodes,
		engs,
		year
	]);
	const selectNode = (tag) => navigate({ search: tag ? { node: tag } : {} });
	const selected = selectedTag ? nodes.find((n) => n.tag === selectedTag) : void 0;
	const W = 1e3, H = 600;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
			eyebrow: "CFO View",
			title: "Plant Knowledge & Vulnerability Map",
			description: "Live financial exposure from knowledge gaps across the plant. Drag the simulation year above to retire engineers and watch coverage degrade."
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "p-6 grid gap-4 md:grid-cols-4",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
					label: "Plant Risk",
					numeric: plantRisk,
					suffix: "%",
					tone: plantRisk > 50 ? "fire" : plantRisk > 25 ? "gold" : "steel",
					hint: `${redNodes.length}/${nodes.length} unattended`,
					sparkline: riskSpark,
					delta: riskDelta
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
					label: "Exposure",
					numeric: exposure / 1e7,
					prefix: "₹",
					suffix: " Cr",
					decimals: 2,
					tone: "fire",
					hint: "Sum of downtime cost on red nodes",
					sparkline: exposureSpark
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
					label: `Retired by ${year}`,
					numeric: retiredCount,
					suffix: `/${engs.length}`,
					tone: "gold",
					sparkline: retiredSpark
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
					label: "Critical Nodes",
					numeric: nodes.filter((n) => n.criticality === "High").length,
					tone: "steel",
					hint: `${nodes.length} total assets`
				})
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "px-6 pb-6",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ForgePanel, {
				className: "p-4 overflow-hidden",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center justify-between mb-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-display uppercase tracking-wider text-lg",
						children: "Equipment Schematic"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-3 text-xs",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "flex items-center gap-1",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "w-3 h-3 rounded-full",
									style: { background: colorFill("green") }
								}), " ≥3"]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "flex items-center gap-1",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "w-3 h-3 rounded-full",
									style: { background: colorFill("yellow") }
								}), " 1–2"]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "flex items-center gap-1",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "w-3 h-3 rounded-full",
									style: { background: colorFill("red") }
								}), " 0"]
							})
						]
					})]
				}), mapQ.isLoading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoadingBlock, {}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
					viewBox: `0 0 ${W} ${H}`,
					className: "w-full h-auto",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("defs", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("pattern", {
							id: "grid",
							width: "40",
							height: "40",
							patternUnits: "userSpaceOnUse",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
								d: "M 40 0 L 0 0 0 40",
								fill: "none",
								stroke: "oklch(0.22 0.012 275 / 0.5)",
								strokeWidth: "0.5"
							})
						}) }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
							width: W,
							height: H,
							fill: "url(#grid)"
						}),
						edges.map((e, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("line", {
							x1: e.a.x,
							y1: e.a.y,
							x2: e.b.x,
							y2: e.b.y,
							stroke: "oklch(0.80 0.14 85 / 0.45)",
							strokeWidth: 1.5,
							strokeDasharray: "6 4"
						}, i)),
						nodes.map((n) => {
							const activeCount = (n.active_engineers ?? []).filter((e) => e.retirement_year >= year).length;
							const c = colorForNode(activeCount);
							const fill = colorFill(c);
							const r = n.criticality === "High" ? 22 : 18;
							const isSel = selectedTag === n.tag;
							return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("g", {
								transform: `translate(${n.x},${n.y})`,
								className: `cursor-pointer ${c === "red" ? "node-danger" : ""}`,
								onClick: () => selectNode(n.tag === selectedTag ? void 0 : n.tag),
								children: [
									isSel && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
										r: r + 14,
										fill: "none",
										stroke: "oklch(0.92 0.012 80)",
										strokeWidth: 1.5,
										strokeDasharray: "3 3"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
										r: r + 8,
										fill,
										fillOpacity: .15
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
										r,
										fill,
										fillOpacity: .4,
										stroke: fill,
										strokeWidth: 2
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("text", {
										y: 5,
										textAnchor: "middle",
										fontFamily: "JetBrains Mono, monospace",
										fontSize: 11,
										fill: "oklch(0.92 0.012 80)",
										fontWeight: 600,
										children: n.tag
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("text", {
										y: r + 18,
										textAnchor: "middle",
										fontFamily: "Rajdhani, sans-serif",
										fontSize: 11,
										letterSpacing: 1,
										fill: "oklch(0.59 0.025 80)",
										children: n.name
									})
								]
							}, n.tag);
						})
					]
				})]
			})
		}),
		selected && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "px-6 pb-6 animate-fade-in",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NodeDetailDrawer, {
				node: selected,
				year,
				onClose: () => selectNode(void 0)
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "px-6 pb-10 grid gap-4 lg:grid-cols-2",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RetirementTimeline, { year }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DependencyMini, {
				data: networkQ.data ?? [],
				loading: networkQ.isLoading
			})]
		})
	] });
}
function NodeDetailDrawer({ node, year, onClose }) {
	const causalQ = useQuery({
		queryKey: ["causal", node.tag],
		queryFn: () => api.causal(node.tag)
	});
	const cfQ = useQuery({
		queryKey: ["cf", node.tag],
		queryFn: () => api.counterfactuals(node.tag)
	});
	const active = (node.active_engineers ?? []).filter((e) => e.retirement_year >= year);
	const retired = (node.retired_engineers ?? []).concat((node.active_engineers ?? []).filter((e) => e.retirement_year < year));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ForgePanel, {
		className: "relative",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
			onClick: onClose,
			className: "absolute top-3 right-3 text-muted-foreground hover:text-foreground z-10",
			"aria-label": "Close detail",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "h-4 w-4" })
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid gap-px bg-border lg:grid-cols-3",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "bg-card p-5",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-2 mb-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(EquipmentTag, { tag: node.tag }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-display text-lg",
								children: node.name
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "text-xs text-muted-foreground mb-3",
							children: node.process_area
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-2 mb-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tag, {
								tone: node.criticality === "High" ? "fire" : "gold",
								children: node.criticality
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "rupee-counter text-xl",
								children: [
									"₹",
									(node.downtime_cost / 1e7).toFixed(2),
									" Cr"
								]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "section-label",
							children: ["Active custodians at ", year]
						}),
						active.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "text-destructive text-xs mt-1 font-mono uppercase tracking-wider",
							children: "None — knowledge lost"
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
							className: "text-xs mt-1 space-y-0.5",
							children: active.map((a) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [
								a.name,
								" ",
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "text-muted-foreground",
									children: ["· retires ", a.retirement_year]
								})
							] }, a.name))
						}),
						retired.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "section-label mt-4",
							children: "Retired"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
							className: "text-xs mt-1 space-y-0.5 text-muted-foreground",
							children: retired.map((a) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [
								a.name,
								" · ",
								a.retirement_year
							] }, a.name))
						})] })
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "bg-card p-5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-2 mb-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(GitBranch, { className: "h-4 w-4 text-primary" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "font-display uppercase tracking-wider text-sm",
							children: "Causal Timeline Trace"
						})]
					}), causalQ.isLoading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "text-xs text-muted-foreground",
						children: "Loading…"
					}) : (causalQ.data ?? []).length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs text-muted-foreground",
						children: "No causal chains recorded."
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
						className: "relative border-l border-border ml-1 space-y-3",
						children: (causalQ.data ?? []).map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
							className: "ml-4",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "absolute -left-[5px] mt-1.5 w-2.5 h-2.5 rounded-full bg-primary" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex flex-wrap items-center gap-1 text-xs",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "font-display",
											children: c.parent_event
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-muted-foreground",
											children: "→"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "font-display text-primary",
											children: c.child_event
										}),
										c.is_prediction ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-[0.6rem] uppercase border border-accent text-accent px-1",
											children: "prediction"
										}) : null
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-xs text-muted-foreground mt-0.5",
									children: c.description
								})
							]
						}, c.id))
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "bg-card p-5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-2 mb-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Repeat, { className: "h-4 w-4 text-accent" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "font-display uppercase tracking-wider text-sm",
							children: "Counterfactual Simulator"
						})]
					}), cfQ.isLoading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "text-xs text-muted-foreground",
						children: "Loading…"
					}) : (cfQ.data ?? []).length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs text-muted-foreground",
						children: "No counterfactuals on file."
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "space-y-3",
						children: (cfQ.data ?? []).map((cf) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "border border-border p-3 animate-scale-in",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "font-display text-sm tracking-wide",
									children: cf.title
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-xs text-muted-foreground mt-1",
									children: cf.intervention
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
									className: "mt-2 space-y-0.5",
									children: cf.consequences.split(";").map((c, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
										className: "text-[0.7rem] flex gap-1",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-destructive",
											children: "▸"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: c.trim() })]
									}, i))
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "mt-2 text-right",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "font-counter text-2xl text-primary tabular-nums gold-glow",
										children: [
											"₹",
											cf.cost_avoided_crore.toFixed(2),
											" Cr"
										]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "text-[0.6rem] uppercase tracking-widest text-muted-foreground",
										children: "saved"
									})]
								})
							]
						}, cf.id))
					})]
				})
			]
		})]
	});
}
function RetirementTimeline({ year }) {
	const engs = useQuery({
		queryKey: ["engineers"],
		queryFn: api.engineers
	}).data ?? [];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ForgePanel, {
		className: "p-5",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
			className: "font-display uppercase tracking-wider text-lg mb-3",
			children: "Retirement Timeline"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "grid grid-cols-11 gap-1",
			children: Array.from({ length: 11 }, (_, i) => 2026 + i).map((y) => {
				const ret = engs.filter((e) => e.retirement_year === y);
				return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: `p-1.5 border ${y <= year ? "border-destructive/60 bg-destructive/10" : "border-border"}`,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "font-counter text-[0.6rem] text-center text-muted-foreground",
						children: y
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: `font-counter text-xl text-center tabular-nums ${ret.length > 0 ? "text-destructive" : "text-muted-foreground/40"}`,
						children: ret.length
					})]
				}, y);
			})
		})]
	});
}
function DependencyMini({ data, loading }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ForgePanel, {
		className: "p-5",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-center justify-between mb-3",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "font-display uppercase tracking-wider text-lg",
				children: "Knowledge Network"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "font-mono text-[10px] uppercase tracking-widest text-muted-foreground",
				children: "live force simulation"
			})]
		}), loading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoadingBlock, {}) : data.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-xs text-muted-foreground",
			children: "No network data."
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ForceGraph, { data }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mt-3 grid grid-cols-2 gap-2 text-[0.65rem]",
			children: data.slice(0, 4).map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center justify-between gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "truncate",
					children: r.engineer
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "font-counter tabular-nums text-primary",
					children: r.centrality.toFixed(2)
				})]
			}, r.id))
		})] })]
	});
}
//#endregion
export { PlantMap as component };
