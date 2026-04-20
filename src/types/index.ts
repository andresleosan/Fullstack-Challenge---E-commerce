/* Product Types */
export interface Product {
  id: string
  name: string
  description: string
  price: number
  originalPrice?: number
  discount?: number
  category: string
  rating: number
  reviews: number
  stock: number
  badge?: string
  image?: string
  featured?: boolean
  tags?: string[]
  createdAt?: string
  updatedAt?: string
}

/* Cart Types */
export interface CartItem {
  productId: string
  quantity: number
  product?: Product
  // Propiedades de conveniencia para compatibilidad
  id?: string
  name?: string
  price?: number
  image?: string
  stock?: number
}

export interface Cart {
  items: CartItem[]
  subtotal: number
  taxes: number
  shipping: number
  total: number
}

/* Order Types */
export interface OrderItem {
  productId: string
  name: string
  price: number
  quantity: number
  total: number
}

export interface Order {
  id: string
  userId: string
  items: OrderItem[]
  total: number
  subtotal: number
  tax: number
  shipping: number
  shippingAddress: {
    street: string
    city: string
    postalCode: string
    country: string
  }
  paymentMethod: 'card' | 'paypal' | 'transfer'
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled'
  paymentStatus: 'pending' | 'completed' | 'failed' | 'refunded'
  notes?: string
  createdAt: string
  updatedAt: string
}

/* User Types */
export interface User {
  id: string
  name: string
  email: string
  avatar?: string
  role: 'customer' | 'admin'
  createdAt: string
}

export interface AuthState {
  isAuthenticated: boolean
  user: User | null
  loading: boolean
  error: string | null
}

/* Filter Types */
export interface ProductFilters {
  searchQuery: string
  category?: string
  priceRange: [number, number]
  minRating: number
  sortBy: 'price-asc' | 'price-desc' | 'rating' | 'newest'
}
