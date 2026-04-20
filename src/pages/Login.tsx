import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { Card, Button, Input } from '@components/atoms'
import { useUser } from '@hooks/useUser'
import './Login.css'

export const LoginPage: React.FC = () => {
  const navigate = useNavigate()
  const { login, isLoading, error } = useUser()
  const [formData, setFormData] = useState({
    email: 'demo@example.com',
    password: 'demo123',
  })
  const [localError, setLocalError] = useState<string | null>(null)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
    setLocalError(null)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      const success = await login(formData.email, formData.password)
      if (success) {
        navigate('/profile')
      } else {
        setLocalError('Email o contraseña incorrectos')
      }
    } catch (err: any) {
      setLocalError(err.message || 'Error al iniciar sesión')
    }
  }

  return (
    <div className="login-page">
      <div className="login-container">
        <Card className="login-card">
          <div className="login-header">
            <h1>Iniciar Sesión</h1>
            <p>Accede a tu cuenta E-Store</p>
          </div>

          <form onSubmit={handleSubmit} className="login-form">
            {(localError || error) && (
              <div className="error-message">
                {localError || error}
              </div>
            )}

            <div className="form-group">
              <Input
                label="Email"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="form-group">
              <Input
                label="Contraseña"
                type="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="form-options">
              <label>
                <input type="checkbox" name="remember" />
                Recuérdame
              </label>
              <a href="#forgot">¿Olvidaste tu contraseña?</a>
            </div>

            <Button
              variant="primary"
              size="base"
              type="submit"
              disabled={isLoading}
              isLoading={isLoading}
              fullWidth
            >
              Iniciar Sesión
            </Button>
          </form>

          <div className="login-footer">
            <p>
              ¿No tienes cuenta?{' '}
              <Link to="/register">Regístrate aquí</Link>
            </p>
          </div>

          <div className="demo-credentials">
            <strong>Demo Credentials:</strong>
            <p>Email: demo@example.com</p>
            <p>Password: demo123</p>
          </div>
        </Card>
      </div>
    </div>
  )
}

export default LoginPage
