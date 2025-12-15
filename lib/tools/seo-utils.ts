/**
 * SEO utility functions
 */

export interface RedirectInfo {
  url: string;
  statusCode: number;
  finalUrl: string;
  redirectChain: Array<{ url: string; statusCode: number }>;
  isRedirect: boolean;
}

/**
 * Check HTTP redirects for a URL
 */
export async function checkRedirects(url: string, maxRedirects: number = 10): Promise<RedirectInfo> {
  const redirectChain: Array<{ url: string; statusCode: number }> = [];
  let currentUrl = url;
  let finalUrl = url;
  let statusCode = 200;
  let isRedirect = false;

  try {
    for (let i = 0; i < maxRedirects; i++) {
      const response = await fetch(currentUrl, {
        method: "HEAD",
        redirect: "manual",
        signal: AbortSignal.timeout(10000), // 10 second timeout
      });

      statusCode = response.status;
      redirectChain.push({ url: currentUrl, statusCode });

      if (response.status >= 300 && response.status < 400) {
        isRedirect = true;
        const location = response.headers.get("location");
        if (location) {
          // Handle relative URLs
          try {
            currentUrl = new URL(location, currentUrl).href;
            finalUrl = currentUrl;
          } catch {
            finalUrl = location;
            break;
          }
        } else {
          break;
        }
      } else {
        finalUrl = currentUrl;
        break;
      }
    }
  } catch (error) {
    // Handle network errors
    throw new Error(`Failed to check redirects: ${error instanceof Error ? error.message : "Unknown error"}`);
  }

  return {
    url,
    statusCode,
    finalUrl,
    redirectChain,
    isRedirect,
  };
}

/**
 * Analyze page speed using Google PageSpeed Insights API
 */
export async function analyzePageSpeed(
  url: string,
  apiKey?: string
): Promise<{
  success: boolean;
  data?: any;
  error?: string;
}> {
  if (!apiKey) {
    return {
      success: false,
      error: "PageSpeed Insights API key is required. Please set GOOGLE_PAGESPEED_API_KEY environment variable.",
    };
  }

  try {
    const apiUrl = `https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=${encodeURIComponent(url)}&key=${apiKey}`;
    const response = await fetch(apiUrl, {
      signal: AbortSignal.timeout(30000), // 30 second timeout
    });

    if (!response.ok) {
      throw new Error(`PageSpeed API returned ${response.status}`);
    }

    const data = await response.json();
    return { success: true, data };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to analyze page speed",
    };
  }
}

/**
 * Basic backlink checker (limited functionality)
 * Full backlink checking requires paid APIs like Ahrefs, Moz, etc.
 */
export async function checkBacklinks(_url: string): Promise<{
  success: boolean;
  message: string;
  note?: string;
}> {
  // This is a placeholder - real backlink checking requires:
  // 1. Web scraping search engines (limited by rate limits)
  // 2. Paid APIs (Ahrefs, Moz, SEMrush, etc.)
  // 3. Database of indexed links

  return {
    success: false,
    message: "Full backlink checking requires paid API services",
    note: "For production use, integrate with services like Ahrefs API, Moz API, or SEMrush API. Basic checking can be done by scraping search engine results, but this is limited and may violate ToS.",
  };
}

/**
 * Extract headings (H1-H6) from HTML content
 */
export function extractHeadings(html: string): Array<{ level: number; text: string }> {
  const headings: Array<{ level: number; text: string }> = [];
  const headingRegex = /<h([1-6])[^>]*>(.*?)<\/h[1-6]>/gi;
  let match;

  while ((match = headingRegex.exec(html)) !== null) {
    const level = parseInt(match[1] || "1", 10);
    const text = match[2]?.replace(/<[^>]*>/g, "").trim() || "";
    if (text) {
      headings.push({ level, text });
    }
  }

  return headings;
}

/**
 * Calculate keyword density in text
 */
export function calculateKeywordDensity(text: string, keyword: string): number {
  if (!text || !keyword) return 0;

  const normalizedText = text.toLowerCase().replace(/[^\w\s]/g, " ");
  const normalizedKeyword = keyword.toLowerCase().trim();
  const words = normalizedText.split(/\s+/).filter((w) => w.length > 0);
  const totalWords = words.length;

  if (totalWords === 0) return 0;

  const keywordCount = words.filter((w) => w === normalizedKeyword).length;
  return (keywordCount / totalWords) * 100;
}

/**
 * Generate keyword density report for top keywords
 */
export function generateKeywordDensityReport(
  text: string,
  topN: number = 20
): Array<{ keyword: string; count: number; density: number }> {
  if (!text) return [];

  const normalizedText = text.toLowerCase().replace(/[^\w\s]/g, " ");
  const words = normalizedText.split(/\s+/).filter((w) => w.length > 2); // Filter out short words
  const totalWords = words.length;

  if (totalWords === 0) return [];

  const wordCounts: Record<string, number> = {};
  for (const word of words) {
    wordCounts[word] = (wordCounts[word] || 0) + 1;
  }

  const report = Object.entries(wordCounts)
    .map(([keyword, count]) => ({
      keyword,
      count,
      density: (count / totalWords) * 100,
    }))
    .sort((a, b) => b.count - a.count)
    .slice(0, topN);

  return report;
}

/**
 * Generate Open Graph meta tags
 */
export function generateOpenGraphTags(data: {
  title: string;
  description?: string;
  image?: string;
  url?: string;
  type?: string;
  siteName?: string;
}): string {
  const tags: string[] = [];

  if (data.title) {
    tags.push(`<meta property="og:title" content="${escapeHtml(data.title)}" />`);
  }
  if (data.description) {
    tags.push(`<meta property="og:description" content="${escapeHtml(data.description)}" />`);
  }
  if (data.image) {
    tags.push(`<meta property="og:image" content="${escapeHtml(data.image)}" />`);
  }
  if (data.url) {
    tags.push(`<meta property="og:url" content="${escapeHtml(data.url)}" />`);
  }
  if (data.type) {
    tags.push(`<meta property="og:type" content="${escapeHtml(data.type)}" />`);
  }
  if (data.siteName) {
    tags.push(`<meta property="og:site_name" content="${escapeHtml(data.siteName)}" />`);
  }

  return tags.join("\n");
}

/**
 * Calculate readability scores (Flesch-Kincaid, SMOG, ARI)
 */
export function calculateReadabilityScore(text: string): {
  fleschKincaid: number;
  smog: number;
  ari: number;
} {
  if (!text || text.trim().length === 0) {
    return { fleschKincaid: 0, smog: 0, ari: 0 };
  }

  // Count sentences (ending with . ! ?)
  const sentences = text.split(/[.!?]+/).filter((s) => s.trim().length > 0);
  const sentenceCount = sentences.length || 1;

  // Count words
  const words = text.split(/\s+/).filter((w) => w.length > 0);
  const wordCount = words.length || 1;

  // Count syllables (approximate)
  let totalSyllables = 0;
  for (const word of words) {
    totalSyllables += countSyllables(word);
  }

  // Count complex words (3+ syllables)
  const complexWords = words.filter((w) => countSyllables(w) >= 3).length;

  // Average words per sentence
  const avgWordsPerSentence = wordCount / sentenceCount;

  // Average syllables per word
  const avgSyllablesPerWord = totalSyllables / wordCount;

  // Flesch-Kincaid Reading Ease (0-100, higher = easier)
  const fleschKincaid =
    206.835 - 1.015 * avgWordsPerSentence - 84.6 * avgSyllablesPerWord;

  // SMOG Index (grade level)
  const smog = 1.043 * Math.sqrt(complexWords * (30 / sentenceCount)) + 3.1291;

  // Automated Readability Index (ARI)
  const avgCharsPerWord = text.replace(/\s+/g, "").length / wordCount;
  const ari = 4.71 * avgCharsPerWord + 0.5 * avgWordsPerSentence - 21.43;

  return {
    fleschKincaid: Math.max(0, Math.min(100, fleschKincaid)),
    smog: Math.max(0, smog),
    ari: Math.max(0, ari),
  };
}

/**
 * Count syllables in a word (approximate)
 */
function countSyllables(word: string): number {
  word = word.toLowerCase();
  if (word.length <= 3) return 1;

  word = word.replace(/(?:[^laeiouy]es|ed|[^laeiouy]e)$/, "");
  word = word.replace(/^y/, "");
  const matches = word.match(/[aeiouy]{1,2}/g);
  return matches ? Math.max(1, matches.length) : 1;
}

/**
 * Generate robots.txt content
 */
export function generateRobotsTxt(options: {
  userAgent?: string;
  allow?: string[];
  disallow?: string[];
  sitemap?: string;
  crawlDelay?: number;
}): string {
  const lines: string[] = [];

  const userAgent = options.userAgent || "*";
  lines.push(`User-agent: ${userAgent}`);

  if (options.allow && options.allow.length > 0) {
    for (const path of options.allow) {
      if (path.trim()) {
        lines.push(`Allow: ${path}`);
      }
    }
  }

  if (options.disallow && options.disallow.length > 0) {
    for (const path of options.disallow) {
      if (path.trim()) {
        lines.push(`Disallow: ${path}`);
      }
    }
  } else if (!options.allow || options.allow.length === 0) {
    // Default disallow if no allow/disallow specified
    lines.push("Disallow:");
  }

  if (options.crawlDelay !== undefined && options.crawlDelay > 0) {
    lines.push(`Crawl-delay: ${options.crawlDelay}`);
  }

  if (options.sitemap) {
    lines.push("");
    lines.push(`Sitemap: ${options.sitemap}`);
  }

  return lines.join("\n");
}

/**
 * Generate JSON-LD schema markup
 */
export function generateSchemaMarkup(type: string, data: Record<string, any>): string {
  const schema: Record<string, any> = {
    "@context": "https://schema.org",
    "@type": type,
  };

  // Map common fields
  if (data.name) schema.name = data.name;
  if (data.headline) schema.headline = data.headline;
  if (data.description) schema.description = data.description;
  if (data.url) schema.url = data.url;
  if (data.image) schema.image = data.image;

  // Handle specific types
  if (type === "Article") {
    if (data.author) schema.author = data.author;
    if (data.datePublished) schema.datePublished = data.datePublished;
    if (data.dateModified) schema.dateModified = data.dateModified;
    if (data.publisher) schema.publisher = data.publisher;
  }

  if (type === "Organization" || type === "LocalBusiness") {
    if (data.address) schema.address = data.address;
    if (data.telephone) schema.telephone = data.telephone;
    if (data.email) schema.email = data.email;
  }

  if (type === "Product") {
    if (data.price) schema.offers = { "@type": "Offer", price: data.price };
    if (data.brand) schema.brand = data.brand;
  }

  // Merge any additional fields
  Object.keys(data).forEach((key) => {
    if (!["name", "headline", "description", "url", "image", "author", "datePublished", "dateModified", "publisher", "address", "telephone", "email", "price", "brand"].includes(key)) {
      schema[key] = data[key];
    }
  });

  return JSON.stringify(schema, null, 2);
}

/**
 * Sitemap URL interface
 */
export interface SitemapUrl {
  loc: string;
  changefreq?: "always" | "hourly" | "daily" | "weekly" | "monthly" | "yearly" | "never";
  priority?: number;
  lastmod?: string;
}

/**
 * Generate XML sitemap
 */
export function generateSitemap(urls: SitemapUrl[]): string {
  const xmlLines: string[] = [];
  xmlLines.push('<?xml version="1.0" encoding="UTF-8"?>');
  xmlLines.push('<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">');

  for (const url of urls) {
    if (!url.loc) continue;

    xmlLines.push("  <url>");
    xmlLines.push(`    <loc>${escapeXml(url.loc)}</loc>`);

    if (url.lastmod) {
      xmlLines.push(`    <lastmod>${escapeXml(url.lastmod)}</lastmod>`);
    }

    if (url.changefreq) {
      xmlLines.push(`    <changefreq>${escapeXml(url.changefreq)}</changefreq>`);
    }

    if (url.priority !== undefined) {
      xmlLines.push(`    <priority>${url.priority}</priority>`);
    }

    xmlLines.push("  </url>");
  }

  xmlLines.push("</urlset>");
  return xmlLines.join("\n");
}

/**
 * Generate Twitter Card meta tags
 */
export function generateTwitterCardTags(data: {
  card: "summary" | "summary_large_image";
  title: string;
  description?: string;
  image?: string;
  site?: string;
  creator?: string;
}): string {
  const tags: string[] = [];

  tags.push(`<meta name="twitter:card" content="${escapeHtml(data.card)}" />`);

  if (data.title) {
    tags.push(`<meta name="twitter:title" content="${escapeHtml(data.title)}" />`);
  }

  if (data.description) {
    tags.push(`<meta name="twitter:description" content="${escapeHtml(data.description)}" />`);
  }

  if (data.image) {
    tags.push(`<meta name="twitter:image" content="${escapeHtml(data.image)}" />`);
  }

  if (data.site) {
    tags.push(`<meta name="twitter:site" content="${escapeHtml(data.site)}" />`);
  }

  if (data.creator) {
    tags.push(`<meta name="twitter:creator" content="${escapeHtml(data.creator)}" />`);
  }

  return tags.join("\n");
}

/**
 * Escape HTML entities
 */
function escapeHtml(text: string): string {
  const map: Record<string, string> = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#039;",
  };
  return text.replace(/[&<>"']/g, (m) => map[m] || m);
}

/**
 * Escape XML entities
 */
function escapeXml(text: string): string {
  const map: Record<string, string> = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&apos;",
  };
  return text.replace(/[&<>"']/g, (m) => map[m] || m);
}
