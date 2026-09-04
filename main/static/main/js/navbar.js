/**
 * navbar.js — Navbar Behaviours
 *
 * 1. Frosted-glass header on scroll (adds .scrolled class).
 * 2. Highlights the active nav link based on the visible section.
 * 3. Hamburger toggle for the mobile drawer.
 * 4. Closes the drawer on Escape key or link click.
 */

const TRACKED_SECTIONS = ['about', 'skills', 'showcase', 'certificates'];

function initScrolledHeader() {
  const header = document.getElementById('site-header');
  if (!header) return;

  const update = () => header.classList.toggle('scrolled', window.scrollY > 24);
  window.addEventListener('scroll', update, { passive: true });
  update();
}

function initActiveLinks() {
  const navLinks = document.querySelectorAll('.nav-link');
  if (!navLinks.length) return;

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.id;
        navLinks.forEach(link =>
          link.classList.toggle('active', link.dataset.section === id)
        );
      }
    });
  }, { rootMargin: '-45% 0px -50% 0px' });

  TRACKED_SECTIONS.forEach(id => {
    const el = document.getElementById(id);
    if (el) observer.observe(el);
  });
}

function initHamburger() {
  const hamburger    = document.getElementById('hamburger');
  const mobileDrawer = document.getElementById('mobileDrawer');
  if (!hamburger || !mobileDrawer) return;

  function openDrawer() {
    hamburger.setAttribute('aria-expanded', 'true');
    mobileDrawer.hidden = false;
  }
  function closeDrawer() {
    hamburger.setAttribute('aria-expanded', 'false');
    mobileDrawer.hidden = true;
  }

  hamburger.addEventListener('click', () => {
    hamburger.getAttribute('aria-expanded') === 'true' ? closeDrawer() : openDrawer();
  });

  mobileDrawer.querySelectorAll('.mobile-link').forEach(link =>
    link.addEventListener('click', closeDrawer)
  );

  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && !mobileDrawer.hidden) {
      closeDrawer();
      hamburger.focus();
    }
  });
}

function initNavbar() {
  initScrolledHeader();
  initActiveLinks();
  initHamburger();
}
