"use client";

import Link from "next/link";
import { ArrowLeft, Home, Search, Globe } from "lucide-react";

export default function NotFoundContent() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        {/* 404 Number */}
        <div className="mb-8">
          <h1 className="text-9xl font-bold text-primary/20">404</h1>
        </div>

        {/* Error Message */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-foreground mb-4">
            Page Not Found
          </h2>
          <p className="text-muted-foreground mb-6">
            The page you&apos;re looking for doesn&apos;t exist. It might have been moved, deleted, or you entered the wrong URL.
          </p>
        </div>

        {/* Popular Tools */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold text-foreground mb-4">
            Popular SEO Tools
          </h3>
          <div className="grid grid-cols-1 gap-3">
            <Link
              href="/dashboard/seo-optimizer"
              className="flex items-center justify-center space-x-2 p-3 rounded-lg border border-border bg-card hover:bg-accent transition-colors"
            >
              <Search className="h-5 w-5 text-primary" />
              <span>AI Content Optimizer</span>
            </Link>
            <Link
              href="/dashboard/sitemap"
              className="flex items-center justify-center space-x-2 p-3 rounded-lg border border-border bg-card hover:bg-accent transition-colors"
            >
              <Globe className="h-5 w-5 text-primary" />
              <span>Sitemap Generator</span>
            </Link>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/"
            className="flex items-center justify-center space-x-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary-dark transition-colors"
          >
            <Home className="h-5 w-5" />
            <span>Go Home</span>
          </Link>
          <button
            onClick={() => window.history.back()}
            className="flex items-center justify-center space-x-2 px-6 py-3 border border-border bg-card text-foreground rounded-lg hover:bg-accent transition-colors"
          >
            <ArrowLeft className="h-5 w-5" />
            <span>Go Back</span>
          </button>
        </div>

        {/* SEO Content */}
        <div className="mt-12 p-6 bg-muted/50 rounded-lg">
          <h4 className="font-semibold text-foreground mb-2">
            Looking for SEO tools?
          </h4>
          <p className="text-sm text-muted-foreground mb-4">
            Our comprehensive SEO suite includes AI content optimization, sitemap generation, meta tag validation, page speed analysis, keyword tracking, and competitor analysis.
          </p>
          <Link
            href="/dashboard"
            className="inline-flex items-center space-x-2 text-sm text-primary hover:underline"
          >
            <span>Explore all tools</span>
            <ArrowLeft className="h-4 w-4 rotate-180" />
          </Link>
        </div>
      </div>
    </div>
  );
} 