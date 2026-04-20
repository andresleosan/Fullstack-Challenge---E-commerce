/**
 * Environment Configuration
 * Centralized configuration for different environments
 */

export const API_CONFIG = {
  // API Base URL
  baseURL: (import.meta as any).env.VITE_API_BASE_URL || 'http://localhost:3000/api',

  // Timeouts
  timeout: 10000,
  retryAttempts: 3,
  retryDelay: 1000,

  // Feature flags
  features: {
    firebase: true,
    analytics: false,
    errorTracking: false,
  },

  // Firebase
  firebase: {
    useEmulator: (import.meta as any).env.VITE_USE_EMULATOR === 'true',
    emulatorUrl: 'http://localhost:9099',
  },

  // Security
  security: {
    tokenKey: 'estore-auth-token',
    userKey: 'estore-user',
    sessionTimeout: 30 * 60 * 1000, // 30 minutes
  },

  // UI Settings
  ui: {
    toastDuration: 3000,
    modalAnimationDuration: 300,
  },
} as const

// Environment detection
export const ENV = {
  isDevelopment: (import.meta as any).env.MODE === 'development',
  isProduction: (import.meta as any).env.MODE === 'production',
  isTest: (import.meta as any).env.MODE === 'test',
} as const

// Get config value with type safety
export function getConfig<K extends keyof typeof API_CONFIG>(
  key: K
): typeof API_CONFIG[K] {
  return API_CONFIG[key]
}

// Log config in development
if (ENV.isDevelopment) {
  console.debug('API Config:', {
    baseURL: API_CONFIG.baseURL,
    useEmulator: API_CONFIG.firebase.useEmulator,
    sessionTimeout: `${API_CONFIG.security.sessionTimeout / 1000}s`,
  })
}
