'use client';

import { useState } from 'react';
import { useAuth } from '@/entities/user';
import { Chrome } from 'lucide-react';

interface GoogleAuthButtonProps {
  variant?: 'login' | 'register';
  className?: string;
}

export function GoogleAuthButton({ variant = 'login', className = '' }: GoogleAuthButtonProps) {
  const { isLoading } = useAuth();
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);

  const handleGoogleAuth = async () => {
    try {
      setIsGoogleLoading(true);

      // Get the Google OAuth URL from the backend
      const response = await fetch('/api/auth/google/url', {
        method: 'GET',
      });

      if (!response.ok) {
        throw new Error('Failed to get Google OAuth URL');
      }

      const data = await response.json();

      if (!data.success || !data.data?.authUrl) {
        throw new Error('Invalid OAuth URL response');
      }
      console.log('data', data)

      // Add registration flag to the URL if this is a register button
      let authUrl = data.data.authUrl;
      if (variant === 'register') {
        const url = new URL(authUrl);
        url.searchParams.set('register', 'true');
        authUrl = url.toString();
      }

      // Add state parameter for security
      const url = new URL(authUrl);
      const state = Math.random().toString(36).substring(2, 15);
      url.searchParams.set('state', state);

      // Store state in sessionStorage for validation
      sessionStorage.setItem('oauth_state', state);

      console.log('Google OAuth state generated:', { state, authUrl: url.toString() });

      authUrl = url.toString();

      // Redirect to Google OAuth
      window.location.href = authUrl;
    } catch (error) {
      console.error('Google auth error:', error);
      // The redirect will happen automatically, so we don't need to show an error
    } finally {
      setIsGoogleLoading(false);
    }
  };

  return (
    <button
      onClick={handleGoogleAuth}
      disabled={isLoading || isGoogleLoading}
      className={`w-full flex items-center justify-center gap-3 py-3 px-4 border border-border bg-input text-foreground font-semibold rounded-xl hover:bg-accent transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background disabled:opacity-50 disabled:cursor-not-allowed ${className}`}
    >
      {isGoogleLoading ? (
        <div className="w-5 h-5 border-2 border-current border-t-transparent rounded-full animate-spin" />
      ) : (
        <Chrome className="w-5 h-5" />
      )}
      <span>
        {variant === 'login' ? 'Sign in' : 'Sign up'} with Google
      </span>
    </button>
  );
} 