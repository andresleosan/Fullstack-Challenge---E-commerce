/**
 * Error Handler Utility
 * Standardized error handling across the application
 */

import { ERROR_CODES, ERROR_MESSAGES } from '@config/constants'

export class AppError extends Error {
  constructor(
    public code: string,
    message: string,
    public statusCode: number = 500,
    public details?: any
  ) {
    super(message)
    this.name = 'AppError'
  }
}

export const errorHandler = {
  /**
   * Parse any error into standardized AppError
   */
  parse: (error: any): AppError => {
    if (error instanceof AppError) {
      return error
    }

    // Firebase error
    if (error?.code?.startsWith('auth/')) {
      const message = getFirebaseAuthErrorMessage(error.code)
      return new AppError(error.code, message, 401, error)
    }

    // API/Network error
    if (error?.response) {
      return new AppError(
        'API_ERROR',
        error.response.data?.message || error.message,
        error.response.status,
        error.response.data
      )
    }

    // Network error
    if (error?.message?.includes('timeout') || error?.message?.includes('timeout')) {
      return new AppError(ERROR_CODES.TIMEOUT_ERROR, ERROR_MESSAGES[ERROR_CODES.TIMEOUT_ERROR], 408)
    }

    if (error?.message?.includes('Failed to fetch') || error?.message?.includes('ERR_NETWORK')) {
      return new AppError(ERROR_CODES.NETWORK_ERROR, ERROR_MESSAGES[ERROR_CODES.NETWORK_ERROR], 0)
    }

    // Unknown error
    return new AppError(
      ERROR_CODES.UNKNOWN_ERROR,
      ERROR_MESSAGES[ERROR_CODES.UNKNOWN_ERROR],
      500,
      error
    )
  },

  /**
   * Format error for user display (production-safe)
   */
  format: (error: any, isDevelopment = false): string => {
    const appError = errorHandler.parse(error)

    if (isDevelopment) {
      return `[${appError.code}] ${appError.message}`
    }

    // Never expose internal errors to users
    return ERROR_MESSAGES[appError.code] || ERROR_MESSAGES[ERROR_CODES.UNKNOWN_ERROR]
  },

  /**
   * Log error safely
   */
  log: (error: any, context: string = 'Error'): void => {
    const appError = errorHandler.parse(error)

    console.error(
      `❌ ${context}: [${appError.code}]`,
      {
        message: appError.message,
        statusCode: appError.statusCode,
        details: appError.details,
      }
    )
  },
}

/**
 * Get user-friendly Firebase Auth error messages
 */
function getFirebaseAuthErrorMessage(code: string): string {
  const messages: Record<string, string> = {
    'auth/user-not-found': 'Usuario no encontrado',
    'auth/wrong-password': 'Contraseña incorrecta',
    'auth/invalid-email': 'Email inválido',
    'auth/user-disabled': 'Usuario deshabilitado',
    'auth/operation-not-allowed': 'Operación no permitida',
    'auth/email-already-in-use': 'Email ya está registrado',
    'auth/weak-password': 'Contraseña muy débil',
    'auth/invalid-credential': 'Credenciales inválidas',
    'auth/network-request-failed': 'Error de conexión',
    'auth/too-many-requests': 'Demasiados intentos. Intenta más tarde',
  }

  return messages[code] || 'Error de autenticación'
}
