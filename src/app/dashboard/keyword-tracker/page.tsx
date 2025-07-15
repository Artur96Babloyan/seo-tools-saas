"use client";

import { useState, useEffect } from "react";
import { TrendingUp, Search, Plus, X, Filter, Target, BarChart3, Globe, AlertCircle } from "lucide-react";
import { keywordTrackingService } from "@/lib/services";
import { ApiError } from "@/lib/api";

import { getGoogleDomains } from "@/lib/googleDomains";
import {
  KeywordTrackingResponse,
  RankingHistoryItem,
  KeywordStatsResponse,
  TrackedDomain
} from "@/types/keyword-tracker";



// Get Google domains using the utility function
const GOOGLE_DOMAINS = getGoogleDomains();

export default function KeywordTrackerPage() {
  // Form state
  const [domain, setDomain] = useState("");
  const [keywords, setKeywords] = useState<string[]>([]);
  const [currentKeyword, setCurrentKeyword] = useState("");
  const [location, setLocation] = useState("google.com");
  const [isTracking, setIsTracking] = useState(false);
  const [trackingError, setTrackingError] = useState<string | null>(null);

  // Results state
  const [results, setResults] = useState<KeywordTrackingResponse | null>(null);
  const [history, setHistory] = useState<RankingHistoryItem[]>([]);
  const [stats, setStats] = useState<KeywordStatsResponse['data'] | null>(null);
  const [domains, setDomains] = useState<TrackedDomain[]>([]);

  // UI state
  const [activeTab, setActiveTab] = useState<'track' | 'history' | 'stats'>('track');
  const [historyFilters, setHistoryFilters] = useState({
    domain: '',
    keyword: '',
    limit: 50
  });
  const [isLoadingHistory, setIsLoadingHistory] = useState(false);
  const [isLoadingStats, setIsLoadingStats] = useState(false);

  // Load initial data
  useEffect(() => {
    loadDomains();
  }, []);

  const loadDomains = async () => {
    try {
      const response = await keywordTrackingService.getDomains();

      if (!response) {
        setDomains([]);
        return;
      }

      let domainsArray: TrackedDomain[] = [];

      // Handle different response formats
      if (Array.isArray(response)) {
        domainsArray = response;
      } else if (response && typeof response === 'object') {
        if ('domains' in response && Array.isArray(response.domains)) {
          domainsArray = response.domains;
        } else if ('data' in response && Array.isArray(response.data)) {
          domainsArray = response.data;
        } else {
          setDomains([]);
          return;
        }
      } else {
        setDomains([]);
        return;
      }

      setDomains(domainsArray);
    } catch {
      setDomains([]);
    }
  };

  const loadHistory = async (filters = historyFilters) => {
    setIsLoadingHistory(true);
    try {
      const response = await keywordTrackingService.getHistory(filters);
      setHistory(response.rankings);
    } catch {
      setHistory([]);
    } finally {
      setIsLoadingHistory(false);
    }
  };

  const loadStats = async (selectedDomain?: string) => {
    setIsLoadingStats(true);
    try {
      const response = await keywordTrackingService.getStatistics(selectedDomain);
      setStats(response);
    } catch {
      setStats(null);
    } finally {
      setIsLoadingStats(false);
    }
  };

  const addKeyword = () => {
    if (currentKeyword.trim() && keywords.length < 10 && !keywords.includes(currentKeyword.trim())) {
      setKeywords([...keywords, currentKeyword.trim()]);
      setCurrentKeyword("");
    }
  };

  const removeKeyword = (index: number) => {
    setKeywords(keywords.filter((_, i) => i !== index));
  };

  const handleKeywordKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addKeyword();
    }
  };

  const handleTrackKeywords = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!domain || keywords.length === 0) return;

    setIsTracking(true);
    setTrackingError(null);
    setResults(null);

    try {
      // Format domain: remove protocol and trailing slashes
      const formattedDomain = domain
        .toLowerCase()
        .replace(/^(https?:\/\/)?(www\.)?/, '')
        .replace(/\/$/, '');

      // Basic domain validation
      const domainRegex = /^[a-zA-Z0-9][a-zA-Z0-9-]{1,61}[a-zA-Z0-9]\.[a-zA-Z]{2,}$/;
      if (!domainRegex.test(formattedDomain)) {
        throw new Error('Please enter a valid domain (e.g., example.com)');
      }

      // Add validation check
      if (keywords.length === 0) {
        throw new Error('No keywords to track. Please add at least one keyword.');
      }

      const response = await keywordTrackingService.trackKeywords(formattedDomain, keywords, location);

      // Validate response structure
      if (!response) {
        throw new Error('No response received from server');
      }

      if (!response.success) {
        throw new Error(response.message || 'Failed to track keywords');
      }

      if (!response.data) {
        throw new Error('No data received from server');
      }

      if (!Array.isArray(response.data.results)) {
        throw new Error('Invalid results format received from server');
      }

      setResults(response);

      // Refresh domains and history
      loadDomains();
      if (activeTab === 'history') {
        loadHistory();
      }
    } catch (error) {
      // Log the full error details for debugging
      if (error instanceof ApiError) {
        // Try to get more specific error details from the response
        if (error.message.includes('Validation error')) {
          setTrackingError(`Validation error: Please check your inputs. Domain: "${domain}", Keywords: [${keywords.join(', ')}], Location: "${location}"`);
        } else {
          setTrackingError(error.message);
        }
      } else if (error instanceof Error) {
        setTrackingError(error.message);
      } else {
        setTrackingError('Failed to track keywords. Please check your domain and try again.');
      }
    } finally {
      setIsTracking(false);
    }
  };

  const getRankColor = (rank: number) => {
    if (rank === -1) return "text-gray-600 bg-gray-100 dark:text-gray-400 dark:bg-gray-900/30";
    if (rank <= 10) return "text-green-600 bg-green-100 dark:text-green-400 dark:bg-green-900/30";
    if (rank <= 30) return "text-yellow-600 bg-yellow-100 dark:text-yellow-400 dark:bg-yellow-900/30";
    return "text-red-600 bg-red-100 dark:text-red-400 dark:bg-red-900/30";
  };

  const getRankLabel = (rank: number) => {
    if (rank === -1) return "Not Found";
    return `#${rank}`;
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className="p-4 sm:p-6">
      {/* Header */}
      <div className="mb-6 sm:mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center space-y-3 sm:space-y-0 sm:space-x-3">
          <div className="flex items-center space-x-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-600 text-white">
              <TrendingUp className="h-5 w-5" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-foreground">Keyword Rank Tracker</h1>
            </div>
          </div>
          <div className="sm:ml-auto">
            <p className="text-sm text-muted-foreground">
              Track keyword rankings in Google search results
            </p>
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="mb-6">
        <div className="border-b border-border">
          <nav className="-mb-px flex space-x-8">
            <button
              onClick={() => setActiveTab('track')}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${activeTab === 'track'
                ? 'border-primary text-primary'
                : 'border-transparent text-muted-foreground hover:text-foreground hover:border-border'
                }`}
            >
              Track Keywords
            </button>
            <button
              onClick={() => {
                setActiveTab('history');
                if (history.length === 0) loadHistory();
              }}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${activeTab === 'history'
                ? 'border-primary text-primary'
                : 'border-transparent text-muted-foreground hover:text-foreground hover:border-border'
                }`}
            >
              History
            </button>
            <button
              onClick={() => {
                setActiveTab('stats');
                if (!stats) loadStats();
              }}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${activeTab === 'stats'
                ? 'border-primary text-primary'
                : 'border-transparent text-muted-foreground hover:text-foreground hover:border-border'
                }`}
            >
              Statistics
            </button>
          </nav>
        </div>
      </div>

      {/* Track Keywords Tab */}
      {activeTab === 'track' && (
        <div className="space-y-6">
          {/* Tracking Form */}
          <div className="rounded-lg border border-border bg-card p-6 shadow-sm">
            <form onSubmit={handleTrackKeywords} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="domain" className="block text-sm font-medium text-foreground mb-2">
                    Domain
                  </label>
                  <input
                    type="text"
                    id="domain"
                    value={domain}
                    onChange={(e) => setDomain(e.target.value)}
                    placeholder="example.com"
                    className="w-full rounded-lg border border-border bg-input px-4 py-3 text-foreground placeholder-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="location" className="block text-sm font-medium text-foreground mb-2">
                    Search Location
                  </label>
                  <select
                    id="location"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="w-full rounded-lg border border-border bg-input px-4 py-3 text-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                  >
                    {GOOGLE_DOMAINS.map(({ value, label }) => (
                      <option key={value} value={value} className="font-mono">
                        {label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label htmlFor="keywords" className="block text-sm font-medium text-foreground mb-2">
                  Keywords ({keywords.length}/10)
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    id="keywords"
                    value={currentKeyword}
                    onChange={(e) => setCurrentKeyword(e.target.value)}
                    onKeyPress={handleKeywordKeyPress}
                    placeholder="Enter a keyword"
                    className="flex-1 rounded-lg border border-border bg-input px-4 py-3 text-foreground placeholder-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                    disabled={keywords.length >= 10}
                  />
                  <button
                    type="button"
                    onClick={addKeyword}
                    disabled={!currentKeyword.trim() || keywords.length >= 10}
                    className="px-4 py-3 bg-primary text-white rounded-lg hover:bg-primary-dark disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Plus className="h-4 w-4" />
                  </button>
                </div>
                {keywords.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-3">
                    {keywords.map((keyword, index) => (
                      <span
                        key={index}
                        className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm bg-primary/10 text-primary"
                      >
                        {keyword}
                        <button
                          type="button"
                          onClick={() => removeKeyword(index)}
                          className="hover:text-primary-dark"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </span>
                    ))}
                  </div>
                )}
              </div>

              <button
                type="submit"
                disabled={isTracking || !domain || keywords.length === 0}
                className="flex items-center justify-center space-x-2 rounded-lg bg-primary px-6 py-3 text-white font-medium transition-colors hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isTracking ? (
                  <>
                    <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                    <span>Tracking Rankings...</span>
                  </>
                ) : (
                  <>
                    <Search className="h-4 w-4" />
                    <span>Track Keywords</span>
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Error Display */}
          {trackingError && (
            <div className="rounded-lg border border-red-200 bg-red-50 dark:border-red-800 dark:bg-red-950/50 p-4">
              <div className="flex items-center space-x-2">
                <AlertCircle className="h-5 w-5 text-red-600 dark:text-red-400" />
                <p className="text-sm text-red-700 dark:text-red-300">{trackingError}</p>
              </div>
            </div>
          )}

          {/* Results Display */}
          {results && (
            <div className="rounded-lg border border-border bg-card p-4 sm:p-6 shadow-sm">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">
                <h3 className="text-lg sm:text-xl font-semibold text-foreground">Ranking Results</h3>
                <div className="text-sm text-muted-foreground">
                  Tracked on {formatDate(results.data.results[0]?.timestamp || new Date().toISOString())}
                </div>
              </div>

              {/* Ranking Guide */}
              <div className="mb-6 p-4 rounded-lg bg-muted/30 border border-border">
                <div className="flex items-center space-x-2 mb-3">
                  <AlertCircle className="h-4 w-4 text-primary flex-shrink-0" />
                  <span className="font-medium text-foreground">Understanding Your Rankings</span>
                </div>
                <div className="space-y-3 sm:space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 rounded-full bg-green-500 flex-shrink-0"></div>
                      <span className="text-sm text-foreground break-words">
                        <strong>#1-10:</strong> First page - Great visibility, gets most clicks
                      </span>
                    </div>
                  </div>
                  <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 rounded-full bg-yellow-500 flex-shrink-0"></div>
                      <span className="text-sm text-foreground break-words">
                        <strong>#11-30:</strong> Pages 2-3 - Good positioning, some traffic
                      </span>
                    </div>
                  </div>
                  <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 rounded-full bg-red-500 flex-shrink-0"></div>
                      <span className="text-sm text-foreground break-words">
                        <strong>#31+:</strong> Page 4+ - Low visibility, needs improvement
                      </span>
                    </div>
                  </div>
                </div>
                <p className="text-xs text-muted-foreground mt-3 break-words">
                  💡 <strong>Tip:</strong> Rankings #1-3 get ~60% of all clicks. Moving from #5 to #3 can double your traffic!
                </p>
              </div>

              <div className="space-y-3">
                {results.data.results.map((result, index) => (
                  <div key={index} className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 p-4 rounded-lg border border-border hover:shadow-md transition-shadow">
                    <div className="flex-1 min-w-0">
                      <div className="font-medium text-foreground break-words">{result.keyword}</div>
                      <div className="text-sm text-muted-foreground break-words">
                        {results.data.domain} • {formatDate(result.timestamp)}
                      </div>
                    </div>
                    <div className={`px-4 py-2 rounded-full text-sm font-medium w-full sm:w-auto text-center ${getRankColor(result.rank)}`}>
                      {getRankLabel(result.rank)}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Tracked Domains */}
          {domains.length > 0 && (
            <div className="rounded-lg border border-border bg-card p-4 sm:p-6 shadow-sm">
              <h3 className="text-lg sm:text-xl font-semibold text-foreground mb-4">Tracked Domains</h3>
              <div className="grid grid-cols-1 gap-4">
                {domains.map((domainData, index) => (
                  <div key={index} className="p-4 rounded-lg border border-border hover:shadow-md transition-shadow">
                    <div className="flex items-center space-x-2 mb-2">
                      <Globe className="h-4 w-4 text-primary flex-shrink-0" />
                      <span className="font-medium text-foreground break-words">{domainData.domain}</span>
                    </div>
                    <div className="text-sm text-muted-foreground space-y-1">
                      <div>Keywords: {domainData.uniqueKeywords}</div>
                      <div>Records: {domainData.totalTrackingRecords}</div>
                      <div>Last tracked: {formatDate(domainData.lastTracked)}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* History Tab */}
      {activeTab === 'history' && (
        <div className="space-y-6">
          {/* History Filters */}
          <div className="rounded-lg border border-border bg-card p-4 sm:p-6 shadow-sm">
            <h3 className="text-lg sm:text-xl font-semibold text-foreground mb-4">Filter History</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Domain</label>
                <input
                  type="text"
                  value={historyFilters.domain}
                  onChange={(e) => setHistoryFilters({ ...historyFilters, domain: e.target.value })}
                  placeholder="example.com"
                  className="w-full rounded-lg border border-border bg-input px-4 py-2 text-foreground placeholder-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Keyword</label>
                <input
                  type="text"
                  value={historyFilters.keyword}
                  onChange={(e) => setHistoryFilters({ ...historyFilters, keyword: e.target.value })}
                  placeholder="keyword"
                  className="w-full rounded-lg border border-border bg-input px-4 py-2 text-foreground placeholder-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Limit</label>
                <select
                  value={historyFilters.limit}
                  onChange={(e) => setHistoryFilters({ ...historyFilters, limit: parseInt(e.target.value) })}
                  className="w-full rounded-lg border border-border bg-input px-4 py-2 text-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                >
                  <option value={25}>25 results</option>
                  <option value={50}>50 results</option>
                  <option value={100}>100 results</option>
                </select>
              </div>
            </div>
            <button
              onClick={() => loadHistory(historyFilters)}
              className="mt-4 flex items-center space-x-2 rounded-lg bg-primary px-4 py-2 text-white font-medium transition-colors hover:bg-primary-dark w-full sm:w-auto justify-center"
            >
              <Filter className="h-4 w-4" />
              <span>Apply Filters</span>
            </button>
          </div>

          {/* History Results */}
          <div className="rounded-lg border border-border bg-card p-4 sm:p-6 shadow-sm">
            <h3 className="text-lg sm:text-xl font-semibold text-foreground mb-4">Ranking History</h3>
            {isLoadingHistory ? (
              <div className="flex items-center justify-center py-8">
                <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent" />
              </div>
            ) : history.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                <Target className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                <p>No ranking history found. Start tracking keywords to see results here.</p>
              </div>
            ) : (
              <div className="space-y-2">
                {history.map((item) => (
                  <div key={item.id} className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 p-3 rounded-lg border border-border">
                    <div className="flex-1 min-w-0">
                      <div className="font-medium text-foreground break-words">{item.keyword}</div>
                      <div className="text-sm text-muted-foreground break-words">
                        {item.domain} • {formatDate(item.createdAt)}
                      </div>
                    </div>
                    <div className={`px-3 py-1 rounded-full text-sm font-medium w-full sm:w-auto text-center ${getRankColor(item.rank)}`}>
                      {getRankLabel(item.rank)}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Statistics Tab */}
      {activeTab === 'stats' && (
        <div className="space-y-6">
          {/* Stats Overview */}
          {stats && (
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
              <div className="rounded-lg border border-border bg-card p-4 sm:p-6 shadow-sm">
                <div className="flex items-center space-x-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary flex-shrink-0">
                    <Target className="h-5 w-5" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-muted-foreground">Total Keywords Tracked</p>
                    <p className="text-2xl font-bold text-foreground">{stats.totalTracked}</p>
                  </div>
                </div>
              </div>
              <div className="rounded-lg border border-border bg-card p-4 sm:p-6 shadow-sm">
                <div className="flex items-center space-x-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-yellow-500/10 text-yellow-600 flex-shrink-0">
                    <BarChart3 className="h-5 w-5" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-muted-foreground">Average Rank</p>
                    <p className="text-2xl font-bold text-foreground">
                      {stats.averageRank ? Math.round(stats.averageRank) : '--'}
                    </p>
                  </div>
                </div>
              </div>
              <div className="rounded-lg border border-border bg-card p-4 sm:p-6 shadow-sm">
                <div className="flex items-center space-x-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-500/10 text-green-600 flex-shrink-0">
                    <TrendingUp className="h-5 w-5" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-muted-foreground">Top Keywords</p>
                    <p className="text-2xl font-bold text-foreground">{stats.topKeywords.length}</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Top Keywords */}
          {stats && stats.topKeywords.length > 0 && (
            <div className="rounded-lg border border-border bg-card p-4 sm:p-6 shadow-sm">
              <h3 className="text-lg sm:text-xl font-semibold text-foreground mb-4">Top Performing Keywords</h3>
              <div className="space-y-2">
                {stats.topKeywords.map((keyword, index) => (
                  <div key={index} className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 p-3 rounded-lg border border-border">
                    <div className="flex-1 min-w-0">
                      <div className="font-medium text-foreground break-words">{keyword.keyword}</div>
                      <div className="text-sm text-muted-foreground break-words">
                        {keyword.domain} • {formatDate(keyword.createdAt)}
                      </div>
                    </div>
                    <div className={`px-3 py-1 rounded-full text-sm font-medium w-full sm:w-auto text-center ${getRankColor(keyword.rank)}`}>
                      {getRankLabel(keyword.rank)}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Load Statistics Button */}
          <div className="text-center">
            <button
              onClick={() => loadStats()}
              disabled={isLoadingStats}
              className="flex items-center space-x-2 rounded-lg bg-primary px-6 py-3 text-white font-medium transition-colors hover:bg-primary-dark disabled:opacity-50 disabled:cursor-not-allowed mx-auto w-full sm:w-auto justify-center"
            >
              {isLoadingStats ? (
                <>
                  <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                  <span>Loading Statistics...</span>
                </>
              ) : (
                <>
                  <BarChart3 className="h-4 w-4" />
                  <span>Load Statistics</span>
                </>
              )}
            </button>
          </div>
        </div>
      )}
    </div>
  );
} 