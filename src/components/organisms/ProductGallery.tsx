import React from 'react'
import { ProductCard } from '@components/molecules'
import { Loader } from '@components/atoms'
import type { Product } from '@types'
import './ProductGallery.css'

export interface ProductGalleryProps {
  products: Product[]
  isLoading?: boolean
  onAddToCart?: (product: Product, quantity: number) => void
  onViewDetail?: (productId: string) => void
  variant?: 'grid' | 'list'
  itemsPerRow?: 2 | 3 | 4
  emptyMessage?: string
  className?: string
}

/**
 * ProductGallery Organism
 * Combina: ProductCard molecules
 * Galería/Grid de productos con múltiples variantes
 */
export const ProductGallery = React.forwardRef<HTMLDivElement, ProductGalleryProps>(
  (
    {
      products,
      isLoading = false,
      onAddToCart,
      onViewDetail,
      variant = 'grid',
      itemsPerRow = 4,
      emptyMessage = 'No hay productos disponibles',
      className = '',
    },
    ref
  ) => {
    const gridClass =
      variant === 'grid'
        ? `product-gallery--grid-${itemsPerRow}`
        : 'product-gallery--list'

    if (isLoading) {
      return (
        <div ref={ref} className={`product-gallery ${className}`}>
          <div className="product-gallery-loader">
            <Loader variant="spinner" size="lg" />
            <p className="loader-text">Cargando productos...</p>
          </div>
        </div>
      )
    }

    if (!products || products.length === 0) {
      return (
        <div ref={ref} className={`product-gallery ${className}`}>
          <div className="product-gallery-empty">
            <p className="empty-message">{emptyMessage}</p>
          </div>
        </div>
      )
    }

    return (
      <div
        ref={ref}
        className={`product-gallery ${gridClass} ${className}`}
        role="region"
        aria-label="Product gallery"
      >
        {products.map((product) => (
          <div key={product.id} className="product-gallery-item">
            <ProductCard
              product={product}
              onAddToCart={onAddToCart}
              onViewDetail={onViewDetail}
              variant={variant === 'list' ? 'compact' : 'default'}
            />
          </div>
        ))}
      </div>
    )
  }
)

ProductGallery.displayName = 'ProductGallery'
