# Cloudways Monolith — React + Express

## Structure
```
monorepo/
├── package.json           ← root (npm workspaces)
├── packages/
│   ├── api/               ← Express backend
│   └── ui/                ← React frontend
```

## Deploy on Cloudways — TWO separate apps

### App 1 — API (Express)
| Field | Value |
|---|---|
| Framework Preset | Express |
| Root Directory | packages/api |
| Entry File | src/index.js |
| Package Manager | npm |

### App 2 — UI (React)
| Field | Value |
|---|---|
| Framework Preset | React |
| Root Directory | packages/ui |
| Build Command | run build |
| Output Directory | packages/ui/dist |
| Package Manager | npm |
| Env Var | VITE_API_URL = https://your-api-app.cloudways.com |

## Local Setup
```bash
npm install          # installs all workspace dependencies
npm run start:api    # starts API on localhost:3002
npm run dev:ui       # starts React on localhost:5173
```

> **Note:** Port 3002 is used locally to avoid conflicts with other services that may occupy 3001 (e.g. SSH tunnels).

## ⚠️ Cloudways Monorepo Challenge
Cloudways runs install from root directory.
- API deploy: set Root Directory to `packages/api`
- UI deploy: set Root Directory to `packages/ui`
- Set VITE_API_URL env var on the UI app pointing to your deployed API URL
