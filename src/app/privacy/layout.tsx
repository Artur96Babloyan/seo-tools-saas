import { Metadata } from 'next';
import { generateMetadata } from '@/lib/seo';

export const metadata: Metadata = generateMetadata({
  title: "Privacy Policy - Data Protection & Security | AuditCraft",
  description: "Learn how AuditCraft protects your data and privacy. Our comprehensive privacy policy explains data collection, usage, security measures, and your rights.",
  keywords: [
    "privacy policy", "data protection", "security", "gdpr compliance",
    "data privacy", "information security", "auditcraft", "audit craft"
  ],
  canonical: "/privacy",
});

export default function PrivacyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
} 