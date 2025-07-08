"use client";

import { useState } from "react";
import { Zap, Search, Clock, Image, Wifi, AlertCircle, CheckCircle, Save } from "lucide-react";
import { seoService, reportService, type SeoAnalysis } from "@/lib/services";
import { ApiError } from "@/lib/api";

export default function PageSpeedAuditorPage() {
  const [url, setUrl] = useState("");
  const [strategy, setStrategy] = useState<'desktop' | 'mobile'>('desktop');
  const [categories, setCategories] = useState<string[]>(['performance', 'seo', 'accessibility', 'best-practices']);
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState<SeoAnalysis | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'saved' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!url) return;

    setIsLoading(true);
    setError(null);
    setResults(null);
    setSaveStatus('idle');

    try {
      const analysis = await seoService.analyzeWebsite(url, {
        strategy,
        categories,
      });
      setResults(analysis);
    } catch (err) {
      if (err instanceof ApiError) {
        setError(err.message);
      } else {
        setError('An unexpected error occurred while analyzing the website.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleSaveReport = async () => {
    if (!results || !url) return;

    setSaveStatus('saving');
    try {
      await reportService.saveReport(url, results);
      setSaveStatus('saved');
      setTimeout(() => setSaveStatus('idle'), 3000);
    } catch (err) {
      console.error('Failed to save report:', err);
      setSaveStatus('error');
      setTimeout(() => setSaveStatus('idle'), 3000);
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 90) return "text-success";
    if (score >= 50) return "text-warning";
    return "text-destructive";
  };

  const getScoreBg = (score: number) => {
    if (score >= 90) return "bg-success/10 border-success/20";
    if (score >= 50) return "bg-warning/10 border-warning/20";
    return "bg-destructive/10 border-destructive/20";
  };

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case "high":
        return "bg-destructive text-destructive-foreground";
      case "medium":
        return "bg-warning text-warning-foreground";
      case "low":
        return "bg-success text-success-foreground";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center space-x-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-yellow-500 text-white">
            <Zap className="h-5 w-5" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-foreground">Page Speed Auditor</h1>
            <p className="text-muted-foreground">
              Comprehensive page speed analysis with actionable recommendations
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
                  <Zap className="h-5 w-5 text-muted-foreground" />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Strategy Selection */}
              <div>
                <label htmlFor="strategy" className="block text-sm font-medium text-foreground mb-2">
                  Device Strategy
                </label>
                <select
                  id="strategy"
                  value={strategy}
                  onChange={(e) => setStrategy(e.target.value as 'desktop' | 'mobile')}
                  className="w-full rounded-lg border border-border bg-input px-4 py-3 text-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                >
                  <option value="desktop">Desktop</option>
                  <option value="mobile">Mobile</option>
                </select>
              </div>

              {/* Categories Selection */}
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Analysis Categories
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { value: 'performance', label: 'Performance' },
                    { value: 'seo', label: 'SEO' },
                    { value: 'accessibility', label: 'Accessibility' },
                    { value: 'best-practices', label: 'Best Practices' },
                  ].map((category) => (
                    <label key={category.value} className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={categories.includes(category.value)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setCategories([...categories, category.value]);
                          } else {
                            setCategories(categories.filter(c => c !== category.value));
                          }
                        }}
                        className="rounded border-border focus:ring-primary"
                      />
                      <span className="text-sm text-foreground">{category.label}</span>
                    </label>
                  ))}
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
                  <span>Audit Page Speed</span>
                </>
              )}
            </button>
          </form>
        </div>
      </div>

      {/* Error Display */}
      {error && (
        <div className="mb-8">
          <div className="rounded-lg border border-red-200 bg-red-50 dark:border-red-800 dark:bg-red-950/50 p-4">
            <div className="flex items-center space-x-2">
              <AlertCircle className="h-5 w-5 text-red-600 dark:text-red-400" />
              <h3 className="text-sm font-medium text-red-800 dark:text-red-200">Analysis Failed</h3>
            </div>
            <p className="mt-2 text-sm text-red-700 dark:text-red-300">{error}</p>
          </div>
        </div>
      )}

      {/* Results Section */}
      {results && results.performance && (
        <div className="space-y-6">
          {/* Overall Scores */}
          <div className="rounded-lg border border-border bg-card p-6 shadow-sm">
            <h2 className="text-xl font-semibold text-foreground mb-6">Analysis Scores</h2>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="text-center">
                <div className={`mx-auto w-20 h-20 rounded-full border-4 ${getScoreBg(results.performance?.score || 0)} flex items-center justify-center mb-3`}>
                  <div className={`text-lg font-bold ${getScoreColor(results.performance?.score || 0)}`}>
                    {results.performance?.score || 0}
                  </div>
                </div>
                <div className="text-sm font-medium text-foreground">Performance</div>
              </div>
              <div className="text-center">
                <div className={`mx-auto w-20 h-20 rounded-full border-4 ${getScoreBg(results.seo?.score || 0)} flex items-center justify-center mb-3`}>
                  <div className={`text-lg font-bold ${getScoreColor(results.seo?.score || 0)}`}>
                    {results.seo?.score || 0}
                  </div>
                </div>
                <div className="text-sm font-medium text-foreground">SEO</div>
              </div>
              <div className="text-center">
                <div className={`mx-auto w-20 h-20 rounded-full border-4 ${getScoreBg(results.accessibility?.score || 0)} flex items-center justify-center mb-3`}>
                  <div className={`text-lg font-bold ${getScoreColor(results.accessibility?.score || 0)}`}>
                    {results.accessibility?.score || 0}
                  </div>
                </div>
                <div className="text-sm font-medium text-foreground">Accessibility</div>
              </div>
              <div className="text-center">
                <div className={`mx-auto w-20 h-20 rounded-full border-4 ${getScoreBg(results.bestPractices?.score || 0)} flex items-center justify-center mb-3`}>
                  <div className={`text-lg font-bold ${getScoreColor(results.bestPractices?.score || 0)}`}>
                    {results.bestPractices?.score || 0}
                  </div>
                </div>
                <div className="text-sm font-medium text-foreground">Best Practices</div>
              </div>
            </div>
          </div>

          {/* Core Web Vitals */}
          <div className="rounded-lg border border-border bg-card p-6 shadow-sm">
            <h2 className="text-xl font-semibold text-foreground mb-6">Core Web Vitals</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="flex justify-between items-center p-3 rounded-lg bg-muted/50">
                <div className="flex items-center space-x-2">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm font-medium">Load Time</span>
                </div>
                <span className="text-sm font-semibold">{results.performance?.loadTime || '--'}s</span>
              </div>
              <div className="flex justify-between items-center p-3 rounded-lg bg-muted/50">
                <div className="flex items-center space-x-2">
                  <Zap className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm font-medium">First Contentful Paint</span>
                </div>
                <span className="text-sm font-semibold">{results.performance?.firstContentfulPaint || '--'}s</span>
              </div>
              <div className="flex justify-between items-center p-3 rounded-lg bg-muted/50">
                <div className="flex items-center space-x-2">
                  <Image className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm font-medium">Largest Contentful Paint</span>
                </div>
                <span className="text-sm font-semibold">{results.performance?.largestContentfulPaint || '--'}s</span>
              </div>
              <div className="flex justify-between items-center p-3 rounded-lg bg-muted/50">
                <div className="flex items-center space-x-2">
                  <Wifi className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm font-medium">First Input Delay</span>
                </div>
                <span className="text-sm font-semibold">{results.performance?.firstInputDelay || '--'}ms</span>
              </div>
            </div>
          </div>

          {/* Summary */}
          {results.summary && (
            <div className="rounded-lg border border-border bg-card p-6 shadow-sm">
              <h2 className="text-xl font-semibold text-foreground mb-6">Summary</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="text-center p-4 rounded-lg bg-muted/50">
                  <div className="text-2xl font-bold text-foreground">{results.summary.averageScore}</div>
                  <div className="text-sm text-muted-foreground">Average Score</div>
                </div>
                <div className="text-center p-4 rounded-lg bg-muted/50">
                  <div className="text-2xl font-bold text-foreground capitalize">{results.summary.status}</div>
                  <div className="text-sm text-muted-foreground">Status</div>
                </div>
                <div className="text-center p-4 rounded-lg bg-muted/50">
                  <div className="text-2xl font-bold text-foreground">{results.summary.totalIssues}</div>
                  <div className="text-sm text-muted-foreground">Total Issues</div>
                </div>
                <div className="text-center p-4 rounded-lg bg-muted/50">
                  <div className="text-2xl font-bold text-destructive">{results.summary.criticalIssues}</div>
                  <div className="text-sm text-muted-foreground">Critical Issues</div>
                </div>
              </div>
            </div>
          )}

          {/* Recommendations */}
          {results.recommendations && results.recommendations.length > 0 && (
            <div className="rounded-lg border border-border bg-card p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-foreground mb-4">Recommendations</h3>
              <div className="space-y-4">
                {results.recommendations.map((recommendation, index: number) => (
                  <div key={index} className="rounded-lg border border-border p-4 hover:bg-muted/50 transition-colors">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          <h4 className="font-medium text-foreground">{recommendation.title}</h4>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getImpactColor(recommendation.impact)}`}>
                            {recommendation.priority}
                          </span>
                        </div>
                        <p className="text-sm text-muted-foreground">{recommendation.description}</p>
                        <div className="text-xs text-muted-foreground mt-1">Category: {recommendation.category}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Save Report Section */}
          <div className="rounded-lg border border-border bg-card p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-foreground">Save Report</h3>
                <p className="text-sm text-muted-foreground">Save this analysis to your reports for future reference</p>
              </div>
              <button
                onClick={handleSaveReport}
                disabled={saveStatus === 'saving'}
                className="flex items-center space-x-2 rounded-lg bg-primary px-4 py-2 text-white font-medium transition-colors hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {saveStatus === 'saving' ? (
                  <>
                    <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                    <span>Saving...</span>
                  </>
                ) : saveStatus === 'saved' ? (
                  <>
                    <CheckCircle className="h-4 w-4" />
                    <span>Saved!</span>
                  </>
                ) : saveStatus === 'error' ? (
                  <>
                    <AlertCircle className="h-4 w-4" />
                    <span>Error</span>
                  </>
                ) : (
                  <>
                    <Save className="h-4 w-4" />
                    <span>Save Report</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Opportunities */}
          <div className="rounded-lg border border-border bg-card p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-foreground mb-4">Opportunities</h3>
            <div className="space-y-4">
              {(results.opportunities || []).length > 0 ? (
                (results.opportunities || []).map((opportunity, index: number) => (
                  <div key={index} className="rounded-lg border border-border p-4 hover:bg-muted/50 transition-colors">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          <h4 className="font-medium text-foreground">{opportunity.title}</h4>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getImpactColor(opportunity.impact)}`}>
                            {opportunity.impact}
                          </span>
                        </div>
                        <p className="text-sm text-muted-foreground">{opportunity.description}</p>
                      </div>
                      <div className="text-right ml-4">
                        <div className="text-sm font-semibold text-success">Save {opportunity.savings}</div>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  <p>No optimization opportunities found.</p>
                </div>
              )}
            </div>
          </div>

          {/* Diagnostics */}
          <div className="rounded-lg border border-border bg-card p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-foreground mb-4">Diagnostics</h3>
            <div className="space-y-4">
              {(results.diagnostics || []).map((diagnostic, index: number) => (
                <div key={index} className="rounded-lg border border-border p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h4 className="font-medium text-foreground mb-2">{diagnostic.title}</h4>
                      <p className="text-sm text-muted-foreground">{diagnostic.description}</p>
                    </div>
                    <div className="text-right ml-4">
                      <div className="text-sm font-semibold text-warning">{diagnostic.value}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Resource Breakdown */}
          <div className="rounded-lg border border-border bg-card p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-foreground mb-4">Resource Breakdown</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              <div className="text-center p-4 rounded-lg bg-primary/5">
                <div className="text-lg font-bold text-primary">{results.resources?.requests || '--'}</div>
                <div className="text-sm text-muted-foreground">Requests</div>
              </div>
              <div className="text-center p-4 rounded-lg bg-muted/50">
                <div className="text-lg font-bold text-foreground">{results.resources?.totalSize || '--'}</div>
                <div className="text-sm text-muted-foreground">Total Size</div>
              </div>
              <div className="text-center p-4 rounded-lg bg-blue-50 dark:bg-blue-950/30">
                <div className="text-lg font-bold text-blue-600">{results.resources?.images || '--'}</div>
                <div className="text-sm text-muted-foreground">Images</div>
              </div>
              <div className="text-center p-4 rounded-lg bg-green-50 dark:bg-green-950/30">
                <div className="text-lg font-bold text-green-600">{results.resources?.scripts || '--'}</div>
                <div className="text-sm text-muted-foreground">Scripts</div>
              </div>
              <div className="text-center p-4 rounded-lg bg-purple-50 dark:bg-purple-950/30">
                <div className="text-lg font-bold text-purple-600">{results.resources?.styles || '--'}</div>
                <div className="text-sm text-muted-foreground">Styles</div>
              </div>
              <div className="text-center p-4 rounded-lg bg-orange-50 dark:bg-orange-950/30">
                <div className="text-lg font-bold text-orange-600">{results.resources?.fonts || '--'}</div>
                <div className="text-sm text-muted-foreground">Fonts</div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* No Results Message */}
      {!results && !isLoading && (
        <div className="text-center py-12">
          <Zap className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
          <h3 className="text-lg font-medium text-foreground mb-2">Ready to Audit</h3>
          <p className="text-muted-foreground">
            Enter your website URL above to get detailed performance insights and recommendations
          </p>
        </div>
      )}
    </div>
  );
} 