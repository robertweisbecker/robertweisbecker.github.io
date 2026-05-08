## Learned User Preferences

- Persist browser preview CSS/Tailwind adjustments back into the generator's TSX (e.g., padding/breathing room).
- Prefer Base UI + existing design-system wrappers (e.g., `Switch`, `Autocomplete`, `FieldSet`) over native inputs in this codebase.
- When a "start corner" changes for clip-path curve generators, apply the full preset set of parameters (`from`, `destX/destY`, `ctrlX/ctrlY`) to avoid degenerate straight-line paths.
- **Always add a demo to `app/components/component-demos.tsx` (and a sidebar link in `app/components/page.tsx` if not already present) whenever a new component is created or a major feature is added to an existing one.** For plugin-style features (e.g. carousel variants), add a labeled sub-example per variant inside the existing section rather than a new top-level section.

## Learned Workspace Facts

- The clip-path curve generator closes the `shape()` using `vline` then `hline` (based on the chosen start corner coords).
- `ToggleGrid` preserves intended toggle styling by extending `ToggleGroup` context with `grid?: boolean`.
- The generator's "Show annotations" toggle controls only gridlines + axis label overlay, while the curve/handles/start marker remain visible.

## Cursor Cloud specific instructions

This is a static Next.js 16 site (App Router) with no database, no API routes, and no required environment variables.

**Commands** — see `README.md` and `package.json` scripts for the canonical list:
- Dev server: `npm run dev` (port 3000)
- Lint: `npm run lint` (ESLint; pre-existing warnings/errors exist — unused vars and unescaped entities)
- Build: `npm run build` (static export to `out/`)
- Format: `npm run format` / `npm run format:check` (Prettier)

**Gotchas:**
- The dev server connects to an optional "agentation" overlay on port 4747 — this is not required and can be ignored.
- `@vercel/analytics` and `@vercel/speed-insights` are no-ops locally; they only activate on Vercel deployments.
- The homepage doubles as the About page (no separate `/about` route in the nav — it renders at `/`).
