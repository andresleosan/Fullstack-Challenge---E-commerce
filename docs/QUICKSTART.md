# 🚀 Quick Start - Después de las Mejoras

## Paso 1: Configurar Variables de Entorno

```bash
# Copiar plantilla
cp .env.example .env

# Editar .env y llenar con tus credenciales Firebase
# (Se requiere cuenta Firebase)
```

**Variables necesarias:**

```
VITE_FIREBASE_API_KEY=your_key
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_bucket.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

---

## Paso 2: Instalar y Ejecutar

```bash
npm install
npm run dev
```

---

## Paso 3: Verificar que Todo Funciona

```bash
# ✅ Debería ver mensaje en consola:
# ✅ Environment Configuration Loaded
# 🔥 Firebase emulators enabled (development mode)

# ✅ Si hay error, significa que falta variable de entorno
# ❌ CRITICAL: Missing environment variable: ...
```

---

## Paso 4: Probar las Mejoras

### Test 1: Validación en Checkout

1. Ir a Home → Agregar producto al carrito
2. Ir a Checkout
3. Intentar completar sin llenar campos
4. **Esperado:** Mensajes de error en rojo debajo de cada campo

### Test 2: Validación de Tarjeta

1. En Checkout, ingresar número de tarjeta: `1234567890123` (inválido)
2. **Esperado:** Error "Número de tarjeta inválido"
3. Ingresar número válido: `4532015112830366` (Visa de prueba)
4. **Esperado:** Sin error

### Test 3: Performance (useCart)

1. Abrir DevTools → Console
2. Agregar muchos productos al carrito (50+)
3. **Esperado:** No debería haber lag visual

### Test 4: Stock Consistente

1. Recargar la página (F5)
2. Verificar que el stock de cada producto sea igual
3. **Esperado:** Mismo número cada vez

### Test 5: Error Handling

1. Ir a Home
2. En DevTools → Network, throttle a "Slow 3G"
3. **Esperado:** Debería mostrar "Cargando productos..."
4. Si falla: "Error al cargar productos. Intenta más tarde"

---

## Archivos Documentación Importante

- **`IMPROVEMENTS.md`** - Resumen de cambios
- **`CRITICAL_FIXES.md`** - Problemas críticos resueltos
- **`STRUCTURE.md`** - Estructura del proyecto
- **`.env.example`** - Plantilla de variables

---

## 🔒 Pre-Producción Checklist

Antes de hacer deploy, completar:

```
☐ Llenar .env con credenciales REALES
☐ Probar todos los tests (Test 1-5 arriba)
☐ Configurar Firebase Security Rules (ver CRITICAL_FIXES.md)
☐ Agregar error tracking (Sentry o similar)
☐ Pruebas de seguridad (XSS, CSRF, etc)
☐ Revisar console.log y remover logs de debug
☐ Verificar performance (Lighthouse)
☐ HTTPS habilitado en producción
```

---

## 🐛 Si Algo No Funciona

### Problema: "Missing required Firebase environment variable"

**Solución:**

```bash
# Verificar que .env existe y tiene todas las variables
cat .env

# Reiniciar dev server
npm run dev
```

### Problema: "Cannot read property 'price' of undefined" en carrito

**Solución:**

```typescript
// Esto ahora maneja mejor los productos missing
// Debería mostrar "Producto no disponible"
// Si no aparece, revisar console para warnings
```

### Problema: Validación de tarjeta no funciona

**Solución:**

```bash
# Verificar que import está correcto en Checkout.tsx
import { validators } from '@utils/validators'

# El validador incluye Luhn algorithm
```

---

## 📞 Soporte

Si algo no funciona:

1. Revisar console (F12 → Console)
2. Ver error exacto
3. Buscar en `src/utils/helpers/errorHandler.ts` qué significa
4. Revisar `.env` - probablemente falta variable

---

## ✨ Próxima Fase (Recomendada)

```
1. Agregar Firebase Security Rules
2. Implementar tests
3. Setup de CI/CD (GitHub Actions)
4. Deploy a staging
5. Pruebas en staging
6. Deploy a producción
```

---

**Status:** ✅ Listo para desarrollo local
**Nota:** Requiere Firebase project setup antes de producción
