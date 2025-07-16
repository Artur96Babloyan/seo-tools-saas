'use client';

import { useEffect, useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { contentDecayService } from '@/lib/contentDecayService';
import { CheckCircle, XCircle, Loader2 } from 'lucide-react';

function OAuthCallbackContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const [message, setMessage] = useState('Processing authentication...');

  useEffect(() => {
    const handleCallback = async () => {
      try {
        const code = searchParams.get('code');
        const state = searchParams.get('state');

        console.log('URL search params:', Object.fromEntries(searchParams.entries()));
        console.log('Extracted code:', code);
        console.log('Extracted state:', state);

        if (!code || !state) {
          setStatus('error');
          setMessage('Missing authorization code or state parameter');
          console.error('Missing OAuth parameters:', { code: !!code, state: !!state });
          return;
        }

        console.log('Processing OAuth callback with:', {
          code: code.substring(0, 20) + '...',
          state: state.substring(0, 20) + '...'
        });

        const result = await contentDecayService.handleCallback(code, state);

        console.log('Callback result:', result);

        if (result.connected) {
          setStatus('success');
          setMessage('Google Search Console connected successfully!');

          // Redirect to content decay page after 2 seconds
          setTimeout(() => {
            router.push('/dashboard/content-decay');
          }, 2000);
        } else {
          setStatus('error');
          setMessage('Failed to connect Google Search Console');
        }
      } catch (error) {
        console.error('OAuth callback error:', error);
        setStatus('error');
        setMessage(error instanceof Error ? error.message : 'Authentication failed');
      }
    };

    handleCallback();
  }, [searchParams, router]);

  const renderContent = () => {
    switch (status) {
      case 'loading':
        return (
          <div className="flex flex-col items-center space-y-4">
            <Loader2 className="h-12 w-12 animate-spin text-blue-600" />
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
              Connecting to Google Search Console
            </h2>
            <p className="text-gray-600 dark:text-gray-400 text-center max-w-md">
              {message}
            </p>
          </div>
        );

      case 'success':
        return (
          <div className="flex flex-col items-center space-y-4">
            <CheckCircle className="h-12 w-12 text-green-600" />
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
              Connection Successful!
            </h2>
            <p className="text-gray-600 dark:text-gray-400 text-center max-w-md">
              {message}
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Redirecting to Content Decay Detection...
            </p>
          </div>
        );

      case 'error':
        return (
          <div className="flex flex-col items-center space-y-4">
            <XCircle className="h-12 w-12 text-red-600" />
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
              Connection Failed
            </h2>
            <p className="text-gray-600 dark:text-gray-400 text-center max-w-md">
              {message}
            </p>
            <button
              onClick={() => router.push('/dashboard/content-decay')}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Go Back to Content Decay
            </button>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 max-w-md w-full mx-4">
        {renderContent()}
      </div>
    </div>
  );
}

export default function OAuthCallbackPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 max-w-md w-full mx-4">
          <div className="flex flex-col items-center space-y-4">
            <Loader2 className="h-12 w-12 animate-spin text-blue-600" />
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
              Loading...
            </h2>
          </div>
        </div>
      </div>
    }>
      <OAuthCallbackContent />
    </Suspense>
  );
} 