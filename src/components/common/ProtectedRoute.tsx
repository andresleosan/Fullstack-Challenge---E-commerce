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
 */

interface ProtectedRouteProps {
  children: React.ReactNode
  requiredRole?: 'user' | 'admin'
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  requiredRole = 'user'
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

  // No autenticado → redirigir a login
  if (!isAuthenticated || !user) {
    return <Navigate to="/login" state={{ from: location }} replace />
  }

  // Verificar rol si es requerido
  if (requiredRole === 'admin' && user.role !== 'admin') {
    return <Navigate to="/" replace />
  }

  // Autenticado y autorizado → renderizar componente
  return <>{children}</>
}

export default ProtectedRoute
