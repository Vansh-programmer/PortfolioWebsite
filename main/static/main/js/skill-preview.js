/**
 * skill-preview.js — Skill Click Preview Modal
 *
 * When a .pill is clicked, opens a modal showing a visual
 * "mini website" built with that technology.
 * Annotations (floating labels) point to specific UI regions.
 */

/* ─────────────────────────────────────────────────────────────
   SKILL DATA — one entry per skill
   color    : accent color (HEX)
   icon     : emoji
   tagline  : one-line description
   url      : shown in the browser address bar
   features : bullet badges shown below the preview
   html()   : returns HTML string for the browser-content area
───────────────────────────────────────────────────────────── */
const SKILL_DATA = {

  /* ── HTML5 ─────────────────────────────────────────────── */
  'html5': {
    name: 'HTML5', color: '#e44d26', icon: '🌐',
    tagline: 'Semantic skeleton of every webpage',
    url: 'localhost/index.html',
    features: ['Semantic tags', 'SEO friendly', 'Accessibility', 'Form validation', 'Media elements'],
    html: () => `
      <div style="display:flex;flex-direction:column;gap:6px;padding:18px;background:#fafafa;height:100%;box-sizing:border-box;">
        <!-- Header -->
        <div style="background:#e44d26;color:#fff;border-radius:8px;padding:10px 16px;font-weight:700;font-size:0.8rem;position:relative;">
          &lt;header&gt; — Site header / logo / nav
          <span class="anno" style="top:-30px;left:10px;">Semantic landmark 🏷️</span>
        </div>
        <!-- Nav -->
        <div style="background:#f06529;color:#fff;border-radius:8px;padding:8px 16px;font-size:0.75rem;display:flex;gap:12px;align-items:center;">
          <span style="opacity:0.7;">&lt;nav&gt;</span>
          <span>Home</span><span>About</span><span>Work</span><span>Contact</span>
        </div>
        <!-- Main + Aside -->
        <div style="display:flex;gap:6px;flex:1;">
          <div style="background:#fff3e0;border:2px dashed #e44d26;border-radius:8px;padding:12px;flex:2;position:relative;">
            <span style="color:#e44d26;font-weight:700;font-size:0.75rem;">&lt;main&gt;</span>
            <div style="margin-top:8px;">
              <div style="background:#ffe0cc;border-radius:6px;padding:6px 10px;font-size:0.72rem;margin-bottom:6px;">&lt;article&gt; — Blog post</div>
              <div style="background:#ffe0cc;border-radius:6px;padding:6px 10px;font-size:0.72rem;">&lt;section&gt; — Skills</div>
            </div>
            <span class="anno anno-down" style="bottom:-28px;left:10px;">Block-level content</span>
          </div>
          <div style="background:#fff8f0;border:2px dashed #aaa;border-radius:8px;padding:12px;flex:1;position:relative;">
            <span style="color:#888;font-weight:700;font-size:0.72rem;">&lt;aside&gt;</span>
            <div style="margin-top:8px;font-size:0.65rem;color:#aaa;">Related links<br/>Widget area</div>
          </div>
        </div>
        <!-- Footer -->
        <div style="background:#333;color:#aaa;border-radius:8px;padding:8px 16px;font-size:0.72rem;position:relative;">
          &lt;footer&gt; — Copyright, socials, sitemap
          <span class="anno" style="top:-30px;right:10px;left:auto;">Landmark tag 🏷️</span>
        </div>
      </div>`
  },

  /* ── CSS3 ──────────────────────────────────────────────── */
  'css3': {
    name: 'CSS3', color: '#264de4', icon: '🎨',
    tagline: 'Style, layout, animation — all in one language',
    url: 'localhost/styles.css',
    features: ['Flexbox & Grid', 'Animations', 'Custom Properties', 'Media Queries', 'Pseudo-elements'],
    html: () => `
      <div style="background:linear-gradient(135deg,#e8eeff,#f5f0ff);padding:24px;height:100%;box-sizing:border-box;display:flex;align-items:center;justify-content:center;">
        <div style="display:flex;gap:16px;align-items:flex-start;max-width:600px;width:100%;">
          <!-- Card -->
          <div style="background:#fff;border-radius:16px;box-shadow:0 12px 40px rgba(38,77,228,0.18);padding:20px;flex:1;position:relative;overflow:visible;">
            <span class="anno" style="top:-30px;left:10px;">box-shadow property ✨</span>
            <!-- Flex row inside card -->
            <div style="display:flex;gap:10px;align-items:center;margin-bottom:12px;position:relative;">
              <div style="width:42px;height:42px;border-radius:50%;background:linear-gradient(135deg,#264de4,#7c5cff);flex-shrink:0;"></div>
              <div>
                <div style="font-weight:700;font-size:0.85rem;color:#222;">Vansh Programmer</div>
                <div style="font-size:0.72rem;color:#888;">Full-Stack Dev</div>
              </div>
              <span class="anno" style="top:-28px;left:0px;">display: flex + gap</span>
            </div>
            <div style="height:8px;background:#eee;border-radius:4px;margin-bottom:6px;overflow:hidden;">
              <div style="width:78%;height:100%;background:linear-gradient(90deg,#264de4,#7c5cff);border-radius:4px;"></div>
            </div>
            <div style="font-size:0.7rem;color:#264de4;font-weight:600;margin-bottom:12px;">var(--color-accent)</div>
            <div style="display:flex;gap:8px;flex-wrap:wrap;">
              <span style="background:#e8eeff;color:#264de4;border-radius:999px;padding:3px 10px;font-size:0.7rem;font-weight:600;">border-radius</span>
              <span style="background:#f0ebff;color:#7c5cff;border-radius:999px;padding:3px 10px;font-size:0.7rem;font-weight:600;">:hover</span>
              <span style="background:#e8eeff;color:#264de4;border-radius:999px;padding:3px 10px;font-size:0.7rem;font-weight:600;">@media</span>
            </div>
            <span class="anno anno-down" style="bottom:-28px;left:60px;">Custom property values</span>
          </div>
          <!-- Animation box -->
          <div style="display:flex;flex-direction:column;gap:10px;">
            <div style="background:#264de4;color:#fff;border-radius:12px;padding:10px 14px;font-size:0.7rem;font-weight:700;text-align:center;animation:none;position:relative;">
              @keyframes
              <span class="anno" style="top:-28px;left:0px;">CSS Animation</span>
            </div>
            <div style="background:#fff;border:2px dashed #264de4;border-radius:12px;padding:10px;font-size:0.65rem;color:#264de4;text-align:center;">
              Grid layout<br/>
              <span style="font-family:monospace;font-size:0.6rem;">grid-template-columns</span>
            </div>
          </div>
        </div>
      </div>`
  },

  /* ── JavaScript ────────────────────────────────────────── */
  'javascript (es6+)': {
    name: 'JavaScript (ES6+)', color: '#f7df1e', icon: '⚡',
    tagline: 'The programming language of the web',
    url: 'localhost/app.js',
    features: ['ES6+ Syntax', 'Arrow Functions', 'Promises & Async/Await', 'DOM API', 'Destructuring'],
    html: () => `
      <div style="display:flex;height:100%;background:#1e1e2e;">
        <!-- Code panel -->
        <div style="flex:1;padding:16px;font-family:monospace;font-size:0.72rem;color:#cdd6f4;line-height:1.7;border-right:1px solid #313244;overflow:auto;position:relative;">
          <span class="anno" style="top:2px;right:8px;background:#f7df1e;color:#333;">ES6+ Syntax</span>
          <div><span style="color:#89b4fa;">const</span> <span style="color:#cba6f7;">fetchUser</span> = <span style="color:#89b4fa;">async</span> <span style="color:#a6e3a1;">(id)</span> <span style="color:#89dceb;">=></span> {</div>
          <div style="padding-left:16px;"><span style="color:#89b4fa;">const</span> res = <span style="color:#89b4fa;">await</span> <span style="color:#cba6f7;">fetch</span>(<span style="color:#a6e3a1;">\`/api/user/\${id}\`</span>);</div>
          <div style="padding-left:16px;"><span style="color:#89b4fa;">const</span> { <span style="color:#cdd6f4;">name</span>, <span style="color:#cdd6f4;">email</span> } = <span style="color:#89b4fa;">await</span> res.<span style="color:#cba6f7;">json</span>();</div>
          <div style="padding-left:16px;"><span style="color:#89b4fa;">return</span> { name, email };</div>
          <div>};</div>
          <div style="margin-top:10px;color:#585b70;">// DOM manipulation</div>
          <div><span style="color:#89b4fa;">const</span> btn = <span style="color:#cba6f7;">document</span>.<span style="color:#cba6f7;">querySelector</span>(<span style="color:#a6e3a1;">'#btn'</span>);</div>
          <div>btn.<span style="color:#cba6f7;">addEventListener</span>(<span style="color:#a6e3a1;">'click'</span>, <span style="color:#89dceb;">()</span> <span style="color:#89dceb;">=></span> {</div>
          <div style="padding-left:16px;"><span style="color:#cba6f7;">console</span>.<span style="color:#cba6f7;">log</span>(<span style="color:#a6e3a1;">'Hello!'</span>);</div>
          <div>});</div>
          <span class="anno anno-down" style="bottom:8px;left:8px;background:#a6e3a1;color:#1e1e2e;">Async / Await</span>
        </div>
        <!-- Output panel -->
        <div style="width:38%;padding:16px;display:flex;flex-direction:column;gap:10px;">
          <div style="font-size:0.7rem;color:#89b4fa;font-weight:700;text-transform:uppercase;letter-spacing:1px;">Console Output</div>
          <div style="background:#181825;border-radius:8px;padding:10px;font-family:monospace;font-size:0.7rem;color:#a6e3a1;flex:1;">
            <div>▶ Server running</div>
            <div>▶ User fetched: Vansh</div>
            <div style="color:#f38ba8;">✕ 404 Not found</div>
            <div style="color:#89b4fa;">ℹ Hello!</div>
          </div>
          <div style="background:#f7df1e;color:#333;border-radius:8px;padding:8px 12px;font-size:0.7rem;font-weight:700;text-align:center;cursor:pointer;" id="js-demo-btn">Click me! →</div>
          <span class="anno anno-down" style="bottom:-26px;left:8px;background:#f7df1e;color:#333;">Event listener</span>
        </div>
      </div>`
  },

  /* ── React ──────────────────────────────────────────────── */
  'react': {
    name: 'React', color: '#61dafb', icon: '⚛️',
    tagline: 'Build reusable UI components',
    url: 'localhost:5173 (Vite)',
    features: ['Component-Based', 'Virtual DOM', 'Hooks (useState/useEffect)', 'JSX', 'Props & State'],
    html: () => `
      <div style="display:flex;height:100%;background:#f0faff;">
        <!-- Component tree -->
        <div style="width:40%;padding:16px;border-right:1px solid #bee3f8;overflow:auto;position:relative;">
          <div style="font-size:0.7rem;font-weight:700;color:#0ea5e9;text-transform:uppercase;letter-spacing:1px;margin-bottom:12px;">Component Tree</div>
          <span class="anno" style="top:2px;right:8px;background:#61dafb;color:#222;">Virtual DOM</span>
          <!-- Tree -->
          <div style="font-family:monospace;font-size:0.72rem;line-height:2;">
            <div style="background:#e0f7fe;border-left:3px solid #61dafb;padding:4px 8px;border-radius:0 6px 6px 0;margin-bottom:3px;color:#0ea5e9;font-weight:700;">&lt;App /&gt;</div>
            <div style="padding-left:16px;">
              <div style="background:#fff;border-left:3px solid #0ea5e9;padding:3px 8px;border-radius:0 6px 6px 0;margin-bottom:3px;color:#333;">&lt;Navbar /&gt;</div>
              <div style="background:#fff;border-left:3px solid #7c5cff;padding:3px 8px;border-radius:0 6px 6px 0;margin-bottom:3px;color:#333;">&lt;Hero /&gt;</div>
              <div style="background:#fff;border-left:3px solid #12b28c;padding:3px 8px;border-radius:0 6px 6px 0;margin-bottom:3px;color:#333;">&lt;Projects /&gt;
                <div style="padding-left:14px;">
                  <div style="background:#f0faf5;border-left:2px solid #12b28c;padding:2px 6px;margin:2px 0;border-radius:0 4px 4px 0;color:#12b28c;font-size:0.65rem;">&lt;Card key=0 /&gt;</div>
                  <div style="background:#f0faf5;border-left:2px solid #12b28c;padding:2px 6px;margin:2px 0;border-radius:0 4px 4px 0;color:#12b28c;font-size:0.65rem;">&lt;Card key=1 /&gt;</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- JSX & State -->
        <div style="flex:1;padding:16px;font-family:monospace;font-size:0.72rem;color:#1e293b;line-height:1.65;background:#f8fbff;overflow:auto;position:relative;">
          <div style="color:#888;margin-bottom:4px;">// useState Hook</div>
          <div><span style="color:#7c5cff;">const</span> [<span style="color:#0ea5e9;">count</span>, <span style="color:#0ea5e9;">setCount</span>] = <span style="color:#61dafb;">useState</span>(0);</div>
          <div style="margin-top:10px;color:#888;">// JSX return</div>
          <div><span style="color:#7c5cff;">return</span> (</div>
          <div style="padding-left:14px;color:#e44d26;">&lt;div <span style="color:#0ea5e9;">className</span>=<span style="color:#a6e3a1;">"card"</span>&gt;</div>
          <div style="padding-left:28px;color:#555;">&lt;h1&gt;Count: <span style="color:#0ea5e9;">{count}</span>&lt;/h1&gt;</div>
          <div style="padding-left:28px;color:#e44d26;">&lt;button <span style="color:#0ea5e9;">onClick</span>=<span style="color:#a6e3a1;">{()=> setCount(c=>c+1)}</span>&gt;</div>
          <div style="padding-left:42px;color:#555;">Click me</div>
          <div style="padding-left:28px;color:#e44d26;">&lt;/button&gt;</div>
          <div style="padding-left:14px;color:#e44d26;">&lt;/div&gt;</div>
          <div>);</div>
          <span class="anno anno-down" style="bottom:8px;left:8px;background:#61dafb;color:#222;">Re-renders only changed parts</span>
        </div>
      </div>`
  },

  /* ── Node.js ────────────────────────────────────────────── */
  'node.js': {
    name: 'Node.js', color: '#68a063', icon: '🟢',
    tagline: 'JavaScript runtime on the server',
    url: 'localhost:3000 (Node server)',
    features: ['Non-blocking I/O', 'Event-driven', 'npm ecosystem', 'Fast performance', 'JSON native'],
    html: () => `
      <div style="background:#1a1a2e;height:100%;display:flex;flex-direction:column;padding:16px;gap:12px;box-sizing:border-box;font-family:monospace;">
        <!-- Request / Response flow -->
        <div style="display:flex;align-items:center;gap:8px;flex-wrap:wrap;position:relative;">
          <span class="anno" style="top:-28px;left:0;background:#68a063;color:#fff;">Request cycle</span>
          <div style="background:#0f4c75;color:#bee3f8;border-radius:8px;padding:8px 12px;font-size:0.72rem;">🌐 Browser<br/><span style="opacity:0.7;">GET /api/posts</span></div>
          <div style="color:#68a063;font-size:1.2rem;">→</div>
          <div style="background:#1b262c;border:1px solid #68a063;color:#68a063;border-radius:8px;padding:8px 12px;font-size:0.72rem;">⚙️ Node.js<br/><span style="opacity:0.7;">Event Loop</span></div>
          <div style="color:#68a063;font-size:1.2rem;">→</div>
          <div style="background:#0d2137;color:#68d391;border-radius:8px;padding:8px 12px;font-size:0.72rem;">🗄️ MongoDB<br/><span style="opacity:0.7;">db.find({})</span></div>
          <div style="color:#68a063;font-size:1.2rem;">→</div>
          <div style="background:#152020;color:#68d391;border-radius:8px;padding:8px 12px;font-size:0.72rem;">📤 JSON<br/><span style="opacity:0.7;">res.json(data)</span></div>
        </div>
        <!-- Server code -->
        <div style="background:#0f0f1a;border-radius:10px;padding:14px;flex:1;overflow:auto;font-size:0.72rem;line-height:1.7;color:#cdd6f4;position:relative;">
          <span class="anno" style="top:4px;right:8px;background:#68a063;color:#fff;">server.js</span>
          <div><span style="color:#89b4fa;">const</span> http = <span style="color:#cba6f7;">require</span>(<span style="color:#a6e3a1;">'http'</span>);</div>
          <div><span style="color:#89b4fa;">const</span> server = http.<span style="color:#cba6f7;">createServer</span>((req, res) => {</div>
          <div style="padding-left:16px;"><span style="color:#585b70;">// Non-blocking: handles thousands of requests</span></div>
          <div style="padding-left:16px;">res.<span style="color:#cba6f7;">writeHead</span>(200, { <span style="color:#a6e3a1;">'Content-Type'</span>: <span style="color:#a6e3a1;">'application/json'</span> });</div>
          <div style="padding-left:16px;">res.<span style="color:#cba6f7;">end</span>(<span style="color:#cba6f7;">JSON.stringify</span>({ status: <span style="color:#a6e3a1;">'ok'</span> }));</div>
          <div>});</div>
          <div>server.<span style="color:#cba6f7;">listen</span>(3000, () => <span style="color:#cba6f7;">console</span>.<span style="color:#cba6f7;">log</span>(<span style="color:#a6e3a1;">'Running on :3000'</span>));</div>
          <span class="anno anno-down" style="bottom:6px;left:8px;background:#68a063;color:#fff;">Single-threaded + Event Loop</span>
        </div>
      </div>`
  },

  /* ── Express ────────────────────────────────────────────── */
  'express': {
    name: 'Express', color: '#999', icon: '🚂',
    tagline: 'Fast, minimal web framework for Node.js',
    url: 'localhost:3000/api',
    features: ['REST routing', 'Middleware chain', 'req/res objects', 'Error handling', 'Static files'],
    html: () => `
      <div style="background:#1a1a1a;height:100%;display:flex;gap:0;box-sizing:border-box;font-family:monospace;font-size:0.72rem;">
        <!-- Routes -->
        <div style="width:35%;background:#111;border-right:1px solid #333;padding:14px;display:flex;flex-direction:column;gap:8px;overflow:auto;position:relative;">
          <span class="anno" style="top:2px;right:4px;background:#ccc;color:#111;">Routes</span>
          <div style="font-size:0.65rem;color:#666;text-transform:uppercase;letter-spacing:1px;margin-bottom:4px;">Endpoints</div>
          ${[['GET','/api/posts','#68a063'],['POST','/api/posts','#f7df1e'],['PUT','/api/posts/:id','#61dafb'],['DELETE','/api/posts/:id','#f38ba8']].map(([m,u,c])=>`<div style="display:flex;align-items:center;gap:6px;background:#1e1e1e;border-radius:6px;padding:6px 8px;"><span style="background:${c};color:#111;border-radius:4px;padding:1px 6px;font-size:0.62rem;font-weight:700;">${m}</span><span style="color:#aaa;">${u}</span></div>`).join('')}
        </div>
        <!-- Middleware diagram -->
        <div style="flex:1;padding:14px;display:flex;flex-direction:column;justify-content:center;gap:8px;position:relative;">
          <span class="anno" style="top:4px;right:4px;background:#fff;color:#333;">Middleware chain</span>
          <div style="font-size:0.65rem;color:#666;text-transform:uppercase;letter-spacing:1px;">Request pipeline</div>
          ${[['cors()','CORS headers'],['express.json()','Parse body'],['authCheck','Verify JWT'],['rateLimiter','Throttle'],['routeHandler','Your logic']].map(([m,d],i)=>`
            <div style="display:flex;align-items:center;gap:8px;">
              <div style="background:#252525;border:1px solid #444;border-radius:8px;padding:6px 10px;flex:1;display:flex;justify-content:space-between;align-items:center;">
                <span style="color:#fff;">${m}</span><span style="color:#555;font-size:0.65rem;">${d}</span>
              </div>${i<4?`<span style="color:#888;">↓</span>`:''}
            </div>`).join('')}
          <span class="anno anno-down" style="bottom:6px;left:8px;background:#999;color:#fff;">next() calls next fn</span>
        </div>
      </div>`
  },

  /* ── MongoDB ────────────────────────────────────────────── */
  'mongodb': {
    name: 'MongoDB', color: '#13aa52', icon: '🍃',
    tagline: 'Flexible document-based database',
    url: 'mongodb://localhost:27017',
    features: ['Document store', 'Flexible schema', 'JSON/BSON', 'Horizontal scaling', 'Aggregation pipeline'],
    html: () => `
      <div style="background:#0d1117;height:100%;display:flex;gap:12px;padding:16px;box-sizing:border-box;font-family:monospace;font-size:0.72rem;overflow:auto;position:relative;">
        <span class="anno" style="top:4px;right:4px;background:#13aa52;color:#fff;">No rigid schema!</span>
        <!-- Collection -->
        <div style="flex:1;">
          <div style="color:#13aa52;font-weight:700;margin-bottom:8px;">db.users</div>
          ${[
            {name:'Vansh',role:'Developer',skills:['React','Node'],active:true},
            {name:'Priya',role:'Designer',skills:['Figma'],active:false}
          ].map((doc,i)=>`
          <div style="background:#161b22;border:1px solid ${i===0?'#13aa52':'#30363d'};border-radius:8px;padding:10px;margin-bottom:8px;position:relative;">
            ${i===0?`<span class="anno" style="top:-24px;right:4px;background:#13aa52;color:#fff;">Document</span>`:''}
            <div style="color:#f0f6fc;">{</div>
            <div style="padding-left:14px;">
              <div><span style="color:#79c0ff;">"_id"</span>: <span style="color:#a5d6ff;">ObjectId("...")</span>,</div>
              <div><span style="color:#79c0ff;">"name"</span>: <span style="color:#a8ff78;">"${doc.name}"</span>,</div>
              <div><span style="color:#79c0ff;">"role"</span>: <span style="color:#a8ff78;">"${doc.role}"</span>,</div>
              <div><span style="color:#79c0ff;">"skills"</span>: [${doc.skills.map(s=>`<span style="color:#a8ff78;">"${s}"</span>`).join(', ')}],</div>
              <div><span style="color:#79c0ff;">"active"</span>: <span style="color:#ff7b72;">${doc.active}</span></div>
            </div>
            <div style="color:#f0f6fc;">}</div>
          </div>`).join('')}
        </div>
        <!-- Query panel -->
        <div style="width:42%;display:flex;flex-direction:column;gap:8px;">
          <div style="color:#e3b341;font-weight:700;">Query</div>
          <div style="background:#161b22;border-radius:8px;padding:10px;color:#cdd6f4;line-height:1.7;">
            <div style="color:#888;">// Find active devs</div>
            <div>db.users.<span style="color:#13aa52;">find</span>({</div>
            <div style="padding-left:14px;"><span style="color:#79c0ff;">active</span>: <span style="color:#ff7b72;">true</span></div>
            <div>}).<span style="color:#13aa52;">sort</span>({ name: 1 })</div>
          </div>
          <div style="color:#e3b341;font-weight:700;margin-top:4px;">Result</div>
          <div style="background:#0a1628;border:1px solid #13aa52;border-radius:8px;padding:10px;color:#a8ff78;flex:1;">
            [<br/>
            &nbsp;&nbsp;{ "name": "Vansh" }<br/>
            ]
          </div>
          <span class="anno anno-down" style="bottom:0;left:0;background:#13aa52;color:#fff;">Returns matching docs</span>
        </div>
      </div>`
  },

  /* ── Bootstrap 5 ────────────────────────────────────────── */
  'bootstrap 5': {
    name: 'Bootstrap 5', color: '#7952b3', icon: '🅱️',
    tagline: 'The world\'s most popular CSS framework',
    url: 'localhost/bootstrap-demo.html',
    features: ['12-col Grid', 'Utility classes', 'Components', 'Responsive', 'Dark mode support'],
    html: () => `
      <div style="background:#f8f9fa;height:100%;padding:16px;box-sizing:border-box;overflow:auto;font-family:system-ui,sans-serif;position:relative;">
        <span class="anno" style="top:4px;right:4px;background:#7952b3;color:#fff;">Utility-first classes</span>
        <!-- Grid -->
        <div style="font-size:0.7rem;color:#7952b3;font-weight:700;margin-bottom:6px;">12-Column Grid System</div>
        <div style="display:flex;gap:4px;margin-bottom:12px;">
          ${[4,4,4].map((c,i)=>`<div style="flex:${c};background:#e8d5ff;border:1px dashed #7952b3;border-radius:6px;padding:6px;text-align:center;font-size:0.65rem;color:#7952b3;">.col-${c}</div>`).join('')}
        </div>
        <div style="display:flex;gap:4px;margin-bottom:16px;">
          ${[6,3,3].map(c=>`<div style="flex:${c};background:#d8bfff;border:1px dashed #7952b3;border-radius:6px;padding:6px;text-align:center;font-size:0.65rem;color:#6c3daa;">.col-${c}</div>`).join('')}
        </div>
        <!-- Utility classes showcase -->
        <div style="font-size:0.7rem;color:#7952b3;font-weight:700;margin-bottom:8px;">Utility Classes</div>
        <div style="display:flex;flex-wrap:wrap;gap:6px;margin-bottom:12px;">
          ${['d-flex','gap-3','p-3','m-2','text-center','rounded','shadow-sm','fw-bold','text-primary','bg-light'].map(cls=>`<code style="background:#fff;border:1px solid #dee2e6;border-radius:4px;padding:2px 6px;font-size:0.65rem;color:#7952b3;">.${cls}</code>`).join('')}
        </div>
        <!-- Button examples -->
        <div style="display:flex;gap:8px;flex-wrap:wrap;">
          <button style="background:#7952b3;color:#fff;border:none;border-radius:6px;padding:7px 14px;font-size:0.75rem;cursor:pointer;">.btn-primary</button>
          <button style="background:#6c757d;color:#fff;border:none;border-radius:6px;padding:7px 14px;font-size:0.75rem;cursor:pointer;">.btn-secondary</button>
          <button style="background:transparent;color:#7952b3;border:1px solid #7952b3;border-radius:6px;padding:7px 14px;font-size:0.75rem;cursor:pointer;">.btn-outline</button>
        </div>
        <span class="anno anno-down" style="bottom:8px;right:8px;background:#7952b3;color:#fff;">Pre-built components!</span>
      </div>`
  },

  /* ── Auth from Scratch ──────────────────────────────────── */
  'auth from scratch': {
    name: 'Auth from Scratch', color: '#ef4444', icon: '🔐',
    tagline: 'Build authentication without third-party libraries',
    url: 'localhost:3000/login',
    features: ['Password hashing (bcrypt)', 'JWT tokens', 'Sessions & Cookies', 'Authorization middleware', 'CSRF protection'],
    html: () => `
      <div style="background:#0f1117;height:100%;display:flex;align-items:center;justify-content:center;padding:16px;box-sizing:border-box;font-family:system-ui,sans-serif;position:relative;">
        <span class="anno" style="top:8px;right:8px;background:#ef4444;color:#fff;">Security layer</span>
        <div style="display:flex;gap:16px;align-items:flex-start;width:100%;max-width:680px;">
          <!-- Login form -->
          <div style="background:#1e1e2e;border:1px solid #313244;border-radius:12px;padding:16px;flex:1;position:relative;">
            <div style="color:#fff;font-weight:700;font-size:0.85rem;margin-bottom:12px;">🔑 Login</div>
            <span class="anno" style="top:-28px;left:10px;background:#ef4444;color:#fff;">Never store plain passwords</span>
            <div style="margin-bottom:8px;">
              <div style="color:#888;font-size:0.68rem;margin-bottom:3px;">Email</div>
              <div style="background:#111;border:1px solid #444;border-radius:6px;padding:7px 10px;color:#aaa;font-size:0.75rem;">user@example.com</div>
            </div>
            <div style="margin-bottom:12px;">
              <div style="color:#888;font-size:0.68rem;margin-bottom:3px;">Password</div>
              <div style="background:#111;border:1px solid #444;border-radius:6px;padding:7px 10px;color:#aaa;font-size:0.75rem;">••••••••••</div>
            </div>
            <div style="background:#ef4444;color:#fff;border-radius:6px;padding:8px;text-align:center;font-size:0.78rem;font-weight:700;">Sign In</div>
          </div>
          <!-- Flow -->
          <div style="display:flex;flex-direction:column;gap:8px;font-family:monospace;font-size:0.7rem;color:#cdd6f4;">
            <div style="font-size:0.65rem;color:#888;text-transform:uppercase;letter-spacing:1px;">Auth flow</div>
            ${[
              ['📨','User submits form','#313244'],
              ['#️⃣','bcrypt.hash(pwd, 10)','#1a2a1a'],
              ['💾','db.users.save()','#1a2a2a'],
              ['🎫','jwt.sign({ id })','#2a1a2a'],
              ['🍪','res.cookie("token")','#2a2a1a'],
              ['✅','Protected route access','#1a2a1a'],
            ].map(([icon,txt,bg])=>`<div style="background:${bg};border-radius:6px;padding:6px 10px;display:flex;align-items:center;gap:8px;border:1px solid #333;">${icon} ${txt}</div>`).join('<div style="color:#ef4444;text-align:center;">↓</div>')}
          </div>
        </div>
      </div>`
  },

  /* ── Git & GitHub ───────────────────────────────────────── */
  'git & github': {
    name: 'Git & GitHub', color: '#f05032', icon: '🌿',
    tagline: 'Version control and collaboration',
    url: 'github.com/vansh/portfolio',
    features: ['Version history', 'Branching', 'Merging', 'Pull Requests', 'GitHub Actions'],
    html: () => `
      <div style="background:#0d1117;height:100%;padding:16px;box-sizing:border-box;font-family:monospace;font-size:0.72rem;color:#e6edf3;overflow:auto;position:relative;">
        <span class="anno" style="top:4px;right:4px;background:#f05032;color:#fff;">Distributed VCS</span>
        <!-- Commit graph -->
        <div style="margin-bottom:12px;">
          <div style="color:#8b949e;font-size:0.65rem;text-transform:uppercase;letter-spacing:1px;margin-bottom:8px;">Commit graph</div>
          ${[
            {hash:'a3f8c2e',msg:'feat: add hero section',branch:'main',color:'#f05032',x:0},
            {hash:'b7d2a1f',msg:'fix: mobile navbar issue',branch:'main',color:'#f05032',x:0},
            {hash:'c9e4b3d',msg:'feat: skill preview modal',branch:'feature/skills',color:'#7c5cff',x:1},
            {hash:'d1f6c8a',msg:'merge: feature/skills',branch:'main',color:'#f05032',x:0},
          ].map(c=>`
          <div style="display:flex;align-items:center;gap:10px;margin-bottom:6px;">
            <div style="display:flex;align-items:center;gap:0;width:30px;">
              ${c.x===1?`<div style="width:8px;"></div>`:''}
              <div style="width:12px;height:12px;border-radius:50%;background:${c.color};border:2px solid ${c.color === '#f05032' ? '#ff6b4a':'#a08fff'};flex-shrink:0;"></div>
            </div>
            <div style="background:#161b22;border-radius:6px;padding:5px 10px;flex:1;display:flex;gap:10px;align-items:center;">
              <code style="color:${c.color};font-size:0.65rem;">${c.hash}</code>
              <span style="flex:1;color:#e6edf3;">${c.msg}</span>
              <span style="background:${c.color}22;color:${c.color};border-radius:4px;padding:1px 6px;font-size:0.62rem;">${c.branch}</span>
            </div>
          </div>`).join('')}
        </div>
        <!-- Common commands -->
        <div style="color:#8b949e;font-size:0.65rem;text-transform:uppercase;letter-spacing:1px;margin-bottom:6px;">Common commands</div>
        <div style="display:flex;flex-direction:column;gap:4px;">
          ${[['git add .','Stage changes'],['git commit -m "feat"','Save snapshot'],['git push origin main','Send to GitHub'],['git checkout -b feature','New branch']].map(([cmd,desc])=>`<div style="background:#161b22;border-radius:6px;padding:5px 10px;display:flex;justify-content:space-between;"><span style="color:#79c0ff;">${cmd}</span><span style="color:#8b949e;">${desc}</span></div>`).join('')}
        </div>
        <span class="anno anno-down" style="bottom:8px;left:8px;background:#f05032;color:#fff;">Every commit = a save point</span>
      </div>`
  },

};

/* ─────────────────────────────────────────────────────────────
   NORMALIZER — maps pill text to data key
───────────────────────────────────────────────────────────── */
function resolveSkillKey(pillText) {
  const text = pillText.toLowerCase().trim();
  // direct match
  if (SKILL_DATA[text]) return text;
  // partial matches
  if (text.includes('html'))      return 'html5';
  if (text.includes('css'))       return 'css3';
  if (text.includes('javascript') || text === 'es6' || text.includes('dom') || text.includes('ajax') || text.includes('async')) return 'javascript (es6+)';
  if (text.includes('react') || text.includes('single page')) return 'react';
  if (text.includes('node'))      return 'node.js';
  if (text.includes('express'))   return 'express';
  if (text.includes('mongodb') || text.includes('mongoose') || text.includes('schema') || text.includes('nosql') || text.includes('cloud database') || text.includes('association')) return 'mongodb';
  if (text.includes('bootstrap')) return 'bootstrap 5';
  if (text.includes('auth') || text.includes('cookie') || text.includes('session')) return 'auth from scratch';
  if (text.includes('git'))       return 'git & github';
  return null;
}

/* ─────────────────────────────────────────────────────────────
   GENERIC fallback for skills without a custom preview
───────────────────────────────────────────────────────────── */
function genericPreview(name) {
  return {
    name, color: '#ff5a3c', icon: '⚙️',
    tagline: 'An important part of the modern web stack',
    url: 'developer.mozilla.org',
    features: ['Industry standard', 'Widely used', 'Career essential'],
    html: () => `
      <div style="display:flex;flex-direction:column;align-items:center;justify-content:center;height:100%;gap:16px;background:#fff;font-family:system-ui,sans-serif;padding:24px;box-sizing:border-box;">
        <div style="font-size:3.5rem;">⚙️</div>
        <div style="font-size:1.4rem;font-weight:700;color:#2a1f3d;">${name}</div>
        <div style="max-width:360px;text-align:center;color:#5b4d6e;font-size:0.9rem;line-height:1.6;">
          A key technology in modern web development. Click through the other skills to see detailed visual previews!
        </div>
        <div style="font-family:monospace;font-size:0.8rem;color:#ff5a3c;">// Coming soon: interactive demo</div>
      </div>`
  };
}

/* ─────────────────────────────────────────────────────────────
   BUILD & OPEN MODAL
───────────────────────────────────────────────────────────── */
function openSkillModal(pillText) {
  const key  = resolveSkillKey(pillText);
  const data = key ? SKILL_DATA[key] : genericPreview(pillText);

  // Populate modal fields
  document.getElementById('skill-modal-icon').textContent     = data.icon;
  document.getElementById('skill-modal-icon').style.background = data.color + '22';
  document.getElementById('skill-modal-title').textContent    = data.name;
  document.getElementById('skill-modal-tagline').textContent  = data.tagline;
  document.getElementById('skill-modal-url').textContent      = data.url;
  document.getElementById('skill-browser-content').innerHTML  = data.html();

  // Feature badges
  const featuresEl = document.getElementById('skill-features');
  featuresEl.innerHTML = data.features.map(f => `
    <span class="skill-feature-badge" style="background:${data.color}15;color:${data.color};border-color:${data.color}44;">
      ✦ ${f}
    </span>`).join('');

  // Open overlay
  const overlay = document.getElementById('skill-modal-overlay');
  overlay.removeAttribute('hidden');
  requestAnimationFrame(() => overlay.classList.add('open'));
  document.body.style.overflow = 'hidden';
}

function closeSkillModal() {
  const overlay = document.getElementById('skill-modal-overlay');
  overlay.classList.remove('open');
  document.body.style.overflow = '';
  // Wait for animation then hide
  setTimeout(() => overlay.setAttribute('hidden', ''), 320);
}

/* ─────────────────────────────────────────────────────────────
   INIT
───────────────────────────────────────────────────────────── */
function initSkillPreview() {
  // Pill click handlers
  document.querySelectorAll('.pill').forEach(pill => {
    pill.addEventListener('click', () => openSkillModal(pill.textContent));
  });

  // Close button
  document.getElementById('skill-modal-close')
    ?.addEventListener('click', closeSkillModal);

  // Click overlay backdrop to close
  document.getElementById('skill-modal-overlay')
    ?.addEventListener('click', e => {
      if (e.target === e.currentTarget) closeSkillModal();
    });

  // Escape key
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') closeSkillModal();
  });
}
