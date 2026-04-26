# 🛠️ Tech Stack - Fullstack Challenge E-commerce

## 1️⃣ Overview

```
┌─────────────────────────────────────────────────┐
│          FRONTEND STACK                          │
├─────────────────────────────────────────────────┤
│ Runtime: Node.js 18+                            │
│ Package Manager: npm                            │
│ Language: TypeScript 5.x                        │
│ Framework: React 18.x                           │
│ Build Tool: Vite                                │
│ CSS: CSS Puro + Variables CSS                   │
│ Routing: react-router-dom 6.x                   │
│ HTTP Client: axios                              │
│ State: Zustand + Browser Storage                │
├─────────────────────────────────────────────────┤
│          BACKEND STACK (Fase 3)                 │
├─────────────────────────────────────────────────┤
│ Services: Firebase SDK + FakeStore API          │
│ Authentication: Firebase Auth                   │
│ Hosting: Cloudflare Pages                       │
├─────────────────────────────────────────────────┤
│          DEVELOPMENT TOOLS                      │
├─────────────────────────────────────────────────┤
│ Version Control: Git + GitHub                   │
│ Code Quality: ESLint + Prettier                 │
│ Testing: Vitest + React Testing Library         │
│ Dev Server: Vite Dev Server                     │
└─────────────────────────────────────────────────┘
```

---

## 2️⃣ Decisiones Tecnológicas

### **¿Por qué React 18?**
- ✅ Ecosistema maduro y massive adoption
- ✅ Concurrent rendering (mejor performance)
- ✅ Hooks disponibles (state management simplificado)
- ✅ Server Components en camino (prepararse)
- ✅ Comunidad enorme (FAQs, tutoriales, librerías)

### **¿Por qué TypeScript?**
- ✅ Type safety desde compilación
- ✅ Autocompletado en IDE (mejor DX)
- ✅ Refactoring seguro
- ✅ Documentación inline con tipos
- ✅ Reducir bugs en producción
- ✅ Requisito moderno en industria

### **¿Por qué CSS Puro (no Tailwind)?**
**Justificación en ADR** (ver `decisiones_de_arquitectura.md`)

| Aspecto | CSS Puro | Tailwind |
|--------|----------|----------|
| **Aprendizaje** | Controla 100% del CSS | Abstracción, menos control |
| **Bundle** | ~1-2KB | ~50-100KB |
| **Performance** | Nativo, optimizado | Compilación necesaria |
| **Escalabilidad** | Patrón BEM/SMACSS | Puede ser verboso en HTML |
| **Debugging** | Fácil (mira el CSS) | Inspector de DevTools |
| **Teoría** | Domina el fundamentals | Utilidad-first (short-term) |

**Objetivo pedagógico**: Aprender CSS profundo, no evadir con frameworks.

### **¿Por qué Vite?**
- ✅ 10-100x más rápido que Webpack
- ✅ HMR (Hot Module Reload) instantáneo
- ✅ ESM nativo en desarrollo
- ✅ Configuración mínima
- ✅ Production-ready build

### **¿Por qué Firebase Firestore (Fase 3)?**
- ✅ No requiere servidor backend propio
- ✅ Escala automáticamente
- ✅ Real-time listeners para sincronización
- ✅ Authentication integrado
- ✅ Free tier generoso (50K reads/writes/deletes al día)
- ✅ API REST + SDKs en múltiples lenguajes

### **¿Por qué Zustand?**
Zustand simplifica el manejo global de carrito, usuario y productos con menos boilerplate y buena legibilidad para SPA.

---

## 3️⃣ Stack Detallado por Categoría

### **Frontend - Dependencias Principales**

| Paquete | Versión | Propósito | Tamaño |
|---------|---------|----------|--------|
| `react` | `^18.2.0` | Librería core | 42KB |
| `react-dom` | `^18.2.0` | Renderizado en DOM | 130KB |
| `react-router-dom` | `^6.20.0` | SPA routing | 50KB |
| `axios` | `^1.15.1` | HTTP client | 20KB |
| `firebase` | `^12.12.0` | Auth y servicios | 120KB |
| `react-hot-toast` | `^2.6.0` | Notificaciones | 15KB |
| `zustand` | `^4.4.0` | State management | 2KB |

**Total estimado (gzipped)**: ~200-250KB

### **Development Dependencies**

```json
{
  "devDependencies": {
    "typescript": "^5.2.0",
    "vite": "^8.0.9",
    "@vitejs/plugin-react": "^4.0.0",
    "eslint": "^8.50.0",
    "eslint-config-airbnb": "^19.0.0",
    "terser": "^5.46.1"
  }
}
```

---

## 4️⃣ Configuración por Fase

### **Fase 1: HTML + CSS**
- Solo HTML, CSS, vanilla JS
- No hay dependencias NPM (puedo usar CDN para testing)
- Objetivo: Maquetación perfecta

### **Fase actual: React + TypeScript (implementada)**
- Vite + React + TypeScript
- Estado global con Zustand
- Datos de catálogo desde FakeStore API

```bash
npm create vite@latest . -- --template react-ts
npm install react-router-dom axios react-hot-toast react-icons
npm install -D typescript eslint prettier
```

### **Deploy actual**
- Cloudflare Pages como hosting
- `wrangler` como CLI de despliegue/operación (uso por comando)

```bash
npm install firebase
# Configurar: src/firebase/config.ts
# Crear: src/firebase/services/
```

---

## 5️⃣ Tamaño de Bundle Estimado

Después de build y gzipped:

```
┌────────────────────────────────┐
│ React + React-DOM              │  ~80KB
│ React Router DOM               │  ~50KB
│ Firebase SDK                   │ ~120KB
│ Axios + librerías HTTP         │  ~25KB
│ React Hot Toast + otros        │  ~30KB
│ CSS compilado                  │  ~40KB
│ JavaScript app                 │  ~50KB
├────────────────────────────────┤
│ TOTAL (gzipped)                │ ~395KB ❌
│ OPTIMIZADO (tree-shake)        │ ~280KB ✅
│ Con compresión agresiva        │ ~180KB ⭐
└────────────────────────────────┘
```

**Estrategia de optimización**:
- ✅ Tree-shaking (Vite automático)
- ✅ Code-splitting por rutas
- ✅ Lazy loading de componentes
- ✅ Minificación + compresión gzip
- ✅ Eliminar console.log en producción
- ✅ Images comprimidas (Tinypng, Webp)

---

## 6️⃣ Configuración de Entorno

### **Variables de Entorno (.env.local)**

```env
# Firebase Config (obtener de Firebase Console)
VITE_FIREBASE_API_KEY=xxx
VITE_FIREBASE_AUTH_DOMAIN=xxx.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=xxx
VITE_FIREBASE_STORAGE_BUCKET=xxx.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=xxx
VITE_FIREBASE_APP_ID=xxx

# API Sources
VITE_API_PRODUCTS_URL=https://fakestoreapi.com
```

### **Tipado de ENV en TypeScript**

```typescript
// src/types/env.d.ts
interface ImportMetaEnv {
  readonly VITE_FIREBASE_API_KEY: string;
  readonly VITE_FIREBASE_PROJECT_ID: string;
  // ...
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
```

---

## 7️⃣ Node Version Management

Para garantizar consistencia entre desarrolladores:

```json
{
  "engines": {
    "node": ">=18.0.0",
    "npm": ">=9.0.0"
  }
}
```

Si usas **nvm** (Node Version Manager):

```bash
# .nvmrc
18.17.0
```

Comando:
```bash
nvm use  # Automáticamente lee .nvmrc
npm install
```

---

## 8️⃣ Comandos NPM reales

```json
{
  "scripts": {
    "dev": "vite",                              // Dev server
    "build": "vite build",                      // Build producción
    "preview": "vite preview",                  // Previsualizar build
    "type-check": "tsc --noEmit",              // Validar TS
    "lint": "eslint . --ext ts,tsx --report-unused-disable-directives --max-warnings 0",
    "type-check": "tsc --noEmit"
  }
}
```

---

## 9️⃣ Browser Support Matrix

| Browser | Versión | Soporte |
|---------|---------|--------|
| Chrome | 90+ | ✅ Completo |
| Firefox | 88+ | ✅ Completo |
| Safari | 14+ | ✅ Completo |
| Edge | 90+ | ✅ Completo |
| iOS Safari | 14+ | ✅ Completo |
| Android Chrome | Latest 2 | ✅ Completo |
| IE 11 | - | ❌ No soportado |

---

## 🔟 Dependencias Externas y Acceso

### **APIs de Terceros**
- **FakeStore API** (Fase 3): Público, sin autenticación requerida
- **Firebase**: Requiere cuenta (gratuita disponible)
- **GitHub**: Para versionamiento

### **Servicios Requeridos**
1. Crear proyecto en Firebase Console: https://console.firebase.google.com
2. Habilitar Firestore Database
3. Habilitar Firebase Authentication (Email/Password)
4. Generar credenciales en configuración del proyecto

---

## 1️⃣1️⃣ Checklist de Configuración Inicial

- [ ] Node.js 18+ instalado y verificado (`node -v`)
- [ ] npm actualizado (`npm -v` debe ser 9+)
- [ ] Git configurado globally
- [ ] Cuenta Firebase creada
- [ ] Proyecto Firebase creado en console
- [ ] Credenciales Firebase copiadas
- [ ] .env.local creado con variables
- [ ] Vite inicializado
- [ ] package-lock.json commiteado
- [ ] .gitignore configurado

---

## 1️⃣2️⃣ Alternativas Consideradas y Rechazadas

| Tecnología | Razón de Rechazo |
|------------|-----------------|
| **Next.js** | Overkill para SPA simple, introduce SSR/SSG innecesarios |
| **Tailwind CSS** | Queremos aprender CSS puro, no abstracciones |
| **Redux** | Overhead para estado simple, Context API basta |
| **GraphQL** | Complexity, REST es suficiente para iniciar |
| **TypeORM + Node** | Necesitamos serverless (Firebase) para devops simple |
| **MongoDB** | Firebase Firestore es mejor para real-time |
| **Styled Components** | CSS puro es más eficiente en bundle |

---

**Documento versión**: 1.0  
**Última actualización**: Abril 2026  
**Revisado por**: Equipo de Arquitectura  
**Próxima revisión**: Cuando cambien requisitos tecnológicos
