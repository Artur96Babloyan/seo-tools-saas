"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle, AlertCircle, FileText, Eye, ArrowRight, Play, Settings } from "lucide-react";
import Link from "next/link";

export function MetaTagValidatorDemo() {
  const [showDemo, setShowDemo] = useState(false);

  const steps = [
    {
      title: "Enter URL or HTML",
      description: "Input website URL or paste HTML code",
      icon: FileText,
      color: "bg-blue-500"
    },
    {
      title: "Analyze Meta Tags",
      description: "Scan for title, description, and other meta tags",
      icon: Eye,
      color: "bg-green-500"
    },
    {
      title: "Validate SEO Elements",
      description: "Check Open Graph, Twitter Cards, and structured data",
      icon: CheckCircle,
      color: "bg-purple-500"
    },
    {
      title: "Get Recommendations",
      description: "Receive suggestions for improvement",
      icon: Settings,
      color: "bg-orange-500"
    }
  ];

  return (
    <div className="max-w-6xl mx-auto">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-foreground mb-4">Meta Tag Validator</h2>
        <p className="text-lg text-muted-foreground">
          Validate and optimize your meta tags for better search engine visibility
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Meta Tag Validator Demo */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-card border border-border rounded-xl p-6"
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-semibold text-foreground">Meta Tag Validation Process</h3>
            <button
              onClick={() => setShowDemo(!showDemo)}
              className="flex items-center space-x-2 bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors"
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

          {/* Interactive Meta Tag Demo */}
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
                    <h4 className="font-semibold text-gray-900">Meta Tag Validator</h4>
                    <p className="text-sm text-gray-600">Analyze your page&apos;s meta tags</p>
                  </div>

                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="space-y-4"
                  >
                    {/* URL Input */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Website URL</label>
                      <motion.input
                        initial={{ width: 0 }}
                        animate={{ width: '100%' }}
                        transition={{ duration: 1, delay: 1 }}
                        type="url"
                        placeholder="https://example.com"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                        readOnly
                      />
                    </div>

                    {/* Analysis Progress */}
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 2 }}
                      className="space-y-2"
                    >
                      <div className="text-sm font-medium text-gray-700">Analyzing meta tags...</div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: '100%' }}
                          transition={{ duration: 1.5, delay: 2.5 }}
                          className="bg-purple-600 h-2 rounded-full"
                        />
                      </div>
                    </motion.div>

                    {/* Meta Tag Results */}
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 4 }}
                      className="space-y-2"
                    >
                      <div className="text-sm font-medium text-gray-700">Meta Tag Analysis:</div>
                      <div className="space-y-1">
                        <div className="flex items-center space-x-2 p-2 bg-green-50 rounded">
                          <CheckCircle className="h-4 w-4 text-green-600" />
                          <span className="text-sm">Title tag: ✓ Good length (45 chars)</span>
                        </div>
                        <div className="flex items-center space-x-2 p-2 bg-green-50 rounded">
                          <CheckCircle className="h-4 w-4 text-green-600" />
                          <span className="text-sm">Meta description: ✓ Optimal (155 chars)</span>
                        </div>
                        <div className="flex items-center space-x-2 p-2 bg-yellow-50 rounded">
                          <AlertCircle className="h-4 w-4 text-yellow-600" />
                          <span className="text-sm">Open Graph: ⚠ Missing og:image</span>
                        </div>
                        <div className="flex items-center space-x-2 p-2 bg-red-50 rounded">
                          <AlertCircle className="h-4 w-4 text-red-600" />
                          <span className="text-sm">Twitter Cards: ✗ Not implemented</span>
                        </div>
                      </div>
                    </motion.div>

                    {/* Recommendations */}
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 5 }}
                      className="space-y-2"
                    >
                      <div className="text-sm font-medium text-gray-700">Recommendations:</div>
                      <div className="space-y-1">
                        <div className="flex items-center space-x-2 p-2 bg-blue-50 rounded">
                          <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                          <span className="text-sm">Add Open Graph image (1200x630px)</span>
                        </div>
                        <div className="flex items-center space-x-2 p-2 bg-blue-50 rounded">
                          <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                          <span className="text-sm">Implement Twitter Card meta tags</span>
                        </div>
                        <div className="flex items-center space-x-2 p-2 bg-blue-50 rounded">
                          <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                          <span className="text-sm">Add structured data markup</span>
                        </div>
                      </div>
                    </motion.div>

                    <motion.button
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 6 }}
                      className="w-full bg-purple-600 text-white py-2 rounded-md hover:bg-purple-700 transition-colors"
                    >
                      Generate Full Report
                    </motion.button>
                  </motion.div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Meta Tag Features */}
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
                <h4 className="font-medium text-foreground">Comprehensive Analysis</h4>
                <p className="text-sm text-muted-foreground mt-1">
                  Analyze title tags, meta descriptions, Open Graph tags, Twitter Cards, and structured data.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="h-10 w-10 bg-green-100 dark:bg-green-900/20 rounded-lg flex items-center justify-center">
                <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400" />
              </div>
              <div>
                <h4 className="font-medium text-foreground">SEO Validation</h4>
                <p className="text-sm text-muted-foreground mt-1">
                  Check character limits, keyword usage, and best practices for optimal search engine visibility.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="h-10 w-10 bg-purple-100 dark:bg-purple-900/20 rounded-lg flex items-center justify-center">
                <Eye className="h-5 w-5 text-purple-600 dark:text-purple-400" />
              </div>
              <div>
                <h4 className="font-medium text-foreground">Social Media Preview</h4>
                <p className="text-sm text-muted-foreground mt-1">
                  Preview how your content will appear when shared on Facebook, Twitter, and other platforms.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="h-10 w-10 bg-orange-100 dark:bg-orange-900/20 rounded-lg flex items-center justify-center">
                <Settings className="h-5 w-5 text-orange-600 dark:text-orange-400" />
              </div>
              <div>
                <h4 className="font-medium text-foreground">Actionable Recommendations</h4>
                <p className="text-sm text-muted-foreground mt-1">
                  Get specific suggestions for improving your meta tags and increasing click-through rates.
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
          href="/dashboard/meta-tags"
          className="inline-flex items-center space-x-2 bg-primary text-white px-6 py-3 rounded-lg hover:bg-primary/90 transition-colors"
        >
          <span>Try Meta Tag Validator</span>
          <ArrowRight className="h-4 w-4" />
        </Link>
      </motion.div>
    </div>
  );
} 