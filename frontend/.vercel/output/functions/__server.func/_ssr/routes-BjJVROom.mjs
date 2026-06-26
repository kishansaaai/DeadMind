import { o as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { l as require_jsx_runtime } from "../_libs/@radix-ui/react-arrow+[...].mjs";
import { m as createFileRoute, p as lazyRouteComponent } from "../_libs/@tanstack/react-router+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-BjJVROom.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var Ctx = (0, import_react.createContext)(null);
function YearProvider({ children }) {
	const [year, setYearState] = (0, import_react.useState)(2026);
	const setYear = (y) => {
		setYearState((prev) => {
			if (typeof window !== "undefined" && y < prev) window.dispatchEvent(new CustomEvent("fx:confetti", { detail: { y: window.innerHeight * .35 } }));
			return y;
		});
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Ctx.Provider, {
		value: {
			year,
			setYear
		},
		children
	});
}
function useYear() {
	const v = (0, import_react.useContext)(Ctx);
	if (!v) throw new Error("useYear must be used within YearProvider");
	return v;
}
function colorForNode(activeOwnerCount) {
	if (activeOwnerCount >= 3) return "green";
	if (activeOwnerCount >= 1) return "yellow";
	return "red";
}
var $$splitComponentImporter = () => import("./routes-v_qHouBS.mjs");
var Route = createFileRoute("/")({
	validateSearch: (s) => ({ node: typeof s.node === "string" ? s.node : void 0 }),
	head: () => ({ meta: [{ title: "Plant Knowledge & Vulnerability Map — DeadMind" }, {
		name: "description",
		content: "Plant-wide risk profile, retirement timelines, and financial exposure of preserved expert knowledge."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
//#endregion
export { useYear as i, YearProvider as n, colorForNode as r, Route as t };
