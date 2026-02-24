import { Metadata } from "next";
import { InsightList } from "@/components/insight/InsightList";

export const metadata: Metadata = {
    title: "Legal Insights & News | LACO Attorneys",
    description: "Stay informed with the latest legal insights, law updates, and firm news from LACO Attorneys. Covering Indonesian corporate law, aviation, and international affairs.",
    keywords: ["hukum Indonesia berita", "legal insights", "law updates Indonesia", "corporate law news", "LACO firm news"],
    openGraph: {
        title: "Legal Insights & News | LACO Attorneys",
        description: "The latest legal analysis, law updates, and firm news from Indonesia's elite law firm.",
        url: "https://lacolawyer.com/insight",
        siteName: "LACO Attorneys",
        type: "website",
    },
    alternates: { canonical: "https://lacolawyer.com/insight" },
};

export default function InsightPage() {
    return (
        <InsightList />
    );
}
