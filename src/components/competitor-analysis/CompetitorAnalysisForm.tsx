"use client";

import { useState } from 'react';
import { Plus, X, Users, TrendingUp, AlertCircle } from 'lucide-react';
import { CompetitorAnalysisRequest } from '@/types/competitor';

interface CompetitorAnalysisFormProps {
  onSubmit: (request: CompetitorAnalysisRequest) => void;
  isLoading: boolean;
  error: string | null;
}

export default function CompetitorAnalysisForm({ onSubmit, isLoading, error }: CompetitorAnalysisFormProps) {
  const [mainDomain, setMainDomain] = useState('');
  const [competitorDomains, setCompetitorDomains] = useState<string[]>(['']);
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});

  const normalizeDomain = (domain: string): string => {
    if (!domain) return '';

    let normalized = domain.trim().toLowerCase();

    // Remove protocol (https://, http://) - but keep www. and subdomains
    normalized = normalized.replace(/^https?:\/\//, '');

    // Remove trailing slash and path
    normalized = normalized.split('/')[0];

    return normalized;
  };

  const validateDomain = (domain: string): boolean => {
    const normalized = normalizeDomain(domain);
    // Allow www. and subdomains - more flexible regex
    const domainRegex = /^(?:[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?\.)+[a-zA-Z]{2,}$/;
    return domainRegex.test(normalized);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const errors: Record<string, string> = {};

    // Validate and clean main domain
    const cleanedMainDomain = normalizeDomain(mainDomain);
    if (!mainDomain.trim()) {
      errors.mainDomain = 'Main domain is required';
    } else if (!validateDomain(mainDomain.trim())) {
      errors.mainDomain = 'Please enter a valid domain (e.g., www.example.com)';
    }

    // Validate and clean competitor domains
    const cleanedCompetitors = competitorDomains.filter(domain => domain.trim());
    const cleanedCompetitorDomains = cleanedCompetitors.map(domain => normalizeDomain(domain));

    if (cleanedCompetitors.length === 0) {
      errors.competitorDomains = 'At least one competitor domain is required';
    } else {
      cleanedCompetitors.forEach((domain, index) => {
        if (!validateDomain(domain.trim())) {
          errors[`competitor-${index}`] = 'Please enter a valid domain (e.g., www.competitor.com)';
        }
      });
    }

    // Check for duplicate domains (using cleaned versions)
    const allCleanedDomains = [cleanedMainDomain, ...cleanedCompetitorDomains];
    const uniqueDomains = new Set(allCleanedDomains);
    if (uniqueDomains.size !== allCleanedDomains.length) {
      errors.duplicates = 'Duplicate domains are not allowed';
    }

    setValidationErrors(errors);

    if (Object.keys(errors).length === 0) {
      onSubmit({
        mainDomain: cleanedMainDomain,
        competitorDomains: cleanedCompetitorDomains
      });
    }
  };

  const addCompetitorField = () => {
    if (competitorDomains.length < 5) {
      setCompetitorDomains([...competitorDomains, '']);
    }
  };

  const removeCompetitorField = (index: number) => {
    if (competitorDomains.length > 1) {
      setCompetitorDomains(competitorDomains.filter((_, i) => i !== index));
      // Clear validation error for removed field
      const newErrors = { ...validationErrors };
      delete newErrors[`competitor-${index}`];
      setValidationErrors(newErrors);
    }
  };

  const updateCompetitorDomain = (index: number, value: string) => {
    const newDomains = [...competitorDomains];
    newDomains[index] = value;
    setCompetitorDomains(newDomains);

    // Clear validation error for this field
    if (validationErrors[`competitor-${index}`]) {
      const newErrors = { ...validationErrors };
      delete newErrors[`competitor-${index}`];
      setValidationErrors(newErrors);
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
      <div className="flex items-center space-x-2 mb-6">
        <TrendingUp className="h-5 w-5 text-blue-600 dark:text-blue-400" />
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
          Competitor Analysis
        </h2>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Main Domain */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Your Domain
          </label>
          <input
            type="text"
            value={mainDomain}
            onChange={(e) => {
              setMainDomain(e.target.value);
              if (validationErrors.mainDomain) {
                const newErrors = { ...validationErrors };
                delete newErrors.mainDomain;
                setValidationErrors(newErrors);
              }
            }}
            onBlur={(e) => {
              // Auto-clean domain on blur (remove https:// if present)
              const cleaned = normalizeDomain(e.target.value);
              if (cleaned !== e.target.value) {
                setMainDomain(cleaned);
              }
            }}
            placeholder="www.example.com"
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
            disabled={isLoading}
          />
          <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
            Enter domain without https:// (e.g., www.example.com or subdomain.example.com)
          </p>
          {validationErrors.mainDomain && (
            <p className="mt-1 text-sm text-red-600 dark:text-red-400 flex items-center">
              <AlertCircle className="h-4 w-4 mr-1" />
              {validationErrors.mainDomain}
            </p>
          )}
        </div>

        {/* Competitor Domains */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Competitor Domains
            </label>
            <span className="text-xs text-gray-500 dark:text-gray-400">
              {competitorDomains.length}/5 domains
            </span>
          </div>
          <p className="text-xs text-gray-500 dark:text-gray-400 mb-3">
            Enter domains without https:// (e.g., www.competitor.com or subdomain.competitor.com)
          </p>

          <div className="space-y-3">
            {competitorDomains.map((domain, index) => (
              <div key={index} className="flex items-center space-x-2">
                <div className="flex-1">
                  <input
                    type="text"
                    value={domain}
                    onChange={(e) => updateCompetitorDomain(index, e.target.value)}
                    onBlur={(e) => {
                      // Auto-clean domain on blur (remove https:// if present)
                      const cleaned = normalizeDomain(e.target.value);
                      if (cleaned !== e.target.value) {
                        updateCompetitorDomain(index, cleaned);
                      }
                    }}
                    placeholder="www.competitor.com"
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                    disabled={isLoading}
                  />
                  {validationErrors[`competitor-${index}`] && (
                    <p className="mt-1 text-sm text-red-600 dark:text-red-400 flex items-center">
                      <AlertCircle className="h-4 w-4 mr-1" />
                      {validationErrors[`competitor-${index}`]}
                    </p>
                  )}
                </div>

                {competitorDomains.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeCompetitorField(index)}
                    className="p-2 text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 disabled:opacity-50"
                    disabled={isLoading}
                  >
                    <X className="h-4 w-4" />
                  </button>
                )}
              </div>
            ))}

            {competitorDomains.length < 5 && (
              <button
                type="button"
                onClick={addCompetitorField}
                className="w-full px-3 py-2 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-md text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:border-gray-400 dark:hover:border-gray-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={isLoading}
              >
                <Plus className="h-4 w-4 mx-auto mb-1" />
                Add Competitor
              </button>
            )}
          </div>

          {validationErrors.competitorDomains && (
            <p className="mt-2 text-sm text-red-600 dark:text-red-400 flex items-center">
              <AlertCircle className="h-4 w-4 mr-1" />
              {validationErrors.competitorDomains}
            </p>
          )}

          {validationErrors.duplicates && (
            <p className="mt-2 text-sm text-red-600 dark:text-red-400 flex items-center">
              <AlertCircle className="h-4 w-4 mr-1" />
              {validationErrors.duplicates}
            </p>
          )}
        </div>

        {/* Submit Button */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-3 sm:space-y-0">
          <div className="text-sm text-muted-foreground">
            <Users className="h-4 w-4 inline mr-1" />
            Analysis takes 2-5 minutes
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full sm:w-auto px-6 py-3 sm:py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium"
          >
            {isLoading ? (
              <div className="flex items-center justify-center">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                Analyzing...
              </div>
            ) : (
              'Compare SEO'
            )}
          </button>
        </div>

        {/* Error Message */}
        {error && (
          <div className="p-4 bg-red-50 dark:bg-red-900/50 border border-red-200 dark:border-red-800 rounded-md">
            <div className="flex items-center">
              <AlertCircle className="h-5 w-5 text-red-600 dark:text-red-400 mr-2" />
              <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
            </div>
          </div>
        )}
      </form>
    </div>
  );
} 