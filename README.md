# [bob.fyi](https://bob.fyi)

## Stack

- [Next.js](https://nextjs.org) with static export
- [MDX](https://mdxjs.com) via `@next/mdx`
- [Tailwind](https://tailwindcss.com)
- [Base UI](https://base-ui.com) for unstyled components
- [Framer Motion](https://motion.dev)
- [next-themes](https://github.com/pacocoursey/next-themes) for dark mode

## Local Development

```
npm run dev
```

Starts the Next.js dev server on [http://localhost:3000](http://localhost:3000) with hot reload.

```
npm run build
```

Generates a static export to the `out` directory.

```
npm run lint
```

Runs ESLint across the project.

```
npm run format
```

Formats all files with Prettier.

## Deployment

```
npm run deploy
```

Builds the static export and publishes to the `gh-pages` branch via [gh-pages](https://github.com/tschaub/gh-pages).
