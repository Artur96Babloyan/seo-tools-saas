"use client";

import { useState, useEffect, useRef, useMemo } from "react";
import { Zap, Search, Clock, Image, Wifi, AlertCircle, CheckCircle, X, Timer, Globe, Loader2, Save } from "lucide-react";
import { useAuth } from '@/entities/user';
import { seoService, reportService, type SeoAnalysis } from "@/lib/services";
import { ApiError } from "@/lib/api";
import PerformanceDisclaimer from "@/components/PerformanceDisclaimer";


// Enhanced Loading Component
const PageSpeedLoadingModal = ({
  isOpen,
  onCancel,
  url,
  strategy,
  categories
}: {
  isOpen: boolean;
  onCancel: () => void;
  url: string;
  strategy: 'desktop' | 'mobile';
  categories: string[];
}) => {
  const [timeElapsed, setTimeElapsed] = useState(0);
  const [currentPhase, setCurrentPhase] = useState(0);
  const [estimatedTimeRemaining, setEstimatedTimeRemaining] = useState(45);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const phases = useMemo(() => [
    { name: "Connecting to Google PageSpeed API", duration: 5 },
    { name: "Loading website content", duration: 10 },
    { name: "Analyzing performance metrics", duration: 15 },
    { name: "Evaluating SEO elements", duration: 8 },
    { name: "Checking accessibility features", duration: 7 },
    { name: "Generating recommendations", duration: 5 }
  ], []);

  useEffect(() => {
    if (isOpen) {
      const getEstimatedTime = () => {
        const categoryCount = categories.length;
        const baseTime = 20; // Base time in seconds
        const categoryMultiplier = 8; // Additional seconds per category
        const strategyMultiplier = strategy === 'mobile' ? 1.2 : 1.0;

        return Math.ceil((baseTime + (categoryCount * categoryMultiplier)) * strategyMultiplier);
      };

      setTimeElapsed(0);
      setCurrentPhase(0);
      const initialEstimate = getEstimatedTime();
      setEstimatedTimeRemaining(initialEstimate);

      intervalRef.current = setInterval(() => {
        setTimeElapsed(prev => {
          const newElapsed = prev + 1;

          // Update current phase based on elapsed time
          const totalPhaseDuration = phases.reduce((sum, phase) => sum + phase.duration, 0);
          const phaseProgress = (newElapsed / totalPhaseDuration) * phases.length;
          setCurrentPhase(Math.min(Math.floor(phaseProgress), phases.length - 1));

          // Update estimated time remaining
          const remaining = Math.max(0, initialEstimate - newElapsed);
          setEstimatedTimeRemaining(remaining);

          return newElapsed;
        });
      }, 1000);
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isOpen, categories.length, strategy, phases]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const getPhaseProgress = () => {
    const totalPhaseDuration = phases.reduce((sum, phase) => sum + phase.duration, 0);
    return Math.min((timeElapsed / totalPhaseDuration) * 100, 100);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-card border border-border rounded-lg p-4 sm:p-6 max-w-md w-full shadow-2xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex flex-col space-y-4 mb-6">
          <div className="flex items-start justify-between">
            <div className="flex items-center space-x-3 min-w-0 flex-1">
              <div className="flex h-12 w-12 sm:h-10 sm:w-10 items-center justify-center rounded-lg bg-primary text-white flex-shrink-0">
                <Loader2 className="h-6 w-6 sm:h-5 sm:w-5 animate-spin" />
              </div>
              <div className="min-w-0">
                <h2 className="text-xl sm:text-lg font-semibold text-foreground">Analyzing Page Speed</h2>
                <p className="text-sm text-muted-foreground">Please wait while we analyze your website</p>
              </div>
            </div>
            <button
              onClick={onCancel}
              className="p-2 hover:bg-muted rounded-lg transition-colors flex-shrink-0 ml-2"
            >
              <X className="h-4 w-4 text-muted-foreground" />
            </button>
          </div>
        </div>

        {/* Website Info */}
        <div className="mb-4 sm:mb-6 p-3 sm:p-4 bg-muted/30 rounded-lg">
          <div className="flex items-center space-x-2 mb-2">
            <Globe className="h-4 w-4 text-primary flex-shrink-0" />
            <span className="text-sm font-medium">Website:</span>
          </div>
          <p className="text-sm text-muted-foreground break-all">{url}</p>
          <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4 space-y-1 sm:space-y-0 mt-2 text-xs text-muted-foreground">
            <span>Strategy: {strategy}</span>
            <span>Categories: {categories.length}</span>
          </div>
        </div>

        {/* Timer Display */}
        <div className="mb-4 sm:mb-6">
          <div className="grid grid-cols-2 gap-4 mb-3">
            <div className="text-center sm:text-left">
              <div className="flex items-center justify-center sm:justify-start space-x-2 mb-1">
                <Timer className="h-4 w-4 text-primary" />
                <span className="text-xs sm:text-sm font-medium">Time Elapsed</span>
              </div>
              <span className="text-xl sm:text-2xl font-bold text-primary">{formatTime(timeElapsed)}</span>
            </div>
            <div className="text-center sm:text-right">
              <div className="text-xs sm:text-sm text-muted-foreground mb-1">Estimated remaining</div>
              <span className="text-sm sm:text-base font-medium text-muted-foreground">
                {estimatedTimeRemaining > 0 ? `~${formatTime(estimatedTimeRemaining)}` : 'Almost done'}
              </span>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="mb-3">
            <div className="bg-muted rounded-full h-2">
              <div
                className="bg-primary rounded-full h-2 transition-all duration-1000 ease-out"
                style={{ width: `${getPhaseProgress()}%` }}
              />
            </div>
          </div>
        </div>

        {/* Current Phase */}
        <div className="mb-4 sm:mb-6">
          <div className="flex items-center space-x-2 mb-2">
            <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
            <span className="text-sm font-medium text-foreground">Current Phase</span>
          </div>
          <p className="text-sm text-muted-foreground pl-4">{phases[currentPhase]?.name}</p>
        </div>

        {/* Phase Progress */}
        <div className="mb-4 sm:mb-6">
          <h4 className="text-sm font-medium text-foreground mb-3">Analysis Progress</h4>
          <div className="space-y-2 max-h-32 overflow-y-auto">
            {phases.map((phase, index) => (
              <div key={index} className="flex items-center space-x-2">
                <div className={`w-2 h-2 rounded-full flex-shrink-0 ${index < currentPhase ? 'bg-success' :
                  index === currentPhase ? 'bg-primary animate-pulse' :
                    'bg-muted'
                  }`} />
                <span className={`text-xs break-words ${index < currentPhase ? 'text-success' :
                  index === currentPhase ? 'text-foreground' :
                    'text-muted-foreground'
                  }`}>
                  {phase.name}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Information */}
        <div className="mb-4 sm:mb-6 p-3 sm:p-4 bg-blue-50 dark:bg-blue-950/30 rounded-lg">
          <div className="flex items-start space-x-2">
            <AlertCircle className="h-4 w-4 text-blue-600 mt-0.5 flex-shrink-0" />
            <div className="min-w-0">
              <p className="text-sm text-blue-800 dark:text-blue-200">
                <strong>PageSpeed analysis can take 1-3 minutes</strong> depending on your website&apos;s complexity and current API load.
              </p>
              <p className="text-xs text-blue-600 dark:text-blue-400 mt-1">
                We&apos;re using Google&apos;s official PageSpeed Insights API for accurate, professional results.
              </p>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3">
          <button
            onClick={onCancel}
            className="flex-1 px-4 py-3 sm:py-2 border border-border rounded-lg text-sm font-medium text-foreground hover:bg-muted transition-colors"
          >
            Cancel Analysis
          </button>
          <button
            disabled
            className="flex-1 px-4 py-3 sm:py-2 bg-primary text-white rounded-lg text-sm font-medium opacity-50 cursor-not-allowed"
          >
            Please Wait...
          </button>
        </div>
      </div>
    </div>
  );
};

export default function PageSpeedAuditorPage() {
  useAuth(); // Ensure user is authenticated
  const [url, setUrl] = useState("");
  const [strategy, setStrategy] = useState<'desktop' | 'mobile'>('desktop');
  const [categories, setCategories] = useState<string[]>(['performance', 'seo', 'accessibility', 'best-practices']);
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState<SeoAnalysis | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'saved' | 'error'>('idle');
  const [abortController, setAbortController] = useState<AbortController | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [modalCategory, setModalCategory] = useState<string>('');

  // Ref for recommendations section
  const recommendationsRef = useRef<HTMLDivElement>(null);

  const handleCategoryClick = (category: string) => {
    setSelectedCategory(category);
    // Smooth scroll to recommendations section
    setTimeout(() => {
      recommendationsRef.current?.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }, 100);
  };

  const handleDetailClick = (category: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setModalCategory(category);
    setShowDetailModal(true);
  };

  const getCategoryGuidance = (category: string) => {
    const guidance = {
      performance: {
        title: "Performance Optimization Guide",
        tips: [
          "Optimize images: Use WebP format and compress images",
          "Minimize JavaScript: Remove unused code and defer non-critical JS",
          "Enable text compression (Gzip/Brotli)",
          "Use a Content Delivery Network (CDN)",
          "Implement lazy loading for images and videos",
          "Minimize CSS and remove unused styles",
          "Optimize web fonts loading"
        ]
      },
      seo: {
        title: "SEO Improvement Guide",
        tips: [
          "Add descriptive meta titles and descriptions",
          "Use proper heading hierarchy (H1, H2, H3)",
          "Implement structured data (Schema markup)",
          "Optimize images with alt text",
          "Create an XML sitemap",
          "Fix crawl errors and broken links",
          "Ensure mobile-friendly design"
        ]
      },
      accessibility: {
        title: "Accessibility Enhancement Guide",
        tips: [
          "Add alt text to all images",
          "Ensure sufficient color contrast (4.5:1 ratio)",
          "Make all interactive elements keyboard accessible",
          "Use semantic HTML elements",
          "Add ARIA labels for screen readers",
          "Ensure form inputs have proper labels",
          "Test with screen reader software"
        ]
      },
      'best-practices': {
        title: "Best Practices Implementation Guide",
        tips: [
          "Use HTTPS for all pages",
          "Avoid deprecated JavaScript APIs",
          "Implement proper error handling",
          "Use modern JavaScript features",
          "Avoid console errors and warnings",
          "Implement proper caching strategies",
          "Follow security best practices"
        ]
      }
    };

    return guidance[category as keyof typeof guidance] || { title: "Improvement Guide", tips: [] };
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
    setResults(null);
    setSaveStatus('idle');

    // Create abort controller for cancellation
    const controller = new AbortController();
    setAbortController(controller);

    try {
      const normalizedUrl = normalizeUrl(url);
      const analysis = await seoService.analyzeWebsite(normalizedUrl, {
        strategy,
        categories,
      });

      if (!controller.signal.aborted) {
        setResults(analysis);
      }
    } catch (err) {
      if (!controller.signal.aborted) {
        if (err instanceof ApiError) {
          if (err.message.includes('API key')) {
            setError('Google PageSpeed API key is required for real data analysis. Please check your server configuration.');
          } else {
            setError(err.message);
          }
        } else {
          setError('An unexpected error occurred while analyzing the website.');
        }
      }
    } finally {
      if (!controller.signal.aborted) {
        setIsLoading(false);
      }
      setAbortController(null);
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

  const handleCancelAnalysis = () => {
    if (abortController) {
      abortController.abort();
    }
    setIsLoading(false);
    setAbortController(null);
  };

  const handleSaveReport = async () => {
    if (!results || !url) return;

    setSaveStatus('saving');
    try {
      // Save to database for history
      await reportService.saveReport(url, results);

      setSaveStatus('saved');
      setTimeout(() => setSaveStatus('idle'), 3000);
    } catch (error) {
      console.error('Error saving report:', error);
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

  // Add score interpretation functions
  const getScoreLabel = (score: number) => {
    if (score >= 90) return "Excellent";
    if (score >= 50) return "Needs Improvement";
    return "Poor";
  };

  const getScoreDescription = (score: number, category: string) => {
    const categoryDescriptions = {
      performance: {
        excellent: "Your site loads quickly and provides a great user experience",
        needs: "Your site has performance issues that may affect user experience",
        poor: "Your site loads slowly and needs immediate optimization"
      },
      seo: {
        excellent: "Your site is well-optimized for search engines",
        needs: "Your site has some SEO issues that should be addressed",
        poor: "Your site has critical SEO problems that need immediate attention"
      },
      accessibility: {
        excellent: "Your site is accessible to users with disabilities",
        needs: "Your site has accessibility issues that should be improved",
        poor: "Your site has serious accessibility barriers that need fixing"
      },
      bestPractices: {
        excellent: "Your site follows web development best practices",
        needs: "Your site has some best practice issues to address",
        poor: "Your site violates important web development standards"
      }
    };

    const desc = categoryDescriptions[category as keyof typeof categoryDescriptions];
    if (score >= 90) return desc.excellent;
    if (score >= 50) return desc.needs;
    return desc.poor;
  };

  const getScoreIcon = (score: number) => {
    if (score >= 90) return <CheckCircle className="h-4 w-4 text-success" />;
    if (score >= 50) return <AlertCircle className="h-4 w-4 text-warning" />;
    return <AlertCircle className="h-4 w-4 text-destructive" />;
  };

  return (
    <div className="p-4 sm:p-6">
      {/* Header */}
      <div className="mb-6 sm:mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center space-y-3 sm:space-y-0 sm:space-x-3">
          <div className="flex items-center space-x-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-yellow-500 text-white">
              <Zap className="h-5 w-5" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-foreground">Page Speed Auditor</h1>
            </div>
          </div>
          <div className="sm:ml-auto">
            <p className="text-sm text-muted-foreground">
              Comprehensive speed analysis & recommendations
            </p>
          </div>
        </div>
      </div>

      {/* Performance Score Disclaimer */}
      <PerformanceDisclaimer />

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
              <Search className="h-4 w-4" />
              <span>Audit Page Speed</span>
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
          {/* Data Source Indicator */}
          {/* Removed DataSourceIndicator */}

          {/* Overall Scores */}
          <div className="rounded-lg border border-border bg-card p-6 shadow-sm">
            <h2 className="text-xl font-semibold text-foreground mb-6">Analysis Scores</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div
                  className={`p-4 rounded-lg border-2 cursor-pointer transition-all hover:shadow-md ${getScoreBg(results.performance?.score || 0)} ${selectedCategory === 'performance' ? 'ring-2 ring-primary' : ''}`}
                  onClick={() => handleCategoryClick('performance')}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      <Zap className="h-5 w-5 text-primary" />
                      <span className="font-medium text-foreground">Performance</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      {getScoreIcon(results.performance?.score || 0)}
                      <span className={`text-2xl font-bold ${getScoreColor(results.performance?.score || 0)}`}>
                        {results.performance?.score || 0}
                      </span>
                      <span className="text-sm text-muted-foreground">/100</span>
                    </div>
                  </div>
                  <div className="mb-2">
                    <span className={`text-sm font-medium ${getScoreColor(results.performance?.score || 0)}`}>
                      {getScoreLabel(results.performance?.score || 0)}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {getScoreDescription(results.performance?.score || 0, 'performance')}
                  </p>
                  <div className="mt-3 bg-muted rounded-full h-2">
                    <div
                      className={`h-2 rounded-full transition-all duration-300 ${(results.performance?.score || 0) >= 90 ? 'bg-success' :
                        (results.performance?.score || 0) >= 50 ? 'bg-warning' : 'bg-destructive'
                        }`}
                      style={{ width: `${results.performance?.score || 0}%` }}
                    />
                  </div>
                  <div className="mt-2 text-xs text-primary">Click to see recommendations →</div>
                  <button
                    onClick={(e) => handleDetailClick('performance', e)}
                    className="mt-2 text-xs text-blue-600 hover:text-blue-800 underline"
                  >
                    View detailed guide
                  </button>
                </div>

                <div
                  className={`p-4 rounded-lg border-2 cursor-pointer transition-all hover:shadow-md ${getScoreBg(results.seo?.score || 0)} ${selectedCategory === 'seo' ? 'ring-2 ring-primary' : ''}`}
                  onClick={() => handleCategoryClick('seo')}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      <Search className="h-5 w-5 text-primary" />
                      <span className="font-medium text-foreground">SEO</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      {getScoreIcon(results.seo?.score || 0)}
                      <span className={`text-2xl font-bold ${getScoreColor(results.seo?.score || 0)}`}>
                        {results.seo?.score || 0}
                      </span>
                      <span className="text-sm text-muted-foreground">/100</span>
                    </div>
                  </div>
                  <div className="mb-2">
                    <span className={`text-sm font-medium ${getScoreColor(results.seo?.score || 0)}`}>
                      {getScoreLabel(results.seo?.score || 0)}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {getScoreDescription(results.seo?.score || 0, 'seo')}
                  </p>
                  <div className="mt-3 bg-muted rounded-full h-2">
                    <div
                      className={`h-2 rounded-full transition-all duration-300 ${(results.seo?.score || 0) >= 90 ? 'bg-success' :
                        (results.seo?.score || 0) >= 50 ? 'bg-warning' : 'bg-destructive'
                        }`}
                      style={{ width: `${results.seo?.score || 0}%` }}
                    />
                  </div>
                  <div className="mt-2 text-xs text-primary">Click to see recommendations →</div>
                  <button
                    onClick={(e) => handleDetailClick('seo', e)}
                    className="mt-2 text-xs text-blue-600 hover:text-blue-800 underline"
                  >
                    View detailed guide
                  </button>
                </div>
              </div>

              <div className="space-y-4">
                <div
                  className={`p-4 rounded-lg border-2 cursor-pointer transition-all hover:shadow-md ${getScoreBg(results.accessibility?.score || 0)} ${selectedCategory === 'accessibility' ? 'ring-2 ring-primary' : ''}`}
                  onClick={() => handleCategoryClick('accessibility')}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="h-5 w-5 text-primary" />
                      <span className="font-medium text-foreground">Accessibility</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      {getScoreIcon(results.accessibility?.score || 0)}
                      <span className={`text-2xl font-bold ${getScoreColor(results.accessibility?.score || 0)}`}>
                        {results.accessibility?.score || 0}
                      </span>
                      <span className="text-sm text-muted-foreground">/100</span>
                    </div>
                  </div>
                  <div className="mb-2">
                    <span className={`text-sm font-medium ${getScoreColor(results.accessibility?.score || 0)}`}>
                      {getScoreLabel(results.accessibility?.score || 0)}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {getScoreDescription(results.accessibility?.score || 0, 'accessibility')}
                  </p>
                  <div className="mt-3 bg-muted rounded-full h-2">
                    <div
                      className={`h-2 rounded-full transition-all duration-300 ${(results.accessibility?.score || 0) >= 90 ? 'bg-success' :
                        (results.accessibility?.score || 0) >= 50 ? 'bg-warning' : 'bg-destructive'
                        }`}
                      style={{ width: `${results.accessibility?.score || 0}%` }}
                    />
                  </div>
                  <div className="mt-2 text-xs text-primary">Click to see recommendations →</div>
                  <button
                    onClick={(e) => handleDetailClick('accessibility', e)}
                    className="mt-2 text-xs text-blue-600 hover:text-blue-800 underline"
                  >
                    View detailed guide
                  </button>
                </div>

                <div
                  className={`p-4 rounded-lg border-2 cursor-pointer transition-all hover:shadow-md ${getScoreBg(results.bestPractices?.score || 0)} ${selectedCategory === 'best-practices' ? 'ring-2 ring-primary' : ''}`}
                  onClick={() => handleCategoryClick('best-practices')}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="h-5 w-5 text-primary" />
                      <span className="font-medium text-foreground">Best Practices</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      {getScoreIcon(results.bestPractices?.score || 0)}
                      <span className={`text-2xl font-bold ${getScoreColor(results.bestPractices?.score || 0)}`}>
                        {results.bestPractices?.score || 0}
                      </span>
                      <span className="text-sm text-muted-foreground">/100</span>
                    </div>
                  </div>
                  <div className="mb-2">
                    <span className={`text-sm font-medium ${getScoreColor(results.bestPractices?.score || 0)}`}>
                      {getScoreLabel(results.bestPractices?.score || 0)}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {getScoreDescription(results.bestPractices?.score || 0, 'bestPractices')}
                  </p>
                  <div className="mt-3 bg-muted rounded-full h-2">
                    <div
                      className={`h-2 rounded-full transition-all duration-300 ${(results.bestPractices?.score || 0) >= 90 ? 'bg-success' :
                        (results.bestPractices?.score || 0) >= 50 ? 'bg-warning' : 'bg-destructive'
                        }`}
                      style={{ width: `${results.bestPractices?.score || 0}%` }}
                    />
                  </div>
                  <div className="mt-2 text-xs text-primary">Click to see recommendations →</div>
                  <button
                    onClick={(e) => handleDetailClick('best-practices', e)}
                    className="mt-2 text-xs text-blue-600 hover:text-blue-800 underline"
                  >
                    View detailed guide
                  </button>
                </div>
              </div>
            </div>

            {/* Score Legend */}
            <div className="mt-6 p-4 bg-muted/30 rounded-lg">
              <h4 className="font-medium text-foreground mb-3">Score Ranges</h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-success rounded-full"></div>
                  <span><strong>90-100:</strong> Excellent</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-warning rounded-full"></div>
                  <span><strong>50-89:</strong> Needs Improvement</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-destructive rounded-full"></div>
                  <span><strong>0-49:</strong> Poor</span>
                </div>
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
                  {/* eslint-disable-next-line jsx-a11y/alt-text */}
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
            <div ref={recommendationsRef} className="rounded-lg border border-border bg-card p-4 sm:p-6 shadow-sm">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
                <h3 className="text-lg font-semibold text-foreground">Recommendations</h3>
                {selectedCategory && (
                  <div className="flex items-center space-x-2 mt-2 sm:mt-0">
                    <span className="text-sm text-muted-foreground">Filtered by:</span>
                    <span className="px-2 py-1 bg-primary/10 text-primary rounded-full text-xs font-medium capitalize">
                      {selectedCategory}
                    </span>
                    <button
                      onClick={() => setSelectedCategory(null)}
                      className="text-xs text-muted-foreground hover:text-foreground underline"
                    >
                      Show all
                    </button>
                  </div>
                )}
              </div>
              <div className="space-y-4">
                {results.recommendations
                  .filter(recommendation =>
                    !selectedCategory ||
                    recommendation.category.toLowerCase().includes(selectedCategory.toLowerCase()) ||
                    selectedCategory === 'best-practices' && recommendation.category.toLowerCase().includes('best')
                  )
                  .map((recommendation, index: number) => (
                    <div key={index} className="rounded-lg border border-border p-4 hover:bg-muted/50 transition-colors">
                      <div className="flex flex-col sm:flex-row sm:items-start space-y-3 sm:space-y-0">
                        <div className="flex-1 min-w-0">
                          <div className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-2 mb-2">
                            <h4 className="font-medium text-foreground break-words">{recommendation.title}</h4>
                            <span className={`px-2 py-1 rounded-full text-xs font-medium w-fit ${getImpactColor(recommendation.impact)}`}>
                              {recommendation.priority}
                            </span>
                          </div>
                          <p className="text-sm text-muted-foreground break-words">{recommendation.description}</p>
                          <div className="text-xs text-muted-foreground mt-1">Category: {recommendation.category}</div>
                        </div>
                      </div>
                    </div>
                  ))}
                {results.recommendations.filter(recommendation =>
                  !selectedCategory ||
                  recommendation.category.toLowerCase().includes(selectedCategory.toLowerCase()) ||
                  selectedCategory === 'best-practices' && recommendation.category.toLowerCase().includes('best')
                ).length === 0 && selectedCategory && (
                    <div className="text-center py-8 text-muted-foreground">
                      <p>No recommendations found for &apos;{selectedCategory}&apos;. </p>
                      <button
                        onClick={() => setSelectedCategory(null)}
                        className="text-primary hover:underline mt-2"
                      >
                        View all recommendations
                      </button>
                    </div>
                  )}
              </div>
            </div>
          )}

          {/* Save Report Section */}
          <div className="rounded-lg border border-border bg-card p-4 sm:p-6 shadow-sm">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
              <div className="min-w-0">
                <h3 className="text-lg font-semibold text-foreground">Save Report</h3>
                <p className="text-sm text-muted-foreground">Save this analysis to your reports for future reference</p>
              </div>
              <button
                onClick={handleSaveReport}
                disabled={saveStatus === 'saving'}
                className="w-full sm:w-auto flex items-center justify-center space-x-2 rounded-lg bg-primary px-6 py-3 sm:py-2 text-white font-medium transition-colors hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
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
          <div className="rounded-lg border border-border bg-card p-4 sm:p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-foreground mb-4">Opportunities</h3>
            <div className="space-y-4">
              {(results.opportunities || []).length > 0 ? (
                (results.opportunities || []).map((opportunity, index: number) => (
                  <div key={index} className="rounded-lg border border-border p-4 hover:bg-muted/50 transition-colors">
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between space-y-3 sm:space-y-0">
                      <div className="flex-1 min-w-0">
                        <div className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-2 mb-2">
                          <h4 className="font-medium text-foreground break-words">{opportunity.title}</h4>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium w-fit ${getImpactColor(opportunity.impact)}`}>
                            {opportunity.impact}
                          </span>
                        </div>
                        <p className="text-sm text-muted-foreground break-words">{opportunity.description}</p>
                      </div>
                      <div className="text-left sm:text-right sm:ml-4 flex-shrink-0">
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
          <div className="rounded-lg border border-border bg-card p-4 sm:p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-foreground mb-4">Diagnostics</h3>
            <div className="space-y-4">
              {(results.diagnostics || []).map((diagnostic, index: number) => (
                <div key={index} className="rounded-lg border border-border p-4">
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between space-y-2 sm:space-y-0">
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium text-foreground mb-2">{diagnostic.title}</h4>
                      <p className="text-xs sm:text-sm text-muted-foreground break-words">{diagnostic.description}</p>
                    </div>
                    <div className="text-left sm:text-right sm:ml-4 flex-shrink-0">
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

      {/* Enhanced Loading Modal */}
      <PageSpeedLoadingModal
        isOpen={isLoading}
        onCancel={handleCancelAnalysis}
        url={url}
        strategy={strategy}
        categories={categories}
      />

      {/* Detail Guidance Modal */}
      {showDetailModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-card border border-border rounded-lg p-6 max-w-2xl w-full shadow-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-start justify-between mb-4">
              <h2 className="text-xl font-semibold text-foreground">
                {getCategoryGuidance(modalCategory).title}
              </h2>
              <button
                onClick={() => setShowDetailModal(false)}
                className="p-2 hover:bg-muted rounded-lg transition-colors"
              >
                <X className="h-4 w-4 text-muted-foreground" />
              </button>
            </div>

            <div className="mb-6">
              <p className="text-sm text-muted-foreground mb-4">
                Here are specific actionable steps to improve your {modalCategory} score:
              </p>

              <div className="space-y-3">
                {getCategoryGuidance(modalCategory).tips.map((tip, index) => (
                  <div key={index} className="flex items-start space-x-3 p-3 bg-muted/30 rounded-lg">
                    <div className="flex-shrink-0 w-6 h-6 bg-primary text-white rounded-full flex items-center justify-center text-xs font-medium">
                      {index + 1}
                    </div>
                    <p className="text-sm text-foreground">{tip}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3">
              <button
                onClick={() => {
                  setShowDetailModal(false);
                  handleCategoryClick(modalCategory);
                }}
                className="flex-1 px-4 py-2 bg-primary text-white rounded-lg text-sm font-medium hover:bg-primary-dark transition-colors"
              >
                View Specific Recommendations
              </button>
              <button
                onClick={() => setShowDetailModal(false)}
                className="flex-1 px-4 py-2 border border-border rounded-lg text-sm font-medium text-foreground hover:bg-muted transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 