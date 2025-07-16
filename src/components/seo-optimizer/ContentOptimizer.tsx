"use client";

import { useState, useEffect, useRef } from 'react';
import { Wand2, Save, RotateCcw, AlertCircle, Globe, FileText } from 'lucide-react';
import { useSeoOptimizer } from '@/hooks/useSeoOptimizer';
import { ContentOptimizationRequest } from '@/types/seo-optimizer';
import { contentExtractorService } from '@/lib/contentExtractorService';
import CharacterCounter from './CharacterCounter';
import LoadingSpinner from './LoadingSpinner';

import { ContentOptimizationResponse } from '@/types/seo-optimizer';

interface ContentOptimizerProps {
  onOptimizationComplete?: (result: ContentOptimizationResponse) => void;
  className?: string;
}

export default function ContentOptimizer({
  onOptimizationComplete,
  className = ""
}: ContentOptimizerProps) {
  const {
    isOptimizing,
    error,
    success,
    characterCounts,
    validationErrors,
    autoSaveEnabled,
    lastAutoSave,
    optimizeContent,
    updateCharacterCounts,
    autoSave,
    loadDraft,
    clearDraft,
    setValidationErrors
  } = useSeoOptimizer();

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [focusKeyword, setFocusKeyword] = useState('');
  const [showDraftRestore, setShowDraftRestore] = useState(false);
  const [inputMode, setInputMode] = useState<'manual' | 'url'>('url');
  const [websiteUrl, setWebsiteUrl] = useState('');
  const [isExtracting, setIsExtracting] = useState(false);

  const formRef = useRef<HTMLFormElement>(null);

  // Load draft on component mount
  useEffect(() => {
    const draft = loadDraft();
    if (draft) {
      setShowDraftRestore(true);
    }
  }, [loadDraft]);

  // Update character counts when inputs change
  useEffect(() => {
    updateCharacterCounts(title, content, focusKeyword);
  }, [title, content, focusKeyword, updateCharacterCounts]);

  // Auto-save functionality
  useEffect(() => {
    if (title || content || focusKeyword) {
      autoSave(title, content, focusKeyword);
    }
  }, [title, content, focusKeyword]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const request: ContentOptimizationRequest = {
      title: title.trim(),
      content: content.trim(),
      focusKeyword: focusKeyword.trim()
    };

    try {
      const result = await optimizeContent(request);
      onOptimizationComplete?.(result);
    } catch {
      // Error is handled by the hook
    }
  };

  const handleRestoreDraft = () => {
    const draft = loadDraft();
    if (draft) {
      setTitle(draft.title);
      setContent(draft.content);
      setFocusKeyword(draft.focusKeyword);
      setShowDraftRestore(false);
    }
  };

  const handleClearDraft = () => {
    clearDraft();
    setShowDraftRestore(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    // Ctrl+Enter to submit
    if (e.ctrlKey && e.key === 'Enter') {
      e.preventDefault();
      formRef.current?.requestSubmit();
    }
  };

  const handleUrlKeyDown = (e: React.KeyboardEvent) => {
    // Enter key to extract content
    if (e.key === 'Enter') {
      e.preventDefault();
      handleExtractFromUrl();
    }
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

  const handleExtractFromUrl = async () => {
    if (!websiteUrl.trim()) return;

    setIsExtracting(true);
    try {
      const normalizedUrl = normalizeUrl(websiteUrl);
      const extractedContent = await contentExtractorService.extractContent({
        url: normalizedUrl
      });

      // Populate form with extracted content
      setTitle(extractedContent.title || '');
      setContent(extractedContent.mainContent || '');
      setFocusKeyword(extractedContent.metaKeywords || '');

      // Switch to manual mode to show the extracted content
      setInputMode('manual');

      // Clear validation errors after successful extraction
      setValidationErrors({});

      // Show success message if extraction was successful
      if (extractedContent.title || extractedContent.mainContent) {
        // Success - content was extracted
      }
    } catch {
      // Show user-friendly error message
      alert('Failed to extract content from URL. Please check the URL and try again, or use manual input mode.');
    } finally {
      setIsExtracting(false);
    }
  };

  const handleClearForm = () => {
    setTitle('');
    setContent('');
    setFocusKeyword('');
    setWebsiteUrl('');
    setInputMode('manual');
    clearDraft();
    setShowDraftRestore(false);
  };

  return (
    <div className={`bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 ${className}`}>
      {/* Header */}
      <div className="p-6 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400">
              <Wand2 className="h-5 w-5" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                AI Content Optimizer
              </h2>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Optimize your content for better SEO performance
              </p>
            </div>
          </div>

          {/* Auto-save indicator */}
          {autoSaveEnabled && lastAutoSave && (
            <div className="flex items-center space-x-2 text-xs text-gray-500 dark:text-gray-400">
              <Save className="h-3 w-3" />
              <span>Auto-saved {new Date(lastAutoSave).toLocaleTimeString()}</span>
            </div>
          )}
        </div>

        {/* Draft restore notification */}
        {showDraftRestore && (
          <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-2 sm:space-y-0">
              <div className="flex items-center space-x-2">
                <AlertCircle className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                <span className="text-sm text-blue-800 dark:text-blue-200">
                  You have unsaved changes. Would you like to restore them?
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={handleRestoreDraft}
                  className="text-xs px-3 py-1 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                >
                  Restore
                </button>
                <button
                  onClick={handleClearDraft}
                  className="text-xs px-3 py-1 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-md hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
                >
                  Discard
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Input Mode Toggle */}
      <div className="p-6 border-b border-gray-200 dark:border-gray-700">
        <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4">
          <button
            type="button"
            onClick={() => setInputMode('url')}
            className={`flex items-center justify-center space-x-2 px-4 py-2 rounded-lg font-medium transition-colors ${inputMode === 'url'
              ? 'bg-purple-600 text-white'
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
              ? 'bg-purple-600 text-white'
              : 'text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600'
              }`}
          >
            <FileText className="h-4 w-4" />
            <span>Manual Input</span>
          </button>
        </div>
      </div>

      {/* Form */}
      <form ref={formRef} onSubmit={handleSubmit} className="p-6 space-y-6">
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
                  className="flex-1 px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                  required
                />
                <button
                  type="button"
                  onClick={handleExtractFromUrl}
                  disabled={isExtracting || !websiteUrl.trim()}
                  className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isExtracting ? (
                    <LoadingSpinner size="sm" />
                  ) : (
                    'Extract'
                  )}
                </button>
              </div>
              <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                Enter a website URL to automatically extract title, content, and keywords for optimization. You can enter just the domain (e.g., auditcraft.io) or full URL. Press Enter to extract.
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
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Enter your page title (10-200 characters)"
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors ${validationErrors.title
                  ? 'border-red-300 bg-red-50 dark:bg-red-900/20'
                  : 'border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700'
                  } text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400`}
                required
              />
              <div className="mt-2">
                <CharacterCounter
                  current={characterCounts.title}
                  min={10}
                  max={200}
                  label="Title"
                />
              </div>
              {validationErrors.title && (
                <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                  {validationErrors.title}
                </p>
              )}
            </div>

            {/* Focus Keyword Input */}
            <div>
              <label htmlFor="focusKeyword" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Focus Keyword *
              </label>
              <input
                type="text"
                id="focusKeyword"
                value={focusKeyword}
                onChange={(e) => setFocusKeyword(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Enter your primary keyword (2-50 characters)"
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors ${validationErrors.focusKeyword
                  ? 'border-red-300 bg-red-50 dark:bg-red-900/20'
                  : 'border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700'
                  } text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400`}
                required
              />
              <div className="mt-2">
                <CharacterCounter
                  current={characterCounts.keyword}
                  min={2}
                  max={50}
                  label="Keyword"
                />
              </div>
              {validationErrors.focusKeyword && (
                <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                  {validationErrors.focusKeyword}
                </p>
              )}
            </div>

            {/* Content Input */}
            <div>
              <label htmlFor="content" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Content *
              </label>
              <textarea
                id="content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Enter your content (50-10,000 characters)"
                rows={8}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors resize-vertical ${validationErrors.content
                  ? 'border-red-300 bg-red-50 dark:bg-red-900/20'
                  : 'border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700'
                  } text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400`}
                required
              />
              <div className="mt-2">
                <CharacterCounter
                  current={characterCounts.content}
                  min={50}
                  max={10000}
                  label="Content"
                />
              </div>
              {validationErrors.content && (
                <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                  {validationErrors.content}
                </p>
              )}
            </div>

            {/* Error/Success Messages */}
            {error && (
              <div className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
                <div className="flex items-center space-x-2">
                  <AlertCircle className="h-5 w-5 text-red-600 dark:text-red-400" />
                  <span className="text-sm text-red-800 dark:text-red-200">{error}</span>
                </div>
              </div>
            )}

            {success && (
              <div className="p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
                <div className="flex items-center space-x-2">
                  <div className="h-5 w-5 bg-green-600 dark:bg-green-400 rounded-full flex items-center justify-center">
                    <div className="h-2 w-2 bg-white rounded-full" />
                  </div>
                  <span className="text-sm text-green-800 dark:text-green-200">{success}</span>
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between pt-4 space-y-3 sm:space-y-0">
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center space-y-2 sm:space-y-0 sm:space-x-3">
                <button
                  type="submit"
                  disabled={isOptimizing || !title.trim() || !content.trim() || !focusKeyword.trim()}
                  className="inline-flex items-center justify-center space-x-2 px-6 py-3 bg-purple-600 text-white font-medium rounded-lg hover:bg-purple-700 focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  {isOptimizing ? (
                    <>
                      <LoadingSpinner size="sm" />
                      <span>Optimizing...</span>
                    </>
                  ) : (
                    <>
                      <Wand2 className="h-4 w-4" />
                      <span>Optimize Content</span>
                    </>
                  )}
                </button>

                <button
                  type="button"
                  onClick={handleClearForm}
                  className="inline-flex items-center justify-center space-x-2 px-4 py-3 text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 font-medium rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                >
                  <RotateCcw className="h-4 w-4" />
                  <span>Clear</span>
                </button>
              </div>

              <div className="text-xs text-gray-500 dark:text-gray-400 text-center sm:text-left">
                Press <kbd className="px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded text-xs">Ctrl+Enter</kbd> to optimize
              </div>
            </div>
          </>
        )}

        {/* Error/Success Messages */}
        {error && (
          <div className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
            <div className="flex items-center space-x-2">
              <AlertCircle className="h-5 w-5 text-red-600 dark:text-red-400" />
              <span className="text-sm text-red-800 dark:text-red-200">{error}</span>
            </div>
          </div>
        )}

        {success && (
          <div className="p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
            <div className="flex items-center space-x-2">
              <div className="h-5 w-5 bg-green-600 dark:bg-green-400 rounded-full flex items-center justify-center">
                <div className="h-2 w-2 bg-white rounded-full" />
              </div>
              <span className="text-sm text-green-800 dark:text-green-200">{success}</span>
            </div>
          </div>
        )}
      </form>
    </div>
  );
} 