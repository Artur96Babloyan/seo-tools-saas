import { Metadata } from 'next';
import { generateMetadata } from '@/lib/seo';

export const metadata: Metadata = generateMetadata({
  title: "Meta Tag Validator - AuditCraft",
  description: "Analyze and validate meta tags, Open Graph, and Twitter Cards for optimal SEO performance. Professional meta tag validator by AuditCraft.",
  keywords: [
    "meta tag validator", "meta tags checker", "open graph validator",
    "twitter cards validator", "seo meta tags", "meta tag analysis", "auditcraft", "audit craft"
  ],
  canonical: "/dashboard/meta-tags",
});

export default function MetaTagsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
} 