import React from 'react';
import { CheckCircle, AlertTriangle } from 'lucide-react';

interface DataSourceIndicatorProps {
  isRealData: boolean;
  apiSource?: string;
}

const DataSourceIndicator: React.FC<DataSourceIndicatorProps> = ({ isRealData }) => {
  if (isRealData) {
    return (
      <div className="bg-green-50 border border-green-200 rounded-lg p-3 mb-4">
        <div className="flex items-center gap-2">
          <CheckCircle className="h-5 w-5 text-green-600" />
          <div>
            <span className="text-green-800 font-medium">Real API Data</span>
            <p className="text-green-700 text-sm">
              Analysis powered by Google PageSpeed Insights API - same data used by Google for SEO rankings
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 mb-4">
      <div className="flex items-center gap-2">
        <AlertTriangle className="h-5 w-5 text-yellow-600" />
        <div>
          <span className="text-yellow-800 font-medium">Demo Data</span>
          <p className="text-yellow-700 text-sm">
            Using simulated data for demonstration. Configure GOOGLE_PAGESPEED_API_KEY for real analysis.
          </p>
        </div>
      </div>
    </div>
  );
};

export default DataSourceIndicator; 