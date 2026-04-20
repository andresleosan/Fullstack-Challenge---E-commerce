# 🔐 Auth & Validation API Reference

**Subfase 2.7: Auth Utilities & Middleware Documentation**

---

## 📦 Auth Utilities (`src/utils/auth.ts`)

### Token Management

```typescript
import { tokenUtils } from "@utils/auth";

// Save token
tokenUtils.saveToken("eyJhbGc...");

// Get token
const token = tokenUtils.getToken();

// Remove token (on logout)
tokenUtils.removeToken();

// Check if token exists
if (tokenUtils.hasToken()) {
  // User has valid token
}
```

### User Management

```typescript
import { userUtils } from "@utils/auth";

// Save user
userUtils.saveUser(user);

// Get user
const user = userUtils.getUser();

// Remove user
userUtils.removeUser();

// Check if user is admin
if (userUtils.isAdmin(user)) {
  // Show admin panel
}

// Check if user is authenticated
if (userUtils.isAuthenticated(user)) {
  // Show protected content
}
```

### Auth Guards

```typescript
import { authGuards } from "@utils/auth";

// Check authentication
if (authGuards.requireAuth(user)) {
  // Proceed with protected action
}

// Check admin role
if (authGuards.requireAdmin(user)) {
  // Show admin features
}

// Check if not authenticated (for login/register pages)
if (authGuards.requireGuest(user)) {
  // Redirect to dashboard
}

// Check ownership
if (authGuards.isOwner(user, resourceUserId)) {
  // Allow edit/delete
}

// Check ownership or admin
if (authGuards.isOwnerOrAdmin(user, resourceUserId)) {
  // Allow edit/delete for owner or admin
}
```

### Permissions

```typescript
import { permissions } from "@utils/auth";

// Can user create?
if (permissions.canCreate(user)) {
  // Show create button
}

// Can user read?
if (permissions.canRead(user, resourceUserId)) {
  // Show content
}

// Can user update?
if (permissions.canUpdate(user, resourceUserId)) {
  // Show edit button
}

// Can user delete?
if (permissions.canDelete(user, resourceUserId)) {
  // Show delete button
}

// Can user access admin?
if (permissions.canAccessAdmin(user)) {
  // Show admin panel
}
```

### Logout Global

```typescript
import { logout, clearAllAuthData } from "@utils/auth";

// Simple logout (clear tokens + users)
logout();

// Complete cleanup (with additional data)
clearAllAuthData();
```

---

## 🔗 Auth Middleware (`src/utils/authMiddleware.ts`)

### Singleton Pattern

```typescript
import { authMiddleware } from "@utils/authMiddleware";

// Get current user from storage
const user = authMiddleware.getCurrentUser();

// Get current token
const token = authMiddleware.getCurrentToken();

// Check if session is active
if (authMiddleware.isSessionActive()) {
  // User is logged in
}
```

### Event Handlers

```typescript
import { authMiddleware } from "@utils/authMiddleware";

// On login
authMiddleware.onLogin(user, token);

// On logout
authMiddleware.onLogout();

// On profile update
authMiddleware.onUpdateProfile(updatedUser);

// On token expired
authMiddleware.onTokenExpired();
```

### Global Subscriptions

```typescript
import { authMiddleware } from "@utils/authMiddleware";

// Subscribe to auth changes (anywhere in app)
const unsubscribe = authMiddleware.subscribe((user) => {
  if (user) {
    console.log("User logged in:", user.id);
  } else {
    console.log("User logged out");
  }
});

// Unsubscribe when done
unsubscribe();
```

### React Hook for Auth State Changes

```typescript
import { useAuthStateChange } from "@utils/authMiddleware";

useEffect(() => {
  // Called when auth state changes globally
  const unsubscribe = useAuthStateChange((user) => {
    if (user) {
      setUserName(user.name);
    }
  });

  return unsubscribe;
}, []);
```

### Event Listeners

```typescript
import {
  setupAuthEventListeners,
  cleanupAuthEventListeners,
} from "@utils/authMiddleware";

// Setup (typically in App.tsx mount)
useEffect(() => {
  setupAuthEventListeners();
  return cleanupAuthEventListeners;
}, []);

// Listen for token expiration in window
window.addEventListener("auth:token-expired", (event: any) => {
  toast.error(event.detail.message);
  navigate("/login");
});
```

---

## 📝 Validators (`src/utils/validators.ts`)

### Single Field Validators

```typescript
import { validators } from "@utils/validators";

// All return either string (error message) or true (valid)

// Email
const emailError = validators.email("user@example.com");
if (emailError !== true) console.error(emailError);

// Password
const passError = validators.password("MyPassword123");

// Password match
const matchError = validators.passwordMatch("pass1", "pass2");

// Name
const nameError = validators.name("John Doe");

// Address fields
validators.address("123 Main St");
validators.city("New York");
validators.state("NY");
validators.zipCode("10001");
validators.phone("555-123-4567");

// Card validation
validators.cardNumber("4111 1111 1111 1111");
validators.expiryDate("12/25");
validators.cvv("123");

// Quantity, search
validators.quantity(5, 100); // max 100
validators.searchQuery("laptop");
```

### Batch Validators

```typescript
import {
  validateLoginForm,
  validateRegisterForm,
  validateCheckoutForm,
} from "@utils/validators";

// Login form
const loginErrors = validateLoginForm(email, password);
if (loginErrors.email) setEmailError(loginErrors.email);
if (loginErrors.password) setPasswordError(loginErrors.password);

// Register form
const registerErrors = validateRegisterForm(
  name,
  email,
  password,
  confirmPassword,
  terms,
);

// Checkout form
const checkoutErrors = validateCheckoutForm({
  email: "user@example.com",
  firstName: "John",
  lastName: "Doe",
  address: "123 Main St",
  city: "NY",
  state: "NY",
  zipCode: "10001",
  cardNumber: "4111111111111111",
  expiryDate: "12/25",
  cvv: "123",
});

if (Object.keys(checkoutErrors).length === 0) {
  // Form is valid, submit
}
```

---

## 🎣 useUser Hook

```typescript
import { useUser } from '@hooks/useUser'

const {
  // State
  user,           // Current user object
  isLoading,      // Loading state
  error,          // Error message

  // Auth state
  isAuthenticated, // Boolean: user is logged in
  isAdmin,         // Boolean: user is admin

  // Permissions
  canCreateResource, // Boolean: can create
  canDeleteResource, // Boolean: can delete
  canRead,          // (resourceUserId?: string) => boolean
  canUpdate,        // (resourceUserId?: string) => boolean

  // Methods
  login,           // (email, password) => Promise<boolean>
  register,        // (email, password, name) => Promise<boolean>
  logout,          // () => void
  updateProfile,   // (profile) => void
} = useUser()

// Usage
if (isAuthenticated) {
  return <Dashboard user={user} />
}

if (canUpdate(orderId)) {
  return <EditButton onClick={handleEdit} />
}
```

---

## 🛡️ ProtectedRoute Component

```typescript
import { ProtectedRoute } from '@components/common'

// Basic protected route (requires authentication)
<Route
  path="/profile"
  element={
    <ProtectedRoute>
      <ProfilePage />
    </ProtectedRoute>
  }
/>

// Admin-only route
<Route
  path="/admin"
  element={
    <ProtectedRoute requiredRole="admin">
      <AdminPage />
    </ProtectedRoute>
  }
/>

// Custom fallback (default is /login)
<Route
  path="/checkout"
  element={
    <ProtectedRoute fallback="/account/login">
      <CheckoutPage />
    </ProtectedRoute>
  }
/>
```

---

## 📋 Form Helpers (`src/utils/formHelpers.ts`)

### FormHelper Class

```typescript
import { FormHelper } from "@utils/formHelpers";
import { validators } from "@utils/validators";

// Create form helper
const form = new FormHelper(
  { email: "", password: "" },
  {
    email: (value) => validators.email(value),
    password: (value) => validators.password(value),
  },
);

// Set field value
form.setFieldValue("email", "user@example.com");

// Mark field as touched
form.setFieldTouched("email");

// Validate single field
const isFieldValid = form.validateField("email");

// Validate entire form
const isFormValid = form.validateForm();

// Get field error (if touched)
const error = form.getFieldError("email");

// Reset form
form.reset();

// Get complete form state
const state = form.getState();
```

### Formatting Helpers

```typescript
import {
  formatPhoneNumber,
  formatCardNumber,
  formatExpiryDate,
} from "@utils/formHelpers";

// Format phone: (555) 123-4567
const phone = formatPhoneNumber("5551234567");

// Format card: 1234 5678 9012 3456
const card = formatCardNumber("1234567890123456");

// Format expiry: 12/25
const expiry = formatExpiryDate("1225");
```

### Input Handlers

```typescript
import { onlyNumbers, sanitizeInput, debounceValidation } from '@utils/formHelpers'

// Prevent non-numeric input
<input onKeyDown={onlyNumbers} />

// Sanitize input (prevent XSS)
const safe = sanitizeInput(userInput)

// Debounce validation
const debouncedValidate = debounceValidation(() => {
  form.validateField('email')
}, 300)
```

---

## 🔒 Security Best Practices

✅ **DO:**

- Use `authGuards` before accessing protected data
- Validate form data with batch validators
- Use `ProtectedRoute` for all sensitive pages
- Check permissions with `canRead()`, `canUpdate()`, etc
- Clear auth data on logout with `logout()`

❌ **DON'T:**

- Store sensitive data in localStorage unencrypted
- Trust client-side validation alone
- Skip ProtectedRoute on member-only pages
- Use `allow read, write: if true` Firebase rules
- Hardcode API keys in frontend

---

## 📚 Integration Checklist

- [ ] Import auth utilities where needed
- [ ] Add validators to all forms
- [ ] Wrap protected pages with ProtectedRoute
- [ ] Use useUser hook in components needing auth state
- [ ] Setup auth event listeners in App.tsx
- [ ] Test permission checks before deploying
- [ ] Verify Firebase Security Rules match permissions

---

_Complete auth system ready for Phase 3 Firebase integration!_
