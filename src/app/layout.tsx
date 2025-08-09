import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Providers } from "@/app/providers/Providers";
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
  title: "Boost SEO with AI: AuditCraft Website AuditTools",
  description: "Elevate your site's performance! AI-driven SEO analysis,content optimization,and speed audits.Unlock potential with AuditCraft now!",
  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
    other: [
      { rel: 'android-chrome-192x192', url: '/android-chrome-192x192.png' },
      { rel: 'android-chrome-512x512', url: '/android-chrome-512x512.png' },
    ],
  },
  keywords: [
    "seo",
    "seo tools",
    "seo audit",
    "seo analysis",
    "seo optimization",
    "seo tools",
    "seo audit",
    "seo analysis",
    "seo tools",
    "seo audit",
    "seo analysis",
    "seo optimization",
    "seo tools",
    "seo audit",
    "seo analysis",
    "AI seo",
    "AI seo tools",
    "AI seo audit",
    "AI seo analysis",
    "AI seo optimization",
    "AI seo tools",
    "AI seo audit",
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
    title: "Boos SEO with AI: AuditCraft Website AuditTools",
    description: "Elevate your site's performance! AI-driven SEO analysis,content optimization,and speed audits.Unlock potential with AuditCraft now!",
    type: "website",
    locale: "en_US",
    url: "https://auditcraft.io",
    siteName: "AuditCraft",
    images: [
      {
        url: "https://auditcraft.io/android-chrome-512x512.png",
        width: 1200,
        height: 630,
        alt: "Boos SEO withAI: AuditCraft Website AuditTools",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Boost SEO with AI: AuditCraft Website AuditTools",
    description: "Elevate your site's performance! AI-driven SEO analysis,content optimization,and speed audits.Unlock potential with AuditCraft now!",
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

        {/* Standard Favicon */}
        <link rel="icon" href="/favicon.ico" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />

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
              "name": "Boost SEO with AI: AuditCraft Website AuditTools",
              "description": "Elevate your site's performance! AI-driven SEO analysis,content optimization,and speed audits.Unlock potential withAuditCraft now!",
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

        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
