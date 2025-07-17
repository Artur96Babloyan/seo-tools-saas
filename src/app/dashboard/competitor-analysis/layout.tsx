import { Metadata } from 'next';
import { generateMetadata } from '@/lib/seo';

export const metadata: Metadata = generateMetadata({
  title: "Competitor Analysis Tool - AuditCraft",
  description: "Analyze your competitors' SEO strategies, backlinks, content performance, and keyword rankings. Get actionable insights to outperform your competition.",
  keywords: [
    "competitor analysis", "seo competitor analysis", "competitor research",
    "backlink analysis", "competitor tracking", "seo competitive analysis", "auditcraft", "audit craft"
  ],
  canonical: "/dashboard/competitor-analysis",
});

export default function CompetitorAnalysisLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
} 