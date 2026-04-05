<div align="center">

<br/>

```
 ██████╗ ██████╗ ██████╗ ███████╗███████╗ ██████╗ ██████╗  ██████╗ ███████╗
██╔════╝██╔═══██╗██╔══██╗██╔════╝██╔════╝██╔═══██╗██╔══██╗██╔════╝ ██╔════╝
██║     ██║   ██║██║  ██║█████╗  █████╗  ██║   ██║██████╔╝██║  ███╗█████╗  
██║     ██║   ██║██║  ██║██╔══╝  ██╔══╝  ██║   ██║██╔══██╗██║   ██║██╔══╝  
╚██████╗╚██████╔╝██████╔╝███████╗██║     ╚██████╔╝██║  ██║╚██████╔╝███████╗
 ╚═════╝ ╚═════╝ ╚═════╝ ╚══════╝╚═╝      ╚═════╝ ╚═╝  ╚═╝ ╚═════╝ ╚══════╝
```

### The premium interactive reference for AI-powered coding tools

[![Live Demo](https://img.shields.io/badge/🌐%20Live%20Demo-ayush4u.github.io%2Fcodeforge-C07234?style=for-the-badge)](https://ayush4u.github.io/codeforge/)
[![Deploy](https://img.shields.io/github/actions/workflow/status/ayush4u/codeforge/deploy.yml?style=for-the-badge&label=Deploy&color=2D5A7B)](https://github.com/ayush4u/codeforge/actions)
[![Three.js](https://img.shields.io/badge/Three.js-r172-black?style=for-the-badge&logo=threedotjs)](https://threejs.org)
[![Vite](https://img.shields.io/badge/Vite-6-646CFF?style=for-the-badge&logo=vite)](https://vitejs.dev)

<br/>

> *Master Claude Code, Ollama, Gemma 4, and GitHub Copilot — all in one beautifully animated reference.*

<br/>

</div>

---

## ✦ What is CodeForge?

CodeForge is a **single-page interactive learning platform** that covers every essential concept, command, flag, hook, and workflow for the modern AI coding toolkit. It's built for developers who want a fast, reliable reference — not another blog post.

- 📖 **10 deep-dive sections** with no fluff
- 🃏 **36 flashcards** across 6 topic sets to cement memory
- 📋 **6-column cheat sheet** for quick lookup
- ✨ **3D animated scene** — Three.js crystals, particles, and custom GLSL shaders
- 🎯 **Scroll-triggered animations** on every element via GSAP

---

## 📚 Content Coverage

### 🗺️ Learning Roadmap
A curated **6-phase path** from zero to agentic AI development:

```
Phase 1 → Claude Code Setup & Auth
Phase 2 → CLAUDE.md & Memory System
Phase 3 → Slash Commands & CLI Mastery
Phase 4 → Hooks & Automation
Phase 5 → Local AI with Ollama + Gemma 4
Phase 6 → GitHub Copilot Integration
```

---

### 🤖 Claude Code

Everything about Claude Code — Anthropic's terminal-native AI coding agent.

**Installation**
```powershell
# Windows
irm https://claude.ai/install.ps1 | iex

# macOS / Linux
curl -fsSL https://claude.ai/install.sh | bash
```

**Essential Commands**
| Command | What it does |
|---|---|
| `claude` | Start interactive session |
| `/init` | Generate CLAUDE.md from your codebase |
| `/compact` | Summarize context to free space |
| `/clear` | Fresh conversation, keep CLAUDE.md |
| `/memory` | Browse & manage auto-memory |
| `claude doctor` | Health check your Claude Code install |
| `claude --version` | Verify installation |

**Permission Modes** — `--allowed-tools`, `--disallowed-tools`, or interactive `y/n` prompts at runtime.

---

### 📄 CLAUDE.md — The Memory System

Claude Code reads special markdown files to maintain persistent context:

```
~/.claude/CLAUDE.md          ← Global (all projects)
./CLAUDE.md                  ← Project root (version controlled)
./.claude/CLAUDE.md          ← Project hidden dir
./.claude/settings.local.json ← Local overrides (gitignored)
```

**Import other files directly:**
```markdown
@docs/architecture.md
@.claude/rules/api-standards.md
```

**Path-scoped rules with YAML frontmatter:**
```yaml
---
paths:
  - "src/api/**/*.ts"
---
# API Rules
- Always validate inputs at the boundary
- Return standard { data, error } shape
```

> ✦ Keep CLAUDE.md under 200 lines. Longer files reduce consistency.

---

### ⚡ Slash Commands (~55 built-in)

All built-in `/commands` organized by category:

<details>
<summary><strong>Session Management</strong></summary>

| Command | Description |
|---|---|
| `/clear` | Fresh conversation |
| `/compact` | Compress context |
| `/chat new` | Named conversation |
| `/chat list` | List all chats |
| `/chat resume <id>` | Restore session |
| `/undo` | Undo last action |

</details>

<details>
<summary><strong>Config & Setup</strong></summary>

| Command | Description |
|---|---|
| `/init` | Generate CLAUDE.md |
| `/config` | Set preferences |
| `/doctor` | Health check |
| `/update` | Update Claude Code |
| `/login` | Switch accounts |
| `/logout` | Sign out |

</details>

<details>
<summary><strong>Tools & Integrations</strong></summary>

| Command | Description |
|---|---|
| `/tools` | List active tools |
| `/mcp` | MCP server status |
| `/permissions` | View tool permissions |

</details>

---

### 🏴 CLI Flags & Arguments

**Core flags**
```bash
claude -p "query"                    # Print mode — pipe-friendly, exits after response
claude --bare                        # Skip hooks, skills, MCP, auto-memory
claude --no-stream                   # Collect full response before printing
claude --output-format json          # Structured JSON output
```

**Model & Behavior**
```bash
claude --model claude-opus-4-5       # Override model
claude --effort high                 # low | medium | high reasoning depth
claude --max-turns 20                # Max agentic turns (default: 10)
```

**System Prompts**
```bash
claude --append-system-prompt "Always use TypeScript"
claude --append-system-prompt-file ./rules.txt
claude --system-prompt-file ./persona.md  # Full replacement
```

**Output & Budget**
```bash
claude --max-budget-usd 5.00         # Stop when spend limit hit
claude --verbose                     # Extra debug output
claude --no-color                    # Plain text (for logs)
```

**Advanced**
```bash
claude --worktree feature-auth       # Isolated git worktree
claude --mcp-config ./mcp.json       # Load MCP servers
claude --allowed-tools "Bash,Read"   # Whitelist tools
claude --disallowed-tools "Write"    # Blacklist tools
```

---

### 🪝 Hooks — Lifecycle Automation

Hooks are shell commands, HTTP endpoints, or LLM prompts that fire automatically at key moments.

**4 Hook Types**
| Type | How it runs |
|---|---|
| `command` | Shell script / binary |
| `http` | POST to any endpoint |
| `prompt` | Single LLM call |
| `agent` | Multi-turn subagent with tools |

**25+ Hook Events**
```
PreToolUse       → Before any tool executes (can block)
PostToolUse      → After tool completes
UserPromptSubmit → Before user message sent (can reject)
AssistantResponse→ After Claude replies
SessionStart     → On session open
SessionEnd       → On session close
... + 19 more
```

**Exit Codes**
| Code | Meaning |
|---|---|
| `0` | Success — stdout parsed as JSON |
| `2` | Blocking error — stderr fed to Claude, tool call prevented |
| Other | Non-blocking — logged in verbose mode |

**Block `rm -rf` example:**
```json
{
  "hooks": {
    "PreToolUse": [{
      "matcher": "Bash",
      "hooks": [{
        "type": "command",
        "if": "Bash(rm *)",
        "command": ".claude/hooks/block-rm.sh"
      }]
    }]
  }
}
```

> Add `"async": true` to any `command` hook to run it in the background while Claude continues.

---

### 🦙 Ollama + Gemma 4 — Local AI

Run powerful open models entirely on your own hardware.

```bash
# Install & run
ollama pull gemma4:e4b
ollama run gemma4:e4b
```

**Model Sizes**
| Model | Size | Context | Best For |
|---|---|---|---|
| E2B | 7.2 GB | 128K | Mobile & edge |
| **E4B** | **9.6 GB** | **128K** | **Laptops, daily coding** ← sweet spot |
| 26B | 18 GB | 256K | Workstation (MoE, 3.8B active) |
| 31B | 20 GB | 256K | Max local intelligence |

**Thinking Mode**
```
System prompt: <|think|> Your extended reasoning here...
```
Strip `<think>` blocks from history in multi-turn conversations — only keep final responses.

**Recommended Settings**
```json
{ "temperature": 1.0, "top_p": 0.95, "top_k": 64 }
```

---

### 🤝 GitHub Copilot

**@Participants** — domain specialists invoked with `@`:
| Participant | Domain |
|---|---|
| `@workspace` | Your entire project |
| `@vscode` | Editor, settings, extensions |
| `@terminal` | Shell, command output |
| `@github` | Issues, PRs, repos |
| `@azure` | Azure resources |

**#Variables** — pinpoint context with `#`:
```
#file  #selection  #codebase  #function  #class
#sym   #editor     #problems  #git       #fetch
```

**Slash Commands**
| Command | Action |
|---|---|
| `/explain` | Explain selected code |
| `/fix` | Propose bug fix |
| `/tests` | Generate unit tests |
| `/new` | Scaffold new project/file |
| `/docs` | Generate documentation |
| `/fixTestFailure` | Debug failing tests |
| `/simplify` | Reduce complexity |
| `/optimize` | Improve performance |

**Agent Modes**
- **Agent** — autonomous, multi-file edits with tool access
- **Plan** — research & plan without making changes  
- **Ask** — Q&A only, zero modifications

**Customization Files**
```
.github/copilot-instructions.md  ← Project-wide instructions (always loaded)
.prompt.md                       ← Reusable prompt templates
.agent.md                        ← Custom agent definitions
```

**Key Shortcuts**
| Shortcut | Action |
|---|---|
| `Ctrl+Alt+I` | Open Copilot Chat |
| `Tab` | Accept inline suggestion |
| `Ctrl+→` | Accept one word |
| `Alt+]` / `Alt+[` | Next / previous suggestion |

---

## 🎴 Flashcards

36 interactive flip cards across 6 sets — click any card to reveal the answer:

| Set | Topic | Cards |
|---|---|---|
| 1 | Claude Code Basics | 6 |
| 2 | CLAUDE.md & Memory | 6 |
| 3 | Hooks | 6 |
| 4 | CLI Flags | 6 |
| 5 | Ollama & Gemma 4 | 6 |
| 6 | Copilot Commands & Workflow | 6 |

---

## 🛠 Tech Stack

```
Three.js r172      → 3D scene, crystal meshes, particle system
GSAP 3 + ScrollTrigger → Scroll-driven animations, parallax
Lenis              → Smooth scroll synced with GSAP ticker
Vite 6             → Dev server + optimized production build
Custom GLSL        → Background clouds, crystal refraction, particles
```

---

## 🚀 Local Development

```bash
# Clone
git clone https://github.com/ayush4u/codeforge.git
cd codeforge

# Install
npm install

# Dev server → http://localhost:5179
npm run dev

# Production build → dist/
npm run build

# Preview production build
npm run preview
```

---

## 📁 Project Structure

```
codeforge/
├── index.html                    # All content — single page
├── vite.config.js                # Vite + GLSL plugin config
├── src/
│   ├── main.js                   # Three.js scene, GSAP, flashcards
│   ├── styles/
│   │   └── main.css              # Editorial design system (warm light theme)
│   └── shaders/
│       ├── background.vert/frag  # Animated cloud background
│       ├── crystal.vert/frag     # Refractive floating crystals
│       └── particles.vert/frag  # Depth-sorted particle field
└── .github/
    └── workflows/
        └── deploy.yml            # Auto-deploy to GitHub Pages on push to main
```

---

## 🌐 Deployment

Every push to `main` triggers the GitHub Actions workflow:

1. `actions/checkout` — pull latest code
2. `actions/setup-node@v4` — Node 20 with npm cache
3. `npm ci` — clean install
4. `npm run build` — Vite production build to `dist/`
5. `actions/deploy-pages` — publish to GitHub Pages

**Live at:** https://ayush4u.github.io/codeforge/

---

<div align="center">

Built with Three.js · GSAP · Lenis · Vite

</div>
