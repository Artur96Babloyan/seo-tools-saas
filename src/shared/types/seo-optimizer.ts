// SEO Content Optimizer Types

export interface ContentOptimizationRequest {
  title: string;
  content: string;
  focusKeyword: string;
}

export interface OptimizedContentStructure {
  h1: string;
  mainContent: string;
  features: {
    title: string;
    items: string[];
  };
}

export interface ContentOptimizationResponse {
  id: string;
  optimizedTitle: string;
  optimizedContent: OptimizedContentStructure;
  metaDescription: string;
  suggestions: string[];
  createdAt: string;
  originalTitle: string;
  originalContent: string;
  focusKeyword: string;
  updatedAt?: string;
}

export interface OptimizationSuggestion {
  id: string;
  type: 'title' | 'content' | 'meta' | 'keyword' | 'general';
  category: string;
  title: string;
  description: string;
  priority: 'high' | 'medium' | 'low';
  impact: string;
  implementation?: string;
}

export interface OptimizationHistoryResponse {
  content: ContentOptimizationResponse[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasNext: boolean;
    hasPrev: boolean;
  };
}

export interface OptimizationFilters {
  page?: number;
  limit?: number;
  sortBy?: 'createdAt' | 'focusKeyword' | 'title';
  sortOrder?: 'asc' | 'desc';
  search?: string;
  dateFrom?: string;
  dateTo?: string;
}

export interface CharacterCounts {
  title: number;
  content: number;
  keyword: number;
}

export interface ValidationErrors {
  title?: string;
  content?: string;
  focusKeyword?: string;
}

export interface OptimizationState {
  isLoading: boolean;
  error: string | null;
  success: string | null;
  isOptimizing: boolean;
  currentOptimization: ContentOptimizationResponse | null;
  optimizationHistory: ContentOptimizationResponse[];
  filters: OptimizationFilters;
  characterCounts: CharacterCounts;
  validationErrors: ValidationErrors;
  autoSaveEnabled: boolean;
  lastAutoSave: string | null;
}

export interface ExportOptions {
  format: 'html' | 'text' | 'markdown';
  includeOriginal?: boolean;
  includeSuggestions?: boolean;
}

export interface DraftData {
  title: string;
  content: string;
  focusKeyword: string;
  lastSaved: string;
} 