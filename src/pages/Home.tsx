import React, { useEffect, useState } from 'react'
import { ProductGallery } from '@components/organisms'
import { FilterGroup, Pagination, SearchInput } from '@components/molecules'
import { useProducts, useCart } from '@hooks/index'
import { fakeStoreService } from '@services'
import './Home.css'

export interface HomePageProps {
  onAddToCart?: (productId: string, quantity: number) => void
  onProductClick?: (productId: string) => void
}

export const HomePage: React.FC<HomePageProps> = ({
  onAddToCart,
  onProductClick,
}) => {
  const { products, filters, search, filterByCategory, sort, loadProducts } =
    useProducts()
  const { addToCart } = useCart()
  const [currentPage, setCurrentPage] = React.useState(1)
  const [categories, setCategories] = useState<string[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const itemsPerPage = 12

  // Load products from FakeStore API
  useEffect(() => {
    let isMounted = true

    const loadFakeStoreProducts = async () => {
      setIsLoading(true)
      setError(null)

      try {
        const fakeStoreProducts = await fakeStoreService.getAllProducts()
        if (isMounted) {
          loadProducts(fakeStoreProducts)
          console.log(`✅ Loaded ${fakeStoreProducts.length} products from FakeStore`)
        }
      } catch (err: any) {
        if (isMounted) {
          const errorMessage = err?.message || 'Error al cargar productos'
          setError(errorMessage)
          console.error('Error loading products:', err)
        }
      } finally {
        if (isMounted) {
          setIsLoading(false)
        }
      }
    }

    const loadCategories = async () => {
      try {
        const fetchedCategories = await fakeStoreService.getCategories()
        if (isMounted) {
          setCategories(fetchedCategories)
        }
      } catch (error: any) {
        console.error('Error loading categories:', error.message)
        // Don't block the page if categories fail to load
      }
    }

    loadFakeStoreProducts()
    loadCategories()

    // Cleanup function to prevent memory leaks
    return () => {
      isMounted = false
    }
  }, [])

  const handleAddToCart = (product: any, quantity: number) => {
    addToCart(product, quantity)
    if (onAddToCart) {
      onAddToCart(product.id, quantity)
    }
  }

  const handleSearch = (query: string) => {
    search(query)
    setCurrentPage(1)
  }

  const handleFilterCategory = (categories: string[]) => {
    filterByCategory(categories)
    setCurrentPage(1)
  }

  const handleSort = (sortBy: any) => {
    sort(sortBy)
  }

  // Pagination logic
  const totalPages = Math.ceil(products.length / itemsPerPage)
  const startIdx = (currentPage - 1) * itemsPerPage
  const endIdx = startIdx + itemsPerPage
  const paginatedProducts = products.slice(startIdx, endIdx)

  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="home-hero">
        <div className="hero-content">
          <h1 className="hero-title">Bienvenido a E-Store</h1>
          <p className="hero-subtitle">Descubre los mejores productos al mejor precio</p>
        </div>
      </section>

      {/* Loading State */}
      {isLoading && (
        <div className="loading-container">
          <p>Cargando productos...</p>
        </div>
      )}

      {/* Error State */}
      {error && (
        <div className="error-container" style={{ backgroundColor: '#fee2e2', padding: '1rem', margin: '1rem', borderRadius: '0.5rem', color: '#dc2626' }}>
          <p>❌ {error}</p>
          <button onClick={() => window.location.reload()} style={{ marginTop: '0.5rem', padding: '0.5rem 1rem', backgroundColor: '#ef4444', color: 'white', border: 'none', borderRadius: '0.25rem', cursor: 'pointer' }}>
            Reintentar
          </button>
        </div>
      )}

      {/* Main Content */}
      {!isLoading && !error && products.length === 0 && (
        <div className="empty-state" style={{ textAlign: 'center', padding: '2rem' }}>
          <p>No hay productos disponibles en este momento</p>
        </div>
      )}

      {!isLoading && !error && products.length > 0 && (
      <div className="home-container">
        {/* Filters Bar - Horizontal & Minimal */}
        <div className="home-filters-bar">
          <div className="filters-content">
            <div className="filter-section">
              <span className="filter-label">Categorías:</span>
              <FilterGroup
                categories={categories}
                selectedCategories={filters.categories}
                onChange={(cats: string[]) =>
                  handleFilterCategory(cats)
                }
              />
            </div>

            <div className="filter-section">
              <span className="filter-label">Ordenar:</span>
              <select
                className="sort-select"
                value={filters.sortBy}
                onChange={(e) =>
                  handleSort(
                    e.target.value as any
                  )
                }
              >
                <option value="newest">Más recientes</option>
                <option value="price-asc">Precio: Menor a Mayor</option>
                <option value="price-desc">Precio: Mayor a Menor</option>
                <option value="rating">Rating más alto</option>
                <option value="name">Nombre A-Z</option>
              </select>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <main className="home-main">
          {/* Results Count */}
          <div className="results-info">
            <p>
              Mostrando {startIdx + 1} - {Math.min(endIdx, products.length)} de{' '}
              {products.length} productos
            </p>
          </div>

          {/* Products Grid */}
          <ProductGallery
            products={paginatedProducts}
            onAddToCart={handleAddToCart}
            onViewDetail={onProductClick}
            itemsPerRow={4}
            variant="grid"
            emptyMessage="No se encontraron productos"
          />

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="home-pagination">
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
              />
            </div>
          )}
        </main>
      </div>
      )}
    </div>
  )
}

export default HomePage
