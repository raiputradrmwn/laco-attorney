"use client";

import React, { useState, useEffect } from "react";
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
        { name: t('practice'), path: "/practice" },
        { name: t('why_laco'), path: "/why-laco" },
        { name: t('team'), path: "/our-team" },
        { name: t('news'), path: "/insight" },
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
                    <Link href="/" className="flex items-center space-x-2 md:space-x-3 group relative z-[60]">
                        <div className={cn(
                            "w-7 h-7 md:w-8 md:h-8 flex items-center justify-center group-hover:scale-110 transition-transform",
                            isInverted ? "bg-black" : "bg-white"
                        )}>
                            <span className={cn(
                                "font-serif font-black text-base md:text-lg",
                                isInverted ? "text-white" : "text-black"
                            )}>L</span>
                        </div>
                        <span className={cn(
                            "text-lg md:text-xl font-serif font-bold tracking-[0.2em] md:tracking-[0.3em] uppercase transition-colors",
                            isInverted ? "text-black" : "text-white"
                        )}>
                            LACO{" "}
                            <span className={cn(
                                "hidden sm:inline font-light text-[10px] align-middle ml-2 border-l pl-3 tracking-widest",
                                isInverted ? "border-black/20 text-zinc-500" : "border-white/20 text-zinc-500"
                            )}>
                                Attorney at Law
                            </span>
                        </span>
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
