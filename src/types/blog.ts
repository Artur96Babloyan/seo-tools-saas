// Blog System TypeScript Interfaces
// These interfaces match the backend API specification

export interface BlogPost {
  id: string; // Changed from number to string to support UUIDs
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  featured_image: string;
  author: BlogAuthor;
  category: BlogCategory;
  tags: BlogTag[];
  status: 'draft' | 'published' | 'archived';
  featured: boolean;
  reading_time: number;
  views_count: number;
  likes_count: number;
  shares_count: number;
  meta_title?: string;
  meta_description?: string;
  og_image?: string;
  published_at: string;
  created_at: string;
  updated_at: string;
}

export interface BlogAuthor {
  id: string; // Changed from number to string to support UUIDs
  name: string;
  avatar: string;
  bio?: string;
  social_links?: {
    twitter?: string;
    linkedin?: string;
    github?: string;
    website?: string;
  };
  expertise?: string[];
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface BlogCategory {
  id: string; // Changed from number to string to support UUIDs
  name: string;
  slug: string;
  description?: string;
  color: string;
  icon?: string;
  sort_order: number;
  is_active: boolean;
  post_count?: number;
  created_at: string;
  updated_at: string;
}

export interface BlogTag {
  id: string; // Changed from number to string to support UUIDs
  name: string;
  slug: string;
  color?: string;
  post_count?: number;
  created_at: string;
}

export interface BlogComment {
  id: string; // Changed from number to string to support UUIDs
  post_id: string; // Changed from number to string to support UUIDs
  user_id: string; // Changed from number to string to support UUIDs
  parent_id?: string; // Changed from number to string to support UUIDs
  content: string;
  status: 'pending' | 'approved' | 'spam';
  likes_count: number;
  created_at: string;
  updated_at: string;
  user?: {
    id: string; // Changed from number to string to support UUIDs
    name: string;
    avatar?: string;
  };
  replies?: BlogComment[];
}

export interface BlogAnalytics {
  id: string; // Changed from number to string to support UUIDs
  post_id: string; // Changed from number to string to support UUIDs
  user_id?: string; // Changed from number to string to support UUIDs
  session_id?: string;
  ip_address?: string;
  user_agent?: string;
  referrer?: string;
  time_spent?: number;
  scroll_depth?: number;
  event_type: 'view' | 'like' | 'share' | 'comment';
  created_at: string;
}

// API Response Types
export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
  error?: string;
}

export interface PaginatedResponse<T> {
  posts: T[];
  pagination: {
    current_page: number;
    total_pages: number;
    total_posts: number;
    has_next: boolean;
    has_prev: boolean;
  };
}

export type BlogPostsResponse = ApiResponse<PaginatedResponse<BlogPost>>;

export type BlogPostResponse = ApiResponse<{
  post: BlogPost;
  related_posts: BlogPost[];
}>;

export type BlogCategoriesResponse = ApiResponse<BlogCategory[]>;

export type BlogTagsResponse = ApiResponse<BlogTag[]>;

export type BlogCommentsResponse = ApiResponse<PaginatedResponse<BlogComment>>;

export type BlogSearchResponse = ApiResponse<{
  posts: BlogPost[];
  pagination: {
    current_page: number;
    total_pages: number;
    total_posts: number;
    has_next: boolean;
    has_prev: boolean;
  };
  search_stats: {
    query: string;
    total_results: number;
    search_time: number;
  };
}>;

export type BlogStatsResponse = ApiResponse<{
  total_posts: number;
  total_views: number;
  total_likes: number;
  total_comments: number;
  top_posts: Array<{
    id: string; // Changed from number to string to support UUIDs
    title: string;
    views: number;
    likes: number;
  }>;
  top_categories: Array<{
    id: string; // Changed from number to string to support UUIDs
    name: string;
    post_count: number;
    total_views: number;
  }>;
  monthly_stats: Array<{
    month: string;
    posts: number;
    views: number;
    likes: number;
  }>;
}>;

// Request Types
export interface CreateBlogPostRequest {
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  featured_image: string;
  category_id: string; // Changed from number to string to support UUIDs
  tag_ids: string[]; // Changed from number[] to string[] to support UUIDs
  featured: boolean;
  status: 'draft' | 'published';
  meta_title?: string;
  meta_description?: string;
  og_image?: string;
}

export type UpdateBlogPostRequest = Partial<CreateBlogPostRequest>;

export interface CreateCommentRequest {
  content: string;
  parent_id?: string; // Changed from number to string to support UUIDs
}

export interface UpdateCommentRequest {
  content: string;
}

export interface BlogViewRequest {
  session_id?: string;
  referrer?: string;
  user_agent?: string;
  ip_address?: string;
}

export interface BlogShareRequest {
  platform: 'twitter' | 'facebook' | 'linkedin' | 'email';
  url: string;
}

// Query Parameters
export interface BlogPostsQueryParams {
  page?: number;
  limit?: number;
  category?: string;
  tag?: string;
  search?: string;
  featured?: boolean;
  sort?: 'newest' | 'oldest' | 'popular' | 'trending';
}

export interface BlogSearchQueryParams {
  q: string;
  page?: number;
  limit?: number;
  category?: string;
  tag?: string;
}

export interface BlogCommentsQueryParams {
  page?: number;
  limit?: number;
}

// Frontend-specific types
export interface BlogPostSummary {
  id: string; // Changed from number to string to support UUIDs
  title: string;
  slug: string;
  excerpt: string;
  featured_image: string;
  author: {
    name: string;
    avatar: string;
  };
  category: {
    name: string;
    color: string;
  };
  tags: string[];
  reading_time: number;
  views_count: number;
  featured: boolean;
  published_at: string;
}

export interface BlogFilters {
  category?: string;
  tag?: string;
  search?: string;
  featured?: boolean;
  sort?: 'newest' | 'oldest' | 'popular' | 'trending';
}

// Utility types
export type BlogPostStatus = 'draft' | 'published' | 'archived';
export type BlogCommentStatus = 'pending' | 'approved' | 'spam';
export type BlogEventType = 'view' | 'like' | 'share' | 'comment';
export type BlogSortOption = 'newest' | 'oldest' | 'popular' | 'trending';
export type SharePlatform = 'twitter' | 'facebook' | 'linkedin' | 'email'; 