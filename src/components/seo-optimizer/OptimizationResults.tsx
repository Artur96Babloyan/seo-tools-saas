"use client";

import { useState } from 'react';
import {
  Info,
  Download,
  TrendingUp,
  Target,
  FileText,
  Lightbulb,
  Eye,
  ChevronDown
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
  const [showExportMenu, setShowExportMenu] = useState(false);

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

  const handleExport = async (format: 'meta-tags' | 'content' | 'complete-html' | 'markdown') => {
    try {
      let content = '';
      let filename = '';

      if (format === 'meta-tags') {
        content = `<!-- Meta Tags for HTML Head Section -->
<title>${result.optimizedTitle}</title>
<meta name="description" content="${result.metaDescription}">
<meta name="keywords" content="${result.focusKeyword}">`;
        filename = 'meta-tags.html';
      } else if (format === 'content') {
        content = `${result.optimizedTitle}\n\n${result.optimizedContent.h1}\n\n${result.optimizedContent.mainContent}\n\n${result.optimizedContent.features.title}\n${result.optimizedContent.features.items.map(item => `- ${item}`).join('\n')}`;
        filename = 'optimized-content.txt';
      } else if (format === 'complete-html') {
        content = `<!DOCTYPE html>
<html>
<head>
    <title>${result.optimizedTitle}</title>
    <meta name="description" content="${result.metaDescription}">
    <meta name="keywords" content="${result.focusKeyword}">
</head>
<body>
    <h1>${result.optimizedContent.h1}</h1>
    <p>${result.optimizedContent.mainContent}</p>
    <h2>${result.optimizedContent.features.title}</h2>
    <ul>
    ${result.optimizedContent.features.items.map(item => `        <li>${item}</li>`).join('\n')}
    </ul>
</body>
</html>`;
        filename = 'complete-page.html';
      } else if (format === 'markdown') {
        content = `# ${result.optimizedTitle}\n\n${result.metaDescription}\n\n## ${result.optimizedContent.h1}\n\n${result.optimizedContent.mainContent}\n\n## ${result.optimizedContent.features.title}\n\n${result.optimizedContent.features.items.map(item => `- ${item}`).join('\n')}`;
        filename = 'optimized-content.md';
      }

      const blob = new Blob([content], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = filename;
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
        <div className="flex flex-col xl:flex-row xl:items-center xl:justify-between space-y-4 xl:space-y-0">
          <div className="flex items-center space-x-3 min-w-0 flex-shrink-0">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 flex-shrink-0">
              <TrendingUp className="h-5 w-5" />
            </div>
            <div className="min-w-0">
              <h2 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white truncate">
                Optimization Results
              </h2>
              <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 truncate">
                Optimized on {formatDate(result.createdAt)}
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center space-y-2 sm:space-y-0 sm:space-x-2 min-w-0 flex-shrink-0">
            <CopyToClipboard
              text={`${result.optimizedTitle}\n\n${result.optimizedContent.h1}\n\n${result.optimizedContent.mainContent}\n\n${result.optimizedContent.features.title}\n${result.optimizedContent.features.items.map(item => `- ${item}`).join('\n')}`}
              label="Copy All"
              variant="button"
              className="w-full sm:w-auto flex-shrink-0"
            />
            <div className="flex items-center space-x-2 w-full sm:w-auto min-w-0">
              <div className="relative flex-1 sm:flex-none">
                <button
                  onClick={() => setShowExportMenu(!showExportMenu)}
                  className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 px-3 py-2 text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors flex-shrink-0"
                  title="Export Options"
                >
                  <Download className="h-4 w-4" />
                  <ChevronDown className="h-3 w-3" />
                </button>

                {showExportMenu && (
                  <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 z-10">
                    <div className="py-1">
                      <button
                        onClick={() => { handleExport('meta-tags'); setShowExportMenu(false); }}
                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                      >
                        Meta Tags Only
                      </button>
                      <button
                        onClick={() => { handleExport('content'); setShowExportMenu(false); }}
                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                      >
                        Content Only
                      </button>
                      <button
                        onClick={() => { handleExport('complete-html'); setShowExportMenu(false); }}
                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                      >
                        Complete HTML Page
                      </button>
                      <button
                        onClick={() => { handleExport('markdown'); setShowExportMenu(false); }}
                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                      >
                        Markdown
                      </button>
                    </div>
                  </div>
                )}
              </div>
              {onNewOptimization && (
                <button
                  onClick={onNewOptimization}
                  className="flex-1 sm:flex-none inline-flex items-center justify-center space-x-2 px-3 sm:px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors text-sm flex-shrink-0"
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
            {/* Page Title Comparison */}
            <div>
              <h3 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Page Title Comparison (for &lt;title&gt; tag)
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                This title appears in browser tabs and search result links. Use the optimized version in your HTML &lt;title&gt; tag.
              </p>
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
                    Optimized Title (Use This)
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

            {/* Page Content Comparison */}
            <div>
              <h3 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Page Content Comparison (for &lt;body&gt; section)
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                This content appears on your website for visitors to read. Use the optimized version in your page body.
              </p>
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
                    Optimized Content (Use This)
                  </label>
                  <div className="p-3 sm:p-4 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800 max-h-64 sm:max-h-96 overflow-y-auto">
                    <div className="text-xs sm:text-sm text-green-900 dark:text-green-100 space-y-3">
                      <div>
                        <h4 className="font-semibold mb-2 text-green-800 dark:text-green-200">H1 Heading:</h4>
                        <p className="font-medium">{result.optimizedContent.h1}</p>
                      </div>
                      <div>
                        <h4 className="font-semibold mb-2 text-green-800 dark:text-green-200">Main Content:</h4>
                        <p className="whitespace-pre-wrap">{result.optimizedContent.mainContent}</p>
                      </div>
                      <div>
                        <h4 className="font-semibold mb-2 text-green-800 dark:text-green-200">Features Section:</h4>
                        <h5 className="font-medium mb-2">{result.optimizedContent.features.title}</h5>
                        <ul className="list-disc list-inside space-y-1">
                          {result.optimizedContent.features.items.map((item, index) => (
                            <li key={index}>{item}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                    <CopyToClipboard
                      text={`${result.optimizedContent.h1}\n\n${result.optimizedContent.mainContent}\n\n${result.optimizedContent.features.title}\n${result.optimizedContent.features.items.map(item => `- ${item}`).join('\n')}`}
                      variant="icon"
                      className="mt-2"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'formatted' && (
          <div className="space-y-6">
            <div>
              <h3 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white mb-4">
                How Your Optimized Page Will Look
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                This is a preview of how your optimized content will appear on your website. The title below is for the page content, not the browser tab title.
              </p>
            </div>
            <FormattedContentView
              title={result.optimizedContent.h1 || 'Optimized Page Title'}
              content={`${result.optimizedContent.mainContent}\n\n${result.optimizedContent.features.title}\n${result.optimizedContent.features.items.map(item => `- ${item}`).join('\n')}`}
              className="w-full"
            />
          </div>
        )}

        {activeTab === 'meta' && (
          <div className="space-y-6">
            {/* Page Title */}
            <div>
              <h3 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Page Title (for &lt;title&gt; tag)
              </h3>
              <div className="p-3 sm:p-4 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800">
                <div className="space-y-3">
                  <div>
                    <label className="block text-xs font-medium text-green-700 dark:text-green-300 mb-1">
                      HTML Tag:
                    </label>
                    <code className="block p-2 bg-white dark:bg-gray-800 rounded border text-xs text-green-900 dark:text-green-100 font-mono">
                      &lt;title&gt;{result.optimizedTitle}&lt;/title&gt;
                    </code>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-green-700 dark:text-green-300 mb-1">
                      Title Text:
                    </label>
                    <p className="text-sm sm:text-base text-green-900 dark:text-green-100">
                      {result.optimizedTitle || 'Optimized title not available'}
                    </p>
                  </div>
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-2 sm:space-y-0">
                    <span className="text-xs sm:text-sm text-green-700 dark:text-green-300">
                      {result.optimizedTitle?.length || 0} characters
                    </span>
                    <CopyToClipboard text={`<title>${result.optimizedTitle}</title>`} variant="icon" />
                  </div>
                </div>
              </div>
            </div>

            {/* Meta Description */}
            <div>
              <h3 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Meta Description (for &lt;meta&gt; tag)
              </h3>
              <div className="p-3 sm:p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
                <div className="space-y-3">
                  <div>
                    <label className="block text-xs font-medium text-blue-700 dark:text-blue-300 mb-1">
                      HTML Tag:
                    </label>
                    <code className="block p-2 bg-white dark:bg-gray-800 rounded border text-xs text-blue-900 dark:text-blue-100 font-mono">
                      &lt;meta name=&quot;description&quot; content=&quot;{result.metaDescription}&quot;&gt;
                    </code>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-blue-700 dark:text-blue-300 mb-1">
                      Description Text:
                    </label>
                    <p className="text-sm sm:text-base text-blue-900 dark:text-blue-100">
                      {result.metaDescription || 'Meta description not available'}
                    </p>
                  </div>
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-2 sm:space-y-0">
                    <span className="text-xs sm:text-sm text-blue-700 dark:text-blue-300">
                      {result.metaDescription?.length || 0} characters
                    </span>
                    <CopyToClipboard text={`<meta name="description" content="${result.metaDescription}">`} variant="icon" />
                  </div>
                </div>
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