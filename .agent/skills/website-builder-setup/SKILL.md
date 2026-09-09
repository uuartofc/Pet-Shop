---
name: website-builder-setup
description: "Install the full AI website builder stack — UI/UX Pro Max, Framer Motion animations, and 21st.dev components. One skill, three tools, zero coding experience needed."
---

# Website Builder Setup (Antigravity Edition)

This skill guides the user through installing everything needed to build modern, animated websites using Antigravity.

## What Gets Installed

| Tool | What it does |
|------|-------------|
| **UI/UX Pro Max** | Gives the agent access to 50+ design styles, 161 color palettes, and 57 font pairings. |
| **Framer Motion** | Adds smooth animations — page transitions, hover effects, scroll reveals. |
| **21st.dev Magic** | A library of 100+ polished React components to pull from. |

## Workflow

When this skill is triggered, guide the user through each step one at a time. Be encouraging and clear. If any step fails, do not stop. Acknowledge the error, provide the manual command, and keep moving.

---

### Step 1: Check Prerequisites

Run this command to check Node.js and npm versions:
```powershell
node -v; npm -v
```

- If Node.js is installed → say "Node.js is installed. Let's go."
- If NOT installed → say:

> You need Node.js first. Go to https://nodejs.org and download the LTS version. Install it, restart your terminal, and run the `/website-builder-setup` workflow again.

Stop here if Node is missing.

---

### Step 2: Install UI/UX Pro Max

Run the installation command:
```powershell
npm install -g uipro-cli
```

Initialize the configuration (select or target Antigravity if prompted, or run standard init):
```powershell
uipro init
```

- On success → "UI/UX Pro Max is installed. Your design stack is ready."
- On failure → "Hit a snag. You can try manually later: `npm install -g uipro-cli && uipro init`. Let's keep going."

---

### Step 3: Install Framer Motion

Run the local dependency installation:
```powershell
npm install framer-motion
```

- On success → "Framer Motion is installed. Your sites will support modern animations."
- On failure → "Hit a snag. You can try manually later: `npm install framer-motion`. Moving on."

---

### Step 4: Set Up 21st.dev Magic (MCP Server)

Explain to the user:
> To connect the 21st.dev component library, we need an API key:
> 1. Go to **https://21st.dev/magic/console**
> 2. Sign up or log in (free)
> 3. Copy your API key
> 4. Paste it here when I ask for it

Wait for the user to provide their API key.

Once the user provides it, read, parse, and edit the global Antigravity MCP config file: `~/.gemini/config/mcp_config.json` (on Unix/macOS) or `%USERPROFILE%\.gemini\config\mcp_config.json` (on Windows). Add the following server configuration to the `mcpServers` object:

```json
"21st-dev-magic": {
  "command": "npx",
  "args": ["-y", "@21st-dev/magic@latest"],
  "env": {
    "API_KEY": "THEIR_KEY_HERE"
  }
}
```

After updating the config:
> 21st.dev Magic is connected. Please reload your Antigravity/IDE window for the new MCP server to load.

---

### Step 5: Complete

> **You're all set.** Here's what was set up:
> - **UI/UX Pro Max** — 50+ styles, 161 palettes, 57 font pairings
> - **Framer Motion** — smooth animations
> - **21st.dev Magic** — 100+ production-ready components
>
> To build your first website, just tell me:
> - What your business does
> - Who it's for
> - What design vibe you want (dark, minimal, bold, playful, etc.)
>
> Make sure to restart/reload the Antigravity session so the 21st.dev MCP server is active!
