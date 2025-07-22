"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { TrendingUp, Target, BarChart3, CheckCircle, Zap, Globe } from 'lucide-react';

export function SERPOptimizerDemo() {
  const [currentStep, setCurrentStep] = useState(0);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [showResults, setShowResults] = useState(false);

  const steps = [
    {
      title: "Enter Your Target Keyword",
      description: "Input the keyword you want to rank for and analyze SERP competition",
      content: (
        <div className="space-y-4">
          <div className="space-y-3">
            <input
              type="text"
              placeholder="Enter your target keyword..."
              className="w-full p-4 border border-gray-300 rounded-lg text-lg"
              value="best coffee shops near me"
              readOnly
            />
            <div className="text-sm text-gray-500">
              Example: Analyzing SERP for &quot;best coffee shops near me&quot; - High search volume, local intent
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
            <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg text-center">
              <div className="text-2xl font-bold text-blue-600">12.5K</div>
              <div className="text-sm text-blue-700">Monthly Searches</div>
            </div>
            <div className="p-3 bg-green-50 border border-green-200 rounded-lg text-center">
              <div className="text-2xl font-bold text-green-600">$2.50</div>
              <div className="text-sm text-green-700">Avg. CPC</div>
            </div>
            <div className="p-3 bg-purple-50 border border-purple-200 rounded-lg text-center">
              <div className="text-2xl font-bold text-purple-600">Medium</div>
              <div className="text-sm text-purple-700">Competition</div>
            </div>
          </div>
        </div>
      )
    },
    {
      title: "Analyze Current SERP Results",
      description: "Review top 10 search results and identify optimization opportunities",
      content: (
        <div className="space-y-4">
          <div className="space-y-3">
            {[
              {
                position: 1,
                title: "10 Best Coffee Shops Near Me - Yelp",
                url: "yelp.com/search?find_desc=coffee+shops",
                description: "Find the best Coffee Shops near you on Yelp - see all Coffee Shops open now and reserve an open table. Explore other popular food spots near you from over 7 million businesses...",
                domain: "yelp.com",
                da: 92,
                backlinks: "2.1M"
              },
              {
                position: 2,
                title: "Best Coffee Shops in [City] - TripAdvisor",
                url: "tripadvisor.com/Restaurants-g60763-c8",
                description: "Best Coffee Shops in [City]: See 123,456 traveler reviews, 45,678 candid photos, and great deals for Coffee Shops in [City], ranked #1 of 1,234 restaurants...",
                domain: "tripadvisor.com",
                da: 89,
                backlinks: "1.8M"
              },
              {
                position: 3,
                title: "Top 15 Coffee Shops You Must Visit - Local Guide",
                url: "localguide.com/coffee-shops-near-me",
                description: "Discover the best coffee shops in your area. From artisanal roasters to cozy cafes, find your perfect cup of coffee. Updated monthly with new recommendations...",
                domain: "localguide.com",
                da: 45,
                backlinks: "12K"
              }
            ].map((result, index) => (
              <div key={index} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    <span className="w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-xs font-bold">
                      {result.position}
                    </span>
                    <span className="text-sm text-gray-500">{result.domain}</span>
                  </div>
                  <div className="text-right text-xs text-gray-500">
                    <div>DA: {result.da}</div>
                    <div>{result.backlinks} backlinks</div>
                  </div>
                </div>
                <h4 className="text-blue-600 text-sm font-medium mb-1 hover:underline cursor-pointer">
                  {result.title}
                </h4>
                <div className="text-xs text-green-600 mb-1">{result.url}</div>
                <p className="text-sm text-gray-600">{result.description}</p>
              </div>
            ))}
          </div>
        </div>
      )
    },
    {
      title: "SERP Analysis & Insights",
      description: "Get detailed analysis of search intent, content types, and optimization opportunities",
      content: (
        <div className="space-y-6">
          {isAnalyzing ? (
            <div className="text-center py-8">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
              <p className="text-gray-600">Analyzing SERP patterns...</p>
              <div className="mt-4 space-y-2 text-sm text-gray-500">
                <div>✓ Analyzing search intent</div>
                <div>✓ Reviewing content types</div>
                <div>✓ Identifying featured snippets</div>
                <div>✓ Checking local pack presence</div>
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white border border-gray-200 rounded-lg p-6">
                  <h3 className="text-lg font-semibold mb-4 flex items-center">
                    <Target className="h-5 w-5 text-blue-600 mr-2" />
                    Search Intent Analysis
                  </h3>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Informational</span>
                      <span className="text-sm font-medium text-green-600">70%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-green-500 h-2 rounded-full" style={{ width: '70%' }}></div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Local</span>
                      <span className="text-sm font-medium text-blue-600">25%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-blue-500 h-2 rounded-full" style={{ width: '25%' }}></div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Transactional</span>
                      <span className="text-sm font-medium text-purple-600">5%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-purple-500 h-2 rounded-full" style={{ width: '5%' }}></div>
                    </div>
                  </div>
                </div>

                <div className="bg-white border border-gray-200 rounded-lg p-6">
                  <h3 className="text-lg font-semibold mb-4 flex items-center">
                    <BarChart3 className="h-5 w-5 text-green-600 mr-2" />
                    Content Type Distribution
                  </h3>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">List Articles</span>
                      <span className="text-sm font-medium">60%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Local Directories</span>
                      <span className="text-sm font-medium">30%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Reviews</span>
                      <span className="text-sm font-medium">10%</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <h3 className="text-lg font-semibold mb-4 flex items-center">
                  <Zap className="h-5 w-5 text-yellow-600 mr-2" />
                  SERP Features Present
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="text-center p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                    <div className="text-lg font-bold text-yellow-600">✓</div>
                    <div className="text-sm text-yellow-700">Local Pack</div>
                  </div>
                  <div className="text-center p-3 bg-blue-50 border border-blue-200 rounded-lg">
                    <div className="text-lg font-bold text-blue-600">✓</div>
                    <div className="text-sm text-blue-700">Featured Snippet</div>
                  </div>
                  <div className="text-center p-3 bg-gray-50 border border-gray-200 rounded-lg">
                    <div className="text-lg font-bold text-gray-400">✗</div>
                    <div className="text-sm text-gray-500">People Also Ask</div>
                  </div>
                  <div className="text-center p-3 bg-gray-50 border border-gray-200 rounded-lg">
                    <div className="text-lg font-bold text-gray-400">✗</div>
                    <div className="text-sm text-gray-500">Video Results</div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )
    },
    {
      title: "Optimization Recommendations",
      description: "Get actionable strategies to improve your SERP ranking",
      content: (
        <div className="space-y-6">
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <h3 className="text-lg font-semibold mb-4 flex items-center">
              <TrendingUp className="h-5 w-5 text-green-600 mr-2" />
              Priority Optimization Actions
            </h3>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
                <div>
                  <p className="font-medium text-gray-900">Create Local-Focused Content</p>
                  <p className="text-sm text-gray-600">Include city-specific information, local landmarks, and neighborhood details. 80% of top results include local context.</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-orange-500 rounded-full mt-2 flex-shrink-0"></div>
                <div>
                  <p className="font-medium text-gray-900">Optimize for Featured Snippet</p>
                  <p className="text-sm text-gray-600">Create a comprehensive &quot;Top 10&quot; list with clear headings and concise descriptions. Target position 0.</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2 flex-shrink-0"></div>
                <div>
                  <p className="font-medium text-gray-900">Build Local Citations</p>
                  <p className="text-sm text-gray-600">Ensure consistent NAP (Name, Address, Phone) across 50+ local directories and review sites.</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                <div>
                  <p className="font-medium text-gray-900">Add Customer Reviews</p>
                  <p className="text-sm text-gray-600">Encourage Google My Business reviews. Aim for 4.5+ star rating with 100+ reviews.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h3 className="text-lg font-semibold mb-4">Content Strategy</h3>
              <div className="space-y-3 text-sm">
                <div className="p-3 bg-blue-50 rounded border-l-4 border-blue-500">
                  <p className="font-medium text-gray-900">Target Content Length:</p>
                  <p className="text-gray-700 mt-1">1,500-2,500 words (based on competitor analysis)</p>
                </div>
                <div className="p-3 bg-green-50 rounded border-l-4 border-green-500">
                  <p className="font-medium text-gray-900">Include These Elements:</p>
                  <p className="text-gray-700 mt-1">• Local coffee shop reviews<br />• Photos and ratings<br />• Addresses and hours<br />• Price ranges</p>
                </div>
              </div>
            </div>

            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h3 className="text-lg font-semibold mb-4">Technical SEO</h3>
              <div className="space-y-3 text-sm">
                <div className="p-3 bg-purple-50 rounded border-l-4 border-purple-500">
                  <p className="font-medium text-gray-900">Schema Markup:</p>
                  <p className="text-gray-700 mt-1">Implement LocalBusiness and Review schema</p>
                </div>
                <div className="p-3 bg-orange-50 rounded border-l-4 border-orange-500">
                  <p className="font-medium text-gray-900">Page Speed:</p>
                  <p className="text-gray-700 mt-1">Target &lt; 3 seconds loading time</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )
    }
  ];

  const handleNext = () => {
    if (currentStep === 2) {
      setIsAnalyzing(true);
      setTimeout(() => {
        setIsAnalyzing(false);
        setCurrentStep(3);
        setShowResults(true);
      }, 3000);
    } else {
      setCurrentStep(prev => prev + 1);
    }
  };

  const handleReset = () => {
    setCurrentStep(0);
    setIsAnalyzing(false);
    setShowResults(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-6xl mx-auto"
    >
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          SERP Optimizer Demo
        </h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Analyze search engine results pages and get data-driven optimization strategies
          to improve your rankings and outperform competitors.
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
          <Globe className="h-4 w-4" />
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
              {currentStep === 2 ? 'Analyze SERP' : 'Next'}
            </button>
          )}
        </div>
      </div>

      {/* Results Summary */}
      {showResults && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-8 bg-gradient-to-r from-blue-50 to-green-50 border border-blue-200 rounded-lg p-6"
        >
          <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
            <CheckCircle className="h-5 w-5 text-green-600 mr-2" />
            SERP Analysis Complete!
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm">
            <div>
              <span className="font-medium text-gray-700">Competition Level:</span>
              <span className="ml-2 text-yellow-600 font-semibold">Medium</span>
            </div>
            <div>
              <span className="font-medium text-gray-700">SERP Features:</span>
              <span className="ml-2 text-blue-600 font-semibold">2/4 Present</span>
            </div>
            <div>
              <span className="font-medium text-gray-700">Content Type:</span>
              <span className="ml-2 text-purple-600 font-semibold">List Articles</span>
            </div>
            <div>
              <span className="font-medium text-gray-700">Optimization Score:</span>
              <span className="ml-2 text-green-600 font-semibold">85/100</span>
            </div>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
} 