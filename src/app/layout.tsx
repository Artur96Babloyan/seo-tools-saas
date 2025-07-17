import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/shared/ui/theme";
import { AuthProvider } from '@/entities/user';
import Script from "next/script";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "AuditCraft: Professional SEO Analysis & Website Audit Tools",
  description: "Unlock your website's potential with AuditCraft. AI-driven SEO analysis, content optimization, sitemap generator, meta tag validator, page speed auditor, keyword tracking, and competitor analysis—all in one platform.",
  keywords: [
    "auditcraft", "audit craft", "audit seo", "seo audit", "website audit",
    "seo analysis", "website analysis", "seo tools", "audit tools",
    "AI content optimization", "sitemap generator", "meta tag validator",
    "page speed auditor", "keyword tracking", "competitor analysis",
    "website optimization", "seo optimization", "auditcraft.io"
  ],
  authors: [{ name: "AuditCraft" }],
  creator: "AuditCraft",
  publisher: "AuditCraft",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: 'https://auditcraft.io',
  },
  verification: {
    google: 'your-google-verification-code',
  },
  openGraph: {
    title: "AuditCraft: Professional SEO Analysis & Website Audit Tools",
    description: "Unlock your website's potential with AuditCraft. AI-driven SEO analysis, content optimization, sitemap generator, meta tag validator, page speed auditor, keyword tracking, and competitor analysis—all in one platform.",
    type: "website",
    locale: "en_US",
    url: "https://auditcraft.io",
    siteName: "AuditCraft",
    images: [
      {
        url: "https://auditcraft.io/android-chrome-512x512.png",
        width: 1200,
        height: 630,
        alt: "AuditCraft: Professional SEO Analysis & Website Audit Tools",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "AuditCraft: Professional SEO Analysis & Website Audit Tools",
    description: "Unlock your website's potential with AuditCraft. AI-driven SEO analysis, content optimization, sitemap generator, meta tag validator, page speed auditor, keyword tracking, and competitor analysis—all in one platform.",
    images: ["https://auditcraft.io/android-chrome-512x512.png"],
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Apple Touch Icons */}
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="apple-touch-icon" sizes="152x152" href="/apple-touch-icon.png" />
        <link rel="apple-touch-icon" sizes="144x144" href="/apple-touch-icon.png" />
        <link rel="apple-touch-icon" sizes="120x120" href="/apple-touch-icon.png" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />

        {/* Android Chrome Icons */}
        <link rel="icon" type="image/png" sizes="192x192" href="/android-chrome-192x192.png" />
        <link rel="icon" type="image/png" sizes="512x512" href="/android-chrome-512x512.png" />

        {/* Microsoft Tiles */}
        <meta name="msapplication-TileColor" content="#3b82f6" />
        <meta name="msapplication-TileImage" content="/favicon-32x32.png" />

        {/* Manifest and theme */}
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#3b82f6" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="SEO Tools" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {/* Structured Data */}
        <Script
          id="structured-data"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "SoftwareApplication",
              "name": "AuditCraft - Professional SEO Analysis & Website Audit Tools",
              "description": "Professional SEO audit tools including AI content optimization, sitemap generator, meta tag validator, page speed auditor, keyword tracking, and competitor analysis.",
              "url": "https://auditcraft.io",
              "applicationCategory": "BusinessApplication",
              "operatingSystem": "Web Browser",
              "offers": {
                "@type": "Offer",
                "price": "0",
                "priceCurrency": "USD"
              },
              "featureList": [
                "AI Content Optimization",
                "Sitemap Generator",
                "Meta Tag Validator",
                "Page Speed Auditor",
                "Keyword Tracking",
                "Competitor Analysis",
                "SEO Reports",
                "Website Audit",
                "SEO Analysis"
              ],
              "author": {
                "@type": "Organization",
                "name": "AuditCraft"
              },
              "publisher": {
                "@type": "Organization",
                "name": "AuditCraft"
              }
            })
          }}
        />

        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <AuthProvider>
            {children}
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
