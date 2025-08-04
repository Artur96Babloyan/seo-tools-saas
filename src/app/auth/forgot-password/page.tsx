'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/entities/user';
import { Mail, ArrowLeft, Zap, AlertCircle, CheckCircle, HelpCircle } from 'lucide-react';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string>('');
  const [success, setSuccess] = useState(false);
  const [isRateLimited, setIsRateLimited] = useState(false);
  const [retryCountdown, setRetryCountdown] = useState(0);

  const { isAuthenticated, isLoading } = useAuth();
  const router = useRouter();

  // Redirect if already authenticated
  useEffect(() => {
    if (!isLoading && isAuthenticated) {
      // Check if user came from a protected page or dashboard
      const referrer = document.referrer;
      const currentHost = window.location.origin;

      // If user came from our site and it's a protected page, redirect to dashboard
      if (referrer.startsWith(currentHost)) {
        const referrerPath = new URL(referrer).pathname;
        if (referrerPath.startsWith('/dashboard') || referrerPath.startsWith('/auth/')) {
          router.push('/dashboard');
          return;
        }
      }

      // If user came from external site or public page, don't redirect
      // Let them navigate freely
    }
  }, [isAuthenticated, isLoading, router]);

  // Don't render if still loading or already authenticated
  if (isLoading || isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-secondary to-accent flex items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center space-y-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);

    try {
      // Call the forgot password API
      const response = await fetch('/api/auth/forgot-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to send reset email');
      }

      setSuccess(true);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to send reset email';
      setError(errorMessage);

      // Handle rate limiting
      if (errorMessage.includes('Too many requests') || errorMessage.includes('rate limit')) {
        setIsRateLimited(true);
        setRetryCountdown(60); // 60 seconds cooldown

        // Start countdown
        const interval = setInterval(() => {
          setRetryCountdown(prev => {
            if (prev <= 1) {
              clearInterval(interval);
              setIsRateLimited(false);
              return 0;
            }
            return prev - 1;
          });
        }, 1000);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    if (error) setError(''); // Clear error when user starts typing
  };

  if (success) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-secondary to-accent flex items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-md">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-success to-success rounded-2xl mb-6 shadow-lg">
              <CheckCircle className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-foreground mb-2">
              Check your email
            </h1>
            <p className="text-muted-foreground">
              We&apos;ve sent a password reset link to <strong>{email}</strong>
            </p>
          </div>

          {/* Success Message */}
          <div className="bg-card rounded-2xl shadow-xl border border-border p-8">
            <div className="text-center space-y-6">
              <div className="flex items-center justify-center gap-3 p-4 bg-success/10 border border-success/20 rounded-xl text-success">
                <CheckCircle className="w-5 h-5" />
                <span className="text-sm font-medium">Reset email sent successfully!</span>
              </div>

              <div className="text-sm text-muted-foreground space-y-3">
                <p>If you don&apos;t see the email, check your spam folder.</p>
                <p>The reset link will expire in 1 hour for security reasons.</p>
              </div>

              <div className="space-y-3">
                <Link
                  href="/auth/login"
                  className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-gradient-to-r from-primary to-primary-dark hover:from-primary-dark hover:to-primary text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background"
                >
                  <ArrowLeft className="w-5 h-5" />
                  <span>Back to login</span>
                </Link>

                <button
                  onClick={() => {
                    setSuccess(false);
                    setEmail('');
                  }}
                  className="w-full py-3 px-4 border border-border rounded-xl bg-input text-foreground font-semibold hover:bg-accent transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background"
                >
                  Send another email
                </button>
              </div>
            </div>
          </div>

          {/* Help Section */}
          <div className="mt-6 p-4 bg-primary/5 border border-primary/20 rounded-xl">
            <div className="flex items-start space-x-3">
              <HelpCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
              <div className="text-sm text-primary">
                <h3 className="font-semibold mb-1">Still having trouble?</h3>
                <p className="text-xs space-y-1">
                  <span>• Check our <Link href="/help" className="underline hover:no-underline">help center</Link> for common issues</span>
                  <br />
                  <span>• Contact support if you need additional assistance</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-secondary to-accent flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-primary to-primary-dark rounded-2xl mb-6 shadow-lg">
            <Zap className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Forgot password?
          </h1>
          <p className="text-muted-foreground">
            Enter your email and we&apos;ll send you a reset link
          </p>
          <div className="mt-4">
            <Link
              href="/"
              className="text-sm text-primary hover:text-primary-dark transition-colors duration-200 hover:underline"
            >
              ← Back to Home
            </Link>
          </div>
        </div>

        {/* Reset Form */}
        <div className="bg-card rounded-2xl shadow-xl border border-border p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Error Message */}
            {error && (
              <div className={`flex items-center gap-3 p-4 border rounded-xl animate-in slide-in-from-top-2 duration-300 ${error.includes('Too many requests') || error.includes('rate limit')
                ? 'bg-warning/10 border-warning/20 text-warning'
                : 'bg-destructive/10 border-destructive/20 text-destructive'
                }`}>
                <AlertCircle className="w-5 h-5 flex-shrink-0" />
                <div className="flex-1">
                  <span className="text-sm font-medium">{error}</span>
                  {(error.includes('Too many requests') || error.includes('rate limit')) && (
                    <p className="text-xs mt-1 opacity-90">
                      Please wait before trying again. This helps protect against abuse.
                    </p>
                  )}
                </div>
              </div>
            )}

            {/* Email Field */}
            <div className="space-y-2">
              <label htmlFor="email" className="block text-sm font-semibold text-foreground">
                Email address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-muted-foreground" />
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={handleInputChange}
                  className="block w-full pl-10 pr-3 py-3 border border-border rounded-xl bg-input text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200 text-sm"
                  placeholder="Enter your email address"
                />
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting || isRateLimited}
              className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-gradient-to-r from-primary to-primary-dark hover:from-primary-dark hover:to-primary disabled:from-muted disabled:to-muted text-white font-semibold rounded-xl shadow-lg hover:shadow-xl disabled:shadow-md transform hover:scale-[1.02] disabled:scale-100 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background"
            >
              {isSubmitting ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Sending...</span>
                </>
              ) : isRateLimited ? (
                <>
                  <span>Rate Limited</span>
                  <span className="text-sm">({retryCountdown}s)</span>
                </>
              ) : (
                <>
                  <span>Send reset link</span>
                  <Mail className="w-5 h-5" />
                </>
              )}
            </button>
          </form>

          {/* Footer */}
          <div className="mt-8 pt-6 border-t border-border">
            <div className="text-center space-y-3">
              <p className="text-sm text-muted-foreground">
                Remember your password?{' '}
                <Link
                  href="/auth/login"
                  className="font-semibold text-primary hover:text-primary-dark transition-colors duration-200 hover:underline"
                >
                  Sign in
                </Link>
              </p>
              <p className="text-sm text-muted-foreground">
                Don&apos;t have an account?{' '}
                <Link
                  href="/auth/register"
                  className="font-semibold text-primary hover:text-primary-dark transition-colors duration-200 hover:underline"
                >
                  Create one now
                </Link>
              </p>
            </div>
          </div>
        </div>

        {/* Help Section */}
        <div className="mt-6 p-4 bg-primary/5 border border-primary/20 rounded-xl">
          <div className="flex items-start space-x-3">
            <HelpCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
            <div className="text-sm text-primary">
              <h3 className="font-semibold mb-1">Need Help?</h3>
              <p className="text-xs space-y-1">
                <span>• Check your spam folder if you don&apos;t receive the email</span>
                <br />
                <span>• Contact support if you need additional assistance</span>
                <br />
                <span>• Check our <Link href="/help" className="underline hover:no-underline">help center</Link> for common issues</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 