/**
 * Cloudinary utility functions
 */

export interface CloudinaryTransformOptions {
  width?: number;
  height?: number;
  crop?: string;
  quality?: number | string;
  format?: string;
  effect?: string;
  gravity?: string;
  radius?: number;
  angle?: number;
  overlay?: string;
  underlay?: string;
  opacity?: number;
  brightness?: number;
  contrast?: number;
  saturation?: number;
  blur?: number;
  sharpen?: number;
  pixelate?: number;
  border?: string;
  background?: string;
}

export function buildCloudinaryUrl(
  publicId: string,
  options: CloudinaryTransformOptions = {},
  cloudName?: string
): string {
  // Use provided cloudName or fallback to environment variable or default
  const finalCloudName =
    cloudName ||
    process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME ||
    process.env.CLOUDINARY_CLOUD_NAME ||
    "demo"; // Default fallback for URL generation (doesn't affect functionality)
  const baseUrl = `https://res.cloudinary.com/${finalCloudName}/image/upload`;

  const transformations: string[] = [];

  if (options.width) transformations.push(`w_${options.width}`);
  if (options.height) transformations.push(`h_${options.height}`);
  if (options.crop) transformations.push(`c_${options.crop}`);
  if (options.quality) transformations.push(`q_${options.quality}`);
  if (options.format) transformations.push(`f_${options.format}`);
  if (options.effect) transformations.push(`e_${options.effect}`);
  if (options.gravity) transformations.push(`g_${options.gravity}`);
  if (options.radius) transformations.push(`r_${options.radius}`);
  if (options.angle) transformations.push(`a_${options.angle}`);
  if (options.overlay) transformations.push(`l_${options.overlay}`);
  if (options.underlay) transformations.push(`u_${options.underlay}`);
  if (options.opacity) transformations.push(`o_${options.opacity}`);
  if (options.brightness) transformations.push(`e_brightness:${options.brightness}`);
  if (options.contrast) transformations.push(`e_contrast:${options.contrast}`);
  if (options.saturation) transformations.push(`e_saturation:${options.saturation}`);
  if (options.blur) transformations.push(`e_blur:${options.blur}`);
  if (options.sharpen) transformations.push(`e_sharpen:${options.sharpen}`);
  if (options.pixelate) transformations.push(`e_pixelate:${options.pixelate}`);
  if (options.border) transformations.push(`bo_${options.border}`);
  if (options.background) transformations.push(`b_${options.background}`);

  const transformString = transformations.length > 0 ? transformations.join(",") : "";
  return `${baseUrl}/${transformString ? `${transformString}/` : ""}${publicId}`;
}

export function generateResponsiveSrcSet(
  publicId: string,
  widths: number[] = [320, 640, 768, 1024, 1280, 1920],
  options: CloudinaryTransformOptions = {},
  cloudName?: string
): string {
  return widths
    .map((width) => {
      const url = buildCloudinaryUrl(publicId, { ...options, width, crop: options.crop || "scale" }, cloudName);
      return `${url} ${width}w`;
    })
    .join(", ");
}

export function optimizeImageUrl(
  publicId: string,
  format: "auto" | "webp" | "avif" = "auto",
  quality: number | "auto" = "auto",
  cloudName?: string
): string {
  // buildCloudinaryUrl adds prefixes automatically ('f_' for format, 'q_' for quality)
  // So we pass raw values: "auto"/"webp"/"avif" for format, "auto" or number for quality
  return buildCloudinaryUrl(publicId, {
    format: format, // Will become f_auto, f_webp, or f_avif
    quality: quality, // Will become q_auto or q_<number>
  }, cloudName);
}

export function generateThumbnailUrl(
  publicId: string,
  width: number = 200,
  height: number = 200,
  crop: string = "fill",
  cloudName?: string
): string {
  return buildCloudinaryUrl(publicId, {
    width,
    height,
    crop,
    quality: 80,
    format: "auto",
  }, cloudName);
}

export function applyImageEffect(
  publicId: string,
  effect: string,
  value?: number,
  cloudName?: string
): string {
  const effectString = value !== undefined ? `${effect}:${value}` : effect;
  return buildCloudinaryUrl(publicId, {
    effect: effectString,
  }, cloudName);
}

