import React from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { Card, Button, Badge, Icon } from '@components/atoms'
import { useUser } from '@hooks/useUser'
import type { Order, OrderItem } from '@types'
import './OrderDetail.css'

export const OrderDetailPage: React.FC = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const { isAuthenticated, user } = useUser()

  // Get order from location state passed from Orders.tsx
  const order = location.state?.order as Order | undefined

  // Check authorization
  if (!isAuthenticated || !user) {
    return (
      <div className="order-detail-page">
        <div className="order-detail-container">
          <Card>
            <h2>Acceso Denegado</h2>
            <p>Por favor inicia sesión para ver tus órdenes.</p>
            <Button onClick={() => navigate('/login')}>Ir a Login</Button>
          </Card>
        </div>
      </div>
    )
  }

  // Check if order data exists
  if (!order) {
    return (
      <div className="order-detail-page">
        <div className="order-detail-container">
          <Card>
            <h2>Orden no encontrada</h2>
            <p>No se encontró la información de esta orden.</p>
            <Button onClick={() => navigate('/orders')}>
              Volver a mis órdenes
            </Button>
          </Card>
        </div>
      </div>
    )
  }

  const getStatusColor = (
    status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled'
  ): 'success' | 'warning' | 'info' | 'secondary' => {
    switch (status) {
      case 'delivered':
        return 'success'
      case 'shipped':
        return 'info'
      case 'processing':
        return 'warning'
      case 'pending':
        return 'secondary'
      case 'cancelled':
        return 'secondary'
      default:
        return 'secondary'
    }
  }

  const getStatusLabel = (
    status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled'
  ): string => {
    switch (status) {
      case 'pending':
        return 'Pendiente'
      case 'processing':
        return 'Procesando'
      case 'shipped':
        return 'Enviado'
      case 'delivered':
        return 'Entregado'
      case 'cancelled':
        return 'Cancelado'
      default:
        return 'Desconocido'
    }
  }

  return (
    <div className="order-detail-page">
      <div className="order-detail-container">
        {/* Header */}
        <section className="order-detail-header">
          <div className="order-detail-title">
            <h1>Detalles de la Orden</h1>
            <h2>Orden {order.id}</h2>
          </div>
          <div className="order-detail-status">
            <Badge variant={getStatusColor(order.status)}>
              {getStatusLabel(order.status)}
            </Badge>
          </div>
        </section>

        {/* Order Summary */}
        <Card className="order-summary-card">
          <div className="order-summary-grid">
            <div className="summary-item">
              <span className="summary-label">Fecha de Orden:</span>
              <span className="summary-value">
                {new Date(order.createdAt).toLocaleDateString('es-ES', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </span>
            </div>
            <div className="summary-item">
              <span className="summary-label">Estado de Pago:</span>
              <span className="summary-value">
                {order.paymentStatus === 'completed' ? '✅ Completado' : '⏳ Pendiente'}
              </span>
            </div>
            <div className="summary-item">
              <span className="summary-label">Método de Pago:</span>
              <span className="summary-value">
                {order.paymentMethod === 'card' ? 'Tarjeta de Crédito' : order.paymentMethod}
              </span>
            </div>
            <div className="summary-item">
              <span className="summary-label">Última Actualización:</span>
              <span className="summary-value">
                {new Date(order.updatedAt).toLocaleDateString('es-ES')}
              </span>
            </div>
          </div>
        </Card>

        {/* Items */}
        <section className="order-items-section">
          <h3>Productos</h3>
          <div className="order-items-list">
            {order.items.map((item: OrderItem, index: number) => (
              <Card key={index} className="order-item-card">
                <div className="order-item-content">
                  <div className="item-name">
                    <h4>{item.name}</h4>
                  </div>
                  <div className="item-details">
                    <div className="item-detail">
                      <span className="detail-label">Cantidad:</span>
                      <span className="detail-value">{item.quantity}x</span>
                    </div>
                    <div className="item-detail">
                      <span className="detail-label">Precio Unitario:</span>
                      <span className="detail-value">${item.price.toFixed(2)}</span>
                    </div>
                    <div className="item-detail">
                      <span className="detail-label">Subtotal:</span>
                      <span className="detail-value">${item.total.toFixed(2)}</span>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </section>

        {/* Shipping Address */}
        {order.shippingAddress && (
          <Card className="order-shipping-card">
            <h3>Dirección de Envío</h3>
            <div className="shipping-address">
              <p>{order.shippingAddress.street}</p>
              <p>
                {order.shippingAddress.city}, {order.shippingAddress.postalCode}
              </p>
              <p>{order.shippingAddress.country}</p>
            </div>
          </Card>
        )}

        {/* Totals */}
        <Card className="order-totals-card">
          <div className="totals-breakdown">
            <div className="total-item">
              <span className="total-label">Subtotal:</span>
              <span className="total-value">${order.subtotal.toFixed(2)}</span>
            </div>
            <div className="total-item">
              <span className="total-label">Impuestos:</span>
              <span className="total-value">${order.tax.toFixed(2)}</span>
            </div>
            <div className="total-item">
              <span className="total-label">Envío:</span>
              <span className="total-value">${order.shipping.toFixed(2)}</span>
            </div>
            <div className="total-item total-final">
              <span className="total-label">Total:</span>
              <span className="total-value">${order.total.toFixed(2)}</span>
            </div>
          </div>
        </Card>

        {/* Actions */}
        <div className="order-detail-actions">
          <Button
            variant="outline"
            onClick={() => navigate('/orders')}
          >
            ← Volver a mis órdenes
          </Button>
          <Button onClick={() => navigate('/')}>
            Continuar Comprando
          </Button>
        </div>
      </div>
    </div>
  )
}

export default OrderDetailPage
