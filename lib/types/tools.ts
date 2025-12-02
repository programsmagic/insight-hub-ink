/**
 * TypeScript types and interfaces for the Tools Hub
 */

export type ToolCategory =
  | "json"
  | "text"
  | "image"
  | "pdf"
  | "html"
  | "seo"
  | "cloudinary"
  | "color"
  | "encoding"
  | "hash"
  | "qr-code"
  | "date-time"
  | "unit-converter";

export type PricingTier = "free" | "freemium" | "paid" | "enterprise";

export interface Tool {
  id: string;
  name: string;
  category: ToolCategory;
  description: string;
  route: string;
  icon?: string; // Lucide icon name
  tags: string[];
  keywords: string[]; // SEO keywords
  features?: string[];
  useCases?: string[];
  pricing?: PricingTier;
  isClientSide?: boolean; // Whether tool runs client-side only
  requiresAuth?: boolean; // Whether tool requires authentication
}

export interface ToolCategoryInfo {
  id: ToolCategory;
  name: string;
  description: string;
  icon: string;
  color: string;
  toolCount: number;
}

export interface ToolSearchResult {
  tool: Tool;
  relevanceScore: number;
}

export interface ToolCategoryInfo {
  id: ToolCategory;
  name: string;
  description: string;
  icon: string;
  color: string;
  toolCount: number;
}

