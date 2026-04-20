/**
 * Auth Utilities - Funciones de autenticación y validación
 * 
 * Incluye:
 * - Guards de ruta (verificación de permisos)
 * - Helpers de token
 * - Helpers de validación de usuario
 */

import type { User } from '@types'

/**
 * ===== TOKEN MANAGEMENT =====
 */

const TOKEN_KEY = 'estore-auth-token'
const USER_KEY = 'estore-user'

export const tokenUtils = {
  /**
   * Salvar token en localStorage
   */
  saveToken: (token: string) => {
    try {
      localStorage.setItem(TOKEN_KEY, token)
    } catch (error) {
      console.error('Error saving token:', error)
    }
  },

  /**
   * Obtener token del localStorage
   */
  getToken: (): string | null => {
    try {
      return localStorage.getItem(TOKEN_KEY)
    } catch (error) {
      console.error('Error getting token:', error)
      return null
    }
  },

  /**
   * Eliminar token del localStorage
   */
  removeToken: () => {
    try {
      localStorage.removeItem(TOKEN_KEY)
    } catch (error) {
      console.error('Error removing token:', error)
    }
  },

  /**
   * Verificar si existe token válido
   */
  hasToken: (): boolean => {
    const token = tokenUtils.getToken()
    return !!token && token.length > 0
  },
}

/**
 * ===== USER MANAGEMENT =====
 */

export const userUtils = {
  /**
   * Salvar user en localStorage
   */
  saveUser: (user: User) => {
    try {
      localStorage.setItem(USER_KEY, JSON.stringify(user))
    } catch (error) {
      console.error('Error saving user:', error)
    }
  },

  /**
   * Obtener user del localStorage
   */
  getUser: (): User | null => {
    try {
      const stored = localStorage.getItem(USER_KEY)
      return stored ? JSON.parse(stored) : null
    } catch (error) {
      console.error('Error getting user:', error)
      return null
    }
  },

  /**
   * Eliminar user del localStorage
   */
  removeUser: () => {
    try {
      localStorage.removeItem(USER_KEY)
    } catch (error) {
      console.error('Error removing user:', error)
    }
  },

  /**
   * Verificar si user es admin
   */
  isAdmin: (user: User | null): boolean => {
    return user?.role === 'admin'
  },

  /**
   * Verificar si user está autenticado
   */
  isAuthenticated: (user: User | null): boolean => {
    return !!user && !!user.id && !!user.email
  },
}

/**
 * ===== AUTH GUARDS =====
 */

export const authGuards = {
  /**
   * Guard: Usuario debe estar autenticado
   * Retorna true si el usuario está autenticado
   */
  requireAuth: (user: User | null): boolean => {
    return userUtils.isAuthenticated(user)
  },

  /**
   * Guard: Usuario debe ser admin
   * Retorna true si el usuario es admin
   */
  requireAdmin: (user: User | null): boolean => {
    return userUtils.isAuthenticated(user) && userUtils.isAdmin(user)
  },

  /**
   * Guard: Usuario debe estar NO autenticado
   * Retorna true si el usuario NO está autenticado
   * Útil para rutas de login/register que no deberían ser accesibles si ya estás logueado
   */
  requireGuest: (user: User | null): boolean => {
    return !userUtils.isAuthenticated(user)
  },

  /**
   * Guard: Usuario es dueño del recurso
   * Compara el userId del usuario con el del recurso
   */
  isOwner: (user: User | null, resourceUserId: string): boolean => {
    return userUtils.isAuthenticated(user) && user!.id === resourceUserId
  },

  /**
   * Guard: Usuario es dueño O es admin
   * Permite acceso si eres el dueño del recurso o si eres admin
   */
  isOwnerOrAdmin: (user: User | null, resourceUserId: string): boolean => {
    return authGuards.isOwner(user, resourceUserId) || authGuards.requireAdmin(user)
  },
}

/**
 * ===== PERMISSION CHECKS =====
 */

export const permissions = {
  /**
   * Puede el usuario crear un recurso
   */
  canCreate: (user: User | null): boolean => {
    return authGuards.requireAuth(user)
  },

  /**
   * Puede el usuario leer un recurso
   */
  canRead: (user: User | null, resourceUserId?: string): boolean => {
    if (!resourceUserId) return authGuards.requireAuth(user)
    return authGuards.isOwnerOrAdmin(user, resourceUserId)
  },

  /**
   * Puede el usuario actualizar un recurso
   */
  canUpdate: (user: User | null, resourceUserId?: string): boolean => {
    if (!resourceUserId) return authGuards.requireAuth(user)
    return authGuards.isOwnerOrAdmin(user, resourceUserId)
  },

  /**
   * Puede el usuario eliminar un recurso
   */
  canDelete: (user: User | null, resourceUserId?: string): boolean => {
    if (!resourceUserId) return authGuards.requireAdmin(user)
    return authGuards.isOwnerOrAdmin(user, resourceUserId)
  },

  /**
   * Puede el usuario acceder a panel de admin
   */
  canAccessAdmin: (user: User | null): boolean => {
    return authGuards.requireAdmin(user)
  },
}

/**
 * ===== LOGOUT GLOBAL =====
 */

export const logout = () => {
  tokenUtils.removeToken()
  userUtils.removeUser()
  // Limpiar otros datos de sesión si es necesario
}

/**
 * ===== CLEAR ALL AUTH DATA =====
 */

export const clearAllAuthData = () => {
  logout()
  // Aquí se pueden agregar más limpiezas si es necesario
}
