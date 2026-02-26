import * as React from "react"
import { IconInnerShadowTop } from "@tabler/icons-react"
import { getServerSession } from "next-auth"

import { Link } from "@/i18n/routing"
import { authOptions } from "@/lib/auth"
import { NavMain, type NavMainItem } from "@/components/nav-main"
import { NavUser } from "@/components/nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

const data: { navMain: NavMainItem[] } = {
  navMain: [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: "dashboard",
    },
    {
      title: "Team",
      url: "/dashboard/team",
      icon: "team",
    },
    {
      title: "News & Insights",
      url: "/dashboard/news",
      icon: "news",
    },
    {
      title: "Careers",
      url: "/dashboard/careers",
      icon: "careers",
    },
    {
      title: "Inquiries",
      url: "/dashboard/inquiries",
      icon: "inquiries",
    },
    {
      title: "Practices",
      url: "/dashboard/practices",
      icon: "practices",
    },
  ],
}

export async function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const session = await getServerSession(authOptions)
  const email = session?.user?.email ?? "admin@lacolawyer.com"
  const name = session?.user?.name || email.split("@")[0] || "Admin"

  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:!p-1.5"
            >
              <Link href="/dashboard">
                <IconInnerShadowTop className="!size-5" />
                <span className="text-base font-semibold">LACO Admin</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser
          user={{
            name,
            email,
            avatar: "/placeholder-avatar.jpg",
          }}
        />
      </SidebarFooter>
    </Sidebar>
  )
}
