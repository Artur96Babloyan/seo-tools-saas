"use client";

import React from 'react';
import { ServiceStatus } from '@/types/content-decay';
import {
  CheckCircle,
  XCircle,
  AlertTriangle,
  Settings,
  Wifi,
  Brain,
  Clock
} from 'lucide-react';

interface ContentDecayStatusProps {
  status: ServiceStatus | null;
  isConnected: boolean;
  onDisconnect: () => void;
}

export default function ContentDecayStatus({
  status,
  isConnected,
  onDisconnect
}: ContentDecayStatusProps) {
  if (!status) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
        <div className="flex items-center space-x-3">
          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
          <span className="text-gray-600 dark:text-gray-400">Checking service status...</span>
        </div>
      </div>
    );
  }

  const getStatusIcon = (status: string) => {
    switch (status.toLowerCase()) {
      case 'healthy':
        return <CheckCircle className="h-5 w-5 text-green-600" />;
      case 'warning':
        return <AlertTriangle className="h-5 w-5 text-yellow-600" />;
      case 'error':
        return <XCircle className="h-5 w-5 text-red-600" />;
      default:
        return <Settings className="h-5 w-5 text-gray-600" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'healthy':
        return 'text-green-600';
      case 'warning':
        return 'text-yellow-600';
      case 'error':
        return 'text-red-600';
      default:
        return 'text-gray-600';
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
          Service Status
        </h2>
        <div className="flex items-center space-x-2">
          {getStatusIcon(status.status)}
          <span className={`font-medium ${getStatusColor(status.status)}`}>
            {status.status.charAt(0).toUpperCase() + status.status.slice(1)}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Google Search Console Status */}
        <div className="space-y-3">
          <div className="flex items-center space-x-2">
            <Wifi className="h-5 w-5 text-blue-600" />
            <h3 className="font-medium text-gray-900 dark:text-white">
              Google Search Console
            </h3>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600 dark:text-gray-400">Connection:</span>
              <div className="flex items-center space-x-1">
                {status.googleSearchConsole.connected ? (
                  <CheckCircle className="h-4 w-4 text-green-600" />
                ) : (
                  <XCircle className="h-4 w-4 text-red-600" />
                )}
                <span className={`text-sm font-medium ${status.googleSearchConsole.connected ? 'text-green-600' : 'text-red-600'
                  }`}>
                  {status.googleSearchConsole.connected ? 'Connected' : 'Disconnected'}
                </span>
              </div>
            </div>

            {status.googleSearchConsole.connected && (
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600 dark:text-gray-400">Token Status:</span>
                <div className="flex items-center space-x-1">
                  {status.googleSearchConsole.expired ? (
                    <AlertTriangle className="h-4 w-4 text-yellow-600" />
                  ) : (
                    <CheckCircle className="h-4 w-4 text-green-600" />
                  )}
                  <span className={`text-sm font-medium ${status.googleSearchConsole.expired ? 'text-yellow-600' : 'text-green-600'
                    }`}>
                    {status.googleSearchConsole.expired ? 'Expired' : 'Valid'}
                  </span>
                </div>
              </div>
            )}

            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600 dark:text-gray-400">Configured:</span>
              <div className="flex items-center space-x-1">
                {status.googleSearchConsole.configured ? (
                  <CheckCircle className="h-4 w-4 text-green-600" />
                ) : (
                  <XCircle className="h-4 w-4 text-red-600" />
                )}
                <span className={`text-sm font-medium ${status.googleSearchConsole.configured ? 'text-green-600' : 'text-red-600'
                  }`}>
                  {status.googleSearchConsole.configured ? 'Yes' : 'No'}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Content Decay Configuration */}
        <div className="space-y-3">
          <div className="flex items-center space-x-2">
            <Settings className="h-5 w-5 text-purple-600" />
            <h3 className="font-medium text-gray-900 dark:text-white">
              Content Decay
            </h3>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600 dark:text-gray-400">Configured:</span>
              <div className="flex items-center space-x-1">
                {status.contentDecay.configured ? (
                  <CheckCircle className="h-4 w-4 text-green-600" />
                ) : (
                  <XCircle className="h-4 w-4 text-red-600" />
                )}
                <span className={`text-sm font-medium ${status.contentDecay.configured ? 'text-green-600' : 'text-red-600'
                  }`}>
                  {status.contentDecay.configured ? 'Yes' : 'No'}
                </span>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600 dark:text-gray-400">Decay Threshold:</span>
              <span className="text-sm font-medium text-gray-900 dark:text-white">
                {(status.contentDecay.decayThreshold * 100).toFixed(0)}%
              </span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600 dark:text-gray-400">Position Threshold:</span>
              <span className="text-sm font-medium text-gray-900 dark:text-white">
                #{status.contentDecay.positionThreshold}
              </span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600 dark:text-gray-400">Analysis Period:</span>
              <span className="text-sm font-medium text-gray-900 dark:text-white">
                {status.contentDecay.analysisPeriod} months
              </span>
            </div>
          </div>
        </div>

        {/* OpenAI Configuration */}
        <div className="space-y-3">
          <div className="flex items-center space-x-2">
            <Brain className="h-5 w-5 text-green-600" />
            <h3 className="font-medium text-gray-900 dark:text-white">
              AI Recommendations
            </h3>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600 dark:text-gray-400">OpenAI:</span>
              <div className="flex items-center space-x-1">
                {status.openai.configured ? (
                  <CheckCircle className="h-4 w-4 text-green-600" />
                ) : (
                  <XCircle className="h-4 w-4 text-red-600" />
                )}
                <span className={`text-sm font-medium ${status.openai.configured ? 'text-green-600' : 'text-red-600'
                  }`}>
                  {status.openai.configured ? 'Configured' : 'Not Configured'}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Connection Actions */}
      {isConnected && (
        <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Clock className="h-4 w-4 text-gray-500" />
              <span className="text-sm text-gray-600 dark:text-gray-400">
                Last updated: {new Date(status.timestamp).toLocaleString()}
              </span>
            </div>

            <button
              onClick={onDisconnect}
              className="inline-flex items-center space-x-2 px-4 py-2 text-sm bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
            >
              <XCircle className="h-4 w-4" />
              <span>Disconnect</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
} 