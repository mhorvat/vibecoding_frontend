// scripts/ui.js
import { Cart } from './cart.js';
import { Filter } from './filters.js';

export const UI = (() => {
  const productGrid = document.getElementById('product-grid');
  const cartCount = document.getElementById('cart-count');
  const cartItemsEl = document.getElementById('cart-items');
  const cartTotalEl = document.getElementById('cart-total');

  function renderProducts(products) {
    productGrid.innerHTML = products.map(p => `
      <div class="product-card">
        <img src="${p.image}" alt="${p.name}" class="product-card__image" loading="lazy">
        <div class="product-card__body">
          <h3>${p.name}</h3>
          <p>$${p.price.toFixed(2)}</p>
          <button data-id="${p.id}" class="btn btn--outline-dark js-add">Add to cart</button>
        </div>
      </div>
    `).join('');
  }

  function updateCart() {
    const items = Cart.getItems();
    cartCount.textContent = Cart.getTotalQty();
    cartItemsEl.innerHTML = items.map(i => `
      <li>
        <span>${i.name} x${i.qty}</span>
        <button data-id="${i.id}" class="btn-sm btn--danger js-remove">&times;</button>
      </li>
    `).join('');
    cartTotalEl.textContent = `$${Cart.getTotalPrice().toFixed(2)}`;
  }

  function bindEvents(products) {
    productGrid.addEventListener('click', e => {
      if (e.target.matches('.js-add')) {
        const id = e.target.dataset.id;
        const prod = products.find(p => p.id === id);
        Cart.addItem(prod);
        updateCart();
      }
    });

    cartItemsEl.addEventListener('click', e => {
      if (e.target.matches('.js-remove')) {
        Cart.removeItem(e.target.dataset.id);
        updateCart();
      }
    });
  }

  return { renderProducts, updateCart, bindEvents };
})();