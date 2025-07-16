"use client";

import React, { useState } from 'react';
import { contentDecayService } from '@/lib/contentDecayService';
import { AnalysisResult } from '@/types/content-decay';
import {
  Search,
  AlertTriangle,
  TrendingDown,
  BarChart3,
  Clock,
  RefreshCw
} from 'lucide-react';

interface ContentDecayAnalysisProps {
  onAnalysisComplete: (results: AnalysisResult) => void;
  onNewAnalysis: () => void;
  results: AnalysisResult | null;
}

export default function ContentDecayAnalysis({
  onAnalysisComplete,
  onNewAnalysis,
  results
}: ContentDecayAnalysisProps) {
  const [siteUrl, setSiteUrl] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [validationError, setValidationError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!siteUrl.trim()) {
      setValidationError('Please enter a website URL');
      return;
    }

    if (!contentDecayService.validateUrl(siteUrl)) {
      setValidationError('Please enter a valid website URL (e.g., https://example.com)');
      return;
    }

    try {
      setIsAnalyzing(true);
      setError(null);
      setValidationError(null);

      console.log('Starting content decay analysis for URL:', siteUrl);
      console.log('Request object:', { siteUrl });

      const analysisResults = await contentDecayService.detectContentDecay({ siteUrl });
      console.log('Analysis completed successfully:', analysisResults);
      onAnalysisComplete(analysisResults);
    } catch (err) {
      console.error('Content decay analysis failed:', err);

      if (err instanceof Error) {
        if (err.message.includes('401')) {
          setError('Google Search Console not connected. Please connect your account first.');
        } else if (err.message.includes('400')) {
          setError('Invalid website URL or no data available for analysis.');
        } else if (err.message.includes('500')) {
          setError('Server error: The content decay detection service is currently unavailable. Please try again later.');
        } else {
          setError(err.message || 'Analysis failed. Please try again.');
        }
      } else {
        setError('An unexpected error occurred. Please try again.');
      }
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSubmit(e as unknown as React.FormEvent);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSiteUrl(e.target.value);
    if (validationError) {
      setValidationError(null);
    }
    if (error) {
      setError(null);
    }
  };



  if (results) {
    return (
      <div className="space-y-6">
        {/* Results Header */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                Content Decay Analysis Results
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                Analysis completed for {results.siteUrl}
              </p>
            </div>
            <button
              onClick={onNewAnalysis}
              className="inline-flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <RefreshCw className="h-4 w-4" />
              <span>New Analysis</span>
            </button>
          </div>
        </div>

        {/* Summary Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
            <div className="flex items-center space-x-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100 dark:bg-blue-900/20">
                <BarChart3 className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Pages Analyzed</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {results.totalPagesAnalyzed}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
            <div className="flex items-center space-x-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-red-100 dark:bg-red-900/20">
                <TrendingDown className="h-5 w-5 text-red-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Decayed Pages</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {results.summary.totalDecayedPages}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
            <div className="flex items-center space-x-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-orange-100 dark:bg-orange-900/20">
                <AlertTriangle className="h-5 w-5 text-orange-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Avg. Decay</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {contentDecayService.formatDecayPercentage(results.summary.averageDecayPercentage)}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Analysis Period */}
        <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
          <div className="flex items-center space-x-3">
            <Clock className="h-5 w-5 text-blue-600 dark:text-blue-400" />
            <div>
              <p className="font-medium text-blue-800 dark:text-blue-200">Analysis Period</p>
              <p className="text-sm text-blue-700 dark:text-blue-300">{results.analysisPeriod}</p>
            </div>
          </div>
        </div>

        {/* Decayed Pages */}
        {results.decayedPages.length > 0 ? (
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
              Decayed Pages ({results.decayedPages.length})
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Detailed page analysis will be displayed here once components are fully implemented.
            </p>
          </div>
        ) : (
          <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-6 text-center">
            <div className="flex items-center justify-center space-x-2 mb-2">
              <div className="w-8 h-8 bg-green-100 dark:bg-green-900/40 rounded-full flex items-center justify-center">
                <span className="text-green-600 dark:text-green-400 text-lg">✓</span>
              </div>
              <h3 className="text-lg font-semibold text-green-800 dark:text-green-200">
                No Content Decay Detected
              </h3>
            </div>
            <p className="text-green-700 dark:text-green-300">
              Great news! No significant content decay was detected in your website&apos;s pages.
            </p>
          </div>
        )}

        {/* Recommendations Panel */}
        {results.decayedPages.length > 0 && (
          <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-blue-800 dark:text-blue-200 mb-2">
              AI Recommendations
            </h3>
            <p className="text-blue-700 dark:text-blue-300">
              AI-powered recommendations will be displayed here once components are fully implemented.
            </p>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900/20 mb-4">
            <Search className="h-8 w-8 text-blue-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            Detect Content Decay
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            Enter your website URL to analyze content decay and get AI-powered recovery recommendations
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="siteUrl" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Website URL
            </label>
            <input
              type="text"
              id="siteUrl"
              value={siteUrl}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
              placeholder="https://example.com"
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white ${validationError ? 'border-red-500' : 'border-gray-300'
                }`}
              disabled={isAnalyzing}
            />
            <div className="mt-2 text-xs text-gray-500 dark:text-gray-400">
              Try: https://example.com or https://google.com for testing
            </div>
            {validationError && (
              <p className="mt-2 text-sm text-red-600 dark:text-red-400">{validationError}</p>
            )}
          </div>

          {error && (
            <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
              <div className="flex items-center space-x-2">
                <AlertTriangle className="h-5 w-5 text-red-600 dark:text-red-400" />
                <span className="text-red-700 dark:text-red-300">{error}</span>
              </div>
            </div>
          )}

          <button
            type="submit"
            disabled={isAnalyzing || !siteUrl.trim()}
            className="w-full inline-flex items-center justify-center space-x-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {isAnalyzing ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                <span>Analyzing Content Decay...</span>
              </>
            ) : (
              <>
                <Search className="h-5 w-5" />
                <span>Start Analysis</span>
              </>
            )}
          </button>
        </form>

        <div className="mt-6 p-4 bg-gray-50 dark:bg-gray-900/50 rounded-lg">
          <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
            What this analysis includes:
          </h3>
          <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
            <li>• Traffic decline analysis over 6 months</li>
            <li>• Keyword ranking changes</li>
            <li>• Click-through rate variations</li>
            <li>• AI-powered recovery recommendations</li>
            <li>• Priority-based action items</li>
          </ul>
        </div>
      </div>
    </div>
  );
} 