"use client";

import React from "react";
import { useTranslations } from "next-intl";

export function TrustQuote() {
    const t = useTranslations('TrustQuote');

    return (
        <section className="py-24 md:py-32 bg-black text-white">
            <div className="container mx-auto px-6 text-center">
                <div className="max-w-4xl mx-auto">
                    <p className="text-2xl sm:text-3xl md:text-5xl font-serif italic text-zinc-300 leading-tight text-balance">
                        &quot;{t('quote')}&quot;
                    </p>
                    <p className="mt-8 text-[9px] md:text-[10px] uppercase tracking-[0.4em] md:tracking-[0.5em] font-black text-zinc-600">
                        {t('author')}
                    </p>
                </div>
            </div>
        </section>
    );
}
