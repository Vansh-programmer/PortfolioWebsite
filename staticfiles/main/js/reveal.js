/**
 * reveal.js — Scroll Reveal Animations
 *
 * Every .reveal element starts invisible (set in utilities.css).
 * IntersectionObserver adds .is-visible once it enters the viewport,
 * triggering the CSS transition. Each element is unobserved after
 * it reveals (fire once only) to keep things efficient.
 */

function initReveal() {
  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.08, rootMargin: '0px 0px -40px 0px' }
  );

  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
}
