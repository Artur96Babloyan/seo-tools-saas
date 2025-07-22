"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BarChart3, Play, ArrowRight, FileText, Search, TrendingUp, Activity, Settings } from "lucide-react";
import Link from "next/link";

export function DashboardDemo() {
  const [showDashboardDemo, setShowDashboardDemo] = useState(false);

  return (
    <motion.div
      key="dashboard"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.5 }}
      className="max-w-6xl mx-auto"
    >
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-foreground mb-4">Dashboard Overview</h2>
        <p className="text-lg text-muted-foreground">
          Learn how to navigate and use your AuditCraft dashboard effectively
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Dashboard Demo */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-card border border-border rounded-xl p-6"
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-semibold text-foreground">Dashboard Interface</h3>
            <button
              onClick={() => setShowDashboardDemo(!showDashboardDemo)}
              className="flex items-center space-x-2 bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors"
            >
              <Play className="h-4 w-4" />
              <span>{showDashboardDemo ? 'Stop' : 'Watch Demo'}</span>
            </button>
          </div>

          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="h-8 w-8 bg-purple-500 rounded-full flex items-center justify-center text-white text-sm font-medium">1</div>
              <div>
                <h4 className="font-medium text-foreground">Overview Cards</h4>
                <p className="text-sm text-muted-foreground">Quick stats and recent activity</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <div className="h-8 w-8 bg-purple-500 rounded-full flex items-center justify-center text-white text-sm font-medium">2</div>
              <div>
                <h4 className="font-medium text-foreground">Navigation Menu</h4>
                <p className="text-sm text-muted-foreground">Access all tools and features</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <div className="h-8 w-8 bg-purple-500 rounded-full flex items-center justify-center text-white text-sm font-medium">3</div>
              <div>
                <h4 className="font-medium text-foreground">Quick Actions</h4>
                <p className="text-sm text-muted-foreground">Start new analyses and reports</p>
              </div>
            </div>
          </div>

          {/* Interactive Dashboard Demo */}
          <AnimatePresence>
            {showDashboardDemo && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="mt-6 p-4 bg-muted rounded-lg"
              >
                <div className="relative bg-white rounded-lg border p-4 max-w-md mx-auto">
                  <div className="text-center mb-4">
                    <h4 className="font-semibold text-gray-900">AuditCraft Dashboard</h4>
                    <p className="text-sm text-gray-600">Welcome to your SEO command center</p>
                  </div>

                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="space-y-4"
                  >
                    {/* Stats Cards */}
                    <div className="grid grid-cols-2 gap-3">
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 1 }}
                        className="bg-blue-50 p-3 rounded-lg text-center"
                      >
                        <div className="text-2xl font-bold text-blue-600">24</div>
                        <div className="text-xs text-blue-600">Analyses</div>
                      </motion.div>
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 1.2 }}
                        className="bg-green-50 p-3 rounded-lg text-center"
                      >
                        <div className="text-2xl font-bold text-green-600">156</div>
                        <div className="text-xs text-green-600">Keywords</div>
                      </motion.div>
                    </div>

                    {/* Quick Actions */}
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 1.5 }}
                      className="space-y-2"
                    >
                      <div className="flex items-center space-x-2 p-2 bg-gray-50 rounded">
                        <FileText className="h-4 w-4 text-blue-600" />
                        <span className="text-sm">AI Content Optimizer</span>
                      </div>
                      <div className="flex items-center space-x-2 p-2 bg-gray-50 rounded">
                        <Search className="h-4 w-4 text-green-600" />
                        <span className="text-sm">SERP Optimizer</span>
                      </div>
                      <div className="flex items-center space-x-2 p-2 bg-gray-50 rounded">
                        <TrendingUp className="h-4 w-4 text-purple-600" />
                        <span className="text-sm">Keyword Tracker</span>
                      </div>
                    </motion.div>
                  </motion.div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Dashboard Features */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-card border border-border rounded-xl p-6"
        >
          <h3 className="text-xl font-semibold text-foreground mb-6">Key Dashboard Features</h3>

          <div className="space-y-6">
            <div className="flex items-start space-x-4">
              <div className="h-10 w-10 bg-blue-100 dark:bg-blue-900/20 rounded-lg flex items-center justify-center">
                <BarChart3 className="h-5 w-5 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <h4 className="font-medium text-foreground">Analytics Overview</h4>
                <p className="text-sm text-muted-foreground mt-1">
                  View your website&apos;s performance metrics, keyword rankings, and SEO health at a glance.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="h-10 w-10 bg-green-100 dark:bg-green-900/20 rounded-lg flex items-center justify-center">
                <Activity className="h-5 w-5 text-green-600 dark:text-green-400" />
              </div>
              <div>
                <h4 className="font-medium text-foreground">Quick Actions</h4>
                <p className="text-sm text-muted-foreground mt-1">
                  Start new analyses, generate reports, and access your most-used tools instantly.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="h-10 w-10 bg-purple-100 dark:bg-purple-900/20 rounded-lg flex items-center justify-center">
                <Activity className="h-5 w-5 text-purple-600 dark:text-purple-400" />
              </div>
              <div>
                <h4 className="font-medium text-foreground">Recent Activity</h4>
                <p className="text-sm text-muted-foreground mt-1">
                  Track your latest analyses, optimizations, and important updates.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="h-10 w-10 bg-orange-100 dark:bg-orange-900/20 rounded-lg flex items-center justify-center">
                <Settings className="h-5 w-5 text-orange-600 dark:text-orange-400" />
              </div>
              <div>
                <h4 className="font-medium text-foreground">Account Settings</h4>
                <p className="text-sm text-muted-foreground mt-1">
                  Manage your profile, preferences, and subscription settings.
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="text-center mt-12"
      >
        <Link
          href="/dashboard"
          className="inline-flex items-center space-x-2 bg-primary text-white px-6 py-3 rounded-lg hover:bg-primary/90 transition-colors"
        >
          <span>Go to Dashboard</span>
          <ArrowRight className="h-4 w-4" />
        </Link>
      </motion.div>
    </motion.div>
  );
} 