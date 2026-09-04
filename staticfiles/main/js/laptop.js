/**
 * laptop.js — Interactive 3D Laptop Showcase
 *
 * Handles WASD keyboard inputs to scroll the virtual laptop screen
 * vertically (W/S) and switch projects horizontally (A/D).
 * Automatically generates a full laptop keyboard in HTML and highlights WASD.
 */

const KEYBOARD_LAYOUT = [
  ['esc', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '=', 'del'],
  ['tab', 'Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P', '[', ']', '\\'],
  ['caps', 'A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', ';', "\'", 'enter'],
  ['shift', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', ',', '.', '/', 'shift-r'],
  ['fn', 'ctrl', 'alt', 'cmd', 'space', 'cmd', 'alt', 'arrows']
];

function generateKeyboard() {
  const container = document.getElementById('laptop-keyboard');
  if (!container) return;

  container.innerHTML = ''; // Clear just in case

  KEYBOARD_LAYOUT.forEach(row => {
    const rowEl = document.createElement('div');
    rowEl.className = 'key-row';
    
    row.forEach(key => {
      const keyEl = document.createElement('div');
      
      // Determine CSS class based on key name for special sizing
      const keyLower = key.toLowerCase();
      let className = 'key';
      if (['tab', 'caps', 'shift', 'shift-r', 'enter', 'del', 'space', 'cmd', 'arrows'].includes(keyLower)) {
        className += ` key-${keyLower}`;
      }
      keyEl.className = className;
      
      // Highlight WASD explicitly
      if (['w', 'a', 's', 'd'].includes(keyLower)) {
        keyEl.classList.add('highlight');
        keyEl.id = `key-${keyLower}`;
      }

      // Format display text (remove -r from shift-r, etc.)
      let displayText = key;
      if (keyLower === 'shift-r') displayText = 'shift';
      if (keyLower === 'arrows') displayText = '◀ ▼ ▶';
      if (keyLower === 'space') displayText = ''; // Spacebar is empty

      keyEl.textContent = displayText;
      rowEl.appendChild(keyEl);
    });

    container.appendChild(rowEl);
  });
}

function initLaptop() {
  generateKeyboard();

  const track = document.getElementById('laptop-track');
  if (!track) return;

  const slides = document.querySelectorAll('.laptop-slide');
  const projectCount = slides.length;
  let currentProject = 0;

  const keys = { w: false, a: false, s: false, d: false };
  let scrollVelocity = 0;
  let isTransitioning = false;

  window.addEventListener('keydown', e => {
    if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;

    const k = e.key.toLowerCase();
    if (['w', 'a', 's', 'd'].includes(k)) {
      if (!keys[k]) {
        keys[k] = true;
        document.getElementById(`key-${k}`)?.classList.add('pressed');
        
        if (k === 'w' || k === 's') e.preventDefault();
        if (k === 'a' || k === 'd') handleHorizontal(k);
      }
    }
  });

  window.addEventListener('keyup', e => {
    const k = e.key.toLowerCase();
    if (['w', 'a', 's', 'd'].includes(k)) {
      keys[k] = false;
      document.getElementById(`key-${k}`)?.classList.remove('pressed');
    }
  });

  function handleHorizontal(key) {
    if (isTransitioning) return;
    if (key === 'a' && currentProject > 0) currentProject--;
    else if (key === 'd' && currentProject < projectCount - 1) currentProject++;
    else return;

    isTransitioning = true;
    track.style.transform = `translateX(-${currentProject * 100}%)`;
    
    setTimeout(() => { isTransitioning = false; }, 600);
  }

  function scrollLoop() {
    if (keys.w) scrollVelocity = -14;
    else if (keys.s) scrollVelocity = 14;
    else scrollVelocity = 0;

    if (scrollVelocity !== 0) {
      const activeSlide = slides[currentProject];
      if (activeSlide) activeSlide.scrollTop += scrollVelocity;
    }
    requestAnimationFrame(scrollLoop);
  }
  
  requestAnimationFrame(scrollLoop);
}
