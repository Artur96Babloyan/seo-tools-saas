import { apiRequest } from './api';
import { 
  ContentOptimizationRequest, 
  ContentOptimizationResponse, 
  OptimizationHistoryResponse, 
  OptimizationFilters 
} from '@/shared/types/seo-optimizer';
import { ApiError } from './api';

// API_BASE_URL is used by apiRequest function

export const seoOptimizerService = {
  /**
   * Optimize content with AI
   */
  async optimizeContent(request: ContentOptimizationRequest): Promise<ContentOptimizationResponse> {
    try {
      
      const response = await apiRequest<ContentOptimizationResponse>('/api/seo/optimize-content', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(request),
      });

      return response;
    } catch (error) {
      console.error('SEO Optimizer Service - Error:', error);
      if (error instanceof ApiError) {
        throw error;
      }
      throw new Error('Failed to optimize content');
    }
  },

  /**
   * Get optimization history with pagination and filters
   */
  async getOptimizationHistory(filters: OptimizationFilters = {}): Promise<OptimizationHistoryResponse> {
    try {
      
      const params = new URLSearchParams();
      
      if (filters.page) params.append('page', filters.page.toString());
      if (filters.limit) params.append('limit', filters.limit.toString());
      if (filters.sortBy) params.append('sortBy', filters.sortBy);
      if (filters.sortOrder) params.append('sortOrder', filters.sortOrder);
      if (filters.search) params.append('search', filters.search);
      if (filters.dateFrom) params.append('dateFrom', filters.dateFrom);
      if (filters.dateTo) params.append('dateTo', filters.dateTo);

      const queryString = params.toString();
      const url = queryString ? `/api/seo/optimized-content?${queryString}` : '/api/seo/optimized-content';

      const response = await apiRequest<OptimizationHistoryResponse>(url);
      
      return response;
    } catch (error) {
      console.error('SEO Optimizer Service - History error:', error);
      if (error instanceof ApiError) {
        throw error;
      }
      throw new Error('Failed to fetch optimization history');
    }
  },



  /**
   * Get specific optimization by ID
   */
  async getOptimizationById(id: string): Promise<ContentOptimizationResponse> {
    try {
      const response = await apiRequest<ContentOptimizationResponse>(`/api/seo/optimized-content/${id}`);
      return response;
    } catch (error) {
      if (error instanceof ApiError) {
        throw error;
      }
      throw new Error('Failed to fetch optimization details');
    }
  },

  /**
   * Delete optimization by ID
   */
  async deleteOptimization(id: string): Promise<void> {
    try {
      await apiRequest(`/api/seo/optimized-content/${id}`, {
        method: 'DELETE',
      });
    } catch (error) {
      console.error('SEO Optimizer Service - Delete error:', error);
      if (error instanceof ApiError) {
        throw error;
      }
      throw new Error('Failed to delete optimization');
    }
  },

  /**
   * Export optimization content
   */
  async exportOptimization(id: string, format: 'html' | 'text' | 'markdown' = 'html'): Promise<string> {
    try {
      const response = await apiRequest<{ content: string }>(`/api/seo/optimized-content/${id}/export`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ format }),
      });

      return response.content;
    } catch (error) {
      if (error instanceof ApiError) {
        throw error;
      }
      throw new Error('Failed to export optimization');
    }
  },

  /**
   * Check service health
   */
  async checkHealth(): Promise<{ status: string; timestamp: string }> {
    try {
      return await apiRequest<{ status: string; timestamp: string }>('/api/seo/optimize-content/health');
    } catch {
      throw new Error('SEO Optimizer service is unavailable');
    }
  },
}; 