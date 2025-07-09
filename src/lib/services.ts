import { apiRequest } from './api';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5001';

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
    
    // Log the raw response from the backend
    console.log('Raw backend response:', response);
    
    // Log each report's analysisResult structure
    if (response.reports) {
      response.reports.forEach((report, index) => {
        console.log(`Backend Report ${index + 1}:`, {
          id: report.id,
          websiteUrl: report.websiteUrl,
          analysisResult: report.analysisResult,
          analysisResult_type: typeof report.analysisResult,
          analysisResult_keys: report.analysisResult ? Object.keys(report.analysisResult) : 'null/undefined',
          performance_exists: !!report.analysisResult?.performance,
          performance_score: report.analysisResult?.performance?.score,
          opportunities_exists: !!report.analysisResult?.opportunities,
          opportunities_length: report.analysisResult?.opportunities?.length
        });
      });
    }
    
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
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('No authentication token found');
    }

    const response = await fetch(`${API_BASE_URL}/api/report/${reportId}/download`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error('Failed to download report');
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
      console.log('🔍 Making API request to validate meta tags for:', url);
      
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

      console.log('📦 Raw API response:', data);
      console.log('📦 Response keys:', Object.keys(data || {}));

      if (!data) {
        console.error('❌ Backend response is empty');
        throw new Error('Backend response is empty');
      }

      if (!data.tags) {
        console.error('❌ Backend response missing tags property');
        throw new Error('Backend response missing tags property. Full response: ' + JSON.stringify(data));
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

      console.log('✅ Processed backend response:', {
        url: data.url || 'URL missing',
        hasTagsProperty: !!data.tags,
        hasSummaryProperty: !!data.summary,
        calculatedSummary: summary,
        tagsKeys: data.tags ? Object.keys(data.tags) : 'tags is undefined'
      });

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
      console.error('❌ Meta tag validation failed:', error);
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