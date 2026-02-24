import { Header } from "@/components/layout/Header";
import { Hero } from "@/components/sections/Hero";
import { Philosophy } from "@/components/sections/Philosophy";
import { TrustQuote } from "@/components/sections/TrustQuote";
import { PracticeAreas } from "@/components/sections/PracticeAreas";
import { Team } from "@/components/sections/Team";
import { News } from "@/components/sections/News";
import { Contact } from "@/components/sections/Contact";

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
