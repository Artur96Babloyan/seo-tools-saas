"use client";

import { useState } from 'react';
import {
  Info,
  Download,
  TrendingUp,
  Target,
  FileText,
  Lightbulb,
  Eye
} from 'lucide-react';
import { ContentOptimizationResponse } from '@/types/seo-optimizer';
import CopyToClipboard from './CopyToClipboard';
import FormattedContentView from './FormattedContentView';

interface OptimizationResultsProps {
  result: ContentOptimizationResponse;
  onNewOptimization?: () => void;
  className?: string;
}

export default function OptimizationResults({
  result,
  onNewOptimization,
  className = ""
}: OptimizationResultsProps) {
  const [activeTab, setActiveTab] = useState<'comparison' | 'formatted' | 'meta' | 'suggestions'>('comparison');

  // Validate required fields
  const missingFields = [];
  if (!result?.originalTitle) missingFields.push('originalTitle');
  if (!result?.originalContent) missingFields.push('originalContent');
  if (!result?.optimizedTitle) missingFields.push('optimizedTitle');
  if (!result?.optimizedContent) missingFields.push('optimizedContent');
  if (!result?.metaDescription) missingFields.push('metaDescription');
  if (!result?.focusKeyword) missingFields.push('focusKeyword');
  if (!result?.suggestions) missingFields.push('suggestions');

  if (missingFields.length > 0) {
  }



  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const handleExport = async (format: 'html' | 'text' | 'markdown') => {
    try {
      let content = '';

      if (format === 'html') {
        content = `
<!DOCTYPE html>
<html>
<head>
    <title>${result.optimizedTitle}</title>
    <meta name="description" content="${result.metaDescription}">
    <meta name="keywords" content="${result.focusKeyword}">
</head>
<body>
    <h1>${result.optimizedTitle}</h1>
    ${result.optimizedContent.split('\n').map(para => `<p>${para}</p>`).join('\n    ')}
</body>
</html>`;
      } else if (format === 'markdown') {
        content = `# ${result.optimizedTitle}\n\n${result.optimizedContent}`;
      } else {
        content = `${result.optimizedTitle}\n\n${result.optimizedContent}`;
      }

      const blob = new Blob([content], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `optimized-content.${format === 'html' ? 'html' : format}`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch {
      // Export failed silently
    }
  };

  return (
    <div className={`bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 ${className}`}>
      {/* Header */}
      <div className="p-4 sm:p-6 border-b border-gray-200 dark:border-gray-700">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
          <div className="flex items-center space-x-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400">
              <TrendingUp className="h-5 w-5" />
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white">
                Optimization Results
              </h2>
              <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
                Optimized on {formatDate(result.createdAt)}
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center space-y-2 sm:space-y-0 sm:space-x-2">
            <CopyToClipboard
              text={`${result.optimizedTitle}\n\n${result.optimizedContent}`}
              label="Copy AI"
              variant="button"
            />
            <div className="flex items-center space-x-2">
              <button
                onClick={() => handleExport('html')}
                className="flex-1 sm:flex-none inline-flex items-center justify-center space-x-2 px-3 py-2 text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                title="Export as HTML"
              >
                <Download className="h-4 w-4" />
              </button>
              {onNewOptimization && (
                <button
                  onClick={onNewOptimization}
                  className="flex-1 sm:flex-none inline-flex items-center justify-center space-x-2 px-3 sm:px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors text-sm"
                >
                  <Target className="h-4 w-4" />
                  <span className="hidden sm:inline">New Optimization</span>
                  <span className="sm:hidden">New</span>
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="border-b border-gray-200 dark:border-gray-700">
        <nav className="flex flex-wrap px-4 sm:px-6">
          <button
            onClick={() => setActiveTab('comparison')}
            className={`py-3 sm:py-4 px-2 sm:px-1 border-b-2 font-medium text-xs sm:text-sm transition-colors whitespace-nowrap ${activeTab === 'comparison'
              ? 'border-purple-500 text-purple-600'
              : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
          >
            <div className="flex items-center space-x-1 sm:space-x-2">
              <FileText className="h-3 w-3 sm:h-4 sm:w-4" />
              <span>Content Comparison</span>
            </div>
          </button>
          <button
            onClick={() => setActiveTab('formatted')}
            className={`py-3 sm:py-4 px-2 sm:px-1 border-b-2 font-medium text-xs sm:text-sm transition-colors whitespace-nowrap ${activeTab === 'formatted'
              ? 'border-purple-500 text-purple-600'
              : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
          >
            <div className="flex items-center space-x-1 sm:space-x-2">
              <Eye className="h-3 w-3 sm:h-4 sm:w-4" />
              <span>Formatted View</span>
            </div>
          </button>
          <button
            onClick={() => setActiveTab('meta')}
            className={`py-3 sm:py-4 px-2 sm:px-1 border-b-2 font-medium text-xs sm:text-sm transition-colors whitespace-nowrap ${activeTab === 'meta'
              ? 'border-purple-500 text-purple-600'
              : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
          >
            <div className="flex items-center space-x-1 sm:space-x-2">
              <Target className="h-3 w-3 sm:h-4 sm:w-4" />
              <span>Meta Information</span>
            </div>
          </button>
          <button
            onClick={() => setActiveTab('suggestions')}
            className={`py-3 sm:py-4 px-2 sm:px-1 border-b-2 font-medium text-xs sm:text-sm transition-colors whitespace-nowrap ${activeTab === 'suggestions'
              ? 'border-purple-500 text-purple-600'
              : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
          >
            <div className="flex items-center space-x-1 sm:space-x-2">
              <Lightbulb className="h-3 w-3 sm:h-4 sm:w-4" />
              <span>Suggestions ({result.suggestions?.length || 0})</span>
            </div>
          </button>
        </nav>
      </div>

      {/* Tab Content */}
      <div className="p-4 sm:p-6">
        {activeTab === 'comparison' && (
          <div className="space-y-6">
            {/* Title Comparison */}
            <div>
              <h3 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Title Comparison
              </h3>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
                <div className="space-y-2">
                  <label className="block text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300">
                    Original Title
                  </label>
                  <div className="p-3 sm:p-4 bg-gray-50 dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-700">
                    <p className="text-sm sm:text-base text-gray-900 dark:text-white">
                      {result.originalTitle || 'Original title not available'}
                    </p>
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="block text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300">
                    Optimized Title
                  </label>
                  <div className="p-3 sm:p-4 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800">
                    <p className="text-sm sm:text-base text-green-900 dark:text-green-100">
                      {result.optimizedTitle || 'Optimized title not available'}
                    </p>
                    {result.optimizedTitle && (
                      <CopyToClipboard text={result.optimizedTitle} variant="icon" className="mt-2" />
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Content Comparison */}
            <div>
              <h3 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Content Comparison
              </h3>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
                <div className="space-y-2">
                  <label className="block text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300">
                    Original Content
                  </label>
                  <div className="p-3 sm:p-4 bg-gray-50 dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-700 max-h-64 sm:max-h-96 overflow-y-auto">
                    <p className="text-xs sm:text-sm text-gray-900 dark:text-white whitespace-pre-wrap">
                      {result.originalContent || 'Original content not available'}
                    </p>
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="block text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300">
                    Optimized Content
                  </label>
                  <div className="p-3 sm:p-4 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800 max-h-64 sm:max-h-96 overflow-y-auto">
                    <p className="text-xs sm:text-sm text-green-900 dark:text-green-100 whitespace-pre-wrap">
                      {result.optimizedContent || 'Optimized content not available'}
                    </p>
                    {result.optimizedContent && (
                      <CopyToClipboard text={result.optimizedContent} variant="icon" className="mt-2" />
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'formatted' && (
          <div className="space-y-6">
            <FormattedContentView
              title={result.optimizedTitle || 'Optimized Title'}
              content={result.optimizedContent || 'Optimized content not available'}
              className="w-full"
            />
          </div>
        )}

        {activeTab === 'meta' && (
          <div className="space-y-6">
            {/* Meta Description */}
            <div>
              <h3 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Meta Description
              </h3>
              <div className="p-3 sm:p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
                <p className="text-sm sm:text-base text-blue-900 dark:text-blue-100">
                  {result.metaDescription || 'Meta description not available'}
                </p>
                {result.metaDescription && (
                  <div className="mt-3 flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-2 sm:space-y-0">
                    <span className="text-xs sm:text-sm text-blue-700 dark:text-blue-300">
                      {result.metaDescription.length} characters
                    </span>
                    <CopyToClipboard text={result.metaDescription} variant="icon" />
                  </div>
                )}
              </div>
            </div>

            {/* Focus Keyword */}
            <div>
              <h3 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Focus Keyword
              </h3>
              <div className="p-3 sm:p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg border border-purple-200 dark:border-purple-800">
                <span className="inline-flex items-center px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-medium bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200">
                  {result.focusKeyword || 'Focus keyword not available'}
                </span>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'suggestions' && (
          <div className="space-y-4">
            <h3 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Optimization Suggestions
            </h3>
            {!result.suggestions || result.suggestions.length === 0 ? (
              <div className="text-center py-8">
                <Lightbulb className="mx-auto h-12 w-12 text-gray-400" />
                <p className="mt-2 text-sm sm:text-base text-gray-500 dark:text-gray-400">
                  {!result.suggestions ? 'Suggestions not available' : 'No suggestions available'}
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {result.suggestions.map((suggestion, index) => (
                  <div
                    key={index}
                    className="p-3 sm:p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:shadow-sm transition-shadow"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-2 mb-2">
                          <Info className="h-4 w-4 text-blue-500" />
                          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium text-blue-600 bg-blue-100 dark:text-blue-400 dark:bg-blue-900/30 w-fit">
                            Suggestion {index + 1}
                          </span>
                        </div>
                        <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
                          {suggestion}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
} 