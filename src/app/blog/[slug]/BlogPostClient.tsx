"use client";

import Link from "next/link";
import { FooterWrapper } from "@/shared/ui/footer/FooterWrapper";
import { ArrowLeft, User, Calendar, Clock, Tag, Eye, Heart, Share2, Twitter, Facebook, Linkedin, Mail } from "lucide-react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState, useRef } from "react";
import { blogService } from "@/lib/blogService";
import { BlogPost } from "@/types/blog";

export function BlogPostClient({ post, relatedPosts }: { post: BlogPost; relatedPosts: BlogPost[] }) {
  const [liked, setLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(post.likes_count);
  const [isSharing, setIsSharing] = useState(false);
  const [showShareMenu, setShowShareMenu] = useState(false);
  const shareMenuRef = useRef<HTMLDivElement>(null);

  // Track view on component mount
  useEffect(() => {
    let sessionId = sessionStorage.getItem('session_id');
    if (!sessionId) {
      sessionId = Math.random().toString(36).substring(7);
      sessionStorage.setItem('session_id', sessionId);
    }
    const trackView = async () => {
      try {
        await blogService.trackView(post.slug, {
          session_id: sessionId,
          referrer: document.referrer,
          user_agent: navigator.userAgent,
          ip_address: ''
        });
      } catch (error) {
        console.error('Failed to track view:', error);
      }
    };
    trackView();
  }, [post.slug]);

  // Handle click outside to close share menu
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (shareMenuRef.current && !shareMenuRef.current.contains(event.target as Node)) {
        setShowShareMenu(false);
      }
    };

    if (showShareMenu) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showShareMenu]);

  // Debug effect to log menu state changes
  useEffect(() => {
    console.log('Share menu state changed to:', showShareMenu);
  }, [showShareMenu]);

  const handleLike = async () => {
    try {
      const response = await blogService.likePost(post.slug);
      setLiked(response.data.liked);
      setLikesCount(response.data.likes_count);
    } catch (error) {
      console.error('Failed to like post:', error);
    }
  };

  const handleShare = async (platform: 'twitter' | 'facebook' | 'linkedin' | 'email') => {
    try {
      console.log('Sharing to platform:', platform); // Debug log
      setIsSharing(true);
      setShowShareMenu(false);

      const url = window.location.href;
      const title = post.title;
      const text = post.excerpt;

      console.log('Share data:', { url, title, text }); // Debug log

      let shareUrl = '';

      switch (platform) {
        case 'twitter':
          shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`;
          break;
        case 'facebook':
          shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
          break;
        case 'linkedin':
          shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`;
          break;
        case 'email':
          shareUrl = `mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(text + '\n\n' + url)}`;
          break;
      }

      console.log('Share URL:', shareUrl); // Debug log

      if (shareUrl) {
        // For email, use window.location.href instead of window.open
        if (platform === 'email') {
          window.location.href = shareUrl;
        } else {
          // For social platforms, open in new window
          const shareWindow = window.open(shareUrl, '_blank', 'width=600,height=400,scrollbars=yes,resizable=yes');

          // Check if popup was blocked
          if (!shareWindow) {
            console.warn('Popup blocked, trying alternative method');
            // Fallback: try to open in same window
            window.open(shareUrl, '_blank');
          }
        }

        // Track the share
        try {
          await blogService.sharePost(post.slug, { platform, url });
          console.log('Share tracked successfully'); // Debug log
        } catch (error) {
          console.error('Failed to track share:', error);
          // Don't throw error here, as the share still worked
        }
      }
    } catch (error) {
      console.error('Failed to share post:', error);
      alert('Failed to share. Please try again.');
    } finally {
      setIsSharing(false);
    }
  };

  const handleShareButtonClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    console.log('Share button clicked, current state:', showShareMenu); // Debug log
    console.log('Event target:', e.target); // Debug log
    console.log('Event currentTarget:', e.currentTarget); // Debug log
    const newState = !showShareMenu;
    console.log('Setting share menu to:', newState); // Debug log
    setShowShareMenu(newState);
  };

  const handleShareItemClick = (e: React.MouseEvent, platform: 'twitter' | 'facebook' | 'linkedin' | 'email') => {
    e.preventDefault();
    e.stopPropagation();
    console.log(`${platform} share clicked`); // Debug log
    console.log('Event target:', e.target); // Debug log
    console.log('Event currentTarget:', e.currentTarget); // Debug log
    console.log('Platform:', platform); // Debug log
    handleShare(platform);
  };

  return (
    <div className="min-h-screen bg-background overflow-x-hidden blog-post-container">
      {/* Navigation Bar - Not sticky, just for blog post actions */}
      <nav className="bg-card/50 backdrop-blur-sm border-b border-border" style={{ zIndex: 9999, position: 'relative' }}>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-full">
          <div className="flex items-center justify-between h-16">
            <Link
              href="/blog"
              className="inline-flex items-center space-x-2 text-muted-foreground hover:text-foreground font-medium transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              <span className="hidden sm:inline">Back to Blog</span>
              <span className="sm:hidden">Blog</span>
            </Link>

            <div className="flex items-center space-x-4">
              <button
                onClick={handleLike}
                disabled={isSharing}
                className={`flex items-center space-x-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${liked
                  ? 'bg-red-500/10 text-red-600 border border-red-200'
                  : 'bg-card text-muted-foreground border border-border hover:bg-accent hover:text-foreground'
                  }`}
              >
                <Heart className={`h-4 w-4 ${liked ? 'fill-current' : ''}`} />
                <span>{likesCount}</span>
              </button>

              <div className="relative" style={{ zIndex: 99999, position: 'relative' }}>
                <button
                  onClick={handleShareButtonClick}
                  disabled={isSharing}
                  className="flex items-center space-x-2 px-4 py-2 bg-card text-muted-foreground border border-border rounded-full text-sm font-medium hover:bg-accent hover:text-foreground transition-all duration-200"
                >
                  <Share2 className="h-4 w-4" />
                  <span className="hidden sm:inline">Share</span>
                </button>

                <AnimatePresence>
                  {showShareMenu && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      className="absolute right-0 top-full mt-2 w-48 bg-card rounded-xl shadow-lg border border-border py-2 share-menu"
                      ref={shareMenuRef}
                      onClick={(e) => e.stopPropagation()}
                      style={{
                        pointerEvents: 'auto',
                        zIndex: 999999,
                        position: 'absolute',
                        top: '100%',
                        right: 0,
                        marginTop: '0.5rem',
                        backgroundColor: 'var(--card)',
                        border: '2px solid var(--primary)',
                        maxWidth: 'calc(100vw - 2rem)',
                        minWidth: '200px'
                      }}
                    >
                      <button
                        onClick={(e) => handleShareItemClick(e, 'twitter')}
                        disabled={isSharing}
                        className="w-full flex items-center space-x-3 px-4 py-2 text-sm text-muted-foreground hover:bg-accent hover:text-foreground transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <Twitter className="h-4 w-4 text-blue-500" />
                        <span>{isSharing ? 'Sharing...' : 'Twitter'}</span>
                      </button>
                      <button
                        onClick={(e) => handleShareItemClick(e, 'facebook')}
                        disabled={isSharing}
                        className="w-full flex items-center space-x-3 px-4 py-2 text-sm text-muted-foreground hover:bg-accent hover:text-foreground transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <Facebook className="h-4 w-4 text-blue-600" />
                        <span>{isSharing ? 'Sharing...' : 'Facebook'}</span>
                      </button>
                      <button
                        onClick={(e) => handleShareItemClick(e, 'linkedin')}
                        disabled={isSharing}
                        className="w-full flex items-center space-x-3 px-4 py-2 text-sm text-muted-foreground hover:bg-accent hover:text-foreground transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <Linkedin className="h-4 w-4 text-blue-700" />
                        <span>{isSharing ? 'Sharing...' : 'LinkedIn'}</span>
                      </button>
                      <button
                        onClick={(e) => handleShareItemClick(e, 'email')}
                        disabled={isSharing}
                        className="w-full flex items-center space-x-3 px-4 py-2 text-sm text-muted-foreground hover:bg-accent hover:text-foreground transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <Mail className="h-4 w-4 text-muted-foreground" />
                        <span>{isSharing ? 'Sharing...' : 'Email'}</span>
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative py-8 sm:py-12 lg:py-16">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/10" />
        <div className="relative container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            {/* Breadcrumb */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="flex items-center space-x-2 text-sm text-muted-foreground mb-8"
            >
              <Link href="/" className="hover:text-foreground transition-colors">Home</Link>
              <span>/</span>
              <Link href="/blog" className="hover:text-foreground transition-colors">Blog</Link>
              <span>/</span>
              <span className="text-foreground font-medium">{post.category.name}</span>
            </motion.div>

            {/* Article Header */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-12"
            >
              {/* Category Badge */}
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-semibold mb-6 border border-primary/20">
                <div
                  className="w-2 h-2 rounded-full mr-2"
                  style={{ backgroundColor: post.category.color }}
                />
                {post.category.name}
              </div>

              {/* Title */}
              <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-foreground mb-6 leading-tight tracking-tight">
                {post.title}
              </h1>

              {/* Excerpt */}
              <p className="text-lg sm:text-xl text-muted-foreground mb-8 leading-relaxed max-w-3xl mx-auto">
                {post.excerpt}
              </p>

              {/* Meta Information */}
              <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-sm text-muted-foreground">
                <div className="flex items-center space-x-2">
                  <User className="h-4 w-4" />
                  <span className="font-medium text-foreground">{post.author.name}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Calendar className="h-4 w-4" />
                  <span>{new Date(post.published_at).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Clock className="h-4 w-4" />
                  <span>{post.reading_time} min read</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Eye className="h-4 w-4" />
                  <span>{post.views_count.toLocaleString()} views</span>
                </div>
              </div>
            </motion.div>

            {/* Featured Image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="mb-12"
            >
              <div className="relative aspect-[16/9] rounded-2xl overflow-hidden shadow-2xl border border-border">
                <Image
                  src={post.featured_image}
                  alt={post.title}
                  fill
                  className="object-cover"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
              </div>
            </motion.div>

            {/* Author Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="bg-card rounded-2xl p-6 shadow-lg border border-border mb-12"
            >
              <div className="flex items-center space-x-4">
                <Image
                  src={post.author.avatar}
                  alt={post.author.name}
                  width={64}
                  height={64}
                  className="rounded-full border-2 border-border"
                />
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-foreground">{post.author.name}</h3>
                  <p className="text-muted-foreground text-sm">SEO Expert & Content Strategist</p>
                  {post.author.bio && (
                    <p className="text-muted-foreground text-sm mt-1">{post.author.bio}</p>
                  )}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Article Content */}
      <section className="py-8 sm:py-12 lg:py-16 bg-card">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="prose prose-lg sm:prose-xl max-w-none prose-headings:text-foreground prose-p:text-muted-foreground prose-strong:text-foreground prose-a:text-primary hover:prose-a:text-primary/80"
            >
              <div className="space-y-8">
                {/* Introduction */}
                <div className="bg-gradient-to-r from-primary/5 to-blue-500/5 rounded-2xl p-6 border border-primary/10">
                  <p className="text-lg text-foreground leading-relaxed mb-0">
                    Voice search is rapidly growing, with over <strong>50% of searches expected to be voice-based by 2024</strong>.
                    Optimizing for voice search requires a different approach than traditional SEO.
                  </p>
                </div>

                {/* Understanding Voice Search Behavior */}
                <section>
                  <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center">
                    <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center mr-3">
                      <span className="text-white font-bold text-sm">1</span>
                    </div>
                    Understanding Voice Search Behavior
                  </h2>
                  <p className="text-muted-foreground mb-6">
                    Voice search queries differ from text searches in several key ways:
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                    <div className="bg-card rounded-xl p-4 border border-border">
                      <h4 className="font-semibold text-foreground mb-2">🗣️ Conversational</h4>
                      <p className="text-sm text-muted-foreground">Longer, more natural language queries</p>
                    </div>
                    <div className="bg-card rounded-xl p-4 border border-border">
                      <h4 className="font-semibold text-foreground mb-2">❓ Question-Based</h4>
                      <p className="text-sm text-muted-foreground">Users ask questions instead of keywords</p>
                    </div>
                    <div className="bg-card rounded-xl p-4 border border-border">
                      <h4 className="font-semibold text-foreground mb-2">📍 Local Intent</h4>
                      <p className="text-sm text-muted-foreground">&ldquo;Near me&rdquo; and location-based searches</p>
                    </div>
                    <div className="bg-card rounded-xl p-4 border border-border">
                      <h4 className="font-semibold text-foreground mb-2">🎯 Action-Oriented</h4>
                      <p className="text-sm text-muted-foreground">Commands and action-based language</p>
                    </div>
                  </div>
                </section>

                {/* Voice Search Optimization Strategies */}
                <section>
                  <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center">
                    <div className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center mr-3">
                      <span className="text-white font-bold text-sm">2</span>
                    </div>
                    Voice Search Optimization Strategies
                  </h2>

                  <div className="space-y-6">
                    {/* Strategy 1 */}
                    <div className="bg-card rounded-2xl p-6 border border-border">
                      <div className="flex items-start space-x-4">
                        <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
                          <span className="text-primary font-bold text-lg">1</span>
                        </div>
                        <div className="flex-1">
                          <h3 className="text-xl font-bold text-foreground mb-3">Target Long-Tail Keywords</h3>
                          <p className="text-muted-foreground mb-4">
                            Voice searches are typically longer and more specific than text searches.
                          </p>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            <div className="bg-accent rounded-lg p-3">
                              <h4 className="font-semibold text-foreground text-sm mb-1">✅ Focus on natural language phrases</h4>
                            </div>
                            <div className="bg-accent rounded-lg p-3">
                              <h4 className="font-semibold text-foreground text-sm mb-1">✅ Include question-based keywords</h4>
                            </div>
                            <div className="bg-accent rounded-lg p-3">
                              <h4 className="font-semibold text-foreground text-sm mb-1">✅ Target conversational queries</h4>
                            </div>
                            <div className="bg-accent rounded-lg p-3">
                              <h4 className="font-semibold text-foreground text-sm mb-1">✅ Use local modifiers</h4>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Strategy 2 */}
                    <div className="bg-card rounded-2xl p-6 border border-border">
                      <div className="flex items-start space-x-4">
                        <div className="w-12 h-12 bg-blue-500/10 rounded-xl flex items-center justify-center flex-shrink-0">
                          <span className="text-blue-500 font-bold text-lg">2</span>
                        </div>
                        <div className="flex-1">
                          <h3 className="text-xl font-bold text-foreground mb-3">Create FAQ Content</h3>
                          <p className="text-muted-foreground mb-4">
                            FAQ pages are perfect for voice search optimization and featured snippets.
                          </p>
                          <div className="bg-gradient-to-r from-blue-500/5 to-purple-500/5 rounded-xl p-4">
                            <h4 className="font-semibold text-foreground mb-2">💡 FAQ Best Practices:</h4>
                            <ul className="space-y-2 text-sm text-muted-foreground">
                              <li className="flex items-center"><span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>Answer common questions directly</li>
                              <li className="flex items-center"><span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>Use natural language in questions</li>
                              <li className="flex items-center"><span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>Provide concise, helpful answers</li>
                              <li className="flex items-center"><span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>Include relevant keywords naturally</li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Strategy 3 */}
                    <div className="bg-card rounded-2xl p-6 border border-border">
                      <div className="flex items-start space-x-4">
                        <div className="w-12 h-12 bg-yellow-500/10 rounded-xl flex items-center justify-center flex-shrink-0">
                          <span className="text-yellow-500 font-bold text-lg">3</span>
                        </div>
                        <div className="flex-1">
                          <h3 className="text-xl font-bold text-foreground mb-3">Optimize for Featured Snippets</h3>
                          <p className="text-muted-foreground mb-4">
                            Voice assistants often read from featured snippets, making them crucial for voice search.
                          </p>
                          <div className="bg-yellow-500/5 rounded-xl p-4 border border-yellow-500/20">
                            <h4 className="font-semibold text-foreground mb-2">🎯 Featured Snippet Tips:</h4>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                              <div className="text-sm text-muted-foreground">
                                <strong className="text-foreground">Create content that answers questions directly</strong>
                              </div>
                              <div className="text-sm text-muted-foreground">
                                <strong className="text-foreground">Use clear, concise language</strong>
                              </div>
                              <div className="text-sm text-muted-foreground">
                                <strong className="text-foreground">Structure content with headers</strong>
                              </div>
                              <div className="text-sm text-muted-foreground">
                                <strong className="text-foreground">Keep answers under 50 words</strong>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Strategy 4 */}
                    <div className="bg-card rounded-2xl p-6 border border-border">
                      <div className="flex items-start space-x-4">
                        <div className="w-12 h-12 bg-green-500/10 rounded-xl flex items-center justify-center flex-shrink-0">
                          <span className="text-green-500 font-bold text-lg">4</span>
                        </div>
                        <div className="flex-1">
                          <h3 className="text-xl font-bold text-foreground mb-3">Local SEO for Voice Search</h3>
                          <p className="text-muted-foreground mb-4">
                            Many voice searches are local, making local SEO essential for voice search optimization.
                          </p>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="bg-green-500/5 rounded-lg p-4 border border-green-500/20">
                              <h4 className="font-semibold text-foreground mb-2">📍 Local Optimization:</h4>
                              <ul className="text-sm text-muted-foreground space-y-1">
                                <li>• Optimize for &ldquo;near me&rdquo; searches</li>
                                <li>• Include location-specific keywords</li>
                                <li>• Maintain accurate business information</li>
                              </ul>
                            </div>
                            <div className="bg-green-500/5 rounded-lg p-4 border border-green-500/20">
                              <h4 className="font-semibold text-foreground mb-2">📝 Content Strategy:</h4>
                              <ul className="text-sm text-muted-foreground space-y-1">
                                <li>• Encourage local reviews</li>
                                <li>• Create local content</li>
                                <li>• Use local business schema</li>
                              </ul>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>

                {/* Technical Implementation */}
                <section>
                  <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center">
                    <div className="w-8 h-8 bg-purple-500 rounded-lg flex items-center justify-center mr-3">
                      <span className="text-white font-bold text-sm">3</span>
                    </div>
                    Technical Implementation
                  </h2>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Structured Data */}
                    <div className="bg-card rounded-2xl p-6 border border-border">
                      <h3 className="text-xl font-bold text-foreground mb-4 flex items-center">
                        <span className="w-8 h-8 bg-purple-500/10 rounded-lg flex items-center justify-center mr-3">
                          <span className="text-purple-500 font-bold text-sm">📊</span>
                        </span>
                        Structured Data
                      </h3>
                      <div className="space-y-3">
                        <div className="flex items-center space-x-3 p-3 bg-accent rounded-lg">
                          <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                          <span className="text-sm text-foreground">FAQ schema</span>
                        </div>
                        <div className="flex items-center space-x-3 p-3 bg-accent rounded-lg">
                          <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                          <span className="text-sm text-foreground">HowTo markup</span>
                        </div>
                        <div className="flex items-center space-x-3 p-3 bg-accent rounded-lg">
                          <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                          <span className="text-sm text-foreground">LocalBusiness schema</span>
                        </div>
                        <div className="flex items-center space-x-3 p-3 bg-accent rounded-lg">
                          <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                          <span className="text-sm text-foreground">Review markup</span>
                        </div>
                      </div>
                    </div>

                    {/* Technical Requirements */}
                    <div className="bg-card rounded-2xl p-6 border border-border">
                      <h3 className="text-xl font-bold text-foreground mb-4 flex items-center">
                        <span className="w-8 h-8 bg-orange-500/10 rounded-lg flex items-center justify-center mr-3">
                          <span className="text-orange-500 font-bold text-sm">⚡</span>
                        </span>
                        Technical Requirements
                      </h3>
                      <div className="space-y-3">
                        <div className="flex items-center space-x-3 p-3 bg-accent rounded-lg">
                          <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                          <span className="text-sm text-foreground">Fast page loading</span>
                        </div>
                        <div className="flex items-center space-x-3 p-3 bg-accent rounded-lg">
                          <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                          <span className="text-sm text-foreground">Mobile optimization</span>
                        </div>
                        <div className="flex items-center space-x-3 p-3 bg-accent rounded-lg">
                          <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                          <span className="text-sm text-foreground">HTTPS security</span>
                        </div>
                        <div className="flex items-center space-x-3 p-3 bg-accent rounded-lg">
                          <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                          <span className="text-sm text-foreground">Mobile-friendly content</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>

                {/* Voice Search Analytics */}
                <section>
                  <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center">
                    <div className="w-8 h-8 bg-pink-500 rounded-lg flex items-center justify-center mr-3">
                      <span className="text-white font-bold text-sm">4</span>
                    </div>
                    Voice Search Analytics
                  </h2>

                  <div className="bg-gradient-to-r from-pink-500/5 to-purple-500/5 rounded-2xl p-6 border border-pink-500/20">
                    <p className="text-muted-foreground mb-4">
                      Track your voice search performance with these key metrics:
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                      <div className="bg-card rounded-xl p-4 border border-border">
                        <h4 className="font-semibold text-foreground mb-2">📈 Featured Snippets</h4>
                        <p className="text-sm text-muted-foreground">Monitor featured snippet rankings</p>
                      </div>
                      <div className="bg-card rounded-xl p-4 border border-border">
                        <h4 className="font-semibold text-foreground mb-2">❓ Question Keywords</h4>
                        <p className="text-sm text-muted-foreground">Track question-based keywords</p>
                      </div>
                      <div className="bg-card rounded-xl p-4 border border-border">
                        <h4 className="font-semibold text-foreground mb-2">📍 Local Performance</h4>
                        <p className="text-sm text-muted-foreground">Analyze local search performance</p>
                      </div>
                      <div className="bg-card rounded-xl p-4 border border-border">
                        <h4 className="font-semibold text-foreground mb-2">📱 Mobile Traffic</h4>
                        <p className="text-sm text-muted-foreground">Monitor mobile traffic patterns</p>
                      </div>
                      <div className="bg-card rounded-xl p-4 border border-border">
                        <h4 className="font-semibold text-foreground mb-2">🎯 Conversions</h4>
                        <p className="text-sm text-muted-foreground">Track voice search conversion rates</p>
                      </div>
                      <div className="bg-card rounded-xl p-4 border border-border">
                        <h4 className="font-semibold text-foreground mb-2">📊 User Behavior</h4>
                        <p className="text-sm text-muted-foreground">Analyze voice search user patterns</p>
                      </div>
                    </div>
                  </div>
                </section>

                {/* Conclusion */}
                <div className="bg-gradient-to-r from-primary/10 to-blue-500/10 rounded-2xl p-8 border border-primary/20">
                  <h2 className="text-2xl font-bold text-foreground mb-4">🎯 Key Takeaways</h2>
                  <p className="text-foreground leading-relaxed mb-4">
                    Voice search optimization is essential for staying competitive in the evolving search landscape.
                    By understanding voice search behavior and implementing these strategies, you can capture more
                    voice search traffic and improve your overall SEO performance.
                  </p>
                  <div className="bg-card rounded-xl p-4 border border-border">
                    <h3 className="font-semibold text-foreground mb-2">💡 Focus Areas:</h3>
                    <ul className="space-y-2 text-muted-foreground">
                      <li className="flex items-center"><span className="w-2 h-2 bg-primary rounded-full mr-2"></span>Create natural, conversational content</li>
                      <li className="flex items-center"><span className="w-2 h-2 bg-primary rounded-full mr-2"></span>Answer user questions directly</li>
                      <li className="flex items-center"><span className="w-2 h-2 bg-primary rounded-full mr-2"></span>Provide value to voice search users</li>
                      <li className="flex items-center"><span className="w-2 h-2 bg-primary rounded-full mr-2"></span>Optimize for local and mobile searches</li>
                    </ul>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Tags */}
            {post.tags.length > 0 && (
              <div className="mt-12 pt-8 border-t border-border">
                <h3 className="text-lg font-semibold text-foreground mb-4">Tags</h3>
                <div className="flex flex-wrap gap-2">
                  {post.tags.map((tag, idx) => (
                    <span
                      key={tag.id || idx}
                      className="inline-flex items-center px-3 py-1 rounded-full bg-accent text-muted-foreground text-sm font-medium hover:bg-accent/80 transition-colors"
                    >
                      <Tag className="h-3 w-3 mr-1" />
                      {tag.name}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <section className="py-12 sm:py-16 lg:py-20 bg-background">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.8 }}
              >
                <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-8 text-center">
                  Related Articles
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {relatedPosts.slice(0, 3).map((relatedPost, idx) => (
                    <motion.div
                      key={relatedPost.id || idx}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 1 + idx * 0.1 }}
                    >
                      <Link
                        href={`/blog/${relatedPost.slug}`}
                        className="block group"
                      >
                        <article className="bg-card rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-border">
                          {/* Image */}
                          <div className="relative h-48 overflow-hidden">
                            <Image
                              src={relatedPost.featured_image}
                              alt={relatedPost.title}
                              fill
                              className="object-cover group-hover:scale-105 transition-transform duration-500"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                          </div>

                          {/* Content */}
                          <div className="p-6">
                            <div className="flex items-center space-x-2 mb-3">
                              <div
                                className="w-2 h-2 rounded-full"
                                style={{ backgroundColor: relatedPost.category.color }}
                              />
                              <span className="text-sm font-semibold text-primary">
                                {relatedPost.category.name}
                              </span>
                            </div>

                            <h3 className="text-lg font-bold text-foreground mb-3 group-hover:text-primary transition-colors line-clamp-2">
                              {relatedPost.title}
                            </h3>

                            <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                              {relatedPost.excerpt}
                            </p>

                            <div className="flex items-center justify-between text-sm text-muted-foreground">
                              <div className="flex items-center space-x-2">
                                <Clock className="h-3 w-3" />
                                <span>{relatedPost.reading_time} min read</span>
                              </div>
                              <div className="flex items-center space-x-2">
                                <Eye className="h-3 w-3" />
                                <span>{relatedPost.views_count.toLocaleString()}</span>
                              </div>
                            </div>
                          </div>
                        </article>
                      </Link>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </section>
      )}

      <FooterWrapper />
    </div>
  );
} 