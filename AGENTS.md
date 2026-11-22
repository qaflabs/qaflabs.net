<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

## Qaf Labs project notes

- Package manager: bun. Use `bun install`, `bun add`, `bun run <script>` and `bunx`; there is no npm lockfile.
- Brand kit: `public/brand/README.md` is the rule book for the logo, colors, and typeface. Use the SVGs as they are.
- Landing page design: `docs/design/landing/README.md` is the spec. `docs/design/landing/index.html` is the runnable reference, and `screenshots/` shows every section at 1440 and 390.
- Build prompt: `docs/prompts/build-landing-page.md`.
- Colors: only ink `#0B0B0F`, paper `#F6F5F1`, vermilion `#FF4A1C`, and their alphas.
- Content: no client logos, testimonials, statistics, or invented facts. Mark any copy you write with `{/* TODO copy */}`.
- For UI work, apply the antislop skills (`antislop`, `antislop-ui`, `antislop-human`, `antislop-layoutmobile`, `antislop-copywriting`, `antislop-code`) in `during` mode. The owner's design choices recorded in `docs/design/landing/README.md` are approved overrides.
- Keep anything that is not a public asset out of `public/`. Everything in `public/` is served on the live site.
