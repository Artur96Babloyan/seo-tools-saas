"use client";

import { useEffect, use } from 'react';
import { ArrowLeft, Plus } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useSeoOptimizer } from '@/hooks/useSeoOptimizer';
import OptimizationResults from '@/components/seo-optimizer/OptimizationResults';
import LoadingSpinner from '@/components/seo-optimizer/LoadingSpinner';

interface OptimizationDetailPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default function OptimizationDetailPage({ params }: OptimizationDetailPageProps) {
  const router = useRouter();
  const { id } = use(params);
  const { isLoading, error, currentOptimization, loadOptimization } = useSeoOptimizer();

  useEffect(() => {
    if (id) {
      loadOptimization(id);
    }
  }, [id, loadOptimization]);

  const handleNewOptimization = () => {
    router.push('/dashboard/seo-optimizer');
  };

  const handleBackToHistory = () => {
    router.push('/dashboard/seo-optimizer/history');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <LoadingSpinner text="Loading optimization details..." size="lg" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8">
          <div className="mb-6 sm:mb-8">
            <button
              onClick={handleBackToHistory}
              className="inline-flex items-center space-x-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
            >
              <ArrowLeft className="h-5 w-5" />
              <span className="text-sm sm:text-base">Back to History</span>
            </button>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-4 sm:p-8">
            <div className="text-center">
              <div className="mx-auto h-12 w-12 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center mb-4">
                <svg className="h-6 w-6 text-red-600 dark:text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                </svg>
              </div>
              <h2 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white mb-2">
                Error Loading Optimization
              </h2>
              <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 mb-4">
                {error}
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center space-y-2 sm:space-y-0 sm:space-x-3">
                <button
                  onClick={handleBackToHistory}
                  className="w-full sm:w-auto px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors text-sm"
                >
                  Back to History
                </button>
                <button
                  onClick={handleNewOptimization}
                  className="w-full sm:w-auto px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors text-sm"
                >
                  <Plus className="h-4 w-4 inline mr-2" />
                  New Optimization
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!currentOptimization) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8">
          <div className="mb-6 sm:mb-8">
            <button
              onClick={handleBackToHistory}
              className="inline-flex items-center space-x-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
            >
              <ArrowLeft className="h-5 w-5" />
              <span className="text-sm sm:text-base">Back to History</span>
            </button>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-4 sm:p-8">
            <div className="text-center">
              <div className="mx-auto h-12 w-12 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mb-4">
                <svg className="h-6 w-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h2 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white mb-2">
                Optimization Not Found
              </h2>
              <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 mb-4">
                The optimization you&apos;re looking for doesn&apos;t exist or has been deleted.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center space-y-2 sm:space-y-0 sm:space-x-3">
                <button
                  onClick={handleBackToHistory}
                  className="w-full sm:w-auto px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors text-sm"
                >
                  Back to History
                </button>
                <button
                  onClick={handleNewOptimization}
                  className="w-full sm:w-auto px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors text-sm"
                >
                  <Plus className="h-4 w-4 inline mr-2" />
                  New Optimization
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8">
        {/* Header */}
        <div className="mb-6 sm:mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
            <div className="flex items-center space-x-4">
              <button
                onClick={handleBackToHistory}
                className="inline-flex items-center space-x-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
              >
                <ArrowLeft className="h-5 w-5" />
                <span className="text-sm sm:text-base">Back to History</span>
              </button>
            </div>

            <button
              onClick={handleNewOptimization}
              className="inline-flex items-center justify-center space-x-2 px-3 sm:px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors text-sm"
            >
              <Plus className="h-4 w-4" />
              <span className="hidden sm:inline">New Optimization</span>
              <span className="sm:hidden">New</span>
            </button>
          </div>

          <div className="mt-4 sm:mt-6">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
              Optimization Details
            </h1>
            <p className="mt-2 text-base sm:text-lg text-gray-600 dark:text-gray-400">
              View the complete optimization results and suggestions
            </p>
          </div>
        </div>

        {/* Optimization Results */}
        <OptimizationResults
          result={currentOptimization}
          onNewOptimization={handleNewOptimization}
        />
      </div>
    </div>
  );
} 