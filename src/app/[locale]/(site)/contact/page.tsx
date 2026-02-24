import { Metadata } from "next";
import { Header } from "@/components/layout/Header";
import { Contact } from "@/components/sections/Contact";

export const metadata: Metadata = {
    title: "Contact Us | LACO Attorneys",
    description: "Reach LACO Attorneys at our offices in Denpasar (Bali), Jakarta, and Yogyakarta. Schedule a consultation with our elite legal team today.",
    keywords: ["contact law firm Indonesia", "konsultasi hukum Bali", "kantor pengacara Jakarta", "LACO Attorneys contact"],
    openGraph: {
        title: "Contact LACO Attorneys",
        description: "Get in touch with Indonesia's premier law firm. Offices in Bali, Jakarta, and Yogyakarta.",
        url: "https://lacolawyer.com/contact",
        siteName: "LACO Attorneys",
        type: "website",
    },
    alternates: { canonical: "https://lacolawyer.com/contact" },
};

export default function ContactPage() {
    return (
        <main className="bg-black text-white min-h-screen selection:bg-white selection:text-black">
            <Header />
            <div className="pt-20">
                <Contact />
            </div>
        </main>
    );
}
