"use client";

import Link from "next/link";
import { useState } from "react";
import {
  Search, FileText, BarChart3, MessageCircle, Video,
  Sparkles, Globe, Zap, TrendingUp, Users, User, CheckCircle,
  HelpCircle
} from "lucide-react";
import { FooterWrapper } from "@/shared/ui/footer/FooterWrapper";
import { Header } from "@/components/Header";
import { motion, AnimatePresence } from "framer-motion";
import {
  GettingStartedDemo,
  LoginSignupDemo,
  DashboardDemo,
  AIContentOptimizerDemo,
  SERPOptimizerDemo,
  SitemapGeneratorDemo,
  MetaTagValidatorDemo,
  PageSpeedAuditorDemo,
  KeywordTrackerDemo,
  CompetitorAnalysisDemo,
  ReportsAnalyticsDemo,
  TroubleshootingDemo
} from "@/components/help-demos";

export default function HelpCenterPage() {
  const [activeSection, setActiveSection] = useState('getting-started');
  const [searchQuery, setSearchQuery] = useState('');



  return (
    <div className="min-h-screen bg-background">
      <Header showAuthButtons={false} />

      {/* Hero Section */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="py-16 sm:py-24"
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-4xl text-center">
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl"
            >
              Interactive Help Center
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-muted-foreground"
            >
              Learn how to use AuditCraft with interactive demonstrations, step-by-step guides, and animated tutorials.
            </motion.p>

            {/* Search Bar */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="mt-10 max-w-2xl mx-auto"
            >
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search for help articles, tutorials, or guides..."
                  className="w-full pl-12 pr-4 py-4 border border-border rounded-xl bg-card text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Navigation Tabs */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.8 }}
        className="py-8 border-b border-border"
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap gap-2 justify-center">
            {[
              { id: 'getting-started', label: 'Getting Started', icon: Sparkles },
              { id: 'login-signup', label: 'Login & Signup', icon: User },
              { id: 'dashboard', label: 'Dashboard', icon: BarChart3 },
              { id: 'ai-optimizer', label: 'AI Content Optimizer', icon: FileText },
              { id: 'serp-optimizer', label: 'SERP Optimizer', icon: Search },
              { id: 'sitemap', label: 'Sitemap Generator', icon: Globe },
              { id: 'meta-tags', label: 'Meta Tag Validator', icon: CheckCircle },
              { id: 'page-speed', label: 'Page Speed Auditor', icon: Zap },
              { id: 'keyword-tracker', label: 'Keyword Tracker', icon: TrendingUp },
              { id: 'competitor', label: 'Competitor Analysis', icon: Users },
              { id: 'reports', label: 'Reports & Analytics', icon: BarChart3 },
              { id: 'troubleshooting', label: 'Troubleshooting', icon: HelpCircle }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveSection(tab.id)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg border transition-all ${activeSection === tab.id
                  ? 'bg-primary text-white border-primary'
                  : 'bg-card text-muted-foreground border-border hover:border-primary/50 hover:text-foreground'
                  }`}
              >
                <tab.icon className="h-4 w-4" />
                <span className="text-sm font-medium">{tab.label}</span>
              </button>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Content Sections */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <AnimatePresence mode="wait">
          {activeSection === 'getting-started' && <GettingStartedDemo />}

          {activeSection === 'login-signup' && <LoginSignupDemo />}

          {activeSection === 'dashboard' && <DashboardDemo />}

          {activeSection === 'ai-optimizer' && <AIContentOptimizerDemo />}

          {activeSection === 'serp-optimizer' && <SERPOptimizerDemo />}

          {activeSection === 'sitemap' && <SitemapGeneratorDemo />}

          {activeSection === 'meta-tags' && <MetaTagValidatorDemo />}

          {activeSection === 'page-speed' && <PageSpeedAuditorDemo />}

          {activeSection === 'keyword-tracker' && <KeywordTrackerDemo />}

          {activeSection === 'competitor' && <CompetitorAnalysisDemo />}

          {activeSection === 'reports' && <ReportsAnalyticsDemo />}

          {activeSection === 'troubleshooting' && <TroubleshootingDemo />}
        </AnimatePresence>
      </div>

      {/* Contact Support CTA */}
      <section className="py-16 bg-primary/5">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-foreground">
              Still need help?
            </h2>
            <p className="mt-6 text-lg leading-8 text-muted-foreground">
              Can&apos;t find what you&apos;re looking for? Our support team is here to help you get the most out of AuditCraft.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/contact"
                className="flex items-center justify-center space-x-2 rounded-xl bg-primary px-8 py-4 text-lg font-semibold text-white shadow-lg transition-all hover:bg-primary-dark hover:shadow-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
              >
                <MessageCircle className="h-5 w-5" />
                <span>Contact Support</span>
              </Link>
              <Link
                href="/help/tutorials"
                className="flex items-center justify-center space-x-2 rounded-xl border border-border bg-card px-8 py-4 text-lg font-semibold text-foreground shadow-sm transition-all hover:bg-accent hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
              >
                <Video className="h-5 w-5" />
                <span>Watch Tutorials</span>
              </Link>
            </div>
          </div>
        </div>
      </section>
      <FooterWrapper />
    </div>
  );
} 