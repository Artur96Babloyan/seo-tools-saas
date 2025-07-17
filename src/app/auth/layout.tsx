import { Metadata } from 'next';
import { generateMetadata } from '@/lib/seo';

export const metadata: Metadata = generateMetadata({
  title: "Account Access - AuditCraft",
  description: "Secure login and registration for AuditCraft SEO tools. Access your dashboard, manage your account, and unlock professional SEO analysis features.",
  keywords: [
    "login", "register", "account access", "seo tools login",
    "auditcraft login", "secure access", "auditcraft", "audit craft"
  ],
  canonical: "/auth",
});

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
} 