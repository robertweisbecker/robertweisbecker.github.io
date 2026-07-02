# Plan 004: Refresh stale repo guidance

> **Executor instructions**: Follow this plan step by step. Run every verification command and confirm the expected result before moving to the next step. If anything in the "STOP conditions" section occurs, stop and report. When done, update the status row for this plan in `plans/README.md`.
>
> **Drift check (run first)**: `git diff --stat f87f0ad..HEAD -- README.md AGENTS.md app/private/qa app/api/letterboxd package.json` If any in-scope file changed since this plan was written, compare the "Current state" excerpts against the live code before proceeding; on a mismatch, treat it as a
> STOP condition.

## Status

- **Priority**: P2
- **Effort**: S
- **Risk**: LOW
- **Depends on**: `plans/001-add-verification-baseline.md`, `plans/002-reduce-build-and-bundle-cost.md`, `plans/003-cache-normalize-letterboxd-api.md`
- **Category**: docs / DX
- **Planned at**: commit `f87f0ad`, 2026-07-01

## Why this matters

This repo is frequently edited by agents. Stale repo instructions are not harmless: they can send future executors to deleted paths, cause them to miss the current API route, or make them expect a static export directory that the current config does not produce. Keep README and AGENTS aligned with
the actual App Router tree and package scripts.

Run this plan after Plan 002 and Plan 003 so documentation reflects the final route/build/API shape instead of intermediate private-route and Letterboxd states.

## Current state

- AGENTS points new component QA work at old `app/components/**` paths.

```md
<!-- AGENTS.md:6 -->

- **Always add a QA example to `app/components/component-demos.tsx` (and a sidebar link in `app/components/page.tsx` if not already present) whenever a new component is created or a major feature is added to an existing one.**
```

- The live QA surface is under `app/private/qa`.

```tsx
// app/private/qa/page.tsx:629-634
const QA_TOC: TocItem[] = [
  { id: "ui-components", text: "UI components", depth: 2 },
  ...UI_TOC_ITEMS.map((item) => ({ ...item, depth: 3 })),
  { id: "custom-components", text: "Custom components", depth: 2 },
  ...CUSTOM_TOC_ITEMS.map((item) => ({ ...item, depth: 3 })),
];
```

```tsx
// app/private/qa/component-demos.tsx:897-905
<Section title="Image Modal">
  <div className="max-w-md">
    <ImageModal src={forgeBeforeDemo} caption="Click the expand icon to view fullscreen." />

    <ImageModalDrawer src={forgeBeforeDemo} caption="Click the expand icon to view fullscreen." />
  </div>
</Section>

<Section title="Theme Settings" id="theme-settings">
```

- AGENTS says there are no API routes, but one exists.

```md
<!-- AGENTS.md:11 -->

- This is a static Next.js 16 App Router site with MDX content, no database, no API routes, and no required environment variables.
```

```ts
// app/api/letterboxd/route.ts:1-4
import { NextResponse } from "next/server";
import Parser from "rss-parser";

const LETTERBOXD_RSS_URL = "https://letterboxd.com/weisbecker/rss/";
```

- README says `npm run build` generates a static export to `out`, but the current Next config does not set `output: "export"` and the package script is now the default `next build`.

````md
<!-- README.md:20-24 -->

```
npm run build
```

Generates a static export to the `out` directory.
````

```json
// package.json:11-12
"build": "next build",
"build:webpack": "next build --webpack",
```

## Commands you will need

| Purpose      | Command                | Expected on success |
| ------------ | ---------------------- | ------------------- |
| Install      | `npm install`          | exit 0              |
| Typecheck    | `npm run typecheck`    | exit 0              |
| Check        | `npm run check`        | exit 0              |
| Lint         | `npm run lint`         | exit 0              |
| Format check | `npm run format:check` | exit 0              |

## Scope

**In scope**:

- `README.md`
- `AGENTS.md`

**Out of scope**:

- Changing source code to match old docs.
- Removing the Letterboxd API route.
- Moving QA back to `app/components`.
- Editing memory files outside this repo.
- Changing package scripts except if Plan 001 has not landed; in that case, STOP and ask whether to execute Plan 001 first.

## Git workflow

- Branch: `codex/004-refresh-repo-guidance`
- Commit message: `Refresh repo guidance`
- Do not push unless the operator asks.

## Steps

### Step 1: Fix QA path guidance in AGENTS

Update the QA preference in `AGENTS.md` to point at:

- `app/private/qa/component-demos.tsx` for custom component demos when running local development.
- `app/private/qa/page.tsx` for adding the TOC/sidebar entry in `CUSTOM_TOC_ITEMS` or `UI_TOC_ITEMS` when running local development.

Keep the existing plugin-style guidance about labeled sub-examples.

Also update the pixel morph exception line so it says not to add those post-specific demos to `app/private/qa/component-demos.tsx` or the private QA TOC unless explicitly requested.

If Plan 002 has landed, document that `/private/**` is a dev-only route tree and should not appear in production builds.

**Verify**:

```sh
rg -n "app/components|app/private/qa/component-demos|CUSTOM_TOC_ITEMS|UI_TOC_ITEMS" AGENTS.md
```

Expected: no stale `app/components` references remain, the current private QA paths are present, and dev-only private route behavior is documented if Plan 002 has landed.

### Step 2: Fix workspace facts in AGENTS

Update the workspace fact that says there are no API routes. Suggested replacement:

```md
- This is a mostly static Next.js 16 App Router site with MDX content, no database, and no required environment variables. The only current API route is `app/api/letterboxd/route.ts`, which backs the homepage Letterboxd widget.
```

Keep the webpack build fallback and Tailwind workaround sections intact.

**Verify**:

```sh
rg -n "no API routes|app/api/letterboxd|mostly static" AGENTS.md
```

Expected: no `no API routes` claim remains, and the Letterboxd API route is named.

### Step 3: Fix README build/setup language

Update README local development to include `npm install` before `npm run dev`.

Update the `npm run build` description to match the current script. Suggested wording:

```md
Builds the Next.js production output with the default Next/Turbopack build (`next build`).
```

Do not claim it writes `out` unless `next.config.ts` has been changed to `output: "export"` in a separate plan.

Optionally mention `npm run build:webpack` as the explicit fallback script documented in `AGENTS.md`.

Optionally add `npm run format:check` and, if Plan 001 has landed, `npm run typecheck` and `npm run check` to the README command list. Do not add `npm run test` unless the repo later adopts a test runner intentionally.

**Verify**:

```sh
rg -n "npm install|next build|build:webpack|out directory|typecheck|npm run check|npm run test" README.md
```

Expected: `npm install` and `next build` are present; `out directory` is absent unless a real static export was added elsewhere; `npm run test` is absent unless a test runner was intentionally added later.

### Step 4: Run verification

Run:

```sh
npm run typecheck
npm run check
npm run lint
npm run format:check
```

Expected: all exit 0.

## Test Plan

- Docs-only change, so no new tests.
- Verification is grep-based for stale strings plus the standard typecheck/test/lint/format gates.

## Done Criteria

- [ ] `AGENTS.md` points QA additions at `app/private/qa/component-demos.tsx`.
- [ ] `AGENTS.md` points sidebar/TOC additions at `app/private/qa/page.tsx` and names `CUSTOM_TOC_ITEMS` / `UI_TOC_ITEMS`.
- [ ] If Plan 002 has landed, `AGENTS.md` documents `/private/**` as dev-only and absent from production builds.
- [ ] `AGENTS.md` no longer claims there are no API routes.
- [ ] `README.md` no longer claims `npm run build` writes a static export to `out`.
- [ ] `README.md` mentions `npm install`.
- [ ] Grep verification in Steps 1-3 matches expected output.
- [ ] `npm run typecheck`, `npm run check`, `npm run lint`, and `npm run format:check` exit 0.
- [ ] No files outside the in-scope list are modified.
- [ ] `plans/README.md` status row for Plan 004 is updated.

## STOP Conditions

Stop and report if:

- `app/private/qa` no longer exists or has moved again.
- The repo has added `output: "export"` and README's `out` language is now correct.
- `app/api/letterboxd/route.ts` has been deleted before this plan starts.
- Plan 001 has not landed and the requested verification scripts do not exist.

## Maintenance Notes

Whenever a route or QA surface moves, update AGENTS in the same PR. This repo is agent-edited often enough that stale instructions are an execution risk, not just documentation debt.
