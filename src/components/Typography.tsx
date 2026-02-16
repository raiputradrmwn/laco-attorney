import { cn } from "@/lib/utils";
import React from "react";

type TypographyVariant = "h1" | "h2" | "h3" | "h4" | "body" | "caption" | "small";

interface TypographyProps extends React.HTMLAttributes<HTMLElement> {
    variant?: TypographyVariant;
    component?: React.ElementType;
    serif?: boolean;
    italic?: boolean;
}

export function Typography({
    variant = "body",
    component,
    serif = false,
    italic = false,
    className,
    children,
    ...props
}: TypographyProps) {
    const Comp = component ||
        (variant === "h1" ? "h1" :
            variant === "h2" ? "h2" :
                variant === "h3" ? "h3" :
                    variant === "h4" ? "h4" :
                        "p");

    const styles = {
        h1: "text-5xl md:text-7xl lg:text-8xl font-normal leading-tight tracking-tight",
        h2: "text-4xl md:text-5xl lg:text-6xl font-normal leading-tight",
        h3: "text-2xl md:text-3xl lg:text-4xl font-normal",
        h4: "text-xl md:text-2xl font-medium",
        body: "text-base md:text-lg leading-relaxed tracking-wide text-muted-foreground",
        caption: "text-sm tracking-widest uppercase text-muted-foreground",
        small: "text-xs tracking-wider uppercase text-muted-foreground",
    };

    return (
        <Comp
            className={cn(
                styles[variant],
                serif && "font-serif",
                !serif && "font-sans",
                italic && "italic",
                className
            )}
            {...props}
        >
            {children}
        </Comp>
    );
}
