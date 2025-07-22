"use client";

import { useState, useEffect } from "react";
import { Sidebar, MobileMenuButton } from "@/components/sidebar";
import ProtectedRoute from "@/components/ProtectedRoute";
import Breadcrumb from "@/components/Breadcrumb";
import { UserDropdown } from "@/components/UserDropdown";
import { ThemeToggle } from "@/shared/ui/theme";
import { useAuth } from "@/entities/user";
import { BarChart3 } from "lucide-react";
import Link from "next/link";

export default function DashboardLayoutClient({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { isAuthenticated } = useAuth();

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  return (
    <ProtectedRoute>
      <div className="flex h-screen bg-background">
        <Sidebar
          isOpen={isMobileMenuOpen}
          onClose={() => setIsMobileMenuOpen(false)}
        />

        <div className="flex-1 flex flex-col min-w-0">
          {/* Dashboard Header */}
          <header className="flex items-center justify-between h-16 px-4 sm:px-6 border-b border-border bg-card shadow-sm">
            {/* Left side - Mobile menu and breadcrumb */}
            <div className="flex items-center space-x-4">
              <MobileMenuButton onClick={() => setIsMobileMenuOpen(true)} />
              <div className="hidden sm:flex items-center space-x-2">
                <Link href="/dashboard" className="flex items-center space-x-2 hover:opacity-80 transition-opacity">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600 text-white">
                    <BarChart3 className="h-5 w-5" />
                  </div>
                  <span className="text-lg font-bold text-foreground">AuditCraft</span>
                </Link>
              </div>
              <div className="sm:hidden">
                <span className="text-lg font-semibold text-foreground">Dashboard</span>
              </div>
            </div>

            {/* Right side - User dropdown and theme toggle */}
            <div className="flex items-center space-x-3">
              <ThemeToggle />
              {isAuthenticated && <UserDropdown />}
            </div>
          </header>

          {/* Main Content */}
          <main className="flex-1 overflow-auto">
            <div className="p-4 sm:p-6">
              <Breadcrumb />
              {children}
            </div>
          </main>
        </div>
      </div>
    </ProtectedRoute>
  );
} 