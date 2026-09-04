/**
 * parallax.js — Scroll Progress Bar & Blob Parallax
 *
 * 1. Scroll progress bar: updates --scroll CSS variable which
 *    drives the gradient bar via transform: scaleX().
 *
 * 2. Blob parallax: gently moves the hero background blobs as
 *    the user scrolls for a subtle depth effect.
 *    Skipped when prefers-reduced-motion is set.
 */

function initScrollProgress() {
  const bar = document.querySelector('.scroll-progress');
  if (!bar) return;

  const update = () => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress  = docHeight > 0 ? scrollTop / docHeight : 0;
    bar.style.setProperty('--scroll', progress);
  };

  window.addEventListener('scroll', update, { passive: true });
  update();
}

function initBlobParallax() {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const blobs = document.querySelectorAll('.blob');
  if (!blobs.length) return;

  let ticking = false;

  const update = () => {
    const y = window.scrollY;
    blobs.forEach((blob, index) => {
      const speed = index === 0 ? 0.12 : 0.07;
      blob.style.transform = `translateY(${y * speed}px)`;
    });
    ticking = false;
  };

  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(update);
      ticking = true;
    }
  }, { passive: true });
}

function initParallax() {
  initScrollProgress();
  initBlobParallax();
}
