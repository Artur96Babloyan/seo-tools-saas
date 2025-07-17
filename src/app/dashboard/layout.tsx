import { Metadata } from 'next';
import { generateMetadata } from '@/lib/seo';
import DashboardLayoutClient from './DashboardLayoutClient';

export const metadata: Metadata = generateMetadata({
  title: "SEO Dashboard - AuditCraft",
  description: "Comprehensive SEO dashboard with tools for content optimization, keyword tracking, competitor analysis, and website auditing. Professional SEO management platform.",
  keywords: [
    "seo dashboard", "seo tools", "website audit", "seo analysis",
    "keyword tracking", "competitor analysis", "auditcraft", "audit craft"
  ],
  canonical: "/dashboard",
});

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <DashboardLayoutClient>{children}</DashboardLayoutClient>;
} 