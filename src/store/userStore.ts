import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { User } from '@types'

export interface UserStore {
  user: User | null
  isLoading: boolean
  error: string | null
  login: (email: string, password: string) => Promise<void>
  register: (email: string, password: string, name: string) => Promise<void>
  logout: () => void
  updateProfile: (profile: Partial<User>) => void
  checkAuth: () => void
  isAuthenticated: () => boolean
}

// Mock users for demonstration
const mockUsers: Record<string, { password: string; user: User }> = {
  'demo@example.com': {
    password: 'demo123',
    user: {
      id: '1',
      email: 'demo@example.com',
      name: 'Demo User',
      role: 'customer',
      createdAt: new Date(),
    },
  },
}

export const useUserStore = create<UserStore>()(
  persist(
    (set, get) => ({
      user: null,
      isLoading: false,
      error: null,

      login: async (email: string, password: string) => {
        set({ isLoading: true, error: null })

        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 500))

        try {
          const mockData = mockUsers[email.toLowerCase()]

          if (!mockData || mockData.password !== password) {
            throw new Error('Invalid email or password')
          }

          set({
            user: mockData.user,
            isLoading: false,
          })
        } catch (error) {
          set({
            error: error instanceof Error ? error.message : 'Login failed',
            isLoading: false,
          })
          throw error
        }
      },

      register: async (email: string, password: string, name: string) => {
        set({ isLoading: true, error: null })

        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 800))

        try {
          if (mockUsers[email.toLowerCase()]) {
            throw new Error('Email already registered')
          }

          if (password.length < 6) {
            throw new Error('Password must be at least 6 characters')
          }

          const newUser: User = {
            id: Date.now().toString(),
            email,
            name,
            role: 'customer',
            createdAt: new Date(),
          }

          mockUsers[email.toLowerCase()] = {
            password,
            user: newUser,
          }

          set({
            user: newUser,
            isLoading: false,
          })
        } catch (error) {
          set({
            error: error instanceof Error ? error.message : 'Registration failed',
            isLoading: false,
          })
          throw error
        }
      },

      logout: () => {
        set({
          user: null,
          error: null,
        })
      },

      updateProfile: (profile: Partial<User>) => {
        const { user } = get()

        if (!user) return

        const updatedUser: User = {
          ...user,
          ...profile,
        }

        set({ user: updatedUser })
      },

      checkAuth: () => {
        // Check if user is still authenticated (can be extended with token validation)
        const { user } = get()
        if (user) {
          // User is still authenticated
          return
        }
      },

      isAuthenticated: () => {
        return get().user !== null
      },
    }),
    {
      name: 'estore-user',
    }
  )
)
