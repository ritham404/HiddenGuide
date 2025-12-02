<!-- Generated: concise, repo-specific guidance for AI coding agents -->
# HiddenGuide — Copilot / AI agent quick instructions

This file gives focused, actionable guidance so AI agents (Copilot, copilots, assistants) can be productive immediately in this repository.

Key points (big picture)
- This is a Next.js (app router) React app using Next 15 and Tailwind. Main routes live under `app/` and each file is a route or layout. Server components are the default — client components use the "use client" pragma at top.
- UI primitives are in `components/ui/*` (shadcn-style). Prefer reusing these instead of creating ad-hoc controls.
- Firebase (client) powers auth and Firestore; config is in `app/firebase/config.ts`. Authentication and role handling happens in `app/auth/*` pages and roles are saved to Firestore `users` collection.

Developer workflows — how to run & debug
- Common commands (package.json):
  - `npm run dev` — start the Next dev server (works for `pnpm` as well; a `pnpm-lock.yaml` exists). Use the package manager in the environment.
  - `npm run build` — production build (note: `next.config.mjs` currently ignores TS and ESLint build errors).
  - `npm run lint` — runs Next lint.
- Environment variables: Firebase config expects NEXT_PUBLIC_* env vars (see `app/firebase/config.ts`). If you change env vars, restart the dev server.

Patterns & conventions to follow
- Routes and server/client split
  - Files under `app/` are Next app-router routes. By default they are server components — add `"use client"` at the top when you need browser-only APIs, react state/hooks, or client-only code. Example: `app/auth/signup/page.tsx` and `app/auth/login/page.tsx` are `"use client"` pages.
- UI & components
  - Re-use existing primitives from `components/ui/*` (Button, Card, Input, Label, RadioGroup, etc.). Import paths use the `@/components/*` alias configured in `tsconfig.json`.
  - Many UI components are implemented as small client components — check for `"use client"` at top of files.
- Firebase + Firestore usage
  - Initialization is in `app/firebase/config.ts` and code writes to `users` collection on sign up (see `app/auth/signup/page.tsx`). Look for createUserWithEmailAndPassword, signInWithEmailAndPassword and Firestore `setDoc` calls when changing auth flows.

Project-specific gotchas & notes
- next.config.mjs: project disables strict TS and ESLint checks during build (types and lint errors will not block a build). Keep this in mind if you see type or lint issues — builds can still succeed.
- Path alias: use `@/` for repo-root imports (see `tsconfig.json` paths)
- There are both `package-lock.json` and `pnpm-lock.yaml` present — prefer the package manager used locally, but scripts are standard (see `package.json`).
- Example behavior for role routing: signup stores `role` to Firestore and the app redirects to `/guide/dashboard` or `/traveler/dashboard` — update both client logic and Firestore shape when changing roles.

Where to look first when adding features
- Routes & pages: `app/**` — add new routes under this tree.
- Authentication: `app/firebase/config.ts`, `app/auth/*`.
- UI primitives & shared components: `components/ui/*` (follow existing prop patterns such as `className`, compound components: Card/CardHeader etc.)

If you need more context
- Use `git grep "use client"` to enumerate client components quickly.
- Read `app/auth/signup/page.tsx` and `app/firebase/config.ts` when changing auth or Firestore usage.
- When changing images or assets, `next.config.mjs` currently sets `images.unoptimized = true`.

If anything here is unclear or you'd like me to add more examples (e.g., common PR checklist, preferred package manager, or CI steps), tell me which area to expand and I'll iterate. ✅
