document.documentElement.classList.replace('no-js', 'js');

// Set this to the App Store URL on launch day; every "store" button goes live.
const APP_STORE_URL = '';

const PAIRS = [
  { name: 'Pink × Blue', makes: 'midnight', a: '#FF48B0', b: '#0078BF' },
  { name: 'Orange × Teal', makes: 'moss', a: '#FF6C2F', b: '#00838A' },
  { name: 'Yellow × Violet', makes: 'plum', a: '#FFE33B', b: '#765BA7' },
  { name: 'Coral × Green', makes: 'olive', a: '#FF665E', b: '#00A95C' },
];

const $ = (s, el = document) => el.querySelector(s);
const $$ = (s, el = document) => [...el.querySelectorAll(s)];
const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
const store = {
  get(k) { try { return localStorage.getItem(k); } catch { return null; } },
  set(k, v) { try { v == null ? localStorage.removeItem(k) : localStorage.setItem(k, v); } catch {} },
};

/* Store links */
if (APP_STORE_URL) {
  $$('[data-store-link]').forEach(a => { a.href = APP_STORE_URL; a.hidden = false; a.textContent = 'Download on the App Store'; });
}

/* Theme: Auto → Light → Dark */
const root = document.documentElement;
const themeBtn = $('[data-theme-btn]');
const themeTxt = $('[data-theme-txt]');
const darkSrc = $('[data-dark-src]');
const MODES = ['auto', 'light', 'dark'];
const applyTheme = mode => {
  if (mode === 'auto') delete root.dataset.theme; else root.dataset.theme = mode;
  const label = mode[0].toUpperCase() + mode.slice(1);
  themeTxt.textContent = label;
  themeBtn.setAttribute('aria-label', `Colour theme: ${label}. Change`);
  darkSrc.media = mode === 'auto' ? '(prefers-color-scheme: dark)' : mode === 'dark' ? 'all' : 'not all';
};
let mode = root.dataset.theme || 'auto';
applyTheme(mode);
themeBtn.addEventListener('click', () => {
  mode = MODES[(MODES.indexOf(mode) + 1) % MODES.length];
  applyTheme(mode);
  store.set('pic-theme', mode === 'auto' ? null : mode);
});

/* Nav */
const nav = $('[data-nav]');
const onScroll = () => nav.classList.toggle('is-scrolled', scrollY > 8);
addEventListener('scroll', onScroll, { passive: true }); onScroll();
const toggle = $('[data-menu-toggle]');
const menu = $('#menu');
const setMenu = open => {
  toggle.setAttribute('aria-expanded', open);
  toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
  menu.classList.toggle('is-open', open);
};
toggle.addEventListener('click', () => setMenu(toggle.getAttribute('aria-expanded') !== 'true'));
menu.addEventListener('click', e => { if (e.target.closest('a')) setMenu(false); });
addEventListener('keydown', e => { if (e.key === 'Escape' && menu.classList.contains('is-open')) { setMenu(false); toggle.focus(); } });
matchMedia('(min-width: 761px)').addEventListener('change', () => setMenu(false));

/* Ticker: duplicate once so the loop is seamless */
const track = $('[data-ticker]');
track.innerHTML += track.innerHTML;

/* Reveal */
const rvTargets = $$('.head, .stat, .pets li, .shot, .form, .faq__list, .mixer');
rvTargets.forEach(el => el.classList.add('rv'));
const io = new IntersectionObserver(es => es.forEach(e => {
  if (e.isIntersecting) { e.target.classList.add('is-in'); io.unobserve(e.target); }
}), { rootMargin: '0px 0px -8% 0px' });
rvTargets.forEach(el => io.observe(el));

/* Overprint bars grow in */
if (!reduced) {
  const duals = $$('.dual');
  duals.forEach(d => $$('i', d).forEach(i => i.style.setProperty('--p', 0)));
  const bo = new IntersectionObserver(es => es.forEach(e => {
    if (!e.isIntersecting) return;
    $$('i', e.target).forEach((i, n) => setTimeout(() => i.style.setProperty('--p', 1), n * 220));
    bo.unobserve(e.target);
  }), { threshold: .5 });
  duals.forEach(d => bo.observe(d));
}

/* Ink mixer */
const mixer = $('[data-mixer]');
const range = $('[data-mixer-range]', mixer);
const labMid = $('[data-lab-mid]', mixer);
const pairsEl = $('[data-pairs]');
let pairIdx = 0;
const setCloser = v => {
  // 0 = apart, 100 = fully overlapped
  mixer.style.setProperty('--la', `${(v / 100) * 27}%`);
  const shares = v > 30;
  labMid.textContent = shares ? `Ours · ${PAIRS[pairIdx].makes}` : 'Nothing shared yet';
};
range.addEventListener('input', () => setCloser(+range.value));
const applyPair = (i, focus) => {
  pairIdx = i;
  const p = PAIRS[i];
  mixer.style.setProperty('--a', p.a);
  mixer.style.setProperty('--b', p.b);
  $$('.pair', pairsEl).forEach((el, j) => { el.setAttribute('aria-checked', j === i); el.tabIndex = j === i ? 0 : -1; });
  if (focus) $$('.pair', pairsEl)[i].focus();
  setCloser(+range.value);
};
PAIRS.forEach((p, i) => {
  const b = document.createElement('button');
  b.type = 'button'; b.className = 'pair'; b.setAttribute('role', 'radio');
  b.innerHTML = `<span class="pair__dots" aria-hidden="true"><i style="background:${p.a}"></i><i style="background:${p.b}"></i></span><span class="pair__t"><b>${p.name}</b><span>makes ${p.makes}</span></span>`;
  b.addEventListener('click', () => applyPair(i));
  pairsEl.append(b);
});
pairsEl.addEventListener('keydown', e => {
  const k = { ArrowRight: 1, ArrowDown: 1, ArrowLeft: -1, ArrowUp: -1 }[e.key];
  if (!k) return;
  e.preventDefault();
  applyPair((pairIdx + k + PAIRS.length) % PAIRS.length, true);
});
applyPair(0);
// Drift the blobs together the first time the mixer is seen
if (!reduced) {
  range.value = 0; setCloser(0);
  const mo = new IntersectionObserver(es => es.forEach(e => {
    if (!e.isIntersecting) return;
    mo.disconnect();
    let v = 0;
    const step = () => { v = Math.min(62, v + 2); range.value = v; setCloser(v); if (v < 62) requestAnimationFrame(step); };
    setTimeout(step, 250);
  }), { threshold: .6 });
  mo.observe(mixer);
}

/* Rail buttons */
const rail = $('[data-rail]');
const prev = $('[data-rail-prev]');
const next = $('[data-rail-next]');
const stepW = () => { const s = $('.shot', rail); return s ? s.getBoundingClientRect().width + 32 : 300; };
prev.addEventListener('click', () => rail.scrollBy({ left: -stepW() * 2, behavior: reduced ? 'auto' : 'smooth' }));
next.addEventListener('click', () => rail.scrollBy({ left: stepW() * 2, behavior: reduced ? 'auto' : 'smooth' }));
const railState = () => {
  prev.disabled = rail.scrollLeft < 4;
  next.disabled = rail.scrollLeft + rail.clientWidth >= rail.scrollWidth - 4;
};
rail.addEventListener('scroll', railState, { passive: true });
addEventListener('resize', railState); railState();

/* Wind-down demo: one clock, two rings */
const sync = $('[data-sync]');
const rings = $$('[data-ring]', sync);
const timeEl = $('[data-sync-time]', sync);
const syncBtn = $('[data-sync-btn]', sync);
const syncStatus = $('[data-sync-status]', sync);
const LEN = 15, C = 119.4;
let timer = null;
const render = left => {
  timeEl.textContent = `0:${String(left).padStart(2, '0')}`;
  rings.forEach(r => { r.style.strokeDashoffset = C * (1 - left / LEN); });
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
    if (left <= 0) { clearInterval(timer); timer = null; syncBtn.textContent = 'Again'; syncStatus.textContent = 'Lights out. Goodnight.'; }
  }, 1000);
});

/* Share */
const shareBtn = $('[data-share]');
const shareStatus = $('[data-share-status]');
shareBtn.addEventListener('click', async () => {
  const url = location.origin + location.pathname;
  const data = { title: 'Partner in Crimes', text: 'Be my partner in crime? Habits for two.', url };
  try {
    if (navigator.share) { await navigator.share(data); shareStatus.textContent = 'Sent.'; return; }
    await navigator.clipboard.writeText(url);
    shareStatus.textContent = 'Link copied. Send it to your person.';
  } catch (err) {
    if (err && err.name === 'AbortError') { shareStatus.textContent = ''; return; }
    shareStatus.textContent = `Copy this link: ${url}`;
  }
});
