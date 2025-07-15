import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { AuthProvider } from "@/contexts/AuthContext";
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
  title: "SEO Tools - Professional SEO Analysis Suite",
  description: "Comprehensive SEO tools including AI content optimization, sitemap generator, meta tag validator, page speed auditor, keyword tracking, and competitor analysis. Boost your website's search engine performance.",
  keywords: ["SEO", "AI content optimization", "sitemap generator", "meta tags", "page speed", "keyword tracking", "competitor analysis", "website optimization"],
  authors: [{ name: "SEO Tools" }],
  openGraph: {
    title: "SEO Tools - Professional SEO Analysis Suite",
    description: "Comprehensive SEO tools for modern websites. AI-powered content optimization, performance analysis, and competitive insights.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "SEO Tools - Professional SEO Analysis Suite",
    description: "Comprehensive SEO tools for modern websites. AI-powered content optimization, performance analysis, and competitive insights.",
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
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#3b82f6" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="SEO Tools" />
        <link rel="apple-touch-icon" href="/globe.svg" />
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
              "name": "SEO Tools - Professional SEO Analysis Suite",
              "description": "Comprehensive SEO tools including AI content optimization, sitemap generator, meta tag validator, page speed auditor, keyword tracking, and competitor analysis.",
              "url": "/",
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
                "SEO Reports"
              ],
              "author": {
                "@type": "Organization",
                "name": "SEO Tools"
              },
              "publisher": {
                "@type": "Organization",
                "name": "SEO Tools"
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
