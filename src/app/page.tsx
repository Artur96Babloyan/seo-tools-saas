"use client";

import Link from "next/link";
import { ArrowRight, CheckCircle, Globe, Zap, TrendingUp, Users, Wand2, Sparkles } from "lucide-react";
import { FooterWrapper } from "@/shared/ui/footer/FooterWrapper";
import { Header } from "@/components/Header";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/10" />
        <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 lg:py-32">
          <div className="mx-auto max-w-4xl text-center">
            <div className="mb-4 sm:mb-6 flex items-center justify-center">
              <div className="flex items-center space-x-2 rounded-full bg-gradient-to-r from-pink-500/10 to-purple-500/10 px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm font-medium text-primary border border-primary/20">
                <Sparkles className="h-3 w-3 sm:h-4 sm:w-4" />
                <span className="hidden sm:inline">Now with AI-Powered Content Optimization</span>
                <span className="sm:hidden">AI-Powered SEO Tools</span>
              </div>
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight text-foreground leading-tight">
              Professional
              <span className="text-primary"> AuditCraft </span>
              for Modern Websites
            </h1>
            <p className="mx-auto mt-4 sm:mt-6 max-w-2xl text-base sm:text-lg lg:text-xl leading-relaxed text-muted-foreground px-4 sm:px-0">
              Boost your website&apos;s search engine performance with our comprehensive suite of SEO analysis tools.
              Generate sitemaps, validate meta tags, audit page speed, and optimize content with AI in seconds.
            </p>
            <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 px-4 sm:px-0">
              <Link
                href="/dashboard"
                className="w-full sm:w-auto flex items-center justify-center space-x-2 rounded-xl bg-primary px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg font-semibold text-white shadow-lg transition-all hover:bg-primary-dark hover:shadow-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
              >
                <span>Start Scanning</span>
                <ArrowRight className="h-4 w-4 sm:h-5 sm:w-5" />
              </Link>
              <Link
                href="#features"
                className="w-full sm:w-auto flex items-center justify-center space-x-2 rounded-xl border border-border bg-card px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg font-semibold text-foreground shadow-sm transition-all hover:bg-accent hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
              >
                <span>Learn More</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-16 sm:py-24 lg:py-32">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-foreground">
              Everything you need for SEO success
            </h2>
            <p className="mt-4 sm:mt-6 text-base sm:text-lg leading-relaxed text-muted-foreground">
              Our comprehensive tools help you analyze, optimize, and monitor your website&apos;s SEO performance.
            </p>
          </div>

          <div className="mt-12 sm:mt-16 grid grid-cols-1 gap-6 sm:gap-8 md:grid-cols-2 lg:grid-cols-3">
            {/* AI Content Optimizer */}
            <Link href="/dashboard/seo-optimizer" className="group rounded-lg border border-border bg-card p-4 sm:p-6 shadow-sm transition-all hover:shadow-lg hover:border-primary/50">
              <div className="flex items-start space-x-3 sm:space-x-4">
                <div className="flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-lg bg-pink-500 text-white flex-shrink-0">
                  <Wand2 className="h-5 w-5 sm:h-6 sm:w-6" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-card-foreground group-hover:text-primary text-sm sm:text-base">
                    AI Content Optimizer
                  </h3>
                  <p className="mt-2 text-xs sm:text-sm text-muted-foreground leading-relaxed">
                    Optimize your content for better SEO with AI-powered suggestions and real-time analysis.
                  </p>
                </div>
              </div>
            </Link>

            {/* Sitemap Generator */}
            <Link href="/dashboard/sitemap" className="group rounded-lg border border-border bg-card p-4 sm:p-6 shadow-sm transition-all hover:shadow-lg hover:border-primary/50">
              <div className="flex items-start space-x-3 sm:space-x-4">
                <div className="flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-lg bg-blue-500 text-white flex-shrink-0">
                  <Globe className="h-5 w-5 sm:h-6 sm:w-6" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-card-foreground group-hover:text-primary text-sm sm:text-base">
                    Sitemap Generator
                  </h3>
                  <p className="mt-2 text-xs sm:text-sm text-muted-foreground leading-relaxed">
                    Generate XML and HTML sitemaps for better search engine indexing and crawling.
                  </p>
                </div>
              </div>
            </Link>

            {/* Meta Tag Validator */}
            <Link href="/dashboard/meta-tags" className="group rounded-lg border border-border bg-card p-4 sm:p-6 shadow-sm transition-all hover:shadow-lg hover:border-primary/50">
              <div className="flex items-start space-x-3 sm:space-x-4">
                <div className="flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-lg bg-green-500 text-white flex-shrink-0">
                  <CheckCircle className="h-5 w-5 sm:h-6 sm:w-6" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-card-foreground group-hover:text-primary text-sm sm:text-base">
                    Meta Tag Validator
                  </h3>
                  <p className="mt-2 text-xs sm:text-sm text-muted-foreground leading-relaxed">
                    Analyze and validate your meta tags for optimal SEO performance and social sharing.
                  </p>
                </div>
              </div>
            </Link>

            {/* Page Speed Auditor */}
            <Link href="/dashboard/page-speed" className="group rounded-lg border border-border bg-card p-4 sm:p-6 shadow-sm transition-all hover:shadow-lg hover:border-primary/50">
              <div className="flex items-start space-x-3 sm:space-x-4">
                <div className="flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-lg bg-yellow-500 text-white flex-shrink-0">
                  <Zap className="h-5 w-5 sm:h-6 sm:w-6" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-card-foreground group-hover:text-primary text-sm sm:text-base">
                    Page Speed Auditor
                  </h3>
                  <p className="mt-2 text-xs sm:text-sm text-muted-foreground leading-relaxed">
                    Comprehensive page speed analysis with actionable recommendations for improvement.
                  </p>
                </div>
              </div>
            </Link>

            {/* Keyword Tracker */}
            <Link href="/dashboard/keyword-tracker" className="group rounded-lg border border-border bg-card p-4 sm:p-6 shadow-sm transition-all hover:shadow-lg hover:border-primary/50">
              <div className="flex items-start space-x-3 sm:space-x-4">
                <div className="flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-lg bg-purple-500 text-white flex-shrink-0">
                  <TrendingUp className="h-5 w-5 sm:h-6 sm:w-6" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-card-foreground group-hover:text-primary text-sm sm:text-base">
                    Keyword Tracker
                  </h3>
                  <p className="mt-2 text-xs sm:text-sm text-muted-foreground leading-relaxed">
                    Track your website&apos;s keyword rankings in Google search results over time.
                  </p>
                </div>
              </div>
            </Link>

            {/* Competitor Analysis */}
            <Link href="/dashboard/competitor-analysis" className="group rounded-lg border border-border bg-card p-4 sm:p-6 shadow-sm transition-all hover:shadow-lg hover:border-primary/50">
              <div className="flex items-start space-x-3 sm:space-x-4">
                <div className="flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-lg bg-orange-500 text-white flex-shrink-0">
                  <Users className="h-5 w-5 sm:h-6 sm:w-6" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-card-foreground group-hover:text-primary text-sm sm:text-base">
                    Competitor Analysis
                  </h3>
                  <p className="mt-2 text-xs sm:text-sm text-muted-foreground leading-relaxed">
                    Analyze your competitors&apos; SEO strategies, backlinks, and content performance.
                  </p>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 sm:py-24 lg:py-32 bg-primary/5">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-foreground">
              Ready to improve your SEO?
            </h2>
            <p className="mt-4 sm:mt-6 text-base sm:text-lg leading-relaxed text-muted-foreground">
              Start analyzing your website today and get actionable insights to boost your search rankings.
            </p>
            <div className="mt-8 sm:mt-10">
              <Link
                href="/dashboard"
                className="inline-flex items-center justify-center space-x-2 rounded-xl bg-primary px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg font-semibold text-white shadow-lg transition-all hover:bg-primary-dark hover:shadow-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
              >
                <span>Get Started Free</span>
                <ArrowRight className="h-4 w-4 sm:h-5 sm:w-5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <FooterWrapper />
    </div>
  );
}
