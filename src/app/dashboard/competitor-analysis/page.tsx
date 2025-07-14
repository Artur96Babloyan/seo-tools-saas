"use client";

import React, { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { competitorService } from '@/lib/services';
import { CompetitorAnalysisRequest, CompetitorAnalysisResult, CompetitorReport } from '@/types/competitor';
import { ApiError } from '@/lib/api';
import CompetitorAnalysisForm from '@/components/competitor-analysis/CompetitorAnalysisForm';
import CompetitorAnalysisResults from '@/components/competitor-analysis/CompetitorAnalysisResults';
import CompetitorReportsHistory from '@/components/competitor-analysis/CompetitorReportsHistory';
import { Clock, CheckCircle, TrendingUp, Users, Target, BarChart3, Globe, Search, Activity } from 'lucide-react';

type ViewState = 'form' | 'analyzing' | 'results' | 'history';

interface AnalysisStep {
  domain: string;
  step: 'seo' | 'meta' | 'performance' | 'accessibility' | 'completed';
  status: 'pending' | 'analyzing' | 'completed';
}

export default function CompetitorAnalysisPage() {
  useAuth(); // Ensure user is authenticated
  const [currentView, setCurrentView] = useState<ViewState>('form');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResults, setAnalysisResults] = useState<CompetitorAnalysisResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [reportsRefreshTrigger, setReportsRefreshTrigger] = useState(0);
  const [selectedReport, setSelectedReport] = useState<CompetitorReport | null>(null);
  const [analysisSteps, setAnalysisSteps] = useState<AnalysisStep[]>([]);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [analysisData, setAnalysisData] = useState<CompetitorAnalysisRequest | null>(null);

  // Simulate step progression during analysis
  useEffect(() => {
    if (isAnalyzing && analysisSteps.length > 0) {
      const interval = setInterval(() => {
        setCurrentStepIndex(prev => {
          const nextIndex = prev + 1;
          if (nextIndex < analysisSteps.length) {
            // Update step status
            setAnalysisSteps(prevSteps =>
              prevSteps.map((step, index) => ({
                ...step,
                status: index < nextIndex ? 'completed' :
                  index === nextIndex ? 'analyzing' : 'pending'
              }))
            );
            return nextIndex;
          }
          return prev;
        });
      }, 800); // Progress every 800ms for smooth animation

      return () => clearInterval(interval);
    }
  }, [isAnalyzing, analysisSteps.length]);

  const stats = [
    {
      name: 'Total Analyses',
      value: '24',
      icon: BarChart3,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50'
    },
    {
      name: 'Domains Tracked',
      value: '12',
      icon: Target,
      color: 'text-green-600',
      bgColor: 'bg-green-50'
    },
    {
      name: 'Competitors Analyzed',
      value: '48',
      icon: Users,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50'
    },
    {
      name: 'Avg. Score Improvement',
      value: '+15%',
      icon: TrendingUp,
      color: 'text-orange-600',
      bgColor: 'bg-orange-50'
    }
  ];

  const generateAnalysisSteps = (request: CompetitorAnalysisRequest): AnalysisStep[] => {
    const steps: AnalysisStep[] = [];
    const allDomains = [request.mainDomain, ...request.competitorDomains];
    const stepTypes: ('seo' | 'meta' | 'performance' | 'accessibility')[] = ['seo', 'meta', 'performance', 'accessibility'];

    allDomains.forEach(domain => {
      stepTypes.forEach(stepType => {
        steps.push({
          domain,
          step: stepType,
          status: 'pending'
        });
      });
    });

    // Add final completion step
    steps.push({
      domain: 'Analysis Complete',
      step: 'completed',
      status: 'pending'
    });

    return steps;
  };

  const handleStartAnalysis = async (request: CompetitorAnalysisRequest) => {
    setIsAnalyzing(true);
    setError(null);
    setAnalysisData(request);
    setCurrentView('analyzing');

    // Generate analysis steps
    const steps = generateAnalysisSteps(request);
    setAnalysisSteps(steps);
    setCurrentStepIndex(0);

    try {
      const results = await competitorService.analyzeCompetitors(request);
      setAnalysisResults(results);
      setCurrentView('results');
      setReportsRefreshTrigger(prev => prev + 1);
    } catch (err) {
      let errorMessage = 'Failed to analyze competitors';

      if (err instanceof ApiError) {
        errorMessage = err.message;
      } else if (err instanceof Error) {
        errorMessage = err.message;
      }

      setError(errorMessage);
      setCurrentView('form');
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleViewReport = (report: CompetitorReport) => {
    setSelectedReport(report);

    // Convert CompetitorReport to CompetitorAnalysisResult format
    if (report.comparison) {
      const analysisResult: CompetitorAnalysisResult = {
        success: true,
        reportId: report.id,
        comparison: report.comparison
      };
      setAnalysisResults(analysisResult);
    } else if ('comparisonData' in report && (report as unknown as { comparisonData: { comparison: CompetitorAnalysisResult['comparison'] } }).comparisonData?.comparison) {
      const analysisResult: CompetitorAnalysisResult = {
        success: true,
        reportId: report.id,
        comparison: (report as unknown as { comparisonData: { comparison: CompetitorAnalysisResult['comparison'] } }).comparisonData.comparison
      };
      setAnalysisResults(analysisResult);
    } else {
      // If no comparison data is found, create a minimal structure to prevent errors
      const analysisResult: CompetitorAnalysisResult = {
        success: true,
        reportId: report.id,
        comparison: {
          mainDomain: {
            domain: report.mainDomain,
            url: report.mainDomain,
            seoAnalysis: {
              url: report.mainDomain,
              analysis: {
                performance: { score: 0 },
                seo: { score: 0 },
                accessibility: { score: 0 },
                bestPractices: { score: 0 }
              }
            },
            metaAnalysis: { tags: { title: { found: false }, metaDescription: { found: false }, ogTitle: { found: false }, ogDescription: { found: false }, ogImage: { found: false } } },
            timestamp: report.createdAt
          },
          competitors: [],
          differences: {
            seoScores: {
              mainDomain: { domain: report.mainDomain, scores: { performance: 0, seo: 0, accessibility: 0, bestPractices: 0, overall: 0 } },
              competitors: []
            },
            metaTagComparison: {
              mainDomain: { domain: report.mainDomain, metaTags: { title: { found: false, content: null }, metaDescription: { found: false, content: null }, ogTitle: { found: false, content: null }, ogDescription: { found: false, content: null }, ogImage: { found: false, content: null } } },
              competitors: []
            },
            scoreDifferences: {
              mainDomain: report.mainDomain,
              differences: []
            },
            rankings: {
              performance: [],
              seo: [],
              accessibility: [],
              bestPractices: [],
              overall: []
            },
            recommendations: ['This report appears to have incomplete data. Please run a new analysis for current results.'],
            summary: {
              mainDomain: report.mainDomain,
              overallScore: 0,
              overallRank: 1,
              totalCompetitors: report.competitorDomains.length,
              strongestCategory: 'N/A',
              weakestCategory: 'N/A',
              analysisDate: report.createdAt
            }
          }
        }
      };
      setAnalysisResults(analysisResult);
    }

    setCurrentView('results');
  };

  const handleNewAnalysis = () => {
    setCurrentView('form');
    setAnalysisResults(null);
    setSelectedReport(null);
    setError(null);
  };

  const handleViewHistory = () => {
    setCurrentView('history');
  };

  const handleSaveReport = async () => {
    // Report is automatically saved by the backend
    setReportsRefreshTrigger(prev => prev + 1);
  };

  const getStepIcon = (step: AnalysisStep['step']) => {
    switch (step) {
      case 'seo':
        return Search;
      case 'meta':
        return BarChart3;
      case 'performance':
        return Activity;
      case 'accessibility':
        return Target;
      case 'completed':
        return CheckCircle;
      default:
        return Clock;
    }
  };

  const getStepLabel = (step: AnalysisStep['step']) => {
    switch (step) {
      case 'seo':
        return 'SEO Analysis';
      case 'meta':
        return 'Meta Tags';
      case 'performance':
        return 'Performance';
      case 'accessibility':
        return 'Accessibility';
      case 'completed':
        return 'Finalizing Results';
      default:
        return 'Processing';
    }
  };

  const renderAnalyzingView = () => {
    const currentStep = analysisSteps[currentStepIndex];
    const progress = analysisSteps.length > 0 ? (currentStepIndex / analysisSteps.length) * 100 : 0;

    return (
      <div className="max-w-4xl mx-auto">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="flex items-center justify-center mb-6">
              <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-600 border-t-transparent"></div>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Analyzing Competitors
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              {analysisData ? (
                <>Analyzing {analysisData.mainDomain} vs {analysisData.competitorDomains.length} competitors</>
              ) : (
                <>We&apos;re analyzing your website and comparing it with your competitors.</>
              )}
            </p>
          </div>

          {/* Progress Bar */}
          <div className="mb-8">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm text-gray-600 dark:text-gray-400">Progress</span>
              <span className="text-sm text-gray-600 dark:text-gray-400">
                {currentStepIndex + 1} of {analysisSteps.length} steps
              </span>
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
              <div
                className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          {/* Current Step */}
          {currentStep && (
            <div className="mb-8">
              <div className="flex items-center justify-center space-x-3 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                <div className="flex items-center space-x-2">
                  <Globe className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                  <span className="font-medium text-blue-900 dark:text-blue-300">
                    {currentStep.domain === 'Analysis Complete' ? 'Analysis Complete' : currentStep.domain}
                  </span>
                </div>
                <span className="text-blue-600 dark:text-blue-400">→</span>
                <div className="flex items-center space-x-2">
                  {React.createElement(getStepIcon(currentStep.step), { className: "h-5 w-5 text-blue-600 dark:text-blue-400" })}
                  <span className="font-medium text-blue-900 dark:text-blue-300">
                    {getStepLabel(currentStep.step)}
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* Steps List */}
          <div className="space-y-3 mb-8">
            {analysisSteps.slice(0, 12).map((step, index) => {
              const StepIcon = getStepIcon(step.step);

              return (
                <div
                  key={index}
                  className={`flex items-center space-x-3 p-3 rounded-lg transition-all duration-200 ${step.status === 'completed'
                    ? 'bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800'
                    : step.status === 'analyzing'
                      ? 'bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800'
                      : 'bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700'
                    }`}
                >
                  <div className="flex items-center space-x-2 flex-1">
                    {step.status === 'completed' ? (
                      <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400" />
                    ) : step.status === 'analyzing' ? (
                      <div className="animate-spin rounded-full h-5 w-5 border-2 border-blue-600 border-t-transparent" />
                    ) : (
                      <StepIcon className="h-5 w-5 text-gray-400" />
                    )}
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <span className={`text-sm font-medium ${step.status === 'completed'
                          ? 'text-green-900 dark:text-green-300'
                          : step.status === 'analyzing'
                            ? 'text-blue-900 dark:text-blue-300'
                            : 'text-gray-600 dark:text-gray-400'
                          }`}>
                          {step.domain} - {getStepLabel(step.step)}
                        </span>
                        {step.status === 'analyzing' && (
                          <span className="text-xs text-blue-600 dark:text-blue-400 font-medium">
                            Analyzing...
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}

            {analysisSteps.length > 12 && (
              <div className="text-center text-sm text-gray-500 dark:text-gray-400">
                ... and {analysisSteps.length - 12} more steps
              </div>
            )}
          </div>

          {/* Tip */}
          <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
            <p className="text-sm text-blue-700 dark:text-blue-300">
              💡 <strong>Tip:</strong> While we analyze your competitors, the results will be automatically saved to your reports for future reference.
            </p>
          </div>
        </div>
      </div>
    );
  };

  const renderContent = () => {
    switch (currentView) {
      case 'form':
        return (
          <div className="space-y-6">
            <CompetitorAnalysisForm
              onSubmit={handleStartAnalysis}
              isLoading={isAnalyzing}
              error={error}
            />
          </div>
        );

      case 'analyzing':
        return renderAnalyzingView();

      case 'results':
        return analysisResults ? (
          <div className="space-y-6">
            <CompetitorAnalysisResults
              results={analysisResults}
              onSaveReport={handleSaveReport}
            />
          </div>
        ) : (
          <div className="text-center py-8">
            <p className="text-gray-600 dark:text-gray-400">No results to display</p>
          </div>
        );

      case 'history':
        return (
          <CompetitorReportsHistory
            onViewReport={handleViewReport}
            refreshTrigger={reportsRefreshTrigger}
          />
        );

      default:
        return null;
    }
  };

  return (
    <div className="p-4 sm:p-6 space-y-6">
      {/* Header */}
      <div className="mb-6 sm:mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center space-y-3 sm:space-y-0 sm:space-x-3">
          <div className="flex items-center space-x-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-purple-500 text-white">
              <BarChart3 className="h-5 w-5" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-foreground">Competitor Analysis</h1>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-2 sm:ml-auto">
            <p className="text-sm text-muted-foreground">
              Compare your website&apos;s SEO performance against your competitors
            </p>
            <div className="flex items-center space-x-2">
              {currentView === 'results' && (
                <button
                  onClick={handleNewAnalysis}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  New Analysis
                </button>
              )}

              {currentView !== 'history' && (
                <button
                  onClick={handleViewHistory}
                  className="px-4 py-2 border border-border text-foreground rounded-lg hover:bg-muted transition-colors"
                >
                  View History
                </button>
              )}

              {currentView === 'history' && (
                <button
                  onClick={handleNewAnalysis}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  New Analysis
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Stats */}
      {currentView === 'form' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <div key={stat.name} className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-4">
                <div className="flex items-center">
                  <div className={`${stat.bgColor} dark:${stat.bgColor.replace('bg-', 'bg-')}/20 p-2 rounded-lg`}>
                    <Icon className={`h-5 w-5 ${stat.color} dark:${stat.color.replace('text-', 'text-')}`} />
                  </div>
                  <div className="ml-3">
                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400">{stat.name}</p>
                    <p className="text-lg font-semibold text-gray-900 dark:text-white">{stat.value}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Navigation Breadcrumbs */}
      {currentView !== 'form' && (
        <div className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
          <button
            onClick={handleNewAnalysis}
            className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
          >
            Competitor Analysis
          </button>
          <span>/</span>
          <span className="text-gray-900 dark:text-white">
            {currentView === 'analyzing' && 'Analyzing...'}
            {currentView === 'results' && (selectedReport ? `Results - ${selectedReport.mainDomain}` : 'Results')}
            {currentView === 'history' && 'Report History'}
          </span>
        </div>
      )}

      {/* Content */}
      {renderContent()}

      {/* Help Section */}
      {currentView === 'form' && (
        <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-blue-900 dark:text-blue-300 mb-4">
            How Competitor Analysis Works
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-blue-800 dark:text-blue-200">
            <div>
              <h4 className="font-medium mb-2">✨ What We Analyze:</h4>
              <ul className="space-y-1">
                <li>• SEO performance scores</li>
                <li>• Page speed metrics</li>
                <li>• Meta tag optimization</li>
                <li>• Accessibility scores</li>
                <li>• Best practices compliance</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium mb-2">📊 You&apos;ll Get:</h4>
              <ul className="space-y-1">
                <li>• Side-by-side comparison</li>
                <li>• Performance rankings</li>
                <li>• Actionable recommendations</li>
                <li>• Detailed score breakdowns</li>
                <li>• Historical tracking</li>
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 