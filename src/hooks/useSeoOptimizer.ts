import { useState, useEffect, useCallback, useRef } from 'react';
import { seoOptimizerService } from '@/lib/seoOptimizerService';
import { 
  ContentOptimizationRequest, 
  ContentOptimizationResponse, 
  OptimizationFilters,
  CharacterCounts,
  ValidationErrors,
  DraftData
} from '@/types/seo-optimizer';

const DRAFT_STORAGE_KEY = 'seo-optimizer-draft';
const AUTO_SAVE_DELAY = 3000; // 3 seconds

export const useSeoOptimizer = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [isOptimizing, setIsOptimizing] = useState(false);
  const [currentOptimization, setCurrentOptimization] = useState<ContentOptimizationResponse | null>(null);
  const [optimizationHistory, setOptimizationHistory] = useState<ContentOptimizationResponse[]>([]);
  const [filters, setFilters] = useState<OptimizationFilters>({
    page: 1,
    limit: 10,
    sortBy: 'createdAt',
    sortOrder: 'desc'
  });
  const [characterCounts, setCharacterCounts] = useState<CharacterCounts>({
    title: 0,
    content: 0,
    keyword: 0
  });
  const [validationErrors, setValidationErrors] = useState<ValidationErrors>({});
  const [autoSaveEnabled, setAutoSaveEnabled] = useState(true);
  const [lastAutoSave, setLastAutoSave] = useState<string | null>(null);

  const autoSaveTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const filtersRef = useRef(filters);

  // Load draft from localStorage
  const loadDraft = useCallback((): DraftData | null => {
    if (typeof window === 'undefined') return null;
    
    try {
      const draft = localStorage.getItem(DRAFT_STORAGE_KEY);
      return draft ? JSON.parse(draft) : null;
    } catch {
      return null;
    }
  }, []);

  // Save draft to localStorage
  const saveDraft = useCallback((title: string, content: string, focusKeyword: string) => {
    if (typeof window === 'undefined') return;
    
    try {
      const draft: DraftData = {
        title,
        content,
        focusKeyword,
        lastSaved: new Date().toISOString()
      };
      localStorage.setItem(DRAFT_STORAGE_KEY, JSON.stringify(draft));
      setLastAutoSave(new Date().toISOString());
    } catch {
      // Failed to save draft
    }
  }, []);

  // Clear draft from localStorage
  const clearDraft = useCallback(() => {
    if (typeof window === 'undefined') return;
    
    try {
      localStorage.removeItem(DRAFT_STORAGE_KEY);
      setLastAutoSave(null);
    } catch {
      // Failed to clear draft
    }
  }, []);

  // Auto-save functionality
  const autoSave = useCallback((title: string, content: string, focusKeyword: string) => {
    if (!autoSaveEnabled || !title && !content && !focusKeyword) return;

    if (autoSaveTimeoutRef.current) {
      clearTimeout(autoSaveTimeoutRef.current);
    }

    autoSaveTimeoutRef.current = setTimeout(() => {
      saveDraft(title, content, focusKeyword);
    }, AUTO_SAVE_DELAY);
  }, [autoSaveEnabled, saveDraft]);

  // Validate form inputs
  const validateForm = useCallback((title: string, content: string, focusKeyword: string): ValidationErrors => {
    const errors: ValidationErrors = {};

    if (!title.trim()) {
      errors.title = 'Title is required';
    } else if (title.length < 10) {
      errors.title = 'Title must be at least 10 characters';
    } else if (title.length > 200) {
      errors.title = 'Title must be less than 200 characters';
    }

    if (!content.trim()) {
      errors.content = 'Content is required';
    } else if (content.length < 50) {
      errors.content = 'Content must be at least 50 characters';
    } else if (content.length > 10000) {
      errors.content = 'Content must be less than 10,000 characters';
    }

    if (!focusKeyword.trim()) {
      errors.focusKeyword = 'Focus keyword is required';
    } else if (focusKeyword.length < 2) {
      errors.focusKeyword = 'Focus keyword must be at least 2 characters';
    } else if (focusKeyword.length > 50) {
      errors.focusKeyword = 'Focus keyword must be less than 50 characters';
    }

    return errors;
  }, []);

  // Update character counts
  const updateCharacterCounts = useCallback((title: string, content: string, focusKeyword: string) => {
    setCharacterCounts({
      title: title.length,
      content: content.length,
      keyword: focusKeyword.length
    });
  }, []);

  // Optimize content
  const optimizeContent = useCallback(async (request: ContentOptimizationRequest) => {
    setIsOptimizing(true);
    setError(null);
    setSuccess(null);

    try {
      // Validate form
      const errors = validateForm(request.title, request.content, request.focusKeyword);
      if (Object.keys(errors).length > 0) {
        setValidationErrors(errors);
        throw new Error('Please fix validation errors');
      }

      setValidationErrors({});

      // Call API
      const result = await seoOptimizerService.optimizeContent(request);
      
      // Add original data to the result since backend doesn't return it
      const completeResult: ContentOptimizationResponse = {
        ...result,
        originalTitle: request.title,
        originalContent: request.content,
        focusKeyword: request.focusKeyword
      };
      
      setCurrentOptimization(completeResult);
      setSuccess('Content optimized successfully!');
      
      // Clear draft after successful optimization
      clearDraft();
      
      return completeResult;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to optimize content';
      setError(errorMessage);
      throw err;
    } finally {
      setIsOptimizing(false);
    }
  }, [validateForm, clearDraft]);

  // Load optimization history
  const loadOptimizationHistory = useCallback(async (newFilters?: Partial<OptimizationFilters>) => {
    setIsLoading(true);
    setError(null);

    try {
      const updatedFilters = { ...filtersRef.current, ...newFilters };
      filtersRef.current = updatedFilters;

      const result = await seoOptimizerService.getOptimizationHistory(updatedFilters);

      // Ensure we have complete data for each optimization
      const completeHistory = result.content.map((optimization) => ({
        ...optimization,
        originalTitle: optimization.originalTitle || 'Original title not available',
        originalContent: optimization.originalContent || 'Original content not available',
        focusKeyword: optimization.focusKeyword || 'Focus keyword not available'
      }));

      setOptimizationHistory(completeHistory);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to load optimization history';
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Load specific optimization
  const loadOptimization = useCallback(async (id: string) => {
    setIsLoading(true);
    setError(null);

    try {
      const result = await seoOptimizerService.getOptimizationById(id);
      
      // If backend doesn't return original data, we can't display it properly
      // This is a limitation when loading from history
      const completeResult: ContentOptimizationResponse = {
        ...result,
        originalTitle: result.originalTitle || 'Original title not available',
        originalContent: result.originalContent || 'Original content not available',
        focusKeyword: result.focusKeyword || 'Focus keyword not available'
      };
      
      setCurrentOptimization(completeResult);
      return completeResult;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to load optimization';
      setError(errorMessage);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Delete optimization
  const deleteOptimization = useCallback(async (id: string) => {
    try {
      await seoOptimizerService.deleteOptimization(id);
      setSuccess('Optimization deleted successfully');
      
      // Remove from history
      setOptimizationHistory(prev => prev.filter(item => item.id !== id));
      
      // Clear current optimization if it's the deleted one
      if (currentOptimization?.id === id) {
        setCurrentOptimization(null);
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to delete optimization';
      setError(errorMessage);
      throw err;
    }
  }, [currentOptimization]);

  // Export optimization
  const exportOptimization = useCallback(async (id: string, format: 'html' | 'text' | 'markdown' = 'html') => {
    try {
      const content = await seoOptimizerService.exportOptimization(id, format);
      return content;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to export optimization';
      setError(errorMessage);
      throw err;
    }
  }, []);

  // Clear messages
  const clearMessages = useCallback(() => {
    setError(null);
    setSuccess(null);
  }, []);

  // Keep filters ref in sync
  useEffect(() => {
    filtersRef.current = filters;
  }, [filters]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (autoSaveTimeoutRef.current) {
        clearTimeout(autoSaveTimeoutRef.current);
      }
    };
  }, []);

  return {
    // State
    isLoading,
    error,
    success,
    isOptimizing,
    currentOptimization,
    optimizationHistory,
    filters,
    characterCounts,
    validationErrors,
    autoSaveEnabled,
    lastAutoSave,

    // Actions
    optimizeContent,
    loadOptimizationHistory,
    loadOptimization,
    deleteOptimization,
    exportOptimization,
    updateCharacterCounts,
    validateForm,
    autoSave,
    loadDraft,
    saveDraft,
    clearDraft,
    clearMessages,
    setAutoSaveEnabled,
    setFilters,
    setValidationErrors
  };
}; 