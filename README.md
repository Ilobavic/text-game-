# Text RPG (Web)

Minimal Vite + React prototype of a text-based, turn-based RPG.

Run locally:

1. npm install
2. npm run dev

Build (production):

1. npm run build
2. Serve `dist/` with a static server (Vercel uses this automatically)

Notes:
- CI / Vercel config: this project uses **Node 24.x** (see `package.json` engines). This replaces earlier Node 18 references and ensures reliable installs/builds on Vercel.
- Build command: `npx vite build` (set in `package.json` to avoid permission issues running `node_modules/.bin/vite`).
