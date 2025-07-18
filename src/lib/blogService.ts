import { 
  BlogPostsQueryParams,
  BlogSearchQueryParams,
  BlogCommentsQueryParams,
  CreateBlogPostRequest,
  UpdateBlogPostRequest,
  CreateCommentRequest,
  UpdateCommentRequest,
  BlogViewRequest,
  BlogShareRequest,
  BlogPostsResponse,
  BlogPostResponse,
  BlogCategoriesResponse,
  BlogTagsResponse,
  BlogCommentsResponse,
  BlogSearchResponse,
  BlogStatsResponse
} from '@/types/blog';

class BlogService {
  private async request<T>(
    endpoint: string, 
    options: RequestInit = {}
  ): Promise<T> {
    const url = `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5001'}/api${endpoint}`;
    
    const config: RequestInit = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    };

    // Add auth token if available (only in browser)
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('authToken');
      if (token) {
        config.headers = {
          ...config.headers,
          Authorization: `Bearer ${token}`,
        };
      }
    }

    try {
      const response = await fetch(url, config);
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Blog API request failed:', error);
      throw error;
    }
  }

  // Blog Posts
  async getPosts(params: BlogPostsQueryParams = {}): Promise<BlogPostsResponse> {
    const searchParams = new URLSearchParams();
    
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        searchParams.append(key, String(value));
      }
    });

    const queryString = searchParams.toString();
    const endpoint = `/blog/posts${queryString ? `?${queryString}` : ''}`;
    
    return this.request<BlogPostsResponse>(endpoint);
  }

  async getPost(slug: string): Promise<BlogPostResponse> {
    return this.request<BlogPostResponse>(`/blog/posts/${slug}`);
  }

  async createPost(data: CreateBlogPostRequest): Promise<BlogPostResponse> {
    return this.request<BlogPostResponse>('/blog/posts', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async updatePost(id: string, data: UpdateBlogPostRequest): Promise<BlogPostResponse> {
    return this.request<BlogPostResponse>(`/blog/posts/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  async deletePost(id: string): Promise<{ success: boolean; message: string }> {
    return this.request<{ success: boolean; message: string }>(`/blog/posts/${id}`, {
      method: 'DELETE',
    });
  }

  // Blog Categories
  async getCategories(): Promise<BlogCategoriesResponse> {
    return this.request<BlogCategoriesResponse>('/blog/categories');
  }

  async getPostsByCategory(categorySlug: string, params: BlogPostsQueryParams = {}): Promise<BlogPostsResponse> {
    const searchParams = new URLSearchParams();
    
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        searchParams.append(key, String(value));
      }
    });

    const queryString = searchParams.toString();
    const endpoint = `/blog/categories/${categorySlug}/posts${queryString ? `?${queryString}` : ''}`;
    
    return this.request<BlogPostsResponse>(endpoint);
  }

  // Blog Tags
  async getTags(): Promise<BlogTagsResponse> {
    return this.request<BlogTagsResponse>('/blog/tags');
  }

  async getPostsByTag(tagSlug: string, params: BlogPostsQueryParams = {}): Promise<BlogPostsResponse> {
    const searchParams = new URLSearchParams();
    
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        searchParams.append(key, String(value));
      }
    });

    const queryString = searchParams.toString();
    const endpoint = `/blog/tags/${tagSlug}/posts${queryString ? `?${queryString}` : ''}`;
    
    return this.request<BlogPostsResponse>(endpoint);
  }

  // Blog Search
  async searchPosts(params: BlogSearchQueryParams): Promise<BlogSearchResponse> {
    const searchParams = new URLSearchParams();
    
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        searchParams.append(key, String(value));
      }
    });

    const queryString = searchParams.toString();
    const endpoint = `/blog/search?${queryString}`;
    
    return this.request<BlogSearchResponse>(endpoint);
  }

  // Blog Comments
  async getComments(postSlug: string, params: BlogCommentsQueryParams = {}): Promise<BlogCommentsResponse> {
    const searchParams = new URLSearchParams();
    
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        searchParams.append(key, String(value));
      }
    });

    const queryString = searchParams.toString();
    const endpoint = `/blog/posts/${postSlug}/comments${queryString ? `?${queryString}` : ''}`;
    
    return this.request<BlogCommentsResponse>(endpoint);
  }

  async createComment(postSlug: string, data: CreateCommentRequest): Promise<BlogCommentsResponse> {
    return this.request<BlogCommentsResponse>(`/blog/posts/${postSlug}/comments`, {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async updateComment(commentId: string, data: UpdateCommentRequest): Promise<BlogCommentsResponse> {
    return this.request<BlogCommentsResponse>(`/blog/comments/${commentId}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  async deleteComment(commentId: string): Promise<{ success: boolean; message: string }> {
    return this.request<{ success: boolean; message: string }>(`/blog/comments/${commentId}`, {
      method: 'DELETE',
    });
  }

  // Blog Analytics
  async trackView(postSlug: string, data: BlogViewRequest): Promise<{ success: boolean }> {
    return this.request<{ success: boolean }>(`/blog/posts/${postSlug}/view`, {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async likePost(postSlug: string): Promise<{ success: boolean; data: { liked: boolean; likes_count: number } }> {
    return this.request<{ success: boolean; data: { liked: boolean; likes_count: number } }>(`/blog/posts/${postSlug}/like`, {
      method: 'POST',
    });
  }

  async sharePost(postSlug: string, data: BlogShareRequest): Promise<{ success: boolean }> {
    return this.request<{ success: boolean }>(`/blog/posts/${postSlug}/share`, {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  // Blog Statistics (Admin only)
  async getStats(): Promise<BlogStatsResponse> {
    return this.request<BlogStatsResponse>('/blog/stats');
  }

  // Utility methods
  async generateSlug(title: string): Promise<string> {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim();
  }

  async calculateReadingTime(content: string): Promise<number> {
    const wordsPerMinute = 200;
    const wordCount = content.split(/\s+/).length;
    return Math.ceil(wordCount / wordsPerMinute);
  }

  // Local storage helpers for offline functionality
  saveToCache(key: string, data: unknown): void {
    if (typeof window === 'undefined') return;
    
    try {
      localStorage.setItem(`blog_cache_${key}`, JSON.stringify({
        data,
        timestamp: Date.now(),
      }));
    } catch (error) {
      console.warn('Failed to save to cache:', error);
    }
  }

  getFromCache<T>(key: string, maxAge: number = 5 * 60 * 1000): T | null {
    if (typeof window === 'undefined') return null;
    
    try {
      const cached = localStorage.getItem(`blog_cache_${key}`);
      if (!cached) return null;

      const { data, timestamp } = JSON.parse(cached);
      const age = Date.now() - timestamp;

      if (age > maxAge) {
        localStorage.removeItem(`blog_cache_${key}`);
        return null;
      }

      return data;
    } catch (error) {
      console.warn('Failed to get from cache:', error);
      return null;
    }
  }

  clearCache(): void {
    if (typeof window === 'undefined') return;
    
    try {
      const keys = Object.keys(localStorage);
      keys.forEach(key => {
        if (key.startsWith('blog_cache_')) {
          localStorage.removeItem(key);
        }
      });
    } catch (error) {
      console.warn('Failed to clear cache:', error);
    }
  }
}

// Export singleton instance
export const blogService = new BlogService();

// Export class for testing
export { BlogService }; 