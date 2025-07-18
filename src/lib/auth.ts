import Cookies from 'js-cookie';
import type { AuthResponse, LoginCredentials, RegisterCredentials, User } from '@/shared/types/auth';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://api.auditcraft.io';
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

  // Make authenticated API request with retry logic
  private async makeRequest<T>(
    endpoint: string,
    options: RequestInit = {},
    retryCount = 0
  ): Promise<T> {
    const url = `${this.baseURL}${endpoint}`;
    const token = this.getToken();
    const maxRetries = 3;

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

        // Handle 429 rate limiting with exponential backoff
        if (response.status === 429 && retryCount < maxRetries) {
          const delay = Math.min(1000 * Math.pow(2, retryCount), 10000);
          await new Promise(resolve => setTimeout(resolve, delay));
          retryCount++;
          
          return this.makeRequest<T>(endpoint, options, retryCount);
        }

        // Handle 429 without retries left
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
    // Redirect to login page
    if (typeof window !== 'undefined') {
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

    try {
      // Try to make a request to verify token is still valid
      await this.makeRequest('/auth/verify', {
        method: 'GET',
      });

      return user;
    } catch {
      // Token is invalid, clear auth data
      this.clearAuthData();
      return null;
    }
  }

  // Check if user is authenticated
  isAuthenticated(): boolean {
    return !!(this.getToken() && this.getUser());
  }
}

export const authService = new AuthService();
export default authService; 