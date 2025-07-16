import { apiRequest } from './api';
import { AnalysisResult, ContentDecayRequest } from '@/types/content-decay';

export interface ContentDecayStatus {
  service: string;
  status: string;
  timestamp: string;
  version: string;
  googleSearchConsole: {
    connected: boolean;
    expired: boolean | null;
    configured: boolean;
  };
}

export interface AuthUrlResponse {
  authUrl: string;
  state: string;
  expiresIn: number;
}

export interface CallbackResponse {
  connected: boolean;
  expiresAt: string;
}

export interface DisconnectResponse {
  connected: boolean;
}

class ContentDecayService {
  // baseUrl is no longer needed if apiRequest handles it

  async getStatus(): Promise<ContentDecayStatus> {
    console.log('Making content decay status request...');
    const response = await apiRequest<ContentDecayStatus>(
      '/api/content-decay/status',
      { method: 'GET' }
    );
    console.log('Content decay status response:', response);
    return response;
  }

  async getAuthUrl(): Promise<AuthUrlResponse> {
    console.log('Getting Google OAuth URL...');
    console.log('API Base URL:', process.env.NEXT_PUBLIC_API_URL || 'https://api.auditcraft.io');
    const response = await apiRequest<AuthUrlResponse>(
      '/api/content-decay/auth-url',
      { method: 'GET' }
    );
    console.log('Auth URL response:', response);
    return response;
  }

  async handleCallback(code: string, state: string): Promise<CallbackResponse> {
    console.log('Handling OAuth callback...', { code, state });
    
    // Try form-encoded data first (more common for OAuth callbacks)
    const formData = new URLSearchParams();
    formData.append('code', code);
    formData.append('state', state);
    
    console.log('Sending callback request with form data:', formData.toString());
    
    try {
      const response = await apiRequest<CallbackResponse>(
        '/api/content-decay/callback',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          body: formData.toString(),
        }
      );
      console.log('Callback response:', response);
      return response;
    } catch (error) {
      console.log('Form data failed, trying JSON format...', error);
      
      // Fallback to JSON format
      const requestBody = {
        code: code,
        state: state
      };
      
      console.log('Sending callback request with JSON body:', requestBody);
      
      const response = await apiRequest<CallbackResponse>(
        '/api/content-decay/callback',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(requestBody),
        }
      );
      console.log('Callback response:', response);
      return response;
    }
  }

  async disconnect(): Promise<DisconnectResponse> {
    console.log('Disconnecting Google Search Console...');
    const response = await apiRequest<DisconnectResponse>(
      '/api/content-decay/disconnect',
      { method: 'DELETE' }
    );
    console.log('Disconnect response:', response);
    return response;
  }

  /**
   * Detect content decay for a website
   */
  async detectContentDecay(request: ContentDecayRequest): Promise<AnalysisResult> {
    console.log('Detecting content decay for:', request.siteUrl);
    const response = await apiRequest<AnalysisResult>(
      '/api/content-decay/detect',
      {
        method: 'POST',
        body: JSON.stringify(request),
      }
    );
    console.log('Content decay detection response:', response);
    return response;
  }

  /**
   * Validate website URL format
   */
  validateUrl(url: string): boolean {
    try {
      const urlObj = new URL(url);
      return urlObj.protocol === 'http:' || urlObj.protocol === 'https:';
    } catch {
      return false;
    }
  }

  /**
   * Format decay percentage for display
   */
  formatDecayPercentage(percentage: number): string {
    return `${percentage.toFixed(1)}%`;
  }

  /**
   * Get priority color
   */
  getPriorityColor(priority: 'high' | 'medium' | 'low'): string {
    switch (priority) {
      case 'high':
        return '#f44336';
      case 'medium':
        return '#ff9800';
      case 'low':
        return '#2196f3';
      default:
        return '#757575';
    }
  }

  /**
   * Get priority label
   */
  getPriorityLabel(priority: 'high' | 'medium' | 'low'): string {
    switch (priority) {
      case 'high':
        return 'High Priority';
      case 'medium':
        return 'Medium Priority';
      case 'low':
        return 'Low Priority';
      default:
        return 'Unknown';
    }
  }
}

export const contentDecayService = new ContentDecayService(); 