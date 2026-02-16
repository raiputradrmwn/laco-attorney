import { notFound } from "next/navigation";
import { Header } from "@/components/layout/Header";
import { Typography } from "@/components/Typography";
import { LacoImage } from "@/components/LacoImage";
import { INFO_NEWS } from "@/lib/mock-data";

// Mock data extension for full content - ideally this would be a DB fetch
const NEWS_CONTENT = {
    "global-taxation-2025": {
        ...INFO_NEWS[0],
        fullContent: "The global taxation landscape is undergoing a seismic shift. As the OECD moves forward with Pillar Two implementation, multinational enterprises must prepare for a minimum 15% corporate tax rate. At LACO, we are already restructuring client holdings to ensure compliance while maintaining fiscal efficiency..."
    },
    "laco-top-tier-recognition": {
        ...INFO_NEWS[1],
        fullContent: "We are honored to be recognized as a Top Tier firm. This accolade is not a destination but a benchmark. Our litigation team has successfully navigated over $500M in dispute resolutions this fiscal year alone..."
    },
    "cross-border-mergers": {
        ...INFO_NEWS[2],
        fullContent: "In a volatile market, hesitation is the enemy of value. Our M&A practice has observed a 40% increase in cross-border activity, driven by strategic consolidation in the tech and energy sectors..."
    }
};

export default function ArticlePage({ params }: { params: { slug: string } }) {
    const article = NEWS_CONTENT[params.slug as keyof typeof NEWS_CONTENT];

    if (!article) return notFound();

    return (
        <main className="bg-white text-black min-h-screen selection:bg-black selection:text-white">
            <Header />
            {/* Note: Header on this page might need black text variant or background, but sticking to global for now */}

            <div className="pt-32 pb-20">
                <div className="container mx-auto px-6 md:px-12 max-w-4xl">
                    <div className="mb-10 text-center">
                        <Typography variant="caption" className="tracking-[0.3em] text-neutral-500 font-bold block mb-4">
                            {article.category}
                        </Typography>
                        <Typography variant="h1" className="text-4xl md:text-6xl font-serif leading-tight">
                            {article.title}
                        </Typography>
                    </div>

                    <div className="relative aspect-[16/9] mb-16 overflow-hidden bg-neutral-100">
                        <LacoImage path={article.imageUrl} alt={article.title} className="grayscale-0" />
                    </div>

                    <div className="prose prose-lg max-w-none prose-headings:font-serif prose-headings:font-normal prose-p:text-neutral-600 prose-p:leading-relaxed">
                        <p className="first-letter:text-5xl first-letter:font-serif first-letter:mr-3 first-letter:float-left">
                            {article.fullContent}
                        </p>
                        <p>
                            [Extended content placeholder: Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.]
                        </p>
                    </div>
                </div>
            </div>
        </main>
    );
}
