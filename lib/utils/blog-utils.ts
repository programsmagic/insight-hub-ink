/**
 * Blog utility functions
 * Helper functions for blog-related calculations and formatting
 */

/**
 * Calculate reading time in minutes based on content length
 * Average reading speed: 200-250 words per minute
 * @param content - HTML content or plain text
 * @returns Reading time in minutes (minimum 1 minute)
 */
export function calculateReadingTime(content: string | null | undefined): number {
  if (!content) return 1;

  // Remove HTML tags and get plain text
  const text = content.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();
  
  // Count words (split by spaces)
  const wordCount = text.split(/\s+/).filter(word => word.length > 0).length;
  
  // Average reading speed: 225 words per minute
  const wordsPerMinute = 225;
  const readingTime = Math.ceil(wordCount / wordsPerMinute);
  
  // Minimum 1 minute
  return Math.max(1, readingTime);
}

/**
 * Format reading time for display
 * @param minutes - Reading time in minutes
 * @returns Formatted string (e.g., "5 min read", "1 min read")
 */
export function formatReadingTime(minutes: number): string {
  return `${minutes} min read`;
}

/**
 * Get reading time string from content
 * @param content - HTML content or plain text
 * @returns Formatted reading time string
 */
export function getReadingTime(content: string | null | undefined): string {
  const minutes = calculateReadingTime(content);
  return formatReadingTime(minutes);
}







