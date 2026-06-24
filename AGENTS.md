## Learned User Preferences

- Persist browser preview CSS/Tailwind adjustments back into the generator's TSX (e.g., padding/breathing room).
- Prefer Base UI + existing design-system wrappers (e.g., `Switch`, `Autocomplete`, `FieldSet`) over native inputs in this codebase.
- When a "start corner" changes for clip-path curve generators, apply the full preset set of parameters (`from`, `destX/destY`, `ctrlX/ctrlY`) to avoid degenerate straight-line paths.
- **Always add a QA example to `app/components/component-demos.tsx` (and a sidebar link in `app/components/page.tsx` if not already present) whenever a new component is created or a major feature is added to an existing one.** For plugin-style features (e.g. carousel variants), add a labeled sub-example per variant inside the existing section rather than a new top-level section.
- Do not remove valid Tailwind v4.3 custom/arbitrary variant patterns as a stale-CSS workaround; restore the intended syntax and verify the CSS graph instead.

## Learned Workspace Facts

- This is a static Next.js 16 App Router site with MDX content, no database, no API routes, and no required environment variables.
- Canonical commands include `npm run dev`, `npm run lint`, `npm run build`, `npm run format`, and `npm run format:check`.
- `npm run build` produces the static site output, while `npm run dev:fresh` clears `.next` before starting dev.
- The clip-path curve generator closes the `shape()` using `vline` then `hline` (based on the chosen start corner coords).
- `ToggleGrid` preserves intended toggle styling by extending `ToggleGroup` context with `grid?: boolean`.
- Tailwind v4.3 custom variants such as `@stuck-top` are valid here; see **Known Bugs & Workarounds** for the Turbopack stale-CSS bug that makes errors persist past the fix.
- The optional Agentation development toolbar adds a large dev-only client graph and can make reloads feel heavier; it is not required for local development.
- `@vercel/analytics` and `@vercel/speed-insights` are no-ops locally and only activate on Vercel deployments.
- The homepage doubles as the About page at `/`; there is no separate `/about` route in the nav.
- `/oklch-colors` is heavier than many project routes because its MDX renders hundreds of color swatches/palette nodes plus a large inline SVG.
- Pixel icon morphing is implemented in `components/pixel-icon-morph.tsx` and is intentionally limited to `MorphablePixelIconName` icons from `components/icons-pixel.tsx`: 11x11 `createPixelIcon(...)` data icons with exactly 28 points. Non-28 data icons remain normal pixel icons but are excluded from `morphablePixelIconNames`.
- `PixelIconMorph` renders exactly 28 `motion.rect` elements. Parent components own interaction state and pass `active`; the component should not infer pressed/active state from parent DOM.
- Pixel morph pairing strategies are `match`, `nearest`, `reading`, `radial`, `scatter`, and `compress`; animation types are `linear`, `ease`, and `spring`. `match` is the default and should pin rects with identical coordinates before nearest-matching the remaining rects. Keep scatter/compress as strategies, not animation types, and avoid spring multi-keyframes for midpoint strategies.
- Pixel morph demos are post-specific: `components/demos/pixel-icon-morph-visualizer.tsx` renders directly in `app/posts/pixel-icons/page.tsx` without a `Demo` wrapper, while `components/demos/pixel-icon-morph-toggles.tsx` is wrapped in `Demo` on that post. Do not add these pixel morph demos to `app/components/component-demos.tsx` or the components sidebar unless explicitly requested.
- In the pixel morph visualizer, the left card contains the interactive icon, sequence dots, picker, and `CardAction` play/clear buttons; the right card contains controls. Use `ToggleGroup` for succinct controls and `Select` for more verbose ones to avoid truncation. Speed values are intentionally inverse duration labels: `1x` is 200ms, `0.5x` is 400ms, and `0.25x` is 800ms.

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
