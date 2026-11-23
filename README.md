# qaflabs.net

The marketing site for Qaf Labs, a software company that designs and builds web, mobile, desktop, AI, and e-commerce products.

## Stack

- Next.js 16 (App Router) with Cache Components, the React Compiler, and Turbopack. This version differs from older Next.js docs; read the guides in `node_modules/next/dist/docs/` before changing app code.
- React 19 and TypeScript (strict).
- Tailwind CSS 4, loaded through `@tailwindcss/turbopack` (see `next.config.ts`).
- Geist and Geist Mono through `next/font/google`.
- Components from React Bits, Magic UI, Aceternity UI, and Spectrum UI, installed with the shadcn CLI and edited to the brand (see `docs/adr/0002-edit-installed-library-components.md`).
- Motion and GSAP for animation, Lenis for smooth scrolling, and one WebGL effect: the hero light.
- Bun as the package manager.

## Run it

```bash
bun install
bun run dev     # http://localhost:3000
bun run build
bun run start
bun run lint
```

## Test it

The Playwright suite runs against a production build on port 4317, at 1440 x 900 and 390 x 844. It covers each section, keyboard use, axe, reduced motion, 200% zoom, tap targets, and the brand colours.

```bash
bunx playwright install chromium   # once
bun run test
```

## Where things are

| Path | What it holds |
| --- | --- |
| `src/app/` | The root layout, metadata, global CSS and brand tokens, and the page that composes the sections. |
| `src/components/sections/` | One file per section of the landing page, rendered on the server. |
| `src/components/brand/` | Client pieces tuned to the brand: the hero light, headline, frame, capability cards, Approach panel, orbit, and Copy email. |
| `src/components/ui/`, `src/components/spectrumui/`, `src/components/*.tsx` | Installed library components. Each edited file starts with a comment listing its brand edits. |
| `src/content/home.ts` | All page copy. Strings marked `TODO copy` still need owner approval. |
| `src/config/site.ts` | The contact email and navigation. |
| `tests/e2e/` | Playwright tests. |
| `public/brand/` | The logo kit: SVGs, PNGs, and favicons. Read `public/brand/README.md` before using the logo. |
| `docs/design/landing/` | The approved landing page design: a runnable reference page, screenshots of every section, and the spec. |
| `docs/adr/` | Decisions that would surprise a reader, such as brand rules over the spec and editing library files in place. |
| `GLOSSARY.md` | The names used for brand and page parts. |
| `.scratch/landing-page/` | The build spec and its tickets, with notes on what was done. |

## Brand rules in short

- Three colors only: ink `#0B0B0F`, paper `#F6F5F1`, and vermilion `#FF4A1C`, plus their transparencies.
- Use the logo SVGs as they are. Never retype the wordmark or redraw, recolor, rotate, or separate the mark.
- No client logos, testimonials, or statistics on the site until real ones exist.

## Open items

- Approve the copy marked `TODO copy` in `src/content/home.ts`.
- Confirm that `hello@qaflabs.net` is a live inbox.
- Mobile Lighthouse LCP measures about 3.1s against a 2.5s target; desktop scores 100 across the board.
