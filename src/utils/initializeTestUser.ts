/**
 * Initialize Test User Utility
 * Creates demo account automatically for development
 * 
 * Credentials:
 * Email: demo@example.com
 * Password: demo123
 */

import { authService } from '@services'

const TEST_USER = {
  email: 'demo@example.com',
  password: 'demo123',
  displayName: 'Demo User',
}

/**
 * Initialize test user on app startup
 * Only runs in development mode
 * Safe to call multiple times - idempotent
 */
export async function initializeTestUser(): Promise<void> {
  // Only in development
  if (import.meta.env.MODE !== 'development') {
    return
  }

  try {
    // Check if user already exists by trying to sign in
    try {
      await authService.login(TEST_USER.email, TEST_USER.password)
      console.log('✅ Test user already exists')
      return
    } catch (loginError: any) {
      // User doesn't exist, create it
      if (loginError.code === 'auth/user-not-found' || loginError.code === 'auth/invalid-credential') {
        console.log('📝 Creating test user...')
        await authService.register(
          TEST_USER.email,
          TEST_USER.password,
          TEST_USER.displayName
        )
        console.log('✅ Test user created successfully')
        console.log(`📧 Email: ${TEST_USER.email}`)
        console.log(`🔐 Password: ${TEST_USER.password}`)
        return
      }
      // Other error
      throw loginError
    }
  } catch (error: any) {
    console.warn('⚠️ Could not initialize test user:', error.message)
    // Don't block app if test user creation fails
  }
}
