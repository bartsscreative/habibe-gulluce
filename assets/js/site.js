const menu = document.querySelector('#site-nav');
const menuButton = document.querySelector('.menu-toggle');
const menuLabel = menuButton.querySelector('.sr-only');
const menuLinks = [...menu.querySelectorAll('a')];
const mobileLayout = matchMedia('(max-width: 940px)');

function setMenu(open, returnFocus = false) {
  menu.classList.toggle('is-open', open);
  menuButton.setAttribute('aria-expanded', String(open));
  menuLabel.textContent = open ? 'Menüyü kapat' : 'Menüyü aç';
  if (returnFocus) menuButton.focus();
}

document.querySelector('.site-header').classList.add('has-menu');
menuButton.hidden = false;
menuButton.addEventListener('click', () => setMenu(menuButton.getAttribute('aria-expanded') === 'false'));
document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && menu.classList.contains('is-open')) setMenu(false, true);
});
mobileLayout.addEventListener('change', () => setMenu(false));

function updateActiveLink() {
  const selected = menuLinks.find((link) => link.hash === location.hash) || menuLinks[0];
  menuLinks.forEach((link) => link.removeAttribute('aria-current'));
  selected.setAttribute('aria-current', 'location');
}

menuLinks.forEach((link) => link.addEventListener('click', () => {
  if (mobileLayout.matches) setMenu(false, true);
}));
window.addEventListener('hashchange', updateActiveLink);
updateActiveLink();

if ('IntersectionObserver' in window && !matchMedia('(prefers-reduced-motion: reduce)').matches) {
  const cards = [...document.querySelectorAll('.card')];
  const observer = new IntersectionObserver((entries) => {
    entries.filter((entry) => entry.isIntersecting).forEach((entry, index) => {
      entry.target.style.setProperty('--delay', `${index * 70}ms`);
      entry.target.classList.add('reveal');
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.15 });
  cards.forEach((card) => observer.observe(card));
}
