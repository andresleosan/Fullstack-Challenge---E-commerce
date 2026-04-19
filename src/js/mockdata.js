/* ============================================
   MOCKDATA.JS - DATOS DE PRODUCTOS
   ============================================
   Simula datos de FakeStore API
   En Fase 3 se reemplazará con Firestore
   ============================================ */

const MOCKDATA = {
  // Categorías
  categories: [
    { id: 1, name: 'Electrónica', slug: 'electronics' },
    { id: 2, name: 'Ropa', slug: 'clothing' },
    { id: 3, name: 'Libros', slug: 'books' },
    { id: 4, name: 'Accesorios', slug: 'accessories' }
  ],

  // Productos (simulados)
  products: [
    {
      id: 1,
      name: 'Laptop Premium',
      description: 'Laptop de alto rendimiento para profesionales',
      price: 1299.99,
      originalPrice: 1499.99,
      category: 'electronics',
      image: '🖥️',
      rating: 4.5,
      reviews: 128,
      stock: 15,
      badge: 'Popular'
    },
    {
      id: 2,
      name: 'Auriculares Inalámbricos',
      description: 'Auriculares de calidad con cancelación de ruido',
      price: 199.99,
      originalPrice: 249.99,
      category: 'electronics',
      image: '🎧',
      rating: 4.8,
      reviews: 254,
      stock: 32,
      badge: 'Top Ventas'
    },
    {
      id: 3,
      name: 'Camiseta Premium',
      description: 'Camiseta de algodón 100% orgánico',
      price: 49.99,
      originalPrice: 69.99,
      category: 'clothing',
      image: '👕',
      rating: 4.3,
      reviews: 89,
      stock: 50
    },
    {
      id: 4,
      name: 'Pantalones Jeans',
      description: 'Jeans clásicos con excelente ajuste',
      price: 79.99,
      originalPrice: 99.99,
      category: 'clothing',
      image: '👖',
      rating: 4.6,
      reviews: 156,
      stock: 40,
      badge: 'Oferta'
    },
    {
      id: 5,
      name: 'Clean Code',
      description: 'Guía esencial para escribir código limpio',
      price: 39.99,
      originalPrice: 49.99,
      category: 'books',
      image: '📖',
      rating: 4.9,
      reviews: 412,
      stock: 25
    },
    {
      id: 6,
      name: 'JavaScript: The Definitive Guide',
      description: 'La biblia de JavaScript',
      price: 59.99,
      originalPrice: 79.99,
      category: 'books',
      image: '📚',
      rating: 4.7,
      reviews: 267,
      stock: 18
    },
    {
      id: 7,
      name: 'Reloj Inteligente',
      description: 'Smartwatch con múltiples funciones',
      price: 299.99,
      originalPrice: 399.99,
      category: 'accessories',
      image: '⌚',
      rating: 4.4,
      reviews: 178,
      stock: 22,
      badge: 'Nuevo'
    },
    {
      id: 8,
      name: 'Mochila Tech',
      description: 'Mochila ergonómica para laptops',
      price: 89.99,
      originalPrice: 129.99,
      category: 'accessories',
      image: '🎒',
      rating: 4.5,
      reviews: 134,
      stock: 35
    },
    {
      id: 9,
      name: 'Monitor Ultra Wide',
      description: 'Monitor 4K de 34 pulgadas',
      price: 599.99,
      originalPrice: 799.99,
      category: 'electronics',
      image: '🖨️',
      rating: 4.7,
      reviews: 92,
      stock: 8
    },
    {
      id: 10,
      name: 'Teclado Mecánico',
      description: 'Teclado gaming RGB personalizable',
      price: 149.99,
      originalPrice: 199.99,
      category: 'electronics',
      image: '⌨️',
      rating: 4.6,
      reviews: 203,
      stock: 28
    },
    {
      id: 11,
      name: 'Chaqueta de Cuero',
      description: 'Chaqueta de cuero genuino premium',
      price: 199.99,
      originalPrice: 299.99,
      category: 'clothing',
      image: '🧥',
      rating: 4.8,
      reviews: 145,
      stock: 12
    },
    {
      id: 12,
      name: 'Design Patterns',
      description: 'Patrones de diseño en programación',
      price: 44.99,
      originalPrice: 59.99,
      category: 'books',
      image: '📘',
      rating: 4.6,
      reviews: 198,
      stock: 21
    }
  ],

  // Funciones helper
  getProduct: function(id) {
    return this.products.find(p => p.id === parseInt(id));
  },

  getProductsByCategory: function(category) {
    return this.products.filter(p => p.category === category);
  },

  searchProducts: function(query) {
    const q = query.toLowerCase();
    return this.products.filter(p =>
      p.name.toLowerCase().includes(q) ||
      p.description.toLowerCase().includes(q)
    );
  },

  filterByPrice: function(min, max) {
    return this.products.filter(p => p.price >= min && p.price <= max);
  },

  filterByRating: function(minRating) {
    return this.products.filter(p => p.rating >= minRating);
  },

  getCategories: function() {
    return this.categories;
  },

  // Precio máximo (para rangos)
  getMaxPrice: function() {
    return Math.max(...this.products.map(p => p.price));
  },

  // Ordenar productos
  sortProducts: function(products, sortBy) {
    const sorted = [...products];
    switch(sortBy) {
      case 'price-asc':
        return sorted.sort((a, b) => a.price - b.price);
      case 'price-desc':
        return sorted.sort((a, b) => b.price - a.price);
      case 'rating':
        return sorted.sort((a, b) => b.rating - a.rating);
      case 'newest':
        return sorted.reverse(); // Últimos agregados primero
      default:
        return sorted;
    }
  }
};

// Export para módulos (opcional en Fase 1)
if (typeof module !== 'undefined' && module.exports) {
  module.exports = MOCKDATA;
}
