import React, { useEffect } from 'react'
import { ProductGallery } from '@components/organisms'
import { FilterGroup, Pagination, SearchInput } from '@components/molecules'
import { useProducts, useCart } from '@hooks/index'
import { mockProducts } from '@utils/mockdata'
import './Home.css'

export interface HomePageProps {
  onAddToCart?: (productId: string, quantity: number) => void
  onProductClick?: (productId: string) => void
}

export const HomePage: React.FC<HomePageProps> = ({
  onAddToCart,
  onProductClick,
}) => {
  const { products, filters, search, filterByCategory, filterByPrice, sort } =
    useProducts()
  const { addToCart } = useCart()
  const [currentPage, setCurrentPage] = React.useState(1)
  const itemsPerPage = 12

  // Load initial products
  useEffect(() => {
    // In real app, this would be an API call
    const loadedProducts = mockProducts
    // Store products in state
    console.log('Loaded products:', loadedProducts.length)
  }, [])

  const categories = Array.from(
    new Set(mockProducts.map((p) => p.category))
  )

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

  const handleFilterCategory = (category: string | null) => {
    filterByCategory(category)
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

      {/* Main Content */}
      <div className="home-container">
        {/* Sidebar - Filters */}
        <aside className="home-sidebar">
          <div className="filters-section">
            <h3 className="filters-title">Filtros</h3>

            {/* Category Filter */}
            <div className="filter-group">
              <h4>Categorías</h4>
              <FilterGroup
                categories={categories}
                selectedCategories={filters.category ? [filters.category] : []}
                onChange={(cats) =>
                  handleFilterCategory(cats.length > 0 ? cats[0] : null)
                }
              />
            </div>

            {/* Sort */}
            <div className="filter-group">
              <h4>Ordenar por</h4>
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
        </aside>

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
