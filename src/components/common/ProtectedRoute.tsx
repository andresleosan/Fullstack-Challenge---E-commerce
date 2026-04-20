import React from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { useUser } from '@hooks/useUser'
import { Loader } from '@components/atoms'

/**
 * ProtectedRoute Component
 * Wrapper para rutas que requieren autenticación
 * 
 * Uso:
 * <Route element={<ProtectedRoute><ProfilePage /></ProtectedRoute>} path="/profile" />
 * <Route element={<ProtectedRoute requiredRole="admin"><AdminPage /></ProtectedRoute>} path="/admin" />
 */

interface ProtectedRouteProps {
  children: React.ReactNode
  requiredRole?: 'user' | 'admin'
  fallback?: string // Ruta a la que redirigir si no tiene permisos
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  requiredRole = 'user',
  fallback = '/login',
}) => {
  const { isAuthenticated, user, isLoading } = useUser()
  const location = useLocation()

  // Mostrar loader mientras verifica autenticación
  if (isLoading) {
    return (
      <div className="protected-route-loader">
        <Loader variant="spinner" />
        <p>Verificando acceso...</p>
      </div>
    )
  }

  // No autenticado → redirigir a fallback (usualmente login)
  if (!isAuthenticated) {
    return <Navigate to={fallback} state={{ from: location }} replace />
  }

  // Verificar rol si es requerido
  if (requiredRole === 'admin' && user?.role !== 'admin') {
    // No es admin → redirigir a home
    return <Navigate to="/" replace />
  }

  // Autenticado y autorizado → renderizar componente
  return <>{children}</>
}

export default ProtectedRoute
