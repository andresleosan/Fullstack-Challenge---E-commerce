// Utility Functions Exports
// Utils: Helper functions (validation, formatting, API calls, localStorage, etc)

// Auth utilities
export { tokenUtils, userUtils, authGuards, permissions, logout, clearAllAuthData } from './auth'
export { authMiddleware, useAuthStateChange, setupAuthEventListeners, cleanupAuthEventListeners } from './authMiddleware'

// Validators
export { validators, validateLoginForm, validateRegisterForm, validateCheckoutForm } from './validators'

// Routes configuration
export { ROUTES, createPath, PROTECTED_ROUTES, PUBLIC_ROUTES, AUTH_ONLY_ROUTES } from './routes'

// Mock data
export { mockProducts, mockCategories, mockOrders, getProductById, filterProducts, sortProducts } from './mockdata'
