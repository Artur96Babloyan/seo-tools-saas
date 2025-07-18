"use client";

import Link from "next/link";
import { Search, FileText, BarChart3, MessageCircle, Video, ChevronRight, ArrowRight, Sparkles, Globe, Zap, TrendingUp, Users } from "lucide-react";
import { FooterWrapper } from "@/shared/ui/footer/FooterWrapper";
import { Header } from "@/components/Header";

export default function HelpCenterPage() {
  const helpCategories = [
    {
      title: "Getting Started",
      description: "Learn the basics and set up your account",
      icon: Sparkles,
      color: "bg-blue-500",
      articles: [
        { title: "How to create your first SEO audit", href: "/help/getting-started/first-audit" },
        { title: "Setting up your website profile", href: "/help/getting-started/setup-profile" },
        { title: "Understanding your dashboard", href: "/help/getting-started/dashboard-guide" },
        { title: "Account settings and preferences", href: "/help/getting-started/account-settings" }
      ]
    },
    {
      title: "AI Content Optimizer",
      description: "Master AI-powered content optimization",
      icon: FileText,
      color: "bg-green-500",
      articles: [
        { title: "How to optimize content with AI", href: "/help/ai-optimizer/optimize-content" },
        { title: "Understanding optimization scores", href: "/help/ai-optimizer/optimization-scores" },
        { title: "Best practices for content optimization", href: "/help/ai-optimizer/best-practices" },
        { title: "Troubleshooting optimization issues", href: "/help/ai-optimizer/troubleshooting" }
      ]
    },
    {
      title: "Sitemap Generator",
      description: "Create and manage your sitemaps",
      icon: Globe,
      color: "bg-purple-500",
      articles: [
        { title: "Generating your first sitemap", href: "/help/sitemap/generate-sitemap" },
        { title: "Customizing sitemap settings", href: "/help/sitemap/customize-settings" },
        { title: "Submitting sitemaps to search engines", href: "/help/sitemap/submit-sitemaps" },
        { title: "Sitemap validation and errors", href: "/help/sitemap/validation-errors" }
      ]
    },
    {
      title: "Meta Tag Validator",
      description: "Validate and optimize your meta tags",
      icon: FileText,
      color: "bg-purple-500",
      articles: [
        { title: "Understanding meta tags", href: "/help/meta-tags/understanding-meta-tags" },
        { title: "How to validate meta tags", href: "/help/meta-tags/validate-tags" },
        { title: "Fixing common meta tag issues", href: "/help/meta-tags/fix-issues" },
        { title: "Meta tag best practices", href: "/help/meta-tags/best-practices" }
      ]
    },
    {
      title: "Page Speed Auditor",
      description: "Analyze and improve page speed",
      icon: Zap,
      color: "bg-orange-500",
      articles: [
        { title: "Running your first speed test", href: "/help/page-speed/first-test" },
        { title: "Understanding speed metrics", href: "/help/page-speed/understanding-metrics" },
        { title: "Improving Core Web Vitals", href: "/help/page-speed/core-web-vitals" },
        { title: "Speed optimization recommendations", href: "/help/page-speed/optimization-tips" }
      ]
    },
    {
      title: "Keyword Tracker",
      description: "Track and analyze keyword performance",
      icon: TrendingUp,
      color: "bg-red-500",
      articles: [
        { title: "Setting up keyword tracking", href: "/help/keyword-tracker/setup-tracking" },
        { title: "Understanding ranking reports", href: "/help/keyword-tracker/ranking-reports" },
        { title: "Keyword research strategies", href: "/help/keyword-tracker/research-strategies" },
        { title: "Competitive keyword analysis", href: "/help/keyword-tracker/competitive-analysis" }
      ]
    },
    {
      title: "Competitor Analysis",
      description: "Analyze your competitors' SEO strategies",
      icon: Users,
      color: "bg-indigo-500",
      articles: [
        { title: "Adding competitors to track", href: "/help/competitor-analysis/add-competitors" },
        { title: "Understanding competitor reports", href: "/help/competitor-analysis/understanding-reports" },
        { title: "Backlink analysis strategies", href: "/help/competitor-analysis/backlink-analysis" },
        { title: "Competitive content analysis", href: "/help/competitor-analysis/content-analysis" }
      ]
    },
    {
      title: "Reports & Analytics",
      description: "Understand your data",
      icon: BarChart3,
      color: "bg-teal-500",
      articles: [
        { title: "Viewing your dashboard", href: "/help/reports/dashboard" },
        { title: "Understanding key metrics", href: "/help/reports/metrics" },
        { title: "Exporting data", href: "/help/reports/export" },
        { title: "Data privacy and security", href: "/help/reports/privacy" }
      ]
    }
  ];

  const popularArticles = [
    { title: "How to optimize content with AI", category: "AI Content Optimizer", href: "/help/ai-optimizer/optimize-content" },
    { title: "Understanding Core Web Vitals", category: "Page Speed Auditor", href: "/help/page-speed/core-web-vitals" },
    { title: "Setting up keyword tracking", category: "Keyword Tracker", href: "/help/keyword-tracker/setup-tracking" },
    { title: "Generating your first sitemap", category: "Sitemap Generator", href: "/help/sitemap/generate-sitemap" },
    { title: "Meta tag best practices", category: "Meta Tag Validator", href: "/help/meta-tags/best-practices" }
  ];

  const quickActions = [
    { title: "Getting Started", description: "Quick setup guide", icon: Sparkles, href: "/help/getting-started", color: "bg-blue-500" },
    { title: "Content Optimization", description: "AI-powered SEO tips", icon: FileText, href: "/help/content-optimization", color: "bg-green-500" },
    { title: "Technical SEO", description: "Meta tags & sitemaps", icon: Globe, href: "/help/technical-seo", color: "bg-purple-500" },
    { title: "Performance", description: "Page speed optimization", icon: Zap, href: "/help/performance", color: "bg-orange-500" },
    { title: "Keyword Research", description: "Track & analyze keywords", icon: TrendingUp, href: "/help/keyword-research", color: "bg-red-500" },
    { title: "Competitor Analysis", description: "Monitor competitors", icon: Users, href: "/help/competitor-analysis", color: "bg-indigo-500" },
    { title: "Reports & Analytics", description: "Understand your data", icon: BarChart3, href: "/help/reports", color: "bg-teal-500" },
    { title: "API Documentation", description: "Developer resources", icon: FileText, href: "/docs", color: "bg-purple-500" },
    { title: "System Status", description: "Check service health", icon: BarChart3, href: "/status", color: "bg-orange-500" }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header showAuthButtons={false} />

      {/* Hero Section */}
      <section className="py-16 sm:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-4xl text-center">
            <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
              How can we help you?
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-muted-foreground">
              Find answers to common questions, learn how to use our tools effectively, and get the most out of AuditCraft.
            </p>

            {/* Search Bar */}
            <div className="mt-10 max-w-2xl mx-auto">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search for help articles, tutorials, or guides..."
                  className="w-full pl-12 pr-4 py-4 border border-border rounded-xl bg-card text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Actions */}
      <section className="py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {quickActions.map((action, index) => (
              <Link
                key={index}
                href={action.href}
                className="group p-6 rounded-xl border border-border bg-card hover:border-primary/50 hover:shadow-lg transition-all"
              >
                <div className="flex items-start space-x-4">
                  <div className={`flex h-12 w-12 items-center justify-center rounded-lg ${action.color} text-white`}>
                    <action.icon className="h-6 w-6" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-card-foreground group-hover:text-primary">
                      {action.title}
                    </h3>
                    <p className="mt-2 text-sm text-muted-foreground">
                      {action.description}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Articles */}
      <section className="py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-foreground">Popular Articles</h2>
            <p className="mt-2 text-muted-foreground">Most frequently viewed help articles</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {popularArticles.map((article, index) => (
              <Link
                key={index}
                href={article.href}
                className="group p-6 rounded-xl border border-border bg-card hover:border-primary/50 hover:shadow-lg transition-all"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="font-semibold text-card-foreground group-hover:text-primary">
                      {article.title}
                    </h3>
                    <p className="mt-2 text-sm text-muted-foreground">
                      {article.category}
                    </p>
                  </div>
                  <ChevronRight className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Help Categories */}
      <section className="py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-foreground">Browse by Category</h2>
            <p className="mt-2 text-muted-foreground">Find help organized by topic and feature</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {helpCategories.map((category, index) => (
              <div key={index} className="rounded-xl border border-border bg-card p-6 hover:shadow-lg transition-all">
                <div className="flex items-start space-x-4 mb-4">
                  <div className={`flex h-12 w-12 items-center justify-center rounded-lg ${category.color} text-white`}>
                    <category.icon className="h-6 w-6" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-card-foreground">
                      {category.title}
                    </h3>
                    <p className="mt-1 text-sm text-muted-foreground">
                      {category.description}
                    </p>
                  </div>
                </div>

                <ul className="space-y-2">
                  {category.articles.map((article, articleIndex) => (
                    <li key={articleIndex}>
                      <Link
                        href={article.href}
                        className="flex items-center justify-between text-sm text-muted-foreground hover:text-foreground transition-colors"
                      >
                        <span>{article.title}</span>
                        <ChevronRight className="h-4 w-4" />
                      </Link>
                    </li>
                  ))}
                </ul>

                <div className="mt-4 pt-4 border-t border-border">
                  <Link
                    href={`/help/category/${category.title.toLowerCase().replace(/\s+/g, '-')}`}
                    className="flex items-center text-sm font-medium text-primary hover:text-primary/80 transition-colors"
                  >
                    View all {category.title} articles
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Support CTA */}
      <section className="py-16 bg-primary/5">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-foreground">
              Still need help?
            </h2>
            <p className="mt-6 text-lg leading-8 text-muted-foreground">
              Can&apos;t find what you&apos;re looking for? Our support team is here to help you get the most out of AuditCraft.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/contact"
                className="flex items-center justify-center space-x-2 rounded-xl bg-primary px-8 py-4 text-lg font-semibold text-white shadow-lg transition-all hover:bg-primary-dark hover:shadow-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
              >
                <MessageCircle className="h-5 w-5" />
                <span>Contact Support</span>
              </Link>
              <Link
                href="/help/tutorials"
                className="flex items-center justify-center space-x-2 rounded-xl border border-border bg-card px-8 py-4 text-lg font-semibold text-foreground shadow-sm transition-all hover:bg-accent hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
              >
                <Video className="h-5 w-5" />
                <span>Watch Tutorials</span>
              </Link>
            </div>
          </div>
        </div>
      </section>
      <FooterWrapper />
    </div>
  );
} 