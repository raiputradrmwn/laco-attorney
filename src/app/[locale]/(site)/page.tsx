import { Metadata } from "next";
import { Header } from "@/components/layout/Header";
import { Hero } from "@/components/sections/Hero";
import { Philosophy } from "@/components/sections/Philosophy";
import { TrustQuote } from "@/components/sections/TrustQuote";
import { PracticeAreas } from "@/components/sections/PracticeAreas";

export const metadata: Metadata = {
  title: "LACO Attorneys | Premier Law Firm in Bali, Jakarta & Yogyakarta",
  description: "LACO Attorneys – Indonesia's elite law firm specializing in corporate law, litigation, aviation, and cross-border transactions. Offices in Denpasar, Jakarta, and Yogyakarta.",
  keywords: ["law firm Indonesia", "pengacara Bali", "corporate lawyer Jakarta", "litigation attorney", "LACO Attorneys", "hukum korporat"],
  openGraph: {
    title: "LACO Attorneys | Premier Law Firm in Indonesia",
    description: "Elite legal counsel for corporations, investors, and individuals across Indonesia.",
    url: "https://lacolawyer.com",
    siteName: "LACO Attorneys",
    locale: "id_ID",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "LACO Attorneys | Premier Law Firm in Indonesia",
    description: "Elite legal counsel for corporations, investors, and individuals across Indonesia.",
  },
  alternates: { canonical: "https://lacolawyer.com" },
};

export default function Home() {
  return (
    <main className="bg-background min-h-screen text-foreground selection:bg-white selection:text-black">
      <Header />
      <Hero />
      <Philosophy />
      <TrustQuote />
      <PracticeAreas />
    </main>
  );
}
