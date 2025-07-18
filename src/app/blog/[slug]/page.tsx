import { notFound } from "next/navigation";
import { BlogPostClient } from "./BlogPostClient";
import { blogService } from "@/lib/blogService";
import { BlogPost } from "@/types/blog";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default async function Page({ params }: any) {
  try {
    const resolvedParams = await params;
    const response = await blogService.getPost(resolvedParams.slug);

    // Transform backend response to match frontend interface
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const backendPost = response.data.post as any;
    const transformedPost: BlogPost = {
      id: backendPost.id, // Keep as string - no more parseInt conversion
      title: backendPost.title,
      slug: backendPost.slug,
      excerpt: backendPost.excerpt,
      content: backendPost.content,
      featured_image: backendPost.featuredImage || backendPost.featured_image,
      author: {
        id: backendPost.author.id, // Keep as string - no more parseInt conversion
        name: backendPost.author.name,
        avatar: backendPost.author.avatar,
        bio: backendPost.author.bio,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        social_links: (backendPost.author as any).socialLinks || backendPost.author.social_links,
        expertise: backendPost.author.expertise || [],
        is_active: backendPost.author.is_active !== false,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        created_at: (backendPost.author as any).createdAt || backendPost.author.created_at,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        updated_at: (backendPost.author as any).updatedAt || backendPost.author.updated_at
      },
      category: {
        id: backendPost.category.id, // Keep as string - no more parseInt conversion
        name: backendPost.category.name,
        slug: backendPost.category.slug,
        description: backendPost.category.description,
        color: backendPost.category.color,
        icon: backendPost.category.icon,
        sort_order: backendPost.category.sort_order || 0,
        is_active: backendPost.category.is_active !== false,
        post_count: backendPost.category.post_count,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        created_at: (backendPost.category as any).createdAt || backendPost.category.created_at,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        updated_at: (backendPost.category as any).updatedAt || backendPost.category.updated_at
      },
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      tags: backendPost.tags.map((tag: any) => ({
        id: tag.id, // Keep as string - no more parseInt conversion
        name: tag.name,
        slug: tag.slug,
        color: tag.color,
        post_count: tag.post_count,
        created_at: tag.createdAt || tag.created_at
      })),
      status: backendPost.status?.toLowerCase() as 'draft' | 'published' | 'archived',
      featured: backendPost.featured || false,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      reading_time: (backendPost as any).readingTime || backendPost.reading_time,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      views_count: (backendPost as any).viewsCount || backendPost.views_count,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      likes_count: (backendPost as any).likesCount || backendPost.likes_count,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      shares_count: (backendPost as any).sharesCount || backendPost.shares_count,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      meta_title: (backendPost as any).metaTitle || backendPost.meta_title,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      meta_description: (backendPost as any).metaDescription || backendPost.meta_description,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      og_image: (backendPost as any).ogImage || backendPost.og_image,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      published_at: (backendPost as any).publishedAt || backendPost.published_at,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      created_at: (backendPost as any).createdAt || backendPost.created_at,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      updated_at: (backendPost as any).updatedAt || backendPost.updated_at
    };

    // Transform related posts
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const transformedRelatedPosts: BlogPost[] = (response.data.related_posts || []).map((relatedPost: any) => ({
      id: relatedPost.id, // Keep as string - no more parseInt conversion
      title: relatedPost.title,
      slug: relatedPost.slug,
      excerpt: relatedPost.excerpt,
      content: relatedPost.content || '',
      featured_image: relatedPost.featuredImage || relatedPost.featured_image,
      author: {
        id: relatedPost.author?.id || '1', // Keep as string - no more parseInt conversion
        name: relatedPost.author?.name || 'Unknown Author',
        avatar: relatedPost.author?.avatar || '',
        bio: relatedPost.author?.bio,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        social_links: (relatedPost.author as any)?.socialLinks || relatedPost.author?.social_links,
        expertise: relatedPost.author?.expertise || [],
        is_active: relatedPost.author?.is_active !== false,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        created_at: (relatedPost.author as any)?.createdAt || relatedPost.author?.created_at,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        updated_at: (relatedPost.author as any)?.updatedAt || relatedPost.author?.updated_at
      },
      category: {
        id: relatedPost.category?.id || '1', // Keep as string - no more parseInt conversion
        name: relatedPost.category?.name || 'General',
        slug: relatedPost.category?.slug || 'general',
        description: relatedPost.category?.description,
        color: relatedPost.category?.color || '#3B82F6',
        icon: relatedPost.category?.icon,
        sort_order: relatedPost.category?.sort_order || 0,
        is_active: relatedPost.category?.is_active !== false,
        post_count: relatedPost.category?.post_count,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        created_at: (relatedPost.category as any)?.createdAt || relatedPost.category?.created_at,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        updated_at: (relatedPost.category as any)?.updatedAt || relatedPost.category?.updated_at
      },
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      tags: (relatedPost.tags || []).map((tag: any) => ({
        id: tag.id, // Keep as string - no more parseInt conversion
        name: tag.name,
        slug: tag.slug,
        color: tag.color,
        post_count: tag.post_count,
        created_at: tag.createdAt || tag.created_at
      })),
      status: relatedPost.status?.toLowerCase() as 'draft' | 'published' | 'archived',
      featured: relatedPost.featured || false,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      reading_time: (relatedPost as any).readingTime || relatedPost.reading_time,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      views_count: (relatedPost as any).viewsCount || relatedPost.views_count,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      likes_count: (relatedPost as any).likesCount || relatedPost.likes_count,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      shares_count: (relatedPost as any).sharesCount || relatedPost.shares_count,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      meta_title: (relatedPost as any).metaTitle || relatedPost.meta_title,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      meta_description: (relatedPost as any).metaDescription || relatedPost.meta_description,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      og_image: (relatedPost as any).ogImage || relatedPost.og_image,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      published_at: (relatedPost as any).publishedAt || relatedPost.published_at,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      created_at: (relatedPost as any).createdAt || relatedPost.created_at,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      updated_at: (relatedPost as any).updatedAt || relatedPost.updated_at
    }));

    return <BlogPostClient post={transformedPost} relatedPosts={transformedRelatedPosts} />;
  } catch (error) {
    console.error('Failed to fetch blog post:', error);
    notFound();
  }
} 