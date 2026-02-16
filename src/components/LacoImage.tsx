"use client";

import Image, { ImageProps } from "next/image";
import { cn } from "@/lib/utils";

interface LacoImageProps extends Omit<ImageProps, "loader" | "src"> {
    path: string; // ImageKit path (e.g., "/team/john.jpg")
    alt: string;
}

const imageKitLoader = ({ src, width, quality }: { src: string; width: number; quality?: number }) => {
    if (src.startsWith("http")) return src;
    const urlEndpoint = process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT;
    if (!urlEndpoint) return src;

    // Clean up slashes
    const cleanEndpoint = urlEndpoint.replace(/\/$/, "");
    const cleanSrc = src.replace(/^\//, "");

    const params = [`w-${width}`];
    if (quality) {
        params.push(`q-${quality}`);
    }

    const paramsString = params.join(",");
    return `${cleanEndpoint}/${cleanSrc}?tr=${paramsString}`;
};

export function LacoImage({ path, alt, className, ...props }: LacoImageProps) {
    return (
        <div className={cn("overflow-hidden block relative", className)}>
            <Image
                loader={imageKitLoader}
                src={path}
                alt={alt}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="transition-all duration-700 ease-out grayscale hover:grayscale-0 object-cover"
                {...props}
            />
        </div>
    );
}
