# ⚡ Quick Reference - Firebase Security Rules Deployment

**Quick Deploy Guide**  
**Tiempo estimado:** 15-30 minutos  
**Checklist items:** 7

---

## 📋 Pre-Deployment Verification

```bash
# 1. Validar sintaxis de reglas
firebase validate

# 2. Verificar que archivos existen
ls -la firestore.rules storage.rules

# 3. Ver cambios que se deployan
firebase deploy --only firestore:rules,storage --dry-run
```

---

## 🚀 Deployment Steps

### Step 1: Configure Firebase Project

```bash
# Login
firebase login

# Select/create project
firebase use --add

# Initialize if needed
firebase init firestore
firebase init storage
```

### Step 2: Deploy Rules

```bash
# Deploy ONLY Rules (no code changes)
firebase deploy --only firestore:rules

# Deploy Storage Rules
firebase deploy --only storage
```

### Step 3: Verify in Console

Navigate to:

1. Firebase Console → Your Project
2. Firestore → **Rules tab** → Ver cambios
3. Storage → **Rules tab** → Ver cambios
4. Debe mostrar fecha/hora actual de deployment

### Step 4: Quick Smoke Test

```bash
# Start emulator
firebase emulators:start

# Test (en otra terminal)
npm test

# Debe pasar los 20+ test cases
```

---

## 🧪 Essential Test Commands

```bash
# Test single case
npm test -- --testNamePattern="User can read own profile"

# Test all Firestore
npm test -- --testNamePattern="Firestore"

# Test all Storage
npm test -- --testNamePattern="Storage"

# Test with coverage
npm test -- --coverage
```

---

## 🔍 Monitoring Post-Deploy

```bash
# View Firestore logs (real-time)
firebase functions:log --follow

# View specific errors
firebase functions:log | grep -i "permission denied"

# Watch for anomalies
firebase functions:log | grep -i "error\|denied"
```

---

## ⚠️ Critical Rules by Collection

### NEVER Deploy If:

- [ ] Any rule has `if true` globally
- [ ] Any `allow read, write: if true` without specific path
- [ ] `/payments/{id}` NOT blocked with `if false`
- [ ] `/internal/{**}` NOT blocked with `if false`
- [ ] Service keys in storage/firestore.rules
- [ ] CORS set to `*`

### ALWAYS Verify:

- [ ] `request.auth.uid` validates ownership
- [ ] `request.auth.token.admin` checks admin role
- [ ] `request.time` used for timestamps
- [ ] Validation functions defined and used
- [ ] Catch-all `match /{document=**}` with `if false` at end
- [ ] All collections have explicit rules

---

## 📊 Expected Behavior After Deploy

### ✅ Should Work

```typescript
// User reads own profile
const user = firebase.auth().currentUser; // logged in
const profile = await db.collection('users').doc(user.uid).get();
// SUCCESS ✅

// Anybody reads products
const products = await db.collection('products').get();
// SUCCESS ✅

// Admin creates product
const admin = await firebase.auth().signInWithCustomToken(adminToken);
await db.collection('products').doc('prod1').set({ ... });
// SUCCESS ✅
```

### ❌ Should FAIL

```typescript
// User reads another's profile
await db.collection('users').doc('other-uid').get();
// Permission Denied ❌

// Non-admin creates product
const user = await firebase.auth().signInWithCustomToken(userToken);
await db.collection('products').doc('prod1').set({ ... });
// Permission Denied ❌

// Anyone reads payment data
await db.collection('payments').doc('any-id').get();
// Permission Denied ❌
```

---

## 🚨 Rollback If Issues

```bash
# See deployment history
firebase functions:list

# Revert to previous rules
git checkout firestore.rules storage.rules

# Redeploy
firebase deploy --only firestore:rules,storage

# Verify reverted
firebase console  # Check Rules tab
```

---

## 📝 Documentation Files

| File                      | Purpose          | Lines |
| ------------------------- | ---------------- | ----- |
| SECURITY_RULES.md         | Complete guide   | 450+  |
| TESTING_SECURITY_RULES.md | Test procedures  | 350+  |
| firestore.rules           | Production rules | 300+  |
| storage.rules             | Storage rules    | 200+  |

**Total:** 1,300+ lines of security code

---

## 🎯 Success Criteria

After deployment:

- ✅ Firebase Console shows updated Rules
- ✅ All 20+ test cases pass
- ✅ Zero Permission Denied errors in app
- ✅ Admin can modify products/orders
- ✅ Users cannot read other profiles
- ✅ Payments data inaccessible from client
- ✅ Storage validates file types & sizes

---

## 📞 Troubleshooting

### "Rules have errors"

→ Check syntax: `firebase validate`

### "Permission Denied on all reads"

→ Check `request.auth != null` - might be too strict

### "User can read all profiles"

→ Check ownership validation: `request.auth.uid == userId`

### "Admin cannot write"

→ Check admin token: `request.auth.token.admin == true`

### "Storage uploads too slow"

→ Check file size limits, might be too large

---

**Deploy when ready. First-time setup: 30 min. Subsequent: 5 min.**

```bash
firebase deploy --only firestore:rules,storage
# ✅ Done!
```
