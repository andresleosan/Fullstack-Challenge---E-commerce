/**
 * Application Constants
 * Centralized configuration values
 */

// ==================== CART ====================
export const CART_CONSTANTS = {
  TAX_RATE: 0.08, // 8%
  SHIPPING_THRESHOLD: 50, // Free shipping over $50
  SHIPPING_COST: 5,
  STORAGE_KEY: 'estore-cart',
} as const

// ==================== VALIDATION ====================
export const VALIDATION_CONSTANTS = {
  PASSWORD_MIN_LENGTH: 6,
  PASSWORD_MAX_LENGTH: 50,
  EMAIL_MAX_LENGTH: 100,
  NAME_MIN_LENGTH: 2,
  NAME_MAX_LENGTH: 100,
  ADDRESS_MIN_LENGTH: 5,
  ADDRESS_MAX_LENGTH: 200,
  CITY_MIN_LENGTH: 2,
  CITY_MAX_LENGTH: 50,
  ZIPCODE_MIN_LENGTH: 3,
  ZIPCODE_MAX_LENGTH: 20,
  CARD_DIGITS: { MIN: 13, MAX: 19 },
  CVV_DIGITS: { MIN: 3, MAX: 4 },
} as const

// ==================== PAGINATION ====================
export const PAGINATION_CONSTANTS = {
  ITEMS_PER_PAGE: 12,
  MAX_ITEMS_PER_PAGE: 100,
} as const

// ==================== SECURITY ====================
export const SECURITY_CONSTANTS = {
  TOKEN_KEY: 'estore-auth-token',
  USER_KEY: 'estore-user',
  SESSION_TIMEOUT: 30 * 60 * 1000, // 30 minutes
  MAX_LOGIN_ATTEMPTS: 5,
  LOCKOUT_DURATION: 15 * 60 * 1000, // 15 minutes
} as const

// ==================== API ====================
export const API_CONSTANTS = {
  TIMEOUT: 10000,
  RETRY_ATTEMPTS: 3,
  RETRY_DELAY: 1000,
} as const

// ==================== CACHE ====================
export const CACHE_CONSTANTS = {
  PRODUCTS_CACHE_TIME: 5 * 60 * 1000, // 5 minutes
  CATEGORIES_CACHE_TIME: 30 * 60 * 1000, // 30 minutes
} as const
