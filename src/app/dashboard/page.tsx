"use client";

import { useEffect, useState } from "react";
import { reportService, type ReportStatistics } from "@/lib/services";
import { useRouter, useSearchParams } from 'next/navigation';
import { useAuth } from '@/entities/user';
import Link from "next/link";
import { ArrowRight, BarChart3, CheckCircle, Globe, Zap, TrendingUp, Users, Wand2 } from "lucide-react";

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
  {
    name: "Competitor Analysis",
    description: "Analyze your competitors' SEO strategies, backlinks, and content",
    icon: Users,
    href: "/dashboard/competitor-analysis",
    color: "bg-orange-500",
  },
  {
    name: "AI Content Optimizer",
    description: "Optimize your content for better SEO with AI-powered suggestions",
    icon: Wand2,
    href: "/dashboard/seo-optimizer",
    color: "bg-pink-500",
  },
];

export default function DashboardPage() {
  const [stats, setStats] = useState<ReportStatistics | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isProcessingToken, setIsProcessingToken] = useState(false);
  const { isAuthenticated, isLoading: authLoading, handleOAuthToken } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const data = await reportService.getStatistics();
        setStats(data);
      } catch (error) {
        console.error('Failed to fetch stats:', error);
        // Use default values if stats fail to load
        setStats({
          totalReports: 0,
          totalWebsites: 0,
          averagePerformanceScore: 0,
          recentActivity: []
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchStats();
  }, []);

  // Handle OAuth token from URL
  useEffect(() => {
    const handleOAuthTokenFromURL = async () => {
      const oauthToken = searchParams.get('token');

      console.log('Dashboard OAuth check:', {
        hasToken: !!oauthToken,
        isAuthenticated,
        authLoading,
        tokenLength: oauthToken?.length
      });

      if (oauthToken && !isAuthenticated) {
        console.log('Processing OAuth token from URL');
        setIsProcessingToken(true);

        try {
          // Use the new handleOAuthToken method
          await handleOAuthToken(oauthToken);

          // Remove token from URL
          const newUrl = new URL(window.location.href);
          newUrl.searchParams.delete('token');
          window.history.replaceState({}, '', newUrl.toString());

          console.log('OAuth token processed successfully');
        } catch (error) {
          console.error('Error processing OAuth token:', error);
          // Redirect to login on error
          router.push('/auth/login');
        } finally {
          setIsProcessingToken(false);
        }
      }
    };

    if (!authLoading) {
      handleOAuthTokenFromURL();
    }
  }, [searchParams, isAuthenticated, authLoading, handleOAuthToken, router]);

  // Redirect if not authenticated
  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      router.push('/auth/login');
    }
  }, [isAuthenticated, authLoading, router]);

  // Show loading while processing token or loading auth
  if (authLoading || isProcessingToken) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-secondary to-accent flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">
            {isProcessingToken ? 'Processing authentication...' : 'Loading...'}
          </p>
        </div>
      </div>
    );
  }

  // Don't render if not authenticated
  if (!isAuthenticated) {
    return null;
  }

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
        <h2 className="mb-6 text-xl font-semibold text-foreground">AuditCraft Tools</h2>
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

      {/* Learn More - AI Content Optimizer */}
      <div className="mb-8 rounded-lg border border-border bg-gradient-to-r from-pink-500/5 to-purple-500/10 p-6">
        <div className="flex items-start space-x-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-pink-500 text-white">
            <Wand2 className="h-6 w-6" />
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-foreground">🎯 New: AI Content Optimizer</h3>
            <p className="mt-2 text-muted-foreground">
              Transform your content with AI-powered SEO optimization. Our advanced tool analyzes your text and provides
              intelligent suggestions to improve search engine rankings and user engagement.
            </p>
            <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <h4 className="font-medium text-foreground">✨ Key Features:</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• AI-powered content optimization</li>
                  <li>• Keyword density analysis</li>
                  <li>• Readability scoring</li>
                  <li>• SEO suggestions and recommendations</li>
                  <li>• URL-based content extraction</li>
                  <li>• Multiple export formats</li>
                </ul>
              </div>
              <div className="space-y-2">
                <h4 className="font-medium text-foreground">🚀 How It Works:</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Enter your content or extract from URL</li>
                  <li>• Set your focus keyword</li>
                  <li>• Get AI-optimized content instantly</li>
                  <li>• View detailed suggestions and scores</li>
                  <li>• Export in your preferred format</li>
                </ul>
              </div>
            </div>
            <div className="mt-6 flex flex-col sm:flex-row gap-3">
              <Link
                href="/dashboard/seo-optimizer"
                className="inline-flex items-center rounded-lg bg-pink-500 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-pink-600"
              >
                Try AI Content Optimizer
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
              <Link
                href="/dashboard/seo-optimizer/history"
                className="inline-flex items-center rounded-lg border border-border bg-card px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
              >
                View Optimization History
              </Link>
            </div>
          </div>
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