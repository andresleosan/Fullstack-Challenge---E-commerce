import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { CartItem, Product } from '@types'
import { CART_CONSTANTS } from '@config/constants/app.constants'

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

const TAX_RATE = CART_CONSTANTS.TAX_RATE
const SHIPPING_THRESHOLD = CART_CONSTANTS.SHIPPING_THRESHOLD
const SHIPPING_COST = CART_CONSTANTS.SHIPPING_COST

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],

      addItem: (product: Product, quantity: number) => {
        // ✅ VALIDATION: Ensure product is valid
        if (!product?.id) {
          console.error('❌ Invalid product: missing id', product)
          return
        }

        if (quantity <= 0) {
          console.error('❌ Invalid quantity:', quantity)
          return
        }

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

        // ✅ SAFETY: Check if item exists and has product
        if (!item) {
          console.warn(`⚠️ Cart item not found: ${productId}`)
          return
        }

        if (!item.product) {
          console.warn(`⚠️ Product data missing for cart item: ${productId}`)
          return
        }

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
        // ✅ SAFETY: Handle items with missing product data
        const subtotal = get().items.reduce((total, item) => {
          if (!item.product) {
            console.warn(`⚠️ Product data missing for cart item: ${item.productId}`)
            return total
          }
          return total + item.product.price * item.quantity
        }, 0)

        return parseFloat(subtotal.toFixed(2))
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
      name: CART_CONSTANTS.STORAGE_KEY,
    }
  )
)
