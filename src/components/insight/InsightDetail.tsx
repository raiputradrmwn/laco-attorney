"use client";

import React from 'react';
import { Link } from '@/i18n/routing';
import { ArrowLeft, Calendar, Clock, Share2 } from 'lucide-react';
import { Header } from "@/components/layout/Header";
import { INSIGHTS_DATA } from './InsightList';
import { notFound } from 'next/navigation';

interface InsightDetailProps {
    slug: string;
}

export function InsightDetail({ slug }: InsightDetailProps) {
    const insight = INSIGHTS_DATA.find((item) => item.slug === slug);

    if (!insight) {
        notFound();
    }

    return (
        <main className="bg-black text-white min-h-screen selection:bg-white selection:text-black">
            <Header />
            <div className="pt-24 md:pt-40 pb-20 md:pb-24">
                <article className="container mx-auto px-6 max-w-5xl">
                    <Link href="/insight" className="inline-flex items-center text-[10px] uppercase tracking-[0.4em] text-zinc-500 hover:text-white transition-colors mb-12">
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        Back to Insights
                    </Link>

                    <header className="mb-16 text-center">
                        <span className="text-[10px] tracking-[0.5em] uppercase text-zinc-500 mb-6 block font-bold">
                            {insight.category}
                        </span>
                        <h1 className="text-3xl sm:text-5xl md:text-6xl font-serif mb-8 italic tracking-tighter leading-tight text-balance">
                            {insight.title}
                        </h1>
                        <div className="flex items-center justify-center gap-8 text-zinc-500 text-xs tracking-widest uppercase">
                            <span className="flex items-center gap-2">
                                <Calendar className="w-4 h-4" />
                                {insight.date}
                            </span>
                            <span className="flex items-center gap-2">
                                <Clock className="w-4 h-4" />
                                5 Min Read
                            </span>
                        </div>
                    </header>

                    <div className="aspect-[21/9] w-full bg-zinc-900 mb-16 overflow-hidden border border-white/5 relative">
                        <img
                            src={insight.image}
                            alt={insight.title}
                            className="w-full h-full object-cover grayscale opacity-60"
                        />
                    </div>

                    <div className="prose prose-invert prose-lg mx-auto max-w-3xl">
                        <p className="lead text-2xl font-serif italic text-zinc-300 mb-12 leading-relaxed">
                            {insight.excerpt}
                        </p>

                        <p className="text-zinc-400 font-light leading-relaxed mb-8">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                        </p>

                        <h2 className="text-2xl font-serif italic text-white mt-12 mb-6">Strategic Implications</h2>
                        <p className="text-zinc-400 font-light leading-relaxed mb-8">
                            Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.
                        </p>

                        <blockquote className="border-l-2 border-white pl-6 py-2 my-12 italic text-xl text-zinc-300">
                            "The legal landscape in Bali is shifting rapidly, requiring investors to stay ahead of regulatory changes to maximize their returns."
                        </blockquote>

                        <h2 className="text-2xl font-serif italic text-white mt-12 mb-6">Regulatory Framework Analysis</h2>
                        <p className="text-zinc-400 font-light leading-relaxed mb-8">
                            Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem.
                        </p>

                        <p className="text-zinc-400 font-light leading-relaxed mb-8">
                            Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?
                        </p>
                    </div>

                    <div className="border-t border-white/10 mt-24 pt-12 flex justify-between items-center max-w-3xl mx-auto">
                        <span className="text-[10px] uppercase tracking-[0.3em] text-zinc-500">Share this article</span>
                        <button className="text-white hover:text-zinc-300 transition-colors">
                            <Share2 className="w-5 h-5" />
                        </button>
                    </div>
                </article>
            </div>
        </main>
    );
}
