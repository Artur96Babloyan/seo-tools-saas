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

          // Fetch the latest profile data to ensure we have avatar information
          try {
            const response = await fetch('/api/user/profile', {
              headers: {
                'Authorization': `Bearer ${authService.getToken()}`,
              },
            });

            if (response.ok) {
              const data = await response.json();
              if (data.success && data.data) {
                // Merge the profile data with the current user data
                const updatedUser = {
                  ...currentUser,
                  ...data.data,
                };
                authService.updateUserData(updatedUser);
                setUser(updatedUser);
              }
            }
          } catch (error) {
            console.warn('Failed to fetch profile during initialization:', error);
          }
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

      // Always try to fetch the latest user profile from the backend
      // to ensure we have the most up-to-date data including avatar
      try {
        const response = await fetch('/api/user/profile', {
          headers: {
            'Authorization': `Bearer ${authService.getToken()}`,
          },
        });

        if (response.ok) {
          const data = await response.json();

          if (data.success && data.data) {
            // Merge the profile data with the current user data to ensure we don't lose any fields
            const updatedUser = {
              ...currentUser,
              ...data.data,
            };
            authService.updateUserData(updatedUser);
            setUser(updatedUser);
            setToken(authService.getToken() || null);
            return;
          }
        }
      } catch (error) {
        console.warn('Failed to fetch updated profile, using cached data:', error);
        // Silently fall back to cached data
      }

      // Fallback to current user data
      setUser(currentUser);
      setToken(authService.getToken() || null);
    } catch {
      setUser(null);
      setToken(null);
    }
  };

  const contextValue: AuthContextType = {
    user,
    token,
    isLoading,
    isAuthenticated: !!user && !!token,
    login,
    register,
    logout,
    refreshAuth,
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