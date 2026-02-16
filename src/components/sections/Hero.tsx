import { AnimateText } from "@/components/AnimateText";
import { Section } from "@/components/Section";
import { Typography } from "@/components/Typography";
import { LacoImage } from "@/components/LacoImage"; // Will use for background eventually if dynamic

export function Hero() {
    return (
        <Section className="min-h-screen flex flex-col justify-center pt-32 pb-20 relative overflow-hidden" fullWidth>
            {/* Background Image Placeholder - would be LacoImage in real app if dynamic, or CSS bg */}
            <div className="absolute inset-0 z-0 opacity-20 pointer-events-none">
                {/* Mock background pattern or image */}
                <div className="w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-neutral-800 to-black" />
            </div>

            <div className="relative z-10 max-w-[1400px] mx-auto w-full px-6 md:px-12 flex flex-col items-center text-center">
                {/* SUBHEAD */}
                <Typography variant="caption" className="mb-8 tracking-[0.3em] text-neutral-400">
                    Superior Advocacy & Fiduciary Excellence
                </Typography>

                {/* HEADLINE */}
                <div className="max-w-5xl mx-auto mb-12">
                    <Typography variant="h1" serif italic className="text-6xl md:text-8xl lg:text-9xl mb-4 text-white">
                        <AnimateText text="Upholding the" />
                    </Typography>
                    <Typography variant="h1" serif italic className="text-6xl md:text-8xl lg:text-9xl mb-4 text-white">
                        <AnimateText text="Absolute Legacy of" delay={0.5} />
                    </Typography>
                    <Typography variant="h1" serif italic className="text-6xl md:text-8xl lg:text-9xl text-white">
                        <AnimateText text="Law." delay={1.0} />
                    </Typography>
                </div>

                {/* DESCRIPTION */}
                <div className="max-w-2xl mx-auto mb-16">
                    <Typography variant="body" className="text-neutral-400">
                        At LACO, we transcend traditional legal representation. We are the architects of structural security, specializing in high-order corporate frameworks, complex multi-jurisdictional litigation, and discrete private wealth management.
                    </Typography>
                </div>

                {/* CTAs */}
                <div className="flex flex-col sm:flex-row gap-6">
                    <button className="px-8 py-4 bg-white text-black border border-white hover:bg-black hover:text-white transition-all duration-300">
                        <Typography variant="caption" className="font-bold tracking-widest text-current">
                            INITIALIZE CONSULTATION
                        </Typography>
                    </button>
                    <button className="px-8 py-4 bg-transparent text-white border border-neutral-700 hover:border-white transition-all duration-300">
                        <Typography variant="caption" className="font-bold tracking-widest text-current">
                            EXPLORE OUR EXPERTISE
                        </Typography>
                    </button>
                </div>
            </div>
        </Section>
    );
}
