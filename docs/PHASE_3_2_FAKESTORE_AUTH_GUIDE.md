# Phase 3.2: FakeStore + Auth Integration - GUÍA CORRECTA

**Estado Anterior:** Phase 3.1 ✅ (Firebase + AppWrapper)  
**Estado Nuevo:** Phase 3.2 🔄 (Integrar FakeStore + Auth Pages)  
**Fecha:** 2024-04-20

---

## 🎯 Objetivo General

Integrar **FakeStore API** para productos (como especifica el proyecto) + Firebase auth = arquitectura híbrida optimizada.

---

## ✅ VERIFICACIÓN: Paginación Está Lista

**Archivo:** `src/pages/Home.tsx` (líneas 18-31)

```typescript
const [currentPage, setCurrentPage] = React.useState(1);
const itemsPerPage = 12;

// Pagination logic
const totalPages = Math.ceil(products.length / itemsPerPage);
const startIdx = (currentPage - 1) * itemsPerPage;
const endIdx = startIdx + itemsPerPage;
const paginatedProducts = products.slice(startIdx, endIdx);
```

**Status:** ✅ Paginación funciona, solo falta conectar a FakeStore

---

## PASO 1: Crear FakeStore Service

**Nuevo archivo:** `src/services/fakestore.service.ts`

```typescript
/**
 * FakeStore API Service
 * Public API: https://fakestoreapi.com/
 * No requiere autenticación ni setup
 */

import { api } from "./api";
import type { Product } from "@types";

class FakeStoreService {
  private baseURL = "https://fakestoreapi.com";

  /**
   * Get all products with pagination
   * Limit: 1-20, Default: null (all)
   */
  async getAllProducts(): Promise<Product[]> {
    try {
      const response = await fetch(`${this.baseURL}/products`);
      const data = await response.json();
      return this.mapToProducts(data);
    } catch (error: any) {
      console.error("Error fetching products:", error);
      throw {
        code: "FETCH_PRODUCTS_ERROR",
        message: "Error al cargar productos. Intenta más tarde.",
      };
    }
  }

  /**
   * Get product by ID
   */
  async getProductById(productId: string): Promise<Product | null> {
    try {
      const response = await fetch(`${this.baseURL}/products/${productId}`);

      if (response.status === 404) return null;

      const data = await response.json();
      return this.mapToProduct(data);
    } catch (error: any) {
      console.error("Error fetching product:", error);
      throw {
        code: "FETCH_PRODUCT_ERROR",
        message: "Error al cargar el producto",
      };
    }
  }

  /**
   * Get all categories (dynamic from FakeStore)
   */
  async getCategories(): Promise<string[]> {
    try {
      const response = await fetch(`${this.baseURL}/products/categories`);
      const categories = await response.json();
      return categories; // ["electronics", "jewelery", "men's clothing", "women's clothing"]
    } catch (error: any) {
      console.error("Error fetching categories:", error);
      throw {
        code: "FETCH_CATEGORIES_ERROR",
        message: "Error al cargar categorías",
      };
    }
  }

  /**
   * Get products by category
   */
  async getProductsByCategory(category: string): Promise<Product[]> {
    try {
      const response = await fetch(
        `${this.baseURL}/products/category/${category}`,
      );
      const data = await response.json();
      return this.mapToProducts(data);
    } catch (error: any) {
      console.error("Error fetching category products:", error);
      throw {
        code: "FETCH_CATEGORY_PRODUCTS_ERROR",
        message: "Error al cargar productos de la categoría",
      };
    }
  }

  /**
   * Search products (client-side, implementado en store)
   * FakeStore no tiene endpoint de búsqueda, pero el store lo maneja
   */
  searchProducts(query: string, allProducts: Product[]): Product[] {
    const lower = query.toLowerCase();
    return allProducts.filter(
      (p) =>
        p.name.toLowerCase().includes(lower) ||
        p.description?.toLowerCase().includes(lower),
    );
  }

  /**
   * Map FakeStore product to our Product type
   */
  private mapToProduct(fakeProduct: any): Product {
    return {
      id: fakeProduct.id?.toString() || "",
      name: fakeProduct.title || "",
      description: fakeProduct.description || "",
      price: fakeProduct.price || 0,
      image: fakeProduct.image || "",
      category: fakeProduct.category || "general",
      rating: fakeProduct.rating?.rate || 0,
      reviews: fakeProduct.rating?.count || 0,
      stock: Math.floor(Math.random() * 100) + 1, // FakeStore no provee stock
      originalPrice: undefined,
      discount: 0,
      featured: false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
  }

  /**
   * Map array of FakeStore products
   */
  private mapToProducts(fakeProducts: any[]): Product[] {
    return fakeProducts.map((p) => this.mapToProduct(p));
  }
}

// Export singleton
export const fakeStoreService = new FakeStoreService();
export default fakeStoreService;
```

---

## PASO 2: Actualizar Services Index

**Archivo:** `src/services/index.ts`

```typescript
/**
 * Services Index
 * Export all application services
 */

export { authService } from "./auth.service";
export { fakeStoreService } from "./fakestore.service"; // ← NUEVO
export { ordersService } from "./orders.service";
export { api } from "./api";
```

---

## PASO 3: Actualizar Home.tsx para Cargar de FakeStore

**Archivo:** `src/pages/Home.tsx`

```typescript
import React, { useEffect, useState } from 'react'
import { ProductGallery } from '@components/organisms'
import { FilterGroup, Pagination, SearchInput } from '@components/molecules'
import { useProducts, useCart } from '@hooks/index'
import { fakeStoreService } from '@services'  // ← CAMBIO
import './Home.css'

export interface HomePageProps {
  onAddToCart?: (productId: string, quantity: number) => void
  onProductClick?: (productId: string) => void
}

export const HomePage: React.FC<HomePageProps> = ({
  onAddToCart,
  onProductClick,
}) => {
  const { products, filters, search, filterByCategory, sort, loadProducts } =
    useProducts()
  const { addToCart } = useCart()
  const [currentPage, setCurrentPage] = React.useState(1)
  const [categories, setCategories] = useState<string[]>([])  // ← NUEVO
  const [isLoading, setIsLoading] = useState(false)
  const itemsPerPage = 12

  // Load products from FakeStore API
  useEffect(() => {
    const loadFakeStoreProducts = async () => {
      setIsLoading(true)
      try {
        // Fetch products from FakeStore
        const fakeStoreProducts = await fakeStoreService.getAllProducts()

        // Load into Zustand store (which handles filtering/sorting)
        loadProducts(fakeStoreProducts)

        console.log(`✅ Loaded ${fakeStoreProducts.length} products from FakeStore`)
      } catch (error: any) {
        console.error('Error loading products:', error.message)
      } finally {
        setIsLoading(false)
      }
    }

    const loadCategories = async () => {
      try {
        // Fetch categories from FakeStore (dinámico)
        const fetchedCategories = await fakeStoreService.getCategories()
        setCategories(fetchedCategories)
      } catch (error: any) {
        console.error('Error loading categories:', error.message)
      }
    }

    loadFakeStoreProducts()
    loadCategories()
  }, [loadProducts])

  const handleAddToCart = (product: any, quantity: number) => {
    addToCart(product, quantity)
    if (onAddToCart) {
      onAddToCart(product.id, quantity)
    }
  }

  const handleSearch = (query: string) => {
    search(query)
    setCurrentPage(1)
  }

  const handleFilterCategory = (category: string | null) => {
    filterByCategory(category)
    setCurrentPage(1)
  }

  const handleSort = (sortBy: any) => {
    sort(sortBy)
  }

  // Pagination logic (IGUAL QUE ANTES)
  const totalPages = Math.ceil(products.length / itemsPerPage)
  const startIdx = (currentPage - 1) * itemsPerPage
  const endIdx = startIdx + itemsPerPage
  const paginatedProducts = products.slice(startIdx, endIdx)

  if (isLoading) {
    return (
      <div className="home-page">
        <p>Cargando productos...</p>
      </div>
    )
  }

  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="home-hero">
        <div className="hero-content">
          <h1 className="hero-title">Bienvenido a E-Store</h1>
          <p className="hero-subtitle">
            Descubre los mejores productos al mejor precio
          </p>
        </div>
      </section>

      {/* Main Content */}
      <div className="home-container">
        {/* Sidebar - Filters */}
        <aside className="home-sidebar">
          <div className="filters-section">
            <h3 className="filters-title">Filtros</h3>

            {/* Category Filter (AHORA DINÁMICO) */}
            <FilterGroup
              label="Categorías"
              options={categories.map((cat) => ({
                id: cat,
                label: cat.charAt(0).toUpperCase() + cat.slice(1),
                value: cat,
              }))}
              onChange={handleFilterCategory}
            />
          </div>
        </aside>

        {/* Products Section */}
        <main className="home-main">
          {/* Search */}
          <SearchInput onSearch={handleSearch} />

          {/* Products Gallery */}
          <ProductGallery
            products={paginatedProducts}
            onAddToCart={handleAddToCart}
            onProductClick={onProductClick}
          />

          {/* Pagination */}
          {totalPages > 1 && (
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
          )}
        </main>
      </div>
    </div>
  )
}
```

---

## PASO 4: Conectar LoginPage a Firebase

**Archivo:** `src/pages/Login.tsx`

```typescript
import { useNavigate, Link } from 'react-router-dom'
import { useUser } from '@hooks/useUser'
import { useState } from 'react'
import type { FormEvent } from 'react'
import './Login.css'

export function LoginPage() {
  const navigate = useNavigate()
  const { login } = useUser()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)

    try {
      const formData = new FormData(e.currentTarget)
      const email = formData.get('email') as string
      const password = formData.get('password') as string

      // Firebase login
      await login(email, password)

      // Redirect to home on success
      navigate('/', { replace: true })
    } catch (err: any) {
      setError(err.message || 'Error al iniciar sesión')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="login-page">
      <div className="login-container">
        <h1>Iniciar Sesión</h1>

        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              name="email"
              type="email"
              required
              placeholder="tu@email.com"
              disabled={isLoading}
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Contraseña</label>
            <input
              id="password"
              name="password"
              type="password"
              required
              placeholder="Mínimo 6 caracteres"
              disabled={isLoading}
            />
          </div>

          {error && <div className="error-message">{error}</div>}

          <button type="submit" disabled={isLoading} className="login-btn">
            {isLoading ? 'Iniciando sesión...' : 'Iniciar Sesión'}
          </button>
        </form>

        <p className="login-footer">
          ¿No tienes cuenta? <Link to="/register">Regístrate aquí</Link>
        </p>
      </div>
    </div>
  )
}
```

---

## PASO 5: Conectar RegisterPage a Firebase

**Archivo:** `src/pages/Register.tsx`

```typescript
import { useNavigate, Link } from 'react-router-dom'
import { useUser } from '@hooks/useUser'
import { useState } from 'react'
import type { FormEvent } from 'react'
import './Register.css'

export function RegisterPage() {
  const navigate = useNavigate()
  const { register } = useUser()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)

    try {
      const formData = new FormData(e.currentTarget)
      const name = formData.get('name') as string
      const email = formData.get('email') as string
      const password = formData.get('password') as string
      const confirmPassword = formData.get('confirmPassword') as string

      // Validate passwords match
      if (password !== confirmPassword) {
        throw new Error('Las contraseñas no coinciden')
      }

      // Firebase register
      await register(email, password, name)

      // Redirect to home on success
      navigate('/', { replace: true })
    } catch (err: any) {
      setError(err.message || 'Error al registrarse')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="register-page">
      <div className="register-container">
        <h1>Crear Cuenta</h1>

        <form onSubmit={handleSubmit} className="register-form">
          <div className="form-group">
            <label htmlFor="name">Nombre Completo</label>
            <input
              id="name"
              name="name"
              type="text"
              required
              placeholder="Tu nombre"
              disabled={isLoading}
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              name="email"
              type="email"
              required
              placeholder="tu@email.com"
              disabled={isLoading}
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Contraseña</label>
            <input
              id="password"
              name="password"
              type="password"
              required
              placeholder="Mínimo 6 caracteres"
              disabled={isLoading}
            />
          </div>

          <div className="form-group">
            <label htmlFor="confirmPassword">Confirmar Contraseña</label>
            <input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              required
              placeholder="Confirma tu contraseña"
              disabled={isLoading}
            />
          </div>

          {error && <div className="error-message">{error}</div>}

          <button type="submit" disabled={isLoading} className="register-btn">
            {isLoading ? 'Creando cuenta...' : 'Registrarse'}
          </button>
        </form>

        <p className="register-footer">
          ¿Ya tienes cuenta? <Link to="/login">Inicia sesión aquí</Link>
        </p>
      </div>
    </div>
  )
}
```

---

## PASO 6: Agregar Logout Button

**Archivo:** `src/components/organisms/Header.tsx`

```typescript
import { useNavigate } from 'react-router-dom'
import { useUser } from '@hooks/useUser'

export function Header() {
  const navigate = useNavigate()
  const { user, isAuthenticated, logout } = useUser()

  const handleLogout = async () => {
    try {
      await logout()
      navigate('/', { replace: true })
    } catch (error: any) {
      console.error('Logout error:', error)
    }
  }

  return (
    <header className="header">
      {/* ... header content ... */}

      {isAuthenticated ? (
        <div className="user-menu">
          <span>Hola, {user?.name}</span>
          <button onClick={handleLogout} className="logout-btn">
            Cerrar Sesión
          </button>
        </div>
      ) : (
        <div className="auth-links">
          <a href="/login">Iniciar Sesión</a>
          <a href="/register">Registrarse</a>
        </div>
      )}
    </header>
  )
}
```

---

## ✅ CHECKLIST FASE 3.2

- [ ] Crear `src/services/fakestore.service.ts`
- [ ] Actualizar `src/services/index.ts`
- [ ] Actualizar `src/pages/Home.tsx` para cargar FakeStore
- [ ] Conectar `src/pages/Login.tsx` a Firebase
- [ ] Conectar `src/pages/Register.tsx` a Firebase
- [ ] Agregar Logout button en Header
- [ ] Verificar paginación funciona con FakeStore
- [ ] Verificar categorías cargadas dinámicamente
- [ ] Run `npm run build` → 0 errors
- [ ] Test completo: registro → login → logout → home

---

## 🧪 Testing

### Test 1: Cargar Productos

```
1. Ir a Home
2. Verificar que se cargan productos del FakeStore
3. Ver console: "✅ Loaded X products from FakeStore"
```

### Test 2: Paginación

```
1. Home cargada
2. Ver pagination al pie
3. Hacer clic en página 2
4. Verificar que cambian productos
```

### Test 3: Categorías Dinámicas

```
1. Home cargada
2. Sidebar: Filtros → Categorías
3. Verificar que muestra categorías de FakeStore
```

### Test 4: Registro

```
1. Ir a /register
2. Llenar formulario
3. Click Registrarse
4. Debería redirigir a Home (autenticado)
```

### Test 5: Login

```
1. Logout (para desautentica)
2. Ir a /login
3. Usar mismas credenciales del paso 4
4. Click Login
5. Debería redirigir a Home (autenticado)
```

---

## 🔄 Flujo Completo Fase 3.2

```
Home (mockProducts)
    ↓
[FakeStore carga]
    ↓
Home (FakeStore productos)
    ↓
Paginación + Filtros ✅
    ↓
RegisterPage (Firebase)
    ↓
LoginPage (Firebase)
    ↓
Header con Logout
    ↓
Auth Persistence (AppWrapper)
```

---

## 🚀 Próximo: Phase 3.3

- [ ] Carrito persistido a Firebase
- [ ] Crear órdenes en Firestore
- [ ] Página de órdenes (historial)
- [ ] Proteger rutas segun auth

---

**Tiempo Estimado:** 1-2 horas  
**Complejidad:** Media  
**Dependencias:** Phase 3.1 ✅ completada
