import { Header } from "@/components/layout/Header";
import { Hero } from "@/components/sections/Hero";

export default function Home() {
  return (
    <main className="bg-background min-h-screen text-foreground selection:bg-white selection:text-black">
      <Header />
      <Hero />
      {/* 
        <PracticeAreas />
        <Team />
        <News />
        <Contact /> 
      */}
    </main>
  );
}
