/**
 * Error Constants
 * Standardized error messages and codes
 */

export const ERROR_CODES = {
  // Auth
  AUTH_INVALID_CREDENTIALS: 'AUTH_INVALID_CREDENTIALS',
  AUTH_USER_NOT_FOUND: 'AUTH_USER_NOT_FOUND',
  AUTH_EMAIL_EXISTS: 'AUTH_EMAIL_EXISTS',
  AUTH_WEAK_PASSWORD: 'AUTH_WEAK_PASSWORD',
  AUTH_SESSION_EXPIRED: 'AUTH_SESSION_EXPIRED',

  // Products
  PRODUCT_NOT_FOUND: 'PRODUCT_NOT_FOUND',
  PRODUCT_OUT_OF_STOCK: 'PRODUCT_OUT_OF_STOCK',
  PRODUCTS_FETCH_FAILED: 'PRODUCTS_FETCH_FAILED',

  // Cart
  CART_INVALID_ITEM: 'CART_INVALID_ITEM',
  CART_ITEM_NOT_FOUND: 'CART_ITEM_NOT_FOUND',

  // Orders
  ORDER_CREATION_FAILED: 'ORDER_CREATION_FAILED',
  ORDER_NOT_FOUND: 'ORDER_NOT_FOUND',

  // Validation
  VALIDATION_ERROR: 'VALIDATION_ERROR',
  INVALID_INPUT: 'INVALID_INPUT',

  // Server
  SERVER_ERROR: 'SERVER_ERROR',
  NETWORK_ERROR: 'NETWORK_ERROR',
  TIMEOUT_ERROR: 'TIMEOUT_ERROR',

  // Generic
  UNKNOWN_ERROR: 'UNKNOWN_ERROR',
} as const

export const ERROR_MESSAGES: Record<string, string> = {
  [ERROR_CODES.AUTH_INVALID_CREDENTIALS]: 'Email o contraseña incorrectos',
  [ERROR_CODES.AUTH_USER_NOT_FOUND]: 'Usuario no encontrado',
  [ERROR_CODES.AUTH_EMAIL_EXISTS]: 'Email ya está registrado',
  [ERROR_CODES.AUTH_WEAK_PASSWORD]: 'Contraseña muy débil',
  [ERROR_CODES.AUTH_SESSION_EXPIRED]: 'Tu sesión ha expirado. Por favor inicia sesión de nuevo.',
  [ERROR_CODES.PRODUCT_NOT_FOUND]: 'Producto no encontrado',
  [ERROR_CODES.PRODUCT_OUT_OF_STOCK]: 'Producto agotado',
  [ERROR_CODES.PRODUCTS_FETCH_FAILED]: 'Error al cargar productos. Intenta más tarde.',
  [ERROR_CODES.CART_INVALID_ITEM]: 'Producto inválido en el carrito',
  [ERROR_CODES.ORDER_CREATION_FAILED]: 'Error al crear la orden',
  [ERROR_CODES.VALIDATION_ERROR]: 'Por favor verifica los datos ingresados',
  [ERROR_CODES.SERVER_ERROR]: 'Error en el servidor. Intenta más tarde.',
  [ERROR_CODES.NETWORK_ERROR]: 'Error de conexión. Verifica tu internet.',
  [ERROR_CODES.TIMEOUT_ERROR]: 'La solicitud tardó demasiado. Intenta de nuevo.',
  [ERROR_CODES.UNKNOWN_ERROR]: 'Algo salió mal. Por favor intenta de nuevo.',
}
