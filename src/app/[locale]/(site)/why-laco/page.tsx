"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Target, Zap, ShieldAlert, Scale, LucideIcon } from "lucide-react";
import { Header } from "@/components/layout/Header";
import { AnimateText } from "@/components/AnimateText";
import { useTranslations } from "next-intl";

interface PillarProps {
    icon: LucideIcon;
    title: string;
    description: string;
}

export default function WhyLacoPage() {
    const t = useTranslations('WhyLaco');

    const pillars = [
        {
            icon: Target,
            title: t('pillars.proactive.title'),
            description: t('pillars.proactive.desc'),
        },
        {
            icon: Zap,
            title: t('pillars.efficiency.title'),
            description: t('pillars.efficiency.desc'),
        },
        {
            icon: ShieldAlert,
            title: t('pillars.shield.title'),
            description: t('pillars.shield.desc'),
        },
    ];

    return (
        <main className="bg-black text-white min-h-screen selection:bg-white selection:text-black">
            <Header />

            <div className="pt-40 pb-24">
                <div className="container mx-auto px-6">
                    {/* Main Branding */}
                    <section className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center mb-40">
                        <div>
                            <span className="text-[10px] tracking-[0.5em] uppercase text-zinc-500 mb-8 block font-bold">
                                {t('label')}
                            </span>
                            <div className="text-7xl md:text-9xl font-serif mb-10 italic leading-none tracking-tighter text-white">
                                <AnimateText text={t('title_1')} />
                                <AnimateText text={t('title_2')} delay={0.2} />
                                <AnimateText text={t('title_3')} delay={0.4} />
                            </div>
                            <div className="space-y-6 text-xl text-zinc-400 font-light leading-relaxed mb-10 max-w-xl">
                                <p>
                                    {t('p1')}
                                </p>
                                <p>
                                    {t('p2')}
                                </p>
                            </div>
                            <div className="flex items-center space-x-6 border-l border-white/20 pl-8">
                                <div className="h-20 w-20 rounded-full overflow-hidden grayscale border border-white/10 relative">
                                    <Image
                                        src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200"
                                        alt="Lilo Agung Crisna Budi"
                                        fill
                                        className="object-cover"
                                    />
                                </div>
                                <div>
                                    <h4 className="font-serif text-xl italic text-white">Lilo Agung Crisna Budi, S.H., M.H.</h4>
                                    <p className="text-[10px] uppercase tracking-widest text-zinc-500 font-bold">{t('founder_role')}</p>
                                </div>
                            </div>
                        </div>

                        <div className="relative">
                            <div className="aspect-[4/5] bg-zinc-900 border border-white/5 overflow-hidden relative">
                                <Image
                                    src="https://images.unsplash.com/photo-1560179707-f14e90ef3623?auto=format&fit=crop&q=80&w=1200"
                                    alt="Corporate Luxury Architecture"
                                    fill
                                    className="object-cover grayscale opacity-40 hover:scale-105 transition-transform duration-1000"
                                />
                            </div>
                            <div className="absolute -bottom-12 -left-12 bg-zinc-950 border border-white/10 p-12 max-w-sm hidden md:block shadow-2xl z-10">
                                <h3 className="text-2xl font-serif mb-6 italic text-white">{t('ethos_title')}</h3>
                                <p className="text-sm font-light text-zinc-500 leading-relaxed mb-4">
                                    {t('ethos_desc')}
                                </p>
                                <p className="text-[10px] uppercase tracking-widest text-zinc-600 font-bold">{t('ethos_author')}</p>
                            </div>
                        </div>
                    </section>

                    {/* Pillars - Expanded */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-white/5 border border-white/5 mt-32">
                        {pillars.map((pillar, index) => {
                            const Icon = pillar.icon;
                            return (
                                <div key={index} className="p-20 bg-black hover:bg-zinc-900 transition-colors duration-500 group">
                                    <Icon className="w-16 h-16 mb-12 text-white group-hover:scale-110 transition-transform duration-300" />
                                    <h3 className="text-3xl font-serif mb-8 uppercase italic">{pillar.title}</h3>
                                    <p className="text-zinc-500 font-light leading-relaxed text-lg">
                                        {pillar.description}
                                    </p>
                                </div>
                            );
                        })}
                    </div>

                    {/* Vision Statement - Expanded */}
                    <section className="mt-48 bg-zinc-950 border border-white/5 p-20 md:p-40 text-center relative overflow-hidden shadow-2xl">
                        <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">
                            <Scale size={400} strokeWidth={0.5} />
                        </div>
                        <div className="max-w-5xl mx-auto relative z-10">
                            <span className="text-[10px] tracking-[0.5em] uppercase text-zinc-600 mb-10 block font-black">
                                {t('mandate_label')}
                            </span>
                            <div className="text-5xl md:text-8xl font-serif italic mb-16 leading-tight tracking-tighter text-white">
                                {t('mandate_quote')}
                            </div>
                            <div className="h-px w-48 bg-white/20 mx-auto mb-12"></div>
                            <p className="font-serif text-3xl text-zinc-400">{t('mandate_signature')}</p>
                            <div className="mt-16">
                                <Link href="/contact" className="inline-block px-16 py-6 border border-white/20 text-white uppercase tracking-[0.4em] text-xs font-black hover:bg-white hover:text-black transition-all">
                                    {t('cta_profile')}
                                </Link>
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        </main>
    );
}
