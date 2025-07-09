import React, { useState } from 'react';
import { AlertCircle, Info, Globe, Monitor, Smartphone, Clock } from 'lucide-react';

const PerformanceDisclaimer: React.FC = () => {
  const [isExpanded, setIsExpanded] = useState<boolean>(false);

  return (
    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
      <div className="flex items-start gap-3">
        <Info className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
        <div className="flex-1">
          <h3 className="font-medium text-blue-900 mb-2">
            Why Performance Scores May Differ
          </h3>
          <p className="text-blue-800 text-sm mb-3">
            Performance scores from our tool may differ from your browser&apos;s DevTools. This is normal and expected.
          </p>

          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-blue-600 text-sm font-medium hover:text-blue-700 underline"
          >
            {isExpanded ? 'Show Less' : 'Learn Why →'}
          </button>

          {isExpanded && (
            <div className="mt-4 space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-white p-4 rounded-lg border border-blue-100">
                  <div className="flex items-center gap-2 mb-2">
                    <Globe className="h-4 w-4 text-blue-600" />
                    <h4 className="font-medium text-gray-900">Our SEO Tool</h4>
                  </div>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• Uses Google PageSpeed Insights API</li>
                    <li>• Tests from Google&apos;s servers</li>
                    <li>• Standardized testing environment</li>
                    <li>• Simulated mobile/desktop conditions</li>
                  </ul>
                </div>

                <div className="bg-white p-4 rounded-lg border border-blue-100">
                  <div className="flex items-center gap-2 mb-2">
                    <Monitor className="h-4 w-4 text-blue-600" />
                    <h4 className="font-medium text-gray-900">Browser DevTools</h4>
                  </div>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• Tests from your local machine</li>
                    <li>• Uses your actual internet speed</li>
                    <li>• Affected by browser extensions</li>
                    <li>• Real-time network conditions</li>
                  </ul>
                </div>
              </div>

              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
                <div className="flex items-start gap-2">
                  <AlertCircle className="h-4 w-4 text-yellow-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <h5 className="font-medium text-yellow-800 text-sm">Key Differences</h5>
                    <div className="text-sm text-yellow-700 mt-1 space-y-1">
                      <div className="flex items-center gap-2">
                        <Clock className="h-3 w-3" />
                        <span><strong>Network Speed:</strong> API uses throttled 4G, DevTools uses your actual speed</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Smartphone className="h-3 w-3" />
                        <span><strong>Device:</strong> API simulates devices, DevTools uses your actual device</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Globe className="h-3 w-3" />
                        <span><strong>Location:</strong> API tests from Google&apos;s servers globally</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="text-sm text-gray-600">
                <p><strong>Which score is more accurate?</strong></p>
                <p>Both are valid! Our tool shows how your site performs under standardized conditions (useful for SEO), while DevTools shows real user experience on your specific setup.</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PerformanceDisclaimer; 