// Content Extraction and AI Analysis Types

export interface ContentExtractionRequest {
  url: string;
  includeContent?: boolean;
  includeImages?: boolean;
  includeLinks?: boolean;
}

export interface ExtractedContent {
  url: string;
  title: string;
  metaDescription: string;
  metaKeywords: string;
  h1Text: string;
  h2Texts: string[];
  h3Texts: string[];
  mainContent: string;
  imageAltTexts: string[];
  internalLinks: string[];
  extractedAt: string;
}

export interface ContentAnalysisRequest {
  extractedContent: ExtractedContent;
  focusKeyword?: string;
  targetAudience?: string;
  industry?: string;
}

export interface ContentAnalysisResponse {
  id: string;
  originalContent: ExtractedContent;
  optimizedTitle: string;
  optimizedMetaDescription: string;
  optimizedMetaKeywords: string;
  optimizedH1: string;
  contentSuggestions: ContentSuggestion[];
  seoScore: number;
  readabilityScore: number;
  keywordDensity: Record<string, number>;
  recommendations: string[];
  createdAt: string;
}

export interface ContentSuggestion {
  id: string;
  type: 'title' | 'description' | 'keywords' | 'content' | 'headings' | 'images';
  category: string;
  title: string;
  description: string;
  priority: 'high' | 'medium' | 'low';
  impact: string;
  implementation: string;
  beforeText?: string;
  afterText?: string;
}

export interface ContentExtractionResult {
  success: boolean;
  data: ExtractedContent;
  message: string;
  timestamp: string;
}

export interface ContentAnalysisResult {
  success: boolean;
  data: ContentAnalysisResponse;
  message: string;
  timestamp: string;
} 