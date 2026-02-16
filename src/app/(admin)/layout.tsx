import { Playfair_Display, Inter } from "next/font/google"; // Moved fonts here
import "../globals.css"; // Adjusted path

const playfair = Playfair_Display({
    variable: "--font-serif",
    subsets: ["latin"],
    style: ["normal", "italic"],
});

const inter = Inter({
    variable: "--font-sans",
    subsets: ["latin"],
});


import { Sidebar } from "@/components/admin/Sidebar";
import { Header } from "@/components/admin/Header";

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <body className={`${playfair.variable} ${inter.variable} antialiased bg-background text-foreground`}>
                <div className="flex min-h-screen bg-black text-white">
                    {/* Sidebar */}
                    <div className="hidden md:flex w-64 flex-col fixed inset-y-0 z-50">
                        <Sidebar className="h-full border-r border-zinc-800" />
                    </div>

                    {/* Main Content */}
                    <main className="flex-1 md:pl-64 flex flex-col min-h-screen transition-all duration-300 ease-in-out">
                        <Header />
                        <div className="flex-1 space-y-4 p-8 pt-6">
                            {children}
                        </div>
                    </main>
                </div>
            </body>
        </html>
    );
}
