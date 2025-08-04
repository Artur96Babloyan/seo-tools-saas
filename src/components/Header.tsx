"use client";

import Link from "next/link";
import Image from "next/image";
import { BarChart3, CheckCircle, Globe, Zap, TrendingUp, Users, Sparkles, Menu, X, FileText, Search, HelpCircle, Activity, MessageSquare, Info, Shield, Phone, User, LogOut, Settings } from "lucide-react";
import { ThemeToggle } from "@/shared/ui/theme";
import { useState, useEffect, useRef } from "react";
import { useAuth } from "@/entities/user";
import { UserDropdown } from "./UserDropdown";

const navigation = [
  {
    name: "Dashboard",
    href: "/dashboard",
    icon: BarChart3,
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

const footerNavigation = [
  {
    name: "Help Center",
    href: "/help",
    icon: HelpCircle,
  },
  {
    name: "System Status",
    href: "/status",
    icon: Activity,
  },
  {
    name: "Feedback",
    href: "/feedback",
    icon: MessageSquare,
  },
  {
    name: "About",
    href: "/about",
    icon: Info,
  },
  {
    name: "Contact",
    href: "/contact",
    icon: Phone,
  },
  {
    name: "Privacy",
    href: "/privacy",
    icon: Shield,
  },
  {
    name: "Terms",
    href: "/terms",
    icon: FileText,
  },
];



interface HeaderProps {
  showAuthButtons?: boolean;
  className?: string;
}

export function Header({ showAuthButtons = true, className = "" }: HeaderProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const { isAuthenticated, user, logout } = useAuth();

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

  // Handle outside clicks
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (mobileMenuRef.current && !mobileMenuRef.current.contains(event.target as Node)) {
        setIsMobileMenuOpen(false);
      }
    };

    if (isMobileMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isMobileMenuOpen]);

  const mobileMenuContent = (
    <div className="flex flex-col h-full">
      {/* Mobile Header */}
      <div className="flex-shrink-0 flex items-center justify-between h-16 px-6 border-b border-border bg-background">
        <div className="flex items-center space-x-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-white">
            <BarChart3 className="h-5 w-5" />
          </div>
          <span className="text-xl font-bold text-foreground">AuditCraft</span>
        </div>
        <button
          onClick={() => setIsMobileMenuOpen(false)}
          className="p-2 text-muted-foreground hover:text-foreground hover:bg-accent rounded-lg transition-colors"
        >
          <X className="h-5 w-5" />
        </button>
      </div>

      {/* Mobile Navigation - Scrollable Content */}
      <div className="flex-1 overflow-y-auto bg-background">
        <div className="py-4">
          {/* SEO Tools Section */}
          <div className="px-3 mb-6">
            <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">SEO Tools</h3>
            <ul className="space-y-1">
              {navigation.map((item) => {
                const Icon = item.icon;
                return (
                  <li key={item.name}>
                    <Link
                      href={item.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="flex items-center space-x-3 px-3 py-3 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-accent rounded-lg transition-colors"
                    >
                      <Icon className="h-5 w-5" />
                      <span>{item.name}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Support & Info Section */}
          <div className="px-3 mb-6">
            <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">Support & Info</h3>
            <ul className="space-y-1">
              {footerNavigation.map((item) => {
                const Icon = item.icon;
                return (
                  <li key={item.name}>
                    <Link
                      href={item.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="flex items-center space-x-3 px-3 py-3 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-accent rounded-lg transition-colors"
                    >
                      <Icon className="h-5 w-5" />
                      <span>{item.name}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* User Navigation Section - Only for authenticated users */}
          {isAuthenticated && (
            <div className="px-3 mb-6">
              <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">Account</h3>
              <ul className="space-y-1">
                <li>
                  <Link
                    href="/dashboard"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex items-center space-x-3 px-3 py-3 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-accent rounded-lg transition-colors"
                  >
                    <User className="h-5 w-5" />
                    <span>Dashboard</span>
                  </Link>
                </li>
                <li>
                  <Link
                    href="/dashboard/profile"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex items-center space-x-3 px-3 py-3 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-accent rounded-lg transition-colors"
                  >
                    <User className="h-5 w-5" />
                    <span>Profile</span>
                  </Link>
                </li>
                <li>
                  <Link
                    href="/dashboard/settings"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex items-center space-x-3 px-3 py-3 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-accent rounded-lg transition-colors"
                  >
                    <Settings className="h-5 w-5" />
                    <span>Settings</span>
                  </Link>
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>

      {/* Mobile Footer - Fixed at Bottom */}
      <div className="flex-shrink-0 border-t border-border p-4 space-y-4 bg-background">
        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">Theme</span>
          <ThemeToggle />
        </div>

        {showAuthButtons && (
          <div className="space-y-2">
            {isAuthenticated ? (
              <>
                {/* User Info */}
                <div className="flex items-center space-x-3 px-3 py-3 text-sm font-medium text-muted-foreground">
                  {user?.avatar ? (
                    <Image
                      src={user.avatar.startsWith('http') ? user.avatar :
                        user.avatar.startsWith('/uploads/avatars/') ?
                          `/api/user/avatar/${user.avatar.split('/').pop()}` :
                          `/api/user/avatar/${user.avatar}`}
                      alt={user?.name || 'User'}
                      width={32}
                      height={32}
                      className="h-8 w-8 rounded-full object-cover border-2 border-border"
                      onError={(e) => {
                        console.error('Failed to load avatar in mobile menu:', user.avatar);
                        // Hide the image and show the default user icon
                        e.currentTarget.style.display = 'none';
                        e.currentTarget.nextElementSibling?.classList.remove('hidden');
                      }}
                    />
                  ) : null}
                  <div className={`h-8 w-8 rounded-full bg-primary text-white flex items-center justify-center text-sm font-medium border-2 border-primary ${user?.avatar ? 'hidden' : ''}`}>
                    {user?.name ? user.name.split(' ').map(word => word.charAt(0)).join('').toUpperCase().slice(0, 2) : 'U'}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium text-foreground truncate">
                      {user?.name || 'User'}
                    </div>
                    <div className="text-xs text-muted-foreground truncate">
                      {user?.email}
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => {
                    logout();
                    setIsMobileMenuOpen(false);
                  }}
                  className="flex items-center w-full px-3 py-3 text-sm font-medium text-destructive hover:text-destructive-foreground hover:bg-destructive/10 rounded-lg transition-colors"
                >
                  <LogOut className="h-5 w-5 mr-3" />
                  Sign Out
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/auth/login"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center px-3 py-3 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-accent rounded-lg transition-colors"
                >
                  Sign In
                </Link>
                <Link
                  href="/auth/register"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center justify-center px-3 py-3 text-sm font-medium bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors"
                >
                  Get Started
                </Link>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );

  return (
    <header className={`border-b border-border bg-background/95 backdrop-blur-md sticky top-0 z-50 shadow-sm ${className}`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 lg:h-20 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 hover:opacity-80 transition-opacity">
            <div className="flex h-8 w-8 lg:h-10 lg:w-10 items-center justify-center rounded-lg bg-primary text-white">
              <BarChart3 className="h-5 w-5 lg:h-6 lg:w-6" />
            </div>
            <span className="text-lg sm:text-xl lg:text-2xl font-bold text-foreground">AuditCraft</span>
          </Link>

          {/* Desktop Navigation - Main Tools */}
          <nav className="hidden lg:flex items-center space-x-1">
            <div className="flex items-center space-x-1">
              {navigation.slice(0, 4).map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="flex items-center space-x-2 px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-accent rounded-lg transition-colors"
                >
                  <item.icon className="h-4 w-4" />
                  <span className="hidden xl:inline">{item.name}</span>
                </Link>
              ))}
            </div>

            {/* Dropdown for additional tools */}
            <div className="relative group">
              <button className="flex items-center space-x-2 px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-accent rounded-lg transition-colors">
                <span>More Tools</span>
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              <div className="absolute top-full left-0 mt-1 w-64 bg-card border border-border rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                <div className="py-2">
                  {navigation.slice(4).map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      className="flex items-center space-x-3 px-4 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
                    >
                      <item.icon className="h-4 w-4" />
                      <span>{item.name}</span>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </nav>

          {/* Right side actions */}
          <div className="flex items-center space-x-2 lg:space-x-4">
            {/* Desktop auth buttons */}
            {showAuthButtons && (
              <div className="hidden lg:flex items-center space-x-3">
                {isAuthenticated ? (
                  <UserDropdown />
                ) : (
                  <>
                    <Link
                      href="/auth/login"
                      className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                    >
                      Sign In
                    </Link>
                    <Link
                      href="/auth/register"
                      className="inline-flex items-center justify-center rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white shadow-sm transition-colors hover:bg-primary-dark"
                    >
                      Get Started
                    </Link>
                  </>
                )}
              </div>
            )}

            <ThemeToggle />

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className="lg:hidden p-2 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
              aria-label="Open mobile menu"
            >
              <Menu className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu - Smooth Animation */}
      <div className={`fixed inset-0 z-[100] lg:hidden transition-opacity duration-300 ${isMobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
        {/* Backdrop */}
        <div
          className="absolute inset-0 bg-black/50 backdrop-blur-sm"
          onClick={() => setIsMobileMenuOpen(false)}
        />

        {/* Mobile Menu */}
        <div
          className={`absolute right-0 top-0 h-[100vh] w-80 max-w-[85vw] bg-white dark:bg-slate-900 border-l border-gray-200 dark:border-slate-700 shadow-2xl flex flex-col transition-transform duration-300 ease-out ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}
          ref={mobileMenuRef}
        >
          {mobileMenuContent}
        </div>
      </div>
    </header>
  );
} 