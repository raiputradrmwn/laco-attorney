"use client";

import { Link } from "@/i18n/routing";
import { Section } from "@/components/Section";
import { PRACTICE_AREAS } from "@/lib/mock-data";
import * as LucideIcons from "lucide-react";
import { AnimateIn } from "@/components/AnimateIn";
import { AnimateText } from "@/components/AnimateText";
import { useTranslations } from "next-intl";

export function PracticeAreas() {
    const t = useTranslations('PracticeAreas');

    return (
        <Section id="practice" className="bg-black text-white py-24 md:py-40" fullWidth>
            <div className="container mx-auto px-4 md:px-6">
                <header className="mb-16 md:mb-24 text-center max-w-4xl mx-auto">
                    <AnimateIn from="top" className="inline-block">
                        <span className="text-[10px] tracking-[0.4em] md:tracking-[0.5em] uppercase text-zinc-500 mb-4 md:mb-6 block font-bold">
                            {t('label')}
                        </span>
                    </AnimateIn>
                    <div className="text-4xl sm:text-5xl md:text-8xl font-serif mb-6 md:mb-10 italic leading-tight tracking-tighter flex justify-center">
                        <AnimateText text={t('title')} />
                    </div>
                    <AnimateIn from="bottom" delay={0.3} opacity={0}>
                        <p className="text-base md:text-lg text-zinc-400 font-light leading-relaxed max-w-3xl mx-auto tracking-wide">
                            {t('desc')}
                        </p>
                    </AnimateIn>
                </header>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-px bg-white/5 border border-white/5">
                    {PRACTICE_AREAS.map((item, index) => {
                        // Dynamically resolve the icon component
                        const IconComponent = (LucideIcons as unknown as Record<string, React.ComponentType<{ className?: string }>>)[item.icon];

                        return (
                            <AnimateIn key={item.id} from="bottom" delay={index * 0.1} duration={0.8} className="h-full">
                                <Link
                                    href={`/practice-area/${item.slug}`}
                                    className="group p-6 md:p-8 bg-black hover:bg-zinc-900 transition-all duration-500 flex flex-col justify-between border border-transparent hover:border-white/10 h-full"
                                >
                                    <div>
                                        <div className="mb-6 md:mb-8 flex items-center justify-between">
                                            <div className="text-white">
                                                {IconComponent ? <IconComponent className="w-6 h-6 md:w-5 md:h-5 lg:w-6 lg:h-6" /> : null}
                                            </div>
                                            <span className="text-zinc-800 font-serif text-2xl md:text-3xl font-bold group-hover:text-zinc-700 transition-colors">
                                                {item.id.padStart(2, '0')}
                                            </span>
                                        </div>
                                        <h3 className="text-lg md:text-xl font-serif mb-4 md:mb-6 uppercase tracking-tight italic leading-snug">
                                            {t(item.title)}
                                        </h3>
                                        <p className="text-zinc-500 font-light text-[11px] md:text-xs leading-relaxed mb-6 md:mb-8">
                                            {t(item.description)}
                                        </p>
                                    </div>
                                    <span className="text-[9px] md:text-[10px] font-black uppercase tracking-[0.2em] md:tracking-[0.3em] border-b border-white/20 pb-2 group-hover:border-white transition-all w-fit">
                                        {t('explore')}
                                    </span>
                                </Link>
                            </AnimateIn>
                        );
                    })}
                </div>

                <AnimateIn from="bottom" delay={0.5} threshold={0.5} className="mt-20 md:mt-40 pt-20 border-t border-white/5 text-center">
                    <h2 className="text-3xl md:text-5xl font-serif mb-6 md:mb-10 italic">{t('cta_section_title')}</h2>
                    <p className="text-zinc-500 mb-10 md:mb-12 max-w-2xl mx-auto font-light leading-relaxed text-sm md:text-base">
                        {t('cta_section_desc')}
                    </p>
                    <Link href="/contact" className="inline-block px-10 md:px-16 py-5 md:py-6 bg-white text-black uppercase tracking-[0.3em] text-[10px] md:text-xs font-black hover:bg-zinc-200 transition-all shadow-2xl">
                        {t('cta_consult')}
                    </Link>
                </AnimateIn>
            </div>
        </Section>
    );
}
