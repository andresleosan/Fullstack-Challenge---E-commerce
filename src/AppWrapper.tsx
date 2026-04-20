/**
 * App Wrapper Component
 * Handles Firebase initialization and auth state synchronization
 */

import { useEffect, useState } from 'react'
import { User as FirebaseUser } from 'firebase/auth'
import { authService } from '@services'
import { useUserStore } from '@store/userStore'
import { authMiddleware, tokenUtils } from '@utils'

interface AppWrapperProps {
  children: React.ReactNode
}

/**
 * AppWrapper Component
 * - Initialize Firebase auth listener on mount
 * - Sync auth state to Zustand store
 * - Handle token refresh
 */
function AppWrapper({ children }: AppWrapperProps) {
  const { setUser, clearUser } = useUserStore()
  const [isInitialized, setIsInitialized] = useState(false)

  useEffect(() => {
    // Setup auth state listener
    const unsubscribe = authService.onAuthStateChanged(async (firebaseUser: FirebaseUser | null) => {
      try {
        if (firebaseUser) {
          // User is logged in
          const token = await firebaseUser.getIdToken()
          tokenUtils.saveToken(token)

          // Create app user object
          const appUser = {
            id: firebaseUser.uid,
            email: firebaseUser.email || '',
            name: firebaseUser.displayName || 'User',
            role: 'customer' as const,
            createdAt: firebaseUser.metadata?.creationTime || new Date().toISOString(),
          }

          // Sync to Zustand store
          setUser(appUser)

          // Notify middleware
          authMiddleware.onLogin(appUser, token)

          // Setup token refresh interval (refresh token every 50 minutes)
          const tokenRefreshInterval = setInterval(async () => {
            try {
              await authService.refreshToken()
            } catch (error) {
              console.error('Token refresh failed:', error)
            }
          }, 50 * 60 * 1000)

          // Cleanup interval on unmount
          return () => clearInterval(tokenRefreshInterval)
        } else {
          // User is logged out
          tokenUtils.removeToken()
          clearUser()
          authMiddleware.onLogout()
        }
      } catch (error) {
        console.error('Auth state change error:', error)
      } finally {
        setIsInitialized(true)
      }
    })

    // Cleanup listener on unmount
    return () => unsubscribe()
  }, [setUser, clearUser])

  // Don't render anything until Firebase is initialized
  if (!isInitialized) {
    return (
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        backgroundColor: 'var(--background-primary, #1a1a1a)',
        color: 'var(--text-primary, #ffffff)',
      }}>
        <div style={{ textAlign: 'center' }}>
          <p>Cargando aplicación...</p>
        </div>
      </div>
    )
  }

  return <>{children}</>
}

export default AppWrapper
