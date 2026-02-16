"use client";

import React from 'react';
import { Search, ArrowUpRight, TrendingUp, Globe, Landmark } from 'lucide-react';
import { Link } from '@/i18n/routing';
import { Header } from "@/components/layout/Header";

export const INSIGHTS_DATA = [
    {
        id: '1',
        slug: 'north-bali-airport-infrastructure-shift',
        category: 'Bali Investment Watch',
        title: 'North Bali Airport & The Infrastructure Shift: Legal Real Estate Impacts',
        date: 'Jan 24, 2024',
        excerpt: 'Analyzing the strategic legal moves required for investors as North Bali prepares for major infrastructure overhauls and new zoning laws.',
        image: 'https://images.unsplash.com/photo-1540331547168-8b63109225b7?auto=format&fit=crop&q=80&w=800'
    },
    {
        id: '2',
        slug: 'digital-nomad-visas-remote-work-taxation',
        category: 'Law Update',
        title: 'Digital Nomad Visas & Remote Work Taxation in Indonesia',
        date: 'Jan 15, 2024',
        excerpt: 'The complete legal breakdown of the latest stay-permit regulations for the modern global professional residing in Bali.',
        image: 'https://images.unsplash.com/photo-1531297484001-80022131f5a1?auto=format&fit=crop&q=80&w=800'
    },
    {
        id: '3',
        slug: 'fdi-trends-2024-bali-luxury-resort-capital',
        category: 'Bali Investment Watch',
        title: 'FDI Trends 2024: Why Bali Remains the Luxury Resort Capital',
        date: 'Dec 20, 2023',
        excerpt: 'Expert commentary on Foreign Direct Investment flows and the evolving regulatory framework for international hotel chains.',
        image: 'https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?auto=format&fit=crop&q=80&w=800'
    },
    {
        id: '4',
        slug: 'intellectual-property-brand-protection',
        category: 'Case Study',
        title: 'Intellectual Property & Brand Protection for Bali Lifestyle Brands',
        date: 'Nov 28, 2023',
        excerpt: 'How LACO secured global trademark rights for a growing Bali-based international fashion house.',
        image: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&q=80&w=800'
    }
];

export function InsightList() {
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
                                Critical analysis of the legal forces shaping Bali's economy and the global business environment.
                            </p>
                        </div>
                        <div className="w-full md:w-auto">
                            <div className="relative border-b border-white/20 pb-4">
                                <input
                                    type="text"
                                    placeholder="Search by keyword..."
                                    className="bg-transparent text-white px-0 py-2 text-sm focus:outline-none w-full md:w-80 tracking-widest uppercase placeholder:text-zinc-600"
                                />
                                <Search className="absolute right-0 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
                            </div>
                        </div>
                    </header>

                    {/* Investment Market Stats Panel */}
                    <section className="mb-32 grid grid-cols-1 md:grid-cols-4 gap-px bg-white/10 border border-white/10 overflow-hidden">
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
                    </section>

                    {/* Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-24">
                        {INSIGHTS_DATA.map((item) => (
                            <article key={item.id} className="group cursor-pointer">
                                <div className="aspect-[16/10] bg-zinc-900 mb-10 overflow-hidden border border-white/5 relative">
                                    <img src={item.image} alt={item.title} className="w-full h-full object-cover grayscale transition-all duration-700 group-hover:scale-105 group-hover:grayscale-0 opacity-40 group-hover:opacity-100" />
                                    <div className="absolute top-6 left-6">
                                        <span className="text-[10px] tracking-widest uppercase bg-black/80 backdrop-blur-md text-white px-4 py-2 border border-white/10 font-black">{item.category}</span>
                                    </div>
                                </div>
                                <div className="flex items-center justify-between mb-6">
                                    <span className="text-[10px] text-zinc-500 tracking-[0.2em] font-bold uppercase">{item.date}</span>
                                    <div className="h-px bg-white/10 flex-grow mx-6"></div>
                                    <ArrowUpRight size={16} className="text-zinc-500 group-hover:text-white transition-colors" />
                                </div>
                                <h3 className="text-3xl font-serif mb-6 group-hover:text-zinc-300 transition-colors italic leading-tight text-balance">{item.title}</h3>
                                <p className="text-zinc-500 font-light leading-relaxed mb-8 text-lg text-balance">
                                    {item.excerpt}
                                </p>
                                <Link href={`/insight/${item.slug}`} className="text-[10px] font-black uppercase tracking-[0.3em] border-b-2 border-white/10 pb-2 group-hover:border-white transition-all inline-block">
                                    Read Publication
                                </Link>
                            </article>
                        ))}
                    </div>

                    <div className="mt-40 text-center">
                        <button className="px-16 py-6 border border-white/20 uppercase tracking-[0.4em] text-xs font-black hover:bg-white hover:text-black transition-all">
                            Access Full Archive
                        </button>
                    </div>
                </div>
            </div>
        </main>
    );
}
