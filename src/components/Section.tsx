import { cn } from "@/lib/utils";
import React from "react";

interface SectionProps extends React.HTMLAttributes<HTMLElement> {
    fullWidth?: boolean;
    noPadding?: boolean;
}

export function Section({
    className,
    children,
    fullWidth = false,
    noPadding = false,
    ...props
}: SectionProps) {
    return (
        <section
            className={cn(
                "relative w-full",
                !noPadding && "py-20 md:py-32",
                className
            )}
            {...props}
        >
            <div
                className={cn(
                    "mx-auto w-full px-6 md:px-12",
                    !fullWidth && "max-w-[1400px]"
                )}
            >
                {children}
            </div>
        </section>
    );
}
