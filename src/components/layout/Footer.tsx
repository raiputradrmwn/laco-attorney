"use client";

import React from 'react';
import { Link } from '@/i18n/routing';
import { MapPin, Phone, Mail, Instagram, Linkedin, Twitter } from 'lucide-react';
import { AnimateIn } from '@/components/AnimateIn';
import { useTranslations } from 'next-intl';

export function Footer() {
    const t = useTranslations('Footer');
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-black text-white pt-16 md:pt-20 pb-8 md:pb-10 border-t border-white/10">
            <div className="container mx-auto px-4 md:px-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 md:gap-12 mb-12 md:mb-16 border-b border-white/10 pb-12 md:pb-16">

                    <div className="space-y-6 text-center sm:text-left">
                        <AnimateIn from="bottom">
                            <h3 className="text-xl md:text-2xl font-serif font-bold tracking-[0.3em] md:tracking-widest uppercase">LACO</h3>
                        </AnimateIn>
                        <AnimateIn from="bottom" delay={0.1}>
                            <p className="text-gray-400 max-w-xs mx-auto sm:mx-0 leading-relaxed font-light text-sm">
                                {t('about_us')}
                            </p>
                        </AnimateIn>
                        <AnimateIn from="bottom" delay={0.2} className="flex justify-center sm:justify-start space-x-4">
                            <Instagram className="w-5 h-5 cursor-pointer hover:text-gray-400 transition-colors" />
                            <Linkedin className="w-5 h-5 cursor-pointer hover:text-gray-400 transition-colors" />
                            <Twitter className="w-5 h-5 cursor-pointer hover:text-gray-400 transition-colors" />
                        </AnimateIn>
                    </div>

                    <div className="space-y-6 text-center sm:text-left">
                        <AnimateIn from="bottom" delay={0.2}>
                            <h4 className="text-[10px] md:text-sm tracking-widest uppercase font-bold text-white mb-4">{t('contact_info')}</h4>
                            <ul className="space-y-4 text-gray-400 font-light text-sm">
                                <li className="flex flex-col sm:flex-row items-center sm:items-start sm:space-x-3 space-y-2 sm:space-y-0">
                                    <a
                                        href="https://maps.google.com/?q=Jl.+Bajataki+No.8,+Denpasar+Barat,+Denpasar,+Bali"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex flex-col sm:flex-row items-center sm:items-start sm:space-x-3 space-y-2 sm:space-y-0 hover:text-white transition-colors"
                                    >
                                        <MapPin className="w-4 h-4 text-white shrink-0 sm:mt-1" />
                                        <span>08 Bajataki, West Denpasar, Denpasar Bali</span>
                                    </a>
                                </li>
                                <li className="flex flex-col sm:flex-row items-center sm:items-start sm:space-x-3 space-y-2 sm:space-y-0">
                                    <a href="tel:+628554254445" className="flex flex-col sm:flex-row items-center sm:items-start sm:space-x-3 space-y-2 sm:space-y-0 hover:text-white transition-colors">
                                        <Phone className="w-4 h-4 text-white shrink-0 sm:mt-1" />
                                        <span>+628554254445</span>
                                    </a>
                                </li>
                                <li className="flex flex-col sm:flex-row items-center sm:items-start sm:space-x-3 space-y-2 sm:space-y-0">
                                    <a href="mailto:hello@lacolawyer.com" className="flex flex-col sm:flex-row items-center sm:items-start sm:space-x-3 space-y-2 sm:space-y-0 hover:text-white transition-colors break-all">
                                        <Mail className="w-4 h-4 text-white shrink-0 sm:mt-1" />
                                        <span>hello@lacolawyer.com</span>
                                    </a>
                                </li>
                            </ul>
                        </AnimateIn>
                    </div>

                    <div className="space-y-6 text-center sm:text-left sm:col-span-2 lg:col-span-1">
                        <AnimateIn from="bottom" delay={0.3}>
                            <h4 className="text-[10px] md:text-sm tracking-widest uppercase font-bold text-white mb-4">{t('quick_nav')}</h4>
                            <div className="grid grid-cols-2 gap-4 text-gray-400 font-light text-sm max-w-sm mx-auto sm:mx-0">
                                <Link href="/practice" className="hover:text-white transition-colors">{t('practices')}</Link>
                                <Link href="/why-laco" className="hover:text-white transition-colors">{t('firm_ethos')}</Link>
                                <Link href="/our-team" className="hover:text-white transition-colors">{t('counsel')}</Link>
                                <Link href="/insight" className="hover:text-white transition-colors">{t('insights')}</Link>
                                <Link href="/careers" className="hover:text-white transition-colors">{t('careers')}</Link>
                                <Link href="/contact" className="hover:text-white transition-colors">{t('engagement')}</Link>
                                <Link href="#" className="hover:text-white transition-colors">{t('legal_terms')}</Link>
                            </div>
                        </AnimateIn>
                    </div>
                </div>

                <AnimateIn from="bottom" delay={0.4} className="text-center text-gray-500 text-[9px] md:text-[10px] tracking-[0.4em] md:tracking-widest uppercase font-black">
                    &copy; {currentYear} LACO | Attorney at Law • The Resilience Firm
                </AnimateIn>
            </div>
        </footer>
    );
}
