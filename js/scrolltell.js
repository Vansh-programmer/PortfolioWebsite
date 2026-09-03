/**
 * scrolltell.js — Scrollytelling 2.0 Engine
 *
 * Seven cinematic scroll effects:
 *   1. splitHeroText       — hero heading words fly in staggered
 *   2. heroExitParallax    — hero fades + drifts as you scroll past it
 *   3. aboutPinnedChapters — about section tells 3-chapter story while pinned
 *   4. skillMasteryBars    — skill cards get fill bars that animate in on scroll
 *   5. laptopLidOpen       — laptop lid cinematic open animation
 *   6. certFilmStrip       — certificates scroll horizontally as you scroll vertically
 *   7. chapterNav          — floating side dots for section navigation
 *   8. genericScrollTrigger— fires data-st="fade-up|fade-right|scale-in" elements
 */

function initScrolltell() {
  splitHeroText();
  heroExitParallax();
  aboutPinnedChapters();
  skillMasteryBars();
  laptopLidOpen();
  certFilmStrip();
  chapterNav();
  genericScrollTrigger();
  morphOverlay();
}

/* ════════════════════════════════════════════════════════════
   1. HERO — Split heading into words; each word clips up on load
════════════════════════════════════════════════════════════ */
function splitHeroText() {
  const heading = document.querySelector('.hero-heading');
  if (!heading) return;

  // Walk the DOM tree, wrapping text nodes in word spans
  function wrapTextNode(node) {
    const words = node.textContent.split(/(\s+)/);
    const frag = document.createDocumentFragment();
    words.forEach(part => {
      if (/\S/.test(part)) {
        const outer = document.createElement('span');
        outer.className = 'st-word';
        const inner = document.createElement('span');
        inner.className = 'st-word-inner';
        inner.textContent = part;
        outer.appendChild(inner);
        frag.appendChild(outer);
      } else {
        frag.appendChild(document.createTextNode(part));
      }
    });
    node.parentNode.replaceChild(frag, node);
  }

  function walk(node) {
    if (node.nodeType === Node.TEXT_NODE && /\S/.test(node.textContent)) {
      wrapTextNode(node);
    } else if (node.nodeType === Node.ELEMENT_NODE) {
      // Use slice so we don't iterate a live NodeList while modifying it
      Array.from(node.childNodes).forEach(walk);
    }
  }

  walk(heading);

  // Stagger delays
  heading.querySelectorAll('.st-word-inner').forEach((el, i) => {
    el.style.setProperty('--st-delay', `${0.15 + i * 0.065}s`);
  });

  // Trigger: hero is above the fold, so trigger immediately
  requestAnimationFrame(() => {
    heading.classList.add('st-triggered');
  });
}

/* ════════════════════════════════════════════════════════════
   2. HERO EXIT — text & photo drift + fade as user scrolls past
════════════════════════════════════════════════════════════ */
function heroExitParallax() {
  const hero  = document.querySelector('.hero');
  const text  = document.querySelector('.hero-text');
  const photo = document.querySelector('.hero-photo');
  if (!hero || !text || !photo) return;

  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  function update() {
    const heroH = hero.offsetHeight;
    const scrolled = window.scrollY;
    // Progress: 0 = top of page, 1 = hero is fully scrolled out
    const p = Math.max(0, Math.min(1, scrolled / heroH));

    text.style.opacity  = String(1 - p * 1.6);
    text.style.transform = `translateY(${p * -50}px)`;

    photo.style.opacity  = String(1 - p * 1.2);
    photo.style.transform = `translateY(${p * -28}px) scale(${1 - p * 0.06})`;
  }

  window.addEventListener('scroll', update, { passive: true });
  update();
}

/* ════════════════════════════════════════════════════════════
   3. ABOUT — Pinned 3-chapter story
   About section is wrapped in a tall container so user
   "scrolls through" 3 chapters while the section stays pinned.
════════════════════════════════════════════════════════════ */
function aboutPinnedChapters() {
  const section = document.getElementById('about');
  if (!section) return;

  const CHAPTERS = [
    {
      id: 'ch1',
      html: `
        <div class="container about-grid">
          <div class="about-text" style="max-width:600px">
            <p class="section-label">Chapter 1 — Who I am</p>
            <h2 class="section-heading" style="font-size:clamp(1.8rem,3.5vw,2.8rem)">
              A developer who cares about the <span class="marker">whole product</span>.
            </h2>
            <p style="color:var(--color-ink-soft);line-height:1.7;margin-bottom:1rem">
              I'm a full-stack developer who turns ideas into fast, reliable web apps—
              from database schema all the way to a polished, accessible interface.
            </p>
            <p style="color:var(--color-ink-soft);line-height:1.7">
              I build with the MERN stack and care deeply about clean architecture,
              secure authentication, and actually shipping to production.
            </p>
          </div>
          <div class="about-visual" aria-hidden="true">
            <div class="about-card">
              <div class="about-photo-wrap">
                <img src="https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=600&h=500&fit=crop&auto=format&q=75" alt="Coding setup" loading="lazy" />
              </div>
              <div class="about-tag hand">currently building</div>
            </div>
          </div>
        </div>`
    },
    {
      id: 'ch2',
      html: `
        <div class="container" style="max-width:700px">
          <p class="section-label">Chapter 2 — Experience</p>
          <h2 class="section-heading" style="font-size:clamp(1.8rem,3.5vw,2.8rem)">
            Real projects. <em>Real code shipped.</em>
          </h2>
          <div class="experience-list" style="margin-top:1rem;border-top:1px solid var(--color-line);padding-top:1.5rem;display:flex;flex-direction:column;gap:1.25rem">
            <div class="exp-item" style="border-left:2px solid var(--color-accent);padding-left:1rem">
              <p class="exp-role" style="font-weight:700;color:var(--color-ink)">Full-Stack Developer</p>
              <p class="exp-org" style="color:var(--color-ink-soft);font-size:.875rem">Freelance & Personal Projects</p>
              <p class="exp-period" style="font-family:var(--font-mono);font-size:.75rem;color:var(--color-muted);margin-top:.2rem">2023 — Present</p>
            </div>
            <div class="exp-item" style="border-left:2px solid var(--color-line);padding-left:1rem">
              <p class="exp-role" style="font-weight:700;color:var(--color-ink)">Web Development Bootcamp</p>
              <p class="exp-org" style="color:var(--color-ink-soft);font-size:.875rem">The Web Developer Course</p>
              <p class="exp-period" style="font-family:var(--font-mono);font-size:.75rem;color:var(--color-muted);margin-top:.2rem">2023</p>
            </div>
            <div class="exp-item" style="border-left:2px solid var(--color-line);padding-left:1rem">
              <p class="exp-role" style="font-weight:700;color:var(--color-ink)">Self-Taught Learning</p>
              <p class="exp-org" style="color:var(--color-ink-soft);font-size:.875rem">freeCodeCamp, The Odin Project, YouTube</p>
              <p class="exp-period" style="font-family:var(--font-mono);font-size:.75rem;color:var(--color-muted);margin-top:.2rem">2022 — 2023</p>
            </div>
          </div>
        </div>`
    },
    {
      id: 'ch3',
      html: `
        <div class="container" style="text-align:center;max-width:600px;margin:0 auto">
          <p class="section-label">Chapter 3 — Now</p>
          <h2 class="section-heading" style="font-size:clamp(1.8rem,3.5vw,2.8rem)">
            Open for new <em>adventures</em>.
          </h2>
          <p style="color:var(--color-ink-soft);line-height:1.7;margin-bottom:2.5rem">
            I'm actively looking for roles where I can ship real product,
            learn fast, and work with a team that gives a damn.
          </p>
          <a href="#contact" class="btn-primary" style="display:inline-flex;align-items:center;gap:.5rem;background:var(--color-ink);color:var(--color-paper);border-radius:999px;padding:.85rem 2rem;font-size:1rem;font-weight:600;text-decoration:none">
            Let's talk <span>→</span>
          </a>
        </div>`
    }
  ];

  const CHAPTER_VH = 100; // each chapter gets ~100vh of scroll room
  const totalHeight = window.innerHeight * (CHAPTERS.length + 0.5);

  // 1. Build the pinned structure around the existing about section
  const wrap = document.createElement('div');
  wrap.className = 'st-about-pin-wrap about-section';
  wrap.style.height = totalHeight + 'px';
  wrap.style.background = 'var(--color-sand)';

  const sticky = document.createElement('div');
  sticky.className = 'st-about-sticky';

  // Chapter panels
  CHAPTERS.forEach((ch, i) => {
    const panel = document.createElement('div');
    panel.className = 'st-chapter-panel' + (i === 0 ? ' is-active' : '');
    panel.innerHTML = ch.html;
    sticky.appendChild(panel);
  });

  // Chapter pips
  const pips = document.createElement('div');
  pips.className = 'st-chapter-pips';
  CHAPTERS.forEach((_, i) => {
    const pip = document.createElement('div');
    pip.className = 'st-pip' + (i === 0 ? ' active' : '');
    pips.appendChild(pip);
  });
  sticky.appendChild(pips);

  wrap.appendChild(sticky);

  // Replace the original about section in the DOM
  section.parentNode.replaceChild(wrap, section);

  // 2. Scroll-driven chapter switching
  const panels = sticky.querySelectorAll('.st-chapter-panel');
  const pipEls  = sticky.querySelectorAll('.st-pip');

  function updateChapters() {
    const rect = wrap.getBoundingClientRect();
    const scrolledIntoWrap = -rect.top;
    const chapterH = totalHeight / CHAPTERS.length;
    const idx = Math.min(
      CHAPTERS.length - 1,
      Math.max(0, Math.floor(scrolledIntoWrap / chapterH))
    );

    panels.forEach((p, i) => {
      p.classList.toggle('is-active', i === idx);
      p.classList.toggle('is-past',   i < idx);
    });
    pipEls.forEach((p, i) => p.classList.toggle('active', i === idx));
  }

  window.addEventListener('scroll', updateChapters, { passive: true });
  updateChapters();
}

/* ════════════════════════════════════════════════════════════
   4. SKILL MASTERY BARS — injected into each card, animate on scroll
════════════════════════════════════════════════════════════ */
const SKILL_LEVELS = [92, 85, 80, 75, 72, 88];

function skillMasteryBars() {
  const cats = document.querySelectorAll('.skill-cat');
  if (!cats.length) return;

  cats.forEach((cat, i) => {
    const level = SKILL_LEVELS[i] || 75;
    const track = document.createElement('div');
    track.className = 'skill-bar-track';
    const fill = document.createElement('div');
    fill.className = 'skill-bar-fill';
    fill.dataset.level = level;
    fill.style.setProperty('--st-delay', `${i * 0.1}s`);
    track.appendChild(fill);
    cat.appendChild(track);
  });

  // Animate fills when in view
  const fills = document.querySelectorAll('.skill-bar-fill');
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.style.width = e.target.dataset.level + '%';
        obs.unobserve(e.target);
      }
    });
  }, { threshold: 0.6 });

  fills.forEach(f => obs.observe(f));
}

/* ════════════════════════════════════════════════════════════
   5. LAPTOP LID — starts closed, cinematic open on scroll-in
════════════════════════════════════════════════════════════ */
function laptopLidOpen() {
  const laptopWrap = document.querySelector('.laptop-wrapper');
  const lid = document.querySelector('.laptop-lid');
  if (!laptopWrap || !lid) return;

  // Set initial "closed" state
  lid.classList.add('st-lid-init');

  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        lid.classList.remove('st-lid-init');
        lid.classList.add('st-lid-open');
        obs.unobserve(e.target);
      }
    });
  }, { threshold: 0.25 });

  obs.observe(laptopWrap);
}

/* ════════════════════════════════════════════════════════════
   6. CERTIFICATES FILM STRIP
   Converts the certificates .certs-grid into a horizontal
   strip that scrolls left as the user scrolls down.
════════════════════════════════════════════════════════════ */
function certFilmStrip() {
  const certSection = document.getElementById('certificates');
  if (!certSection) return;

  // Grab all existing cert cards
  const cards = Array.from(certSection.querySelectorAll('.cert-card'));
  if (!cards.length) return;

  // Hide the original grid (we'll rebuild)
  const grid = certSection.querySelector('.certs-grid');
  if (grid) grid.style.display = 'none';

  // Build film strip structure
  const outer = document.createElement('div');
  outer.className = 'cert-film-outer';

  const sticky = document.createElement('div');
  sticky.className = 'cert-film-sticky';

  const track = document.createElement('div');
  track.className = 'cert-film-track';
  track.id = 'cert-film-track';

  // Clone each card into a film card
  cards.forEach(card => {
    const filmCard = document.createElement('div');
    filmCard.className = 'cert-film-card';
    // Transfer image and info
    const imgWrap = card.querySelector('.cert-img-wrap');
    const info    = card.querySelector('.cert-info');
    if (imgWrap) filmCard.appendChild(imgWrap.cloneNode(true));
    if (info)    filmCard.appendChild(info.cloneNode(true));
    track.appendChild(filmCard);
  });

  sticky.appendChild(track);
  outer.appendChild(sticky);
  certSection.appendChild(outer);

  // Set outer height: enough scroll room to traverse all cards
  function setHeight() {
    const stripW = track.scrollWidth - window.innerWidth + window.innerWidth * 0.2;
    outer.style.height = (window.innerHeight + stripW) + 'px';
  }
  setHeight();
  window.addEventListener('resize', setHeight);

  // Scroll driver
  function updateStrip() {
    const rect = outer.getBoundingClientRect();
    // progress: 0 = top of outer at bottom of viewport; 1 = bottom of outer at top
    const total = outer.offsetHeight - window.innerHeight;
    const scrolled = Math.max(0, -rect.top);
    const p = Math.max(0, Math.min(1, scrolled / total));
    const maxShift = track.scrollWidth - window.innerWidth + window.innerWidth * 0.2;
    track.style.transform = `translateX(${-p * maxShift}px)`;
  }

  window.addEventListener('scroll', updateStrip, { passive: true });
  updateStrip();
}

/* ════════════════════════════════════════════════════════════
   7. CHAPTER NAV — floating right-side dots
════════════════════════════════════════════════════════════ */
function chapterNav() {
  const CHAPTERS = [
    { id: 'top',          label: 'Home'    },
    { id: 'skills',       label: 'Skills'  },
    { id: 'showcase',     label: 'Work'    },
    { id: 'certificates', label: 'Certs'   },
    { id: 'contact',      label: 'Contact' },
  ];

  const nav = document.createElement('nav');
  nav.id = 'st-nav';
  nav.setAttribute('aria-label', 'Page sections');

  CHAPTERS.forEach(({ id, label }) => {
    const btn = document.createElement('button');
    btn.className = 'st-dot';
    btn.dataset.label = label;
    btn.setAttribute('aria-label', 'Jump to ' + label);
    btn.addEventListener('click', () => {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    });
    nav.appendChild(btn);
  });

  document.body.appendChild(nav);

  const els  = CHAPTERS.map(c => document.getElementById(c.id)).filter(Boolean);
  const dots = nav.querySelectorAll('.st-dot');

  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        const i = els.indexOf(e.target);
        if (i !== -1) dots.forEach((d, j) => d.classList.toggle('active', j === i));
      }
    });
  }, { rootMargin: '-40% 0px -40% 0px' });

  els.forEach(el => obs.observe(el));
  if (dots.length) dots[0].classList.add('active');
}

/* ════════════════════════════════════════════════════════════
   8. GENERIC SCROLL TRIGGER — data-st="fade-up|fade-right|scale-in"
════════════════════════════════════════════════════════════ */
function genericScrollTrigger() {
  const els = document.querySelectorAll('[data-st]');
  if (!els.length) return;

  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('st-in');
        obs.unobserve(e.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });

  els.forEach(el => obs.observe(el));
}

/* ════════════════════════════════════════════════════════════
   9. MORPH OVERLAY — subtle color tint shifts per section
════════════════════════════════════════════════════════════ */
function morphOverlay() {
  const overlay = document.createElement('div');
  overlay.id = 'st-morph-overlay';
  document.body.appendChild(overlay);

  const SECTION_TINTS = {
    top:          'transparent',
    skills:       '#7c5cff',
    showcase:     '#ff5a3c',
    certificates: '#12b28c',
    contact:      '#ffc542',
  };

  const sections = Object.keys(SECTION_TINTS)
    .map(id => ({ id, el: document.getElementById(id) }))
    .filter(s => s.el);

  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        const found = sections.find(s => s.el === e.target);
        if (found) overlay.style.background = SECTION_TINTS[found.id];
      }
    });
  }, { rootMargin: '-35% 0px -35% 0px' });

  sections.forEach(s => obs.observe(s.el));
}
