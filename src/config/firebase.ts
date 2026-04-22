/**
 * Firebase Configuration
 * Initialize Firebase with project credentials
 */

import { initializeApp } from 'firebase/app'
import {
  getAuth,
  connectAuthEmulator,
  Auth,
} from 'firebase/auth'
import {
  getFirestore,
  connectFirestoreEmulator,
  Firestore,
} from 'firebase/firestore'
import {
  getStorage,
  connectStorageEmulator,
  FirebaseStorage,
} from 'firebase/storage'

// ============================================
// 🔒 SECURITY: Firebase config from environment variables
// ============================================
// ❌ CRITICAL: Never hardcode Firebase credentials
// ✅ REQUIRED: Set all environment variables in .env
// See: .env.example for required variables
// ============================================

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
}

// ✅ Validate that all required variables are set
const requiredEnvVars = [
  'VITE_FIREBASE_API_KEY',
  'VITE_FIREBASE_AUTH_DOMAIN',
  'VITE_FIREBASE_PROJECT_ID',
  'VITE_FIREBASE_STORAGE_BUCKET',
  'VITE_FIREBASE_MESSAGING_SENDER_ID',
  'VITE_FIREBASE_APP_ID',
]

for (const envVar of requiredEnvVars) {
  if (!import.meta.env[envVar]) {
    console.error(`❌ CRITICAL: Missing environment variable: ${envVar}`)
    console.error('Please configure your .env file. See .env.example for reference.')
    throw new Error(
      `Missing required Firebase environment variable: ${envVar}. Check your .env file.`
    )
  }
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)

// Initialize Auth
export const auth: Auth = getAuth(app)

// Initialize Firestore
export const db: Firestore = getFirestore(app)

// Initialize Storage
export const storage: FirebaseStorage = getStorage(app)

// Setup emulators in development (optional)
if ((import.meta as any).env.DEV && typeof window !== 'undefined') {
  try {
    // Auth Emulator
    if (!auth.emulatorConfig) {
      connectAuthEmulator(auth, 'http://localhost:9099', { disableWarnings: true })
    }

    // Firestore Emulator - Check if not already initialized
    try {
      connectFirestoreEmulator(db, 'localhost', 8080)
    } catch (error) {
      // Already initialized or not running
    }

    // Storage Emulator
    try {
      connectStorageEmulator(storage, 'localhost', 9199)
    } catch (error) {
      // Already initialized or not running
    }

    console.log('🔥 Firebase emulators enabled (development mode)')
  } catch (error) {
    console.log('Firebase running in production mode')
  }
}

export default app
