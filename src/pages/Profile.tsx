import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Card, Button, Input } from '@components/atoms'
import { useUser } from '@hooks/useUser'
import './Profile.css'

export const ProfilePage: React.FC = () => {
  const navigate = useNavigate()
  const { user, isAuthenticated, logout } = useUser()

  if (!isAuthenticated || !user) {
    return (
      <div className="profile-page">
        <div className="profile-container">
          <Card>
            <h2>Acceso Denegado</h2>
            <p>Por favor inicia sesión para acceder a tu perfil.</p>
            <Button onClick={() => navigate('/login')}>
              Ir a Login
            </Button>
          </Card>
        </div>
      </div>
    )
  }

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  return (
    <div className="profile-page">
      <div className="profile-container">
        <h1>Mi Perfil</h1>

        <div className="profile-content">
          {/* Profile Card */}
          <Card className="profile-card">
            <div className="profile-header">
              <div className="profile-avatar">
                {user.name.charAt(0).toUpperCase()}
              </div>
              <div className="profile-info">
                <h2>{user.name}</h2>
                <p>{user.email}</p>
                <p className="member-since">
                  Miembro desde{' '}
                  {new Date(user.createdAt).toLocaleDateString('es-ES')}
                </p>
              </div>
            </div>

            <div className="profile-section">
              <h3>Información Personal</h3>
              <div className="form-group">
                <Input
                  label="Nombre"
                  type="text"
                  value={user.name}
                  readOnly
                />
              </div>
              <div className="form-group">
                <Input
                  label="Email"
                  type="email"
                  value={user.email}
                  readOnly
                />
              </div>
            </div>

            <div className="profile-section">
              <h3>Mi Cuenta</h3>
              <div className="account-options">
                <Button
                  variant="outline"
                  onClick={() => navigate('/orders')}
                  fullWidth
                >
                  Ver Mis Órdenes
                </Button>
                <Button
                  variant="outline"
                  onClick={handleLogout}
                  fullWidth
                >
                  Cerrar Sesión
                </Button>
              </div>
            </div>
          </Card>

          {/* Quick Stats */}
          <aside className="profile-stats">
            <Card className="stat-card">
              <h4>Órdenes Totales</h4>
              <p className="stat-value">0</p>
            </Card>
            <Card className="stat-card">
              <h4>Gasto Total</h4>
              <p className="stat-value">$0.00</p>
            </Card>
            <Card className="stat-card">
              <h4>Puntos</h4>
              <p className="stat-value">0</p>
            </Card>
          </aside>
        </div>
      </div>
    </div>
  )
}

export default ProfilePage
