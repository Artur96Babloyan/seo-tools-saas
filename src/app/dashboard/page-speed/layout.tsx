import { Metadata } from 'next';
import { generateMetadata } from '@/lib/seo';

export const metadata: Metadata = generateMetadata({
  title: "Page Speed Auditor & Performance Analyzer - AuditCraft",
  description: "Comprehensive page speed analysis with actionable recommendations for improvement. Test Core Web Vitals, optimize loading times, and boost user experience.",
  keywords: [
    "page speed auditor", "website speed test", "core web vitals", "performance analyzer",
    "loading speed test", "website performance", "auditcraft", "audit craft"
  ],
  canonical: "/dashboard/page-speed",
});

export default function PageSpeedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
} 