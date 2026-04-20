import { useCallback, useEffect, useState } from 'react'
import { useUserStore } from '@store/userStore'
import { authMiddleware, authGuards, permissions } from '@utils'
import type { User } from '@types'

/**
 * useUser Hook
 * Acceso a autenticación y permisos del usuario
 * 
 * Usa userStore (Zustand) y authMiddleware para mantener estado sincronizado
 */
export const useUser = () => {
  const store = useUserStore()
  const [localUser, setLocalUser] = useState<User | null>(null)

  // Sincronizar con authMiddleware al montar
  useEffect(() => {
    const currentUser = authMiddleware.getCurrentUser()
    setLocalUser(currentUser)

    // Subscribirse a cambios de auth
    const unsubscribe = authMiddleware.subscribe((user: User | null) => {
      setLocalUser(user)
    })

    return unsubscribe
  }, [])

  const login = useCallback(
    async (email: string, password: string) => {
      try {
        await store.login(email, password)
        const user = store.user
        if (user) {
          // Notificar al middleware
          authMiddleware.onLogin(user, 'mock-token')
        }
        return true
      } catch (error) {
        console.error('Login failed:', error)
        return false
      }
    },
    [store]
  )

  const register = useCallback(
    async (email: string, password: string, name: string) => {
      try {
        await store.register(email, password, name)
        const user = store.user
        if (user) {
          // Notificar al middleware
          authMiddleware.onLogin(user, 'mock-token')
        }
        return true
      } catch (error) {
        console.error('Registration failed:', error)
        return false
      }
    },
    [store]
  )

  const logout = useCallback(() => {
    store.logout()
    authMiddleware.onLogout()
  }, [store])

  const updateProfile = useCallback(
    (profile: any) => {
      store.updateProfile(profile)
      const updated = store.user
      if (updated) {
        authMiddleware.onUpdateProfile(updated)
      }
    },
    [store]
  )

  // Métodos de autenticación
  const isAuthenticated = authGuards.requireAuth(localUser || store.user)
  const isAdmin = store.user?.role === 'admin'
  const canCreateResource = permissions.canCreate(store.user || null)
  const canDeleteResource = permissions.canDelete(store.user || null)

  return {
    // Estado
    user: store.user,
    localUser, // Usuario del authMiddleware para más sincronización
    isLoading: store.isLoading,
    error: store.error,

    // Autenticación
    isAuthenticated,
    isAdmin,

    // Permisos
    canCreateResource,
    canDeleteResource,

    // Métodos
    login,
    register,
    logout,
    updateProfile,

    // Guards adicionales
    canRead: (resourceUserId?: string) => permissions.canRead(store.user || null, resourceUserId),
    canUpdate: (resourceUserId?: string) => permissions.canUpdate(store.user || null, resourceUserId),
  }
}
