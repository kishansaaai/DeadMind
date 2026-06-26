import { o as __toESM } from "../_runtime.mjs";
import { t as cva } from "../_libs/class-variance-authority+clsx.mjs";
import { n as cn, t as api } from "./api-DhfdxvtO.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { i as Slot, l as require_jsx_runtime } from "../_libs/@radix-ui/react-arrow+[...].mjs";
import { n as QueryClient } from "../_libs/tanstack__query-core.mjs";
import { n as useQuery, r as QueryClientProvider } from "../_libs/tanstack__react-query.mjs";
import { S as Activity, T as PanelLeft, _ as Keyboard, a as Upload, c as ShieldCheck, d as Network, f as Moon, h as MessageSquareCode, m as MessageSquare, n as VolumeX, o as Sun, r as Volume2, t as X, x as Command } from "../_libs/lucide-react.mjs";
import { N as useNavigate, P as useRouter, c as HeadContent, d as createRouter, f as Outlet, g as Link, h as createRootRouteWithContext, l as useRouterState, m as createFileRoute, p as lazyRouteComponent, s as Scripts } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as Route$3 } from "./copilot-2iWoFE4c.mjs";
import { n as toast, t as Toaster } from "../_libs/sonner.mjs";
import { i as useYear, n as YearProvider, t as Route$4 } from "./routes-BjJVROom.mjs";
import { t as Root } from "../_libs/radix-ui__react-separator.mjs";
import { a as DialogOverlay, i as DialogDescription, n as DialogClose, o as DialogPortal, r as DialogContent, s as DialogTitle, t as Dialog } from "../_libs/@radix-ui/react-dialog+[...].mjs";
import { a as Trigger, i as Root3, n as Portal, r as Provider, t as Content2 } from "../_libs/@radix-ui/react-tooltip+[...].mjs";
import { i as SliderTrack, n as SliderRange, r as SliderThumb, t as Slider$1 } from "../_libs/@radix-ui/react-slider+[...].mjs";
import { n as AnimatePresence } from "../_libs/framer-motion.mjs";
import { t as motion } from "../_libs/motion.mjs";
import { t as _e } from "../_libs/cmdk.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/router-ntrdG6oZ.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var styles_default = "/assets/styles-BLBfn77z.css";
function reportLovableError(error, context = {}) {
	if (typeof window === "undefined") return;
	window.__lovableEvents?.captureException?.(error, {
		source: "react_error_boundary",
		route: window.location.pathname,
		...context
	}, {
		mechanism: "react_error_boundary",
		handled: false,
		severity: "error"
	});
}
var MOBILE_BREAKPOINT = 768;
function useIsMobile() {
	const [isMobile, setIsMobile] = import_react.useState(void 0);
	import_react.useEffect(() => {
		const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`);
		const onChange = () => {
			setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
		};
		mql.addEventListener("change", onChange);
		setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
		return () => mql.removeEventListener("change", onChange);
	}, []);
	return !!isMobile;
}
var buttonVariants = cva("inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium cursor-pointer transition-[background-color,color,border-color,box-shadow,transform] duration-200 ease-out outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background active:translate-y-px disabled:pointer-events-none disabled:opacity-50 disabled:cursor-not-allowed [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0", {
	variants: {
		variant: {
			default: "bg-primary text-primary-foreground shadow-sm hover:bg-primary/90 hover:shadow-md",
			destructive: "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90 hover:shadow-md",
			outline: "border border-border bg-background shadow-sm hover:bg-accent/10 hover:text-foreground hover:border-primary/40",
			secondary: "bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80",
			ghost: "hover:bg-accent/10 hover:text-foreground",
			link: "text-primary underline-offset-4 hover:underline"
		},
		size: {
			default: "h-9 px-4 py-2",
			sm: "h-8 rounded-md px-3 text-xs",
			lg: "h-10 rounded-md px-8",
			icon: "h-9 w-9"
		}
	},
	defaultVariants: {
		variant: "default",
		size: "default"
	}
});
var Button = import_react.forwardRef(({ className, variant, size, asChild = false, ...props }, ref) => {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(asChild ? Slot : "button", {
		className: cn(buttonVariants({
			variant,
			size,
			className
		})),
		ref,
		...props
	});
});
Button.displayName = "Button";
var Input = import_react.forwardRef(({ className, type, ...props }, ref) => {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
		type,
		className: cn("flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm", className),
		ref,
		...props
	});
});
Input.displayName = "Input";
var Separator = import_react.forwardRef(({ className, orientation = "horizontal", decorative = true, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Root, {
	ref,
	decorative,
	orientation,
	className: cn("shrink-0 bg-border", orientation === "horizontal" ? "h-[1px] w-full" : "h-full w-[1px]", className),
	...props
}));
Separator.displayName = Root.displayName;
var Sheet = Dialog;
var SheetPortal = DialogPortal;
var SheetOverlay = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogOverlay, {
	className: cn("fixed inset-0 z-50 bg-black/80  data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0", className),
	...props,
	ref
}));
SheetOverlay.displayName = DialogOverlay.displayName;
var sheetVariants = cva("fixed z-50 gap-4 bg-background p-6 shadow-lg transition ease-in-out data-[state=closed]:duration-300 data-[state=open]:duration-500 data-[state=open]:animate-in data-[state=closed]:animate-out", {
	variants: { side: {
		top: "inset-x-0 top-0 border-b data-[state=closed]:slide-out-to-top data-[state=open]:slide-in-from-top",
		bottom: "inset-x-0 bottom-0 border-t data-[state=closed]:slide-out-to-bottom data-[state=open]:slide-in-from-bottom",
		left: "inset-y-0 left-0 h-full w-3/4 border-r data-[state=closed]:slide-out-to-left data-[state=open]:slide-in-from-left sm:max-w-sm",
		right: "inset-y-0 right-0 h-full w-3/4 border-l data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right sm:max-w-sm"
	} },
	defaultVariants: { side: "right" }
});
var SheetContent = import_react.forwardRef(({ side = "right", className, children, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SheetPortal, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SheetOverlay, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, {
	ref,
	className: cn(sheetVariants({ side }), className),
	...props,
	children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogClose, {
		className: "absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background cursor-pointer transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-secondary",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "h-4 w-4" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "sr-only",
			children: "Close"
		})]
	}), children]
})] }));
SheetContent.displayName = DialogContent.displayName;
var SheetHeader = ({ className, ...props }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
	className: cn("flex flex-col space-y-2 text-center sm:text-left", className),
	...props
});
SheetHeader.displayName = "SheetHeader";
var SheetFooter = ({ className, ...props }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
	className: cn("flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2", className),
	...props
});
SheetFooter.displayName = "SheetFooter";
var SheetTitle = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, {
	ref,
	className: cn("text-lg font-semibold text-foreground", className),
	...props
}));
SheetTitle.displayName = DialogTitle.displayName;
var SheetDescription = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogDescription, {
	ref,
	className: cn("text-sm text-muted-foreground", className),
	...props
}));
SheetDescription.displayName = DialogDescription.displayName;
function Skeleton({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: cn("animate-pulse rounded-md bg-primary/10", className),
		...props
	});
}
var TooltipProvider = Provider;
var Tooltip = Root3;
var TooltipTrigger = Trigger;
var TooltipContent = import_react.forwardRef(({ className, sideOffset = 4, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Portal, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Content2, {
	ref,
	sideOffset,
	className: cn("z-50 overflow-hidden rounded-md bg-primary px-3 py-1.5 text-xs text-primary-foreground animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 origin-(--radix-tooltip-content-transform-origin)", className),
	...props
}) }));
TooltipContent.displayName = Content2.displayName;
var SIDEBAR_COOKIE_NAME = "sidebar_state";
var SIDEBAR_COOKIE_MAX_AGE = 3600 * 24 * 7;
var SIDEBAR_WIDTH = "16rem";
var SIDEBAR_WIDTH_MOBILE = "18rem";
var SIDEBAR_WIDTH_ICON = "3rem";
var SIDEBAR_KEYBOARD_SHORTCUT = "b";
var SidebarContext = import_react.createContext(null);
function useSidebar() {
	const context = import_react.useContext(SidebarContext);
	if (!context) throw new Error("useSidebar must be used within a SidebarProvider.");
	return context;
}
var SidebarProvider = import_react.forwardRef(({ defaultOpen = true, open: openProp, onOpenChange: setOpenProp, className, style, children, ...props }, ref) => {
	const isMobile = useIsMobile();
	const [openMobile, setOpenMobile] = import_react.useState(false);
	const [_open, _setOpen] = import_react.useState(defaultOpen);
	const open = openProp ?? _open;
	const setOpen = import_react.useCallback((value) => {
		const openState = typeof value === "function" ? value(open) : value;
		if (setOpenProp) setOpenProp(openState);
		else _setOpen(openState);
		document.cookie = `${SIDEBAR_COOKIE_NAME}=${openState}; path=/; max-age=${SIDEBAR_COOKIE_MAX_AGE}`;
	}, [setOpenProp, open]);
	const toggleSidebar = import_react.useCallback(() => {
		return isMobile ? setOpenMobile((open) => !open) : setOpen((open) => !open);
	}, [
		isMobile,
		setOpen,
		setOpenMobile
	]);
	import_react.useEffect(() => {
		const handleKeyDown = (event) => {
			if (event.key === SIDEBAR_KEYBOARD_SHORTCUT && (event.metaKey || event.ctrlKey)) {
				event.preventDefault();
				toggleSidebar();
			}
		};
		window.addEventListener("keydown", handleKeyDown);
		return () => window.removeEventListener("keydown", handleKeyDown);
	}, [toggleSidebar]);
	const state = open ? "expanded" : "collapsed";
	const contextValue = import_react.useMemo(() => ({
		state,
		open,
		setOpen,
		isMobile,
		openMobile,
		setOpenMobile,
		toggleSidebar
	}), [
		state,
		open,
		setOpen,
		isMobile,
		openMobile,
		setOpenMobile,
		toggleSidebar
	]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SidebarContext.Provider, {
		value: contextValue,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TooltipProvider, {
			delayDuration: 0,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				style: {
					"--sidebar-width": SIDEBAR_WIDTH,
					"--sidebar-width-icon": SIDEBAR_WIDTH_ICON,
					...style
				},
				className: cn("group/sidebar-wrapper flex min-h-svh w-full has-[[data-variant=inset]]:bg-sidebar", className),
				ref,
				...props,
				children
			})
		})
	});
});
SidebarProvider.displayName = "SidebarProvider";
var Sidebar = import_react.forwardRef(({ side = "left", variant = "sidebar", collapsible = "offcanvas", className, children, ...props }, ref) => {
	const { isMobile, state, openMobile, setOpenMobile } = useSidebar();
	if (collapsible === "none") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: cn("flex h-full w-(--sidebar-width) flex-col bg-sidebar text-sidebar-foreground", className),
		ref,
		...props,
		children
	});
	if (isMobile) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sheet, {
		open: openMobile,
		onOpenChange: setOpenMobile,
		...props,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SheetContent, {
			"data-sidebar": "sidebar",
			"data-mobile": "true",
			className: "w-(--sidebar-width) bg-sidebar p-0 text-sidebar-foreground [&>button]:hidden",
			style: { "--sidebar-width": SIDEBAR_WIDTH_MOBILE },
			side,
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SheetHeader, {
				className: "sr-only",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SheetTitle, { children: "Sidebar" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SheetDescription, { children: "Displays the mobile sidebar." })]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex h-full w-full flex-col",
				children
			})]
		})
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		ref,
		className: "group peer hidden text-sidebar-foreground md:block",
		"data-state": state,
		"data-collapsible": state === "collapsed" ? collapsible : "",
		"data-variant": variant,
		"data-side": side,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: cn("relative w-(--sidebar-width) bg-transparent transition-[width] duration-200 ease-linear", "group-data-[collapsible=offcanvas]:w-0", "group-data-[side=right]:rotate-180", variant === "floating" || variant === "inset" ? "group-data-[collapsible=icon]:w-[calc(var(--sidebar-width-icon)_+_theme(spacing.4))]" : "group-data-[collapsible=icon]:w-(--sidebar-width-icon)") }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: cn("fixed inset-y-0 z-10 hidden h-svh w-(--sidebar-width) transition-[left,right,width] duration-200 ease-linear md:flex", side === "left" ? "left-0 group-data-[collapsible=offcanvas]:left-[calc(var(--sidebar-width)*-1)]" : "right-0 group-data-[collapsible=offcanvas]:right-[calc(var(--sidebar-width)*-1)]", variant === "floating" || variant === "inset" ? "p-2 group-data-[collapsible=icon]:w-[calc(var(--sidebar-width-icon)_+_theme(spacing.4)_+2px)]" : "group-data-[collapsible=icon]:w-(--sidebar-width-icon) group-data-[side=left]:border-r group-data-[side=right]:border-l", className),
			...props,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				"data-sidebar": "sidebar",
				className: "flex h-full w-full flex-col bg-sidebar group-data-[variant=floating]:rounded-lg group-data-[variant=floating]:border group-data-[variant=floating]:border-sidebar-border group-data-[variant=floating]:shadow",
				children
			})
		})]
	});
});
Sidebar.displayName = "Sidebar";
var SidebarTrigger = import_react.forwardRef(({ className, onClick, ...props }, ref) => {
	const { toggleSidebar } = useSidebar();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
		ref,
		"data-sidebar": "trigger",
		variant: "ghost",
		size: "icon",
		className: cn("h-7 w-7", className),
		onClick: (event) => {
			onClick?.(event);
			toggleSidebar();
		},
		...props,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PanelLeft, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "sr-only",
			children: "Toggle Sidebar"
		})]
	});
});
SidebarTrigger.displayName = "SidebarTrigger";
var SidebarRail = import_react.forwardRef(({ className, ...props }, ref) => {
	const { toggleSidebar } = useSidebar();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
		ref,
		"data-sidebar": "rail",
		"aria-label": "Toggle Sidebar",
		tabIndex: -1,
		onClick: toggleSidebar,
		title: "Toggle Sidebar",
		className: cn("absolute inset-y-0 z-20 hidden w-4 -translate-x-1/2 transition-all ease-linear after:absolute after:inset-y-0 after:left-1/2 after:w-[2px] hover:after:bg-sidebar-border group-data-[side=left]:-right-4 group-data-[side=right]:left-0 sm:flex", "[[data-side=left]_&]:cursor-w-resize [[data-side=right]_&]:cursor-e-resize", "[[data-side=left][data-state=collapsed]_&]:cursor-e-resize [[data-side=right][data-state=collapsed]_&]:cursor-w-resize", "group-data-[collapsible=offcanvas]:translate-x-0 group-data-[collapsible=offcanvas]:after:left-full group-data-[collapsible=offcanvas]:hover:bg-sidebar", "[[data-side=left][data-collapsible=offcanvas]_&]:-right-2", "[[data-side=right][data-collapsible=offcanvas]_&]:-left-2", className),
		...props
	});
});
SidebarRail.displayName = "SidebarRail";
var SidebarInset = import_react.forwardRef(({ className, ...props }, ref) => {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
		ref,
		className: cn("relative flex w-full flex-1 flex-col bg-background", "md:peer-data-[variant=inset]:m-2 md:peer-data-[state=collapsed]:peer-data-[variant=inset]:ml-2 md:peer-data-[variant=inset]:ml-0 md:peer-data-[variant=inset]:rounded-xl md:peer-data-[variant=inset]:shadow", className),
		...props
	});
});
SidebarInset.displayName = "SidebarInset";
var SidebarInput = import_react.forwardRef(({ className, ...props }, ref) => {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
		ref,
		"data-sidebar": "input",
		className: cn("h-8 w-full bg-background shadow-none focus-visible:ring-2 focus-visible:ring-sidebar-ring", className),
		...props
	});
});
SidebarInput.displayName = "SidebarInput";
var SidebarHeader = import_react.forwardRef(({ className, ...props }, ref) => {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		ref,
		"data-sidebar": "header",
		className: cn("flex flex-col gap-2 p-2", className),
		...props
	});
});
SidebarHeader.displayName = "SidebarHeader";
var SidebarFooter = import_react.forwardRef(({ className, ...props }, ref) => {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		ref,
		"data-sidebar": "footer",
		className: cn("flex flex-col gap-2 p-2", className),
		...props
	});
});
SidebarFooter.displayName = "SidebarFooter";
var SidebarSeparator = import_react.forwardRef(({ className, ...props }, ref) => {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Separator, {
		ref,
		"data-sidebar": "separator",
		className: cn("mx-2 w-auto bg-sidebar-border", className),
		...props
	});
});
SidebarSeparator.displayName = "SidebarSeparator";
var SidebarContent = import_react.forwardRef(({ className, ...props }, ref) => {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		ref,
		"data-sidebar": "content",
		className: cn("flex min-h-0 flex-1 flex-col gap-2 overflow-auto group-data-[collapsible=icon]:overflow-hidden", className),
		...props
	});
});
SidebarContent.displayName = "SidebarContent";
var SidebarGroup = import_react.forwardRef(({ className, ...props }, ref) => {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		ref,
		"data-sidebar": "group",
		className: cn("relative flex w-full min-w-0 flex-col p-2", className),
		...props
	});
});
SidebarGroup.displayName = "SidebarGroup";
var SidebarGroupLabel = import_react.forwardRef(({ className, asChild = false, ...props }, ref) => {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(asChild ? Slot : "div", {
		ref,
		"data-sidebar": "group-label",
		className: cn("flex h-8 shrink-0 items-center rounded-md px-2 text-xs font-medium text-sidebar-foreground/70 outline-none ring-sidebar-ring transition-[margin,opacity] duration-200 ease-linear focus-visible:ring-2 [&>svg]:size-4 [&>svg]:shrink-0", "group-data-[collapsible=icon]:-mt-8 group-data-[collapsible=icon]:opacity-0", className),
		...props
	});
});
SidebarGroupLabel.displayName = "SidebarGroupLabel";
var SidebarGroupAction = import_react.forwardRef(({ className, asChild = false, ...props }, ref) => {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(asChild ? Slot : "button", {
		ref,
		"data-sidebar": "group-action",
		className: cn("absolute right-3 top-3.5 flex aspect-square w-5 items-center justify-center rounded-md p-0 text-sidebar-foreground outline-none ring-sidebar-ring cursor-pointer transition-transform hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus-visible:ring-2 [&>svg]:size-4 [&>svg]:shrink-0", "after:absolute after:-inset-2 after:md:hidden", "group-data-[collapsible=icon]:hidden", className),
		...props
	});
});
SidebarGroupAction.displayName = "SidebarGroupAction";
var SidebarGroupContent = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
	ref,
	"data-sidebar": "group-content",
	className: cn("w-full text-sm", className),
	...props
}));
SidebarGroupContent.displayName = "SidebarGroupContent";
var SidebarMenu = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
	ref,
	"data-sidebar": "menu",
	className: cn("flex w-full min-w-0 flex-col gap-1", className),
	...props
}));
SidebarMenu.displayName = "SidebarMenu";
var SidebarMenuItem = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
	ref,
	"data-sidebar": "menu-item",
	className: cn("group/menu-item relative", className),
	...props
}));
SidebarMenuItem.displayName = "SidebarMenuItem";
var sidebarMenuButtonVariants = cva("peer/menu-button flex w-full items-center gap-2 overflow-hidden rounded-md p-2 text-left text-sm outline-none ring-sidebar-ring cursor-pointer transition-[width,height,padding] hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus-visible:ring-2 active:bg-sidebar-accent active:text-sidebar-accent-foreground disabled:pointer-events-none disabled:opacity-50 disabled:cursor-not-allowed group-has-[[data-sidebar=menu-action]]/menu-item:pr-8 aria-disabled:pointer-events-none aria-disabled:opacity-50 data-[active=true]:bg-sidebar-accent data-[active=true]:font-medium data-[active=true]:text-sidebar-accent-foreground data-[state=open]:hover:bg-sidebar-accent data-[state=open]:hover:text-sidebar-accent-foreground group-data-[collapsible=icon]:!size-8 group-data-[collapsible=icon]:!p-2 [&>span:last-child]:truncate [&>svg]:size-4 [&>svg]:shrink-0", {
	variants: {
		variant: {
			default: "hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
			outline: "bg-background shadow-[0_0_0_1px_var(--sidebar-border)] hover:bg-sidebar-accent hover:text-sidebar-accent-foreground hover:shadow-[0_0_0_1px_var(--sidebar-accent)]"
		},
		size: {
			default: "h-8 text-sm",
			sm: "h-7 text-xs",
			lg: "h-12 text-sm group-data-[collapsible=icon]:!p-0"
		}
	},
	defaultVariants: {
		variant: "default",
		size: "default"
	}
});
var SidebarMenuButton = import_react.forwardRef(({ asChild = false, isActive = false, variant = "default", size = "default", tooltip, className, ...props }, ref) => {
	const Comp = asChild ? Slot : "button";
	const { isMobile, state } = useSidebar();
	const button = /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Comp, {
		ref,
		"data-sidebar": "menu-button",
		"data-size": size,
		"data-active": isActive,
		className: cn(sidebarMenuButtonVariants({
			variant,
			size
		}), className),
		...props
	});
	if (!tooltip) return button;
	if (typeof tooltip === "string") tooltip = { children: tooltip };
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Tooltip, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TooltipTrigger, {
		asChild: true,
		children: button
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TooltipContent, {
		side: "right",
		align: "center",
		hidden: state !== "collapsed" || isMobile,
		...tooltip
	})] });
});
SidebarMenuButton.displayName = "SidebarMenuButton";
var SidebarMenuAction = import_react.forwardRef(({ className, asChild = false, showOnHover = false, ...props }, ref) => {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(asChild ? Slot : "button", {
		ref,
		"data-sidebar": "menu-action",
		className: cn("absolute right-1 top-1.5 flex aspect-square w-5 items-center justify-center rounded-md p-0 text-sidebar-foreground outline-none ring-sidebar-ring cursor-pointer transition-transform hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus-visible:ring-2 peer-hover/menu-button:text-sidebar-accent-foreground [&>svg]:size-4 [&>svg]:shrink-0", "after:absolute after:-inset-2 after:md:hidden", "peer-data-[size=sm]/menu-button:top-1", "peer-data-[size=default]/menu-button:top-1.5", "peer-data-[size=lg]/menu-button:top-2.5", "group-data-[collapsible=icon]:hidden", showOnHover && "group-focus-within/menu-item:opacity-100 group-hover/menu-item:opacity-100 data-[state=open]:opacity-100 peer-data-[active=true]/menu-button:text-sidebar-accent-foreground md:opacity-0", className),
		...props
	});
});
SidebarMenuAction.displayName = "SidebarMenuAction";
var SidebarMenuBadge = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
	ref,
	"data-sidebar": "menu-badge",
	className: cn("pointer-events-none absolute right-1 flex h-5 min-w-5 select-none items-center justify-center rounded-md px-1 text-xs font-medium tabular-nums text-sidebar-foreground", "peer-hover/menu-button:text-sidebar-accent-foreground peer-data-[active=true]/menu-button:text-sidebar-accent-foreground", "peer-data-[size=sm]/menu-button:top-1", "peer-data-[size=default]/menu-button:top-1.5", "peer-data-[size=lg]/menu-button:top-2.5", "group-data-[collapsible=icon]:hidden", className),
	...props
}));
SidebarMenuBadge.displayName = "SidebarMenuBadge";
var SidebarMenuSkeleton = import_react.forwardRef(({ className, showIcon = false, ...props }, ref) => {
	const width = import_react.useMemo(() => {
		return `${Math.floor(Math.random() * 40) + 50}%`;
	}, []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		ref,
		"data-sidebar": "menu-skeleton",
		className: cn("flex h-8 items-center gap-2 rounded-md px-2", className),
		...props,
		children: [showIcon && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, {
			className: "size-4 rounded-md",
			"data-sidebar": "menu-skeleton-icon"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, {
			className: "h-4 max-w-(--skeleton-width) flex-1",
			"data-sidebar": "menu-skeleton-text",
			style: { "--skeleton-width": width }
		})]
	});
});
SidebarMenuSkeleton.displayName = "SidebarMenuSkeleton";
var SidebarMenuSub = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
	ref,
	"data-sidebar": "menu-sub",
	className: cn("mx-3.5 flex min-w-0 translate-x-px flex-col gap-1 border-l border-sidebar-border px-2.5 py-0.5", "group-data-[collapsible=icon]:hidden", className),
	...props
}));
SidebarMenuSub.displayName = "SidebarMenuSub";
var SidebarMenuSubItem = import_react.forwardRef(({ ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
	ref,
	...props
}));
SidebarMenuSubItem.displayName = "SidebarMenuSubItem";
var SidebarMenuSubButton = import_react.forwardRef(({ asChild = false, size = "md", isActive, className, ...props }, ref) => {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(asChild ? Slot : "a", {
		ref,
		"data-sidebar": "menu-sub-button",
		"data-size": size,
		"data-active": isActive,
		className: cn("flex h-7 min-w-0 -translate-x-px items-center gap-2 overflow-hidden rounded-md px-2 text-sidebar-foreground outline-none ring-sidebar-ring cursor-pointer hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus-visible:ring-2 active:bg-sidebar-accent active:text-sidebar-accent-foreground disabled:pointer-events-none disabled:opacity-50 disabled:cursor-not-allowed aria-disabled:pointer-events-none aria-disabled:opacity-50 [&>span:last-child]:truncate [&>svg]:size-4 [&>svg]:shrink-0 [&>svg]:text-sidebar-accent-foreground", "data-[active=true]:bg-sidebar-accent data-[active=true]:text-sidebar-accent-foreground", size === "sm" && "text-xs", size === "md" && "text-sm", "group-data-[collapsible=icon]:hidden", className),
		...props
	});
});
SidebarMenuSubButton.displayName = "SidebarMenuSubButton";
var items = [
	{
		title: "Plant Map",
		url: "/",
		icon: Network,
		role: "CFO"
	},
	{
		title: "Expert Copilot",
		url: "/copilot",
		icon: MessageSquareCode,
		role: "Technician"
	},
	{
		title: "Operations Audit",
		url: "/audit",
		icon: ShieldCheck,
		role: "Plant Head"
	},
	{
		title: "Ingestion",
		url: "/ingest",
		icon: Upload,
		role: "Admin"
	}
];
function AppSidebar() {
	const { state } = useSidebar();
	const collapsed = state === "collapsed";
	const currentPath = useRouterState({ select: (s) => s.location.pathname });
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Sidebar, {
		collapsible: "icon",
		className: "border-r border-border bg-sidebar",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SidebarHeader, {
			className: "border-b border-border px-3 py-4",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
				to: "/",
				className: "flex items-center gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "h-7 w-7 border-2 border-primary bg-primary/10 flex items-center justify-center gold-glow",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "font-display font-bold text-primary text-sm",
						children: "D"
					})
				}), !collapsed && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-col leading-tight",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "font-display font-bold uppercase tracking-[0.2em] text-foreground text-sm",
						children: "DeadMind"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-[0.6rem] uppercase tracking-[0.25em] text-muted-foreground",
						children: "Preserve · Recall · Audit"
					})]
				})]
			})
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SidebarContent, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SidebarGroup, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SidebarGroupContent, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SidebarMenu, { children: items.map((item) => {
			return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SidebarMenuItem, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SidebarMenuButton, {
				asChild: true,
				isActive: item.url === "/" ? currentPath === "/" : currentPath.startsWith(item.url),
				className: "rounded-none data-[active=true]:bg-primary/10 data-[active=true]:text-primary data-[active=true]:border-l-2 data-[active=true]:border-primary h-auto py-3",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: item.url,
					className: "flex items-start gap-3 group hover-bounce-x",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(item.icon, { className: "h-5 w-5 shrink-0 mt-0.5 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-[-6deg] group-data-[active=true]:scale-110" }), !collapsed && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-col leading-tight",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "font-display uppercase tracking-wider text-[0.85rem]",
							children: item.title
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "text-[0.6rem] uppercase tracking-widest text-muted-foreground",
							children: [item.role, " view"]
						})]
					})]
				})
			}) }, item.title);
		}) }) }) }) })]
	});
}
var Slider = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Slider$1, {
	ref,
	className: cn("relative flex w-full touch-none select-none items-center", className),
	...props,
	children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SliderTrack, {
		className: "relative h-1.5 w-full grow overflow-hidden rounded-full bg-primary/20",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SliderRange, { className: "absolute h-full bg-primary" })
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SliderThumb, { className: "block h-4 w-4 rounded-full border border-primary/50 bg-background shadow transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50" })]
}));
Slider.displayName = Slider$1.displayName;
function formatCrore(rupees) {
	const crore = rupees / 1e7;
	return crore >= 1 ? `₹${crore.toFixed(2)} Cr` : `₹${(rupees / 1e5).toFixed(2)} L`;
}
function YearExposureBar() {
	const { year, setYear } = useYear();
	const { data, isLoading, isError } = useQuery({
		queryKey: ["vulnerability-map"],
		queryFn: api.vulnerabilityMap,
		staleTime: 6e4
	});
	const redExposure = (data ?? []).filter((n) => (n.active_engineers ?? []).filter((e) => e.retirement_year >= year).length === 0).reduce((sum, n) => sum + n.downtime_cost, 0);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex items-center gap-6 px-4 py-2 border-b border-border bg-sidebar/60 backdrop-blur",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-center gap-3 min-w-[18rem] flex-1 max-w-2xl",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "section-label whitespace-nowrap",
					children: "Simulation Year"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Slider, {
					min: 2026,
					max: 2036,
					step: 1,
					value: [year],
					onValueChange: (v) => setYear(v[0] ?? 2026),
					className: "flex-1"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "font-counter text-primary text-lg tabular-nums w-14 text-right rounded-full px-1 animate-scrub-pulse",
					children: year
				}, year)
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex flex-col items-end leading-none",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "section-label",
				children: "Exposure Loss"
			}), isLoading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "text-muted-foreground text-sm",
				children: "…"
			}) : isError ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "text-destructive text-xs uppercase",
				children: "backend offline"
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "rupee-counter text-2xl",
				children: formatCrore(redExposure)
			})]
		})]
	});
}
var Toaster$1 = ({ ...props }) => {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Toaster, {
		className: "toaster group",
		toastOptions: { classNames: {
			toast: "group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg",
			description: "group-[.toast]:text-muted-foreground",
			actionButton: "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground",
			cancelButton: "group-[.toast]:bg-muted group-[.toast]:text-muted-foreground"
		} },
		...props
	});
};
var Ctx = (0, import_react.createContext)(null);
function ThemeProvider({ children }) {
	const [theme, setThemeState] = (0, import_react.useState)("dark");
	(0, import_react.useEffect)(() => {
		const stored = typeof window !== "undefined" && localStorage.getItem("deadmind-theme");
		if (stored === "light" || stored === "dark") setThemeState(stored);
	}, []);
	(0, import_react.useEffect)(() => {
		const root = document.documentElement;
		root.classList.toggle("dark", theme === "dark");
		root.classList.toggle("light", theme === "light");
		try {
			localStorage.setItem("deadmind-theme", theme);
		} catch {}
	}, [theme]);
	const setTheme = (t) => setThemeState(t);
	const toggle = () => setThemeState((t) => t === "dark" ? "light" : "dark");
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Ctx.Provider, {
		value: {
			theme,
			setTheme,
			toggle
		},
		children
	});
}
function useTheme() {
	const v = (0, import_react.useContext)(Ctx);
	if (!v) throw new Error("useTheme must be used within ThemeProvider");
	return v;
}
function ThemeToggle() {
	const { theme, toggle } = useTheme();
	const btnRef = (0, import_react.useRef)(null);
	const handle = () => {
		const doc = document;
		if (!doc.startViewTransition || !btnRef.current) {
			toggle();
			return;
		}
		const rect = btnRef.current.getBoundingClientRect();
		const x = rect.left + rect.width / 2;
		const y = rect.top + rect.height / 2;
		const endRadius = Math.hypot(Math.max(x, window.innerWidth - x), Math.max(y, window.innerHeight - y));
		document.documentElement.style.setProperty("--vt-x", `${x}px`);
		document.documentElement.style.setProperty("--vt-y", `${y}px`);
		document.documentElement.style.setProperty("--vt-r", `${endRadius}px`);
		doc.startViewTransition(() => {
			toggle();
		}).ready.then(() => {
			document.documentElement.animate({ clipPath: [`circle(0 at ${x}px ${y}px)`, `circle(${endRadius}px at ${x}px ${y}px)`] }, {
				duration: 600,
				easing: "cubic-bezier(0.2, 0.8, 0.2, 1)",
				pseudoElement: "::view-transition-new(root)"
			});
		});
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
		ref: btnRef,
		type: "button",
		onClick: handle,
		"aria-label": `Switch to ${theme === "dark" ? "light" : "dark"} mode`,
		title: `Switch to ${theme === "dark" ? "light" : "dark"} mode`,
		className: "inline-flex items-center gap-2 h-8 px-3 border border-border rounded-md bg-card hover:bg-accent/10 hover:scale-105 transition-all cursor-pointer",
		children: [theme === "dark" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sun, { className: "h-4 w-4 text-primary" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Moon, { className: "h-4 w-4 text-primary" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "font-display uppercase tracking-widest text-[0.65rem] text-muted-foreground",
			children: theme === "dark" ? "Light" : "Dark"
		})]
	});
}
var SEEN_KEY = "deadmind:booted";
function BootSequence() {
	const [show, setShow] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		if (typeof window === "undefined") return;
		if (sessionStorage.getItem(SEEN_KEY)) return;
		setShow(true);
		sessionStorage.setItem(SEEN_KEY, "1");
		const t = setTimeout(() => setShow(false), 1600);
		return () => clearTimeout(t);
	}, []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimatePresence, { children: show && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
		initial: { opacity: 1 },
		exit: { opacity: 0 },
		transition: {
			duration: .5,
			ease: [
				.7,
				0,
				.3,
				1
			]
		},
		className: "fixed inset-0 z-[200] flex items-center justify-center bg-background",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
			initial: { y: "-100%" },
			animate: { y: "100%" },
			transition: {
				duration: 1.2,
				ease: "easeInOut"
			},
			className: "absolute inset-x-0 h-px bg-primary shadow-[0_0_24px_4px_var(--color-primary)] opacity-80"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex flex-col items-center gap-3",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
					initial: {
						opacity: 0,
						letterSpacing: "0.6em"
					},
					animate: {
						opacity: 1,
						letterSpacing: "0.25em"
					},
					transition: {
						duration: .9,
						ease: [
							.2,
							.8,
							.2,
							1
						]
					},
					className: "font-display text-3xl sm:text-5xl uppercase text-foreground",
					children: "DeadMind"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
					initial: { opacity: 0 },
					animate: { opacity: 1 },
					transition: {
						delay: .4,
						duration: .6
					},
					className: "font-mono text-[10px] uppercase tracking-[0.4em] text-muted-foreground",
					children: "Preserving cognition · v2.1"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
					initial: { width: 0 },
					animate: { width: "180px" },
					transition: {
						delay: .5,
						duration: .8,
						ease: "easeOut"
					},
					className: "mt-4 h-px bg-gradient-to-r from-transparent via-primary to-transparent"
				})
			]
		})]
	}, "boot") });
}
function PageTransition({ children }) {
	const location = useRouterState({ select: (s) => s.location.pathname });
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimatePresence, {
		mode: "wait",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
			initial: {
				opacity: 0,
				y: 18,
				scale: .985,
				filter: "blur(8px)",
				clipPath: "inset(0 0 100% 0)"
			},
			animate: {
				opacity: 1,
				y: 0,
				scale: 1,
				filter: "blur(0px)",
				clipPath: "inset(0 0 0% 0)"
			},
			exit: {
				opacity: 0,
				y: -10,
				scale: .99,
				filter: "blur(6px)",
				clipPath: "inset(0 0 0% 0)"
			},
			transition: {
				duration: .5,
				ease: [
					.22,
					1,
					.36,
					1
				]
			},
			className: "min-h-full",
			children
		}, location)
	});
}
var ROUTES = [
	{
		label: "Plant Map",
		hint: "CFO · Vulnerability schematic",
		to: "/",
		icon: Activity
	},
	{
		label: "Expert Copilot",
		hint: "Technician · Cognitive chat",
		to: "/copilot",
		icon: MessageSquare
	},
	{
		label: "Operations Audit",
		hint: "Plant Head · Compliance",
		to: "/audit",
		icon: ShieldCheck
	},
	{
		label: "Ingestion",
		hint: "Admin · Capture & coreference",
		to: "/ingest",
		icon: Upload
	}
];
function CommandPalette() {
	const [open, setOpen] = (0, import_react.useState)(false);
	const navigate = useNavigate();
	const { theme, setTheme } = useTheme();
	(0, import_react.useEffect)(() => {
		const onKey = (e) => {
			if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
				e.preventDefault();
				setOpen((o) => !o);
			}
			if (e.key === "Escape") setOpen(false);
		};
		window.addEventListener("keydown", onKey);
		return () => window.removeEventListener("keydown", onKey);
	}, []);
	if (!open) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "fixed inset-0 z-[150] flex items-start justify-center p-4 pt-[18vh] animate-fade-in",
		onClick: () => setOpen(false),
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "absolute inset-0 bg-background/60 backdrop-blur-md",
			"aria-hidden": true
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "relative w-full max-w-xl glass-card animate-scale-in",
			onClick: (e) => e.stopPropagation(),
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(_e, {
				label: "Command palette",
				className: "w-full",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(_e.Input, {
						autoFocus: true,
						placeholder: "Search engineers, equipment, or jump to a view…",
						className: "w-full bg-transparent px-5 py-4 font-sans text-base text-foreground placeholder:text-muted-foreground outline-none border-b border-border"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(_e.List, {
						className: "max-h-80 overflow-y-auto p-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(_e.Empty, {
								className: "px-4 py-6 text-center font-mono text-xs uppercase tracking-widest text-muted-foreground",
								children: "No matches"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(_e.Group, {
								heading: "Navigate",
								className: "px-2 pt-2 text-[10px] font-display uppercase tracking-[0.2em] text-muted-foreground",
								children: ROUTES.map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(_e.Item, {
									value: `${r.label} ${r.hint}`,
									onSelect: () => {
										setOpen(false);
										navigate({ to: r.to });
									},
									className: "flex cursor-pointer items-center gap-3 rounded-md px-3 py-2.5 text-sm text-foreground data-[selected=true]:bg-primary/15 data-[selected=true]:text-foreground",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(r.icon, { className: "h-4 w-4 text-primary" }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "flex-1",
											children: r.label
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "font-mono text-[10px] uppercase tracking-wider text-muted-foreground",
											children: r.hint
										})
									]
								}, r.to))
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(_e.Group, {
								heading: "Theme",
								className: "px-2 pt-3 text-[10px] font-display uppercase tracking-[0.2em] text-muted-foreground",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(_e.Item, {
									value: "toggle theme dark light",
									onSelect: () => {
										setTheme(theme === "dark" ? "light" : "dark");
										setOpen(false);
									},
									className: "flex cursor-pointer items-center gap-3 rounded-md px-3 py-2.5 text-sm text-foreground data-[selected=true]:bg-primary/15",
									children: [theme === "dark" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sun, { className: "h-4 w-4 text-primary" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Moon, { className: "h-4 w-4 text-primary" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
										"Switch to ",
										theme === "dark" ? "light" : "dark",
										" mode"
									] })]
								})
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center justify-between border-t border-border px-4 py-2 text-[10px] font-mono uppercase tracking-widest text-muted-foreground",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "↵ select · ↑↓ navigate" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "ESC close" })]
					})
				]
			})
		})]
	});
}
/**
* Global cursor spotlight: tracks pointer and writes --mx/--my CSS vars
* on any .glass-card under the cursor. Combined with the CSS rule in
* styles.css, this paints a soft following highlight on every card.
*/
function SpotlightTracker() {
	(0, import_react.useEffect)(() => {
		if (typeof window === "undefined") return;
		if (window.matchMedia("(pointer: coarse)").matches) return;
		const handler = (e) => {
			const target = e.target;
			if (!target) return;
			const card = target.closest(".glass-card");
			if (!card) return;
			const rect = card.getBoundingClientRect();
			const x = (e.clientX - rect.left) / rect.width * 100;
			const y = (e.clientY - rect.top) / rect.height * 100;
			card.style.setProperty("--mx", `${x}%`);
			card.style.setProperty("--my", `${y}%`);
		};
		window.addEventListener("pointermove", handler, { passive: true });
		return () => window.removeEventListener("pointermove", handler);
	}, []);
	return null;
}
/** Wraps a button/link and gently attracts it toward the cursor on hover. */
function Magnetic({ children, strength = .25, className }) {
	const ref = (0, import_react.useRef)(null);
	const onMove = (e) => {
		const el = ref.current;
		if (!el) return;
		const rect = el.getBoundingClientRect();
		const x = e.clientX - (rect.left + rect.width / 2);
		const y = e.clientY - (rect.top + rect.height / 2);
		el.style.transform = `translate3d(${x * strength}px, ${y * strength}px, 0)`;
	};
	const onLeave = () => {
		const el = ref.current;
		if (!el) return;
		el.style.transform = "translate3d(0,0,0)";
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		ref,
		onPointerMove: onMove,
		onPointerLeave: onLeave,
		className: "inline-block transition-transform duration-300 ease-[cubic-bezier(0.2,0.8,0.2,1)] will-change-transform " + (className ?? ""),
		children
	});
}
var SHORTCUTS = [
	{
		keys: ["⌘", "K"],
		label: "Open command palette"
	},
	{
		keys: ["?"],
		label: "Toggle this shortcuts overlay"
	},
	{
		keys: ["G", "M"],
		label: "Go to Plant Map"
	},
	{
		keys: ["G", "C"],
		label: "Go to Copilot"
	},
	{
		keys: ["G", "A"],
		label: "Go to Audit"
	},
	{
		keys: ["G", "I"],
		label: "Go to Ingestion"
	},
	{
		keys: ["T"],
		label: "Toggle theme"
	},
	{
		keys: ["Esc"],
		label: "Close any open overlay"
	}
];
/** Press '?' anywhere to toggle. */
function ShortcutsOverlay() {
	const [open, setOpen] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		const onKey = (e) => {
			const target = e.target;
			const inField = target && (target.tagName === "INPUT" || target.tagName === "TEXTAREA" || target.isContentEditable);
			if (e.key === "Escape") return setOpen(false);
			if (!inField && e.key === "?") {
				e.preventDefault();
				setOpen((o) => !o);
			}
		};
		window.addEventListener("keydown", onKey);
		return () => window.removeEventListener("keydown", onKey);
	}, []);
	if (!open) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "fixed inset-0 z-[80] flex items-center justify-center bg-background/70 backdrop-blur-md animate-fade-in",
		onClick: () => setOpen(false),
		role: "dialog",
		"aria-label": "Keyboard shortcuts",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			onClick: (e) => e.stopPropagation(),
			className: "glass-card max-w-md w-[90%] p-6 animate-scale-in",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center justify-between mb-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-display uppercase tracking-[0.2em] text-sm text-primary",
						children: "Keyboard Shortcuts"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: () => setOpen(false),
						"aria-label": "Close shortcuts",
						className: "text-muted-foreground hover:text-foreground",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "h-4 w-4" })
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "space-y-2",
					children: SHORTCUTS.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
						className: "flex items-center justify-between gap-3 text-sm",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-muted-foreground",
							children: s.label
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "flex items-center gap-1",
							children: s.keys.map((k) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("kbd", {
								className: "font-mono text-[10px] uppercase tracking-widest px-2 py-1 rounded-md border border-border bg-card/80 shadow-sm",
								children: k
							}, k))
						})]
					}, s.label))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-4 text-[10px] uppercase tracking-widest text-muted-foreground text-center",
					children: [
						"Press ",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("kbd", {
							className: "font-mono px-1",
							children: "?"
						}),
						" any time to reopen"
					]
				})
			]
		})
	});
}
var MAP = {
	m: {
		to: "/",
		label: "Plant Map"
	},
	c: {
		to: "/copilot",
		label: "Copilot"
	},
	a: {
		to: "/audit",
		label: "Audit"
	},
	i: {
		to: "/ingest",
		label: "Ingestion"
	}
};
/** Vim-style 'g <key>' to jump between views, 't' to toggle theme. */
function RouteShortcuts() {
	const navigate = useNavigate();
	const theme = useTheme();
	const pendingG = (0, import_react.useRef)(false);
	const timer = (0, import_react.useRef)(null);
	(0, import_react.useEffect)(() => {
		const onKey = (e) => {
			const target = e.target;
			if (target && (target.tagName === "INPUT" || target.tagName === "TEXTAREA" || target.isContentEditable) || e.metaKey || e.ctrlKey || e.altKey) return;
			const k = e.key.toLowerCase();
			if (pendingG.current && MAP[k]) {
				e.preventDefault();
				pendingG.current = false;
				if (timer.current) clearTimeout(timer.current);
				const dest = MAP[k];
				navigate({ to: dest.to });
				toast(`→ ${dest.label}`);
				return;
			}
			if (k === "g") {
				pendingG.current = true;
				if (timer.current) clearTimeout(timer.current);
				timer.current = setTimeout(() => {
					pendingG.current = false;
				}, 900);
				return;
			}
			if (k === "t") {
				e.preventDefault();
				theme.toggle();
				toast(`Theme: ${theme.theme === "dark" ? "light" : "dark"}`);
			}
		};
		window.addEventListener("keydown", onKey);
		return () => {
			window.removeEventListener("keydown", onKey);
			if (timer.current) clearTimeout(timer.current);
		};
	}, [navigate, theme]);
	return null;
}
/**
* Global click ripple — emits a brief concentric ring from the click point.
* Listens on document, ignores text-input targets, respects reduced motion.
*/
function ClickRipple() {
	(0, import_react.useEffect)(() => {
		if (typeof window === "undefined") return;
		if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
		const onClick = (e) => {
			if (e.target?.closest("input, textarea, [contenteditable='true']")) return;
			const r = document.createElement("span");
			r.setAttribute("aria-hidden", "true");
			r.style.cssText = `
        position: fixed;
        left: ${e.clientX}px;
        top: ${e.clientY}px;
        width: 8px; height: 8px;
        border-radius: 9999px;
        border: 2px solid oklch(from var(--color-primary) l c h / 0.7);
        transform: translate(-50%, -50%) scale(1);
        pointer-events: none;
        z-index: 9999;
        opacity: 0.9;
        animation: clickRipple 600ms cubic-bezier(0.22, 1, 0.36, 1) forwards;
        mix-blend-mode: screen;
      `;
			document.body.appendChild(r);
			setTimeout(() => r.remove(), 650);
		};
		document.addEventListener("click", onClick, { passive: true });
		return () => document.removeEventListener("click", onClick);
	}, []);
	return null;
}
/**
* Cinematic route transition overlay:
*  - top progress bar synced to router loading state
*  - scanline wipe across the viewport on every navigation
*  - corner crosshair brackets that snap in/out
*  - radial flash + film grain pulse
*
* Mount once near the top of the app (inside SidebarProvider is fine).
*/
function RouteCinematic() {
	const status = useRouterState({ select: (s) => s.status });
	const [progress, setProgress] = (0, import_react.useState)(0);
	const [showProgress, setShowProgress] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		let raf = 0;
		let timeout;
		if (status === "pending") {
			window.dispatchEvent(new CustomEvent("fx:route"));
			setShowProgress(true);
			setProgress(8);
			const tick = () => {
				setProgress((p) => {
					const target = 92;
					const next = p + (target - p) * .05;
					return next > target ? target : next;
				});
				raf = requestAnimationFrame(tick);
			};
			raf = requestAnimationFrame(tick);
		} else {
			setProgress(100);
			timeout = setTimeout(() => {
				setShowProgress(false);
				setProgress(0);
			}, 320);
		}
		return () => {
			cancelAnimationFrame(raf);
			if (timeout) clearTimeout(timeout);
		};
	}, [status]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		"aria-hidden": true,
		className: "pointer-events-none fixed left-0 right-0 top-0 z-[80] h-[2px]",
		style: {
			opacity: showProgress ? 1 : 0,
			transition: "opacity 200ms"
		},
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "h-full origin-left",
			style: {
				width: `${progress}%`,
				background: "linear-gradient(90deg, transparent, var(--color-primary) 30%, oklch(from var(--color-primary) calc(l + 0.15) c h) 60%, var(--color-primary) 80%, transparent)",
				boxShadow: "0 0 12px var(--color-primary), 0 0 24px oklch(from var(--color-primary) l c h / 0.4)",
				transition: "width 160ms cubic-bezier(0.2, 0.8, 0.2, 1)"
			}
		})
	}) });
}
var FEED = [
	"TURBINE-04 vibration nominal",
	"EXPERT R. NAYAR · 14 mo to retirement",
	"BOILER-2 SOP coverage 62%",
	"COGNITIVE DECAY MODEL · re-ran @ 12:04",
	"INGEST QUEUE · 3 voice notes pending",
	"SHADOW SOP detected · NIGHT SHIFT",
	"COMPLIANCE INDEX · 0.84 ↑",
	"KNOWLEDGE FRESHNESS · 73%"
];
/**
* Live status ticker — a marquee strip of fake-but-believable plant events,
* plus the current pathname. Pure CSS animation, GPU-only.
*/
function StatusTicker() {
	const pathname = useRouterState({ select: (s) => s.location.pathname });
	const [now, setNow] = (0, import_react.useState)("");
	(0, import_react.useEffect)(() => {
		const fmt = () => (/* @__PURE__ */ new Date()).toLocaleTimeString([], {
			hour: "2-digit",
			minute: "2-digit",
			second: "2-digit"
		});
		setNow(fmt());
		const id = setInterval(() => setNow(fmt()), 1e3);
		return () => clearInterval(id);
	}, []);
	const items = [
		`PATH ${pathname}`,
		`T ${now}`,
		...FEED
	];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "relative h-6 overflow-hidden border-y border-border bg-card/60 backdrop-blur-sm",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "absolute inset-y-0 flex items-center gap-8 whitespace-nowrap font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground",
			style: {
				animation: "tickerScroll 60s linear infinite",
				willChange: "transform"
			},
			children: [...items, ...items].map((t, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
				className: "flex items-center gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "inline-block h-1.5 w-1.5 rounded-full bg-primary shadow-[0_0_8px_var(--color-primary)]" }), t]
			}, i))
		})
	});
}
/**
* Global animation mounter:
*  - Auto-attaches `data-anim-reveal` to .glass-card so they enter on scroll
*  - IntersectionObserver toggles data-anim-reveal="in"
*  - Magnetic attraction for elements with [data-magnetic]
*  - Parallax-y for elements with .parallax-y (drift on scroll)
*/
function GlobalAnim() {
	(0, import_react.useEffect)(() => {
		if (typeof window === "undefined") return;
		if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
		const io = new IntersectionObserver((entries) => {
			for (const e of entries) if (e.isIntersecting) {
				e.target.dataset.animReveal = "in";
				io.unobserve(e.target);
			}
		}, {
			rootMargin: "0px 0px -8% 0px",
			threshold: .06
		});
		const attach = (el) => {
			const h = el;
			if (h.dataset.animReveal) return;
			h.dataset.animReveal = "out";
			io.observe(h);
		};
		document.querySelectorAll(".glass-card, [data-reveal], [data-draw]").forEach(attach);
		document.querySelectorAll("[data-draw] path, path[data-draw]").forEach((p) => {
			try {
				const len = p.getTotalLength();
				p.style.strokeDasharray = String(len);
				p.style.strokeDashoffset = String(len);
				p.style.transition = "stroke-dashoffset 1400ms cubic-bezier(0.2,0.8,0.2,1)";
				const host = p.closest("[data-draw]") ?? p;
				const obs = new IntersectionObserver((es) => {
					es.forEach((e) => {
						if (e.isIntersecting) {
							p.style.strokeDashoffset = "0";
							obs.disconnect();
						}
					});
				}, { threshold: .2 });
				obs.observe(host);
			} catch {}
		});
		const mo = new MutationObserver((mutations) => {
			for (const m of mutations) m.addedNodes.forEach((n) => {
				if (!(n instanceof HTMLElement)) return;
				if (n.matches?.(".glass-card, [data-reveal]")) attach(n);
				n.querySelectorAll?.(".glass-card, [data-reveal]").forEach(attach);
			});
		});
		mo.observe(document.body, {
			childList: true,
			subtree: true
		});
		const onPointerMove = (ev) => {
			const target = ev.target?.closest?.("[data-magnetic]");
			if (!target) return;
			const r = target.getBoundingClientRect();
			const strength = parseFloat(target.dataset.magnetic || "0.25");
			const x = (ev.clientX - (r.left + r.width / 2)) * strength;
			const y = (ev.clientY - (r.top + r.height / 2)) * strength;
			target.style.transform = `translate3d(${x}px, ${y}px, 0)`;
			target.style.transition = "transform 120ms cubic-bezier(0.2,0.8,0.2,1)";
		};
		const onPointerLeave = (ev) => {
			const target = ev.target?.closest?.("[data-magnetic]");
			if (!target) return;
			target.style.transform = "translate3d(0,0,0)";
			target.style.transition = "transform 360ms cubic-bezier(0.2,0.8,0.2,1)";
		};
		document.addEventListener("pointermove", onPointerMove, { passive: true });
		document.addEventListener("pointerout", onPointerLeave, { passive: true });
		let raf = 0;
		const tick = () => {
			const y = window.scrollY;
			document.querySelectorAll(".parallax-y").forEach((el) => {
				const speed = parseFloat(el.dataset.speed || "0.18");
				el.style.setProperty("--parallax-y", `${-y * speed}px`);
			});
			raf = 0;
		};
		const onScroll = () => {
			if (!raf) raf = requestAnimationFrame(tick);
		};
		window.addEventListener("scroll", onScroll, { passive: true });
		return () => {
			io.disconnect();
			mo.disconnect();
			document.removeEventListener("pointermove", onPointerMove);
			document.removeEventListener("pointerout", onPointerLeave);
			window.removeEventListener("scroll", onScroll);
			if (raf) cancelAnimationFrame(raf);
		};
	}, []);
	return null;
}
var COLORS = [
	"oklch(0.78 0.18 75)",
	"oklch(0.7 0.22 28)",
	"oklch(0.78 0.16 145)",
	"oklch(0.7 0.22 260)",
	"oklch(0.85 0.012 80)"
];
function Confetti() {
	const canvasRef = (0, import_react.useRef)(null);
	const particlesRef = (0, import_react.useRef)([]);
	const rafRef = (0, import_react.useRef)(0);
	(0, import_react.useEffect)(() => {
		const canvas = canvasRef.current;
		if (!canvas) return;
		const ctx = canvas.getContext("2d");
		if (!ctx) return;
		const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
		const resize = () => {
			const dpr = window.devicePixelRatio || 1;
			canvas.width = window.innerWidth * dpr;
			canvas.height = window.innerHeight * dpr;
			canvas.style.width = `${window.innerWidth}px`;
			canvas.style.height = `${window.innerHeight}px`;
			ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
		};
		resize();
		window.addEventListener("resize", resize);
		const burst = (e) => {
			if (reduce) return;
			const detail = e.detail || {};
			const ox = detail.x ?? window.innerWidth / 2;
			const oy = detail.y ?? window.innerHeight / 3;
			const N = 110;
			for (let i = 0; i < N; i++) {
				const angle = Math.random() * Math.PI * 2;
				const speed = 4 + Math.random() * 9;
				particlesRef.current.push({
					x: ox,
					y: oy,
					vx: Math.cos(angle) * speed,
					vy: Math.sin(angle) * speed - 2,
					size: 4 + Math.random() * 5,
					rotation: Math.random() * Math.PI,
					vr: (Math.random() - .5) * .3,
					color: detail.color || COLORS[Math.floor(Math.random() * COLORS.length)],
					life: 0,
					maxLife: 70 + Math.random() * 50
				});
			}
			if (!rafRef.current) loop();
		};
		window.addEventListener("fx:confetti", burst);
		const loop = () => {
			ctx.clearRect(0, 0, canvas.width, canvas.height);
			const arr = particlesRef.current;
			for (let i = arr.length - 1; i >= 0; i--) {
				const p = arr[i];
				p.vy += .22;
				p.vx *= .99;
				p.x += p.vx;
				p.y += p.vy;
				p.rotation += p.vr;
				p.life++;
				const alpha = Math.max(0, 1 - p.life / p.maxLife);
				ctx.save();
				ctx.translate(p.x, p.y);
				ctx.rotate(p.rotation);
				ctx.globalAlpha = alpha;
				ctx.fillStyle = p.color;
				ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * .4);
				ctx.restore();
				if (p.life >= p.maxLife || p.y > window.innerHeight + 40) arr.splice(i, 1);
			}
			if (arr.length > 0) rafRef.current = requestAnimationFrame(loop);
			else rafRef.current = 0;
		};
		return () => {
			window.removeEventListener("resize", resize);
			window.removeEventListener("fx:confetti", burst);
			if (rafRef.current) cancelAnimationFrame(rafRef.current);
		};
	}, []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("canvas", {
		ref: canvasRef,
		"aria-hidden": true,
		className: "pointer-events-none fixed inset-0 z-[90]"
	});
}
/**
* Ambient drifting particles — fixed full-screen canvas behind the app.
* Lightweight: ~40 specks, GPU-friendly, respects reduced motion.
*/
function AmbientParticles() {
	const ref = (0, import_react.useRef)(null);
	(0, import_react.useEffect)(() => {
		const canvas = ref.current;
		if (!canvas) return;
		if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
		const ctx = canvas.getContext("2d");
		if (!ctx) return;
		let raf = 0;
		let w = 0;
		let h = 0;
		const dpr = Math.min(window.devicePixelRatio || 1, 2);
		const N = 42;
		const parts = [];
		const resize = () => {
			w = window.innerWidth;
			h = window.innerHeight;
			canvas.width = w * dpr;
			canvas.height = h * dpr;
			canvas.style.width = w + "px";
			canvas.style.height = h + "px";
			ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
		};
		const init = () => {
			parts.length = 0;
			for (let i = 0; i < N; i++) parts.push({
				x: Math.random() * w,
				y: Math.random() * h,
				vx: (Math.random() - .5) * .18,
				vy: -.05 - Math.random() * .25,
				r: .6 + Math.random() * 1.6,
				a: .15 + Math.random() * .35
			});
		};
		resize();
		init();
		window.addEventListener("resize", resize);
		const color = () => {
			return getComputedStyle(document.documentElement).getPropertyValue("--primary").trim() || "oklch(0.85 0.15 85)";
		};
		let primaryColor = color();
		const refreshColor = () => {
			primaryColor = color();
		};
		const themeObs = new MutationObserver(refreshColor);
		themeObs.observe(document.documentElement, {
			attributes: true,
			attributeFilter: ["class"]
		});
		const tick = () => {
			ctx.clearRect(0, 0, w, h);
			for (const p of parts) {
				p.x += p.vx;
				p.y += p.vy;
				if (p.y < -10) {
					p.y = h + 10;
					p.x = Math.random() * w;
				}
				if (p.x < -10) p.x = w + 10;
				if (p.x > w + 10) p.x = -10;
				ctx.beginPath();
				ctx.fillStyle = `color-mix(in oklab, ${primaryColor} ${Math.round(p.a * 100)}%, transparent)`;
				ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
				ctx.fill();
			}
			raf = requestAnimationFrame(tick);
		};
		raf = requestAnimationFrame(tick);
		return () => {
			cancelAnimationFrame(raf);
			window.removeEventListener("resize", resize);
			themeObs.disconnect();
		};
	}, []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("canvas", {
		ref,
		"aria-hidden": true,
		className: "pointer-events-none fixed inset-0 z-0 opacity-70 mix-blend-screen"
	});
}
/** Top-edge scroll progress bar synced to window scrollY. */
function ScrollProgress() {
	const [p, setP] = (0, import_react.useState)(0);
	(0, import_react.useEffect)(() => {
		const onScroll = () => {
			const h = document.documentElement;
			const max = h.scrollHeight - h.clientHeight;
			setP(max > 0 ? h.scrollTop / max * 100 : 0);
		};
		onScroll();
		window.addEventListener("scroll", onScroll, { passive: true });
		return () => window.removeEventListener("scroll", onScroll);
	}, []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		"aria-hidden": true,
		className: "pointer-events-none fixed left-0 top-0 z-[60] h-[2px] w-full",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "h-full origin-left transition-[width] duration-150 ease-out",
			style: {
				width: `${p}%`,
				background: "linear-gradient(90deg, transparent, var(--primary), var(--accent), var(--primary), transparent)",
				boxShadow: "0 0 12px color-mix(in oklab, var(--primary) 60%, transparent)"
			}
		})
	});
}
/** CSS-driven aurora gradient background — silky animated mesh. */
function AuroraBg() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		"aria-hidden": true,
		className: "pointer-events-none fixed inset-0 -z-10 overflow-hidden",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "aurora-layer aurora-a" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "aurora-layer aurora-b" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "aurora-layer aurora-c" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "aurora-grain" })
		]
	});
}
/**
* Web Audio micro-feedback. Listens for global events:
*  - "fx:hover-tick" / actual hover via [data-sfx]
*  - "fx:click"
*  - "fx:route" — route change whoosh
*  - "fx:confetti" — chime
* Off by default; toggle via floating button (bottom-left).
*/
function AudioFx() {
	const [on, setOn] = (0, import_react.useState)(false);
	const ctxRef = (0, import_react.useRef)(null);
	const lastTick = (0, import_react.useRef)(0);
	(0, import_react.useEffect)(() => {
		if (!on) return;
		const ctx = new (window.AudioContext || window.webkitAudioContext)();
		ctxRef.current = ctx;
		const blip = (freq, dur = .08, type = "sine", gain = .04) => {
			const t = ctx.currentTime;
			const o = ctx.createOscillator();
			const g = ctx.createGain();
			o.type = type;
			o.frequency.setValueAtTime(freq, t);
			g.gain.setValueAtTime(0, t);
			g.gain.linearRampToValueAtTime(gain, t + .005);
			g.gain.exponentialRampToValueAtTime(1e-4, t + dur);
			o.connect(g).connect(ctx.destination);
			o.start(t);
			o.stop(t + dur + .02);
		};
		const chime = () => {
			[
				880,
				1320,
				1760
			].forEach((f, i) => setTimeout(() => blip(f, .22, "triangle", .05), i * 70));
		};
		const whoosh = () => {
			const t = ctx.currentTime;
			const o = ctx.createOscillator();
			const g = ctx.createGain();
			const filt = ctx.createBiquadFilter();
			filt.type = "bandpass";
			filt.frequency.setValueAtTime(800, t);
			filt.frequency.exponentialRampToValueAtTime(180, t + .35);
			o.type = "sawtooth";
			o.frequency.setValueAtTime(180, t);
			g.gain.setValueAtTime(0, t);
			g.gain.linearRampToValueAtTime(.05, t + .04);
			g.gain.exponentialRampToValueAtTime(1e-4, t + .4);
			o.connect(filt).connect(g).connect(ctx.destination);
			o.start(t);
			o.stop(t + .42);
		};
		const onHover = (e) => {
			if (!e.target?.closest?.("button, a, [data-sfx]")) return;
			const now = performance.now();
			if (now - lastTick.current < 60) return;
			lastTick.current = now;
			blip(2200, .04, "square", .012);
		};
		const onClick = () => blip(660, .07, "triangle", .05);
		const onRoute = () => whoosh();
		const onConfetti = () => chime();
		document.addEventListener("pointerover", onHover, true);
		document.addEventListener("click", onClick, true);
		window.addEventListener("fx:route", onRoute);
		window.addEventListener("fx:confetti", onConfetti);
		return () => {
			document.removeEventListener("pointerover", onHover, true);
			document.removeEventListener("click", onClick, true);
			window.removeEventListener("fx:route", onRoute);
			window.removeEventListener("fx:confetti", onConfetti);
			ctx.close();
		};
	}, [on]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
		type: "button",
		onClick: () => setOn((v) => !v),
		"aria-label": on ? "Mute sound effects" : "Enable sound effects",
		title: on ? "Mute SFX" : "Enable SFX",
		className: "fixed bottom-4 left-4 z-50 inline-flex h-9 w-9 items-center justify-center rounded-full border border-border bg-card/80 backdrop-blur-md text-muted-foreground hover:text-foreground hover:scale-110 transition-all shadow-lg",
		children: on ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Volume2, { className: "h-4 w-4" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(VolumeX, { className: "h-4 w-4" })
	});
}
function NotFoundComponent() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex min-h-screen items-center justify-center bg-background px-4",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "max-w-md text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "font-display text-7xl font-bold text-primary",
					children: "404"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "mt-4 text-xl font-semibold text-foreground",
					children: "Signal lost"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted-foreground",
					children: "That page is not preserved in the archive."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-6",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/",
						className: "inline-flex items-center justify-center rounded-none bg-primary px-4 py-2 text-sm font-display uppercase tracking-wider text-primary-foreground transition-colors hover:bg-primary/90",
						children: "Return to Overview"
					})
				})
			]
		})
	});
}
function ErrorComponent({ error, reset }) {
	console.error(error);
	const router = useRouter();
	(0, import_react.useEffect)(() => {
		reportLovableError(error, { boundary: "tanstack_root_error_component" });
	}, [error]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex min-h-screen items-center justify-center bg-background px-4",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "max-w-md text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "font-display text-xl uppercase tracking-wider text-destructive",
					children: "This page didn't load"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted-foreground",
					children: error.message || "Something went wrong on our end."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-6 flex flex-wrap justify-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: () => {
							router.invalidate();
							reset();
						},
						className: "inline-flex items-center justify-center rounded-none bg-primary px-4 py-2 text-sm font-display uppercase tracking-wider text-primary-foreground transition-colors hover:bg-primary/90",
						children: "Try again"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
						href: "/",
						className: "inline-flex items-center justify-center rounded-none border border-border bg-background px-4 py-2 text-sm font-display uppercase tracking-wider text-foreground transition-colors hover:bg-accent/10",
						children: "Go home"
					})]
				})
			]
		})
	});
}
var Route$2 = createRootRouteWithContext()({
	head: () => ({
		meta: [
			{ charSet: "utf-8" },
			{
				name: "viewport",
				content: "width=device-width, initial-scale=1"
			},
			{ title: "DeadMind — We don't preserve documents. We preserve people." },
			{
				name: "description",
				content: "DeadMind preserves the institutional knowledge of retiring industrial engineers — copilots, vulnerability schematics, decay simulators, and compliance audits."
			},
			{
				name: "author",
				content: "DeadMind"
			},
			{
				property: "og:title",
				content: "DeadMind — Preserve the engineers, not just the docs"
			},
			{
				property: "og:description",
				content: "Cognitive fingerprinting, knowledge decay simulation, and expert persona copilots for industrial operations."
			},
			{
				property: "og:type",
				content: "website"
			},
			{
				name: "twitter:card",
				content: "summary"
			}
		],
		links: [
			{
				rel: "stylesheet",
				href: styles_default
			},
			{
				rel: "preconnect",
				href: "https://fonts.googleapis.com"
			},
			{
				rel: "preconnect",
				href: "https://fonts.gstatic.com",
				crossOrigin: "anonymous"
			},
			{
				rel: "stylesheet",
				href: "https://fonts.googleapis.com/css2?family=Archivo+Black&family=Space+Grotesk:wght@400;500;600;700&family=Space+Mono:wght@400;700&display=swap"
			}
		]
	}),
	shellComponent: RootShell,
	component: RootComponent,
	notFoundComponent: NotFoundComponent,
	errorComponent: ErrorComponent
});
function RootShell({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("html", {
		lang: "en",
		className: "dark",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("head", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeadContent, {}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("body", { children: [children, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Scripts, {})] })]
	});
}
function RootComponent() {
	const { queryClient } = Route$2.useRouteContext();
	const [scrolled, setScrolled] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		const onScroll = () => setScrolled(window.scrollY > 8);
		window.addEventListener("scroll", onScroll, { passive: true });
		onScroll();
		return () => window.removeEventListener("scroll", onScroll);
	}, []);
	const isMac = typeof navigator !== "undefined" && /Mac|iPhone|iPad/.test(navigator.platform);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(QueryClientProvider, {
		client: queryClient,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ThemeProvider, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(YearProvider, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SidebarProvider, { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BootSequence, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SpotlightTracker, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ClickRipple, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CommandPalette, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShortcutsOverlay, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RouteShortcuts, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RouteCinematic, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(GlobalAnim, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Confetti, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AuroraBg, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AmbientParticles, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ScrollProgress, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AudioFx, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "relative z-10 min-h-screen flex w-full bg-background/70",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppSidebar, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex-1 flex flex-col min-w-0",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
							className: "sticky top-0 z-40 h-12 flex items-center gap-2 px-2 transition-all duration-300 " + (scrolled ? "border-b border-border bg-background/70 backdrop-blur-xl shadow-[0_8px_24px_-16px_rgba(0,0,0,0.45)]" : "border-b border-transparent bg-transparent"),
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SidebarTrigger, {}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "font-display uppercase tracking-[0.25em] text-xs text-muted-foreground truncate",
									children: "DeadMind / Cognitive Preservation Console"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "ml-auto flex items-center gap-2 pr-2",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Magnetic, {
											strength: .2,
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
												type: "button",
												onClick: () => {
													const e = new KeyboardEvent("keydown", {
														key: "k",
														metaKey: true,
														ctrlKey: true,
														bubbles: true
													});
													window.dispatchEvent(e);
												},
												className: "hidden sm:inline-flex items-center gap-2 h-8 px-3 border border-border rounded-md bg-card hover:bg-accent/10 hover:scale-105 transition-all cursor-pointer",
												"aria-label": "Open command palette",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Command, { className: "h-3.5 w-3.5 text-primary" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
													className: "font-mono text-[10px] uppercase tracking-widest text-muted-foreground",
													children: [isMac ? "⌘" : "Ctrl", " K"]
												})]
											})
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Magnetic, {
											strength: .2,
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
												type: "button",
												onClick: () => {
													const e = new KeyboardEvent("keydown", {
														key: "?",
														bubbles: true
													});
													window.dispatchEvent(e);
												},
												className: "hidden sm:inline-flex items-center justify-center h-8 w-8 border border-border rounded-md bg-card hover:bg-accent/10 hover:scale-105 transition-all cursor-pointer",
												"aria-label": "Show keyboard shortcuts",
												title: "Keyboard shortcuts (?)",
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Keyboard, { className: "h-3.5 w-3.5 text-muted-foreground" })
											})
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Magnetic, {
											strength: .2,
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ThemeToggle, {})
										})
									]
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(YearExposureBar, {}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusTicker, {}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
							className: "flex-1 min-w-0 overflow-x-hidden",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageTransition, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {}) })
						})
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Toaster$1, {})
		] }) }) })
	});
}
var $$splitComponentImporter$1 = () => import("./ingest-5avZlmE6.mjs");
var Route$1 = createFileRoute("/ingest")({
	head: () => ({ meta: [{ title: "Ingestion & Active Capture — DeadMind" }, {
		name: "description",
		content: "Admin view: ingest documents, capture voice notes from retiring experts, and resolve entity aliases."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter$1, "component")
});
var $$splitComponentImporter = () => import("./audit-CCTYrBQj.mjs");
var Route = createFileRoute("/audit")({
	head: () => ({ meta: [{ title: "Operations & Compliance Audit — DeadMind" }, {
		name: "description",
		content: "Plant head view: SOP compliance shadow audit, knowledge freshness heatmap, and shift-note anomaly analysis."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
var IngestRoute = Route$1.update({
	id: "/ingest",
	path: "/ingest",
	getParentRoute: () => Route$2
});
var CopilotRoute = Route$3.update({
	id: "/copilot",
	path: "/copilot",
	getParentRoute: () => Route$2
});
var AuditRoute = Route.update({
	id: "/audit",
	path: "/audit",
	getParentRoute: () => Route$2
});
var rootRouteChildren = {
	IndexRoute: Route$4.update({
		id: "/",
		path: "/",
		getParentRoute: () => Route$2
	}),
	AuditRoute,
	CopilotRoute,
	IngestRoute
};
var routeTree = Route$2._addFileChildren(rootRouteChildren)._addFileTypes();
var getRouter = () => {
	return createRouter({
		routeTree,
		context: { queryClient: new QueryClient() },
		scrollRestoration: true,
		defaultPreloadStaleTime: 0
	});
};
//#endregion
export { getRouter };
