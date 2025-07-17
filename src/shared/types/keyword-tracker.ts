export interface KeywordTrackingRequest {
  domain: string;
  keywords: string[];
  location?: string;
}

export interface KeywordRankingResult {
  keyword: string;
  rank: number;
  timestamp: string;
}

export interface KeywordTrackingResponse {
  success: boolean;
  data: {
    domain: string;
    location: string;
    results: KeywordRankingResult[];
  };
  message: string;
}

export interface RankingHistoryItem {
  id: string;
  keyword: string;
  domain: string;
  rank: number;
  location: string;
  createdAt: string;
}

export interface RankingHistoryResponse {
  success: boolean;
  data: {
    rankings: RankingHistoryItem[];
    filters: {
      domain?: string;
      keyword?: string;
      limit: number;
    };
  };
}

export interface KeywordStatsResponse {
  success: boolean;
  data: {
    totalTracked: number;
    averageRank: number;
    topKeywords: Array<{
      keyword: string;
      domain: string;
      rank: number;
      createdAt: string;
    }>;
    domain?: string;
  };
}

export interface TrackedDomain {
  domain: string;
  lastTracked: string;
  uniqueKeywords: number;
  totalTrackingRecords: number;
}

export interface DomainsResponse {
  success: boolean;
  data: {
    domains: TrackedDomain[];
  };
}

export interface HistoryFilters {
  domain?: string;
  keyword?: string;
  limit?: number;
}

export interface CleanupRequest {
  daysOld: number;
}

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
} 