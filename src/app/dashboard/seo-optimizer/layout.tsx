import { Metadata } from 'next';
import { generateMetadata } from '@/lib/seo';

export const metadata: Metadata = generateMetadata({
  title: "AI Content Optimizer - SEO Writing Assistant | AuditCraft",
  description: "Transform your content with AI-powered SEO optimization. Get real-time suggestions for titles, descriptions, and content structure to improve search rankings.",
  keywords: [
    "AI content optimization", "seo content optimizer", "content optimization",
    "AI seo tools", "content optimization tool", "auditcraft", "audit craft"
  ],
  canonical: "/dashboard/seo-optimizer",
});

export default function SeoOptimizerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
} 