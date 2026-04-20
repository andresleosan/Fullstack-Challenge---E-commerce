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

// Firebase config from environment variables
const firebaseConfig = {
  apiKey: (import.meta as any).env.VITE_FIREBASE_API_KEY || "AIzaSyAEsiJaTHkmo8H1xaDRJLYbxpu6E3fxEFQ",
  authDomain: (import.meta as any).env.VITE_FIREBASE_AUTH_DOMAIN || "fullstack-challenge-e-commerce.firebaseapp.com",
  projectId: (import.meta as any).env.VITE_FIREBASE_PROJECT_ID || "fullstack-challenge-e-commerce",
  storageBucket: (import.meta as any).env.VITE_FIREBASE_STORAGE_BUCKET || "fullstack-challenge-e-commerce.firebasestorage.app",
  messagingSenderId: (import.meta as any).env.VITE_FIREBASE_MESSAGING_SENDER_ID || "67750929783",
  appId: (import.meta as any).env.VITE_FIREBASE_APP_ID || "1:67750929783:web:bca65aa1bfdc5e4e22ed72",
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
