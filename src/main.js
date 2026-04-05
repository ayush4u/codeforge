import * as THREE from 'three';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from '@studio-freight/lenis';

import backgroundVert from './shaders/background.vert';
import backgroundFrag from './shaders/background.frag';
import particlesVert from './shaders/particles.vert';
import particlesFrag from './shaders/particles.frag';
import crystalVert from './shaders/crystal.vert';
import crystalFrag from './shaders/crystal.frag';

gsap.registerPlugin(ScrollTrigger);

/* ═══════════════════════════════════
   FLASHCARD DATA — verified facts
   ═══════════════════════════════════ */
const flashcardData = [
  // Set 1 — Claude Code Basics
  { cat: 'Claude Code', q: 'How do you install Claude Code on Windows?', a: 'Run in PowerShell: irm https://claude.ai/install.ps1 | iex — requires Git for Windows.' },
  { cat: 'Claude Code', q: 'What command starts a Claude Code session?', a: 'Just type "claude" in your terminal while inside a project directory.' },
  { cat: 'Claude Code', q: 'What does /init do in Claude Code?', a: 'Analyzes your codebase and generates a starting CLAUDE.md with build commands, conventions, and project structure.' },
  { cat: 'Claude Code', q: 'What subscription do you need for Claude Code?', a: 'Pro, Max, Team, Enterprise, or Console account. The free Claude.ai plan does not include Claude Code.' },
  { cat: 'Claude Code', q: 'How do you verify your Claude Code installation?', a: 'Run "claude --version" for version info, or "claude doctor" for a detailed health check.' },
  { cat: 'Claude Code', q: 'What does /compact do?', a: 'Compresses the context window by summarizing the conversation, freeing space for more work. CLAUDE.md survives compaction.' },

  // Set 2 — CLAUDE.md & Memory
  { cat: 'CLAUDE.md', q: 'Where does a project-level CLAUDE.md go?', a: 'In the project root as ./CLAUDE.md or inside ./.claude/CLAUDE.md — shared via version control.' },
  { cat: 'CLAUDE.md', q: 'How do you import files into CLAUDE.md?', a: 'Use @path/to/file syntax. Example: @docs/architecture.md — relative to the CLAUDE.md location.' },
  { cat: 'CLAUDE.md', q: 'What is the recommended max size for CLAUDE.md?', a: 'Under 200 lines. Longer files consume more context and reduce how consistently Claude follows them.' },
  { cat: 'CLAUDE.md', q: 'How do path-scoped rules work?', a: 'Add YAML frontmatter with paths: ["src/api/**/*.ts"] — the rule only loads when Claude works with matching files.' },
  { cat: 'Memory', q: 'What is Claude Code auto memory?', a: 'Claude automatically saves notes about your project — build commands, preferences, debugging insights — at ~/.claude/projects/<project>/memory/' },
  { cat: 'Memory', q: 'How do you manage auto memory?', a: 'Use the /memory command to browse, toggle, and open memory files. Everything is plain markdown you can edit.' },

  // Set 3 — Hooks
  { cat: 'Hooks', q: 'What are Claude Code hooks?', a: 'User-defined shell commands, HTTP endpoints, or LLM prompts that execute automatically at specific lifecycle points.' },
  { cat: 'Hooks', q: 'What are the 4 hook types?', a: 'command (shell), http (POST endpoint), prompt (single LLM call), and agent (multi-turn subagent with tool access).' },
  { cat: 'Hooks', q: 'Which hook event blocks tool calls?', a: 'PreToolUse — fires before a tool executes. Can return permissionDecision: "deny" to block, "allow" to approve, or "ask" to prompt user.' },
  { cat: 'Hooks', q: 'What does exit code 2 mean in a hook?', a: 'Blocking error. stderr is fed back to Claude. The tool call is prevented (for PreToolUse), or the prompt is rejected (for UserPromptSubmit).' },
  { cat: 'Hooks', q: 'Where are hooks configured?', a: 'In JSON settings files: ~/.claude/settings.json (user), .claude/settings.json (project), .claude/settings.local.json (local/gitignored).' },
  { cat: 'Hooks', q: 'How do you run a hook asynchronously?', a: 'Add "async": true to a command hook. It runs in the background while Claude continues. Only type:"command" supports async.' },

  // Set 4 — CLI Flags
  { cat: 'CLI', q: 'What does claude -p do?', a: 'Print mode — processes the query via SDK then exits. Pipe-friendly for scripting: cat file | claude -p "explain"' },
  { cat: 'CLI', q: 'How do you append to the system prompt?', a: 'Use --append-system-prompt "text" or --append-system-prompt-file ./rules.txt. Preserves built-in capabilities.' },
  { cat: 'CLI', q: 'What does --bare do?', a: 'Minimal mode: skips auto-discovery of hooks, skills, plugins, MCP servers, auto memory, and CLAUDE.md for faster scripted calls.' },
  { cat: 'CLI', q: 'How do you limit API spending?', a: 'Use --max-budget-usd 5.00 in print mode. Claude stops when the dollar limit is reached.' },
  { cat: 'CLI', q: 'What is --worktree for?', a: 'Starts Claude in an isolated git worktree at .claude/worktrees/<name>. Great for parallel workstreams without branch conflicts.' },
  { cat: 'CLI', q: 'How do you connect to MCP servers?', a: 'Use --mcp-config ./mcp.json to load MCP server configurations, or "claude mcp" to configure interactively.' },

  // Set 5 — Ollama, Gemma 4, Copilot
  { cat: 'Ollama', q: 'How do you run Gemma 4 locally?', a: 'Install Ollama, then: ollama pull gemma4 followed by ollama run gemma4' },
  { cat: 'Gemma 4', q: 'What model size is best for daily coding on a laptop?', a: 'E4B (9.6 GB, 128K context) — the sweet spot between capability and resource usage.' },
  { cat: 'Gemma 4', q: 'How do you enable thinking mode in Gemma 4?', a: 'Include the <|think|> token at the start of the system prompt. Remove it to disable thinking.' },
  { cat: 'Gemma 4', q: 'What is the 26B model architecture?', a: 'Mixture-of-Experts: 25.2B total params, but only 3.8B active. 8 active / 128 total experts plus 1 shared.' },
  { cat: 'Copilot', q: 'What are Copilot chat participants?', a: 'Domain-specific experts invoked with @: @workspace (project), @vscode (editor), @terminal (shell), @github (issues/PRs), @azure.' },
  { cat: 'Copilot', q: 'What are Copilot # variables?', a: 'Context references: #file (specific file), #selection (selected text), #codebase (full project), #function (current fn), #class, #sym.' },

  // Set 6 — Copilot Commands & Workflow
  { cat: 'Copilot', q: 'What is GitHub Copilot best at?', a: 'Real-time inline autocomplete (ghost text) as you type. Also Copilot Chat for Q&A in VS Code.' },
  { cat: 'Copilot', q: 'Name 5 Copilot slash commands', a: '/explain (explain code), /fix (propose fix), /tests (generate tests), /new (scaffold project), /fixTestFailure (fix failing test).' },
  { cat: 'Copilot', q: 'What are Copilot agent modes?', a: 'Agent (autonomous multi-file edits with tools), Plan (research without changes), Ask (Q&A only, no modifications).' },
  { cat: 'Workflow', q: 'When should you use Claude Code vs Copilot?', a: 'Copilot for inline autocomplete and quick suggestions. Claude Code for complex multi-file refactors and running commands.' },
  { cat: 'Copilot', q: 'How do you customize Copilot for a project?', a: 'Create .github/copilot-instructions.md for project-wide instructions, .prompt.md files for reusable templates, .agent.md for custom agents.' },
  { cat: 'Copilot', q: 'What is Ctrl+Alt+I in VS Code?', a: 'Opens the Copilot Chat view — the main multi-turn conversation interface for asking questions and generating code.' },
];

const CARDS_PER_PAGE = 6;
const totalPages = Math.ceil(flashcardData.length / CARDS_PER_PAGE);
let currentPage = 0;

/* ═══════════════════════════════════
   SMOOTH SCROLL
   ═══════════════════════════════════ */
const lenis = new Lenis({
  duration: 1.2,
  easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  smoothWheel: true,
});

function raf(time) {
  lenis.raf(time);
  requestAnimationFrame(raf);
}
requestAnimationFrame(raf);

// Sync GSAP ScrollTrigger with Lenis
lenis.on('scroll', ScrollTrigger.update);
gsap.ticker.add((time) => lenis.raf(time * 1000));
gsap.ticker.lagSmoothing(0);

/* ═══════════════════════════════════
   MOUSE TRACKING
   ═══════════════════════════════════ */
const mouse = { x: 0.5, y: 0.5, tx: 0.5, ty: 0.5 };

window.addEventListener('mousemove', (e) => {
  mouse.tx = e.clientX / window.innerWidth;
  mouse.ty = 1.0 - e.clientY / window.innerHeight;
});

/* ═══════════════════════════════════
   THREE.JS SCENE
   ═══════════════════════════════════ */
const canvas = document.getElementById('webgl');
const renderer = new THREE.WebGLRenderer({
  canvas,
  antialias: true,
  alpha: true,
  powerPreference: 'high-performance',
});
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.outputColorSpace = THREE.SRGBColorSpace;

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 100);
camera.position.z = 5;

const clock = new THREE.Clock();

/* ---- Background Shader Mesh ---- */
const bgMaterial = new THREE.ShaderMaterial({
  vertexShader: backgroundVert,
  fragmentShader: backgroundFrag,
  uniforms: {
    uTime: { value: 0 },
    uResolution: { value: new THREE.Vector2(window.innerWidth, window.innerHeight) },
    uMouse: { value: new THREE.Vector2(0.5, 0.5) },
  },
  depthWrite: false,
  depthTest: false,
});

const bgMesh = new THREE.Mesh(new THREE.PlaneGeometry(2, 2), bgMaterial);
bgMesh.frustumCulled = false;

const bgScene = new THREE.Scene();
const bgCamera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
bgScene.add(bgMesh);

/* ---- Floating Crystal ---- */
const crystalMaterial = new THREE.ShaderMaterial({
  vertexShader: crystalVert,
  fragmentShader: crystalFrag,
  uniforms: {
    uTime: { value: 0 },
    uMouse: { value: new THREE.Vector2(0, 0) },
  },
  transparent: true,
  side: THREE.DoubleSide,
  depthWrite: false,
});

const crystalGeo = new THREE.IcosahedronGeometry(1.0, 4);
const crystal = new THREE.Mesh(crystalGeo, crystalMaterial);
crystal.position.set(2.5, 0.5, -1);
scene.add(crystal);

// Second smaller crystal
const crystal2Geo = new THREE.OctahedronGeometry(0.5, 3);
const crystal2Mat = crystalMaterial.clone();
const crystal2 = new THREE.Mesh(crystal2Geo, crystal2Mat);
crystal2.position.set(-2.8, -0.8, -0.5);
scene.add(crystal2);

// Third crystal
const crystal3Geo = new THREE.TetrahedronGeometry(0.35, 2);
const crystal3Mat = crystalMaterial.clone();
const crystal3 = new THREE.Mesh(crystal3Geo, crystal3Mat);
crystal3.position.set(-1.5, 1.5, -2);
scene.add(crystal3);

/* ---- Floating Particles ---- */
const PARTICLE_COUNT = 150;
const particleGeo = new THREE.BufferGeometry();
const positions = new Float32Array(PARTICLE_COUNT * 3);
const scales = new Float32Array(PARTICLE_COUNT);
const speeds = new Float32Array(PARTICLE_COUNT);
const offsets = new Float32Array(PARTICLE_COUNT);

for (let i = 0; i < PARTICLE_COUNT; i++) {
  positions[i * 3]     = (Math.random() - 0.5) * 12;
  positions[i * 3 + 1] = (Math.random() - 0.5) * 8;
  positions[i * 3 + 2] = (Math.random() - 0.5) * 6 - 2;
  scales[i] = Math.random();
  speeds[i] = 0.3 + Math.random() * 1.2;
  offsets[i] = Math.random() * Math.PI * 2;
}

particleGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
particleGeo.setAttribute('aScale', new THREE.BufferAttribute(scales, 1));
particleGeo.setAttribute('aSpeed', new THREE.BufferAttribute(speeds, 1));
particleGeo.setAttribute('aOffset', new THREE.BufferAttribute(offsets, 1));

const particleMaterial = new THREE.ShaderMaterial({
  vertexShader: particlesVert,
  fragmentShader: particlesFrag,
  uniforms: {
    uTime: { value: 0 },
    uPixelRatio: { value: Math.min(window.devicePixelRatio, 2) },
    uSize: { value: 30 },
  },
  transparent: true,
  depthWrite: false,
  blending: THREE.NormalBlending,
});

const particles = new THREE.Points(particleGeo, particleMaterial);
scene.add(particles);

/* ═══════════════════════════════════
   ANIMATION LOOP
   ═══════════════════════════════════ */
function animate() {
  requestAnimationFrame(animate);
  const elapsed = clock.getElapsedTime();

  // Smooth mouse
  mouse.x += (mouse.tx - mouse.x) * 0.05;
  mouse.y += (mouse.ty - mouse.y) * 0.05;

  // Update BG
  bgMaterial.uniforms.uTime.value = elapsed;
  bgMaterial.uniforms.uMouse.value.set(mouse.x, mouse.y);

  // Update crystals
  crystalMaterial.uniforms.uTime.value = elapsed;
  crystalMaterial.uniforms.uMouse.value.set(mouse.x - 0.5, mouse.y - 0.5);

  crystal.rotation.x = elapsed * 0.15 + Math.sin(elapsed * 0.3) * 0.1;
  crystal.rotation.y = elapsed * 0.2;
  crystal.position.y = 0.5 + Math.sin(elapsed * 0.4) * 0.3;

  crystal2.rotation.x = elapsed * 0.2;
  crystal2.rotation.z = elapsed * 0.15;
  crystal2.position.y = -0.8 + Math.sin(elapsed * 0.35 + 1) * 0.25;

  crystal3.rotation.y = elapsed * 0.25;
  crystal3.rotation.x = elapsed * 0.18;
  crystal3.position.y = 1.5 + Math.sin(elapsed * 0.45 + 2) * 0.2;

  // Particles
  particleMaterial.uniforms.uTime.value = elapsed;

  // Camera subtle sway
  camera.position.x = (mouse.x - 0.5) * 0.5;
  camera.position.y = (mouse.y - 0.5) * 0.3;
  camera.lookAt(0, 0, 0);

  // Render BG first, then scene on top
  renderer.autoClear = false;
  renderer.clear();
  renderer.render(bgScene, bgCamera);
  renderer.render(scene, camera);
}

animate();

/* ═══════════════════════════════════
   SCROLL-TRIGGERED PARALLAX
   ═══════════════════════════════════ */
gsap.to(crystal.position, {
  y: -3,
  x: 1,
  scrollTrigger: {
    trigger: '#roadmap',
    start: 'top bottom',
    end: 'bottom top',
    scrub: 1,
  },
});

gsap.to(crystal2.position, {
  y: 2,
  x: -1,
  scrollTrigger: {
    trigger: '#claude-code',
    start: 'top bottom',
    end: 'bottom top',
    scrub: 1.5,
  },
});

gsap.to(crystal.rotation, {
  z: Math.PI,
  scrollTrigger: {
    trigger: '#ollama',
    start: 'top bottom',
    end: 'bottom top',
    scrub: 2,
  },
});

/* ═══════════════════════════════════
   SCROLL ANIMATIONS (data-animate)
   ═══════════════════════════════════ */
function initScrollAnimations() {
  const elements = document.querySelectorAll('[data-animate]');

  elements.forEach((el) => {
    const delay = parseFloat(el.dataset.delay) || 0;

    ScrollTrigger.create({
      trigger: el,
      start: 'top 88%',
      once: true,
      onEnter: () => {
        gsap.to(el, {
          opacity: 1,
          y: 0,
          duration: 0.9,
          delay,
          ease: 'power3.out',
          onStart: () => el.classList.add('visible'),
        });
      },
    });
  });
}

/* ═══════════════════════════════════
   NAV SCROLL STATE
   ═══════════════════════════════════ */
const nav = document.getElementById('nav');
ScrollTrigger.create({
  start: 80,
  onUpdate: (self) => {
    nav.classList.toggle('scrolled', self.progress > 0 || window.scrollY > 80);
  },
});

/* Smooth scroll for nav links */
document.querySelectorAll('a[href^="#"]').forEach((link) => {
  link.addEventListener('click', (e) => {
    const target = document.querySelector(link.getAttribute('href'));
    if (target) {
      e.preventDefault();
      lenis.scrollTo(target, { offset: -80 });
    }
  });
});

/* ═══════════════════════════════════
   INSTALL TABS
   ═══════════════════════════════════ */
document.querySelectorAll('.tab-btn').forEach((btn) => {
  btn.addEventListener('click', () => {
    const parent = btn.closest('.content-card');
    parent.querySelectorAll('.tab-btn').forEach((b) => b.classList.remove('active'));
    parent.querySelectorAll('.tab-content').forEach((c) => c.classList.remove('active'));
    btn.classList.add('active');
    parent.querySelector(`#tab-${btn.dataset.tab}`).classList.add('active');
  });
});

/* ═══════════════════════════════════
   FLASHCARDS
   ═══════════════════════════════════ */
const flashcardGrid = document.getElementById('flashcard-grid');
const fcPageEl = document.getElementById('fc-page');

function renderFlashcards() {
  const start = currentPage * CARDS_PER_PAGE;
  const cards = flashcardData.slice(start, start + CARDS_PER_PAGE);

  // Fade out
  gsap.to(flashcardGrid, {
    opacity: 0,
    duration: 0.2,
    onComplete: () => {
      flashcardGrid.innerHTML = cards.map(
        (c) => `
        <div class="flashcard" data-animate="fade-up">
          <div class="flashcard-inner">
            <div class="flashcard-front">
              <span class="flashcard-category">${c.cat}</span>
              <p class="flashcard-question">${c.q}</p>
              <span class="flashcard-hint">Click to reveal</span>
            </div>
            <div class="flashcard-back">
              <span class="flashcard-category">${c.cat}</span>
              <p class="flashcard-answer">${c.a}</p>
              <span class="flashcard-hint">Click to hide</span>
            </div>
          </div>
        </div>
      `
      ).join('');

      // Bind flip
      flashcardGrid.querySelectorAll('.flashcard').forEach((card) => {
        card.addEventListener('click', () => card.classList.toggle('flipped'));
      });

      // Fade in with stagger
      gsap.fromTo(
        flashcardGrid.children,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.5, stagger: 0.06, ease: 'power2.out' }
      );
      gsap.to(flashcardGrid, { opacity: 1, duration: 0.3 });

      fcPageEl.textContent = `Set ${currentPage + 1} / ${totalPages}`;
    },
  });
}

document.getElementById('fc-prev').addEventListener('click', () => {
  currentPage = (currentPage - 1 + totalPages) % totalPages;
  renderFlashcards();
});

document.getElementById('fc-next').addEventListener('click', () => {
  currentPage = (currentPage + 1) % totalPages;
  renderFlashcards();
});

/* ═══════════════════════════════════
   LOADING SCREEN
   ═══════════════════════════════════ */
const loader = document.getElementById('loader');
const loaderFill = document.querySelector('.loader-fill');

let progress = 0;
const loadInterval = setInterval(() => {
  progress += Math.random() * 15 + 5;
  if (progress >= 100) {
    progress = 100;
    clearInterval(loadInterval);
    setTimeout(() => {
      loader.classList.add('hidden');
      // Trigger hero entrance
      initHeroAnimation();
      initScrollAnimations();
      renderFlashcards();
    }, 300);
  }
  loaderFill.style.width = progress + '%';
}, 120);

/* ═══════════════════════════════════
   HERO ENTRANCE ANIMATION
   ═══════════════════════════════════ */
function initHeroAnimation() {
  const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

  tl.fromTo('.hero-overline',
    { opacity: 0, y: 30 },
    { opacity: 1, y: 0, duration: 0.8 }
  )
  .fromTo('.hero-title',
    { opacity: 0, y: 50 },
    { opacity: 1, y: 0, duration: 1 },
    '-=0.5'
  )
  .fromTo('.hero-subtitle',
    { opacity: 0, y: 30 },
    { opacity: 1, y: 0, duration: 0.8 },
    '-=0.6'
  )
  .fromTo('.hero-cta',
    { opacity: 0, y: 20 },
    { opacity: 1, y: 0, duration: 0.7 },
    '-=0.4'
  )
  .fromTo('.scroll-hint',
    { opacity: 0 },
    { opacity: 1, duration: 0.6 },
    '-=0.2'
  );

  // Crystal entrance
  gsap.fromTo(crystal.scale,
    { x: 0, y: 0, z: 0 },
    { x: 1, y: 1, z: 1, duration: 1.4, ease: 'elastic.out(1, 0.4)', delay: 0.3 }
  );
  gsap.fromTo(crystal2.scale,
    { x: 0, y: 0, z: 0 },
    { x: 1, y: 1, z: 1, duration: 1.2, ease: 'elastic.out(1, 0.5)', delay: 0.5 }
  );
  gsap.fromTo(crystal3.scale,
    { x: 0, y: 0, z: 0 },
    { x: 1, y: 1, z: 1, duration: 1.0, ease: 'elastic.out(1, 0.5)', delay: 0.7 }
  );
}

/* ═══════════════════════════════════
   RESIZE HANDLER
   ═══════════════════════════════════ */
window.addEventListener('resize', () => {
  const w = window.innerWidth;
  const h = window.innerHeight;
  camera.aspect = w / h;
  camera.updateProjectionMatrix();
  renderer.setSize(w, h);
  bgMaterial.uniforms.uResolution.value.set(w, h);
  particleMaterial.uniforms.uPixelRatio.value = Math.min(window.devicePixelRatio, 2);
});
