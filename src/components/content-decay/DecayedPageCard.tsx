"use client";

import React, { useState } from 'react';
import { DecayedPage } from '@/types/content-decay';
import { contentDecayService } from '@/lib/contentDecayService';
import {
  ChevronDown,
  ChevronUp,
  TrendingDown,
  ExternalLink,
  AlertTriangle
} from 'lucide-react';

interface DecayedPageCardProps {
  page: DecayedPage;
}

export default function DecayedPageCard({ page }: DecayedPageCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const getDecayColor = (percentage: number) => {
    if (percentage >= 70) return 'text-red-600';
    if (percentage >= 40) return 'text-orange-600';
    return 'text-yellow-600';
  };

  const getDecayBackground = (percentage: number) => {
    if (percentage >= 70) return 'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800';
    if (percentage >= 40) return 'bg-orange-50 dark:bg-orange-900/20 border-orange-200 dark:border-orange-800';
    return 'bg-yellow-50 dark:bg-yellow-900/20 border-yellow-200 dark:border-yellow-800';
  };

  const formatNumber = (num: number) => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
    return num.toString();
  };

  const formatPercentage = (num: number) => {
    return `${num.toFixed(1)}%`;
  };

  return (
    <div className={`bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden ${getDecayBackground(page.decayPercentage)}`}>
      {/* Header */}
      <div className="p-6">
        <div className="flex items-start justify-between">
          <div className="flex-1 min-w-0">
            <div className="flex items-center space-x-3 mb-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-red-100 dark:bg-red-900/20">
                <TrendingDown className="h-4 w-4 text-red-600" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white truncate">
                  {page.url}
                </h3>
                <p className={`text-sm font-medium ${getDecayColor(page.decayPercentage)}`}>
                  {contentDecayService.formatDecayPercentage(page.decayPercentage)} traffic decline
                </p>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
              <div className="text-center">
                <p className="text-xs text-gray-500 dark:text-gray-400">Current Clicks</p>
                <p className="text-lg font-semibold text-gray-900 dark:text-white">
                  {formatNumber(page.currentStats.clicks)}
                </p>
              </div>
              <div className="text-center">
                <p className="text-xs text-gray-500 dark:text-gray-400">Previous Clicks</p>
                <p className="text-lg font-semibold text-gray-900 dark:text-white">
                  {formatNumber(page.previousStats.clicks)}
                </p>
              </div>
              <div className="text-center">
                <p className="text-xs text-gray-500 dark:text-gray-400">Current Position</p>
                <p className="text-lg font-semibold text-gray-900 dark:text-white">
                  #{page.currentStats.position.toFixed(1)}
                </p>
              </div>
              <div className="text-center">
                <p className="text-xs text-gray-500 dark:text-gray-400">Previous Position</p>
                <p className="text-lg font-semibold text-gray-900 dark:text-white">
                  #{page.previousStats.position.toFixed(1)}
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-2 ml-4">
            <a
              href={page.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-1 px-3 py-1 text-sm bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
            >
              <ExternalLink className="h-3 w-3" />
              <span>Visit</span>
            </a>
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="inline-flex items-center space-x-1 px-3 py-1 text-sm bg-blue-100 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 rounded-lg hover:bg-blue-200 dark:hover:bg-blue-900/40 transition-colors"
            >
              {isExpanded ? (
                <>
                  <ChevronUp className="h-3 w-3" />
                  <span>Less</span>
                </>
              ) : (
                <>
                  <ChevronDown className="h-3 w-3" />
                  <span>More</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Expanded Content */}
      {isExpanded && (
        <div className="border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900/50">
          <div className="p-6 space-y-6">
            {/* Detailed Stats Comparison */}
            <div>
              <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-3">
                Performance Comparison
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-white dark:bg-gray-800 rounded-lg p-4">
                  <h5 className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-2">Current Period</h5>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600 dark:text-gray-400">Clicks:</span>
                      <span className="text-sm font-medium text-gray-900 dark:text-white">
                        {formatNumber(page.currentStats.clicks)}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600 dark:text-gray-400">Impressions:</span>
                      <span className="text-sm font-medium text-gray-900 dark:text-white">
                        {formatNumber(page.currentStats.impressions)}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600 dark:text-gray-400">CTR:</span>
                      <span className="text-sm font-medium text-gray-900 dark:text-white">
                        {formatPercentage(page.currentStats.ctr)}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600 dark:text-gray-400">Position:</span>
                      <span className="text-sm font-medium text-gray-900 dark:text-white">
                        #{page.currentStats.position.toFixed(1)}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="bg-white dark:bg-gray-800 rounded-lg p-4">
                  <h5 className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-2">Previous Period</h5>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600 dark:text-gray-400">Clicks:</span>
                      <span className="text-sm font-medium text-gray-900 dark:text-white">
                        {formatNumber(page.previousStats.clicks)}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600 dark:text-gray-400">Impressions:</span>
                      <span className="text-sm font-medium text-gray-900 dark:text-white">
                        {formatNumber(page.previousStats.impressions)}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600 dark:text-gray-400">CTR:</span>
                      <span className="text-sm font-medium text-gray-900 dark:text-white">
                        {formatPercentage(page.previousStats.ctr)}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600 dark:text-gray-400">Position:</span>
                      <span className="text-sm font-medium text-gray-900 dark:text-white">
                        #{page.previousStats.position.toFixed(1)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Lost Queries */}
            {page.lostQueries.length > 0 && (
              <div>
                <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-3">
                  Lost Keywords ({page.lostQueries.length})
                </h4>
                <div className="flex flex-wrap gap-2">
                  {page.lostQueries.map((query, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center px-2 py-1 text-xs bg-red-100 dark:bg-red-900/20 text-red-700 dark:text-red-300 rounded-md"
                    >
                      {query}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Top Queries */}
            {page.currentStats.topQueries.length > 0 && (
              <div>
                <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-3">
                  Current Top Keywords
                </h4>
                <div className="space-y-2">
                  {page.currentStats.topQueries.slice(0, 5).map((query, index) => (
                    <div key={index} className="flex items-center justify-between bg-white dark:bg-gray-800 rounded-lg p-3">
                      <span className="text-sm text-gray-900 dark:text-white font-medium">
                        {query.query}
                      </span>
                      <div className="flex items-center space-x-4 text-xs text-gray-500 dark:text-gray-400">
                        <span>{formatNumber(query.clicks)} clicks</span>
                        <span>#{query.position.toFixed(1)}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* AI Recommendations */}
            <div>
              <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-3">
                AI Recommendations
              </h4>
              <div className="bg-white dark:bg-gray-800 rounded-lg p-4">
                <div className="flex items-start space-x-3 mb-3">
                  <div className={`flex h-6 w-6 items-center justify-center rounded-full ${page.recommendations.priority === 'high' ? 'bg-red-100 dark:bg-red-900/20' :
                    page.recommendations.priority === 'medium' ? 'bg-orange-100 dark:bg-orange-900/20' :
                      'bg-blue-100 dark:bg-blue-900/20'
                    }`}>
                    <AlertTriangle className={`h-3 w-3 ${page.recommendations.priority === 'high' ? 'text-red-600' :
                      page.recommendations.priority === 'medium' ? 'text-orange-600' :
                        'text-blue-600'
                      }`} />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-gray-900 dark:text-white mb-2">
                      {page.recommendations.summary}
                    </p>
                    <div className="space-y-1">
                      {page.recommendations.recommendations.slice(0, 3).map((rec, index) => (
                        <div key={index} className="flex items-start space-x-2">
                          <span className="text-blue-600 dark:text-blue-400 text-xs mt-1">•</span>
                          <span className="text-sm text-gray-700 dark:text-gray-300">{rec}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 