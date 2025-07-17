import { Metadata } from 'next';
import { generateMetadata } from '@/lib/seo';

export const metadata: Metadata = generateMetadata({
  title: "SERP Optimizer & Preview Tool - AuditCraft",
  description: "Optimize your search engine results page appearance with our SERP preview tool. Test meta titles, descriptions, and rich snippets for better click-through rates.",
  keywords: [
    "serp optimizer", "serp preview", "search result preview", "meta title optimizer",
    "rich snippets", "click through rate", "auditcraft", "audit craft"
  ],
  canonical: "/dashboard/serp-optimizer",
});

export default function SerpOptimizerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
} 