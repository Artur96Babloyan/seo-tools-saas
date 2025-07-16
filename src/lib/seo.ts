import { Metadata } from 'next';

export interface SEOConfig {
  title: string;
  description: string;
  keywords?: string[];
  canonical?: string;
  noIndex?: boolean;
}

export function generateMetadata(config: SEOConfig): Metadata {
  const baseUrl = 'https://auditcraft.io';
  const canonical = config.canonical ? `${baseUrl}${config.canonical}` : baseUrl;
  
  return {
    title: config.title,
    description: config.description,
    keywords: config.keywords,
    robots: {
      index: !config.noIndex,
      follow: !config.noIndex,
      googleBot: {
        index: !config.noIndex,
        follow: !config.noIndex,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    alternates: {
      canonical: canonical,
    },
    openGraph: {
      title: config.title,
      description: config.description,
      type: 'website',
      locale: 'en_US',
      url: canonical,
      siteName: 'AuditCraft',
      images: [
        {
          url: `${baseUrl}/globe.svg`,
          width: 1200,
          height: 630,
          alt: config.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: config.title,
      description: config.description,
      images: [`${baseUrl}/globe.svg`],
    },
  };
}

export function generatePageCanonical(path: string): string {
  const baseUrl = 'https://auditcraft.io';
  return `${baseUrl}${path}`;
} 