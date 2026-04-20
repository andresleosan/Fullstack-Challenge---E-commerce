import React from 'react'
import { Input, Button, Icon } from '../atoms'
import type { Product } from '@types'
import './CartItem.css'

export interface CartItemProps {
  productId: string
  quantity: number
  product?: Product
  onUpdateQuantity?: (quantity: number) => void
  onRemove?: () => void
}

/**
 * CartItem Molecule
 * Combina: Input, Button, Icon
 * Muestra un item del carrito con cantidad editable y botón eliminar
 */
export const CartItem = React.forwardRef<HTMLDivElement, CartItemProps>(
  (
    {
      productId,
      quantity,
      product,
      onUpdateQuantity,
      onRemove,
    },
    ref
  ) => {
    // Extraer información del producto
    const { name = 'Unknown Product', price = 0, stock = 0, image } = product || {}

    const handleQuantityChange = (newQ: number) => {
      const clamped = Math.max(1, Math.min(stock, newQ))
      if (onUpdateQuantity) {
        onUpdateQuantity(clamped)
      }
    }

    return (
      <div ref={ref} className="cart-item" data-product-id={productId}>
        {image && (
          <img src={image} alt={name} className="cart-item-image" loading="lazy" />
        )}

        <div className="cart-item-details">
          <h4 className="cart-item-name">{name}</h4>
          <p className="cart-item-price">${price.toFixed(2)}</p>
        </div>

        <div className="cart-item-quantity">
          <Button
            size="sm"
            variant="ghost"
            onClick={() => handleQuantityChange(quantity - 1)}
            aria-label="Disminuir cantidad"
          >
            <Icon name="close" size="sm" />
          </Button>
          <Input
            type="number"
            min="1"
            max={stock}
            value={quantity}
            onChange={(e) => handleQuantityChange(parseInt(e.target.value) || 1)}
            className="quantity-input"
          />
          <Button
            size="sm"
            variant="ghost"
            onClick={() => handleQuantityChange(quantity + 1)}
            aria-label="Aumentar cantidad"
          >
            +
          </Button>
        </div>

        <div className="cart-item-total">
          <span className="total-label">Total:</span>
          <span className="total-value">${(price * quantity).toFixed(2)}</span>
        </div>

        {onRemove && (
          <Button
            size="sm"
            variant="ghost"
            onClick={onRemove}
            className="cart-item-remove"
            aria-label="Eliminar del carrito"
          >
            <Icon name="close" size="md" color="#ef4444" />
          </Button>
        )}
      </div>
    )
  }
)

CartItem.displayName = 'CartItem'
