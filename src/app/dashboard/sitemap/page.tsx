"use client";

import { useState } from "react";
import { Globe, Search, Download, ExternalLink, AlertCircle, Clock, CheckCircle, Copy } from "lucide-react";
import { sitemapService, type SitemapResult } from "@/lib/services";
import { ApiError } from "@/lib/api";

export default function SitemapGeneratorPage() {
  const [url, setUrl] = useState("");
  const [maxDepth, setMaxDepth] = useState(2);
  const [timeoutSeconds, setTimeoutSeconds] = useState(60);
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState<SitemapResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [copySuccess, setCopySuccess] = useState<{ [key: string]: boolean }>({});

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!url) return;

    setIsLoading(true);
    setError(null);
    setResults(null);
    setCopySuccess({});

    try {
      const sitemapResult = await sitemapService.generateSitemap(url, {
        maxDepth,
        timeout: timeoutSeconds * 1000, // Convert to milliseconds
      });

      setResults(sitemapResult);
    } catch (err) {
      if (err instanceof ApiError) {
        setError(err.message);
      } else {
        setError('An unexpected error occurred while generating the sitemap.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const copyToClipboard = async (text: string, key: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopySuccess({ ...copySuccess, [key]: true });
      window.setTimeout(() => {
        setCopySuccess({ ...copySuccess, [key]: false });
      }, 2000);
    } catch {
      // Copy failed - no action needed
    }
  };

  const downloadSitemap = (format: 'xml' | 'txt') => {
    if (!results) return;

    let content = '';
    let filename = '';

    if (format === 'xml') {
      content = generateXMLSitemap(results.urls);
      filename = `sitemap-${results.domain}.xml`;
    } else {
      content = results.urls.join('\n');
      filename = `sitemap-${results.domain}.txt`;
    }

    const blob = new Blob([content], { type: format === 'xml' ? 'application/xml' : 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const generateXMLSitemap = (urls: string[]) => {
    const xmlHeader = '<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';
    const xmlFooter = '</urlset>';

    const urlEntries = urls.map(url => {
      const lastmod = new Date().toISOString().split('T')[0];
      const priority = url === results?.url ? '1.0' : '0.8';
      return `  <url>
    <loc>${url}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>${priority}</priority>
  </url>`;
    }).join('\n');

    return xmlHeader + urlEntries + '\n' + xmlFooter;
  };

  return (
    <div className="p-4 sm:p-6">
      {/* Header */}
      <div className="mb-6 sm:mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center space-y-3 sm:space-y-0 sm:space-x-3">
          <div className="flex items-center space-x-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-500 text-white">
              <Globe className="h-5 w-5" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-foreground">Sitemap Generator</h1>
            </div>
          </div>
          <div className="sm:ml-auto">
            <p className="text-sm text-muted-foreground">
              Generate comprehensive sitemaps for better SEO
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
                  <Globe className="h-5 w-5 text-muted-foreground" />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Crawl Depth */}
              <div>
                <label htmlFor="maxDepth" className="block text-sm font-medium text-foreground mb-2">
                  Crawl Depth
                </label>
                <select
                  id="maxDepth"
                  value={maxDepth}
                  onChange={(e) => setMaxDepth(Number(e.target.value))}
                  className="w-full rounded-lg border border-border bg-input px-4 py-3 text-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                >
                  <option value={1}>1 Level (Homepage only)</option>
                  <option value={2}>2 Levels (Recommended)</option>
                  <option value={3}>3 Levels (Deep crawl)</option>
                </select>
              </div>

              {/* Timeout */}
              <div>
                <label htmlFor="timeout" className="block text-sm font-medium text-foreground mb-2">
                  Timeout (seconds)
                </label>
                <select
                  id="timeout"
                  value={timeoutSeconds}
                  onChange={(e) => setTimeoutSeconds(Number(e.target.value))}
                  className="w-full rounded-lg border border-border bg-input px-4 py-3 text-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                >
                  <option value={30}>30 seconds</option>
                  <option value={60}>60 seconds (Recommended)</option>
                  <option value={120}>2 minutes</option>
                  <option value={180}>3 minutes</option>
                </select>
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
                  <span>Crawling website...</span>
                </>
              ) : (
                <>
                  <Search className="h-4 w-4" />
                  <span>Generate Sitemap</span>
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
              <h3 className="text-sm font-medium text-red-800 dark:text-red-200">Sitemap Generation Failed</h3>
            </div>
            <p className="mt-2 text-sm text-red-700 dark:text-red-300">{error}</p>
          </div>
        </div>
      )}

      {/* Results Section */}
      {results && (
        <div className="space-y-6">
          {/* Overview */}
          <div className="rounded-lg border border-border bg-card p-6 shadow-sm">
            <h2 className="text-xl font-semibold text-foreground mb-4">Sitemap Overview</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="text-center p-4 rounded-lg bg-primary/5">
                <div className="text-2xl font-bold text-primary">{results.totalUrls}</div>
                <div className="text-sm text-muted-foreground">URLs Found</div>
              </div>
              <div className="text-center p-4 rounded-lg bg-blue-50 dark:bg-blue-950/30">
                <div className="text-2xl font-bold text-blue-600">{results.crawlDepth}</div>
                <div className="text-sm text-muted-foreground">Crawl Depth</div>
              </div>
              <div className="text-center p-4 rounded-lg bg-green-50 dark:bg-green-950/30">
                <div className="text-2xl font-bold text-green-600">{results.domain}</div>
                <div className="text-sm text-muted-foreground">Domain</div>
              </div>
              <div className="text-center p-4 rounded-lg bg-muted/50">
                <div className="text-2xl font-bold text-foreground">
                  <Clock className="h-6 w-6 mx-auto" />
                </div>
                <div className="text-sm text-muted-foreground">
                  {new Date(results.generatedAt).toLocaleString()}
                </div>
              </div>
            </div>
          </div>

          {/* Download Options */}
          <div className="rounded-lg border border-border bg-card p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-foreground mb-4">Download Sitemap</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center justify-between p-4 rounded-lg bg-muted/50">
                <div className="flex items-center space-x-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded bg-primary/10 text-primary">
                    <Download className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="font-medium text-foreground">XML Sitemap</div>
                    <div className="text-sm text-muted-foreground">Standard format for search engines</div>
                  </div>
                </div>
                <button
                  onClick={() => downloadSitemap('xml')}
                  className="flex items-center space-x-2 rounded-lg bg-primary px-4 py-2 text-sm text-white hover:bg-primary-dark"
                >
                  <Download className="h-4 w-4" />
                  <span>XML</span>
                </button>
              </div>

              <div className="flex items-center justify-between p-4 rounded-lg bg-muted/50">
                <div className="flex items-center space-x-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded bg-green-100 dark:bg-green-950/30 text-green-600">
                    <Download className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="font-medium text-foreground">Text List</div>
                    <div className="text-sm text-muted-foreground">Simple list of URLs</div>
                  </div>
                </div>
                <button
                  onClick={() => downloadSitemap('txt')}
                  className="flex items-center space-x-2 rounded-lg bg-green-600 px-4 py-2 text-sm text-white hover:bg-green-700"
                >
                  <Download className="h-4 w-4" />
                  <span>TXT</span>
                </button>
              </div>
            </div>
          </div>

          {/* URLs List */}
          <div className="rounded-lg border border-border bg-card p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-foreground mb-4">
              Discovered URLs ({results.totalUrls})
            </h3>
            <div className="space-y-2 max-h-96 overflow-y-auto">
              {results.urls.map((pageUrl: string, index: number) => (
                <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-muted/50 hover:bg-muted/70 transition-colors">
                  <div className="flex items-center space-x-3 flex-1 min-w-0">
                    <div className="text-sm font-mono text-foreground truncate">
                      {pageUrl}
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => copyToClipboard(pageUrl, `url-${index}`)}
                      className="flex items-center space-x-1 text-sm text-muted-foreground hover:text-foreground"
                    >
                      {copySuccess[`url-${index}`] ? (
                        <CheckCircle className="h-4 w-4 text-green-600" />
                      ) : (
                        <Copy className="h-4 w-4" />
                      )}
                    </button>
                    <a
                      href={pageUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center space-x-1 text-sm text-primary hover:text-primary-dark"
                    >
                      <ExternalLink className="h-4 w-4" />
                    </a>
                  </div>
                </div>
              ))}
            </div>

            {results.urls.length > 10 && (
              <div className="mt-4 text-center">
                <button
                  onClick={() => copyToClipboard(results.urls.join('\n'), 'all-urls')}
                  className="flex items-center space-x-2 mx-auto text-sm text-primary hover:text-primary-dark"
                >
                  {copySuccess['all-urls'] ? (
                    <>
                      <CheckCircle className="h-4 w-4" />
                      <span>All URLs copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="h-4 w-4" />
                      <span>Copy all URLs</span>
                    </>
                  )}
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* No Results Message */}
      {!results && !isLoading && (
        <div className="text-center py-12">
          <Globe className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
          <h3 className="text-lg font-medium text-foreground mb-2">Ready to Crawl</h3>
          <p className="text-muted-foreground">
            Enter your website URL above to discover all pages and generate a comprehensive sitemap
          </p>
        </div>
      )}
    </div>
  );
} 