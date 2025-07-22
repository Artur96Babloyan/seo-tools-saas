"use client";

import { useState } from 'react';
import { ArrowLeft, History, Plus } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { ContentOptimizationResponse } from '@/shared/types/seo-optimizer';
import ContentOptimizer from '@/components/seo-optimizer/ContentOptimizer';
import OptimizationResults from '@/components/seo-optimizer/OptimizationResults';
import OptimizationHistory from '@/components/seo-optimizer/OptimizationHistory';


export default function SeoOptimizerPage() {
  const router = useRouter();
  const [currentOptimization, setCurrentOptimization] = useState<ContentOptimizationResponse | null>(null);
  const [showHistory, setShowHistory] = useState(false);

  const handleOptimizationComplete = (result: ContentOptimizationResponse) => {
    setCurrentOptimization(result);
    setShowHistory(false);
  };

  const handleNewOptimization = () => {
    setCurrentOptimization(null);
    setShowHistory(false);
  };

  const handleViewHistory = () => {
    setShowHistory(true);
    setCurrentOptimization(null);
  };

  const handleViewOptimization = (id: string) => {
    // Navigate to individual optimization view
    router.push(`/dashboard/seo-optimizer/${id}`);
  };

  return (
    <div className="p-4 sm:p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-6 sm:mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => router.push('/dashboard')}
                className="inline-flex items-center space-x-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors text-sm sm:text-base"
              >
                <ArrowLeft className="h-4 w-4 sm:h-5 sm:w-5" />
                <span className="hidden sm:inline">Back to Dashboard</span>
                <span className="sm:hidden">Back</span>
              </button>
            </div>

            <div className="flex items-center space-x-2 sm:space-x-3">
              <button
                onClick={handleViewHistory}
                className={`inline-flex items-center space-x-2 px-3 sm:px-4 py-2 rounded-lg font-medium transition-colors text-sm ${showHistory
                  ? 'bg-purple-600 text-white'
                  : 'text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600'
                  }`}
              >
                <History className="h-4 w-4" />
                <span className="hidden sm:inline">History</span>
                <span className="sm:hidden">Hist</span>
              </button>

              {currentOptimization && (
                <button
                  onClick={handleNewOptimization}
                  className="inline-flex items-center space-x-2 px-3 sm:px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm"
                >
                  <Plus className="h-4 w-4" />
                  <span className="hidden sm:inline">New Optimization</span>
                  <span className="sm:hidden">New</span>
                </button>
              )}
            </div>
          </div>

          <div className="mt-4 sm:mt-6">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
              AI SEO Content Optimizer
            </h1>
            <p className="mt-2 text-base sm:text-lg text-gray-600 dark:text-gray-400">
              Optimize your content for better search engine rankings with AI-powered suggestions
            </p>
          </div>
        </div>

        {/* Main Content */}
        <div className="space-y-6 sm:space-y-8">
          {!showHistory && !currentOptimization && (
            <ContentOptimizer onOptimizationComplete={handleOptimizationComplete} />
          )}

          {!showHistory && currentOptimization && (
            <OptimizationResults
              result={currentOptimization}
              onNewOptimization={handleNewOptimization}
            />
          )}

          {showHistory && (
            <div className="space-y-4 sm:space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-3 sm:space-y-0">
                <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 dark:text-white">
                  Optimization History
                </h2>
                <button
                  onClick={handleNewOptimization}
                  className="inline-flex items-center space-x-2 px-3 sm:px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors text-sm"
                >
                  <Plus className="h-4 w-4" />
                  <span className="hidden sm:inline">New Optimization</span>
                  <span className="sm:hidden">New</span>
                </button>
              </div>

              <OptimizationHistory onViewOptimization={handleViewOptimization} />
            </div>
          )}
        </div>

        {/* Features Section */}
        {!showHistory && !currentOptimization && (
          <div className="mt-12 sm:mt-16">
            <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 dark:text-white mb-6 sm:mb-8">
              Why Use AI SEO Content Optimizer?
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              <div className="bg-white dark:bg-gray-800 rounded-lg p-4 sm:p-6 border border-gray-200 dark:border-gray-700">
                <div className="flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-lg bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 mb-3 sm:mb-4">
                  <svg className="h-5 w-5 sm:h-6 sm:w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  AI-Powered Optimization
                </h3>
                <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400">
                  Advanced AI algorithms analyze your content and provide intelligent suggestions for better SEO performance.
                </p>
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-lg p-4 sm:p-6 border border-gray-200 dark:border-gray-700">
                <div className="flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-lg bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 mb-3 sm:mb-4">
                  <svg className="h-5 w-5 sm:h-6 sm:w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  Real-time Analysis
                </h3>
                <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400">
                  Get instant feedback on your content with real-time character counting and validation.
                </p>
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-lg p-4 sm:p-6 border border-gray-200 dark:border-gray-700">
                <div className="flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-lg bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 mb-3 sm:mb-4">
                  <svg className="h-5 w-5 sm:h-6 sm:w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4" />
                  </svg>
                </div>
                <h3 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  Comprehensive Suggestions
                </h3>
                <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400">
                  Receive detailed suggestions for titles, content, meta descriptions, and keyword optimization.
                </p>
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-lg p-4 sm:p-6 border border-gray-200 dark:border-gray-700">
                <div className="flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-lg bg-yellow-100 dark:bg-yellow-900/30 text-yellow-600 dark:text-yellow-400 mb-3 sm:mb-4">
                  <svg className="h-5 w-5 sm:h-6 sm:w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  History & Tracking
                </h3>
                <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400">
                  Keep track of all your optimizations with detailed history and easy access to previous results.
                </p>
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-lg p-4 sm:p-6 border border-gray-200 dark:border-gray-700">
                <div className="flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-lg bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 mb-3 sm:mb-4">
                  <svg className="h-5 w-5 sm:h-6 sm:w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                </div>
                <h3 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  Export & Share
                </h3>
                <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400">
                  Export your optimized content in multiple formats and easily share results with your team.
                </p>
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-lg p-4 sm:p-6 border border-gray-200 dark:border-gray-700">
                <div className="flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-lg bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 mb-3 sm:mb-4">
                  <svg className="h-5 w-5 sm:h-6 sm:w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
                <h3 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  Auto-save & Security
                </h3>
                <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400">
                  Your work is automatically saved and secured with enterprise-grade encryption and privacy protection.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 