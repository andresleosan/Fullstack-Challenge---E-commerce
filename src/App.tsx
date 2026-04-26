import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import { MainLayout } from '@components/organisms'
import { ProtectedRoute } from '@components/common/ProtectedRoute'
import {
  HomePage,
  ProductDetailPage,
  CartPage,
  CheckoutPage,
  LoginPage,
  RegisterPage,
  ProfilePage,
  OrdersPage,
  OrderDetailPage,
  AdminPage
} from '@pages'
import { useCart } from '@hooks/useCart'
import { useProducts } from '@hooks/useProducts'
import './App.css'

/**
 * App Component - Rutas principales de la aplicación
 * 
 * Estructura:
 * - Públicas: /, /productos/:id, /carrito, /login, /register
 * - Protegidas: /checkout, /profile, /orders, /admin
 * - Admin: /admin
 */

function AppContent() {
  const navigate = useNavigate()
  const { itemCount } = useCart()
  const { search } = useProducts()

  const handleCartClick = () => {
    navigate('/carrito')
  }

  const handleSearch = (query: string) => {
    search(query)
  }

  return (
    <MainLayout
      headerProps={{
        cartItemCount: itemCount,
        onCartClick: handleCartClick,
        onSearch: handleSearch,
      }}
    >
      <Routes>
        {/* ==================== RUTAS PÚBLICAS ==================== */}
        
        {/* Home / Catálogo */}
        <Route path="/" element={<HomePage />} />
        
        {/* Detalle de Producto */}
        <Route path="/productos/:id" element={<ProductDetailPage />} />
        
        {/* Carrito (browseable sin auth, pero acceso limitado) */}
        <Route path="/carrito" element={<CartPage />} />
        
        {/* ==================== AUTENTICACIÓN ==================== */}
        
        {/* Login */}
        <Route path="/login" element={<LoginPage />} />
        
        {/* Registro */}
        <Route path="/register" element={<RegisterPage />} />
        
        {/* ==================== RUTAS PROTEGIDAS ==================== */}
        
        {/* Checkout (requiere autenticación + carrito no vacío) */}
        <Route
          path="/checkout"
          element={
            <ProtectedRoute>
              <CheckoutPage />
            </ProtectedRoute>
          }
        />
        
        {/* Perfil de Usuario */}
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <ProfilePage />
            </ProtectedRoute>
          }
        />
        
        {/* Órdenes de Usuario */}
        <Route
          path="/orders"
          element={
            <ProtectedRoute>
              <OrdersPage />
            </ProtectedRoute>
          }
        />
        
        {/* Detalle de Orden */}
        <Route
          path="/orders/:id"
          element={
            <ProtectedRoute>
              <OrderDetailPage />
            </ProtectedRoute>
          }
        />
        
        {/* ==================== ADMIN ==================== */}
        
        {/* Panel Administrativo */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <AdminPage />
            </ProtectedRoute>
          }
        />
        
        {/* ==================== 404 ==================== */}
        
        {/* Redirigir rutas no encontradas a home */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </MainLayout>
  )
}

function App() {
  return (
    <Router>
      <Toaster position="top-right" />
      <AppContent />
    </Router>
  )
}

export default App
