import React from 'react';
import { cn } from '../../lib/utils';

export interface LoadingProps {
  size?: 'sm' | 'md' | 'lg';
  variant?: 'spinner' | 'dots' | 'pulse';
  className?: string;
  text?: string;
}

export const Loading: React.FC<LoadingProps> = ({
  size = 'md',
  variant = 'spinner',
  className,
  text,
}) => {
  const sizes = {
    sm: 'h-4 w-4',
    md: 'h-6 w-6',
    lg: 'h-8 w-8',
  };

  const Spinner = () => (
    <svg
      className={cn('animate-spin', sizes[size])}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      />
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      />
    </svg>
  );

  const Dots = () => (
    <div className="flex space-x-1">
      <div className={cn('animate-bounce bg-current rounded-full', sizes[size])} style={{ animationDelay: '0ms' }} />
      <div className={cn('animate-bounce bg-current rounded-full', sizes[size])} style={{ animationDelay: '150ms' }} />
      <div className={cn('animate-bounce bg-current rounded-full', sizes[size])} style={{ animationDelay: '300ms' }} />
    </div>
  );

  const Pulse = () => (
    <div className={cn('animate-pulse bg-current rounded-full', sizes[size])} />
  );

  const variants = {
    spinner: Spinner,
    dots: Dots,
    pulse: Pulse,
  };

  const VariantComponent = variants[variant];

  return (
    <div className={cn('flex items-center justify-center', className)}>
      <div className="flex items-center space-x-2">
        <VariantComponent />
        {text && (
          <span className="text-sm text-muted-foreground">{text}</span>
        )}
      </div>
    </div>
  );
};

export interface LoadingOverlayProps extends LoadingProps {
  isVisible: boolean;
  backdrop?: boolean;
}

export const LoadingOverlay: React.FC<LoadingOverlayProps> = ({
  isVisible,
  backdrop = true,
  ...loadingProps
}) => {
  if (!isVisible) return null;

  return (
    <div className={cn(
      'fixed inset-0 z-50 flex items-center justify-center',
      backdrop && 'bg-black/50 backdrop-blur-sm'
    )}>
      <div className="bg-card border border-border rounded-lg p-6 shadow-lg">
        <Loading {...loadingProps} />
      </div>
    </div>
  );
};

export interface LoadingSkeletonProps {
  className?: string;
  lines?: number;
  height?: string;
}

export const LoadingSkeleton: React.FC<LoadingSkeletonProps> = ({
  className,
  lines = 1,
  height = 'h-4',
}) => {
  return (
    <div className={cn('space-y-2', className)}>
      {Array.from({ length: lines }).map((_, index) => (
        <div
          key={index}
          className={cn(
            'animate-pulse bg-muted rounded',
            height
          )}
        />
      ))}
    </div>
  );
};

export interface LoadingButtonProps {
  loading?: boolean;
  children: React.ReactNode;
  className?: string;
}

export const LoadingButton: React.FC<LoadingButtonProps> = ({
  loading = false,
  children,
  className,
}) => {
  return (
    <button
      className={cn(
        'inline-flex items-center justify-center px-4 py-2 text-sm font-medium rounded-lg transition-colors',
        'bg-primary text-white hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2',
        'disabled:opacity-50 disabled:cursor-not-allowed',
        className
      )}
      disabled={loading}
    >
      {loading && (
        <svg
          className="animate-spin -ml-1 mr-2 h-4 w-4"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          />
        </svg>
      )}
      {children}
    </button>
  );
}; 