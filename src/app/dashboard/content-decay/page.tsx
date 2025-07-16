"use client";

import { useState, useEffect } from 'react';
import { AlertTriangle, CheckCircle, ExternalLink, LogOut } from 'lucide-react';
import { contentDecayService, ContentDecayStatus } from '@/lib/contentDecayService';
import { AnalysisResult } from '@/types/content-decay';
import ConnectionStatus from '@/components/content-decay/ConnectionStatus';
import ContentDecayAnalysis from '@/components/content-decay/ContentDecayAnalysis';

type ViewState = 'status' | 'connect' | 'analyzing' | 'results' | 'not-implemented';

export default function ContentDecayPage() {
  const [currentView, setCurrentView] = useState<ViewState>('status');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [serviceStatus, setServiceStatus] = useState<ContentDecayStatus | null>(null);
  const [isConnecting, setIsConnecting] = useState(false);
  const [analysisResults, setAnalysisResults] = useState<AnalysisResult | null>(null);

  const checkServiceStatus = async () => {
    try {
      setIsLoading(true);
      setError(null);

      const status = await contentDecayService.getStatus();
      console.log('Page received status:', status);
      console.log('Full googleSearchConsole object:', status.googleSearchConsole);

      // Check if the response has the expected structure
      if (!status || typeof status !== 'object') {
        console.error('Invalid status response:', status);
        setCurrentView('not-implemented');
        return;
      }

      // Check if googleSearchConsole property exists
      if (!status.googleSearchConsole) {
        console.error('Missing googleSearchConsole in status response:', status);
        setCurrentView('not-implemented');
        return;
      }

      setServiceStatus(status);
      const connected = status.googleSearchConsole.connected && !status.googleSearchConsole.expired;

      console.log('Setting view based on status:', {
        status: status.status,
        connected: status.googleSearchConsole.connected,
        expired: status.googleSearchConsole.expired,
        isConnected: connected
      });

      // If the service is not available, show the coming soon view
      if (status.status === 'not-available') {
        setCurrentView('not-implemented');
      } else if (connected) {
        setCurrentView('status');
      } else {
        setCurrentView('connect');
      }
    } catch (err) {
      console.error('Failed to check service status:', err);
      // Handle authentication error - user needs to login first
      if (err instanceof Error && (err.message.includes('401') || err.message.includes('Access denied'))) {
        setError('Please log in to access Content Decay Detection.');
        setCurrentView('connect');
      } else if (err instanceof Error && (err.message.includes('404') || err.message.includes('Failed to fetch'))) {
        setCurrentView('not-implemented');
      } else {
        setError('Failed to check service status. Please try again.');
        setCurrentView('connect');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleConnectGoogle = async () => {
    try {
      setIsConnecting(true);
      setError(null);

      console.log('Getting Google OAuth URL...');
      const authData = await contentDecayService.getAuthUrl();

      console.log('Redirecting to Google OAuth:', authData.authUrl);

      // Store state in localStorage for verification (optional security measure)
      localStorage.setItem('oauth_state', authData.state);

      // Redirect to Google OAuth
      window.location.href = authData.authUrl;
    } catch (err) {
      console.error('Failed to get OAuth URL:', err);
      setError('Failed to initiate Google OAuth. Please try again.');
    } finally {
      setIsConnecting(false);
    }
  };

  const handleDisconnect = async () => {
    try {
      setIsLoading(true);
      setError(null);

      await contentDecayService.disconnect();
      setCurrentView('connect');

      // Show success message
      setError('Google Search Console disconnected successfully.');
      setTimeout(() => setError(null), 3000);
    } catch (err) {
      console.error('Failed to disconnect:', err);
      setError('Failed to disconnect. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleAnalysisComplete = (results: AnalysisResult) => {
    setAnalysisResults(results);
    setCurrentView('results');
  };

  const handleNewAnalysis = () => {
    setAnalysisResults(null);
    setCurrentView('status');
  };

  // Check service status on mount
  useEffect(() => {
    checkServiceStatus();
  }, []);

  const renderContent = () => {
    if (isLoading) {
      return (
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="flex flex-col items-center space-y-4">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            <p className="text-gray-600 dark:text-gray-400">Loading...</p>
          </div>
        </div>
      );
    }

    if (error) {
      return (
        <ConnectionStatus
          type="error"
          title="Error"
          message={error}
          onDismiss={() => setError(null)}
        />
      );
    }

    switch (currentView) {
      case 'not-implemented':
        return (
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-8">
            <div className="text-center">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-yellow-100 dark:bg-yellow-900/20 mb-6">
                <AlertTriangle className="h-8 w-8 text-yellow-600 dark:text-yellow-400" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                Coming Soon
              </h2>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                Content Decay Detection is currently being developed and will be available soon.
              </p>
              <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4 mb-6">
                <h3 className="font-semibold text-blue-800 dark:text-blue-200 mb-2">
                  What&apos;s Coming:
                </h3>
                <ul className="text-sm text-blue-700 dark:text-blue-300 space-y-1 text-left max-w-md mx-auto">
                  <li>• Google Search Console integration</li>
                  <li>• Traffic decline analysis</li>
                  <li>• AI-powered recovery recommendations</li>
                  <li>• Content decay detection algorithms</li>
                </ul>
              </div>
              <button
                onClick={() => setCurrentView('connect')}
                className="inline-flex items-center space-x-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <span>Try Again</span>
              </button>
            </div>
          </div>
        );

      case 'connect':
        return (
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-8">
            <div className="text-center">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900/20 mb-6">
                <AlertTriangle className="h-8 w-8 text-blue-600 dark:text-blue-400" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                Connect Google Search Console
              </h2>
              <p className="text-gray-600 dark:text-gray-400 mb-8">
                Content Decay Detection requires Google Search Console access to analyze your website&apos;s traffic patterns.
              </p>

              <div className="space-y-4">
                <button
                  onClick={handleConnectGoogle}
                  disabled={isConnecting}
                  className="inline-flex items-center space-x-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isConnecting ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                      <span>Connecting...</span>
                    </>
                  ) : (
                    <>
                      <ExternalLink className="h-4 w-4" />
                      <span>Connect Google Search Console</span>
                    </>
                  )}
                </button>

                <button
                  onClick={checkServiceStatus}
                  className="block w-full px-4 py-2 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 transition-colors"
                >
                  Check Connection Status
                </button>
              </div>
            </div>
          </div>
        );

      case 'status':
        return (
          <div className="space-y-6">
            {/* Connection Status */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <CheckCircle className="h-6 w-6 text-green-600" />
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                      Google Search Console Connected
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Your account is successfully connected and ready for analysis.
                    </p>
                  </div>
                </div>
                <button
                  onClick={handleDisconnect}
                  className="inline-flex items-center space-x-2 px-4 py-2 text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                >
                  <LogOut className="h-4 w-4" />
                  <span>Disconnect</span>
                </button>
              </div>
            </div>

            {/* Service Status */}
            {serviceStatus && (
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  Service Status
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <span className="text-sm font-medium text-gray-900 dark:text-white">Service</span>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                      {serviceStatus.service}
                    </p>
                  </div>
                  <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <span className="text-sm font-medium text-gray-900 dark:text-white">Status</span>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1 capitalize">
                      {serviceStatus.status}
                    </p>
                  </div>
                  <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <span className="text-sm font-medium text-gray-900 dark:text-white">Version</span>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                      {serviceStatus.version}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Content Decay Analysis */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Content Decay Analysis
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                Analyze your website&apos;s content for traffic decline and get AI-powered recommendations for recovery.
              </p>

              <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
                <h4 className="font-semibold text-blue-800 dark:text-blue-200 mb-2">
                  Analysis Features:
                </h4>
                <ul className="text-sm text-blue-700 dark:text-blue-300 space-y-1">
                  <li>• Traffic decline detection</li>
                  <li>• Content performance analysis</li>
                  <li>• AI-powered recovery recommendations</li>
                  <li>• Priority-based action items</li>
                </ul>
              </div>

              <div className="mt-6">
                <button
                  onClick={() => setCurrentView('analyzing')}
                  className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Start Analysis
                </button>
              </div>
            </div>
          </div>
        );

      case 'analyzing':
        return (
          <ContentDecayAnalysis
            onAnalysisComplete={handleAnalysisComplete}
            onNewAnalysis={handleNewAnalysis}
            results={analysisResults}
          />
        );

      case 'results':
        return (
          <ContentDecayAnalysis
            onAnalysisComplete={handleAnalysisComplete}
            onNewAnalysis={handleNewAnalysis}
            results={analysisResults}
          />
        );

      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          Content Decay Detection
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Detect and analyze content performance decline with AI-powered recommendations.
        </p>
      </div>

      {renderContent()}
    </div>
  );
} 