import { EnvConfig } from '@/types';

/**
 * Validates that required environment variables are present
 */
function validateEnvVar(name: string, value: string | undefined): string {
  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }
  return value;
}

/**
 * Environment configuration with validation
 */
export const env: EnvConfig = {
  NEXT_PUBLIC_THIRDWEB_CLIENT_ID: validateEnvVar(
    'NEXT_PUBLIC_THIRDWEB_CLIENT_ID',
    process.env.NEXT_PUBLIC_THIRDWEB_CLIENT_ID
  ),
  NODE_ENV: (process.env.NODE_ENV as EnvConfig['NODE_ENV']) || 'development',
};

/**
 * Application configuration constants
 */
export const config = {
  app: {
    name: process.env.NEXT_PUBLIC_APP_NAME || 'Thirdweb DApp',
    description: process.env.NEXT_PUBLIC_APP_DESCRIPTION || 'A production-ready thirdweb application',
    url: process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000',
    version: process.env.npm_package_version || '1.0.0',
  },

  thirdweb: {
    clientId: env.NEXT_PUBLIC_THIRDWEB_CLIENT_ID,
  },

  seo: {
    title: process.env.NEXT_PUBLIC_SEO_TITLE || 'Thirdweb DApp',
    description: process.env.NEXT_PUBLIC_SEO_DESCRIPTION || 'A production-ready thirdweb application',
    keywords: process.env.NEXT_PUBLIC_SEO_KEYWORDS || 'thirdweb, blockchain, dapp, web3',
    author: process.env.NEXT_PUBLIC_SEO_AUTHOR || 'Thirdweb Team',
    ogImage: process.env.NEXT_PUBLIC_OG_IMAGE || '/og-image.png',
  },

  features: {
    enableAnalytics: process.env.NEXT_PUBLIC_ENABLE_ANALYTICS === 'true',
    enableErrorReporting: process.env.NEXT_PUBLIC_ENABLE_ERROR_REPORTING === 'true',
    enablePWA: process.env.NEXT_PUBLIC_ENABLE_PWA === 'true',
  },

  api: {
    baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL || '/api',
    timeout: parseInt(process.env.NEXT_PUBLIC_API_TIMEOUT || '10000'),
  },

  isDevelopment: env.NODE_ENV === 'development',
  isProduction: env.NODE_ENV === 'production',
  isTest: env.NODE_ENV === 'test',
} as const;

/**
 * Type-safe environment variable getter
 */
export function getEnvVar<K extends keyof EnvConfig>(
  key: K,
  defaultValue?: EnvConfig[K]
): EnvConfig[K] {
  const value = process.env[key] || defaultValue;
  if (value === undefined) {
    throw new Error(`Environment variable ${key} is required but not set`);
  }
  return value as EnvConfig[K];
}

/**
 * Check if we're in development mode
 */
export const isDev = config.isDevelopment;

/**
 * Check if we're in production mode
 */
export const isProd = config.isProduction;
