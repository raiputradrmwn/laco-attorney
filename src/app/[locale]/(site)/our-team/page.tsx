import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { Header } from "@/components/layout/Header";
import { AnimateIn } from "@/components/AnimateIn";
import { AnimateText } from "@/components/AnimateText";
import { prisma } from "@/lib/prisma";
import { Metadata } from "next";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export const metadata: Metadata = {
    title: "Our Team | LACO Attorneys",
    description: "Meet the elite legal minds of LACO Attorneys — founders, partners, and associates specializing in litigation, aviation law, capital markets, and international affairs across Indonesia.",
    keywords: ["pengacara Indonesia", "LACO attorney team", "lawyer Bali", "aviation lawyer Indonesia", "corporate attorney", "tim pengacara"],
    openGraph: {
        title: "Our Team | LACO Attorneys",
        description: "Meet the skilled attorneys of LACO — Indonesia's premier legal counsel across Denpasar, Jakarta, and Yogyakarta.",
        url: "https://lacolawyer.com/our-team",
        siteName: "LACO Attorneys",
        type: "website",
    },
    alternates: { canonical: "https://lacolawyer.com/our-team" },
};

const FALLBACK_TEAM_IMAGE =
    "https://images.unsplash.com/photo-1556157382-97eda2d62296?auto=format&fit=crop&q=80&w=800";

type TeamMember = Awaited<ReturnType<typeof prisma.team.findMany>>[number];

function getSafeTeamImageSrc(imageUrl?: string | null) {
    if (!imageUrl) return FALLBACK_TEAM_IMAGE;
    if (imageUrl.startsWith("/")) return imageUrl;

    try {
        const parsed = new URL(imageUrl);
        if (parsed.protocol === "https:" && parsed.hostname === "images.unsplash.com") {
            return imageUrl;
        }
    } catch {
        return FALLBACK_TEAM_IMAGE;
    }

    return FALLBACK_TEAM_IMAGE;
}

export default async function OurTeamPage() {
    let teamMembers: TeamMember[] = [];

    try {
        teamMembers = await prisma.team.findMany({
            orderBy: { createdAt: "asc" },
        });
    } catch (error) {
        console.error("Failed to fetch team members for /our-team", error);
    }

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
                        {teamMembers.map((member: TeamMember, index: number) => (
                            <AnimateIn key={member.id} from="bottom" delay={index * 0.15} duration={0.8} className="group border-l border-white/10 pl-6 md:pl-12 relative">
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 md:gap-12">
                                    <div className="aspect-[3/4] overflow-hidden bg-zinc-900 border border-white/10 grayscale group-hover:grayscale-0 transition-all duration-700 relative">
                                        <Image
                                            src={getSafeTeamImageSrc(member.imageUrl)}
                                            alt={member.name}
                                            fill
                                            className="object-cover transition-transform duration-1000 group-hover:scale-110 opacity-60 group-hover:opacity-100"
                                        />
                                    </div>
                                    <div className="flex flex-col justify-center text-center sm:text-left">
                                        <div className="mb-6 md:mb-8">
                                            <h3 className="text-xl md:text-2xl font-serif font-bold tracking-tight mb-1 md:mb-2 italic">{member.name}</h3>
                                            <p className="text-[9px] md:text-[10px] tracking-[0.2em] md:tracking-[0.3em] uppercase text-zinc-500 font-black">{member.role}</p>
                                        </div>
                                        <div
                                            className="text-zinc-400 font-light text-xs md:text-sm leading-relaxed mb-6 md:mb-8 border-l-0 sm:border-l border-white/20 sm:pl-6 italic prose prose-invert prose-sm max-w-none"
                                            dangerouslySetInnerHTML={{ __html: member.bio || "" }}
                                        />
                                        <div className="space-y-4">
                                            <div className="flex flex-col sm:flex-row items-center sm:items-start sm:space-x-2 space-y-1 sm:space-y-0">
                                                <span className="text-[9px] md:text-[10px] tracking-widest uppercase font-black text-white">Focus:</span>
                                                <span className="text-[9px] md:text-[10px] tracking-widest uppercase text-zinc-500">{member.specialization || "General Practice"}</span>
                                            </div>
                                            <div className="flex items-center justify-center sm:justify-start space-x-6 pt-4 border-t border-white/5">
                                                {member.linkedin ? (
                                                    <Link href={member.linkedin} target="_blank" rel="noopener noreferrer" className="flex items-center space-x-2 text-[9px] md:text-[10px] tracking-widest font-black uppercase text-zinc-400 hover:text-white transition-colors">
                                                        <span>LinkedIn</span>
                                                        <ArrowUpRight size={12} />
                                                    </Link>
                                                ) : null}
                                                {member.email ? (
                                                    <Link href={`mailto:${member.email}`} className="flex items-center space-x-2 text-[9px] md:text-[10px] tracking-widest font-black uppercase text-zinc-400 hover:text-white transition-colors">
                                                        <span>Email</span>
                                                        <ArrowUpRight size={12} />
                                                    </Link>
                                                ) : null}
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
