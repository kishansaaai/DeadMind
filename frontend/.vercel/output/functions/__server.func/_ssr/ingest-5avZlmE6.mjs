import { o as __toESM } from "../_runtime.mjs";
import { t as api } from "./api-DhfdxvtO.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { l as require_jsx_runtime } from "../_libs/@radix-ui/react-arrow+[...].mjs";
import { a as PageHeader, i as LoadingBlock, r as ForgePanel, s as Tag, t as EquipmentTag } from "./forge-BNQrx77c.mjs";
import { i as useQueryClient, n as useQuery, t as useMutation } from "../_libs/tanstack__react-query.mjs";
import { b as FileUp, g as Link2, p as Mic, s as Square, w as Sparkles } from "../_libs/lucide-react.mjs";
import { n as toast } from "../_libs/sonner.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/ingest-5avZlmE6.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function Ingest() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
			eyebrow: "Admin View",
			title: "Ingestion & Active Capture",
			description: "Preserve a mind: upload logs, record voice notes from retiring engineers, and let the resolver collapse heterogeneous aliases."
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "p-6 grid gap-4 lg:grid-cols-2",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DocumentUpload, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(VoiceCapture, {})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "px-6 pb-10",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CoreferencePanel, {})
		})
	] });
}
var inputCls = "w-full bg-popover border border-border text-foreground px-3 py-2 rounded-none focus:outline-none focus:border-primary";
function Field({ label, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
		className: "block",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "section-label block mb-1",
			children: label
		}), children]
	});
}
function DocumentUpload() {
	const [title, setTitle] = (0, import_react.useState)("");
	const [content, setContent] = (0, import_react.useState)("");
	const [docType, setDocType] = (0, import_react.useState)("log");
	const [engineer, setEngineer] = (0, import_react.useState)("");
	const engineersQ = useQuery({
		queryKey: ["engineers"],
		queryFn: api.engineers
	});
	const qc = useQueryClient();
	const m = useMutation({
		mutationFn: () => {
			const fd = new FormData();
			fd.append("title", title);
			fd.append("content", content);
			fd.append("doc_type", docType);
			if (engineer) fd.append("engineer", engineer);
			return api.upload(fd);
		},
		onSuccess: () => {
			toast.success("Document ingested");
			qc.invalidateQueries({ queryKey: ["half-life"] });
			qc.invalidateQueries({ queryKey: ["coreference"] });
		},
		onError: (e) => toast.error(e instanceof Error ? e.message : "Upload failed")
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ForgePanel, {
		className: "p-5",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center gap-2 mb-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileUp, { className: "h-4 w-4 text-primary" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-display uppercase tracking-wider text-lg",
					children: "Authorship Ingestion Engine"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
				onSubmit: (e) => {
					e.preventDefault();
					if (!title.trim() || !content.trim()) return;
					m.mutate();
				},
				className: "space-y-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "Title",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							value: title,
							onChange: (e) => setTitle(e.target.value),
							className: inputCls,
							placeholder: "e.g. B-101 startup anomaly 2024-09-14"
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid grid-cols-2 gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "Doc Type",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
								value: docType,
								onChange: (e) => setDocType(e.target.value),
								className: inputCls,
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: "log",
										children: "Log"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: "report",
										children: "Report"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: "manual",
										children: "Manual"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: "sop",
										children: "SOP"
									})
								]
							})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "Author (optional)",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
								value: engineer,
								onChange: (e) => setEngineer(e.target.value),
								className: inputCls,
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: "",
									children: "— Auto-detect —"
								}), (engineersQ.data ?? []).map((eng) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: eng.name,
									children: eng.name
								}, eng.name))]
							})
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "Content",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
							value: content,
							onChange: (e) => setContent(e.target.value),
							rows: 8,
							className: `${inputCls} font-mono text-sm`,
							placeholder: "Paste shift log, report excerpt, or manual section…"
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "submit",
						disabled: m.isPending,
						className: "bg-primary text-primary-foreground px-4 py-2 font-display uppercase tracking-wider text-sm hover:bg-primary/90 disabled:opacity-40",
						children: m.isPending ? "Ingesting…" : "Ingest & Attribute"
					})
				]
			}),
			m.data && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-4 border border-primary/40 bg-primary/5 p-3 animate-fade-in",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-2 mb-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "h-4 w-4 text-primary" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "font-display uppercase tracking-wider text-sm text-primary",
						children: "Attribution Report"
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid grid-cols-2 gap-y-1.5 gap-x-4 text-xs font-mono",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-muted-foreground",
							children: "parsed_tag"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(EquipmentTag, { tag: m.data.data.equipment_tag }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-muted-foreground",
							children: "failure_code"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-destructive",
							children: m.data.data.failure_code
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-muted-foreground",
							children: "assigned_author"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-foreground",
							children: m.data.data.author
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-muted-foreground",
							children: "confidence"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "text-primary",
							children: [(m.data.data.confidence * 100).toFixed(0), "%"]
						})
					]
				})]
			})
		]
	});
}
var DEMO_TRANSCRIPTS = { default: "Calibration note: Re-zeroed the B-101 positioner against a 1.013 bar reference. Setpoint drift was 0.18% over the last 90 days — replace the bourdon if you see another 0.05% slip." };
function VoiceCapture() {
	const engineersQ = useQuery({
		queryKey: ["engineers"],
		queryFn: api.engineers
	});
	const [engineer, setEngineer] = (0, import_react.useState)("");
	const [transcript, setTranscript] = (0, import_react.useState)("");
	const [recording, setRecording] = (0, import_react.useState)(false);
	const [audioB64, setAudioB64] = (0, import_react.useState)("");
	const [recorder, setRecorder] = (0, import_react.useState)(null);
	const [chunkSize, setChunkSize] = (0, import_react.useState)(0);
	const qc = useQueryClient();
	(0, import_react.useEffect)(() => {
		if (!engineer && engineersQ.data && engineersQ.data.length > 0) setEngineer(engineersQ.data[0].name);
	}, [engineersQ.data, engineer]);
	async function start() {
		try {
			const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
			const r = new MediaRecorder(stream);
			const local = [];
			r.ondataavailable = (e) => local.push(e.data);
			r.onstop = async () => {
				const blob = new Blob(local, { type: "audio/webm" });
				setAudioB64(await blobToBase64(blob));
				setChunkSize(blob.size);
				if (!transcript.trim()) setTranscript(DEMO_TRANSCRIPTS.default);
				stream.getTracks().forEach((t) => t.stop());
			};
			r.start();
			setRecorder(r);
			setRecording(true);
			setTimeout(() => {
				if (r.state === "recording") r.stop();
				setRecording(false);
			}, 2e3);
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
		onError: (e) => toast.error(e instanceof Error ? e.message : "Upload failed")
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ForgePanel, {
		className: "p-5",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-center gap-2 mb-3",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mic, { className: "h-4 w-4 text-accent" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "font-display uppercase tracking-wider text-lg",
				children: "Active Capture"
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "space-y-3",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					label: "Expert recording",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
						value: engineer,
						onChange: (e) => setEngineer(e.target.value),
						className: inputCls,
						children: (engineersQ.data ?? []).map((eng) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("option", {
							value: eng.name,
							children: [
								eng.name,
								" · retires ",
								eng.retirement_year
							]
						}, eng.name))
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-col items-center justify-center py-3",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							type: "button",
							onClick: recording ? stopNow : start,
							className: `relative h-24 w-24 rounded-full border-2 flex items-center justify-center transition-all ${recording ? "border-destructive bg-destructive/20 fire-glow" : "border-accent bg-accent/10 hover:bg-accent/20 steel-glow"}`,
							children: [recording ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Square, { className: "h-8 w-8 text-destructive" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mic, { className: "h-10 w-10 text-accent" }), recording && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "absolute inset-0 rounded-full border border-destructive/60 animate-ping" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "absolute -inset-2 rounded-full border border-destructive/30 animate-ping",
								style: { animationDelay: "0.2s" }
							})] })]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-2 text-[0.65rem] uppercase tracking-widest text-muted-foreground",
							children: recording ? "Recording 2s…" : chunkSize > 0 ? `${(chunkSize / 1024).toFixed(1)} KB captured` : "Tap to record"
						}),
						recording && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-2 flex items-end gap-0.5 h-8",
							children: Array.from({ length: 24 }).map((_, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "w-1 bg-destructive/80",
								style: {
									height: `${30 + Math.abs(Math.sin((Date.now() / 100 + i) * .4)) * 70}%`,
									animation: `pulse 0.6s ease-in-out ${i * .05}s infinite`
								}
							}, i))
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					label: "Transcript",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
						value: transcript,
						onChange: (e) => setTranscript(e.target.value),
						rows: 5,
						className: `${inputCls} font-mono text-sm`,
						placeholder: "Speech-to-text appears here after recording…"
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					onClick: () => m.mutate(),
					disabled: m.isPending || !engineer || !transcript.trim(),
					className: "w-full bg-primary text-primary-foreground px-4 py-2 font-display uppercase tracking-wider text-sm hover:bg-primary/90 disabled:opacity-40",
					children: m.isPending ? "Indexing…" : "Index Voice Note"
				}),
				m.isPending && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoadingBlock, { label: "Indexing voice note…" }),
				m.data && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "text-sm text-accent border-t border-border pt-3",
					children: m.data.message
				})
			]
		})]
	});
}
function CoreferencePanel() {
	const q = useQuery({
		queryKey: ["coreference"],
		queryFn: api.coreference
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ForgePanel, {
		className: "p-5",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-center gap-2 mb-3",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link2, { className: "h-4 w-4 text-primary" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-display uppercase tracking-wider text-lg",
					children: "Entity Coreference Resolver"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "text-xs text-muted-foreground ml-2",
					children: "Live alias-to-canonical mapping across ingested corpora."
				})
			]
		}), q.isLoading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoadingBlock, {}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "overflow-x-auto",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
				className: "w-full text-sm",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
					className: "text-[0.65rem] uppercase tracking-widest text-muted-foreground border-b border-border",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
							className: "text-left py-2 px-2",
							children: "Alias (as written)"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
							className: "text-left py-2 px-2",
							children: "→"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
							className: "text-left py-2 px-2",
							children: "Canonical"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
							className: "text-left py-2 px-2",
							children: "Type"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
							className: "text-right py-2 px-2",
							children: "Confidence"
						})
					]
				}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: (q.data ?? []).map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
					className: "border-b border-border/40 hover:bg-muted/20",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
							className: "py-1.5 px-2 font-mono text-xs",
							children: r.alias_name
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
							className: "py-1.5 px-2 text-muted-foreground",
							children: "→"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
							className: "py-1.5 px-2",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EquipmentTag, { tag: r.standard_name })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
							className: "py-1.5 px-2",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tag, {
								tone: "muted",
								children: r.entity_type
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
							className: "py-1.5 px-2 text-right",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "inline-flex items-center gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "w-20 h-1.5 bg-muted/40 border border-border",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "h-full bg-primary",
										style: { width: `${r.confidence * 100}%` }
									})
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "font-counter tabular-nums text-primary w-8 text-right",
									children: (r.confidence * 100).toFixed(0)
								})]
							})
						})
					]
				}, r.id)) })]
			})
		})]
	});
}
function blobToBase64(blob) {
	return new Promise((resolve, reject) => {
		const r = new FileReader();
		r.onloadend = () => {
			const s = r.result;
			resolve(s.split(",")[1] ?? s);
		};
		r.onerror = reject;
		r.readAsDataURL(blob);
	});
}
//#endregion
export { Ingest as component };
