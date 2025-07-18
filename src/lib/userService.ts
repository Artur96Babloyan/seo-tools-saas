import { authService } from './auth';

interface UserProfile {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  bio?: string;
  company?: string;
  website?: string;
  location?: string;
  phone?: string;
  timezone?: string;
  created_at: string;
  updated_at: string;
  subscription?: {
    plan: string;
    status: string;
    expires_at?: string;
  };
  preferences?: {
    email_notifications: boolean;
    marketing_emails: boolean;
    theme: 'light' | 'dark' | 'system';
  };
}

interface UserStats {
  total_analyses: number;
  total_keywords_tracked: number;
  total_competitors_analyzed: number;
  total_reports_generated: number;
  member_since: string;
  last_login: string;
  subscription_usage: {
    analyses_this_month: number;
    analyses_limit: number;
    keywords_tracked: number;
    keywords_limit: number;
  };
}

interface UserActivity {
  id: string;
  type: 'analysis' | 'keyword_tracking' | 'competitor_analysis' | 'report_generated';
  title: string;
  description: string;
  created_at: string;
  metadata?: Record<string, unknown>;
}

interface UserPreferences {
  email_notifications: boolean;
  marketing_emails: boolean;
  digest_emails: boolean;
  seo_alerts: boolean;
  competitor_updates: boolean;
  keyword_tracking_alerts: boolean;
  theme: 'light' | 'dark' | 'system';
  language: string;
  timezone: string;
}

interface PasswordChangeData {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

interface ProfileUpdateData {
  name?: string;
  bio?: string;
  company?: string;
  website?: string;
  location?: string;
  phone?: string;
  timezone?: string;
}

class UserService {
  private baseUrl: string;

  constructor() {
    // Use environment variable for API URL, fallback to local Next.js API routes for development
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    if (apiUrl) {
      this.baseUrl = `${apiUrl}/api/user`;
    } else {
      // Fallback to local Next.js API routes
      this.baseUrl = '/api/user';
    }
  }

  // Get authenticated headers
  private getAuthHeaders(): Record<string, string> {
    const token = authService.getToken();
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
    };
    
    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }
    
    return headers;
  }

  // Get user profile
  async getProfile(): Promise<UserProfile> {
    const response = await fetch(`${this.baseUrl}/profile`, {
      headers: this.getAuthHeaders(),
    });
    if (!response.ok) {
      throw new Error('Failed to fetch user profile');
    }
    const result = await response.json();
    
    // Handle backend response format: {success: true, data: {...}}
    if (result.success && result.data) {
      return result.data;
    }
    
    // Fallback to direct response if not in expected format
    return result;
  }

  // Update user profile
  async updateProfile(data: ProfileUpdateData): Promise<UserProfile> {
    const response = await fetch(`${this.baseUrl}/profile`, {
      method: 'PUT',
      headers: this.getAuthHeaders(),
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to update profile');
    }
    return response.json();
  }

  // Change password
  async changePassword(data: PasswordChangeData): Promise<void> {
    console.log('userService.changePassword called with data:', {
      currentPassword: data.currentPassword ? '***' : 'empty',
      newPassword: data.newPassword ? '***' : 'empty',
      confirmPassword: data.confirmPassword ? '***' : 'empty'
    }); // Debug log
    
    console.log('Sending request body:', data); // Debug log
    
    const response = await fetch(`${this.baseUrl}/password`, {
      method: 'PUT',
      headers: this.getAuthHeaders(),
      body: JSON.stringify(data),
    });
    
    console.log('Change password response status:', response.status); // Debug log
    
    if (!response.ok) {
      const error = await response.json();
      console.log('Change password error response:', error); // Debug log
      console.log('Full error details:', JSON.stringify(error, null, 2)); // Debug log
      throw new Error(error.message || error.error || 'Failed to change password');
    }
    
    console.log('Password change successful'); // Debug log
  }

  // Get user preferences
  async getPreferences(): Promise<UserPreferences> {
    const response = await fetch(`${this.baseUrl}/preferences`, {
      headers: this.getAuthHeaders(),
    });
    if (!response.ok) {
      throw new Error('Failed to fetch user preferences');
    }
    return response.json();
  }

  // Update user preferences
  async updatePreferences(data: Partial<UserPreferences>): Promise<UserPreferences> {
    const response = await fetch(`${this.baseUrl}/preferences`, {
      method: 'PUT',
      headers: this.getAuthHeaders(),
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to update preferences');
    }
    return response.json();
  }

  // Get user statistics
  async getStats(): Promise<UserStats> {
    const response = await fetch(`${this.baseUrl}/stats`, {
      headers: this.getAuthHeaders(),
    });
    if (!response.ok) {
      throw new Error('Failed to fetch user statistics');
    }
    const result = await response.json();
    
    // Handle backend response format: {success: true, data: {...}}
    if (result.success && result.data) {
      return result.data;
    }
    
    // Fallback to direct response if not in expected format
    return result;
  }

  // Get user activity
  async getActivity(limit: number = 10, page: number = 1): Promise<{
    activities: UserActivity[];
    pagination: {
      page: number;
      limit: number;
      total: number;
      total_pages: number;
    };
  }> {
    const response = await fetch(`${this.baseUrl}/activity?limit=${limit}&page=${page}`, {
      headers: this.getAuthHeaders(),
    });
    if (!response.ok) {
      throw new Error('Failed to fetch user activity');
    }
    const result = await response.json();
    
    // Handle backend response format: {success: true, data: {...}}
    if (result.success && result.data) {
      return result.data;
    }
    
    // Fallback to direct response if not in expected format
    return result;
  }

  // Upload avatar
  async uploadAvatar(file: File): Promise<{ avatar_url: string; message: string }> {
    const formData = new FormData();
    formData.append('avatar', file);

    const token = authService.getToken();
    const headers: Record<string, string> = {};
    
    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }

    const response = await fetch(`${this.baseUrl}/avatar`, {
      method: 'POST',
      headers,
      body: formData,
    });
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to upload avatar');
    }
    return response.json();
  }

  // Delete user account
  async deleteAccount(password: string): Promise<void> {
    console.log('userService.deleteAccount called with password:', password ? '***' : 'empty'); // Debug log
    
    const requestBody = { 
      password,
      confirmDelete: true // Add the required confirmDelete field
    };
    console.log('Sending request body:', requestBody); // Debug log
    
    const response = await fetch(`${this.baseUrl}/account`, {
      method: 'DELETE',
      headers: this.getAuthHeaders(),
      body: JSON.stringify(requestBody),
    });
    
    console.log('Delete account response status:', response.status); // Debug log
    
    if (!response.ok) {
      const error = await response.json();
      console.log('Delete account error response:', error); // Debug log
      throw new Error(error.message || 'Failed to delete account');
    }
    
    console.log('Account deletion successful'); // Debug log
  }
}

export const userService = new UserService();
export type {
  UserProfile,
  UserStats,
  UserActivity,
  UserPreferences,
  PasswordChangeData,
  ProfileUpdateData,
}; 