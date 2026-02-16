"use client";

import React, { useState, useRef, useEffect } from 'react';
import { MapPin, Phone, Mail, Clock, Send, ChevronRight, ChevronDown } from 'lucide-react';
import { AnimateIn } from '@/components/AnimateIn';
import { AnimateText } from '@/components/AnimateText';
import { cn } from '@/lib/utils';
import { useTranslations } from 'next-intl';

export function Contact() {
    const t = useTranslations('Contact');
    const [isOpen, setIsOpen] = useState(false);
    const [selectedPractice, setSelectedPractice] = useState("");
    const dropdownRef = useRef<HTMLDivElement>(null);

    const practiceOptions = [
        "Corporate Strategy",
        "Litigation & Disputes",
        "Private Wealth Management",
        "Intellectual Property",
        "Aviation Crisis",
        "Other Inquiry"
    ];

    const toggleDropdown = () => setIsOpen(!isOpen);

    const handleSelect = (option: string) => {
        setSelectedPractice(option);
        setIsOpen(false);
    };

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <div id="contact" className="pt-24 md:pt-40 pb-20 md:pb-24 bg-black text-white">
            <div className="container mx-auto px-4 md:px-6">
                <header className="mb-16 md:mb-24 text-center max-w-4xl mx-auto">
                    <AnimateIn from="top">
                        <span className="text-[10px] tracking-[0.4em] md:tracking-[0.5em] uppercase text-zinc-500 mb-4 md:mb-6 block font-bold">{t('secure')}</span>
                    </AnimateIn>
                    <div className="text-4xl sm:text-6xl md:text-8xl font-serif mb-6 md:mb-8 italic tracking-tighter leading-tight text-balance">
                        <AnimateText text={t('title')} />
                    </div>
                    <AnimateIn from="bottom" delay={0.4}>
                        <p className="text-base md:text-lg text-zinc-400 font-light leading-relaxed tracking-wide text-balance">
                            {t('desc')}
                        </p>
                    </AnimateIn>
                </header>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 md:gap-24">
                    {/* Contact Details */}
                    <AnimateIn from="left" delay={0.6} className="space-y-12 md:space-y-16">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-10 md:gap-16 border-l border-white/10 pl-6 md:pl-12">
                            <div>
                                <h3 className="text-[9px] md:text-[10px] uppercase tracking-[0.4em] font-black mb-6 md:mb-8 text-zinc-500">{t('chancery')}</h3>
                                <div className="flex items-start space-x-4 group cursor-pointer">
                                    <MapPin className="w-5 h-5 shrink-0 text-white mt-1 group-hover:text-zinc-400 transition-colors" />
                                    <p className="text-lg md:text-xl font-serif italic text-white group-hover:text-zinc-300 transition-colors">08 Bajataki, West Denpasar,<br />Denpasar Bali, Indonesia</p>
                                </div>
                            </div>
                            <div>
                                <h3 className="text-[9px] md:text-[10px] uppercase tracking-[0.4em] font-black mb-6 md:mb-8 text-zinc-500">{t('office_hours')}</h3>
                                <div className="flex items-start space-x-4">
                                    <Clock className="w-5 h-5 shrink-0 text-white mt-1" />
                                    <p className="text-lg md:text-xl font-serif italic text-white">Mon — Fri / 09:00 — 17:00<br /><span className="text-[10px] font-sans not-italic font-black tracking-widest text-zinc-600 uppercase">GMT +8</span></p>
                                </div>
                            </div>
                            <div>
                                <h3 className="text-[9px] md:text-[10px] uppercase tracking-[0.4em] font-black mb-6 md:mb-8 text-zinc-500">{t('secure_line')}</h3>
                                <div className="flex items-start space-x-4">
                                    <Phone className="w-5 h-5 shrink-0 text-white mt-1" />
                                    <p className="text-lg md:text-xl font-serif italic text-white tracking-widest">+628554254445</p>
                                </div>
                            </div>
                            <div>
                                <h3 className="text-[9px] md:text-[10px] uppercase tracking-[0.4em] font-black mb-6 md:mb-8 text-zinc-500">{t('email')}</h3>
                                <div className="flex items-start space-x-4">
                                    <Mail className="w-5 h-5 shrink-0 text-white mt-1" />
                                    <p className="text-lg md:text-xl font-serif italic text-white break-all">hello@lacolawyer.com</p>
                                </div>
                            </div>
                        </div>

                        {/* Map Area */}
                        <div className="aspect-video bg-zinc-950 grayscale flex items-center justify-center relative group overflow-hidden border border-white/5">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                                src="https://images.unsplash.com/photo-1516738901171-8eb4fc13bd20?auto=format&fit=crop&q=80&w=1200"
                                alt="Bali Aerial"
                                className="w-full h-full object-cover opacity-20 transition-all duration-1000 group-hover:scale-110 group-hover:opacity-40"
                            />
                            <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/40">
                                <div className="h-12 md:h-20 w-px bg-white/20 mb-4 md:mb-6 group-hover:h-32 transition-all"></div>
                                <span className="text-[9px] md:text-[10px] tracking-[0.4em] md:tracking-[0.5em] font-black uppercase text-white mb-2">Denpasar HQ</span>
                                <div className="flex items-center text-zinc-500 group-hover:text-white transition-colors text-[10px] md:text-xs space-x-2">
                                    <span>View Map</span>
                                    <ChevronRight size={14} />
                                </div>
                            </div>
                        </div>
                    </AnimateIn>

                    {/* Form */}
                    <AnimateIn from="right" delay={0.8} className="bg-zinc-950 border border-white/5 p-8 md:p-12 lg:p-16 shadow-2xl relative">
                        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
                        <form className="space-y-10 md:space-y-12" onSubmit={(e) => e.preventDefault()}>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-12">
                                <div className="space-y-4">
                                    <label className="text-[9px] md:text-[10px] uppercase tracking-[0.2em] md:tracking-[0.3em] font-black text-zinc-500">{t('form.identity')}</label>
                                    <input
                                        type="text"
                                        placeholder={t('form.name_placeholder')}
                                        className="w-full bg-transparent border-b border-white/10 px-0 py-3 md:py-4 focus:outline-none focus:border-white transition-all text-xs md:text-sm tracking-widest placeholder:text-zinc-800"
                                    />
                                </div>
                                <div className="space-y-4">
                                    <label className="text-[9px] md:text-[10px] uppercase tracking-[0.2em] md:tracking-[0.3em] font-black text-zinc-500">{t('form.contact_point')}</label>
                                    <input
                                        type="email"
                                        placeholder={t('form.email_placeholder')}
                                        className="w-full bg-transparent border-b border-white/10 px-0 py-3 md:py-4 focus:outline-none focus:border-white transition-all text-xs md:text-sm tracking-widest placeholder:text-zinc-800"
                                    />
                                </div>
                            </div>

                            <div className="space-y-4" ref={dropdownRef}>
                                <label className="text-[9px] md:text-[10px] uppercase tracking-[0.2em] md:tracking-[0.3em] font-black text-zinc-500">{t('form.legal_class')}</label>
                                <div className="relative">
                                    <div
                                        onClick={toggleDropdown}
                                        className={cn(
                                            "w-full bg-transparent border-b border-white/10 px-0 py-3 md:py-4 cursor-pointer flex justify-between items-center transition-all group",
                                            isOpen ? "border-white" : "hover:border-white/50"
                                        )}
                                    >
                                        <span className={cn(
                                            "text-xs md:text-sm tracking-widest uppercase transition-colors",
                                            selectedPractice ? "text-white" : "text-zinc-800"
                                        )}
                                        >
                                            {selectedPractice || t('form.select_practice')}
                                        </span>
                                        <ChevronDown className={cn("w-4 h-4 text-zinc-500 transition-transform duration-300", isOpen ? "rotate-180 text-white" : "group-hover:text-white")} />
                                    </div>

                                    <div className={cn(
                                        "absolute top-full left-0 w-full bg-zinc-900 border border-white/10 z-50 overflow-hidden transition-all duration-300 ease-in-out shadow-2xl",
                                        isOpen ? "max-h-64 opacity-100 mt-2" : "max-h-0 opacity-0 mt-0"
                                    )}>
                                        {practiceOptions.map((option, index) => (
                                            <div
                                                key={index}
                                                onClick={() => handleSelect(option)}
                                                className="px-6 py-4 text-xs md:text-sm tracking-widest uppercase text-zinc-400 hover:bg-white hover:text-black cursor-pointer transition-colors border-b border-white/5 last:border-0"
                                            >
                                                {option}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-4">
                                <label className="text-[9px] md:text-[10px] uppercase tracking-[0.2em] md:tracking-[0.3em] font-black text-zinc-500">{t('form.brief')}</label>
                                <textarea
                                    rows={4}
                                    placeholder={t('form.brief_placeholder')}
                                    className="w-full bg-transparent border-b border-white/10 px-0 py-3 md:py-4 focus:outline-none focus:border-white transition-all text-xs md:text-sm tracking-widest placeholder:text-zinc-800 resize-none"
                                ></textarea>
                            </div>
                            <button
                                type="submit"
                                className="w-full py-5 md:py-6 bg-white text-black uppercase tracking-[0.3em] md:tracking-[0.4em] font-black text-[10px] md:text-xs flex items-center justify-center space-x-4 hover:bg-zinc-200 transition-all group"
                            >
                                <span>{t('form.submit')}</span>
                                <Send size={14} className="group-hover:translate-x-2 group-hover:-translate-y-2 transition-transform" />
                            </button>
                        </form>
                    </AnimateIn>
                </div>
            </div>
        </div>
    );
}
