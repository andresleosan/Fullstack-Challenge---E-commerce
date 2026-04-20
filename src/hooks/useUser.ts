import { useCallback } from 'react'
import { useUserStore } from '@store/userStore'

export const useUser = () => {
  const store = useUserStore()

  const login = useCallback(
    async (email: string, password: string) => {
      try {
        await store.login(email, password)
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
  }, [store])

  const updateProfile = useCallback(
    (profile: any) => {
      store.updateProfile(profile)
    },
    [store]
  )

  return {
    user: store.user,
    isLoading: store.isLoading,
    error: store.error,
    isAuthenticated: store.isAuthenticated(),
    login,
    register,
    logout,
    updateProfile,
  }
}
