"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Globe, Download, Upload, CheckCircle, ArrowRight, Play, FileText } from "lucide-react";
import Link from "next/link";

export function SitemapGeneratorDemo() {
  const [showDemo, setShowDemo] = useState(false);


  const steps = [
    {
      title: "Enter Website URL",
      description: "Input your website URL to crawl",
      icon: Globe,
      color: "bg-blue-500"
    },
    {
      title: "Configure Settings",
      description: "Set crawl depth and file types",
      icon: FileText,
      color: "bg-green-500"
    },
    {
      title: "Generate Sitemap",
      description: "Create XML sitemap automatically",
      icon: Download,
      color: "bg-purple-500"
    },
    {
      title: "Submit to Search Engines",
      description: "Submit sitemap to Google & Bing",
      icon: Upload,
      color: "bg-orange-500"
    }
  ];

  return (
    <div className="max-w-6xl mx-auto">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-foreground mb-4">Sitemap Generator</h2>
        <p className="text-lg text-muted-foreground">
          Create and manage XML sitemaps to help search engines discover your content
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Sitemap Generator Demo */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-card border border-border rounded-xl p-6"
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-semibold text-foreground">Sitemap Generation Process</h3>
            <button
              onClick={() => setShowDemo(!showDemo)}
              className="flex items-center space-x-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
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

          {/* Interactive Sitemap Demo */}
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
                    <h4 className="font-semibold text-gray-900">Sitemap Generator</h4>
                    <p className="text-sm text-gray-600">Create XML sitemaps for your website</p>
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
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                        readOnly
                      />
                    </div>

                    {/* Settings */}
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 2 }}
                      className="space-y-2"
                    >
                      <div className="text-sm font-medium text-gray-700">Crawl Settings:</div>
                      <div className="grid grid-cols-2 gap-2">
                        <div className="flex items-center justify-between p-2 bg-gray-50 rounded">
                          <span className="text-sm">Max Depth:</span>
                          <span className="text-sm font-medium">3</span>
                        </div>
                        <div className="flex items-center justify-between p-2 bg-gray-50 rounded">
                          <span className="text-sm">Max Pages:</span>
                          <span className="text-sm font-medium">500</span>
                        </div>
                      </div>
                    </motion.div>

                    {/* Generation Progress */}
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 3 }}
                      className="space-y-2"
                    >
                      <div className="text-sm font-medium text-gray-700">Generating Sitemap...</div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: '100%' }}
                          transition={{ duration: 2, delay: 3.5 }}
                          className="bg-green-600 h-2 rounded-full"
                        />
                      </div>
                      <div className="text-xs text-gray-500 text-center">Found 24 pages</div>
                    </motion.div>

                    {/* Results */}
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 5.5 }}
                      className="space-y-2"
                    >
                      <div className="text-sm font-medium text-gray-700">Generated Files:</div>
                      <div className="space-y-1">
                        <div className="flex items-center space-x-2 p-2 bg-green-50 rounded">
                          <CheckCircle className="h-4 w-4 text-green-600" />
                          <span className="text-sm">sitemap.xml (24 URLs)</span>
                        </div>
                        <div className="flex items-center space-x-2 p-2 bg-blue-50 rounded">
                          <CheckCircle className="h-4 w-4 text-blue-600" />
                          <span className="text-sm">sitemap-index.xml</span>
                        </div>
                      </div>
                    </motion.div>

                    <motion.button
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 6 }}
                      className="w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700 transition-colors"
                    >
                      Download Sitemap
                    </motion.button>
                  </motion.div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Sitemap Features */}
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
                <Globe className="h-5 w-5 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <h4 className="font-medium text-foreground">Automatic Crawling</h4>
                <p className="text-sm text-muted-foreground mt-1">
                  Automatically discover and index all pages on your website with intelligent crawling.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="h-10 w-10 bg-green-100 dark:bg-green-900/20 rounded-lg flex items-center justify-center">
                <FileText className="h-5 w-5 text-green-600 dark:text-green-400" />
              </div>
              <div>
                <h4 className="font-medium text-foreground">Customizable Settings</h4>
                <p className="text-sm text-muted-foreground mt-1">
                  Configure crawl depth, file types, and exclusions to match your website structure.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="h-10 w-10 bg-purple-100 dark:bg-purple-900/20 rounded-lg flex items-center justify-center">
                <Download className="h-5 w-5 text-purple-600 dark:text-purple-400" />
              </div>
              <div>
                <h4 className="font-medium text-foreground">Multiple Formats</h4>
                <p className="text-sm text-muted-foreground mt-1">
                  Generate XML sitemaps, sitemap indexes, and compressed versions for better performance.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="h-10 w-10 bg-orange-100 dark:bg-orange-900/20 rounded-lg flex items-center justify-center">
                <Upload className="h-5 w-5 text-orange-600 dark:text-orange-400" />
              </div>
              <div>
                <h4 className="font-medium text-foreground">Search Engine Submission</h4>
                <p className="text-sm text-muted-foreground mt-1">
                  Submit your sitemap directly to Google Search Console and Bing Webmaster Tools.
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
          href="/dashboard/sitemap"
          className="inline-flex items-center space-x-2 bg-primary text-white px-6 py-3 rounded-lg hover:bg-primary/90 transition-colors"
        >
          <span>Try Sitemap Generator</span>
          <ArrowRight className="h-4 w-4" />
        </Link>
      </motion.div>
    </div>
  );
} 