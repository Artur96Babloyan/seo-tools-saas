'use client';

import { useAuth } from '@/entities/user';
import { authService } from '@/lib/auth';

export default function DebugAuthPage() {
  const { user, token, isLoading, isAuthenticated } = useAuth();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">Authentication Debug</h1>

        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 space-y-4">
          <div>
            <h2 className="text-lg font-semibold mb-2">Auth Context State</h2>
            <div className="space-y-2 text-sm">
              <p><strong>isLoading:</strong> {isLoading.toString()}</p>
              <p><strong>isAuthenticated:</strong> {isAuthenticated.toString()}</p>
              <p><strong>User:</strong> {user ? JSON.stringify(user, null, 2) : 'null'}</p>
              <p><strong>Token:</strong> {token ? `${token.substring(0, 20)}...` : 'null'}</p>
            </div>
          </div>

          <div>
            <h2 className="text-lg font-semibold mb-2">Auth Service State</h2>
            <div className="space-y-2 text-sm">
              <p><strong>Service Token:</strong> {authService.getToken() ? `${authService.getToken()?.substring(0, 20)}...` : 'null'}</p>
              <p><strong>Service User:</strong> {authService.getUser() ? JSON.stringify(authService.getUser(), null, 2) : 'null'}</p>
              <p><strong>Service isAuthenticated:</strong> {authService.isAuthenticated().toString()}</p>
            </div>
          </div>

          <div>
            <h2 className="text-lg font-semibold mb-2">Cookies</h2>
            <div className="space-y-2 text-sm">
              <p><strong>Token Cookie:</strong> {typeof window !== 'undefined' ? document.cookie.includes('seo-tools-token') ? 'Present' : 'Not found' : 'Server side'}</p>
              <p><strong>User Cookie:</strong> {typeof window !== 'undefined' ? document.cookie.includes('seo-tools-user') ? 'Present' : 'Not found' : 'Server side'}</p>
            </div>
          </div>

          <div>
            <h2 className="text-lg font-semibold mb-2">Actions</h2>
            <div className="space-y-2">
              <button
                onClick={() => {
                  console.log('Manual token validation...');
                  authService.validateToken().then(user => {
                    console.log('Validation result:', user);
                    alert(user ? 'Token valid' : 'Token invalid');
                  }).catch(err => {
                    console.error('Validation error:', err);
                    alert('Validation error: ' + err.message);
                  });
                }}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                Test Token Validation
              </button>

              <button
                onClick={() => {
                  authService.logout();
                }}
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 ml-2"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 