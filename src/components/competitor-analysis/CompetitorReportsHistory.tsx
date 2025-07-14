"use client";

import { useState, useEffect, useCallback } from 'react';
import {
  Calendar,

  Eye,
  Trash2,
  Users,
  ChevronLeft,
  ChevronRight,
  FileText,
  Search,
  Filter,
  TrendingUp
} from 'lucide-react';
import { CompetitorReport } from '@/types/competitor';
import { competitorService } from '@/lib/services';

interface CompetitorReportsHistoryProps {
  onViewReport: (report: CompetitorReport) => void;
  refreshTrigger?: number;
}

export default function CompetitorReportsHistory({
  onViewReport,
  refreshTrigger = 0
}: CompetitorReportsHistoryProps) {
  const [reports, setReports] = useState<CompetitorReport[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalReports, setTotalReports] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'createdAt' | 'mainDomain'>('createdAt');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');

  const loadReports = useCallback(async (page = 1) => {
    setLoading(true);
    setError(null);

    try {
      const response = await competitorService.getReports(page, 10);
      // Sort reports on frontend since backend doesn't support sorting yet
      const sortedReports = [...response.reports].sort((a, b) => {
        if (sortBy === 'createdAt') {
          const dateA = new Date(a.createdAt).getTime();
          const dateB = new Date(b.createdAt).getTime();
          return sortOrder === 'asc' ? dateA - dateB : dateB - dateA;
        } else if (sortBy === 'mainDomain') {
          return sortOrder === 'asc'
            ? a.mainDomain.localeCompare(b.mainDomain)
            : b.mainDomain.localeCompare(a.mainDomain);
        }
        return 0;
      });

      setReports(sortedReports);
      setCurrentPage(response.pagination.page);
      setTotalPages(response.pagination.totalPages);
      setTotalReports(response.pagination.totalReports);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load reports');
    } finally {
      setLoading(false);
    }
  }, [sortBy, sortOrder]);

  const handleDeleteReport = async (reportId: string) => {
    if (!confirm('Are you sure you want to delete this report?')) return;

    try {
      await competitorService.deleteReport(reportId);
      loadReports(currentPage);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete report');
    }
  };

  const filteredReports = reports.filter(report => {
    if (!searchQuery) return true;
    const query = searchQuery.toLowerCase();
    return (
      report.mainDomain.toLowerCase().includes(query) ||
      report.competitorDomains.some(domain => domain.toLowerCase().includes(query))
    );
  });

  useEffect(() => {
    loadReports(1);
  }, [loadReports, refreshTrigger]);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getOverallScore = (report: CompetitorReport) => {
    // Handle both data structures: comparison.differences.summary and comparison.summary
    if (report.comparison?.differences?.summary?.overallScore) {
      return report.comparison.differences.summary.overallScore;
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    if ((report.comparison as any)?.summary?.overallScore) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      return (report.comparison as any).summary.overallScore;
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    if ((report as any).comparisonData?.comparison?.summary?.overallScore) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      return (report as any).comparisonData.comparison.summary.overallScore;
    }
    return null;
  };

  const getRanking = (report: CompetitorReport) => {
    // Handle both data structures: comparison.differences.summary and comparison.summary
    if (report.comparison?.differences?.summary) {
      const summary = report.comparison.differences.summary;
      return `${summary.overallRank}/${summary.totalCompetitors + 1}`;
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    if ((report.comparison as any)?.summary) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const summary = (report.comparison as any).summary;
      return `${summary.overallRank}/${summary.totalCompetitors + 1}`;
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    if ((report as any).comparisonData?.comparison?.summary) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const summary = (report as any).comparisonData.comparison.summary;
      return `${summary.overallRank}/${summary.totalCompetitors + 1}`;
    }
    return null;
  };

  if (loading) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
        <div className="flex items-center justify-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          <span className="ml-2 text-gray-600 dark:text-gray-400">Loading reports...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
      {/* Header */}
      <div className="px-4 sm:px-6 py-4 border-b border-gray-200 dark:border-gray-700">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 space-y-2 sm:space-y-0">
          <div className="flex items-center space-x-2">
            <FileText className="h-5 w-5 text-blue-600 dark:text-blue-400" />
            <h2 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white">
              Previous Reports
            </h2>
            <span className="text-sm text-gray-500 dark:text-gray-400">
              ({totalReports} total)
            </span>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search by domain..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
            />
          </div>

          <div className="flex items-center space-x-2">
            <Filter className="h-4 w-4 text-gray-400 flex-shrink-0" />
            <select
              value={`${sortBy}-${sortOrder}`}
              onChange={(e) => {
                const [field, order] = e.target.value.split('-');
                setSortBy(field as 'createdAt' | 'mainDomain');
                setSortOrder(order as 'asc' | 'desc');
              }}
              className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white text-sm"
            >
              <option value="createdAt-desc">Newest First</option>
              <option value="createdAt-asc">Oldest First</option>
              <option value="mainDomain-asc">Domain A-Z</option>
              <option value="mainDomain-desc">Domain Z-A</option>
            </select>
          </div>
        </div>
      </div>

      {/* Reports List */}
      <div className="divide-y divide-gray-200 dark:divide-gray-700">
        {error && (
          <div className="px-6 py-4 bg-red-50 dark:bg-red-900/20 border-b border-red-200 dark:border-red-800">
            <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
          </div>
        )}

        {filteredReports.length === 0 ? (
          <div className="px-4 sm:px-6 py-8 text-center">
            <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500 dark:text-gray-400">
              {searchQuery ? 'No reports match your search' : 'No competitor analysis reports yet'}
            </p>
          </div>
        ) : (
          filteredReports.map((report) => (
            <div key={report.id} className="px-4 sm:px-6 py-4 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-3 sm:space-y-0">
                <div className="flex-1 min-w-0">
                  {/* Main Domain and Score */}
                  <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-3 mb-2 space-y-2 sm:space-y-0">
                    <div className="flex items-center space-x-2">
                      <TrendingUp className="h-4 w-4 text-blue-600 dark:text-blue-400 flex-shrink-0" />
                      <h3 className="text-base sm:text-lg font-medium text-gray-900 dark:text-white break-words">
                        {report.mainDomain}
                      </h3>
                    </div>

                    {getOverallScore(report) && (
                      <div className="flex items-center space-x-2 self-start sm:self-auto">
                        <div className={`px-2 py-1 rounded text-xs font-medium whitespace-nowrap ${competitorService.getScoreBackground(getOverallScore(report)!)
                          }`}>
                          Score: {getOverallScore(report)}
                        </div>
                        {getRanking(report) && (
                          <div className="text-xs text-gray-500 dark:text-gray-400 whitespace-nowrap">
                            Rank: {getRanking(report)}
                          </div>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Metadata */}
                  <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4 text-sm text-gray-500 dark:text-gray-400 space-y-1 sm:space-y-0">
                    <div className="flex items-center space-x-1">
                      <Users className="h-4 w-4 flex-shrink-0" />
                      <span>vs {report.competitorDomains.length} competitors</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Calendar className="h-4 w-4 flex-shrink-0" />
                      <span>{formatDate(report.createdAt)}</span>
                    </div>
                  </div>

                  {/* Competitor Domains */}
                  <div className="mt-2">
                    <div className="flex flex-wrap gap-1">
                      {report.competitorDomains.slice(0, 3).map((domain) => (
                        <span
                          key={domain}
                          className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-xs text-gray-600 dark:text-gray-300 rounded break-words"
                        >
                          {domain}
                        </span>
                      ))}
                      {report.competitorDomains.length > 3 && (
                        <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-xs text-gray-600 dark:text-gray-300 rounded">
                          +{report.competitorDomains.length - 3} more
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex items-center space-x-2 self-start sm:self-auto">
                  <button
                    onClick={() => onViewReport(report)}
                    className="p-2 text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-md transition-colors"
                    title="View Report"
                  >
                    <Eye className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => handleDeleteReport(report.id)}
                    className="p-2 text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-md transition-colors"
                    title="Delete Report"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="px-4 sm:px-6 py-4 border-t border-gray-200 dark:border-gray-700">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-3 sm:space-y-0">
            <div className="text-sm text-gray-500 dark:text-gray-400 text-center sm:text-left">
              Showing {filteredReports.length} of {totalReports} reports
            </div>

            <div className="flex items-center justify-center space-x-2">
              <button
                onClick={() => loadReports(currentPage - 1)}
                disabled={currentPage === 1}
                className="p-2 rounded-md border border-gray-300 dark:border-gray-600 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>

              <div className="flex items-center space-x-1">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <button
                    key={page}
                    onClick={() => loadReports(page)}
                    className={`px-2 sm:px-3 py-1 rounded-md text-sm ${currentPage === page
                      ? 'bg-blue-600 text-white'
                      : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                      } transition-colors`}
                  >
                    {page}
                  </button>
                ))}
              </div>

              <button
                onClick={() => loadReports(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="p-2 rounded-md border border-gray-300 dark:border-gray-600 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
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