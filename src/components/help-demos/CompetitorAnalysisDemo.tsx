"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Users, Target, BarChart3, TrendingUp, ArrowRight, Play, Search } from "lucide-react";
import Link from "next/link";

export function CompetitorAnalysisDemo() {
  const [showDemo, setShowDemo] = useState(false);

  const steps = [
    {
      title: "Enter Your Domain",
      description: "Input your website URL",
      icon: Target,
      color: "bg-blue-500"
    },
    {
      title: "Add Competitors",
      description: "List competitor websites to analyze",
      icon: Users,
      color: "bg-green-500"
    },
    {
      title: "Run Analysis",
      description: "Compare SEO metrics and strategies",
      icon: Search,
      color: "bg-purple-500"
    },
    {
      title: "Get Insights",
      description: "Identify opportunities and gaps",
      icon: BarChart3,
      color: "bg-orange-500"
    }
  ];

  return (
    <div className="max-w-6xl mx-auto">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-foreground mb-4">Competitor Analysis</h2>
        <p className="text-lg text-muted-foreground">
          Analyze your competitors and identify opportunities to outperform them
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Competitor Analysis Demo */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-card border border-border rounded-xl p-6"
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-semibold text-foreground">Competitor Analysis Process</h3>
            <button
              onClick={() => setShowDemo(!showDemo)}
              className="flex items-center space-x-2 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors"
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

          {/* Interactive Competitor Analysis Demo */}
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
                    <h4 className="font-semibold text-gray-900">Competitor Analysis</h4>
                    <p className="text-sm text-gray-600">Compare your performance with competitors</p>
                  </div>

                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="space-y-4"
                  >
                    {/* Domain Input */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Your Domain</label>
                      <motion.input
                        initial={{ width: 0 }}
                        animate={{ width: '100%' }}
                        transition={{ duration: 1, delay: 1 }}
                        type="url"
                        placeholder="https://yoursite.com"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        readOnly
                      />
                    </div>

                    {/* Competitors */}
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 2 }}
                      className="space-y-2"
                    >
                      <div className="text-sm font-medium text-gray-700">Competitors:</div>
                      <div className="space-y-1">
                        <div className="flex items-center space-x-2 p-2 bg-gray-50 rounded">
                          <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                          <span className="text-sm">competitor1.com</span>
                        </div>
                        <div className="flex items-center space-x-2 p-2 bg-gray-50 rounded">
                          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                          <span className="text-sm">competitor2.com</span>
                        </div>
                        <div className="flex items-center space-x-2 p-2 bg-gray-50 rounded">
                          <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                          <span className="text-sm">competitor3.com</span>
                        </div>
                      </div>
                    </motion.div>

                    {/* Analysis Progress */}
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 3 }}
                      className="space-y-2"
                    >
                      <div className="text-sm font-medium text-gray-700">Analyzing competitors...</div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: '100%' }}
                          transition={{ duration: 2, delay: 3.5 }}
                          className="bg-indigo-600 h-2 rounded-full"
                        />
                      </div>
                    </motion.div>

                    {/* Comparison Results */}
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 5.5 }}
                      className="space-y-2"
                    >
                      <div className="text-sm font-medium text-gray-700">SEO Comparison:</div>
                      <div className="space-y-1">
                        <div className="flex items-center justify-between p-2 bg-blue-50 rounded">
                          <span className="text-sm">Domain Authority</span>
                          <div className="flex items-center space-x-2">
                            <span className="text-sm font-medium text-blue-600">45</span>
                            <span className="text-xs text-gray-500">vs 52 avg</span>
                          </div>
                        </div>
                        <div className="flex items-center justify-between p-2 bg-green-50 rounded">
                          <span className="text-sm">Backlinks</span>
                          <div className="flex items-center space-x-2">
                            <span className="text-sm font-medium text-green-600">1,234</span>
                            <span className="text-xs text-gray-500">vs 2,100 avg</span>
                          </div>
                        </div>
                        <div className="flex items-center justify-between p-2 bg-yellow-50 rounded">
                          <span className="text-sm">Organic Keywords</span>
                          <div className="flex items-center space-x-2">
                            <span className="text-sm font-medium text-yellow-600">156</span>
                            <span className="text-xs text-gray-500">vs 320 avg</span>
                          </div>
                        </div>
                      </div>
                    </motion.div>

                    {/* Opportunities */}
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 6.5 }}
                      className="space-y-2"
                    >
                      <div className="text-sm font-medium text-gray-700">Opportunities:</div>
                      <div className="space-y-1">
                        <div className="flex items-center space-x-2 p-2 bg-green-50 rounded">
                          <TrendingUp className="h-4 w-4 text-green-600" />
                          <span className="text-sm">Target 15 low-competition keywords</span>
                        </div>
                        <div className="flex items-center space-x-2 p-2 bg-green-50 rounded">
                          <TrendingUp className="h-4 w-4 text-green-600" />
                          <span className="text-sm">Build 50 quality backlinks</span>
                        </div>
                        <div className="flex items-center space-x-2 p-2 bg-green-50 rounded">
                          <TrendingUp className="h-4 w-4 text-green-600" />
                          <span className="text-sm">Improve content quality score</span>
                        </div>
                      </div>
                    </motion.div>

                    <motion.button
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 7.5 }}
                      className="w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700 transition-colors"
                    >
                      View Full Analysis
                    </motion.button>
                  </motion.div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Competitor Analysis Features */}
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
                <Users className="h-5 w-5 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <h4 className="font-medium text-foreground">Competitor Discovery</h4>
                <p className="text-sm text-muted-foreground mt-1">
                  Automatically identify your top competitors based on keywords and market overlap.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="h-10 w-10 bg-green-100 dark:bg-green-900/20 rounded-lg flex items-center justify-center">
                <Search className="h-5 w-5 text-green-600 dark:text-green-400" />
              </div>
              <div>
                <h4 className="font-medium text-foreground">Comprehensive Analysis</h4>
                <p className="text-sm text-muted-foreground mt-1">
                  Compare domain authority, backlinks, organic keywords, and content strategies.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="h-10 w-10 bg-purple-100 dark:bg-purple-900/20 rounded-lg flex items-center justify-center">
                <BarChart3 className="h-5 w-5 text-purple-600 dark:text-purple-400" />
              </div>
              <div>
                <h4 className="font-medium text-foreground">Gap Analysis</h4>
                <p className="text-sm text-muted-foreground mt-1">
                  Identify keyword gaps and content opportunities that your competitors are missing.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="h-10 w-10 bg-orange-100 dark:bg-orange-900/20 rounded-lg flex items-center justify-center">
                <TrendingUp className="h-5 w-5 text-orange-600 dark:text-orange-400" />
              </div>
              <div>
                <h4 className="font-medium text-foreground">Actionable Insights</h4>
                <p className="text-sm text-muted-foreground mt-1">
                  Get specific recommendations to outperform competitors and capture market share.
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
          href="/dashboard/competitor-analysis"
          className="inline-flex items-center space-x-2 bg-primary text-white px-6 py-3 rounded-lg hover:bg-primary/90 transition-colors"
        >
          <span>Try Competitor Analysis</span>
          <ArrowRight className="h-4 w-4" />
        </Link>
      </motion.div>
    </div>
  );
} 