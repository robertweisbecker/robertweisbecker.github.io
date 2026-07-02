## Learned User Preferences

- Persist browser preview CSS/Tailwind adjustments back into the generator's TSX (e.g., padding/breathing room).
- Prefer Base UI + existing design-system wrappers (e.g., `Switch`, `Autocomplete`, `FieldSet`) over native inputs in this codebase.
- When a "start corner" changes for clip-path curve generators, apply the full preset set of parameters (`from`, `destX/destY`, `ctrlX/ctrlY`) to avoid degenerate straight-line paths.
- **Always add a QA example to `app/private/qa/component-demos.tsx` (and a TOC/sidebar entry in `app/private/qa/page.private.tsx` via `CUSTOM_TOC_ITEMS` or `UI_TOC_ITEMS` if not already present) whenever a new component is created or a major feature is added to an existing one.** For plugin-style features (e.g. carousel variants), add a labeled sub-example per variant inside the existing section rather than a new top-level section.
- **Always update sitemap coverage and Open Graph images/metadata when a new route or page is created.** For dev-only/private routes that should not be indexed, explicitly confirm the sitemap exclusion and still decide whether route-specific OG metadata is needed.
- Do not delete commented-out experimental code or custom SVG/icon components as "dead code"; preserve them or move them into reusable modules such as `components/icons.tsx`.
- Do not remove valid Tailwind v4.3 custom/arbitrary variant patterns as a stale-CSS workaround; restore the intended syntax and verify the CSS graph instead.

## Learned Workspace Facts

- This is a mostly static Next.js 16 App Router site with MDX content, no database, and no required environment variables. The only current API route is `app/api/letterboxd/route.ts`, which backs the homepage Letterboxd widget.
- Canonical commands include `npm run dev`, `npm run lint`, `npm run build`, `npm run format`, `npm run format:check`, `npm run typecheck`, `npm run typecheck:build`, `npm run check`, and `npm run analyze:build`.
- `npm run build` produces the static site output with the default Next/Turbopack production build, while `npm run dev:fresh` clears `.next` before starting dev.
- Explicit webpack fallback scripts remain available as `npm run dev:webpack`, `npm run dev:fresh:webpack`, `npm run build:webpack`, and `npm run preview:webpack`.
- The clip-path curve generator closes the `shape()` using `vline` then `hline` (based on the chosen start corner coords).
- `ToggleGrid` preserves intended toggle styling by extending `ToggleGroup` context with `grid?: boolean`.
- Tailwind v4.3 custom variants such as `@stuck-top` are valid here; see **Known Bugs & Workarounds** for the Turbopack stale-CSS bug that makes errors persist past the fix.
- The Agentation development toolbar and packages were removed because they added a large optional dev-only graph; do not reintroduce them unless the user explicitly asks for Agentation again.
- `@vercel/analytics` and `@vercel/speed-insights` are no-ops locally and only activate on Vercel deployments.
- The only current `overrides` entry is `postcss: ^8.5.15`, kept for GHSA-qx2v-qp2m-jg93 while allowing `@tailwindcss/postcss` to resolve within its declared range; previous dev-only `hono`/`qs` overrides were removed on 2026-07-02.
- The homepage doubles as the About page at `/`; there is no separate `/about` route in the nav.
- `/oklch-colors` is heavier than many project routes because its MDX renders hundreds of color swatches/palette nodes plus a large inline SVG.
- Pixel icon morphing is implemented in `components/pixel-icon-morph.tsx` and is intentionally limited to `MorphablePixelIconName` icons from `components/icons-pixel.tsx`: 11x11 `createPixelIcon(...)` data icons with exactly 28 points. Non-28 data icons remain normal pixel icons but are excluded from `morphablePixelIconNames`.
- `PixelIconMorph` renders exactly 28 `motion.rect` elements. Parent components own interaction state and pass `active`; the component should not infer pressed/active state from parent DOM.
- Pixel morph pairing strategies are `match`, `nearest`, `reading`, `radial`, `scatter`, and `compress`; animation types are `linear`, `ease`, and `spring`. `match` is the default and should pin rects with identical coordinates before nearest-matching the remaining rects. Keep scatter/compress as strategies, not animation types, and avoid spring multi-keyframes for midpoint strategies.
- `/private/**` is dev-only (`.private.tsx` route convention) and does not appear in production builds.
- `/playground` is a lightweight index plus six child routes: `motion-systems`, `pixel-demos`, `interaction-components`, `media-comparison`, `buttons`, and `visual-details`.
- Pixel morph demos are post-specific: `components/demos/pixel-icon-morph-visualizer.tsx` renders directly in `app/posts/pixel-icons/page.tsx` without a `Demo` wrapper, while `components/demos/pixel-icon-morph-toggles.tsx` is wrapped in `Demo` on that post. Do not add these pixel morph demos to `app/private/qa/component-demos.tsx` or the private QA TOC unless explicitly requested.
- In the pixel morph visualizer, the left card contains the interactive icon, sequence dots, picker, and `CardAction` play/clear buttons; the right card contains controls. Use `ToggleGroup` for succinct controls and `Select` for more verbose ones to avoid truncation. Speed values are intentionally inverse duration labels: `1x` is 200ms, `0.5x` is 400ms, and `0.25x` is 800ms.
- iOS/Safari viewport color is intentionally handled in two layers: static `viewport.themeColor` in `app/layout.tsx` for the pre-JS paint, then the root `Theme` provider updates all `meta[name="theme-color"]` tags from the computed `document.body` background color. Do not replace this with a hard-coded light/dark `next-themes` updater unless the CSS-token-based sync breaks.
- Unused public media/assets removed during the 2026-07 cleanup were backed up outside the repo at `/Users/robertweisbecker/Desktop/bob-fyi-unused-component-assets-2026-07-01/`, with videos under its `videos/` subfolder.
- Git may report existing loose-object maintenance debt through `.git/gc.log`; do not run `git prune` or other repository cleanup commands unless the user explicitly asks.

## React Doctor Tracking

- Current React Doctor score: 46/100
- Last checked `master` commit: `fad62256673a`
- Last checked at: 2026-07-02 (user-provided baseline; no local React Doctor run in this setup turn)
- Command: `npx react-doctor@latest --verbose`
- After each new `master` commit, run React Doctor, report violations in Markdown with links to local files and line numbers, then update this section with the latest score, commit, and run timestamp.

## Refactoring Notes

- Breaking internal imports is allowed because this repo is the only consumer.
- Behavior should remain the same except where current behavior is a state-sync or maintainability bug.
- Prefer local hooks when they encode repo semantics, especially hooks/use-media-query.ts.
- A hooks library is installed at @uidotdev/usehooks. For example, you might prefer this for browser subscription state when it replaces custom effect plumbing without weakening behavior.
- Do not spend time preserving old barrel exports or backwards-compatible aliases.

## Known Bugs & Workarounds

### Turbopack + Tailwind v4 Stale CSS Bug (open as of May 2026)

- **Root cause:** Turbopack double-invokes the PostCSS transform per save when `@tailwindcss/postcss` reports file dependencies. The first invocation gets stale content with a fresh mtime; the second gets correct content but an already-consumed mtime. Because `@tailwindcss/postcss` caches on `mtimeMs`, it serves stale output. A CSS syntax error (e.g. a malformed arbitrary selector) therefore poisons the cache and persists even after the source is fixed.
- **Tracked upstream:** vercel/next.js #90563 ("Tailwind v4 persistent cache stuck on CSS syntax errors") and vercel/next.js #93052 ("Turbopack: CSS HMR sometimes lags one revision behind edits") — both open.
- **Why this repo is especially vulnerable:** uses `@custom-variant @stuck-top` (registers extra file deps, raising the double-invocation chance); arbitrary selectors inside that variant (any typo creates invalid CSS); `globals.css` is the entry point for the entire CSS graph.
- **Bug does not affect `--webpack` mode.**
- **Partial fix landed** in Tailwind v4.1.3 (PRs #17514 and #17554, April 2025) but does not cover the general case.
- **Workarounds (in order of preference):**
  1. Touch `styles/globals.css` or `postcss.config.mjs` to force a CSS graph rebuild and clear the stale error.
  2. Run `npm run dev:fresh` (`rm -rf .next && next dev`) for a full reset.
  3. Run `next dev --webpack` for reliable CSS HMR when doing complex CSS work.
  4. Do **not** use the prettier-plugin-tailwindcss canonical form `@stuck-top:**:data-[slot=title]:visible` — it produces invalid CSS with this custom variant. Always use the bracketed form `@stuck-top:[&_[data-slot=title]]:visible` and add `{/* prettier-ignore */}` to prevent rewriting.

### Production build bundler fallback

- The forced webpack production path was retired on 2026-07-01 after dependency updates to Next `16.2.9`, Tailwind `4.3.2`, and `@tailwindcss/postcss` `4.3.2`.
- Current evidence: after clearing `.next`, plain `npx next build` completed successfully with Turbopack: compile in 62s, TypeScript in 29.6s, and static generation for 49 static pages in 5.2s (no `/private/**` routes in production).
- Keep explicit webpack scripts for fallback testing only: `npm run build:webpack` and `npm run preview:webpack`.
- If Turbopack production builds regress, compare against `npm run build:webpack`, clear `.next`, and update this file with the new evidence before making webpack the default again.

### Next webpack/cssnano conic-gradient minification bug (open as of June 2026)

- **Symptom:** Tailwind `bg-conic` gradients render locally in development but disappear after production deployment/build; affected elements can compute `background-image: none` even when the Tailwind classes are correct.
- **Root cause:** Next's webpack production CSS minimizer (`next/dist/compiled/cssnano-simple`) rewrites Tailwind's `@property --tw-gradient-from-position { syntax: "<length-percentage>"; initial-value: 0%; }` to `initial-value: 0`. Browsers then treat the value as a length (`0px`), which invalidates conic-gradient color stops.
- **Tracked upstream:** [vercel/next.js #79149](https://github.com/vercel/next.js/issues/79149), [tailwindlabs/tailwindcss #17977](https://github.com/tailwindlabs/tailwindcss/issues/17977), and the upstream cssnano fix path [cssnano/cssnano #1702](https://github.com/cssnano/cssnano/pull/1702).
- **Current verification:** The default `npm run build` now uses Turbopack and emits `@property --tw-gradient-from-position{syntax:"<length-percentage>";inherits:false;initial-value:0%}` under `.next/static/chunks/*.css`. The webpack/cssnano bug still matters when using `npm run build:webpack`.
- **Workaround:** Keep an explicit post-Tailwind override such as `:where(.bg-conic, [class*="bg-conic/"]) { --tw-gradient-from-position: 0%; }` while webpack fallback builds are still used for comparison. Reconsider it only after production browser QA confirms conic gradients render on the default Turbopack build and fallback webpack builds no longer emit `initial-value:0`.

## Agent skills

### Issue tracker

Issues and PRDs are tracked as local markdown files under `.scratch/<feature-slug>/`; external PRs are not a triage surface. See `docs/agents/issue-tracker.md`.

### Triage labels

The default labels are used except AFK-ready work is `yo-agent` and human-ready work is `yo-bob`. See `docs/agents/triage-labels.md`.

### Domain docs

This repo uses a single-context layout with root `CONTEXT.md` and root `docs/adr/`. See `docs/agents/domain.md`.
