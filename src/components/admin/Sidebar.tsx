"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
    LayoutDashboard,
    Users,
    FileText,
    Settings,
    MessagesSquare,
    LogOut,
    Newspaper
} from "lucide-react";
import { Button } from "@/components/ui/button";

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> { }

export function Sidebar({ className }: SidebarProps) {
    const pathname = usePathname();

    const routes = [
        {
            label: "Dashboard",
            icon: LayoutDashboard,
            href: "/admin",
            active: pathname === "/admin",
        },
        {
            label: "Inquiries",
            icon: MessagesSquare,
            href: "/admin/inquiries",
            active: pathname.startsWith("/admin/inquiries"),
        },
        {
            label: "News & Insights",
            icon: Newspaper,
            href: "/admin/news",
            active: pathname.startsWith("/admin/news"),
        },
        {
            label: "Our Team",
            icon: Users,
            href: "/admin/team",
            active: pathname.startsWith("/admin/team"),
        },
        {
            label: "Settings",
            icon: Settings,
            href: "/admin/settings",
            active: pathname.startsWith("/admin/settings"),
        },
    ];

    return (
        <div className={cn("pb-12 min-h-screen border-r bg-zinc-950 text-white", className)}>
            <div className="space-y-4 py-4">
                <div className="px-3 py-2">
                    <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight uppercase font-serif">
                        LACO Admin
                    </h2>
                    <div className="space-y-1">
                        {routes.map((route) => (
                            <Button
                                key={route.href}
                                variant={route.active ? "secondary" : "ghost"}
                                className={cn(
                                    "w-full justify-start text-sm font-medium",
                                    route.active ? "bg-zinc-800 text-white" : "text-zinc-400 hover:text-white hover:bg-zinc-800/50"
                                )}
                                asChild
                            >
                                <Link href={route.href}>
                                    <route.icon className="mr-2 h-4 w-4" />
                                    {route.label}
                                </Link>
                            </Button>
                        ))}
                    </div>
                </div>
            </div>
            <div className="absolute bottom-4 px-3 w-full">
                <Button variant="ghost" className="w-full justify-start text-red-400 hover:text-red-300 hover:bg-red-950/20">
                    <LogOut className="mr-2 h-4 w-4" />
                    Logout
                </Button>
            </div>
        </div>
    );
}
