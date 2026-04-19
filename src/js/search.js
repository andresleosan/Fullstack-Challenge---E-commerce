/* ============================================
   SEARCH.JS - BÚSQUEDA Y FILTROS
   ============================================
   Búsqueda en tiempo real
   Filtros por categoría, precio, rating
   ============================================ */

const SearchEngine = {
  // Estado
  searchQuery: '',
  selectedCategory: '',
  priceRange: { min: 0, max: Infinity },
  minRating: 0,
  sortBy: 'newest',
  currentPage: 1,
  itemsPerPage: 12,

  /**
   * Realiza búsqueda con todos los filtros
   */
  search: function(products = MOCKDATA.products) {
    let results = [...products];

    // Filtro por búsqueda
    if (this.searchQuery) {
      results = results.filter(p =>
        p.name.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        p.description.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    }

    // Filtro por categoría
    if (this.selectedCategory) {
      results = results.filter(p => p.category === this.selectedCategory);
    }

    // Filtro por precio
    results = results.filter(p =>
      p.price >= this.priceRange.min && p.price <= this.priceRange.max
    );

    // Filtro por rating
    if (this.minRating > 0) {
      results = results.filter(p => p.rating >= this.minRating);
    }

    // Ordenamiento
    results = this.sortResults(results);

    return results;
  },

  /**
   * Ordena resultados
   */
  sortResults: function(results) {
    const sorted = [...results];
    switch(this.sortBy) {
      case 'price-asc':
        return sorted.sort((a, b) => a.price - b.price);
      case 'price-desc':
        return sorted.sort((a, b) => b.price - a.price);
      case 'rating':
        return sorted.sort((a, b) => b.rating - a.rating);
      case 'newest':
      default:
        return sorted;
    }
  },

  /**
   * Establece el término de búsqueda
   */
  setSearchQuery: function(query) {
    this.searchQuery = query;
    this.currentPage = 1;
  },

  /**
   * Establece la categoría
   */
  setCategory: function(category) {
    this.selectedCategory = category;
    this.currentPage = 1;
  },

  /**
   * Establece el rango de precio
   */
  setPriceRange: function(min, max) {
    this.priceRange = { min, max };
    this.currentPage = 1;
  },

  /**
   * Establece el rating mínimo
   */
  setMinRating: function(rating) {
    this.minRating = rating;
    this.currentPage = 1;
  },

  /**
   * Establece el ordenamiento
   */
  setSortBy: function(sortBy) {
    this.sortBy = sortBy;
    this.currentPage = 1;
  },

  /**
   * Obtiene resultados paginados
   */
  getPaginatedResults: function(products = MOCKDATA.products) {
    const results = this.search(products);
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    
    return {
      items: results.slice(startIndex, endIndex),
      total: results.length,
      page: this.currentPage,
      totalPages: Math.ceil(results.length / this.itemsPerPage),
      hasNextPage: endIndex < results.length,
      hasPrevPage: this.currentPage > 1
    };
  },

  /**
   * Itera a la siguiente página
   */
  nextPage: function() {
    const results = this.search();
    const totalPages = Math.ceil(results.length / this.itemsPerPage);
    if (this.currentPage < totalPages) {
      this.currentPage++;
    }
  },

  /**
   * Itera a la página anterior
   */
  prevPage: function() {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  },

  /**
   * Ir a página específica
   */
  goToPage: function(pageNum) {
    const results = this.search();
    const totalPages = Math.ceil(results.length / this.itemsPerPage);
    if (pageNum >= 1 && pageNum <= totalPages) {
      this.currentPage = pageNum;
    }
  },

  /**
   * Limpia todos los filtros
   */
  clearFilters: function() {
    this.searchQuery = '';
    this.selectedCategory = '';
    this.priceRange = { min: 0, max: Infinity };
    this.minRating = 0;
    this.sortBy = 'newest';
    this.currentPage = 1;
  },

  /**
   * Obtiene estadísticas de búsqueda
   */
  getStats: function(products = MOCKDATA.products) {
    const results = this.search(products);
    return {
      total: results.length,
      filtered: results.length < products.length,
      priceRange: {
        min: Math.min(...products.map(p => p.price)),
        max: Math.max(...products.map(p => p.price)),
        current: this.priceRange
      }
    };
  },

  /**
   * Búsqueda con debounce (para el input en tiempo real)
   */
  debounceSearch: function(callback, delay = 300) {
    let timeoutId;
    return function(query) {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        SearchEngine.setSearchQuery(query);
        callback();
      }, delay);
    };
  }
};

// Export para uso en otros módulos
if (typeof module !== 'undefined' && module.exports) {
  module.exports = SearchEngine;
}
