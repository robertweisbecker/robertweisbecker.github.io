# [bob.fyi](https://bob.fyi)

## Stack

- [Next.js](https://nextjs.org) on [Vercel](https://vercel.com)
- [MDX](https://mdxjs.com) via `@next/mdx`
- [Tailwind](https://tailwindcss.com)
- [Base UI](https://base-ui.com) for unstyled components
- [Framer Motion](https://motion.dev)
- [next-themes](https://github.com/pacocoursey/next-themes) for dark mode

## Local Development

Use Node.js 24.22.1 or a newer 24.x release (`nvm install && nvm use` selects the version in `.nvmrc`) before installing dependencies or starting the development server. This includes the Node.js security fixes for [CVE-2026-111497](https://nodejs.org/en/blog/vulnerability/october-2026-security-releases). The `engines.node` requirement describes the supported range; package managers may only warn on an unsupported runtime. Vercel selects the major version and manages runtime patches; this pin does not prove the patch version of a deployed function. See the [Vercel advisory](https://vercel.com/kb/bulletin/node-js-security-advisory) for rollout status.

Install the pinned pnpm version once with `npm install --global pnpm@12.15.0` (or use a Corepack setup that honors `packageManager`), then:

```
pnpm install --frozen-lockfile
```

Installs the exact dependencies from `pnpm-lock.yaml`. Do not use `npm install` in this repo or commit a second lockfile. When switching an existing checkout from npm, remove its old `node_modules` before this first pnpm install.

`pnpm-workspace.yaml` configures this single-package project: it preserves the PostCSS security override and permits install scripts only for the reviewed `sharp` and `unrs-resolver` versions. If dependencies change, review new build scripts before updating `allowBuilds`; do not enable all builds.

```
pnpm run dev
```

Starts the Next.js dev server on [http://localhost:3000](http://localhost:3000) with hot reload.

```
pnpm run dev:fresh
```

Clears `.next` before starting the Next.js dev server.

```
pnpm run build
```

Builds the Next.js production output with the default Next/Turbopack build (`next build`).

```
pnpm run analyze:build
```

Reports build output diagnostics from the latest production build.

```
pnpm run build:webpack
```

Builds with the explicit webpack fallback (`next build --webpack`).

```
pnpm run typecheck
```

Runs TypeScript type checking without emitting files.

```
pnpm run typecheck:build
```

Runs the production build graph TypeScript check.

```
pnpm run check
```

Runs typecheck, lint, and format check in sequence.

CI runs `pnpm run check && pnpm run build` on every push to `master` and every pull request. Vercel deploys independently, so a red check means `master` deployed unverified; fix forward.

```
pnpm run lint
```

Runs ESLint across the project.

```
pnpm run format
```

Formats all files with Prettier.

```
pnpm run format:check
```

Checks formatting without writing changes.

## Deployment

Deployed automatically to [Vercel](https://vercel.com) on push to `master`.

Vercel detects `pnpm-lock.yaml`. The migration preview automatically honored `packageManager: pnpm@12.15.0` without account changes. Verify that future preview logs still use the pinned version; if they do not, Vercel documents `ENABLE_EXPERIMENTAL_COREPACK=1` as an explicit package-manager selection option. Remove any npm-specific Install Command override and use `pnpm run build` (or the detected Next.js default) for the build. Verify the preview logs show pnpm 12.15.0 and the expected Node 24.x runtime before merging. These project settings are not changed by this repository.
