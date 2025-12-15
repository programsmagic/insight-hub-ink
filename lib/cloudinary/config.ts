/**
 * Cloudinary configuration and utilities
 * 
 * SECURITY: All credentials must be provided via environment variables.
 * No hardcoded fallback values are used to prevent credential exposure.
 */

function getRequiredEnvVar(name: string): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Required environment variable ${name} is not set`);
  }
  return value;
}

function getRequiredEnvVarOr(name1: string, name2: string): string {
  const value = process.env[name1] || process.env[name2];
  if (!value) {
    throw new Error(`Required environment variable ${name1} or ${name2} is not set`);
  }
  return value;
}

function getOptionalEnvVar(name: string): string | undefined {
  return process.env[name];
}

/**
 * Get Cloudinary configuration (lazy-loaded to avoid build-time errors)
 * Only throws errors when actually accessed at runtime, not during build
 */
export function getCloudinaryConfig() {
  return {
    cloudName: getRequiredEnvVarOr("NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME", "CLOUDINARY_CLOUD_NAME"),
    apiKey: getRequiredEnvVar("CLOUDINARY_API_KEY"),
    apiSecret: getRequiredEnvVar("CLOUDINARY_API_SECRET"),
    url: getOptionalEnvVar("CLOUDINARY_URL"),
    assetsEnabled: process.env.NEXT_PUBLIC_CLOUDINARY_ASSETS_ENABLED === "true",
  };
}

/**
 * @deprecated Use getCloudinaryConfig() instead to avoid build-time errors
 * Kept for backward compatibility but will throw during build if env vars are missing
 */
export const cloudinaryConfig = new Proxy({} as ReturnType<typeof getCloudinaryConfig>, {
  get(_target, prop) {
    return getCloudinaryConfig()[prop as keyof ReturnType<typeof getCloudinaryConfig>];
  },
});

export const unsplashConfig = {
  accessKey: getOptionalEnvVar("UNSPLASH_ACCESS_KEY"),
};

export const pexelsConfig = {
  apiKey: getOptionalEnvVar("PEXELS_API_KEY"),
};

/**
 * Validate Cloudinary configuration
 * Returns true only if all required credentials are present
 */
export function validateCloudinaryConfig(): boolean {
  try {
    const config = getCloudinaryConfig();
    return !!(
      config.cloudName &&
      config.apiKey &&
      config.apiSecret
    );
  } catch {
    return false;
  }
}

/**
 * Get Cloudinary upload preset (if configured)
 */
export function getUploadPreset(): string | undefined {
  return process.env.CLOUDINARY_UPLOAD_PRESET;
}

