import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Card, Button, Badge, Icon, Input } from '@components/atoms'
import { useCart } from '@hooks/useCart'
import { fakeStoreService } from '@services'
import type { Product } from '@types'
import './ProductDetail.css'

export const ProductDetailPage: React.FC = () => {
  const { productId } = useParams<{ productId: string }>()
  const navigate = useNavigate()
  const { addToCart } = useCart()
  const [product, setProduct] = useState<Product | null>(null)
  const [quantity, setQuantity] = useState(1)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const loadProduct = async () => {
      try {
        setIsLoading(true)
        // Fetch product from FakeStore API
        const found = await fakeStoreService.getProductById(productId || '')

        if (!found) {
          setError('Producto no encontrado')
          return
        }

        setProduct(found)
        setError(null)
      } catch (err: unknown) {
        const errorMessage = err instanceof Error ? err.message : 'Error al cargar el producto'
        setError(errorMessage)
        console.error('Error loading product:', err)
      } finally {
        setIsLoading(false)
      }
    }

    if (productId) {
      loadProduct()
    }
  }, [productId])

  const handleAddToCart = () => {
    if (product) {
      addToCart(product, quantity)
      setQuantity(1)
    }
  }

  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseInt(e.target.value, 10)
    const max = product?.stock || 1
    setQuantity(Math.max(1, Math.min(val, max)))
  }

  if (isLoading) {
    return (
      <div className="product-detail-page">
        <div className="loading">Cargando...</div>
      </div>
    )
  }

  if (error || !product) {
    return (
      <div className="product-detail-page">
        <div className="error">
          <p>{error || 'Producto no encontrado'}</p>
          <Button onClick={() => navigate('/')}>Volver al inicio</Button>
        </div>
      </div>
    )
  }

  const isOutOfStock = product.stock === 0
  const hasDiscount = product.discount && product.discount > 0
  const discountedPrice = hasDiscount
    ? (product.price * (1 - (product.discount ?? 0) / 100)).toFixed(2)
    : product.price.toFixed(2)

  return (
    <div className="product-detail-page">
      <div className="product-detail-container">
        {/* Breadcrumb */}
        <nav className="breadcrumb">
          <a href="/" onClick={() => navigate('/')}>
            Inicio
          </a>
          <span> / </span>
          <a href="#" onClick={() => navigate('/')}>
            {product.category}
          </a>
          <span> / </span>
          <span>{product.name}</span>
        </nav>

        {/* Product Content */}
        <div className="product-detail-content">
          {/* Product Image */}
          <div className="product-image-section">
            <img
              src={product.image}
              alt={product.name}
              className="product-image"
            />
            {hasDiscount && (
              <Badge variant="error" className="discount-badge">
                -{product.discount}%
              </Badge>
            )}
            {isOutOfStock && (
              <div className="out-of-stock-overlay">
                <span>Agotado</span>
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="product-info-section">
            <h1 className="product-name">{product.name}</h1>

            {/* Rating */}
            <div className="product-rating">
              <div className="stars">
                {Array.from({ length: 5 }).map((_, i) => (
                  <span key={i} className={i < Math.floor(product.rating) ? 'star filled' : 'star'}>
                    ★
                  </span>
                ))}
              </div>
              <span className="rating-value">{product.rating}/5</span>
            </div>

            {/* Price */}
            <div className="product-price">
              {hasDiscount && (
                <span className="original-price">
                  ${product.price.toFixed(2)}
                </span>
              )}
              <span className="current-price">${discountedPrice}</span>
            </div>

            {/* Description */}
            <p className="product-description">{product.description}</p>

            {/* Stock Info */}
            <div className="product-stock">
              {isOutOfStock ? (
                <Badge variant="error">No disponible</Badge>
              ) : product.stock < 5 ? (
                <Badge variant="warning">
                  Solo {product.stock} disponibles
                </Badge>
              ) : (
                <Badge variant="success">En stock</Badge>
              )}
            </div>

            {/* Add to Cart Section */}
            <div className="product-actions">
              {!isOutOfStock && (
                <div className="quantity-selector">
                  <label htmlFor="quantity">Cantidad:</label>
                  <Input
                    id="quantity"
                    type="number"
                    min="1"
                    max={product.stock}
                    value={quantity}
                    onChange={handleQuantityChange}
                    className="quantity-input"
                  />
                </div>
              )}

              <Button
                variant={isOutOfStock ? 'outline' : 'primary'}
                size="base"
                disabled={isOutOfStock}
                onClick={handleAddToCart}
                className="add-to-cart-btn"
              >
                <Icon name="shopping-cart" size="md" />
                {isOutOfStock ? 'Sin stock' : 'Agregar al carrito'}
              </Button>
            </div>

            {/* Additional Info */}
            <Card variant="outlined" className="additional-info">
              <div className="info-item">
                <strong>Categoría:</strong> {product.category}
              </div>
              <div className="info-item">
                <strong>SKU:</strong> {product.id}
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductDetailPage
