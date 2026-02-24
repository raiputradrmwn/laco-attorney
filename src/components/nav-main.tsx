"use client"

import {
  IconDashboard,
  IconFileWord,
  IconListDetails,
  IconReport,
  IconUsers,
} from "@tabler/icons-react"
import { Link } from "@/i18n/routing"
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

const ICONS = {
  dashboard: IconDashboard,
  team: IconUsers,
  news: IconFileWord,
  careers: IconListDetails,
  inquiries: IconReport,
} as const

export type NavMainIconKey = keyof typeof ICONS

export type NavMainItem = {
  title: string
  url: string
  icon?: NavMainIconKey
}

export function NavMain({
  items,
}: {
  items: NavMainItem[]
}) {
  return (
    <SidebarGroup>
      <SidebarGroupContent className="flex flex-col gap-2">
        <SidebarMenu>
          {items.map((item) => {
            const Icon = item.icon ? ICONS[item.icon] : null

            return (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton asChild tooltip={item.title}>
                  <Link href={item.url}>
                    {Icon ? <Icon /> : null}
                    <span>{item.title}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            )
          })}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  )
}
