// Shared types for the entire application
export * from './auth';
export * from './seo-optimizer';
export * from './content-extractor';
export * from './competitor';
export * from './keyword-tracker';

// Common types
export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface PaginationParams {
  page?: number;
  limit?: number;
  total?: number;
  totalPages?: number;
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: PaginationParams;
}

export interface LoadingState {
  isLoading: boolean;
  error: string | null;
}

export interface BaseEntity {
  id: string;
  createdAt: string;
  updatedAt?: string;
}

// UI Types
export interface Theme {
  mode: 'light' | 'dark' | 'system';
}

export interface UserPreferences {
  theme: Theme;
  language: string;
  timezone: string;
}

// Form Types
export interface FormField {
  name: string;
  label: string;
  type: 'text' | 'email' | 'password' | 'url' | 'textarea' | 'select' | 'checkbox';
  required?: boolean;
  placeholder?: string;
  validation?: {
    min?: number;
    max?: number;
    pattern?: string;
    message?: string;
  };
}

export interface FormState<T = unknown> {
  values: T;
  errors: Partial<Record<keyof T, string>>;
  touched: Partial<Record<keyof T, boolean>>;
  isValid: boolean;
  isSubmitting: boolean;
}

// Navigation Types
export interface NavigationItem {
  name: string;
  href: string;
  icon?: React.ComponentType<{ className?: string }>;
  badge?: string | number;
  children?: NavigationItem[];
}

export interface BreadcrumbItem {
  name: string;
  href?: string;
  current?: boolean;
}

// Notification Types
export interface Notification {
  id: string;
  type: 'success' | 'error' | 'warning' | 'info';
  title: string;
  message?: string;
  duration?: number;
  action?: {
    label: string;
    onClick: () => void;
  };
}

// File Types
export interface FileUpload {
  id: string;
  name: string;
  size: number;
  type: string;
  url?: string;
  progress?: number;
  status: 'uploading' | 'completed' | 'error';
}

// Export Types
export interface ExportOptions {
  format: 'pdf' | 'csv' | 'json' | 'xml';
  includeHeaders?: boolean;
  filename?: string;
}

// Search Types
export interface SearchFilters {
  query?: string;
  dateFrom?: string;
  dateTo?: string;
  category?: string;
  status?: string;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

// Chart Types
export interface ChartData {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    backgroundColor?: string | string[];
    borderColor?: string | string[];
    borderWidth?: number;
  }[];
}

export interface ChartOptions {
  responsive?: boolean;
  maintainAspectRatio?: boolean;
  plugins?: {
    legend?: {
      display?: boolean;
      position?: 'top' | 'bottom' | 'left' | 'right';
    };
    tooltip?: {
      enabled?: boolean;
    };
  };
  scales?: {
    x?: {
      display?: boolean;
      title?: {
        display?: boolean;
        text?: string;
      };
    };
    y?: {
      display?: boolean;
      title?: {
        display?: boolean;
        text?: string;
      };
    };
  };
} 