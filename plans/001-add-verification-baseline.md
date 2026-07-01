# Plan 001: Add a lightweight verification baseline

> **Executor instructions**: Follow this plan step by step. Run every verification command and confirm the expected result before moving to the next step. If anything in the "STOP conditions" section occurs, stop and report. When done, update the status row for this plan in `plans/README.md`.
>
> **Drift check (run first)**: `git diff --stat f87f0ad..HEAD -- package.json`
> If `package.json` changed since this plan was written, compare the "Current state" excerpt against the live code before proceeding; on a mismatch, treat it as a STOP condition.

## Status

- **Priority**: P1
- **Effort**: S
- **Risk**: LOW
- **Depends on**: none
- **Category**: DX
- **Planned at**: commit `f87f0ad`, 2026-07-01

## Why this matters

This repo is a personal design-engineering portfolio and playground for React, design systems, animation, and visual experiments. Broad unit/component test infrastructure would add more maintenance overhead than payoff right now. Lint warnings alone are still too narrow, though: TypeScript and production builds catch different failures in App Router routes, MDX imports, generated metadata, and component prop contracts. Add the smallest useful baseline: a named typecheck script and a single check script that runs the cheap non-mutating gates.

## Current state

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

Repo conventions to preserve:

- Use npm, not pnpm/yarn.
- Keep `npm run build` as the default `next build` Turbopack path. AGENTS.md documents that the forced webpack production path was retired after dependency updates, with `npm run build:webpack` retained for fallback testing.
- Do not add a test runner in this plan. For this repo, targeted browser QA plus typecheck/lint/build is the better default unless a specific pure function becomes painful to validate manually.

## Commands you will need

| Purpose | Command | Expected on success |
|---------|---------|---------------------|
| Install | `npm install` | exit 0 and dependencies installed |
| Typecheck | `npm run typecheck` | exit 0, no TypeScript errors |
| Check | `npm run check` | exit 0 after typecheck, lint, and format check |
| Production build | `npm run build` | exit 0 using the default Next/Turbopack build |
| Fallback build | `npm run build:webpack` | exit 0 when explicitly checking webpack fallback |

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

- [ ] `package.json` contains `typecheck`.
- [ ] `package.json` contains `check`.
- [ ] No test runner dependency was added.
- [ ] No test files were added.
- [ ] `npm run typecheck` exits 0.
- [ ] `npm run check` exits 0.
- [ ] `npm run build` exits 0.
- [ ] `npm run build:webpack` exits 0.
- [ ] No files outside `package.json` are modified.
- [ ] `plans/README.md` status row for Plan 001 is updated.

## STOP Conditions

Stop and report if:

- The script block in `package.json` no longer resembles the current-state excerpt.
- Typecheck exposes existing production errors unrelated to this plan.
- `npm run check` fails because existing files are not Prettier-formatted.
- The fix appears to require touching source files outside `package.json`.
- The operator asks for tests after all; that is a separate plan decision.

## Maintenance Notes

For this repo, default verification should stay lightweight: typecheck, lint, format check, and build. Add tests only when they replace real repeated manual work, such as a pure parser/generator that keeps regressing or a browser flow that is expensive to verify by hand.
