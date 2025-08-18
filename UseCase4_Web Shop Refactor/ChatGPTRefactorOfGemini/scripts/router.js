// scripts/router.js
export const Router = (() => {
  const routes = {
    '#/home': () => showSection('home'),
    '#/about': () => showSection('about'),
  };

  function showSection(id) {
    document.querySelectorAll('main > section').forEach(sec => sec.hidden = sec.id !== id);
    document.querySelectorAll('.navbar__item').forEach(li => li.classList.toggle('is-active', li.getAttribute('href') === id));
  }

  function init() {
    window.addEventListener('hashchange', () => routes[location.hash]?.());
    location.hash = location.hash || '#/home';
  }

  return { init };
})();