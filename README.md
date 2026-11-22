# qaflabs.net

The marketing site for Qaf Labs, a software company that designs and builds web, mobile, desktop, AI, and e-commerce products.

## Stack

- Next.js 16 (App Router) with Cache Components, the React Compiler, and Turbopack. This version differs from older Next.js docs; read the guides in `node_modules/next/dist/docs/` before changing app code.
- React 19 and TypeScript.
- Tailwind CSS 4, loaded through `@tailwindcss/turbopack` (see `next.config.ts`).
- Geist and Geist Mono through `next/font/google`.

## Run it

```bash
npm install
npm run dev     # http://localhost:3000
npm run build
npm run lint
```

## Where things are

| Path | What it holds |
| --- | --- |
| `src/app/` | App Router routes, the root layout, and global CSS. |
| `public/brand/` | The logo kit: SVGs, PNGs, and favicons. Read `public/brand/README.md` before using the logo. |
| `docs/design/landing/` | The approved landing page design: a runnable reference page, screenshots of every section, and the spec. |
| `docs/prompts/` | Prompts for coding agents. `build-landing-page.md` builds the landing page. |

## Brand rules in short

- Three colors only: ink `#0B0B0F`, paper `#F6F5F1`, and vermilion `#FF4A1C`, plus their transparencies.
- Use the logo SVGs as they are. Never retype the wordmark or redraw, recolor, rotate, or separate the mark.
- No client logos, testimonials, or statistics on the site until real ones exist.

## Build the landing page

Open Claude Code in this folder and paste the contents of `docs/prompts/build-landing-page.md`. The prompt works in gated phases and stops for review after each one.
