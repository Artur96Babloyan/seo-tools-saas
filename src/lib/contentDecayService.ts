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
    
    // Send OAuth parameters as query parameters (common OAuth approach)
    const queryParams = new URLSearchParams({
      code: code,
      state: state
    });
    
    const endpoint = `/api/content-decay/callback?${queryParams.toString()}`;
    console.log('Sending callback request to:', endpoint);
    
    const response = await apiRequest<CallbackResponse>(
      endpoint,
      {
        method: 'POST',
        // No body needed since parameters are in URL
      }
    );
    console.log('Callback response:', response);
    return response;
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
    console.log('Request body:', JSON.stringify(request, null, 2));
    
    try {
      // First, let's test if the endpoint is reachable
      console.log('Testing endpoint reachability...');
      
      const response = await apiRequest<AnalysisResult>(
        '/api/content-decay/detect',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(request),
        }
      );
      console.log('Content decay detection response:', response);
      return response;
    } catch (error) {
      console.error('Content decay detection error details:', {
        error,
        message: error instanceof Error ? error.message : 'Unknown error',
        request: request,
        errorType: error instanceof Error ? error.constructor.name : 'Unknown',
        errorStack: error instanceof Error ? error.stack : 'No stack trace'
      });
      
      // Check if it's a network error vs server error
      if (error instanceof Error) {
        if (error.message.includes('Failed to fetch') || error.message.includes('Network error')) {
          throw new Error('Network error: Unable to reach the content decay service. Please check your connection.');
        } else if (error.message.includes('500')) {
          throw new Error('Server error: The content decay detection endpoint is not implemented or experiencing issues. Please contact support.');
        } else if (error.message.includes('404')) {
          throw new Error('Content decay detection endpoint not found. The service may not be available yet.');
        } else {
          throw new Error(`Content decay detection failed: ${error.message}`);
        }
      }
      throw new Error('Content decay detection failed: Unknown error');
    }
  }

  /**
   * Test if the content decay detection endpoint is available
   */
  async testEndpoint(): Promise<boolean> {
    try {
      console.log('Testing content decay detection endpoint...');
      
      // Try a simple GET request to see if the endpoint exists
      const response = await apiRequest<{ available: boolean }>(
        '/api/content-decay/detect',
        {
          method: 'GET',
        }
      );
      
      console.log('Endpoint test response:', response);
      return true;
    } catch (error) {
      console.log('Endpoint test failed:', error);
      return false;
    }
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