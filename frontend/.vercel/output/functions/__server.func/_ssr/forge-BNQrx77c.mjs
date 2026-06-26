import { o as __toESM } from "../_runtime.mjs";
import { n as cn } from "./api-DhfdxvtO.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { l as require_jsx_runtime } from "../_libs/@radix-ui/react-arrow+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/forge-BNQrx77c.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
/** Animated number counter — eases from previous value to current on change. */
function Odometer({ value, duration = 1200, prefix = "", suffix = "", decimals = 0, className }) {
	const [display, setDisplay] = (0, import_react.useState)(value);
	const fromRef = (0, import_react.useRef)(0);
	const startRef = (0, import_react.useRef)(null);
	const rafRef = (0, import_react.useRef)(null);
	(0, import_react.useEffect)(() => {
		fromRef.current = display;
		startRef.current = null;
		const target = value;
		const tick = (t) => {
			if (startRef.current === null) startRef.current = t;
			const elapsed = t - startRef.current;
			const p = Math.min(1, elapsed / duration);
			const eased = p === 1 ? 1 : 1 - Math.pow(2, -10 * p);
			setDisplay(fromRef.current + (target - fromRef.current) * eased);
			if (p < 1) rafRef.current = requestAnimationFrame(tick);
		};
		rafRef.current = requestAnimationFrame(tick);
		return () => {
			if (rafRef.current) cancelAnimationFrame(rafRef.current);
		};
	}, [value, duration]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
		className,
		children: [
			prefix,
			display.toLocaleString(void 0, {
				minimumFractionDigits: decimals,
				maximumFractionDigits: decimals
			}),
			suffix
		]
	});
}
/** Lightweight inline sparkline — no deps, draws a smooth area + line. */
function Sparkline({ data, width = 120, height = 32, className, stroke = "currentColor" }) {
	if (data.length === 0) return null;
	const min = Math.min(...data);
	const range = Math.max(...data) - min || 1;
	const step = data.length > 1 ? width / (data.length - 1) : width;
	const pts = data.map((d, i) => {
		return [i * step, height - (d - min) / range * (height - 4) - 2];
	});
	const path = pts.map(([x, y], i) => `${i === 0 ? "M" : "L"}${x.toFixed(1)},${y.toFixed(1)}`).join(" ");
	const area = `${path} L${width},${height} L0,${height} Z`;
	const last = pts[pts.length - 1];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
		width,
		height,
		viewBox: `0 0 ${width} ${height}`,
		className,
		"aria-hidden": true,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("defs", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("linearGradient", {
				id: "sparkFill",
				x1: "0",
				x2: "0",
				y1: "0",
				y2: "1",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
					offset: "0%",
					stopColor: stroke,
					stopOpacity: "0.35"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
					offset: "100%",
					stopColor: stroke,
					stopOpacity: "0"
				})]
			}) }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
				d: area,
				fill: "url(#sparkFill)"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
				d: path,
				fill: "none",
				stroke,
				strokeWidth: 1.5,
				strokeLinecap: "round",
				strokeLinejoin: "round"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
				cx: last[0],
				cy: last[1],
				r: 2.5,
				fill: stroke,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("animate", {
					attributeName: "r",
					values: "2;3.5;2",
					dur: "1.6s",
					repeatCount: "indefinite"
				})
			})
		]
	});
}
/**
* SplitText — renders each character with a staggered fade+rise animation.
* Uses CSS keyframe `fadeInUp` defined globally. Whitespace preserved.
*/
function SplitText({ text, className, letterClassName, delay = 0, stagger = 28, as: Tag = "span" }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tag, {
		className,
		"aria-label": text,
		children: Array.from(text).map((ch, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			"aria-hidden": true,
			className: "splittext-letter " + (letterClassName ?? ""),
			style: {
				animationDelay: `${delay + i * stagger}ms`,
				whiteSpace: ch === " " ? "pre" : void 0
			},
			children: ch
		}, i))
	});
}
function PageHeader({ eyebrow, title, description, actions }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "px-6 pt-6 pb-4 border-b border-border flex flex-wrap items-end justify-between gap-4",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "section-label",
				children: eyebrow
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SplitText, {
				as: "h1",
				text: title,
				className: "font-display text-3xl md:text-4xl font-bold text-foreground mt-1 block",
				stagger: 22
			}),
			description && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-muted-foreground text-sm mt-2 max-w-2xl",
				children: description
			})
		] }), actions && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "flex items-center gap-2",
			children: actions
		})]
	});
}
function ForgePanel({ children, className, glow }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: cn("relative bg-card border border-border rounded-sm scanlines", glow === "gold" ? "gold-glow" : glow === "steel" ? "steel-glow" : glow === "fire" ? "fire-glow" : "", className),
		children
	});
}
function Tag({ children, tone = "gold" }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: cn("font-mono text-[0.7rem] uppercase tracking-widest px-2 py-0.5 border rounded-sm whitespace-nowrap", {
			gold: "border-primary/40 text-primary bg-primary/10",
			fire: "border-destructive/40 text-destructive bg-destructive/10",
			steel: "border-accent/40 text-accent bg-accent/10",
			muted: "border-border text-muted-foreground bg-muted/30"
		}[tone]),
		children
	});
}
function EquipmentTag({ tag }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: "equipment-tag",
		children: tag
	});
}
function Stat({ label, value, numeric, prefix = "", suffix = "", decimals = 0, hint, tone = "default", sparkline, delta }) {
	const toneClass = tone === "fire" ? "text-destructive" : tone === "steel" ? "text-accent" : tone === "gold" ? "text-primary" : "text-foreground";
	const sparkColor = tone === "fire" ? "oklch(0.65 0.24 28)" : tone === "steel" ? "oklch(0.7 0.12 220)" : "oklch(0.85 0.16 80)";
	const deltaUp = (delta ?? 0) >= 0;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "glass-card p-5 group relative overflow-hidden",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "section-label flex items-center justify-between",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: label }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "h-1.5 w-1.5 rounded-full bg-primary animate-breathe" })]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-end justify-between gap-3 mt-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: cn("font-counter text-3xl md:text-4xl tabular-nums tracking-tight transition-transform duration-300 group-hover:scale-[1.04] origin-left", toneClass),
					children: numeric !== void 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Odometer, {
						value: numeric,
						prefix,
						suffix,
						decimals
					}) : value
				}), sparkline && sparkline.length > 1 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkline, {
					data: sparkline,
					stroke: sparkColor,
					className: toneClass
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-2 flex items-center justify-between",
				children: [hint && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "text-xs text-muted-foreground",
					children: hint
				}), delta !== void 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: cn("font-mono text-[10px] uppercase tracking-widest px-1.5 py-0.5 rounded border ml-auto", deltaUp ? "border-destructive/40 text-destructive bg-destructive/10" : "border-primary/40 text-primary bg-primary/10"),
					children: [
						deltaUp ? "▲" : "▼",
						" ",
						Math.abs(delta).toFixed(1),
						"%"
					]
				})]
			})
		]
	});
}
function ErrorBlock({ error }) {
	const msg = error instanceof Error ? error.message : String(error);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "glass-card card-accent-danger p-6 m-6 animate-fade-in-up",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "h-2 w-2 rounded-full bg-destructive animate-breathe" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "section-label text-destructive",
					children: "Backend unreachable"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "mt-3 text-sm text-muted-foreground",
				children: [
					"Could not reach the DeadMind backend. Ensure it is running at the configured base URL (default ",
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("code", {
						className: "text-primary font-mono",
						children: "http://localhost:8000"
					}),
					") and that CORS allows this origin."
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("pre", {
				className: "mt-3 text-xs font-mono text-destructive/80 whitespace-pre-wrap",
				children: msg
			})
		]
	});
}
function LoadingBlock({ label = "Loading…" }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "p-6 space-y-3",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center gap-2 text-muted-foreground",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "inline-block h-2 w-2 rounded-full bg-primary animate-breathe" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "font-mono uppercase tracking-wider text-xs",
					children: label
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-3 w-1/2 rounded-md shimmer" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-3 w-2/3 rounded-md shimmer" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-3 w-1/3 rounded-md shimmer" })
		]
	});
}
//#endregion
export { PageHeader as a, LoadingBlock as i, ErrorBlock as n, Stat as o, ForgePanel as r, Tag as s, EquipmentTag as t };
