import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { CartItem, Product } from '@types'

export interface CartStore {
  items: CartItem[]
  addItem: (product: Product, quantity: number) => void
  removeItem: (productId: string) => void
  updateQuantity: (productId: string, quantity: number) => void
  clearCart: () => void
  getTotal: () => number
  getSubtotal: () => number
  getTax: () => number
  getShipping: () => number
  getItemCount: () => number
}

const TAX_RATE = 0.08 // 8% tax
const SHIPPING_THRESHOLD = 50 // Free shipping over $50
const SHIPPING_COST = 5

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],

      addItem: (product: Product, quantity: number) => {
        const { items } = get()
        const existingItem = items.find((item) => item.productId === product.id)

        if (existingItem) {
          // Update quantity if item already in cart
          set({
            items: items.map((item) =>
              item.productId === product.id
                ? {
                    ...item,
                    quantity: Math.min(item.quantity + quantity, product.stock),
                  }
                : item
            ),
          })
        } else {
          // Add new item to cart
          set({
            items: [
              ...items,
              {
                productId: product.id,
                quantity: Math.min(quantity, product.stock),
                product,
              },
            ],
          })
        }
      },

      removeItem: (productId: string) => {
        set({
          items: get().items.filter((item) => item.productId !== productId),
        })
      },

      updateQuantity: (productId: string, quantity: number) => {
        const { items } = get()
        const item = items.find((i) => i.productId === productId)

        if (!item || !item.product) return

        const newQuantity = Math.max(1, Math.min(quantity, item.product.stock))

        set({
          items: items.map((item) =>
            item.productId === productId ? { ...item, quantity: newQuantity } : item
          ),
        })
      },

      clearCart: () => {
        set({ items: [] })
      },

      getItemCount: () => {
        return get().items.reduce((total, item) => total + item.quantity, 0)
      },

      getSubtotal: () => {
        return parseFloat(
          get()
            .items.reduce((total, item) => total + (item.product?.price || 0) * item.quantity, 0)
            .toFixed(2)
        )
      },

      getTax: () => {
        const subtotal = get().getSubtotal()
        return parseFloat((subtotal * TAX_RATE).toFixed(2))
      },

      getShipping: () => {
        const subtotal = get().getSubtotal()
        return subtotal >= SHIPPING_THRESHOLD ? 0 : SHIPPING_COST
      },

      getTotal: () => {
        return parseFloat(
          (get().getSubtotal() + get().getTax() + get().getShipping()).toFixed(2)
        )
      },
    }),
    {
      name: 'estore-cart',
    }
  )
)
