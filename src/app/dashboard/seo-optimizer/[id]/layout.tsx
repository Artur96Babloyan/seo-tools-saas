import { Metadata } from 'next';
import { generateMetadata } from '@/lib/seo';

export const metadata: Metadata = generateMetadata({
  title: "Content Optimization Results - AuditCraft",
  description: "View detailed content optimization results and recommendations. Analyze AI-generated suggestions for titles, descriptions, and content structure improvements.",
  keywords: [
    "content optimization results", "seo analysis results", "ai optimization",
    "content recommendations", "seo suggestions", "auditcraft", "audit craft"
  ],
  canonical: "/dashboard/seo-optimizer/[id]",
});

export default function SeoOptimizerDetailLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
} 