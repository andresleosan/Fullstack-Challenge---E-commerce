import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Card, Button, Input } from '@components/atoms'
import { useCart } from '@hooks/useCart'
import { validators } from '@utils/validators'
import './Checkout.css'

export const CheckoutPage: React.FC = () => {
  const navigate = useNavigate()
  const { items, total, emptyCart } = useCart()
  const [isProcessing, setIsProcessing] = useState(false)
  const [formErrors, setFormErrors] = useState<Record<string, string>>({})
  const [formData, setFormData] = useState({
    email: '',
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    if (formErrors[name]) {
      setFormErrors((prev) => {
        const newErrors = { ...prev }
        delete newErrors[name]
        return newErrors
      })
    }
  }

  const validateForm = (): boolean => {
    const errors: Record<string, string> = {}
    const emailV = validators.email(formData.email)
    if (emailV !== true) errors.email = emailV
    const firstNameV = validators.name(formData.firstName)
    if (firstNameV !== true) errors.firstName = firstNameV
    const lastNameV = validators.name(formData.lastName)
    if (lastNameV !== true) errors.lastName = lastNameV
    const addressV = validators.address(formData.address)
    if (addressV !== true) errors.address = addressV
    const cityV = validators.city(formData.city)
    if (cityV !== true) errors.city = cityV
    const stateV = validators.state(formData.state)
    if (stateV !== true) errors.state = stateV
    const zipV = validators.zipCode(formData.zipCode)
    if (zipV !== true) errors.zipCode = zipV
    const cardV = validators.cardNumber(formData.cardNumber)
    if (cardV !== true) errors.cardNumber = cardV
    const expiryV = validators.expiryDate(formData.expiryDate)
    if (expiryV !== true) errors.expiryDate = expiryV
    const cvvV = validators.cvv ? validators.cvv(formData.cvv) : validateCVV(formData.cvv)
    if (cvvV !== true) errors.cvv = cvvV
    setFormErrors(errors)
    return Object.keys(errors).length === 0
  }

  const validateCVV = (cvv: string): string | true => {
    const cleaned = cvv.replace(/\s/g, '')
    if (!cleaned) return 'CVV es requerido'
    if (cleaned.length !== 3 && cleaned.length !== 4) return 'CVV debe tener 3 o 4 dígitos'
    if (!/^\d+$/.test(cleaned)) return 'CVV debe contener solo números'
    return true
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validateForm()) return
    setIsProcessing(true)
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500))
      emptyCart()
      navigate('/orders', { state: { message: 'Pedido realizado exitosamente' } })
    } catch (error) {
      setFormErrors({ submit: 'Error al procesar el pago. Intenta nuevamente.' })
      console.error('Payment error:', error)
    } finally {
      setIsProcessing(false)
    }
  }

  if (items.length === 0) {
    return (
      <div className="checkout-page">
        <div className="checkout-container">
          <Card>
            <h2>Tu carrito está vacío</h2>
            <p>No hay productos para comprar.</p>
            <Button onClick={() => navigate('/')}>Volver a tienda</Button>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <div className="checkout-page">
      <div className="checkout-container">
        <h1>Finalizar Compra</h1>
        <div className="checkout-content">
          {formErrors.submit && (
            <Card style={{ backgroundColor: '#fee2e2', borderColor: '#ef4444' }}>
              <p style={{ color: '#dc2626' }}>{formErrors.submit}</p>
            </Card>
          )}

          <form className="checkout-form" onSubmit={handleSubmit}>
            {/* Envío */}
            <Card className="form-section">
              <h3>Información de Envío</h3>
              <div className="form-group">
                <Input
                  label="Email"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  error={formErrors.email}
                  required
                />
              </div>
              <div className="form-row">
                <Input
                  label="Nombre"
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  error={formErrors.firstName}
                  required
                />
                <Input
                  label="Apellido"
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  error={formErrors.lastName}
                  required
                />
              </div>
              <div className="form-group">
                <Input
                  label="Dirección"
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  error={formErrors.address}
                  required
                />
              </div>
              <div className="form-row">
                <Input
                  label="Ciudad"
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleInputChange}
                  error={formErrors.city}
                  required
                />
                <Input
                  label="Estado"
                  type="text"
                  name="state"
                  value={formData.state}
                  onChange={handleInputChange}
                  error={formErrors.state}
                  required
                />
                <Input
                  label="Código Postal"
                  type="text"
                  name="zipCode"
                  value={formData.zipCode}
                  onChange={handleInputChange}
                  error={formErrors.zipCode}
                  required
                />
              </div>
            </Card>

            {/* Pago */}
            <Card className="form-section">
              <h3>Información de Pago</h3>
              <div className="form-group">
                <Input
                  label="Número de Tarjeta"
                  type="text"
                  name="cardNumber"
                  value={formData.cardNumber}
                  onChange={handleInputChange}
                  error={formErrors.cardNumber}
                  placeholder="1234 5678 9012 3456"
                  required
                />
              </div>
              <div className="form-row">
                <Input
                  label="Fecha de Expiración"
                  type="text"
                  name="expiryDate"
                  value={formData.expiryDate}
                  onChange={handleInputChange}
                  error={formErrors.expiryDate}
                  placeholder="MM/YY"
                  required
                />
                <Input
                  label="CVV"
                  type="text"
                  name="cvv"
                  value={formData.cvv}
                  onChange={handleInputChange}
                  error={formErrors.cvv}
                  placeholder="123"
                  maxLength={4}
                  required
                />
              </div>
            </Card>

            {/* Resumen */}
            <Card className="form-summary">
              <h3>Resumen del Pedido</h3>
              <ul style={{ listStyle: 'none', padding: 0, marginBottom: '1rem' }}>
                {items.map((item) => (
                  <li key={item.productId} style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span>{item.product?.name || 'Producto'}</span>
                    <span>{item.quantity}x ${(item.product?.price || 0).toFixed(2)}</span>
                  </li>
                ))}
              </ul>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
                <strong>Total:</strong>
                <strong>${total.toFixed(2)}</strong>
              </div>
              <p style={{ fontSize: '0.875rem', color: '#666', marginBottom: '1rem' }}>
                Los datos de tu tarjeta se procesarán de forma segura
              </p>
              <Button type="submit" variant="primary" fullWidth isLoading={isProcessing} disabled={isProcessing}>
                {isProcessing ? 'Procesando...' : `Pagar $${total.toFixed(2)}`}
              </Button>
              <Button
                type="button"
                variant="outline"
                fullWidth
                onClick={() => navigate('/carrito')}
                disabled={isProcessing}
                style={{ marginTop: '0.5rem' }}
              >
                Volver al Carrito
              </Button>
            </Card>
          </form>
        </div>
      </div>
    </div>
  )
}

export default CheckoutPage