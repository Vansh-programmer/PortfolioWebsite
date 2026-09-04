/**
 * terminal.js — Linux Desktop Window Manager & Terminal Engine
 */

document.addEventListener("DOMContentLoaded", () => {
  /* ── 1. Window Manager Logic ────────────────────────────────────────── */
  let highestZ = 9001;

  const windows = document.querySelectorAll('.gui-window');
  
  function bringToFront(winEl) {
    if (winEl.style.zIndex != highestZ) {
      highestZ++;
      winEl.style.zIndex = highestZ;
    }
    
    // Manage active window styling and topbar title
    document.querySelectorAll('.gui-window').forEach(w => w.classList.remove('active-win'));
    winEl.classList.add('active-win');
    
    const titleEl = document.getElementById('topbar-title');
    const winTitle = winEl.querySelector('.win-title');
    if (titleEl && winTitle) {
      titleEl.textContent = winTitle.textContent;
    }
  }

  function openWindow(appId) {
    const win = document.getElementById(appId);
    if (!win) return;
    
    if (win.style.display !== 'flex') {
      win.style.display = 'flex';
      // GSAP Spring Animation for opening window
      if (window.gsap) {
        gsap.set(win, { scale: 0.7, opacity: 0, clearProps: "xPercent,yPercent,x,y" });
        gsap.to(win, { scale: 1, opacity: 1, duration: 0.5, ease: "back.out(1.2)" });
      }
    }
    
    bringToFront(win);
    
    // Update dock
    const dockIcon = document.querySelector(`.dock-icon[data-app="${appId}"]`);
    if (dockIcon) dockIcon.classList.add('active');

    // Focus if terminal
    if (appId === 'app-terminal') {
      const input = document.getElementById('term-input');
      if (input) input.focus();
    }
  }

  function closeWindow(appId) {
    const win = document.getElementById(appId);
    if (win) {
      if (win.classList.contains('active-win')) {
        const titleEl = document.getElementById('topbar-title');
        if (titleEl) titleEl.textContent = 'Desktop';
      }
      
      // GSAP Animation for closing window
      if (window.gsap) {
        gsap.to(win, { 
          scale: 0.8, opacity: 0, duration: 0.2, ease: "power2.in",
          onComplete: () => { 
            win.style.display = 'none'; 
            gsap.set(win, { scale: 1, opacity: 1 }); // reset
          } 
        });
      } else {
        win.style.display = 'none';
      }
    }
    const dockIcon = document.querySelector(`.dock-icon[data-app="${appId}"]`);
    if (dockIcon) dockIcon.classList.remove('active');
  }

  // Bind Window Draggability
  windows.forEach(win => {
    win.addEventListener('mousedown', () => bringToFront(win));

    const header = win.querySelector('.window-header');
    if (!header) return;

    let isDragging = false;
    let offsetX, offsetY;

    header.addEventListener('mousedown', (e) => {
      // Don't drag if clicking buttons
      if (e.target.classList.contains('win-btn')) return;
      
      isDragging = true;
      const rect = win.getBoundingClientRect();
      offsetX = e.clientX - rect.left;
      offsetY = e.clientY - rect.top;
      
      // If it was centered via flexbox, reset margin to allow top/left positioning
      win.style.margin = '0';
    });

    document.addEventListener('mousemove', (e) => {
      if (!isDragging) return;
      let x = e.clientX - offsetX;
      let y = e.clientY - offsetY;
      win.style.left = `${x}px`;
      win.style.top = `${y}px`;
      win.style.position = 'fixed';
    });

    document.addEventListener('mouseup', () => {
      isDragging = false;
    });

    // Window Buttons
    win.querySelector('.close')?.addEventListener('click', () => {
      closeWindow(win.id);
    });
    win.querySelector('.minimize')?.addEventListener('click', () => {
      closeWindow(win.id);
    });
  });

  // Bind Dock Icons
  document.querySelectorAll('.dock-icon').forEach(icon => {
    icon.addEventListener('click', () => {
      const appId = icon.getAttribute('data-app');
      const win = document.getElementById(appId);
      if (win && win.style.display === 'flex') {
        closeWindow(appId);
      } else {
        openWindow(appId);
      }
    });
  });


  function exitLinux() {
    const desktop = document.getElementById('linux-desktop');
    if (desktop) desktop.style.display = 'none';
    document.querySelector('[data-theme="light"]')?.click();
  }

  // Bind Shutdown
  const shutdownBtn = document.getElementById('linux-shutdown');
  if (shutdownBtn) {
    shutdownBtn.addEventListener('click', () => {
      exitLinux();
    });
  }

  // Bind File Explorer clicks
  document.querySelectorAll('.file-item').forEach(item => {
    item.addEventListener('click', () => {
      const file = item.getAttribute('data-open');
      openViewer(file);
    });
  });

  function openViewer(filename) {
    if (filename === 'how_it_was_made.html') {
      openWindow('app-browser');
      return;
    }
    const viewer = document.getElementById('app-viewer');
    const title = document.getElementById('viewer-title');
    const iframe = document.getElementById('viewer-frame');
    if (!viewer || !title || !iframe) return;

    let url = '';
    if (filename === 'resume.pdf') url = '/static/main/assets/Vansh_Poonia_Resume.pdf';
    else if (filename.includes('.jpg')) url = '/static/main/assets/certs/' + filename;
    else url = filename;

    title.textContent = `Viewing: ${filename}`;
    iframe.src = url;
    openWindow('app-viewer');
  }

  /* ── 2. Boot Sequence Animation ──────────────────────────────────────── */
  const BOOT_LOGS = [
    "[  0.000000] Linux version 6.5.0-vansh (gcc (Ubuntu 11.4.0) 11.4.0) #1 SMP PREEMPT_DYNAMIC",
    "[  0.031201] x86/cpu: VMX disabled by BIOS",
    "[  1.023412] nvme nvme0: pci function 0000:01:00.0",
    "[  1.521301] EXT4-fs (nvme0n1p2): mounted filesystem with ordered data mode.",
    "[  2.124501] systemd[1]: Starting Network Manager...",
    "[  2.245100] systemd[1]: Started User Login Management.",
    "Welcome to VanshOS Desktop Environment",
    "Starting GUI Window Manager..."
  ];

  window.bootLinux = function() {
    const bootScreen = document.getElementById('boot-screen');
    const desktop = document.getElementById('linux-desktop');
    const logContainer = document.getElementById('boot-log');
    
    if (!bootScreen || !desktop) return;

    bootScreen.style.display = 'block';
    desktop.style.display = 'none';
    logContainer.innerHTML = '';

    // Close all windows on boot
    document.querySelectorAll('.gui-window').forEach(w => w.style.display = 'none');
    document.querySelectorAll('.dock-icon').forEach(d => d.classList.remove('active'));

    let delay = 0;
    BOOT_LOGS.forEach((log, index) => {
      setTimeout(() => {
        logContainer.innerHTML += log + '<br>';
        bootScreen.scrollTop = bootScreen.scrollHeight;
        
        if (index === BOOT_LOGS.length - 1) {
          setTimeout(() => {
            bootScreen.style.display = 'none';
            desktop.style.display = 'flex';
          }, 600);
        }
      }, delay);
      delay += Math.random() * 100 + 20; 
    });
  };

  /* ── 3. Terminal Engine ──────────────────────────────────────────────── */
  const FILE_SYSTEM = {
    "~": {
      "about.txt": "I'm Vansh. I learn by building things.\nNow, I build web apps with Django and Flask, create Linux TUIs, and write scripts to automate my daily tasks.",
      "how_it_was_made.html": "[HTML File] (Type `open how_it_was_made.html` to view)",
      "contact.txt": "Name: Vansh Poonia\nEmail: vanshpooniag@gmail.com\nGitHub: Vansh-programmer\nLinkedIn: vanshpoonia",
      "resume.pdf": "[PDF File] (Type `open resume.pdf` to view)",
      "certificates": {
        "cert1_python-1.jpg": "[Image File]",
        "cert2_genai-1.jpg": "[Image File]",
        "cert3_swe-1.jpg": "[Image File]",
        "cert4_frontend-1.jpg": "[Image File]",
        "cert5_backend-1.jpg": "[Image File]",
        "cert6_duke_js-1.jpg": "[Image File]",
        "cert7_london_ds-1.jpg": "[Image File]",
        "cert8_colorado_crypto-1.jpg": "[Image File]"
      },
      "skills": {
        "languages.txt": "Python, JavaScript, Kotlin, SQL, HTML, CSS",
        "tools.txt": "Git, Linux, Bash, Neovim, Docker"
      },
      "projects": {
        "play_projects.sh": "[EXECUTABLE] Opens Video Player"
      }
    }
  };

  let currentPath = ["~"];
  let history = [];
  let historyIndex = -1;

  const outputEl = document.getElementById('term-output');
  const inputEl = document.getElementById('term-input');
  const promptEl = document.getElementById('term-prompt');

  function getPrompt() {
    return `vansh@portfolio:${currentPath[currentPath.length-1]}$ `;
  }

  function updatePrompt() {
    if (promptEl) promptEl.textContent = getPrompt();
  }

  function printOut(text, isHtml = false) {
    if (isHtml) {
      outputEl.innerHTML += text + '<br>';
    } else {
      outputEl.textContent += text + '\n';
    }
    const b = document.getElementById('terminal-body');
    if (b) b.scrollTop = b.scrollHeight;
  }

  function getDir(pathArray) {
    let curr = FILE_SYSTEM;
    for (let p of pathArray) {
      curr = curr[p];
      if (!curr) return null;
    }
    return curr;
  }

  async function executeCommand(cmdStr) {
    const args = cmdStr.trim().split(' ').filter(x => x);
    if (args.length === 0) return;
    const cmd = args[0];

    printOut(`<span style="color:#87d700">${getPrompt()}</span> ` + cmdStr, true);

    switch(cmd) {
      case 'whoami':
        printOut("I'm Vansh. I learn by building things.\nI got into coding because I wanted to understand how video games work.\nNow, I build web apps with Django and Flask, create Linux TUIs, and write scripts to automate my daily tasks.");
        break;
      case 'contact':
        printOut("Name: Vansh Poonia\nEmail: vanshpooniag@gmail.com\nGitHub: Vansh-programmer\nLinkedIn: vanshpoonia");
        break;
      case 'pwd':
        printOut(currentPath.join('/'));
        break;
      case 'clear':
        outputEl.innerHTML = '';
        break;
      case 'exit':
        closeWindow('app-terminal');
        break;
      case 'shutdown':
      case 'logout':
        exitLinux();
        break;
      case 'ls': {
        const dir = getDir(currentPath);
        if (typeof dir === 'object') {
          const keys = Object.keys(dir);
          let out = keys.map(k => typeof dir[k] === 'object' ? `<span style="color:#3b8eea">${k}/</span>` : (k.endsWith('.sh') ? `<span style="color:#27c93f">${k}</span>` : k)).join('  ');
          printOut(out, true);
        }
        break;
      }
      case 'cd': {
        const target = args[1];
        if (!target || target === '~') {
          currentPath = ['~'];
        } else if (target === '..') {
          if (currentPath.length > 1) currentPath.pop();
        } else {
          const dir = getDir(currentPath);
          if (dir[target] && typeof dir[target] === 'object') {
            currentPath.push(target);
          } else if (dir[target]) {
            printOut(`bash: cd: ${target}: Not a directory`);
          } else {
            printOut(`bash: cd: ${target}: No such file or directory`);
          }
        }
        break;
      }
      case 'cat': {
        const target = args[1];
        if (!target) { printOut("cat: missing operand"); break; }
        const dir = getDir(currentPath);
        if (dir[target] && typeof dir[target] === 'string') {
          printOut(dir[target]);
        } else if (dir[target] && typeof dir[target] === 'object') {
          printOut(`cat: ${target}: Is a directory`);
        } else {
          printOut(`cat: ${target}: No such file or directory`);
        }
        break;
      }
      case 'open': {
        const target = args[1];
        if (!target) { printOut("open: missing file"); break; }
        const dir = getDir(currentPath);
        if (dir[target]) {
          printOut("Opening GUI application...", false);
          openViewer(target);
        } else {
          printOut(`open: ${target}: No such file`);
        }
        break;
      }

      case './play_projects.sh': {
        const dir = getDir(currentPath);
        if (dir['play_projects.sh']) {
          printOut("Starting Media Player...", false);
          openWindow('app-video');
        } else {
          printOut(`bash: ./play_projects.sh: No such file or directory`);
        }
        break;
      }
      default:
        // Try Django Backend API for unknown commands (like ai, whois, sudo hire)
        const loadingId = 'loading-' + Date.now();
        printOut(`<span id="${loadingId}" style="color: #f1fa8c;">[Django Backend] Processing...</span>`, true);
        
        try {
          const response = await fetch('/api/terminal/', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ command: cmdStr })
          });
          const data = await response.json();
          document.getElementById(loadingId).remove();
          
          if (data.status === 'success') {
            printOut(data.output);
          } else {
            printOut(`bash: ${cmd}: command not found`);
          }
        } catch (e) {
          document.getElementById(loadingId).remove();
          printOut(`bash: ${cmd}: command not found`);
        }
    }
  }

  const termBody = document.getElementById('terminal-body');
  if (termBody) {
    termBody.addEventListener('click', () => {
      if (inputEl) inputEl.focus();
    });
  }

  if (inputEl) {
    inputEl.addEventListener('keydown', (e) => {
      e.stopPropagation(); 
      if (e.key === 'Enter') {
        const val = inputEl.value;
        if (val.trim()) {
          history.push(val);
          historyIndex = history.length;
        }
        inputEl.value = '';
        executeCommand(val);
        updatePrompt();
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        if (historyIndex > 0) {
          historyIndex--;
          inputEl.value = history[historyIndex];
        }
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        if (historyIndex < history.length - 1) {
          historyIndex++;
          inputEl.value = history[historyIndex];
        } else {
          historyIndex = history.length;
          inputEl.value = '';
        }
      }
    });
  }

  updatePrompt();


  // Topbar Workspace visual click
  document.querySelectorAll('.ws').forEach(ws => {
    ws.addEventListener('click', () => {
      document.querySelectorAll('.ws').forEach(w => w.classList.remove('active'));
      ws.classList.add('active');
    });
  });


  // Desktop background click (deselect)
  const desktopBg = document.getElementById('linux-desktop');
  if (desktopBg) {
    desktopBg.addEventListener('mousedown', (e) => {
      if (e.target === desktopBg) {
        document.querySelectorAll('.gui-window').forEach(w => w.classList.remove('active-win'));
        const titleEl = document.getElementById('topbar-title');
        if (titleEl) titleEl.textContent = 'Desktop';
      }
    });
  }

  // 4. Live Clock & Top Bar Updates
  function updateClock() {
    const now = new Date();
    
    // Top Bar Format: 10:30 AM - Jan 1
    const topbarClock = document.getElementById('topbar-clock');
    if (topbarClock) {
      topbarClock.textContent = now.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}) + " - " + now.toLocaleDateString([], {month: 'short', day: 'numeric'});
    }

    // Conky Format
    const conkyTime = document.getElementById('conky-time');
    const conkyDate = document.getElementById('conky-date');
    if (conkyTime && conkyDate) {
      conkyTime.textContent = now.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit', hour12: false});
      conkyDate.textContent = now.toLocaleDateString([], {weekday: 'long', day: 'numeric', month: 'long'});
    }
  }
  setInterval(updateClock, 1000);
  updateClock();

});
