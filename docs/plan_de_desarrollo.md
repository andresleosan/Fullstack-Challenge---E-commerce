# 📋 Plan de Desarrollo Detallado - Fullstack Challenge E-commerce

## 🎯 Visión General

Roadmap completo desglosado por **tareas atómicas** con:
- Timeline estimado
- Dependencias
- Criterios de aceptación
- Commits asociados

---

## FASE 1: HTML + CSS + Vanilla JS

### Semana 1 - Maquetación y Diseño

#### **Día 1: Análisis y Setup Inicial**

| ID | Tarea | Duración | Dependencias | Commits |
|----|-------|----------|-------------|---------|
| 1.1 | Analizar PDF del proyecto | 1h | - | `init: project analysis` |
| 1.2 | Crear wireframes (Figma o papel) | 2h | 1.1 | `docs: wireframes created` |
| 1.3 | Crear estructura carpetas base | 0.5h | - | `init: folder structure` |
| 1.4 | Crear `index.html` base | 1h | 1.3 | `feat: base HTML structure` |
| 1.5 | Documentar en `docs/fase_1.md` | 0.5h | 1.1 | `docs: phase 1 documentation` |

**Total Día 1**: 5 horas  
**Status**: ⏳ Pending

---

#### **Día 2: Sistema de Diseño CSS**

| ID | Tarea | Duración | Criterios de Aceptación | Commits |
|----|-------|----------|------------------------|---------|
| 2.1 | Crear `variables.css` | 1.5h | - Color palette definida ✅<br>- Spacing scale completa ✅<br>- Typography scale ✅ | `style: CSS variables` |
| 2.2 | Crear `global.css` (reset) | 1h | - Sin estilos por defecto conflictivos ✅<br>- Fuentes cargadas ✅ | `style: global styles` |
| 2.3 | Crear componentes CSS atoms | 2.5h | - Button.css (primary, secondary, danger) ✅<br>- Input.css (text, number, textarea) ✅<br>- Card.css ✅<br>- Badge.css ✅ | `style: atomic components` |
| 2.4 | Validar contraste WCAG | 0.5h | - Todo texto > 4.5:1 contrast ✅ | `test: accessibility check` |

**Total Día 2**: 5.5 horas  
**Status**: ⏳ Pending

---

#### **Día 3: Maquetación Páginas (Parte 1)**

| ID | Tarea | Duración | Criterios de Aceptación | Commits |
|----|-------|----------|------------------------|---------|
| 3.1 | Maquetar `index.html` | 2h | - Header con nav ✅<br>- Grid de productos (12) ✅<br>- Footer ✅ | `feat: home page layout` |
| 3.2 | Maquetar `product-detail.html` | 1.5h | - Imagen grande ✅<br>- Info producto ✅<br>- Botón agregar ✅ | `feat: product detail layout` |
| 3.3 | Maquetar `cart.html` | 1.5h | - Tabla de items ✅<br>- Totales ✅<br>- Botones de acción ✅ | `feat: cart page layout` |

**Total Día 3**: 5 horas  
**Status**: ⏳ Pending

---

#### **Día 4: Maquetación Páginas (Parte 2) + Interactividad**

| ID | Tarea | Duración | Criterios de Aceptación | Commits |
|----|-------|----------|------------------------|---------|
| 4.1 | Maquetar `checkout.html` | 1.5h | - Resumen de orden ✅<br>- Formulario de envío ✅<br>- Confirmación ✅ | `feat: checkout page layout` |
| 4.2 | Maquetar `login.html` | 1h | - Formulario email/password ✅<br>- Link a registro ✅ | `feat: login page layout` |
| 4.3 | Maquetar `register.html` | 1h | - Formulario nombre/email/password ✅<br>- Link a login ✅ | `feat: register page layout` |
| 4.4 | Implementar búsqueda JS | 1.5h | - Search en tiempo real ✅<br>- Filtración de array ✅ | `feat: search functionality` |
| 4.5 | Responsive testing (mobile) | 0.5h | - No overflow horizontal ✅<br>- Legible en 320px ✅ | `test: mobile responsive` |

**Total Día 4**: 5.5 horas  
**Status**: ⏳ Pending

---

#### **Día 5: Carrito + Filtros + Optimización**

| ID | Tarea | Duración | Criterios de Aceptación | Commits |
|----|-------|----------|------------------------|---------|
| 5.1 | Implementar carrito (add/remove) | 2h | - Add item ✅<br>- Remove item ✅<br>- Actualizar cantidad ✅<br>- localStorage sync ✅ | `feat: shopping cart` |
| 5.2 | Implementar filtros (categoría+precio) | 1.5h | - Filtro categoría ✅<br>- Filtro precio range ✅<br>- Aplicar simultáneamente ✅ | `feat: product filters` |
| 5.3 | Implementar paginación | 1h | - Dividir en páginas ✅<br>- Botones prev/next ✅ | `feat: pagination` |
| 5.4 | Testing + Optimización | 1h | - Verificar en 3 navegadores ✅<br>- Images optimizadas ✅<br>- Console limpia ✅ | `test: cross-browser, perf` |

**Total Día 5**: 5.5 horas  
**Status**: ⏳ Pending

---

### ✅ Fase 1 - Totales

- **Duración Total**: 26 horas (5 días)
- **Commits Esperados**: 30+ (PDF: "mínimo 30 commits, uno por paso pequeño")
- **Estado al final**: App 100% funcional sin React
- **Estrategia de Commits**: 
  - Cada pequeño paso = 1 commit
  - `feat:` para funcionalidades
  - `style:` para CSS
  - `test:` para validaciones
  - `docs:` para documentación

---

## FASE 2: React + TypeScript

### Semana 2-3 - Componentes y Estado

#### **Día 6-7: Setup y Componentes Base**

| ID | Tarea | Duración | Criterios de Aceptación | Commits |
|----|-------|----------|------------------------|---------|
| 6.1 | Crear proyecto Vite + React | 0.5h | - `npm create vite` exitoso ✅<br>- Dev server corriendo ✅ | `init: vite react setup` |
| 6.2 | Instalar dependencias | 0.5h | - react-router-dom ✅<br>- axios ✅<br>- react-hot-toast ✅<br>- react-icons ✅ | `chore: install dependencies` |
| 6.3 | Configurar TypeScript | 1h | - tsconfig.json ✅<br>- Crear types/ folder ✅ | `config: typescript setup` |
| 6.4 | Mover estilos CSS | 0.5h | - Todos los styles en src/styles/ ✅<br>- Imports funcionando ✅ | `style: move global styles` |
| 6.5 | Crear Button.tsx (atom) | 1h | - Props tipadas ✅<br>- 3 variantes (primary, secondary, danger) ✅<br>- CSS aplicado ✅ | `feat: Button component` |
| 6.6 | Crear Input.tsx (atom) | 0.5h | - Tipado ✅<br>- Manejo de onChange ✅ | `feat: Input component` |
| 6.7 | Crear Card.tsx (atom) | 0.5h | - Tipado ✅<br>- Children rendering ✅ | `feat: Card component` |
| 6.8 | Exportar atoms con barrel | 0.5h | - `src/components/atoms/index.ts` ✅ | `refactor: barrel exports` |

**Total Día 6-7**: 5 horas  
**Status**: ⏳ Pending

---

#### **Día 8-9: Componentes Molecules**

| ID | Tarea | Duración | Criterios de Aceptación | Commits |
|----|-------|----------|------------------------|---------|
| 7.1 | Crear ProductCard.tsx | 1.5h | - Muestra imagen ✅<br>- Precio destacado ✅<br>- Botón "Agregar" ✅ | `feat: ProductCard molecule` |
| 7.2 | Crear CartItem.tsx | 1h | - Campos quantity ✅<br>- Botón eliminar ✅ | `feat: CartItem molecule` |
| 7.3 | Crear SearchInput.tsx | 1h | - Input + button ✅<br>- Callback onChange ✅ | `feat: SearchInput molecule` |
| 7.4 | Crear FilterGroup.tsx | 1.5h | - Select categoría ✅<br>- Range slider precio ✅ | `feat: FilterGroup molecule` |
| 7.5 | Crear Pagination.tsx | 1h | - Prev/Next buttons ✅<br>- Indicador de página ✅ | `feat: Pagination molecule` |
| 7.6 | Crear Badge.tsx (atom) | 0.5h | - Diferent variants ✅ | `feat: Badge component` |

**Total Día 8-9**: 6.5 horas  
**Status**: ⏳ Pending

---

#### **Día 10-11: Componentes Grandes**

| ID | Tarea | Duración | Criterios de Aceptación | Commits |
|----|-------|----------|------------------------|---------|
| 8.1 | Crear Header.tsx (organism) | 2h | - Navbar con links ✅<br>- Logo ✅<br>- Cart icon con contador ✅<br>- Mobile menu ✅ | `feat: Header organism` |
| 8.2 | Crear Footer.tsx (organism) | 1h | - Links útiles ✅<br>- Copyright ✅ | `feat: Footer organism` |
| 8.3 | Crear MainLayout.tsx | 1h | - Header + main + Footer ✅ | `feat: MainLayout template` |
| 8.4 | Crear ProductGallery.tsx | 2h | - Grid de cards ✅<br>- Integrar filtros ✅<br>- Paginación ✅ | `feat: ProductGallery organism` |
| 8.5 | Crear CartSidebar.tsx | 1.5h | - Mostrar items ✅<br>- Total ✅<br>- Checkout button ✅ | `feat: CartSidebar organism` |

**Total Día 10-11**: 7.5 horas  
**Status**: ⏳ Pending

---

#### **Día 12-13: Context API y Hooks**

| ID | Tarea | Duración | Criterios de Aceptación | Commits |
|----|-------|----------|------------------------|---------|
| 9.1 | Crear CartContext.tsx | 1.5h | - useReducer ✅<br>- Actions tipadas ✅<br>- Persistencia localStorage ✅ | `feat: CartContext` |
| 9.2 | Crear useCart hook | 0.5h | - Devuelve state + dispatch ✅<br>- Acciones helper ✅ | `feat: useCart hook` |
| 9.3 | Crear UserContext.tsx | 1h | - Estado de usuario ✅<br>- Persistencia ✅ | `feat: UserContext` |
| 9.4 | Crear useUser hook | 0.5h | - Acciones de auth ✅ | `feat: useUser hook` |
| 9.5 | Crear ProductContext.tsx | 1h | - Almacena productos ✅<br>- Simulado con mockdata ✅ | `feat: ProductContext` |
| 9.6 | Crear useProducts hook | 0.5h | - Filtra + busca ✅ | `feat: useProducts hook` |
| 9.7 | Crear useDebounce hook | 0.5h | - Debounce búsqueda ✅ | `feat: useDebounce hook` |
| 9.8 | Crear useNotification hook | 0.5h | - Toast notifications ✅ | `feat: useNotification hook` |

**Total Día 12-13**: 6 horas  
**Status**: ⏳ Pending

---

#### **Día 14-15: Páginas y Routing**

| ID | Tarea | Duración | Criterios de Aceptación | Commits |
|----|-------|----------|------------------------|---------|
| 10.1 | Crear Home.tsx | 1.5h | - ProductGallery + Header ✅ | `feat: Home page` |
| 10.2 | Crear ProductDetail.tsx | 1.5h | - Fetch by ID ✅<br>- Add to cart button ✅ | `feat: ProductDetail page` |
| 10.3 | Crear Cart.tsx | 1h | - CartItems list ✅<br>- Totales ✅<br>- Checkout link ✅ | `feat: Cart page` |
| 10.4 | Crear Checkout.tsx | 1.5h | - Form validación ✅<br>- Order preview ✅ | `feat: Checkout page` |
| 10.5 | Crear Login.tsx + Register.tsx | 1.5h | - Forms básicos ✅ | `feat: Auth pages` |
| 10.6 | Configurar React Router | 1.5h | - Rutas definidas ✅<br>- Links funcionando ✅ | `feat: routing setup` |
| 10.7 | Crear App.tsx (root) | 1h | - Router + Providers ✅ | `feat: App component` |

**Total Día 14-15**: 8 horas  
**Status**: ⏳ Pending

---

#### **Día 16-17: Autenticación Simulada**

| ID | Tarea | Duración | Criterios de Aceptación | Commits |
|----|-------|----------|------------------------|---------|
| 11.1 | Crear utils/auth.ts | 1h | - Simulada con localStorage ✅ | `util: auth functions` |
| 11.2 | Crear ProtectedRoute.tsx | 1h | - Redirige a login si no autenticado ✅ | `feat: ProtectedRoute` |
| 11.3 | Implementar Login funcional | 1.5h | - Valida email ✅<br>- Guarda en estado ✅ | `feat: login logic` |
| 11.4 | Implementar Register funcional | 1.5h | - Valida datos ✅<br>- Crea usuario ✅ | `feat: register logic` |
| 11.5 | Crear Profile.tsx | 1h | - Mostrar datos usuario ✅<br>- Logout button ✅ | `feat: Profile page` |
| 11.6 | Crear Orders.tsx | 1h | - Listar órdenes (mock) ✅ | `feat: Orders page` |

**Total Día 16-17**: 7 horas  
**Status**: ⏳ Pending

---

#### **Día 18: Validación y Testing Fase 2**

| ID | Tarea | Duración | Criterios de Aceptación | Commits |
|----|-------|----------|------------------------|---------|
| 12.1 | Crear utils/validators.ts | 1h | - Email ✅<br>- Password ✅<br>- Required fields ✅ | `util: validators` |
| 12.2 | Agregar validaciones en forms | 1h | - Mostrar errores ✅<br>- Prevenir submit inválido ✅ | `feat: form validation` |
| 12.3 | TypeScript check | 0.5h | - `tsc --noEmit` sin errores ✅ | `test: typescript check` |
| 12.4 | Testing manual | 1h | - Búsqueda funciona ✅<br>- Carrito persiste ✅<br>- Filtros correctos ✅ | `test: manual testing` |
| 12.5 | Responsive testing Fase 2 | 1h | - Mobile, tablet, desktop ✅ | `test: responsive design` |
| 12.6 | Optimizaciones React | 1h | - React.memo donde aplique ✅<br>- useMemo para listas ✅ | `perf: React optimizations` |

**Total Día 18**: 5.5 horas  
**Status**: ⏳ Pending

---

### ✅ Fase 2 - Totales

- **Duración Total**: ~45 horas (días 6-18, ~13 días)
- **Commits Esperados**: 25-30
- **Estado al final**: SPA 100% funcional sin backend

---

## FASE 3: Firebase + Backend + Deploy

### Semana 4 - Integración y Producción

#### **Día 19-20: Firebase Setup**

| ID | Tarea | Duración | Criterios de Aceptación | Commits |
|----|-------|----------|------------------------|---------|
| 13.1 | Crear proyecto Firebase | 0.5h | - Proyecto creado ✅<br>- Credenciales obtenidas ✅ | `init: firebase project` |
| 13.2 | Habilitar Firestore | 0.5h | - Firestore activo ✅<br>- Rules configuradas ✅ | `config: firestore enabled` |
| 13.3 | Habilitar Authentication | 0.5h | - Email/Password habilitado ✅ | `config: auth enabled` |
| 13.4 | Crear src/firebase/config.ts | 1h | - SDK inicializado ✅<br>- Exporta db + auth ✅ | `feat: firebase config` |
| 13.5 | Crear `.env.local` | 0.5h | - Variables de entorno ✅ | `config: environment variables` |
| 13.6 | Crear firestore services | 2h | - CRUD functions ✅<br>- Listeners real-time ✅ | `feat: firestore services` |

**Total Día 19-20**: 5 horas  
**Status**: ⏳ Pending

---

#### **Día 21: Autenticación Firebase Real**

| ID | Tarea | Duración | Criterios de Aceptación | Commits |
|----|-------|----------|------------------------|---------|
| 14.1 | Crear src/firebase/auth.ts | 1h | - signUp ✅<br>- signIn ✅<br>- logOut ✅<br>- getCurrentUser ✅ | `feat: firebase auth` |
| 14.2 | Reemplazar Login.tsx | 1.5h | - Usa Firebase Auth ✅<br>- Maneja errores ✅ | `refactor: firebase login` |
| 14.3 | Reemplazar Register.tsx | 1.5h | - Crea usuario en Firestore ✅ | `refactor: firebase register` |
| 14.4 | Update UserContext | 1h | - Sincroniza con Firebase ✅<br>- Listener onAuthChange ✅ | `refactor: sync firebase auth` |
| 14.5 | Testing Auth | 0.5h | - Login/Logout funciona ✅<br>- Sesión persiste ✅ | `test: firebase auth` |

**Total Día 21**: 5.5 horas  
**Status**: ⏳ Pending

---

#### **Día 22-23: Firestore Collections y Migración**

| ID | Tarea | Duración | Criterios de Aceptación | Commits |
|----|-------|----------|------------------------|---------|
| 15.1 | Crear colección `products` | 1h | - Estructura clara ✅ | `data: products collection` |
| 15.2 | Cargar products a Firestore | 1h | - Mockdata migrado ✅ | `data: seed products` |
| 15.3 | Crear colección `users` | 0.5h | - Perfil extendido ✅ | `data: users collection` |
| 15.4 | Crear colección `carts` | 0.5h | - Estructura user-centric ✅ | `data: carts collection` |
| 15.5 | Crear colección `orders` | 0.5h | - Campos de orden ✅ | `data: orders collection` |
| 15.6 | Actualizar ProductContext | 1h | - Fetch desde Firestore ✅<br>- Listener real-time ✅ | `refactor: firestore products` |
| 15.7 | Actualizar CartContext | 1.5h | - Sincroniza con Firestore ✅<br>- Listener carrito usuario ✅ | `refactor: firestore cart` |
| 15.8 | Testing Firestore sync | 1h | - Carrito sincroniza ✅<br>- Persistencia cross-device ✅ | `test: firestore sync` |

**Total Día 22-23**: 7 horas  
**Status**: ⏳ Pending

---

#### **Día 24: Órdenes y Checkout Real**

| ID | Tarea | Duración | Criterios de Aceptación | Commits |
|----|-------|----------|------------------------|---------|
| 16.1 | Actualizar Checkout.tsx | 1.5h | - Guarda orden en Firestore ✅<br>- Limpia carrito ✅ | `feat: checkout save order` |
| 16.2 | Crear Orders.tsx con historial real | 1.5h | - Query órdenes del usuario ✅<br>- Muestra lista ✅ | `feat: orders history` |
| 16.3 | Actualizar Profile.tsx | 1h | - Información desde Firestore ✅<br>- Editar dirección ✅ | `feat: profile firestore` |
| 16.4 | Crear Firestore trigger (opcional) | 1h | - Log de órdenes (cloud function) ✅ | `feat: firestore trigger` |
| 16.5 | Testing órdenes | 1h | - Crear orden ✅<br>- Ver historial ✅ | `test: orders flow` |

**Total Día 24**: 5.5 horas  
**Status**: ⏳ Pending

---

#### **Día 25: Admin Panel**

| ID | Tarea | Duración | Criterios de Aceptación | Commits |
|----|-------|----------|------------------------|---------|
| 17.1 | Crear Admin.tsx page | 1.5h | - Listado de productos ✅<br>- Tabla CRUD ✅ | `feat: admin list products` |
| 17.2 | Crear AdminLayout.tsx | 1h | - Sidebar navigation ✅ | `feat: admin layout` |
| 17.3 | Crear form crear producto | 1.5h | - Validación ✅<br>- Sube a Firestore ✅ | `feat: admin create product` |
| 17.4 | Crear form editar producto | 1h | - Carga datos ✅<br>- Actualiza Firestore ✅ | `feat: admin edit product` |
| 17.5 | Implementar delete producto | 1h | - Confirmación ✅<br>- Borra de Firestore ✅ | `feat: admin delete product` |
| 17.6 | Configurar Firestore rules (admin) | 1h | - Solo admins pueden modificar ✅ | `config: firestore rules admin` |
| 17.7 | Testing admin | 1h | - CRUD funciona ✅ | `test: admin panel` |

**Total Día 25**: 7.5 horas  
**Status**: ⏳ Pending

---

#### **Día 26: FakeStore API e Integración**

| ID | Tarea | Duración | Criterios de Aceptación | Commits |
|----|-------|----------|------------------------|---------|
| 18.1 | Crear script carga FakeStore | 1h | - Fetch API ✅<br>- Parsea datos ✅ | `script: initialize fakestoreapi` |
| 18.2 | Ejecutar seed de productos | 0.5h | - Carga en Firestore ✅ | `data: seed fakestoreapi` |
| 18.3 | Verificar en galería | 1h | - Muestra productos reales ✅<br>- Búsqueda funciona ✅ | `test: fakestoreapi integration` |

**Total Día 26**: 2.5 horas  
**Status**: ⏳ Pending

---

#### **Día 27: Deploy**

| ID | Tarea | Duración | Criterios de Aceptación | Commits |
|----|-------|----------|------------------------|---------|
| 19.1 | Optimizar build | 1h | - Code splitting ✅<br>- Lazy loading ✅ | `perf: build optimization` |
| 19.2 | Build production | 0.5h | - `npm run build` sin warnings ✅ | `build: production build` |
| 19.3 | Deploy Firebase Hosting | 1.5h | - CLI configurado ✅<br>- Deploy exitoso ✅ | `deploy: firebase hosting` |
| 19.4 | Validar en vivo | 1h | - Todas funciones OK ✅<br>- Sin errores console ✅ | `test: production validation` |
| 19.5 | Lighthouse audit | 1h | - Performance > 85 ✅<br>- Accessibility OK ✅ | `test: lighthouse audit` |
| 19.6 | Documentar deploy | 0.5h | - README con URL ✅ | `docs: deployment docs` |

**Total Día 27**: 5.5 horas  
**Status**: ⏳ Pending

---

#### **Día 28: Finales y Documentación**

| ID | Tarea | Duración | Criterios de Aceptación | Commits |
|----|-------|----------|------------------------|---------|
| 20.1 | Revisión final de Features | 2h | - Todos funcionales ✅ | `test: final feature review` |
| 20.2 | Documentación actualizada | 1.5h | - README ✅<br>- docs/* ✅<br>- PROGRESO.md ✅ | `docs: final documentation` |
| 20.3 | README con instrucciones setup | 1h | - Clonar, instalar, correr ✅ | `docs: setup instructions` |
| 20.4 | Crear CHANGELOG.md | 1h | - Resumen de cambios ✅ | `docs: changelog` |

**Total Día 28**: 5.5 horas  
**Status**: ⏳ Pending

---

### ✅ Fase 3 - Totales

- **Duración Total**: ~38 horas (~10 días)
- **Commits Esperados**: 15-20
- **Estado al final**: Producción 100% funcional

---

## 📊 Resumen Global

| Fase | Duración | Horas | Commits | Status |
|------|----------|-------|---------|--------|
| 1 | 5 días | 26h | 15+ | ⏳ |
| 2 | 13 días | 45h | 25-30 | ⏳ |
| 3 | 10 días | 38h | 15-20 | ⏳ |
| **Total** | **28 días** | **109h** | **55+** | **⏳** |

---

## 🎯 Métricas de Progreso

### Por completar:
```
Fase 1: 0/18 subfases
Fase 2: 0/45 subfases  
Fase 3: 0/20 subfases
─────────────────────────
Total: 0/83 subfases
```

### Checkpoints importantes:
- [ ] Fase 1 - Final (Día 5): App HTML/CSS/JS
- [ ] Fase 2 - Mid (Día 12): React setup + componentes base
- [ ] Fase 2 - Final (Día 18): SPA completa
- [ ] Fase 3 - Mid (Día 23): Firebase fully synced
- [ ] Fase 3 - Final (Día 27): Deploy en vivo

---

## 📝 Cómo Usar Este Documento

1. **Diario**: Al comenzar cada día, revisa las tareas del día
2. **Commits**: Sigue los commits sugeridos exactamente (ayuda con tracking)
3. **Actualización**: Marca ✅ cada tarea completada
4. **Blockers**: Si algo está bloqueado, documenta en `PROGRESO.md`
5. **Deviations**: Si necesitas cambiar duración, actualiza aquí

---

**Documento versión**: 1.0  
**Última actualización**: Abril 2026  
**Responsable**: Project Manager  
**Próxima actualización**: Diariamente durante ejecución

