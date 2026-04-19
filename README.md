# 🛍️ Fullstack Challenge - E-commerce

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Node.js](https://img.shields.io/badge/Node.js-18+-green)](https://nodejs.org/)
[![React](https://img.shields.io/badge/React-18+-blue)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5+-blue)](https://www.typescriptlang.org/)
[![Firebase](https://img.shields.io/badge/Firebase-10+-orange)](https://firebase.google.com/)

**Proyecto de aprendizaje Full Stack** - E-commerce moderno con React, TypeScript y Firebase.

---

## 🎯 Estado Actual

| Métrica | Estado |
|---------|--------|
| **Fase** | 🔴 Planificación → Fase 1 (Próximamente) |
| **Progreso** | 0% (Documentación: 100% ✅) |
| **Commits** | 0/55+ |
| **Documentación** | 100% (10 documentos) |
| **Deploy** | ⏳ Pendiente Fase 3 |

📊 **[Ver progreso detallado](docs/PROGRESO.md)** &nbsp;|&nbsp; 📈 **[Ver plan de desarrollo](docs/plan_de_desarrollo.md)**

---

## 🚀 Características Principales

### ✅ Funcionalidades Core (del PDF)
- 🔐 Autenticación de usuarios (simulada Fase 2 → Firebase Fase 3)
- 🏪 Galería de productos desde API
- 🔍 Búsqueda en tiempo real
- 🏷️ Filtrado por categoría y rango de precios
- 📄 Paginación de productos
- 🛒 Carrito de compras funcional
- 💳 Checkout con vista previa
- 📱 Diseño responsive (mobile, tablet, desktop)
- 💾 Persistencia de sesión entre visitas

### 🎁 Funcionalidades Bonus
- 👤 Perfil de usuario con historial de compras
- 🔔 Notificaciones visuales (toasts)
- 🌙 Dark mode moderno
- 👨‍💼 Panel de administrador básico (Fase 3)
- 📊 Validación avanzada de formularios
- 🚀 Deploy en producción

---

## 📚 Documentación (DDD)

La documentación es el **epicentro** del proyecto. Todo está en [docs/](docs/):

| Documento | Propósito | Lecturas |
|-----------|----------|---------|
| **[alcance_del_proyecto.md](docs/alcance_del_proyecto.md)** | Qué incluye, qué no, criterios de éxito | 5 min |
| **[tech_stack.md](docs/tech_stack.md)** | Tecnologías usadas, justificaciones, config | 10 min |
| **[sistema_de_diseño.md](docs/sistema_de_diseño.md)** | Paleta de colores, tipografía, componentes CSS | 15 min |
| **[arquitectura_del_proyecto.md](docs/arquitectura_del_proyecto.md)** | Estructura React, flujos, hooks, state management | 15 min |
| **[fases_del_proyecto.md](docs/fases_del_proyecto.md)** | 3 fases con subfases detalladas | 10 min |
| **[plan_de_desarrollo.md](docs/plan_de_desarrollo.md)** | Roadmap con tareas atómicas, timeline, commits | 15 min |
| **[estructura_firestore.md](docs/estructura_firestore.md)** | Schema de colecciones, rules, operaciones | 10 min |
| **[decisiones_de_arquitectura.md](docs/decisiones_de_arquitectura.md)** | ADR - Por qué cada decisión técnica | 10 min |
| **[PROGRESO.md](docs/PROGRESO.md)** | Estado actual + checklists por fase | 5 min |

**Total**: ~85 min de documentación = **Conocimiento completo del proyecto** ✅

---

## 🛠️ Stack Tecnológico

### Frontend
- **React 18.x** - Librería UI
- **TypeScript 5.x** - Type safety
- **Vite** - Build tool ultra-rápido
- **React Router 6.x** - Navegación SPA
- **CSS Puro** - Estilos (sin Tailwind)
  - Variables CSS para diseño consistente
  - Arquitectura BEM para escalabilidad
  - Dark mode moderno (colores cuidados)

### State Management (por fase)
- **Fase 2**: Context API + useReducer
- **Fase 3**: Firebase Firestore (real-time sync)

### HTTP & Async
- **Axios** - Cliente HTTP
- **FakeStore API** - Datos de productos (Fase 3)

### Backend (Fase 3)
- **Firebase Firestore** - Base de datos NoSQL
- **Firebase Auth** - Autenticación
- **Firebase Hosting** - Deploy

### Utilities & Librerías
- **react-hot-toast** - Notificaciones visuales
- **react-icons** - Iconografía consistente
- **Vitest** - Testing (Fase 3)

### Development
- **ESLint** - Linting
- **Prettier** - Formateo automático
- **TypeScript Compiler** - Type checking

---

## 📋 Requisitos del Sistema

### Instalación Requerida
```bash
# Node.js 18+ y npm 9+
node -v          # Debe ser >= 18.0.0
npm -v           # Debe ser >= 9.0.0

# Git
git --version    # Debe estar instalado
```

### Crear Cuenta (Fase 3)
- Firebase Account: https://console.firebase.google.com

### Archivos de Configuración Necesarios
- `.env.local` (variables Firebase - Fase 3)
- `.gitignore` (para no versionear secretos)

---

## 🚀 Inicio Rápido

### 1️⃣ Clonar Repositorio
```bash
git clone https://github.com/andresleosan/Fullstack-Challenge---E-commerce
cd Fullstack-Challenge---E-commerce
```

### 2️⃣ Fase 1: HTML + CSS + Vanilla JS (Próximamente)
```bash
# Solo necesitas un navegador moderno
# Abre index.html en navegador para ver progreso
```

### 3️⃣ Fase 2: Instalar Dependencias React
```bash
npm install
npm run dev          # Dev server en http://localhost:5173
npm run type-check   # Validar TypeScript
npm run lint         # Linting
```

### 4️⃣ Fase 3: Setup Firebase (Cuando llegues a Fase 3)
```bash
# Crear archivo .env.local con credenciales Firebase
VITE_FIREBASE_API_KEY=xxx
VITE_FIREBASE_AUTH_DOMAIN=xxx
# ... (ver docs/tech_stack.md para detalles)

# Deploy
npm run build
npm run deploy
```

---

## 📅 Roadmap de 4 Semanas

```
SEMANA 1: Fase 1 - Maquetación HTML/CSS/JS Puro
         [████████░] 50% estimado
         📅 Días 1-5

SEMANA 2-3: Fase 2 - React + TypeScript
            [░░░░░░░░░] 0% (estará en progreso)
            📅 Días 6-18

SEMANA 4: Fase 3 - Firebase + Deploy
          [░░░░░░░░░] 0% (estará en progreso)
          📅 Días 19-28
```

**[Ver desglose completo →](docs/plan_de_desarrollo.md)**

---

## 📂 Estructura del Proyecto

```
Fullstack-Challenge---E-commerce/
├── docs/                             # 📚 DOCUMENTACIÓN (Lee primero)
│   ├── alcance_del_proyecto.md
│   ├── tech_stack.md
│   ├── sistema_de_diseño.md
│   ├── arquitectura_del_proyecto.md
│   ├── fases_del_proyecto.md
│   ├── plan_de_desarrollo.md
│   ├── estructura_firestore.md
│   ├── decisiones_de_arquitectura.md
│   └── PROGRESO.md
│
├── src/
│   ├── components/                   # Componentes React (Atomic Design)
│   │   ├── atoms/                    # Básicos (Button, Input, Badge)
│   │   ├── molecules/                # Compuestos (ProductCard, CartItem)
│   │   ├── organisms/                # Complejos (Header, ProductGallery)
│   │   └── templates/                # Layouts (MainLayout)
│   │
│   ├── pages/                        # Vistas principales
│   ├── store/                        # Context API (Fase 2) + Firestore (Fase 3)
│   ├── hooks/                        # Custom hooks reutilizables
│   ├── types/                        # TypeScript interfaces
│   ├── utils/                        # Funciones utilitarias
│   ├── styles/                       # CSS global + variables
│   ├── firebase/                     # Config Firestore (Fase 3)
│   ├── mockdata/                     # Datos ficticios (Fase 2)
│   ├── App.tsx                       # Componente raíz
│   └── main.tsx                      # Entry point
│
├── public/                           # Assets estáticos
├── index.html                        # HTML principal (Vite)
├── package.json
├── tsconfig.json
├── vite.config.ts
├── .env.local                        # Variables de entorno
├── .gitignore
└── README.md                         # ← Estás aquí

```

**[Ver estructura detallada →](docs/arquitectura_del_proyecto.md#2️⃣-estructura-de-carpetas-detallada)**

---

## 🎓 Cómo Aprender con Este Proyecto

### Fase 1: Fundamentals Web (5 días)
Focus: **HTML Semántico + CSS Puro + JavaScript**
- Empezar sin React para dominar web basics
- Implementar búsqueda, filtros, carrito en vanilla JS
- Ganar confianza en el proyecto

### Fase 2: React Mastery (8 días)
Focus: **Componentes + Hooks + State Management**
- Convertir HTML a React manteniendo funcionalidad
- Aprender Context API, custom hooks
- Consolidar conocimiento de React

### Fase 3: Backend Real (5 días)
Focus: **Firebase + Autenticación + Deploy**
- Sincronizar estado con backend
- Entender real-time databases
- Llevar a producción

**[Detalles completos de cada fase →](docs/fases_del_proyecto.md)**

---

## 👨‍💻 Decisiones de Arquitectura

| Decisión | Razón |
|----------|-------|
| **CSS Puro (no Tailwind)** | Dominar fundamentals, bundle pequeño |
| **TypeScript** | Type safety, mejor IDE support, industry standard |
| **Vite** | HMR instantáneo, build ultra-rápido |
| **Context API (Fase 2)** | Nativa React, suficiente para esta app |
| **Firebase (Fase 3)** | Setup rápido, real-time sync, no DevOps |
| **3 Fases Progresivas** | Aprendizaje profundo, no superficial |
| **Atomic Design** | Modularidad, escalabilidad, reutilización |
| **30+ Commits** | Tracking de progreso real |

**[Justificación completa (ADR) →](docs/decisiones_de_arquitectura.md)**

---

## 🧪 Testing & Validación

### Fase 1
- [ ] Responsive en 3 breakpoints (mobile/tablet/desktop)
- [ ] Cross-browser (Chrome, Firefox, Safari)
- [ ] Búsqueda, filtros, carrito funcionales
- [ ] localStorage persistiendo

### Fase 2
- [ ] TypeScript: `tsc --noEmit` sin errores
- [ ] Todos los componentes renderizando
- [ ] Context API sincronizando estado
- [ ] Responsive 100%
- [ ] Manual testing completo

### Fase 3
- [ ] Firebase Auth funcionando
- [ ] Órdenes guardándose en Firestore
- [ ] Panel de admin CRUD operacional
- [ ] Lighthouse: Performance > 85
- [ ] Deploy en vivo sin errores

**[Ver checklist de testing →](docs/plan_de_desarrollo.md)**

---

## 📊 Métricas de Éxito

Después del deploy en Fase 3:

| Métrica | Target | Verificar |
|---------|--------|----------|
| **Commits** | 55+ | `git log --oneline \| wc -l` |
| **Documentación** | 100% | Todos los docs actualizados ✅ |
| **Funcionalidades** | 25/25 | Checklist en PROGRESO.md |
| **TypeScript** | 0 errores | `npm run type-check` limpio |
| **Cobertura moral** | ~100% | Probado manual en vivo |
| **Performance** | Lighthouse > 85 | Ver reporte en docs/ |
| **Bundle Size** | < 300KB | `npm run build` output |

---

## 🔗 Enlaces Importantes

### Documentación del Proyecto
- 📖 [Alcance completo](docs/alcance_del_proyecto.md)
- 🛠️ [Tech Stack](docs/tech_stack.md)
- 🎨 [Sistema de Diseño](docs/sistema_de_diseño.md)
- 🏗️ [Arquitectura](docs/arquitectura_del_proyecto.md)
- 📅 [Fases del Proyecto](docs/fases_del_proyecto.md)
- 📋 [Plan de Desarrollo](docs/plan_de_desarrollo.md)
- 🔥 [Firestore Schema](docs/estructura_firestore.md)
- 🏛️ [Decisiones (ADR)](docs/decisiones_de_arquitectura.md)
- 📊 [Progreso Actual](docs/PROGRESO.md)

### Tecnologías
- React: https://react.dev/
- TypeScript: https://www.typescriptlang.org/
- Vite: https://vitejs.dev/
- Firebase: https://firebase.google.com/docs
- React Router: https://reactrouter.com/

### APIs
- FakeStore API: https://fakestoreapi.com/

---

## 🚨 Regla de Oro: Mantener Documentación Actualizada

⚠️ **IMPORTANTE**: Al completar cada fase/subfase:

1. ✅ Actualizar [docs/PROGRESO.md](docs/PROGRESO.md)
2. ✅ Actualizar este README.md con nuevo estado
3. ✅ Documentar decisiones en [docs/decisiones_de_arquitectura.md](docs/decisiones_de_arquitectura.md)
4. ✅ Revisar si hay cambios en otros docs/

**La documentación = Primera Prioridad** 📚

---

## 📞 Guía de Solución de Problemas

### ¿Por dónde empiezo?
✅ Leer [docs/alcance_del_proyecto.md](docs/alcance_del_proyecto.md) (5 min)

### ¿Cuál es el plan?
✅ Ver [docs/fases_del_proyecto.md](docs/fases_del_proyecto.md) (10 min)

### ¿Qué debo hacer hoy?
✅ Revisar [docs/plan_de_desarrollo.md](docs/plan_de_desarrollo.md) y [docs/PROGRESO.md](docs/PROGRESO.md)

### ¿Entiendo la arquitectura?
✅ Leer [docs/arquitectura_del_proyecto.md](docs/arquitectura_del_proyecto.md) (20 min)

### ¿Por qué esta decisión?
✅ Ver [docs/decisiones_de_arquitectura.md](docs/decisiones_de_arquitectura.md)

### ¿Cuál es el esquema de Firestore?
✅ Revisar [docs/estructura_firestore.md](docs/estructura_firestore.md)

---

## 🎯 Próximas Acciones

En orden de prioridad:

1. **Hoy**: Leer alcance, tech stack, fases (~30 min)
2. **Mañana**: Comenzar Fase 1 - Maquetación HTML
3. **Semana 1.5**: Implementar Vanilla JS
4. **Semana 2**: Convertir a React + TypeScript
5. **Semana 3.5**: Integrar Firebase
6. **Semana 4**: Deploy en vivo

---

## 📜 Licencia

MIT License - Proyecto de uso educativo

---

## 👤 Autor

**Andrés Santiago**  
Desarrollador Full Stack en formación 🚀

---

## 📝 Changelog

### v1.0 - Abril 19, 2026
- ✅ Documentación completa (DDD)
- ✅ Estructura base creada
- ✅ Plan de 4 semanas definido
- ⏳ Fase 1 por comenzar

---

## 🙏 Agradecimientos

**Proyecto basado en PDF**: Fullstack Challenge - E-commerce (Curso Full Stack)  
**Gracias a**: Comunidad React, Firebase, TypeScript

---

**¿Preguntas?** Revisa la documentación en [docs/](docs/) o el [PROGRESO.md](docs/PROGRESO.md).

**¡A empezar!** 🚀
