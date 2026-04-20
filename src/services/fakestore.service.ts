/**
 * FakeStore API Service
 * Public API: https://fakestoreapi.com/
 * No requiere autenticación ni setup
 */

import type { Product } from '@types'

class FakeStoreService {
  private baseURL = 'https://fakestoreapi.com'

  // Mapping from English to Spanish
  private categoryMap: Record<string, string> = {
    'electronics': 'Electrónica',
    'jewelery': 'Joyería',
    "men's clothing": 'Ropa Hombre',
    "women's clothing": 'Ropa Mujer',
  }

  /**
   * Get all products
   */
  async getAllProducts(): Promise<Product[]> {
    try {
      const response = await fetch(`${this.baseURL}/products`)
      const data = await response.json()
      return this.mapToProducts(data)
    } catch (error: any) {
      console.error('Error fetching products:', error)
      throw {
        code: 'FETCH_PRODUCTS_ERROR',
        message: 'Error al cargar productos. Intenta más tarde.',
      }
    }
  }

  /**
   * Get product by ID
   */
  async getProductById(productId: string): Promise<Product | null> {
    try {
      const response = await fetch(
        `${this.baseURL}/products/${productId}`
      )

      if (response.status === 404) return null

      const data = await response.json()
      return this.mapToProduct(data)
    } catch (error: any) {
      console.error('Error fetching product:', error)
      throw {
        code: 'FETCH_PRODUCT_ERROR',
        message: 'Error al cargar el producto',
      }
    }
  }

  /**
   * Get all categories (dynamic from FakeStore) - Returns Spanish names
   */
  async getCategories(): Promise<string[]> {
    try {
      const response = await fetch(`${this.baseURL}/products/categories`)
      const categories = await response.json()
      // Map English categories to Spanish
      return categories.map((cat: string) => this.categoryMap[cat] || cat)
    } catch (error: any) {
      console.error('Error fetching categories:', error)
      throw {
        code: 'FETCH_CATEGORIES_ERROR',
        message: 'Error al cargar categorías',
      }
    }
  }

  /**
   * Get products by category
   */
  async getProductsByCategory(category: string): Promise<Product[]> {
    try {
      const response = await fetch(
        `${this.baseURL}/products/category/${category}`
      )
      const data = await response.json()
      return this.mapToProducts(data)
    } catch (error: any) {
      console.error('Error fetching category products:', error)
      throw {
        code: 'FETCH_CATEGORY_PRODUCTS_ERROR',
        message: 'Error al cargar productos de la categoría',
      }
    }
  }

  /**
   * Map FakeStore product to our Product type
   */
  private mapToProduct(fakeProduct: any): Product {
    const categoryEn = fakeProduct.category || 'general'
    const categoryEs = this.categoryMap[categoryEn] || categoryEn
    
    return {
      id: fakeProduct.id?.toString() || '',
      name: fakeProduct.title || '',
      description: fakeProduct.description || '',
      price: fakeProduct.price || 0,
      image: fakeProduct.image || '',
      category: categoryEs,
      rating: fakeProduct.rating?.rate || 0,
      reviews: fakeProduct.rating?.count || 0,
      stock: Math.floor(Math.random() * 100) + 1,
      originalPrice: undefined,
      discount: 0,
      featured: false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }
  }

  /**
   * Map array of FakeStore products
   */
  private mapToProducts(fakeProducts: any[]): Product[] {
    return fakeProducts.map((p) => this.mapToProduct(p))
  }
}

// Export singleton
export const fakeStoreService = new FakeStoreService()
export default fakeStoreService
