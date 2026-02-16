"use client";

import React from "react";
import Link from "next/link";
import { ShieldCheck, Eye, Zap, Globe } from "lucide-react";
import { Header } from "@/components/layout/Header";
import { useTranslations } from "next-intl";

export function IntellectualProperty() {
    const t = useTranslations('PracticePages.IntellectualProperty');
    const tCommon = useTranslations('PracticePages');

    return (
        <main className="bg-black text-white min-h-screen selection:bg-white selection:text-black">
            <Header />
            <div className="pt-24 md:pt-40 pb-20 md:pb-24">
                <div className="container mx-auto px-6">
                    <header className="mb-32">
                        <Link href="/practice" className="text-[10px] uppercase tracking-[0.4em] text-zinc-500 hover:text-white transition-colors mb-12 block">
                            {tCommon('back_to_practices')}
                        </Link>
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-end">
                            <div>
                                <span className="text-[10px] tracking-[0.5em] uppercase text-zinc-500 mb-6 block font-bold">
                                    {t('label')}
                                </span>
                                <h1 className="text-4xl sm:text-6xl md:text-8xl font-serif mb-6 md:mb-8 italic tracking-tighter leading-none text-balance">
                                    {t('title')}
                                </h1>
                            </div>
                            <p className="text-lg md:text-xl text-zinc-400 font-light leading-relaxed italic text-balance">
                                {t('description')}
                            </p>
                        </div>
                    </header>

                    <section className="grid grid-cols-1 lg:grid-cols-3 gap-16 mb-40">
                        <div className="lg:col-span-2 space-y-12">
                            <h2 className="text-3xl md:text-4xl font-serif italic border-b border-white/10 pb-6 text-balance">
                                {t('main_title')}
                            </h2>
                            <p className="text-zinc-400 text-base md:text-lg leading-relaxed font-light">
                                {t('p1')}
                            </p>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 pt-8">
                                <div className="space-y-4">
                                    <ShieldCheck className="w-8 h-8 text-white" />
                                    <h4 className="text-xl font-serif italic">{t('feature1_title')}</h4>
                                    <p className="text-xs md:text-sm text-zinc-500 leading-relaxed">
                                        {t('feature1_desc')}
                                    </p>
                                </div>
                                <div className="space-y-4">
                                    <Zap className="w-8 h-8 text-white" />
                                    <h4 className="text-xl font-serif italic">{t('feature2_title')}</h4>
                                    <p className="text-xs md:text-sm text-zinc-500 leading-relaxed">
                                        {t('feature2_desc')}
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="bg-zinc-950 p-12 border border-white/5 h-fit">
                            <h3 className="text-xs uppercase tracking-[0.4em] font-black text-zinc-500 mb-8">{t('sidebar_title')}</h3>
                            <ul className="space-y-6 text-xs md:text-sm font-light text-zinc-300">
                                {[1, 2, 3, 4, 5].map((item) => (
                                    <li key={item} className="flex items-center space-x-3">
                                        <span className="w-1.5 h-1.5 bg-white rounded-full"></span>
                                        <span>{t(`list.${item}`)}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </section>

                    <section className="py-24 border-t border-white/10 text-center">
                        <h2 className="text-3xl md:text-4xl font-serif italic mb-12">{t('cta_title')}</h2>
                        <Link href="/contact" className="px-16 py-6 bg-white text-black uppercase tracking-[0.3em] text-[10px] md:text-xs font-black hover:bg-zinc-200 transition-all inline-block">
                            {t('cta_button')}
                        </Link>
                    </section>
                </div>
            </div>
        </main>
    );
}
