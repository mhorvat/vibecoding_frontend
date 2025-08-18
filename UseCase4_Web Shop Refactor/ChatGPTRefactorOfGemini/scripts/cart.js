// scripts/cart.js
export const Cart = (() => {
  let items = [];

  const load = () => {
    const saved = localStorage.getItem('cart');
    items = saved ? JSON.parse(saved) : [];
  };

  const save = () => localStorage.setItem('cart', JSON.stringify(items));

  const addItem = (product) => {
    const existing = items.find(i => i.id === product.id);
    existing ? existing.qty++ : items.push({ ...product, qty: 1 });
    save();
  };

  const removeItem = (id) => {
    items = items.filter(i => i.id !== id);
    save();
  };

  const getItems = () => items;
  const getTotalQty = () => items.reduce((sum, i) => sum + i.qty, 0);
  const getTotalPrice = () => items.reduce((sum, i) => sum + i.qty * i.price, 0);

  return { load, save, addItem, removeItem, getItems, getTotalQty, getTotalPrice };
})();