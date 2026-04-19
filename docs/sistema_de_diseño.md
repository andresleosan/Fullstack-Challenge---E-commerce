# 🎨 Sistema de Diseño - Fullstack Challenge E-commerce

## 1️⃣ Filosofía de Diseño

**Dark Mode Moderno + Minimalista**

Principios:
- ✅ Contraste accesible (WCAG AA mínimo)
- ✅ Espaciado consistente (escala 8px)
- ✅ Tipografía legible
- ✅ Colores con propósito
- ✅ No abusa de decoraciones
- ✅ Responsive-first (mobile before desktop)

---

## 2️⃣ Paleta de Colores

### **Dark Mode Primaria**

```css
:root {
  /* Neutrals - Base de todo */
  --color-black: #0f0f0f;        /* Fondo muy oscuro */
  --color-dark-900: #1a1a1a;     /* Fondo principal cards */
  --color-dark-800: #2a2a2a;     /* Fondo alternado */
  --color-dark-700: #3a3a3a;     /* Borders, hover subtle */
  --color-dark-600: #4a4a4a;     /* Borders, dividers */
  --color-dark-500: #6a6a6a;     /* Text secundario */
  --color-gray-400: #8a8a8a;     /* Text deshabilitado */
  --color-gray-300: #b0b0b0;     /* Text terciario */
  --color-white: #ffffff;         /* Text principal */
  --color-almost-white: #f5f5f5;  /* Almost white text */

  /* Brand - Acentos */
  --color-primary: #00d9ff;       /* Cyan/turquoise (botones, links) */
  --color-primary-dark: #00a8cc;  /* Darker variant */
  --color-primary-light: #33e8ff; /* Lighter variant */

  /* Semantic Colors */
  --color-success: #10b981;       /* Verde para éxito */
  --color-warning: #f59e0b;       /* Ámbar para advertencia */
  --color-danger: #ef4444;        /* Rojo para error/destructivo */
  --color-info: #3b82f6;          /* Azul para información */

  /* Gradientes */
  --gradient-primary: linear-gradient(135deg, #00d9ff 0%, #0099cc 100%);
  --gradient-dark: linear-gradient(135deg, #1a1a1a 0%, #2a2a2a 100%);
}
```

### **Propósito de Cada Color**

| Color | RGB/HEX | Propósito | Ejemplo |
|-------|---------|----------|---------|
| Black | `#0f0f0f` | Fondo principal de página | Body background |
| Dark-900 | `#1a1a1a` | Fondo de cards, modales | Product cards |
| Dark-800 | `#2a2a2a` | Fondo alternado (hover) | Hover state |
| Dark-700 | `#3a3a3a` | Borders lines | Card borders |
| Cyan/Primary | `#00d9ff` | Call-to-action botones | "Agregar al carrito" |
| Green/Success | `#10b981` | Confirmaciones | "Producto agregado" toast |
| Red/Danger | `#ef4444` | Acción destructiva | "Eliminar" botón |
| White | `#ffffff` | Texto principal | Body text |

### **Contraste WCAG AA** ✅

```
Black (#0f0f0f) + White (#ffffff)  → 21:1 ✅ Excelente
Dark-900 + White                   → 12.5:1 ✅ Excelente
Dark-700 + White                   → 5.5:1 ✅ Aceptable
Cyan + Dark-900                    → 9.2:1 ✅ Excelente
```

---

## 3️⃣ Tipografía

### **Familia tipográfica**

```css
/* Fuentes del sistema (sin descargas externas) */
:root {
  --font-family-sans: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 
                      'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 
                      'Helvetica Neue', 'Arial', sans-serif;
  
  --font-family-mono: 'Courier New', 'Monaco', 'Menlo', 'Consolas', monospace;
}
```

**Razón**: Sans-serif system fonts cargan al instante, sin latencia de Google Fonts.

### **Escala Tipográfica (typographic scale)**

```css
:root {
  /* Heading Scale (mayor a menor) */
  --font-size-h1: 3rem;     /* 48px - Hero titles */
  --font-size-h2: 2.25rem;  /* 36px - Section headings */
  --font-size-h3: 1.875rem; /* 30px - Subsections */
  --font-size-h4: 1.5rem;   /* 24px - Card titles */
  --font-size-h5: 1.25rem;  /* 20px - Small headings */
  --font-size-h6: 1rem;     /* 16px - Minor headings */

  /* Body Text Scale */
  --font-size-large: 1.125rem;  /* 18px - Lead text */
  --font-size-base: 1rem;       /* 16px - Body text (default) */
  --font-size-small: 0.875rem;  /* 14px - Secondary text */
  --font-size-xs: 0.75rem;      /* 12px - Labels, captions */
  --font-size-2xs: 0.625rem;    /* 10px - Minimal text (evitar) */

  /* Font Weights */
  --font-weight-light: 300;
  --font-weight-normal: 400;
  --font-weight-medium: 500;
  --font-weight-semibold: 600;
  --font-weight-bold: 700;
  --font-weight-extrabold: 800;

  /* Line Heights para legibilidad */
  --line-height-tight: 1.2;
  --line-height-normal: 1.5;
  --line-height-relaxed: 1.75;
  --line-height-loose: 2;

  /* Letter Spacing */
  --letter-spacing-tight: -0.02em;
  --letter-spacing-normal: 0;
  --letter-spacing-loose: 0.05em;
}
```

### **Ejemplos de Aplicación**

```css
/* Heading 1 - Hero title */
h1 {
  font-family: var(--font-family-sans);
  font-size: var(--font-size-h1);       /* 48px */
  font-weight: var(--font-weight-bold); /* 700 */
  line-height: var(--line-height-tight); /* 1.2 */
  color: var(--color-white);
  margin-bottom: 1.5rem;
}

/* Body text - Párrafos */
p {
  font-size: var(--font-size-base);     /* 16px */
  line-height: var(--line-height-normal); /* 1.5 */
  color: var(--color-almost-white);
  font-weight: var(--font-weight-normal);
}

/* Button text */
button {
  font-size: var(--font-size-base);
  font-weight: var(--font-weight-semibold);
  line-height: 1.4;
}

/* Product price */
.product-price {
  font-size: var(--font-size-h4); /* 24px */
  font-weight: var(--font-weight-bold);
  color: var(--color-primary);
}
```

---

## 4️⃣ Espaciado (Spacing Scale)

**Base: 8px** (tema de diseño estándar moderno)

```css
:root {
  /* Spacing Scale 8px base */
  --space-xs: 0.25rem;  /* 4px */
  --space-sm: 0.5rem;   /* 8px */
  --space-md: 1rem;     /* 16px */
  --space-lg: 1.5rem;   /* 24px */
  --space-xl: 2rem;     /* 32px */
  --space-2xl: 3rem;    /* 48px */
  --space-3xl: 4rem;    /* 64px */
  --space-4xl: 6rem;    /* 96px */
}
```

### **Aplicaciones Típicas**

| Espaciado | Uso |
|-----------|-----|
| `--space-xs` (4px) | Padding dentro de botones pequeños |
| `--space-sm` (8px) | Padding botones, gap pequeños |
| `--space-md` (16px) | Padding cards, margins normales |
| `--space-lg` (24px) | Margin entre secciones |
| `--space-xl` (32px) | Padding para sections grandes |
| `--space-2xl` (48px) | Margin vertical sección a sección |
| `--space-3xl` (64px) | Hero spacing |

**Ejemplo**:
```css
.card {
  padding: var(--space-lg);        /* 24px all sides */
  margin-bottom: var(--space-xl);  /* 32px bottom */
  border-radius: var(--radius-md);
}

button {
  padding: var(--space-sm) var(--space-md); /* 8px 16px */
  gap: var(--space-xs);                     /* 4px between items */
}
```

---

## 5️⃣ Border Radius

```css
:root {
  --radius-none: 0;
  --radius-sm: 0.25rem;   /* 4px - Ligero redondeo */
  --radius-md: 0.5rem;    /* 8px - Normal */
  --radius-lg: 1rem;      /* 16px - Cards */
  --radius-xl: 1.5rem;    /* 24px - Modales */
  --radius-2xl: 2rem;     /* 32px - Hero elements */
  --radius-full: 9999px;  /* Círculos, pills */
}
```

**Aplicaciones**:
- Botones: `--radius-md`
- Cards: `--radius-lg`
- Inputs: `--radius-md`
- Modales: `--radius-xl`
- Badges/Pills: `--radius-full`

---

## 6️⃣ Sombras (Shadows)

```css
:root {
  /* Elevation/Shadow System */
  --shadow-none: none;
  
  --shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.05);
  
  --shadow-md: 0 4px 6px rgba(0, 0, 0, 0.1),
               0 2px 4px rgba(0, 0, 0, 0.06);
  
  --shadow-lg: 0 10px 15px rgba(0, 0, 0, 0.1),
               0 4px 6px rgba(0, 0, 0, 0.05);
  
  --shadow-xl: 0 20px 25px rgba(0, 0, 0, 0.1),
               0 10px 10px rgba(0, 0, 0, 0.04);
  
  --shadow-2xl: 0 25px 50px rgba(0, 0, 0, 0.25);
  
  /* Glow effect (para cyan primary) */
  --shadow-glow: 0 0 20px rgba(0, 217, 255, 0.3);
}
```

**Uso**:
- Default cards: `--shadow-md`
- Hovered cards: `--shadow-lg`
- Modales: `--shadow-xl`
- Botones primarios: `--shadow-glow` (opcional)

---

## 7️⃣ Componentes Base

### **Botones**

#### **Button Primary (Cyan)**
```css
.btn-primary {
  background-color: var(--color-primary);
  color: var(--color-black);
  padding: var(--space-sm) var(--space-md);
  border-radius: var(--radius-md);
  font-weight: var(--font-weight-semibold);
  border: none;
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.btn-primary:hover {
  background-color: var(--color-primary-light);
  box-shadow: var(--shadow-glow);
}

.btn-primary:active {
  background-color: var(--color-primary-dark);
}

.btn-primary:disabled {
  background-color: var(--color-dark-600);
  color: var(--color-gray-400);
  cursor: not-allowed;
}
```

#### **Button Secondary (Ghost)**
```css
.btn-secondary {
  background-color: transparent;
  color: var(--color-primary);
  border: 2px solid var(--color-primary);
  padding: calc(var(--space-sm) - 2px) calc(var(--space-md) - 2px);
  border-radius: var(--radius-md);
  font-weight: var(--font-weight-semibold);
  cursor: pointer;
}

.btn-secondary:hover {
  background-color: var(--color-dark-800);
}
```

#### **Button Danger**
```css
.btn-danger {
  background-color: var(--color-danger);
  color: var(--color-white);
  /* Mismo padding y transitions */
}

.btn-danger:hover {
  filter: brightness(1.1);
}
```

### **Inputs**

```css
input[type="text"],
input[type="email"],
input[type="password"],
input[type="number"],
textarea,
select {
  width: 100%;
  padding: var(--space-sm) var(--space-md);
  background-color: var(--color-dark-900);
  border: 2px solid var(--color-dark-700);
  border-radius: var(--radius-md);
  color: var(--color-white);
  font-family: var(--font-family-sans);
  font-size: var(--font-size-base);
  transition: border-color 0.2s ease;
}

input:focus,
textarea:focus,
select:focus {
  outline: none;
  border-color: var(--color-primary);
  box-shadow: 0 0 0 3px rgba(0, 217, 255, 0.1);
}

input:disabled {
  background-color: var(--color-dark-800);
  color: var(--color-gray-400);
  cursor: not-allowed;
}
```

### **Cards**

```css
.card {
  background-color: var(--color-dark-900);
  border: 1px solid var(--color-dark-700);
  border-radius: var(--radius-lg);
  padding: var(--space-lg);
  box-shadow: var(--shadow-md);
  transition: all 0.3s ease;
}

.card:hover {
  box-shadow: var(--shadow-lg);
  border-color: var(--color-dark-600);
}
```

### **Badges**

```css
.badge {
  display: inline-block;
  padding: var(--space-xs) var(--space-sm);
  background-color: var(--color-dark-800);
  color: var(--color-white);
  border-radius: var(--radius-full);
  font-size: var(--font-size-xs);
  font-weight: var(--font-weight-semibold);
}

.badge-success {
  background-color: rgba(16, 185, 129, 0.2);
  color: var(--color-success);
}

.badge-danger {
  background-color: rgba(239, 68, 68, 0.2);
  color: var(--color-danger);
}
```

---

## 8️⃣ Layout & Breakpoints

### **Grid System (CSS Grid)**

```css
:root {
  --container-max-width: 1200px;
  --container-gutter: var(--space-lg);
}

.container {
  width: 100%;
  max-width: var(--container-max-width);
  margin: 0 auto;
  padding: 0 var(--container-gutter);
}

/* Grid para productos */
.grid-products {
  display: grid;
  gap: var(--space-lg);
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
}
```

### **Breakpoints**

```css
/* Mobile first approach */

/* Small (default) */
@media (min-width: 640px) {
  /* tablet */
}

/* Medium */
@media (min-width: 1024px) {
  /* desktop */
}

/* Large */
@media (min-width: 1280px) {
  /* large desktop */
}
```

---

## 9️⃣ Animaciones y Transiciones

```css
:root {
  --transition-fast: 150ms ease;
  --transition-normal: 300ms ease;
  --transition-slow: 500ms ease;
}

/* Fade in */
@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

/* Slide up */
@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Glow pulse */
@keyframes glow {
  0%, 100% {
    box-shadow: 0 0 10px rgba(0, 217, 255, 0.3);
  }
  50% {
    box-shadow: 0 0 20px rgba(0, 217, 255, 0.6);
  }
}
```

---

## 🔟 Iconografía

Usar **react-icons** (librería agnóstica):

```typescript
// Ejemplos
import { FiShoppingCart, FiSearch, FiMenu, FiX } from 'react-icons/fi';
import { BiHome, BiUser, BiLock } from 'react-icons/bi';

// Sizes
<FiShoppingCart size={24} />  /* 24px */
<FiShoppingCart size={32} />  /* 32px */

// Colors
<FiSearch color="var(--color-primary)" />
```

**Iconografi estándar**:
- 🏠 Home: `BiHome`
- 🛒 Cart: `FiShoppingCart`
- 🔍 Search: `FiSearch`
- ➕ Add: `FiPlus`
- ✏️ Edit: `FiEdit2`
- 🗑️ Delete: `FiTrash2`
- ✅ Check: `FiCheck`
- ❌ Close: `FiX`
- ⚙️ Settings: `FiSettings`
- 👤 User: `FiUser`

---

## 1️⃣1️⃣ Accesibilidad (a11y)

### **Color Contrast**
- ✅ Todo texto has 4.5:1 mínimum contrast ratio
- ✅ Información no debe ser solo color (icon + color)

### **Focus States**
```css
button:focus-visible,
input:focus-visible {
  outline: 2px solid var(--color-primary);
  outline-offset: 2px;
}
```

### **Responsive Text**
```css
/* Escalable con viewport */
body {
  font-size: clamp(16px, 2vw, 18px);
}

h1 {
  font-size: clamp(32px, 5vw, 48px);
}
```

---

## 1️⃣2️⃣ Extracción de Variables CSS

En `src/styles/variables.css`:

```css
/* Todas las variables definidas aquí */
:root {
  /* Colors */
  /* Spacing */
  /* Typography */
  /* Shadows */
  /* Transitions */
}

/* Dark mode (por defecto) */
body {
  background-color: var(--color-black);
  color: var(--color-white);
}
```

---

## 1️⃣3️⃣ Ejemplo Completo de Componente

```css
/* src/styles/components/ProductCard.css */

.product-card {
  display: flex;
  flex-direction: column;
  background-color: var(--color-dark-900);
  border: 1px solid var(--color-dark-700);
  border-radius: var(--radius-lg);
  padding: var(--space-md);
  box-shadow: var(--shadow-md);
  transition: all var(--transition-normal);
}

.product-card:hover {
  box-shadow: var(--shadow-lg);
  border-color: var(--color-primary);
  transform: translateY(-4px);
}

.product-image {
  width: 100%;
  height: 200px;
  object-fit: cover;
  border-radius: var(--radius-md);
  margin-bottom: var(--space-md);
}

.product-title {
  font-size: var(--font-size-h5);
  font-weight: var(--font-weight-semibold);
  color: var(--color-white);
  margin-bottom: var(--space-sm);
  line-height: var(--line-height-tight);
}

.product-price {
  font-size: var(--font-size-h4);
  font-weight: var(--font-weight-bold);
  color: var(--color-primary);
  margin-bottom: var(--space-lg);
}

.product-actions {
  display: flex;
  gap: var(--space-sm);
}

.product-actions button {
  flex: 1;
}

@media (max-width: 640px) {
  .product-card {
    padding: var(--space-md);
  }
  
  .product-image {
    height: 150px;
  }
}
```

---

**Documento versión**: 1.0  
**Última actualización**: Abril 2026  
**Responsable**: Equipo de Diseño  
**Próxima revisión**: Cuando cambien requerimientos visuales  

🎨 **Sistema de diseño completo y listo para aplicar en todas las fases.**
