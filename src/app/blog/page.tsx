"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FooterWrapper } from "@/shared/ui/footer/FooterWrapper";
import { BlogPost } from "@/types/blog";
import { blogService } from "@/lib/blogService";
import Link from "next/link";
import Image from "next/image";
import { Clock, User, Calendar, Tag, Search } from "lucide-react";

// Fallback image URL for when images fail to load
const FALLBACK_FEATURED = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='200' viewBox='0 0 400 200'%3E%3Crect width='400' height='200' fill='%23f3f4f6'/%3E%3Ctext x='200' y='100' text-anchor='middle' fill='%236b7280' font-family='Arial' font-size='16'%3EImage not available%3C/text%3E%3C/svg%3E";

export default function BlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [categories, setCategories] = useState<Array<{ id: string; name: string; slug: string; color: string }>>([]);
  const [imageErrors, setImageErrors] = useState<Set<string>>(new Set());

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await blogService.getPosts({
          page: currentPage,
          limit: 12,
          category: selectedCategory || undefined,
          search: searchQuery || undefined
        });

        // Transform backend response to match frontend interface
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const transformedPosts: BlogPost[] = response.data.posts.map((post: any) => ({
          id: post.id, // Keep as string - no more parseInt conversion
          title: post.title,
          slug: post.slug,
          excerpt: post.excerpt,
          content: post.content,
          featured_image: post.featuredImage || post.featured_image,
          author: {
            id: post.author.id, // Keep as string - no more parseInt conversion
            name: post.author.name,
            avatar: post.author.avatar,
            bio: post.author.bio,
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            social_links: (post.author as any).socialLinks || post.author.social_links,
            expertise: post.author.expertise || [],
            is_active: post.author.is_active !== false,
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            created_at: (post.author as any).createdAt || post.author.created_at,
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            updated_at: (post.author as any).updatedAt || post.author.updated_at
          },
          category: {
            id: post.category.id, // Keep as string - no more parseInt conversion
            name: post.category.name,
            slug: post.category.slug,
            description: post.category.description,
            color: post.category.color,
            icon: post.category.icon,
            sort_order: post.category.sort_order || 0,
            is_active: post.category.is_active !== false,
            post_count: post.category.post_count,
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            created_at: (post.category as any).createdAt || post.category.created_at,
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            updated_at: (post.category as any).updatedAt || post.category.updated_at
          },
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          tags: post.tags.map((tag: any) => ({
            id: tag.id, // Keep as string - no more parseInt conversion
            name: tag.name,
            slug: tag.slug,
            color: tag.color,
            post_count: tag.post_count,
            created_at: tag.createdAt || tag.created_at
          })),
          status: post.status?.toLowerCase() as 'draft' | 'published' | 'archived',
          featured: post.featured || false,
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          reading_time: (post as any).readingTime || post.reading_time,
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          views_count: (post as any).viewsCount || post.views_count,
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          likes_count: (post as any).likesCount || post.likes_count,
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          shares_count: (post as any).sharesCount || post.shares_count,
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          meta_title: (post as any).metaTitle || post.meta_title,
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          meta_description: (post as any).metaDescription || post.meta_description,
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          og_image: (post as any).ogImage || post.og_image,
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          published_at: (post as any).publishedAt || post.published_at,
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          created_at: (post as any).createdAt || post.created_at,
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          updated_at: (post as any).updatedAt || post.updated_at
        }));

        setPosts(transformedPosts);
        setTotalPages(response.data.pagination.total_pages);
      } catch (err) {
        console.error('Failed to fetch blog posts:', err);
        setError('Failed to load blog posts. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [currentPage, selectedCategory, searchQuery]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await blogService.getCategories();
        setCategories(response.data);
      } catch (err) {
        console.error('Failed to fetch categories:', err);
      }
    };

    fetchCategories();
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setCurrentPage(1);
  };

  const handleCategoryChange = (categorySlug: string) => {
    setSelectedCategory(categorySlug === selectedCategory ? "" : categorySlug);
    setCurrentPage(1);
  };

  const handleImageError = (imageUrl: string) => {
    setImageErrors(prev => new Set(prev).add(imageUrl));
  };

  const getImageSrc = (originalSrc: string) => {
    return imageErrors.has(originalSrc) ? FALLBACK_FEATURED : originalSrc;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
            <p className="mt-4 text-muted-foreground">Loading blog posts...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <div className="text-destructive text-6xl mb-4">⚠️</div>
            <h1 className="text-2xl font-bold text-foreground mb-4">Something went wrong</h1>
            <p className="text-muted-foreground mb-6">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header Section */}
      <section className="py-8 sm:py-12 lg:py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto text-center"
          >
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-6 tracking-tight leading-tight">
              SEO Blog & Insights
            </h1>
            <p className="text-lg sm:text-xl text-muted-foreground mb-12 leading-relaxed">
              Discover the latest SEO strategies, tips, and industry insights to boost your website&apos;s performance
            </p>

            {/* Search Bar */}
            <form onSubmit={handleSearch} className="max-w-2xl mx-auto mb-8">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search articles..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 bg-card border border-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-colors"
                />
                <button
                  type="submit"
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-dark transition-colors"
                >
                  Search
                </button>
              </div>
            </form>

            {/* Category Filters */}
            <div className="flex flex-wrap gap-3 justify-center mb-8">
              <button
                onClick={() => handleCategoryChange("")}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${selectedCategory === ""
                    ? "bg-primary text-white"
                    : "bg-card text-foreground border border-border hover:bg-accent"
                  }`}
              >
                All
              </button>
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => handleCategoryChange(category.slug)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${selectedCategory === category.slug
                      ? "bg-primary text-white"
                      : "bg-card text-foreground border border-border hover:bg-accent"
                    }`}
                >
                  {category.name}
                </button>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 pb-24">
        {posts.length === 0 ? (
          <div className="text-center py-16">
            <div className="text-muted-foreground text-6xl mb-4">📝</div>
            <h2 className="text-2xl font-bold text-foreground mb-4">No posts found</h2>
            <p className="text-muted-foreground">
              {searchQuery || selectedCategory
                ? "Try adjusting your search or filter criteria."
                : "No blog posts available at the moment."
              }
            </p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
              {posts.map((post, index) => (
                <motion.article
                  key={post.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="group"
                >
                  <Link href={`/blog/${post.slug}`}>
                    <div className="bg-card rounded-lg border border-border shadow-sm hover:shadow-lg transition-all duration-300 hover:border-primary/50 overflow-hidden">
                      {/* Featured Image */}
                      <div className="relative h-48 overflow-hidden">
                        <Image
                          src={getImageSrc(post.featured_image)}
                          alt={post.title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                          onError={() => handleImageError(post.featured_image)}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                        {post.featured && (
                          <div className="absolute top-4 left-4 px-3 py-1 bg-primary text-white text-xs font-semibold rounded-full">
                            Featured
                          </div>
                        )}
                      </div>

                      {/* Content */}
                      <div className="p-6">
                        {/* Category */}
                        <div className="flex items-center gap-2 mb-3">
                          <div
                            className="w-3 h-3 rounded-full"
                            style={{ backgroundColor: post.category.color }}
                          />
                          <span className="text-sm font-medium text-primary">
                            {post.category.name}
                          </span>
                        </div>

                        {/* Title */}
                        <h3 className="text-xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors line-clamp-2">
                          {post.title}
                        </h3>

                        {/* Excerpt */}
                        <p className="text-muted-foreground mb-4 line-clamp-3">
                          {post.excerpt}
                        </p>

                        {/* Meta */}
                        <div className="flex items-center justify-between text-sm text-muted-foreground">
                          <div className="flex items-center gap-4">
                            <div className="flex items-center gap-1">
                              <User className="h-4 w-4" />
                              <span>{post.author.name}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Calendar className="h-4 w-4" />
                              <span>{new Date(post.published_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Clock className="h-4 w-4" />
                              <span>{post.reading_time} min</span>
                            </div>
                          </div>
                        </div>

                        {/* Tags */}
                        {post.tags.length > 0 && (
                          <div className="flex flex-wrap gap-2 mt-4">
                            {post.tags.slice(0, 2).map((tag) => (
                              <span
                                key={tag.id}
                                className="inline-flex items-center px-2 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium"
                              >
                                <Tag className="h-3 w-3 mr-1" />
                                {tag.name}
                              </span>
                            ))}
                            {post.tags.length > 2 && (
                              <span className="text-xs text-muted-foreground">
                                +{post.tags.length - 2} more
                              </span>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  </Link>
                </motion.article>
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center items-center gap-2">
                <button
                  onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                  disabled={currentPage === 1}
                  className="px-4 py-2 rounded-lg bg-card text-foreground border border-border hover:bg-accent disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  Previous
                </button>

                <span className="px-4 py-2 text-muted-foreground">
                  Page {currentPage} of {totalPages}
                </span>

                <button
                  onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                  disabled={currentPage === totalPages}
                  className="px-4 py-2 rounded-lg bg-card text-foreground border border-border hover:bg-accent disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  Next
                </button>
              </div>
            )}
          </>
        )}
      </section>

      <FooterWrapper />
    </div>
  );
} 