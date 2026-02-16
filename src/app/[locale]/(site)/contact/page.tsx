import { Header } from "@/components/layout/Header";
import { Contact } from "@/components/sections/Contact";

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
