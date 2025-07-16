"use client";

import { useState } from "react";
import { CheckCircle, Search, AlertTriangle, XCircle, Copy, Check } from "lucide-react";
import { metaTagService, type MetaTagValidationResult } from "@/lib/services";


export default function MetaTagValidatorPage() {
  const [url, setUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState<MetaTagValidationResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [copiedStates, setCopiedStates] = useState<{ [key: string]: boolean }>({});

  const copyToClipboard = async (text: string, key: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedStates(prev => ({ ...prev, [key]: true }));

      // Reset the copied state after 2 seconds
      setTimeout(() => {
        setCopiedStates(prev => ({ ...prev, [key]: false }));
      }, 2000);
    } catch {
      // Fallback for older browsers
      const textArea = document.createElement('textarea');
      textArea.value = text;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);

      setCopiedStates(prev => ({ ...prev, [key]: true }));
      setTimeout(() => {
        setCopiedStates(prev => ({ ...prev, [key]: false }));
      }, 2000);
    }
  };

  // Helper function to normalize URL
  const normalizeUrl = (url: string): string => {
    let normalized = url.trim();

    // Add https:// if no protocol is specified
    if (!normalized.match(/^https?:\/\//)) {
      normalized = `https://${normalized}`;
    }

    return normalized;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!url) return;

    setIsLoading(true);
    setError(null);

    try {
      const normalizedUrl = normalizeUrl(url);
      const result = await metaTagService.validateMetaTags(normalizedUrl);
      setResults(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to validate meta tags. Please check the URL and try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      if (url) {
        handleSubmit(e as unknown as React.FormEvent);
      }
    }
  };

  const getStatusIcon = (exists: boolean, issues: string[] = []) => {
    if (!exists) return <XCircle className="h-5 w-5 text-destructive" />;
    if (issues.length > 0) return <AlertTriangle className="h-5 w-5 text-warning" />;
    return <CheckCircle className="h-5 w-5 text-success" />;
  };

  const getStatusColor = (exists: boolean, issues: string[] = []) => {
    if (!exists) return "border-destructive/20 bg-destructive/5";
    if (issues.length > 0) return "border-warning/20 bg-warning/5";
    return "border-success/20 bg-success/5";
  };

  return (
    <div className="p-4 sm:p-6">
      {/* Header */}
      <div className="mb-6 sm:mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center space-y-3 sm:space-y-0 sm:space-x-3">
          <div className="flex items-center space-x-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-500 text-white">
              <CheckCircle className="h-5 w-5" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-foreground">Meta Tag Validator</h1>
            </div>
          </div>
          <div className="sm:ml-auto">
            <p className="text-sm text-muted-foreground">
              Professional meta tag analysis & recommendations
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
                  onKeyDown={handleKeyDown}
                  placeholder="example.com or https://example.com"
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
                <div className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
              ) : (
                <Search className="h-5 w-5" />
              )}
              <span>{isLoading ? 'Analyzing...' : 'Analyze Meta Tags'}</span>
            </button>
          </form>
        </div>
      </div>

      {/* Results Display */}
      {results && (
        <div className="space-y-6">
          {/* Summary Overview */}
          <div className="rounded-lg border border-border bg-card p-4 sm:p-6 shadow-sm">
            <h2 className="text-xl sm:text-2xl font-semibold text-foreground mb-4">Analysis Summary</h2>
            <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="text-center p-3 sm:p-4 rounded-lg bg-success/5">
                <div className="text-xl sm:text-2xl font-bold text-success">{results.summary.foundTags}</div>
                <div className="text-xs sm:text-sm text-muted-foreground">Found Tags</div>
              </div>
              <div className="text-center p-3 sm:p-4 rounded-lg bg-destructive/5">
                <div className="text-xl sm:text-2xl font-bold text-destructive">{results.summary.criticalIssues}</div>
                <div className="text-xs sm:text-sm text-muted-foreground">Critical Issues</div>
              </div>
              <div className="text-center p-3 sm:p-4 rounded-lg bg-warning/5">
                <div className="text-xl sm:text-2xl font-bold text-warning">{results.summary.warnings}</div>
                <div className="text-xs sm:text-sm text-muted-foreground">Warnings</div>
              </div>
              <div className="text-center p-3 sm:p-4 rounded-lg bg-blue-50 dark:bg-blue-950/20">
                <div className="text-xl sm:text-2xl font-bold text-blue-600 dark:text-blue-400">{results.summary.recommendations}</div>
                <div className="text-xs sm:text-sm text-muted-foreground">Recommendations</div>
              </div>
            </div>
          </div>

          {/* All Recommendations Section */}
          {results.summary.recommendations > 0 && (
            <div className="rounded-lg border border-blue-200 bg-blue-50 dark:border-blue-800 dark:bg-blue-950/20 p-4 sm:p-6 shadow-sm">
              <h2 className="text-lg sm:text-xl font-semibold text-blue-900 dark:text-blue-100 mb-4 flex items-center gap-2">
                <CheckCircle className="h-4 w-4 sm:h-5 sm:w-5 flex-shrink-0" />
                <span className="break-words">💡 All Recommendations ({results.summary.recommendations})</span>
              </h2>
              <div className="mb-4 p-3 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                <p className="text-sm text-blue-800 dark:text-blue-200">
                  <strong>SEO Optimization Tips:</strong> These recommendations will help improve your search rankings and user experience.
                </p>
              </div>
              <div className="grid grid-cols-1 gap-4">
                {Object.entries(results.tags).map(([tagName, tagData]) =>
                  tagData.recommendations && tagData.recommendations.length > 0 && (
                    <div key={tagName} className="bg-white dark:bg-slate-800 rounded-lg p-4 border border-blue-200 dark:border-blue-800">
                      <h4 className="font-medium text-blue-900 dark:text-blue-100 mb-2 capitalize break-words">
                        {tagName.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                      </h4>
                      <div className="space-y-2">
                        {tagData.recommendations.map((rec, index) => (
                          <div key={index} className="flex items-start gap-2">
                            <div className="flex-shrink-0 w-5 h-5 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mt-0.5">
                              <span className="text-blue-600 dark:text-blue-400 text-xs font-medium">
                                {index + 1}
                              </span>
                            </div>
                            <p className="text-sm text-blue-800 dark:text-blue-200 leading-relaxed break-words">
                              {rec}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )
                )}
              </div>
            </div>
          )}

          {/* Critical Issues */}
          {results.summary.criticalIssues > 0 && (
            <div className="rounded-lg border border-destructive/20 bg-destructive/5 p-4 sm:p-6 shadow-sm">
              <h2 className="text-lg sm:text-xl font-semibold text-destructive mb-4 flex items-center gap-2">
                <XCircle className="h-4 w-4 sm:h-5 sm:w-5 flex-shrink-0" />
                <span className="break-words">Critical Issues Found ({results.summary.criticalIssues})</span>
              </h2>
              <div className="space-y-3">
                {!results.tags.title.exists && (
                  <div className="flex items-start gap-3 p-3 bg-white dark:bg-slate-800 rounded-lg border border-destructive/20">
                    <XCircle className="h-4 w-4 text-destructive mt-0.5 flex-shrink-0" />
                    <div className="min-w-0 flex-1">
                      <div className="font-medium text-destructive break-words">Missing Title Tag</div>
                      <div className="text-sm text-muted-foreground mt-1 break-words">
                        {results.tags.title.issues?.[0] || 'Critical for SEO rankings and search results'}
                      </div>
                    </div>
                  </div>
                )}
                {!results.tags.metaDescription.exists && (
                  <div className="flex items-start gap-3 p-3 bg-white dark:bg-slate-800 rounded-lg border border-destructive/20">
                    <XCircle className="h-4 w-4 text-destructive mt-0.5 flex-shrink-0" />
                    <div className="min-w-0 flex-1">
                      <div className="font-medium text-destructive break-words">Missing Meta Description</div>
                      <div className="text-sm text-muted-foreground mt-1 break-words">
                        {results.tags.metaDescription.issues?.[0] || 'Impacts click-through rates in search results'}
                      </div>
                    </div>
                  </div>
                )}
                {!results.tags.canonical.exists && (
                  <div className="flex items-start gap-3 p-3 bg-white dark:bg-slate-800 rounded-lg border border-destructive/20">
                    <XCircle className="h-4 w-4 text-destructive mt-0.5 flex-shrink-0" />
                    <div className="min-w-0 flex-1">
                      <div className="font-medium text-destructive break-words">Missing Canonical URL</div>
                      <div className="text-sm text-muted-foreground mt-1 break-words">
                        {results.tags.canonical.issues?.[0] || 'Important for preventing duplicate content issues'}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Quick Fixes Section */}
          {results.summary.criticalIssues > 0 && (
            <div className="rounded-lg border border-blue-200 bg-blue-50 dark:border-blue-800 dark:bg-blue-950/20 p-4 sm:p-6 shadow-sm">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
                <h2 className="text-lg sm:text-xl font-semibold text-blue-900 dark:text-blue-100 flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 sm:h-5 sm:w-5 flex-shrink-0" />
                  <span className="break-words">🚀 Quick Fixes - Copy & Paste HTML Code</span>
                </h2>
                <button
                  onClick={() => {
                    const allMissingTags = [];

                    if (!results.tags.title.exists) {
                      allMissingTags.push('<title>Your Page Title - Include Main Keywords (50-60 chars)</title>');
                    }
                    if (!results.tags.metaDescription.exists) {
                      allMissingTags.push('<meta name="description" content="Compelling description that includes main keywords and encourages clicks (150-160 characters)">');
                    }
                    if (!results.tags.canonical.exists) {
                      allMissingTags.push(`<link rel="canonical" href="${url}">`);
                    }
                    if (!results.tags.metaRobots.exists) {
                      allMissingTags.push('<meta name="robots" content="index, follow">');
                    }
                    if (!results.tags.ogTitle.exists) {
                      allMissingTags.push('<meta property="og:title" content="Your Page Title - Same as title tag">');
                    }
                    if (!results.tags.ogDescription.exists) {
                      allMissingTags.push('<meta property="og:description" content="Engaging description for social media sharing">');
                    }
                    if (!results.tags.ogImage.exists) {
                      allMissingTags.push('<meta property="og:image" content="https://yoursite.com/social-image.jpg">');
                    }
                    allMissingTags.push(`<meta property="og:url" content="${url}">`);

                    const allTagsCode = allMissingTags.join('\n');
                    copyToClipboard(allTagsCode, 'all-tags');
                  }}
                  className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition-colors cursor-pointer w-full sm:w-auto justify-center"
                  title="Copy all missing tags at once"
                >
                  {copiedStates['all-tags'] ? (
                    <>
                      <Check className="h-4 w-4 flex-shrink-0" />
                      <span>Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="h-4 w-4 flex-shrink-0" />
                      <span>Copy All Tags</span>
                    </>
                  )}
                </button>
              </div>

              <div className="mb-4 p-3 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                <p className="text-sm text-blue-800 dark:text-blue-200">
                  💡 <strong>How to use:</strong> Copy each code snippet below and paste it inside the <code>&lt;head&gt;</code> section of your HTML document. Each fix addresses a specific SEO issue found on your page.
                </p>
              </div>

              <div className="space-y-6">
                {!results.tags.title.exists && (
                  <div className="bg-white dark:bg-slate-800 rounded-lg p-4 border border-red-200 dark:border-red-800">
                    <div className="flex items-start gap-3 mb-3">
                      <div className="flex-shrink-0 w-8 h-8 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center">
                        <span className="text-red-600 dark:text-red-400 font-semibold text-sm">1</span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-red-700 dark:text-red-300 mb-1 break-words">🚨 CRITICAL: Missing Title Tag</h3>
                        <p className="text-sm text-red-600 dark:text-red-400 mb-2 break-words">
                          {results.tags.title.recommendations?.[0] || 'Add a unique, descriptive title tag for SEO'}
                        </p>
                      </div>
                    </div>
                    <div className="bg-slate-50 dark:bg-slate-700 p-3 rounded border relative">
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-2">
                        <div className="text-xs text-slate-600 dark:text-slate-400 font-medium">📋 COPY THIS CODE:</div>
                        <button
                          onClick={() => copyToClipboard('<title>Your Page Title - Include Main Keywords (50-60 chars)</title>', 'title-code')}
                          className={`flex items-center gap-1 px-3 py-2 text-xs rounded transition-all cursor-pointer w-full sm:w-auto justify-center ${copiedStates['title-code']
                            ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300'
                            : 'bg-blue-100 hover:bg-blue-200 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300 dark:hover:bg-blue-800/30'
                            }`}
                          title="Copy code"
                        >
                          {copiedStates['title-code'] ? (
                            <>
                              <Check className="h-3 w-3 flex-shrink-0" />
                              <span>Copied!</span>
                            </>
                          ) : (
                            <>
                              <Copy className="h-3 w-3 flex-shrink-0" />
                              <span>Copy</span>
                            </>
                          )}
                        </button>
                      </div>
                      <div className="overflow-x-auto">
                        <code className="block text-xs sm:text-sm font-mono text-slate-800 dark:text-slate-200 whitespace-nowrap">
                          {'<title>Your Page Title - Include Main Keywords (50-60 chars)</title>'}
                        </code>
                      </div>
                    </div>
                    <div className="mt-2 text-xs text-slate-600 dark:text-slate-400">
                      ✅ <strong>Where to paste:</strong> Between <code>&lt;head&gt;</code> and <code>&lt;/head&gt;</code> tags
                    </div>
                  </div>
                )}

                {!results.tags.metaDescription.exists && (
                  <div className="bg-white dark:bg-slate-800 rounded-lg p-4 border border-red-200 dark:border-red-800">
                    <div className="flex items-start gap-3 mb-3">
                      <div className="flex-shrink-0 w-8 h-8 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center">
                        <span className="text-red-600 dark:text-red-400 font-semibold text-sm">2</span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-red-700 dark:text-red-300 mb-1 break-words">🚨 CRITICAL: Missing Meta Description</h3>
                        <p className="text-sm text-red-600 dark:text-red-400 mb-2 break-words">
                          {results.tags.metaDescription.recommendations?.[0] || 'Add a compelling meta description to improve click-through rates'}
                        </p>
                      </div>
                    </div>
                    <div className="bg-slate-50 dark:bg-slate-700 p-3 rounded border relative">
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-2">
                        <div className="text-xs text-slate-600 dark:text-slate-400 font-medium">📋 COPY THIS CODE:</div>
                        <button
                          onClick={() => copyToClipboard('<meta name="description" content="Compelling description that includes main keywords and encourages clicks (150-160 characters)">', 'meta-description-code')}
                          className={`flex items-center gap-1 px-3 py-2 text-xs rounded transition-all cursor-pointer w-full sm:w-auto justify-center ${copiedStates['meta-description-code']
                            ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300'
                            : 'bg-blue-100 hover:bg-blue-200 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300 dark:hover:bg-blue-800/30'
                            }`}
                          title="Copy code"
                        >
                          {copiedStates['meta-description-code'] ? (
                            <>
                              <Check className="h-3 w-3 flex-shrink-0" />
                              <span>Copied!</span>
                            </>
                          ) : (
                            <>
                              <Copy className="h-3 w-3 flex-shrink-0" />
                              <span>Copy</span>
                            </>
                          )}
                        </button>
                      </div>
                      <div className="overflow-x-auto">
                        <code className="block text-xs sm:text-sm font-mono text-slate-800 dark:text-slate-200 whitespace-nowrap">
                          {'<meta name="description" content="Compelling description that includes main keywords and encourages clicks (150-160 characters)">'}
                        </code>
                      </div>
                    </div>
                    <div className="mt-2 text-xs text-slate-600 dark:text-slate-400">
                      ✅ <strong>Where to paste:</strong> Inside <code>&lt;head&gt;</code> section, after the title tag
                    </div>
                  </div>
                )}

                {!results.tags.canonical.exists && (
                  <div className="bg-white dark:bg-slate-800 rounded-lg p-4 border border-orange-200 dark:border-orange-800">
                    <div className="flex items-start gap-3 mb-3">
                      <div className="flex-shrink-0 w-8 h-8 bg-orange-100 dark:bg-orange-900/30 rounded-full flex items-center justify-center">
                        <span className="text-orange-600 dark:text-orange-400 font-semibold text-sm">3</span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-orange-700 dark:text-orange-300 mb-1 break-words">⚠️ IMPORTANT: Missing Canonical URL</h3>
                        <p className="text-sm text-orange-600 dark:text-orange-400 mb-2 break-words">
                          {results.tags.canonical.recommendations?.[0] || 'Add canonical URL to prevent duplicate content issues'}
                        </p>
                      </div>
                    </div>
                    <div className="bg-slate-50 dark:bg-slate-700 p-3 rounded border relative">
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-2">
                        <div className="text-xs text-slate-600 dark:text-slate-400 font-medium">📋 COPY THIS CODE:</div>
                        <button
                          onClick={() => copyToClipboard(`<link rel="canonical" href="${url}">`, 'canonical-code')}
                          className={`flex items-center gap-1 px-3 py-2 text-xs rounded transition-all cursor-pointer w-full sm:w-auto justify-center ${copiedStates['canonical-code']
                            ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300'
                            : 'bg-blue-100 hover:bg-blue-200 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300 dark:hover:bg-blue-800/30'
                            }`}
                          title="Copy code"
                        >
                          {copiedStates['canonical-code'] ? (
                            <>
                              <Check className="h-3 w-3 flex-shrink-0" />
                              <span>Copied!</span>
                            </>
                          ) : (
                            <>
                              <Copy className="h-3 w-3 flex-shrink-0" />
                              <span>Copy</span>
                            </>
                          )}
                        </button>
                      </div>
                      <div className="overflow-x-auto">
                        <code className="block text-xs sm:text-sm font-mono text-slate-800 dark:text-slate-200 whitespace-nowrap break-all">
                          {`<link rel="canonical" href="${url}">`}
                        </code>
                      </div>
                    </div>
                    <div className="mt-2 text-xs text-slate-600 dark:text-slate-400">
                      ✅ <strong>Where to paste:</strong> Inside <code>&lt;head&gt;</code> section, preferably near other link tags
                    </div>
                  </div>
                )}

                {!results.tags.metaRobots.exists && (
                  <div className="bg-white dark:bg-slate-800 rounded-lg p-4 border border-yellow-200 dark:border-yellow-800">
                    <div className="flex items-start gap-3 mb-3">
                      <div className="flex-shrink-0 w-8 h-8 bg-yellow-100 dark:bg-yellow-900/30 rounded-full flex items-center justify-center">
                        <span className="text-yellow-600 dark:text-yellow-400 font-semibold text-sm">4</span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-yellow-700 dark:text-yellow-300 mb-1 break-words">🤖 SEO: Missing Robots Meta Tag</h3>
                        <p className="text-sm text-yellow-600 dark:text-yellow-400 mb-2 break-words">
                          {results.tags.metaRobots.recommendations?.[0] || 'Add robots meta tag to control search engine crawling'}
                        </p>
                      </div>
                    </div>
                    <div className="bg-slate-50 dark:bg-slate-700 p-3 rounded border relative">
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-2">
                        <div className="text-xs text-slate-600 dark:text-slate-400 font-medium">📋 COPY THIS CODE:</div>
                        <button
                          onClick={() => copyToClipboard('<meta name="robots" content="index, follow">', 'meta-robots-code')}
                          className={`flex items-center gap-1 px-3 py-2 text-xs rounded transition-all cursor-pointer w-full sm:w-auto justify-center ${copiedStates['meta-robots-code']
                            ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300'
                            : 'bg-blue-100 hover:bg-blue-200 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300 dark:hover:bg-blue-800/30'
                            }`}
                          title="Copy code"
                        >
                          {copiedStates['meta-robots-code'] ? (
                            <>
                              <Check className="h-3 w-3 flex-shrink-0" />
                              <span>Copied!</span>
                            </>
                          ) : (
                            <>
                              <Copy className="h-3 w-3 flex-shrink-0" />
                              <span>Copy</span>
                            </>
                          )}
                        </button>
                      </div>
                      <div className="overflow-x-auto">
                        <code className="block text-xs sm:text-sm font-mono text-slate-800 dark:text-slate-200 whitespace-nowrap">
                          {'<meta name="robots" content="index, follow">'}
                        </code>
                      </div>
                    </div>
                    <div className="mt-2 text-xs text-slate-600 dark:text-slate-400">
                      ✅ <strong>Where to paste:</strong> Inside <code>&lt;head&gt;</code> section, with other meta tags
                    </div>
                  </div>
                )}

                {(!results.tags.ogTitle.exists || !results.tags.ogDescription.exists || !results.tags.ogImage.exists) && (
                  <div className="bg-white dark:bg-slate-800 rounded-lg p-4 border border-purple-200 dark:border-purple-800">
                    <div className="flex items-start gap-3 mb-3">
                      <div className="flex-shrink-0 w-8 h-8 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center">
                        <span className="text-purple-600 dark:text-purple-400 font-semibold text-sm">5</span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-purple-700 dark:text-purple-300 mb-1 break-words">📱 SOCIAL: Missing Open Graph Tags</h3>
                        <p className="text-sm text-purple-600 dark:text-purple-400 mb-2 break-words">
                          Add these tags to improve how your page appears when shared on social media (Facebook, LinkedIn, etc.)
                        </p>
                      </div>
                    </div>
                    <div className="bg-slate-50 dark:bg-slate-700 p-3 rounded border relative">
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-2">
                        <div className="text-xs text-slate-600 dark:text-slate-400 font-medium">📋 COPY THIS CODE (Add what&apos;s missing):</div>
                        <button
                          onClick={() => copyToClipboard(`${!results.tags.ogTitle.exists ? '<meta property="og:title" content="Your Page Title - Same as title tag">\n' : ''}${!results.tags.ogDescription.exists ? '<meta property="og:description" content="Engaging description for social media sharing">\n' : ''}${!results.tags.ogImage.exists ? '<meta property="og:image" content="https://yoursite.com/social-image.jpg">\n' : ''}<meta property="og:url" content="${url}">`, 'og-tags-code')}
                          className={`flex items-center gap-1 px-3 py-2 text-xs rounded transition-all cursor-pointer w-full sm:w-auto justify-center ${copiedStates['og-tags-code']
                            ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300'
                            : 'bg-blue-100 hover:bg-blue-200 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300 dark:hover:bg-blue-800/30'
                            }`}
                          title="Copy code"
                        >
                          {copiedStates['og-tags-code'] ? (
                            <>
                              <Check className="h-3 w-3 flex-shrink-0" />
                              <span>Copied!</span>
                            </>
                          ) : (
                            <>
                              <Copy className="h-3 w-3 flex-shrink-0" />
                              <span>Copy</span>
                            </>
                          )}
                        </button>
                      </div>
                      <div className="overflow-x-auto">
                        <code className="block text-xs sm:text-sm font-mono text-slate-800 dark:text-slate-200 whitespace-pre-line break-all">
                          {`${!results.tags.ogTitle.exists ? '<meta property="og:title" content="Your Page Title - Same as title tag">\n' : ''}${!results.tags.ogDescription.exists ? '<meta property="og:description" content="Engaging description for social media sharing">\n' : ''}${!results.tags.ogImage.exists ? '<meta property="og:image" content="https://yoursite.com/social-image.jpg">\n' : ''}<meta property="og:url" content="${url}">`}
                        </code>
                      </div>
                    </div>
                    <div className="mt-2 text-xs text-slate-600 dark:text-slate-400">
                      ✅ <strong>Where to paste:</strong> Inside <code>&lt;head&gt;</code> section, grouped with other meta tags
                    </div>
                  </div>
                )}
              </div>

              <div className="mt-6 p-4 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800">
                <h4 className="font-semibold text-green-800 dark:text-green-200 mb-2">🎯 Next Steps:</h4>
                <ul className="text-sm text-green-700 dark:text-green-300 space-y-1">
                  <li>• Copy each code snippet above</li>
                  <li>• Paste them inside your HTML <code>&lt;head&gt;</code> section</li>
                  <li>• Customize the content (titles, descriptions) for your specific page</li>
                  <li>• Test your changes by re-running this validator</li>
                  <li>• Check how your page appears in search results and social media</li>
                </ul>
              </div>
            </div>
          )}

          {/* Basic Meta Tags */}
          <div className="rounded-lg border border-border bg-card p-4 sm:p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-foreground mb-4">🎯 Core SEO Tags</h3>
            <div className="space-y-4">
              <div className={`rounded-lg border p-4 ${getStatusColor(results.tags.title.exists, results.tags.title.issues)}`}>
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center space-x-3 min-w-0 flex-1">
                    {getStatusIcon(results.tags.title.exists, results.tags.title.issues)}
                    <div className="min-w-0 flex-1">
                      <h4 className="font-medium text-foreground">Title Tag</h4>
                      <p className="text-sm text-muted-foreground mt-1 break-words">
                        {results.tags.title.exists ? (results.tags.title.content || 'Title found but content could not be extracted') : 'Missing - Critical for SEO'}
                      </p>
                      {results.tags.title.length !== undefined && (
                        <p className="text-xs text-muted-foreground mt-1">Length: {results.tags.title.length} characters</p>
                      )}
                    </div>
                  </div>
                </div>
                {results.tags.title.recommendations && (
                  <div className="mt-3 p-3 bg-blue-50 dark:bg-blue-950/20 rounded-lg">
                    <p className="text-sm text-blue-800 dark:text-blue-200 break-words">
                      💡 {results.tags.title.recommendations[0]}
                    </p>
                  </div>
                )}
              </div>

              <div className={`rounded-lg border p-4 ${getStatusColor(results.tags.metaDescription.exists, results.tags.metaDescription.issues)}`}>
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center space-x-3 min-w-0 flex-1">
                    {getStatusIcon(results.tags.metaDescription.exists, results.tags.metaDescription.issues)}
                    <div className="min-w-0 flex-1">
                      <h4 className="font-medium text-foreground">Meta Description</h4>
                      <p className="text-sm text-muted-foreground mt-1 break-words">
                        {results.tags.metaDescription.exists ? (results.tags.metaDescription.content || 'Description found but content could not be extracted') : 'Missing - Impacts CTR'}
                      </p>
                      {results.tags.metaDescription.length !== undefined && (
                        <p className="text-xs text-muted-foreground mt-1">Length: {results.tags.metaDescription.length} characters</p>
                      )}
                    </div>
                  </div>
                </div>
                {results.tags.metaDescription.recommendations && (
                  <div className="mt-3 p-3 bg-blue-50 dark:bg-blue-950/20 rounded-lg">
                    <p className="text-sm text-blue-800 dark:text-blue-200 break-words">
                      💡 {results.tags.metaDescription.recommendations[0]}
                    </p>
                  </div>
                )}
              </div>

              <div className={`rounded-lg border p-4 ${getStatusColor(results.tags.metaRobots.exists, results.tags.metaRobots.issues)}`}>
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center space-x-3 min-w-0 flex-1">
                    {getStatusIcon(results.tags.metaRobots.exists, results.tags.metaRobots.issues)}
                    <div className="min-w-0 flex-1">
                      <h4 className="font-medium text-foreground">Meta Robots</h4>
                      <p className="text-sm text-muted-foreground mt-1 break-words">
                        {results.tags.metaRobots.exists ? (results.tags.metaRobots.content || 'Robots tag found but content could not be extracted') : 'Missing - Crawl control'}
                      </p>
                    </div>
                  </div>
                </div>
                {results.tags.metaRobots.recommendations && (
                  <div className="mt-3 p-3 bg-blue-50 dark:bg-blue-950/20 rounded-lg">
                    <p className="text-sm text-blue-800 dark:text-blue-200 break-words">
                      💡 {results.tags.metaRobots.recommendations[0]}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Open Graph Tags */}
          <div className="rounded-lg border border-border bg-card p-4 sm:p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-foreground mb-4">📱 Social Media Tags (Open Graph)</h3>
            <div className="space-y-4">
              <div className={`rounded-lg border p-4 ${getStatusColor(results.tags.ogTitle.exists, results.tags.ogTitle.issues)}`}>
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center space-x-3 min-w-0 flex-1">
                    {getStatusIcon(results.tags.ogTitle.exists, results.tags.ogTitle.issues)}
                    <div className="min-w-0 flex-1">
                      <h4 className="font-medium text-foreground">OG Title</h4>
                      <p className="text-sm text-muted-foreground mt-1 break-words">
                        {results.tags.ogTitle.exists ? (results.tags.ogTitle.content || 'OG Title found but content could not be extracted') : 'Missing - Social sharing'}
                      </p>
                    </div>
                  </div>
                </div>
                {results.tags.ogTitle.recommendations && (
                  <div className="mt-3 p-3 bg-blue-50 dark:bg-blue-950/20 rounded-lg">
                    <p className="text-sm text-blue-800 dark:text-blue-200 break-words">
                      💡 {results.tags.ogTitle.recommendations[0]}
                    </p>
                  </div>
                )}
              </div>

              <div className={`rounded-lg border p-4 ${getStatusColor(results.tags.ogDescription.exists, results.tags.ogDescription.issues)}`}>
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center space-x-3 min-w-0 flex-1">
                    {getStatusIcon(results.tags.ogDescription.exists, results.tags.ogDescription.issues)}
                    <div className="min-w-0 flex-1">
                      <h4 className="font-medium text-foreground">OG Description</h4>
                      <p className="text-sm text-muted-foreground mt-1 break-words">
                        {results.tags.ogDescription.exists ? (results.tags.ogDescription.content || 'OG Description found but content could not be extracted') : 'Missing - Social preview'}
                      </p>
                    </div>
                  </div>
                </div>
                {results.tags.ogDescription.recommendations && (
                  <div className="mt-3 p-3 bg-blue-50 dark:bg-blue-950/20 rounded-lg">
                    <p className="text-sm text-blue-800 dark:text-blue-200 break-words">
                      💡 {results.tags.ogDescription.recommendations[0]}
                    </p>
                  </div>
                )}
              </div>

              <div className={`rounded-lg border p-4 ${getStatusColor(results.tags.ogImage.exists, results.tags.ogImage.issues)}`}>
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center space-x-3 min-w-0 flex-1">
                    {getStatusIcon(results.tags.ogImage.exists, results.tags.ogImage.issues)}
                    <div className="min-w-0 flex-1">
                      <h4 className="font-medium text-foreground">OG Image</h4>
                      <p className="text-sm text-muted-foreground mt-1 break-words">
                        {results.tags.ogImage.exists ? (results.tags.ogImage.url || 'OG Image found but URL could not be extracted') : 'Missing - Social preview image'}
                      </p>
                    </div>
                  </div>
                </div>
                {results.tags.ogImage.recommendations && (
                  <div className="mt-3 p-3 bg-blue-50 dark:bg-blue-950/20 rounded-lg">
                    <p className="text-sm text-blue-800 dark:text-blue-200 break-words">
                      💡 {results.tags.ogImage.recommendations[0]}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Technical Tags */}
          <div className="rounded-lg border border-border bg-card p-4 sm:p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-foreground mb-4">🔧 Technical Tags</h3>
            <div className="grid grid-cols-1 gap-4">
              <div className={`rounded-lg border p-4 ${getStatusColor(results.tags.canonical.exists, results.tags.canonical.issues)}`}>
                <div className="flex items-center space-x-3">
                  {getStatusIcon(results.tags.canonical.exists, results.tags.canonical.issues)}
                  <div className="min-w-0 flex-1">
                    <h4 className="font-medium text-foreground">Canonical URL</h4>
                    <p className="text-sm text-muted-foreground break-all">
                      {results.tags.canonical.exists ? results.tags.canonical.url : 'Missing - Duplicate content risk'}
                    </p>
                  </div>
                </div>
                {results.tags.canonical.recommendations && (
                  <div className="mt-3 p-2 bg-blue-50 dark:bg-blue-950/20 rounded text-xs text-blue-800 dark:text-blue-200 break-words">
                    {results.tags.canonical.recommendations[0]}
                  </div>
                )}
              </div>

              {results.tags.viewport && (
                <div className={`rounded-lg border p-4 ${getStatusColor(results.tags.viewport.exists, results.tags.viewport.issues)}`}>
                  <div className="flex items-center space-x-3">
                    {getStatusIcon(results.tags.viewport.exists, results.tags.viewport.issues)}
                    <div className="min-w-0 flex-1">
                      <h4 className="font-medium text-foreground">Viewport</h4>
                      <p className="text-sm text-muted-foreground break-words">{results.tags.viewport.content}</p>
                    </div>
                  </div>
                </div>
              )}

              {results.tags.charset && (
                <div className={`rounded-lg border p-4 ${getStatusColor(results.tags.charset.exists, results.tags.charset.issues)}`}>
                  <div className="flex items-center space-x-3">
                    {getStatusIcon(results.tags.charset.exists, results.tags.charset.issues)}
                    <div className="min-w-0 flex-1">
                      <h4 className="font-medium text-foreground">Character Set</h4>
                      <p className="text-sm text-muted-foreground break-words">{results.tags.charset.content}</p>
                    </div>
                  </div>
                </div>
              )}

              {results.tags.favicon && (
                <div className={`rounded-lg border p-4 ${getStatusColor(results.tags.favicon.exists, results.tags.favicon.issues)}`}>
                  <div className="flex items-center space-x-3">
                    {getStatusIcon(results.tags.favicon.exists, results.tags.favicon.issues)}
                    <div className="min-w-0 flex-1">
                      <h4 className="font-medium text-foreground">Favicon</h4>
                      <p className="text-sm text-muted-foreground break-all">{results.tags.favicon.url}</p>
                    </div>
                  </div>
                </div>
              )}
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
          <p className="text-sm text-muted-foreground mt-2">{error}</p>
        </div>
      )}
    </div>
  );
}  