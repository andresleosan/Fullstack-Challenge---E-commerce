import { useCallback } from 'react'
import { useProductStore } from '@store/productStore'

export const useProducts = () => {
  const store = useProductStore()

  const search = useCallback(
    (query: string) => {
      store.setSearchQuery(query)
    },
    [store]
  )

  const filterByCategory = useCallback(
    (category: string | null) => {
      store.setCategory(category)
    },
    [store]
  )

  const filterByPrice = useCallback(
    (min: number, max: number) => {
      store.setPriceRange([min, max])
    },
    [store]
  )

  const filterByRating = useCallback(
    (rating: number) => {
      store.setMinRating(rating)
    },
    [store]
  )

  const sort = useCallback(
    (
      sortBy:
        | 'price-asc'
        | 'price-desc'
        | 'rating'
        | 'newest'
        | 'name'
    ) => {
      store.setSortBy(sortBy)
    },
    [store]
  )

  const reset = useCallback(() => {
    store.resetFilters()
  }, [store])

  const loadProducts = useCallback(
    (products: any[]) => {
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
