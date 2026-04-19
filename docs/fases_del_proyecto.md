# 📅 Fases del Proyecto - Fullstack Challenge E-commerce

## 🎯 Visión General

El proyecto se divide en **3 fases de aprendizaje progressivo**, cada una construyendo sobre la anterior. Este enfoque permite dominar tanto frontend fundamentals como conceptos avanzados.

---

## FASE 1️⃣: Fundamentos - HTML + CSS + Vanilla JS

### 📋 Objetivo General
**Dominar HTML, CSS y JavaScript puro antes de abstracciones con React.**

Entregar una aplicación **funcional 100% en HTML/CSS/JS**, lista para convertirse en React en Fase 2.

### 📊 Cronograma
- **Duración**: ~1 semana (5 días de trabajo full-time)
- **Inicio**: Semana 1
- **Fin**: Fin de Semana 1

### 🔄 Subfases

#### **Subfase 1.1: Análisis y Maquetación Estática**
- **Duración**: 1.5 días
- **Objetivos**:
  - ✅ Analizar el PDF del proyecto
  - ✅ Crear mockups o wireframes (papel o Figma)
  - ✅ Diseñar estructura HTML semántico
  - ✅ Definir todas las páginas necesarias

- **Entregables**:
  - [ ] Wireframes de todas las páginas
  - [ ] Estructura HTML base (index.html, product-detail.html, cart.html, checkout.html, etc.)
  - [ ] Archivo de notas: `docs/fase_1_notas.md`

- **Tecnología**:
  - Solo HTML5 + CSS3
  - Vanilla JavaScript mínimo
  - Sin frameworks

#### **Subfase 1.2: Sistema de Diseño CSS**
- **Duración**: 1.5 días
- **Objetivos**:
  - ✅ Implementar todas las variables CSS (colores, espaciado, tipografía)
  - ✅ Crear componentes CSS base (botones, cards, inputs, modales)
  - ✅ Asegurar Responsive Design (mobile-first)
  - ✅ Validar contraste de accesibilidad

- **Entregables**:
  - [ ] `src/styles/variables.css` (100% documentado)
  - [ ] `src/styles/global.css` (reset + normalize)
  - [ ] `src/styles/components/*.css` (Button.css, Card.css, etc.)
  - [ ] Archivo README: `docs/sistema_de_diseño_implementado.md`

- **Criterios de Aceptación**:
  - Todos los colores del diseño implementados ✅
  - Responsive en 3 breakpoints (320px, 768px, 1024px) ✅
  - Sin overflow horizontal ✅
  - Contraste WCAG AA en todo texto ✅

#### **Subfase 1.3: Maquetación de Páginas**
- **Duración**: 1.5 días
- **Objetivos**:
  - ✅ Maquetar todas las páginas (HomePage, ProductDetail, Cart, Checkout, Auth, etc.)
  - ✅ Hacer HTML semántico + accesible
  - ✅ Aplicar CSS del sistema de diseño

- **Entregables**:
  - [ ] `index.html` (Home con galería de productos)
  - [ ] `product-detail.html`
  - [ ] `cart.html`
  - [ ] `checkout.html`
  - [ ] `login.html`
  - [ ] `register.html`
  - [ ] `profile.html` (mock, no funcional)
  - [ ] `orders.html` (mock, no funcional)
  - [ ] `admin.html` (mock, no funcional)

- **Stack HTML semántico**:
  ```html
  <header role="banner">
    <nav aria-label="main navigation">
  <main role="main">
    <section>
  <footer role="contentinfo">
  ```

#### **Subfase 1.4: Interactividad con Vanilla JS**
- **Duración**: 1 día
- **Objetivos**:
  - ✅ Implementar lógica de búsqueda/filtros (mockdata)
  - ✅ Carrito funcional (add/remove items)
  - ✅ Paginación
  - ✅ Modal de producto
  - ✅ Toggle de menú mobile
  - ✅ Validación básica de formularios

- **Entregables**:
  - [ ] `src/js/app.js` (Lógica general)
  - [ ] `src/js/cart.js` (Carrito + localStorage)
  - [ ] `src/js/search.js` (Búsqueda + filtros)
  - [ ] `src/js/mockdata.js` (Datos ficticios)
  - [ ] `src/js/ui.js` (Actualizaciones del DOM)

- **Sin dependencias NPM** (solo vanilla)

- **Funcionalidades que debe tener**:
  - Mostrar 12 productos (mockdata)
  - Búsqueda en tiempo real
  - Filtrar por categoría
  - Filtrar por rango de precios
  - Agregar/quitar del carrito
  - Persistencia en localStorage
  - Tabla de carrito con totales
  - Paginación (6 productos por página)

#### **Subfase 1.5: Validación y Optimización**
- **Duración**: 0.5 días
- **Objetivos**:
  - ✅ Validar responsive en múltiples dispositivos
  - ✅ Testing manual en navegadores
  - ✅ Optimizar imágenes
  - ✅ Revisar accesibilidad con herramientas

- **Entregables**:
  - [ ] Reporte de testing: `docs/fase_1_testing_report.md`
  - [ ] Imágenes optimizadas
  - [ ] Bundle limpio sin console.logs

### ✅ Criterios de Done - Fase 1
- [ ] Todas las páginas maquetadas y estilizadas
- [ ] Sistema de diseño CSS implementado 100%
- [ ] Búsqueda, filtros y carrito funcionales
- [ ] Responsive en 3+ breakpoints
- [ ] HTML semántico y accesible
- [ ] localStorage funcionando para carrito
- [ ] Mínimo 15 commits descriptivos
- [ ] README actualizado con progreso Fase 1
- [ ] Documentación completa en `docs/`

---

## FASE 2️⃣: React + TypeScript

### 📋 Objetivo General
**Convertir la aplicación HTML a React, manteniendo toda la funcionalidad.**

Introducir TypeScript, componentes reutilizables, hooks y estado.

### 📊 Cronograma
- **Duración**: ~1.5 semanas (8 días de trabajo)
- **Inicio**: Semana 2
- **Fin**: Finales de Semana 3

### 🔄 Subfases

#### **Subfase 2.1: Setup Inicial - Vite + React + TypeScript**
- **Duración**: 0.5 días
- **Objetivos**:
  - ✅ Crear proyecto Vite + React + TypeScript
  - ✅ Instalar dependencias core
  - ✅ Configurar estructura base
  - ✅ Move assets + estilos CSS

- **Comandos**:
  ```bash
  npm create vite@latest . -- --template react-ts
  npm install react-router-dom axios react-hot-toast react-icons
  npm install -D typescript eslint prettier
  ```

- **Entregables**:
  - [ ] `package.json` con todas las dependencias
  - [ ] `src/` con estructura base
  - [ ] `tsconfig.json` configurado
  - [ ] `.eslintrc.json` y `.prettierrc`

#### **Subfase 2.2: Componentes Atómicos**
- **Duración**: 1.5 días
- **Objetivos**:
  - ✅ Crear componentes atoms (Button, Input, Badge, Card, etc.)
  - ✅ Aplicar CSS de Fase 1
  - ✅ Props tipadas con TypeScript
  - ✅ Export barrel en `index.ts`

- **Entregables**:
  - [ ] `src/components/atoms/Button.tsx` + Button.css
  - [ ] `src/components/atoms/Input.tsx` + Input.css
  - [ ] `src/components/atoms/Card.tsx` + Card.css
  - [ ] `src/components/atoms/Badge.tsx`
  - [ ] `src/components/atoms/Icon.tsx`
  - [ ] `src/components/atoms/Loader.tsx`
  - [ ] `src/components/atoms/index.ts` (barrel export)

- **Criterios TypeScript**:
  - Todas las props tipadas
  - No usar `any`
  - Exportar interfaces en `types/`

#### **Subfase 2.3: Componentes Molecules**
- **Duración**: 1 día
- **Objetivos**:
  - ✅ Crear molecules (ProductCard, CartItem, SearchInput, etc.)
  - ✅ Combinar atoms + lógica básica
  - ✅ Props por contexto (callback functions)

- **Entregables**:
  - [ ] ProductCard.tsx
  - [ ] CartItem.tsx
  - [ ] SearchInput.tsx
  - [ ] ProductCard.css
  - CartItem.css
  - [ ] FilterGroup.tsx
  - [ ] Pagination.tsx

#### **Subfase 2.4: Componentes Organisms + Templates**
- **Duración**: 1.5 días
- **Objetivos**:
  - ✅ Crear organisms (Header, Footer, ProductGallery, Cart)
  - ✅ Crear templates (MainLayout, CheckoutLayout)
  - ✅ Integrar router basic

- **Entregables**:
  - [ ] Header.tsx (Navbar con navegación)
  - [ ] Footer.tsx
  - [ ] ProductGallery.tsx (Grid completo con búsqueda + filtros)
  - [ ] CartSidebar.tsx
  - [ ] MainLayout.tsx (con Header + Footer)
  - [ ] CheckoutLayout.tsx

#### **Subfase 2.5: Context API Setup**
- **Duración**: 1 día
- **Objetivos**:
  - ✅ Crear CartContext con reducer
  - ✅ Crear UserContext
  - ✅ Crear ProductContext
  - ✅ Sincronizar con localStorage

- **Entregables**:
  - [ ] `src/store/CartContext.tsx`
  - [ ] `src/store/UserContext.tsx`
  - [ ] `src/store/ProductContext.tsx`
  - [ ] `src/hooks/useCart.ts`
  - [ ] `src/hooks/useUser.ts`
  - [ ] `src/hooks/useProducts.ts`

#### **Subfase 2.6: Páginas + Routing**
- **Duración**: 1 día
- **Objetivos**:
  - ✅ Crear todas las páginas principales
  - ✅ Configurar React Router
  - ✅ Implementar NavigationRouting

- **Entregables**:
  - [ ] Home.tsx
  - [ ] ProductDetail.tsx
  - [ ] Cart.tsx
  - [ ] Checkout.tsx
  - [ ] Login.tsx
  - [ ] Register.tsx
  - [ ] Profile.tsx (simulado)
  - [ ] Orders.tsx (simulado)
  - [ ] App.tsx (Route setup)

#### **Subfase 2.7: Lógica Funcional**
- **Duración**: 1.5 días
- **Objetivos**:
  - ✅ Busqueda en tiempo real (debounce)
  - ✅ Filtrado por categoría + precio
  - ✅ Carrito completo (add/remove/update qty)
  - ✅ Paginación
  - ✅ Checkout preview
  - ✅ Toasts de notificaciones

- **Entregables**:
  - [ ] `src/hooks/useDebounce.ts`
  - [ ] `src/hooks/useNotification.ts`
  - [ ] Búsqueda + filtros funcionales en ProductGallery
  - [ ] Carrito persistente 100% funcional

#### **Subfase 2.8: Autenticación Simulada**
- **Duración**: 0.5 días
- **Objetivos**:
  - ✅ Registro simulado (localStorage)
  - ✅ Login simulado
  - ✅ Session persistente
  - ✅ Protected routes

- **Entregables**:
  - [ ] `src/utils/auth.ts` (simulado)
  - [ ] ProtectedRoute.tsx
  - [ ] Login + Register funcionales

#### **Subfase 2.9: Validación + Testing**
- **Duración**: 1 día
- **Objetivos**:
  - ✅ Agregar validaciones en formularios
  - ✅ Testing manual completo
  - ✅ Resolver errores TypeScript
  - ✅ Performance optimizations (React.memo, useMemo, etc.)

- **Entregables**:
  - [ ] `src/utils/validators.ts`
  - [ ] Validaciones en todos los forms
  - [ ] Reporte de testing: `docs/fase_2_testing_report.md`

### ✅ Criterios de Done - Fase 2
- [ ] App 100% funcional sin Firebase
- [ ] TypeScript sin warnings  (`tsc --noEmit` limpio)
- [ ] Todos los componentes en estructura atomic design
- [ ] Context API implementado correctamente
- [ ] localStorage sincronizado
- [ ] Búsqueda, filtros, carrito, checkout funcionales
- [ ] Responsive 100%
- [ ] Toasts de notificaciones funcionando
- [ ] Tests manuales pasados
- [ ] Mínimo 25 commits descriptivos (total 40 acumulados)
- [ ] README actualizado
- [ ] Documentación actualizada

---

## FASE 3️⃣: Firebase + Backend + Deploy

### 📋 Objetivo General
**Integrar Firebase para autenticación real, base de datos persistente y panel de admin.**

Deploy en producción.

### 📊 Cronograma
- **Duración**: ~1 semana (5 días)
- **Inicio**: Semana 4
- **Fin**: Fin de Semana 4

### 🔄 Subfases

#### **Subfase 3.1: Firebase Setup**
- **Duración**: 1 día
- **Objetivos**:
  - ✅ Crear proyecto en Firebase Console
  - ✅ Configurar Firestore Database
  - ✅ Configurar Authentication
  - ✅ Inicializar SDK en React

- **Entregables**:
  - [ ] `src/firebase/config.ts` (inicialización)
  - [ ] `.env.local` con credenciales
  - [ ] Firestore rules configuradas (lectura pública, escritura autenticada)

#### **Subfase 3.2: Autenticación Real**
- **Duración**: 1 día
- **Objetivos**:
  - ✅ Reemplazar auth simulada con Firebase Auth
  - ✅ Email/password login
  - ✅ Registro con validación
  - ✅ Logout
  - ✅ Session persistence

- **Entregables**:
  - [ ] `src/firebase/auth.ts` (servicios)
  - [ ] Login.tsx + Register.tsx integrados con Firebase
  - [ ] CurrentUser persistente entre sesiones

#### **Subfase 3.3: Migración de Datos a Firestore**
- **Duración**: 1.5 días
- **Objetivos**:
  - ✅ Crear colecciones: `products`, `users`, `carts`, `orders`, `categories`
  - ✅ Cargar mockdata inicial a Firestore
  - ✅ Crear servicios Firestore para CRUD
  - ✅ Real-time listeners para carrito + órdenes

- **Entregables**:
  - [ ] `src/firebase/firestore.ts` (servicios CRUD)
  - [ ] Firestore rules en `.json`
  - [ ] Índices creados en Firebase
  - [ ] Sync Context API ↔ Firestore

#### **Subfase 3.4: Integración FakeStore API**
- **Duración**: 0.5 días
- **Objetivos**:
  - ✅ Cargar productos reales de FakeStore API
  - ✅ Almacenar en Firestore
  - ✅ Mostrar en galería

- **Entregables**:
  - [ ] Script de inicialización: `src/scripts/initializeProducts.ts`

#### **Subfase 3.5: Órdenes y Checkout Real**
- **Duración**: 1 día
- **Objetivos**:
  - ✅ Guardar órdenes en Firestore
  - ✅ Vínculo user → orders
  - ✅ Historial de compras en Profile
  - ✅ Confirmación de email (mockup)

- **Entregables**:
  - [ ] Checkout guardar orden en Firestore
  - [ ] Orders.tsx mostrando historial
  - [ ] Profile.tsx con dirección + órdenes

#### **Subfase 3.6: Panel Admin Básico**
- **Duración**: 1 día
- **Objetivos**:
  - ✅ Crear página Admin (solo acceso rol:admin)
  - ✅ Listar productos
  - ✅ Crear producto (form)
  - ✅ Editar producto (form)
  - ✅ Eliminar producto (confirmación)
  - ✅ Roles en Firestore (user vs admin)

- **Entregables**:
  - [ ] Admin.tsx (CRUD interface)
  - [ ] AdminLayout.tsx (sidebar)
  - [ ] Firestore rules para admin-only

#### **Subfase 3.7: Deploy**
- **Duración**: 0.5 días
- **Objetivos**:
  - ✅ Build optimizado con Vite
  - ✅ Deploy en Firebase Hosting o GitHub Pages
  - ✅ Configurar dominio (opcional)
  - ✅ Validar en producción

- **Entregables**:
  - [ ] Build exitoso (`npm run build`)
  - [ ] URL en vivo funcional
  - [ ] Configuración CI/CD (optional)

#### **Subfase 3.8: Optimización Final**
- **Duración**: 1 día
- **Objetivos**:
  - ✅ Performance tuning (Lighthouse score > 85)
  - ✅ Lazy loading de componentes
  - ✅ Image optimization
  - ✅ Bundle size analisis

- **Entregables**:
  - [ ] Lighthouse report: `docs/fase_3_lighthouse_report.md`
  - [ ] Performance improvements aplicados

### ✅ Criterios de Done - Fase 3
- [ ] Autenticación Firebase funcionando
- [ ] Firestore colecciones + datos
- [ ] CRUD de productos en admin
- [ ] Órdenes guardadas + historial
- [ ] FakeStore API integrada
- [ ] Deploy en producción exitoso
- [ ] App 100% funcional en vivo
- [ ] Lighthouse: Performance > 85
- [ ] Mínimo 15 commits más (total 55+ commits)
- [ ] Documentación actualizada
- [ ] README con link en vivo

---

## 📊 Resumen por Fase

| Fase | Duración | Tecnología | Entrega |
|------|----------|-----------|---------|
| 1 | 5 días | HTML, CSS, Vanilla JS | App estática funcional |
| 2 | 8 días | React, TypeScript, Context API | App SPA sin backend |
| 3 | 5 días | Firebase, Firestore, Auth | App full-stack en vivo |
| **Total** | **~4 semanas** | **Full-stack moderno** | **Producción** |

---

## 🎯 Métrica de Progreso

Por cada subfase completada, update:
1. `docs/PROGRESO.md` con checkboxes
2. `README.md` con estado actual
3. Hacer commit con mensaje: `Fase X.Y: [Descripción]`

Ejemplo:
```bash
git commit -m "Fase 1.2: Sistema de diseño CSS implementado 100%"
```

---

**Documento versión**: 1.0  
**Última actualización**: Abril 2026  
**Responsable**: Tech Lead  
**Próxima revisión**: Fin de cada fase
