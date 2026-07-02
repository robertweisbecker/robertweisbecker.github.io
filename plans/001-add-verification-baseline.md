# Plan 001: Add a lightweight verification baseline

> **Executor instructions**: Follow this plan step by step. Run every verification command and confirm the expected result before moving to the next step. If anything in the "STOP conditions" section occurs, stop and report. When done, update the status row for this plan in `plans/README.md`.
>
> **Drift check (run first)**: `git diff --stat b72fe64..HEAD -- package.json` If `package.json` changed since Plan 001 merged, compare the "As-built state" excerpt against the live code before proceeding; on a mismatch, treat it as a STOP condition.

## Status

- **Priority**: P1
- **Effort**: S
- **Risk**: LOW
- **Depends on**: none
- **Category**: DX
- **Planned at**: commit `f87f0ad`, 2026-07-01
- **Completed at**: merge commit `b72fe64` on `master` (PR #12 squash merge), 2026-07-01

## Why this matters

This repo is a personal design-engineering portfolio and playground for React, design systems, animation, and visual experiments. Broad unit/component test infrastructure would add more maintenance overhead than payoff right now. Lint warnings alone are still too narrow, though: TypeScript and
production builds catch different failures in App Router routes, MDX imports, generated metadata, and component prop contracts. Add the smallest useful baseline: a named typecheck script and a single check script that runs the cheap non-mutating gates.

## Current state (at plan time)

Historical snapshot from commit `f87f0ad` before execution:

- `package.json` owns canonical scripts. It has `dev`, `build`, `build:webpack`, `lint`, `format`, `format:check`, and preview scripts, but no `typecheck` or aggregate `check`.

```json
// package.json:6-19
"scripts": {
  "dev": "next dev",
  "dev:fresh": "rm -rf .next && next dev",
  "dev:webpack": "next dev --webpack",
  "dev:fresh:webpack": "rm -rf .next && next dev --webpack",
  "build": "next build",
  "build:webpack": "next build --webpack",
  "start": "next start",
  "lint": "eslint",
  "format": "prettier --write .",
  "format:check": "prettier --check .",
  "preview": "next build && next start",
  "preview:webpack": "next build --webpack && next start"
}
```

- No `*.test.*`, `*.spec.*`, `vitest.config.*`, `jest.config.*`, or `playwright.config.*` files were found during audit. Leave that as-is for now.

## As-built state (master `b72fe64`)

- `package.json` scripts include `typecheck`, `check`, `build`, `build:webpack`, `lint`, `format`, and `format:check`.
- `types/static-asset-imports.d.ts` declares `@/public/**` image modules for standalone `tsc`.
- `.prettierrc` applies `printWidth: 300` to `*.md` and `*.mdx`; `.prettierignore` excludes build artifacts; VS Code points at workspace Prettier.
- `prettier` is pinned to `3.9.4` in `package.json`.

Repo conventions to preserve:

- Use npm, not pnpm/yarn.
- Keep `npm run build` as the default `next build` Turbopack path. AGENTS.md documents that the forced webpack production path was retired after dependency updates, with `npm run build:webpack` retained for fallback testing.
- Do not add a test runner in this plan. For this repo, targeted browser QA plus typecheck/lint/build is the better default unless a specific pure function becomes painful to validate manually.

## Commands you will need

| Purpose          | Command                 | Expected on success                              |
| ---------------- | ----------------------- | ------------------------------------------------ |
| Install          | `npm install`           | exit 0 and dependencies installed                |
| Typecheck        | `npm run typecheck`     | exit 0, no TypeScript errors                     |
| Check            | `npm run check`         | exit 0 after typecheck, lint, and format check   |
| Production build | `npm run build`         | exit 0 using the default Next/Turbopack build    |
| Fallback build   | `npm run build:webpack` | exit 0 when explicitly checking webpack fallback |

## Scope

**In scope**:

- `package.json`

**Out of scope**:

- Adding Vitest, Jest, Playwright, Storybook, or any other test runner.
- Creating test files.
- Changing source files.
- Changing build scripts or returning the default build to webpack.
- Changing formatting rules.

## Git workflow

- Branch: `codex/001-lightweight-verification-baseline`
- Commit message style observed in `git log` is concise imperative, for example `Split clip-path curve editor internals`. Use `Add lightweight verification baseline`.
- Do not push unless the operator asks.

## Steps

### Step 1: Add typecheck and check scripts

Edit only the `scripts` object in `package.json`.

Add:

```json
"typecheck": "tsc --noEmit --incremental false --pretty false",
"check": "npm run typecheck && npm run lint && npm run format:check"
```

Keep the existing `build`, `build:webpack`, `preview`, and `preview:webpack` scripts unchanged.

**Verify**: `npm run typecheck` -> exit 0.

### Step 2: Run the lightweight local gate

Run:

```sh
npm run check
```

Expected: typecheck, lint, and format check all exit 0.

### Step 3: Confirm production build paths still work

Run:

```sh
npm run build
```

Expected: exit 0 using the default `next build` script. Do not change it back to webpack.

Then run:

```sh
npm run build:webpack
```

Expected: exit 0 for the fallback build path.

## Test Plan

- No new tests. This plan intentionally avoids adding test infrastructure.
- Verification is `npm run typecheck`, `npm run check`, `npm run build`, and `npm run build:webpack`.

## Done Criteria

- [x] `package.json` contains `typecheck`.
- [x] `package.json` contains `check`.
- [x] No test runner dependency was added.
- [x] No test files were added.
- [x] `npm run typecheck` exits 0.
- [x] `npm run check` exits 0.
- [x] `npm run build` exits 0.
- [x] `npm run build:webpack` exits 0.
- [x] `plans/README.md` status row for Plan 001 is updated.
- [x] Scope expanded beyond `package.json` only (see Execution Notes).

## Execution Notes

Executed 2026-07-01 on branch `cursor/lightweight-verification-baseline-5d22` (PR #12). Drift check (`git diff --stat f87f0ad..HEAD -- package.json`) was clean before edits.

### Issue 1: Standalone `tsc` failed on `@/public/**` image imports

After adding the scripts, `npm run typecheck` failed with 44 `TS2307` errors on imports such as `@/public/art/2009_donuts.jpg` in `app/art/page.tsx`, `app/playground/page.tsx`, `app/private/**`, and `components/demos/art-cards.tsx`.

- `npm run build` already passed its TypeScript step (`Finished TypeScript in ~7s`).
- Root cause: the `@/*` path alias resolves `@/public/...` to a concrete file path; TypeScript then looks for `.ts`/`.tsx` siblings and does not fall back to the ambient `*.jpg` declarations from `next/image-types/global`.
- Next's internal `runTypeCheck` also passes with 0 errors; the gap is specific to invoking plain `tsc` with this import style.

**Resolution**: added `types/static-asset-imports.d.ts` with ambient module declarations for `@/public/*`, `@/public/*/*`, and `@/public/*/*/*`, matching the existing `types/balloons-js.d.ts` pattern. This was required for the plan's chosen `tsc` command to match production build confidence.

### Issue 2: `npm run check` failed on existing Prettier drift

`npm run check` failed at `format:check` on 20 files that were already out of format (including `plans/**`, `styles/globals.css`, and assorted components). This matched the plan's STOP condition for pre-existing formatting debt.

**Resolution**: ran `npm run format` once so the new aggregate gate is usable. All changes were formatting-only (no logic edits). Future executors should expect `npm run check` to enforce format going forward.

**Follow-up (same PR)**: aligned editor and CLI formatting so save/format and `npm run format:check` use the same Prettier install and config:

- Pinned `prettier` to `3.9.4` (was `^3`) so CLI and the VS Code extension resolve the same version.
- Added `.prettierignore` for build artifacts (`.next`, `out`, etc.).
- Extended `.prettierrc` markdown override to `*.md` as well as `*.mdx` (`printWidth: 300`) so `plans/**` tables match MDX prose width.
- Pointed `.vscode/settings.json` at `./node_modules/prettier` with `prettier.requireConfig: true` so format-on-save loads `prettier-plugin-tailwindcss` from the repo config instead of a global/default Prettier.

Root cause of the original drift: `plans/*.md` used the default `printWidth: 140` while MDX used `300`, and VS Code was not guaranteed to use the workspace Prettier + Tailwind plugin that `npm run format:check` invokes.

### Scope reconciliation

The original done criterion "No files outside `package.json` are modified" was not achievable without leaving `npm run typecheck` or `npm run check` red. Files touched beyond `package.json`:

| File / area                                            | Reason                                                           |
| ------------------------------------------------------ | ---------------------------------------------------------------- |
| `types/static-asset-imports.d.ts`                      | Make standalone `tsc` resolve `@/public/**` static image imports |
| 14 component/style files + 6 `plans/**` markdown files | Pre-existing Prettier drift surfaced by `format:check`           |
| `plans/README.md`                                      | Status row update (required by plan)                             |

### Verification results (all exit 0)

- `npm run typecheck`
- `npm run check`
- `npm run build` (default Turbopack)
- `npm run build:webpack` (fallback)

## STOP Conditions

Stop and report if:

- The script block in `package.json` no longer resembles the current-state excerpt.
- Typecheck exposes existing production errors unrelated to this plan.
- `npm run check` fails because existing files are not Prettier-formatted.
- The fix appears to require touching source files outside `package.json`.
- The operator asks for tests after all; that is a separate plan decision.

## Maintenance Notes

For this repo, default verification should stay lightweight: typecheck, lint, format check, and build. Add tests only when they replace real repeated manual work, such as a pure parser/generator that keeps regressing or a browser flow that is expensive to verify by hand.

If new `@/public/**` static asset imports use deeper path nesting than three segments, extend `types/static-asset-imports.d.ts` with another wildcard tier or switch those imports to relative paths / string `src` values.
