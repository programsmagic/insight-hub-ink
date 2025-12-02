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

