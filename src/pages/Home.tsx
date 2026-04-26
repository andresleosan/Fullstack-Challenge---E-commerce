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
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const titleRef = React.useRef<HTMLHeadingElement>(null)
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
        }
      } catch (err: unknown) {
        if (isMounted) {
          const errorMessage = err instanceof Error ? err.message : 'Error al cargar productos'
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
      } catch (error: unknown) {
        const message = error instanceof Error ? error.message : 'Error loading categories'
        console.error('Error loading categories:', message)
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

  // Mouse tracking para efecto de letras
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY })
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  const handleAddToCart = (product: { id: string }, quantity: number) => {
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

  const handleSort = (
    sortBy: 'price-asc' | 'price-desc' | 'rating' | 'newest' | 'name'
  ) => {
    sort(sortBy)
  }

  // Función para calcular distancia real entre cursor y letra
  const calculateLetterDistance = (index: number) => {
    if (!titleRef.current) return 999
    
    const letterSpans = titleRef.current.querySelectorAll('.hero-letter')
    const letterSpan = letterSpans[index] as HTMLElement
    
    if (!letterSpan) return 999
    
    const rect = letterSpan.getBoundingClientRect()
    const letterCenterX = rect.left + rect.width / 2
    const letterCenterY = rect.top + rect.height / 2
    
    const dx = mousePos.x - letterCenterX
    const dy = mousePos.y - letterCenterY
    
    return Math.sqrt(dx * dx + dy * dy)
  }

  // Función para renderizar título con letras interactivas
  const renderInteractiveTitle = () => {
    const title = 'Bienvenido a E-Store'
    
    return (
      <h1 ref={titleRef} className="hero-title">
        {title.split('').map((char, index) => {
          // Calcular distancia real desde el cursor a esta letra
          const distance = calculateLetterDistance(index)
          const isNear = distance < 80 // Activa efecto si está a menos de 80px
          
          // Escala aumenta cuando está cerca
          const scale = isNear ? Math.max(1, 1.2 - distance / 200) : 1
          
          // Color: blanco en reposo, cyan brillante cuando está cerca
          let hue = 180 // Cyan
          let saturation = isNear ? 100 : 0 // Saturación solo cuando está cerca
          let lightness = isNear ? Math.max(45, 65 - distance / 50) : 100 // Blanco en reposo
          
          return (
            <span
              key={index}
              className="hero-letter"
              style={{
                display: 'inline-block',
                transform: `scale(${scale})`,
                transition: 'all 0.1s ease',
                color: `hsl(${hue}, ${saturation}%, ${lightness}%)`,
              }}
            >
              {char}
            </span>
          )
        })}
      </h1>
    )
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
          {renderInteractiveTitle()}
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
        <div className="error-container">
          <p>❌ {error}</p>
          <button onClick={() => window.location.reload()} className="error-retry-button">
            Reintentar
          </button>
        </div>
      )}

      {/* Main Content */}
      {!isLoading && !error && products.length === 0 && (
        <div className="empty-state">
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
                    e.target.value as 'price-asc' | 'price-desc' | 'rating' | 'newest' | 'name'
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
