/**
 * SEO utility functions
 */

export interface SitemapUrl {
  loc: string;
  lastmod?: string;
  changefreq?: "always" | "hourly" | "daily" | "weekly" | "monthly" | "yearly" | "never";
  priority?: number;
}

export function generateSitemap(urls: SitemapUrl[]): string {
  let sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n`;
  sitemap += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;

  for (const url of urls) {
    sitemap += `  <url>\n`;
    sitemap += `    <loc>${escapeXML(url.loc)}</loc>\n`;
    if (url.lastmod) {
      sitemap += `    <lastmod>${url.lastmod}</lastmod>\n`;
    }
    if (url.changefreq) {
      sitemap += `    <changefreq>${url.changefreq}</changefreq>\n`;
    }
    if (url.priority !== undefined) {
      sitemap += `    <priority>${url.priority}</priority>\n`;
    }
    sitemap += `  </url>\n`;
  }

  sitemap += `</urlset>`;
  return sitemap;
}

export function generateRobotsTxt(options: {
  userAgent?: string;
  allow?: string[];
  disallow?: string[];
  sitemap?: string;
  crawlDelay?: number;
}): string {
  let robots = "";

  if (options.userAgent) {
    robots += `User-agent: ${options.userAgent}\n`;
  } else {
    robots += `User-agent: *\n`;
  }

  if (options.allow && options.allow.length > 0) {
    for (const path of options.allow) {
      robots += `Allow: ${path}\n`;
    }
  }

  if (options.disallow && options.disallow.length > 0) {
    for (const path of options.disallow) {
      robots += `Disallow: ${path}\n`;
    }
  }

  if (options.crawlDelay) {
    robots += `Crawl-delay: ${options.crawlDelay}\n`;
  }

  if (options.sitemap) {
    robots += `\nSitemap: ${options.sitemap}\n`;
  }

  return robots.trim();
}

export function calculateKeywordDensity(text: string, keyword: string): number {
  const words = text.toLowerCase().split(/\s+/);
  const keywordLower = keyword.toLowerCase();
  const keywordCount = words.filter((word) => word === keywordLower).length;
  return words.length > 0 ? (keywordCount / words.length) * 100 : 0;
}

export function calculateReadabilityScore(text: string): {
  fleschKincaid: number;
  smog: number;
  ari: number;
} {
  const sentences = text.split(/[.!?]+/).filter((s) => s.trim().length > 0);
  const words = text.split(/\s+/).filter((w) => w.length > 0);
  const syllables = words.reduce((count, word) => count + countSyllables(word), 0);

  const avgSentenceLength = words.length / sentences.length;
  const avgSyllablesPerWord = syllables / words.length;

  // Flesch Reading Ease
  const fleschKincaid = 206.835 - 1.015 * avgSentenceLength - 84.6 * avgSyllablesPerWord;

  // SMOG Index
  const smog = 1.043 * Math.sqrt(30 * (sentences.length / words.length)) + 3.1291;

  // Automated Readability Index
  const avgCharsPerWord = text.replace(/\s/g, "").length / words.length;
  const ari = 4.71 * avgCharsPerWord + 0.5 * avgSentenceLength - 21.43;

  return {
    fleschKincaid: Math.round(fleschKincaid * 100) / 100,
    smog: Math.round(smog * 100) / 100,
    ari: Math.round(ari * 100) / 100,
  };
}

function countSyllables(word: string): number {
  word = word.toLowerCase();
  if (word.length <= 3) return 1;
  word = word.replace(/(?:[^laeiouy]es|ed|[^laeiouy]e)$/, "");
  word = word.replace(/^y/, "");
  const matches = word.match(/[aeiouy]{1,2}/g);
  return matches ? matches.length : 1;
}

export function extractHeadings(html: string): Array<{ level: number; text: string }> {
  const headingRegex = /<h([1-6])[^>]*>(.*?)<\/h[1-6]>/gi;
  const headings: Array<{ level: number; text: string }> = [];
  let match;

  while ((match = headingRegex.exec(html)) !== null) {
    const level = match[1];
    const text = match[2];
    if (level && text) {
      headings.push({
        level: parseInt(level, 10),
        text: text.replace(/<[^>]*>/g, "").trim(),
      });
    }
  }

  return headings;
}

function escapeXML(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

/**
 * Generate JSON-LD schema markup
 */
export function generateSchemaMarkup(type: string, data: Record<string, any>): string {
  const schema = {
    "@context": "https://schema.org",
    "@type": type,
    ...data,
  };
  return JSON.stringify(schema, null, 2);
}

/**
 * Generate Open Graph meta tags
 */
export function generateOpenGraphTags(data: {
  title?: string;
  description?: string;
  image?: string;
  url?: string;
  type?: string;
  siteName?: string;
}): string {
  let tags = "";

  if (data.title) {
    tags += `<meta property="og:title" content="${escapeXML(data.title)}">\n`;
  }
  if (data.description) {
    tags += `<meta property="og:description" content="${escapeXML(data.description)}">\n`;
  }
  if (data.image) {
    tags += `<meta property="og:image" content="${escapeXML(data.image)}">\n`;
  }
  if (data.url) {
    tags += `<meta property="og:url" content="${escapeXML(data.url)}">\n`;
  }
  if (data.type) {
    tags += `<meta property="og:type" content="${escapeXML(data.type)}">\n`;
  }
  if (data.siteName) {
    tags += `<meta property="og:site_name" content="${escapeXML(data.siteName)}">\n`;
  }

  return tags.trim();
}

/**
 * Generate Twitter Card meta tags
 */
export function generateTwitterCardTags(data: {
  card?: "summary" | "summary_large_image";
  title?: string;
  description?: string;
  image?: string;
  site?: string;
  creator?: string;
}): string {
  let tags = "";

  if (data.card) {
    tags += `<meta name="twitter:card" content="${data.card}">\n`;
  }
  if (data.title) {
    tags += `<meta name="twitter:title" content="${escapeXML(data.title)}">\n`;
  }
  if (data.description) {
    tags += `<meta name="twitter:description" content="${escapeXML(data.description)}">\n`;
  }
  if (data.image) {
    tags += `<meta name="twitter:image" content="${escapeXML(data.image)}">\n`;
  }
  if (data.site) {
    tags += `<meta name="twitter:site" content="${escapeXML(data.site)}">\n`;
  }
  if (data.creator) {
    tags += `<meta name="twitter:creator" content="${escapeXML(data.creator)}">\n`;
  }

  return tags.trim();
}

/**
 * Generate keyword density report
 */
export function generateKeywordDensityReport(text: string, topN: number = 10): Array<{
  keyword: string;
  count: number;
  density: number;
}> {
  const words = text
    .toLowerCase()
    .replace(/[^\w\s]/g, " ")
    .split(/\s+/)
    .filter((w) => w.length > 2);

  const wordCount: Record<string, number> = {};
  for (const word of words) {
    wordCount[word] = (wordCount[word] || 0) + 1;
  }

  const totalWords = words.length;
  const report = Object.entries(wordCount)
    .map(([keyword, count]) => ({
      keyword,
      count,
      density: (count / totalWords) * 100,
    }))
    .sort((a, b) => b.count - a.count)
    .slice(0, topN);

  return report;
}

