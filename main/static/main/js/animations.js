/**
 * animations.js — GSAP Frameworks
 */

document.addEventListener("DOMContentLoaded", () => {
  
  // --- Procedural UI Audio Engine ---
  const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  
  function playUIHover() {
    if (audioCtx.state === 'suspended') audioCtx.resume();
    const osc = audioCtx.createOscillator();
    const gainNode = audioCtx.createGain();
    osc.connect(gainNode);
    gainNode.connect(audioCtx.destination);
    
    osc.type = 'sine';
    osc.frequency.setValueAtTime(400, audioCtx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(200, audioCtx.currentTime + 0.05);
    
    gainNode.gain.setValueAtTime(0.015, audioCtx.currentTime); // Very soft
    gainNode.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.05);
    
    osc.start();
    osc.stop(audioCtx.currentTime + 0.05);
  }

  function playUIClick() {
    if (audioCtx.state === 'suspended') audioCtx.resume();
    const osc = audioCtx.createOscillator();
    const gainNode = audioCtx.createGain();
    osc.connect(gainNode);
    gainNode.connect(audioCtx.destination);
    
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(600, audioCtx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(100, audioCtx.currentTime + 0.1);
    
    gainNode.gain.setValueAtTime(0.05, audioCtx.currentTime); // Slightly louder
    gainNode.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.1);
    
    osc.start();
    osc.stop(audioCtx.currentTime + 0.1);
  }


  // 2. Initialize GSAP ScrollTrigger\n  gsap.registerPlugin(ScrollTrigger);\n\n  // 3. Hero Section Entrance Animation
  const subtitle = document.querySelector('.hero-eyebrow');
  if (subtitle) {
    const text = subtitle.innerText;
    subtitle.innerHTML = '';
    text.split('').forEach(char => {
      const span = document.createElement('span');
      span.innerText = char === ' ' ? '\u00A0' : char; // Preserve spaces
      span.style.display = 'inline-block';
      span.classList.add('split-char');
      subtitle.appendChild(span);
    });
    
    gsap.from(".split-char", {
      y: 20,
      opacity: 0,
      duration: 0.6,
      stagger: 0.02,
      ease: "back.out(2)",
      delay: 0.2
    });
  }

  gsap.from(".hero-heading, .hero-subtext, .hero-cta, .hero-stats", {
    y: 40,
    opacity: 0,
    duration: 1,
    stagger: 0.15,
    ease: "power3.out",
    delay: 0.2
  });

  gsap.from(".hero-photo", {
    scale: 0.8,
    opacity: 0,
    duration: 1.2,
    ease: "expo.out",
    delay: 0.4
  });

  // 4. Skills Grid Stagger Animation
  gsap.from(".pill", {
    scrollTrigger: {
      trigger: ".skills-section",
      start: "top 80%",
    },
    y: 20,
    opacity: 0,
    duration: 0.4,
    stagger: 0.03,
    ease: "back.out(1.5)"
  });

  // 5. Section Headings Reveal
  gsap.utils.toArray('.section-heading').forEach(heading => {
    gsap.from(heading, {
      scrollTrigger: {
        trigger: heading,
        start: "top 85%",
      },
      y: 30,
      opacity: 0,
      duration: 0.8,
      ease: "power2.out"
    });
  });

  // 6. Custom Magnetic Cursor
  const cursorDot = document.querySelector('.cursor-dot');
  const cursorOutline = document.querySelector('.cursor-outline');
  
  if (cursorDot && cursorOutline && window.innerWidth > 768) {
    gsap.set(cursorDot, { xPercent: -50, yPercent: -50 });
    gsap.set(cursorOutline, { xPercent: -50, yPercent: -50 });
    window.addEventListener('mousemove', (e) => {
      // Dot follows instantly
      gsap.to(cursorDot, { x: e.clientX, y: e.clientY, duration: 0, ease: "none" });
      // Outline lags slightly for smooth magnetic effect
      gsap.to(cursorOutline, { x: e.clientX, y: e.clientY, duration: 0.15, ease: "power2.out" });
    });

    // Add magnetic hover effect to all interactive elements
    const interactiveElements = document.querySelectorAll('a, button, .dock-icon, .theme-btn, .file-item');
    interactiveElements.forEach(el => {
      el.addEventListener('mousedown', () => {
        if (el.classList.contains('dock-icon') || el.classList.contains('theme-btn')) {
          playUIClick();
          gsap.to(el, { scale: 0.95, duration: 0.1 });
        }
      });
      el.addEventListener('mouseup', () => {
        if (el.classList.contains('dock-icon') || el.classList.contains('theme-btn')) {
          gsap.to(el, { scale: 1.15, duration: 0.2, ease: "back.out" });
        }
      });
      el.addEventListener('mouseenter', () => {
        document.body.classList.add('cursor-hover');
        // Magnetic pull effect on the element itself
        if (el.classList.contains('dock-icon') || el.classList.contains('theme-btn')) {
          gsap.to(el, { scale: 1.15, duration: 0.3, ease: "back.out(1.5)" });
          playUIHover(); // Play tactile sound
        }
      });
      el.addEventListener('mouseleave', () => {
        document.body.classList.remove('cursor-hover');
        // Reset element position
        if (el.classList.contains('dock-icon') || el.classList.contains('theme-btn')) {
          gsap.to(el, { scale: 1, duration: 0.3, ease: "power2.out" });
        }
      });
    });
  }
});
