"use client";

import React from "react";
import Link from "next/link";
import { PenTool, FileCheck, Landmark } from "lucide-react";
import { Header } from "@/components/layout/Header";
import { useTranslations } from "next-intl";

export function NotaryService() {
    const t = useTranslations('PracticePages.NotaryService');
    const tCommon = useTranslations('PracticePages');

    return (
        <main className="bg-black text-white min-h-screen selection:bg-white selection:text-black">
            <Header />
            <div className="pt-24 md:pt-40 pb-20 md:pb-24">
                <div className="container mx-auto px-4 md:px-6">
                    <header className="mb-16 md:mb-32">
                        <Link href="/practice" className="text-[10px] uppercase tracking-[0.4em] text-zinc-500 hover:text-white transition-colors mb-8 md:mb-12 block">
                            {tCommon('back_to_practices')}
                        </Link>
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-24 items-end">
                            <div>
                                <span className="text-[10px] tracking-[0.5em] uppercase text-zinc-500 mb-4 md:mb-6 block font-bold">
                                    {t('label')}
                                </span>
                                <h1 className="text-4xl sm:text-6xl md:text-8xl font-serif mb-6 md:mb-8 italic tracking-tighter leading-none text-balance">
                                    <span dangerouslySetInnerHTML={{ __html: t.raw('title') }} />
                                </h1>
                            </div>
                            <p className="text-lg md:text-xl text-zinc-400 font-light leading-relaxed italic text-balance">
                                {t('description')}
                            </p>
                        </div>
                    </header>

                    <section className="grid grid-cols-1 lg:grid-cols-3 gap-10 md:gap-16 mb-24 md:mb-40">
                        <div className="lg:col-span-2 space-y-8 md:space-y-12">
                            <h2 className="text-3xl md:text-4xl font-serif italic border-b border-white/10 pb-6 text-balance">
                                {t('main_title')}
                            </h2>
                            <div className="space-y-6 text-zinc-400 text-base md:text-lg leading-relaxed font-light">
                                <p>
                                    {t('p1')}
                                </p>
                                <p>
                                    {t('p2')}
                                </p>
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 md:gap-12 pt-4 md:pt-8">
                                <div className="space-y-4">
                                    <Landmark className="w-8 h-8 text-white" />
                                    <h4 className="text-xl font-serif italic">{t('feature1_title')}</h4>
                                    <p className="text-xs md:text-sm text-zinc-500 leading-relaxed">
                                        {t('feature1_desc')}
                                    </p>
                                </div>
                                <div className="space-y-4">
                                    <FileCheck className="w-8 h-8 text-white" />
                                    <h4 className="text-xl font-serif italic">{t('feature2_title')}</h4>
                                    <p className="text-xs md:text-sm text-zinc-500 leading-relaxed">
                                        {t('feature2_desc')}
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="bg-zinc-950 p-8 md:p-12 border border-white/5 h-fit shadow-2xl">
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

                    <section className="py-16 md:py-24 border-t border-white/10 text-center">
                        <h2 className="text-3xl md:text-4xl font-serif italic mb-8 md:mb-12">{t('cta_title')}</h2>
                        <Link href="/contact" className="px-12 md:px-16 py-5 md:py-6 bg-white text-black uppercase tracking-[0.3em] text-[10px] md:text-xs font-black hover:bg-zinc-200 transition-all w-full sm:w-auto inline-block">
                            {t('cta_button')}
                        </Link>
                    </section>
                </div>
            </div>
        </main>
    );
}
