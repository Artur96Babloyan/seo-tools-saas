import { Metadata } from 'next';
import { generateMetadata } from '@/lib/seo';

export const metadata: Metadata = generateMetadata({
  title: "About AuditCraft - Professional SEO Tools & Company",
  description: "Learn about AuditCraft's mission to democratize professional SEO tools. Meet our team of SEO experts, developers, and digital marketing professionals.",
  keywords: [
    "about auditcraft", "seo tools company", "seo experts", "digital marketing",
    "website optimization", "seo professionals", "auditcraft", "audit craft"
  ],
  canonical: "/about",
});

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
} 