/**
 * Cloudinary configuration and utilities
 */

export const cloudinaryConfig = {
  cloudName: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || process.env.CLOUDINARY_CLOUD_NAME || "dks1evo4g",
  apiKey: process.env.CLOUDINARY_API_KEY || "456495634398688",
  apiSecret: process.env.CLOUDINARY_API_SECRET || "lDFwCLy9Fi_YHrnFa2S44o2f2Fg",
  url: process.env.CLOUDINARY_URL || "cloudinary://456495634398688:lDFwCLy9Fi_YHrnFa2S44o2f2Fg@dks1evo4g",
  assetsEnabled: process.env.NEXT_PUBLIC_CLOUDINARY_ASSETS_ENABLED === "true",
};

export const unsplashConfig = {
  accessKey: process.env.UNSPLASH_ACCESS_KEY || "ffY4Pw0Q1kqVxaDQxz6HfEMuekYgbPmyDHnNqUfGNfw",
};

export const pexelsConfig = {
  apiKey: process.env.PEXELS_API_KEY || "wKndsNvSF9cd2rKY73BhZcXio4CNipdTd2G74eDFp8SOv1XrSQJaxVcL",
};

/**
 * Validate Cloudinary configuration
 */
export function validateCloudinaryConfig(): boolean {
  return !!(
    cloudinaryConfig.cloudName &&
    cloudinaryConfig.apiKey &&
    cloudinaryConfig.apiSecret
  );
}

/**
 * Get Cloudinary upload preset (if configured)
 */
export function getUploadPreset(): string | undefined {
  return process.env.CLOUDINARY_UPLOAD_PRESET;
}

