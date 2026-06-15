# Basketball Bracket

A digital bracket to track your picks for a single-elimination basketball tournament.

Powered by [Bracketry](https://github.com/sbachinin/bracketry)

---

## Architecture

The application has a monorepo structure with two packages:

- **Backend** (`backend/`): Fastify server that serves both the API and the built frontend static files
- **Frontend** (`frontend/`): Vue 3 SPA built with Vite

In production, the backend serves the compiled frontend from `frontend/dist/` at the root path, with a SPA fallback for history-mode routing. This eliminates CORS issues and simplifies deployment to a single service.

---

## Development

### Prerequisites

- Node.js 24.x
- pnpm ^8.15.9
- PostgreSQL

### Setup

```bash
# Install dependencies for all workspaces
pnpm install

# Copy backend environment file
cp backend/.env.example backend/.env
```

Update `backend/.env` with required settings:

| Variable | Description | Example |
|----------|-------------|---------|
| `PORT` | Server port | `3000` |
| `CORS_ORIGIN` | Allowed origins (for local dev) | `http://localhost:5173` |
| `DATABASE_URL_DEV` | Local PostgreSQL connection string | `postgresql://user:pass@localhost:5432/bracketry` |
| `DATABASE_URL_PROD` | Production PostgreSQL connection string | `postgresql://user:pass@host:5432/railway` |
| `BETTER_AUTH_SECRET` | Secret for Better Auth | *(generate one)* |
| `BETTER_AUTH_URL` | Base URL for auth callbacks | `http://localhost:3000` |
| `GITHUB_CLIENT_ID` | GitHub OAuth App client ID | *(from GitHub)* |
| `GITHUB_CLIENT_SECRET` | GitHub OAuth App client secret | *(from GitHub)* |
| `AUTH_POST_LOGIN_URL` | Redirect after successful login | `http://localhost:3000/` |
| `AUTH_ERROR_URL` | Redirect on auth error | `http://localhost:5173/error` |

No frontend `.env` file is needed — the app uses relative URLs and `window.location.origin`.

### GitHub OAuth Configuration

Register the following callback URLs in your GitHub OAuth App settings:

- Local development: `http://localhost:3000/api/auth/callback/github`
- Production: `https://your-domain.com/api/auth/callback/github`

### Running Locally

```bash
# Start both frontend and backend concurrently
pnpm dev
```

Or run separately:

```bash
# Terminal 1 - Backend
pnpm --filter @bracketry/backend dev

# Terminal 2 - Frontend
pnpm --filter @bracketry/frontend dev
```

Access the application:

- Frontend: http://localhost:5173
- Backend API: http://localhost:3000
- Health check: http://localhost:3000/health

### Local Development Notes

The Vite dev server runs on port `5173` and proxies `/api` requests to the backend at `localhost:3000`. CORS is configured for local development but is not required in production since the backend serves both the API and frontend from the same origin.

---

## Features

### User Features

- **Bracket Picks**: Select winners for each match in the tournament
- **Live Scoring**: View correct predictions as results are updated
- **Per-Round Breakdown**: See score by round, only showing completed rounds
- **Results Comparison**: Actual results are merged into your bracket view

### Admin Features

- **Template Management**: Create and activate tournament templates
- **Results Upload**: Upload match results via JSON
- **Results Download**: Download current results as JSON for offline editing

---

## API Routes

| Method | Path | Description |
|--------|------|-------------|
| `GET` | `/health` | Health check with database status |
| `GET` | `*/api/auth*` | Better Auth routes (session, login, callback) |
| `GET` | `/api/brackets` | List user brackets |
| `POST` | `/api/brackets` | Create a bracket |
| `GET` | `/api/brackets/current` | Get current user bracket |
| `GET` | `/api/templates` | List templates (auth) |
| `GET` | `/api/templates/active` | Get active template |
| `POST` | `/api/templates` | Create template (admin) |
| `PUT` | `/api/templates/:id/results` | Update match results (admin) |
| `GET` | `/api/templates/:id/results` | Get current results |
| `GET` | `/api/templates/:id/results/download` | Download results JSON (admin) |

---

## Project Structure

```
├── backend/
│   ├── src/
│   │   ├── routes/              # Fastify route handlers
│   │   ├── types/               # Zod validation schemas
│   │   ├── utils/               # Auth, errors, DB
│   │   ├── app.ts               # Fastify app setup
│   │   └── server.ts            # Entry point
│   ├── package.json
│   └── tsconfig.json
├── frontend/
│   ├── src/
│   │   ├── components/          # Vue components
│   │   ├── composables/         # Vue composables
│   │   ├── lib/                 # Core logic (comparison, scoring)
│   │   ├── views/               # Page views
│   │   ├── api.ts               # API client
│   │   └── auth-client.ts       # Better Auth client
│   ├── package.json
│   └── vite.config.ts
├── package.json                 # Root workspace config
└── pnpm-workspace.yaml
```

---

## Tech Stack

[![better-auth](https://img.shields.io/badge/Better--Auth-3B82F6?style=for-the-badge&logo=shield&logoColor=white)](https://github.com/better-auth/better-auth)
[![drizzle](https://img.shields.io/badge/Drizzle-C5F74F?style=for-the-badge&logo=drizzle&logoColor=000000)](https://github.com/drizzle-team/drizzle-orm)
[![fastify](https://img.shields.io/badge/Fastify-000000?style=for-the-badge&logo=fastify&logoColor=white)](https://github.com/fastify/fastify)
[![postgresql](https://img.shields.io/badge/PostgreSQL-4169E1?style=for-the-badge&logo=postgresql&logoColor=white)](https://www.postgresql.org/)
[![primevue](https://img.shields.io/badge/PrimeVue-10B981?style=for-the-badge&logo=primevue&logoColor=white)](https://github.com/primefaces/primevue)
[![tanstack-query](https://img.shields.io/badge/Tanstack_Query-FF4154?style=for-the-badge&logo=tanstack&logoColor=white)](https://github.com/TanStack/query)
[![typescript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=TypeScript&logoColor=FFF)](https://github.com/microsoft/TypeScript)
[![vite](https://img.shields.io/badge/-Vite-B73BFE?style=for-the-badge&logo=vite&logoColor=white)](https://github.com/vitejs/vite)
[![vue](https://img.shields.io/badge/Vue.js-35495E?style=for-the-badge&logo=vuedotjs&logoColor=4FC08D)](https://github.com/vuejs)
[![zod](https://img.shields.io/badge/Zod-3068B7?style=for-the-badge&logo=zod&logoColor=white)](https://github.com/colinhacks/zod)

- [Antfu's ESLint Config](https://github.com/antfu/eslint-config)
- [Bracketry](https://github.com/sbachinin/bracketry)
