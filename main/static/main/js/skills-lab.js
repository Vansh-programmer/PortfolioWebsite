/**
 * skills-lab.js — Visual Web Builder
 *
 * Shows a mini website being built in three stages:
 *   1. HTML  → bare browser-default structure (no style)
 *   2. CSS   → beautiful design animates in live
 *   3. JS    → dark-mode toggle becomes interactive
 *
 * No code is shown — only the visual transformation.
 */

const WEB_STAGES = [
  {
    id:       'html',
    icon:     '🌐',
    name:     'HTML',
    sublabel: 'Structure',
    color:    '#e44d26',
    url:      'vansh.dev/index.html',
    label:    'HTML5 — Structure',
    desc:     'HTML gives the page its skeleton. No colours, no fonts — just semantic tags telling the browser what each element IS.',
    chips:    ['<header>', '<main>', '<section>', '<footer>', '<h1>', 'Semantic HTML'],
  },
  {
    id:       'css',
    icon:     '🎨',
    name:     'CSS',
    sublabel: '+ Styling',
    color:    '#264de4',
    url:      'vansh.dev/style.css',
    label:    'CSS3 — Design',
    desc:     'CSS transforms the bare structure into a visual experience. Colours, fonts, layout and animations all appear — live.',
    chips:    ['Colors & fonts', 'Flexbox layout', 'Border radius', 'Box shadow', 'Transitions'],
  },
  {
    id:       'js',
    icon:     '⚡',
    name:     'JavaScript',
    sublabel: '+ Interactivity',
    color:    '#f7df1e',
    url:      'vansh.dev/app.js',
    label:    'JavaScript — Interactivity',
    desc:     'JavaScript brings the page to life. Try the theme toggle in the top-right of the browser — it actually works now.',
    chips:    ['Event listeners', 'DOM manipulation', 'Dark mode toggle', 'Local storage'],
  },
];

let currentStage = 0;

/* ── Build the skills section HTML ──────────────────────────── */
function buildSkillsLab() {
  const section = document.getElementById('skills');
  if (!section) return;

  section.innerHTML = `
    <div class="container">
      <p class="section-label reveal">Skills</p>
      <h2 class="section-heading reveal">Watch a website <em>get built</em>.</h2>

      <!-- Stage progress nav -->
      <nav class="stage-nav" aria-label="Build stages">
        ${WEB_STAGES.map((s, i) => `
          <button class="stage-btn ${i === 0 ? 'active' : ''}"
                  data-stage="${i}"
                  style="--skill-color:${s.color}"
                  aria-label="Switch to ${s.name} stage">
            <div class="stage-circle">${s.icon}</div>
            <span class="stage-label">${s.name}</span>
            <span class="stage-sublabel">${s.sublabel}</span>
          </button>
          ${i < WEB_STAGES.length - 1 ?
            `<div class="stage-connector" id="connector-${i}">
               <div class="stage-connector-fill"></div>
             </div>` : ''}
        `).join('')}
      </nav>
    </div>

    <!-- Browser window -->
    <div class="container">
      <div class="builder-browser reveal" id="builder-browser">
        <div class="builder-bar">
          <span class="bb-dot red"></span>
          <span class="bb-dot yellow"></span>
          <span class="bb-dot green"></span>
          <div class="bb-url" id="bb-url">${WEB_STAGES[0].url}</div>
        </div>

        <!-- The mini website lives here -->
        <div class="ms-wrap">
          <div class="mini-site" id="mini-site">

            <header class="ms-header">
              <div class="ms-nav">
                <a class="ms-logo">Vansh.</a>
                <ul class="ms-nav-links">
                  <li><a href="#">About</a></li>
                  <li><a href="#">Work</a></li>
                  <li><a href="#">Contact</a></li>
                </ul>
                <button class="ms-theme-btn" id="ms-theme-btn" aria-label="Toggle dark mode">☾</button>
              </div>
            </header>

            <main class="ms-main">
              <section class="ms-hero">
                <div class="ms-hero-text">
                  <h1 class="ms-heading">Hi, I'm <em>Vansh</em>.</h1>
                  <p class="ms-tagline">Full-Stack Web Developer</p>
                  <a href="#" class="ms-cta">Get in touch →</a>
                </div>
                <div class="ms-avatar" aria-hidden="true"></div>
              </section>

              <section class="ms-skills-section">
                <h2>Tech Stack</h2>
                <div class="ms-tags">
                  <span>HTML5</span>
                  <span>CSS3</span>
                  <span>JavaScript</span>
                  <span>React</span>
                  <span>Node.js</span>
                  <span>MongoDB</span>
                </div>
              </section>
            </main>

            <footer class="ms-footer">
              <p>Made with ❤️ by Vansh Programmer · 2025</p>
            </footer>

            <div class="ms-js-live" aria-hidden="true">⚡ JavaScript active — try the toggle!</div>
          </div>
        </div>
      </div>

      <!-- Bottom info strip -->
      <div class="stage-info-strip">
        ${WEB_STAGES.map((s, i) => `
          <div class="stage-info-item ${i === 0 ? 'active' : ''}" id="info-${i}">
            <div class="sii-label" style="color:${s.color}">${s.icon} ${s.label}</div>
            <p class="sii-desc">${s.desc}</p>
            <div class="sii-chips">
              ${s.chips.map(c => `<span class="sii-chip">${c}</span>`).join('')}
            </div>
          </div>
        `).join('')}
      </div>
    </div>
  `;
}

/* ── Apply a stage ───────────────────────────────────────────── */
function applyStage(index) {
  const miniSite  = document.getElementById('mini-site');
  const urlEl     = document.getElementById('bb-url');
  const themebtn  = document.getElementById('ms-theme-btn');
  if (!miniSite) return;

  const stage = WEB_STAGES[index];
  currentStage = index;

  // Update mini-site class
  miniSite.classList.remove('stage-html', 'stage-css', 'stage-js', 'ms-dark');
  if (index >= 1) miniSite.classList.add('stage-css');
  if (index >= 2) miniSite.classList.add('stage-js');

  // URL bar
  if (urlEl) urlEl.textContent = stage.url;

  // Stage nav buttons
  document.querySelectorAll('.stage-btn').forEach((btn, i) => {
    btn.classList.toggle('active', i === index);
    btn.classList.toggle('done',   i < index);
  });

  // Connectors
  document.querySelectorAll('.stage-connector').forEach((c, i) => {
    c.classList.toggle('filled', i < index);
  });

  // Info strip
  document.querySelectorAll('.stage-info-item').forEach((el, i) => {
    el.classList.toggle('active', i === index);
  });

  // Wire theme toggle only in JS stage
  if (index === 2 && themebtn) {
    themebtn.onclick = () => {
      const isDark = miniSite.classList.toggle('ms-dark');
      themebtn.textContent = isDark ? '☀' : '☾';
    };
  } else if (themebtn) {
    themebtn.onclick = null;
  }
}

/* ── Init ─────────────────────────────────────────────────────── */
function initSkillsLab() {
  buildSkillsLab();

  // Wait one tick so DOM is ready
  requestAnimationFrame(() => {
    // Stage button clicks
    document.querySelectorAll('.stage-btn').forEach((btn, i) => {
      btn.addEventListener('click', () => applyStage(i));
    });

    // Keyboard: ← → to switch while browser is in view
    document.addEventListener('keydown', e => {
      const browser = document.getElementById('builder-browser');
      if (!browser) return;
      const rect = browser.getBoundingClientRect();
      if (rect.top > window.innerHeight || rect.bottom < 0) return;
      if (document.activeElement.tagName === 'INPUT' || document.activeElement.tagName === 'TEXTAREA') return;

      if (e.key === 'ArrowRight') {
        e.preventDefault();
        applyStage(Math.min(currentStage + 1, WEB_STAGES.length - 1));
      }
      if (e.key === 'ArrowLeft') {
        e.preventDefault();
        applyStage(Math.max(currentStage - 1, 0));
      }
    });

    // Auto-start HTML stage (no class needed — default look is HTML)
    applyStage(0);
  });
}
