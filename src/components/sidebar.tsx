"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { BarChart3, CheckCircle, FileText, Globe, Home, Zap, LogOut, User, TrendingUp, Users } from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";
import { useAuth } from "@/contexts/AuthContext";
import { cn } from "@/lib/utils";

const navigation = [
  {
    name: "Dashboard",
    href: "/dashboard",
    icon: Home,
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

export function Sidebar() {
  const pathname = usePathname();
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
  };

  return (
    <div className="flex w-64 flex-col border-r border-border bg-card">
      {/* Header */}
      <div className="flex h-16 items-center border-b border-border px-6">
        <Link href="/" className="flex items-center space-x-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <BarChart3 className="h-5 w-5" />
          </div>
          <span className="text-lg font-semibold text-foreground">SEO Tools</span>
        </Link>
      </div>

      {/* User Info */}
      {user && (
        <div className="border-b border-border p-4">
          <div className="flex items-center space-x-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground">
              <User className="h-5 w-5" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-foreground truncate">{user.name}</p>
              <p className="text-xs text-muted-foreground truncate">{user.email}</p>
            </div>
          </div>
        </div>
      )}

      {/* Navigation */}
      <nav className="flex-1 space-y-1 p-4">
        {navigation.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "group flex items-center rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                isActive
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
              )}
            >
              <item.icon
                className={cn(
                  "mr-3 h-5 w-5",
                  isActive ? "text-primary-foreground" : "text-muted-foreground"
                )}
              />
              {item.name}
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="border-t border-border p-4 space-y-4">
        {/* Theme Toggle */}
        <div className="flex items-center justify-between">
          <div className="text-xs text-muted-foreground">
            Theme
          </div>
          <ThemeToggle />
        </div>

        {/* Logout Button */}
        <button
          onClick={handleLogout}
          className="w-full flex items-center justify-center rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-accent hover:text-accent-foreground transition-colors"
        >
          <LogOut className="mr-3 h-4 w-4" />
          Logout
        </button>
      </div>
    </div>
  );
} 