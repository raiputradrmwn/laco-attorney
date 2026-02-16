"use client";

import { Link } from "@/i18n/routing";
import Image from "next/image";
import { AnimateText } from "@/components/AnimateText";
import { AnimateIn } from "@/components/AnimateIn";
import { useTranslations } from "next-intl";

export function Hero() {
    const t = useTranslations('Hero');

    return (
        <section className="relative min-h-[100dvh] flex items-center justify-center pt-20 overflow-hidden">
            {/* Background Image */}
            <div className="absolute inset-0 opacity-50 grayscale">
                <Image
                    src="https://images.unsplash.com/photo-1505664194779-8beaceb93744?auto=format&fit=crop&q=80&w=2000"
                    alt="Law Firm Interior"
                    fill
                    className="object-cover"
                    priority
                />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent"></div>

            <div className="container mx-auto px-4 md:px-6 relative z-10 text-center">
                <AnimateIn from="top" delay={0.2} className="inline-block border-l border-r border-white/20 px-4 md:px-8 py-2 mb-6 md:mb-8">
                    <h4 className="text-[9px] md:text-[10px] tracking-[0.4em] md:tracking-[0.6em] uppercase font-bold text-gray-400">
                        {t('tagline')}
                    </h4>
                </AnimateIn>

                <div className="text-4xl sm:text-6xl md:text-8xl lg:text-9xl font-serif mb-6 md:mb-8 max-w-6xl mx-auto leading-[1.1] tracking-tight text-balance text-white flex flex-col items-center">
                    <AnimateText text={t('title_prefix')} className="justify-center" delay={0.4} />
                    <div className="italic font-light text-zinc-300">
                        <AnimateText text={t('title_main')} className="justify-center" delay={0.9} />
                    </div>
                </div>

                <AnimateIn from="bottom" delay={1.4} opacity={0}>
                    <p className="text-base md:text-lg lg:text-xl text-gray-400 max-w-4xl mx-auto mb-10 md:mb-12 font-light leading-relaxed tracking-wide px-4">
                        {t('description')}
                    </p>
                </AnimateIn>

                <AnimateIn from="bottom" delay={1.6} className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 px-4">
                    <Link
                        href="/contact"
                        className="px-10 md:px-12 py-4 md:py-5 bg-white text-black uppercase tracking-[0.2em] text-[10px] md:text-xs font-black hover:bg-zinc-200 transition-all w-full sm:w-auto shadow-[0_0_30px_rgba(255,255,255,0.1)]"
                    >
                        {t('cta_consult')}
                    </Link>
                    <Link
                        href="/practice"
                        className="px-10 md:px-12 py-4 md:py-5 border border-white/20 text-white uppercase tracking-[0.2em] text-[10px] md:text-xs font-black hover:bg-white hover:text-black transition-all w-full sm:w-auto"
                    >
                        {t('cta_explore')}
                    </Link>
                </AnimateIn>
            </div>
        </section>
    );
}
