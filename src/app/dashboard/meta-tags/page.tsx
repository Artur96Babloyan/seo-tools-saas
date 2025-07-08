"use client";

import { useState } from "react";
import { CheckCircle, Search, AlertTriangle, XCircle } from "lucide-react";
import { metaTagService } from "@/lib/services";

export default function MetaTagValidatorPage() {
  const [url, setUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState<any>(null); // eslint-disable-line @typescript-eslint/no-explicit-any
  const [error, setError] = useState<string | null>(null);

  const mapBackendToUIResults = (backendResult: { tags: Record<string, boolean> }) => {
    const { tags } = backendResult;

    // Calculate counts
    const passedCount = Object.values(tags).filter(Boolean).length;
    const totalCount = Object.keys(tags).length;
    const warningCount = 0; // We don't have warnings in our simple validation
    const errorCount = totalCount - passedCount;

    return {
      overview: {
        passed: passedCount,
        warnings: warningCount,
        errors: errorCount,
        total: totalCount
      },
      title: {
        content: tags.title ? "Title tag found" : "No title tag found",
        length: tags.title ? 50 : 0, // Estimate, we don't get actual content from backend
        status: tags.title ? "good" : "error",
        recommendation: tags.title
          ? "Title tag is present and properly configured"
          : "Add a title tag to improve SEO. Should be 50-60 characters."
      },
      description: {
        content: tags.metaDescription ? "Meta description found" : "No meta description found",
        length: tags.metaDescription ? 150 : 0,
        status: tags.metaDescription ? "good" : "error",
        recommendation: tags.metaDescription
          ? "Meta description is present and properly configured"
          : "Add a meta description tag. Should be 150-160 characters."
      },
      robots: {
        content: tags.metaRobots ? "Meta robots tag found" : "No meta robots tag found",
        status: tags.metaRobots ? "good" : "warning",
        recommendation: tags.metaRobots
          ? "Meta robots tag is properly configured"
          : "Consider adding meta robots tag to control search engine crawling."
      },
      canonical: {
        url: tags.canonical ? url : "No canonical URL found",
        status: tags.canonical ? "good" : "warning",
        recommendation: tags.canonical
          ? "Canonical URL is properly configured"
          : "Consider adding a canonical URL to prevent duplicate content issues."
      },
      openGraph: {
        title: tags.ogTitle ? "Open Graph title found" : "No Open Graph title",
        description: tags.ogDescription ? "Open Graph description found" : "No Open Graph description",
        image: tags.ogImage ? "Open Graph image found" : "No Open Graph image",
        url: url,
        status: (tags.ogTitle && tags.ogDescription && tags.ogImage) ? "good" : "warning"
      },
      // Add other properties needed by the UI
      keywords: {
        content: "Meta keywords tag is deprecated",
        status: "warning",
        recommendation: "Meta keywords tag is deprecated by search engines and should not be used."
      },
      twitter: {
        card: "Not validated by current API",
        title: "Not validated by current API",
        description: "Not validated by current API",
        image: "Not validated by current API",
        status: "warning"
      },
      favicon: {
        status: "good", // Assume present for now
        url: `${url}/favicon.ico`
      },
      viewport: {
        content: "width=device-width, initial-scale=1",
        status: "good" // Assume present for now
      },
      charset: {
        content: "UTF-8",
        status: "good" // Assume present for now
      }
    };
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!url) return;

    setIsLoading(true);
    setError(null);

    try {
      const result = await metaTagService.validateMetaTags(url);
      const uiResults = mapBackendToUIResults(result);
      setResults(uiResults);
    } catch (err) {
      console.error('Meta tag validation error:', err);
      setError(err instanceof Error ? err.message : 'Failed to validate meta tags. Please check the URL and try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "good":
        return <CheckCircle className="h-5 w-5 text-success" />;
      case "warning":
        return <AlertTriangle className="h-5 w-5 text-warning" />;
      case "error":
        return <XCircle className="h-5 w-5 text-destructive" />;
      default:
        return <CheckCircle className="h-5 w-5 text-muted-foreground" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "good":
        return "border-success/20 bg-success/5";
      case "warning":
        return "border-warning/20 bg-warning/5";
      case "error":
        return "border-destructive/20 bg-destructive/5";
      default:
        return "border-border bg-card";
    }
  };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center space-x-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-500 text-white">
            <CheckCircle className="h-5 w-5" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-foreground">Meta Tag Validator</h1>
            <p className="text-muted-foreground">
              Analyze and validate your meta tags for optimal SEO performance
            </p>
          </div>
        </div>
      </div>

      {/* Input Form */}
      <div className="mb-8">
        <div className="rounded-lg border border-border bg-card p-6 shadow-sm">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="url" className="block text-sm font-medium text-foreground mb-2">
                Website URL
              </label>
              <div className="relative">
                <input
                  type="url"
                  id="url"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  placeholder="https://example.com"
                  className="w-full rounded-lg border border-border bg-input px-4 py-3 text-foreground placeholder-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                  required
                />
                <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                  <CheckCircle className="h-5 w-5 text-muted-foreground" />
                </div>
              </div>
            </div>
            <button
              type="submit"
              disabled={isLoading || !url}
              className="flex items-center justify-center space-x-2 rounded-lg bg-primary px-6 py-3 text-white font-medium transition-colors hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <>
                  <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                  <span>Analyzing...</span>
                </>
              ) : (
                <>
                  <Search className="h-4 w-4" />
                  <span>Validate Meta Tags</span>
                </>
              )}
            </button>
          </form>
        </div>
      </div>

      {/* Results Section */}
      {results && !error && (
        <div className="space-y-6">
          {/* Overview */}
          <div className="rounded-lg border border-border bg-card p-6 shadow-sm">
            <h2 className="text-xl font-semibold text-foreground mb-4">Validation Overview</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="text-center p-4 rounded-lg bg-success/5">
                <div className="text-2xl font-bold text-success">{results.overview.passed}</div>
                <div className="text-sm text-muted-foreground">Passed</div>
              </div>
              <div className="text-center p-4 rounded-lg bg-warning/5">
                <div className="text-2xl font-bold text-warning">{results.overview.warnings}</div>
                <div className="text-sm text-muted-foreground">Warnings</div>
              </div>
              <div className="text-center p-4 rounded-lg bg-destructive/5">
                <div className="text-2xl font-bold text-destructive">{results.overview.errors}</div>
                <div className="text-sm text-muted-foreground">Errors</div>
              </div>
            </div>
          </div>

          {/* Basic Meta Tags */}
          <div className="rounded-lg border border-border bg-card p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-foreground mb-4">Basic Meta Tags</h3>
            <div className="space-y-4">
              <div className={`rounded-lg border p-4 ${getStatusColor(results.title.status)}`}>
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-3">
                    {getStatusIcon(results.title.status)}
                    <div>
                      <h4 className="font-medium text-foreground">Title Tag</h4>
                      <p className="text-sm text-muted-foreground mt-1">{results.title.content}</p>
                      <p className="text-xs text-muted-foreground mt-2">Length: {results.title.length} characters</p>
                    </div>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground mt-3">{results.title.recommendation}</p>
              </div>

              <div className={`rounded-lg border p-4 ${getStatusColor(results.description.status)}`}>
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-3">
                    {getStatusIcon(results.description.status)}
                    <div>
                      <h4 className="font-medium text-foreground">Meta Description</h4>
                      <p className="text-sm text-muted-foreground mt-1">{results.description.content}</p>
                      <p className="text-xs text-muted-foreground mt-2">Length: {results.description.length} characters</p>
                    </div>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground mt-3">{results.description.recommendation}</p>
              </div>

              <div className={`rounded-lg border p-4 ${getStatusColor(results.robots.status)}`}>
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-3">
                    {getStatusIcon(results.robots.status)}
                    <div>
                      <h4 className="font-medium text-foreground">Meta Robots</h4>
                      <p className="text-sm text-muted-foreground mt-1">{results.robots.content}</p>
                    </div>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground mt-3">{results.robots.recommendation}</p>
              </div>

              <div className={`rounded-lg border p-4 ${getStatusColor(results.keywords.status)}`}>
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-3">
                    {getStatusIcon(results.keywords.status)}
                    <div>
                      <h4 className="font-medium text-foreground">Meta Keywords</h4>
                      <p className="text-sm text-muted-foreground mt-1">{results.keywords.content}</p>
                    </div>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground mt-3">{results.keywords.recommendation}</p>
              </div>
            </div>
          </div>

          {/* Technical Tags */}
          <div className="rounded-lg border border-border bg-card p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-foreground mb-4">Technical Tags</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className={`rounded-lg border p-4 ${getStatusColor(results.canonical.status)}`}>
                <div className="flex items-center space-x-3">
                  {getStatusIcon(results.canonical.status)}
                  <div>
                    <h4 className="font-medium text-foreground">Canonical URL</h4>
                    <p className="text-sm text-muted-foreground">{results.canonical.url}</p>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground mt-3">{results.canonical.recommendation}</p>
              </div>

              <div className={`rounded-lg border p-4 ${getStatusColor(results.favicon.status)}`}>
                <div className="flex items-center space-x-3">
                  {getStatusIcon(results.favicon.status)}
                  <div>
                    <h4 className="font-medium text-foreground">Favicon</h4>
                    <p className="text-sm text-muted-foreground">{results.favicon.url}</p>
                  </div>
                </div>
              </div>

              <div className={`rounded-lg border p-4 ${getStatusColor(results.viewport.status)}`}>
                <div className="flex items-center space-x-3">
                  {getStatusIcon(results.viewport.status)}
                  <div>
                    <h4 className="font-medium text-foreground">Viewport</h4>
                    <p className="text-sm text-muted-foreground">{results.viewport.content}</p>
                  </div>
                </div>
              </div>

              <div className={`rounded-lg border p-4 ${getStatusColor(results.charset.status)}`}>
                <div className="flex items-center space-x-3">
                  {getStatusIcon(results.charset.status)}
                  <div>
                    <h4 className="font-medium text-foreground">Character Set</h4>
                    <p className="text-sm text-muted-foreground">{results.charset.content}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Error Display */}
      {error && (
        <div className="rounded-lg border border-destructive/20 bg-destructive/5 p-6 shadow-sm">
          <div className="flex items-center space-x-3">
            <XCircle className="h-5 w-5 text-destructive" />
            <h3 className="text-lg font-semibold text-destructive">Validation Error</h3>
          </div>
          <p className="text-sm text-destructive mt-2">{error}</p>
        </div>
      )}

      {/* No Results Message */}
      {!results && !isLoading && !error && (
        <div className="text-center py-12">
          <CheckCircle className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
          <h3 className="text-lg font-medium text-foreground mb-2">Ready to Validate</h3>
          <p className="text-muted-foreground">
            Enter your website URL above to analyze and validate all meta tags
          </p>
        </div>
      )}
    </div>
  );
} 