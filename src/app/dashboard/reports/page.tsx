"use client";

import { useState, useEffect } from "react";
import { Calendar, Clock, ExternalLink, FileText, Search, Trash2, Download } from "lucide-react";
import { reportService, type Report } from "@/lib/services";
import { ApiError } from "@/lib/api";
import { generatePageSpeedPDF } from "@/lib/pageSpeedPdfGenerator";

export default function ReportsPage() {
  const [reports, setReports] = useState<Report[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [downloadingReports, setDownloadingReports] = useState<Set<string>>(new Set());

  const fetchReports = async (page = 1, query = "") => {
    setIsLoading(true);
    setError(null);

    try {
      if (query) {
        const searchResults = await reportService.searchReports(query);
        setReports(searchResults);
        setTotalPages(1);
      } else {
        const response = await reportService.getReports(page, 10);

        setReports(response.reports);
        setTotalPages(response.totalPages);
      }
    } catch (err) {
      if (err instanceof ApiError) {
        setError(err.message);
      } else {
        setError('Failed to fetch reports');
      }
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchReports(currentPage, searchQuery);
  }, [currentPage, searchQuery]);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    setCurrentPage(1);
    await fetchReports(1, searchQuery);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this report?')) return;

    try {
      await reportService.deleteReport(id);
      await fetchReports(currentPage, searchQuery);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete report');
    }
  };

  const handleDownload = async (report: Report) => {
    try {
      setDownloadingReports(prev => new Set(prev).add(report.id));

      // Generate PDF from the saved report data
      const reportData = {
        id: report.id,
        analysis: report.analysisResult,
        exportedAt: new Date().toISOString()
      };

      generatePageSpeedPDF(reportData);

    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to download PDF report');
    } finally {
      setDownloadingReports(prev => {
        const newSet = new Set(prev);
        newSet.delete(report.id);
        return newSet;
      });
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

  const getScoreColor = (score: number) => {
    // Handle invalid or undefined scores
    if (typeof score !== 'number' || isNaN(score)) {
      return "text-gray-600 bg-gray-100 dark:text-gray-400 dark:bg-gray-900/30";
    }

    if (score >= 90) return "text-green-600 bg-green-100 dark:text-green-400 dark:bg-green-900/30";
    if (score >= 50) return "text-yellow-600 bg-yellow-100 dark:text-yellow-400 dark:bg-yellow-900/30";
    return "text-red-600 bg-red-100 dark:text-red-400 dark:bg-red-900/30";
  };

  return (
    <div className="p-4 sm:p-6">
      {/* Header */}
      <div className="mb-6 sm:mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center space-y-3 sm:space-y-0 sm:space-x-3">
          <div className="flex items-center space-x-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-500 text-white">
              <FileText className="h-5 w-5" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-foreground">Reports</h1>
            </div>
          </div>
          <div className="sm:ml-auto">
            <p className="text-sm text-muted-foreground">
              View and manage your saved SEO analysis reports
            </p>
          </div>
        </div>
      </div>

      {/* Search */}
      <div className="mb-4 sm:mb-6">
        <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-2">
          <div className="relative flex-1">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search reports by website URL..."
              className="w-full rounded-lg border border-border bg-input px-4 py-2 pl-10 text-foreground placeholder-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
            />
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          </div>
          <button
            type="submit"
            className="rounded-lg bg-primary px-4 py-2 text-white font-medium transition-colors hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 w-full sm:w-auto"
          >
            Search
          </button>
        </form>
      </div>

      {/* Error Display */}
      {error && (
        <div className="mb-4 sm:mb-6 rounded-lg border border-red-200 bg-red-50 dark:border-red-800 dark:bg-red-950/50 p-4">
          <p className="text-sm text-red-700 dark:text-red-300">{error}</p>
        </div>
      )}

      {/* Reports List */}
      {isLoading ? (
        <div className="space-y-4">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="rounded-lg border border-border bg-card p-4 sm:p-6 shadow-sm">
              <div className="animate-pulse">
                <div className="h-4 bg-muted rounded w-1/2 mb-3"></div>
                <div className="h-3 bg-muted rounded w-1/4 mb-2"></div>
                <div className="h-3 bg-muted rounded w-1/3"></div>
              </div>
            </div>
          ))}
        </div>
      ) : reports.length === 0 ? (
        <div className="text-center py-8 sm:py-12">
          <FileText className="mx-auto h-10 w-10 sm:h-12 sm:w-12 text-muted-foreground mb-4" />
          <h3 className="text-lg font-medium text-foreground mb-2">No Reports Found</h3>
          <p className="text-sm sm:text-base text-muted-foreground px-4">
            {searchQuery ? 'No reports match your search criteria.' : 'Start analyzing websites to create your first report.'}
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {reports.map((report) => (
            <div key={report.id} className="rounded-lg border border-border bg-card p-4 sm:p-6 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between">
                <div className="flex-1 min-w-0">
                  <div className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-3 mb-4">
                    <h3 className="font-semibold text-card-foreground truncate">{report.websiteUrl}</h3>
                    <div className="flex items-center space-x-2 text-xs sm:text-sm">
                      <Calendar className="h-3 w-3 sm:h-4 sm:w-4 text-muted-foreground" />
                      <span className="text-muted-foreground">{formatDate(report.createdAt)}</span>
                    </div>
                  </div>

                  {report.analysisResult ? (
                    <div className="space-y-4">
                      {/* All Scores Display */}
                      <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-3">
                        {/* Performance Score */}
                        <div className="text-center">
                          <div className={`inline-flex items-center px-2 sm:px-3 py-1 sm:py-2 rounded-full text-xs sm:text-sm font-medium ${getScoreColor(report.analysisResult.performance?.score || 0)}`}>
                            Performance: {report.analysisResult.performance?.score || 0}
                          </div>
                        </div>

                        {/* SEO Score */}
                        <div className="text-center">
                          <div className={`inline-flex items-center px-2 sm:px-3 py-1 sm:py-2 rounded-full text-xs sm:text-sm font-medium ${getScoreColor(report.analysisResult.seo?.score || 0)}`}>
                            SEO: {report.analysisResult.seo?.score || 0}
                          </div>
                        </div>

                        {/* Accessibility Score */}
                        <div className="text-center">
                          <div className={`inline-flex items-center px-2 sm:px-3 py-1 sm:py-2 rounded-full text-xs sm:text-sm font-medium ${getScoreColor(report.analysisResult.accessibility?.score || 0)}`}>
                            A11y: {report.analysisResult.accessibility?.score || 0}
                          </div>
                        </div>

                        {/* Best Practices Score */}
                        <div className="text-center">
                          <div className={`inline-flex items-center px-2 sm:px-3 py-1 sm:py-2 rounded-full text-xs sm:text-sm font-medium ${getScoreColor(report.analysisResult.bestPractices?.score || 0)}`}>
                            Best: {report.analysisResult.bestPractices?.score || 0}
                          </div>
                        </div>
                      </div>

                      {/* Additional Details */}
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-4 text-xs sm:text-sm text-muted-foreground pt-3 border-t border-border">
                        <div className="flex items-center space-x-2">
                          <Clock className="h-3 w-3 sm:h-4 sm:w-4" />
                          <span>Load Time: {report.analysisResult.performance?.loadTime || '--'}s</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <FileText className="h-3 w-3 sm:h-4 sm:w-4" />
                          <span>{report.analysisResult.opportunities?.length || 0} Opportunities</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Search className="h-3 w-3 sm:h-4 sm:w-4" />
                          <span>Avg: {report.analysisResult.summary?.averageScore || Math.round(((report.analysisResult.performance?.score || 0) + (report.analysisResult.seo?.score || 0) + (report.analysisResult.accessibility?.score || 0) + (report.analysisResult.bestPractices?.score || 0)) / 4)}</span>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="text-xs sm:text-sm text-muted-foreground">
                      <p>Analysis data is incomplete or missing</p>
                    </div>
                  )}
                </div>

                <div className="flex sm:flex-col items-center sm:items-end space-x-2 sm:space-x-0 sm:space-y-2 mt-4 sm:mt-0 sm:ml-4">
                  <button
                    onClick={() => window.open(report.websiteUrl, '_blank')}
                    className="flex-1 sm:flex-none p-2 rounded-lg border border-border hover:bg-muted transition-colors"
                    title="Visit website"
                  >
                    <ExternalLink className="h-4 w-4 mx-auto" />
                  </button>
                  <button
                    onClick={() => handleDownload(report)}
                    className="flex-1 sm:flex-none p-2 rounded-lg border border-border hover:bg-blue-50 hover:border-blue-200 hover:text-blue-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    title="Download PDF report"
                    disabled={downloadingReports.has(report.id)}
                  >
                    {downloadingReports.has(report.id) ? (
                      <svg className="animate-spin h-4 w-4 text-blue-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                    ) : (
                      <Download className="h-4 w-4 mx-auto" />
                    )}
                  </button>
                  <button
                    onClick={() => handleDelete(report.id)}
                    className="flex-1 sm:flex-none p-2 rounded-lg border border-border hover:bg-red-50 hover:border-red-200 hover:text-red-600 transition-colors"
                    title="Delete report"
                  >
                    <Trash2 className="h-4 w-4 mx-auto" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && !searchQuery && (
        <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row items-center justify-center space-y-2 sm:space-y-0 sm:space-x-2">
          <button
            onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
            disabled={currentPage === 1}
            className="w-full sm:w-auto px-4 py-2 rounded border border-border hover:bg-muted transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Previous
          </button>

          <span className="px-3 py-1 text-sm text-muted-foreground">
            Page {currentPage} of {totalPages}
          </span>

          <button
            onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
            disabled={currentPage === totalPages}
            className="w-full sm:w-auto px-4 py-2 rounded border border-border hover:bg-muted transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
} 