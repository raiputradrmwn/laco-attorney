"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Link } from "@/i18n/routing";
import { usePathname } from "@/i18n/routing";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { MobileNav } from "./MobileNav";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { useTranslations } from "next-intl";

interface HeaderProps {
    variant?: "default" | "inverted";
}

export function Header({ variant = "default" }: HeaderProps) {
    const t = useTranslations('Navigation');
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const pathname = usePathname();

    const navLinks = [
        { name: t('practice'), path: "/practice-area" },
        { name: t('why_laco'), path: "/about-us" },
        { name: t('team'), path: "/our-team" },
        { name: t('news'), path: "/insight" },
        { name: t('careers'), path: "/careers" },
        { name: t('contact'), path: "/contact" },
    ];

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // Prevent scrolling when mobile menu is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "unset";
        }
    }, [isOpen]);

    const isActive = (path: string) => pathname === path;

    // Determine text color based on variant and scroll state
    // If scrolled, always white text (black bg).
    // If not scrolled: default -> white, inverted -> black.
    const isInverted = variant === "inverted" && !scrolled;

    return (
        <>
            <header
                className={cn(
                    "fixed w-full z-50 transition-all duration-500",
                    scrolled
                        ? "bg-black/95 backdrop-blur-xl border-b border-white/5 py-3 md:py-4"
                        : "bg-transparent py-6 md:py-8"
                )}
            >
                <div className="container mx-auto px-4 md:px-6 flex justify-between items-center">
                    <Link href="/" className="flex items-center group relative z-[60]">
                        <Image
                            src="/2.png"
                            alt="LACO Attorneys Logo"
                            width={120}
                            height={40}
                            className="h-8 md:h-10 w-auto object-contain group-hover:opacity-80 transition-opacity"
                            priority
                        />
                    </Link>

                    {/* Desktop Nav */}
                    <nav className="hidden lg:flex items-center space-x-8 xl:space-x-10">
                        {navLinks.map((link) => (
                            <Link
                                key={link.path}
                                href={link.path}
                                className={cn(
                                    "text-[10px] tracking-[0.3em] uppercase font-black transition-all hover:text-zinc-500",
                                    isActive(link.path)
                                        ? isInverted ? "text-black border-b border-black pb-1" : "text-white border-b border-white pb-1"
                                        : isInverted ? "text-zinc-500 hover:text-black" : "text-zinc-500 hover:text-white"
                                )}
                            >
                                {link.name}
                            </Link>
                        ))}

                        <div className="flex items-center gap-4">
                            <LanguageSwitcher />
                            <Link
                                href="/contact"
                                className={cn(
                                    "px-6 xl:px-8 py-3 text-[10px] tracking-[0.3em] uppercase font-black hover:bg-zinc-200 transition-all shadow-xl",
                                    isInverted ? "bg-black text-white hover:bg-zinc-800" : "bg-white text-black"
                                )}
                            >
                                Consult Now
                            </Link>
                        </div>
                    </nav>

                    {/* Mobile Menu Button */}
                    <div className="flex items-center gap-4 lg:hidden relative z-[60]">
                        <LanguageSwitcher />
                        <button
                            className={cn(
                                "p-2 transition-colors",
                                isInverted ? "text-black" : "text-white",
                                // If menu is open, force white because overlay is black
                                isOpen && "text-white"
                            )}
                            onClick={() => setIsOpen(!isOpen)}
                            aria-label="Toggle Menu"
                        >
                            {isOpen ? <X size={28} /> : <Menu size={28} />}
                        </button>
                    </div>
                </div>
            </header>

            {/* Mobile Nav Overlay */}
            <MobileNav
                isOpen={isOpen}
                navLinks={navLinks}
                currentPath={pathname}
                onClose={() => setIsOpen(false)}
            />
        </>
    );
}
