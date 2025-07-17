'use client';

import { ReactNode } from 'react';
import { ThemeProvider } from '@/shared/ui/theme';
import { AuthProvider } from '@/entities/user';

interface ProvidersProps {
  children: ReactNode;
}

export function Providers({ children }: ProvidersProps) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <AuthProvider>
        {children}
      </AuthProvider>
    </ThemeProvider>
  );
} 