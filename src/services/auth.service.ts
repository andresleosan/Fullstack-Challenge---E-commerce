/**
 * Authentication Service
 * Firebase authentication with token management
 */

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  updateProfile,
  User as FirebaseUser,
  Auth,
} from 'firebase/auth'
import { auth } from '@config/firebase'
import { tokenUtils, authMiddleware } from '@utils'
import type { User } from '@types'
/**
 * Auth Service Class
 */
class AuthService {
  private auth: Auth

  constructor(firebaseAuth: Auth) {
    this.auth = firebaseAuth
  }

  /**
   * Create new user account
   */
  async register(email: string, password: string, displayName: string): Promise<User> {
    try {
      // Create Firebase user
      const userCredential = await createUserWithEmailAndPassword(
        this.auth,
        email,
        password
      )

      // Update profile with display name
      await updateProfile(userCredential.user, {
        displayName,
      })

      // Get ID token
      const token = await userCredential.user.getIdToken()
      tokenUtils.saveToken(token)

      // Create app user object
      const appUser: User = {
        id: userCredential.user.uid,
        email,
        name: displayName,
        role: 'customer',
        createdAt: new Date().toISOString(),
      }

      // Notify middleware
      authMiddleware.onLogin(appUser, token)

      return appUser
    } catch (error: unknown) {
      const firebaseError = error instanceof Error && 'code' in error 
        ? { code: (error as any).code, message: (error as any).message }
        : { code: 'UNKNOWN_ERROR', message: 'Error desconocido' }
      console.error('Registration error:', error)
      throw {
        code: firebaseError.code,
        message: this.getErrorMessage(firebaseError.code),
      }
    }
  }

  /**
   * Login user with email and password
   */
  async login(email: string, password: string): Promise<User> {
    try {
      const userCredential = await signInWithEmailAndPassword(
        this.auth,
        email,
        password
      )

      // Get ID token
      const token = await userCredential.user.getIdToken()
      tokenUtils.saveToken(token)

      // Create app user object
      const appUser: User = {
        id: userCredential.user.uid,
        email: userCredential.user.email || '',
        name: userCredential.user.displayName || 'User',
        role: 'customer', // Would come from Firestore in real app
        createdAt: userCredential.user.metadata?.creationTime || new Date().toISOString(),
      }

      // Notify middleware
      authMiddleware.onLogin(appUser, token)

      return appUser
    } catch (error: unknown) {
      const firebaseError = error instanceof Error && 'code' in error 
        ? { code: (error as any).code }
        : { code: 'UNKNOWN_ERROR' }
      console.error('Login error:', error)
      throw {
        code: error.code,
        message: this.getErrorMessage(error.code),
      }
    }
  }

  /**
   * Logout current user
   */
  async logout(): Promise<void> {
    try {
      await signOut(this.auth)
      tokenUtils.removeToken()
      authMiddleware.onLogout()
    } catch (error: unknown) {
      console.error('Logout error:', error)
      throw {
        code: 'LOGOUT_ERROR',
        message: 'Error al cerrar sesión',
      }
    }
  }

  /**
   * Get current user
   */
  getCurrentUser(): FirebaseUser | null {
    return this.auth.currentUser
  }

  /**
   * Setup auth state listener
   */
  onAuthStateChanged(callback: (user: FirebaseUser | null) => void): () => void {
    return onAuthStateChanged(this.auth, callback)
  }

  /**
   * Refresh ID token
   */
  async refreshToken(): Promise<string> {
    if (!this.auth.currentUser) {
      throw {
        code: 'NOT_AUTHENTICATED',
        message: 'User not authenticated',
      }
    }

    try {
      const token = await this.auth.currentUser.getIdToken(true)
      tokenUtils.saveToken(token)
      return token
    } catch (error: unknown) {
      console.error('Token refresh error:', error)
      throw {
        code: 'TOKEN_REFRESH_ERROR',
        message: 'No se pudo renovar el token',
      }
    }
  }

  /**
   * Update user profile
   */
  async updateUserProfile(updates: {
    displayName?: string
    photoURL?: string
  }): Promise<void> {
    if (!this.auth.currentUser) {
      throw {
        code: 'NOT_AUTHENTICATED',
        message: 'User not authenticated',
      }
    }

    try {
      await updateProfile(this.auth.currentUser, updates)

      // Notify middleware if needed
      if (updates.displayName) {
        authMiddleware.onUpdateProfile({
          ...authMiddleware.getCurrentUser()!,
          name: updates.displayName,
        })
      }
    } catch (error: unknown) {
      console.error('Profile update error:', error)
      throw {
        code: 'PROFILE_UPDATE_ERROR',
        message: 'Error al actualizar perfil',
      }
    }
  }

  /**
   * Get error message for Firebase error codes
   */
  private getErrorMessage(code: string): string {
    const messages: Record<string, string> = {
      'auth/email-already-in-use': 'Este email ya está registrado',
      'auth/invalid-email': 'Email inválido',
      'auth/weak-password': 'La contraseña debe tener al menos 6 caracteres',
      'auth/user-not-found': 'Usuario no encontrado',
      'auth/wrong-password': 'Contraseña incorrecta',
      'auth/too-many-requests': 'Demasiados intentos. Intenta más tarde',
      'auth/network-request-failed': 'Error de red. Verifica tu conexión',
    }

    return messages[code] || 'Error de autenticación'
  }
}

// Export singleton instance
export const authService = new AuthService(auth)

export default authService
