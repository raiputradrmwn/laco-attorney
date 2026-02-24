"use client";

import React, { useEffect, useMemo, useState } from 'react';
import { Link } from '@/i18n/routing';
import { ArrowLeft, Calendar, Clock, Share2 } from 'lucide-react';
import { Header } from "@/components/layout/Header";
import { toast } from "sonner";

interface InsightDetailProps {
    slug: string;
}

type InsightNewsItem = {
    id: string;
    slug: string;
    category: string;
    title: string;
    imageUrl: string;
    content: string;
    publishedAt: string;
};

function stripHtml(html: string) {
    return html.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();
}

export function InsightDetail({ slug }: InsightDetailProps) {
    const [loading, setLoading] = useState(true);
    const [insight, setInsight] = useState<InsightNewsItem | null>(null);

    useEffect(() => {
        const fetchDetail = async () => {
            try {
                const res = await fetch(`/api/news/slug/${encodeURIComponent(slug)}`, { cache: "no-store" });

                if (res.status === 404) {
                    setInsight(null);
                    return;
                }

                if (!res.ok) {
                    const payload = await res.json().catch(() => ({}));
                    toast.error(payload?.error || "Failed to fetch article");
                    return;
                }

                const data = await res.json();
                setInsight(data);
            } catch (error) {
                console.error("Failed to fetch insight detail", error);
                toast.error("Failed to fetch article");
            } finally {
                setLoading(false);
            }
        };

        fetchDetail();
    }, [slug]);

    const readingMinutes = useMemo(() => {
        if (!insight?.content) return 1;
        const words = stripHtml(insight.content).split(" ").filter(Boolean).length;
        return Math.max(1, Math.ceil(words / 200));
    }, [insight?.content]);

    const publishedDate = insight
        ? new Date(insight.publishedAt).toLocaleDateString("en-US", {
            month: "short",
            day: "2-digit",
            year: "numeric",
        })
        : "";

    if (loading) {
        return (
            <main className="bg-black text-white min-h-screen selection:bg-white selection:text-black">
                <Header />
                <div className="pt-40 pb-24 container mx-auto px-6 text-zinc-400">Loading article...</div>
            </main>
        );
    }

    if (!insight) {
        return (
            <main className="bg-black text-white min-h-screen selection:bg-white selection:text-black">
                <Header />
                <div className="pt-40 pb-24 container mx-auto px-6">
                    <h1 className="text-3xl font-serif mb-4">Article not found</h1>
                    <Link href="/insight" className="text-zinc-400 hover:text-white transition-colors">
                        Back to insights
                    </Link>
                </div>
            </main>
        );
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
                                {publishedDate}
                            </span>
                            <span className="flex items-center gap-2">
                                <Clock className="w-4 h-4" />
                                {readingMinutes} Min Read
                            </span>
                        </div>
                    </header>

                    <div className="aspect-[21/9] w-full bg-zinc-900 mb-16 overflow-hidden border border-white/5 relative">
                        <img
                            src={insight.imageUrl}
                            alt={insight.title}
                            className="w-full h-full object-cover grayscale opacity-60"
                        />
                    </div>

                    <div className="prose prose-invert prose-lg mx-auto max-w-3xl">
                        <div
                            className="text-zinc-300"
                            dangerouslySetInnerHTML={{ __html: insight.content }}
                        />
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
