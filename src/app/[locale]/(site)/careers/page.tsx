import Image from 'next/image';
import { Star, Users, Zap, Award } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { Header } from '@/components/layout/Header';
import { CareersOpenings } from '@/components/careers/CareersOpenings';
import { Footer } from "@/components/layout/Footer";
export default function CareersPage() {
    const t = useTranslations('Careers');

    const features = [
        {
            icon: Star,
            title: t('features.intellectual.title'),
            desc: t('features.intellectual.desc')
        },
        {
            icon: Users,
            title: t('features.global.title'),
            desc: t('features.global.desc')
        },
        {
            icon: Zap,
            title: t('features.growth.title'),
            desc: t('features.growth.desc')
        },
        {
            icon: Award,
            title: t('features.resilience.title'),
            desc: t('features.resilience.desc')
        }
    ];

    return (
        <main className="bg-black text-white min-h-screen selection:bg-white selection:text-black">
            <Header />

            <div className="pt-40 md:pt-48 pb-20 md:pb-24 bg-black text-white">
                <div className="container mx-auto px-4 md:px-6">
                    <header className="mb-20 md:mb-32 text-center max-w-4xl mx-auto">
                        <span className="text-[10px] tracking-[0.5em] uppercase text-zinc-500 mb-6 block font-bold">{t('subtitle')}</span>
                        <h1 className="text-6xl md:text-9xl font-serif mb-8 italic tracking-tighter leading-none">{t('title')}</h1>
                        <p className="text-xl text-zinc-400 font-light leading-relaxed max-w-2xl mx-auto tracking-wide">
                            {t('description')}
                        </p>
                    </header>

                    <section className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center mb-40">
                        <div className="aspect-square bg-zinc-900 overflow-hidden relative grayscale border border-white/5">
                            <Image
                                src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=1200"
                                alt="Modern Office"
                                fill
                                className="object-cover opacity-60"
                            />
                        </div>
                        <div className="space-y-12">
                            <h2 className="text-4xl font-serif italic border-b border-white/10 pb-6">{t('whyJoin')}</h2>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                                {features.map((feature, idx) => {
                                    const Icon = feature.icon;
                                    return (
                                        <div key={idx} className="space-y-4">
                                            <Icon className="w-6 h-6 text-white" />
                                            <h4 className="text-lg font-serif italic">{feature.title}</h4>
                                            <p className="text-sm text-zinc-500 leading-relaxed">{feature.desc}</p>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </section>

                    <CareersOpenings />
                </div>
            </div>
            <Footer />
        </main>
    );
}
