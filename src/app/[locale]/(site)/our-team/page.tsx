import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { Header } from "@/components/layout/Header";
import { AnimateIn } from "@/components/AnimateIn";
import { AnimateText } from "@/components/AnimateText";

const TEAM_MEMBERS = [
    {
        id: "1",
        name: "Lilo Agung Crisna Budi, S.H., M.H.",
        position: "Founder & Managing Partner",
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=800",
        specialization: "High-Stakes Litigation",
        bio: "Renowned for his indomitable resilience in the courtroom and strategic foresight in corporate restructuring. A visionary leader dedicated to legal integrity."
    },
    {
        id: "2",
        name: "Rosanno Tito Atmaja, S.H., M.H.",
        position: "Partner (Aviation)",
        image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=800",
        specialization: "Aviation Casualty Defense",
        bio: "One of Indonesia’s foremost experts in aeronautical litigation and international aviation conventions."
    },
    {
        id: "3",
        name: "Reinhard R Silaban, S.H.",
        position: "Head of Jakarta Branch",
        image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=800",
        specialization: "Capital Markets",
        bio: "Commanding our capital city presence with a focus on institutional legal frameworks and multi-national advisory."
    },
    {
        id: "4",
        name: "Andita Suharto, S.H., M.Kn.",
        position: "Head of Yogyakarta Branch",
        image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=800",
        specialization: "Notarial Architecture",
        bio: "Expert in fiduciaries and authentication, bridging corporate intent with formal state recognition."
    },
    {
        id: "5",
        name: "Dwiki Mahadipta, S.H.",
        position: "Senior Associate",
        image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=800",
        specialization: "Dispute Resolution",
        bio: "A relentless tactician in commercial conflicts, known for surgical negotiation and courtroom resilience."
    },
    {
        id: "6",
        name: "Hana Daniella Asyer, S.H.",
        position: "Associate",
        image: "https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?auto=format&fit=crop&q=80&w=800",
        specialization: "Private Wealth & IP",
        bio: "Dedicated to the discreet protection of creative assets and family legacies in a global context."
    },
    {
        id: "7",
        name: "Catherine Widjaja, LL.M.",
        position: "Counsel",
        image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=800",
        specialization: "International Affairs",
        bio: "Bridging global investors and Indonesian regulatory landscapes with precision and scholarship."
    }
];

export default function OurTeamPage() {
    return (
        <main className="bg-black text-white min-h-screen selection:bg-white selection:text-black">
            <Header />

            <div className="pt-24 md:pt-40 pb-20 md:pb-24 text-center">
                <header className="mb-20 md:mb-32 max-w-4xl mx-auto px-4 md:px-6">
                    <AnimateIn from="top" delay={0.2}>
                        <span className="text-[10px] tracking-[0.4em] md:tracking-[0.5em] uppercase text-zinc-500 mb-4 md:mb-6 block font-bold text-balance">The Collective Expertise</span>
                    </AnimateIn>
                    <div className="text-4xl sm:text-6xl md:text-8xl font-serif mb-6 md:mb-8 italic tracking-tighter leading-[1.1] text-balance">
                        <AnimateText text="Architects of Justice." />
                    </div>
                    <AnimateIn from="bottom" delay={0.8}>
                        <p className="text-base md:text-lg text-zinc-400 font-light leading-relaxed tracking-wide text-balance">
                            Our counsel is comprised of elite legal minds forged in high-pressure environments across Denpasar, Jakarta, and Yogyakarta. We operate with singular focus on client success.
                        </p>
                    </AnimateIn>
                </header>

                <div className="container mx-auto px-4 md:px-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-y-16 md:gap-y-24 gap-x-12 xl:gap-x-16">
                        {TEAM_MEMBERS.map((member, index) => (
                            <AnimateIn key={member.id} from="bottom" delay={index * 0.15} duration={0.8} className="group border-l border-white/10 pl-6 md:pl-12 relative">
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 md:gap-12">
                                    <div className="aspect-[3/4] overflow-hidden bg-zinc-900 border border-white/10 grayscale group-hover:grayscale-0 transition-all duration-700 relative">
                                        <Image
                                            src={member.image}
                                            alt={member.name}
                                            fill
                                            className="object-cover transition-transform duration-1000 group-hover:scale-110 opacity-60 group-hover:opacity-100"
                                        />
                                    </div>
                                    <div className="flex flex-col justify-center text-center sm:text-left">
                                        <div className="mb-6 md:mb-8">
                                            <h3 className="text-xl md:text-2xl font-serif font-bold tracking-tight mb-1 md:mb-2 italic">{member.name}</h3>
                                            <p className="text-[9px] md:text-[10px] tracking-[0.2em] md:tracking-[0.3em] uppercase text-zinc-500 font-black">{member.position}</p>
                                        </div>
                                        <p className="text-zinc-400 font-light text-xs md:text-sm leading-relaxed mb-6 md:mb-8 border-l-0 sm:border-l border-white/20 sm:pl-6 italic">
                                            &quot;{member.bio}&quot;
                                        </p>
                                        <div className="space-y-4">
                                            <div className="flex flex-col sm:flex-row items-center sm:items-start sm:space-x-2 space-y-1 sm:space-y-0">
                                                <span className="text-[9px] md:text-[10px] tracking-widest uppercase font-black text-white">Focus:</span>
                                                <span className="text-[9px] md:text-[10px] tracking-widest uppercase text-zinc-500">{member.specialization}</span>
                                            </div>
                                            <div className="flex items-center justify-center sm:justify-start space-x-6 pt-4 border-t border-white/5">
                                                <Link href="#" className="flex items-center space-x-2 text-[9px] md:text-[10px] tracking-widest font-black uppercase text-zinc-400 hover:text-white transition-colors">
                                                    <span>LinkedIn</span>
                                                    <ArrowUpRight size={12} />
                                                </Link>
                                                <Link href="#" className="flex items-center space-x-2 text-[9px] md:text-[10px] tracking-widest font-black uppercase text-zinc-400 hover:text-white transition-colors">
                                                    <span>Email</span>
                                                    <ArrowUpRight size={12} />
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </AnimateIn>
                        ))}
                    </div>

                    <AnimateIn from="right" delay={0.6} threshold={0.5} className="mt-24 md:mt-48 bg-zinc-950 border border-white/5 p-10 md:p-24 lg:p-32 flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-16 relative overflow-hidden text-center lg:text-left">
                        <div className="max-w-xl relative z-10">
                            <span className="text-[10px] tracking-[0.4em] uppercase text-zinc-500 mb-6 block font-black">Elite Career Path</span>
                            <h2 className="text-4xl md:text-5xl font-serif italic mb-6 md:mb-8 tracking-tighter leading-tight">Ascend to <br className="hidden md:block" />the Standard.</h2>
                            <p className="text-sm md:text-base text-zinc-400 font-light leading-relaxed px-4 lg:px-0">
                                LACO is selectively expanding its global practice. We seek high-order legal minds with resilience required for elite advocacy and commitment to fiduciary excellence.
                            </p>
                        </div>
                        <button className="px-12 md:px-16 py-5 md:py-6 bg-white text-black uppercase tracking-[0.3em] text-[10px] md:text-xs font-black hover:bg-zinc-200 transition-all shadow-xl shrink-0 relative z-10 w-full sm:w-auto">
                            Submit Formal Credentials
                        </button>
                    </AnimateIn>
                </div>
            </div>
        </main>
    );
}
