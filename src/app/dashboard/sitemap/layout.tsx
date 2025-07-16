import { Metadata } from 'next';
import { generateMetadata } from '@/lib/seo';

export const metadata: Metadata = generateMetadata({
  title: "Sitemap Generator - AuditCraft",
  description: "Generate comprehensive XML and HTML sitemaps for better search engine indexing. Professional sitemap generator tool by AuditCraft.",
  keywords: [
    "sitemap generator", "xml sitemap", "html sitemap", "sitemap tool",
    "website sitemap", "seo sitemap", "auditcraft", "audit craft"
  ],
  canonical: "/dashboard/sitemap",
});

export default function SitemapLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
} 