"use client";

import Link from "next/link";
import { ArrowRight, BarChart3, CheckCircle, Globe, Zap, TrendingUp } from "lucide-react";
import { useEffect, useState } from "react";
import { reportService, type ReportStatistics } from "@/lib/services";

const tools = [
  {
    name: "Sitemap Generator",
    description: "Generate XML and HTML sitemaps for better search engine indexing",
    icon: Globe,
    href: "/dashboard/sitemap",
    color: "bg-blue-500",
  },
  {
    name: "Meta Tag Validator",
    description: "Analyze and validate your meta tags for optimal SEO performance",
    icon: CheckCircle,
    href: "/dashboard/meta-tags",
    color: "bg-green-500",
  },
  {
    name: "Page Speed Auditor",
    description: "Comprehensive page speed analysis with actionable recommendations",
    icon: Zap,
    href: "/dashboard/page-speed",
    color: "bg-yellow-500",
  },
  {
    name: "Keyword Tracker",
    description: "Track your website's keyword rankings in Google search results",
    icon: TrendingUp,
    href: "/dashboard/keyword-tracker",
    color: "bg-purple-500",
  },
];

export default function DashboardPage() {
  const [stats, setStats] = useState<ReportStatistics | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const statistics = await reportService.getStatistics();
        setStats(statistics);
      } catch {
        // Error fetching statistics - will use default values
      } finally {
        setIsLoading(false);
      }
    };

    fetchStats();
  }, []);

  return (
    <div className="p-4 sm:p-6">
      {/* Header */}
      <div className="mb-6 sm:mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-foreground">SEO Dashboard</h1>
        <p className="mt-2 text-sm sm:text-base text-muted-foreground">
          Analyze and optimize your website&apos;s SEO performance with our comprehensive tools.
        </p>
      </div>

      {/* Quick Stats */}
      <div className="mb-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-lg border border-border bg-card p-6 shadow-sm">
          <div className="flex items-center">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
              <BarChart3 className="h-5 w-5" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-muted-foreground">Total Reports</p>
              <p className="text-2xl font-bold text-foreground">
                {isLoading ? (
                  <span className="inline-block h-8 w-12 animate-pulse bg-muted rounded" />
                ) : (
                  stats?.totalReports || 0
                )}
              </p>
            </div>
          </div>
        </div>
        <div className="rounded-lg border border-border bg-card p-6 shadow-sm">
          <div className="flex items-center">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-success/10 text-success">
              <Globe className="h-5 w-5" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-muted-foreground">Websites Analyzed</p>
              <p className="text-2xl font-bold text-foreground">
                {isLoading ? (
                  <span className="inline-block h-8 w-12 animate-pulse bg-muted rounded" />
                ) : (
                  stats?.totalWebsites || 0
                )}
              </p>
            </div>
          </div>
        </div>
        <div className="rounded-lg border border-border bg-card p-6 shadow-sm">
          <div className="flex items-center">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-warning/10 text-warning">
              <Zap className="h-5 w-5" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-muted-foreground">Avg Performance Score</p>
              <p className="text-2xl font-bold text-foreground">
                {isLoading ? (
                  <span className="inline-block h-8 w-12 animate-pulse bg-muted rounded" />
                ) : stats?.averagePerformanceScore ? (
                  Math.round(stats.averagePerformanceScore)
                ) : (
                  "--"
                )}
              </p>
            </div>
          </div>
        </div>
        <div className="rounded-lg border border-border bg-card p-6 shadow-sm">
          <div className="flex items-center">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-500/10 text-blue-500">
              <CheckCircle className="h-5 w-5" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-muted-foreground">Recent Activity</p>
              <p className="text-2xl font-bold text-foreground">
                {isLoading ? (
                  <span className="inline-block h-8 w-12 animate-pulse bg-muted rounded" />
                ) : stats?.recentActivity ? (
                  stats.recentActivity.reduce((sum, day) => sum + day.count, 0)
                ) : (
                  0
                )}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Tools Grid */}
      <div className="mb-8">
        <h2 className="mb-6 text-xl font-semibold text-foreground">SEO Tools</h2>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {tools.map((tool) => (
            <Link
              key={tool.name}
              href={tool.href}
              className="group rounded-lg border border-border bg-card p-6 shadow-sm transition-all hover:shadow-lg hover:border-primary/50"
            >
              <div className="flex items-start space-x-4">
                <div className={`flex h-12 w-12 items-center justify-center rounded-lg ${tool.color} text-white`}>
                  <tool.icon className="h-6 w-6" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-card-foreground group-hover:text-primary">
                    {tool.name}
                  </h3>
                  <p className="mt-2 text-sm text-muted-foreground">
                    {tool.description}
                  </p>
                  <div className="mt-4 flex items-center text-sm text-primary">
                    <span>Get started</span>
                    <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Getting Started */}
      <div className="rounded-lg border border-border bg-gradient-to-r from-primary/5 to-primary/10 p-6">
        <h3 className="text-lg font-semibold text-foreground">Getting Started</h3>
        <p className="mt-2 text-muted-foreground">
          Welcome to your SEO dashboard! Choose a tool from above to start analyzing your website.
          Each tool provides detailed insights and actionable recommendations to improve your SEO performance.
        </p>
        <div className="mt-4">
          <Link
            href="/dashboard/sitemap"
            className="inline-flex items-center rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-primary-dark"
          >
            Start with Sitemap Generator
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </div>
      </div>
    </div>
  );
} 