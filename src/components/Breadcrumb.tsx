"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronRight, Home } from "lucide-react";
import Script from "next/script";

interface BreadcrumbItem {
  label: string;
  href: string;
  isCurrent?: boolean;
}

export default function Breadcrumb() {
  const pathname = usePathname();

  const generateBreadcrumbs = (): BreadcrumbItem[] => {
    const paths = pathname.split('/').filter(Boolean);
    const breadcrumbs: BreadcrumbItem[] = [
      { label: 'Home', href: '/' }
    ];

    let currentPath = '';
    paths.forEach((path, index) => {
      currentPath += `/${path}`;
      const label = path.charAt(0).toUpperCase() + path.slice(1).replace(/-/g, ' ');

      breadcrumbs.push({
        label,
        href: currentPath,
        isCurrent: index === paths.length - 1
      });
    });

    return breadcrumbs;
  };

  const breadcrumbs = generateBreadcrumbs();

  // Generate structured data for breadcrumbs
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": breadcrumbs.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.label,
      "item": item.href
    }))
  };

  if (breadcrumbs.length <= 1) return null;

  return (
    <>
      <Script
        id="breadcrumb-structured-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData)
        }}
      />

      <nav className="flex items-center space-x-1 text-sm text-muted-foreground mb-4" aria-label="Breadcrumb">
        {breadcrumbs.map((item, index) => (
          <div key={item.href} className="flex items-center">
            {index > 0 && (
              <ChevronRight className="h-4 w-4 mx-1" />
            )}
            {item.isCurrent ? (
              <span className="text-foreground font-medium" aria-current="page">
                {item.label}
              </span>
            ) : (
              <Link
                href={item.href}
                className="hover:text-foreground transition-colors flex items-center"
              >
                {index === 0 ? (
                  <Home className="h-4 w-4" />
                ) : (
                  item.label
                )}
              </Link>
            )}
          </div>
        ))}
      </nav>
    </>
  );
} 