/* ============================================
   CART.JS - LÓGICA DEL CARRITO
   ============================================
   Gestiona el carrito de compras
   localStorage para persistencia
   ============================================ */

const CART_STORAGE_KEY = 'estore-cart';
const CART_VERSION = 1;

const Cart = {
  // Estado del carrito
  items: [],

  /**
   * Inicializa el carrito desde localStorage
   */
  init: function() {
    this.loadFromStorage();
    this.updateUI();
  },

  /**
   * Agrega un producto al carrito
   */
  addItem: function(product, quantity = 1) {
    const existingItem = this.items.find(item => item.id === product.id);

    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      this.items.push({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        quantity: quantity
      });
    }

    this.saveToStorage();
    this.updateUI();
  },

  /**
   * Elimina un producto del carrito
   */
  removeItem: function(productId) {
    this.items = this.items.filter(item => item.id !== productId);
    this.saveToStorage();
    this.updateUI();
  },

  /**
   * Actualiza la cantidad de un producto
   */
  updateQuantity: function(productId, quantity) {
    const item = this.items.find(item => item.id === productId);
    if (item) {
      if (quantity <= 0) {
        this.removeItem(productId);
      } else {
        item.quantity = quantity;
        this.saveToStorage();
        this.updateUI();
      }
    }
  },

  /**
   * Vacía el carrito
   */
  clear: function() {
    this.items = [];
    this.saveToStorage();
    this.updateUI();
  },

  /**
   * Obtiene el número total de items
   */
  getCount: function() {
    return this.items.reduce((sum, item) => sum + item.quantity, 0);
  },

  /**
   * Calcula el subtotal
   */
  getSubtotal: function() {
    return this.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  },

  /**
   * Calcula impuestos (ejemplo: 10%)
   */
  getTaxes: function() {
    return this.getSubtotal() * 0.1;
  },

  /**
   * Calcula costo de envío
   */
  getShipping: function() {
    const subtotal = this.getSubtotal();
    if (subtotal === 0) return 0;
    if (subtotal > 100) return 0; // Envío gratis
    if (subtotal > 50) return 5;
    return 10;
  },

  /**
   * Calcula el total
   */
  getTotal: function() {
    return this.getSubtotal() + this.getTaxes() + this.getShipping();
  },

  /**
   * Verificar si el carrito está vacío
   */
  isEmpty: function() {
    return this.items.length === 0;
  },

  /**
   * Guarda el carrito en localStorage
   */
  saveToStorage: function() {
    const data = {
      version: CART_VERSION,
      items: this.items,
      lastUpdated: new Date().toISOString()
    };
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(data));
  },

  /**
   * Carga el carrito desde localStorage
   */
  loadFromStorage: function() {
    const stored = localStorage.getItem(CART_STORAGE_KEY);
    if (stored) {
      try {
        const data = JSON.parse(stored);
        if (data.version === CART_VERSION) {
          this.items = data.items || [];
        }
      } catch (e) {
        console.error('Error al cargar carrito:', e);
        this.items = [];
      }
    }
  },

  /**
   * Actualiza la UI del carrito
   */
  updateUI: function() {
    // Actualiza el contador en el header
    const cartCount = document.querySelector('.cart-count');
    if (cartCount) {
      const count = this.getCount();
      cartCount.textContent = count;
      cartCount.style.display = count > 0 ? 'inline-flex' : 'none';
    }

    // Dispara evento personalizado
    window.dispatchEvent(new CustomEvent('cartUpdated', {
      detail: {
        count: this.getCount(),
        total: this.getTotal(),
        items: this.items
      }
    }));
  },

  /**
   * Obtiene los items del carrito
   */
  getItems: function() {
    return [...this.items];
  },

  /**
   * Formato de moneda
   */
  formatPrice: function(price) {
    return new Intl.NumberFormat('es-ES', {
      style: 'currency',
      currency: 'USD'
    }).format(price);
  }
};

// Inicializa el carrito cuando el DOM está listo
document.addEventListener('DOMContentLoaded', function() {
  Cart.init();
});
