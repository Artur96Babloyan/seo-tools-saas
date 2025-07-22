"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import { BarChart3, CheckCircle, FileText, Globe, Home, Zap, TrendingUp, Users, Menu, X, Sparkles, Search } from "lucide-react";
import { ThemeToggle } from "@/shared/ui/theme";

import { cn } from "@/shared/lib/utils";

const navigation = [
  {
    name: "Dashboard",
    href: "/dashboard",
    icon: Home,
  },
  {
    name: "AI Content Optimizer",
    href: "/dashboard/seo-optimizer",
    icon: Sparkles,
  },
  {
    name: "SERP Optimizer",
    href: "/dashboard/serp-optimizer",
    icon: Search,
  },
  {
    name: "Sitemap Generator",
    href: "/dashboard/sitemap",
    icon: Globe,
  },
  {
    name: "Meta Tag Validator",
    href: "/dashboard/meta-tags",
    icon: CheckCircle,
  },
  {
    name: "Page Speed Auditor",
    href: "/dashboard/page-speed",
    icon: Zap,
  },
  {
    name: "Keyword Tracker",
    href: "/dashboard/keyword-tracker",
    icon: TrendingUp,
  },
  {
    name: "Competitor Analysis",
    href: "/dashboard/competitor-analysis",
    icon: Users,
  },
  {
    name: "Reports",
    href: "/dashboard/reports",
    icon: FileText,
  },
];

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export function Sidebar({ isOpen, onClose }: SidebarProps) {
  const pathname = usePathname();
  const [animationState, setAnimationState] = useState<'closed' | 'opening' | 'open' | 'closing'>('closed');
  const previousPathnameRef = useRef(pathname);

  // Handle animation states
  useEffect(() => {
    if (isOpen && animationState === 'closed') {
      setAnimationState('opening');
      setTimeout(() => setAnimationState('open'), 400); // Slightly longer for smoother feel
    } else if (!isOpen && (animationState === 'open' || animationState === 'opening')) {
      setAnimationState('closing');
      setTimeout(() => setAnimationState('closed'), 400); // Match opening duration
    }
  }, [isOpen, animationState]);

  // Close when navigating to a different page (only track actual pathname changes)
  useEffect(() => {
    if (previousPathnameRef.current !== pathname && isOpen) {
      onClose();
    }
    previousPathnameRef.current = pathname;
  }, [pathname, onClose, isOpen]);



  const sidebarContent = (
    <>
      {/* Header */}
      <div className="flex items-center justify-between h-16 px-6 border-b border-border">
        <div className="flex items-center space-x-2">
          <BarChart3 className="h-8 w-8 text-primary" />
          <span className="text-xl font-bold text-foreground">AuditCraft</span>
        </div>
        {/* Close button for mobile */}
        <button
          onClick={onClose}
          className="lg:hidden p-2 text-muted-foreground hover:text-foreground hover:bg-accent rounded-lg transition-colors"
        >
          <X className="h-5 w-5" />
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto py-4">
        <ul className="space-y-1 px-3">
          {navigation.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <li key={item.name}>
                <Link
                  href={item.href}
                  className={cn(
                    "flex items-center space-x-3 px-3 py-2 text-sm font-medium rounded-lg transition-colors",
                    isActive
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:text-foreground hover:bg-accent"
                  )}
                >
                  <Icon className="h-5 w-5" />
                  <span>{item.name}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>



      {/* Footer */}
      <div className="border-t border-border p-4">
        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">Theme</span>
          <ThemeToggle />
        </div>
      </div>
    </>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <div className="hidden lg:flex w-64 flex-col border-r border-border bg-card">
        {sidebarContent}
      </div>

      {/* Mobile Sidebar - Smooth Animation Implementation */}
      {animationState !== 'closed' && (
        <div className="fixed inset-0 z-[100] lg:hidden">
          {/* Backdrop */}
          <div
            className={`absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity duration-500 ease-out ${animationState === 'closing' ? 'opacity-0' : 'opacity-100'
              }`}
            onClick={onClose}
          />

          {/* Sidebar */}
          <div
            className={`absolute left-0 top-0 bottom-0 w-64 bg-card border-r border-border shadow-2xl flex flex-col transition-transform duration-500 ease-out ${animationState === 'opening' || animationState === 'open'
              ? 'translate-x-0'
              : '-translate-x-full'
              }`}
            style={{
              animation: animationState === 'opening'
                ? 'slideInFromLeft 0.4s ease-out forwards'
                : animationState === 'closing'
                  ? 'slideOutToLeft 0.4s ease-out forwards'
                  : 'none'
            }}
          >
            {sidebarContent}
          </div>
        </div>
      )}
    </>
  );
}

export function MobileMenuButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="lg:hidden p-2 text-muted-foreground hover:text-foreground hover:bg-accent rounded-lg transition-colors"
      type="button"
    >
      <Menu className="h-5 w-5" />
    </button>
  );
} 