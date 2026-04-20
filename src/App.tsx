import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
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
  OrdersPage
} from '@pages'
import './App.css'

/**
 * App Component - Rutas principales de la aplicación
 * 
 * Estructura:
 * - Públicas: /, /productos/:id, /carrito, /login, /register
 * - Protegidas: /checkout, /profile, /orders
 * - Admin: (futuro)
 */

function App() {
  return (
    <Router>
      <MainLayout>
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
          
          {/* ==================== 404 ==================== */}
          
          {/* Redirigir rutas no encontradas a home */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </MainLayout>
    </Router>
  )
}

export default App
