'use client';

import { Suspense } from 'react';
import { Loader2 } from 'lucide-react';
import OAuthCallbackContent from './OAuthCallbackContent';

export default function OAuthCallbackPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gradient-to-br from-background via-secondary to-accent flex items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-md text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-primary rounded-2xl mb-6 shadow-lg">
            <Loader2 className="w-8 h-8 text-white animate-spin" />
          </div>
          <h1 className="text-2xl font-bold text-foreground mb-4">
            Loading...
          </h1>
        </div>
      </div>
    }>
      <OAuthCallbackContent />
    </Suspense>
  );
} 