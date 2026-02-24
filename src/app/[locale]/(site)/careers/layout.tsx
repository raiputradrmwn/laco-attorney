import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Careers | LACO Attorneys",
    description: "Join LACO Attorneys — Indonesia's elite law firm. We seek exceptional legal minds with the tenacity for high-stakes advocacy. Explore career opportunities in Bali, Jakarta, and Yogyakarta.",
    keywords: ["lowongan pengacara Indonesia", "karir hukum Bali", "legal career Jakarta", "law firm jobs Indonesia", "LACO careers", "pengacara muda"],
    openGraph: {
        title: "Careers at LACO Attorneys",
        description: "LACO is expanding. We seek elite legal minds for positions across our Indonesian offices.",
        url: "https://lacolawyer.com/careers",
        siteName: "LACO Attorneys",
        type: "website",
    },
    alternates: { canonical: "https://lacolawyer.com/careers" },
};

export default function CareersLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
