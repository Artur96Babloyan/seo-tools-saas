import { apiRequest } from './api';
import { 
  KeywordTrackingRequest, 
  KeywordTrackingResponse, 
  RankingHistoryResponse, 
  KeywordStatsResponse, 
  DomainsResponse,
  TrackedDomain,
  KeywordRankingResult,
  HistoryFilters, 
  CleanupRequest 
} from '@/types/keyword-tracker';
import { 
  CompetitorAnalysisRequest,
  CompetitorAnalysisResult,
  CompetitorReport,
  CompetitorReportsResponse,
  CompetitorAnalysisComparison,
  CompetitorChartData,
  ChartDataset 
} from '@/types/competitor';
import { isValidGoogleDomain } from './googleDomains';
import { ApiError } from './api';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://api.auditcraft.io';

// Types for API responses
export interface SeoAnalysis {
  url: string;
  performance: {
    score: number;
    loadTime: number;
    firstContentfulPaint: number;
    largestContentfulPaint: number;
    cumulativeLayoutShift: number;
    firstInputDelay: number;
  };
  seo: {
    score: number;
  };
  accessibility: {
    score: number;
  };
  bestPractices: {
    score: number;
  };
  opportunities: Array<{
    title: string;
    description: string;
    savings: string;
    impact: 'high' | 'medium' | 'low';
  }>;
  diagnostics: Array<{
    title: string;
    description: string;
    value: string;
  }>;
  resources: {
    requests: number;
    totalSize: string;
    images: string;
    scripts: string;
    styles: string;
    fonts: string;
    other: string;
  };
  recommendations: Array<{
    category: string;
    priority: string;
    title: string;
    description: string;
    impact: string;
  }>;
  summary: {
    averageScore: number;
    status: string;
    totalIssues: number;
    criticalIssues: number;
    analysisDate: string;
  };
  timestamp: string;
  dataSource?: string;
  isRealData?: boolean;
}

export interface Report {
  id: string;
  websiteUrl: string;
  analysisResult: SeoAnalysis;
  createdAt: string;
}

export interface ReportsListResponse {
  reports: Report[];
  total: number;
  page: number;
  totalPages: number;
}

export interface ReportStatistics {
  totalReports: number;
  totalWebsites: number;
  averagePerformanceScore: number;
  recentActivity: Array<{
    date: string;
    count: number;
  }>;
}

export interface SitemapResult {
  url: string;
  urls: string[];
  totalUrls: number;
  crawlDepth: number;
  domain: string;
  generatedAt: string;
}

export interface SitemapOptions {
  maxDepth?: number;
  timeout?: number;
}

export interface MetaTagValidationResult {
  url: string;
  tags: {
    title: {
      exists: boolean;
      content?: string | null;
      length?: number;
      issues?: string[];
      recommendations?: string[];
    };
    metaDescription: {
      exists: boolean;
      content?: string | null;
      length?: number;
      issues?: string[];
      recommendations?: string[];
    };
    metaKeywords: {
      exists: boolean;
      content?: string | null;
      issues?: string[];
      recommendations?: string[];
    };
    metaRobots: {
      exists: boolean;
      content?: string | null;
      issues?: string[];
      recommendations?: string[];
    };
    canonical: {
      exists: boolean;
      url?: string | null;
      issues?: string[];
      recommendations?: string[];
    };
    ogTitle: {
      exists: boolean;
      content?: string | null;
      length?: number;
      issues?: string[];
      recommendations?: string[];
    };
    ogDescription: {
      exists: boolean;
      content?: string | null;
      length?: number;
      issues?: string[];
      recommendations?: string[];
    };
    ogImage: {
      exists: boolean;
      url?: string | null;
      issues?: string[];
      recommendations?: string[];
    };
    // Additional technical tags
    viewport?: {
      exists: boolean;
      content?: string | null;
      issues?: string[];
      recommendations?: string[];
    };
    charset?: {
      exists: boolean;
      content?: string | null;
      issues?: string[];
      recommendations?: string[];
    };
    favicon?: {
      exists: boolean;
      url?: string | null;
      issues?: string[];
      recommendations?: string[];
    };
  };
  validatedAt: string;
  summary: {
    totalTags: number;
    foundTags: number;
    criticalIssues: number;
    warnings: number;
    recommendations: number;
  };
}

export interface MetaTagDetails {
  title: string;
  description: string;
  importance: 'high' | 'medium' | 'low';
  recommendation: string;
}

// SEO Analysis Services
export const seoService = {
  async analyzeWebsite(url: string, options?: {
    strategy?: 'desktop' | 'mobile';
    categories?: string[];
  }): Promise<SeoAnalysis> {
    interface BackendResponse {
      url: string;
      analysis: {
        url: string;
        performance?: {
          score: number;
          loadTime?: number;
          firstContentfulPaint?: number;
          largestContentfulPaint?: number;
          cumulativeLayoutShift?: number;
          firstInputDelay?: number;
        };
        seo?: {
          score: number;
        };
        accessibility?: {
          score: number;
        };
        bestPractices?: {
          score: number;
        };
        opportunities?: Array<{
          title: string;
          description: string;
          savings?: string;
          impact?: string;
        }>;
        diagnostics?: Array<{
          title: string;
          description: string;
          value: string;
        }>;
        resources?: {
          requests: number;
          totalSize: string;
          images: string;
          scripts: string;
          styles: string;
          fonts: string;
          other: string;
        };
        recommendations?: Array<{
          category: string;
          priority: string;
          title: string;
          description: string;
          impact: string;
        }>;
        summary?: {
          averageScore: number;
          status: string;
          totalIssues: number;
          criticalIssues: number;
          analysisDate: string;
        };
        timestamp: string;
        dataSource?: string;
        isRealData?: boolean;
      };
    }

    const response = await apiRequest<BackendResponse>('/api/seo/analyze', {
      method: 'POST',
      body: JSON.stringify({ 
        url,
        options: {
          strategy: options?.strategy || 'desktop',
          categories: options?.categories || ['performance', 'seo', 'accessibility', 'best-practices']
        }
      }),
    });

    // Map backend response to frontend interface
    const analysis = response.analysis;
    return {
      url: analysis.url,
      performance: {
        score: analysis.performance?.score || 0,
        loadTime: analysis.performance?.loadTime || 0,
        firstContentfulPaint: analysis.performance?.firstContentfulPaint || 0,
        largestContentfulPaint: analysis.performance?.largestContentfulPaint || 0,
        cumulativeLayoutShift: analysis.performance?.cumulativeLayoutShift || 0,
        firstInputDelay: analysis.performance?.firstInputDelay || 0,
      },
      seo: {
        score: analysis.seo?.score || 0,
      },
      accessibility: {
        score: analysis.accessibility?.score || 0,
      },
      bestPractices: {
        score: analysis.bestPractices?.score || 0,
      },
      opportunities: analysis.opportunities?.map((opp) => ({
        title: opp.title,
        description: opp.description,
        savings: opp.savings || 'N/A',
        impact: (opp.impact as 'high' | 'medium' | 'low') || 'medium',
      })) || [],
      diagnostics: analysis.diagnostics || [],
      resources: analysis.resources || {
        requests: 0,
        totalSize: 'N/A',
        images: 'N/A',
        scripts: 'N/A',
        styles: 'N/A',
        fonts: 'N/A',
        other: 'N/A',
      },
      recommendations: analysis.recommendations || [],
      summary: analysis.summary || {
        averageScore: 0,
        status: 'unknown',
        totalIssues: 0,
        criticalIssues: 0,
        analysisDate: new Date().toISOString(),
      },
      timestamp: analysis.timestamp,
      dataSource: analysis.dataSource,
      isRealData: analysis.isRealData,
    };
  },

  async checkHealth(): Promise<{ status: string; timestamp: string }> {
    return await apiRequest('/api/seo/health');
  },
};

// Report Management Services
export const reportService = {
  async saveReport(url: string, analysisResult: SeoAnalysis): Promise<Report> {
    return await apiRequest<Report>('/api/report/save', {
      method: 'POST',
      body: JSON.stringify({
        website_url: url,
        analysis_result: analysisResult,
      }),
    });
  },

  async getReports(page = 1, limit = 10, url?: string): Promise<ReportsListResponse> {
    const params = new URLSearchParams({
      page: page.toString(),
      limit: limit.toString(),
      ...(url && { url }),
    });
    
    const response = await apiRequest<ReportsListResponse>(`/api/report/list?${params}`);
    
    return response;
  },

  async getReport(id: string): Promise<Report> {
    return await apiRequest<Report>(`/api/report/${id}`);
  },

  async searchReports(query: string): Promise<Report[]> {
    const params = new URLSearchParams({ q: query });
    return await apiRequest<Report[]>(`/api/report/search?${params}`);
  },

  async getStatistics(): Promise<ReportStatistics> {
    return await apiRequest<ReportStatistics>('/api/report/statistics');
  },

  async updateReport(id: string, analysisResult: SeoAnalysis): Promise<Report> {
    return await apiRequest<Report>(`/api/report/${id}`, {
      method: 'PUT',
      body: JSON.stringify({ analysis_result: analysisResult }),
    });
  },

  async deleteReport(id: string): Promise<void> {
    await apiRequest(`/api/report/${id}`, {
      method: 'DELETE',
    });
  },

  async downloadReport(reportId: string): Promise<void> {
    try {
      // Use the same auth service as the rest of the app
      const authService = (await import('./auth')).default;
      const token = authService.getToken();
      
      if (!token) {
        throw new Error('No authentication token found. Please log in again.');
      }

      const response = await fetch(`${API_BASE_URL}/api/report/${reportId}/download`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        // Handle 401 errors (token expired/invalid)
        if (response.status === 401) {
          authService.logout();
          throw new Error('Authentication expired. Please log in again.');
        }
        
        throw new Error(`Failed to download report: ${response.status} ${response.statusText}`);
      }

      // Get the filename from the Content-Disposition header
      const contentDisposition = response.headers.get('Content-Disposition');
      let filename = 'report.txt';
      if (contentDisposition) {
        const match = contentDisposition.match(/filename="(.+)"/);
        if (match) {
          filename = match[1];
        }
      }

      // Create a blob from the response
      const blob = await response.blob();
      
      // Create a download link
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);

    } catch (error) {
      throw error;
    }
  },
};

// Health Check Services
export const healthService = {
  async checkApiHealth(): Promise<{ status: string; uptime: number; timestamp: string }> {
    return await apiRequest('/api/health');
  },

  async checkDatabaseHealth(): Promise<{ status: string; timestamp: string }> {
    return await apiRequest('/api/health/database');
  },
};

// Sitemap Generation Services
export const sitemapService = {
  async generateSitemap(url: string, options?: SitemapOptions): Promise<SitemapResult> {
    interface BackendResponse {
      url: string;
      urls: string[];
      totalUrls: number;
      crawlDepth: number;
      domain: string;
      generatedAt: string;
    }

    const response = await apiRequest<BackendResponse>('/api/sitemap/generate', {
      method: 'POST',
      body: JSON.stringify({
        url,
        options: {
          maxDepth: options?.maxDepth || 2,
          timeout: options?.timeout || 30000
        }
      }),
    });

    return {
      url: response.url,
      urls: response.urls,
      totalUrls: response.totalUrls,
      crawlDepth: response.crawlDepth,
      domain: response.domain,
      generatedAt: response.generatedAt
    };
  },

  async validateUrl(url: string): Promise<{ url: string; isValid: boolean; message: string }> {
    return await apiRequest('/api/sitemap/validate-url', {
      method: 'POST',
      body: JSON.stringify({ url }),
    });
  },

  async checkHealth(): Promise<{ status: string; timestamp: string }> {
    return await apiRequest('/api/sitemap/health');
  },
};

// Meta Tag Validation Services
export const metaTagService = {
  async validateMetaTags(url: string): Promise<MetaTagValidationResult> {
    try {
      // The backend returns data directly, not wrapped in formatResponse.success()
      const data = await apiRequest<{
      url: string;
        tags: Record<string, {
          exists: boolean;
          content?: string | null;
          length?: number;
          url?: string | null;
          issues?: string[];
          recommendations?: string[];
        }>;
      timestamp?: string;
        validatedAt?: string;
        summary?: {
          totalTags: number;
          foundTags: number;
          criticalIssues: number;
          warnings: number;
          recommendations: number;
        };
      }>('/api/meta/validate', {
        method: 'POST',
        body: JSON.stringify({ url }),
      });

      if (!data) {
        throw new Error('Backend response is empty');
      }

      if (!data.tags) {
        throw new Error('Backend response missing tags property');
      }

      // Calculate summary ourselves if missing from backend
      const calculateSummary = (tags: typeof data.tags) => {
        const tagKeys = Object.keys(tags);
        const foundTags = tagKeys.filter(key => tags[key]?.exists).length;
        const criticalIssues = tagKeys.reduce((count, key) => count + (tags[key]?.issues?.length || 0), 0);
        const recommendations = tagKeys.reduce((count, key) => count + (tags[key]?.recommendations?.length || 0), 0);
        const warnings = tagKeys.reduce((count, key) => {
          const tagIssues = tags[key]?.issues || [];
          return count + tagIssues.filter((issue: string) => issue.includes('too long') || issue.includes('too short')).length;
        }, 0);

        return {
          totalTags: tagKeys.length,
          foundTags,
          criticalIssues,
          warnings,
          recommendations
        };
      };

      const summary = data.summary || calculateSummary(data.tags);

      // Use the real backend response directly (no fake transformation)
      return {
        url: data.url,
        tags: {
          title: {
            exists: data.tags.title?.exists || false,
            content: data.tags.title?.content || null,
            length: data.tags.title?.length || 0,
            issues: data.tags.title?.issues || [],
            recommendations: data.tags.title?.recommendations || []
          },
          metaDescription: {
            exists: data.tags.metaDescription?.exists || false,
            content: data.tags.metaDescription?.content || null,
            length: data.tags.metaDescription?.length || 0,
            issues: data.tags.metaDescription?.issues || [],
            recommendations: data.tags.metaDescription?.recommendations || []
          },
          metaKeywords: {
            exists: data.tags.metaKeywords?.exists || false,
            content: data.tags.metaKeywords?.content || null,
            issues: data.tags.metaKeywords?.issues || [],
            recommendations: data.tags.metaKeywords?.recommendations || []
          },
          metaRobots: {
            exists: data.tags.metaRobots?.exists || false,
            content: data.tags.metaRobots?.content || null,
            issues: data.tags.metaRobots?.issues || [],
            recommendations: data.tags.metaRobots?.recommendations || []
          },
          canonical: {
            exists: data.tags.canonical?.exists || false,
            url: data.tags.canonical?.url || null,
            issues: data.tags.canonical?.issues || [],
            recommendations: data.tags.canonical?.recommendations || []
          },
          ogTitle: {
            exists: data.tags.ogTitle?.exists || false,
            content: data.tags.ogTitle?.content || null,
            length: data.tags.ogTitle?.length || 0,
            issues: data.tags.ogTitle?.issues || [],
            recommendations: data.tags.ogTitle?.recommendations || []
          },
          ogDescription: {
            exists: data.tags.ogDescription?.exists || false,
            content: data.tags.ogDescription?.content || null,
            length: data.tags.ogDescription?.length || 0,
            issues: data.tags.ogDescription?.issues || [],
            recommendations: data.tags.ogDescription?.recommendations || []
          },
          ogImage: {
            exists: data.tags.ogImage?.exists || false,
            url: data.tags.ogImage?.url || null,
            issues: data.tags.ogImage?.issues || [],
            recommendations: data.tags.ogImage?.recommendations || []
          },
          viewport: {
            exists: data.tags.viewport?.exists || false,
            content: data.tags.viewport?.content || null,
            issues: data.tags.viewport?.issues || [],
            recommendations: data.tags.viewport?.recommendations || []
          },
          charset: {
            exists: data.tags.charset?.exists || false,
            content: data.tags.charset?.content || null,
            issues: data.tags.charset?.issues || [],
            recommendations: data.tags.charset?.recommendations || []
          },
          favicon: {
            exists: data.tags.favicon?.exists || false,
            url: data.tags.favicon?.url || null,
            issues: data.tags.favicon?.issues || [],
            recommendations: data.tags.favicon?.recommendations || []
          }
        },
        validatedAt: data.validatedAt || data.timestamp || new Date().toISOString(),
        summary: summary
      };
    } catch (error) {
      throw new Error(error instanceof Error ? error.message : 'Failed to validate meta tags');
    }
  },

  async getTagInfo(): Promise<Record<string, MetaTagDetails>> {
    return await apiRequest('/api/meta/info');
  },

  async checkHealth(): Promise<{ status: string; timestamp: string }> {
    return await apiRequest('/api/meta/health');
  },
};

// Keyword Tracking Services
export const keywordTrackingService = {
  async trackKeywords(domain: string, keywords: string[], location = 'google.com'): Promise<KeywordTrackingResponse> {
    try {
      // Input validation
      if (!domain) {
        throw new Error('Domain is required');
      }
      if (!Array.isArray(keywords) || keywords.length === 0) {
        throw new Error('At least one keyword is required');
      }
      if (keywords.length > 10) {
        throw new Error('Maximum 10 keywords allowed per request');
      }

      // Format domain
      const formattedDomain = domain.toLowerCase()
        .replace(/^(https?:\/\/)?(www\.)?/, '')
        .replace(/\/$/, '');

      // Format location
      const formattedLocation = location.toLowerCase()
        .replace(/^(https?:\/\/)?(www\.)?/, '')
        .trim();

      // Clean and validate keywords
      const cleanedKeywords = keywords.map(keyword => {
        if (typeof keyword !== 'string') {
          throw new Error('All keywords must be strings');
        }

        const cleaned = keyword.trim().normalize();
        
        // Validate keyword length
        if (cleaned.length < 1) {
          throw new Error('Keywords cannot be empty');
        }
        if (cleaned.length > 100) {
          throw new Error('Keywords must be less than 100 characters');
        }

        // Validate keyword characters
        if (!/^[\p{L}\p{N}\s\-_.,!?'"()]+$/u.test(cleaned)) {
          throw new Error(`Invalid characters in keyword: ${keyword}`);
        }

        return cleaned;
      });

      // Validate domain format
      const domainRegex = /^(?:[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?\.)+[a-zA-Z]{2,}$/;
      if (!domainRegex.test(formattedDomain)) {
        throw new Error(`Invalid domain format: ${domain}. Please use format like 'example.com'`);
      }

      // Validate the Google domain
      if (!isValidGoogleDomain(formattedLocation)) {
        throw new Error(`Invalid Google search domain: ${formattedLocation}. Please use format like 'google.com' or 'google.co.uk'`);
      }

      // Create the request payload - send the full Google domain to backend
      // The backend will handle the validation and country code extraction
      const request: KeywordTrackingRequest = {
        domain: formattedDomain,
        keywords: cleanedKeywords,
        location: formattedLocation  // Send full Google domain (e.g., "google.am")
      };

      // Validate request structure before sending
      if (!request.keywords || !Array.isArray(request.keywords) || request.keywords.length === 0) {
        throw new Error('Invalid request structure: keywords array is missing or empty');
      }

      // Make the API request
      const response = await apiRequest<KeywordTrackingResponse | { results: KeywordRankingResult[] }>('/api/keyword-tracker/track', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json; charset=utf-8',
          'Accept': 'application/json',
          'Accept-Language': '*'
        },
        body: JSON.stringify(request)
      });

      // Handle direct results array format
      if ('results' in response && Array.isArray(response.results)) {
        return {
          success: true,
          data: {
            domain: formattedDomain,
            location: formattedLocation,
            results: response.results
          },
          message: 'Keywords tracked successfully'
        };
      }

      // Handle standard response format
      if ('success' in response && 'data' in response) {
        return response as KeywordTrackingResponse;
      }

      throw new Error('Invalid response format from tracking API');

    } catch (error) {
      // Enhanced error logging
      if (error instanceof ApiError) {
        throw error;
      }
      throw new Error(error instanceof Error ? error.message : 'Failed to track keywords');
    }
  },

  async getHistory(filters: HistoryFilters = {}): Promise<RankingHistoryResponse['data']> {
    const params = new URLSearchParams();
    
    if (filters.domain) params.append('domain', filters.domain);
    if (filters.keyword) params.append('keyword', filters.keyword);
    if (filters.limit) params.append('limit', filters.limit.toString());

    const queryString = params.toString();
    const url = queryString ? `/api/keyword-tracker/history?${queryString}` : '/api/keyword-tracker/history';

    return await apiRequest<RankingHistoryResponse['data']>(url);
  },

  async getStatistics(domain?: string): Promise<KeywordStatsResponse['data']> {
    const params = domain ? `?domain=${encodeURIComponent(domain)}` : '';
    
    return await apiRequest<KeywordStatsResponse['data']>(`/api/keyword-tracker/stats${params}`);
  },

  async getDomains(): Promise<DomainsResponse> {
    try {
      const response = await apiRequest<DomainsResponse | TrackedDomain[] | { domains: TrackedDomain[] }>('/api/keyword-tracker/domains');

      // If response is direct array, wrap it in standard format
      if (Array.isArray(response)) {
        return {
          success: true,
          data: {
            domains: response
          }
        };
      }

      // If response is already in correct format, return as is
      if ('success' in response && 'data' in response) {
        return response as DomainsResponse;
      }

      // If response has direct domains array, wrap it
      if ('domains' in response && Array.isArray(response.domains)) {
        return {
          success: true,
          data: {
            domains: response.domains
          }
        };
      }

      // Default to empty domains list
      return {
        success: true,
        data: {
          domains: []
        }
      };
    } catch (error) {
      throw error;
    }
  },

  async deleteRanking(id: string): Promise<void> {
    await apiRequest(`/api/keyword-tracker/history/${id}`, {
      method: 'DELETE',
    });
  },

  async cleanupOldRankings(daysOld: number): Promise<void> {
    const request: CleanupRequest = { daysOld };
    
    await apiRequest('/api/keyword-tracker/cleanup', {
      method: 'POST',
      body: JSON.stringify(request),
    });
  },

  async checkHealth(): Promise<{ status: string; timestamp: string }> {
    return await apiRequest('/api/keyword-tracker/health');
  },
};

// Competitor Analysis Services
export const competitorService = {
  async analyzeCompetitors(request: CompetitorAnalysisRequest): Promise<CompetitorAnalysisResult> {
    // Validate domains
    const domainRegex = /^(?:[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?\.)+[a-zA-Z]{2,}$/;
    
    if (!domainRegex.test(request.mainDomain)) {
      throw new Error(`Invalid main domain format: ${request.mainDomain}`);
    }
    
    if (!request.competitorDomains || request.competitorDomains.length === 0) {
      throw new Error('At least one competitor domain is required');
    }
    
    if (request.competitorDomains.length > 5) {
      throw new Error('Maximum 5 competitor domains allowed');
    }
    
    request.competitorDomains.forEach(domain => {
      if (!domainRegex.test(domain)) {
        throw new Error(`Invalid competitor domain format: ${domain}`);
      }
    });
    
    // Check for duplicate domains
    const allDomains = [request.mainDomain, ...request.competitorDomains];
    const uniqueDomains = new Set(allDomains);
    if (uniqueDomains.size !== allDomains.length) {
      throw new Error('Duplicate domains are not allowed');
    }
    
    // Make real API call to backend
    return await apiRequest<CompetitorAnalysisResult>('/api/competitor/analyze', {
      method: 'POST',
      body: JSON.stringify(request),
    });
  },

  async getReports(page = 1, limit = 10): Promise<CompetitorReportsResponse> {
    const params = new URLSearchParams({
      page: page.toString(),
      limit: limit.toString(),
    });
    return await apiRequest<CompetitorReportsResponse>(`/api/competitor/reports?${params}`);
  },

  async getReport(id: string): Promise<CompetitorReport> {
    if (!id) {
      throw new Error('Report ID is required');
    }
    
    return await apiRequest<CompetitorReport>(`/api/competitor/reports/${id}`);
  },

  async deleteReport(id: string): Promise<void> {
    if (!id) {
      throw new Error('Report ID is required');
    }
    
    await apiRequest(`/api/competitor/reports/${id}`, {
      method: 'DELETE',
    });
  },

  async checkHealth(): Promise<{ status: string; timestamp: string }> {
    return await apiRequest('/api/competitor/health');
  },

  async getStatistics(): Promise<{
    totalAnalyses: number;
    domainsTracked: number;
    competitorsAnalyzed: number;
    avgScoreImprovement: number;
  }> {
    const response = await apiRequest<{
      data?: {
        totalAnalyses: number;
        domainsTracked: number;
        competitorsAnalyzed: number;
        avgScoreImprovement: number;
      };
      totalAnalyses?: number;
      domainsTracked?: number;
      competitorsAnalyzed?: number;
      avgScoreImprovement?: number;
    }>('/api/competitor/statistics');
    
    // Extract data from the backend response format
    if (response.data) {
      return response.data;
    }
    
    // Fallback to direct response if data property doesn't exist
    return {
      totalAnalyses: response.totalAnalyses || 0,
      domainsTracked: response.domainsTracked || 0,
      competitorsAnalyzed: response.competitorsAnalyzed || 0,
      avgScoreImprovement: response.avgScoreImprovement || 0,
    };
  },

  // Utility functions for data transformation
  transformDataForChart(comparison: CompetitorAnalysisComparison): CompetitorChartData {
    const scores = comparison.differences.seoScores;
    const labels = ['Performance', 'SEO', 'Accessibility', 'Best Practices'];
    
    const datasets: ChartDataset[] = [
      {
        label: scores.mainDomain.domain,
        data: [
          scores.mainDomain.scores.performance,
          scores.mainDomain.scores.seo,
          scores.mainDomain.scores.accessibility,
          scores.mainDomain.scores.bestPractices
        ],
        backgroundColor: 'rgba(99, 102, 241, 0.6)',
        borderColor: 'rgba(99, 102, 241, 1)',
        borderWidth: 2
      },
      ...scores.competitors.map((competitor, index) => ({
        label: competitor.domain,
        data: [
          competitor.scores.performance,
          competitor.scores.seo,
          competitor.scores.accessibility,
          competitor.scores.bestPractices
        ],
        backgroundColor: `rgba(${120 + index * 50}, ${180 - index * 30}, ${200 + index * 20}, 0.6)`,
        borderColor: `rgba(${120 + index * 50}, ${180 - index * 30}, ${200 + index * 20}, 1)`,
        borderWidth: 2
      }))
    ];
    
    return {
      labels,
      datasets
    };
  },

  getScoreColor(score: number): string {
    if (score >= 90) return 'text-green-700 dark:text-green-400';
    if (score >= 70) return 'text-yellow-700 dark:text-yellow-400';
    if (score >= 50) return 'text-orange-700 dark:text-orange-400';
    return 'text-red-700 dark:text-red-400';
  },

  getScoreBackground(score: number): string {
    if (score >= 90) return 'bg-green-50 border-green-200 text-green-800 dark:bg-green-900/20 dark:border-green-700 dark:text-green-300';
    if (score >= 70) return 'bg-yellow-50 border-yellow-200 text-yellow-800 dark:bg-yellow-900/20 dark:border-yellow-700 dark:text-yellow-300';
    if (score >= 50) return 'bg-orange-50 border-orange-200 text-orange-800 dark:bg-orange-900/20 dark:border-orange-700 dark:text-orange-300';
    return 'bg-red-50 border-red-200 text-red-800 dark:bg-red-900/20 dark:border-red-700 dark:text-red-300';
  },

  getDifferenceColor(difference: number): string {
    if (difference > 0) return 'text-green-600';
    if (difference < 0) return 'text-red-600';
    return 'text-gray-600';
  },

  formatDifference(difference: number): string {
    if (difference > 0) return `+${difference}`;
    return difference.toString();
  },

  getDifferenceIcon(difference: number): string {
    if (difference > 0) return '↑';
    if (difference < 0) return '↓';
    return '=';
  }
}; 