import { AppSidebar } from "@/components/app-sidebar"
import {
  ChartAreaInteractive,
  type NewsViewsChartPoint,
} from "@/components/chart-area-interactive"
import { SectionCards } from "@/components/section-cards"
import { prisma } from "@/lib/prisma"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { SiteHeader } from "@/components/site-header"

export const dynamic = "force-dynamic"

type ActivityRow = {
  id: string
  type: "CAREER_APPLICATION" | "CONTACT_INQUIRY"
  title: string
  info: string
  createdAt: Date
}

type CareerApplicationRow = {
  id: string
  fullName: string
  email: string
  createdAt: Date
  career: {
    title: string
  }
}

type ContactInquiryRow = {
  id: string
  name: string
  email: string
  status: string
  createdAt: Date
}

type NewsViewRow = {
  viewedAt: Date
}

function buildNewsViewsSeries(
  rows: Array<{ date: string; views: number }>,
  days = 90
): NewsViewsChartPoint[] {
  const viewsMap = new Map(rows.map((row) => [row.date, row.views]))
  const now = new Date()
  const todayUtc = new Date(
    Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate())
  )

  return Array.from({ length: days }, (_, index) => {
    const offset = days - index - 1
    const day = new Date(todayUtc)
    day.setUTCDate(todayUtc.getUTCDate() - offset)
    const dateKey = day.toISOString().slice(0, 10)

    return {
      date: dateKey,
      views: viewsMap.get(dateKey) ?? 0,
    }
  })
}

export default async function Page() {
  const ninetyDaysAgo = new Date()
  ninetyDaysAgo.setDate(ninetyDaysAgo.getDate() - 89)
  ninetyDaysAgo.setHours(0, 0, 0, 0)

  const result = await Promise.all([
    prisma.team.count(),
    prisma.news.count(),
    prisma.career.count({ where: { isActive: true } }),
    prisma.contactInquiry.count(),
    prisma.careerApplication.findMany({
      take: 10,
      orderBy: { createdAt: "desc" },
      include: { career: { select: { title: true } } },
    }),
    prisma.contactInquiry.findMany({
      take: 10,
      orderBy: { createdAt: "desc" },
    }),
    prisma.newsView.findMany({
      where: { viewedAt: { gte: ninetyDaysAgo } },
      select: { viewedAt: true },
    }),
  ])

  const [
    resolvedTeamCount,
    resolvedNewsCount,
    resolvedOpenRolesCount,
    resolvedInquiryCount,
    resolvedLatestApplications,
    resolvedLatestInquiries,
    resolvedNewsViews,
  ] = result as [
    number,
    number,
    number,
    number,
    CareerApplicationRow[],
    ContactInquiryRow[],
    NewsViewRow[],
  ]

  const activities: ActivityRow[] = [
    ...resolvedLatestApplications.map((application: CareerApplicationRow) => ({
      id: application.id,
      type: "CAREER_APPLICATION" as const,
      title: application.fullName,
      info: `${application.email} - ${application.career.title}`,
      createdAt: application.createdAt,
    })),
    ...resolvedLatestInquiries.map((inquiry: ContactInquiryRow) => ({
      id: inquiry.id,
      type: "CONTACT_INQUIRY" as const,
      title: inquiry.name,
      info: `${inquiry.email} - ${inquiry.status}`,
      createdAt: inquiry.createdAt,
    })),
  ]
    .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
    .slice(0, 10)

  const dailyViews = new Map<string, number>()
  for (const item of resolvedNewsViews) {
    const dateKey = item.viewedAt.toISOString().slice(0, 10)
    dailyViews.set(dateKey, (dailyViews.get(dateKey) ?? 0) + 1)
  }

  const newsViewsSeries: NewsViewsChartPoint[] = buildNewsViewsSeries(
    Array.from(dailyViews.entries()).map(([date, views]) => ({
      date,
      views,
    }))
  )

  return (
    <SidebarProvider
      style={
        {
          "--sidebar-width": "calc(var(--spacing) * 72)",
          "--header-height": "calc(var(--spacing) * 12)",
        } as React.CSSProperties
      }
    >
      <AppSidebar variant="inset" />
      <SidebarInset>
        <SiteHeader />
        <div className="flex flex-1 flex-col">
          <div className="@container/main flex flex-1 flex-col gap-2">
            <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
              <SectionCards
                teamCount={resolvedTeamCount}
                newsCount={resolvedNewsCount}
                openRolesCount={resolvedOpenRolesCount}
                inquiryCount={resolvedInquiryCount}
              />
              <div className="px-4 lg:px-6">
                <ChartAreaInteractive data={newsViewsSeries} />
              </div>
              <div className="px-4 lg:px-6 pt-4">
                <h3 className="text-xl font-bold tracking-tight mb-4">Latest Activities</h3>
                <div className="border border-white/10">
                  <Table>
                    <TableHeader className="bg-zinc-950/40">
                      <TableRow className="border-white/10 hover:bg-transparent">
                        <TableHead>Type</TableHead>
                        <TableHead>Name</TableHead>
                        <TableHead className="hidden md:table-cell">Detail</TableHead>
                        <TableHead className="text-right">Date</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {activities.length > 0 ? (
                        activities.map((activity) => (
                          <TableRow key={`${activity.type}-${activity.id}`} className="border-white/10">
                            <TableCell>
                              {activity.type === "CAREER_APPLICATION" ? "Application" : "Inquiry"}
                            </TableCell>
                            <TableCell className="font-medium">{activity.title}</TableCell>
                            <TableCell className="hidden md:table-cell">{activity.info}</TableCell>
                            <TableCell className="text-right">
                              {activity.createdAt.toLocaleDateString()}
                            </TableCell>
                          </TableRow>
                        ))
                      ) : (
                        <TableRow className="border-white/10">
                          <TableCell colSpan={4} className="text-center py-8 text-zinc-400">
                            No data yet.
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
