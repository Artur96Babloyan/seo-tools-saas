import { apiRequest } from './api';

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
}

export interface Report {
  id: string;
  website_url: string;
  analysis_result: SeoAnalysis;
  created_at: string;
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
    title: boolean;
    metaDescription: boolean;
    metaRobots: boolean;
    canonical: boolean;
    ogTitle: boolean;
    ogDescription: boolean;
    ogImage: boolean;
  };
  validatedAt: string;
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
    
    return await apiRequest<ReportsListResponse>(`/api/report/list?${params}`);
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
    interface BackendResponse {
      url: string;
      tags: {
        title: boolean;
        metaDescription: boolean;
        metaRobots: boolean;
        canonical: boolean;
        ogTitle: boolean;
        ogDescription: boolean;
        ogImage: boolean;
      };
      timestamp?: string;
    }

    try {
      const data = await apiRequest<BackendResponse>('/api/meta/validate', {
        method: 'POST',
        body: JSON.stringify({ url }),
      });

      return {
        url: data.url,
        tags: data.tags,
        validatedAt: data.timestamp || new Date().toISOString()
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