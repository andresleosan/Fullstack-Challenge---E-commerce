/**
 * Router Configuration - Rutas Centralizadas
 * Referencia de todas las rutas de la aplicación
 * 
 * Para futura expansión y mantenimiento
 */

export const ROUTES = {
  // Públicas
  HOME: '/',
  PRODUCT_DETAIL: '/productos/:id',
  CART: '/carrito',
  
  // Autenticación
  LOGIN: '/login',
  REGISTER: '/register',
  
  // Protegidas - Usuario
  CHECKOUT: '/checkout',
  PROFILE: '/profile',
  ORDERS: '/orders',
  
  // Admin (futuro)
  // ADMIN_DASHBOARD: '/admin',
  // ADMIN_PRODUCTS: '/admin/products',
  // ADMIN_ORDERS: '/admin/orders',
} as const

export type Route = typeof ROUTES[keyof typeof ROUTES]

/**
 * Helper para navegar a rutas con parámetros
 */
export const createPath = (route: Route, params?: Record<string, string | number>) => {
  let path: string = route
  
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      path = path.replace(`:${key}`, String(value))
    })
  }
  
  return path
}

// Ejemplos de uso:
// createPath(ROUTES.PRODUCT_DETAIL, { id: '123' }) → '/productos/123'

/**
 * Rutas que requieren autenticación
 */
export const PROTECTED_ROUTES = [
  ROUTES.CHECKOUT,
  ROUTES.PROFILE,
  ROUTES.ORDERS,
] as const

/**
 * Rutas públicas (sin autenticación)
 */
export const PUBLIC_ROUTES = [
  ROUTES.HOME,
  ROUTES.PRODUCT_DETAIL,
  ROUTES.CART,
  ROUTES.LOGIN,
  ROUTES.REGISTER,
] as const

/**
 * Rutas de autenticación que redirigen si ya estás logueado
 */
export const AUTH_ONLY_ROUTES = [
  ROUTES.LOGIN,
  ROUTES.REGISTER,
] as const
