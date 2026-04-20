# Phase 3.2: Auth Pages Integration Guide

## Overview

Connect the Login and Register pages to Firebase authentication using the new `authService`.

---

## Step 1: Update LoginPage

**File:** `src/pages/Login.tsx`

### Current State

```typescript
const handleLogin = async (formData: LoginFormData) => {
  // Currently uses useUser hook with mock auth
};
```

### Updated Implementation

```typescript
import { useNavigate } from 'react-router-dom'
import { useUser } from '@hooks/useUser'
import { useState } from 'react'
import type { FormEvent } from 'react'

export function LoginPage() {
  const navigate = useNavigate()
  const { login } = useUser()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)

    const formData = new FormData(e.currentTarget)
    const email = formData.get('email') as string
    const password = formData.get('password') as string

    try {
      await login(email, password)
      navigate('/') // Redirect to home on success
    } catch (err: any) {
      setError(err.message || 'Login failed')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="email"
        name="email"
        required
        placeholder="Email"
      />
      <input
        type="password"
        name="password"
        required
        placeholder="Password"
      />
      {error && <div className="error-message">{error}</div>}
      <button type="submit" disabled={isLoading}>
        {isLoading ? 'Signing in...' : 'Sign In'}
      </button>
    </form>
  )
}
```

### Key Changes

- Import `useNavigate` from React Router
- Use `useUser().login()` which now calls Firebase
- Add loading state for better UX
- Display error messages from Firebase
- Redirect on successful login

---

## Step 2: Update RegisterPage

**File:** `src/pages/Register.tsx`

### Current State

```typescript
const handleRegister = async (formData: RegisterFormData) => {
  // Currently uses useUser hook with mock auth
};
```

### Updated Implementation

```typescript
import { useNavigate, Link } from 'react-router-dom'
import { useUser } from '@hooks/useUser'
import { useState } from 'react'
import type { FormEvent } from 'react'

export function RegisterPage() {
  const navigate = useNavigate()
  const { register } = useUser()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)

    const formData = new FormData(e.currentTarget)
    const email = formData.get('email') as string
    const password = formData.get('password') as string
    const name = formData.get('name') as string
    const confirmPassword = formData.get('confirmPassword') as string

    // Client-side validation
    if (password !== confirmPassword) {
      setError('Passwords do not match')
      setIsLoading(false)
      return
    }

    try {
      await register(email, password, name)
      navigate('/') // Redirect to home on success
    } catch (err: any) {
      setError(err.message || 'Registration failed')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="name"
        required
        placeholder="Full Name"
      />
      <input
        type="email"
        name="email"
        required
        placeholder="Email"
      />
      <input
        type="password"
        name="password"
        required
        placeholder="Password"
      />
      <input
        type="password"
        name="confirmPassword"
        required
        placeholder="Confirm Password"
      />
      {error && <div className="error-message">{error}</div>}
      <button type="submit" disabled={isLoading}>
        {isLoading ? 'Creating account...' : 'Sign Up'}
      </button>
      <p>
        Already have an account? <Link to="/login">Sign in</Link>
      </p>
    </form>
  )
}
```

### Key Changes

- Import `useNavigate` and `Link` from React Router
- Use `useUser().register()` which now calls Firebase
- Add password confirmation validation
- Add loading state
- Display error messages
- Redirect on successful registration
- Add link to login page

---

## Step 3: Add Logout Button

**File:** `src/components/organisms/Header.tsx`

### Find the logout handler

```typescript
// Add this to useUser hook usage
const { logout, user, isAuthenticated } = useUser()

// Add logout button in JSX
{isAuthenticated && (
  <button onClick={handleLogout} className="logout-btn">
    Logout
  </button>
)}

// Logout handler
const handleLogout = async () => {
  try {
    await logout()
    navigate('/') // Redirect to home
  } catch (error) {
    console.error('Logout failed:', error)
  }
}
```

---

## Step 4: Handle Auth Persistence

**Automatic via AppWrapper**
The AppWrapper component already handles:

- Auth state persistence (Firebase manages it)
- Token refresh (every 50 minutes)
- Automatic sync to store on page reload

No additional changes needed!

---

## Step 5: Test the Flow

### Testing Checklist

- [ ] Register new account → should see success message
- [ ] Navigate to home (should be logged in)
- [ ] Refresh page → stay logged in (AppWrapper restores)
- [ ] Try invalid password → see error
- [ ] Try duplicate email → see error
- [ ] Click logout → go to home (not logged in)
- [ ] Try accessing protected route → redirected to login

### Test Users

For testing, use:

- Email: `test@example.com`
- Password: Any 6+ char password

---

## Step 6: Error Handling Reference

**Firebase Error Codes Returned:**

| Code                          | Message       | User Message                                     |
| ----------------------------- | ------------- | ------------------------------------------------ |
| `auth/email-already-in-use`   | Email taken   | "Este email ya está registrado"                  |
| `auth/invalid-email`          | Bad format    | "Email inválido"                                 |
| `auth/weak-password`          | <6 chars      | "La contraseña debe tener al menos 6 caracteres" |
| `auth/user-not-found`         | No account    | "Usuario no encontrado"                          |
| `auth/wrong-password`         | Bad password  | "Contraseña incorrecta"                          |
| `auth/too-many-requests`      | Rate limit    | "Demasiados intentos. Intenta más tarde"         |
| `auth/network-request-failed` | Network error | "Error de red. Verifica tu conexión"             |

---

## Step 7: Styling Recommendations

Add to your CSS:

```css
/* Loading state */
.button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

/* Error messages */
.error-message {
  color: #ff4444;
  padding: 12px;
  margin-bottom: 16px;
  border-radius: 4px;
  background-color: rgba(255, 68, 68, 0.1);
}

/* Form feedback */
input:invalid {
  border-color: #ff4444;
}

input:valid {
  border-color: #44ff44;
}
```

---

## Step 8: Protected Routes Enhancement

Update `ProtectedRoute` to use Firebase:

```typescript
// src/components/common/ProtectedRoute.tsx
import { Navigate } from 'react-router-dom'
import { useUser } from '@hooks/useUser'

export function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useUser()

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />
  }

  return <>{children}</>
}
```

---

## Phase 3.2 Completion Checklist

- [ ] Update `LoginPage` component
- [ ] Update `RegisterPage` component
- [ ] Add logout button to Header
- [ ] Add error handling for Firebase errors
- [ ] Test registration flow
- [ ] Test login flow
- [ ] Test logout flow
- [ ] Test protected route access
- [ ] Test password requirements
- [ ] Test email validation
- [ ] Run `npm run build` ✅ no errors
- [ ] Update PHASE_3_2_STATUS.md

---

## Troubleshooting

### Issue: "firebase is not initialized"

- **Solution:** Make sure `main.tsx` imports `@config/firebase` BEFORE AppWrapper

### Issue: "AppWrapper shows loading forever"

- **Solution:** Check browser DevTools → Network → see if Firebase is loading
- **Optional:** Connect to Firebase Emulator for local testing

### Issue: "Login works but not persisted on refresh"

- **Solution:** This is actually AppWrapper doing its job! It waits for Firebase to restore state
- **Check:** Should see "Cargando aplicación..." briefly, then logged-in state appears

### Issue: "Store doesn't update after login"

- **Solution:** AppWrapper has `setUser` → make sure userStore has this method (already added)

---

## Next Phase (3.3)

After completing phase 3.2:

1. Load actual products from Firestore
2. Implement cart persistence
3. Create orders with Firebase
4. Display user's past orders

See `docs/PHASE_3_3_GUIDE.md` for details.

---

**Created:** 2024-04-20  
**Status:** 📋 Ready for implementation  
**Estimated Time:** 30-45 minutes
