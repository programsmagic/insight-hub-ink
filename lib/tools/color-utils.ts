/**
 * Color utility functions
 */

export interface RGB {
  r: number;
  g: number;
  b: number;
}

export interface HSL {
  h: number;
  s: number;
  l: number;
}

export function hexToRgb(hex: string): RGB | null {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  if (!result) {
    return null;
  }
  // TypeScript doesn't know that regex capture groups are guaranteed to exist,
  // but our regex pattern ensures they do when result is not null
  return {
    r: parseInt(result[1]!, 16),
    g: parseInt(result[2]!, 16),
    b: parseInt(result[3]!, 16),
  };
}

export function rgbToHex(r: number, g: number, b: number): string {
  return `#${[r, g, b].map((x) => {
    const hex = x.toString(16);
    return hex.length === 1 ? "0" + hex : hex;
  }).join("")}`;
}

export function rgbToHsl(r: number, g: number, b: number): HSL {
  r /= 255;
  g /= 255;
  b /= 255;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h = 0;
  let s = 0;
  const l = (max + min) / 2;

  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

    switch (max) {
      case r:
        h = ((g - b) / d + (g < b ? 6 : 0)) / 6;
        break;
      case g:
        h = ((b - r) / d + 2) / 6;
        break;
      case b:
        h = ((r - g) / d + 4) / 6;
        break;
    }
  }

  return {
    h: Math.round(h * 360),
    s: Math.round(s * 100),
    l: Math.round(l * 100),
  };
}

export function hslToRgb(h: number, s: number, l: number): RGB {
  h /= 360;
  s /= 100;
  l /= 100;

  let r: number, g: number, b: number;

  if (s === 0) {
    r = g = b = l;
  } else {
    const hue2rgb = (p: number, q: number, t: number) => {
      if (t < 0) t += 1;
      if (t > 1) t -= 1;
      if (t < 1 / 6) return p + (q - p) * 6 * t;
      if (t < 1 / 2) return q;
      if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
      return p;
    };

    const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    const p = 2 * l - q;

    r = hue2rgb(p, q, h + 1 / 3);
    g = hue2rgb(p, q, h);
    b = hue2rgb(p, q, h - 1 / 3);
  }

  return {
    r: Math.round(r * 255),
    g: Math.round(g * 255),
    b: Math.round(b * 255),
  };
}

export function getContrastRatio(color1: RGB, color2: RGB): number {
  const getLuminance = (rgb: RGB): number => {
    const values = [rgb.r / 255, rgb.g / 255, rgb.b / 255].map((val) => {
      return val <= 0.03928 ? val / 12.92 : Math.pow((val + 0.055) / 1.055, 2.4);
    });
    // TypeScript doesn't know the array has exactly 3 elements, but we guarantee it
    const r = values[0]!;
    const g = values[1]!;
    const b = values[2]!;
    return 0.2126 * r + 0.7152 * g + 0.0722 * b;
  };

  const lum1 = getLuminance(color1);
  const lum2 = getLuminance(color2);
  const lighter = Math.max(lum1, lum2);
  const darker = Math.min(lum1, lum2);

  return (lighter + 0.05) / (darker + 0.05);
}

export function generateColorPalette(baseColor: RGB, count: number = 5): RGB[] {
  const palette: RGB[] = [];
  const hsl = rgbToHsl(baseColor.r, baseColor.g, baseColor.b);

  for (let i = 0; i < count; i++) {
    const newHsl: HSL = {
      h: (hsl.h + (i * 30)) % 360,
      s: Math.max(20, Math.min(100, hsl.s + (i % 2 === 0 ? 10 : -10))),
      l: Math.max(10, Math.min(90, hsl.l + (i % 3 === 0 ? 10 : -10))),
    };
    palette.push(hslToRgb(newHsl.h, newHsl.s, newHsl.l));
  }

  return palette;
}

export function generateShades(baseColor: RGB, count: number = 10): RGB[] {
  const shades: RGB[] = [];
  const hsl = rgbToHsl(baseColor.r, baseColor.g, baseColor.b);

  for (let i = 0; i < count; i++) {
    const lightness = (i / (count - 1)) * 100;
    shades.push(hslToRgb(hsl.h, hsl.s, lightness));
  }

  return shades;
}

