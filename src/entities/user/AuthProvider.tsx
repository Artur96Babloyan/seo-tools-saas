'use client';

import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import type { AuthContextType, User, LoginCredentials, RegisterCredentials } from '@/shared/types/auth';
import { authService } from '@/lib/auth';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Initialize auth state on mount
  useEffect(() => {
    const initializeAuth = async () => {
      try {
        const currentUser = await authService.validateToken();

        if (currentUser) {
          setUser(currentUser);
          setToken(authService.getToken() || null);
          // Optional: we skip profile fetch here to avoid blocking auth on OAuth flows
        }
      } catch {
        // Auth initialization failed - user will need to login
      } finally {
        setIsLoading(false);
      }
    };

    initializeAuth();
  }, []);

  const login = async (credentials: LoginCredentials): Promise<void> => {
    try {
      setIsLoading(true);

      const loggedInUser = await authService.login(credentials);

      setUser(loggedInUser);
      setToken(authService.getToken() || null);

      // Refresh auth to ensure we have the latest user data including avatar
      await refreshAuth();
    } catch (error) {
      throw error; // Re-throw to let the UI handle the error
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (credentials: RegisterCredentials): Promise<void> => {
    try {
      setIsLoading(true);
      const registeredUser = await authService.register(credentials);
      setUser(registeredUser);
      setToken(authService.getToken() || null);

      // Refresh auth to ensure we have the latest user data including avatar
      await refreshAuth();
    } catch (error) {
      throw error; // Re-throw to let the UI handle the error
    } finally {
      setIsLoading(false);
    }
  };

  const loginWithGoogle = async (): Promise<void> => {
    try {
      setIsLoading(true);
      await authService.loginWithGoogle();
      // Note: This will redirect the user, so the following code won't execute
      // The actual login will happen after the OAuth callback
    } catch (error) {
      // Only throw if it's not a redirect error
      if (!error.message.includes('Redirecting to Google OAuth')) {
        throw error;
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = async (code: string): Promise<void> => {
    try {
      setIsLoading(true);
      const user = await authService.handleGoogleLogin(code);
      setUser(user);
      setToken(authService.getToken() || null);
      await refreshAuth();
    } catch (error) {
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleRegister = async (code: string): Promise<void> => {
    try {
      setIsLoading(true);
      const user = await authService.handleGoogleRegister(code);
      setUser(user);
      setToken(authService.getToken() || null);
      await refreshAuth();
    } catch (error) {
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const linkGoogleAccount = async (code: string): Promise<void> => {
    try {
      setIsLoading(true);
      await authService.linkGoogleAccount(code);
      await refreshAuth();
    } catch (error) {
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const unlinkGoogleAccount = async (): Promise<void> => {
    try {
      setIsLoading(true);
      await authService.unlinkGoogleAccount();
      await refreshAuth();
    } catch (error) {
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = (): void => {
    setUser(null);
    setToken(null);
    authService.logout();
  };

  const refreshAuth = async (): Promise<void> => {
    try {
      // First validate the token
      const currentUser = await authService.validateToken();
      if (!currentUser) {
        setUser(null);
        setToken(null);
        return;
      }

      // Keep the current cached user; avoid blocking on profile fetch
      setUser(currentUser);
      setToken(authService.getToken() || null);
    } catch {
      setUser(null);
      setToken(null);
    }
  };

  const handleOAuthToken = async (oauthToken: string): Promise<void> => {
    try {
      setIsLoading(true);

      // Use the auth service to validate and store the OAuth token
      const user = await authService.handleOAuthToken(oauthToken);

      setUser(user);
      setToken(authService.getToken() || null);

      console.log('OAuth token processed successfully');
    } catch (error) {
      console.error('Failed to process OAuth token:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const contextValue: AuthContextType = {
    user,
    token,
    isLoading,
    isAuthenticated: !!user && !!token,
    login,
    register,
    loginWithGoogle,
    handleGoogleLogin,
    handleGoogleRegister,
    linkGoogleAccount,
    unlinkGoogleAccount,
    logout,
    refreshAuth,
    handleOAuthToken,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

export default AuthContext; 