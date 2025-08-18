// scripts/filters.js
export const Filter = (() => {
  const filterByCategory = (items, category) =>
    category === 'all' ? items : items.filter(i => i.category === category);

  const filterBySearch = (items, term) =>
    items.filter(i => i.name.toLowerCase().includes(term.toLowerCase()));

  return { filterByCategory, filterBySearch };
})();