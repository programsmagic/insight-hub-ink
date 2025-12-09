/**
 * Environment variable validation and access
 * Ensures required environment variables are present
 */

const requiredEnvVars = [
  // Add your required environment variables here
  // 'DATABASE_URL',
  // 'RESEND_API_KEY',
] as const;

const optionalEnvVars = [
  'NEXT_PUBLIC_SITE_URL',
  'NEXT_PUBLIC_GOOGLE_ADSENSE_ID',
  'NEXT_PUBLIC_GOOGLE_ADSENSE_DISPLAY_SLOT',
  'NEXT_PUBLIC_GOOGLE_ADSENSE_IN_ARTICLE_SLOT',
  'NEXT_PUBLIC_GOOGLE_ADSENSE_MATCHED_CONTENT_SLOT',
  'NEXT_PUBLIC_FINTRACK_API_URL',
] as const;

type RequiredEnvVar = typeof requiredEnvVars[number];
type OptionalEnvVar = typeof optionalEnvVars[number];

class EnvValidator {
  private missingVars: string[] = [];

  validate(): void {
    this.missingVars = [];

    requiredEnvVars.forEach((varName) => {
      if (!process.env[varName]) {
        this.missingVars.push(varName);
      }
    });

    if (this.missingVars.length > 0) {
      throw new Error(
        `Missing required environment variables: ${this.missingVars.join(', ')}`
      );
    }
  }

  get(varName: RequiredEnvVar): string {
    const value = process.env[varName];
    if (!value) {
      throw new Error(`Required environment variable ${varName} is not set`);
    }
    return value;
  }

  getOptional(varName: OptionalEnvVar): string | undefined {
    return process.env[varName];
  }

  getOptionalWithDefault(varName: OptionalEnvVar, defaultValue: string): string {
    return process.env[varName] ?? defaultValue;
  }
}

// Create singleton instance
export const env = new EnvValidator();

// Validate on module load (only in production)
if (process.env.NODE_ENV === 'production') {
  try {
    env.validate();
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Environment validation failed:', error);
  }
}

