import { Metadata } from 'next';
import { generateMetadata } from '@/lib/seo';

export const metadata: Metadata = generateMetadata({
  title: "Content Optimization History - AuditCraft",
  description: "View your content optimization history and track improvements over time. Access previous optimization results and compare performance metrics.",
  keywords: [
    "content optimization history", "seo history", "optimization tracking",
    "content analysis history", "seo performance tracking", "auditcraft", "audit craft"
  ],
  canonical: "/dashboard/seo-optimizer/history",
});

export default function SeoOptimizerHistoryLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
} 