"use client";

import { Section } from "@/components/Section";
import { Typography } from "@/components/Typography";
import { LacoImage } from "@/components/LacoImage";
import { TEAM_MEMBERS } from "@/lib/mock-data";
import { Link } from "@/i18n/routing";
import { ArrowRight } from "lucide-react";
import { AnimateIn } from "@/components/AnimateIn";
import { AnimateText } from "@/components/AnimateText";
import { useTranslations } from "next-intl";

export function Team() {
    const t = useTranslations('Team');

    return (
        <Section id="team" className="bg-white text-black py-24 md:py-40" fullWidth>
            <div className="container mx-auto px-6 md:px-12">
                {/* Header */}
                <div className="mb-20 space-y-4">
                    <AnimateIn from="left">
                        <Typography variant="caption" className="tracking-[0.3em] text-neutral-500 font-bold block">
                            {t('label')}
                        </Typography>
                    </AnimateIn>
                    <div className="flex flex-col md:flex-row justify-between items-end gap-6">
                        <div className="text-5xl md:text-7xl font-serif italic">
                            <AnimateText text={t('title')} className="text-black" />
                        </div>
                        <AnimateIn from="right" delay={0.3}>
                            <Link href="/our-team" className="group flex items-center gap-2 border-b border-black pb-1 hover:text-neutral-600 transition-colors">
                                <Typography variant="caption" className="text-black font-bold tracking-widest group-hover:text-neutral-600">
                                    {t('view_all')}
                                </Typography>
                                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-2" />
                            </Link>
                        </AnimateIn>
                    </div>
                </div>

                {/* Team Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-16">
                    {TEAM_MEMBERS.map((member, index) => (
                        <AnimateIn key={member.id} from="bottom" delay={index * 0.15} duration={0.8} className="group cursor-pointer">
                            {/* Image Container */}
                            <div className="relative aspect-[3/4] overflow-hidden mb-6 bg-neutral-100">
                                <LacoImage
                                    path={member.imageUrl}
                                    alt={member.name}
                                    className="w-full h-full object-cover transition-all duration-700 ease-out grayscale group-hover:grayscale-0 group-hover:scale-105"
                                />
                            </div>

                            {/* Info */}
                            <div className="space-y-2">
                                <Typography variant="h4" className="font-serif text-2xl group-hover:text-neutral-700 transition-colors">
                                    {member.name}
                                </Typography>
                                <Typography variant="caption" className="block text-neutral-400 font-bold tracking-widest">
                                    {t(member.role)}
                                </Typography>
                                <Typography variant="body" className="text-sm text-neutral-500 mt-4 line-clamp-2">
                                    {t(member.bio)}
                                </Typography>
                            </div>
                        </AnimateIn>
                    ))}
                </div>
            </div>
        </Section>
    );
}
