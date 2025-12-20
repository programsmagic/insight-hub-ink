/**
 * Blog API Service
 * Handles all communication with the FinTrack Blog API
 */

import { z } from 'zod';
import { env } from '@/lib/env';
import { logger } from '@/lib/logger';
import type {
  BlogPostListResponse,
  BlogPostResponse,
  CategoryListResponse,
  BlogApiError,
  GetBlogPostsParams,
} from '@/lib/types/blog';

// API Base URL with default fallback
const API_BASE_URL =
  env.getOptionalWithDefault(
    'NEXT_PUBLIC_FINTRACK_API_URL',
    'https://fintrack.insighthub.ink/api/public/blog'
  );

// Request timeout in milliseconds
const REQUEST_TIMEOUT = 10000;

// Zod schemas for response validation
const authorSchema = z.object({
  id: z.string(),
});

const seoSchema = z.object({
  meta_title: z.string().nullable(),
  meta_description: z.string().nullable(),
  keywords: z.array(z.string()).nullable(),
});

const analyticsSchema = z.object({
  views: z.number(),
  likes: z.number().optional(),
  shares: z.number().optional(),
});

const featuredImageThumbnailsSchema = z.object({
  small: z.string(),
  medium: z.string(),
  large: z.string(),
  original: z.string(),
});

const blogPostSchema = z.object({
  id: z.string(),
  title: z.string(),
  slug: z.string(),
  excerpt: z.string(),
  content: z.string().optional(),
  featured_image: z.string().nullable(),
  featured_image_thumbnails: featuredImageThumbnailsSchema.nullable(),
  featured_image_cloudinary_id: z.string().optional(),
  published_date: z.string(),
  created_at: z.string().optional(),
  updated_at: z.string().optional(),
  author: authorSchema,
  tags: z.array(z.string()),
  categories: z.array(z.string()),
  seo: seoSchema,
  analytics: analyticsSchema,
  is_ai_generated: z.boolean().optional(),
});

const paginationSchema = z.object({
  page: z.number(),
  limit: z.number(),
  total: z.number(),
  totalPages: z.number(),
});

const blogPostListResponseSchema = z.object({
  success: z.boolean(),
  posts: z.array(blogPostSchema),
  pagination: paginationSchema,
});

const blogPostResponseSchema = z.object({
  success: z.boolean(),
  post: blogPostSchema,
});

const categorySchema = z.object({
  id: z.string(),
  name: z.string(),
  slug: z.string(),
  description: z.string().nullable(),
  post_count: z.number(),
});

const categoryListResponseSchema = z.object({
  success: z.boolean(),
  categories: z.array(categorySchema),
});

const errorResponseSchema = z.object({
  success: z.literal(false),
  error: z.string(),
  message: z.string(),
});

/**
 * Creates a fetch request with timeout
 */
async function fetchWithTimeout(
  url: string,
  options: RequestInit = {}
): Promise<Response> {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), REQUEST_TIMEOUT);

  try {
    const response = await fetch(url, {
      ...options,
      signal: controller.signal,
    });
    clearTimeout(timeoutId);
    return response;
  } catch (error) {
    clearTimeout(timeoutId);
    if (error instanceof Error && error.name === 'AbortError') {
      throw new Error('Request timeout: The API request took too long');
    }
    throw error;
  }
}

/**
 * Handles API errors and returns appropriate error messages
 */
function handleApiError(
  response: Response,
  data: unknown
): BlogApiError {
  if (data && typeof data === 'object' && 'error' in data) {
    const errorData = errorResponseSchema.safeParse(data);
    if (errorData.success) {
      return errorData.data;
    }
  }

  if (response.status === 404) {
    return {
      success: false,
      error: 'Not Found',
      message: 'The requested resource could not be found.',
    };
  }

  if (response.status >= 500) {
    return {
      success: false,
      error: 'Server Error',
      message: 'The server encountered an error. Please try again later.',
    };
  }

  return {
    success: false,
    error: 'Request Failed',
    message: `Request failed with status ${response.status}`,
  };
}

/**
 * Get paginated list of blog posts
 */
export async function getBlogPosts(
  params: GetBlogPostsParams = {}
): Promise<BlogPostListResponse> {
  const {
    page = 1,
    limit = 10,
    category,
    search,
    sortBy = 'published_date',
    sortOrder = 'desc',
  } = params;

  // Build query string
  const queryParams = new URLSearchParams({
    page: page.toString(),
    limit: Math.min(limit, 50).toString(), // Max limit is 50
    sortBy,
    sortOrder,
  });

  if (category) {
    queryParams.append('category', category);
  }

  if (search) {
    queryParams.append('search', search);
  }

  const url = `${API_BASE_URL}/posts?${queryParams.toString()}`;

  try {
    logger.debug('Fetching blog posts', { url, params });

    const response = await fetchWithTimeout(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      // Next.js fetch caching with revalidation
      next: {
        revalidate: 300, // 5 minutes
      },
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      const error = handleApiError(response, errorData);
      logger.warn('Blog API error', { url, status: response.status, error });
      throw new Error(error.message);
    }

    const data = await response.json();
    const validatedData = blogPostListResponseSchema.parse(data);

    if (!validatedData.success) {
      throw new Error('API returned unsuccessful response');
    }

    logger.debug('Blog posts fetched successfully', {
      count: validatedData.posts.length,
      total: validatedData.pagination.total,
    });

    return validatedData;
  } catch (error) {
    if (error instanceof z.ZodError) {
      logger.error('Blog API response validation failed', error, { url });
      throw new Error('Invalid response format from API');
    }

    if (error instanceof Error) {
      logger.error('Blog API request failed', error, { url });
      throw error;
    }

    logger.error('Unknown error in blog API request', error, { url });
    throw new Error('An unexpected error occurred');
  }
}

/**
 * Get a single blog post by slug
 */
export async function getBlogPostBySlug(
  slug: string
): Promise<BlogPostResponse> {
  if (!slug || typeof slug !== 'string') {
    throw new Error('Invalid slug parameter');
  }

  const url = `${API_BASE_URL}/posts/${encodeURIComponent(slug)}`;

  try {
    logger.debug('Fetching blog post', { url, slug });

    const response = await fetchWithTimeout(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      // Next.js fetch caching with revalidation (longer cache for individual posts)
      next: {
        revalidate: 3600, // 1 hour
      },
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      const error = handleApiError(response, errorData);
      logger.warn('Blog API error', { url, status: response.status, error });
      throw new Error(error.message);
    }

    const data = await response.json();
    const validatedData = blogPostResponseSchema.parse(data);

    if (!validatedData.success) {
      throw new Error('API returned unsuccessful response');
    }

    logger.debug('Blog post fetched successfully', {
      slug,
      title: validatedData.post.title,
    });

    return validatedData;
  } catch (error) {
    if (error instanceof z.ZodError) {
      logger.error('Blog API response validation failed', error, { url });
      throw new Error('Invalid response format from API');
    }

    if (error instanceof Error) {
      logger.error('Blog API request failed', error, { url });
      throw error;
    }

    logger.error('Unknown error in blog API request', error, { url });
    throw new Error('An unexpected error occurred');
  }
}

/**
 * Get all blog categories
 */
export async function getCategories(): Promise<CategoryListResponse> {
  const url = `${API_BASE_URL}/categories`;

  try {
    logger.debug('Fetching blog categories', { url });

    const response = await fetchWithTimeout(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      // Next.js fetch caching with revalidation (categories change less frequently)
      next: {
        revalidate: 1800, // 30 minutes
      },
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      const error = handleApiError(response, errorData);
      logger.warn('Blog API error', { url, status: response.status, error });
      throw new Error(error.message);
    }

    const data = await response.json();
    const validatedData = categoryListResponseSchema.parse(data);

    if (!validatedData.success) {
      throw new Error('API returned unsuccessful response');
    }

    logger.debug('Blog categories fetched successfully', {
      count: validatedData.categories.length,
    });

    return validatedData;
  } catch (error) {
    if (error instanceof z.ZodError) {
      logger.error('Blog API response validation failed', error, { url });
      throw new Error('Invalid response format from API');
    }

    if (error instanceof Error) {
      logger.error('Blog API request failed', error, { url });
      throw error;
    }

    logger.error('Unknown error in blog API request', error, { url });
    throw new Error('An unexpected error occurred');
  }
}

/**
 * Get image URL with fallback to appropriate thumbnail size
 */
export function getBlogImageUrl(
  post: { featured_image: string | null; featured_image_thumbnails: { small: string; medium: string; large: string; original: string } | null },
  size: 'small' | 'medium' | 'large' | 'original' = 'medium'
): string | null {
  if (!post.featured_image_thumbnails) {
    return post.featured_image;
  }

  return post.featured_image_thumbnails[size] || post.featured_image_thumbnails.original || post.featured_image;
}






