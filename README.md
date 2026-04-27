# [bob.fyi](https://bob.fyi)

## Stack

- [Next.js](https://nextjs.org) on [Vercel](https://vercel.com)
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

Deployed automatically to [Vercel](https://vercel.com) on push to `master`.
