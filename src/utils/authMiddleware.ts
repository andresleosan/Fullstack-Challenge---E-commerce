/**
 * Auth Middleware - Manejo de eventos de autenticación
 * 
 * Ejecuta acciones globales cuando el usuario se autentica/desautentica
 */

import { tokenUtils, userUtils, clearAllAuthData } from '@utils/auth'
import type { User } from '@types'

/**
 * AuthMiddleware - Gestiona eventos de auth global
 */
class AuthMiddleware {
  private subscribers: Array<(user: User | null) => void> = []

  /**
   * Subscribirse a cambios de autenticación
   */
  subscribe(callback: (user: User | null) => void) {
    this.subscribers.push(callback)
    return () => {
      this.subscribers = this.subscribers.filter((cb) => cb !== callback)
    }
  }

  /**
   * Notificar a todos los subscribers de cambios
   */
  private notifySubscribers(user: User | null) {
    this.subscribers.forEach((callback) => callback(user))
  }

  /**
   * Ejecutar al hacer login
   */
  onLogin(user: User, token: string) {
    userUtils.saveUser(user)
    tokenUtils.saveToken(token)
    this.notifySubscribers(user)

    // Log
    console.log('[AuthMiddleware] User logged in:', user.id)
  }

  /**
   * Ejecutar al hacer logout
   */
  onLogout() {
    clearAllAuthData()
    this.notifySubscribers(null)

    // Log
    console.log('[AuthMiddleware] User logged out')
  }

  /**
   * Ejecutar al actualizar perfil
   */
  onUpdateProfile(user: User) {
    userUtils.saveUser(user)
    this.notifySubscribers(user)

    // Log
    console.log('[AuthMiddleware] User profile updated:', user.id)
  }

  /**
   * Ejecutar al detectar expiración de token
   */
  onTokenExpired() {
    console.warn('[AuthMiddleware] Token expired, clearing auth data')
    clearAllAuthData()
    this.notifySubscribers(null)

    // Aquí podría disparar un evento para redirigir a login
    window.dispatchEvent(
      new CustomEvent('auth:token-expired', {
        detail: { message: 'Tu sesión ha expirado' },
      })
    )
  }

  /**
   * Obtener usuario actual del storage
   */
  getCurrentUser(): User | null {
    return userUtils.getUser()
  }

  /**
   * Obtener token actual del storage
   */
  getCurrentToken(): string | null {
    return tokenUtils.getToken()
  }

  /**
   * Verificar si hay sesión activa
   */
  isSessionActive(): boolean {
    const user = this.getCurrentUser()
    const token = this.getCurrentToken()
    return !!user && !!token
  }
}

// Singleton instance
export const authMiddleware = new AuthMiddleware()

/**
 * Hook para detectar cambios de autenticación globales
 * (Usado en componentes que necesitan reaccionar a cambios de auth)
 */
export const useAuthStateChange = (callback: (user: User | null) => void) => {
  // Ejecutar callback inicial
  const currentUser = authMiddleware.getCurrentUser()
  callback(currentUser)

  // Subscribirse a cambios futuros
  return authMiddleware.subscribe(callback)
}

/**
 * Event listener global para token expirado
 * (Para mostrar notificación o redirigir a login)
 */
export const setupAuthEventListeners = () => {
  window.addEventListener('auth:token-expired', (event: any) => {
    console.warn('Auth event:', event.detail.message)
    // Aquí podrías mostrar un toast o notificación
    // Ejemplo: toast.error(event.detail.message)
  })
}

/**
 * Cleanup de event listeners
 */
export const cleanupAuthEventListeners = () => {
  window.removeEventListener('auth:token-expired', () => {})
}
