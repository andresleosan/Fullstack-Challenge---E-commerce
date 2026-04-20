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
  const itemsPerPage = 12

  // Load products from FakeStore API
  useEffect(() => {
    const loadFakeStoreProducts = async () => {
      setIsLoading(true)
      const timeout = setTimeout(() => {
        setIsLoading(false)
      }, 5000)

      try {
        const fakeStoreProducts = await fakeStoreService.getAllProducts()
        clearTimeout(timeout)
        loadProducts(fakeStoreProducts)
        console.log(`✅ Loaded ${fakeStoreProducts.length} products from FakeStore`)
        setIsLoading(false)
      } catch (error: any) {
        clearTimeout(timeout)
        console.error('Error loading products:', error.message)
        setIsLoading(false)
      }
    }

    const loadCategories = async () => {
      try {
        const fetchedCategories = await fakeStoreService.getCategories()
        setCategories(fetchedCategories)
      } catch (error: any) {
        console.error('Error loading categories:', error.message)
      }
    }

    loadFakeStoreProducts()
    loadCategories()
  }, [loadProducts])

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
      {/* {isLoading && (
        <div className="loading-container">
          <p>Cargando productos...</p>
        </div>
      )} */}

      {/* Main Content */}
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
          {/* Search Bar */}
          <div className="home-search">
            <SearchInput
              value={filters.searchQuery}
              onChange={handleSearch}
              placeholder="¿Qué buscas?"
            />
          </div>

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
    </div>
  )
}

export default HomePage
