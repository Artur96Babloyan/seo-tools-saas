import { authService } from './auth';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5002';

interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

class ApiError extends Error {
  constructor(public statusCode: number, message: string) {
    super(message);
    this.name = 'ApiError';
  }
}

// Helper function to format Zod validation errors
function formatValidationErrors(details: Record<string, unknown>): string {
  if (!details || typeof details !== 'object') {
    return 'Unknown validation error';
  }
  
  const errors: string[] = [];
  
  // Extract error messages from Zod error format
  const extractErrors = (obj: Record<string, unknown>, path: string = ''): void => {
    if (obj._errors && Array.isArray(obj._errors)) {
      obj._errors.forEach((error: string) => {
        errors.push(path ? `${path}: ${error}` : error);
      });
    }
    
    if (obj && typeof obj === 'object') {
      Object.keys(obj).forEach(key => {
        if (key !== '_errors' && obj[key] && typeof obj[key] === 'object') {
          extractErrors(obj[key] as Record<string, unknown>, path ? `${path}.${key}` : key);
        }
      });
    }
  };
  
  extractErrors(details);
  
  return errors.length > 0 ? errors.join(', ') : 'Validation failed';
}

async function apiRequest<T = unknown>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const url = `${API_BASE_URL}${endpoint}`;
  
  // Get authentication token
  const token = authService.getToken();
  
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...((options.headers as Record<string, string>) || {}),
  };

  // Add authorization header if token exists
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }
  
  try {
    const response = await fetch(url, {
      ...options,
      headers,
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ error: 'Unknown error' }));
      
      // Handle 401 errors (token expired/invalid)
      if (response.status === 401) {
        // Clear auth data and redirect to login
        authService.logout();
        throw new ApiError(401, 'Authentication required. Please log in again.');
      }
      
      // Handle validation errors with details
      if (response.status === 400 && errorData.error === 'Validation error' && errorData.details) {
        const validationDetails = formatValidationErrors(errorData.details);
        throw new ApiError(response.status, `Validation error: ${validationDetails}`);
      }
      
      throw new ApiError(response.status, errorData.error || errorData.message || `HTTP ${response.status}`);
    }

    const data: ApiResponse<T> = await response.json();
    
    // Log API responses for debugging
    if (endpoint.includes('/api/report/list')) {
      console.log('API Response for reports:', {
        url,
        success: data.success,
        data: data.data,
        dataType: typeof data.data,
        dataKeys: data.data ? Object.keys(data.data) : 'null/undefined'
      });
    }
    
    if (!data.success) {
      throw new ApiError(400, data.error || data.message || 'API request failed');
    }

    if (data.data === undefined) {
      throw new ApiError(500, 'No data returned from API');
    }

    return data.data;
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }
    
    // Network or other errors
    throw new ApiError(500, error instanceof Error ? error.message : 'Network error');
  }
}

export { apiRequest, ApiError };
export type { ApiResponse }; 