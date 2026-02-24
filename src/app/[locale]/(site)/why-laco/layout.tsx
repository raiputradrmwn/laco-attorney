import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Why LACO | LACO Attorneys",
    description: "Learn why LACO Attorneys is the premier choice for high-stakes legal matters in Indonesia. Proactive, efficient, and uncompromising in representing our clients' interests.",
    keywords: ["mengapa pilih LACO", "why LACO attorneys", "top law firm Indonesia", "best lawyer Bali", "hukum korporat Indonesia"],
    openGraph: {
        title: "Why LACO | LACO Attorneys",
        description: "Discover what sets LACO apart — elite advocacy, strategic foresight, and an unwavering commitment to client success.",
        url: "https://lacolawyer.com/why-laco",
        siteName: "LACO Attorneys",
        type: "website",
    },
    alternates: { canonical: "https://lacolawyer.com/why-laco" },
};

export default function WhyLacoLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
