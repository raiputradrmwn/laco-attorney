"use client";

import React, { useRef, useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cn } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger);

interface AnimateTextProps {
    text: string;
    className?: string; // Text styling
    delay?: number;
}

export function AnimateText({ text, className, delay = 0 }: AnimateTextProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const words = text.split(" ");

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            const elements = containerRef.current?.querySelectorAll(".word");

            if (elements) {
                gsap.fromTo(
                    elements,
                    {
                        y: "100%",
                        opacity: 0,
                        rotationX: -90, // Slight 3D rotation for "premium" feel
                    },
                    {
                        y: "0%",
                        opacity: 1,
                        rotationX: 0,
                        duration: 1.2,
                        stagger: 0.05, // Stagger each word
                        ease: "power3.out",
                        delay: delay,
                        scrollTrigger: {
                            trigger: containerRef.current,
                            start: "top 80%", // Start when top of container hits 80% viewport height
                            toggleActions: "play none none reverse",
                        },
                    }
                );
            }
        }, containerRef);

        return () => ctx.revert();
    }, [delay, text]);

    return (
        <div
            ref={containerRef}
            className={cn("overflow-hidden leading-[1.1] flex flex-wrap gap-x-[0.25em]", className)}
            aria-label={text}
        >
            {words.map((word, i) => (
                <span key={i} className="inline-block overflow-hidden pb-2 -mb-2">
                    <span className="word inline-block origin-bottom transform-style-3d">
                        {word}
                    </span>
                </span>
            ))}
        </div>
    );
}
