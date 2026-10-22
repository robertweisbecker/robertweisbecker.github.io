# [bob.fyi](https://bob.fyi)

## Stack

- [Next.js](https://nextjs.org) on [Vercel](https://vercel.com)
- [MDX](https://mdxjs.com) via `@next/mdx`
- [Tailwind](https://tailwindcss.com)
- [Base UI](https://base-ui.com) for unstyled components
- [Framer Motion](https://motion.dev)
- [next-themes](https://github.com/pacocoursey/next-themes) for dark mode

## Local Development

Use Node.js 24.22.1 or a newer 24.x release (`nvm install && nvm use` selects the version in `.nvmrc`) before installing dependencies or starting the development server. This includes the Node.js security fixes for [CVE-2026-111497](https://nodejs.org/en/blog/vulnerability/october-2026-security-releases). The `engines.node` requirement describes the supported range; npm may only warn on an unsupported runtime. Vercel selects the major version and manages runtime patches; this pin does not prove the patch version of a deployed function. See the [Vercel advisory](https://vercel.com/kb/bulletin/node-js-security-advisory) for rollout status.

```
npm install
```

Installs project dependencies.

```
npm run dev
```

Starts the Next.js dev server on [http://localhost:3000](http://localhost:3000) with hot reload.

```
npm run dev:fresh
```

Clears `.next` before starting the Next.js dev server.

```
npm run build
```

Builds the Next.js production output with the default Next/Turbopack build (`next build`).

```
npm run analyze:build
```

Reports build output diagnostics from the latest production build.

```
npm run build:webpack
```

Builds with the explicit webpack fallback (`next build --webpack`).

```
npm run typecheck
```

Runs TypeScript type checking without emitting files.

```
npm run typecheck:build
```

Runs the production build graph TypeScript check.

```
npm run check
```

Runs typecheck, lint, and format check in sequence.

CI runs `npm run check && npm run build` on every push to `master` and every pull request. Vercel deploys independently, so a red check means `master` deployed unverified; fix forward.

```
npm run lint
```

Runs ESLint across the project.

```
npm run format
```

Formats all files with Prettier.

```
npm run format:check
```

Checks formatting without writing changes.

## Deployment

Deployed automatically to [Vercel](https://vercel.com) on push to `master`.
