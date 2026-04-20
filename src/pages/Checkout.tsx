import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Card, Button, Input } from '@components/atoms'
import { useCart } from '@hooks/useCart'
import './Checkout.css'

export const CheckoutPage: React.FC = () => {
  const navigate = useNavigate()
  const { items, total, emptyCart } = useCart()
  const [isProcessing, setIsProcessing] = useState(false)
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
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsProcessing(true)

    try {
      // Simulate payment processing
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // Success - clear cart and redirect
      emptyCart()
      navigate('/orders', { state: { message: 'Pedido realizado exitosamente' } })
    } catch (error) {
      alert('Error al procesar el pago')
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
          {/* Checkout Form */}
          <form className="checkout-form" onSubmit={handleSubmit}>
            <Card className="form-section">
              <h3>Información de Envío</h3>

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

              <div className="form-row">
                <Input
                  label="Nombre"
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  required
                />
                <Input
                  label="Apellido"
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
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
                  required
                />
                <Input
                  label="Estado"
                  type="text"
                  name="state"
                  value={formData.state}
                  onChange={handleInputChange}
                  required
                />
                <Input
                  label="Código Postal"
                  type="text"
                  name="zipCode"
                  value={formData.zipCode}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </Card>

            <Card className="form-section">
              <h3>Información de Pago</h3>

              <div className="form-group">
                <Input
                  label="Número de Tarjeta"
                  type="text"
                  name="cardNumber"
                  placeholder="1234 5678 9101 1121"
                  value={formData.cardNumber}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="form-row">
                <Input
                  label="Fecha de Vencimiento"
                  type="text"
                  name="expiryDate"
                  placeholder="MM/YY"
                  value={formData.expiryDate}
                  onChange={handleInputChange}
                  required
                />
                <Input
                  label="CVV"
                  type="text"
                  name="cvv"
                  placeholder="123"
                  value={formData.cvv}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="payment-actions">
                <Button
                  variant="outline"
                  onClick={() => navigate('/cart')}
                  disabled={isProcessing}
                  fullWidth
                >
                  Volver al Carrito
                </Button>
                <Button
                  variant="primary"
                  type="submit"
                  disabled={isProcessing}
                  isLoading={isProcessing}
                  fullWidth
                >
                  {isProcessing ? 'Procesando...' : `Pagar $${total.toFixed(2)}`}
                </Button>
              </div>
            </Card>
          </form>

          {/* Order Summary */}
          <aside className="checkout-summary">
            <Card className="summary-card">
              <h3>Resumen del Pedido</h3>
              <ul className="items-list">
                {items.map((item) => (
                  <li key={item.id} className="item">
                    <span>{item.name}</span>
                    <span>
                      {item.quantity}x ${item.price.toFixed(2)}
                    </span>
                  </li>
                ))}
              </ul>
              <div className="total">
                <strong>Total: ${total.toFixed(2)}</strong>
              </div>
            </Card>
          </aside>
        </div>
      </div>
    </div>
  )
}

export default CheckoutPage
