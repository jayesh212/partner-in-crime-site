// Theme switch for the privacy and support pages (Auto → Light → Dark).
const root = document.documentElement;
const btn = document.querySelector('[data-theme-btn]');
const txt = document.querySelector('[data-theme-txt]');
const MODES = ['auto', 'light', 'dark'];
const apply = mode => {
  if (mode === 'auto') delete root.dataset.theme; else root.dataset.theme = mode;
  const label = mode[0].toUpperCase() + mode.slice(1);
  txt.textContent = label;
  btn.setAttribute('aria-label', `Colour theme: ${label}. Change`);
};
let mode = root.dataset.theme || 'auto';
apply(mode);
btn.addEventListener('click', () => {
  mode = MODES[(MODES.indexOf(mode) + 1) % MODES.length];
  apply(mode);
  try { mode === 'auto' ? localStorage.removeItem('pic-theme') : localStorage.setItem('pic-theme', mode); } catch {}
});
