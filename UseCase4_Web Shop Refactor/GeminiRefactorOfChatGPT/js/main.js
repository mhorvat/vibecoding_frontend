(function() {
  "use strict";

  // --- DATA ---
  const products = [
    { id: 1, name: "3x3 Cube", price: 14.99, img: "3x3.webp" },
    { id: 2, name: "2x2 Cube", price: 9.99, img: "2x2.webp" },
    { id: 3, name: "4x4 Cube", price: 19.99, sale: true, original: 24.99, img: "4x4.webp" },
    { id: 4, name: "Pyraminx", price: 12.99, img: "Pyraminx.webp" },
    { id: 5, name: "Megaminx", price: 29.99, img: "Megaminx.webp" },
    { id: 6, name: "Mirror Cube", price: 17.99, sale: true, original: 22.99, img: "Mirror.webp" }
  ];

  // --- STATE ---
  let cart = JSON.parse(localStorage.getItem('twistStoreCart')) || {};
  let currentFilter = '';

  // --- DOM ELEMENTS ---
  const productsContainer = document.getElementById('products-container');
  const cartCountElement = document.getElementById('cart-count');
  const cartItemsContainer = document.getElementById('cart-items-container');
  const cartTotalElement = document.getElementById('cart-total');
  const searchInput = document.getElementById('search-input');
  const pageTitle = document.getElementById('page-title');
  const navContainer = document.querySelector('.main-nav');
  const homeLink = document.getElementById('home-link');

  // --- HELPER FUNCTIONS ---
  const saveCart = () => {
    localStorage.setItem('twistStoreCart', JSON.stringify(cart));
  };

  const debounce = (func, delay) => {
    let timeoutId;
    return (...args) => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        func.apply(this, args);
      }, delay);
    };
  };

  // --- RENDER FUNCTIONS ---
  const renderCart = () => {
    const cartItems = Object.values(cart);
    if (cartItems.length === 0) {
      cartItemsContainer.innerHTML = '<p id="cart-empty-message" class="text-muted">Your cart is empty.</p>';
    } else {
      cartItemsContainer.innerHTML = `
        <ul class="list-group list-group-flush">
          ${cartItems.map(item => `
            <li class="list-group-item d-flex justify-content-between align-items-center">
              <div>
                ${item.name} <span class="badge bg-secondary rounded-pill">${item.quantity}</span>
              </div>
              <strong>$${(item.price * item.quantity).toFixed(2)}</strong>
            </li>
          `).join('')}
        </ul>`;
    }

    const totalQuantity = cartItems.reduce((sum, item) => sum + item.quantity, 0);
    const totalPrice = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    
    cartCountElement.innerText = totalQuantity;
    cartTotalElement.innerText = `$${totalPrice.toFixed(2)}`;
  };

  const renderProducts = () => {
    const searchTerm = searchInput.value.toLowerCase();

    const filteredProducts = products.filter(product => {
      const matchesSearch = product.name.toLowerCase().includes(searchTerm);
      const matchesFilter = currentFilter ? product.name === currentFilter : true;
      return matchesSearch && matchesFilter;
    });

    if (filteredProducts.length > 0) {
        productsContainer.innerHTML = filteredProducts.map(product => `
        <div class="col-sm-6 col-md-4 col-lg-3 d-flex align-items-stretch">
            <div class="product-card">
                ${product.sale ? `<span class="badge product-card__badge--sale">Sale</span>` : ''}
                <img src="images/${product.img}" class="product-card__image" alt="${product.name}">
                <div class="product-card__body">
                    <h5 class="product-card__title">${product.name}</h5>
                    <p class="product-card__price">
                    ${product.sale
                        ? `<del>$${product.original.toFixed(2)}</del> <strong>$${product.price.toFixed(2)}</strong>`
                        : `<strong>$${product.price.toFixed(2)}</strong>`
                    }
                    </p>
                    <button class="btn btn-primary product-card__button" data-product-id="${product.id}">Add to Cart</button>
                </div>
            </div>
        </div>
        `).join('');
    } else {
        productsContainer.innerHTML = '<p class="col-12 text-center text-muted fs-5">No products found matching your criteria.</p>';
    }
  };
  
  const debouncedRenderProducts = debounce(renderProducts, 300);

  // --- EVENT HANDLERS ---
  const handleAddToCart = (e) => {
    const target = e.target.closest('[data-product-id]');
    if (target) {
      const productId = parseInt(target.dataset.productId, 10);
      const product = products.find(p => p.id === productId);
      
      if (product) {
        if (cart[product.id]) {
          cart[product.id].quantity++;
        } else {
          cart[product.id] = { ...product, quantity: 1 };
        }
        saveCart();
        renderCart();
      }
    }
  };

  const handleFilterClick = (e) => {
    e.preventDefault();
    const target = e.target.closest('.filter-item');
    if (target) {
      currentFilter = target.dataset.filter;
      pageTitle.innerText = currentFilter ? `${currentFilter}s` : "All Puzzles";
      renderProducts();
    }
  };

  const handleHomeClick = (e) => {
    e.preventDefault();
    searchInput.value = '';
    currentFilter = '';
    pageTitle.innerText = "Shop Rubik's Cubes";
    renderProducts();
  };

  // --- INITIALIZATION ---
  const init = () => {
    // Attach event listeners using delegation where possible
    productsContainer.addEventListener('click', handleAddToCart);
    navContainer.addEventListener('click', handleFilterClick);
    homeLink.addEventListener('click', handleHomeClick);
    searchInput.addEventListener('input', debouncedRenderProducts);

    // Initial render
    renderProducts();
    renderCart();
  };

  // Run app
  document.addEventListener('DOMContentLoaded', init);

})();