"use client";

import { useState } from 'react';
import {
  Trophy,
  TrendingUp,
  Target,
  Download,
  Tags,
  BarChart3,
  Star
} from 'lucide-react';
import { CompetitorAnalysisResult } from '@/shared/types/competitor';
import { competitorService } from '@/lib/services';

interface CompetitorAnalysisResultsProps {
  results: CompetitorAnalysisResult;
  onSaveReport?: (reportId: string) => void;
}

export default function CompetitorAnalysisResults({ results, onSaveReport }: CompetitorAnalysisResultsProps) {
  const [activeTab, setActiveTab] = useState<'overview' | 'scores' | 'meta-tags' | 'recommendations'>('overview');

  // Handle different data structures - some reports have comparison directly, others have comparisonData.comparison
  const hasComparisonData = 'comparisonData' in results && results['comparisonData' as keyof typeof results];
  const comparison = results.comparison || (hasComparisonData ? (results as unknown as { comparisonData: { comparison: CompetitorAnalysisResult['comparison'] } }).comparisonData.comparison : undefined);

  // Handle two different data structures:
  // 1. comparison.differences.* (newer structure)
  // 2. comparison.* (older structure - data directly under comparison)
  const differences = comparison?.differences || comparison;

  // Create default values for missing data to ensure compatibility with old reports
  const safeData = {
    summary: differences?.summary || {
      mainDomain: 'Unknown',
      overallScore: 0,
      overallRank: 1,
      totalCompetitors: 0,
      strongestCategory: 'N/A',
      weakestCategory: 'N/A',
      analysisDate: new Date().toISOString()
    },
    seoScores: differences?.seoScores || {
      mainDomain: { domain: 'Unknown', scores: { performance: 0, seo: 0, accessibility: 0, bestPractices: 0, overall: 0 } },
      competitors: []
    },
    rankings: differences?.rankings || {
      performance: [],
      seo: [],
      accessibility: [],
      bestPractices: [],
      overall: []
    },
    metaTagComparison: differences?.metaTagComparison || {
      mainDomain: { domain: 'Unknown', metaTags: { title: { found: false, content: null }, metaDescription: { found: false, content: null }, ogTitle: { found: false, content: null }, ogDescription: { found: false, content: null }, ogImage: { found: false, content: null } } },
      competitors: []
    },
    scoreDifferences: differences?.scoreDifferences || {
      mainDomain: 'Unknown',
      differences: []
    },
    recommendations: differences?.recommendations || []
  };

  // Only show incomplete data warning if critical data is completely missing
  if (!differences) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
            Incomplete Report Data
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            This report appears to be corrupted or missing essential data.
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
            Report ID: {results.reportId}
          </p>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            Refresh Page
          </button>
        </div>
      </div>
    );
  }

  const tabs = [
    { id: 'overview', label: 'Overview', icon: BarChart3 },
    { id: 'scores', label: 'Score Comparison', icon: TrendingUp },
    { id: 'meta-tags', label: 'Meta Tags', icon: Tags },
    { id: 'recommendations', label: 'Recommendations', icon: Target }
  ];

  const ScoreCard = ({
    title,
    score,
    rank,
    total
  }: {
    title: string;
    score: number;
    rank: number;
    total: number;
  }) => (
    <div className={`p-3 sm:p-4 rounded-lg border-2 ${competitorService.getScoreBackground(score)}`}>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2 space-y-1 sm:space-y-0">
        <h3 className="text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300 break-words">{title}</h3>
        <div className="flex items-center space-x-1 self-start sm:self-auto">
          <Trophy className="h-3 w-3 sm:h-4 sm:w-4 text-yellow-500 flex-shrink-0" />
          <span className="text-xs text-gray-600 dark:text-gray-400">#{rank}/{total}</span>
        </div>
      </div>
      <div className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">{score}</div>
      <div className="text-xs text-gray-500 dark:text-gray-400">out of 100</div>
    </div>
  );

  const ComparisonTable = () => (
    <div className="overflow-x-auto -mx-4 sm:mx-0">
      <table className="w-full min-w-[600px]">
        <thead>
          <tr className="border-b border-gray-200 dark:border-gray-700">
            <th className="text-left py-3 px-2 sm:px-4 text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300 min-w-[120px]">
              Domain
            </th>
            <th className="text-center py-3 px-1 sm:px-4 text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300 min-w-[70px]">
              Perf
            </th>
            <th className="text-center py-3 px-1 sm:px-4 text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300 min-w-[50px]">
              SEO
            </th>
            <th className="text-center py-3 px-1 sm:px-4 text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300 min-w-[60px]">
              A11y
            </th>
            <th className="text-center py-3 px-1 sm:px-4 text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300 min-w-[70px]">
              Best
            </th>
            <th className="text-center py-3 px-1 sm:px-4 text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300 min-w-[60px]">
              Overall
            </th>
          </tr>
        </thead>
        <tbody>
          {/* Main Domain */}
          <tr className="border-b border-gray-100 dark:border-gray-800 bg-blue-50 dark:bg-blue-900/20">
            <td className="py-3 px-2 sm:px-4">
              <div className="flex items-center space-x-1 sm:space-x-2">
                <Star className="h-3 w-3 sm:h-4 sm:w-4 text-blue-600 dark:text-blue-400 flex-shrink-0" />
                <div className="min-w-0">
                  <div className="font-medium text-gray-900 dark:text-white text-xs sm:text-sm break-all">
                    {safeData.seoScores.mainDomain.domain || 'Your Website'}
                  </div>
                  <div className="text-xs text-gray-500 dark:text-gray-400 hidden sm:block">Your website</div>
                </div>
              </div>
            </td>
            <td className="py-3 px-1 sm:px-4 text-center">
              <span className={`font-medium text-xs sm:text-sm ${competitorService.getScoreColor(safeData.seoScores.mainDomain.scores.performance)}`}>
                {safeData.seoScores.mainDomain.scores.performance}
              </span>
            </td>
            <td className="py-3 px-1 sm:px-4 text-center">
              <span className={`font-medium text-xs sm:text-sm ${competitorService.getScoreColor(safeData.seoScores.mainDomain.scores.seo)}`}>
                {safeData.seoScores.mainDomain.scores.seo}
              </span>
            </td>
            <td className="py-3 px-1 sm:px-4 text-center">
              <span className={`font-medium text-xs sm:text-sm ${competitorService.getScoreColor(safeData.seoScores.mainDomain.scores.accessibility)}`}>
                {safeData.seoScores.mainDomain.scores.accessibility}
              </span>
            </td>
            <td className="py-3 px-1 sm:px-4 text-center">
              <span className={`font-medium text-xs sm:text-sm ${competitorService.getScoreColor(safeData.seoScores.mainDomain.scores.bestPractices)}`}>
                {safeData.seoScores.mainDomain.scores.bestPractices}
              </span>
            </td>
            <td className="py-3 px-1 sm:px-4 text-center">
              <span className={`font-bold text-xs sm:text-sm ${competitorService.getScoreColor(safeData.seoScores.mainDomain.scores.overall)}`}>
                {safeData.seoScores.mainDomain.scores.overall}
              </span>
            </td>
          </tr>

          {/* Competitors */}
          {safeData.seoScores.competitors.map((competitor, index) => (
            <tr key={competitor.domain} className="border-b border-gray-100 dark:border-gray-800">
              <td className="py-3 px-2 sm:px-4">
                <div className="flex items-center space-x-1 sm:space-x-2">
                  <div className="w-3 h-3 sm:w-4 sm:h-4 bg-gray-300 dark:bg-gray-600 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-xs font-medium text-gray-600 dark:text-gray-300">
                      {index + 1}
                    </span>
                  </div>
                  <div className="min-w-0">
                    <div className="font-medium text-gray-900 dark:text-white text-xs sm:text-sm break-all">
                      {competitor.domain}
                    </div>
                    <div className="text-xs text-gray-500 dark:text-gray-400 hidden sm:block">Competitor</div>
                  </div>
                </div>
              </td>
              <td className="py-3 px-1 sm:px-4 text-center">
                <div className="flex items-center justify-center space-x-2">
                  <span className={`font-medium text-xs sm:text-sm ${competitorService.getScoreColor(competitor?.scores?.performance || 0)}`}>
                    {competitor?.scores?.performance || 0}
                  </span>
                  {safeData.scoreDifferences.differences[index] && (
                    <span className={`text-xs ${competitorService.getDifferenceColor(safeData.scoreDifferences.differences[index].performance)}`}>
                      {competitorService.getDifferenceIcon(safeData.scoreDifferences.differences[index].performance)}
                      {Math.abs(safeData.scoreDifferences.differences[index].performance)}
                    </span>
                  )}
                </div>
              </td>
              <td className="py-3 px-4 text-center">
                <div className="flex items-center justify-center space-x-2">
                  <span className={`font-medium ${competitorService.getScoreColor(competitor?.scores?.seo || 0)}`}>
                    {competitor?.scores?.seo || 0}
                  </span>
                  {safeData.scoreDifferences.differences[index] && (
                    <span className={`text-xs ${competitorService.getDifferenceColor(safeData.scoreDifferences.differences[index].seo)}`}>
                      {competitorService.getDifferenceIcon(safeData.scoreDifferences.differences[index].seo)}
                      {Math.abs(safeData.scoreDifferences.differences[index].seo)}
                    </span>
                  )}
                </div>
              </td>
              <td className="py-3 px-4 text-center">
                <div className="flex items-center justify-center space-x-2">
                  <span className={`font-medium ${competitorService.getScoreColor(competitor?.scores?.accessibility || 0)}`}>
                    {competitor?.scores?.accessibility || 0}
                  </span>
                  {safeData.scoreDifferences.differences[index] && (
                    <span className={`text-xs ${competitorService.getDifferenceColor(safeData.scoreDifferences.differences[index].accessibility)}`}>
                      {competitorService.getDifferenceIcon(safeData.scoreDifferences.differences[index].accessibility)}
                      {Math.abs(safeData.scoreDifferences.differences[index].accessibility)}
                    </span>
                  )}
                </div>
              </td>
              <td className="py-3 px-4 text-center">
                <div className="flex items-center justify-center space-x-2">
                  <span className={`font-medium ${competitorService.getScoreColor(competitor?.scores?.bestPractices || 0)}`}>
                    {competitor?.scores?.bestPractices || 0}
                  </span>
                  {safeData.scoreDifferences.differences[index] && (
                    <span className={`text-xs ${competitorService.getDifferenceColor(safeData.scoreDifferences.differences[index].bestPractices)}`}>
                      {competitorService.getDifferenceIcon(safeData.scoreDifferences.differences[index].bestPractices)}
                      {Math.abs(safeData.scoreDifferences.differences[index].bestPractices)}
                    </span>
                  )}
                </div>
              </td>
              <td className="py-3 px-4 text-center">
                <div className="flex items-center justify-center space-x-2">
                  <span className={`font-bold ${competitorService.getScoreColor(competitor?.scores?.overall || 0)}`}>
                    {competitor?.scores?.overall || 0}
                  </span>
                  {safeData.scoreDifferences.differences[index] && (
                    <span className={`text-xs ${competitorService.getDifferenceColor(safeData.scoreDifferences.differences[index].overall)}`}>
                      {competitorService.getDifferenceIcon(safeData.scoreDifferences.differences[index].overall)}
                      {Math.abs(safeData.scoreDifferences.differences[index].overall)}
                    </span>
                  )}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  const MetaTagsComparison = () => (
    <div className="space-y-6">
      {/* Main Domain Meta Tags */}
      <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
          <Star className="h-5 w-5 text-blue-600 dark:text-blue-400 mr-2" />
          {safeData.metaTagComparison.mainDomain.domain || 'Your Website'} (Your Website)
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {Object.entries(safeData.metaTagComparison.mainDomain.metaTags || {}).map(([tag, data]) => (
            <div key={tag} className="bg-white dark:bg-gray-800 rounded-lg p-3">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300 capitalize">
                  {tag.replace(/([A-Z])/g, ' $1').trim()}
                </span>
                <span className={`text-xs px-2 py-1 rounded-full ${(data.found || data.content)
                  ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400'
                  : 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400'
                  }`}>
                  {(data.found || data.content) ? 'Found' : 'Missing'}
                </span>
              </div>
              {data.content && (
                <p className="text-xs text-gray-600 dark:text-gray-400 line-clamp-2">
                  {data.content}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Competitors Meta Tags */}
      {safeData.metaTagComparison.competitors.map((competitor, index) => (
        <div key={competitor.domain} className="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-4">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
            <div className="w-5 h-5 bg-gray-300 dark:bg-gray-600 rounded-full flex items-center justify-center mr-2">
              <span className="text-xs font-medium text-gray-600 dark:text-gray-300">
                {index + 1}
              </span>
            </div>
            {competitor.domain}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {Object.entries(competitor?.metaTags || {}).map(([tag, data]) => (
              <div key={tag} className="bg-white dark:bg-gray-800 rounded-lg p-3">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300 capitalize">
                    {tag.replace(/([A-Z])/g, ' $1').trim()}
                  </span>
                  <span className={`text-xs px-2 py-1 rounded-full ${(data.found || data.content)
                    ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400'
                    : 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400'
                    }`}>
                    {(data.found || data.content) ? 'Found' : 'Missing'}
                  </span>
                </div>
                {data.content && (
                  <p className="text-xs text-gray-600 dark:text-gray-400 line-clamp-2">
                    {data.content}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-4 sm:p-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 space-y-3 sm:space-y-0">
          <div className="min-w-0">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">
              Competitor Analysis Results
            </h2>
            <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 break-words">
              Analysis completed for {safeData.summary.mainDomain} vs {safeData.summary.totalCompetitors} competitors
            </p>
          </div>
          <div className="flex items-center space-x-2 self-start sm:self-auto">
            <button
              onClick={() => onSaveReport?.(results.reportId)}
              className="px-3 py-2 sm:px-4 sm:py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors text-sm sm:text-base"
            >
              <Download className="h-4 w-4 mr-2 inline" />
              Download Report
            </button>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          <ScoreCard
            title="Overall Score"
            score={safeData.summary.overallScore}
            rank={safeData.summary.overallRank}
            total={safeData.summary.totalCompetitors + 1}
          />
          <ScoreCard
            title="Performance"
            score={safeData.seoScores.mainDomain.scores.performance}
            rank={safeData.rankings.performance.find(r => r.domain === safeData.summary.mainDomain)?.rank || 0}
            total={safeData.summary.totalCompetitors + 1}
          />
          <ScoreCard
            title="SEO"
            score={safeData.seoScores.mainDomain.scores.seo}
            rank={safeData.rankings.seo.find(r => r.domain === safeData.summary.mainDomain)?.rank || 0}
            total={safeData.summary.totalCompetitors + 1}
          />
          <ScoreCard
            title="Accessibility"
            score={safeData.seoScores.mainDomain.scores.accessibility}
            rank={safeData.rankings.accessibility.find(r => r.domain === safeData.summary.mainDomain)?.rank || 0}
            total={safeData.summary.totalCompetitors + 1}
          />
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
        <div className="border-b border-gray-200 dark:border-gray-700">
          <nav className="flex flex-wrap sm:flex-nowrap space-x-2 sm:space-x-8 px-4 sm:px-6 py-2 sm:py-0" aria-label="Tabs">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as typeof activeTab)}
                  className={`${activeTab === tab.id
                    ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300'
                    } whitespace-nowrap py-3 sm:py-4 px-2 sm:px-1 border-b-2 font-medium text-xs sm:text-sm flex items-center space-x-1 sm:space-x-2`}
                >
                  <Icon className="h-3 w-3 sm:h-4 sm:w-4" />
                  <span className="hidden sm:inline">{tab.label}</span>
                  <span className="sm:hidden">{tab.label.split(' ')[0]}</span>
                </button>
              );
            })}
          </nav>
        </div>

        <div className="p-4 sm:p-6">
          {activeTab === 'overview' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                    Performance Rankings
                  </h3>
                  <div className="space-y-3">
                    {safeData.rankings.overall.map((item, index) => (
                      <div key={item.domain} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
                        <div className="flex items-center space-x-3">
                          <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${index === 0 ? 'bg-yellow-400 text-yellow-900' :
                            index === 1 ? 'bg-gray-300 text-gray-700' :
                              index === 2 ? 'bg-orange-400 text-orange-900' :
                                'bg-gray-200 text-gray-600'
                            }`}>
                            {item.rank}
                          </div>
                          <div>
                            <div className="font-medium text-gray-900 dark:text-white">
                              {item.domain}
                            </div>
                            {item.domain === safeData.summary.mainDomain && (
                              <div className="text-xs text-blue-600 dark:text-blue-400">Your website</div>
                            )}
                          </div>
                        </div>
                        <div className={`text-lg font-bold ${competitorService.getScoreColor(item.score)}`}>
                          {item.score}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                    Key Insights
                  </h3>
                  <div className="space-y-3">
                    <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                      <div className="text-sm font-medium text-blue-900 dark:text-blue-300">
                        Strongest Category
                      </div>
                      <div className="text-lg font-bold text-blue-600 dark:text-blue-400 capitalize">
                        {safeData.summary.strongestCategory}
                      </div>
                    </div>
                    <div className="p-3 bg-orange-50 dark:bg-orange-900/20 rounded-lg">
                      <div className="text-sm font-medium text-orange-900 dark:text-orange-300">
                        Needs Improvement
                      </div>
                      <div className="text-lg font-bold text-orange-600 dark:text-orange-400 capitalize">
                        {safeData.summary.weakestCategory}
                      </div>
                    </div>
                    <div className="p-3 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
                      <div className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        Overall Ranking
                      </div>
                      <div className="text-lg font-bold text-gray-900 dark:text-white">
                        #{safeData.summary.overallRank} of {safeData.summary.totalCompetitors + 1}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'scores' && <ComparisonTable />}
          {activeTab === 'meta-tags' && <MetaTagsComparison />}

          {activeTab === 'recommendations' && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Recommendations
              </h3>
              {safeData.recommendations.length > 0 ? (
                <div className="space-y-3">
                  {safeData.recommendations.map((recommendation, index) => (
                    <div key={index} className="p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg border border-yellow-200 dark:border-yellow-800">
                      <div className="flex items-start space-x-3">
                        <Target className="h-5 w-5 text-yellow-600 dark:text-yellow-400 mt-0.5" />
                        <p className="text-sm text-gray-700 dark:text-gray-300">{recommendation}</p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-600 dark:text-gray-400">No specific recommendations available.</p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 