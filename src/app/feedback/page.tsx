"use client";

import { useState } from "react";
import Link from "next/link";
import { BarChart3, MessageSquare, Bug, Lightbulb, Star, Send, CheckCircle, ArrowLeft } from "lucide-react";

export default function FeedbackPage() {
  const [feedbackType, setFeedbackType] = useState("");
  const [subject, setSubject] = useState("");
  const [description, setDescription] = useState("");
  const [email, setEmail] = useState("");
  const [priority, setPriority] = useState("");
  const [category, setCategory] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const feedbackTypes = [
    {
      id: "general",
      title: "General Feedback",
      description: "Share your thoughts about our platform",
      icon: MessageSquare,
      color: "bg-blue-500"
    },
    {
      id: "bug",
      title: "Bug Report",
      description: "Report an issue or problem you encountered",
      icon: Bug,
      color: "bg-red-500"
    },
    {
      id: "feature",
      title: "Feature Request",
      description: "Suggest a new feature or improvement",
      icon: Lightbulb,
      color: "bg-green-500"
    },
    {
      id: "praise",
      title: "Praise & Kudos",
      description: "Tell us what you love about AuditCraft",
      icon: Star,
      color: "bg-yellow-500"
    }
  ];

  const priorityLevels = [
    { value: "low", label: "Low", description: "Nice to have" },
    { value: "medium", label: "Medium", description: "Important" },
    { value: "high", label: "High", description: "Critical" }
  ];

  const categories = [
    "AI Content Optimizer",
    "Sitemap Generator",
    "Meta Tag Validator",
    "Page Speed Auditor",
    "Keyword Tracker",
    "Competitor Analysis",
    "Dashboard & UI",
    "Account & Billing",
    "API & Integration",
    "Other"
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));

    setIsSubmitting(false);
    setIsSubmitted(true);
  };

  const resetForm = () => {
    setFeedbackType("");
    setSubject("");
    setDescription("");
    setEmail("");
    setPriority("");
    setCategory("");
    setIsSubmitted(false);
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-background">
        {/* Header */}
        <header className="border-b border-border bg-card/50 backdrop-blur-sm">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex h-16 items-center justify-between">
              <div className="flex items-center space-x-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                  <BarChart3 className="h-5 w-5" />
                </div>
                <span className="text-xl font-bold text-foreground">AuditCraft</span>
              </div>
              <div className="flex items-center space-x-4">
                <Link
                  href="/dashboard"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Dashboard
                </Link>
              </div>
            </div>
          </div>
        </header>

        {/* Success Message */}
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="mx-auto max-w-2xl text-center">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-100 dark:bg-green-900/20">
              <CheckCircle className="h-8 w-8 text-green-600 dark:text-green-400" />
            </div>
            <h1 className="mt-6 text-3xl font-bold text-foreground">
              Thank you for your feedback!
            </h1>
            <p className="mt-4 text-lg text-muted-foreground">
              We&apos;ve received your message and will review it carefully. Our team will get back to you if needed.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                onClick={resetForm}
                className="flex items-center justify-center space-x-2 rounded-xl bg-primary px-8 py-4 text-lg font-semibold text-white shadow-lg transition-all hover:bg-primary-dark hover:shadow-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
              >
                <span>Send More Feedback</span>
              </button>
              <Link
                href="/dashboard"
                className="flex items-center justify-center space-x-2 rounded-xl border border-border bg-card px-8 py-4 text-lg font-semibold text-foreground shadow-sm transition-all hover:bg-accent hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
              >
                <ArrowLeft className="h-5 w-5" />
                <span>Back to Dashboard</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                <BarChart3 className="h-5 w-5" />
              </div>
              <span className="text-xl font-bold text-foreground">AuditCraft</span>
            </div>
            <div className="flex items-center space-x-4">
              <Link
                href="/dashboard"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                Dashboard
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="mx-auto max-w-4xl">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
              Send Feedback
            </h1>
            <p className="mt-6 text-lg leading-8 text-muted-foreground">
              Help us improve AuditCraft by sharing your thoughts, reporting issues, or suggesting new features.
            </p>
          </div>

          {/* Feedback Type Selection */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-foreground mb-6">What type of feedback do you have?</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {feedbackTypes.map((type) => (
                <button
                  key={type.id}
                  onClick={() => setFeedbackType(type.id)}
                  className={`p-6 rounded-xl border-2 transition-all text-left ${feedbackType === type.id
                    ? "border-primary bg-primary/5"
                    : "border-border bg-card hover:border-primary/50 hover:shadow-lg"
                    }`}
                >
                  <div className="flex items-start space-x-4">
                    <div className={`flex h-12 w-12 items-center justify-center rounded-lg ${type.color} text-white`}>
                      <type.icon className="h-6 w-6" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-card-foreground">
                        {type.title}
                      </h3>
                      <p className="mt-2 text-sm text-muted-foreground">
                        {type.description}
                      </p>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Feedback Form */}
          {feedbackType && (
            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="rounded-xl border border-border bg-card p-8">
                <h2 className="text-2xl font-bold text-foreground mb-6">Tell us more</h2>

                {/* Subject */}
                <div className="mb-6">
                  <label htmlFor="subject" className="block text-sm font-medium text-foreground mb-2">
                    Subject *
                  </label>
                  <input
                    type="text"
                    id="subject"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    required
                    placeholder="Brief summary of your feedback"
                    className="w-full px-4 py-3 border border-border rounded-lg bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                </div>

                {/* Category */}
                <div className="mb-6">
                  <label htmlFor="category" className="block text-sm font-medium text-foreground mb-2">
                    Category
                  </label>
                  <select
                    id="category"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full px-4 py-3 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  >
                    <option value="">Select a category</option>
                    {categories.map((cat) => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>

                {/* Priority (for bug reports and feature requests) */}
                {(feedbackType === "bug" || feedbackType === "feature") && (
                  <div className="mb-6">
                    <label className="block text-sm font-medium text-foreground mb-3">
                      Priority Level
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      {priorityLevels.map((level) => (
                        <button
                          key={level.value}
                          type="button"
                          onClick={() => setPriority(level.value)}
                          className={`p-4 rounded-lg border-2 transition-all text-left ${priority === level.value
                            ? "border-primary bg-primary/5"
                            : "border-border bg-background hover:border-primary/50"
                            }`}
                        >
                          <div className="font-medium text-foreground">{level.label}</div>
                          <div className="text-sm text-muted-foreground">{level.description}</div>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Description */}
                <div className="mb-6">
                  <label htmlFor="description" className="block text-sm font-medium text-foreground mb-2">
                    Description *
                  </label>
                  <textarea
                    id="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                    rows={8}
                    placeholder={
                      feedbackType === "bug"
                        ? "Please describe the issue you encountered, including steps to reproduce it..."
                        : feedbackType === "feature"
                          ? "Please describe the feature you&apos;d like to see, including use cases and benefits..."
                          : "Please share your detailed feedback..."
                    }
                    className="w-full px-4 py-3 border border-border rounded-lg bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent resize-vertical"
                  />
                </div>

                {/* Email */}
                <div className="mb-6">
                  <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your@email.com (optional, for follow-up)"
                    className="w-full px-4 py-3 border border-border rounded-lg bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                  <p className="mt-2 text-sm text-muted-foreground">
                    We&apos;ll only use this to follow up on your feedback if needed.
                  </p>
                </div>
              </div>

              {/* Submit Button */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                <Link
                  href="/dashboard"
                  className="flex items-center space-x-2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  <ArrowLeft className="h-4 w-4" />
                  <span>Back to Dashboard</span>
                </Link>
                <button
                  type="submit"
                  disabled={isSubmitting || !subject || !description}
                  className="flex items-center justify-center space-x-2 rounded-xl bg-primary px-8 py-4 text-lg font-semibold text-white shadow-lg transition-all hover:bg-primary-dark hover:shadow-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      <div className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                      <span>Sending...</span>
                    </>
                  ) : (
                    <>
                      <Send className="h-5 w-5" />
                      <span>Send Feedback</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          )}

          {/* Additional Info */}
          {!feedbackType && (
            <div className="mt-12 rounded-xl border border-border bg-card p-8">
              <h3 className="text-xl font-bold text-foreground mb-4">Why your feedback matters</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-foreground mb-2">We listen to every suggestion</h4>
                  <p className="text-sm text-muted-foreground">
                    Your feedback directly influences our product roadmap and helps us build features that matter to you.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-foreground mb-2">Quick response guaranteed</h4>
                  <p className="text-sm text-muted-foreground">
                    We review all feedback within 24 hours and will reach out if we need more information.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-foreground mb-2">Bug reports get priority</h4>
                  <p className="text-sm text-muted-foreground">
                    Technical issues are addressed quickly to ensure your SEO workflow isn&apos;t interrupted.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-foreground mb-2">Feature requests tracked</h4>
                  <p className="text-sm text-muted-foreground">
                    Popular feature requests are prioritized in our development schedule.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 