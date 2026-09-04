/**
 * theme.js — Light / Dark / Game Theme Switcher
 *
 * Reads the saved theme from localStorage on page load,
 * applies it to <html data-theme="...">, and wires up all
 * theme toggle buttons so they stay in sync.
 *
 * Loaded as a plain <script> tag — no import/export needed.
 */

const THEME_KEY = 'portfolio-mode';

function getSavedTheme() {
  const saved = localStorage.getItem(THEME_KEY);
  return ['light', 'dark'].includes(saved) ? saved : 'light';
}

function applyTheme(theme) {
  
  // Trigger boot sequence if switching TO linux
  if (theme === 'linux' && document.documentElement.dataset.theme !== 'linux') {
    if (window.bootLinux) window.bootLinux();
  }
  document.documentElement.dataset.theme = theme;

  if (theme !== 'linux') localStorage.setItem(THEME_KEY, theme);

  document.querySelectorAll('.theme-btn').forEach(btn => {
    const isActive = btn.dataset.theme === theme;
    btn.classList.toggle('active', isActive);
    btn.setAttribute('aria-pressed', String(isActive));
  });
}

function initTheme() {
  applyTheme(getSavedTheme());

  document.querySelectorAll('.theme-btn').forEach(btn => {
    btn.addEventListener('click', () => applyTheme(btn.dataset.theme));
  });
}
