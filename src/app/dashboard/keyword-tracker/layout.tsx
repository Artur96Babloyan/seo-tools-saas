import { Metadata } from 'next';
import { generateMetadata } from '@/lib/seo';

export const metadata: Metadata = generateMetadata({
  title: "Keyword Tracking & Rank Monitor - AuditCraft",
  description: "Track your website's keyword rankings in Google search results over time. Monitor position changes, analyze trends, and optimize for better search visibility.",
  keywords: [
    "keyword tracking", "rank tracking", "keyword rank monitor", "seo tracking",
    "google rankings", "keyword position tracker", "auditcraft", "audit craft"
  ],
  canonical: "/dashboard/keyword-tracker",
});

export default function KeywordTrackerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
} 