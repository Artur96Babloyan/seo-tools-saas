import Link from "next/link";
import { ArrowRight, BarChart3, CheckCircle, Globe, Zap, TrendingUp, Users, Wand2, Sparkles } from "lucide-react";
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

      {/* New Features Section */}
      <section className="relative py-20 sm:py-28 overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0 bg-gradient-to-br from-pink-500/5 via-purple-500/5 to-blue-500/5" />
        <div className="absolute top-0 left-1/4 w-72 h-72 bg-pink-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl" />

        <div className="relative container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center mb-16">
            <div className="flex items-center justify-center mb-6">
              <div className="flex items-center space-x-2 rounded-full bg-gradient-to-r from-pink-500/20 via-purple-500/20 to-blue-500/20 px-6 py-3 text-sm font-semibold text-primary border border-primary/30 backdrop-blur-sm shadow-lg">
                <Sparkles className="h-4 w-4 animate-pulse" />
                <span>✨ New Features</span>
              </div>
            </div>
            <h2 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl bg-gradient-to-r from-foreground via-primary to-foreground bg-clip-text text-transparent">
              AI-Powered Content Optimization
            </h2>
            <p className="mt-8 text-xl leading-8 text-muted-foreground max-w-2xl mx-auto">
              Transform your content with intelligent AI suggestions that boost search rankings and user engagement.
            </p>
          </div>

          <div className="mx-auto max-w-6xl">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-stretch mx-auto" style={{ maxWidth: '900px' }}>
              {/* AI Content Optimizer */}
              <div className="group relative p-8 rounded-2xl bg-gradient-to-br from-pink-500/5 via-purple-500/5 to-pink-500/5 border border-pink-500/20 backdrop-blur-sm hover:border-pink-500/40 transition-all duration-300 hover:shadow-2xl hover:shadow-pink-500/10 flex flex-col">
                <div className="absolute inset-0 bg-gradient-to-br from-pink-500/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="relative space-y-8 flex-1 flex flex-col">
                  <div className="flex items-center space-x-4">
                    <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-pink-500 to-purple-600 text-white shadow-lg group-hover:scale-110 transition-transform duration-300">
                      <Wand2 className="h-8 w-8" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-foreground">AI Content Optimizer</h3>
                      <p className="text-muted-foreground font-medium">Powered by advanced AI</p>
                    </div>
                  </div>

                  <div className="space-y-6">
                    <div className="p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-colors duration-200 border-l-4 border-green-500/50">
                      <h4 className="font-semibold text-foreground mb-2">Smart Content Analysis</h4>
                      <p className="text-muted-foreground">AI analyzes your content for SEO optimization opportunities</p>
                    </div>

                    <div className="p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-colors duration-200 border-l-4 border-green-500/50">
                      <h4 className="font-semibold text-foreground mb-2">Keyword Density Optimization</h4>
                      <p className="text-muted-foreground">Perfect your keyword usage for better search rankings</p>
                    </div>

                    <div className="p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-colors duration-200 border-l-4 border-green-500/50">
                      <h4 className="font-semibold text-foreground mb-2">Readability Scoring</h4>
                      <p className="text-muted-foreground">Ensure your content is easy to read and understand</p>
                    </div>

                    <div className="p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-colors duration-200 border-l-4 border-green-500/50">
                      <h4 className="font-semibold text-foreground mb-2">URL Content Extraction</h4>
                      <p className="text-muted-foreground">Extract and optimize content directly from any URL</p>
                    </div>
                  </div>

                  <Link
                    href="/dashboard/seo-optimizer"
                    className="inline-flex items-center space-x-3 rounded-xl bg-gradient-to-r from-pink-500 to-purple-600 px-8 py-4 text-base font-semibold text-white shadow-lg transition-all duration-300 hover:shadow-xl hover:shadow-pink-500/25 hover:scale-105 group-hover:from-pink-600 group-hover:to-purple-700 mt-auto"
                  >
                    <span>Try AI Optimizer</span>
                    <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform duration-200" />
                  </Link>
                </div>
              </div>

              {/* Enhanced Keyword Analysis */}
              <div className="group relative p-8 rounded-2xl bg-gradient-to-br from-blue-500/5 via-cyan-500/5 to-blue-500/5 border border-blue-500/20 backdrop-blur-sm hover:border-blue-500/40 transition-all duration-300 hover:shadow-2xl hover:shadow-blue-500/10 flex flex-col">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="relative space-y-8 flex-1 flex flex-col">
                  <div className="flex items-center space-x-4">
                    <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-600 text-white shadow-lg group-hover:scale-110 transition-transform duration-300">
                      <TrendingUp className="h-8 w-8" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-foreground">Enhanced Keyword Tracking</h3>
                      <p className="text-muted-foreground font-medium">Advanced analytics & insights</p>
                    </div>
                  </div>

                  <div className="space-y-6">
                    <div className="p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-colors duration-200 border-l-4 border-green-500/50">
                      <h4 className="font-semibold text-foreground mb-2">Multi-Domain Tracking</h4>
                      <p className="text-muted-foreground">Track keywords across multiple domains simultaneously</p>
                    </div>

                    <div className="p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-colors duration-200 border-l-4 border-green-500/50">
                      <h4 className="font-semibold text-foreground mb-2">Historical Data Analysis</h4>
                      <p className="text-muted-foreground">View ranking trends and performance over time</p>
                    </div>

                    <div className="p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-colors duration-200 border-l-4 border-green-500/50">
                      <h4 className="font-semibold text-foreground mb-2">Global Location Support</h4>
                      <p className="text-muted-foreground">Track rankings in different countries and regions</p>
                    </div>

                    <div className="p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-colors duration-200 border-l-4 border-green-500/50">
                      <h4 className="font-semibold text-foreground mb-2">Detailed Statistics</h4>
                      <p className="text-muted-foreground">Comprehensive analytics and performance insights</p>
                    </div>
                  </div>

                  <Link
                    href="/dashboard/keyword-tracker"
                    className="inline-flex items-center space-x-3 rounded-xl bg-gradient-to-r from-blue-500 to-cyan-600 px-8 py-4 text-base font-semibold text-white shadow-lg transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/25 hover:scale-105 group-hover:from-blue-600 group-hover:to-cyan-700 mt-auto"
                  >
                    <span>Track Keywords</span>
                    <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform duration-200" />
                  </Link>
                </div>
              </div>
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
          <div className="mx-auto mt-16 grid max-w-6xl grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">
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

            {/* Keyword Tracker */}
            <div className="group relative rounded-2xl border border-border bg-card p-8 shadow-sm transition-all hover:shadow-lg hover:border-primary/50">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <TrendingUp className="h-6 w-6" />
              </div>
              <h3 className="mt-6 text-xl font-semibold text-card-foreground">
                Keyword Tracker
              </h3>
              <p className="mt-4 text-muted-foreground">
                Track your website&apos;s keyword rankings in Google search results and monitor your SEO progress over time.
              </p>
              <div className="mt-6 flex items-center space-x-2 text-sm text-primary">
                <CheckCircle className="h-4 w-4" />
                <span>Rank monitoring</span>
              </div>
            </div>

            {/* Competitor Analysis */}
            <div className="group relative rounded-2xl border border-border bg-card p-8 shadow-sm transition-all hover:shadow-lg hover:border-primary/50">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <Users className="h-6 w-6" />
              </div>
              <h3 className="mt-6 text-xl font-semibold text-card-foreground">
                Competitor Analysis
              </h3>
              <p className="mt-4 text-muted-foreground">
                Analyze your competitors&apos; SEO strategies, backlinks, and content to identify opportunities and stay ahead of the competition.
              </p>
              <div className="mt-6 flex items-center space-x-2 text-sm text-primary">
                <CheckCircle className="h-4 w-4" />
                <span>Competitive insights</span>
              </div>
            </div>

            {/* AI Content Optimizer */}
            <div className="group relative rounded-2xl border border-border bg-card p-8 shadow-sm transition-all hover:shadow-lg hover:border-primary/50">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-r from-pink-500/10 to-purple-500/10 text-pink-500">
                <Wand2 className="h-6 w-6" />
              </div>
              <h3 className="mt-6 text-xl font-semibold text-card-foreground">
                AI Content Optimizer
              </h3>
              <p className="mt-4 text-muted-foreground">
                Transform your content with AI-powered SEO optimization. Get intelligent suggestions to improve search rankings and user engagement.
              </p>
              <div className="mt-6 flex items-center space-x-2 text-sm text-primary">
                <CheckCircle className="h-4 w-4" />
                <span>AI-powered optimization</span>
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
