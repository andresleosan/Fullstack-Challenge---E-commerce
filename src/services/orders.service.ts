/**
 * Orders Service
 * Firestore orders management
 */

import {
  collection,
  addDoc,
  getDocs,
  getDoc,
  doc,
  query,
  where,
  orderBy,
  updateDoc,
  Timestamp,
} from 'firebase/firestore'
import { db } from '@config/firebase'
import type { Order, OrderItem } from '@types'

/**
 * Orders Service Class
 */
class OrdersService {
  private collectionName = 'orders'

  /**
   * Create new order
   */
  async createOrder(
    userId: string,
    items: OrderItem[],
    total: number,
    shippingAddress: {
      street: string
      city: string
      postalCode: string
      country: string
    },
    paymentMethod: 'card' | 'paypal' | 'transfer'
  ): Promise<Order> {
    try {
      const now = new Date()
      const orderData = {
        userId,
        items,
        total,
        subtotal: total,
        tax: 0,
        shipping: 0,
        shippingAddress,
        paymentMethod,
        status: 'pending' as const,
        paymentStatus: 'pending' as const,
        notes: '',
        createdAt: Timestamp.fromDate(now),
        updatedAt: Timestamp.fromDate(now),
      }

      const docRef = await addDoc(
        collection(db, this.collectionName),
        orderData
      )

      return {
        id: docRef.id,
        userId,
        items,
        total,
        subtotal: total,
        tax: 0,
        shipping: 0,
        shippingAddress,
        paymentMethod,
        status: 'pending' as const,
        paymentStatus: 'pending' as const,
        notes: '',
        createdAt: now.toISOString(),
        updatedAt: now.toISOString(),
      } as Order
    } catch (error: any) {
      console.error('Error creating order:', error)
      throw {
        code: 'CREATE_ORDER_ERROR',
        message: 'Error al crear la orden',
      }
    }
  }

  /**
   * Get user orders
   */
  async getUserOrders(userId: string): Promise<Order[]> {
    try {
      const q = query(
        collection(db, this.collectionName),
        where('userId', '==', userId),
        orderBy('createdAt', 'desc')
      )

      const querySnapshot = await getDocs(q)

      return querySnapshot.docs
        .map((doc) => this.docToOrder(doc))
        .filter((order): order is Order => order !== null)
    } catch (error: any) {
      console.error('Error getting user orders:', error)
      throw {
        code: 'GET_ORDERS_ERROR',
        message: 'Error al obtener tus órdenes',
      }
    }
  }

  /**
   * Get order by ID
   */
  async getOrderById(orderId: string): Promise<Order | null> {
    try {
      const docRef = doc(db, this.collectionName, orderId)
      const docSnap = await getDoc(docRef)

      if (docSnap.exists()) {
        return this.docToOrder(docSnap)
      }

      return null
    } catch (error: any) {
      console.error('Error getting order:', error)
      throw {
        code: 'GET_ORDER_ERROR',
        message: 'Error al obtener la orden',
      }
    }
  }

  /**
   * Update order status
   */
  async updateOrderStatus(
    orderId: string,
    status: Order['status']
  ): Promise<void> {
    try {
      const docRef = doc(db, this.collectionName, orderId)
      await updateDoc(docRef, {
        status,
        updatedAt: Timestamp.fromDate(new Date()),
      })
    } catch (error: any) {
      console.error('Error updating order status:', error)
      throw {
        code: 'UPDATE_ORDER_STATUS_ERROR',
        message: 'Error al actualizar el estado de la orden',
      }
    }
  }

  /**
   * Update payment status
   */
  async updatePaymentStatus(
    orderId: string,
    paymentStatus: Order['paymentStatus']
  ): Promise<void> {
    try {
      const docRef = doc(db, this.collectionName, orderId)
      await updateDoc(docRef, {
        paymentStatus,
        updatedAt: Timestamp.fromDate(new Date()),
      })
    } catch (error: any) {
      console.error('Error updating payment status:', error)
      throw {
        code: 'UPDATE_PAYMENT_STATUS_ERROR',
        message: 'Error al actualizar el estado del pago',
      }
    }
  }

  /**
   * Get all orders (admin)
   */
  async getAllOrders(): Promise<Order[]> {
    try {
      const q = query(
        collection(db, this.collectionName),
        orderBy('createdAt', 'desc')
      )

      const querySnapshot = await getDocs(q)

      return querySnapshot.docs
        .map((doc) => this.docToOrder(doc))
        .filter((order): order is Order => order !== null)
    } catch (error: any) {
      console.error('Error getting all orders:', error)
      throw {
        code: 'GET_ALL_ORDERS_ERROR',
        message: 'Error al obtener todas las órdenes',
      }
    }
  }

  /**
   * Get orders by status
   */
  async getOrdersByStatus(status: Order['status']): Promise<Order[]> {
    try {
      const q = query(
        collection(db, this.collectionName),
        where('status', '==', status),
        orderBy('createdAt', 'desc')
      )

      const querySnapshot = await getDocs(q)

      return querySnapshot.docs
        .map((doc) => this.docToOrder(doc))
        .filter((order): order is Order => order !== null)
    } catch (error: any) {
      console.error('Error getting orders by status:', error)
      throw {
        code: 'GET_ORDERS_BY_STATUS_ERROR',
        message: 'Error al obtener órdenes por estado',
      }
    }
  }

  /**
   * Convert Firestore document to Order
   */
  private docToOrder(doc: any): Order | null {
    if (!doc.exists()) return null

    try {
      const data = doc.data()

      return {
        id: doc.id,
        userId: data.userId || '',
        items: data.items || [],
        total: data.total || 0,
        subtotal: data.subtotal || 0,
        tax: data.tax || 0,
        shipping: data.shipping || 0,
        shippingAddress: data.shippingAddress || {},
        paymentMethod: data.paymentMethod || 'card',
        status: data.status || 'pending',
        paymentStatus: data.paymentStatus || 'pending',
        notes: data.notes || '',
        createdAt: data.createdAt?.toDate?.()?.toISOString?.() || new Date().toISOString(),
        updatedAt: data.updatedAt?.toDate?.()?.toISOString?.() || new Date().toISOString(),
      } as Order
    } catch (error) {
      console.error('Error converting document to order:', error)
      return null
    }
  }
}

// Export singleton instance
export const ordersService = new OrdersService()

export default ordersService
