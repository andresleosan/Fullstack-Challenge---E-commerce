import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { Card, Button, Input } from '@components/atoms'
import { useUser } from '@hooks/useUser'
import './Login.css'

export const LoginPage: React.FC = () => {
  const navigate = useNavigate()
  const { login } = useUser()
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    remember: false,
  })
  const [isLoading, setIsLoading] = useState(false)
  const [localError, setLocalError] = useState<string | null>(null)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }))
    setLocalError(null)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setLocalError(null)

    try {
      await login(formData.email, formData.password)
      // AppWrapper handles auth state sync, just redirect
      navigate('/', { replace: true })
    } catch (err: any) {
      setLocalError(err.message || 'Error al iniciar sesión')
    } finally {
      setIsLoading(false)
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
            {localError && (
              <div className="error-message">
                {localError}
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
              <label className="checkbox-label">
                <input 
                  type="checkbox" 
                  name="remember"
                  checked={formData.remember}
                  onChange={handleInputChange}
                  className="checkbox-input"
                />
                <span className="checkbox-text">Recuérdame</span>
              </label>
              <a href="#forgot" className="forgot-link">¿Olvidaste tu contraseña?</a>
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
