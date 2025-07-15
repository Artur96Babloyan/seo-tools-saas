"use client";

import { CheckCircle, AlertCircle, Info } from 'lucide-react';

interface CharacterCounterProps {
  current: number;
  min: number;
  max: number;
  label: string;
  className?: string;
}

export default function CharacterCounter({
  current,
  min,
  max,
  label,
  className = ""
}: CharacterCounterProps) {
  const percentage = (current / max) * 100;
  const isValid = current >= min && current <= max;
  const isWarning = current > max * 0.9; // Warning at 90% of max
  const isError = current > max;

  const getStatusColor = () => {
    if (isError) return 'text-red-600';
    if (isWarning) return 'text-yellow-600';
    if (isValid) return 'text-green-600';
    return 'text-gray-500';
  };

  const getStatusIcon = () => {
    if (isError) return <AlertCircle className="h-4 w-4" />;
    if (isWarning) return <AlertCircle className="h-4 w-4" />;
    if (isValid) return <CheckCircle className="h-4 w-4" />;
    return <Info className="h-4 w-4" />;
  };

  const getProgressColor = () => {
    if (isError) return 'bg-red-500';
    if (isWarning) return 'bg-yellow-500';
    if (isValid) return 'bg-green-500';
    return 'bg-gray-300';
  };

  return (
    <div className={`flex items-center justify-between text-sm ${className}`}>
      <div className="flex items-center space-x-2">
        {getStatusIcon()}
        <span className={`font-medium ${getStatusColor()}`}>
          {label}: {current}/{max}
        </span>
      </div>

      <div className="flex items-center space-x-2">
        {/* Progress bar */}
        <div className="w-16 h-2 bg-gray-200 rounded-full overflow-hidden">
          <div
            className={`h-full transition-all duration-300 ${getProgressColor()}`}
            style={{ width: `${Math.min(percentage, 100)}%` }}
          />
        </div>

        {/* Status text */}
        <span className={`text-xs ${getStatusColor()}`}>
          {isError ? 'Too long' :
            isWarning ? 'Near limit' :
              isValid ? 'Good' :
                current < min ? 'Too short' : 'Valid'}
        </span>
      </div>
    </div>
  );
} 