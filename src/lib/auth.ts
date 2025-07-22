import Cookies from 'js-cookie';
import type { AuthResponse, LoginCredentials, RegisterCredentials, User } from '@/shared/types/auth';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5001';
const TOKEN_COOKIE_NAME = 'seo-tools-token';
const USER_COOKIE_NAME = 'seo-tools-user';

class AuthService {
  private baseURL: string;

  constructor() {
    this.baseURL = `${API_BASE_URL}/api`;
  }

  // Store token and user data in cookies
  private setAuthData(token: string, user: User): void {
    const cookieOptions = {
      expires: 7, // 7 days
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict' as const,
    };

    Cookies.set(TOKEN_COOKIE_NAME, token, cookieOptions);
    Cookies.set(USER_COOKIE_NAME, JSON.stringify(user), cookieOptions);
  }

  // Clear auth data from cookies
  private clearAuthData(): void {
    Cookies.remove(TOKEN_COOKIE_NAME);
    Cookies.remove(USER_COOKIE_NAME);
  }

  // Get stored token
  getToken(): string | undefined {
    return Cookies.get(TOKEN_COOKIE_NAME);
  }

  // Get stored user data
  getUser(): User | null {
    const userCookie = Cookies.get(USER_COOKIE_NAME);
    if (!userCookie) return null;

    try {
      return JSON.parse(userCookie);
    } catch {
      return null;
    }
  }

  // Make authenticated API request
  private async makeRequest<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const url = `${this.baseURL}${endpoint}`;
    const token = this.getToken();

    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      ...((options.headers as Record<string, string>) || {}),
    };

    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }

    try {
      const response = await fetch(url, {
        ...options,
        headers,
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({
          message: `HTTP ${response.status}`,
        }));
        
        // Handle 401 errors (token expired/invalid)
        if (response.status === 401) {
          this.clearAuthData();
          throw new Error('Authentication required. Please log in again.');
        }

        // Handle 429 rate limiting - don't retry to avoid making it worse
        if (response.status === 429) {
          throw new Error('Too many requests. Please wait a moment before trying again.');
        }

        throw new Error(errorData.message || `Request failed with status ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      if (error instanceof Error) {
        throw error;
      }
      throw new Error('Network error occurred');
    }
  }

  // Login user
  async login(credentials: LoginCredentials): Promise<User> {
    const response = await this.makeRequest<AuthResponse>('/auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    });

    if (!response.success || !response.data) {
      throw new Error(response.message || 'Login failed');
    }

    const { user, token } = response.data;
    this.setAuthData(token, user);

    return user;
  }

  // Register user
  async register(credentials: RegisterCredentials): Promise<User> {
    const response = await this.makeRequest<AuthResponse>('/auth/register', {
      method: 'POST',
      body: JSON.stringify(credentials),
    });

    if (!response.success || !response.data) {
      throw new Error(response.message || 'Registration failed');
    }

    const { user, token } = response.data;
    this.setAuthData(token, user);

    return user;
  }

  // Logout user
  logout(): void {
    this.clearAuthData();
    // Clear any cached data and redirect to login page
    if (typeof window !== 'undefined') {
      // Clear any cached data
      localStorage.removeItem('user-avatar-cache');
      sessionStorage.clear();
      window.location.href = '/auth/login';
    }
  }

  // Validate current token
  async validateToken(): Promise<User | null> {
    const token = this.getToken();
    const user = this.getUser();

    if (!token || !user) {
      return null;
    }

    // For development, if we have token and user data, consider it valid
    // This prevents issues when backend is not running
    if (process.env.NODE_ENV === 'development') {
      return user;
    }

    try {
      // Try to make a request to verify token is still valid
      await this.makeRequest('/auth/verify', {
        method: 'GET',
      });

      return user;
    } catch (error) {
      // If the verify endpoint doesn't exist or fails, 
      // we'll still consider the user authenticated if we have valid token and user data
      
      // Only clear auth data if it's a 401 error (token actually invalid)
      if (error instanceof Error && error.message.includes('401')) {
        this.clearAuthData();
        return null;
      }
      
      // For other errors (network, server issues), keep the user authenticated
      return user;
    }
  }

  // Forgot password
  async forgotPassword(email: string): Promise<void> {
    const response = await this.makeRequest<{ success: boolean; message: string }>('/auth/forgot-password', {
      method: 'POST',
      body: JSON.stringify({ email }),
    });

    if (!response.success) {
      throw new Error(response.message || 'Failed to send reset email');
    }
  }

  // Update user data (for refreshing profile data)
  updateUserData(user: User): void {
    const token = this.getToken();
    if (token) {
      this.setAuthData(token, user);
    }
  }

  // Check if user is authenticated
  isAuthenticated(): boolean {
    return !!(this.getToken() && this.getUser());
  }
}

export const authService = new AuthService();
export default authService; 