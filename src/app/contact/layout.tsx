import { Metadata } from 'next';
import { generateMetadata } from '@/lib/seo';

export const metadata: Metadata = generateMetadata({
  title: "Contact Us - Get Support & Reach Our Team | AuditCraft",
  description: "Contact AuditCraft for technical support, billing questions, or partnership opportunities. Get help from our SEO experts and customer support team.",
  keywords: [
    "contact us", "customer support", "technical support", "seo help",
    "contact auditcraft", "support team", "auditcraft", "audit craft"
  ],
  canonical: "/contact",
});

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
} 