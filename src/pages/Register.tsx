import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { Card, Button, Input } from '@components/atoms'
import { useUser } from '@hooks/useUser'
import './Register.css'

export const RegisterPage: React.FC = () => {
  const navigate = useNavigate()
  const { register } = useUser()
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    agreeTerms: false,
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

    // Validations
    if (!formData.name.trim()) {
      setLocalError('El nombre es requerido')
      setIsLoading(false)
      return
    }

    if (formData.password !== formData.confirmPassword) {
      setLocalError('Las contraseñas no coinciden')
      setIsLoading(false)
      return
    }

    if (formData.password.length < 6) {
      setLocalError('La contraseña debe tener al menos 6 caracteres')
      setIsLoading(false)
      return
    }

    if (!formData.agreeTerms) {
      setLocalError('Debes aceptar los términos y condiciones')
      setIsLoading(false)
      return
    }

    try {
      await register(
        formData.email,
        formData.password,
        formData.name
      )
      // AppWrapper handles auth state sync, just redirect
      navigate('/', { replace: true })
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : 'Error al registrarse'
      setLocalError(errorMessage)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="register-page">
      <div className="register-container">
        <Card className="register-card">
          <div className="register-header">
            <h1>Crear Cuenta</h1>
            <p>Únete a E-Store hoy</p>
          </div>

          <form onSubmit={handleSubmit} className="register-form">
            {localError && (
              <div className="error-message">
                {localError}
              </div>
            )}

            <div className="form-group">
              <Input
                label="Nombre Completo"
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
              />
            </div>

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

            <div className="form-group">
              <Input
                label="Confirmar Contraseña"
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="form-check">
              <label className="checkbox-label">
                <input
                  type="checkbox"
                  name="agreeTerms"
                  checked={formData.agreeTerms}
                  onChange={handleInputChange}
                  className="checkbox-input"
                />
                <span className="checkbox-text">Acepto los términos y condiciones</span>
              </label>
            </div>

            <Button
              variant="primary"
              size="base"
              type="submit"
              disabled={isLoading}
              isLoading={isLoading}
              fullWidth
            >
              Crear Cuenta
            </Button>
          </form>

          <div className="register-footer">
            <p>
              ¿Ya tienes cuenta?{' '}
              <Link to="/login">Inicia sesión aquí</Link>
            </p>
          </div>
        </Card>
      </div>
    </div>
  )
}

export default RegisterPage
