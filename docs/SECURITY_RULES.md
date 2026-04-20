# 🔒 Firebase Security Rules - E-commerce Fullstack Challenge

**Basado en:** Firebase Security Rules & Vibe Coding Security (Abril 2026)  
**Documento Crítico para:** Phase 3 - Firebase Integration  
**Estado:** Pre-Lanzamiento (antes de producción)  
**Última Actualización:** Abril 2026

---

## 📋 Tabla de Contenidos

1. [Conceptos Fundamentales](#1-conceptos-fundamentales)
2. [Arquitectura de Seguridad del E-commerce](#2-arquitectura-de-seguridad-del-e-commerce)
3. [Reglas de Firestore](#3-reglas-de-firestore)
4. [Reglas de Storage](#4-reglas-de-storage)
5. [Configuración de CORS](#5-configuración-de-cors)
6. [Errores Comunes AI/Vibe Coding](#6-errores-comunes)
7. [Checklist Pre-Lanzamiento](#7-checklist-pre-lanzamiento)
8. [Procedimientos de Testing](#8-procedimientos-de-testing)
9. [Monitoreo y Auditoría](#9-monitoreo-y-auditoría)

---

## 1. Conceptos Fundamentales

### El Problema Fundacional

**En arquitectura serverless (Firebase + Supabase):**

- El cliente (React app) se conecta DIRECTAMENTE a la base de datos
- Las credenciales de Firebase están VISIBLES en el JavaScript del navegador
- Las Security Rules son la ÚNICA barrera entre tu data y el internet público

```
Usuario Malicioso
        ↓
Abre DevTools → ve credenciales Firebase
        ↓
Conecta directamente via SDK
        ↓
Security Rules: ¿Permite esta operación?
    ├─ SÍ → Acceso otorgado (¡PROBLEMA!)
    └─ NO → Acceso denegado (correcto)
```

### Regla de Oro: "Deny by Default"

**Principio fundamental:**

- 🚫 TODO está bloqueado por defecto
- ✅ Solo permite explícitamente lo necesario
- 🔒 Las Security Rules son tu única defensa

---

## 2. Arquitectura de Seguridad del E-commerce

### Colecciones y Datos Sensibles

#### Colecciones Públicas (lectura abierta)

```
/products          → Catálogo de productos
/categories        → Categorías (metadata)
/reviews           → Reviews públicas
```

#### Colecciones Privadas (acceso controlado)

```
/users/{userId}           → Perfil de usuario (solo propietario)
/orders/{orderId}         → Órdenes de compra (propietario + admins)
/carts/{userId}           → Carritos de compra (solo propietario)
/wishlist/{userId}        → Listas de deseos (solo propietario)
/payments/{paymentId}     → Registros de pago (PCI, datos sensibles)
/internal/...             → Datos administrativos (BLOQUEADO)
```

#### Almacenamiento (Firebase Storage)

```
/products/{productId}/images/    → Imágenes públicas
/users/{userId}/profile/         → Fotos de perfil
/users/{userId}/documents/       → Documentos privados (invoices, etc)
/admin/                          → Datos administrativos
```

### Niveles de Usuario

| Rol                 | read /products | write /products | write /orders | read /admin |
| ------------------- | -------------- | --------------- | ------------- | ----------- |
| Anónimo             | ✅             | ❌              | ❌            | ❌          |
| Usuario autenticado | ✅             | ❌              | ✅ (propias)  | ❌          |
| Admin               | ✅             | ✅              | ✅ (todas)    | ✅          |

---

## 3. Reglas de Firestore

### 3.1 Estructura Base

```firestore
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Aquí van todas las reglas
    // match /path/to/collection/{docId} { ... }
  }
}
```

### 3.2 Nivel 1: Solo Usuarios Autenticados (INSUFICIENTE)

⚠️ **Limitación:** Cualquier usuario autenticado tiene acceso a TODO.

```firestore
match /{document=**} {
  allow read, write: if request.auth != null;
}
```

**❌ NUNCA uses esto en producción**

---

### 3.3 Nivel 2: Propiedad del Documento (Content-Owner)

✅ **Seguridad moderada:** Solo el propietario accede a sus datos.

```firestore
// ========== USUARIOS ==========
match /users/{userId} {
  // Solo el dueño puede leer
  allow get: if request.auth != null
    && request.auth.uid == userId;

  // Solo el dueño puede actualizar su perfil
  allow update: if request.auth != null
    && request.auth.uid == userId
    && request.resource.data.keys().hasOnly([
      'name', 'email', 'phone', 'address', 'city',
      'state', 'zipCode', 'country', 'profileImage'
    ]);

  // Crear: El userId debe coincidir con el auth
  allow create: if request.auth != null
    && request.resource.data.userId == request.auth.uid;

  // Borrar: Solo admin
  allow delete: if request.auth != null
    && request.auth.token.admin == true;
}
```

### 3.4 Nivel 3: Reglas Granulares por Colección

✅ **Seguridad robusta:** Diferentes reglas por tipo de dato.

#### A) Productos (Catálogo Público)

```firestore
match /products/{productId} {
  // Cualquiera puede leer
  allow read: if true;

  // Solo admin puede escribir
  allow create, update, delete: if request.auth != null
    && request.auth.token.admin == true
    && isValidProduct(request.resource.data);

  // Subcolección: reviews públicas
  match /reviews/{reviewId} {
    // Cualquiera puede leer reviews
    allow read: if true;

    // Usuario autenticado puede crear SU propia review
    allow create: if request.auth != null
      && request.resource.data.userId == request.auth.uid
      && isValidReview(request.resource.data);

    // Solo el autor puede actualizar/borrar su review
    allow update, delete: if request.auth != null
      && resource.data.userId == request.auth.uid;
  }
}

// Función validadora
function isValidProduct(data) {
  return data.name is string
    && data.name.size() > 0
    && data.name.size() <= 200
    && data.price is number
    && data.price >= 0
    && data.stock is number
    && data.stock >= 0
    && data.categoryId is string
    && data.categoryId.size() > 0;
}

function isValidReview(data) {
  return data.rating is number
    && data.rating >= 1
    && data.rating <= 5
    && data.comment is string
    && data.comment.size() <= 1000
    && data.productId is string
    && data.userId is string
    && data.createdAt == request.time;
}
```

#### B) Órdenes (Privadas + Admin)

```firestore
match /orders/{orderId} {
  // Propietario o admin pueden leer
  allow get: if request.auth != null
    && (resource.data.userId == request.auth.uid
        || request.auth.token.admin == true);

  // List: propietario ve sus órdenes, admin ve todas
  allow list: if request.auth != null
    && (query.where('userId', '==', request.auth.uid)
        || request.auth.token.admin == true);

  // Crear: usuario autenticado crea su propia orden
  allow create: if request.auth != null
    && request.resource.data.userId == request.auth.uid
    && isValidOrder(request.resource.data);

  // Actualizar: solo admin (cambiar estado)
  allow update: if request.auth != null
    && request.auth.token.admin == true
    && request.resource.data.userId == resource.data.userId;

  // Borrar: solo admin
  allow delete: if request.auth != null
    && request.auth.token.admin == true;

  // Subcolección: items de la orden
  match /items/{itemId} {
    allow read: if request.auth != null
      && (get(/databases/$(database)/documents/orders/$(orderId)).data.userId == request.auth.uid
          || request.auth.token.admin == true);

    allow create: if request.auth != null
      && get(/databases/$(database)/documents/orders/$(orderId)).data.userId == request.auth.uid;
  }
}

function isValidOrder(data) {
  return data.userId is string
    && data.userId.size() > 0
    && data.status in ['pending', 'processing', 'shipped', 'delivered']
    && data.total is number
    && data.total > 0
    && data.items is list
    && data.items.size() > 0
    && data.createdAt == request.time
    && data.shippingAddress is map
    && isValidAddress(data.shippingAddress);
}

function isValidAddress(addr) {
  return addr.email is string
    && addr.firstName is string
    && addr.lastName is string
    && addr.address is string
    && addr.city is string
    && addr.state is string
    && addr.zipCode is string;
}
```

#### C) Carrito de Compra (Privado)

```firestore
match /carts/{userId} {
  // Solo el propietario ve su carrito
  allow get: if request.auth != null
    && request.auth.uid == userId;

  allow create, update: if request.auth != null
    && request.auth.uid == userId
    && request.resource.data.userId == userId;

  allow delete: if request.auth != null
    && request.auth.uid == userId;

  // Subcolección: items del carrito
  match /items/{itemId} {
    allow read, write: if request.auth != null
      && request.auth.uid == userId;
  }
}
```

#### D) Pagos (DATOS MUY SENSIBLES - BLOQUEADOS)

```firestore
match /payments/{paymentId} {
  // NUNCA expongas detalles de pago al cliente
  // Los pagos SOLO se procesan via backend (Cloud Functions)
  allow read, write: if false;
}

match /paymentMethodsHashed/{userId} {
  // Solo hashes seguro (NUNCA tarjetas completas)
  allow read: if request.auth != null
    && request.auth.uid == userId;

  allow write: if false; // Backend solo
}
```

#### E) Datos Internos (COMPLETAMENTE BLOQUEADOS)

```firestore
match /internal/{document=**} {
  allow read, write: if false;
}

match /admin/{document=**} {
  allow read, write: if request.auth != null
    && request.auth.token.admin == true;
}
```

### 3.5 Nivel 4: Validación de Datos Avanzada

```firestore
match /posts/{postId} {
  allow create: if request.auth != null
    && request.resource.data.authorId == request.auth.uid
    // Validar que contiene todos los campos requeridos
    && request.resource.data.keys().hasAll(['title', 'content', 'createdAt'])
    && request.resource.data.keys().hasOnly(['title', 'content', 'createdAt', 'tags', 'status'])
    // Tipo y tamaño del título
    && request.resource.data.title is string
    && request.resource.data.title.size() > 0
    && request.resource.data.title.size() <= 200
    // Tipo y tamaño del contenido
    && request.resource.data.content is string
    && request.resource.data.content.size() > 0
    && request.resource.data.content.size() <= 10000
    // Tags (si existen)
    && (!request.resource.data.keys().hasAll(['tags'])
        || (request.resource.data.tags is list
            && request.resource.data.tags.size() <= 10))
    // Timestamp del servidor
    && request.resource.data.createdAt == request.time;
}
```

---

## 4. Reglas de Storage

### 4.1 Estructura Base

```firestore
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    // Aquí van las reglas de Storage
  }
}
```

### 4.2 Reglas Específicas del E-commerce

#### A) Imágenes Públicas de Productos

```firestore
match /products/{productId}/images/{fileName} {
  // Cualquiera puede ver
  allow read: if true;

  // Solo admin puede subir
  allow write: if request.auth != null
    && request.auth.token.admin == true
    && request.resource.contentType.matches('image/.*')
    && request.resource.size < 5 * 1024 * 1024 // 5 MB
    && isImageFile(fileName);
}

function isImageFile(fileName) {
  return fileName.matches('.*\\.(jpg|jpeg|png|webp)$');
}
```

#### B) Fotos de Perfil (Usuario)

```firestore
match /users/{userId}/profile/{fileName} {
  // Cualquiera puede ver fotos de perfil
  allow read: if true;

  // Solo el usuario puede subir su foto
  allow write: if request.auth != null
    && request.auth.uid == userId
    && request.resource.contentType.matches('image/(jpeg|png|webp)')
    && request.resource.size < 3 * 1024 * 1024 // 3 MB
    && isImageFile(fileName);

  // Referencias de usuario bloqueadas
  allow delete: if false;
}
```

#### C) Documentos Privados (Invoices, etc)

```firestore
match /users/{userId}/documents/{fileName} {
  // Solo el propietario puede leer
  allow read: if request.auth != null
    && request.auth.uid == userId;

  // Solo el propietario puede escribir
  allow write: if request.auth != null
    && request.auth.uid == userId
    && request.resource.contentType in [
      'application/pdf',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
    ]
    && request.resource.size < 10 * 1024 * 1024 // 10 MB;
}
```

#### D) Admin Upload (Backup, Reportes)

```firestore
match /admin/uploads/{fileName} {
  // Solo admin
  allow read, write: if request.auth != null
    && request.auth.token.admin == true;
}
```

#### E) Bloquear TODO lo demás

```firestore
match /{allPaths=**} {
  allow read, write: if false;
}
```

---

## 5. Configuración de CORS

### 5.1 En Express.js (Backend)

```javascript
import cors from "cors";

// ❌ NUNCA en producción
app.use(cors()); // equivale a Access-Control-Allow-Origin: *

// ✅ CORRECTO: lista explícita de dominios
app.use(
  cors({
    origin: [
      "https://mi-ecommerce.com",
      "https://www.mi-ecommerce.com",
      "https://admin.mi-ecommerce.com",
    ],
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization"],
    exposedHeaders: ["X-Total-Count"],
    maxAge: 600, // 10 minutos
  }),
);
```

### 5.2 En Vite (Desarrollo Local)

```typescript
// vite.config.ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:3000",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
    },
  },
});
```

### 5.3 En Firebase Cloud Functions

```typescript
import { onRequest } from "firebase-functions/v2/https";
import cors from "cors";

const corsHandler = cors({
  origin: ["https://mi-ecommerce.com", "https://www.mi-ecommerce.com"],
  credentials: true,
});

export const api = onRequest((req, res) => {
  corsHandler(req, res, () => {
    // Tu lógica aquí
    res.json({ success: true });
  });
});
```

---

## 6. Errores Comunes (AI/Vibe Coding)

### 🚨 ERROR #1: If True Global

```firestore
❌ NUNCA hagas esto:
match /{document=**} {
  allow read, write: if true;  // ← CRÍTICO: Expone TODO
}
```

**Impacto:** Cualquiera en el planeta puede:

- Leer TODA tu base de datos
- Modificar TODOS los documentos
- Eliminar TODOS los datos

---

### 🚨 ERROR #2: API Keys Hardcodeadas

```javascript
❌ NUNCA:
const firebaseConfig = {
  apiKey: 'AIzaSyDapresuivamenteUnNúmeroReal...', // VISIBLE
  authDomain: 'mi-app.firebaseapp.com',
};

✅ CORRECTO:
// En .env (NO versionado)
VITE_FIREBASE_API_KEY=AIzaSy...
VITE_FIREBASE_AUTH_DOMAIN=mi-app.firebaseapp.com

// En código
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
};
```

---

### 🚨 ERROR #3: Service Role Key en Cliente

```typescript
❌ NUNCA expongas la service_role key:
const supabase = createClient(
  'https://xxxx.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...' // service_role (PRIVADA)
);
// Esto bypasea TODA la seguridad RLS

✅ CORRECTO: Usa SOLO la anon key
const supabase = createClient(
  'https://xxxx.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...' // anon key (pública, OK)
);
```

---

### 🚨 ERROR #4: RLS Deshabilitado (Supabase)

```sql
❌ NUNCA:
-- Sin RLS habilitado, la tabla es accesible a TODOS
-- La anon key se convierte en un backdoor

✅ CORRECTO:
ALTER TABLE usuarios ENABLE ROW LEVEL SECURITY;

-- Luego crea políticas explícitas
CREATE POLICY "Users see only own data"
ON usuarios FOR SELECT
USING (auth.uid() = id);
```

---

### 🚨 ERROR #5: CORS Allow-Origin: \*

```javascript
❌ NUNCA:
res.setHeader('Access-Control-Allow-Origin', '*');

✅ CORRECTO:
res.setHeader(
  'Access-Control-Allow-Origin',
  'https://mi-ecommerce.com'
);
```

---

### 🚨 ERROR #6: Autorización por UI (Falso Sentido de Seguridad)

```typescript
❌ NUNCA confíes solo en UI:
if (user.isAdmin) {
  return <AdminButton />;  // ← Usuario puede forzar esto en DevTools
}

✅ CORRECTO: Valida en seguridad rules Y en backend
// Firebase Rules
allow write: if request.auth.token.admin == true;

// Backend también verifica
```

---

## 7. Checklist Pre-Lanzamiento

### 📋 BASE DE DATOS

- [ ] **Reglas de Firestore**
  - [ ] Ningún `allow read, write: if true` global
  - [ ] Cada colección tiene reglas específicas
  - [ ] Usas `request.auth.uid` para validar propiedad

- [ ] **Validación de Datos**
  - [ ] Validas tipos (string, number, map, list)
  - [ ] Validas tamaños (max length, file size)
  - [ ] Usas `request.time` para timestamps

- [ ] **Datos Sensibles**
  - [ ] Pagos bloqueados (`if false`)
  - [ ] Datos internos bloqueados (`if false`)
  - [ ] Solo accesibles via Cloud Functions

### 📦 STORAGE

- [ ] **Autenticación**
  - [ ] Firebase Storage valida `request.auth != null`
  - [ ] Usuarios solo suben a sus propios directorios

- [ ] **Validación de Archivos**
  - [ ] Tipos MIME validados (`image/.*`, `application/pdf`, etc)
  - [ ] Tamaños limitados (5 MB para imágenes, 10 MB para docs)
  - [ ] Nombres seguros (sin caracteres especiales)

- [ ] **Permisos**
  - [ ] Buckets NO son públicos por defecto
  - [ ] Admin puede subir a todas partes
  - [ ] Usuarios normales: solo perfil + documentos

### 🔐 API KEYS Y SECRETS

- [ ] **Variables de Entorno**
  - [ ] Todas las API keys en `.env` (NO versionado)
  - [ ] `.env` en `.gitignore`
  - [ ] `firebase.config.ts` NO contiene secrets

- [ ] **Claves de Supabase**
  - [ ] `anon key` en frontend (OK, pública)
  - [ ] `service_role key` NUNCA en frontend
  - [ ] `service_role key` solo en backend

- [ ] **Auditoría**
  - [ ] Corriste `gitleaks detect --source .`
  - [ ] Cero secrets encontrados en historio Git

### ✅ AUTENTICACIÓN

- [ ] **Firebase Authentication**
  - [ ] Firebase App Check habilitado
  - [ ] Contraseñas mínimo 6 caracteres (aumentar a 8 en producción)
  - [ ] Auth anónima deshabilitada (o vinculada a cuentas reales)

- [ ] **Tokens**
  - [ ] `request.auth.uid` es el identificador principal
  - [ ] `request.auth.token.admin` marca admins
  - [ ] Token expira correctamente

### 🌐 HEADERS Y HTTPS

- [ ] **HTTPS**
  - [ ] App servida SOLO sobre HTTPS
  - [ ] Redirige HTTP → HTTPS

- [ ] **Security Headers**
  - [ ] `Content-Security-Policy`: restricto
  - [ ] `X-Frame-Options: DENY` (previene clickjacking)
  - [ ] `X-Content-Type-Options: nosniff`
  - [ ] `Strict-Transport-Security: max-age=31536000`

```typescript
// Ejemplo en Express
app.use((req, res, next) => {
  res.setHeader("Content-Security-Policy", "default-src 'self'");
  res.setHeader("X-Frame-Options", "DENY");
  res.setHeader("X-Content-Type-Options", "nosniff");
  res.setHeader(
    "Strict-Transport-Security",
    "max-age=31536000; includeSubDomains",
  );
  next();
});
```

- [ ] **CORS**
  - [ ] Configurado solo para tus dominios
  - [ ] NUNCA `Access-Control-Allow-Origin: *`
  - [ ] `credentials: true` si usas cookies/auth

### ✔️ VALIDACIÓN

- [ ] **Inputs de Usuario (Frontend)**
  - [ ] Validados localmente (UX)
  - [ ] Pero NO confiar en ellos para seguridad

- [ ] **Inputs de Usuario (Backend/Rules)**
  - [ ] Validados SIEMPRE en Firebase Rules
  - [ ] Tipos, tamaños, formatos
  - [ ] Queries con límites (`limit(100)`)

- [ ] **Errores**
  - [ ] NUNCA expongas stack traces
  - [ ] NUNCA expongas paths de archivos
  - [ ] NUNCA expongas detalles de BD

### 🚀 TESTING

- [ ] **Firebase Emulator Suite**
  - [ ] Probaste todas las reglas localmente
  - [ ] Casos: usuario autenticado, anónimo, admin

- [ ] **Rules Simulator (Consola Firebase)**
  - [ ] Simulaste requests autenticados
  - [ ] Simulaste requests no autenticados
  - [ ] Probaste casos límite

```bash
firebase init emulators
firebase emulators:start
```

### 📊 MONITOREO

- [ ] **Logging**
  - [ ] Cloud Functions registran acceso
  - [ ] Errores de auth registran intentos

- [ ] **Alertas**
  - [ ] Notificación si tasa de rechazos > 10%
  - [ ] Notificación si operación bloqueada

---

## 8. Procedimientos de Testing

### 8.1 Test: Usuarios Leen Sus Propios Datos

```typescript
// En test suite
import { initializeTestEnvironment } from "@firebase/rules-unit-testing";

describe("User Ownership Rules", () => {
  let testEnv;

  beforeAll(async () => {
    testEnv = await initializeTestEnvironment({
      projectId: "test-project",
      firestore: {
        rules: fs.readFileSync("firestore.rules", "utf8"),
      },
    });
  });

  test("User can read own profile", async () => {
    const userId = "user123";
    const db = testEnv.authenticatedContext(userId).firestore();
    const docRef = db.collection("users").doc(userId);

    await assertSucceeds(docRef.get());
  });

  test("User cannot read other profile", async () => {
    const userId = "user123";
    const otherUserId = "user456";
    const db = testEnv.authenticatedContext(userId).firestore();
    const docRef = db.collection("users").doc(otherUserId);

    await assertFails(docRef.get());
  });

  test("Unauthenticated cannot read profiles", async () => {
    const db = testEnv.unauthenticatedContext().firestore();
    const docRef = db.collection("users").doc("user123");

    await assertFails(docRef.get());
  });
});
```

### 8.2 Test: Admin Puede Modificar Productos

```typescript
test("Admin can update product", async () => {
  const admin = testEnv
    .authenticatedContext("admin123", {
      admin: true,
    })
    .firestore();

  const docRef = admin.collection("products").doc("product123");
  await assertSucceeds(docRef.update({ price: 99.99 }));
});

test("Non-admin cannot update product", async () => {
  const user = testEnv
    .authenticatedContext("user123", {
      admin: false,
    })
    .firestore();

  const docRef = user.collection("products").doc("product123");
  await assertFails(docRef.update({ price: 99.99 }));
});
```

### 8.3 Test: Validación de Datos

```typescript
test("Product must have valid price", async () => {
  const admin = testEnv
    .authenticatedContext("admin123", {
      admin: true,
    })
    .firestore();

  const docRef = admin.collection("products").doc("product123");

  // Precio negativo: DEBE fallar
  await assertFails(
    docRef.create({
      name: "Widget",
      price: -10, // ❌ Inválido
      stock: 100,
    }),
  );

  // Precio válido: DEBE pasar
  await assertSucceeds(
    docRef.create({
      name: "Widget",
      price: 99.99, // ✅ Válido
      stock: 100,
    }),
  );
});
```

---

## 9. Monitoreo y Auditoría

### 9.1 Herramientas Oficiales

| Herramienta              | Propósito                     | Tipo              |
| ------------------------ | ----------------------------- | ----------------- |
| Firebase Rules Simulator | Simula requests contra reglas | Oficial, gratuito |
| Firebase Emulator Suite  | Testing local completo        | Oficial, gratuito |
| Firebase Console Logs    | Monitoreo en tiempo real      | Oficial, gratuito |

### 9.2 Herramientas Externas

| Herramienta | Propósito                   | Costo                  |
| ----------- | --------------------------- | ---------------------- |
| Gitleaks    | Detecta secrets en Git      | Gratuito (open source) |
| Snyk        | Escaneo de vulnerabilidades | Freemium               |
| OWASP ZAP   | Escaneo de seguridad web    | Gratuito               |

### 9.3 Comandos de Auditoría

```bash
# Buscar secrets en repositorio
gitleaks detect --source . -v

# Listar todas las reglas (Firebase CLI)
firebase rules:list

# Ver historial de cambios
git log --oneline firestore.rules storage.rules

# Validar sintaxis de reglas antes de deploy
firebase validate
```

### 9.4 Logs de Monitoreo

```typescript
// Cloud Functions para auditar cambios
import { onDocumentWritten } from "firebase-functions/firestore";
import * as logger from "firebase-functions/logger";

export const auditLog = onDocumentWritten("**", (event) => {
  const { data, before, after } = event;
  const path = event.params.doc;

  logger.info(`Document modified: ${path}`, {
    before: before?.data(),
    after: after?.data(),
    timestamp: new Date().toISOString(),
  });
});
```

---

## 10. Guía Rápida: Cómo Implementar

### Paso 1: Estructura Base (Día 1)

```bash
cd tu-proyecto-firebase
firebase init firestore
firebase init storage

# Esto crea:
# - firestore.rules
# - firestore.indexes.json
# - storage.rules
```

### Paso 2: Escribir Reglas (Día 2)

Copiar/adaptar reglas de este documento a:

- `firestore.rules`
- `storage.rules`

### Paso 3: Testing Local (Día 3)

```bash
firebase emulators:start
npm test
```

### Paso 4: Desplegar (Día 4)

```bash
# Validar primero
firebase validate

# Deploy
firebase deploy --only firestore:rules,storage

# Verificar en consola
firebase console
```

---

## 11. Resumen: Los 5 Errores Más Peligrosos

| #   | Error                        | Riesgo                     | Solución                          |
| --- | ---------------------------- | -------------------------- | --------------------------------- |
| 1   | `if true` global             | Exposición total           | Usar `if false` por defecto       |
| 2   | Service role en cliente      | Full bypass                | Solo anon key en cliente          |
| 3   | RLS deshabilitado (Supabase) | 1.5M+ datos filtrados      | Habilitar RLS en todas tablas     |
| 4   | CORS: `*`                    | Requests cross-origin      | Lista explícita de dominios       |
| 5   | Secrets en git               | Credenciales comprometidas | Variables de entorno (.gitignore) |

---

## 12. Recursos Adicionales

- 📖 [Firebase Security Rules Docs](https://firebase.google.com/docs/rules)
- 📖 [Cloud Firestore Best Practices](https://firebase.google.com/docs/firestore/best-practices)
- 🧪 [Rules Unit Testing](https://firebase.google.com/docs/rules/unit-tests)
- 🔍 [Gitleaks](https://github.com/gitleaks/gitleaks)
- 🛡️ [OWASP Security Headers](https://owasp.org/www-project-secure-headers/)

---

**Documento Crítico:** Este documento debe ser reviewed por un experto en seguridad ANTES de lanzar a producción. Las Security Rules son la diferencia entre una app funcional y una app hackeada.

**Máxima:** "30 minutos configurando seguridad = $4.88 millones ahorrados en data breaches" (IBM 2024)

---

_Ultima actualización: Abril 2026_  
_Basado en: Firebase Security Rules & Vibe Coding Security_
