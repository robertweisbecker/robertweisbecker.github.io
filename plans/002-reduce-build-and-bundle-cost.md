# Plan 002: Reduce build and bundle cost

> **Executor instructions**: Follow this plan step by step. Run every verification command and confirm the expected result before moving to the next step. If anything in the "STOP conditions" section occurs, stop and report. When done, update the status row for this plan in `plans/README.md`.
>
> **Drift check (run first)**: `git diff --stat b72fe64..HEAD -- package.json next.config.ts tsconfig.json app/private app/playground components/header.tsx components/footer.tsx components/ui/button.tsx components/ui/link-button.tsx lib/data` If any in-scope file changed since Plan 001 merged, compare the current state against the live code before proceeding; on a mismatch, update this plan or stop and report.

## Status

- **Priority**: P1
- **Effort**: L
- **Risk**: MED
- **Depends on**: `plans/001-add-verification-baseline.md`
- **Category**: performance / DX
- **Planned at**: commit `f87f0ad`, 2026-07-01
- **Reconciled at**: commit `b72fe64`, 2026-07-01 (Plan 001 merged; dependency satisfied)

## Why this matters

Production build times are high for a personal portfolio/playground because local-only private routes, the monolithic public playground, and shared client boundaries all participate in the production route, type-check, and bundle graphs. The build output itself is not broken, but the current graph
shape makes every production build do more work than the public site needs.

The product decision is now explicit:

- `/private/**` is a local design-system/prototype harness and should not ship in production.
- `/playground` should stay public, but it can become a lightweight index plus focused child routes.
- Turbopack remains the default production build path; webpack scripts stay only as fallback comparison tools.

## Current state

- `package.json` has `typecheck`, `check`, `build`, and `build:webpack` after Plan 001 (`b72fe64`). This plan still adds `typecheck:build` and `analyze:build` for the trimmed production type graph.
- `next.config.ts` includes all `tsx` route convention files in every environment through `pageExtensions: ["js", "jsx", "md", "mdx", "ts", "tsx"]`.
- `app/private/**` contains QA and prototype pages that are useful locally but should not appear in production route output.
- `app/playground/page.tsx` is still one large public client page instead of route-level demo groups.
- The header/footer/shared UI graph should be audited for client-boundary leakage after the larger route graph is trimmed.

## Commands you will need

| Purpose                   | Command                                                                     | Expected on success                                     |
| ------------------------- | --------------------------------------------------------------------------- | ------------------------------------------------------- |
| Install                   | `npm install`                                                               | exit 0                                                  |
| Baseline build            | `rm -rf .next && npm run build`                                             | exit 0 and emits route diagnostics                      |
| Baseline type diagnostics | `npx tsc --noEmit --extendedDiagnostics --incremental false --pretty false` | exit 0 with timing summary                              |
| Full typecheck            | `npm run typecheck`                                                         | exit 0                                                  |
| Build graph typecheck     | `npm run typecheck:build`                                                   | exit 0                                                  |
| Lint                      | `npm run lint`                                                              | exit 0                                                  |
| Analyze build             | `npm run analyze:build`                                                     | prints top routes and gradient check                    |
| Production build          | `rm -rf .next && npm run build`                                             | exit 0                                                  |
| Fallback comparison       | `npm run build:webpack`                                                     | exit 0 only when explicitly comparing fallback behavior |

## Scope

**In scope**:

- `package.json`
- `next.config.ts`
- `tsconfig.build.json` (create)
- `scripts/analyze-build.mjs` or similar repo-local analyzer (create)
- `app/private/**` route convention file names
- `app/playground/**`
- `components/playground/**` (create)
- Header/footer/shared client-boundary files needed to reduce shared first-load JS
- `plans/README.md` status update

**Out of scope**:

- Adding a test runner.
- Setting `typescript.ignoreBuildErrors`.
- Making webpack the default build path.
- Removing SVG/icon assets.
- Removing `/playground` from the public site.
- Changing visual design beyond the minimum needed to split pages cleanly.
- Implementing Plan 003 Letterboxd cache work.
- Final README/AGENTS cleanup; leave that to Plan 004 after this plan lands.

## Git workflow

- Branch: `codex/002-reduce-build-and-bundle-cost`
- Suggested commits:
  1. `Add build diagnostics`
  2. `Make private routes dev-only`
  3. `Split playground demos`
  4. `Reduce shared client graph`
- Do not push unless the operator asks.

## Steps

### Step 1: Ensure the verification baseline exists

If Plan 001 has not landed, execute it first or include its scripts in the first commit:

```json
"typecheck": "tsc --noEmit --incremental false --pretty false",
"check": "npm run typecheck && npm run lint && npm run format:check"
```

Then add build-specific scripts:

```json
"typecheck:build": "tsc --noEmit --project tsconfig.build.json --incremental false --pretty false",
"analyze:build": "node scripts/analyze-build.mjs"
```

Create `scripts/analyze-build.mjs` to:

- Read `.next/diagnostics/route-bundle-stats.json`.
- Print route count.
- Print top first-load JS routes.
- Search emitted `.next/static/**/*.css` for `--tw-gradient-from-position` and report whether the default build emits `initial-value:0%`.

Keep the analyzer dependency-free.

**Verify**:

```sh
npm run typecheck
npm run lint
```

### Step 2: Capture a baseline

Run and save the output in the PR/handoff notes:

```sh
rm -rf .next && npm run build
npm run analyze:build
npx tsc --noEmit --extendedDiagnostics --incremental false --pretty false
```

Record:

- Compile time.
- TypeScript/checking time.
- Static route count.
- Top first-load JS routes.
- Whether emitted CSS preserves `initial-value:0%`.

Do not optimize until the baseline is captured.

### Step 3: Make private routes dev-only

Rename route convention files under `app/private/**` from:

- `page.tsx` to `page.private.tsx`
- `layout.tsx` to `layout.private.tsx`

Update `next.config.ts` so `.private.tsx` route convention files are included only in development. Keep ordinary `tsx` route files included in every environment.

Add `tsconfig.build.json` extending `tsconfig.json` and excluding:

```json
"exclude": ["app/private/**/*"]
```

Set `typescript.tsconfigPath` in `next.config.ts` so production builds type-check the production graph through `tsconfig.build.json`. Do not set `ignoreBuildErrors`.

Keep full local type coverage through `npm run typecheck`, which should still use `tsconfig.json`.

**Verify**:

```sh
npm run typecheck
npm run typecheck:build
rm -rf .next && npm run build
npm run analyze:build
```

Expected:

- `npm run typecheck` covers the full repo, including private files.
- `npm run typecheck:build` excludes `app/private/**/*`.
- Production route output and route bundle diagnostics contain no `/private/**` routes.
- `npm run dev` still serves `/private/qa`.

### Step 4: Split the public playground

Convert `/playground` into a lightweight server-rendered index page.

Create focused child routes:

- `/playground/motion`
- `/playground/controls`
- `/playground/frames`
- `/playground/feedback`
- `/playground/visual-details`

Move demo groups from the current monolithic `app/playground/page.tsx` into category-scoped client islands under `components/playground/`.

Use dynamic imports for heavy demos inside their category pages when they are not immediately needed for initial render, especially:

- Site search demo.
- Video or media-heavy demo sections.
- DVD animation.
- Card fan.
- Browser/device previews.
- MotionText playground.
- Emoji feedback.

Preserve public routes through internal links from `/playground`.

**Verify**:

```sh
npm run lint
npm run typecheck
npm run typecheck:build
rm -rf .next && npm run build
npm run analyze:build
```

Browser-check:

- `/playground`
- `/playground/motion`
- `/playground/controls`
- `/playground/frames`
- `/playground/feedback`
- `/playground/visual-details`

### Step 5: Reduce shared client graph leakage

After route trimming and playground splitting are validated, inspect the new route-bundle stats before touching shared chrome.

Then reduce shared client boundaries conservatively:

- Extract `buttonVariants` into a server-safe module used by both `Button` and `LinkButton`.
- Convert `Header` and `Footer` shells to server components if feasible.
- Keep small client islands for work menu interaction, theme controls, active-path behavior, search, and scroll-to-top.
- Replace header `useMediaQuery` sizing with responsive CSS classes where behavior is only layout.
- Pass minimal serialized project menu data into header client islands instead of importing full project/post data inside a broad client boundary.
- Lazy-load `ThemeSettingsPopover` behind a lightweight trigger if it currently contributes meaningfully to the shared graph.

Do not combine this with visual redesign.

**Verify**:

```sh
npm run lint
npm run typecheck
npm run typecheck:build
rm -rf .next && npm run build
npm run analyze:build
```

Browser-check:

- `/`
- `/posts`
- One MDX post with table of contents.
- `/playground`
- Each playground child route.
- Header work menu, theme popover, search, and scroll-to-top.

### Step 6: Compare against baseline and update status

Compare final metrics to the Step 2 baseline:

- Production route count should drop from about 57 to roughly 44.
- Public non-playground first-load JS should trend below 1 MB uncompressed.
- `/playground` index should trend below 800 KB.
- Each playground child route should trend below 1.3 MB.
- Production TypeScript phase should trend below 45s on the same machine.
- Compile phase should trend below 40s on the same machine.

Treat these as optimization targets, not automatic failure conditions. If a target is missed, report the remaining top routes/modules and stop before starting unrelated refactors.

Update the row for Plan 002 in `plans/README.md`.

## Test Plan

- No test runner.
- Required verification:

```sh
npm run lint
npm run typecheck
npm run typecheck:build
npm run check
rm -rf .next && npm run build
npm run analyze:build
```

- Browser smoke checks:
  - `/`
  - `/posts`
  - One post page with TOC
  - `/playground`
  - Each playground child route
  - `npm run dev` + `/private/qa`

## Done Criteria

- [ ] `typecheck:build` exists and uses `tsconfig.build.json`.
- [ ] `analyze:build` exists and reports route count, top route bundles, and conic-gradient CSS output.
- [ ] `/private/**` routes are absent from production build output.
- [ ] `/private/qa` still works in `npm run dev`.
- [ ] Full `npm run typecheck` still covers private files.
- [ ] `/playground` is a lightweight public index.
- [ ] Playground child routes exist and render.
- [ ] Shared first-load JS is reduced from baseline or remaining blockers are documented.
- [ ] Turbopack remains the default `npm run build`.
- [ ] Webpack fallback scripts still exist.
- [ ] `npm run lint`, `npm run typecheck`, `npm run typecheck:build`, `npm run check`, `npm run build`, and `npm run analyze:build` exit 0.
- [ ] No SVG/icon assets were removed.
- [ ] `plans/README.md` status row for Plan 002 is updated.

## STOP Conditions

Stop and report if:

- Next does not support the conditional `pageExtensions` strategy for dev-only `.private.tsx` route files.
- `.private.tsx` files still appear in production route diagnostics.
- `typescript.tsconfigPath` does not work for the production build path.
- Private files disappear from full local `npm run typecheck`.
- Splitting `/playground` requires redesigning demo behavior rather than moving existing groups.
- Header/Footer server conversion changes visible navigation, theme, search, or scroll behavior in a way that cannot be fixed locally.
- Build metrics regress materially after a step and the analyzer does not identify a clear cause.

## Maintenance Notes

The superseded robots-only plan is retained as `plans/005-superseded-private-route-robots-layout.md` for history, but do not execute it. Noindex metadata is weaker than removing local-only routes from the production graph and does not solve the build-time issue.
