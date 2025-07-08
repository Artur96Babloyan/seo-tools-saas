import Link from "next/link";
import { ArrowRight, BarChart3, CheckCircle, Globe, Zap } from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";

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
            <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-6xl lg:text-7xl">
              Professional
              <span className="text-primary"> SEO Tools </span>
              for Modern Websites
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-muted-foreground sm:text-xl">
              Boost your website&apos;s search engine performance with our comprehensive suite of SEO analysis tools.
              Generate sitemaps, validate meta tags, and audit page speed in seconds.
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

      {/* Features Preview */}
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
          <div className="mx-auto mt-16 grid max-w-6xl grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {/* Sitemap Generator */}
            <div className="group relative rounded-2xl border border-border bg-card p-8 shadow-sm transition-all hover:shadow-lg hover:border-primary/50">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <Globe className="h-6 w-6" />
              </div>
              <h3 className="mt-6 text-xl font-semibold text-card-foreground">
                Sitemap Generator
              </h3>
              <p className="mt-4 text-muted-foreground">
                Generate comprehensive XML sitemaps for your website to help search engines discover and index your content efficiently.
              </p>
              <div className="mt-6 flex items-center space-x-2 text-sm text-primary">
                <CheckCircle className="h-4 w-4" />
                <span>XML & HTML formats</span>
              </div>
            </div>

            {/* Meta Tag Validator */}
            <div className="group relative rounded-2xl border border-border bg-card p-8 shadow-sm transition-all hover:shadow-lg hover:border-primary/50">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <CheckCircle className="h-6 w-6" />
              </div>
              <h3 className="mt-6 text-xl font-semibold text-card-foreground">
                Meta Tag Validator
              </h3>
              <p className="mt-4 text-muted-foreground">
                Analyze and validate your meta tags, title tags, and structured data to ensure optimal search engine visibility.
              </p>
              <div className="mt-6 flex items-center space-x-2 text-sm text-primary">
                <CheckCircle className="h-4 w-4" />
                <span>Complete meta analysis</span>
              </div>
            </div>

            {/* Page Speed Auditor */}
            <div className="group relative rounded-2xl border border-border bg-card p-8 shadow-sm transition-all hover:shadow-lg hover:border-primary/50">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <Zap className="h-6 w-6" />
              </div>
              <h3 className="mt-6 text-xl font-semibold text-card-foreground">
                Page Speed Auditor
              </h3>
              <p className="mt-4 text-muted-foreground">
                Comprehensive page speed analysis with actionable recommendations to improve your website&apos;s loading performance.
              </p>
              <div className="mt-6 flex items-center space-x-2 text-sm text-primary">
                <CheckCircle className="h-4 w-4" />
                <span>Performance insights</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border bg-card/50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex flex-col items-center justify-between space-y-4 sm:flex-row sm:space-y-0">
            <div className="flex items-center space-x-2">
              <div className="flex h-6 w-6 items-center justify-center rounded-md bg-primary text-primary-foreground">
                <BarChart3 className="h-4 w-4" />
              </div>
              <span className="font-semibold text-foreground">SEO Tools</span>
            </div>
            <p className="text-sm text-muted-foreground">
              © 2024 SEO Tools. Built with Next.js and Tailwind CSS.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
