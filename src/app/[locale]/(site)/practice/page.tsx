import { Header } from "@/components/layout/Header";
import { PracticeAreas } from "@/components/sections/PracticeAreas";

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
