"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Target, TrendingUp, CheckCircle, RotateCcw } from 'lucide-react';

export function AIContentOptimizerDemo() {
  const [currentStep, setCurrentStep] = useState(0);
  const [isOptimizing, setIsOptimizing] = useState(false);
  const [showResults, setShowResults] = useState(false);

  const steps = [
    {
      title: "Enter Your Content",
      description: "Paste your existing content or URL to analyze and optimize",
      content: (
        <div className="space-y-4">
          <div className="flex space-x-4">
            <button className="px-4 py-2 bg-primary text-white rounded-lg text-sm font-medium">
              Enter URL
            </button>
            <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm font-medium">
              Paste Content
            </button>
          </div>
          <div className="space-y-3">
            <input
              type="text"
              placeholder="https://example.com/blog/best-seo-practices-2024"
              className="w-full p-3 border border-gray-300 rounded-lg text-sm"
              value="https://example.com/blog/best-seo-practices-2024"
              readOnly
            />
            <div className="text-xs text-gray-500">
              Example: Analyzing content from a blog post about SEO best practices
            </div>
          </div>
        </div>
      )
    },
    {
      title: "Set Target Keywords",
      description: "Define your primary and secondary keywords for optimization",
      content: (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Primary Keyword</label>
              <input
                type="text"
                value="SEO best practices"
                className="w-full p-3 border border-gray-300 rounded-lg text-sm"
                readOnly
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Secondary Keywords</label>
              <input
                type="text"
                value="search engine optimization, on-page SEO, technical SEO"
                className="w-full p-3 border border-gray-300 rounded-lg text-sm"
                readOnly
              />
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">SEO best practices</span>
            <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-xs">search engine optimization</span>
            <span className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-xs">on-page SEO</span>
            <span className="px-3 py-1 bg-orange-100 text-orange-800 rounded-full text-xs">technical SEO</span>
          </div>
        </div>
      )
    },
    {
      title: "AI Analysis & Optimization",
      description: "Our AI analyzes your content and provides optimization suggestions",
      content: (
        <div className="space-y-4">
          {isOptimizing ? (
            <div className="text-center py-8">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
              <p className="text-gray-600">AI is analyzing your content...</p>
              <div className="mt-4 space-y-2 text-sm text-gray-500">
                <div>✓ Checking keyword density</div>
                <div>✓ Analyzing readability score</div>
                <div>✓ Reviewing meta descriptions</div>
                <div>✓ Optimizing heading structure</div>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                  <div className="flex items-center space-x-2 mb-2">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                    <span className="font-medium text-green-800">Readability Score</span>
                  </div>
                  <div className="text-2xl font-bold text-green-600">85/100</div>
                  <div className="text-sm text-green-700">Excellent - Easy to read</div>
                </div>
                <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <div className="flex items-center space-x-2 mb-2">
                    <Target className="h-5 w-5 text-yellow-600" />
                    <span className="font-medium text-yellow-800">Keyword Density</span>
                  </div>
                  <div className="text-2xl font-bold text-yellow-600">2.1%</div>
                  <div className="text-sm text-yellow-700">Good - Could be optimized</div>
                </div>
                <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                  <div className="flex items-center space-x-2 mb-2">
                    <TrendingUp className="h-5 w-5 text-blue-600" />
                    <span className="font-medium text-blue-800">SEO Score</span>
                  </div>
                  <div className="text-2xl font-bold text-blue-600">78/100</div>
                  <div className="text-sm text-blue-700">Good - Room for improvement</div>
                </div>
              </div>
            </div>
          )}
        </div>
      )
    },
    {
      title: "Optimization Results",
      description: "Review AI-generated suggestions and optimized content",
      content: (
        <div className="space-y-6">
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <h3 className="text-lg font-semibold mb-4 flex items-center">
              <Sparkles className="h-5 w-5 text-primary mr-2" />
              AI Optimization Suggestions
            </h3>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                <div>
                  <p className="font-medium text-gray-900">Add more H2 and H3 headings</p>
                  <p className="text-sm text-gray-600">Current: 2 headings | Recommended: 5-7 headings</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2 flex-shrink-0"></div>
                <div>
                  <p className="font-medium text-gray-900">Include more internal links</p>
                  <p className="text-sm text-gray-600">Add 3-5 relevant internal links to improve site structure</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                <div>
                  <p className="font-medium text-gray-900">Optimize meta description</p>
                  <p className="text-sm text-gray-600">Current: 120 chars | Recommended: 150-160 chars</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <h3 className="text-lg font-semibold mb-4">Optimized Content Preview</h3>
            <div className="space-y-3 text-sm">
              <div className="p-3 bg-gray-50 rounded border-l-4 border-primary">
                <p className="font-medium text-gray-900">Updated Meta Description:</p>
                <p className="text-gray-700 mt-1">
                  &quot;Discover the latest SEO best practices for 2024. Learn proven strategies for search engine optimization,
                  on-page SEO techniques, and technical SEO improvements to boost your website&apos;s rankings.&quot;
                </p>
              </div>
              <div className="p-3 bg-gray-50 rounded border-l-4 border-green-500">
                <p className="font-medium text-gray-900">Suggested H2 Heading:</p>
                <p className="text-gray-700 mt-1">&quot;Essential SEO Best Practices for 2024&quot;</p>
              </div>
              <div className="p-3 bg-gray-50 rounded border-l-4 border-blue-500">
                <p className="font-medium text-gray-900">Keyword Optimization:</p>
                <p className="text-gray-700 mt-1">
                  SEO best practices have evolved significantly in 2024. Search engine optimization now requires...&quot;
                </p>
              </div>
            </div>
          </div>
        </div>
      )
    }
  ];

  const handleNext = () => {
    if (currentStep === 2) {
      setIsOptimizing(true);
      setTimeout(() => {
        setIsOptimizing(false);
        setCurrentStep(3);
        setShowResults(true);
      }, 3000);
    } else {
      setCurrentStep(prev => prev + 1);
    }
  };

  const handleReset = () => {
    setCurrentStep(0);
    setIsOptimizing(false);
    setShowResults(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-4xl mx-auto"
    >
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          AI Content Optimizer Demo
        </h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          See how our AI analyzes and optimizes your content for better search engine rankings.
          Get real-time suggestions and improvements.
        </p>
      </div>

      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-gray-700">
            Step {currentStep + 1} of {steps.length}
          </span>
          <span className="text-sm text-gray-500">
            {Math.round(((currentStep + 1) / steps.length) * 100)}% Complete
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <motion.div
            className="bg-primary h-2 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
            transition={{ duration: 0.5 }}
          />
        </div>
      </div>

      {/* Current Step Content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentStep}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
          className="bg-white border border-gray-200 rounded-lg p-6 mb-6"
        >
          <div className="mb-4">
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              {steps[currentStep].title}
            </h3>
            <p className="text-gray-600">
              {steps[currentStep].description}
            </p>
          </div>
          {steps[currentStep].content}
        </motion.div>
      </AnimatePresence>

      {/* Action Buttons */}
      <div className="flex justify-between items-center">
        <button
          onClick={handleReset}
          className="flex items-center space-x-2 px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
        >
          <RotateCcw className="h-4 w-4" />
          <span>Reset Demo</span>
        </button>

        <div className="flex space-x-3">
          {currentStep > 0 && (
            <button
              onClick={() => setCurrentStep(prev => prev - 1)}
              className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Previous
            </button>
          )}
          {currentStep < steps.length - 1 && (
            <button
              onClick={handleNext}
              className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors"
            >
              {currentStep === 2 ? 'Start Optimization' : 'Next'}
            </button>
          )}
        </div>
      </div>

      {/* Results Summary */}
      {showResults && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-8 bg-gradient-to-r from-green-50 to-blue-50 border border-green-200 rounded-lg p-6"
        >
          <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
            <CheckCircle className="h-5 w-5 text-green-600 mr-2" />
            Optimization Complete!
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div>
              <span className="font-medium text-gray-700">Content Score:</span>
              <span className="ml-2 text-green-600 font-semibold">+15 points</span>
            </div>
            <div>
              <span className="font-medium text-gray-700">Readability:</span>
              <span className="ml-2 text-blue-600 font-semibold">85/100</span>
            </div>
            <div>
              <span className="font-medium text-gray-700">SEO Score:</span>
              <span className="ml-2 text-purple-600 font-semibold">78/100</span>
            </div>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
} 