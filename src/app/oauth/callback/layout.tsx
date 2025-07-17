import { Metadata } from 'next';
import { generateMetadata } from '@/lib/seo';

export const metadata: Metadata = generateMetadata({
  title: "OAuth Authentication - AuditCraft",
  description: "Processing OAuth authentication for AuditCraft SEO tools. Secure connection to external services for enhanced SEO analysis and reporting capabilities.",
  keywords: [
    "oauth authentication", "secure login", "api connection", "seo tools",
    "auditcraft", "audit craft"
  ],
  canonical: "/oauth/callback",
});

export default function OAuthCallbackLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
} 