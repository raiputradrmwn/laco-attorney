"use client";

import { Link } from "@/i18n/routing";
import { ArrowRight, Shield, Scale, Briefcase, Award, LucideIcon } from "lucide-react";
import { useTranslations } from "next-intl";

interface ServiceFeature {
    icon: LucideIcon;
    key: string;
}

const SERVICE_FEATURES: ServiceFeature[] = [
    {
        icon: Shield,
        key: "fortified",
    },
    {
        icon: Scale,
        key: "justice",
    },
    {
        icon: Briefcase,
        key: "corporate",
    },
    {
        icon: Award,
        key: "elite",
    },
];

export function Philosophy() {
    const t = useTranslations('Philosophy');

    return (
        <section className="py-24 md:py-48 bg-zinc-950 text-white">
            <div className="container mx-auto px-4 md:px-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-32 items-start">
                    {/* Left Content */}
                    <div className="text-center lg:text-left">
                        <span className="text-[10px] tracking-[0.4em] uppercase text-zinc-500 mb-6 md:mb-8 block font-bold">
                            {t('label')}
                        </span>
                        <h2 className="text-4xl sm:text-5xl md:text-7xl font-serif mb-8 md:mb-12 leading-[1.1] tracking-tighter text-balance" dangerouslySetInnerHTML={{ __html: t.raw('title') }} />

                        <div className="space-y-6 md:space-y-8 text-zinc-400 leading-relaxed text-lg md:text-xl font-light">
                            <p>
                                {t('desc1')}
                            </p>
                            <p className="hidden md:block">
                                {t('desc2')}
                            </p>
                        </div>
                        <Link
                            href="/why-laco"
                            className="mt-10 md:mt-12 group inline-flex items-center space-x-4 text-white font-black uppercase tracking-[0.2em] text-[10px] md:text-xs border-b border-white/20 pb-4 hover:border-white transition-colors"
                        >
                            <span>{t('cta')}</span>
                            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-2" />
                        </Link>
                    </div>

                    {/* Right Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-px bg-white/5 border border-white/5 shadow-2xl">
                        {SERVICE_FEATURES.map((feature, index) => {
                            const Icon = feature.icon;
                            return (
                                <div
                                    key={index}
                                    className="p-10 md:p-16 bg-black flex flex-col items-center sm:items-start text-center sm:text-left hover:bg-zinc-900/50 transition-colors duration-500"
                                >
                                    <Icon className="w-10 h-10 md:w-12 md:h-12 mb-8 text-white" />
                                    <h3 className="text-xl md:text-2xl font-serif mb-4 md:mb-6">{t(`features.${feature.key}.title`)}</h3>
                                    <p className="text-xs md:text-sm text-zinc-500 font-light leading-relaxed">
                                        {t(`features.${feature.key}.desc`)}
                                    </p>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </section>
    );
}
