"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { User, Settings, LogOut, ChevronDown } from "lucide-react";
import { useAuth } from "@/entities/user";
import { motion, AnimatePresence } from "framer-motion";

export function UserDropdown() {
  const { user, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Handle click outside to close dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const handleLogout = async () => {
    try {
      await logout();
      setIsOpen(false);
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  // Get user initials for avatar fallback
  const getUserInitials = (name: string) => {
    return name
      .split(' ')
      .map(word => word.charAt(0))
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  // Get display name
  const getDisplayName = () => {
    if (user?.firstName && user?.lastName) {
      return `${user.firstName} ${user.lastName}`;
    }
    return user?.name || 'User';
  };

  // Get user avatar or fallback
  const getUserAvatar = () => {
    if (!user?.avatar) {
      return null;
    }

    let avatarUrl = null;

    // Handle different avatar URL formats
    if (user.avatar.startsWith('http')) {
      avatarUrl = user.avatar; // External URL
    } else if (user.avatar.startsWith('/uploads/avatars/')) {
      // Local avatar - construct API URL
      const filename = user.avatar.split('/').pop();
      avatarUrl = `/api/user/avatar/${filename}`;
    } else if (user.avatar) {
      // Assume it's a filename
      avatarUrl = `/api/user/avatar/${user.avatar}`;
    }

    return avatarUrl;
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 px-3 py-2 text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
      >
        {/* User Avatar */}
        <div className="flex items-center space-x-2">
          {getUserAvatar() ? (
            <Image
              src={getUserAvatar()}
              alt={user?.name || 'User'}
              width={32}
              height={32}
              className="h-8 w-8 rounded-full object-cover border-2 border-gray-200 dark:border-slate-600"
              onError={(e) => {
                console.error('Failed to load avatar:', getUserAvatar());
                // Hide the image and show the default user icon
                e.currentTarget.style.display = 'none';
                e.currentTarget.nextElementSibling?.classList.remove('hidden');
              }}
            />
          ) : null}
          <div className={`h-8 w-8 rounded-full bg-blue-600 text-white flex items-center justify-center text-sm font-medium border-2 border-blue-500 ${getUserAvatar() ? 'hidden' : ''}`}>
            {user?.name ? getUserInitials(user.name) : 'U'}
          </div>
        </div>

        {/* User Name */}
        <div className="hidden sm:block text-left">
          <div className="text-sm font-medium text-gray-900 dark:text-white">
            {getDisplayName()}
          </div>
          <div className="text-xs text-gray-500 dark:text-gray-400">
            {user?.email}
          </div>
        </div>

        <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            className="absolute right-0 top-full mt-2 w-64 bg-white dark:bg-slate-900 rounded-lg shadow-lg border border-gray-200 dark:border-slate-700 py-2 z-50"
          >
            {/* User Info Section */}
            <div className="px-4 py-3 border-b border-gray-200 dark:border-slate-700">
              <div className="flex items-center space-x-3">
                {getUserAvatar() ? (
                  <Image
                    src={getUserAvatar()}
                    alt={user?.name || 'User'}
                    width={40}
                    height={40}
                    className="h-10 w-10 rounded-full object-cover border-2 border-gray-200 dark:border-slate-600"
                    onError={(e) => {
                      console.error('Failed to load avatar in dropdown:', getUserAvatar());
                      // Hide the image and show the default user icon
                      e.currentTarget.style.display = 'none';
                      e.currentTarget.nextElementSibling?.classList.remove('hidden');
                    }}
                  />
                ) : null}
                <div className={`h-10 w-10 rounded-full bg-blue-600 text-white flex items-center justify-center text-sm font-medium border-2 border-blue-500 ${getUserAvatar() ? 'hidden' : ''}`}>
                  {user?.name ? getUserInitials(user.name) : 'U'}
                </div>

                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                    {getDisplayName()}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                    {user?.email}
                  </p>
                </div>
              </div>
            </div>

            {/* Navigation Items */}
            <div className="py-1">
              <Link
                href="/dashboard"
                onClick={() => setIsOpen(false)}
                className="flex items-center space-x-3 px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-800 transition-colors"
              >
                <User className="h-4 w-4" />
                <span>Dashboard</span>
              </Link>

              <Link
                href="/dashboard/profile"
                onClick={() => setIsOpen(false)}
                className="flex items-center space-x-3 px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-800 transition-colors"
              >
                <User className="h-4 w-4" />
                <span>Profile</span>
              </Link>

              <Link
                href="/dashboard/settings"
                onClick={() => setIsOpen(false)}
                className="flex items-center space-x-3 px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-800 transition-colors"
              >
                <Settings className="h-4 w-4" />
                <span>Settings</span>
              </Link>

              <div className="border-t border-gray-200 dark:border-slate-700 my-1" />

              <button
                onClick={handleLogout}
                className="w-full flex items-center space-x-3 px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
              >
                <LogOut className="h-4 w-4" />
                <span>Sign Out</span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
} 