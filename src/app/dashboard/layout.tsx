"use client";

import { useState, useEffect } from "react";
import { Sidebar, MobileMenuButton } from "@/components/sidebar";
import ProtectedRoute from "@/components/ProtectedRoute";
import Breadcrumb from "@/components/Breadcrumb";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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
          {/* Mobile Header */}
          <header className="lg:hidden flex items-center justify-between h-16 px-4 border-b border-border bg-card">
            <div className="flex items-center space-x-3">
              <MobileMenuButton onClick={() => setIsMobileMenuOpen(true)} />
              <h1 className="text-lg font-semibold text-foreground">SEO Tools</h1>
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