import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Card, Button, Badge } from '@components/atoms'
import { useUser } from '@hooks/useUser'
import './Orders.css'

export interface OrderItemSummary {
  productId: string
  name: string
  image: string
  quantity: number
  price: number
  total: number
}

export interface OrderSummary {
  id: string
  date: string
  total: number
  status: 'pending' | 'processing' | 'shipped' | 'delivered'
  itemCount: number
  items: OrderItemSummary[]
  subtotal: number
  tax: number
  shipping: number
}

export const OrdersPage: React.FC = () => {
  const navigate = useNavigate()
  const { isAuthenticated, user } = useUser()

  // TODO-FUTURE: conectar con Firestore real-time
  const mockOrders: OrderSummary[] = [
    {
      id: 'ORD-001',
      date: new Date().toISOString(),
      total: 199.99,
      status: 'delivered',
      itemCount: 3,
      subtotal: 179.99,
      tax: 14.4,
      shipping: 5.6,
      items: [
        {
          productId: '101',
          name: 'Auriculares Inalámbricos',
          image: 'https://fakestoreapi.com/img/61U7T1koQqL._AC_SX679_.jpg',
          quantity: 1,
          price: 89.99,
          total: 89.99,
        },
        {
          productId: '102',
          name: 'Smart Watch',
          image: 'https://fakestoreapi.com/img/71li-ujtlUL._AC_UX679_.jpg',
          quantity: 1,
          price: 59.99,
          total: 59.99,
        },
        {
          productId: '103',
          name: 'Cargador USB-C',
          image: 'https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg',
          quantity: 1,
          price: 30.01,
          total: 30.01,
        },
      ],
    },
    {
      id: 'ORD-002',
      date: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
      total: 79.99,
      status: 'delivered',
      itemCount: 1,
      subtotal: 69.99,
      tax: 5.6,
      shipping: 4.4,
      items: [
        {
          productId: '104',
          name: 'Camiseta Casual',
          image: 'https://fakestoreapi.com/img/71YXzeOuslL._AC_UY879_.jpg',
          quantity: 1,
          price: 69.99,
          total: 69.99,
        },
      ],
    },
  ]

  if (!isAuthenticated || !user) {
    return (
      <div className="orders-page">
        <div className="orders-container">
          <Card>
            <h2>Acceso Denegado</h2>
            <p>Por favor inicia sesión para ver tus órdenes.</p>
            <Button onClick={() => navigate('/login')}>
              Ir a Login
            </Button>
          </Card>
        </div>
      </div>
    )
  }

  const getStatusColor = (
    status: 'pending' | 'processing' | 'shipped' | 'delivered'
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
      default:
        return 'secondary'
    }
  }

  const getStatusLabel = (
    status: 'pending' | 'processing' | 'shipped' | 'delivered'
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
      default:
        return 'Desconocido'
    }
  }

  return (
    <div className="orders-page">
      <div className="orders-container">
        <section className="orders-header">
          <h1>Mis Órdenes</h1>
          <p>Historial de compras y estado de envíos</p>
        </section>

        {mockOrders.length === 0 ? (
          <Card className="empty-state">
            <h3>No tienes órdenes</h3>
            <p>
              Comienza a comprar para ver tus órdenes aquí.
            </p>
            <Button onClick={() => navigate('/')}>
              Ir a Comprar
            </Button>
          </Card>
        ) : (
          <div className="orders-list">
            {mockOrders.map((order) => (
              <Card key={order.id} className="order-card">
                <div className="order-header">
                  <div className="order-info">
                    <h3>Orden {order.id}</h3>
                    <p className="order-date">
                      {new Date(order.date).toLocaleDateString('es-ES')}
                    </p>
                  </div>
                  <div className="order-status">
                    <Badge variant={getStatusColor(order.status)}>
                      {getStatusLabel(order.status)}
                    </Badge>
                  </div>
                </div>

                <div className="order-details">
                  <div className="detail-item">
                    <span className="detail-label">Artículos:</span>
                    <span className="detail-value">{order.itemCount}</span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-label">Total:</span>
                    <span className="detail-value total">
                      ${order.total.toFixed(2)}
                    </span>
                  </div>
                </div>

                <div className="order-actions">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => {
                      // Navigate to order detail view with order data
                      navigate(`/orders/${order.id}`, { state: { order } })
                    }}
                  >
                    Ver Detalles
                  </Button>
                  {order.status === 'shipped' && (
                    <Button size="sm" variant="outline">
                      Rastrear
                    </Button>
                  )}
                </div>
              </Card>
            ))}
          </div>
        )}

        <div className="orders-footer">
          <Button
            variant="outline"
            onClick={() => navigate('/profile')}
          >
            Volver al Perfil
          </Button>
          <Button onClick={() => navigate('/')}>
            Continuar Comprando
          </Button>
        </div>
      </div>
    </div>
  )
}

export default OrdersPage
