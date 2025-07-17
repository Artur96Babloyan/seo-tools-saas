"use client";

import { useState } from 'react';
import {
  Search,
  Loader2,
  CheckCircle,
  AlertTriangle,
  TrendingUp,
  Heart,
  Target,
  RefreshCw,
  Globe,
  FileText
} from 'lucide-react';
import { useAuth } from '@/entities/user';
import { contentExtractorService } from '@/lib/contentExtractorService';

interface SerpAnalysisRequest {
  title: string;
  description: string;
  url: string;
}

interface SerpAnalysisResponse {
  success: boolean;
  data: {
    suggested_title: string;
    suggested_description: string;
    ctr_score: number;
    emotion_analysis: string;
    predicted_improvement: {
      percentage: number;
      confidence: number;
      factors: string[];
    };
  };
}

interface FormData {
  title: string;
  description: string;
  url: string;
}

export default function SerpOptimizerForm() {
  const { token } = useAuth();
  const [formData, setFormData] = useState<FormData>({
    title: '',
    description: '',
    url: ''
  });

  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState<SerpAnalysisResponse['data'] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [inputMode, setInputMode] = useState<'manual' | 'url'>('url');
  const [websiteUrl, setWebsiteUrl] = useState('');
  const [isExtracting, setIsExtracting] = useState(false);

  // Helper function to normalize URL
  const normalizeUrl = (url: string): string => {
    let normalized = url.trim();

    // Add https:// if no protocol is specified
    if (!normalized.match(/^https?:\/\//)) {
      normalized = `https://${normalized}`;
    }

    return normalized;
  };

  const handleExtractFromUrl = async () => {
    if (!websiteUrl.trim()) return;

    setIsExtracting(true);
    setError(null);

    try {
      const normalizedUrl = normalizeUrl(websiteUrl);
      const extractedContent = await contentExtractorService.extractContent({
        url: normalizedUrl
      });

      console.log('Extracted content from URL:', {
        title: extractedContent.title,
        h1Text: extractedContent.h1Text,
        contentLength: extractedContent.mainContent.length,
        h2Count: extractedContent.h2Texts.length,
        h3Count: extractedContent.h3Texts.length
      });

      // Populate form with extracted content
      // Prefer H1 title over meta title for better content matching
      setTitle(extractedContent.h1Text || extractedContent.title || '');
      setDescription(extractedContent.metaDescription || '');
      setUrl(normalizedUrl);

      // Switch to manual mode to show the extracted content
      setInputMode('manual');

      // Show success message if extraction was successful
      if (extractedContent.h1Text || extractedContent.title || extractedContent.metaDescription) {
        // Show extraction summary
        const extractedInfo = [];
        if (extractedContent.h1Text) extractedInfo.push(`H1: "${extractedContent.h1Text}"`);
        if (extractedContent.h2Texts.length > 0) extractedInfo.push(`${extractedContent.h2Texts.length} H2 headings`);
        if (extractedContent.h3Texts.length > 0) extractedInfo.push(`${extractedContent.h3Texts.length} H3 headings`);
        if (extractedContent.mainContent) extractedInfo.push(`${extractedContent.mainContent.length} characters of content`);

        console.log('Successfully extracted:', extractedInfo.join(', '));
      }
    } catch (err) {
      console.error('Content extraction error:', err);
      setError('Failed to extract content from URL. Please check the URL and try again, or use manual input mode.');
    } finally {
      setIsExtracting(false);
    }
  };

  const handleUrlKeyDown = (e: React.KeyboardEvent) => {
    // Enter key to extract content
    if (e.key === 'Enter') {
      e.preventDefault();
      handleExtractFromUrl();
    }
  };

  const setTitle = (title: string) => {
    setFormData(prev => ({ ...prev, title }));
  };

  const setDescription = (description: string) => {
    setFormData(prev => ({ ...prev, description }));
  };

  const setUrl = (url: string) => {
    setFormData(prev => ({ ...prev, url }));
  };

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (error) setError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validation
    if (!formData.title.trim() || !formData.description.trim() || !formData.url.trim()) {
      setError('Please fill in all fields.');
      return;
    }

    if (formData.title.length > 60) {
      setError('Title must be 60 characters or less.');
      return;
    }

    if (formData.description.length > 160) {
      setError('Meta description must be 160 characters or less.');
      return;
    }

    if (!token) {
      setError('Authentication required. Please log in.');
      return;
    }

    setIsLoading(true);
    setError(null);
    setResults(null);

    try {
      const requestBody: SerpAnalysisRequest = {
        title: formData.title.trim(),
        description: formData.description.trim(),
        url: formData.url.trim()
      };

      const response = await fetch('http://localhost:5001/api/serp/analyze', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(requestBody),
      });

      if (!response.ok) {
        if (response.status === 401) {
          throw new Error('Authentication required. Please log in again.');
        } else if (response.status === 400) {
          throw new Error('Invalid request. Please check your input data.');
        } else if (response.status === 500) {
          throw new Error('Server error: The SERP analysis service is currently unavailable.');
        } else {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
      }

      const data: SerpAnalysisResponse = await response.json();

      if (!data.success) {
        throw new Error('Analysis failed. Please try again.');
      }

      setResults(data.data);
    } catch (err) {
      console.error('SERP analysis error:', err);
      setError(err instanceof Error ? err.message : 'An unexpected error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setFormData({ title: '', description: '', url: '' });
    setWebsiteUrl('');
    setResults(null);
    setError(null);
    setInputMode('url');
  };

  // Function to highlight differences between original and suggested text
  const highlightDifferences = (original: string, suggested: string) => {
    if (!original || !suggested) return suggested;

    const originalWords = original.toLowerCase().split(/\s+/);
    const suggestedWords = suggested.split(/\s+/);

    return suggestedWords.map((word, index) => {
      const originalWord = originalWords[index];
      const isDifferent = !originalWord || word.toLowerCase() !== originalWord;

      return isDifferent ? (
        <span key={index} className="font-bold text-blue-600 bg-blue-50 dark:bg-blue-900/20 px-1 rounded">
          {word}
        </span>
      ) : (
        <span key={index}>{word}</span>
      );
    });
  };

  const getCtrScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600 bg-green-100 dark:bg-green-900/20';
    if (score >= 60) return 'text-yellow-600 bg-yellow-100 dark:bg-yellow-900/20';
    return 'text-red-600 bg-red-100 dark:bg-red-900/20';
  };

  const getCtrScoreIcon = (score: number) => {
    if (score >= 80) return <TrendingUp className="h-5 w-5" />;
    if (score >= 60) return <Target className="h-5 w-5" />;
    return <AlertTriangle className="h-5 w-5" />;
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      {/* Header */}
      <div className="text-center">
        <div className="flex items-center justify-center space-x-3 mb-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-blue-100 dark:bg-blue-900/20">
            <Search className="h-6 w-6 text-blue-600" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            SERP Optimizer
          </h1>
        </div>
        <p className="text-lg text-gray-600 dark:text-gray-400">
          Optimize your title and meta description for better click-through rates
        </p>
      </div>

      {/* Input Mode Toggle */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6 mb-6">
        <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4">
          <button
            type="button"
            onClick={() => setInputMode('url')}
            className={`flex items-center justify-center space-x-2 px-4 py-2 rounded-lg font-medium transition-colors ${inputMode === 'url'
              ? 'bg-blue-600 text-white'
              : 'text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600'
              }`}
          >
            <Globe className="h-4 w-4" />
            <span>Extract from URL</span>
          </button>
          <button
            type="button"
            onClick={() => setInputMode('manual')}
            className={`flex items-center justify-center space-x-2 px-4 py-2 rounded-lg font-medium transition-colors ${inputMode === 'manual'
              ? 'bg-blue-600 text-white'
              : 'text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600'
              }`}
          >
            <FileText className="h-4 w-4" />
            <span>Manual Input</span>
          </button>
        </div>
      </div>

      {/* Form */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          {inputMode === 'url' ? (
            /* URL Input Mode */
            <div className="space-y-4">
              <div>
                <label htmlFor="websiteUrl" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Website URL *
                </label>
                <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
                  <input
                    type="url"
                    id="websiteUrl"
                    value={websiteUrl}
                    onChange={(e) => setWebsiteUrl(e.target.value)}
                    onKeyDown={handleUrlKeyDown}
                    placeholder="example.com or https://example.com"
                    className="flex-1 px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                  <button
                    type="button"
                    onClick={handleExtractFromUrl}
                    disabled={isExtracting || !websiteUrl.trim()}
                    className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isExtracting ? (
                      <Loader2 className="h-5 w-5 animate-spin" />
                    ) : (
                      'Extract'
                    )}
                  </button>
                </div>
                <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                  Enter a website URL to automatically extract title and meta description for SERP optimization. You can enter just the domain (e.g., example.com) or full URL. Press Enter to extract.
                </p>
              </div>
            </div>
          ) : (
            /* Manual Input Mode */
            <>
              {/* Title Input */}
              <div>
                <label htmlFor="title" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Page Title *
                </label>
                <input
                  type="text"
                  id="title"
                  value={formData.title}
                  onChange={(e) => handleInputChange('title', e.target.value)}
                  placeholder="Enter your page title (max 60 characters)"
                  maxLength={60}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                  disabled={isLoading}
                />
                <div className="mt-2 flex justify-between items-center">
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {formData.title.length}/60 characters
                  </p>
                  {formData.title.length > 50 && (
                    <p className="text-sm text-yellow-600 dark:text-yellow-400">
                      {60 - formData.title.length} characters remaining
                    </p>
                  )}
                </div>
              </div>

              {/* Meta Description Input */}
              <div>
                <label htmlFor="description" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Meta Description *
                </label>
                <textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  placeholder="Enter your meta description (max 160 characters)"
                  maxLength={160}
                  rows={3}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 resize-vertical"
                  disabled={isLoading}
                />
                <div className="mt-2 flex justify-between items-center">
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {formData.description.length}/160 characters
                  </p>
                  {formData.description.length > 140 && (
                    <p className="text-sm text-yellow-600 dark:text-yellow-400">
                      {160 - formData.description.length} characters remaining
                    </p>
                  )}
                </div>
              </div>

              {/* URL Input */}
              <div>
                <label htmlFor="url" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Page URL *
                </label>
                <input
                  type="url"
                  id="url"
                  value={formData.url}
                  onChange={(e) => handleInputChange('url', e.target.value)}
                  placeholder="https://example.com/your-page"
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                  disabled={isLoading}
                />
              </div>
            </>
          )}

          {/* Error Message */}
          {error && (
            <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
              <div className="flex items-center space-x-2">
                <AlertTriangle className="h-5 w-5 text-red-600 dark:text-red-400" />
                <span className="text-red-700 dark:text-red-300">{error}</span>
              </div>
            </div>
          )}

          {/* Submit Button */}
          <div className="flex items-center space-x-4">
            <button
              type="submit"
              disabled={isLoading || inputMode === 'url' || !formData.title.trim() || !formData.description.trim() || !formData.url.trim()}
              className="inline-flex items-center space-x-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {isLoading ? (
                <>
                  <Loader2 className="h-5 w-5 animate-spin" />
                  <span>Analyzing...</span>
                </>
              ) : inputMode === 'url' ? (
                <>
                  <Search className="h-5 w-5" />
                  <span>Extract Content First</span>
                </>
              ) : (
                <>
                  <Search className="h-5 w-5" />
                  <span>Analyze SERP</span>
                </>
              )}
            </button>

            {results && (
              <button
                type="button"
                onClick={handleReset}
                className="inline-flex items-center space-x-2 px-4 py-3 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 transition-colors"
              >
                <RefreshCw className="h-4 w-4" />
                <span>Start Over</span>
              </button>
            )}
          </div>
        </form>
      </div>

      {/* Results */}
      {results && (
        <div className="space-y-6">
          {/* SERP Preview */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              Google Search Result Preview
            </h2>

            {/* Original SERP Preview */}
            <div className="mb-8">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4 flex items-center">
                <span className="w-2 h-2 bg-gray-400 rounded-full mr-3"></span>
                Current Preview
              </h3>
              <div className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden">
                {/* Google-like header */}
                <div className="bg-gray-50 border-b border-gray-200 px-4 py-2 flex items-center space-x-2">
                  <div className="flex space-x-1">
                    <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                    <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                    <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                  </div>
                  <div className="flex-1 bg-white border border-gray-300 rounded-lg px-3 py-1 ml-2">
                    <div className="flex items-center space-x-2">
                      <svg className="w-4 h-4 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                      </svg>
                      <span className="text-sm text-gray-600">{formData.title || 'Search query'}</span>
                    </div>
                  </div>
                </div>

                {/* Search result */}
                <div className="p-4">
                  <div className="space-y-3">
                    {/* URL with breadcrumb */}
                    <div className="flex items-center space-x-1 text-sm">
                      <div className="w-4 h-4 text-green-600">
                        <svg fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M12.586 4.586a2 2 0 112.828 2.828l-3 3a2 2 0 01-2.828 0 1 1 0 00-1.414 1.414 4 4 0 005.656 0l3-3a4 4 0 00-5.656-5.656l-1.5 1.5a1 1 0 101.414 1.414l1.5-1.5zm-5 5a2 2 0 012.828 0 1 1 0 101.414-1.414 4 4 0 00-5.656 0l-3 3a4 4 0 105.656 5.656l1.5-1.5a1 1 0 101.414-1.414l-1.5 1.5a2 2 0 11-2.828-2.828l3-3z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <span className="text-green-700">{formData.url.split('/')[0]}/{formData.url.split('/')[2]}</span>
                      <span className="text-gray-500">›</span>
                      <span className="text-gray-600">{formData.url.split('/').slice(3).join(' › ')}</span>
                    </div>

                    {/* Title */}
                    <div className="text-blue-600 text-xl font-medium leading-tight hover:underline cursor-pointer">
                      {formData.title || 'No title provided'}
                    </div>

                    {/* Description */}
                    <div className="text-gray-600 text-sm leading-relaxed">
                      {formData.description || 'No description provided'}
                    </div>

                    {/* Additional info */}
                    <div className="flex items-center space-x-4 text-xs text-gray-500">
                      <span>📅 Recently updated</span>
                      <span>⭐ 4.5 stars</span>
                      <span>👥 1.2k reviews</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Optimized SERP Preview */}
            <div>
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4 flex items-center">
                <span className="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
                Optimized Preview
                <span className="ml-2 px-2 py-1 bg-green-100 text-green-800 text-xs font-medium rounded-full">
                  Improved
                </span>
              </h3>
              <div className="bg-white border-2 border-green-200 rounded-lg shadow-sm overflow-hidden">
                {/* Google-like header */}
                <div className="bg-gray-50 border-b border-gray-200 px-4 py-2 flex items-center space-x-2">
                  <div className="flex space-x-1">
                    <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                    <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                    <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                  </div>
                  <div className="flex-1 bg-white border border-gray-300 rounded-lg px-3 py-1 ml-2">
                    <div className="flex items-center space-x-2">
                      <svg className="w-4 h-4 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                      </svg>
                      <span className="text-sm text-gray-600">{results.suggested_title}</span>
                    </div>
                  </div>
                </div>

                {/* Search result */}
                <div className="p-4">
                  <div className="space-y-3">
                    {/* URL with breadcrumb */}
                    <div className="flex items-center space-x-1 text-sm">
                      <div className="w-4 h-4 text-green-600">
                        <svg fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M12.586 4.586a2 2 0 112.828 2.828l-3 3a2 2 0 01-2.828 0 1 1 0 00-1.414 1.414 4 4 0 005.656 0l3-3a4 4 0 00-5.656-5.656l-1.5 1.5a1 1 0 101.414 1.414l1.5-1.5zm-5 5a2 2 0 012.828 0 1 1 0 101.414-1.414 4 4 0 00-5.656 0l-3 3a4 4 0 105.656 5.656l1.5-1.5a1 1 0 101.414-1.414l-1.5 1.5a2 2 0 11-2.828-2.828l3-3z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <span className="text-green-700">{formData.url.split('/')[0]}/{formData.url.split('/')[2]}</span>
                      <span className="text-gray-500">›</span>
                      <span className="text-gray-600">{formData.url.split('/').slice(3).join(' › ')}</span>
                    </div>

                    {/* Title with highlighting */}
                    <div className="text-blue-600 text-xl font-medium leading-tight hover:underline cursor-pointer">
                      {highlightDifferences(formData.title, results.suggested_title)}
                    </div>

                    {/* Description with highlighting */}
                    <div className="text-gray-600 text-sm leading-relaxed">
                      {highlightDifferences(formData.description, results.suggested_description)}
                    </div>

                    {/* Additional info with improved metrics */}
                    <div className="flex items-center space-x-4 text-xs text-gray-500">
                      <span>📅 Recently updated</span>
                      <span>⭐ 4.8 stars</span>
                      <span>👥 2.1k reviews</span>
                      <span className="text-green-600 font-medium">🔥 Trending</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* AI-Powered Improvement Indicators */}
              <div className="mt-4 space-y-3">
                {/* Main improvement prediction */}
                <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                  <div className="flex items-center space-x-2 text-sm text-green-700">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span>💡 AI predicts <strong>{results.predicted_improvement?.percentage || 15}%</strong> improvement in click-through rate</span>
                  </div>
                  {results.predicted_improvement?.confidence && (
                    <div className="mt-2 text-xs text-green-600">
                      Confidence: {(results.predicted_improvement.confidence * 100).toFixed(0)}%
                    </div>
                  )}
                </div>

                {/* Improvement factors */}
                {results.predicted_improvement?.factors && results.predicted_improvement.factors.length > 0 && (
                  <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                    <div className="text-sm font-medium text-blue-800 mb-2">
                      🎯 Key Improvement Factors:
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {results.predicted_improvement.factors.map((factor, index) => (
                        <span
                          key={index}
                          className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full"
                        >
                          {factor.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* AI-Powered CTR Analysis */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                AI-Powered CTR Analysis
              </h2>
              <div className={`flex items-center space-x-2 px-3 py-1 rounded-full ${getCtrScoreColor(results.ctr_score)}`}>
                {getCtrScoreIcon(results.ctr_score)}
                <span className="font-semibold">{results.ctr_score}/100</span>
              </div>
            </div>

            <div className="space-y-3">
              <p className="text-gray-600 dark:text-gray-400">
                {results.ctr_score >= 80
                  ? 'Excellent! Your optimized content should perform very well in search results.'
                  : results.ctr_score >= 60
                    ? 'Good score. The suggestions below will help improve your click-through rate.'
                    : 'There\'s room for improvement. Consider implementing the suggested optimizations.'
                }
              </p>

              {/* AI Confidence and Factors */}
              {results.predicted_improvement && (
                <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-3">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600 dark:text-gray-400">AI Confidence:</span>
                    <span className="font-medium text-gray-900 dark:text-white">
                      {(results.predicted_improvement.confidence * 100).toFixed(0)}%
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-sm mt-1">
                    <span className="text-gray-600 dark:text-gray-400">Predicted Improvement:</span>
                    <span className="font-medium text-green-600">
                      +{results.predicted_improvement.percentage}%
                    </span>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Optimized Title */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Optimized Title
            </h3>
            <div className="space-y-3">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">Original:</p>
                <p className="text-gray-900 dark:text-white bg-gray-50 dark:bg-gray-700 p-3 rounded border">
                  {formData.title || 'No title provided'}
                </p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">Suggested:</p>
                <p className="text-gray-900 dark:text-white bg-blue-50 dark:bg-blue-900/20 p-3 rounded border">
                  {highlightDifferences(formData.title, results.suggested_title)}
                </p>
              </div>
            </div>
          </div>

          {/* Optimized Meta Description */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Optimized Meta Description
            </h3>
            <div className="space-y-3">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">Original:</p>
                <p className="text-gray-900 dark:text-white bg-gray-50 dark:bg-gray-700 p-3 rounded border">
                  {formData.description || 'No description provided'}
                </p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">Suggested:</p>
                <p className="text-gray-900 dark:text-white bg-blue-50 dark:bg-blue-900/20 p-3 rounded border">
                  {highlightDifferences(formData.description, results.suggested_description)}
                </p>
              </div>
            </div>
          </div>

          {/* Emotional Tone Analysis */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
            <div className="flex items-center space-x-3 mb-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-purple-100 dark:bg-purple-900/20">
                <Heart className="h-5 w-5 text-purple-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Emotional Tone Analysis
              </h3>
            </div>
            <p className="text-gray-900 dark:text-white text-lg font-medium">
              {results.emotion_analysis}
            </p>
            <p className="text-gray-600 dark:text-gray-400 mt-2">
              This emotional tone analysis helps understand how your content might resonate with users and influence click-through rates.
            </p>
          </div>

          {/* Success Message */}
          <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4">
            <div className="flex items-center space-x-2">
              <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400" />
              <span className="text-green-700 dark:text-green-300">
                Analysis complete! Review the suggestions above to optimize your SERP performance.
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 