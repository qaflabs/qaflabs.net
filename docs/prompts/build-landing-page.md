# Prompt: Build the Qaf Labs landing page

> Open Claude Code at the root of the `qaflabs.net` repo and paste everything below the line.

---

## 1. Your job

Build the Qaf Labs landing page (`/`) in this Next.js app so it matches the approved design in `docs/design/landing/`. Use the real components from four libraries (React Bits, Magic UI, Aceternity UI, Spectrum UI), recolored to the brand. The result should feel like a site that gets featured on Awwwards or Godly, and it must still score well on Lighthouse.

The design is already decided. Your job is to build it faithfully, not to redesign it. When the design and a library default disagree, the design wins.

Read these before you write any code:

1. `docs/design/landing/README.md`: the spec, section by section, with tokens, components, motion rules, and open items.
2. `docs/design/landing/screenshots/`: every section at 1440 x 900 and 390 x 844. Look at them.
3. `docs/design/landing/index.html`: the design running in a browser. Serve the repo root (`npx serve .`) and open `/docs/design/landing/`. Scroll it, hover the cards, and resize it to a phone width. Read its CSS and the `renderVals()` logic for exact values (sizes, offsets, timings, copy).
4. `public/brand/README.md`: the logo rules. They override everything else.
5. `AGENTS.md`, then the Next.js guides in `node_modules/next/dist/docs/`. This is Next.js 16 with `cacheComponents`, `reactCompiler`, and Turbopack enabled in `next.config.ts`. Do not rely on older Next.js habits.

## 2. Load antislop

Load these skills and apply them in **during** mode for the whole session (session override; do not ask the mode question): `antislop`, `antislop-ui`, `antislop-human`, `antislop-layoutmobile`, `antislop-copywriting`, `antislop-code`.

The owner has approved these design choices. They are recorded overrides under R-37, so build them and do not ask again:

- The bento grid in Capabilities, with mockup visuals (Safari, iPhone, terminal, inbox, cart). They are illustrations of the kind of work, not product screenshots.
- The eyebrow pill above the headline.
- The hero dot texture that Laser Flow draws, and glow on the hero, the frame edge, the bento borders, the Approach flare, and the contact lamp.
- Geist and Geist Mono (the wordmark is set in Geist SemiBold).
- A dark page with one light section and no theme toggle. Reason: the brand idea is one light source on a dark canvas.

Everything else in antislop applies in full: honesty rules, contrast, keyboard use, reduced motion, mobile layout, and the Delivery Gate.

## 3. Brand system

- **Colors:** only ink `#0B0B0F`, paper `#F6F5F1`, and vermilion `#FF4A1C`, plus the derived tokens in the spec (`--ink-2`, `--card`, `--vermilion-soft`, `--muted`, `--line`, `--line-strong`). Define them once in `src/app/globals.css` as CSS variables and Tailwind v4 `@theme` tokens. Replace every library default color. No blue, purple, cyan, or pink anywhere, including inside shaders.
- **Logo:** use `public/brand/svg/qaf-labs-logo-on-dark.svg` and `qaf-labs-mark-on-dark.svg` on dark, and `qaf-labs-mark.svg` on the light section. Never retype the wordmark, redraw the mark, recolor it, rotate it, or separate the square from the circle. Light may sit behind the mark, never on it. If you animate the mark, animate it as one unit.
- **Type:** Geist and Geist Mono are already loaded in `src/app/layout.tsx`. Remove the `font-family: Arial` rule from `globals.css` and use the Geist variables.
- **Contrast:** check every new text pairing with the `antislop-human` contrast checker. Ink text on vermilion buttons (5.84:1). Never paper text on vermilion below 24px.

## 4. Install the components

The repo has Tailwind v4 but no shadcn setup yet. Run `npx shadcn@latest init` first, then add the Aceternity registry to `components.json`:

```json
"registries": { "@aceternity": "https://ui.aceternity.com/registry/{name}.json" }
```

Install with the shadcn CLI. Always choose the TypeScript and Tailwind variant.

| Library | Components |
| --- | --- |
| React Bits (`npx shadcn@latest add @react-bits/<Name>-TS-TW`) | `LaserFlow`, `SplitText`, `ScrollVelocity`, `MagicBento`, `ScrollReveal`, `SpotlightCard`, `StaggeredMenu` |
| Magic UI (`npx shadcn@latest add @magicui/<name>`) | `animated-shiny-text`, `shimmer-button`, `border-beam`, `safari`, `iphone`, `animated-beam`, `animated-list`, `number-ticker`, `terminal`, `orbiting-circles`, `progressive-blur`, `noise-texture` |
| Aceternity UI (`npx shadcn@latest add @aceternity/<name>`) | `resizable-navbar`, `hover-border-gradient`, `sticky-scroll-reveal`, `tracing-beam`, the lamp section header (find its registry name) |
| Spectrum UI (`npx shadcn@latest add @spectrumui/<name>`) | `tilt-card`, `morph-button`, `quantity-stepper`, `task-checkbox` |

For every component:

1. Confirm the name resolves with `--dry-run` before installing. If a name fails, stop and report the exact error. Do not swap in a different component.
2. Read its source after installing. Note its props, peer dependencies, and whether it is a client component.
3. Recolor it to the tokens and tune it to the values in the spec. Library defaults are louder than the design.
4. Put your recolored, tuned wrappers in `src/components/brand/`. Leave the installed files in `src/components/ui/` as the CLI wrote them, except where recoloring requires an edit; list those edits in your report.

**Laser Flow needs the most care.** Its tint table shifts hues by up to 142 degrees, which produces cyan, pink, and green. Rewrite the tint shifts so every tint stays within about 22 degrees of vermilion's hue, as `docs/design/landing/index.html` does (search for `TINTS`). Point its `surfaceRef` at the hero frame. Use the settings listed in the spec.

## 5. Build the page

Follow the spec section by section. Key points:

- **File layout:** `src/app/page.tsx` composes sections from `src/components/sections/` (one file per section). Copy lives in `src/content/home.ts`. The email and nav live in `src/config/site.ts`.
- **Server first:** sections are Server Components. Only interactive leaves are client components. With `cacheComponents` on, keep client-only code (WebGL, `window`, scroll listeners) inside client components, and load the Laser Flow canvas with `next/dynamic` and `ssr: false` from a client component.
- **Hero:** the headline, sub-headline, and buttons must be in the server HTML and readable without JavaScript. The headline is the LCP element. Split Text animates the server-rendered words; it does not create them.
- **Hero frame:** build the design, code, and preview panes as real markup (not an image), as in the reference. It is decorative: give the figure `role="img"` and the `aria-label` from the reference.
- **Mobile:** follow the breakpoints in the reference CSS (1000px, 900px, 860px, 700px). Fix the two open mobile issues in the spec: keep the beam from crossing the headline at 390px, and stop the web-app card's status rows from wrapping.
- **Copy:** use the copy from the reference page as written. It still needs owner approval, so mark each string the design added (eyebrow, capability titles and lines, Approach steps, principle lines) with `{/* TODO copy: owner to approve */}` in `home.ts`.
- **Metadata:** title `Qaf Labs: Where structure meets craft`, a description, and `metadataBase` set to `https://qaflabs.net`. Open Graph image `/brand/social/qaf-labs-og-1200x630.png` (1200 x 630). Twitter card `summary_large_image` with `/brand/social/qaf-labs-x-card-1200x600.png` (1200 x 600). Give both images the alt text "Qaf Labs: Where structure meets craft. A vermilion beam lands on the Qaf Labs mark." and declare their width and height. Favicons from `/brand/favicon/`, and `theme-color` `#0B0B0F`.

## 6. Motion and performance

- One WebGL effect: Laser Flow. Pause it when the hero leaves the viewport. Stop its clock after about 14 seconds; it may keep reacting to the cursor.
- No endless loops. Border Beam runs three times, the shiny text twice. The orbit has a visible **Pause orbit** button.
- Under `prefers-reduced-motion: reduce`, show end states: one still laser frame, static text, no band movement, no orbit, no tilt.
- Lenis or other smooth scrolling is optional. Test it against Sticky Scroll Reveal before you keep it.
- Targets (mobile Lighthouse): Performance 90+, Accessibility 95+, Best Practices 95+, SEO 100. LCP under 2.5s, CLS under 0.05. Report only numbers you measured. If you did not measure it, write "not measured".

## 7. Accessibility

`<html lang="en">`, a skip link, landmarks, one `h1`, no skipped heading levels. A 2px vermilion focus ring with offset on every control. `cursor: pointer` on every enabled control, set once in the base layer. Real `<button>` and `<a href>` elements only. Icon-only controls get `aria-label`. Decorative canvases and mockups are `aria-hidden` or labeled as illustrations. The mobile menu traps focus and closes on Escape. Copy email announces its result in an `aria-live` region and shows the address if the clipboard fails. Text survives 200% zoom.

## 8. Engineering rules

- TypeScript strict. No `any`, no `@ts-ignore`, no non-null assertions to silence errors.
- No lint errors and no console errors.
- Add only the dependencies the components need. List each one and its reason.
- Comments follow `antislop-code`: one line, why not what, no banners.
- Stay in scope. No refactors outside what a phase needs. Note anything else in the report.
- Do not commit or push unless the owner asks.

## 9. Work in phases

Stop after each phase, report, and wait for approval. End every report with the antislop Delivery Gate as a PASS or FAIL list, each PASS backed by evidence. Do not hand over a phase with a FAIL in it.

**Phase 0: Discovery (read only).** Read the files in section 1. Report the Next.js, React, and Tailwind versions, what `cacheComponents` changes for client components, and a dry-run result for every component in section 4. List anything in this prompt that conflicts with the repo. Stop.

**Phase 1: Foundation.** shadcn init, tokens, fonts, grain, skip link, base cursor and focus styles, navbar with mobile menu, footer, metadata, `site.ts`, `home.ts`. Screenshots at 1440 and 390, compared side by side with `screenshots/desktop-01-hero.jpg` and `mobile-01-hero.jpg`. Stop.

**Phase 2: Hero.** Laser Flow, the hero copy and buttons, the hero frame. Report the LCP element and measured Lighthouse mobile scores. Screenshots at 1440 and 390 with reduced motion on and off, next to the reference screenshots. Stop.

**Phase 3: Sections.** Capability band, Capabilities, Manifesto, Approach, Principles and Stack, Contact. Screenshot each at 1440 and 390 next to its reference screenshot and list every visible difference. Stop.

**Phase 4: Polish and audit.** Tune timings against the reference page. Run Lighthouse (mobile and desktop), axe, a keyboard-only pass, a reduced-motion pass, and a 200% zoom pass. Final report:

- a scores table with measured numbers only
- a click-through of every interactive element, one line each (for example "Menu: opens, traps focus, closes on Escape")
- each installed component, the section that uses it, and what you changed
- new dependencies and why
- open items: copy approval, the contact inbox, the tools list

## 10. Done means

- [ ] Side by side with `docs/design/landing/screenshots/`, every section matches at 1440 and 390.
- [ ] The vermilion beam lands on the hero frame and pours over its edges, as in the reference.
- [ ] Only ink, paper, and vermilion appear, including inside the shader.
- [ ] The logo is used only as supplied.
- [ ] No invented logos, testimonials, statistics, or claims.
- [ ] One WebGL effect, no endless loops, and reduced motion respected.
- [ ] Measured Lighthouse mobile scores meet the targets in section 6.
- [ ] TypeScript strict passes with no lint or console errors.
- [ ] The antislop Delivery Gate passes in full, with evidence.
