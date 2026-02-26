"use client";

import { useEffect, useMemo, useState } from 'react';
import { Search, ArrowUpRight, TrendingUp, Globe, Landmark } from 'lucide-react';
import { Link } from '@/i18n/routing';
import { Header } from "@/components/layout/Header";
import { toast } from "sonner";
import { Footer } from "@/components/layout/Footer";
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

function toExcerpt(html: string, max = 170) {
    const text = stripHtml(html);
    return text.length > max ? `${text.slice(0, max)}...` : text;
}

export function InsightList() {
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");
    const [insights, setInsights] = useState<InsightNewsItem[]>([]);

    useEffect(() => {
        const fetchInsights = async () => {
            try {
                const res = await fetch("/api/news", { cache: "no-store" });

                if (!res.ok) {
                    const payload = await res.json().catch(() => ({}));
                    toast.error(payload?.error || "Failed to fetch insights");
                    return;
                }

                const data = await res.json();
                setInsights(Array.isArray(data) ? data : []);
            } catch (error) {
                console.error("Failed to fetch insights", error);
                toast.error("Failed to fetch insights");
            } finally {
                setLoading(false);
            }
        };

        fetchInsights();
    }, []);

    const filteredInsights = useMemo(() => {
        if (!search.trim()) return insights;

        const keyword = search.toLowerCase();
        return insights.filter((item) => {
            const haystack = `${item.title} ${item.category} ${stripHtml(item.content)}`.toLowerCase();
            return haystack.includes(keyword);
        });
    }, [insights, search]);

    return (
        <main className="bg-black text-white min-h-screen selection:bg-white selection:text-black">
            <Header />
            <div className="pt-40 pb-24">
                <div className="container mx-auto px-6">
                    <header className="mb-24 flex flex-col md:flex-row md:items-end justify-between gap-12">
                        <div className="max-w-3xl">
                            <span className="text-[10px] tracking-[0.5em] uppercase text-zinc-500 mb-6 block font-bold">Thought Leadership</span>
                            <h1 className="text-6xl md:text-8xl font-serif mb-8 italic leading-none tracking-tighter text-balance">Insights & <br />Legal Briefs.</h1>
                            <p className="text-xl text-zinc-400 font-light leading-relaxed max-w-xl">
                                Critical analysis of the legal forces shaping Bali&apos;s economy and the global business environment.
                            </p>
                        </div>
                        <div className="w-full md:w-auto">
                            <div className="relative border-b border-white/20 pb-4">
                                <input
                                    type="text"
                                    placeholder="Search by keyword..."
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                    className="bg-transparent text-white px-0 py-2 text-sm focus:outline-none w-full md:w-80 tracking-widest uppercase placeholder:text-zinc-600"
                                />
                                <Search className="absolute right-0 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
                            </div>
                        </div>
                    </header>

                    {/* <section className="mb-32 grid grid-cols-1 md:grid-cols-4 gap-px bg-white/10 border border-white/10 overflow-hidden">
                        <div className="p-8 bg-zinc-950">
                            <TrendingUp size={20} className="mb-4 text-zinc-400" />
                            <h4 className="text-[10px] uppercase tracking-widest text-zinc-500 font-bold mb-2">FDI Growth (Bali)</h4>
                            <p className="text-2xl font-serif">+12.4% <span className="text-xs font-sans text-zinc-600 italic font-light">vs LY</span></p>
                        </div>
                        <div className="p-8 bg-zinc-950">
                            <Globe size={20} className="mb-4 text-zinc-400" />
                            <h4 className="text-[10px] uppercase tracking-widest text-zinc-500 font-bold mb-2">Foreign Land Tenure</h4>
                            <p className="text-2xl font-serif">HGB Expert Advisory</p>
                        </div>
                        <div className="p-8 bg-zinc-950">
                            <Landmark size={20} className="mb-4 text-zinc-400" />
                            <h4 className="text-[10px] uppercase tracking-widest text-zinc-500 font-bold mb-2">Regulatory Shifts</h4>
                            <p className="text-2xl font-serif">Omnibus Law Updates</p>
                        </div>
                        <div className="p-8 bg-zinc-950 flex items-center justify-center">
                            <Link href="/contact" className="text-[10px] font-black uppercase tracking-[0.3em] bg-white text-black px-6 py-4 w-full hover:bg-zinc-200 transition-colors text-center inline-block">
                                Request Investment Brief
                            </Link>
                        </div>
                    </section> */}

                    {/* Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-24">
                        {loading ? (
                            <div className="text-zinc-400 text-sm">Loading insights...</div>
                        ) : filteredInsights.length === 0 ? (
                            <div className="text-zinc-400 text-sm">No insights found.</div>
                        ) : filteredInsights.map((item) => (
                            <article key={item.id} className="group cursor-pointer">
                                <div className="aspect-[16/10] bg-zinc-900 mb-10 overflow-hidden border border-white/5 relative">
                                    <img src={item.imageUrl} alt={item.title} className="w-full h-full object-cover grayscale transition-all duration-700 group-hover:scale-105 group-hover:grayscale-0 opacity-40 group-hover:opacity-100" />
                                    <div className="absolute top-6 left-6">
                                        <span className="text-[10px] tracking-widest uppercase bg-black/80 backdrop-blur-md text-white px-4 py-2 border border-white/10 font-black">{item.category}</span>
                                    </div>
                                </div>
                                <div className="flex items-center justify-between mb-6">
                                    <span className="text-[10px] text-zinc-500 tracking-[0.2em] font-bold uppercase">
                                        {new Date(item.publishedAt).toLocaleDateString("en-US", {
                                            month: "short",
                                            day: "2-digit",
                                            year: "numeric",
                                        })}
                                    </span>
                                    <div className="h-px bg-white/10 flex-grow mx-6"></div>
                                    <ArrowUpRight size={16} className="text-zinc-500 group-hover:text-white transition-colors" />
                                </div>
                                <h3 className="text-3xl font-serif mb-6 group-hover:text-zinc-300 transition-colors italic leading-tight text-balance">{item.title}</h3>
                                <p className="text-zinc-500 font-light leading-relaxed mb-8 text-lg text-balance">
                                    {toExcerpt(item.content)}
                                </p>
                                <Link href={`/insight/${item.slug}`} className="text-[10px] font-black uppercase tracking-[0.3em] border-b-2 border-white/10 pb-2 group-hover:border-white transition-all inline-block">
                                    Read Publication
                                </Link>
                            </article>
                        ))}
                    </div>
                </div>
            </div>
            <Footer />
        </main>
    );
}
