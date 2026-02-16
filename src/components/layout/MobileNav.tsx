"use client";

import { Link } from "@/i18n/routing"; // Updated import
import { cn } from "@/lib/utils"; // Shadcn utility

interface MobileNavProps {
    isOpen: boolean;
    navLinks: { name: string; path: string }[];
    currentPath: string;
    onClose: () => void;
}

export function MobileNav({ isOpen, navLinks, currentPath, onClose }: MobileNavProps) {
    return (
        <div
            className={cn(
                "lg:hidden fixed inset-0 bg-black z-40 flex flex-col items-center justify-center transition-all duration-500 cubic-bezier(0.4, 0, 0.2, 1)",
                isOpen ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0"
            )}
        >
            <div className="flex flex-col space-y-8 md:space-y-10 text-center px-6 w-full">
                {navLinks.map((link) => (
                    <Link
                        key={link.name}
                        href={link.path}
                        className={cn(
                            "text-white text-4xl md:text-5xl font-serif italic tracking-tighter hover:text-zinc-400 transition-colors",
                            currentPath === link.path && "underline underline-offset-8"
                        )}
                        onClick={onClose}
                    >
                        {link.name}
                    </Link>
                ))}
                <div className="pt-8 flex flex-col items-center space-y-6">
                    <Link
                        href="/contact"
                        className="bg-white text-black px-12 py-5 text-xs tracking-[0.4em] uppercase font-black w-full max-w-xs hover:bg-zinc-200 transition-colors"
                        onClick={onClose}
                    >
                        Consult Now
                    </Link>
                    <div className="text-[10px] tracking-[0.5em] text-zinc-600 uppercase font-black">
                        Denpasar • Jakarta • Yogyakarta
                    </div>
                </div>
            </div>
        </div>
    );
}
