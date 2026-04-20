import { useCallback } from 'react'
import { useUserStore } from '@store/userStore'
import { authService } from '@services'
import { authGuards, permissions } from '@utils'

/**
 * useUser Hook
 * Firebase-based authentication and authorization management
 * 
 * Features:
 * - Firebase authentication (login/register/logout)
 * - User permissions and role-based access
 * - Token management
 * - Profile updates
 */
export const useUser = () => {
  const store = useUserStore()

  const login = useCallback(
    async (email: string, password: string) => {
      try {
        await authService.login(email, password)
        // AppWrapper will handle syncing to store via authService listener
        return true
      } catch (error: any) {
        console.error('Login failed:', error)
        throw error
      }
    },
    []
  )

  const register = useCallback(
    async (email: string, password: string, name: string) => {
      try {
        await authService.register(email, password, name)
        // AppWrapper will handle syncing to store via authService listener
        return true
      } catch (error: any) {
        console.error('Registration failed:', error)
        throw error
      }
    },
    []
  )

  const logout = useCallback(async () => {
    try {
      await authService.logout()
      // AppWrapper will handle clearing store via authService listener
    } catch (error: any) {
      console.error('Logout failed:', error)
      throw error
    }
  }, [])

  const updateProfile = useCallback(
    async (updates: { displayName?: string; photoURL?: string }) => {
      try {
        await authService.updateUserProfile(updates)
        // If displayName changed, update store
        if (updates.displayName && store.user) {
          store.setUser({ ...store.user, name: updates.displayName })
        }
      } catch (error: any) {
        console.error('Profile update failed:', error)
        throw error
      }
    },
    [store]
  )

  const refreshToken = useCallback(async () => {
    try {
      return await authService.refreshToken()
    } catch (error: any) {
      console.error('Token refresh failed:', error)
      throw error
    }
  }, [])

  // Permission checks
  const isAuthenticated = authGuards.requireAuth(store.user)
  const isAdmin = store.user?.role === 'admin'
  const canCreateResource = permissions.canCreate(store.user || null)
  const canDeleteResource = permissions.canDelete(store.user || null)

  return {
    // State
    user: store.user,
    isLoading: store.isLoading,
    error: store.error,

    // Authentication
    isAuthenticated,
    isAdmin,

    // Permissions
    canCreateResource,
    canDeleteResource,

    // Methods
    login,
    register,
    logout,
    updateProfile,
    refreshToken,

    // Additional guards
    canRead: (resourceUserId?: string) => permissions.canRead(store.user || null, resourceUserId),
    canUpdate: (resourceUserId?: string) => permissions.canUpdate(store.user || null, resourceUserId),
  }
}
