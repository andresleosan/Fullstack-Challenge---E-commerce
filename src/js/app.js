/* ============================================
   APP.JS - LÓGICA PRINCIPAL
   ============================================
   Coordina todos los módulos
   Event listeners y funciones principales
   ============================================ */

// ==================== EVENT LISTENERS ====================

document.addEventListener('DOMContentLoaded', function() {
  initializeApp();
});

// ==================== INICIALIZACIÓN ====================

function initializeApp() {
  console.log('🚀 Inicializando E-Store...');

  // Inicializa módulos
  Cart.init();
  setupEventListeners();
  
  // Carga página según la ruta actual
  loadPageContent();
  
  console.log('✅ E-Store Lista');
}

// ==================== EVENT LISTENERS ====================

function setupEventListeners() {
  // ===== HOME (index.html) =====
  if (window.location.pathname.includes('index') || window.location.pathname.endsWith('/')) {
    setupHomeEvents();
  }

  // ===== PRODUCT DETAIL (product-detail.html) =====
  if (window.location.pathname.includes('product-detail')) {
    setupProductDetailEvents();
  }

  // ===== CART (cart.html) =====
  if (window.location.pathname.includes('cart')) {
    setupCartEvents();
  }

  // ===== CHECKOUT (checkout.html) =====
  if (window.location.pathname.includes('checkout')) {
    setupCheckoutEvents();
  }

  // ===== AUTH PAGES =====
  if (window.location.pathname.includes('login')) {
    setupLoginEvents();
  }
  if (window.location.pathname.includes('register')) {
    setupRegisterEvents();
  }

  // ===== CART LISTENER (todos los pages) =====
  window.addEventListener('cartUpdated', function(e) {
    updateCartBadge(e.detail);
  });
}

// ===== HOME PAGE EVENTS =====

function setupHomeEvents() {
  // Search input
  const searchInput = document.getElementById('searchInput');
  if (searchInput) {
    searchInput.addEventListener('input', debounce(function(e) {
      SearchEngine.setSearchQuery(e.target.value);
      updateProducts();
    }, 300));
  }

  // Category filter
  const categoryFilter = document.getElementById('categoryFilter');
  if (categoryFilter) {
    categoryFilter.addEventListener('change', function(e) {
      SearchEngine.setCategory(e.target.value);
      updateProducts();
    });
  }

  // Price range
  const priceRange = document.getElementById('priceRange');
  if (priceRange) {
    priceRange.addEventListener('change', function(e) {
      const maxPrice = MOCKDATA.getMaxPrice();
      SearchEngine.setPriceRange(0, e.target.value);
      updateProducts();
    });
  }

  // Sort
  const sortSelect = document.getElementById('sortSelect');
  if (sortSelect) {
    sortSelect.addEventListener('change', function(e) {
      SearchEngine.setSortBy(e.target.value);
      updateProducts();
    });
  }

  // Initial load
  updateProducts();
}

function updateProducts() {
  const pagination = SearchEngine.getPaginatedResults();
  UI.renderProductsGrid(pagination.items);
  UI.renderPaginator(pagination);

  // Event listeners para las tarjetas
  setupProductCardListeners();
}

function setupProductCardListeners() {
  // Add to cart buttons
  document.querySelectorAll('.add-to-cart').forEach(btn => {
    btn.addEventListener('click', function(e) {
      e.stopPropagation();
      const productId = parseInt(this.dataset.productId);
      const product = MOCKDATA.getProduct(productId);
      Cart.addItem(product);
      UI.showToast(`${product.name} agregado al carrito`, 'success');
    });
  });

  // View details buttons
  document.querySelectorAll('.view-details').forEach(btn => {
    btn.addEventListener('click', function(e) {
      e.stopPropagation();
      const productId = this.dataset.productId;
      window.location.href = `product-detail.html?id=${productId}`;
    });
  });

  // Click en la tarjeta
  document.querySelectorAll('.product-card').forEach(card => {
    card.addEventListener('click', function() {
      const productId = this.dataset.productId;
      window.location.href = `product-detail.html?id=${productId}`;
    });
  });
}

// ===== PRODUCT DETAIL PAGE =====

function setupProductDetailEvents() {
  const urlParams = new URLSearchParams(window.location.search);
  const productId = parseInt(urlParams.get('id'));

  if (!productId) {
    window.location.href = 'index.html';
    return;
  }

  const product = MOCKDATA.getProduct(productId);
  if (!product) {
    UI.showToast('Producto no encontrado', 'error');
    return;
  }

  renderProductDetail(product);

  // Add to cart
  const addBtn = document.querySelector('.add-to-cart-btn');
  if (addBtn) {
    addBtn.addEventListener('click', function() {
      const quantity = parseInt(document.getElementById('quantity').value);
      for (let i = 0; i < quantity; i++) {
        Cart.addItem(product);
      }
      UI.showToast(`${product.name} x${quantity} agregado al carrito`, 'success');
    });
  }

  // Quantity selector
  const quantityInput = document.getElementById('quantity');
  if (quantityInput) {
    quantityInput.addEventListener('change', function() {
      if (this.value < 1) this.value = 1;
      if (this.value > product.stock) this.value = product.stock;
    });
  }
}

function renderProductDetail(product) {
  const container = document.querySelector('.product-detail-container');
  if (!container) return;

  container.innerHTML = `
    <div class="product-detail-image">
      <span style="font-size: 5rem;">${product.image}</span>
    </div>
    <div class="product-detail-info">
      <h1>${product.name}</h1>
      <p class="product-detail-description">${product.description}</p>
      
      <div class="product-detail-price">
        <span class="price">${UI.formatPrice(product.price)}</span>
        ${product.originalPrice ? 
          `<span class="original-price">${UI.formatPrice(product.originalPrice)}</span>` 
          : ''}
      </div>

      <div class="product-detail-rating">
        <span>⭐ ${product.rating} (${product.reviews} reseñas)</span>
      </div>

      <div class="product-detail-stock">
        Stock: <strong>${product.stock > 0 ? product.stock : 'Agotado'}</strong>
      </div>

      ${product.stock > 0 ? `
        <div class="quantity-selector">
          <label for="quantity">Cantidad:</label>
          <input type="number" id="quantity" value="1" min="1" max="${product.stock}">
        </div>
        <button class="btn btn-primary btn-lg add-to-cart-btn">Agregar al Carrito</button>
      ` : `
        <button class="btn btn-secondary btn-lg" disabled>Agotado</button>
      `}
    </div>
  `;
}

// ===== CART PAGE =====

function setupCartEvents() {
  updateCartPage();

  // Checkout button
  const checkoutBtn = document.querySelector('.checkout-btn');
  if (checkoutBtn) {
    checkoutBtn.addEventListener('click', function() {
      if (Cart.isEmpty()) {
        UI.showToast('El carrito está vacío', 'warning');
      } else {
        window.location.href = 'checkout.html';
      }
    });
  }

  // Continue shopping
  const continueBtn = document.querySelector('.continue-shopping-btn');
  if (continueBtn) {
    continueBtn.addEventListener('click', function() {
      window.location.href = 'index.html';
    });
  }

  // Listen to cart updates
  window.addEventListener('cartUpdated', updateCartPage);
}

function updateCartPage() {
  UI.renderCart();
  UI.updateCartSummary();

  // Show/hide empty state
  const emptyState = document.getElementById('empty-cart');
  const cartContent = document.getElementById('cart-content');

  if (Cart.isEmpty()) {
    if (emptyState) emptyState.style.display = 'block';
    if (cartContent) cartContent.style.display = 'none';
  } else {
    if (emptyState) emptyState.style.display = 'none';
    if (cartContent) cartContent.style.display = 'block';
  }
}

// ===== CHECKOUT PAGE =====

function setupCheckoutEvents() {
  if (Cart.isEmpty()) {
    window.location.href = 'cart.html';
    return;
  }

  const form = document.getElementById('checkoutForm');
  if (form) {
    form.addEventListener('submit', handleCheckout);
  }

  // Pre-fill summary
  updateCheckoutSummary();
}

function updateCheckoutSummary() {
  const container = document.getElementById('checkout-summary');
  if (!container) return;

  const items = Cart.getItems();
  
  const itemsHtml = items.map(item => `
    <div style="display: flex; justify-content: space-between; margin-bottom: 0.5rem;">
      <span>${item.image} ${item.name} x${item.quantity}</span>
      <span>${UI.formatPrice(item.price * item.quantity)}</span>
    </div>
  `).join('');

  const subtotal = Cart.getSubtotal();
  const taxes = Cart.getTaxes();
  const shipping = Cart.getShipping();
  const total = Cart.getTotal();

  container.innerHTML = `
    <div style="background-color: var(--color-dark); padding: 1rem; border-radius: 0.5rem;">
      <h3>Resumen de Compra</h3>
      ${itemsHtml}
      <hr style="border: 1px solid var(--color-border); margin: 1rem 0;">
      <div style="display: flex; justify-content: space-between; margin-bottom: 0.5rem;">
        <span>Subtotal:</span>
        <span>${UI.formatPrice(subtotal)}</span>
      </div>
      <div style="display: flex; justify-content: space-between; margin-bottom: 0.5rem;">
        <span>Impuestos (10%):</span>
        <span>${UI.formatPrice(taxes)}</span>
      </div>
      <div style="display: flex; justify-content: space-between; margin-bottom: 1rem;">
        <span>Envío:</span>
        <span>${shipping === 0 ? '¡Gratis!' : UI.formatPrice(shipping)}</span>
      </div>
      <div style="display: flex; justify-content: space-between; font-size: 1.25rem; font-weight: bold; color: var(--color-primary); border-top: 1px solid var(--color-border); padding-top: 1rem;">
        <span>Total:</span>
        <span>${UI.formatPrice(total)}</span>
      </div>
    </div>
  `;
}

function handleCheckout(e) {
  e.preventDefault();

  // Validar campos
  const name = document.getElementById('fullName')?.value;
  const email = document.getElementById('email')?.value;
  const phone = document.getElementById('phone')?.value;
  const address = document.getElementById('address')?.value;

  if (!name || !email || !phone || !address) {
    UI.showToast('Por favor completa todos los campos', 'warning');
    return;
  }

  if (!UI.isValidEmail(email)) {
    UI.showToast('Email inválido', 'error');
    return;
  }

  // Simular procesamiento
  UI.showLoader(true);
  
  setTimeout(() => {
    UI.showLoader(false);
    
    // Guardar orden
    const order = {
      id: Date.now(),
      items: Cart.getItems(),
      total: Cart.getTotal(),
      customer: { name, email, phone, address },
      date: new Date().toISOString(),
      status: 'pending'
    };

    // Guardar en localStorage
    let orders = JSON.parse(localStorage.getItem('estore-orders')) || [];
    orders.push(order);
    localStorage.setItem('estore-orders', JSON.stringify(orders));

    // Limpiar carrito
    Cart.clear();

    UI.showToast('✅ Compra realizada exitosamente!', 'success');
    
    setTimeout(() => {
      window.location.href = `orders.html?orderId=${order.id}`;
    }, 2000);
  }, 1500);
}

// ===== AUTH PAGES =====

function setupLoginEvents() {
  const form = document.getElementById('loginForm');
  if (form) {
    form.addEventListener('submit', function(e) {
      e.preventDefault();
      const email = document.getElementById('loginEmail').value;
      const password = document.getElementById('loginPassword').value;

      if (!email || !password) {
        UI.showToast('Por favor completa los campos', 'warning');
        return;
      }

      // Simular validación
      if (email === 'user@example.com' && password === '123456') {
        localStorage.setItem('estore-user', JSON.stringify({ email, name: 'Usuario' }));
        UI.showToast('✅ Iniciaste sesión', 'success');
        setTimeout(() => window.location.href = 'index.html', 1000);
      } else {
        UI.showToast('Credenciales inválidas', 'error');
      }
    });
  }
}

function setupRegisterEvents() {
  const form = document.getElementById('registerForm');
  if (form) {
    form.addEventListener('submit', function(e) {
      e.preventDefault();
      const name = document.getElementById('registerName').value;
      const email = document.getElementById('registerEmail').value;
      const password = document.getElementById('registerPassword').value;
      const passwordConfirm = document.getElementById('registerPasswordConfirm').value;

      if (!name || !email || !password || !passwordConfirm) {
        UI.showToast('Por favor completa todos los campos', 'warning');
        return;
      }

      if (!UI.isValidEmail(email)) {
        UI.showToast('Email inválido', 'error');
        return;
      }

      if (password !== passwordConfirm) {
        UI.showToast('Las contraseñas no coinciden', 'error');
        return;
      }

      if (password.length < 6) {
        UI.showToast('La contraseña debe tener al menos 6 caracteres', 'error');
        return;
      }

      // Guardar usuario
      localStorage.setItem('estore-user', JSON.stringify({ email, name }));
      UI.showToast('✅ Cuenta creada exitosamente', 'success');
      setTimeout(() => window.location.href = 'index.html', 1000);
    });
  }
}

// ===== CART BADGE UPDATE =====

function updateCartBadge(detail) {
  const cartCount = document.querySelector('.cart-count');
  if (cartCount) {
    cartCount.textContent = detail.count;
    cartCount.style.display = detail.count > 0 ? 'inline-flex' : 'none';
  }
}

// ===== CONTENT LOADER =====

function loadPageContent() {
  const isHomePage = window.location.pathname.includes('index') || 
                     window.location.pathname.endsWith('/');

  if (isHomePage) {
    loadHomeContent();
  }
}

function loadHomeContent() {
  const container = document.getElementById('filters');
  if (container && !container.innerHTML.includes('searchInput')) {
    container.innerHTML = `
      <div class="form-group">
        <input 
          type="text" 
          id="searchInput"
          class="form-input" 
          placeholder="Buscar productos..."
        >
      </div>

      <div class="form-group">
        <select id="categoryFilter" class="form-input">
          <option value="">Todas las categorías</option>
          ${MOCKDATA.getCategories()
            .map(c => `<option value="${c.slug}">${c.name}</option>`)
            .join('')}
        </select>
      </div>

      <div class="form-group">
        <label>Precio máximo: <span id="priceValue">$${MOCKDATA.getMaxPrice()}</span></label>
        <input 
          type="range" 
          id="priceRange"
          class="form-input"
          min="0" 
          max="${MOCKDATA.getMaxPrice()}"
          value="${MOCKDATA.getMaxPrice()}"
          style="cursor: pointer;"
        >
      </div>

      <div class="form-group">
        <select id="sortSelect" class="form-input">
          <option value="newest">Más Recientes</option>
          <option value="price-asc">Precio: Menor a Mayor</option>
          <option value="price-desc">Precio: Mayor a Menor</option>
          <option value="rating">Mejor Calificación</option>
        </select>
      </div>
    `;

    // Update price label
    const priceRange = document.getElementById('priceRange');
    if (priceRange) {
      priceRange.addEventListener('input', function() {
        document.getElementById('priceValue').textContent = `$${this.value}`;
      });
    }
  }
}

// ===== UTILIDADES =====

function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}
