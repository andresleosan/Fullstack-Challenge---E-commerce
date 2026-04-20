import React from 'react'
import { Card, Button, Badge, Icon } from '../atoms'
import { Product } from '../../types'
import './ProductCard.css'

export interface ProductCardProps {
  product: Product
  onAddToCart?: (product: Product, quantity: number) => void
  onViewDetail?: (productId: string) => void
}

/**
 * ProductCard Molecule
 * Combina: Card, Badge, Button, Icon
 * Muestra producto con imagen, precio, rating, y botón add-to-cart
 */
export const ProductCard = React.forwardRef<HTMLDivElement, ProductCardProps>(
  ({ product, onAddToCart, onViewDetail }, ref) => {
    const [quantity, setQuantity] = React.useState(1)

    const handleAddToCart = () => {
      if (onAddToCart) {
        onAddToCart(product, quantity)
        setQuantity(1)
      }
    }

    return (
      <Card ref={ref} variant="product" className="product-card">
        <div className="product-card-image">
          <img
            src={product.image || 'https://via.placeholder.com/250x200?text=Product'}
            alt={product.name}
            loading="lazy"
          />
          {product.badge && (
            <Badge variant="primary" size="sm" className="product-card-badge">
              {product.badge}
            </Badge>
          )}
        </div>

        <Card.Body className="product-card-body">
          <h3 className="product-card-title">{product.name}</h3>
          <p className="product-card-description">{product.description}</p>

          <div className="product-card-rating">
            <span className="rating-stars">★★★★☆</span>
            <span className="rating-value">
              {product.rating}
              <span className="rating-count">({product.reviews})</span>
            </span>
          </div>

          <div className="product-card-price">
            <span className="price-current">${product.price}</span>
            {product.originalPrice > product.price && (
              <span className="price-original">${product.originalPrice}</span>
            )}
          </div>
        </Card.Body>

        <Card.Footer className="product-card-footer">
          <div className="quantity-selector">
            <button
              className="quantity-btn"
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              aria-label="Disminuir cantidad"
            >
              <Icon name="close" size="sm" />
            </button>
            <input
              type="number"
              min="1"
              max={product.stock}
              value={quantity}
              onChange={(e) => setQuantity(Math.min(product.stock, Math.max(1, parseInt(e.target.value) || 1)))}
              className="quantity-input"
              aria-label="Cantidad"
            />
            <button
              className="quantity-btn"
              onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
              aria-label="Aumentar cantidad"
            >
              +
            </button>
          </div>

          <Button
            variant="primary"
            size="sm"
            onClick={handleAddToCart}
            disabled={product.stock === 0}
            className="add-to-cart-btn"
          >
            Agregar
          </Button>

          {onViewDetail && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => onViewDetail(product.id)}
              className="view-detail-btn"
            >
              Ver
            </Button>
          )}
        </Card.Footer>
      </Card>
    )
  }
)

ProductCard.displayName = 'ProductCard'
