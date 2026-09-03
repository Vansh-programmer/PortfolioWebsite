/**
 * main.js — Entry Point
 *
 * This is loaded LAST in index.html (after all other js/ files).
 * By that point every function (initTheme, initNavbar, etc.)
 * is already defined globally, so we just call them here.
 *
 * Load order in index.html:
 *   theme.js  → navbar.js  → reveal.js  → parallax.js  → form.js  → main.js
 */

// Footer: current year
const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();

// Initialise all features
initTheme();
initNavbar();
initReveal();
initParallax();
initForm();
