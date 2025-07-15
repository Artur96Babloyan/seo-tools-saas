import Script from "next/script";
import NotFoundContent from "@/components/NotFoundContent";

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