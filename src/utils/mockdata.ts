/**
 * Mock Data - Datos de prueba para desarrollo
 * Será reemplazado por datos reales de Firebase en Phase 3
 */

import { Product, Order } from '@types/index'

// Mock Products para catálogo
export const mockProducts: Product[] = [
  {
    id: 'prod-1',
    name: 'Laptop PRO 15"',
    description: 'Laptop de 15 pulgadas con procesador de última generación',
    price: 1299.99,
    originalPrice: 1499.99,
    category: 'Electronics',
    rating: 4.5,
    reviews: 128,
    stock: 15,
    badge: 'Sale',
    image: 'https://via.placeholder.com/300x300?text=Laptop',
  },
  {
    id: 'prod-2',
    name: 'Wireless Headphones',
    description: 'Auriculares inalámbricos con cancelación de ruido',
    price: 199.99,
    originalPrice: 249.99,
    category: 'Electronics',
    rating: 4.8,
    reviews: 342,
    stock: 45,
    badge: '',
    image: 'https://via.placeholder.com/300x300?text=Headphones',
  },
  {
    id: 'prod-3',
    name: 'Smart Watch',
    description: 'Reloj inteligente con monitoreo de salud',
    price: 299.99,
    originalPrice: 349.99,
    category: 'Electronics',
    rating: 4.3,
    reviews: 89,
    stock: 30,
    badge: 'NEW',
    image: 'https://via.placeholder.com/300x300?text=SmartWatch',
  },
  {
    id: 'prod-4',
    name: 'USB-C Cable',
    description: 'Cable USB-C de alta velocidad 2 metros',
    price: 19.99,
    originalPrice: 29.99,
    category: 'Accessories',
    rating: 4.6,
    reviews: 256,
    stock: 100,
    badge: '',
    image: 'https://via.placeholder.com/300x300?text=USB-C+Cable',
  },
  {
    id: 'prod-5',
    name: 'Phone Stand',
    description: 'Soporte para teléfono ajustable',
    price: 29.99,
    originalPrice: 39.99,
    category: 'Accessories',
    rating: 4.7,
    reviews: 178,
    stock: 80,
    badge: '',
    image: 'https://via.placeholder.com/300x300?text=Phone+Stand',
  },
  {
    id: 'prod-6',
    name: 'Keyboard Mechanical',
    description: 'Teclado mecánico para gaming RGB',
    price: 129.99,
    originalPrice: 159.99,
    category: 'Electronics',
    rating: 4.9,
    reviews: 412,
    stock: 25,
    badge: 'Popular',
    image: 'https://via.placeholder.com/300x300?text=Keyboard',
  },
  {
    id: 'prod-7',
    name: 'Mouse Wireless',
    description: 'Ratón inalámbrico de precisión',
    price: 49.99,
    originalPrice: 69.99,
    category: 'Accessories',
    rating: 4.4,
    reviews: 234,
    stock: 60,
    badge: '',
    image: 'https://via.placeholder.com/300x300?text=Mouse',
  },
  {
    id: 'prod-8',
    name: 'Monitor 4K',
    description: 'Monitor 4K de 32 pulgadas para productividad',
    price: 499.99,
    originalPrice: 599.99,
    category: 'Electronics',
    rating: 4.6,
    reviews: 167,
    stock: 12,
    badge: 'Sale',
    image: 'https://via.placeholder.com/300x300?text=Monitor',
  },
  {
    id: 'prod-9',
    name: 'Webcam HD',
    description: 'Cámara web HD 1080p con micrófono',
    price: 79.99,
    originalPrice: 99.99,
    category: 'Accessories',
    rating: 4.5,
    reviews: 145,
    stock: 40,
    badge: '',
    image: 'https://via.placeholder.com/300x300?text=Webcam',
  },
  {
    id: 'prod-10',
    name: 'SSD 1TB',
    description: 'Unidad SSD de 1TB de alta velocidad',
    price: 89.99,
    originalPrice: 119.99,
    category: 'Electronics',
    rating: 4.7,
    reviews: 521,
    stock: 55,
    badge: '',
    image: 'https://via.placeholder.com/300x300?text=SSD',
  },
  {
    id: 'prod-11',
    name: 'RAM 16GB',
    description: 'Memoria RAM DDR4 16GB 3200MHz',
    price: 59.99,
    originalPrice: 79.99,
    category: 'Electronics',
    rating: 4.8,
    reviews: 389,
    stock: 35,
    badge: '',
    image: 'https://via.placeholder.com/300x300?text=RAM',
  },
  {
    id: 'prod-12',
    name: 'Power Bank',
    description: 'Batería portátil 20000mAh',
    price: 39.99,
    originalPrice: 54.99,
    category: 'Accessories',
    rating: 4.5,
    reviews: 298,
    stock: 70,
    badge: 'Sale',
    image: 'https://via.placeholder.com/300x300?text=PowerBank',
  },
]

// Mock Categories
export const mockCategories = [
  { id: 'cat-1', name: 'Electronics', count: 6 },
  { id: 'cat-2', name: 'Accessories', count: 6 },
]

// Mock Orders (para historial)
export const mockOrders: Order[] = [
  {
    id: 'order-001',
    userId: 'user123',
    items: [
      {
        productId: 'prod-1',
        quantity: 1,
        product: mockProducts[0],
      },
    ],
    total: 1299.99,
    status: 'delivered',
    createdAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
    updatedAt: new Date(Date.now() - 25 * 24 * 60 * 60 * 1000),
  },
  {
    id: 'order-002',
    userId: 'user123',
    items: [
      {
        productId: 'prod-2',
        quantity: 1,
        product: mockProducts[1],
      },
      {
        productId: 'prod-4',
        quantity: 2,
        product: mockProducts[3],
      },
    ],
    total: 239.97,
    status: 'delivered',
    createdAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000),
    updatedAt: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000),
  },
]

// Helper: obtener producto por ID
export const getProductById = (id: string): Product | undefined => {
  return mockProducts.find((p) => p.id === id)
}

// Helper: filtrar productos
export const filterProducts = (
  query: string = '',
  category: string = '',
  priceRange: [number, number] = [0, 1000]
): Product[] => {
  return mockProducts.filter((product) => {
    const matchesQuery =
      !query ||
      product.name.toLowerCase().includes(query.toLowerCase()) ||
      product.description.toLowerCase().includes(query.toLowerCase())

    const matchesCategory = !category || product.category === category

    const matchesPrice =
      product.price >= priceRange[0] && product.price <= priceRange[1]

    return matchesQuery && matchesCategory && matchesPrice
  })
}

// Helper: ordenar productos
export const sortProducts = (
  products: Product[],
  sortBy: 'price-asc' | 'price-desc' | 'rating' | 'newest'
): Product[] => {
  const sorted = [...products]

  switch (sortBy) {
    case 'price-asc':
      return sorted.sort((a, b) => a.price - b.price)
    case 'price-desc':
      return sorted.sort((a, b) => b.price - a.price)
    case 'rating':
      return sorted.sort((a, b) => b.rating - a.rating)
    case 'newest':
      return sorted.reverse() // Asume que el último es newer
    default:
      return sorted
  }
}
