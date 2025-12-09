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
export async function checkBacklinks(url: string): Promise<{
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
