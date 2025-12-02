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
    if (match[1]) {
      links.push(match[1]);
    }
  }

  return links;
}

export function extractImages(html: string): string[] {
  const imageRegex = /<img[^>]+src=["']([^"']+)["'][^>]*>/gi;
  const images: string[] = [];
  let match;

  while ((match = imageRegex.exec(html)) !== null) {
    if (match[1]) {
      images.push(match[1]);
    }
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
    meta += `<meta property="og:image" content="${encodeHTMLEntities(metadata.ogImage)}">\n`;
  }
  if (metadata.ogUrl) {
    meta += `<meta property="og:url" content="${encodeHTMLEntities(metadata.ogUrl)}">\n`;
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
    meta += `<meta name="twitter:image" content="${encodeHTMLEntities(metadata.twitterImage)}">\n`;
  }

  return meta.trim();
}

/**
 * Basic HTML validation
 */
export function validateHTML(html: string): { valid: boolean; errors: string[]; warnings: string[] } {
  const errors: string[] = [];
  const warnings: string[] = [];

  // Check for unclosed tags
  const openTags: string[] = [];
  const tagRegex = /<\/?([a-z][a-z0-9]*)\b[^>]*>/gi;
  let match;

  while ((match = tagRegex.exec(html)) !== null) {
    if (!match[1]) {
      continue;
    }
    const tagName = match[1].toLowerCase();
    const isClosing = match[0].startsWith("</");

    if (isClosing) {
      const lastOpen = openTags.lastIndexOf(tagName);
      if (lastOpen === -1) {
        errors.push(`Closing tag </${tagName}> found without opening tag`);
      } else {
        openTags.splice(lastOpen, 1);
      }
    } else if (!match[0].endsWith("/>")) {
      // Self-closing tags are ignored
      openTags.push(tagName);
    }
  }

  // Check for unclosed tags
  for (const tag of openTags) {
    if (!["br", "hr", "img", "input", "meta", "link"].includes(tag)) {
      errors.push(`Unclosed tag: <${tag}>`);
    }
  }

  // Check for common issues
  if (html.includes("<script") && !html.includes("</script>")) {
    warnings.push("Script tag may not be properly closed");
  }

  if (html.includes("<style") && !html.includes("</style>")) {
    warnings.push("Style tag may not be properly closed");
  }

  return {
    valid: errors.length === 0,
    errors,
    warnings,
  };
}

/**
 * Generate HTML table from data
 */
export function generateHTMLTable(
  data: string[][],
  options: {
    hasHeader?: boolean;
    border?: boolean;
    striped?: boolean;
    className?: string;
  } = {}
): string {
  const { hasHeader = true, border = true, striped = false, className = "" } = options;

  let table = `<table${border ? ' border="1"' : ""}${className ? ` class="${className}"` : ""}${striped ? ' style="border-collapse: collapse;"' : ""}>\n`;

  if (hasHeader && data.length > 0) {
    table += "  <thead>\n    <tr>\n";
    for (const cell of data[0]) {
      table += `      <th>${encodeHTMLEntities(String(cell))}</th>\n`;
    }
    table += "    </tr>\n  </thead>\n";
  }

  table += "  <tbody>\n";
  const startRow = hasHeader ? 1 : 0;
  for (let i = startRow; i < data.length; i++) {
    const rowClass = striped && i % 2 === 0 ? ' class="striped"' : "";
    table += `    <tr${rowClass}>\n`;
    for (const cell of data[i]) {
      table += `      <td>${encodeHTMLEntities(String(cell))}</td>\n`;
    }
    table += "    </tr>\n";
  }
  table += "  </tbody>\n</table>";

  return table;
}

/**
 * Convert RGB to hex color
 */
export function rgbToHex(r: number, g: number, b: number): string {
  return `#${[r, g, b].map((x) => {
    const hex = x.toString(16);
    return hex.length === 1 ? "0" + hex : hex;
  }).join("")}`;
}

/**
 * Convert hex to RGB
 */
export function hexToRgb(hex: string): { r: number; g: number; b: number } | null {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
    : null;
}

