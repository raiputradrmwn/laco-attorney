"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { Header } from "@/components/layout/Header";

export default function NotFoundPage() {
    const t = useTranslations("NotFound");

    return (
        <main className="bg-black text-white min-h-screen selection:bg-white selection:text-black flex flex-col">
            <Header />
            <div className="flex-1 flex flex-col items-center justify-center pt-20 px-4 text-center">
                <span className="text-[10px] sm:text-xs tracking-[0.4em] md:tracking-[0.5em] uppercase text-zinc-500 mb-6 font-bold">
                    {t('subtitle')}
                </span>

                <h1 className="text-8xl sm:text-[150px] md:text-[200px] font-serif font-black italic mb-8 leading-none tracking-tighter text-white drop-shadow-2xl">
                    {t('title')}
                </h1>

                <div className="max-w-md mx-auto mb-12">
                    <p className="text-zinc-500 font-light text-sm md:text-base leading-relaxed">
                        {t('description')}
                    </p>
                </div>

                <div className="relative group">
                    <div className="absolute inset-0 bg-white/20 blur-xl group-hover:bg-white/30 transition-all opacity-0 group-hover:opacity-100 duration-500"></div>
                    <Link
                        href="/"
                        className="relative inline-block px-10 md:px-16 py-5 md:py-6 bg-white text-black uppercase tracking-[0.3em] text-[10px] md:text-xs font-black hover:bg-zinc-200 transition-all shadow-2xl"
                    >
                        {t('back_home')}
                    </Link>
                </div>
            </div>
        </main>
    );
}
