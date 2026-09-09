# Web Development Agent Workspace Architecture

This folder contains the core definitions, rules, workflows, and helper scripts for the AI agent workspace. The workspace is optimized for frontend, backend, and full-stack web engineering, automating tasks from prototyping to production-grade deployment and testing.

## Directory Structure

```
.agents/
├── .shared/                     # Shared configurations, design assets, and datasets
│   └── ui-ux-pro-max/           # Design system libraries, styling data (CSVs), and Python helpers
├── agents/                      # Specialized agent personas (system prompts and roles)
│   ├── backend-specialist.md
│   ├── frontend-specialist.md
│   ├── qa-automation-engineer.md
│   └── (17+ other persona files)
├── mcp/                         # Model Context Protocol (MCP) servers and tools definitions
├── rules/                       # Workspace style rules, guidelines, and constraints
│   └── GEMINI.md                # Agent instruction overrides and active protocols
├── scripts/                     # Automation scripts for session management, testing, and audits
│   ├── auto_preview.py
│   ├── checklist.py
│   ├── session_manager.py
│   └── verify_all.py
├── skills/                      # Specialized skill directories with instructions and scripts
│   ├── clean-code/
│   ├── database-design/
│   ├── nextjs-react-expert/
│   └── (9+ other developer skill definitions)
├── workflows/                   # Standardized workflow guides and orchestration loops
│   ├── brainstorm.md
│   ├── orchestrate.md
│   ├── ui-ux-pro-max.md
│   └── (9+ other workflows)
└── preview.log                  # Agent execution logs and dry-run output
```

---

## Key Directories Explained

### 1. `agents/`
Contains markdown definitions of specialized AI personas. Important ones include:
- **`frontend-specialist.md`**: Master of UI/UX, CSS/Tailwind, React/Next.js, accessibility, and animations.
- **`backend-specialist.md`**: Expert in APIs, database design, indexing, caching, and server-side security.
- **`qa-automation-engineer.md`**: Dedicated to writing test suites, mock files, and resolving testing errors.
- **`orchestrator.md`**: Coordinates multiple agents to collaborate on complex full-stack features.
- **`project-planner.md`**: Leads project analysis and writes structured execution plans.

### 2. `skills/`
Modular capabilities that can be loaded dynamically by agents:
- **`clean-code/`**: Principles for keeping code concise, dry, and clean.
- **`database-design/`**: Schema creation, ORMs, migrations, and performance optimization guides.
- **`nextjs-react-expert/`**: Performance guidelines, server vs. client components, and bundle reduction techniques.
- **`vulnerability-scanner/`**: Guides for auditing code against OWASP vulnerabilities.

### 3. `workflows/`
Step-by-step procedures for development phases:
- **`ui-ux-pro-max.md`**: Multi-phase flow for designing, styling, and coding premium user interfaces.
- **`orchestrate.md`**: Guide for delegating work to specialist agents.
- **`brainstorm.md` / `plan.md`**: Directs feature brainstorming and structured planning before implementation.

### 4. `scripts/`
Workspace tools that verify files, perform security checks, or audit code:
- **`verify_all.py`**: Validates project structure, dependencies, and syntaxes.
- **`checklist.py`**: Executes a series of pre-deployment audits (Lint, security scan, unit tests, UX analysis).

### 5. `rules/`
Defines operational protocols. `GEMINI.md` is the primary rulebook that controls how agents interact, classify tasks, and adhere to strict rules (like avoiding generic color templates).

### 6. `.shared/ui-ux-pro-max/`
A centralized repository of UI assets, containing:
- **`data/`**: Large datasets containing UI templates, Tailwind styles, typography combinations, React icons, landing page wireframes, and stack configurations.
- **`scripts/`**: Design automation engines (`core.py`, `design_system.py`) to quickly scaffold components.

---

## Workspace Lifecycle

1. **Plan & Orchestrate**: Use the `project-planner` or `orchestrator` with the `plan.md` / `orchestrate.md` workflows to map out changes.
2. **Implement**: Rely on `frontend-specialist` or `backend-specialist` leveraging `clean-code` and `database-design` skills.
3. **Verify**: Run `python .agents/scripts/checklist.py` before deployments to guarantee security, performance, lint, and test pass criteria are met.
