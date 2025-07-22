"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Zap, Clock, AlertTriangle, CheckCircle, TrendingUp, Download, RotateCcw } from 'lucide-react';

export function PageSpeedAuditorDemo() {
  const [currentStep, setCurrentStep] = useState(0);
  const [isAnalyzing, setIsAnalyzing] = useState(false);


  const steps = [
    {
      title: "Enter Website URL",
      description: "Input the website you want to analyze for performance optimization",
      content: (
        <div className="space-y-4">
          <div className="space-y-3">
            <input
              type="text"
              placeholder="https://example.com"
              className="w-full p-4 border border-gray-300 rounded-lg text-lg"
              value="https://ecommerce-store.com"
              readOnly
            />
            <div className="text-sm text-gray-500">
              Example: Analyzing an e-commerce website for performance optimization
            </div>
          </div>
          <div className="flex space-x-4">
            <button className="px-4 py-2 bg-primary text-white rounded-lg text-sm font-medium">
              Analyze Desktop
            </button>
            <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm font-medium">
              Analyze Mobile
            </button>
          </div>
        </div>
      )
    },
    {
      title: "Performance Analysis",
      description: "Comprehensive analysis of Core Web Vitals and performance metrics",
      content: (
        <div className="space-y-6">
          {isAnalyzing ? (
            <div className="text-center py-8">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
              <p className="text-gray-600">Analyzing website performance...</p>
              <div className="mt-4 space-y-2 text-sm text-gray-500">
                <div>✓ Testing Core Web Vitals</div>
                <div>✓ Analyzing loading times</div>
                <div>✓ Checking resource optimization</div>
                <div>✓ Reviewing mobile performance</div>
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              {/* Core Web Vitals */}
              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <h3 className="text-lg font-semibold mb-4 flex items-center">
                  <Zap className="h-5 w-5 text-blue-600 mr-2" />
                  Core Web Vitals
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-gray-700">Largest Contentful Paint</span>
                      <span className="text-sm font-bold text-green-600">2.1s</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-green-500 h-2 rounded-full" style={{ width: '70%' }}></div>
                    </div>
                    <div className="text-xs text-green-600 mt-1">Good (Target: &lt; 2.5s)</div>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-gray-700">First Input Delay</span>
                      <span className="text-sm font-bold text-yellow-600">180ms</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-yellow-500 h-2 rounded-full" style={{ width: '60%' }}></div>
                    </div>
                    <div className="text-xs text-yellow-600 mt-1">Needs Improvement (Target: &lt; 100ms)</div>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-gray-700">Cumulative Layout Shift</span>
                      <span className="text-sm font-bold text-red-600">0.15</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-red-500 h-2 rounded-full" style={{ width: '75%' }}></div>
                    </div>
                    <div className="text-xs text-red-600 mt-1">Poor (Target: &lt; 0.1)</div>
                  </div>
                </div>
              </div>

              {/* Performance Metrics */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white border border-gray-200 rounded-lg p-6">
                  <h3 className="text-lg font-semibold mb-4 flex items-center">
                    <Clock className="h-5 w-5 text-purple-600 mr-2" />
                    Loading Performance
                  </h3>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">First Contentful Paint</span>
                      <span className="text-sm font-medium text-green-600">1.2s</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Speed Index</span>
                      <span className="text-sm font-medium text-yellow-600">2.8s</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Time to Interactive</span>
                      <span className="text-sm font-medium text-red-600">4.5s</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Total Blocking Time</span>
                      <span className="text-sm font-medium text-red-600">320ms</span>
                    </div>
                  </div>
                </div>

                <div className="bg-white border border-gray-200 rounded-lg p-6">
                  <h3 className="text-lg font-semibold mb-4 flex items-center">
                    <Download className="h-5 w-5 text-green-600 mr-2" />
                    Resource Analysis
                  </h3>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Total Page Size</span>
                      <span className="text-sm font-medium text-yellow-600">2.8MB</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">JavaScript</span>
                      <span className="text-sm font-medium text-red-600">1.2MB</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Images</span>
                      <span className="text-sm font-medium text-yellow-600">800KB</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">CSS</span>
                      <span className="text-sm font-medium text-green-600">150KB</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )
    },
    {
      title: "Optimization Opportunities",
      description: "Detailed recommendations to improve page speed and user experience",
      content: (
        <div className="space-y-6">
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <h3 className="text-lg font-semibold mb-4 flex items-center">
              <AlertTriangle className="h-5 w-5 text-red-600 mr-2" />
              Critical Issues (High Priority)
            </h3>
            <div className="space-y-4">
              <div className="flex items-start space-x-3 p-3 bg-red-50 border border-red-200 rounded-lg">
                <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
                <div>
                  <p className="font-medium text-gray-900">Reduce JavaScript Bundle Size</p>
                  <p className="text-sm text-gray-600">Current: 1.2MB | Target: 500KB</p>
                  <p className="text-sm text-gray-600 mt-1">Remove unused JavaScript, implement code splitting, and use tree shaking.</p>
                </div>
              </div>
              <div className="flex items-start space-x-3 p-3 bg-red-50 border border-red-200 rounded-lg">
                <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
                <div>
                  <p className="font-medium text-gray-900">Fix Cumulative Layout Shift</p>
                  <p className="text-sm text-gray-600">Current: 0.15 | Target: 0.1</p>
                  <p className="text-sm text-gray-600 mt-1">Set explicit width and height for images, avoid inserting content above existing content.</p>
                </div>
              </div>
              <div className="flex items-start space-x-3 p-3 bg-red-50 border border-red-200 rounded-lg">
                <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
                <div>
                  <p className="font-medium text-gray-900">Optimize Images</p>
                  <p className="text-sm text-gray-600">Current: 800KB | Target:  400KB</p>
                  <p className="text-sm text-gray-600 mt-1">Convert to WebP format, implement lazy loading, and use responsive images.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <h3 className="text-lg font-semibold mb-4 flex items-center">
              <TrendingUp className="h-5 w-5 text-yellow-600 mr-2" />
              Improvement Opportunities (Medium Priority)
            </h3>
            <div className="space-y-4">
              <div className="flex items-start space-x-3 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2 flex-shrink-0"></div>
                <div>
                  <p className="font-medium text-gray-900">Implement Resource Hints</p>
                  <p className="text-sm text-gray-600">Add preload, prefetch, and preconnect for critical resources.</p>
                </div>
              </div>
              <div className="flex items-start space-x-3 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2 flex-shrink-0"></div>
                <div>
                  <p className="font-medium text-gray-900">Enable Compression</p>
                  <p className="text-sm text-gray-600">Enable Gzip/Brotli compression for text-based assets.</p>
                </div>
              </div>
              <div className="flex items-start space-x-3 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2 flex-shrink-0"></div>
                <div>
                  <p className="font-medium text-gray-900">Minimize Render-Blocking Resources</p>
                  <p className="text-sm text-gray-600">Inline critical CSS and defer non-critical JavaScript.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h3 className="text-lg font-semibold mb-4">Mobile Performance</h3>
              <div className="space-y-3 text-sm">
                <div className="p-3 bg-blue-50 rounded border-l-4 border-blue-500">
                  <p className="font-medium text-gray-900">Mobile Score:</p>
                  <p className="text-gray-700 mt-1">45/100 (Needs significant improvement)</p>
                </div>
                <div className="p-3 bg-green-50 rounded border-l-4 border-green-500">
                  <p className="font-medium text-gray-900">Key Issues:</p>
                  <p className="text-gray-700 mt-1">• Large JavaScript bundles<br />• Unoptimized images<br />• Render-blocking resources</p>
                </div>
              </div>
            </div>

            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h3 className="text-lg font-semibold mb-4">Desktop Performance</h3>
              <div className="space-y-3 text-sm">
                <div className="p-3 bg-blue-50 rounded border-l-4 border-blue-500">
                  <p className="font-medium text-gray-900">Desktop Score:</p>
                  <p className="text-gray-700 mt-1">72/100 (Good, room for improvement)</p>
                </div>
                <div className="p-3 bg-green-50 rounded border-l-4 border-green-500">
                  <p className="font-medium text-gray-900">Strengths:</p>
                  <p className="text-gray-700 mt-1">• Good LCP score<br />• Efficient CSS delivery<br />• Proper caching headers</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      title: "Implementation Plan",
      description: "Step-by-step action plan to improve your website performance",
      content: (
        <div className="space-y-6">
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <h3 className="text-lg font-semibold mb-4 flex items-center">
              <CheckCircle className="h-5 w-5 text-green-600 mr-2" />
              Immediate Actions (This Week)
            </h3>
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <span className="w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center text-xs font-bold">1</span>
                <div>
                  <p className="font-medium text-gray-900">Optimize Product Images</p>
                  <p className="text-sm text-gray-600">Convert all product images to WebP format and implement lazy loading</p>
                  <p className="text-xs text-blue-600 mt-1">Expected improvement: 40% reduction in image size</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <span className="w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center text-xs font-bold">2</span>
                <div>
                  <p className="font-medium text-gray-900">Fix Layout Shift Issues</p>
                  <p className="text-sm text-gray-600">Add explicit dimensions to all images and reserve space for dynamic content</p>
                  <p className="text-xs text-blue-600 mt-1">Expected improvement: CLS score from 0.15 to 0.05</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <span className="w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center text-xs font-bold">3</span>
                <div>
                  <p className="font-medium text-gray-900">Enable Gzip Compression</p>
                  <p className="text-sm text-gray-600">Configure server to compress text-based assets (HTML, CSS, JS)</p>
                  <p className="text-xs text-blue-600 mt-1">Expected improvement: 70% reduction in transfer size</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <h3 className="text-lg font-semibold mb-4 flex items-center">
              <TrendingUp className="h-5 w-5 text-blue-600 mr-2" />
              Short-term Actions (Next 2 Weeks)
            </h3>
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <span className="w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-xs font-bold">4</span>
                <div>
                  <p className="font-medium text-gray-900">Implement Code Splitting</p>
                  <p className="text-sm text-gray-600">Split JavaScript bundles by routes and lazy load non-critical components</p>
                  <p className="text-xs text-blue-600 mt-1">Expected improvement: 50% reduction in initial JS bundle</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <span className="w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-xs font-bold">5</span>
                <div>
                  <p className="font-medium text-gray-900">Add Resource Hints</p>
                  <p className="text-sm text-gray-600">Implement preload for critical resources and prefetch for likely navigation</p>
                  <p className="text-xs text-blue-600 mt-1">Expected improvement: 20% faster subsequent page loads</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <span className="w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-xs font-bold">6</span>
                <div>
                  <p className="font-medium text-gray-900">Optimize Third-party Scripts</p>
                  <p className="text-sm text-gray-600">Load analytics and tracking scripts asynchronously and defer non-critical ones</p>
                  <p className="text-xs text-blue-600 mt-1">Expected improvement: 30% reduction in blocking time</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-green-50 to-blue-50 border border-green-200 rounded-lg p-6">
            <h3 className="text-lg font-semibold mb-4">Expected Performance Improvements</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">85+</div>
                <div className="text-gray-700">Mobile Score</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">95+</div>
                <div className="text-gray-700">Desktop Score</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600">60%</div>
                <div className="text-gray-700">Faster Loading</div>
              </div>
            </div>
          </div>
        </div>
      )
    }
  ];

  const handleNext = () => {
    if (currentStep === 1) {
      setIsAnalyzing(true);
      setTimeout(() => {
        setIsAnalyzing(false);
        setCurrentStep(2);
      }, 3000);
    } else {
      setCurrentStep(prev => prev + 1);
    }
  };

  const handleReset = () => {
    setCurrentStep(0);
    setIsAnalyzing(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-6xl mx-auto"
    >
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          Page Speed Auditor Demo
        </h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Analyze your website&apos;s performance, identify bottlenecks, and get actionable
          recommendations to improve Core Web Vitals and user experience.
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
              {currentStep === 1 ? 'Start Analysis' : 'Next'}
            </button>
          )}
        </div>
      </div>

      {/* Results Summary */}
      {currentStep === steps.length - 1 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-8 bg-gradient-to-r from-green-50 to-blue-50 border border-green-200 rounded-lg p-6"
        >
          <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
            <CheckCircle className="h-5 w-5 text-green-600 mr-2" />
            Performance Audit Complete!
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm">
            <div>
              <span className="font-medium text-gray-700">Mobile Score:</span>
              <span className="ml-2 text-red-600 font-semibold">45/100</span>
            </div>
            <div>
              <span className="font-medium text-gray-700">Desktop Score:</span>
              <span className="ml-2 text-yellow-600 font-semibold">72/100</span>
            </div>
            <div>
              <span className="font-medium text-gray-700">Issues Found:</span>
              <span className="ml-2 text-blue-600 font-semibold">12 Critical</span>
            </div>
            <div>
              <span className="font-medium text-gray-700">Potential Improvement:</span>
              <span className="ml-2 text-green-600 font-semibold">60%</span>
            </div>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
} 