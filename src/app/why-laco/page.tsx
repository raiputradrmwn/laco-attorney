import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Target, Zap, ShieldAlert, Scale, LucideIcon } from "lucide-react";
import { Header } from "@/components/layout/Header";
import { AnimateText } from "@/components/AnimateText";


interface PillarProps {
    icon: LucideIcon;
    title: string;
    description: string;
}

const PILLARS: PillarProps[] = [
    {
        icon: Target,
        title: "Proactive Dominance",
        description: "We operate ahead of the curve. Our firm utilizes advanced predictive legal analysis to anticipate regulatory shifts and market volatility, ensuring your business remains insulated and prepared for three steps in the future.",
    },
    {
        icon: Zap,
        title: "Lethal Efficiency",
        description: "Bureaucracy is the antithesis of growth. We have optimized every internal structural process to deliver world-class legal documentation and high-stakes strategy with unprecedented speed and surgical accuracy.",
    },
    {
        icon: ShieldAlert,
        title: "Absolute Fiduciary Shield",
        description: "Confidentiality is our highest mandate. We deploy military-grade security protocols for all client data and maintain total discretion in all private, corporate, and governmental interactions.",
    },
];

export default function WhyLacoPage() {
    return (
        <main className="bg-black text-white min-h-screen selection:bg-white selection:text-black">
            <Header />

            <div className="pt-40 pb-24">
                <div className="container mx-auto px-6">
                    {/* Main Branding */}
                    <section className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center mb-40">
                        <div>
                            <span className="text-[10px] tracking-[0.5em] uppercase text-zinc-500 mb-8 block font-bold">
                                The LACO Standard
                            </span>
                            <div className="text-7xl md:text-9xl font-serif mb-10 italic leading-none tracking-tighter text-white">
                                <AnimateText text="Commanding" />
                                <AnimateText text="Absolute" delay={0.2} />
                                <AnimateText text="Excellence." delay={0.4} />
                            </div>
                            <div className="space-y-6 text-xl text-zinc-400 font-light leading-relaxed mb-10 max-w-xl">
                                <p>
                                    In the arena of high-stakes law, professionalism is not merely a conduct—it is an architectural discipline. LACO was founded on the principle that elite legal counsel must be as resilient as the interests it protects.
                                </p>
                                <p>
                                    We do not simply offer advice; we engineer tactical victories and provide the structural certainty required for global business expansion and private legacy preservation.
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
                                    <p className="text-[10px] uppercase tracking-widest text-zinc-500 font-bold">Founder & Managing Partner</p>
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
                                <h3 className="text-2xl font-serif mb-6 italic text-white">An Unwavering Ethos</h3>
                                <p className="text-sm font-light text-zinc-500 leading-relaxed mb-4">
                                    &quot;At LACO, resilience is our core. Every partner and associate is hand-selected for their intellectual stamina, tactical brilliance, and unwavering commitment to client outcomes.&quot;
                                </p>
                                <p className="text-[10px] uppercase tracking-widest text-zinc-600 font-bold">— Founding Principle</p>
                            </div>
                        </div>
                    </section>

                    {/* Pillars - Expanded */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-white/5 border border-white/5 mt-32">
                        {PILLARS.map((pillar, index) => {
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
                                Our Perpetual Mandate
                            </span>
                            <div className="text-5xl md:text-8xl font-serif italic mb-16 leading-tight tracking-tighter text-white">
                                &quot;We do not merely represent clients; we champion their global legacies and architect the future of justice with indomitable resilience.&quot;
                            </div>
                            <div className="h-px w-48 bg-white/20 mx-auto mb-12"></div>
                            <p className="font-serif text-3xl text-zinc-400">LACO | The Global Resilience Firm</p>
                            <div className="mt-16">
                                <Link href="/contact" className="inline-block px-16 py-6 border border-white/20 text-white uppercase tracking-[0.4em] text-xs font-black hover:bg-white hover:text-black transition-all">
                                    Request Firm Profile
                                </Link>
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        </main>
    );
}
