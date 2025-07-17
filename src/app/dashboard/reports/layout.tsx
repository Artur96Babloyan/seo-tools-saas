import { Metadata } from 'next';
import { generateMetadata } from '@/lib/seo';

export const metadata: Metadata = generateMetadata({
  title: "SEO Reports & Analytics Dashboard - AuditCraft",
  description: "Comprehensive SEO reports and analytics dashboard. View detailed insights, track performance metrics, and generate professional PDF reports for your website audits.",
  keywords: [
    "seo reports", "website analytics", "seo analytics", "audit reports",
    "performance reports", "seo dashboard", "auditcraft", "audit craft"
  ],
  canonical: "/dashboard/reports",
});

export default function ReportsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
} 