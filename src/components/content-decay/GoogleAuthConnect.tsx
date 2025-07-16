"use client";

import React, { useState } from 'react';
import { contentDecayService } from '@/lib/contentDecayService';
import { AlertTriangle, ExternalLink, CheckCircle, Clock } from 'lucide-react';

interface GoogleAuthConnectProps {
  onStatusCheck: () => void;
}

export default function GoogleAuthConnect({ onStatusCheck }: GoogleAuthConnectProps) {
  const [isConnecting, setIsConnecting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleConnect = async () => {
    try {
      setIsConnecting(true);
      setError(null);

      const authData = await contentDecayService.getAuthUrl();

      // Store state for verification
      sessionStorage.setItem('gsc_oauth_state', authData.state);
      sessionStorage.setItem('gsc_oauth_expires', (Date.now() + authData.expiresIn * 1000).toString());

      // Redirect to Google OAuth
      window.location.href = authData.authUrl;
    } catch (err) {
      console.error('Failed to get auth URL:', err);
      setError('Failed to start authentication. Please try again.');
    } finally {
      setIsConnecting(false);
    }
  };

  const handleManualCheck = () => {
    onStatusCheck();
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-8">
      <div className="text-center">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900/20 mb-6">
          <AlertTriangle className="h-8 w-8 text-blue-600 dark:text-blue-400" />
        </div>

        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
          Connect Google Search Console
        </h2>

        <p className="text-gray-600 dark:text-gray-400 mb-8 max-w-2xl mx-auto">
          To detect content decay, we need access to your Google Search Console data.
          This allows us to analyze your website&apos;s traffic patterns and identify pages
          that have experienced significant traffic decline.
        </p>

        {error && (
          <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4 mb-6">
            <div className="flex items-center space-x-2">
              <AlertTriangle className="h-5 w-5 text-red-600 dark:text-red-400" />
              <span className="text-red-700 dark:text-red-300">{error}</span>
            </div>
          </div>
        )}

        <div className="space-y-4">
          <button
            onClick={handleConnect}
            disabled={isConnecting}
            className="inline-flex items-center space-x-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {isConnecting ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                <span>Connecting...</span>
              </>
            ) : (
              <>
                <ExternalLink className="h-5 w-5" />
                <span>Connect Google Search Console</span>
              </>
            )}
          </button>

          <button
            onClick={handleManualCheck}
            className="block mx-auto text-sm text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 transition-colors"
          >
            Already connected? Check status
          </button>
        </div>

        <div className="mt-8 p-6 bg-gray-50 dark:bg-gray-900/50 rounded-lg">
          <h3 className="font-semibold text-gray-900 dark:text-white mb-3">
            What we&apos;ll access:
          </h3>
          <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-2 text-left max-w-md mx-auto">
            <li className="flex items-start space-x-2">
              <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
              <span>Search performance data for your website</span>
            </li>
            <li className="flex items-start space-x-2">
              <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
              <span>Click and impression statistics</span>
            </li>
            <li className="flex items-start space-x-2">
              <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
              <span>Keyword rankings and positions</span>
            </li>
            <li className="flex items-start space-x-2">
              <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
              <span>Page-specific performance metrics</span>
            </li>
          </ul>
        </div>

        <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
          <div className="flex items-start space-x-3">
            <Clock className="h-5 w-5 text-blue-600 dark:text-blue-400 mt-0.5 flex-shrink-0" />
            <div className="text-sm text-blue-800 dark:text-blue-200">
              <p className="font-medium mb-1">Analysis Period</p>
              <p>We analyze the last 6 months of data to detect content decay patterns and provide actionable recommendations.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 