// scripts/main.js
import { Cart } from './cart.js';
import { Filter } from './filters.js';
import { Router } from './router.js';
import { UI } from './ui.js';

// Sample product data
import products from '../data/products.json';

window.addEventListener('DOMContentLoaded', () => {
  Cart.load();
  UI.renderProducts(products);
  UI.updateCart();
  UI.bindEvents(products);
  Router.init();

  // Category filters
  document.querySelectorAll('.category-filter').forEach(btn => {
    btn.addEventListener('click', () => {
      const filtered = Filter.filterByCategory(products, btn.dataset.category);
      UI.renderProducts(filtered);
    });
  });

  // Search input
  document.getElementById('search-input').addEventListener('input', e => {
    const filtered = Filter.filterBySearch(products, e.target.value);
    UI.renderProducts(filtered);
  });
});