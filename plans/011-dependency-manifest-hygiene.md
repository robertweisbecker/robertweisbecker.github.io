# Plan 011: Fix dependency manifest misclassifications and stale overrides

> **Executor instructions**: Follow this plan step by step. Run every
> verification command and confirm the expected result before moving to the
> next step. If anything in the "STOP conditions" section occurs, stop and
> report — do not improvise. When done, update the status row for this plan
> in `plans/README.md` — unless a reviewer dispatched you and told you they
> maintain the index.
>
> **Drift check (run first)**:
> `git diff --stat 9088a10..HEAD -- package.json package-lock.json`
> If the manifest changed since this plan was written, re-read it and adapt;
> if a dependency this plan moves/removes is gone already, skip that step.

## Status

- **Priority**: P2
- **Effort**: S
- **Risk**: LOW
- **Depends on**: [plans/010-dead-code-sweep.md](./010-dead-code-sweep.md) (touches the same two files;
  land [010](./010-dead-code-sweep.md) first to avoid conflicts — not a hard logical dependency)
- **Category**: migration / deps
- **Planned at**: commit `9ed1acd`, 2026-07-02
- **Reconciled at**: commit `9088a10`, 2026-07-02 — Plan 010 removed
  `@gravity-ui/icons` entirely and replaced its imports with Tabler icons.
  This plan must keep Gravity absent, not reclassify it.

## Why this matters

The manifest still misstates what production needs after Plan 010:
`@types/mdx` is a compile-time type package shipped as a runtime dependency;
`components/ui/carousel.tsx` imports types from `embla-carousel`, which is not
declared directly and only resolves via hoisting; and the `overrides` block
pins `postcss` to 8.5.12 — _below_ the `^8.5.15` minimum that
`@tailwindcss/postcss@4.3.2` declares — while the `hono`/`qs` overrides affect
only the dev-only `shadcn` CLI subtree and are undocumented. Plan 010 already
removed the extra Gravity icon package, so this plan must not reintroduce it.

## Current state

- `package.json` (as of `9088a10`):
  - Line 31: `"@types/mdx": "^2.0.13"` under `dependencies`.
  - Lines 40–42: `embla-carousel-autoplay` / `-fade` / `-react` all
    `"^9.0.0-rc02"` under `dependencies`; no direct `embla-carousel` entry.
  - Lines 72–76: `"overrides": { "hono": "4.12.27", "postcss": "8.5.12", "qs": "6.15.2" }`.
- `@gravity-ui/icons` is no longer present in `package.json` or source after
  [plan 010](./010-dead-code-sweep.md); keep it absent.
- Type-only import of the undeclared core package:
  `components/ui/carousel.tsx:4` —
  `import type { EmblaCarouselType, EmblaOptionsType, EmblaPluginType } from "embla-carousel";`
- `mdx-components.tsx:16` — `import type { MDXComponents } from "mdx/types";`
  (the compile-time consumer of `@types/mdx`).
- `hono` and `qs` reach the tree only via
  `shadcn` (devDependency CLI) → `@modelcontextprotocol/sdk` → `hono`, and
  `express` → `qs` in the same dev subtree. No production path.
- AGENTS.md documents nothing about why the overrides exist.

## Commands you will need

| Purpose    | Command                                   | Expected on success          |
| ---------- | ----------------------------------------- | ---------------------------- |
| Install    | `npm install`                             | exit 0, lockfile updated     |
| Dep audit  | `npm audit --audit-level=high --omit=dev` | "found 0 vulnerabilities"    |
| Resolution | `npm ls postcss embla-carousel`           | expected versions, no errors |
| All checks | `npm run check`                           | exit 0                       |
| Prod build | `npm run build`                           | exit 0                       |

## Scope

**In scope** (the only files you should modify):

- `package.json`
- `package-lock.json` (via `npm install` only — never hand-edit)
- `AGENTS.md` (one line documenting the overrides decision, Step 4)
- `plans/README.md` (status row)

**Out of scope** (do NOT touch, even though they look related):

- Upgrading/downgrading `embla-carousel-*` versions — the RC-pin question is
  deliberately deferred (no stable 9.x exists yet; see index).
- `components/ui/carousel.tsx` or any source file — this is manifest-only.
- Removing `balloons-js` / `@shadcn/react` — that is [plan 010](./010-dead-code-sweep.md).
- Re-adding or moving `@gravity-ui/icons` — Plan 010 intentionally removed it.
- The `prettier` exact pin — intentional ([plan 001](./001-add-verification-baseline.md) decision).

## Git workflow

- Branch: `cursor/011-manifest-hygiene` from `master` (after [plan 010](./010-dead-code-sweep.md) merges,
  or rebase on its branch if directed).
- One commit, e.g. "Fix dependency classifications and postcss override".
- Do NOT push or open a PR unless the operator instructed it.

## Steps

### Step 1: Reclassify the misplaced MDX types package

In `package.json`:

1. Move `"@types/mdx": "^2.0.13"` from `dependencies` to
   `devDependencies`.
2. Confirm `"@gravity-ui/icons"` is absent from both dependency blocks. Do
   not re-add it.

Keep both blocks alphabetically sorted (they currently are).

**Verify**: `npm install` → exit 0. `npm run typecheck:build` → exit 0
(confirms MDX types still resolve from devDependencies).

### Step 2: Declare the direct embla-carousel dependency

Add `"embla-carousel": "^9.0.0-rc02"` to `dependencies` (same version line
as the three sibling packages).

**Verify**: `npm install` → exit 0. `npm ls embla-carousel` → shows a single
resolved `9.0.0-rc02` (deduped), no version conflict.

### Step 3: Fix the postcss override; remove the dev-only ones

In the `overrides` block:

1. Remove the `"postcss": "8.5.12"` override entirely (let
   `@tailwindcss/postcss`'s own `^8.5.15` range resolve), OR if removal
   yields multiple conflicting postcss majors in `npm ls postcss`, set the
   override to `"^8.5.15"` instead.
2. Remove `"hono"` and `"qs"` overrides (they only pin a dev-only CLI
   subtree). If the `overrides` object becomes empty, delete the key.

Run `npm install`, then:

```bash
npm ls postcss
npm audit --audit-level=high --omit=dev
npm audit --audit-level=high
```

The runtime audit (with `--omit=dev`) MUST stay clean. If the full audit
(dev included) reports new high advisories on `hono`/`qs`, restore ONLY the
specific override(s) needed and note which advisory forced it.

**Verify**: `npm ls postcss` → resolved version ≥ 8.5.15;
`npm audit --audit-level=high --omit=dev` → 0 vulnerabilities.

### Step 4: Document the overrides decision

In `AGENTS.md` under "Learned Workspace Facts", add one line stating the
current overrides policy — either "the `overrides` block was removed on
<date>; postcss resolves via @tailwindcss/postcss's range" or, if Step 3
restored any override, which advisory requires it.

**Verify**: `npm run format:check` → exit 0.

### Step 5: Full verification

**Verify**: `npm run check` → exit 0. `npm run build` → exit 0. Optional:
`npm run analyze:build` → no `initial-value:0` warning (Turbopack path).

## Test plan

No unit tests by policy. The gates are: install resolution (`npm ls`),
runtime audit clean, typecheck (both graphs), and a production build —
which exercises the postcss/Tailwind pipeline the override change touches.

## Done criteria

Machine-checkable. ALL must hold:

- [ ] `node -e "const p=require('./package.json'); process.exit(p.devDependencies['@types/mdx'] && p.dependencies['embla-carousel'] && !p.dependencies['@types/mdx'] && !p.dependencies['@gravity-ui/icons'] && !p.devDependencies['@gravity-ui/icons'] ? 0 : 1)"` exits 0
- [ ] `npm ls postcss` resolves ≥ 8.5.15 with no invalid/conflict markers
- [ ] `npm audit --audit-level=high --omit=dev` reports 0 vulnerabilities
- [ ] `npm run check` exits 0 and `npm run typecheck:build` exits 0
- [ ] `npm run build` exits 0
- [ ] AGENTS.md notes the overrides decision
- [ ] No files outside the in-scope list are modified (`git status`)
- [ ] `plans/README.md` status row updated

## STOP conditions

Stop and report back (do not improvise) if:

- Removing the postcss override changes CSS output (compare a spot-check of
  `.next/static/chunks/*.css` for the `@property --tw-gradient-from-position`
  block per AGENTS.md Known Bugs — it must keep `initial-value:0%`).
- `npm install` after any step reports peer-dependency errors (not warnings).
- The full `npm audit` (dev included) shows a high advisory that the removed
  `hono`/`qs` overrides were masking AND restoring the override doesn't
  silence it.

## Maintenance notes

- When embla-carousel ships a stable 9.0.0, bump all FOUR embla entries
  together (the three plugins plus the new direct core entry) and QA project
  carousels with fade + autoplay. That upgrade was deliberately kept out of
  this plan.
- Reviewer: the diff should touch only `package.json`, `package-lock.json`,
  `AGENTS.md` (one line), and the plans index.
