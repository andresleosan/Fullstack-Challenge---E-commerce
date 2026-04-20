import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Card, Button } from '@components/atoms'
import { CartItem } from '@components/molecules'
import { useCart } from '@hooks/useCart'
import './Cart.css'

export const CartPage: React.FC = () => {
  const navigate = useNavigate()
  const { items, itemCount, subtotal, tax, shipping, total, removeFromCart, updateCartQuantity, emptyCart } = useCart()

  const handleCheckout = () => {
    if (items.length > 0) {
      navigate('/checkout')
    }
  }

  if (items.length === 0) {
    return (
      <div className="cart-page">
        <div className="cart-container">
          <Card className="empty-cart">
            <h2>Tu carrito está vacío</h2>
            <p>No hay productos en tu carrito. ¡Comienza a comprar!</p>
            <Button onClick={() => navigate('/')}>Ir a tienda</Button>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <div className="cart-page">
      <div className="cart-container">
        <h1 className="cart-title">Tu Carrito ({itemCount} items)</h1>

        {/* Cart Items */}
        <div className="cart-items">
          <Card variant="default" className="items-card">
            {items.map((item) => (
              <CartItem
                key={item.id}
                {...item}
                onUpdateQuantity={(qty) => updateCartQuantity(item.id, qty)}
                onRemove={() => removeFromCart(item.id)}
              />
            ))}
          </Card>
        </div>

        {/* Summary */}
        <div className="cart-summary">
          <Card className="summary-card">
            <h3>Resumen del Pedido</h3>

            <div className="summary-row">
              <span>Subtotal:</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>

            <div className="summary-row">
              <span>Impuestos (8%):</span>
              <span>${tax.toFixed(2)}</span>
            </div>

            <div className="summary-row">
              <span>Envío:</span>
              <span>${shipping === 0 ? 'Gratis' : `$${shipping.toFixed(2)}`}</span>
            </div>

            <div className="summary-row summary-total">
              <span>Total:</span>
              <span>${total.toFixed(2)}</span>
            </div>

            {shipping > 0 && (
              <p className="shipping-info">
                * Envío gratis en compras mayores a $50
              </p>
            )}

            <div className="summary-actions">
              <Button
                variant="outline"
                onClick={() => navigate('/')}
                fullWidth
              >
                Continuar Comprando
              </Button>
              <Button
                variant="primary"
                onClick={handleCheckout}
                fullWidth
              >
                Ir a Pago
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default CartPage
