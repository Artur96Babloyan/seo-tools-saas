import Script from "next/script";
import NotFoundContent from "@/components/NotFoundContent";
import { Metadata } from 'next';
import { generateMetadata } from '@/lib/seo';

export const metadata: Metadata = generateMetadata({
  title: "Page Not Found - 404 Error | AuditCraft",
  description: "The page you're looking for doesn't exist. Explore our comprehensive SEO tools for website optimization, content analysis, and performance auditing.",
  keywords: [
    "404 error", "page not found", "seo tools", "website optimization",
    "auditcraft", "audit craft"
  ],
  canonical: "/404",
});

export default function NotFound() {
  return (
    <>
      <Script
        id="404-structured-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            "name": "Page Not Found - SEO Tools",
            "description": "The page you're looking for doesn't exist. Explore our SEO tools for website optimization.",
            "url": "/404",
            "isPartOf": {
              "@type": "WebSite",
              "name": "SEO Tools",
              "url": "/"
            }
          })
        }}
      />
      <NotFoundContent />
    </>
  );
} 