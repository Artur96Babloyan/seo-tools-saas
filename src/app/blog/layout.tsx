import { Metadata } from 'next';
import { generateMetadata } from '@/lib/seo';
import { Header } from '@/components/Header';

export const metadata: Metadata = generateMetadata({
  title: "Blog - SEO Insights, Tips & Updates | AuditCraft",
  description: "Read the latest SEO insights, expert tips, and product updates from the AuditCraft team. Stay ahead with actionable strategies and industry news.",
  keywords: [
    "seo blog", "seo tips", "seo news", "search engine optimization", "digital marketing blog", "auditcraft blog", "seo updates", "content marketing"
  ],
  canonical: "/blog",
});

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header showAuthButtons={true} />
      {children}
    </>
  );
} 