import { apiRequest } from './api';
import { 
  ContentExtractionRequest,
  ExtractedContent,
  ContentAnalysisRequest,
  ContentAnalysisResponse,
  ContentAnalysisResult
} from '@/types/content-extractor';
import { ApiError } from './api';
import { metaTagService } from './services';

export const contentExtractorService = {
  /**
   * Extract content from a website URL using existing meta tag validation
   */
  async extractContent(request: ContentExtractionRequest): Promise<ExtractedContent> {
    try {
      
      // Use existing meta tag validation service to extract content
      const metaTagResult = await metaTagService.validateMetaTags(request.url);
      
      // Extract keywords from title and description as fallback if meta keywords not found
      let extractedKeywords = metaTagResult.tags.metaKeywords.content || '';
      
      // If no meta keywords found, try to extract from title and description
      if (!extractedKeywords && (metaTagResult.tags.title.content || metaTagResult.tags.metaDescription.content)) {
        const titleWords = metaTagResult.tags.title.content?.toLowerCase().match(/\b\w+\b/g) || [];
        const descWords = metaTagResult.tags.metaDescription.content?.toLowerCase().match(/\b\w+\b/g) || [];
        
        // Combine and find common important words (filter out common words)
        const commonWords = new Set(['the', 'a', 'an', 'and', 'or', 'but', 'in', 'on', 'at', 'to', 'for', 'of', 'with', 'by', 'is', 'are', 'was', 'were', 'be', 'been', 'have', 'has', 'had', 'do', 'does', 'did', 'will', 'would', 'could', 'should', 'may', 'might', 'can', 'this', 'that', 'these', 'those', 'i', 'you', 'he', 'she', 'it', 'we', 'they', 'me', 'him', 'her', 'us', 'them', 'my', 'your', 'his', 'her', 'its', 'our', 'their', 'mine', 'yours', 'his', 'hers', 'ours', 'theirs']);
        
        const importantWords = [...titleWords, ...descWords]
          .filter(word => word.length > 2 && !commonWords.has(word))
          .slice(0, 5); // Take first 5 important words
        
        if (importantWords.length > 0) {
          extractedKeywords = importantWords.join(', ');
        }
      }
      
      // If no meta keywords found, try to extract from title and description
      if (!extractedKeywords && (metaTagResult.tags.title.content || metaTagResult.tags.metaDescription.content)) {
        const titleWords = metaTagResult.tags.title.content?.toLowerCase().match(/\b\w+\b/g) || [];
        const descWords = metaTagResult.tags.metaDescription.content?.toLowerCase().match(/\b\w+\b/g) || [];
        
        // Combine and find common important words (filter out common words)
        const commonWords = new Set(['the', 'a', 'an', 'and', 'or', 'but', 'in', 'on', 'at', 'to', 'for', 'of', 'with', 'by', 'is', 'are', 'was', 'were', 'be', 'been', 'have', 'has', 'had', 'do', 'does', 'did', 'will', 'would', 'could', 'should', 'may', 'might', 'can', 'this', 'that', 'these', 'those', 'i', 'you', 'he', 'she', 'it', 'we', 'they', 'me', 'him', 'her', 'us', 'them', 'my', 'your', 'his', 'her', 'its', 'our', 'their', 'mine', 'yours', 'his', 'hers', 'ours', 'theirs']);
        
        const importantWords = [...titleWords, ...descWords]
          .filter(word => word.length > 2 && !commonWords.has(word))
          .slice(0, 5); // Take first 5 important words
        
        if (importantWords.length > 0) {
          extractedKeywords = importantWords.join(', ');
        }
      }
      
      // Transform meta tag data to extracted content format
      const extractedContent: ExtractedContent = {
        url: request.url,
        title: metaTagResult.tags.title.content || '',
        metaDescription: metaTagResult.tags.metaDescription.content || '',
        metaKeywords: extractedKeywords, // Use extracted keywords or fallback
        h1Text: '', // We'll need to extract this from the page content
        h2Texts: [], // We'll need to extract these from the page content
        h3Texts: [], // We'll need to extract these from the page content
        mainContent: metaTagResult.tags.metaDescription.content || '', // Use meta description as fallback
        imageAltTexts: [], // We'll need to extract these from the page content
        internalLinks: [], // We'll need to extract these from the page content
        extractedAt: new Date().toISOString()
      };

      return extractedContent;
    } catch (error) {
      if (error instanceof ApiError) {
        throw error;
      }
      throw new Error('Failed to extract content from URL');
    }
  },

  /**
   * Analyze extracted content with AI
   */
  async analyzeContent(request: ContentAnalysisRequest): Promise<ContentAnalysisResponse> {
    try {
      
      const response = await apiRequest<ContentAnalysisResult>('/api/content/analyze', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(request),
      });

      return response.data;
    } catch (error) {
      if (error instanceof ApiError) {
        throw error;
      }
      throw new Error('Failed to analyze content');
    }
  },

  /**
   * Extract and analyze content in one step
   */
  async extractAndAnalyze(
    url: string, 
    analysisOptions?: Omit<ContentAnalysisRequest, 'extractedContent'>
  ): Promise<ContentAnalysisResponse> {
    try {
      // First extract content
      const extractedContent = await this.extractContent({ url });
      
      // Then analyze it
      const analysisRequest: ContentAnalysisRequest = {
        extractedContent,
        ...analysisOptions
      };
      
      return await this.analyzeContent(analysisRequest);
    } catch (error) {
      throw error;
    }
  },

  /**
   * Get analysis history
   */
  async getAnalysisHistory(page = 1, limit = 10): Promise<{
    analyses: ContentAnalysisResponse[];
    total: number;
    page: number;
    totalPages: number;
  }> {
    try {
      const params = new URLSearchParams();
      params.append('page', page.toString());
      params.append('limit', limit.toString());

      const response = await apiRequest<{
        analyses: ContentAnalysisResponse[];
        total: number;
        page: number;
        totalPages: number;
      }>(`/api/content/analyses?${params.toString()}`);

      return response;
    } catch (error) {
      if (error instanceof ApiError) {
        throw error;
      }
      throw new Error('Failed to fetch analysis history');
    }
  },

  /**
   * Get specific analysis by ID
   */
  async getAnalysisById(id: string): Promise<ContentAnalysisResponse> {
    try {
      const response = await apiRequest<ContentAnalysisResponse>(`/api/content/analyses/${id}`);
      return response;
    } catch (error) {
      if (error instanceof ApiError) {
        throw error;
      }
      throw new Error('Failed to fetch analysis details');
    }
  },

  /**
   * Delete analysis by ID
   */
  async deleteAnalysis(id: string): Promise<void> {
    try {
      await apiRequest(`/api/content/analyses/${id}`, {
        method: 'DELETE',
      });
    } catch (error) {
      if (error instanceof ApiError) {
        throw error;
      }
      throw new Error('Failed to delete analysis');
    }
  },

  /**
   * Check service health
   */
  async checkHealth(): Promise<{ status: string; timestamp: string }> {
    try {
      return await apiRequest<{ status: string; timestamp: string }>('/api/content/health');
    } catch {
      throw new Error('Content Extractor service is unavailable');
    }
  },
}; 