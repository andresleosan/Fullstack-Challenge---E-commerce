/**
 * Products Service
 * Firestore products management
 */

import {
  collection,
  getDocs,
  getDoc,
  doc,
  query,
  where,
  orderBy,
  limit,
} from 'firebase/firestore'
import { db } from '@config/firebase'
import type { Product } from '@types'

/**
 * Products Service Class
 */
class ProductsService {
  private collectionName = 'products'

  /**
   * Get all products
   */
  async getAllProducts(): Promise<Product[]> {
    try {
      const querySnapshot = await getDocs(
        collection(db, this.collectionName)
      )

      return querySnapshot.docs
        .map((doc) => this.docToProduct(doc))
        .filter((product): product is Product => product !== null)
    } catch (error: any) {
      console.error('Error getting products:', error)
      throw {
        code: 'GET_PRODUCTS_ERROR',
        message: 'Error al obtener productos',
      }
    }
  }

  /**
   * Get product by ID
   */
  async getProductById(productId: string): Promise<Product | null> {
    try {
      const docRef = doc(db, this.collectionName, productId)
      const docSnap = await getDoc(docRef)

      if (docSnap.exists()) {
        return this.docToProduct(docSnap)
      }

      return null
    } catch (error: any) {
      console.error('Error getting product:', error)
      throw {
        code: 'GET_PRODUCT_ERROR',
        message: 'Error al obtener el producto',
      }
    }
  }

  /**
   * Get products by category
   */
  async getProductsByCategory(category: string): Promise<Product[]> {
    try {
      const q = query(
        collection(db, this.collectionName),
        where('category', '==', category),
        orderBy('createdAt', 'desc')
      )

      const querySnapshot = await getDocs(q)

      return querySnapshot.docs
        .map((doc) => this.docToProduct(doc))
        .filter((product): product is Product => product !== null)
    } catch (error: any) {
      console.error('Error getting products by category:', error)
      throw {
        code: 'GET_CATEGORY_PRODUCTS_ERROR',
        message: 'Error al obtener productos de la categoría',
      }
    }
  }

  /**
   * Search products
   */
  async searchProducts(term: string): Promise<Product[]> {
    try {
      const q = query(
        collection(db, this.collectionName),
        where('name', '>=', term),
        where('name', '<=', term + '\uf8ff'),
        orderBy('name', 'asc')
      )

      const querySnapshot = await getDocs(q)

      return querySnapshot.docs
        .map((doc) => this.docToProduct(doc))
        .filter((product): product is Product => product !== null)
    } catch (error: any) {
      console.error('Error searching products:', error)
      // Fallback to client-side search if server-side fails
      const allProducts = await this.getAllProducts()
      return allProducts.filter((p) =>
        p.name.toLowerCase().includes(term.toLowerCase()) ||
        p.description?.toLowerCase().includes(term.toLowerCase())
      )
    }
  }

  /**
   * Get products on sale
   */
  async getOnSaleProducts(limit_?: number): Promise<Product[]> {
    try {
      const q = query(
        collection(db, this.collectionName),
        where('discount', '>', 0),
        orderBy('discount', 'desc'),
        limit(limit_ || 10)
      )

      const querySnapshot = await getDocs(q)

      return querySnapshot.docs
        .map((doc) => this.docToProduct(doc))
        .filter((product): product is Product => product !== null)
    } catch (error: any) {
      console.error('Error getting sale products:', error)
      throw {
        code: 'GET_SALE_PRODUCTS_ERROR',
        message: 'Error al obtener productos en oferta',
      }
    }
  }

  /**
   * Get featured products
   */
  async getFeaturedProducts(limit_?: number): Promise<Product[]> {
    try {
      const q = query(
        collection(db, this.collectionName),
        where('featured', '==', true),
        orderBy('createdAt', 'desc'),
        limit(limit_ || 8)
      )

      const querySnapshot = await getDocs(q)

      return querySnapshot.docs
        .map((doc) => this.docToProduct(doc))
        .filter((product): product is Product => product !== null)
    } catch (error: any) {
      console.error('Error getting featured products:', error)
      throw {
        code: 'GET_FEATURED_PRODUCTS_ERROR',
        message: 'Error al obtener productos destacados',
      }
    }
  }

  /**
   * Convert Firestore document to Product
   */
  private docToProduct(
    doc: any
  ): Product | null {
    if (!doc.exists()) return null

    try {
      const data = doc.data()

      return {
        id: doc.id,
        name: data.name || '',
        description: data.description || '',
        price: data.price || 0,
        image: data.image || '',
        category: data.category || '',
        stock: data.stock || 0,
        rating: data.rating || 0,
        reviews: data.reviews || 0,
        discount: data.discount || 0,
        featured: data.featured || false,
        tags: data.tags || [],
        createdAt: data.createdAt || new Date().toISOString(),
        updatedAt: data.updatedAt || new Date().toISOString(),
      }
    } catch (error) {
      console.error('Error converting document to product:', error)
      return null
    }
  }
}

// Export singleton instance
export const productsService = new ProductsService()

export default productsService
