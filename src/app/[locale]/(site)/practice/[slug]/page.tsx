import { notFound } from "next/navigation";
import { PRACTICE_AREAS } from "@/lib/mock-data";
import { AviationCrisis } from "@/components/practices/AviationCrisis";
import { CompanySetUp } from "@/components/practices/CompanySetUp";
import { FamilyLaw } from "@/components/practices/FamilyLaw";
import { ImmigrationEmployment } from "@/components/practices/ImmigrationEmployment";
import { IntellectualProperty } from "@/components/practices/IntellectualProperty";
import { Litigation } from "@/components/practices/Litigation";
import { MergerAcquisition } from "@/components/practices/MergerAcquisition";
import { NotaryService } from "@/components/practices/NotaryService";
import { PrivateLawyer } from "@/components/practices/PrivateLawyer";
import { ProbonoService } from "@/components/practices/ProbonoService";
import { Header } from "@/components/layout/Header";
import Link from "next/link";
import { AnimateIn } from "@/components/AnimateIn";
import { AnimateText } from "@/components/AnimateText";
import { getTranslations } from "next-intl/server";

// Map of slugs to specific components
const PRACTICE_COMPONENTS: Record<string, React.ComponentType> = {
    "aviation-crisis": AviationCrisis,
    "company-setup": CompanySetUp,
    "family-law": FamilyLaw,
    "immigration-employment": ImmigrationEmployment,
    "intellectual-property": IntellectualProperty,
    "litigation": Litigation,
    "merger-acquisition": MergerAcquisition,
    "notary-service": NotaryService,
    "private-lawyer": PrivateLawyer,
    "probono": ProbonoService,
};

export default async function PracticeDetailPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const practice = PRACTICE_AREAS.find((p) => p.slug === slug);
    const SpecificComponent = PRACTICE_COMPONENTS[slug];
    const t = await getTranslations('PracticePages');

    if (!practice) return notFound();

    // If a specific component exists, render it (it includes its own layout/header)
    if (SpecificComponent) {
        return <SpecificComponent />;
    }

    // Fallback generic layout for other practices
    return (
        <main className="bg-black text-white min-h-screen selection:bg-white selection:text-black">
            <Header />
            <div className="pt-32 pb-20 container mx-auto px-6">
                <AnimateIn from="top" delay={0.2}>
                    <Link href="/practice" className="text-[10px] uppercase tracking-[0.4em] text-zinc-500 hover:text-white transition-colors mb-12 block">
                        {t('back_to_practices')}
                    </Link>
                </AnimateIn>
                <AnimateIn from="left" delay={0.4}>
                    <span className="text-[10px] tracking-[0.5em] uppercase text-zinc-500 mb-6 block font-bold">
                        {t('practice_area')}
                    </span>
                </AnimateIn>
                <div className="text-5xl md:text-8xl font-serif italic mb-10 text-balance">
                    <AnimateText text={practice.title} />
                </div>
                <AnimateIn from="bottom" delay={0.6}>
                    <p className="text-xl text-zinc-400 font-light max-w-2xl leading-relaxed">
                        {practice.description}
                    </p>
                </AnimateIn>
                <AnimateIn from="bottom" delay={0.8} className="mt-20 p-12 border border-white/10 bg-zinc-900/50">
                    <p className="text-zinc-500 italic">{t('coming_soon', { title: practice.title })}</p>
                </AnimateIn>
            </div>
        </main>
    );
}
