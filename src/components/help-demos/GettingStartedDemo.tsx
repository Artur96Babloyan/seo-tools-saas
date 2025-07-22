"use client";

import { motion } from "framer-motion";
import { Sparkles, Target, FileText, Search, Globe, TrendingUp, CheckCircle, ArrowRight } from "lucide-react";


export function GettingStartedDemo() {
  return (
    <motion.div
      key="getting-started"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.5 }}
      className="max-w-4xl mx-auto"
    >
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-foreground mb-4">Welcome to AuditCraft</h2>
        <p className="text-lg text-muted-foreground">
          Your comprehensive SEO toolkit for website optimization and analysis
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-card border border-border rounded-xl p-6"
        >
          <div className="flex items-center space-x-3 mb-4">
            <div className="h-10 w-10 bg-blue-500 rounded-lg flex items-center justify-center">
              <Sparkles className="h-5 w-5 text-white" />
            </div>
            <h3 className="text-xl font-semibold text-foreground">What is AuditCraft?</h3>
          </div>
          <p className="text-muted-foreground mb-4">
            AuditCraft is an all-in-one SEO platform that helps you optimize your website,
            track keywords, analyze competitors, and improve your search engine rankings.
          </p>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li className="flex items-center space-x-2">
              <CheckCircle className="h-4 w-4 text-green-500" />
              <span>AI-powered content optimization</span>
            </li>
            <li className="flex items-center space-x-2">
              <CheckCircle className="h-4 w-4 text-green-500" />
              <span>Comprehensive SEO analysis</span>
            </li>
            <li className="flex items-center space-x-2">
              <CheckCircle className="h-4 w-4 text-green-500" />
              <span>Keyword tracking and research</span>
            </li>
            <li className="flex items-center space-x-2">
              <CheckCircle className="h-4 w-4 text-green-500" />
              <span>Competitor analysis tools</span>
            </li>
          </ul>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-card border border-border rounded-xl p-6"
        >
          <div className="flex items-center space-x-3 mb-4">
            <div className="h-10 w-10 bg-green-500 rounded-lg flex items-center justify-center">
              <Target className="h-5 w-5 text-white" />
            </div>
            <h3 className="text-xl font-semibold text-foreground">Key Features</h3>
          </div>
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="h-8 w-8 bg-purple-100 dark:bg-purple-900/20 rounded-lg flex items-center justify-center">
                <FileText className="h-4 w-4 text-purple-600 dark:text-purple-400" />
              </div>
              <div>
                <h4 className="font-medium text-foreground">AI Content Optimizer</h4>
                <p className="text-sm text-muted-foreground">Optimize your content for better SEO</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <div className="h-8 w-8 bg-blue-100 dark:bg-blue-900/20 rounded-lg flex items-center justify-center">
                <Search className="h-4 w-4 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <h4 className="font-medium text-foreground">SERP Optimizer</h4>
                <p className="text-sm text-muted-foreground">Analyze and improve search rankings</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <div className="h-8 w-8 bg-orange-100 dark:bg-orange-900/20 rounded-lg flex items-center justify-center">
                <Globe className="h-4 w-4 text-orange-600 dark:text-orange-400" />
              </div>
              <div>
                <h4 className="font-medium text-foreground">Sitemap Generator</h4>
                <p className="text-sm text-muted-foreground">Create and manage XML sitemaps</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <div className="h-8 w-8 bg-red-100 dark:bg-red-900/20 rounded-lg flex items-center justify-center">
                <TrendingUp className="h-4 w-4 text-red-600 dark:text-red-400" />
              </div>
              <div>
                <h4 className="font-medium text-foreground">Keyword Tracker</h4>
                <p className="text-sm text-muted-foreground">Track keyword rankings over time</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="text-center"
      >
        <button
          onClick={() => {
            // This would need to be handled by the parent component
            // For now, we'll use a link
          }}
          className="inline-flex items-center space-x-2 bg-primary text-white px-6 py-3 rounded-lg hover:bg-primary/90 transition-colors"
        >
          <span>Get Started</span>
          <ArrowRight className="h-4 w-4" />
        </button>
      </motion.div>
    </motion.div>
  );
} 