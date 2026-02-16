"use client";

import { Link } from "@/i18n/routing";
import { Section } from "@/components/Section";
import { Typography } from "@/components/Typography";
import { LacoImage } from "@/components/LacoImage";
import { NEWS_ITEMS } from "@/lib/mock-data";
import { ArrowRight } from "lucide-react";
import { AnimateIn } from "@/components/AnimateIn";
import { AnimateText } from "@/components/AnimateText";
import { useTranslations } from "next-intl";

export function News() {
    const t = useTranslations('News');

    return (
        <Section id="insight" className="bg-zinc-50 text-black py-24 md:py-32" fullWidth>
            <div className="container mx-auto px-6 md:px-12">
                <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
                    <div>
                        <AnimateIn from="bottom">
                            <Typography variant="caption" className="tracking-[0.3em] text-neutral-500 font-bold block mb-4">
                                {t('label')}
                            </Typography>
                        </AnimateIn>
                        <Typography variant="h2" className="text-4xl md:text-6xl font-serif">
                            <AnimateText text={t('title_prefix')} className="text-black" />
                            <span className="italic text-neutral-500 block">
                                <AnimateText text={t('title_suffix')} delay={0.3} />
                            </span>
                        </Typography>
                    </div>
                    <AnimateIn from="right" delay={0.5}>
                        <Link href="/insight" className="group flex items-center gap-2 border-b border-black pb-1 hover:text-neutral-600 transition-colors">
                            <Typography variant="caption" className="text-black font-bold tracking-widest group-hover:text-neutral-600">
                                {t('view_all')}
                            </Typography>
                            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-2" />
                        </Link>
                    </AnimateIn>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {NEWS_ITEMS.map((news, index) => (
                        <AnimateIn key={news.id} from="bottom" delay={index * 0.15} duration={0.8}>
                            <Link href={`/insight/${news.slug}`} className="group block">
                                <div className="relative aspect-[16/10] overflow-hidden mb-6 bg-neutral-200">
                                    <div className="absolute top-4 left-4 z-10 bg-white px-3 py-1">
                                        <Typography variant="caption" className="text-black font-bold text-xs tracking-wider">
                                            {t(news.category)}
                                        </Typography>
                                    </div>
                                    <LacoImage
                                        path={news.imageUrl}
                                        alt={news.title}
                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                    />
                                </div>
                                <Typography variant="h3" className="font-serif text-2xl md:text-3xl mb-3 group-hover:underline decoration-1 underline-offset-4 decoration-neutral-300">
                                    {t(news.title)}
                                </Typography>
                            </Link>
                        </AnimateIn>
                    ))}
                </div>
            </div>
        </Section>
    );
}
