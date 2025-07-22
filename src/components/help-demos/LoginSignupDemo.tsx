"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, ArrowRight } from "lucide-react";
import Link from "next/link";

export function LoginSignupDemo() {
  const [showLoginDemo, setShowLoginDemo] = useState(false);
  const [showSignupDemo, setShowSignupDemo] = useState(false);

  // Auto-play animation for login demo
  useEffect(() => {
    if (showLoginDemo) {
      const timer = setTimeout(() => {
        setShowLoginDemo(false);
      }, 8000);
      return () => clearTimeout(timer);
    }
  }, [showLoginDemo]);

  // Auto-play animation for signup demo
  useEffect(() => {
    if (showSignupDemo) {
      const timer = setTimeout(() => {
        setShowSignupDemo(false);
      }, 10000);
      return () => clearTimeout(timer);
    }
  }, [showSignupDemo]);

  return (
    <motion.div
      key="login-signup"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.5 }}
      className="max-w-6xl mx-auto"
    >
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-foreground mb-4">Login & Signup Guide</h2>
        <p className="text-lg text-muted-foreground">
          Learn how to create an account and access your AuditCraft dashboard
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Login Demo */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-card border border-border rounded-xl p-6"
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-semibold text-foreground">Login Process</h3>
            <button
              onClick={() => setShowLoginDemo(!showLoginDemo)}
              className="flex items-center space-x-2 bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors"
            >
              <Play className="h-4 w-4" />
              <span>{showLoginDemo ? 'Stop' : 'Watch Demo'}</span>
            </button>
          </div>

          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="h-8 w-8 bg-blue-500 rounded-full flex items-center justify-center text-white text-sm font-medium">1</div>
              <div>
                <h4 className="font-medium text-foreground">Navigate to Login Page</h4>
                <p className="text-sm text-muted-foreground">Click &quot;Sign In&quot; in the header or visit /auth/login</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <div className="h-8 w-8 bg-blue-500 rounded-full flex items-center justify-center text-white text-sm font-medium">2</div>
              <div>
                <h4 className="font-medium text-foreground">Enter Credentials</h4>
                <p className="text-sm text-muted-foreground">Input your email and password</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <div className="h-8 w-8 bg-blue-500 rounded-full flex items-center justify-center text-white text-sm font-medium">3</div>
              <div>
                <h4 className="font-medium text-foreground">Access Dashboard</h4>
                <p className="text-sm text-muted-foreground">You&apos;ll be redirected to your dashboard</p>
              </div>
            </div>
          </div>

          {/* Interactive Login Demo */}
          <AnimatePresence>
            {showLoginDemo && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="mt-6 p-4 bg-muted rounded-lg"
              >
                <div className="relative bg-white rounded-lg border p-4 max-w-sm mx-auto">
                  <div className="text-center mb-4">
                    <h4 className="font-semibold text-gray-900">Welcome Back</h4>
                    <p className="text-sm text-gray-600">Sign in to your account</p>
                  </div>

                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="space-y-3"
                  >
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                      <motion.input
                        initial={{ width: 0 }}
                        animate={{ width: '100%' }}
                        transition={{ duration: 1, delay: 1 }}
                        type="email"
                        placeholder="Enter your email"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        readOnly
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                      <motion.input
                        initial={{ width: 0 }}
                        animate={{ width: '100%' }}
                        transition={{ duration: 1, delay: 2 }}
                        type="password"
                        placeholder="Enter your password"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        readOnly
                      />
                    </div>

                    <motion.button
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 3 }}
                      className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition-colors"
                    >
                      Sign In
                    </motion.button>
                  </motion.div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Signup Demo */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-card border border-border rounded-xl p-6"
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-semibold text-foreground">Signup Process</h3>
            <button
              onClick={() => setShowSignupDemo(!showSignupDemo)}
              className="flex items-center space-x-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
            >
              <Play className="h-4 w-4" />
              <span>{showSignupDemo ? 'Stop' : 'Watch Demo'}</span>
            </button>
          </div>

          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="h-8 w-8 bg-green-500 rounded-full flex items-center justify-center text-white text-sm font-medium">1</div>
              <div>
                <h4 className="font-medium text-foreground">Visit Signup Page</h4>
                <p className="text-sm text-muted-foreground">Click &quot;Get Started&quot; or visit /auth/register</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <div className="h-8 w-8 bg-green-500 rounded-full flex items-center justify-center text-white text-sm font-medium">2</div>
              <div>
                <h4 className="font-medium text-foreground">Fill Registration Form</h4>
                <p className="text-sm text-muted-foreground">Enter your name, email, and password</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <div className="h-8 w-8 bg-green-500 rounded-full flex items-center justify-center text-white text-sm font-medium">3</div>
              <div>
                <h4 className="font-medium text-foreground">Verify Email</h4>
                <p className="text-sm text-muted-foreground">Check your email for verification link</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <div className="h-8 w-8 bg-green-500 rounded-full flex items-center justify-center text-white text-sm font-medium">4</div>
              <div>
                <h4 className="font-medium text-foreground">Complete Setup</h4>
                <p className="text-sm text-muted-foreground">Set up your profile and preferences</p>
              </div>
            </div>
          </div>

          {/* Interactive Signup Demo */}
          <AnimatePresence>
            {showSignupDemo && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="mt-6 p-4 bg-muted rounded-lg"
              >
                <div className="relative bg-white rounded-lg border p-4 max-w-sm mx-auto">
                  <div className="text-center mb-4">
                    <h4 className="font-semibold text-gray-900">Create Account</h4>
                    <p className="text-sm text-gray-600">Join AuditCraft today</p>
                  </div>

                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="space-y-3"
                  >
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                      <motion.input
                        initial={{ width: 0 }}
                        animate={{ width: '100%' }}
                        transition={{ duration: 1, delay: 1 }}
                        type="text"
                        placeholder="Enter your full name"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                        readOnly
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                      <motion.input
                        initial={{ width: 0 }}
                        animate={{ width: '100%' }}
                        transition={{ duration: 1, delay: 2 }}
                        type="email"
                        placeholder="Enter your email"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                        readOnly
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                      <motion.input
                        initial={{ width: 0 }}
                        animate={{ width: '100%' }}
                        transition={{ duration: 1, delay: 3 }}
                        type="password"
                        placeholder="Create a password"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                        readOnly
                      />
                    </div>

                    <motion.button
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 4 }}
                      className="w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700 transition-colors"
                    >
                      Create Account
                    </motion.button>
                  </motion.div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="text-center mt-12"
      >
        <Link
          href="/auth/register"
          className="inline-flex items-center space-x-2 bg-primary text-white px-6 py-3 rounded-lg hover:bg-primary/90 transition-colors"
        >
          <span>Create Your Account</span>
          <ArrowRight className="h-4 w-4" />
        </Link>
      </motion.div>
    </motion.div>
  );
} 