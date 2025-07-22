"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BarChart3, FileText, Download, Share2, ArrowRight, Play, TrendingUp } from "lucide-react";
import Link from "next/link";

export function ReportsAnalyticsDemo() {
  const [showDemo, setShowDemo] = useState(false);

  const steps = [
    {
      title: "Select Report Type",
      description: "Choose from SEO, performance, or custom reports",
      icon: FileText,
      color: "bg-blue-500"
    },
    {
      title: "Configure Parameters",
      description: "Set date range, metrics, and filters",
      icon: BarChart3,
      color: "bg-green-500"
    },
    {
      title: "Generate Report",
      description: "Create comprehensive analysis and insights",
      icon: TrendingUp,
      color: "bg-purple-500"
    },
    {
      title: "Export & Share",
      description: "Download PDF or share with team",
      icon: Download,
      color: "bg-orange-500"
    }
  ];

  return (
    <div className="max-w-6xl mx-auto">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-foreground mb-4">Reports & Analytics</h2>
        <p className="text-lg text-muted-foreground">
          Generate comprehensive reports and analyze your SEO performance
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Reports & Analytics Demo */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-card border border-border rounded-xl p-6"
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-semibold text-foreground">Report Generation Process</h3>
            <button
              onClick={() => setShowDemo(!showDemo)}
              className="flex items-center space-x-2 bg-teal-600 text-white px-4 py-2 rounded-lg hover:bg-teal-700 transition-colors"
            >
              <Play className="h-4 w-4" />
              <span>{showDemo ? 'Stop' : 'Watch Demo'}</span>
            </button>
          </div>

          <div className="space-y-4">
            {steps.map((step, index) => (
              <div key={index} className="flex items-center space-x-3">
                <div className={`h-8 w-8 ${step.color} rounded-full flex items-center justify-center text-white text-sm font-medium`}>
                  {index + 1}
                </div>
                <div>
                  <h4 className="font-medium text-foreground">{step.title}</h4>
                  <p className="text-sm text-muted-foreground">{step.description}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Interactive Reports Demo */}
          <AnimatePresence>
            {showDemo && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="mt-6 p-4 bg-muted rounded-lg"
              >
                <div className="relative bg-white rounded-lg border p-4 max-w-md mx-auto">
                  <div className="text-center mb-4">
                    <h4 className="font-semibold text-gray-900">Reports & Analytics</h4>
                    <p className="text-sm text-gray-600">Generate comprehensive SEO reports</p>
                  </div>

                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="space-y-4"
                  >
                    {/* Report Type Selection */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Report Type</label>
                      <motion.select
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1 }}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                      >
                        <option>SEO Performance Report</option>
                        <option>Keyword Analysis Report</option>
                        <option>Competitor Analysis Report</option>
                        <option>Custom Report</option>
                      </motion.select>
                    </div>

                    {/* Date Range */}
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 2 }}
                      className="space-y-2"
                    >
                      <div className="text-sm font-medium text-gray-700">Date Range:</div>
                      <div className="grid grid-cols-2 gap-2">
                        <div className="flex items-center justify-between p-2 bg-gray-50 rounded">
                          <span className="text-sm">From:</span>
                          <span className="text-sm font-medium">Jan 1, 2024</span>
                        </div>
                        <div className="flex items-center justify-between p-2 bg-gray-50 rounded">
                          <span className="text-sm">To:</span>
                          <span className="text-sm font-medium">Dec 31, 2024</span>
                        </div>
                      </div>
                    </motion.div>

                    {/* Metrics Selection */}
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 3 }}
                      className="space-y-2"
                    >
                      <div className="text-sm font-medium text-gray-700">Include Metrics:</div>
                      <div className="space-y-1">
                        <div className="flex items-center space-x-2 p-2 bg-green-50 rounded">
                          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                          <span className="text-sm">Organic Traffic</span>
                        </div>
                        <div className="flex items-center space-x-2 p-2 bg-green-50 rounded">
                          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                          <span className="text-sm">Keyword Rankings</span>
                        </div>
                        <div className="flex items-center space-x-2 p-2 bg-green-50 rounded">
                          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                          <span className="text-sm">Backlink Analysis</span>
                        </div>
                        <div className="flex items-center space-x-2 p-2 bg-green-50 rounded">
                          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                          <span className="text-sm">Page Speed Metrics</span>
                        </div>
                      </div>
                    </motion.div>

                    {/* Report Generation */}
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 4 }}
                      className="space-y-2"
                    >
                      <div className="text-sm font-medium text-gray-700">Generating Report...</div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: '100%' }}
                          transition={{ duration: 2, delay: 4.5 }}
                          className="bg-teal-600 h-2 rounded-full"
                        />
                      </div>
                    </motion.div>

                    {/* Report Summary */}
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 6.5 }}
                      className="space-y-2"
                    >
                      <div className="text-sm font-medium text-gray-700">Report Summary:</div>
                      <div className="space-y-1">
                        <div className="flex items-center justify-between p-2 bg-blue-50 rounded">
                          <span className="text-sm">Pages Analyzed</span>
                          <span className="text-sm font-medium text-blue-600">24</span>
                        </div>
                        <div className="flex items-center justify-between p-2 bg-green-50 rounded">
                          <span className="text-sm">Keywords Tracked</span>
                          <span className="text-sm font-medium text-green-600">156</span>
                        </div>
                        <div className="flex items-center justify-between p-2 bg-purple-50 rounded">
                          <span className="text-sm">Issues Found</span>
                          <span className="text-sm font-medium text-purple-600">8</span>
                        </div>
                        <div className="flex items-center justify-between p-2 bg-orange-50 rounded">
                          <span className="text-sm">Recommendations</span>
                          <span className="text-sm font-medium text-orange-600">12</span>
                        </div>
                      </div>
                    </motion.div>

                    {/* Action Buttons */}
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 7.5 }}
                      className="flex space-x-2"
                    >
                      <button className="flex-1 bg-teal-600 text-white py-2 rounded-md hover:bg-teal-700 transition-colors flex items-center justify-center space-x-2">
                        <Download className="h-4 w-4" />
                        <span>Download PDF</span>
                      </button>
                      <button className="flex-1 bg-gray-600 text-white py-2 rounded-md hover:bg-gray-700 transition-colors flex items-center justify-center space-x-2">
                        <Share2 className="h-4 w-4" />
                        <span>Share</span>
                      </button>
                    </motion.div>
                  </motion.div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Reports & Analytics Features */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-card border border-border rounded-xl p-6"
        >
          <h3 className="text-xl font-semibold text-foreground mb-6">Key Features</h3>

          <div className="space-y-6">
            <div className="flex items-start space-x-4">
              <div className="h-10 w-10 bg-blue-100 dark:bg-blue-900/20 rounded-lg flex items-center justify-center">
                <FileText className="h-5 w-5 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <h4 className="font-medium text-foreground">Custom Report Builder</h4>
                <p className="text-sm text-muted-foreground mt-1">
                  Create personalized reports with the metrics and data that matter most to your business.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="h-10 w-10 bg-green-100 dark:bg-green-900/20 rounded-lg flex items-center justify-center">
                <BarChart3 className="h-5 w-5 text-green-600 dark:text-green-400" />
              </div>
              <div>
                <h4 className="font-medium text-foreground">Advanced Analytics</h4>
                <p className="text-sm text-muted-foreground mt-1">
                  Deep dive into performance trends, competitor comparisons, and actionable insights.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="h-10 w-10 bg-purple-100 dark:bg-purple-900/20 rounded-lg flex items-center justify-center">
                <TrendingUp className="h-5 w-5 text-purple-600 dark:text-purple-400" />
              </div>
              <div>
                <h4 className="font-medium text-foreground">Performance Tracking</h4>
                <p className="text-sm text-muted-foreground mt-1">
                  Monitor your SEO progress over time with historical data and trend analysis.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="h-10 w-10 bg-orange-100 dark:bg-orange-900/20 rounded-lg flex items-center justify-center">
                <Download className="h-5 w-5 text-orange-600 dark:text-orange-400" />
              </div>
              <div>
                <h4 className="font-medium text-foreground">Export & Sharing</h4>
                <p className="text-sm text-muted-foreground mt-1">
                  Export reports as PDF, CSV, or share them directly with your team and clients.
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
          href="/dashboard/reports"
          className="inline-flex items-center space-x-2 bg-primary text-white px-6 py-3 rounded-lg hover:bg-primary/90 transition-colors"
        >
          <span>Try Reports & Analytics</span>
          <ArrowRight className="h-4 w-4" />
        </Link>
      </motion.div>
    </div>
  );
} 