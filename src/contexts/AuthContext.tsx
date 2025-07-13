'use client';

import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import type { AuthContextType, User, LoginCredentials, RegisterCredentials } from '@/types/auth';
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
      const currentUser = await authService.validateToken();
      if (currentUser) {
        setUser(currentUser);
        setToken(authService.getToken() || null);
      } else {
        setUser(null);
        setToken(null);
      }
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