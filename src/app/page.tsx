import Link from "next/link";
import { ArrowRight, BarChart3, CheckCircle, Globe, Zap, TrendingUp, Users, Wand2, Sparkles } from "lucide-react";
import { ThemeToggle } from "@/shared/ui/theme";
import { FooterWrapper } from "@/shared/ui/footer/FooterWrapper";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                <BarChart3 className="h-5 w-5" />
              </div>
              <span className="text-xl font-bold text-foreground">SEO Tools</span>
            </div>
            <div className="flex items-center space-x-4">
              <Link
                href="/dashboard"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                Dashboard
              </Link>
              <ThemeToggle />
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/10" />
        <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 py-24 sm:py-32">
          <div className="mx-auto max-w-4xl text-center">
            <div className="mb-6 flex items-center justify-center">
              <div className="flex items-center space-x-2 rounded-full bg-gradient-to-r from-pink-500/10 to-purple-500/10 px-4 py-2 text-sm font-medium text-primary border border-primary/20">
                <Sparkles className="h-4 w-4" />
                <span>Now with AI-Powered Content Optimization</span>
              </div>
            </div>
            <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-6xl lg:text-7xl">
              Professional
              <span className="text-primary"> SEO Tools </span>
              for Modern Websites
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-muted-foreground sm:text-xl">
              Boost your website&apos;s search engine performance with our comprehensive suite of SEO analysis tools.
              Generate sitemaps, validate meta tags, audit page speed, and optimize content with AI in seconds.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/dashboard"
                className="flex items-center justify-center space-x-2 rounded-xl bg-primary px-8 py-4 text-lg font-semibold text-white shadow-lg transition-all hover:bg-primary-dark hover:shadow-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
              >
                <span>Start Scanning</span>
                <ArrowRight className="h-5 w-5" />
              </Link>
              <Link
                href="#features"
                className="flex items-center justify-center space-x-2 rounded-xl border border-border bg-card px-8 py-4 text-lg font-semibold text-foreground shadow-sm transition-all hover:bg-accent hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
              >
                <span>Learn More</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 sm:py-32">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Everything you need for SEO success
            </h2>
            <p className="mt-6 text-lg leading-8 text-muted-foreground">
              Our comprehensive tools help you analyze, optimize, and monitor your website&apos;s SEO performance.
            </p>
          </div>

          <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {/* AI Content Optimizer */}
            <Link href="/dashboard/seo-optimizer" className="group rounded-lg border border-border bg-card p-6 shadow-sm transition-all hover:shadow-lg hover:border-primary/50">
              <div className="flex items-start space-x-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-pink-500 text-white">
                  <Wand2 className="h-6 w-6" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-card-foreground group-hover:text-primary">
                    AI Content Optimizer
                  </h3>
                  <p className="mt-2 text-sm text-muted-foreground">
                    Optimize your content for better SEO with AI-powered suggestions and real-time analysis.
                  </p>
                </div>
              </div>
            </Link>

            {/* Sitemap Generator */}
            <Link href="/dashboard/sitemap" className="group rounded-lg border border-border bg-card p-6 shadow-sm transition-all hover:shadow-lg hover:border-primary/50">
              <div className="flex items-start space-x-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-blue-500 text-white">
                  <Globe className="h-6 w-6" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-card-foreground group-hover:text-primary">
                    Sitemap Generator
                  </h3>
                  <p className="mt-2 text-sm text-muted-foreground">
                    Generate XML and HTML sitemaps for better search engine indexing and crawling.
                  </p>
                </div>
              </div>
            </Link>

            {/* Meta Tag Validator */}
            <Link href="/dashboard/meta-tags" className="group rounded-lg border border-border bg-card p-6 shadow-sm transition-all hover:shadow-lg hover:border-primary/50">
              <div className="flex items-start space-x-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-green-500 text-white">
                  <CheckCircle className="h-6 w-6" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-card-foreground group-hover:text-primary">
                    Meta Tag Validator
                  </h3>
                  <p className="mt-2 text-sm text-muted-foreground">
                    Analyze and validate your meta tags for optimal SEO performance and social sharing.
                  </p>
                </div>
              </div>
            </Link>

            {/* Page Speed Auditor */}
            <Link href="/dashboard/page-speed" className="group rounded-lg border border-border bg-card p-6 shadow-sm transition-all hover:shadow-lg hover:border-primary/50">
              <div className="flex items-start space-x-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-yellow-500 text-white">
                  <Zap className="h-6 w-6" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-card-foreground group-hover:text-primary">
                    Page Speed Auditor
                  </h3>
                  <p className="mt-2 text-sm text-muted-foreground">
                    Comprehensive page speed analysis with actionable recommendations for improvement.
                  </p>
                </div>
              </div>
            </Link>

            {/* Keyword Tracker */}
            <Link href="/dashboard/keyword-tracker" className="group rounded-lg border border-border bg-card p-6 shadow-sm transition-all hover:shadow-lg hover:border-primary/50">
              <div className="flex items-start space-x-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-purple-500 text-white">
                  <TrendingUp className="h-6 w-6" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-card-foreground group-hover:text-primary">
                    Keyword Tracker
                  </h3>
                  <p className="mt-2 text-sm text-muted-foreground">
                    Track your website&apos;s keyword rankings in Google search results over time.
                  </p>
                </div>
              </div>
            </Link>

            {/* Competitor Analysis */}
            <Link href="/dashboard/competitor-analysis" className="group rounded-lg border border-border bg-card p-6 shadow-sm transition-all hover:shadow-lg hover:border-primary/50">
              <div className="flex items-start space-x-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-orange-500 text-white">
                  <Users className="h-6 w-6" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-card-foreground group-hover:text-primary">
                    Competitor Analysis
                  </h3>
                  <p className="mt-2 text-sm text-muted-foreground">
                    Analyze your competitors&apos; SEO strategies, backlinks, and content performance.
                  </p>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 sm:py-32 bg-primary/5">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Ready to improve your SEO?
            </h2>
            <p className="mt-6 text-lg leading-8 text-muted-foreground">
              Start analyzing your website today and get actionable insights to boost your search rankings.
            </p>
            <div className="mt-10">
              <Link
                href="/dashboard"
                className="inline-flex items-center justify-center space-x-2 rounded-xl bg-primary px-8 py-4 text-lg font-semibold text-white shadow-lg transition-all hover:bg-primary-dark hover:shadow-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
              >
                <span>Get Started Free</span>
                <ArrowRight className="h-5 w-5" />
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
