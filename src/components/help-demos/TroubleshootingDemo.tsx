"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HelpCircle, Search, CheckCircle, AlertTriangle, ArrowRight, Play, MessageCircle } from "lucide-react";
import Link from "next/link";

export function TroubleshootingDemo() {
  const [showDemo, setShowDemo] = useState(false);
  const [selectedIssue, setSelectedIssue] = useState('');

  const commonIssues = [
    {
      id: 'login',
      title: "Can't log in to my account",
      description: "Password reset and authentication issues",
      icon: AlertTriangle,
      color: "bg-red-500"
    },
    {
      id: 'reports',
      title: "Reports not generating",
      description: "Report generation and export problems",
      icon: AlertTriangle,
      color: "bg-orange-500"
    },
    {
      id: 'api',
      title: "API connection errors",
      description: "External service integration issues",
      icon: AlertTriangle,
      color: "bg-yellow-500"
    },
    {
      id: 'performance',
      title: "Slow performance",
      description: "Tool loading and processing speed",
      icon: AlertTriangle,
      color: "bg-blue-500"
    }
  ];

  const solutions = {
    login: [
      "Check your email and password",
      "Use the 'Forgot Password' feature",
      "Clear browser cache and cookies",
      "Try a different browser"
    ],
    reports: [
      "Check your internet connection",
      "Verify the date range selected",
      "Ensure you have sufficient credits",
      "Contact support if issue persists"
    ],
    api: [
      "Verify API credentials are correct",
      "Check service status page",
      "Ensure proper API permissions",
      "Review rate limiting settings"
    ],
    performance: [
      "Close unnecessary browser tabs",
      "Check your internet speed",
      "Try during off-peak hours",
      "Clear browser cache"
    ]
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-foreground mb-4">Troubleshooting</h2>
        <p className="text-lg text-muted-foreground">
          Get help with common issues and find solutions to technical problems
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Troubleshooting Demo */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-card border border-border rounded-xl p-6"
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-semibold text-foreground">Common Issues & Solutions</h3>
            <button
              onClick={() => setShowDemo(!showDemo)}
              className="flex items-center space-x-2 bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors"
            >
              <Play className="h-4 w-4" />
              <span>{showDemo ? 'Stop' : 'Watch Demo'}</span>
            </button>
          </div>

          <div className="space-y-4">
            {commonIssues.map((issue, index) => (
              <div key={index} className="flex items-center space-x-3">
                <div className={`h-8 w-8 ${issue.color} rounded-full flex items-center justify-center text-white text-sm font-medium`}>
                  {index + 1}
                </div>
                <div>
                  <h4 className="font-medium text-foreground">{issue.title}</h4>
                  <p className="text-sm text-muted-foreground">{issue.description}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Interactive Troubleshooting Demo */}
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
                    <h4 className="font-semibold text-gray-900">Troubleshooting Guide</h4>
                    <p className="text-sm text-gray-600">Find solutions to common problems</p>
                  </div>

                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="space-y-4"
                  >
                    {/* Search Bar */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Search for help</label>
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1 }}
                        className="relative"
                      >
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                        <input
                          type="text"
                          placeholder="Describe your issue..."
                          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500"
                          readOnly
                        />
                      </motion.div>
                    </div>

                    {/* Issue Selection */}
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 2 }}
                      className="space-y-2"
                    >
                      <div className="text-sm font-medium text-gray-700">Common Issues:</div>
                      <div className="space-y-1">
                        {commonIssues.map((issue) => (
                          <motion.button
                            key={issue.id}
                            onClick={() => setSelectedIssue(issue.id)}
                            className={`w-full text-left p-2 rounded border transition-colors ${selectedIssue === issue.id
                              ? 'bg-blue-50 border-blue-200'
                              : 'bg-gray-50 border-gray-200 hover:bg-gray-100'
                              }`}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                          >
                            <div className="flex items-center space-x-2">
                              <issue.icon className="h-4 w-4 text-gray-600" />
                              <span className="text-sm font-medium">{issue.title}</span>
                            </div>
                          </motion.button>
                        ))}
                      </div>
                    </motion.div>

                    {/* Solutions */}
                    <AnimatePresence>
                      {selectedIssue && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          className="space-y-2"
                        >
                          <div className="text-sm font-medium text-gray-700">Solutions:</div>
                          <div className="space-y-1">
                            {solutions[selectedIssue as keyof typeof solutions]?.map((solution, index) => (
                              <motion.div
                                key={index}
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: index * 0.1 }}
                                className="flex items-center space-x-2 p-2 bg-green-50 rounded"
                              >
                                <CheckCircle className="h-4 w-4 text-green-600" />
                                <span className="text-sm">{solution}</span>
                              </motion.div>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {/* Contact Support */}
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 4 }}
                      className="space-y-2"
                    >
                      <div className="text-sm font-medium text-gray-700">Still need help?</div>
                      <div className="flex space-x-2">
                        <button className="flex-1 bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2">
                          <MessageCircle className="h-4 w-4" />
                          <span>Contact Support</span>
                        </button>
                        <button className="flex-1 bg-gray-600 text-white py-2 rounded-md hover:bg-gray-700 transition-colors flex items-center justify-center space-x-2">
                          <HelpCircle className="h-4 w-4" />
                          <span>FAQ</span>
                        </button>
                      </div>
                    </motion.div>
                  </motion.div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Troubleshooting Features */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-card border border-border rounded-xl p-6"
        >
          <h3 className="text-xl font-semibold text-foreground mb-6">Support Resources</h3>

          <div className="space-y-6">
            <div className="flex items-start space-x-4">
              <div className="h-10 w-10 bg-blue-100 dark:bg-blue-900/20 rounded-lg flex items-center justify-center">
                <Search className="h-5 w-5 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <h4 className="font-medium text-foreground">Knowledge Base</h4>
                <p className="text-sm text-muted-foreground mt-1">
                  Search through our comprehensive documentation and find answers to common questions.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="h-10 w-10 bg-green-100 dark:bg-green-900/20 rounded-lg flex items-center justify-center">
                <HelpCircle className="h-5 w-5 text-green-600 dark:text-green-400" />
              </div>
              <div>
                <h4 className="font-medium text-foreground">FAQ Section</h4>
                <p className="text-sm text-muted-foreground mt-1">
                  Browse frequently asked questions and get quick solutions to common problems.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="h-10 w-10 bg-purple-100 dark:bg-purple-900/20 rounded-lg flex items-center justify-center">
                <MessageCircle className="h-5 w-5 text-purple-600 dark:text-purple-400" />
              </div>
              <div>
                <h4 className="font-medium text-foreground">Live Support</h4>
                <p className="text-sm text-muted-foreground mt-1">
                  Get real-time help from our support team through chat or email support.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="h-10 w-10 bg-orange-100 dark:bg-orange-900/20 rounded-lg flex items-center justify-center">
                <CheckCircle className="h-5 w-5 text-orange-600 dark:text-orange-400" />
              </div>
              <div>
                <h4 className="font-medium text-foreground">Step-by-Step Guides</h4>
                <p className="text-sm text-muted-foreground mt-1">
                  Follow detailed tutorials and guides to resolve complex issues and learn best practices.
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
          href="/contact"
          className="inline-flex items-center space-x-2 bg-primary text-white px-6 py-3 rounded-lg hover:bg-primary/90 transition-colors"
        >
          <span>Contact Support</span>
          <ArrowRight className="h-4 w-4" />
        </Link>
      </motion.div>
    </div>
  );
} 