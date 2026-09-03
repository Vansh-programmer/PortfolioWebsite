/**
 * about-scroll.js — Scroll Typography Animation
 *
 * Breaks the About section text into words and highlights them
 * sequentially as the user scrolls down the page.
 */

function initAboutScroll() {
  const textEl = document.getElementById('scrolly-text');
  if (!textEl) return;

  // 1. Prepare the text: split into words and wrap in <span>
  const text = textEl.textContent.trim();
  const words = text.split(/\s+/);
  textEl.innerHTML = ''; // clear original text

  const spans = words.map(word => {
    const span = document.createElement('span');
    span.textContent = word + ' '; // Add space back
    span.className = 'scroll-word';
    textEl.appendChild(span);
    return span;
  });

  // 2. Scroll event to calculate visibility progress
  function onScroll() {
    const rect = textEl.getBoundingClientRect();
    const windowHeight = window.innerHeight;
    
    // The top of the text element relative to the viewport
    const elementTop = rect.top;
    const elementHeight = rect.height;
    
    // Animation triggers when text is 80% down the screen,
    // and finishes when text reaches 35% down the screen.
    const start = windowHeight * 0.85; 
    const end = windowHeight * 0.35;
    
    let progress = (start - elementTop) / (start - end);
    progress = Math.max(0, Math.min(1, progress));
    
    // Calculate how many words should be lit
    const activeCount = Math.floor(progress * spans.length);
    
    spans.forEach((span, i) => {
      if (i < activeCount) {
        span.classList.add('lit');
      } else {
        span.classList.remove('lit');
      }
    });
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  
  // Initial check in case it's already in view on load
  onScroll();
}
