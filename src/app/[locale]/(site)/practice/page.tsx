import { Metadata } from "next";
import { Header } from "@/components/layout/Header";
import { PracticeAreas } from "@/components/sections/PracticeAreas";

export const metadata: Metadata = {
    title: "Practice Areas | LACO Attorneys",
    description: "Explore LACO Attorneys' areas of expertise including corporate law, litigation, aviation law, capital markets, and intellectual property. Serving clients across Indonesia.",
    keywords: ["practice areas Indonesia", "corporate law", "aviation law", "litigation lawyer", "capital markets attorney", "IP law Indonesia"],
    openGraph: {
        title: "Practice Areas | LACO Attorneys",
        description: "From high-stakes litigation to aviation law and capital markets — LACO's elite practice areas are built for complex legal challenges.",
        url: "https://lacolawyer.com/practice",
        siteName: "LACO Attorneys",
        type: "website",
    },
    alternates: { canonical: "https://lacolawyer.com/practice" },
};

export default function PracticePage() {
    return (
        <main className="bg-black text-white min-h-screen selection:bg-white selection:text-black">
            <Header />
            <div className="pt-20">
                <PracticeAreas />
            </div>
        </main>
    );
}
