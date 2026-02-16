"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { MobileNav } from "./MobileNav";

const NAV_LINKS = [
    { name: "Practice", path: "/practice" },
    { name: "Why Laco", path: "/why-laco" },
    { name: "Our Team", path: "/our-team" },
    { name: "Insight", path: "/insight" },
    { name: "Contact", path: "/contact" },
];

export function Header() {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const pathname = usePathname();

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
                        <div className="w-7 h-7 md:w-8 md:h-8 bg-white flex items-center justify-center group-hover:scale-110 transition-transform">
                            <span className="text-black font-serif font-black text-base md:text-lg">L</span>
                        </div>
                        <span className="text-lg md:text-xl font-serif font-bold tracking-[0.2em] md:tracking-[0.3em] uppercase text-white">
                            LACO{" "}
                            <span className="hidden sm:inline font-light text-[10px] align-middle ml-2 border-l border-white/20 pl-3 tracking-widest text-zinc-500">
                                Attorney at Law
                            </span>
                        </span>
                    </Link>

                    {/* Desktop Nav */}
                    <nav className="hidden lg:flex items-center space-x-10 xl:space-x-12">
                        {NAV_LINKS.map((link) => (
                            <Link
                                key={link.name}
                                href={link.path}
                                className={cn(
                                    "text-[10px] tracking-[0.3em] uppercase font-black transition-all hover:text-white",
                                    isActive(link.path)
                                        ? "text-white border-b border-white pb-1"
                                        : "text-zinc-500"
                                )}
                            >
                                {link.name}
                            </Link>
                        ))}
                        <Link
                            href="/contact"
                            className="bg-white text-black px-6 xl:px-8 py-3 text-[10px] tracking-[0.3em] uppercase font-black hover:bg-zinc-200 transition-all shadow-xl"
                        >
                            Consult Now
                        </Link>
                    </nav>

                    {/* Mobile Menu Button */}
                    <button
                        className="lg:hidden text-white relative z-[60] p-2"
                        onClick={() => setIsOpen(!isOpen)}
                        aria-label="Toggle Menu"
                    >
                        {isOpen ? <X size={28} /> : <Menu size={28} />}
                    </button>
                </div>
            </header>

            {/* Mobile Nav Overlay */}
            <MobileNav
                isOpen={isOpen}
                navLinks={NAV_LINKS}
                currentPath={pathname}
                onClose={() => setIsOpen(false)}
            />
        </>
    );
}
