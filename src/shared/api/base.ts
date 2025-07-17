import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import { API_BASE_URL, API_TIMEOUT } from '../lib/constants';

// API Error class
export class ApiError extends Error {
  public status: number;
  public data?: unknown;

  constructor(message: string, status: number, data?: unknown) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
    this.data = data;
  }
}

// Base API configuration
const createApiInstance = (): AxiosInstance => {
  const instance = axios.create({
    baseURL: API_BASE_URL,
    timeout: API_TIMEOUT,
    headers: {
      'Content-Type': 'application/json',
    },
  });

  // Request interceptor
  instance.interceptors.request.use(
    (config) => {
      // Add auth token if available
      const token = getAuthToken();
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  // Response interceptor
  instance.interceptors.response.use(
    (response: AxiosResponse) => {
      return response;
    },
    (error) => {
      if (error.response) {
        const { status, data } = error.response;
        const message = data?.message || data?.error || 'An error occurred';
        throw new ApiError(message, status, data);
      } else if (error.request) {
        throw new ApiError('Network error. Please check your connection.', 0);
      } else {
        throw new ApiError('An unexpected error occurred.', 0);
      }
    }
  );

  return instance;
};

// Get auth token from storage
const getAuthToken = (): string | null => {
  if (typeof window === 'undefined') return null;
  
  try {
    return localStorage.getItem('auth-token');
  } catch {
    return null;
  }
}

// Create API instance
export const api = createApiInstance();

// Generic API request function
export async function apiRequest<T = unknown>(
  config: AxiosRequestConfig
): Promise<T> {
  try {
    const response = await api(config);
    return response.data;
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }
    throw new ApiError('An unexpected error occurred.', 0);
  }
}

// HTTP method helpers
export const apiGet = <T = unknown>(url: string, config?: AxiosRequestConfig) =>
  apiRequest<T>({ ...config, method: 'GET', url });

export const apiPost = <T = unknown>(url: string, data?: unknown, config?: AxiosRequestConfig) =>
  apiRequest<T>({ ...config, method: 'POST', url, data });

export const apiPut = <T = unknown>(url: string, data?: unknown, config?: AxiosRequestConfig) =>
  apiRequest<T>({ ...config, method: 'PUT', url, data });

export const apiDelete = <T = unknown>(url: string, config?: AxiosRequestConfig) =>
  apiRequest<T>({ ...config, method: 'DELETE', url });

export const apiPatch = <T = unknown>(url: string, data?: unknown, config?: AxiosRequestConfig) =>
  apiRequest<T>({ ...config, method: 'PATCH', url, data });

// Health check function
export async function checkApiHealth(): Promise<{ status: string; uptime: number; timestamp: string }> {
  try {
    const response = await apiGet<{ status: string; uptime: number; timestamp: string }>('/api/health');
    return response;
  } catch {
    throw new ApiError('API health check failed', 0);
  }
}

// Retry mechanism for failed requests
export async function apiRequestWithRetry<T = unknown>(
  config: AxiosRequestConfig,
  maxRetries: number = 3,
  delay: number = 1000
): Promise<T> {
  let lastError: Error;

  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      return await apiRequest<T>(config);
    } catch (error) {
      lastError = error as Error;
      
      if (attempt === maxRetries) {
        throw lastError;
      }

      // Wait before retrying
      await new Promise(resolve => setTimeout(resolve, delay * attempt));
    }
  }

  throw lastError!;
}

// Upload file helper
export async function uploadFile<T = unknown>(
  url: string,
  file: File,
  onProgress?: (progress: number) => void
): Promise<T> {
  const formData = new FormData();
  formData.append('file', file);

  const config: AxiosRequestConfig = {
    method: 'POST',
    url,
    data: formData,
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    onUploadProgress: (progressEvent) => {
      if (onProgress && progressEvent.total) {
        const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total);
        onProgress(progress);
      }
    },
  };

  return apiRequest<T>(config);
}

// Download file helper
export async function downloadFile(url: string, filename?: string): Promise<void> {
  try {
    const response = await api.get(url, {
      responseType: 'blob',
    });

    const blob = new Blob([response.data]);
    const downloadUrl = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = downloadUrl;
    link.download = filename || 'download';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(downloadUrl);
  } catch {
    throw new ApiError('Failed to download file', 0);
  }
}

// Batch request helper
export async function batchRequest<T = unknown>(
  requests: Array<() => Promise<T>>,
  concurrency: number = 5
): Promise<T[]> {
  const results: T[] = [];
  const executing: Promise<void>[] = [];

  for (const request of requests) {
    const promise = request().then(result => {
      results.push(result);
    });

    executing.push(promise);

    if (executing.length >= concurrency) {
      await Promise.race(executing);
      executing.splice(executing.findIndex(p => p === promise), 1);
    }
  }

  await Promise.all(executing);
  return results;
}

// Cache helper
const cache = new Map<string, { data: unknown; timestamp: number; ttl: number }>();

export async function cachedRequest<T = unknown>(
  key: string,
  request: () => Promise<T>,
  ttl: number = 5 * 60 * 1000 // 5 minutes
): Promise<T> {
  const cached = cache.get(key);
  const now = Date.now();

  if (cached && (now - cached.timestamp) < cached.ttl) {
    return cached.data as T;
  }

  const data = await request();
  cache.set(key, { data, timestamp: now, ttl });

  return data;
}

// Clear cache
export function clearCache(pattern?: string): void {
  if (pattern) {
    for (const key of cache.keys()) {
      if (key.includes(pattern)) {
        cache.delete(key);
      }
    }
  } else {
    cache.clear();
  }
} 