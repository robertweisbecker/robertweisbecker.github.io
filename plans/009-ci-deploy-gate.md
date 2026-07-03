# Plan 009: Add a CI gate that runs check + build on every push

> **Executor instructions**: Follow this plan step by step. Run every
> verification command and confirm the expected result before moving to the
> next step. If anything in the "STOP conditions" section occurs, stop and
> report — do not improvise. When done, update the status row for this plan
> in `plans/README.md` — unless a reviewer dispatched you and told you they
> maintain the index.
>
> **Drift check (run first)**:
> `git diff --stat 9088a10..HEAD -- package.json README.md .github/`
> If any in-scope file changed since this plan was written, compare the
> "Current state" excerpts against the live code before proceeding; on a
> mismatch, treat it as a STOP condition.

## Status

- **Priority**: P1
- **Effort**: S
- **Risk**: LOW
- **Depends on**: none
- **Category**: dx
- **Planned at**: commit `9ed1acd`, 2026-07-02
- **Reconciled at**: commit `9088a10`, 2026-07-02 — Plan 010 changed
  dependencies only; the verification scripts and empty `.github/workflows/`
  state still match this plan.
- **Reconciled at**: commit `61bf9081`, 2026-07-02 — DONE. The workflow now
  exists at `.github/workflows/check.yml` and runs `npm ci`,
  `npm run check`, and `npm run build`.

## Why this matters

Nothing enforces the repo's verification baseline before deploy. The
`.github/workflows/` directory exists but is empty; Vercel deploys `master`
on push and only runs `next build`. Two gaps follow: (1) Next.js 16 removed
automatic ESLint during `next build`, so lint violations deploy silently;
(2) `npm run check` (typecheck + lint + format) covers the full graph
including dev-only `/private/**` code, but is opt-in — errors there rot until
someone runs it locally. A single GitHub Actions workflow closes both gaps
and gives every push/PR a pass/fail signal. This should land before the
larger refactor plans ([017](./017-server-client-boundaries.md), [018](./018-mdx-registry-splitting.md)) so their changes are gated.

## Current state

Current state as of `61bf9081`: this plan is done. The workflow exists:

```yaml
name: Check

on:
  push:
    branches: [master]
  pull_request:

concurrency:
  group: check-${{ github.ref }}
  cancel-in-progress: true

jobs:
  check:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 24
          cache: npm
      - run: npm ci
      - run: npm run check
      - run: npm run build
```

- Historical state at planning time: `.github/workflows/` existed but
  contained no files. This no longer applies as of `61bf9081`.
- `package.json` scripts (lines 6–23): `"build": "next build"` (line 11),
  `"lint": "eslint --cache --cache-location .next/cache/eslint/"` (line 14),
  `"typecheck"` (line 15),
  `"check": "npm run typecheck && npm run lint && npm run format:check"`
  (line 17).
- `next.config.ts:18-20` — production TypeScript uses `tsconfig.build.json`
  with no `ignoreBuildErrors`, so build-graph TS errors already fail deploy.
  The gap is lint, format, and full-graph (dev-route) typecheck.
- `README.md` — "Local Development" section documents scripts (lines 12–66)
  but does not mention that deploy only enforces `build`; also omits
  `typecheck:build`, `analyze:build`, and `dev:fresh` (documented canonical
  in `AGENTS.md`).
- Deployment: Vercel on push to `master` (`README.md:70`). No test runner
  exists by policy (`plans/README.md` dependency notes) — the workflow must
  NOT add one.
- Node version: no `.nvmrc` or `engines` field exists; `@types/node` is
  `^26.0.1`, so use Node 24 (current LTS line compatible with Next 16) in CI.

## Commands you will need

| Purpose            | Command                         | Expected on success |
| ------------------ | ------------------------------- | ------------------- |
| Install (CI-style) | `npm ci`                        | exit 0              |
| All checks         | `npm run check`                 | exit 0              |
| Prod build         | `npm run build`                 | exit 0              |
| Workflow lint      | `gh workflow list` (after push) | workflow listed     |

## Scope

**In scope** (the only files you should modify or create):

- `.github/workflows/check.yml` (create)
- `README.md` (document the gate + missing scripts)
- `plans/README.md` (status row)

**Out of scope** (do NOT touch, even though they look related):

- `package.json` — do not chain lint into `build` (Vercel build minutes and
  local `npm run build` stay lean; CI is the gate).
- Husky / lint-staged / pre-commit hooks — heavier than wanted for a
  single-maintainer repo; CI is the chosen mechanism.
- Adding a test runner or test step — explicitly against repo policy.
- Vercel project settings (e.g. "require checks before deploy") — cannot be
  configured from this repo; note it in the report as an optional manual
  follow-up for the maintainer.

## Git workflow

- Branch: `cursor/009-ci-deploy-gate` from `master`.
- One commit, e.g. "Add CI workflow running check and build".
- Do NOT push or open a PR unless the operator instructed it. (Note: the
  workflow can only be observed running after a push.)

## Steps

### Step 1: Create the workflow

Create `.github/workflows/check.yml`:

```yaml
name: Check

on:
  push:
    branches: [master]
  pull_request:

concurrency:
  group: check-${{ github.ref }}
  cancel-in-progress: true

jobs:
  check:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 24
          cache: npm
      - run: npm ci
      - run: npm run check
      - run: npm run build
```

Notes: the default branch is `master` (not `main`) — verify with
`git branch --show-current` / `git remote show origin` before committing.
`npm run check` runs the FULL-graph typecheck (`tsconfig.json`), which
includes `/private/**` dev routes — that is intentional.

**Verify**: if a YAML parser is already available, use it. Do not add a
package only for workflow linting. PyYAML is not installed in this repo's
current local environment, so this stdlib-safe structural check is acceptable:

```bash
node -e "const fs=require('fs'); const y=fs.readFileSync('.github/workflows/check.yml','utf8'); for (const s of ['name: Check','pull_request:','branches: [master]','npm ci','npm run check','npm run build']) { if (!y.includes(s)) process.exit(1); }"
```

Expected: exit 0.

### Step 2: Run the same gate locally to prove it passes

```bash
npm ci && npm run check && npm run build
```

If `npm ci` fails only with an `EPERM`/permission error inside the user's
global npm cache (for example `~/.npm/_cacache/tmp/...`), treat that as local
machine cache ownership drift, not lockfile drift. Re-run the install once
with a repo-local ignored cache:

```bash
npm_config_cache=.next/cache/npm npm ci && npm run check && npm run build
```

If `npm run check` fails on pre-existing violations, fix ONLY formatting via
`npm run format` (formatting-only diffs are acceptable — precedent: [plan 001](./001-add-verification-baseline.md)
did exactly this). For lint or type errors, STOP and report instead of fixing
unrelated code.

**Verify**: all three commands exit 0.

### Step 3: Document the gate in README

In `README.md`, add to the Local Development section:

1. A short note after the `npm run check` entry: CI runs
   `npm run check && npm run build` on every push and PR; Vercel deploys
   independently, so a red check means master deployed unverified — fix
   forward.
2. Entries for the missing canonical scripts, matching the existing format:
   `npm run typecheck:build` (build-graph typecheck), `npm run analyze:build`
   (build output diagnostics), `npm run dev:fresh` (clears `.next` first).

**Verify**: `npm run format:check` → exit 0 (README formatting).

## Test plan

No unit tests by policy. The workflow itself is the test: after the branch is
pushed (operator's call), confirm the "Check" workflow appears and passes via
`gh run list --workflow=check.yml --limit 1`. Locally, Step 2 is the
equivalent evidence.

## Done criteria

Machine-checkable. ALL must hold:

- [ ] `.github/workflows/check.yml` exists and parses as valid YAML
- [ ] `npm run check` exits 0 locally
- [ ] `npm run build` exits 0 locally
- [ ] README documents CI gate + `typecheck:build`, `analyze:build`, `dev:fresh`
- [ ] No files outside the in-scope list are modified (`git status`)
- [ ] `plans/README.md` status row updated

## STOP conditions

Stop and report back (do not improvise) if:

- `npm run check` fails locally with lint or TypeScript errors (not
  formatting) — the baseline is broken and must be reported, not patched
  around inside this plan.
- The default branch turns out not to be `master`.
- `npm ci` fails for lockfile drift — report; do not `npm install` to
  regenerate the lockfile inside this plan. If the only failure is global npm
  cache permissions, use the repo-local cache retry documented in Step 2.

## Maintenance notes

- When plans [017](./017-server-client-boundaries.md)/[018](./018-mdx-registry-splitting.md) (bundle refactors) land, this workflow is the guard
  rail; keep `npm run build` in it even though it adds ~1–2 min.
- If CI minutes become a concern, drop the `push` trigger and keep
  `pull_request` only — but note master would then deploy ungated again.
- Optional manual follow-up for the maintainer (outside this repo): enable
  Vercel's "only deploy if checks pass" / GitHub branch protection on
  `master` so the gate actually blocks deploys rather than just reporting.
