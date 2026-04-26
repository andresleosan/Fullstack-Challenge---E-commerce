# 🛍️ Fullstack Challenge - E-commerce

Proyecto e-commerce construido con React + TypeScript, diseño responsive y arquitectura por componentes.

---

## 🎯 Estado Actual

| Métrica | Estado |
|---|---|
| Fase | ✅ Fases funcionales completadas |
| Progreso | ✅ Implementación funcional end-to-end |
| Build | ✅ `npm run build` exitoso |
| Deploy | ✅ Cloudflare Pages |

---

## ✅ Funcionalidades implementadas

- Catálogo con datos de `https://fakestoreapi.com/products`.
- Búsqueda, filtros y paginación.
- Carrito, checkout y perfil.
- Autenticación y rutas protegidas.
- Órdenes (`/orders`) y detalle de orden (`/orders/:id`).
- Panel admin (`/admin`) con CRUD simulado en estado local.
- Notificaciones con `react-hot-toast`.
- UI responsive mobile-first.

---

## 🧩 Rutas reales (`src/App.tsx`)

- Públicas: `/`, `/productos/:id`, `/carrito`, `/login`, `/register`
- Protegidas: `/checkout`, `/profile`, `/orders`, `/orders/:id`, `/admin`
- Fallback: `*` → `/`

---

## 🛠️ Stack real

- React 18
- TypeScript 5
- Vite
- React Router DOM 6
- Zustand
- Firebase SDK
- Axios
- react-hot-toast
- CSS puro con variables

---

## 🚀 Inicio rápido

```bash
git clone https://github.com/andresleosan/Fullstack-Challenge---E-commerce
cd Fullstack-Challenge---E-commerce
npm install
npm run dev
```

Build de producción:

```bash
npm run build
```

---

## 🌐 Deploy

- Plataforma: Cloudflare Pages
- URL: https://fullstack-challenge---e-commerce.pages.dev
- Herramienta: `wrangler` (CLI de Cloudflare, uso por comando)

---

## 📂 Estructura real resumida

```text
src/
  components/
    atoms/
    molecules/
    organisms/
    common/
  pages/
  hooks/
  store/
  styles/
  utils/
  services/
  types/
  config/
  App.tsx
```

---

## 📚 Documentación

Documentación del proyecto en `docs/`, incluyendo:

- `PROGRESO.md`
- `tech_stack.md`
- `arquitectura_del_proyecto.md`
- `fases_del_proyecto.md`
- `plan_de_desarrollo.md`
- y reportes de auditoría/estado adicionales

---

## 👤 Autor

**Andrés Santiago**
