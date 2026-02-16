import { Section } from "@/components/Section";
import { Typography } from "@/components/Typography";
import { PRACTICE_AREAS } from "@/lib/mock-data";
import { Building2, Landmark, Scale, ShieldCheck, Handshake, LucideIcon } from "lucide-react";

// Map string icon names to components
const iconMap: Record<string, LucideIcon> = {
    Building2,
    Landmark,
    Scale,
    ShieldCheck,
    Handshake,
};

export function PracticeAreas() {
    return (
        <Section id="practice" className="bg-black text-white border-t border-neutral-900" fullWidth>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 divide-y lg:divide-y-0 lg:divide-x divide-neutral-800 border-b border-neutral-800">
                {PRACTICE_AREAS.map((area) => {
                    const Icon = iconMap[area.icon];
                    return (
                        <div
                            key={area.id}
                            className="group relative p-8 h-[400px] flex flex-col justify-between hover:bg-neutral-900/50 transition-colors duration-500"
                        >
                            {/* Top: Icon */}
                            <div className="mb-6">
                                {Icon && <Icon className="w-8 h-8 text-neutral-400 group-hover:text-white transition-colors" opacity={0.8} />}
                            </div>

                            {/* Middle: Content */}
                            <div className="relative z-10">
                                <Typography variant="caption" className="mb-4 block text-neutral-500 group-hover:text-white transition-colors">
                                    {area.id}
                                </Typography>
                                <Typography variant="h4" className="mb-4 tracking-wider">
                                    {area.title}
                                </Typography>
                                <Typography variant="body" className="text-sm text-neutral-500 group-hover:text-neutral-300 transition-colors">
                                    {area.description}
                                </Typography>
                            </div>

                            {/* Background Number (Watermark style) */}
                            <div className="absolute top-4 right-4 text-8xl font-serif italic text-neutral-900 opacity-20 group-hover:opacity-40 transition-opacity select-none pointer-events-none">
                                {area.id}
                            </div>

                            {/* Bottom decorative line */}
                            <div className="absolute bottom-0 left-0 w-full h-[1px] bg-white transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
                        </div>
                    );
                })}
            </div>
        </Section>
    );
}
