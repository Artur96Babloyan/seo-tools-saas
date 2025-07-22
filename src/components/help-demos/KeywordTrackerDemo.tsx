"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { TrendingUp, Target, BarChart3, AlertCircle, CheckCircle, RotateCcw, ArrowUp, ArrowDown } from 'lucide-react';

export function KeywordTrackerDemo() {
  const [currentStep, setCurrentStep] = useState(0);
  const [isTracking, setIsTracking] = useState(false);


  const steps = [
    {
      title: "Add Keywords to Track",
      description: "Enter the keywords you want to monitor for ranking changes and performance",
      content: (
        <div className="space-y-4">
          <div className="space-y-3">
            <div className="flex space-x-2">
              <input
                type="text"
                placeholder="Enter keyword..."
                className="flex-1 p-3 border border-gray-300 rounded-lg"
                value="digital marketing agency"
                readOnly
              />
              <button className="px-4 py-2 bg-primary text-white rounded-lg text-sm font-medium">
                Add
              </button>
            </div>
            <div className="text-sm text-gray-500">
              Example: Tracking competitive keywords for a digital marketing agency
            </div>
          </div>

          <div className="space-y-2">
            <h4 className="font-medium text-gray-900">Currently Tracking:</h4>
            <div className="flex flex-wrap gap-2">
              <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm flex items-center">
                digital marketing agency
                <button className="ml-2 text-blue-600 hover:text-blue-800">×</button>
              </span>
              <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm flex items-center">
                SEO services
                <button className="ml-2 text-green-600 hover:text-green-800">×</button>
              </span>
              <span className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm flex items-center">
                content marketing
                <button className="ml-2 text-purple-600 hover:text-purple-800">×</button>
              </span>
              <span className="px-3 py-1 bg-orange-100 text-orange-800 rounded-full text-sm flex items-center">
                social media marketing
                <button className="ml-2 text-orange-600 hover:text-orange-800">×</button>
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
            <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg text-center">
              <div className="text-2xl font-bold text-blue-600">4</div>
              <div className="text-sm text-blue-700">Keywords Tracked</div>
            </div>
            <div className="p-3 bg-green-50 border border-green-200 rounded-lg text-center">
              <div className="text-2xl font-bold text-green-600">Daily</div>
              <div className="text-sm text-green-700">Tracking Frequency</div>
            </div>
            <div className="p-3 bg-purple-50 border border-purple-200 rounded-lg text-center">
              <div className="text-2xl font-bold text-purple-600">30 Days</div>
              <div className="text-sm text-purple-700">History Available</div>
            </div>
          </div>
        </div>
      )
    },
    {
      title: "Keyword Performance Overview",
      description: "Monitor your keyword rankings and search performance trends",
      content: (
        <div className="space-y-6">
          {isTracking ? (
            <div className="text-center py-8">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
              <p className="text-gray-600">Updating keyword rankings...</p>
              <div className="mt-4 space-y-2 text-sm text-gray-500">
                <div>✓ Checking Google rankings</div>
                <div>✓ Analyzing search volume trends</div>
                <div>✓ Monitoring competitor positions</div>
                <div>✓ Calculating performance metrics</div>
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              {/* Keyword Performance Table */}
              <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
                <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-900">Keyword Rankings</h3>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Keyword</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Current Position</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Change</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Search Volume</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Difficulty</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {[
                        {
                          keyword: "digital marketing agency",
                          position: 8,
                          change: "+2",
                          changeType: "up",
                          volume: "12,500",
                          difficulty: "High",
                          status: "Improving"
                        },
                        {
                          keyword: "SEO services",
                          position: 15,
                          change: "-1",
                          changeType: "down",
                          volume: "8,900",
                          difficulty: "Medium",
                          status: "Declining"
                        },
                        {
                          keyword: "content marketing",
                          position: 5,
                          change: "+5",
                          changeType: "up",
                          volume: "6,200",
                          difficulty: "Medium",
                          status: "Excellent"
                        },
                        {
                          keyword: "social media marketing",
                          position: 22,
                          change: "0",
                          changeType: "neutral",
                          volume: "9,800",
                          difficulty: "High",
                          status: "Stable"
                        }
                      ].map((row, index) => (
                        <tr key={index} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                            {row.keyword}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            #{row.position}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm">
                            <span className={`flex items-center ${row.changeType === 'up' ? 'text-green-600' : row.changeType === 'down' ? 'text-red-600' : 'text-gray-500'}`}>
                              {row.changeType === 'up' && <ArrowUp className="h-4 w-4 mr-1" />}
                              {row.changeType === 'down' && <ArrowDown className="h-4 w-4 mr-1" />}
                              {row.change}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {row.volume}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm">
                            <span className={`px-2 py-1 text-xs rounded-full ${row.difficulty === 'High' ? 'bg-red-100 text-red-800' :
                              row.difficulty === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                                'bg-green-100 text-green-800'
                              }`}>
                              {row.difficulty}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm">
                            <span className={`px-2 py-1 text-xs rounded-full ${row.status === 'Excellent' ? 'bg-green-100 text-green-800' :
                              row.status === 'Improving' ? 'bg-blue-100 text-blue-800' :
                                row.status === 'Declining' ? 'bg-red-100 text-red-800' :
                                  'bg-gray-100 text-gray-800'
                              }`}>
                              {row.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Performance Metrics */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="bg-white border border-gray-200 rounded-lg p-4 text-center">
                  <div className="text-2xl font-bold text-green-600">+2.5</div>
                  <div className="text-sm text-gray-600">Avg. Position Change</div>
                </div>
                <div className="bg-white border border-gray-200 rounded-lg p-4 text-center">
                  <div className="text-2xl font-bold text-blue-600">12.5</div>
                  <div className="text-sm text-gray-600">Avg. Position</div>
                </div>
                <div className="bg-white border border-gray-200 rounded-lg p-4 text-center">
                  <div className="text-2xl font-bold text-purple-600">37.5K</div>
                  <div className="text-sm text-gray-600">Total Search Volume</div>
                </div>
                <div className="bg-white border border-gray-200 rounded-lg p-4 text-center">
                  <div className="text-2xl font-bold text-orange-600">75%</div>
                  <div className="text-sm text-gray-600">Keywords Improving</div>
                </div>
              </div>
            </div>
          )}
        </div>
      )
    },
    {
      title: "Competitive Analysis",
      description: "Track your competitors' keyword performance and identify opportunities",
      content: (
        <div className="space-y-6">
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <h3 className="text-lg font-semibold mb-4 flex items-center">
              <Target className="h-5 w-5 text-blue-600 mr-2" />
              Top Competitors for &quot;digital marketing agency&quot;
            </h3>
            <div className="space-y-4">
              {[
                {
                  competitor: "MarketingPro Agency",
                  position: 1,
                  domain: "marketingpro.com",
                  backlinks: "45K",
                  domainAuthority: 78,
                  change: "+1"
                },
                {
                  competitor: "Digital Growth Solutions",
                  position: 2,
                  domain: "digitalgrowth.com",
                  backlinks: "32K",
                  domainAuthority: 72,
                  change: "-1"
                },
                {
                  competitor: "Your Agency",
                  position: 8,
                  domain: "youragency.com",
                  backlinks: "18K",
                  domainAuthority: 65,
                  change: "+2"
                },
                {
                  competitor: "Web Marketing Experts",
                  position: 12,
                  domain: "webmarketing.com",
                  backlinks: "28K",
                  domainAuthority: 70,
                  change: "0"
                }
              ].map((comp, index) => (
                <div key={index} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <span className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold">
                      {comp.position}
                    </span>
                    <div>
                      <p className="font-medium text-gray-900">{comp.competitor}</p>
                      <p className="text-sm text-gray-500">{comp.domain}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center space-x-4 text-sm">
                      <span className="text-gray-600">DA: {comp.domainAuthority}</span>
                      <span className="text-gray-600">{comp.backlinks} links</span>
                      <span className={`font-medium ${comp.change.startsWith('+') ? 'text-green-600' : comp.change.startsWith('-') ? 'text-red-600' : 'text-gray-500'}`}>
                        {comp.change}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h3 className="text-lg font-semibold mb-4">Keyword Opportunities</h3>
              <div className="space-y-3">
                <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                  <p className="font-medium text-gray-900">&quot;local digital marketing&quot;</p>
                  <p className="text-sm text-gray-600">Search Volume: 3,200 | Difficulty: Medium</p>
                  <p className="text-xs text-green-600 mt-1">Competitors ranking but you&apos;re not targeting</p>
                </div>
                <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                  <p className="font-medium text-gray-900">&quot;digital marketing consultant&quot;</p>
                  <p className="text-sm text-gray-600">Search Volume: 2,800 | Difficulty: Low</p>
                  <p className="text-xs text-blue-600 mt-1">Low competition, high search intent</p>
                </div>
                <div className="p-3 bg-purple-50 border border-purple-200 rounded-lg">
                  <p className="font-medium text-gray-900">&quot;B2B digital marketing&quot;</p>
                  <p className="text-sm text-gray-600">Search Volume: 1,900 | Difficulty: Medium</p>
                  <p className="text-xs text-purple-600 mt-1">Niche keyword with qualified leads</p>
                </div>
              </div>
            </div>

            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h3 className="text-lg font-semibold mb-4">Performance Insights</h3>
              <div className="space-y-3">
                <div className="flex items-start space-x-3">
                  <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                  <div>
                    <p className="font-medium text-gray-900">Strong Content Performance</p>
                    <p className="text-sm text-gray-600">&quot;content marketing&quot; ranking improved by 5 positions</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <AlertCircle className="h-5 w-5 text-yellow-600 mt-0.5" />
                  <div>
                    <p className="font-medium text-gray-900">SEO Services Declining</p>
                    <p className="text-sm text-gray-600">Lost 1 position, consider content updates</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <TrendingUp className="h-5 w-5 text-blue-600 mt-0.5" />
                  <div>
                    <p className="font-medium text-gray-900">Competitive Opportunity</p>
                    <p className="text-sm text-gray-600">3 competitors lost positions this month</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      title: "Tracking Reports & Alerts",
      description: "Set up automated reports and get notified of important ranking changes",
      content: (
        <div className="space-y-6">
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <h3 className="text-lg font-semibold mb-4 flex items-center">
              <BarChart3 className="h-5 w-5 text-green-600 mr-2" />
              Weekly Performance Report
            </h3>
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                  <h4 className="font-medium text-gray-900 mb-2">Ranking Changes</h4>
                  <div className="space-y-1 text-sm">
                    <div className="flex justify-between">
                      <span>Improved keywords:</span>
                      <span className="text-green-600 font-medium">3</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Declined keywords:</span>
                      <span className="text-red-600 font-medium">1</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Stable keywords:</span>
                      <span className="text-gray-600 font-medium">0</span>
                    </div>
                  </div>
                </div>
                <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                  <h4 className="font-medium text-gray-900 mb-2">Traffic Impact</h4>
                  <div className="space-y-1 text-sm">
                    <div className="flex justify-between">
                      <span>Organic traffic:</span>
                      <span className="text-green-600 font-medium">+15%</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Click-through rate:</span>
                      <span className="text-green-600 font-medium">+8%</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Conversions:</span>
                      <span className="text-green-600 font-medium">+12%</span>
                    </div>
                  </div>
                </div>
                <div className="p-4 bg-purple-50 border border-purple-200 rounded-lg">
                  <h4 className="font-medium text-gray-900 mb-2">Competitor Analysis</h4>
                  <div className="space-y-1 text-sm">
                    <div className="flex justify-between">
                      <span>Gained positions:</span>
                      <span className="text-green-600 font-medium">2</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Lost positions:</span>
                      <span className="text-red-600 font-medium">0</span>
                    </div>
                    <div className="flex justify-between">
                      <span>New opportunities:</span>
                      <span className="text-blue-600 font-medium">3</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h3 className="text-lg font-semibold mb-4">Alert Settings</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-gray-900">Position Changes</p>
                    <p className="text-sm text-gray-600">Notify when keywords move &gt;3 positions</p>
                  </div>
                  <div className="w-12 h-6 bg-green-500 rounded-full relative">
                    <div className="w-5 h-5 bg-white rounded-full absolute right-0.5 top-0.5"></div>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-gray-900">Competitor Alerts</p>
                    <p className="text-sm text-gray-600">When competitors lose positions</p>
                  </div>
                  <div className="w-12 h-6 bg-green-500 rounded-full relative">
                    <div className="w-5 h-5 bg-white rounded-full absolute right-0.5 top-0.5"></div>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-gray-900">Weekly Reports</p>
                    <p className="text-sm text-gray-600">Email summary every Monday</p>
                  </div>
                  <div className="w-12 h-6 bg-gray-300 rounded-full relative">
                    <div className="w-5 h-5 bg-white rounded-full absolute left-0.5 top-0.5"></div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h3 className="text-lg font-semibold mb-4">Recent Alerts</h3>
              <div className="space-y-3">
                <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                  <div className="flex items-center space-x-2 mb-1">
                    <ArrowUp className="h-4 w-4 text-green-600" />
                    <span className="text-sm font-medium text-green-800">Position Improved</span>
                  </div>
                  <p className="text-sm text-gray-700">&quot;content marketing&quot; moved from #10 to #5</p>
                  <p className="text-xs text-gray-500">2 hours ago</p>
                </div>
                <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                  <div className="flex items-center space-x-2 mb-1">
                    <Target className="h-4 w-4 text-blue-600" />
                    <span className="text-sm font-medium text-blue-800">Competitor Alert</span>
                  </div>
                  <p className="text-sm text-gray-700">&quot;MarketingPro Agency&rdquo; lost 2 positions</p>
                  <p className="text-xs text-gray-500">1 day ago</p>
                </div>
                <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <div className="flex items-center space-x-2 mb-1">
                    <AlertCircle className="h-4 w-4 text-yellow-600" />
                    <span className="text-sm font-medium text-yellow-800">Position Declined</span>
                  </div>
                  <p className="text-sm text-gray-700">&quot;SEO services&quot; dropped from #14 to #15</p>
                  <p className="text-xs text-gray-500">3 days ago</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )
    }
  ];

  const handleNext = () => {
    if (currentStep === 1) {
      setIsTracking(true);
      setTimeout(() => {
        setIsTracking(false);
        setCurrentStep(2);
      }, 3000);
    } else {
      setCurrentStep(prev => prev + 1);
    }
  };

  const handleReset = () => {
    setCurrentStep(0);
    setIsTracking(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-6xl mx-auto"
    >
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          Keyword Tracker Demo
        </h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Monitor your keyword rankings, track competitors, and get insights to improve
          your search engine performance with real-time data and automated alerts.
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
              {currentStep === 1 ? 'Update Rankings' : 'Next'}
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
            Keyword Tracking Setup Complete!
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm">
            <div>
              <span className="font-medium text-gray-700">Keywords Tracked:</span>
              <span className="ml-2 text-blue-600 font-semibold">4</span>
            </div>
            <div>
              <span className="font-medium text-gray-700">Avg. Position:</span>
              <span className="ml-2 text-green-600 font-semibold">12.5</span>
            </div>
            <div>
              <span className="font-medium text-gray-700">Improving:</span>
              <span className="ml-2 text-purple-600 font-semibold">75%</span>
            </div>
            <div>
              <span className="font-medium text-gray-700">Alerts Active:</span>
              <span className="ml-2 text-orange-600 font-semibold">2/3</span>
            </div>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
} 