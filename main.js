document.documentElement.classList.remove('no-js');
// Set this to the App Store URL on launch day; every "store" button goes live.
const APP_STORE_URL = '';

const PAIRS = [
  ['Neon Date', '#6C4DFF', '#FF4D9A'], ['Lagoon Sunset', '#00B4E6', '#FF7A2F'],
  ['Mojito Berry', '#16C47F', '#E0338F'], ['Cobalt Peach', '#2F5BFF', '#FF8A5C'],
  ['Mint Grape', '#12CFA0', '#8B4DFF'], ['Sun Cherry', '#FFB01F', '#F0365B'],
  ['Sky Lilac', '#2EA6FF', '#C066FF'], ['Midnight Coral', '#4B3BFF', '#FF5E57'],
];

const $ = (s, el = document) => el.querySelector(s);
const $$ = (s, el = document) => [...el.querySelectorAll(s)];
const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
const store = {
  get(k) { try { return localStorage.getItem(k); } catch { return null; } },
  set(k, v) { try { localStorage.setItem(k, v); } catch {} },
};

/* Store links */
if (APP_STORE_URL) {
  $$('[data-store-link]').forEach(a => {
    a.href = APP_STORE_URL; a.hidden = false; a.textContent = 'Download on the App Store';
  });
}

/* Nav: scrolled state + mobile menu */
const nav = $('[data-nav]');
const onScroll = () => nav.classList.toggle('is-scrolled', scrollY > 12);
addEventListener('scroll', onScroll, { passive: true }); onScroll();

const toggle = $('[data-menu-toggle]');
const menu = $('#menu');
const setMenu = open => {
  toggle.setAttribute('aria-expanded', open);
  toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
  menu.classList.toggle('is-open', open);
  nav.classList.toggle('menu-open', open);
};
toggle.addEventListener('click', () => setMenu(toggle.getAttribute('aria-expanded') !== 'true'));
menu.addEventListener('click', e => { if (e.target.closest('a')) setMenu(false); });
addEventListener('keydown', e => {
  if (e.key === 'Escape' && menu.classList.contains('is-open')) { setMenu(false); toggle.focus(); }
});
matchMedia('(min-width: 761px)').addEventListener('change', () => setMenu(false));

/* Reveal on scroll */
const io = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('is-in'); io.unobserve(e.target); } });
}, { rootMargin: '0px 0px -8% 0px' });
$$('.reveal').forEach(el => io.observe(el));

/* Comparison bars grow in */
const bars = $$('[data-bars]');
if (!reduced) {
  bars.forEach(b => $$('.bar', b).forEach(x => x.style.setProperty('--p', 0)));
  const bo = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (!e.isIntersecting) return;
      $$('.bar', e.target).forEach((x, i) => setTimeout(() => x.style.setProperty('--p', 1), i * 180));
      bo.unobserve(e.target);
    });
  }, { threshold: .4 });
  bars.forEach(b => bo.observe(b));
}

/* Orbits: hold still for reduced motion */
const orbits = $('[data-orbits]');
if (reduced && orbits.pauseAnimations) orbits.pauseAnimations();

/* Tour: swap the sticky phone as chapters pass the middle */
const shots = $$('[data-shot]');
const chaps = $$('[data-chap]');
const show = key => {
  shots.forEach(s => s.classList.toggle('is-on', s.dataset.shot === key));
  chaps.forEach(c => c.classList.toggle('is-on', c.dataset.chap === key));
};
const co = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) show(e.target.dataset.chap); });
}, { rootMargin: '-45% 0px -45% 0px' });
chaps.forEach(c => co.observe(c));
show('today');

/* Colour pairs: the page follows the chosen pair */
const swWrap = $('[data-swatches]');
const swName = $('[data-swatch-name]');
const applyPair = (i, save) => {
  const [name, a, b] = PAIRS[i];
  document.documentElement.style.setProperty('--me', a);
  document.documentElement.style.setProperty('--pa', b);
  $$('.sw', swWrap).forEach((s, j) => { s.setAttribute('aria-checked', j === i); s.tabIndex = j === i ? 0 : -1; });
  swName.textContent = name;
  if (save) store.set('pic-pair', i);
};
PAIRS.forEach(([name, a, b], i) => {
  const btn = document.createElement('button');
  btn.type = 'button'; btn.className = 'sw';
  btn.setAttribute('role', 'radio'); btn.setAttribute('aria-label', name);
  btn.innerHTML = `<svg viewBox="0 0 64 40" aria-hidden="true"><circle cx="24" cy="20" r="16" fill="${a}"/><circle cx="40" cy="20" r="16" fill="${b}"/></svg>`;
  btn.addEventListener('click', () => applyPair(i, true));
  swWrap.append(btn);
});
swWrap.addEventListener('keydown', e => {
  const keys = { ArrowRight: 1, ArrowDown: 1, ArrowLeft: -1, ArrowUp: -1 };
  if (!(e.key in keys)) return;
  e.preventDefault();
  const cur = $$('.sw', swWrap).findIndex(s => s.getAttribute('aria-checked') === 'true');
  const next = (cur + keys[e.key] + PAIRS.length) % PAIRS.length;
  applyPair(next, true); $$('.sw', swWrap)[next].focus();
});
const saved = Number(store.get('pic-pair'));
applyPair(Number.isInteger(saved) && PAIRS[saved] ? saved : 0, false);

/* Wind-down demo: two rings, one clock */
const sync = $('[data-sync]');
const rings = $$('[data-ring]', sync);
const timeEl = $('[data-sync-time]', sync);
const syncBtn = $('[data-sync-btn]', sync);
const syncStatus = $('[data-sync-status]', sync);
const LEN = 15, C = 119.4;
let timer = null;
const render = left => {
  timeEl.textContent = `0:${String(left).padStart(2, '0')}`;
  rings.forEach(r => r.style.strokeDashoffset = C * (1 - left / LEN));
};
syncBtn.addEventListener('click', () => {
  if (timer) {
    clearInterval(timer); timer = null; render(LEN);
    syncBtn.textContent = 'Try 15 seconds'; syncStatus.textContent = 'Stopped.';
    return;
  }
  let left = LEN; render(left);
  syncBtn.textContent = 'Stop';
  syncStatus.textContent = 'Started on both phones.';
  timer = setInterval(() => {
    left -= 1; render(left);
    if (left <= 0) {
      clearInterval(timer); timer = null;
      syncBtn.textContent = 'Again';
      syncStatus.textContent = 'Done together. Goodnight.';
    }
  }, 1000);
});

/* Share: the main action before launch is bringing your person */
const shareBtn = $('[data-share]');
const shareStatus = $('[data-share-status]');
shareBtn.addEventListener('click', async () => {
  const url = location.origin + location.pathname;
  const data = { title: 'Partner in Crimes', text: 'Want to be my partner in crime? Goals, for two.', url };
  try {
    if (navigator.share) { await navigator.share(data); shareStatus.textContent = 'Sent.'; return; }
    await navigator.clipboard.writeText(url);
    shareStatus.textContent = 'Link copied. Send it to your person.';
  } catch (err) {
    if (err && err.name === 'AbortError') { shareStatus.textContent = ''; return; }
    shareStatus.textContent = `Copy this link: ${url}`;
  }
});
