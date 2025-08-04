"use client";

import * as React from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "../button";

interface ThemeProviderProps {
  children: React.ReactNode;
  [key: string]: unknown;
}

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
}

export function ThemeToggle() {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  // Ensure component is mounted before accessing theme
  React.useEffect(() => {
    setMounted(true);
  }, []);

  const handleThemeToggle = () => {
    if (!mounted) return;

    // Determine the current effective theme
    let currentTheme = resolvedTheme;
    
    // If resolvedTheme is not available, use theme
    if (!currentTheme) {
      currentTheme = theme;
    }
    
    // If theme is 'system', we need to determine what the system preference is
    if (currentTheme === 'system') {
      // Check if user prefers dark mode
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      currentTheme = prefersDark ? 'dark' : 'light';
    }
    
    // Toggle to the opposite theme
    const newTheme = currentTheme === "light" ? "dark" : "light";
    setTheme(newTheme);
  };

  // Don't render until mounted to avoid hydration mismatch
  if (!mounted) {
    return (
      <Button
        variant="ghost"
        size="sm"
        className="h-9 w-9 p-0"
        disabled
      >
        <Sun className="h-4 w-4" />
        <span className="sr-only">Loading theme</span>
      </Button>
    );
  }

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={handleThemeToggle}
      className="h-9 w-9 p-0"
    >
      <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
      <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
} 