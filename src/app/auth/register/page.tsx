'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/entities/user';
import type { RegisterCredentials } from '@/shared/types/auth';
import { Eye, EyeOff, Mail, Lock, User, ArrowRight, Zap, AlertCircle, CheckCircle } from 'lucide-react';
import { GoogleAuthButton } from '@/components/GoogleAuthButton';

export default function RegisterPage() {
  const [credentials, setCredentials] = useState<RegisterCredentials>({
    name: '',
    email: '',
    password: '',
  });
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const { register, isAuthenticated, isLoading } = useAuth();
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

    // Validate passwords match
    if (credentials.password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    // Validate password strength
    if (credentials.password.length < 8) {
      setError('Password must be at least 8 characters long');
      return;
    }

    if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/.test(credentials.password)) {
      setError('Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character');
      return;
    }

    setIsSubmitting(true);

    try {
      await register(credentials);
      router.push('/dashboard');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Registration failed');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (field: keyof RegisterCredentials | 'confirmPassword') => (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = e.target.value;
    if (field === 'confirmPassword') {
      setConfirmPassword(value);
    } else {
      setCredentials(prev => ({ ...prev, [field]: value }));
    }
    if (error) setError(''); // Clear error when user starts typing
  };

  // Password strength indicator
  const getPasswordStrength = (password: string) => {
    let score = 0;
    if (password.length >= 8) score++;
    if (/[a-z]/.test(password)) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/\d/.test(password)) score++;
    if (/[@$!%*?&]/.test(password)) score++;
    return score;
  };

  const passwordStrength = getPasswordStrength(credentials.password);
  const passwordsMatch = credentials.password && confirmPassword && credentials.password === confirmPassword;

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-secondary to-accent flex items-center justify-center px-4 sm:px-6 lg:px-8 py-12">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-primary to-primary-dark rounded-2xl mb-6 shadow-lg">
            <Zap className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Create your account
          </h1>
          <p className="text-muted-foreground">
            Start your SEO optimization journey today
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

        {/* Registration Form */}
        <div className="bg-card rounded-2xl shadow-xl border border-border p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Error Message */}
            {error && (
              <div className="flex items-center gap-3 p-4 bg-destructive/10 border border-destructive/20 rounded-xl text-destructive animate-in slide-in-from-top-2 duration-300">
                <AlertCircle className="w-5 h-5 flex-shrink-0" />
                <span className="text-sm font-medium">{error}</span>
              </div>
            )}

            {/* Name Field */}
            <div className="space-y-2">
              <label htmlFor="name" className="block text-sm font-semibold text-foreground">
                Full name
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="h-5 w-5 text-muted-foreground" />
                </div>
                <input
                  id="name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  required
                  value={credentials.name}
                  onChange={handleInputChange('name')}
                  className="block w-full pl-10 pr-3 py-3 border border-border rounded-xl bg-input text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200 text-sm"
                  placeholder="Enter your full name"
                />
              </div>
            </div>

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
                  value={credentials.email}
                  onChange={handleInputChange('email')}
                  className="block w-full pl-10 pr-3 py-3 border border-border rounded-xl bg-input text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200 text-sm"
                  placeholder="Enter your email"
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="space-y-2">
              <label htmlFor="password" className="block text-sm font-semibold text-foreground">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-muted-foreground" />
                </div>
                <input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="new-password"
                  required
                  value={credentials.password}
                  onChange={handleInputChange('password')}
                  className="block w-full pl-10 pr-12 py-3 border border-border rounded-xl bg-input text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200 text-sm"
                  placeholder="Create a strong password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-muted-foreground hover:text-foreground transition-colors duration-200"
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>

              {/* Password Strength Indicator */}
              {credentials.password && (
                <div className="mt-2">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="flex-1 bg-muted rounded-full h-2">
                      <div
                        className={`h-2 rounded-full transition-all duration-300 ${passwordStrength <= 2 ? 'bg-destructive w-1/3' :
                          passwordStrength <= 3 ? 'bg-warning w-2/3' :
                            'bg-success w-full'
                          }`}
                      />
                    </div>
                    <span className={`text-xs font-medium ${passwordStrength <= 2 ? 'text-destructive' :
                      passwordStrength <= 3 ? 'text-warning' :
                        'text-success'
                      }`}>
                      {passwordStrength <= 2 ? 'Weak' : passwordStrength <= 3 ? 'Medium' : 'Strong'}
                    </span>
                  </div>
                  <div className="text-xs text-muted-foreground space-y-1">
                    <p>Password must contain:</p>
                    <ul className="list-disc list-inside ml-2 space-y-1">
                      <li className={credentials.password.length >= 8 ? 'text-success' : ''}>
                        At least 8 characters
                      </li>
                      <li className={/[A-Z]/.test(credentials.password) ? 'text-success' : ''}>
                        One uppercase letter
                      </li>
                      <li className={/[a-z]/.test(credentials.password) ? 'text-success' : ''}>
                        One lowercase letter
                      </li>
                      <li className={/\d/.test(credentials.password) ? 'text-success' : ''}>
                        One number
                      </li>
                      <li className={/[@$!%*?&]/.test(credentials.password) ? 'text-success' : ''}>
                        One special character
                      </li>
                    </ul>
                  </div>
                </div>
              )}
            </div>

            {/* Confirm Password Field */}
            <div className="space-y-2">
              <label htmlFor="confirmPassword" className="block text-sm font-semibold text-foreground">
                Confirm password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-muted-foreground" />
                </div>
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type={showConfirmPassword ? 'text' : 'password'}
                  autoComplete="new-password"
                  required
                  value={confirmPassword}
                  onChange={handleInputChange('confirmPassword')}
                  className="block w-full pl-10 pr-12 py-3 border border-border rounded-xl bg-input text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200 text-sm"
                  placeholder="Confirm your password"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-muted-foreground hover:text-foreground transition-colors duration-200"
                >
                  {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>

              {/* Password Match Indicator */}
              {confirmPassword && (
                <div className="flex items-center gap-2 mt-2">
                  {passwordsMatch ? (
                    <>
                      <CheckCircle className="w-4 h-4 text-success" />
                      <span className="text-sm text-success">Passwords match</span>
                    </>
                  ) : (
                    <>
                      <AlertCircle className="w-4 h-4 text-destructive" />
                      <span className="text-sm text-destructive">Passwords don&apos;t match</span>
                    </>
                  )}
                </div>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting || !passwordsMatch || passwordStrength < 4}
              className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-gradient-to-r from-primary to-primary-dark hover:from-primary-dark hover:to-primary disabled:from-muted disabled:to-muted text-white font-semibold rounded-xl shadow-lg hover:shadow-xl disabled:shadow-md transform hover:scale-[1.02] disabled:scale-100 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background"
            >
              {isSubmitting ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Creating account...</span>
                </>
              ) : (
                <>
                  <span>Create account</span>
                  <ArrowRight className="w-5 h-5" />
                </>
              )}
            </button>

            {/* Divider */}
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-border" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-card px-2 text-muted-foreground">Or continue with</span>
              </div>
            </div>

            {/* Google OAuth Button */}
            <GoogleAuthButton variant="register" />
          </form>

          {/* Footer */}
          <div className="mt-8 pt-6 border-t border-border">
            <p className="text-center text-sm text-muted-foreground">
              Already have an account?{' '}
              <Link
                href="/auth/login"
                className="font-semibold text-primary hover:text-primary-dark transition-colors duration-200 hover:underline"
              >
                Sign in here
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
} 