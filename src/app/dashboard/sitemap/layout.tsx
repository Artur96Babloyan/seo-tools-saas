import { Metadata } from 'next';
import { generateMetadata } from '@/lib/seo';

export const metadata: Metadata = generateMetadata({
  title: "Sitemap Generator - XML & HTML Sitemap Creator | AuditCraft",
  description: "Generate comprehensive XML and HTML sitemaps for better search engine indexing. Improve crawlability and help search engines discover your content faster.",
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