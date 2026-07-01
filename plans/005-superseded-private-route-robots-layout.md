# Superseded Plan: Protect private routes with parent robots metadata

> **Do not execute this plan.** It is retained for audit history only. It was superseded by `plans/002-reduce-build-and-bundle-cost.md` after the product decision changed from "private routes may ship but should be noindexed" to "private QA/prototype routes should not ship in production."

> **Executor instructions**: Follow this plan step by step. Run every verification command and confirm the expected result before moving to the next step. If anything in the "STOP conditions" section occurs, stop and report. When done, update the status row for this plan in `plans/README.md`.
>
> **Drift check (run first)**: `git diff --stat f87f0ad..HEAD -- app/private`
> If any in-scope file changed since this plan was written, compare the "Current state" excerpts against the live code before proceeding; on a mismatch, treat it as a STOP condition.

## Status

- **Priority**: superseded
- **Effort**: S
- **Risk**: LOW
- **Depends on**: superseded by `plans/002-reduce-build-and-bundle-cost.md`
- **Category**: security / docs / superseded
- **Planned at**: commit `f87f0ad`, 2026-07-01

## Why this matters

The site has a `/private` route tree with prototypes and QA surfaces. Some pages set `robots: "noindex, nofollow"`, but several child pages do not. In Next App Router, metadata in `app/private/page.tsx` does not apply to child routes; a parent `layout.tsx` would be the right place to apply this policy across `/private/**` if private routes continued to ship.

This is no longer the preferred target. Private QA/prototype routes should be excluded from the production route and type-check graph, which is covered by `plans/002-reduce-build-and-bundle-cost.md`.

## Current state

- `app/private/page.tsx` sets robots metadata only for the `/private` index page.

```ts
// app/private/page.tsx:4-15
export const metadata: Metadata = {
  title: "Private",
  robots: "noindex, nofollow",
};

const privateLinks = [
  ["/private/qa", "QA"],
  ["/private/device", "Device"],
  ["/private/image-modal", "Image modal"],
  ["/private/og-preview", "OG preview"],
  ["/private/cambio", "Cambio examples"],
] as const;
```

- `app/private/qa/layout.tsx` repeats the intended policy for one subtree.

```ts
// app/private/qa/layout.tsx:3-10
export const metadata: Metadata = {
  title: "QA",
  description: "Private QA surface for UI components and demos.",
  robots: "noindex, nofollow",
};

export default function QaLayout({ children }: { children: React.ReactNode }) {
  return children;
}
```

- These private pages do not define robots metadata in their own file and have no parent private layout today:
  - `app/private/device/page.tsx`
  - `app/private/image-modal/page.tsx`
  - `app/private/testing/carousel/page.tsx`
  - `app/private/testing/direction-a/page.tsx`
  - `app/private/testing/direction-b/page.tsx`
  - `app/private/testing/direction-c/page.tsx`
  - `app/private/testing/direction-d/page.tsx`
  - `app/private/testing/direction-e/page.tsx`
  - `app/private/testing/explorations/page.tsx`

Repo convention: private routes are hidden from the production header/search links, but the routes still exist. Do not treat hidden navigation as access control.

## Commands you will need

| Purpose   | Command             | Expected on success |
| --------- | ------------------- | ------------------- |
| Install   | `npm install`       | exit 0              |
| Typecheck | `npm run typecheck` | exit 0              |
| Check     | `npm run check`     | exit 0              |
| Lint      | `npm run lint`      | exit 0              |
| Build     | `npm run build`     | exit 0              |

## Scope

**In scope if revived later**:

- `app/private/layout.tsx` (create)
- `app/private/page.tsx` only if needed to avoid duplicate title/metadata conflicts
- `app/private/qa/layout.tsx` only if simplifying duplicated robots metadata is required after adding the parent layout

**Out of scope if revived later**:

- Adding auth or password protection.
- Deleting private routes.
- Changing route content or navigation.
- Editing `app/sitemap.ts`; it already omits `/private/**`.

## Historical git workflow

- Do not create a branch for this plan unless the supersession decision is intentionally reversed.
- Original suggested branch: `codex/private-route-robots-layout`.
- Original suggested commit message: `Apply private route robots metadata`.

## Steps

### Step 1: Add a parent private layout

Create `app/private/layout.tsx`:

```tsx
import type { Metadata } from "next";

export const metadata: Metadata = {
  robots: "noindex, nofollow",
};

export default function PrivateLayout({ children }: { children: React.ReactNode }) {
  return children;
}
```

Do not add UI wrappers. The layout exists only to centralize route metadata.

**Verify**: `npm run typecheck` -> exit 0.

### Step 2: Decide whether to keep duplicated child robots metadata

Prefer leaving existing child metadata in place unless Next reports a type/build conflict. Duplicated `robots: "noindex, nofollow"` is harmless and keeps local page intent clear.

If build/typecheck reports a metadata conflict, remove only duplicate `robots` keys from child files that already live under `app/private/layout.tsx`; preserve page-specific titles/descriptions.

**Verify**: `npm run lint` -> exit 0.

### Step 3: Confirm route coverage

Run:

```sh
find app/private -maxdepth 3 -type f \( -name 'page.tsx' -o -name 'layout.tsx' \) | sort
rg -n "robots: \"noindex, nofollow\"|robots: \\{.*index: false" app/private
```

Expected: `app/private/layout.tsx` appears in the first command, and the second command shows the parent layout robots metadata.

**Verify**: commands above show the parent layout and no private route has been deleted.

### Step 4: Run full verification

Run:

```sh
npm run typecheck
npm run check
npm run lint
npm run format:check
npm run build
```

Expected: all exit 0.

## Test Plan

- This is metadata-only. No new tests are required.
- Build verification is required because App Router metadata is validated during Next build.

## Done Criteria

- [ ] `app/private/layout.tsx` exists and exports `metadata.robots` with noindex/nofollow.
- [ ] No private route files were deleted or renamed.
- [ ] Existing private page titles/descriptions still exist where they existed before.
- [ ] `npm run typecheck`, `npm run check`, `npm run lint`, `npm run format:check`, and `npm run build` exit 0.
- [ ] No files outside the in-scope list are modified.
- [ ] `plans/README.md` status row for Plan 002 is updated.

## STOP Conditions

Stop and report if:

- `app/private/layout.tsx` already exists with behavior not shown in this plan.
- Next metadata behavior has changed and the parent layout does not apply robots metadata to child routes.
- The change appears to require auth, middleware, redirects, or route deletion.
- Build fails for unrelated private-route content.

## Maintenance Notes

This is not access control. It only prevents indexing signals for prototype surfaces. If any `/private/**` content becomes sensitive, the follow-up should be real authentication or removal from production, not only robots metadata.
