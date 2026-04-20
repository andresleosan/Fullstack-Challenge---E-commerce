import React from 'react'
import { Button, Icon, Badge } from '@components/atoms'
import { CartItem } from '@components/molecules'
import type { CartItem as CartItemType } from '@types'
import './CartSidebar.css'

export interface CartSidebarProps {
  items: CartItemType[]
  subtotal: number
  tax: number
  shipping: number
  total: number
  isOpen: boolean
  onClose?: () => void
  onCheckout?: () => void
  onUpdateQuantity?: (itemId: string, quantity: number) => void
  onRemoveItem?: (itemId: string) => void
  isLoading?: boolean
}

/**
 * CartSidebar Organism
 * Combina: CartItem molecules, Button atoms
 * Panel lateral del carrito con resumen y checkout
 */
export const CartSidebar = React.forwardRef<HTMLDivElement, CartSidebarProps>(
  (
    {
      items,
      subtotal,
      tax,
      shipping,
      total,
      isOpen,
      onClose,
      onCheckout,
      onUpdateQuantity,
      onRemoveItem,
      isLoading = false,
    },
    ref
  ) => {
    React.useEffect(() => {
      if (isOpen) {
        document.body.style.overflow = 'hidden'
      } else {
        document.body.style.overflow = 'unset'
      }

      return () => {
        document.body.style.overflow = 'unset'
      }
    }, [isOpen])

    return (
      <>
        {/* Backdrop */}
        {isOpen && (
          <div
            className="cart-sidebar-backdrop"
            onClick={onClose}
            role="presentation"
            aria-hidden="true"
          />
        )}

        {/* Sidebar */}
        <div
          ref={ref}
          className={`cart-sidebar ${isOpen ? 'cart-sidebar--open' : ''}`}
          role="dialog"
          aria-label="Shopping cart"
          aria-modal="true"
        >
          {/* Header */}
          <div className="cart-sidebar-header">
            <h2 className="cart-sidebar-title">
              Carrito
              {items.length > 0 && (
                <Badge
                  variant="primary"
                  size="sm"
                  className="cart-sidebar-badge"
                >
                  {items.length}
                </Badge>
              )}
            </h2>
            <button
              className="cart-sidebar-close"
              onClick={onClose}
              aria-label="Close cart"
            >
              <Icon name="close" size="md" />
            </button>
          </div>

          {/* Items List */}
          <div className="cart-sidebar-items">
            {items.length === 0 ? (
              <div className="cart-sidebar-empty">
                <Icon name="shopping-cart" size="lg" />
                <p>Tu carrito está vacío</p>
              </div>
            ) : (
              items.map((item) => (
                <CartItem
                  key={item.productId}
                  productId={item.productId}
                  quantity={item.quantity}
                  product={item.product}
                  onUpdateQuantity={(qty) =>
                    onUpdateQuantity?.(item.productId, qty)
                  }
                  onRemove={() => onRemoveItem?.(item.productId)}
                />
              ))
            )}
          </div>

          {/* Summary */}
          {items.length > 0 && (
            <div className="cart-sidebar-summary">
              <div className="summary-row">
                <span>Subtotal:</span>
                <span className="summary-value">
                  ${subtotal.toFixed(2)}
                </span>
              </div>
              <div className="summary-row">
                <span>Impuestos:</span>
                <span className="summary-value">${tax.toFixed(2)}</span>
              </div>
              <div className="summary-row">
                <span>Envío:</span>
                <span className="summary-value">
                  ${shipping.toFixed(2)}
                </span>
              </div>
              <div className="summary-row summary-total">
                <span>Total:</span>
                <span className="summary-value">${total.toFixed(2)}</span>
              </div>
            </div>
          )}

          {/* Buttons */}
          <div className="cart-sidebar-actions">
            <Button
              variant="outline"
              size="base"
              fullWidth
              onClick={onClose}
              disabled={isLoading}
              aria-label="Continue shopping"
            >
              Continuar Comprando
            </Button>
            <Button
              variant="primary"
              size="base"
              fullWidth
              onClick={onCheckout}
              disabled={items.length === 0 || isLoading}
              isLoading={isLoading}
              aria-label="Go to checkout"
            >
              Checkout
            </Button>
          </div>
        </div>
      </>
    )
  }
)

CartSidebar.displayName = 'CartSidebar'
