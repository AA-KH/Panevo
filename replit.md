# Workspace

## Overview

pnpm workspace monorepo using TypeScript. Each package manages its own dependencies.

## Stack

- **Monorepo tool**: pnpm workspaces
- **Node.js version**: 24
- **Package manager**: pnpm
- **TypeScript version**: 5.9
- **API framework**: Express 5
- **Database**: PostgreSQL + Drizzle ORM
- **Validation**: Zod (`zod/v4`), `drizzle-zod`
- **API codegen**: Orval (from OpenAPI spec)
- **Build**: esbuild (CJS bundle)

## Key Commands

- `pnpm run typecheck` — full typecheck across all packages
- `pnpm run build` — typecheck + build all packages
- `pnpm --filter @workspace/api-spec run codegen` — regenerate API hooks and Zod schemas from OpenAPI spec
- `pnpm --filter @workspace/db run push` — push DB schema changes (dev only)
- `pnpm --filter @workspace/api-server run dev` — run API server locally

## Artifacts

- **panevo** (`/`) — PANEVO website Phase 1. Brand site for India's first pre-flavoured fresh paneer (Shatkona Ventures Pvt Ltd). 8 pages: Home, Products, Our Story, Nutrition, Subscribe, Find Us, Contact, Recipes (+ dynamic recipe detail). Three personas (Q-Com buyers, subscription households, health/gym). All integrations (Razorpay, Google Maps, GA4/Hotjar, MSG91 webhook) are stubbed in Phase 1 — wire real endpoints in Phase 2. See `attached_assets/PANEVO_Phase1_Master_Build_Prompt_*.md` for the full spec.

See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details.
