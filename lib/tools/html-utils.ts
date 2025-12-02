/**
 * HTML utility functions
 */

export function formatHTML(html: string, indent: number = 2): string {
  let formatted = "";
  let indentLevel = 0;
  const indentStr = " ".repeat(indent);

  html = html.trim().replace(/>\s+</g, "><");

  for (let i = 0; i < html.length; i++) {
    const char = html[i];
    const nextChar = html[i + 1];

    if (char === "<" && nextChar !== "/") {
      if (i > 0 && html[i - 1] !== ">") {
        formatted += "\n";
      }
      formatted += indentStr.repeat(indentLevel) + char;
      if (nextChar !== "!" && nextChar !== "?") {
        indentLevel++;
      }
    } else if (char === "<" && nextChar === "/") {
      indentLevel--;
      if (formatted.trim().endsWith(">")) {
        formatted += "\n";
      }
      formatted += indentStr.repeat(Math.max(0, indentLevel)) + char;
    } else if (char === ">") {
      formatted += char;
      if (nextChar && nextChar !== "<") {
        formatted += "\n" + indentStr.repeat(indentLevel);
      }
    } else {
      formatted += char;
    }
  }

  return formatted;
}

export function minifyHTML(html: string): string {
  return html
    .replace(/\s+/g, " ")
    .replace(/>\s+</g, "><")
    .replace(/<!--[\s\S]*?-->/g, "")
    .trim();
}

export function removeHTMLTags(html: string): string {
  return html.replace(/<[^>]*>/g, "");
}

export function extractLinks(html: string): string[] {
  const linkRegex = /<a[^>]+href=["']([^"']+)["'][^>]*>/gi;
  const links: string[] = [];
  let match;

  while ((match = linkRegex.exec(html)) !== null) {
    links.push(match[1]);
  }

  return links;
}

export function extractImages(html: string): string[] {
  const imageRegex = /<img[^>]+src=["']([^"']+)["'][^>]*>/gi;
  const images: string[] = [];
  let match;

  while ((match = imageRegex.exec(html)) !== null) {
    images.push(match[1]);
  }

  return images;
}

export function encodeHTMLEntities(text: string): string {
  const entityMap: Record<string, string> = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;",
    "/": "&#x2F;",
  };

  return text.replace(/[&<>"'/]/g, (char) => entityMap[char] || char);
}

export function decodeHTMLEntities(text: string): string {
  const entityMap: Record<string, string> = {
    "&amp;": "&",
    "&lt;": "<",
    "&gt;": ">",
    "&quot;": '"',
    "&#39;": "'",
    "&#x2F;": "/",
  };

  return text.replace(/&[a-z0-9#]+;/gi, (entity) => entityMap[entity.toLowerCase()] || entity);
}

export function generateMetaTags(metadata: {
  title?: string;
  description?: string;
  keywords?: string;
  author?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  ogUrl?: string;
  twitterCard?: string;
  twitterTitle?: string;
  twitterDescription?: string;
  twitterImage?: string;
}): string {
  let meta = "";

  if (metadata.title) {
    meta += `<title>${encodeHTMLEntities(metadata.title)}</title>\n`;
  }
  if (metadata.description) {
    meta += `<meta name="description" content="${encodeHTMLEntities(metadata.description)}">\n`;
  }
  if (metadata.keywords) {
    meta += `<meta name="keywords" content="${encodeHTMLEntities(metadata.keywords)}">\n`;
  }
  if (metadata.author) {
    meta += `<meta name="author" content="${encodeHTMLEntities(metadata.author)}">\n`;
  }

  // Open Graph
  if (metadata.ogTitle) {
    meta += `<meta property="og:title" content="${encodeHTMLEntities(metadata.ogTitle)}">\n`;
  }
  if (metadata.ogDescription) {
    meta += `<meta property="og:description" content="${encodeHTMLEntities(metadata.ogDescription)}">\n`;
  }
  if (metadata.ogImage) {
    meta += `<meta property="og:image" content="${metadata.ogImage}">\n`;
  }
  if (metadata.ogUrl) {
    meta += `<meta property="og:url" content="${metadata.ogUrl}">\n`;
  }

  // Twitter Card
  if (metadata.twitterCard) {
    meta += `<meta name="twitter:card" content="${metadata.twitterCard}">\n`;
  }
  if (metadata.twitterTitle) {
    meta += `<meta name="twitter:title" content="${encodeHTMLEntities(metadata.twitterTitle)}">\n`;
  }
  if (metadata.twitterDescription) {
    meta += `<meta name="twitter:description" content="${encodeHTMLEntities(metadata.twitterDescription)}">\n`;
  }
  if (metadata.twitterImage) {
    meta += `<meta name="twitter:image" content="${metadata.twitterImage}">\n`;
  }

  return meta.trim();
}

