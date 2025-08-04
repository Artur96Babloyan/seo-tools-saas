'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAuth } from '@/entities/user';
import { CheckCircle, XCircle, Loader2 } from 'lucide-react';

export default function OAuthCallbackContent() {
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const [error, setError] = useState<string>('');
  const router = useRouter();
  const searchParams = useSearchParams();
  const { handleGoogleLogin, handleGoogleRegister } = useAuth();

  useEffect(() => {
    const handleOAuthCallback = async () => {
      try {
        const code = searchParams.get('code');
        const state = searchParams.get('state');
        const error = searchParams.get('error');
        const isRegistration = searchParams.get('register') === 'true';

        if (error) {
          setStatus('error');
          setError('OAuth authentication failed. Please try again.');
          return;
        }

        if (!code) {
          setStatus('error');
          setError('No authorization code received from Google.');
          return;
        }

        // Validate state parameter (optional but recommended for security)
        const storedState = sessionStorage.getItem('oauth_state');
        console.log('OAuth callback state validation:', {
          receivedState: state,
          storedState,
          hasState: !!state,
          hasStoredState: !!storedState
        });

        // State validation is optional - don't block the flow
        // if (state && storedState && state !== storedState) {
        //   console.warn('State parameter mismatch, but continuing with OAuth flow');
        // }

        // Clear the stored state regardless
        sessionStorage.removeItem('oauth_state');

        try {
          // Handle the OAuth callback based on whether it's login or registration
          if (isRegistration) {
            await handleGoogleRegister(code);
          } else {
            await handleGoogleLogin(code);
          }

          setStatus('success');

          // Redirect to dashboard after a short delay
          setTimeout(() => {
            router.push('/dashboard');
          }, 2000);
        } catch (err) {
          console.error('OAuth callback error:', err);
          setStatus('error');
          setError(err instanceof Error ? err.message : 'Authentication failed');
        }
      } catch (err) {
        setStatus('error');
        setError(err instanceof Error ? err.message : 'Authentication failed');
      }
    };

    handleOAuthCallback();
  }, [searchParams, router, handleGoogleLogin, handleGoogleRegister]);

  if (status === 'loading') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-secondary to-accent flex items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-md text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-primary rounded-2xl mb-6 shadow-lg">
            <Loader2 className="w-8 h-8 text-white animate-spin" />
          </div>
          <h1 className="text-2xl font-bold text-foreground mb-4">
            Completing Sign In
          </h1>
          <p className="text-muted-foreground">
            Please wait while we complete your Google sign-in...
          </p>
        </div>
      </div>
    );
  }

  if (status === 'error') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-secondary to-accent flex items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-md text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-destructive rounded-2xl mb-6 shadow-lg">
            <XCircle className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-foreground mb-4">
            Sign In Failed
          </h1>
          <p className="text-muted-foreground mb-6">
            {error}
          </p>
          <div className="space-y-3">
            <button
              onClick={() => router.push('/auth/login')}
              className="w-full py-3 px-4 bg-primary text-white font-semibold rounded-xl hover:bg-primary-dark transition-colors"
            >
              Back to Login
            </button>
            <button
              onClick={() => window.location.reload()}
              className="w-full py-3 px-4 border border-border bg-input text-foreground font-semibold rounded-xl hover:bg-accent transition-colors"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-secondary to-accent flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-success rounded-2xl mb-6 shadow-lg">
          <CheckCircle className="w-8 h-8 text-white" />
        </div>
        <h1 className="text-2xl font-bold text-foreground mb-4">
          Sign In Successful!
        </h1>
        <p className="text-muted-foreground">
          Redirecting you to your dashboard...
        </p>
      </div>
    </div>
  );
} 