/**
 * Encoding utility functions
 */

export function encodeURL(text: string): string {
  return encodeURIComponent(text);
}

export function decodeURL(encoded: string): string {
  try {
    return decodeURIComponent(encoded);
  } catch (error) {
    throw new Error("Invalid URL encoding");
  }
}

export function encodeBase64(text: string): string {
  if (typeof window !== "undefined") {
    return btoa(unescape(encodeURIComponent(text)));
  }
  return Buffer.from(text, "utf-8").toString("base64");
}

export function decodeBase64(base64: string): string {
  try {
    if (typeof window !== "undefined") {
      return decodeURIComponent(escape(atob(base64)));
    }
    return Buffer.from(base64, "base64").toString("utf-8");
  } catch (error) {
    throw new Error("Invalid Base64 string");
  }
}

export function encodeUnicode(text: string): string {
  return text
    .split("")
    .map((char) => {
      const code = char.charCodeAt(0);
      return code > 127 ? `\\u${code.toString(16).padStart(4, "0")}` : char;
    })
    .join("");
}

export function decodeUnicode(encoded: string): string {
  return encoded.replace(/\\u([0-9a-fA-F]{4})/g, (_, hex) => {
    return String.fromCharCode(parseInt(hex, 16));
  });
}

export function decodeJWT(token: string): { header: any; payload: any; signature: string } | null {
  try {
    const parts = token.split(".");
    if (parts.length !== 3) {
      throw new Error("Invalid JWT format");
    }

    const header = JSON.parse(atob(parts[0]));
    const payload = JSON.parse(atob(parts[1]));
    const signature = parts[2];

    return { header, payload, signature };
  } catch (error) {
    return null;
  }
}

