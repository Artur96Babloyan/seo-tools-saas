// Competitor Analysis Types
export interface CompetitorAnalysisRequest {
  mainDomain: string;
  competitorDomains: string[];
}

export interface DomainSeoAnalysis {
  url: string;
  analysis: {
    performance: {
      score: number;
      loadTime?: string;
      firstContentfulPaint?: string;
      largestContentfulPaint?: string;
      cumulativeLayoutShift?: string;
      firstInputDelay?: string;
    };
    seo: {
      score: number;
      audits?: {
        metaDescription: boolean;
        titleTag: boolean;
        viewport: boolean;
        imageAlt: boolean;
      };
    };
    accessibility: {
      score: number;
    };
    bestPractices: {
      score: number;
    };
  };
}

export interface DomainMetaAnalysis {
  tags: {
    title: {
      found: boolean;
      content?: string | null;
      length?: number;
      issues?: string[];
    };
    metaDescription: {
      found: boolean;
      content?: string | null;
      length?: number;
      issues?: string[];
    };
    ogTitle: {
      found: boolean;
      content?: string | null;
      length?: number;
      issues?: string[];
    };
    ogDescription: {
      found: boolean;
      content?: string | null;
      length?: number;
      issues?: string[];
    };
    ogImage: {
      found: boolean;
      url?: string | null;
      issues?: string[];
    };
    canonical?: {
      found: boolean;
      url?: string | null;
      issues?: string[];
    };
    viewport?: {
      found: boolean;
      content?: string | null;
      issues?: string[];
    };
  };
}

export interface CompetitorDomain {
  domain: string;
  url: string;
  seoAnalysis: DomainSeoAnalysis;
  metaAnalysis: DomainMetaAnalysis;
  timestamp: string;
}

export type MainDomain = CompetitorDomain;

export interface ScoreComparison {
  domain: string;
  scores: {
    performance: number;
    seo: number;
    accessibility: number;
    bestPractices: number;
    overall: number;
  };
}

export interface MetaTagComparison {
  domain: string;
  metaTags: {
    title: { found: boolean; content: string | null };
    metaDescription: { found: boolean; content: string | null };
    ogTitle: { found: boolean; content: string | null };
    ogDescription: { found: boolean; content: string | null };
    ogImage: { found: boolean; content: string | null };
  };
}

export interface ScoreDifference {
  domain: string;
  performance: number;
  seo: number;
  accessibility: number;
  bestPractices: number;
  overall: number;
}

export interface RankingItem {
  rank: number;
  domain: string;
  score: number;
}

export interface CompetitorAnalysisComparison {
  mainDomain: MainDomain;
  competitors: CompetitorDomain[];
  differences: {
    seoScores: {
      mainDomain: ScoreComparison;
      competitors: ScoreComparison[];
    };
    metaTagComparison: {
      mainDomain: MetaTagComparison;
      competitors: MetaTagComparison[];
    };
    scoreDifferences: {
      mainDomain: string;
      differences: ScoreDifference[];
    };
    rankings: {
      performance: RankingItem[];
      seo: RankingItem[];
      accessibility: RankingItem[];
      bestPractices: RankingItem[];
      overall: RankingItem[];
    };
    recommendations: string[];
    summary: {
      mainDomain: string;
      overallScore: number;
      overallRank: number;
      totalCompetitors: number;
      strongestCategory: string;
      weakestCategory: string;
      analysisDate: string;
    };
  };
}

export interface CompetitorAnalysisResult {
  success: boolean;
  reportId: string;
  comparison: CompetitorAnalysisComparison;
}

export interface CompetitorReport {
  id: string;
  mainDomain: string;
  competitorDomains: string[];
  comparison?: CompetitorAnalysisComparison;
  comparisonData?: {
    comparison: CompetitorAnalysisComparison;
  };
  createdAt: string;
  updatedAt: string;
}

export interface CompetitorReportsResponse {
  reports: CompetitorReport[];
  pagination: {
    page: number;
    limit: number;
    totalReports: number;
    totalPages: number;
    hasNext: boolean;
    hasPrev: boolean;
  };
}

export interface CompetitorAnalysisError {
  success: false;
  message: string;
  errors?: Array<{
    field: string;
    message: string;
  }>;
  receivedData?: {
    mainDomain: string;
    competitorDomains: string[];
  };
  error?: string;
  timestamp: string;
  statusCode: number;
}

// Chart data types for visualization
export interface ChartDataset {
  label: string;
  data: number[];
  backgroundColor: string;
  borderColor: string;
  borderWidth: number;
}

export interface CompetitorChartData {
  labels: string[];
  datasets: ChartDataset[];
} 