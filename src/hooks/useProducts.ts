import { useCallback } from 'react'
import { useProductStore } from '@store/productStore'

export const useProducts = () => {
  const store = useProductStore()

  const search = useCallback(
    (query: string) => {
      // ✅ VALIDATION: Sanitize and limit search query
      const sanitizedQuery = (query || '').trim().slice(0, 100)
      store.setSearchQuery(sanitizedQuery)
    },
    [store]
  )

  const filterByCategory = useCallback(
    (categories: string[]) => {
      // ✅ VALIDATION: Ensure categories is array
      if (!Array.isArray(categories)) {
        console.error('❌ filterByCategory expects array, got:', typeof categories)
        return
      }
      store.setCategories(categories)
    },
    [store]
  )

  const filterByPrice = useCallback(
    (min: number, max: number) => {
      // ✅ VALIDATION: Validate price range
      if (typeof min !== 'number' || typeof max !== 'number') {
        console.error('❌ Price values must be numbers')
        return
      }
      if (min < 0 || max < 0) {
        console.error('❌ Price values cannot be negative')
        return
      }
      if (min > max) {
        console.error('❌ Min price cannot be greater than max price')
        return
      }
      store.setPriceRange([min, max])
    },
    [store]
  )

  const filterByRating = useCallback(
    (rating: number) => {
      // ✅ VALIDATION: Rating between 0-5
      if (typeof rating !== 'number' || rating < 0 || rating > 5) {
        console.error('❌ Rating must be between 0 and 5')
        return
      }
      store.setMinRating(rating)
    },
    [store]
  )

  const sort = useCallback(
    (sortBy: 'price-asc' | 'price-desc' | 'rating' | 'newest' | 'name') => {
      // ✅ VALIDATION: Valid sort options
      const validSortOptions = ['price-asc', 'price-desc', 'rating', 'newest', 'name']
      if (!validSortOptions.includes(sortBy)) {
        console.error('❌ Invalid sort option:', sortBy)
        return
      }
      store.setSortBy(sortBy)
    },
    [store]
  )

  const reset = useCallback(() => {
    store.resetFilters()
  }, [store])

  const loadProducts = useCallback(
    (products: any[]) => {
      // ✅ VALIDATION: Ensure products is array
      if (!Array.isArray(products)) {
        console.error('❌ loadProducts expects array')
        return
      }
      store.setProducts(products)
    },
    [store]
  )

  return {
    products: store.filteredProducts,
    allProducts: store.products,
    filters: store.filters,
    search,
    filterByCategory,
    filterByPrice,
    filterByRating,
    sort,
    reset,
    loadProducts,
  }
}
