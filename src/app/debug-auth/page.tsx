'use client';

import { Suspense } from 'react';
import { useState } from 'react';
import { useAuth } from '@/entities/user';
import { useSearchParams } from 'next/navigation';

function DebugAuthContent() {
  const { user, token, isAuthenticated, isLoading, handleOAuthToken } = useAuth();
  const [testToken, setTestToken] = useState('');
  const [testResult, setTestResult] = useState('');
  const searchParams = useSearchParams();

  const testOAuthToken = async () => {
    if (!testToken) {
      setTestResult('Please enter a token to test');
      return;
    }

    try {
      setTestResult('Testing token...');
      await handleOAuthToken(testToken);
      setTestResult('Token processed successfully!');
    } catch (error) {
      setTestResult(`Error: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  };

  const urlToken = searchParams.get('token');

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Auth Debug Page</h1>

      <div className="space-y-6">
        {/* Current Auth State */}
        <div className="p-4 border rounded-lg">
          <h2 className="text-lg font-semibold mb-2">Current Auth State</h2>
          <div className="space-y-2 text-sm">
            <p><strong>Loading:</strong> {isLoading ? 'Yes' : 'No'}</p>
            <p><strong>Authenticated:</strong> {isAuthenticated ? 'Yes' : 'No'}</p>
            <p><strong>User:</strong> {user ? JSON.stringify(user, null, 2) : 'None'}</p>
            <p><strong>Token:</strong> {token ? `${token.substring(0, 20)}...` : 'None'}</p>
            <p><strong>URL Token:</strong> {urlToken ? `${urlToken.substring(0, 20)}...` : 'None'}</p>
          </div>
        </div>

        {/* Test OAuth Token */}
        <div className="p-4 border rounded-lg">
          <h2 className="text-lg font-semibold mb-2">Test OAuth Token</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Token to Test:</label>
              <input
                type="text"
                value={testToken}
                onChange={(e) => setTestToken(e.target.value)}
                placeholder="Enter JWT token here..."
                className="w-full p-2 border rounded"
              />
            </div>
            <button
              onClick={testOAuthToken}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Test Token
            </button>
            {testResult && (
              <div className="p-2 bg-gray-100 rounded">
                <strong>Result:</strong> {testResult}
              </div>
            )}
          </div>
        </div>

        {/* Auth Actions */}
        <div className="p-4 border rounded-lg">
          <h2 className="text-lg font-semibold mb-2">Auth Actions</h2>
          <div className="space-x-4">
            <button
              onClick={() => window.location.href = '/auth/login'}
              className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
            >
              Go to Login
            </button>
            <button
              onClick={() => window.location.href = '/dashboard'}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Go to Dashboard
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function DebugAuthPage() {
  return (
    <Suspense fallback={
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading debug page...</p>
        </div>
      </div>
    }>
      <DebugAuthContent />
    </Suspense>
  );
} 