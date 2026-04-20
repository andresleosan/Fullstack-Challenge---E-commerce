import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { Card, Button, Input } from '@components/atoms'
import { useUser } from '@hooks/useUser'
import './Register.css'

export const RegisterPage: React.FC = () => {
  const navigate = useNavigate()
  const { register, isLoading, error } = useUser()
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    agreeTerms: false,
  })
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

    // Validations
    if (!formData.name.trim()) {
      setLocalError('El nombre es requerido')
      return
    }

    if (formData.password !== formData.confirmPassword) {
      setLocalError('Las contraseñas no coinciden')
      return
    }

    if (formData.password.length < 6) {
      setLocalError('La contraseña debe tener al menos 6 caracteres')
      return
    }

    if (!formData.agreeTerms) {
      setLocalError('Debes aceptar los términos y condiciones')
      return
    }

    try {
      const success = await register(
        formData.email,
        formData.password,
        formData.name
      )
      if (success) {
        navigate('/profile')
      }
    } catch (err: any) {
      setLocalError(err.message || 'Error al registrarse')
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
            {(localError || error) && (
              <div className="error-message">
                {localError || error}
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
              <label>
                <input
                  type="checkbox"
                  name="agreeTerms"
                  checked={formData.agreeTerms}
                  onChange={handleInputChange}
                />
                Acepto los términos y condiciones
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
