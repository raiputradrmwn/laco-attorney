"use client";

import { useRef, useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cn } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger);

interface AnimateInProps {
    children: React.ReactNode;
    className?: string;
    from?: "bottom" | "left" | "right" | "top";
    delay?: number;
    duration?: number;
    scale?: number; // Start scale (e.g. 0.9 for slight zoom in)
    threshold?: number; // Scroll trigger start (0-1)
    opacity?: number;
}

export function AnimateIn({
    children,
    className,
    from = "bottom",
    delay = 0,
    duration = 1.0,
    scale = 1,
    threshold = 0.8, // Default 80% viewport
    opacity = 0, // Default to 0 opacity start
}: AnimateInProps) {
    const elementRef = useRef<HTMLDivElement>(null);

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            const x = from === "left" ? -50 : from === "right" ? 50 : 0;
            const y = from === "top" ? -50 : from === "bottom" ? 50 : 0;

            if (elementRef.current) {
                gsap.fromTo(
                    elementRef.current,
                    {
                        x: x,
                        y: y,
                        opacity: opacity,
                        scale: scale,
                    },
                    {
                        x: 0,
                        y: 0,
                        opacity: 1,
                        scale: 1,
                        duration: duration,
                        delay: delay,
                        ease: "power3.out",
                        scrollTrigger: {
                            trigger: elementRef.current,
                            start: `top ${threshold * 100}%`,
                            toggleActions: "play none none reverse",
                        },
                    }
                );
            }
        }, elementRef);

        return () => ctx.revert();
    }, [delay, duration, from, scale, threshold]);

    return (
        <div ref={elementRef} className={cn(className)}>
            {children}
        </div>
    );
}
