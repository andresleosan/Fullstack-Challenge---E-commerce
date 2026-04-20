import { useCallback } from 'react'
import { useCartStore } from '@store/cartStore'

export const useCart = () => {
  const store = useCartStore()

  const addToCart = useCallback(
    (product: any, quantity: number = 1) => {
      store.addItem(product, quantity)
    },
    [store]
  )

  const removeFromCart = useCallback(
    (productId: string) => {
      store.removeItem(productId)
    },
    [store]
  )

  const updateCartQuantity = useCallback(
    (productId: string, quantity: number) => {
      store.updateQuantity(productId, quantity)
    },
    [store]
  )

  const emptyCart = useCallback(() => {
    store.clearCart()
  }, [store])

  const itemCount = store.getItemCount()
  const subtotal = store.getSubtotal()
  const tax = store.getTax()
  const shipping = store.getShipping()
  const total = store.getTotal()

  return {
    items: store.items,
    itemCount,
    subtotal,
    tax,
    shipping,
    total,
    addToCart,
    removeFromCart,
    updateCartQuantity,
    emptyCart,
  }
}
