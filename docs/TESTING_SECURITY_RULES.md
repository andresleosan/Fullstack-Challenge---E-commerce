# 🧪 Testing & Validators - Firebase Security Rules

**Para:** Validación pre-deploy de reglas de seguridad  
**Herramientas:** Firebase Emulator Suite, Unit Tests, Rules Simulator  
**Tiempo estimado:** 2-3 horas de testing completo

---

## 1. Setup del Firebase Emulator

### 1.1 Instalación

```bash
# Instalar Firebase CLI si no lo tienes
npm install -g firebase-tools

# En tu proyecto
firebase init emulators

# Seleccionar:
# - Firestore
# - Storage
# - Authentication (opcional)
```

### 1.2 Configuración

```json
{
  "emulators": {
    "firestore": {
      "port": 8080
    },
    "storage": {
      "port": 9199
    },
    "auth": {
      "port": 9099
    },
    "ui": {
      "enabled": true,
      "port": 4000
    }
  }
}
```

### 1.3 Iniciar

```bash
firebase emulators:start

# Luego accede a: http://localhost:4000
```

---

## 2. Test Cases: Usuarios

### Test 2.1: Usuario Lee Su Propio Perfil ✅

**Esperado:** PASS

```typescript
describe("User Profile Rules", () => {
  test("User can read own profile", async () => {
    const userId = "user123";
    const user = await firebase
      .auth()
      .signInWithCustomToken(createCustomToken(userId));

    const db = firebase.firestore();
    const docRef = db.collection("users").doc(userId);

    const snapshot = await docRef.get();
    expect(snapshot.exists).toBe(true);
  });
});
```

### Test 2.2: Usuario NO Lee Perfil de Otro ❌

**Esperado:** FAIL (Permission Denied)

```typescript
test("User cannot read other profile", async () => {
  const userId1 = "user123";
  const userId2 = "user456";

  const user1 = await firebase
    .auth()
    .signInWithCustomToken(createCustomToken(userId1));

  const db = firebase.firestore();
  const docRef = db.collection("users").doc(userId2);

  // Debe fallar con Permission Denied
  await expect(docRef.get()).rejects.toThrow("Permission denied");
});
```

### Test 2.3: Anónimo NO Lee Perfil ❌

**Esperado:** FAIL

```typescript
test("Unauthenticated cannot read profile", async () => {
  const db = firebase.firestore();
  const docRef = db.collection("users").doc("any-user");

  await expect(docRef.get()).rejects.toThrow("Permission denied");
});
```

### Test 2.4: Usuario Actualiza Su Perfil ✅

**Esperado:** PASS

```typescript
test("User can update own profile", async () => {
  const userId = "user123";
  const user = await firebase
    .auth()
    .signInWithCustomToken(createCustomToken(userId));

  const db = firebase.firestore();
  const docRef = db.collection("users").doc(userId);

  await docRef.update({
    name: "New Name",
    phone: "555-1234",
  });

  const snapshot = await docRef.get();
  expect(snapshot.data().name).toBe("New Name");
});
```

### Test 2.5: Usuario NO Puede Cambiar userId ❌

**Esperado:** FAIL (validación de datos)

```typescript
test("User cannot change userId on update", async () => {
  const userId = "user123";
  const user = await firebase
    .auth()
    .signInWithCustomToken(createCustomToken(userId));

  const db = firebase.firestore();
  const docRef = db.collection("users").doc(userId);

  // Intentar cambiar el userId debería fallar
  await expect(docRef.update({ userId: "different-id" })).rejects.toThrow(
    "Permission denied",
  );
});
```

---

## 3. Test Cases: Productos

### Test 3.1: Cualquiera Lee Productos ✅

**Esperado:** PASS

```typescript
test("Anybody can read products", async () => {
  // Sin autenticar
  const db = firebase.firestore();
  const snapshot = await db.collection("products").get();

  expect(snapshot.docs.length).toBeGreaterThan(0);
});
```

### Test 3.2: No-Admin NO Puede Crear Producto ❌

**Esperado:** FAIL

```typescript
test("Non-admin cannot create product", async () => {
  const user = await firebase
    .auth()
    .signInWithCustomToken(createCustomToken("regular-user"));

  const db = firebase.firestore();
  const docRef = db.collection("products").doc();

  await expect(
    docRef.set({
      name: "Hacked Product",
      price: 9.99,
      stock: 1000,
      categoryId: "cat1",
    }),
  ).rejects.toThrow("Permission denied");
});
```

### Test 3.3: Admin Puede Crear Producto ✅

**Esperado:** PASS

```typescript
test("Admin can create product", async () => {
  const admin = await firebase
    .auth()
    .signInWithCustomToken(createCustomToken("admin-user", { admin: true }));

  const db = firebase.firestore();
  const docRef = db.collection("products").doc("product-123");

  await docRef.set({
    name: "Valid Product",
    price: 99.99,
    stock: 50,
    categoryId: "electronics",
    description: "A great product",
    images: ["url1", "url2"],
    rating: 4.5,
    createdAt: firebase.firestore.Timestamp.now(),
  });

  const snapshot = await docRef.get();
  expect(snapshot.data().name).toBe("Valid Product");
});
```

### Test 3.4: Admin NO Puede Crear Producto Con Precio Negativo ❌

**Esperado:** FAIL (validación)

```typescript
test("Admin cannot create product with negative price", async () => {
  const admin = await firebase
    .auth()
    .signInWithCustomToken(createCustomToken("admin-user", { admin: true }));

  const db = firebase.firestore();
  const docRef = db.collection("products").doc();

  await expect(
    docRef.set({
      name: "Invalid Product",
      price: -50, // ❌ Inválido
      stock: 100,
      categoryId: "cat1",
      createdAt: firebase.firestore.Timestamp.now(),
    }),
  ).rejects.toThrow("Permission denied");
});
```

---

## 4. Test Cases: Órdenes

### Test 4.1: Usuario Crea Su Propia Orden ✅

**Esperado:** PASS

```typescript
test("User can create own order", async () => {
  const userId = "user123";
  const user = await firebase
    .auth()
    .signInWithCustomToken(createCustomToken(userId));

  const db = firebase.firestore();
  const docRef = db.collection("orders").doc();

  await docRef.set({
    userId: userId, // Debe coincidir con auth
    status: "pending",
    total: 150.0,
    subtotal: 140.0,
    tax: 10.0,
    shipping: 0,
    items: [
      { productId: "prod1", quantity: 2, price: 50 },
      { productId: "prod2", quantity: 1, price: 40 },
    ],
    shippingAddress: {
      email: "user@example.com",
      firstName: "John",
      lastName: "Doe",
      address: "123 Main St",
      city: "Springfield",
      state: "IL",
      zipCode: "62701",
    },
    createdAt: firebase.firestore.Timestamp.now(),
  });

  const snapshot = await docRef.get();
  expect(snapshot.data().status).toBe("pending");
});
```

### Test 4.2: Usuario NO Puede Crear Orden Para Otro ❌

**Esperado:** FAIL

```typescript
test("User cannot create order for another user", async () => {
  const userId = "user123";
  const user = await firebase
    .auth()
    .signInWithCustomToken(createCustomToken(userId));

  const db = firebase.firestore();
  const docRef = db.collection("orders").doc();

  await expect(
    docRef.set({
      userId: "different-user", // ❌ Mismatch
      status: "pending",
      // ... resto de datos
    }),
  ).rejects.toThrow("Permission denied");
});
```

### Test 4.3: Usuario NO Puede Cambiar Estado de Su Orden ❌

**Esperado:** FAIL

```typescript
test("User cannot modify order status", async () => {
  const userId = "user123";
  const user = await firebase
    .auth()
    .signInWithCustomToken(createCustomToken(userId));

  const db = firebase.firestore();
  const docRef = db.collection("orders").doc("order123");

  // Crear la orden primero (como admin)
  // ...

  // Intentar cambiar estado debería fallar
  await expect(docRef.update({ status: "shipped" })).rejects.toThrow(
    "Permission denied",
  );
});
```

### Test 4.4: Admin Puede Cambiar Estado ✅

**Esperado:** PASS

```typescript
test("Admin can update order status", async () => {
  const admin = await firebase
    .auth()
    .signInWithCustomToken(createCustomToken("admin-user", { admin: true }));

  const db = firebase.firestore();
  const docRef = db.collection("orders").doc("order123");

  await docRef.update({ status: "shipped" });

  const snapshot = await docRef.get();
  expect(snapshot.data().status).toBe("shipped");
});
```

---

## 5. Test Cases: Storage

### Test 5.1: Cualquiera Lee Imágenes de Producto ✅

**Esperado:** PASS

```typescript
test("Anybody can read product images", async () => {
  const storage = firebase.storage();
  const ref = storage.ref("products/product123/images/image1.jpg");

  const url = await ref.getDownloadURL();
  expect(url).toBeDefined();
});
```

### Test 5.2: Usuario Sube Foto de Perfil ✅

**Esperado:** PASS

```typescript
test("User can upload profile photo", async () => {
  const userId = "user123";
  const user = await firebase
    .auth()
    .signInWithCustomToken(createCustomToken(userId));

  const storage = firebase.storage();
  const ref = storage.ref(`users/${userId}/profile/profile.jpg`);

  const file = new File(["content"], "profile.jpg", { type: "image/jpeg" });
  await ref.put(file);

  const url = await ref.getDownloadURL();
  expect(url).toBeDefined();
});
```

### Test 5.3: Usuario NO Sube Archivo Grande ❌

**Esperado:** FAIL (tamaño > 3MB)

```typescript
test("User cannot upload file larger than 3MB", async () => {
  const userId = "user123";
  const user = await firebase
    .auth()
    .signInWithCustomToken(createCustomToken(userId));

  const storage = firebase.storage();
  const ref = storage.ref(`users/${userId}/profile/profile.jpg`);

  // Crear archivo de 5MB
  const largeContent = new Array(5 * 1024 * 1024).fill("x").join("");
  const file = new File([largeContent], "large.jpg", { type: "image/jpeg" });

  await expect(ref.put(file)).rejects.toThrow();
});
```

### Test 5.4: Usuario NO Sube a Ruta de Otro ❌

**Esperado:** FAIL

```typescript
test("User cannot upload to another users profile", async () => {
  const userId = "user123";
  const user = await firebase
    .auth()
    .signInWithCustomToken(createCustomToken(userId));

  const storage = firebase.storage();
  const ref = storage.ref(`users/different-user/profile/profile.jpg`);

  const file = new File(["content"], "profile.jpg", { type: "image/jpeg" });

  await expect(ref.put(file)).rejects.toThrow();
});
```

### Test 5.5: Admin Sube Imagen de Producto ✅

**Esperado:** PASS

```typescript
test("Admin can upload product image", async () => {
  const admin = await firebase
    .auth()
    .signInWithCustomToken(createCustomToken("admin-user", { admin: true }));

  const storage = firebase.storage();
  const ref = storage.ref("products/prod123/images/image.jpg");

  const file = new File(["content"], "image.jpg", { type: "image/jpeg" });
  await ref.put(file);

  const url = await ref.getDownloadURL();
  expect(url).toBeDefined();
});
```

---

## 6. Validación de Datos: Edge Cases

### Test 6.1: Producto Vacío ❌

```typescript
test("Empty product is rejected", async () => {
  const admin = await firebase
    .auth()
    .signInWithCustomToken(createCustomToken("admin-user", { admin: true }));

  const db = firebase.firestore();
  const docRef = db.collection("products").doc();

  await expect(
    docRef.set({
      name: "", // ❌ Vacío
      price: 100,
      stock: 50,
      categoryId: "cat1",
      createdAt: firebase.firestore.Timestamp.now(),
    }),
  ).rejects.toThrow("Permission denied");
});
```

### Test 6.2: Producto sin Stock ✅

**Las reglas permiten stock = 0 (agotado)**

```typescript
test("Product with zero stock is allowed", async () => {
  const admin = await firebase
    .auth()
    .signInWithCustomToken(createCustomToken("admin-user", { admin: true }));

  const db = firebase.firestore();
  const docRef = db.collection("products").doc();

  await docRef.set({
    name: "Out of Stock",
    price: 100,
    stock: 0, // ✅ Permitido
    categoryId: "cat1",
    createdAt: firebase.firestore.Timestamp.now(),
  });

  const snapshot = await docRef.get();
  expect(snapshot.data().stock).toBe(0);
});
```

### Test 6.3: Review sin Texto ❌

```typescript
test("Empty review is rejected", async () => {
  const user = await firebase
    .auth()
    .signInWithCustomToken(createCustomToken("user123"));

  const db = firebase.firestore();
  const docRef = db
    .collection("products")
    .doc("prod1")
    .collection("reviews")
    .doc();

  await expect(
    docRef.set({
      rating: 5,
      comment: "", // ❌ Vacío
      productId: "prod1",
      userId: "user123",
      createdAt: firebase.firestore.Timestamp.now(),
    }),
  ).rejects.toThrow("Permission denied");
});
```

### Test 6.4: Rating Fuera de Rango ❌

```typescript
test("Review with invalid rating is rejected", async () => {
  const user = await firebase
    .auth()
    .signInWithCustomToken(createCustomToken("user123"));

  const db = firebase.firestore();
  const docRef = db
    .collection("products")
    .doc("prod1")
    .collection("reviews")
    .doc();

  await expect(
    docRef.set({
      rating: 10, // ❌ Máximo es 5
      comment: "Great!",
      productId: "prod1",
      userId: "user123",
      createdAt: firebase.firestore.Timestamp.now(),
    }),
  ).rejects.toThrow("Permission denied");
});
```

---

## 7. Checklist de Testing

### Pre-Deploy Testing

- [ ] **Autenticación**
  - [ ] Usuario autenticado puede leer propios datos
  - [ ] Usuario autenticado NO puede leer datos de otro
  - [ ] Usuario NO autenticado NO puede leer datos privados
  - [ ] Admin puede leer datos de cualquiera

- [ ] **Productos**
  - [ ] Cualquiera lee catálogo
  - [ ] No-admin NO puede crear
  - [ ] Admin puede crear con datos válidos
  - [ ] Admin NO puede crear con datos inválidos

- [ ] **Órdenes**
  - [ ] Usuario crea orden propia ✅
  - [ ] Usuario NO crea orden para otro ❌
  - [ ] Usuario NO cambio estado ❌
  - [ ] Admin cambio estado ✅

- [ ] **Storage**
  - [ ] Imágenes públicas accesibles
  - [ ] Usuario sube foto de perfil < 3MB
  - [ ] Usuario NO sube archivo > 3MB
  - [ ] Usuario NO sube a ruta de otro

- [ ] **Validación**
  - [ ] Campos requeridos presentes
  - [ ] Tipos de datos correctos
  - [ ] Tamaños dentro de límites
  - [ ] Timestamps son del servidor

---

## 8. Comando de Deploy

```bash
# Validar antes
firebase validate

# Deploy seguro
firebase deploy --only firestore:rules,storage

# Verificar en consola
firebase console
# → Firestore → Rules → Verificar cambios
# → Storage → Rules → Verificar cambios
```

---

## 9. Monitoreo Post-Deploy

```bash
# Ver logs en tiempo real
firebase functions:log

# Ver errores de reglas
firebase emulators:start --inspect-functions
```

---

**Nota:** Este documento de testing debe completarse ANTES de cualquier deployment a producción. Zero excepciones.
