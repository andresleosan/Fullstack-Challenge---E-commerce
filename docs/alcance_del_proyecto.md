# 📦 Alcance del Proyecto - Fullstack Challenge E-commerce

## 1️⃣ Información General

| Propiedad | Valor |
|-----------|-------|
| **Nombre del Proyecto** | Fullstack Challenge - E-commerce |
| **Repositorio** | https://github.com/andresleosan/Fullstack-Challenge---E-commerce |
| **Metodología** | DDD (Document Driven Development) |
| **Stack** | React 18 + TypeScript + Firebase + CSS Puro |
| **Fase Actual** | Planificación |
| **Estado** | 🔴 No iniciado |

---

## 2️⃣ Visión del Proyecto

Desarrollar una **aplicación web de e-commerce funcional, moderna y escalable** que demuestre dominio de:
- Desarrollo Frontend moderno con React
- Tipado seguro con TypeScript
- Gestión de estado compleja
- Backend en tiempo real con Firebase
- UX/UI coherente y responsive
- Buenas prácticas de ingeniería

---

## 3️⃣ Funcionalidades Incluidas (✅)

### **Core Features (obligatorios del PDF)**
- ✅ Registro y autenticación de usuarios (híbrido: localStorage Fase 2 → Firebase Fase 3)
- ✅ Galería de productos desde API/mockdata
- ✅ Búsqueda en tiempo real
- ✅ Paginación de productos
- ✅ Carrito de compras funcional
- ✅ Gestión de cantidades en carrito
- ✅ Cálculo automático de totales
- ✅ Previsualización de checkout
- ✅ Responsive design (mobile, tablet, desktop)
- ✅ Sesión persistente entre visitas

### **Funcionalidades Extendidas (Bonus)**
- ✅ Filtrado por categorías
- ✅ Filtrado por rango de precios
- ✅ Perfil de usuario con historial de compras
- ✅ Notificaciones visuales (toasts)
- ✅ Dark mode moderno
- ✅ Panel de administrador básico (listar, crear, editar, eliminar productos)
- ✅ Validación de formularios
- ✅ Deploy en producción (GitHub Pages o similar)

---

## 4️⃣ Funcionalidades Excluidas (❌)

- ❌ Smart recomendaciones de productos (ML)
- ❌ Chat en vivo con soporte
- ❌ Múltiples métodos de pago (sólo simulación)
- ❌ Sistema de reviews/calificaciones
- ❌ Carrito abandonado (email reminders)
- ❌ Multi-idioma (i18n avanzado)
- ❌ Análisis profundo de comportamiento (analytics)
- ❌ Integración con redes sociales (SSO)
- ❌ Compras recurrentes/suscripciones
- ❌ Sistema de cupones/promociones

---

## 5️⃣ Stakeholders

| Rol | Responsabilidad | Validación |
|-----|-----------------|-----------|
| **Desarrollador** | Implementar funcionalidades | Code reviews |
| **Instructor/Evaluador** | Validar que cumpla PDF + DDD | Guía de evaluación |
| **Usuario Final** | Navegar y comprar | Testing manual |

---

## 6️⃣ Criterios de Éxito

### **Técnicos**
- [ ] 100% funcionalidades del PDF implementadas
- [ ] TypeScript sin errores (`tsc --noEmit` limpio)
- [ ] Estructura modular y reutilizable
- [ ] Mínimo 30 commits descriptivos
- [ ] Código formateado y legible
- [ ] Responsive en 3+ breakpoints (mobile, tablet, desktop)

### **de Documentación (DDD)**
- [ ] 8+ documentos mantenidos actualizados
- [ ] README siempre reflejando estado actual
- [ ] Decisiones justificadas en ADR
- [ ] Progreso tracked en PROGRESO.md

### **de Funcionalidad**
- [ ] Autenticación completa (user profile, logout)
- [ ] Carrito persistente entre sesiones
- [ ] Búsqueda y filtros sin lag
- [ ] Checkout con validación
- [ ] Panel de admin operacional
- [ ] Notificaciones visuales en acciones clave

### **de Producción**
- [ ] Deploy exitoso en producción
- [ ] Carga rápida (< 3 segundos)
- [ ] Sin errores en consola
- [ ] Funcionamiento en Firefox, Chrome, Safari

---

## 7️⃣ Restricciones y Constraints

### **Técnicas**
- React 18.x mínimo (latest)
- TypeScript 5.x
- Firebase (Firestore + Auth)
- CSS puro (sin Tailwind)
- Vite como bundler
- Node.js 18+ para desarrollo

### **de Tiempo**
- Fase 1 (HTML/CSS): ~1 semana
- Fase 2 (React): ~1.5 semanas
- Fase 3 (Firebase): ~1 semana
- Testing & Deploy: ~3-5 días
- **Total estimado**: 4-5 semanas

### **de Datos**
- Máximo 100 productos en catálogo (mockdata)
- Máximo 50 usuarios simultaneos (free tier Firebase)
- Storage limitado a 5GB (free tier)

### **de Navegador**
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+
- Mobile browsers (iOS Safari 14+, Chrome Android)

---

## 8️⃣ Definiciones de Listo (Definition of Done)

Una funcionalidad está **"lista"** cuando:

1. ✅ Código implementado y commiteado
2. ✅ Tested manualmente en 3 dispositivos
3. ✅ TypeScript sin warnings
4. ✅ Documentación actualizada en `docs/`
5. ✅ Comentarios en código complejo
6. ✅ Sin errores en consola del navegador
7. ✅ README actualizado si afecta el flujo general

---

## 9️⃣ Dependencias Externas

### **APIs y Servicios**
- **FakeStore API** (https://fakestoreapi.com/) - Datos de productos (Fase 3)
- **Firebase Cloud Firestore** - Base de datos
- **Firebase Authentication** - Autenticación de usuarios
- **GitHub** - Control de versiones

### **Librerías NPM**
- `react-router-dom` - Navegación SPA
- `axios` - Cliente HTTP
- `react-hot-toast` - Notificaciones
- `react-icons` - Iconografía
- `firebase` - SDK oficial

---

## 🔟 Cambios Respecto al PDF Original

| Aspecto | PDF | Proyecto |
|--------|-----|---------|
| **Lenguaje** | JavaScript (ES6+) | TypeScript |
| **Estilos** | Tailwind CSS | CSS Puro |
| **Estado** | Zustand | Context API (Fase 2) + Firebase (Fase 3) |
| **Fases** | 1 fase | 3 fases con subfases |
| **Admin** | No mencionado | Incluido (Fase 3) |
| **Perfil Usuario** | No mencionado | Incluido |
| **Filtros** | Categoría + búsqueda | Categoría + precio + búsqueda |
| **Documentación** | Mínima | DDD (10+ documentos) |

---

## 1️⃣1️⃣ Métricas de Éxito

Después del deploy, medir:
- ⏱️ **Tiempo de carga** (objetivo: < 2.5s)
- 📱 **Mobile compatibility** (99%+ de funcionalidad)
- 🐛 **Bugs reportados** (objetivo: 0)
- 📝 **Cobertura de documentación** (100%)
- 💾 **Tamaño del bundle** (objetivo: < 300KB gzipped)

---

## 1️⃣2️⃣ Próximas Acciones

1. ✅ Confirmación de alcance (HECHO)
2. ⏳ Crear estructura de carpetas (EN PROGRESO)
3. ⏳ Documentar tech stack
4. ⏳ Diseñar sistema visual
5. ⏳ Inicializar Vite + React + TS
6. ⏳ Comenzar Fase 1

---

**Documento versión**: 1.0  
**Última actualización**: Abril 2026  
**Responsable**: Equipo de Desarrollo  
**Meta**: Guía definitiva del alcance del proyecto
