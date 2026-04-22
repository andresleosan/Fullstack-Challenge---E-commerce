import { useCallback, useMemo } from 'react'
import { useCartStore } from '@store/cartStore'

export const useCart = () => {
  const store = useCartStore()

  // ✅ OPTIMIZATION: Memoize expensive calculations
  // Only recalculate when items array changes (using dependency array)
  const { itemCount, subtotal, tax, shipping, total } = useMemo(
    () => ({
      itemCount: store.getItemCount(),
      subtotal: store.getSubtotal(),
      tax: store.getTax(),
      shipping: store.getShipping(),
      total: store.getTotal(),
    }),
    [store.items] // Only recalculate when items change
  )

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
