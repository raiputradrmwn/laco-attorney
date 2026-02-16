import { InsightDetail } from "@/components/insight/InsightDetail";

interface PageProps {
    params: Promise<{
        slug: string;
        locale: string;
    }>;
}

export default async function InsightDetailPage({ params }: PageProps) {
    const { slug } = await params;
    return <InsightDetail slug={slug} />;
}
