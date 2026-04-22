import { create } from 'zustand'
import type { Product } from '@types'

export interface ProductFilters {
  searchQuery: string
  categories: string[]
  priceRange: [number, number]
  minRating: number
  sortBy: 'price-asc' | 'price-desc' | 'rating' | 'newest' | 'name'
}

export interface ProductStore {
  products: Product[]
  filteredProducts: Product[]
  filters: ProductFilters
  isLoading: boolean
  setProducts: (products: Product[]) => void
  setSearchQuery: (query: string) => void
  setCategories: (categories: string[]) => void
  setPriceRange: (range: [number, number]) => void
  setMinRating: (rating: number) => void
  setSortBy: (sort: ProductFilters['sortBy']) => void
  resetFilters: () => void
  applyFilters: () => void
  getFiltered: () => Product[]
}

const DEFAULT_FILTERS: ProductFilters = {
  searchQuery: '',
  categories: [],
  priceRange: [0, 1000],
  minRating: 0,
  sortBy: 'newest',
}

export const useProductStore = create<ProductStore>((set, get) => ({
  products: [],
  filteredProducts: [],
  filters: DEFAULT_FILTERS,
  isLoading: false,

  setProducts: (products: Product[]) => {
    set({ products })
    get().applyFilters()
  },

  setSearchQuery: (query: string) => {
    set({
      filters: {
        ...get().filters,
        searchQuery: query,
      },
    })
    get().applyFilters()
  },

  setCategories: (categories: string[]) => {
    set({
      filters: {
        ...get().filters,
        categories,
      },
    })
    get().applyFilters()
  },

  setPriceRange: (range: [number, number]) => {
    set({
      filters: {
        ...get().filters,
        priceRange: range,
      },
    })
    get().applyFilters()
  },

  setMinRating: (rating: number) => {
    set({
      filters: {
        ...get().filters,
        minRating: rating,
      },
    })
    get().applyFilters()
  },

  setSortBy: (sort: ProductFilters['sortBy']) => {
    set({
      filters: {
        ...get().filters,
        sortBy: sort,
      },
    })
    get().applyFilters()
  },

  resetFilters: () => {
    set({ filters: DEFAULT_FILTERS })
    get().applyFilters()
  },

  applyFilters: () => {
    const { products, filters } = get()
    let result = [...products]

    // Search query filter
    if (filters.searchQuery) {
      const query = filters.searchQuery.toLowerCase()
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(query) ||
          p.description.toLowerCase().includes(query)
      )
    }

    // Category filter (multiple categories)
    if (filters.categories.length > 0) {
      result = result.filter((p) => filters.categories.includes(p.category))
    }

    // Price range filter
    result = result.filter(
      (p) =>
        p.price >= filters.priceRange[0] && p.price <= filters.priceRange[1]
    )

    // Rating filter
    if (filters.minRating > 0) {
      result = result.filter((p) => p.rating >= filters.minRating)
    }

    // Sorting
    switch (filters.sortBy) {
      case 'price-asc':
        result.sort((a, b) => a.price - b.price)
        break
      case 'price-desc':
        result.sort((a, b) => b.price - a.price)
        break
      case 'rating':
        result.sort((a, b) => b.rating - a.rating)
        break
      case 'name':
        result.sort((a, b) => a.name.localeCompare(b.name))
        break
      case 'newest':
      default:
        // Keep original order (newest first)
        break
    }

    set({ filteredProducts: result })
  },

  getFiltered: () => {
    return get().filteredProducts
  },
}))
