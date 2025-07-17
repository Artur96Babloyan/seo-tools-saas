import { Metadata } from 'next';
import { generateMetadata } from '@/lib/seo';

export const metadata: Metadata = generateMetadata({
  title: "Meta Tag Validator & Social Media Preview | AuditCraft",
  description: "Analyze and validate meta tags, Open Graph, and Twitter Cards for optimal SEO performance. Preview how your content appears in search results and social media.",
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