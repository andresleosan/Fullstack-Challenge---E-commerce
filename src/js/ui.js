/* ============================================
   UI.JS - UTILIDADES DE UI Y DOM
   ============================================
   Funciones para manipular el DOM
   Renderizado de componentes
   ============================================ */

const UI = {
  /**
   * Renderiza un producto en la galería
   */
  renderProductCard: function(product) {
    const discount = Math.round((1 - product.price / (product.originalPrice || product.price)) * 100);
    const discountBadge = discount > 0 ? 
      `<div class="badge badge-warning" style="position: absolute; top: 10px; right: 10px;">-${discount}%</div>` 
      : '';

    return `
      <div class="card product-card" data-product-id="${product.id}" style="cursor: pointer;">
        <div class="product-card-image" style="position: relative;">
          ${discountBadge}
          <span style="font-size: 3rem;">${product.image}</span>
        </div>
        
        <h3 class="product-card-title">${product.name}</h3>
        <p class="product-card-description">${product.description}</p>
        
        <div class="product-card-price">
          <span class="product-card-price-current">${this.formatPrice(product.price)}</span>
          ${product.originalPrice ? 
            `<span class="product-card-price-original">${this.formatPrice(product.originalPrice)}</span>` 
            : ''}
        </div>

        <div class="product-card-rating">
          <span>⭐ ${product.rating}</span>
          <span class="product-card-reviews">(${product.reviews} reseñas)</span>
        </div>

        <div class="product-card-actions">
          <button class="btn btn-primary btn-sm add-to-cart" data-product-id="${product.id}">
            Agregar
          </button>
          <button class="btn btn-outline btn-sm view-details" data-product-id="${product.id}">
            Ver
          </button>
        </div>
      </div>
    `;
  },

  /**
   * Renderiza la galería de productos
   */
  renderProductsGrid: function(products, containerId = 'products-grid') {
    const container = document.getElementById(containerId);
    if (!container) return;

    if (products.length === 0) {
      container.innerHTML = `
        <div style="grid-column: 1/-1; text-align: center; padding: 3rem;">
          <p style="font-size: 1.5rem; color: var(--color-gray-400);">
            😔 No se encontraron productos
          </p>
        </div>
      `;
      return;
    }

    container.innerHTML = products.map(p => this.renderProductCard(p)).join('');
  },

  /**
   * Renderiza el carrito
   */
  renderCart: function(containerId = 'cart-items') {
    const container = document.getElementById(containerId);
    if (!container) return;

    const items = Cart.getItems();

    if (items.length === 0) {
      container.innerHTML = `
        <tr>
          <td colspan="5" style="text-align: center; padding: 2rem;">
            El carrito está vacío
          </td>
        </tr>
      `;
      return;
    }

    container.innerHTML = items.map(item => `
      <tr>
        <td>${item.image} ${item.name}</td>
        <td>${this.formatPrice(item.price)}</td>
        <td>
          <input 
            type="number" 
            value="${item.quantity}" 
            min="1"
            style="width: 60px; padding: 5px;"
            onchange="Cart.updateQuantity(${item.id}, this.value)"
          >
        </td>
        <td>${this.formatPrice(item.price * item.quantity)}</td>
        <td>
          <button class="btn btn-outline btn-sm" onclick="Cart.removeItem(${item.id})">
            Eliminar
          </button>
        </td>
      </tr>
    `).join('');
  },

  /**
   * Actualiza el resumen del carrito
   */
  updateCartSummary: function(containerId = 'cart-summary') {
    const container = document.getElementById(containerId);
    if (!container) return;

    const subtotal = Cart.getSubtotal();
    const taxes = Cart.getTaxes();
    const shipping = Cart.getShipping();
    const total = Cart.getTotal();

    container.innerHTML = `
      <div style="margin-bottom: 1rem; border-bottom: 1px solid var(--color-border); padding-bottom: 1rem;">
        <div style="display: flex; justify-content: space-between; margin-bottom: 0.5rem;">
          <span>Subtotal:</span>
          <span>${this.formatPrice(subtotal)}</span>
        </div>
        <div style="display: flex; justify-content: space-between; margin-bottom: 0.5rem;">
          <span>Impuestos (10%):</span>
          <span>${this.formatPrice(taxes)}</span>
        </div>
        <div style="display: flex; justify-content: space-between; margin-bottom: 0.5rem;">
          <span>Envío:</span>
          <span>${shipping === 0 ? '¡Gratis!' : this.formatPrice(shipping)}</span>
        </div>
      </div>
      <div style="display: flex; justify-content: space-between; font-size: 1.25rem; font-weight: bold; color: var(--color-primary);">
        <span>Total:</span>
        <span>${this.formatPrice(total)}</span>
      </div>
    `;
  },

  /**
   * Renderiza paginator
   */
  renderPaginator: function(pagination, containerId = 'paginator') {
    const container = document.getElementById(containerId);
    if (!container) return;

    let html = '<div style="display: flex; gap: 0.5rem; justify-content: center; margin: 1rem 0;">';

    // Botón anterior
    if (pagination.hasPrevPage) {
      html += `<button class="btn btn-outline" onclick="SearchEngine.prevPage(); updateProducts();">← Anterior</button>`;
    }

    // Números de página
    const maxButtons = 5;
    let startPage = Math.max(1, pagination.page - Math.floor(maxButtons / 2));
    let endPage = Math.min(pagination.totalPages, startPage + maxButtons - 1);

    if (endPage - startPage < maxButtons - 1) {
      startPage = Math.max(1, endPage - maxButtons + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      if (i === pagination.page) {
        html += `<button class="btn btn-primary" style="font-weight: bold;">${i}</button>`;
      } else {
        html += `<button class="btn btn-outline" onclick="SearchEngine.goToPage(${i}); updateProducts();">${i}</button>`;
      }
    }

    // Botón siguiente
    if (pagination.hasNextPage) {
      html += `<button class="btn btn-outline" onclick="SearchEngine.nextPage(); updateProducts();">Siguiente →</button>`;
    }

    html += '</div>';
    container.innerHTML = html;
  },

  /**
   * Muestra notificación toast
   */
  showToast: function(message, type = 'info', duration = 3000) {
    const toast = document.createElement('div');
    toast.style.cssText = `
      position: fixed;
      bottom: 20px;
      right: 20px;
      padding: 1rem 1.5rem;
      background-color: ${this.getToastColor(type)};
      color: white;
      border-radius: 0.5rem;
      z-index: var(--z-notification);
      animation: slideIn 0.3s ease-out;
      box-shadow: var(--shadow-lg);
    `;
    toast.textContent = message;
    document.body.appendChild(toast);

    setTimeout(() => {
      toast.style.animation = 'slideOut 0.3s ease-out';
      setTimeout(() => toast.remove(), 300);
    }, duration);
  },

  /**
   * Obtiene color para toast según tipo
   */
  getToastColor: function(type) {
    const colors = {
      success: 'var(--color-success)',
      error: 'var(--color-error)',
      warning: 'var(--color-warning)',
      info: 'var(--color-info)'
    };
    return colors[type] || colors.info;
  },

  /**
   * Formatea precio
   */
  formatPrice: function(price) {
    return new Intl.NumberFormat('es-ES', {
      style: 'currency',
      currency: 'USD'
    }).format(price);
  },

  /**
   * Valida email
   */
  isValidEmail: function(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  },

  /**
   * Valida teléfono
   */
  isValidPhone: function(phone) {
    const re = /^[\d\-+\s()]{10,}$/;
    return re.test(phone);
  },

  /**
   * Muestra/oculta loader
   */
  showLoader: function(show = true) {
    let loader = document.getElementById('ui-loader');
    if (!loader) {
      loader = document.createElement('div');
      loader.id = 'ui-loader';
      loader.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: rgba(0, 0, 0, 0.7);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 999;
      `;
      loader.innerHTML = '<div style="font-size: 2rem;">⏳ Cargando...</div>';
      document.body.appendChild(loader);
    }
    loader.style.display = show ? 'flex' : 'none';
  }
};

// Agrega animaciones al DOM
if (document.head) {
  const style = document.createElement('style');
  style.textContent = `
    @keyframes slideIn {
      from {
        transform: translateX(400px);
        opacity: 0;
      }
      to {
        transform: translateX(0);
        opacity: 1;
      }
    }
    @keyframes slideOut {
      to {
        transform: translateX(400px);
        opacity: 0;
      }
    }
  `;
  document.head.appendChild(style);
}

// Export
if (typeof module !== 'undefined' && module.exports) {
  module.exports = UI;
}
