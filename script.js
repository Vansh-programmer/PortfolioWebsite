/* ============================================================
   MODERN PORTFOLIO — script.js
   Matches: Figma published design interactions
============================================================ */

'use strict';

/* ── Footer year ─────────────────────────────────────────────── */
const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();

/* ── Theme management ────────────────────────────────────────── */
const THEME_KEY = 'portfolio-mode';

function getStoredTheme() {
  const v = localStorage.getItem(THEME_KEY);
  return (v === 'light' || v === 'dark' || v === 'game') ? v : 'light';
}

function applyTheme(theme) {
  document.documentElement.dataset.theme = theme;
  localStorage.setItem(THEME_KEY, theme);
  // Update all theme buttons (desktop + mobile both)
  document.querySelectorAll('.theme-btn').forEach(btn => {
    const isActive = btn.dataset.theme === theme;
    btn.classList.toggle('active', isActive);
    btn.setAttribute('aria-pressed', String(isActive));
  });
}

// Apply saved theme on load
applyTheme(getStoredTheme());

// Attach click handlers to all theme buttons
document.querySelectorAll('.theme-btn').forEach(btn => {
  btn.addEventListener('click', () => applyTheme(btn.dataset.theme));
});

/* ── Navbar scroll effect ────────────────────────────────────── */
const header = document.getElementById('site-header');

const onScroll = () => {
  header.classList.toggle('scrolled', window.scrollY > 24);
  // Scroll progress bar
  const scrollTop = window.scrollY;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  const progress = docHeight > 0 ? scrollTop / docHeight : 0;
  document.querySelector('.scroll-progress').style.setProperty('--scroll', progress);
};

window.addEventListener('scroll', onScroll, { passive: true });
onScroll(); // run once on load

/* ── Active nav link on scroll ───────────────────────────────── */
const navSections = ['about', 'skills', 'showcase', 'certificates'];

const sectionObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const id = entry.target.id;
      document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.toggle('active', link.dataset.section === id);
      });
    }
  });
}, { rootMargin: '-45% 0px -50% 0px' });

navSections.forEach(id => {
  const el = document.getElementById(id);
  if (el) sectionObserver.observe(el);
});

/* ── Mobile hamburger ────────────────────────────────────────── */
const hamburger  = document.getElementById('hamburger');
const mobileDrawer = document.getElementById('mobileDrawer');

if (hamburger && mobileDrawer) {
  hamburger.addEventListener('click', () => {
    const expanded = hamburger.getAttribute('aria-expanded') === 'true';
    hamburger.setAttribute('aria-expanded', String(!expanded));
    mobileDrawer.hidden = expanded;
  });

  // Close on mobile link click
  mobileDrawer.querySelectorAll('.mobile-link').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.setAttribute('aria-expanded', 'false');
      mobileDrawer.hidden = true;
    });
  });
}

/* ── Scroll reveal ───────────────────────────────────────────── */
const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

/* ── Parallax blobs (light, RAF-based) ───────────────────────── */
if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  let ticking = false;

  const updateBlobs = () => {
    const y = window.scrollY;
    document.querySelectorAll('.blob').forEach((blob, i) => {
      const speed = i === 0 ? 0.12 : 0.07;
      blob.style.transform = `translateY(${y * speed}px)`;
    });
    ticking = false;
  };

  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(updateBlobs);
      ticking = true;
    }
  }, { passive: true });
}

/* ── Contact form validation ─────────────────────────────────── */
const form        = document.getElementById('contactForm');
const formSuccess = document.getElementById('formSuccess');
const submitBtn   = document.getElementById('submitBtn');

function validateField(input, errEl, validations) {
  let errorMsg = '';

  for (const { test, msg } of validations) {
    if (!test(input.value.trim())) {
      errorMsg = msg;
      break;
    }
  }

  input.classList.toggle('has-error', !!errorMsg);
  if (errEl) errEl.textContent = errorMsg;
  return !errorMsg;
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const fields = [
  {
    id: 'fname', errId: 'fname-err',
    validations: [{ test: v => v.length >= 2, msg: 'Please enter your name (at least 2 characters).' }]
  },
  {
    id: 'femail', errId: 'femail-err',
    validations: [
      { test: v => v.length > 0, msg: 'Email address is required.' },
      { test: v => EMAIL_RE.test(v), msg: 'Please enter a valid email address.' }
    ]
  },
  {
    id: 'fsubject', errId: 'fsubject-err',
    validations: [{ test: v => v.length >= 3, msg: 'Subject is required.' }]
  },
  {
    id: 'fmessage', errId: 'fmessage-err',
    validations: [{ test: v => v.length >= 10, msg: 'Message must be at least 10 characters.' }]
  }
];

if (form) {
  // Inline validation on blur
  fields.forEach(({ id, errId, validations }) => {
    const input  = document.getElementById(id);
    const errEl  = document.getElementById(errId);
    if (!input) return;
    input.addEventListener('blur', () => validateField(input, errEl, validations));
    input.addEventListener('input', () => {
      if (input.classList.contains('has-error')) validateField(input, errEl, validations);
    });
  });

  form.addEventListener('submit', e => {
    e.preventDefault();

    // Validate all
    let allValid = true;
    fields.forEach(({ id, errId, validations }) => {
      const input = document.getElementById(id);
      const errEl = document.getElementById(errId);
      if (!validateField(input, errEl, validations)) allValid = false;
    });

    if (!allValid) {
      // Focus first invalid field
      const firstErr = form.querySelector('.has-error');
      if (firstErr) firstErr.focus();
      return;
    }

    // Simulate submission
    submitBtn.disabled = true;
    submitBtn.textContent = 'Sending…';

    setTimeout(() => {
      form.reset();
      form.querySelectorAll('.has-error').forEach(el => el.classList.remove('has-error'));
      submitBtn.disabled = false;
      submitBtn.textContent = 'Send message →';
      formSuccess.hidden = false;
      formSuccess.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      setTimeout(() => { formSuccess.hidden = true; }, 5000);
    }, 1200);
  });
}

/* ── Smooth close mobile drawer on escape ────────────────────── */
document.addEventListener('keydown', e => {
  if (e.key === 'Escape' && hamburger && !mobileDrawer.hidden) {
    hamburger.setAttribute('aria-expanded', 'false');
    mobileDrawer.hidden = true;
    hamburger.focus();
  }
});
