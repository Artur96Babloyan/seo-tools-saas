"use client";

import React, { useState, useMemo } from 'react';
import { DecayedPage } from '@/types/content-decay';
import { contentDecayService } from '@/lib/contentDecayService';
import {
  Brain,
  AlertTriangle,
  CheckCircle,
  Clock,
  TrendingUp,
  Target,
  Filter
} from 'lucide-react';

interface RecommendationsPanelProps {
  pages: DecayedPage[];
}

export default function RecommendationsPanel({ pages }: RecommendationsPanelProps) {
  const [selectedPriority, setSelectedPriority] = useState<'all' | 'high' | 'medium' | 'low'>('all');

  // Aggregate all recommendations
  const allRecommendations = useMemo(() => {
    const recommendations: Array<{
      text: string;
      priority: 'high' | 'medium' | 'low';
      count: number;
      pages: string[];
    }> = [];

    const recommendationMap = new Map<string, {
      priority: 'high' | 'medium' | 'low';
      count: number;
      pages: string[];
    }>();

    pages.forEach(page => {
      page.recommendations.recommendations.forEach(rec => {
        const key = rec.toLowerCase().trim();
        if (recommendationMap.has(key)) {
          const existing = recommendationMap.get(key)!;
          existing.count++;
          existing.pages.push(page.url);
        } else {
          recommendationMap.set(key, {
            priority: page.recommendations.priority,
            count: 1,
            pages: [page.url]
          });
        }
      });
    });

    recommendationMap.forEach((value, key) => {
      recommendations.push({
        text: key,
        ...value
      });
    });

    return recommendations.sort((a, b) => {
      // Sort by priority first, then by count
      const priorityOrder = { high: 3, medium: 2, low: 1 };
      const priorityDiff = priorityOrder[b.priority] - priorityOrder[a.priority];
      if (priorityDiff !== 0) return priorityDiff;
      return b.count - a.count;
    });
  }, [pages]);

  const filteredRecommendations = useMemo(() => {
    if (selectedPriority === 'all') return allRecommendations;
    return allRecommendations.filter(rec => rec.priority === selectedPriority);
  }, [allRecommendations, selectedPriority]);

  const priorityStats = useMemo(() => {
    const stats = { high: 0, medium: 0, low: 0 };
    allRecommendations.forEach(rec => {
      stats[rec.priority]++;
    });
    return stats;
  }, [allRecommendations]);



  const getPriorityLabel = (priority: 'high' | 'medium' | 'low') => {
    return contentDecayService.getPriorityLabel(priority);
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-100 dark:bg-green-900/20">
            <Brain className="h-5 w-5 text-green-600" />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
              AI-Powered Recommendations
            </h2>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Actionable strategies to recover from content decay
            </p>
          </div>
        </div>
      </div>

      {/* Priority Filter */}
      <div className="mb-6">
        <div className="flex items-center space-x-4 mb-4">
          <div className="flex items-center space-x-2">
            <Filter className="h-4 w-4 text-gray-500" />
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Filter by priority:</span>
          </div>
          <div className="flex space-x-2">
            {(['all', 'high', 'medium', 'low'] as const).map(priority => (
              <button
                key={priority}
                onClick={() => setSelectedPriority(priority)}
                className={`px-3 py-1 text-sm rounded-lg transition-colors ${selectedPriority === priority
                  ? priority === 'all'
                    ? 'bg-blue-600 text-white'
                    : `bg-${priority === 'high' ? 'red' : priority === 'medium' ? 'orange' : 'blue'}-600 text-white`
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                  }`}
              >
                {priority === 'all' ? 'All' : priority.charAt(0).toUpperCase() + priority.slice(1)}
                {priority !== 'all' && (
                  <span className="ml-1 text-xs">({priorityStats[priority]})</span>
                )}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Priority Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
          <div className="flex items-center space-x-2 mb-2">
            <AlertTriangle className="h-4 w-4 text-red-600" />
            <span className="text-sm font-medium text-red-800 dark:text-red-200">High Priority</span>
          </div>
          <p className="text-2xl font-bold text-red-900 dark:text-red-100">{priorityStats.high}</p>
          <p className="text-xs text-red-700 dark:text-red-300">Critical actions needed</p>
        </div>

        <div className="bg-orange-50 dark:bg-orange-900/20 border border-orange-200 dark:border-orange-800 rounded-lg p-4">
          <div className="flex items-center space-x-2 mb-2">
            <Clock className="h-4 w-4 text-orange-600" />
            <span className="text-sm font-medium text-orange-800 dark:text-orange-200">Medium Priority</span>
          </div>
          <p className="text-2xl font-bold text-orange-900 dark:text-orange-100">{priorityStats.medium}</p>
          <p className="text-xs text-orange-700 dark:text-orange-300">Important improvements</p>
        </div>

        <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
          <div className="flex items-center space-x-2 mb-2">
            <Target className="h-4 w-4 text-blue-600" />
            <span className="text-sm font-medium text-blue-800 dark:text-blue-200">Low Priority</span>
          </div>
          <p className="text-2xl font-bold text-blue-900 dark:text-blue-100">{priorityStats.low}</p>
          <p className="text-xs text-blue-700 dark:text-blue-300">Optimization opportunities</p>
        </div>
      </div>

      {/* Recommendations List */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
          Recommended Actions ({filteredRecommendations.length})
        </h3>

        {filteredRecommendations.length === 0 ? (
          <div className="text-center py-8">
            <div className="flex items-center justify-center space-x-2 mb-2">
              <CheckCircle className="h-6 w-6 text-green-600" />
              <span className="text-lg font-medium text-green-800 dark:text-green-200">
                No {selectedPriority !== 'all' ? selectedPriority : ''} priority recommendations
              </span>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {selectedPriority === 'all'
                ? 'All recommendations have been addressed.'
                : `No ${selectedPriority} priority recommendations found.`
              }
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {filteredRecommendations.map((recommendation, index) => (
              <div
                key={index}
                className="bg-gray-50 dark:bg-gray-900/50 border border-gray-200 dark:border-gray-700 rounded-lg p-4"
              >
                <div className="flex items-start space-x-3">
                  <div
                    className={`flex h-6 w-6 items-center justify-center rounded-full ${recommendation.priority === 'high' ? 'bg-red-100 dark:bg-red-900/20' :
                      recommendation.priority === 'medium' ? 'bg-orange-100 dark:bg-orange-900/20' :
                        'bg-blue-100 dark:bg-blue-900/20'
                      }`}
                  >
                    <TrendingUp className={`h-3 w-3 ${recommendation.priority === 'high' ? 'text-red-600' :
                      recommendation.priority === 'medium' ? 'text-orange-600' :
                        'text-blue-600'
                      }`} />
                  </div>

                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <p className="text-sm font-medium text-gray-900 dark:text-white">
                        {recommendation.text}
                      </p>
                      <div className="flex items-center space-x-2">
                        <span
                          className={`text-xs px-2 py-1 rounded-full ${recommendation.priority === 'high' ? 'bg-red-100 dark:bg-red-900/20 text-red-700 dark:text-red-300' :
                            recommendation.priority === 'medium' ? 'bg-orange-100 dark:bg-orange-900/20 text-orange-700 dark:text-orange-300' :
                              'bg-blue-100 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300'
                            }`}
                        >
                          {getPriorityLabel(recommendation.priority)}
                        </span>
                        <span className="text-xs text-gray-500 dark:text-gray-400">
                          {recommendation.count} {recommendation.count === 1 ? 'page' : 'pages'}
                        </span>
                      </div>
                    </div>

                    {recommendation.pages.length > 0 && (
                      <div className="mt-2">
                        <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">
                          Affected pages:
                        </p>
                        <div className="flex flex-wrap gap-1">
                          {recommendation.pages.slice(0, 3).map((page, pageIndex) => (
                            <span
                              key={pageIndex}
                              className="text-xs bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 px-2 py-1 rounded"
                            >
                              {new URL(page).pathname || '/'}
                            </span>
                          ))}
                          {recommendation.pages.length > 3 && (
                            <span className="text-xs text-gray-500 dark:text-gray-400">
                              +{recommendation.pages.length - 3} more
                            </span>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Action Plan Summary */}
      <div className="mt-8 p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
        <div className="flex items-start space-x-3">
          <Target className="h-5 w-5 text-blue-600 dark:text-blue-400 mt-0.5 flex-shrink-0" />
          <div>
            <h4 className="font-medium text-blue-800 dark:text-blue-200 mb-1">
              Recommended Action Plan
            </h4>
            <ul className="text-sm text-blue-700 dark:text-blue-300 space-y-1">
              <li>• Start with high-priority recommendations for immediate impact</li>
              <li>• Focus on content updates and technical improvements</li>
              <li>• Monitor performance changes after implementing changes</li>
              <li>• Re-run analysis in 2-4 weeks to measure improvement</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
} 