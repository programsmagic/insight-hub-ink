/**
 * Type definitions for FinTrack Blog API responses
 * Based on API documentation at https://fintrack.insighthub.ink/api/public/blog
 */

export interface Author {
  id: string;
}

export interface SEO {
  meta_title: string | null;
  meta_description: string | null;
  keywords: string[] | null;
}

export interface Analytics {
  views: number;
  likes?: number;
  shares?: number;
}

export interface FeaturedImageThumbnails {
  small: string;
  medium: string;
  large: string;
  original: string;
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content?: string; // Only present in single post response
  featured_image: string | null;
  featured_image_thumbnails: FeaturedImageThumbnails | null;
  featured_image_cloudinary_id?: string; // Only present in single post response
  published_date: string; // ISO 8601 date string
  created_at?: string; // ISO 8601 date string, only in single post
  updated_at?: string; // ISO 8601 date string, only in single post
  author: Author;
  tags: string[];
  categories: string[]; // Array of category IDs
  seo: SEO;
  analytics: Analytics;
  is_ai_generated?: boolean; // Only present in single post response
}

export interface Pagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface BlogPostListResponse {
  success: boolean;
  posts: BlogPost[];
  pagination: Pagination;
}

export interface BlogPostResponse {
  success: boolean;
  post: BlogPost;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  post_count: number;
}

export interface CategoryListResponse {
  success: boolean;
  categories: Category[];
}

export interface BlogApiError {
  success: false;
  error: string;
  message: string;
}

export interface GetBlogPostsParams {
  page?: number;
  limit?: number;
  category?: string;
  search?: string;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}



