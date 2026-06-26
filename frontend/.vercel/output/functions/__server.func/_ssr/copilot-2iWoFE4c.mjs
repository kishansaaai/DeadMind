import { m as createFileRoute, p as lazyRouteComponent } from "../_libs/@tanstack/react-router+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/copilot-2iWoFE4c.js
var $$splitComponentImporter = () => import("./copilot-BnhFzQ5W.mjs");
var Route = createFileRoute("/copilot")({
	validateSearch: (s) => ({ engineer: typeof s.engineer === "string" ? s.engineer : void 0 }),
	head: () => ({ meta: [{ title: "Expert Persona Copilot — DeadMind" }, {
		name: "description",
		content: "Chat with a preserved engineer's cognitive twin. Grounded, cited, uncertainty-quantified."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
//#endregion
export { Route as t };
