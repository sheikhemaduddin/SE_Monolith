# Cloudways Monorepo — React + Express

## Structure
```
monorepo/
├── package.json           ← root (npm workspaces)
├── packages/
│   ├── api/               ← Express backend
│   └── web/               ← React frontend
```

## Deploy on Cloudways — TWO separate apps

### App 1 — API (Express)
| Field | Value |
|---|---|
| Framework Preset | Express |
| Root Directory | packages/api |
| Entry File | src/index.js |
| Package Manager | npm |

### App 2 — Web (React)
| Field | Value |
|---|---|
| Framework Preset | React |
| Root Directory | packages/web |
| Build Command | run build |
| Output Directory | packages/web/dist |
| Package Manager | npm |
| Env Var | VITE_API_URL = https://your-api-app.cloudways.com |

## Local Setup
```bash
npm install          # installs all workspace dependencies
npm run start:api    # starts API on localhost:3001
npm run dev:web      # starts React on localhost:5173
```

## ⚠️ Cloudways Monorepo Challenge
Cloudways runs install from root directory.
- API deploy: set Root Directory to `packages/api`
- Web deploy: set Root Directory to `packages/web`
- Set VITE_API_URL env var on the web app pointing to your deployed API URL
