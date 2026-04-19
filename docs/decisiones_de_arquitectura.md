# 🏗️ Decisiones de Arquitectura - ADR

## Formato ADR (Architecture Decision Records)

Documento que justifica las decisiones técnicas principales del proyecto.

---

## ADR-001: CSS Puro en lugar de Tailwind CSS

### Status: ✅ ACCEPTED

### Context
Necesitamos un sistema de estilos para la aplicación. Opciones:
- **Opción A**: Tailwind CSS (utility-first framework)
- **Opción B**: CSS Puro con Variables CSS (custom properties)
- **Opción C**: CSS-in-JS (Styled Components, Emotion)

### Decision
**Usar CSS Puro con Variables CSS (Opción B)**

### Rationale

| Criterio | Tailwind | CSS Puro | Razón |
|----------|----------|----------|-------|
| **Curva Aprendizaje** | Alta (memorizar clases) | Moderada (aprender CSS) | 🎓 Objetivo: Dominar CSS puro |
| **Bundle Size** | 50-100KB | 2-5KB | ⚡ Mejor performance |
| **Flexibilidad** | Media (limitado a clases) | Total | 🎯 Control 100% |
| **Debugging** | Complejo (DevTools) | Simple (CSS estándar) | 🐛 Mantenimiento fácil |
| **Escalabilidad** | Bien (con config) | Excellente (SMACSS/BEM) | 📈 Crecimiento a largo plazo |
| **Team Onboarding** | Requiere curso | Conocimiento transferible | 👥 Común en industria |
| **Objetivo Pedagógico** | No enseña CSS | ✅ Enseña fundamentals | 🎓 Key para junior developers |

### Consequences

**Ventajas**:
- ✅ Bundle más pequeño
- ✅ Aprendizaje profundo de CSS
- ✅ Total control visual
- ✅ Sin dependencias en Tailwind
- ✅ Mejor debugging

**Desventajas**:
- ❌ Más CSS para escribir
- ❌ Menos "velocidad" en prototipado
- ❌ Requiere disciplina (BEM pattern)

### Mitigation
- Usar Variables CSS sistematizadas (no copypasta)
- Documentar patrones de naming (BEM)
- Code review para estilos

---

## ADR-002: Context API en Fase 2 en lugar de Redux/Zustand

### Status: ✅ ACCEPTED (FASE 2)

### Context
Necesitamos state management para el carrito, usuario, productos.

Opciones:
- **Opción A**: Redux (predecible, boilerplate alto)
- **Opción B**: Zustand (simple, hooks-first)
- **Opción C**: Context API + useReducer (nativa React)

### Decision
**Usar Context API + useReducer en Fase 2**

### Rationale

| Criterio | Redux | Zustand | Context API |
|----------|-------|---------|------------|
| **Curva Aprendizaje** | Empinada | Suave | Nativa |
| **Bundle Size** | ~5KB | ~2KB | 0KB (built-in) |
| **Boilerplate** | Alto | Medio | Bajo |
| **DevTools** | Excellente | Good | Básico |
| **Scalabilidad** | Excellente | Good | Media (OK para esta app) |
| **Para esta app** | Overkill | Good | ✅ Suficiente |

### Decision Logic

**Fase 2** es dónde aprender React fundamentals. Context API es parte de React core y es lo que TODO developer React debe dominar. Zustand es un lujo para proyectos que necesitan más.

En **Fase 3**, si migramos a Firebase Firestore, la sincronización real-time elimina buena parte del state management local.

### Consequences

**Ventajas**:
- ✅ Nativa de React (sin dependencias)
- ✅ Buena para estado medio
- ✅ Sirve de base para aprender Redux después
- ✅ Bundle: 0KB adicional

**Desventajas**:
- ❌ Si crece mucho, refactorizar a Redux es trabajoso
- ❌ DevTools limitada

### Mitigation
- Estructura clara con custom hooks
- Documentación de flujo en `arquitectura_del_proyecto.md`
- Prepararse para migración a Firestore en Fase 3

---

## ADR-003: Vite como Build Tool

### Status: ✅ ACCEPTED

### Context
¿Qué build tool usar para React?
- **Opción A**: Create React App (CRA)
- **Opción B**: Vite
- **Opción C**: Webpack manual

### Decision
**Usar Vite**

### Rationale

| Criterio | CRA | Vite | Webpack |
|----------|-----|------|---------|
| **Dev Server** | ~3-5s | <1s | Lento |
| **HMR** | Bueno | Instantáneo | Lento |
| **Build Size** | Grande | Optimizado | Variable |
| **Config** | Zero-config | Mínima | Compleja |
| **ESM** | No | ✅ Nativo | Tradicional |
| **Comunidad** | Grande | Creciendo | Madura |

### Decision Logic

Vite ofrece la mejor DX (Developer Experience) con:
- HMR instantáneo (feedback rápido)
- Build más rápido
- ESM nativo en desarrollo
- Configuración mínima

CRA es más "estable" pero Vite es el future de tooling en JavaScript.

### Consequences

**Ventajas**:
- ✅ Desarrollo faster (HMR instant)
- ✅ Build optimizado
- ✅ Menos config
- ✅ Industry standard moderno

**Desventajas**:
- ❌ Comunidad aún más pequeña que CRA
- ❌ Menos presets específicos

---

## ADR-004: Firebase Firestore para Backend (Fase 3)

### Status: ✅ ACCEPTED (FASE 3)

### Context
Necesitamos backend para Fase 3. Opciones:
- **Opción A**: Node.js + Express + MongoDB (self-hosted)
- **Opción B**: Firebase Firestore + Functions
- **Opción C**: Supabase (Postgres)

### Decision
**Usar Firebase Firestore + Auth**

### Rationale

| Criterio | Node+Express | Firebase | Supabase |
|----------|--------------|----------|----------|
| **Setup Time** | Días (DB, server, deploy) | Minutos | Horas |
| **Hosting** | Requiere VPS | Incluido | Requiere Heroku/etc |
| **Real-time** | Implementar manual | ✅ Built-in | WebSockets |
| **Auth** | Implementar | ✅ Out-of-the-box | Buen soporte |
| **Free Tier** | Limitado | ✅ Generous (50K reads/writes/día) | Good |
| **Escalabilidad** | Manual | ✅ Automática | Manual |
| **DevOps** | Alto | Mínimo | Medio |

### Decision Logic

Para un proyecto de aprendizaje, Firebase es ideal:
- Setup rápido (focus en features, no DevOps)
- Real-time listeners (buen UX)
- Free tier generoso
- Sincronización bidireccional nativa

Node.js sería overhead para esta app. Supabase es buena opción pero Firebase es más rápido.

### Consequences

**Ventajas**:
- ✅ Setup en minutos
- ✅ Real-time out-of-the-box
- ✅ Auth integrada
- ✅ Hosting incluido
- ✅ Escalabilidad automática
- ✅ Free tier suficiente

**Desventajas**:
- ❌ Vendor lock-in (Google ecosystem)
- ❌ Firestore model vs SQL (aprendizaje)
- ❌ Sin queries SQL complejas

### Mitigation
- Documentar Firestore schema bien
- Prepararse para migración futura si es necesario
- Usar abstracciones (custom hooks) para facilitar cambios

---

## ADR-005: TypeScript para Type Safety

### Status: ✅ ACCEPTED

### Context
¿Usar TypeScript o JavaScript?

### Decision
**TypeScript 5.x en todo el proyecto**

### Rationale

| Criterio | JavaScript | TypeScript |
|----------|-----------|-----------|
| **Type Safety** | 0 (dynamic) | ✅ Compile-time checking |
| **IDE Support** | Básico | ✅ Excellente autocompletion |
| **Refactoring Seguro** | Riesgoso | ✅ Safe |
| **Documentación** | Comments | ✅ Types as docs |
| **Bugs** | Detectados en runtime | ✅ En compilación |
| **Industry Standard** | Menos común | ✅ Expected en 2024 |

Para un proyecto que durará 4 semanas y será evaluado, TypeScript es essencial.

### Consequences

**Ventajas**:
- ✅ Menos bugs
- ✅ Mejor documentación
- ✅ Refactoring seguro
- ✅ Skill moderno

**Desventajas**:
- ❌ Build extra step
- ❌ Curva aprendizaje

---

## ADR-006: Atomic Design para Estructura de Componentes

### Status: ✅ ACCEPTED

### Context
¿Cómo organizar componentes React?

Opciones:
- **Opción A**: Por página/feature (folder-by-feature)
- **Opción B**: Atomic Design (atoms, molecules, organisms)
- **Opción C**: Flat structure (todos en components/)

### Decision
**Atomic Design** (atoms → molecules → organisms → templates)

### Rationale

Atomic Design ofrece:
- ✅ Jerarquía clara
- ✅ Reutilización incentivada
- ✅ Escalable a proyectos grandes
- ✅ Fácil onboarding nuevos devs
- ✅ Facilita documentación de componentes

### Consequences

**Ventajas**:
- ✅ Modularidad
- ✅ Reutilización
- ✅ Escalabilidad
- ✅ Documentation-friendly

**Desventajas**:
- ❌ Puede ser over-engineered para apps pequeñas
- ❌ Jerarquía puede crear indecisión

---

## ADR-007: 3 Fases Progresivas (HTML → React → Firebase)

### Status: ✅ ACCEPTED

### Context
¿Enfoque lineal o iterativo?

### Decision
**3 fases de aprendizaje lineal con incremento de complejidad**

### Rationale

**Fase 1 (HTML/CSS/JS puro)**:
- Dominar fundamentals web
- Sin frameworks noise
- App completamente funcional

**Fase 2 (React)**:
- Aprender componentes, hooks, state
- Todavía sin backend complexity
- Consolidar React skills

**Fase 3 (Firebase)**:
- Aprender backend
- Real-time data sync
- Deployment

### Advantages
- ✅ Cada fase construye sobre anterior
- ✅ Aprendizaje profundo, no superficial
- ✅ Fácil de entender progreso
- ✅ Minimiza distracciones
- ✅ Problem-solving incremental

---

## ADR-008: Dark Mode Moderno (Default)

### Status: ✅ ACCEPTED

### Context
¿Light o dark mode?

### Decision
**Dark mode por defecto** (cyan/turquoise accents)

### Rationale
- 2024: Dark mode es esperado
- Menos strain ocular
- Mejor para aplicaciones modernas/tech
- Accesibilidad: contraste cuidado

---

## ADR-009: 30+ Commits Frecuentes

### Status: ✅ ACCEPTED

### Context
¿Tamaño de commits?

### Decision
**Commits pequeños y frecuentes** (1 por subfase pequeña)

Ejemplo:
```
init: project setup
style: CSS variables
feat: Button component
feat: ProductCard component
feat: ProductGallery organism
feat: CartContext store
feat: Home page routing
test: mobile responsive
... (30+ commits total)
```

### Rationale
- ✅ Trackea progreso real
- ✅ Fácil revertir cambios
- ✅ Clear history para código review
- ✅ Demuestra trabajo incremental

---

## ADR-010: Mockdata en Fase 2, Real API en Fase 3

### Status: ✅ ACCEPTED

### Context
¿Cuándo integrar API real?

### Decision
- **Fase 2**: Mockdata estática
- **Fase 3**: FakeStore API → Firebase

### Rationale
- ✅ Fase 2 focus en React, no troubleshooting API
- ✅ Error handling puede añadirse en Fase 3
- ✅ Evita overhead en Fase 2
- ✅ Migración a Firebase es clean

---

## ADR-011: localStorage en Fase 2, Firestore en Fase 3

### Status: ✅ ACCEPTED

### Context
¿Dónde guardar datos?

### Decision
- **Fase 2**: localStorage (browser storage)
- **Fase 3**: Firestore (cloud + auth)

### Rationale
- Fase 2: Aprende Context + localStorage (fundamentals)
- Fase 3: Aprende Firestore (real backend)
- Migración es arquitecturally clean

---

## ADR-012: Admin Panel en Fase 3

### Status: ✅ ACCEPTED

### Context
¿Incluir admin panel?

### Decision
**Admin panel básico (CRUD productos) en Fase 3**

### Rationale
- ✅ Bonus educativo
- ✅ Demuestra Firestore + auth + roles
- ✅ No essencial para MVP
- ✅ Fase 3 tiene tiempo

---

## 📊 Matriz de Decisiones

| ADR | Decisión | Alternativa | Razón |
|-----|----------|------------|-------|
| 001 | CSS Puro | Tailwind | Educativo + Performance |
| 002 | Context API | Redux | Suficiente + Nativa |
| 003 | Vite | CRA | DX + Modern |
| 004 | Firebase | Node.js | Simplicity + DevOps |
| 005 | TypeScript | JavaScript | Safety + Industry |
| 006 | Atomic Design | Feature-first | Scalability + Modularity |
| 007 | 3 Fases | Iterativo | Learning curve |
| 008 | Dark Mode | Light | Modern + UX |
| 009 | 30+ Commits | Pocos commits | Traceability |
| 010 | Mock/Real split | Todo real | Learning focused |
| 011 | Storage migration | Directo Firestore | Progressive learning |
| 012 | Admin in Phase 3 | Omitir | Bonus educativo |

---

**Documento versión**: 1.0  
**Última actualización**: Abril 2026  
**Responsable**: Architecture Review Board  
**Próxima revisión**: Cuando surjan nuevas decisiones

