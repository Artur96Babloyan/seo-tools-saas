// Application constants
export const APP_NAME = 'AuditCraft';
export const APP_DESCRIPTION = 'Professional SEO Analysis & Website Audit Tools';
export const APP_URL = 'https://auditcraft.io';

// API Configuration
export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://api.auditcraft.io';
export const API_TIMEOUT = 30000; // 30 seconds

// Pagination defaults
export const DEFAULT_PAGE_SIZE = 10;
export const MAX_PAGE_SIZE = 100;

// Character limits
export const TITLE_MAX_LENGTH = 200;
export const TITLE_MIN_LENGTH = 10;
export const DESCRIPTION_MAX_LENGTH = 160;
export const DESCRIPTION_MIN_LENGTH = 50;
export const CONTENT_MAX_LENGTH = 10000;
export const CONTENT_MIN_LENGTH = 50;
export const KEYWORD_MAX_LENGTH = 50;
export const KEYWORD_MIN_LENGTH = 2;

// Score thresholds
export const EXCELLENT_SCORE = 90;
export const GOOD_SCORE = 70;
export const AVERAGE_SCORE = 50;
export const POOR_SCORE = 30;

// Timeouts
export const SITEMAP_TIMEOUT_MIN = 30; // seconds
export const SITEMAP_TIMEOUT_MAX = 180; // seconds
export const SITEMAP_TIMEOUT_DEFAULT = 60; // seconds

// Crawl depths
export const SITEMAP_DEPTH_MIN = 1;
export const SITEMAP_DEPTH_MAX = 3;
export const SITEMAP_DEPTH_DEFAULT = 2;

// Keyword tracking limits
export const MAX_KEYWORDS_PER_TRACK = 10;
export const MAX_DOMAINS_PER_USER = 50;

// File upload limits
export const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
export const ALLOWED_FILE_TYPES = ['text/plain', 'text/csv', 'application/json'];

// Auto-save configuration
export const AUTO_SAVE_DELAY = 3000; // 3 seconds
export const DRAFT_STORAGE_KEY = 'seo-optimizer-draft';

// Theme configuration
export const THEME_STORAGE_KEY = 'auditcraft-theme';
export const DEFAULT_THEME = 'system';

// Navigation items
export const NAVIGATION_ITEMS = [
  {
    name: 'Dashboard',
    href: '/dashboard',
    icon: 'Home',
  },
  {
    name: 'AI Content Optimizer',
    href: '/dashboard/seo-optimizer',
    icon: 'Sparkles',
  },
  {
    name: 'SERP Optimizer',
    href: '/dashboard/serp-optimizer',
    icon: 'Search',
  },
  {
    name: 'Sitemap Generator',
    href: '/dashboard/sitemap',
    icon: 'Globe',
  },
  {
    name: 'Meta Tag Validator',
    href: '/dashboard/meta-tags',
    icon: 'CheckCircle',
  },
  {
    name: 'Page Speed Auditor',
    href: '/dashboard/page-speed',
    icon: 'Zap',
  },
  {
    name: 'Keyword Tracker',
    href: '/dashboard/keyword-tracker',
    icon: 'TrendingUp',
  },
  {
    name: 'Competitor Analysis',
    href: '/dashboard/competitor-analysis',
    icon: 'Users',
  },
  {
    name: 'Reports',
    href: '/dashboard/reports',
    icon: 'FileText',
  },
] as const;

// Meta tag types
export const META_TAG_TYPES = [
  'title',
  'metaDescription',
  'metaKeywords',
  'metaRobots',
  'canonical',
  'ogTitle',
  'ogDescription',
  'ogImage',
  'viewport',
  'charset',
  'favicon',
] as const;

// Performance metrics
export const PERFORMANCE_METRICS = [
  'performance',
  'accessibility',
  'bestPractices',
  'seo',
] as const;

// Analysis categories
export const ANALYSIS_CATEGORIES = [
  'performance',
  'accessibility',
  'bestPractices',
  'seo',
] as const;

// Export formats
export const EXPORT_FORMATS = [
  { value: 'pdf', label: 'PDF Document' },
  { value: 'csv', label: 'CSV Spreadsheet' },
  { value: 'json', label: 'JSON Data' },
  { value: 'xml', label: 'XML Document' },
] as const;

// Chart colors
export const CHART_COLORS = {
  primary: '#3b82f6',
  secondary: '#64748b',
  success: '#10b981',
  warning: '#f59e0b',
  error: '#ef4444',
  info: '#06b6d4',
} as const;

// Status colors
export const STATUS_COLORS = {
  success: 'text-green-600 bg-green-100 dark:text-green-400 dark:bg-green-900/30',
  warning: 'text-yellow-600 bg-yellow-100 dark:text-yellow-400 dark:bg-yellow-900/30',
  error: 'text-red-600 bg-red-100 dark:text-red-400 dark:bg-red-900/30',
  info: 'text-blue-600 bg-blue-100 dark:text-blue-400 dark:bg-blue-900/30',
  neutral: 'text-gray-600 bg-gray-100 dark:text-gray-400 dark:bg-gray-900/30',
} as const;

// Error messages
export const ERROR_MESSAGES = {
  NETWORK_ERROR: 'Network error. Please check your connection and try again.',
  VALIDATION_ERROR: 'Please check your input and try again.',
  UNAUTHORIZED: 'You are not authorized to perform this action.',
  NOT_FOUND: 'The requested resource was not found.',
  SERVER_ERROR: 'Server error. Please try again later.',
  TIMEOUT_ERROR: 'Request timed out. Please try again.',
  RATE_LIMIT_ERROR: 'Too many requests. Please wait a moment and try again.',
} as const;

// Success messages
export const SUCCESS_MESSAGES = {
  SAVED: 'Successfully saved.',
  UPDATED: 'Successfully updated.',
  DELETED: 'Successfully deleted.',
  EXPORTED: 'Successfully exported.',
  COPIED: 'Copied to clipboard.',
  OPTIMIZED: 'Content optimized successfully!',
} as const;

// Loading messages
export const LOADING_MESSAGES = {
  ANALYZING: 'Analyzing website...',
  GENERATING: 'Generating report...',
  SAVING: 'Saving...',
  EXPORTING: 'Exporting...',
  TRACKING: 'Tracking keywords...',
  OPTIMIZING: 'Optimizing content...',
} as const;

// Validation messages
export const VALIDATION_MESSAGES = {
  REQUIRED: 'This field is required.',
  INVALID_URL: 'Please enter a valid URL.',
  INVALID_EMAIL: 'Please enter a valid email address.',
  INVALID_DOMAIN: 'Please enter a valid domain.',
  TOO_SHORT: (min: number) => `Must be at least ${min} characters.`,
  TOO_LONG: (max: number) => `Must be less than ${max} characters.`,
  INVALID_FORMAT: 'Invalid format.',
} as const;

// SEO recommendations
export const SEO_RECOMMENDATIONS = {
  TITLE_LENGTH: 'Title should be between 10-60 characters for optimal SEO.',
  DESCRIPTION_LENGTH: 'Meta description should be between 50-160 characters.',
  KEYWORD_DENSITY: 'Include your focus keyword naturally in the content.',
  HEADING_STRUCTURE: 'Use proper heading hierarchy (H1, H2, H3, etc.).',
  IMAGE_ALT: 'Add descriptive alt text to all images.',
  INTERNAL_LINKS: 'Include relevant internal links to other pages.',
  EXTERNAL_LINKS: 'Link to authoritative external sources when relevant.',
  MOBILE_FRIENDLY: 'Ensure your content is mobile-friendly.',
  LOADING_SPEED: 'Optimize images and code for faster loading.',
} as const;

// Feature flags
export const FEATURE_FLAGS = {
  AI_OPTIMIZATION: true,
  ADVANCED_ANALYTICS: true,
  PDF_EXPORT: true,
  BULK_OPERATIONS: true,
  API_INTEGRATION: true,
  REAL_TIME_TRACKING: true,
} as const;

// Local storage keys
export const STORAGE_KEYS = {
  THEME: 'auditcraft-theme',
  USER_PREFERENCES: 'auditcraft-preferences',
  DRAFT_CONTENT: 'seo-optimizer-draft',
  RECENT_SEARCHES: 'recent-searches',
  FAVORITE_TOOLS: 'favorite-tools',
} as const;

// Route paths
export const ROUTES = {
  HOME: '/',
  DASHBOARD: '/dashboard',
  AUTH: {
    LOGIN: '/auth/login',
    REGISTER: '/auth/register',
  },
  TOOLS: {
    SEO_OPTIMIZER: '/dashboard/seo-optimizer',
    SERP_OPTIMIZER: '/dashboard/serp-optimizer',
    SITEMAP: '/dashboard/sitemap',
    META_TAGS: '/dashboard/meta-tags',
    PAGE_SPEED: '/dashboard/page-speed',
    KEYWORD_TRACKER: '/dashboard/keyword-tracker',
    COMPETITOR_ANALYSIS: '/dashboard/competitor-analysis',
    REPORTS: '/dashboard/reports',
  },
} as const; 