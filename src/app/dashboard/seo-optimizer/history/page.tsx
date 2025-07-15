"use client";

import { ArrowLeft, Plus } from 'lucide-react';
import { useRouter } from 'next/navigation';
import OptimizationHistory from '@/components/seo-optimizer/OptimizationHistory';

export default function OptimizationHistoryPage() {
  const router = useRouter();

  const handleViewOptimization = (id: string) => {
    router.push(`/dashboard/seo-optimizer/${id}`);
  };

  const handleNewOptimization = () => {
    router.push('/dashboard/seo-optimizer');
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => router.push('/dashboard/seo-optimizer')}
                className="inline-flex items-center space-x-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
              >
                <ArrowLeft className="h-5 w-5" />
                <span>Back to Optimizer</span>
              </button>
            </div>

            <button
              onClick={handleNewOptimization}
              className="inline-flex items-center space-x-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
            >
              <Plus className="h-4 w-4" />
              <span>New Optimization</span>
            </button>
          </div>

          <div className="mt-4">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              Optimization History
            </h1>
            <p className="mt-2 text-lg text-gray-600 dark:text-gray-400">
              View and manage all your content optimizations
            </p>
          </div>
        </div>

        {/* History Component */}
        <OptimizationHistory onViewOptimization={handleViewOptimization} />
      </div>
    </div>
  );
} 