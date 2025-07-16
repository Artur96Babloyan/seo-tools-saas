// Content Decay Detection Types

export interface QueryData {
  query: string;
  clicks: number;
  impressions: number;
  position: number;
}

export interface PageStats {
  clicks: number;
  impressions: number;
  position: number;
  ctr: number;
  queries: QueryData[];
  topQueries: QueryData[];
}

export interface DecayedPage {
  url: string;
  currentStats: PageStats;
  previousStats: PageStats;
  decayPercentage: number;
  lostQueries: string[];
  recommendations: {
    summary: string;
    recommendations: string[];
    priority: 'high' | 'medium' | 'low';
  };
}

export interface AnalysisResult {
  siteUrl: string;
  analysisPeriod: string;
  totalPagesAnalyzed: number;
  decayedPages: DecayedPage[];
  summary: {
    totalDecayedPages: number;
    averageDecayPercentage: number;
  };
}

export interface ServiceStatus {
  service: string;
  status: string;
  timestamp: string;
  version: string;
  googleSearchConsole: {
    connected: boolean;
    expired: boolean;
    configured: boolean;
  };
  contentDecay: {
    configured: boolean;
    decayThreshold: number;
    positionThreshold: number;
    analysisPeriod: number;
  };
  openai: {
    configured: boolean;
  };
}

export interface AuthUrlResponse {
  authUrl: string;
  state: string;
  expiresIn: number;
}

export interface ConnectionStatus {
  connected: boolean;
  expiresAt: string;
}

export interface ContentDecayRequest {
  siteUrl: string;
}

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
  timestamp: string;
  statusCode: number;
  errors?: string[];
} 