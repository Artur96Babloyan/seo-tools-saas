"use client";

import { useState, useEffect } from 'react';
import {
  Search,
  Filter,
  Eye,
  Trash2,
  ChevronLeft,
  ChevronRight,
  FileText
} from 'lucide-react';
import { useSeoOptimizer } from '@/hooks/useSeoOptimizer';
import LoadingSpinner from './LoadingSpinner';
import CopyToClipboard from './CopyToClipboard';

interface OptimizationHistoryProps {
  onViewOptimization?: (id: string) => void;
  className?: string;
}

export default function OptimizationHistory({
  onViewOptimization,
  className = ""
}: OptimizationHistoryProps) {
  const {
    isLoading,
    error,
    optimizationHistory,
    filters,
    loadOptimizationHistory,
    deleteOptimization
  } = useSeoOptimizer();

  const [searchTerm, setSearchTerm] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');


  // Load history on component mount
  useEffect(() => {
    loadOptimizationHistory();
  }, []); // Only run on mount

  // Handle search with debounce
  useEffect(() => {
    if (searchTerm === '') {
      // If search is cleared, load without search filter
      loadOptimizationHistory({ search: undefined, page: 1 });
      return;
    }

    const timeoutId = setTimeout(() => {
      loadOptimizationHistory({ search: searchTerm, page: 1 });
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [searchTerm, loadOptimizationHistory]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    loadOptimizationHistory({ search: searchTerm, page: 1 });
  };



  const handleDateFilter = () => {
    loadOptimizationHistory({
      dateFrom: dateFrom || undefined,
      dateTo: dateTo || undefined,
      page: 1
    });
  };

  const handleClearFilters = () => {
    setSearchTerm('');
    setDateFrom('');
    setDateTo('');
    loadOptimizationHistory({
      search: undefined,
      dateFrom: undefined,
      dateTo: undefined,
      sortBy: 'createdAt',
      sortOrder: 'desc',
      page: 1
    });
  };

  const handlePageChange = (page: number) => {
    loadOptimizationHistory({ page });
  };

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this optimization?')) {
      try {
        await deleteOptimization(id);
      } catch {
      }
    }
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
    <div className={`bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 ${className}`}>
      {/* Header */}
      <div className="p-4 sm:p-6 border-b border-gray-200 dark:border-gray-700">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
          <div className="flex items-center space-x-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400">
              <FileText className="h-5 w-5" />
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white">
                Optimization History
              </h2>
              <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
                View and manage your content optimizations
              </p>
            </div>
          </div>

          <button
            onClick={() => setShowFilters(!showFilters)}
            className="inline-flex items-center space-x-2 px-3 sm:px-4 py-2 text-sm text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
          >
            <Filter className="h-4 w-4" />
            <span className="hidden sm:inline">Filters</span>
          </button>
        </div>

        {/* Search and Filters */}
        <div className="mt-4 space-y-4">
          {/* Search */}
          <form onSubmit={handleSearch} className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search by title, content, or keyword..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm"
              />
            </div>
            <button
              type="submit"
              className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors text-sm font-medium"
            >
              Search
            </button>
          </form>

          {/* Advanced Filters */}
          {showFilters && (
            <div className="p-4 bg-gray-50 dark:bg-gray-900 rounded-lg space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Date From
                  </label>
                  <input
                    type="date"
                    value={dateFrom}
                    onChange={(e) => setDateFrom(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Date To
                  </label>
                  <input
                    type="date"
                    value={dateTo}
                    onChange={(e) => setDateTo(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm"
                  />
                </div>
                <div className="flex items-end space-x-2 sm:col-span-2 lg:col-span-1">
                  <button
                    onClick={handleDateFilter}
                    className="flex-1 sm:flex-none px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm"
                  >
                    Apply
                  </button>
                  <button
                    onClick={handleClearFilters}
                    className="flex-1 sm:flex-none px-4 py-2 text-gray-700 dark:text-gray-300 bg-gray-200 dark:bg-gray-700 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors text-sm"
                  >
                    Clear
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <div className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg mx-4 sm:mx-6 mt-4">
          <p className="text-sm text-red-800 dark:text-red-200">{error}</p>
        </div>
      )}

      {/* Loading State */}
      {isLoading && (
        <div className="p-4 sm:p-8">
          <LoadingSpinner text="Loading optimization history..." />
        </div>
      )}

      {/* Content */}
      {!isLoading && (
        <>
          {/* Card View for All Screen Sizes */}
          <div className="w-full">
            {!optimizationHistory || optimizationHistory.length === 0 ? (
              <div className="p-8 text-center">
                <div className="flex flex-col items-center space-y-2">
                  <FileText className="h-12 w-12 text-gray-400" />
                  <p className="text-gray-500 dark:text-gray-400">No optimizations found</p>
                  {searchTerm && (
                    <p className="text-sm text-gray-400">Try adjusting your search criteria</p>
                  )}
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 p-4">
                {optimizationHistory.map((optimization) => (
                  <div
                    key={optimization.id}
                    className="bg-white dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600 p-4 hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1 min-w-0">
                        <h3 className="text-sm font-medium text-gray-900 dark:text-white truncate">
                          {optimization.optimizedTitle}
                        </h3>
                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 line-clamp-2">
                          {optimization.optimizedContent && typeof optimization.optimizedContent === 'object' && 'mainContent' in optimization.optimizedContent
                            ? optimization.optimizedContent.mainContent
                            : typeof optimization.optimizedContent === 'string'
                              ? optimization.optimizedContent
                              : 'No preview available'}
                        </p>
                      </div>
                      <div className="flex items-center space-x-2 ml-3">
                        {onViewOptimization && (
                          <button
                            onClick={() => onViewOptimization(optimization.id)}
                            className="text-purple-600 dark:text-purple-400 hover:text-purple-900 dark:hover:text-purple-300 transition-colors p-1"
                            title="View details"
                          >
                            <Eye className="h-4 w-4" />
                          </button>
                        )}
                        <CopyToClipboard
                          text={`${optimization.optimizedTitle}\n\n${optimization.optimizedContent && typeof optimization.optimizedContent === 'object' && 'mainContent' in optimization.optimizedContent
                            ? `${optimization.optimizedContent.h1 || 'No title'}\n\n${optimization.optimizedContent.mainContent}`
                            : typeof optimization.optimizedContent === 'string'
                              ? optimization.optimizedContent
                              : 'No content available'}`}
                          variant="icon"
                        />
                        <button
                          onClick={() => handleDelete(optimization.id)}
                          className="text-red-600 dark:text-red-400 hover:text-red-900 dark:hover:text-red-300 transition-colors p-1"
                          title="Delete optimization"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-2 text-xs">
                      <span className="inline-flex items-center px-2 py-1 rounded-full font-medium bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200">
                        {optimization.focusKeyword}
                      </span>
                      <span className="inline-flex items-center px-2 py-1 rounded-full font-medium bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200">
                        {optimization.suggestions?.length || 0} suggestions
                      </span>
                      <span className="text-gray-500 dark:text-gray-400">
                        {formatDate(optimization.createdAt)}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </>
      )}

      {/* Pagination */}
      {!isLoading && optimizationHistory && optimizationHistory.length > 0 && (
        <div className="px-4 sm:px-6 py-4 border-t border-gray-200 dark:border-gray-700">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-3 sm:space-y-0">
            <div className="text-sm text-gray-700 dark:text-gray-300 text-center sm:text-left">
              Showing {optimizationHistory.length} results
            </div>
            <div className="flex items-center justify-center space-x-2">
              <button
                onClick={() => handlePageChange(Math.max(1, (filters.page || 1) - 1))}
                disabled={(filters.page || 1) <= 1}
                className="px-3 py-2 text-sm text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-700 rounded-md hover:bg-gray-200 dark:hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              <span className="text-sm text-gray-700 dark:text-gray-300 px-3">
                Page {filters.page || 1}
              </span>
              <button
                onClick={() => handlePageChange((filters.page || 1) + 1)}
                disabled={optimizationHistory.length < (filters.limit || 10)}
                className="px-3 py-2 text-sm text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-700 rounded-md hover:bg-gray-200 dark:hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 