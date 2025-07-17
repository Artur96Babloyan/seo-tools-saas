"use client";

import { ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';
import SerpOptimizerForm from '@/components/SerpOptimizerForm';

export default function SerpOptimizerPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8">
        {/* Header */}
        <div className="mb-6 sm:mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => router.push('/dashboard')}
                className="inline-flex items-center space-x-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors text-sm sm:text-base"
              >
                <ArrowLeft className="h-4 w-4 sm:h-5 sm:w-5" />
                <span className="hidden sm:inline">Back to Dashboard</span>
                <span className="sm:hidden">Back</span>
              </button>
            </div>
          </div>

          <div className="mt-4 sm:mt-6">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
              SERP Optimizer
            </h1>
            <p className="mt-2 text-base sm:text-lg text-gray-600 dark:text-gray-400">
              Optimize your title and meta description for better click-through rates in search results
            </p>
          </div>
        </div>

        {/* Main Content */}
        <SerpOptimizerForm />
      </div>
    </div>
  );
} 