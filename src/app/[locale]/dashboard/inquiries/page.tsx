import { AppSidebar } from "@/components/app-sidebar"
import { SiteHeader } from "@/components/site-header"
import {
    SidebarInset,
    SidebarProvider,
} from "@/components/ui/sidebar"

export default function InquiriesPage() {
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
                    <div className="flex-1 p-8 pt-6 space-y-4">
                        <h2 className="text-3xl font-bold tracking-tight">Contact Inquiries</h2>
                        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                            {/* Add stats cards here */}
                        </div>

                        <div className="bg-white rounded-lg border p-8 text-center text-muted-foreground mt-8">
                            <h3 className="text-lg font-medium text-foreground mb-2">No Inquiries Yet</h3>
                            <p className="mb-4">Messages from your website's contact form will appear here.</p>
                        </div>
                    </div>
                </div>
            </SidebarInset>
        </SidebarProvider>
    )
}
