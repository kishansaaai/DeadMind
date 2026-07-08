import { Link, useRouterState } from "@tanstack/react-router";
import { Network, MessageSquareCode, ShieldCheck, Upload } from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";

const items = [
  { title: "Plant Map", url: "/", icon: Network, role: "CFO" },
  { title: "Expert Copilot", url: "/copilot", icon: MessageSquareCode, role: "Technician" },
  { title: "Operations Audit", url: "/audit", icon: ShieldCheck, role: "Plant Head" },
  { title: "Compliance", url: "/compliance", icon: ShieldCheck, role: "QHS Manager" },
  { title: "Lessons Learned", url: "/lessons", icon: Network, role: "Reliability Eng" },
  { title: "Ingestion", url: "/ingest", icon: Upload, role: "Admin" },
] as const;

export function AppSidebar() {
  const { state } = useSidebar();
  const collapsed = state === "collapsed";
  const currentPath = useRouterState({ select: (s) => s.location.pathname });

  return (
    <Sidebar collapsible="icon" className="border-r border-border bg-sidebar">
      <SidebarHeader className="border-b border-border px-3 py-4">
        <Link to="/" className="flex items-center gap-2">
          <div className="h-7 w-7 border-2 border-primary bg-primary/10 flex items-center justify-center gold-glow">
            <span className="font-display font-bold text-primary text-sm">D</span>
          </div>
          {!collapsed && (
            <div className="flex flex-col leading-tight">
              <span className="font-display font-bold uppercase tracking-[0.2em] text-foreground text-sm">
                DeadMind
              </span>
              <span className="text-[0.6rem] uppercase tracking-[0.25em] text-muted-foreground">
                Preserve · Recall · Audit
              </span>
            </div>
          )}
        </Link>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => {
                const active =
                  item.url === "/" ? currentPath === "/" : currentPath.startsWith(item.url);
                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      asChild
                      isActive={active}
                      className="rounded-none data-[active=true]:bg-primary/10 data-[active=true]:text-primary data-[active=true]:border-l-2 data-[active=true]:border-primary h-auto py-3"
                    >
                      <Link to={item.url} className="flex items-start gap-3 group hover-bounce-x">
                        <item.icon className="h-5 w-5 shrink-0 mt-0.5 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-[-6deg] group-data-[active=true]:scale-110" />
                        {!collapsed && (
                          <div className="flex flex-col leading-tight">
                            <span className="font-display uppercase tracking-wider text-[0.85rem]">
                              {item.title}
                            </span>
                            <span className="text-[0.6rem] uppercase tracking-widest text-muted-foreground">
                              {item.role} view
                            </span>
                          </div>
                        )}
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
