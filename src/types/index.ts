/* Product Types */
export interface Product {
  id: string
  name: string
  description: string
  price: number
  originalPrice: number
  discount?: number
  category: string
  rating: number
  reviews: number
  stock: number
  badge?: string
  image?: string
}

/* Cart Types */
export interface CartItem {
  productId: string
  quantity: number
  product?: Product
}

export interface Cart {
  items: CartItem[]
  subtotal: number
  taxes: number
  shipping: number
  total: number
}

/* User Types */
export interface User {
  id: string
  name: string
  email: string
  avatar?: string
  role: 'customer' | 'admin'
  createdAt: string | Date
}

export interface AuthState {
  isAuthenticated: boolean
  user: User | null
  loading: boolean
  error: string | null
}

/* Order Types */
export interface Order {
  id: string
  userId: string
  items: CartItem[]
  total: number
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled'
  createdAt: Date
  updatedAt: Date
}

/* Filter Types */
export interface ProductFilters {
  searchQuery: string
  category?: string
  priceRange: [number, number]
  minRating: number
  sortBy: 'price-asc' | 'price-desc' | 'rating' | 'newest'
}
