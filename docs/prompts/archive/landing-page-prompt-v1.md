# Prompt: Build the Qaf Labs landing page (qaflabs.net)

> Paste everything below this line into your coding agent, run from the root of the `qaflabs.net` repo.

---

## 0. Role

You are a senior design engineer: half award-level product designer, half staff frontend engineer. You ship landing pages that win Awwwards / Godly features **and** score 95+ on Lighthouse. You have strong taste, you say no to gimmicks, and every animation you add earns its place.

Your job: design and build the **Qaf Labs** marketing landing page inside this existing Next.js project, composing components from four libraries (React Bits, Aceternity UI, Magic UI, Spectrum UI) and restyling them to the Qaf Labs brand. Do not build a generic SaaS template.

---

## 1. Context

**Qaf Labs** is a software company that designs and builds digital products: web apps, mobile apps, desktop apps, AI products and e-commerce. It runs as a product lab: small, senior and opinionated about quality.

**Hard content rule:** the page does **not** showcase, name, screenshot or link to any specific Qaf Labs product. It sells the *company* (how we think, what we build, how we build it), not a portfolio.

**Honesty rule:** no fake client logos, fake testimonials, invented stats ("500+ projects"), or made-up awards. If a section would need any of these, drop the section.

**Style reference:** [huly.io](https://huly.io). Take from it: a near-black, cinematic canvas; one dramatic light source that hits the hero; thin glowing borders on cards; large, tight, confident headlines; a calm, premium pace. Do not copy its layout, copy or blue palette. Our light source is **vermilion**.

---

## 2. Brand system (non-negotiable)

Brand assets live in `public/brand/`. Read `public/brand/README.md` first and treat it as law.

### The mark
A **square** (ink) and a **circle** (vermilion) that touch at **exactly one point**. The square has three rounded corners; its one sharp corner is where it meets the circle. The circle has the same area as the square.

**Concept to design around:** *square = structure / engineering, circle = craft / the human side, the touch point = where Qaf Labs works.* That single point of contact is the visual idea of the whole site. The hero light should converge on it, and the section motifs can echo squares, circles and single points of contact.

### Logo rules
- Use the SVG files as they are. **Never** retype the wordmark, redraw the mark, recolour it, rotate it, separate the two shapes or add effects (glow, blur, gradient) *to the mark itself*. Lighting can sit **behind** the mark, never on it.
- If you animate the mark, animate it as **one unit** (fade, scale, mask reveal). The square and circle must never appear apart, even for one frame.
- Clear space: at least the circle's height on every side. Minimum size: 16px tall.
- On dark backgrounds use `svg/qaf-labs-logo-on-dark.svg` / `svg/qaf-labs-mark-on-dark.svg`.
- On a vermilion background use the ink square with a white circle (see `svg/qaf-labs-app-icon-vermilion.svg`).

| Asset | Path |
| --- | --- |
| Logo, dark bg | `/brand/svg/qaf-labs-logo-on-dark.svg` |
| Logo, light bg | `/brand/svg/qaf-labs-logo.svg` |
| Mark, dark bg | `/brand/svg/qaf-labs-mark-on-dark.svg` |
| Mark, light bg | `/brand/svg/qaf-labs-mark.svg` |
| One-colour | `/brand/svg/qaf-labs-*-black.svg`, `*-white.svg` |
| Favicons | `/brand/favicon/favicon.svg`, `favicon.ico`, `favicon-{16,32,48,180,512}.png` |
| OG / social | `/brand/png/qaf-labs-logo-on-dark-2400.png`, `/brand/png/qaf-labs-avatar-800.png` |

### Colour tokens
Define these once as CSS variables / Tailwind v4 `@theme` tokens. **No other hues anywhere on the page.**

| Token | Hex | Use |
| --- | --- | --- |
| `--ink` | `#0B0B0F` | Page background (dark-first), text on light |
| `--paper` | `#F6F5F1` | Primary text on dark, the one light section |
| `--vermilion` | `#FF4A1C` | Light source, glows, accents, primary CTA. **Never body text.** |

Derive only neutrals and transparencies from these, for example `--ink-2: #121217` (raised surface), `--line: rgb(246 245 241 / 0.08)` (hairline borders), `--muted: rgb(246 245 241 / 0.6)` (secondary text), and vermilion at 8–40% alpha for glows. No purple, blue, teal or rainbow gradients, and no default library colours left in place. Every component you install must be recoloured to these tokens.

### Typography
- **Geist** via `next/font` (`geist` package or `next/font/google`).
- Display / headings: Geist SemiBold (600), tight tracking (`-0.03em` to `-0.045em`), line-height 0.95–1.05. Hero size about `clamp(3rem, 8vw, 7.5rem)`.
- Body: Geist Regular 400, 16–18px, line-height 1.6, `--muted` for secondary text.
- Labels, eyebrows, section numbers: **Geist Mono**, uppercase, 11–12px, `0.12em` tracking. Use section indices like `01 / Capabilities`.

### Texture
A subtle film-grain overlay over the whole page (Magic UI **Noise Texture** or React Bits **Noise**, opacity ≤ 0.05). Hairline 1px borders, never thick ones. Radius scale: 12px for cards, 999px for pills, plus sharp corners in places, echoing the mark's one sharp corner.

---

## 3. Component libraries: how to use them

Install through the shadcn CLI registries wherever possible. Do not hand-roll a component that a registry provides, and do not copy-paste a component that a registry can install.

| Library | Install |
| --- | --- |
| **React Bits** (reactbits.dev) | `npx shadcn@latest add @react-bits/<Component>-TS-TW` (e.g. `@react-bits/SplitText-TS-TW`). Always pick the **TS + Tailwind** variant. |
| **Aceternity UI** (ui.aceternity.com) | Add `"@aceternity": "https://ui.aceternity.com/registry/{name}.json"` to `registries` in `components.json`, then `npx shadcn@latest add @aceternity/<kebab-name>`. Requires **Tailwind v4**. |
| **Magic UI** (magicui.design) | `npx shadcn@latest add @magicui/<kebab-name>` |
| **Spectrum UI** (ui.spectrumhq.in) | No CLI documented: copy the source from the component page (or use their MCP if it's connected). Put it in `src/components/ui/spectrum/`. |

Rules for every installed component:
1. After installing, **read its source** before using it. Note its props, peer dependencies (`motion`, `ogl`, `three`, `gsap`…) and whether it is a client component.
2. **Recolour** it to the brand tokens. Replace hard-coded colours with tokens.
3. **Tame it.** Default library settings are usually too loud. Lower speed, intensity and particle counts until the effect reads as atmosphere, not a demo.
4. WebGL / canvas components (`ogl`, `three`, shaders) must be loaded with `next/dynamic` (`ssr: false`), must **pause when off-screen** (IntersectionObserver) and must render a static CSS fallback under `prefers-reduced-motion` and on low-power devices.
5. If a registry command fails or a component name has changed, **stop and report** with the exact error. Do not silently swap in a different component.

---

## 4. Page architecture

The page is one route (`/`), dark-first, with eight sections. Each section below lists **primary** components and a **fallback** if the primary doesn't fit or fails the performance budget. You may propose a better pick, but justify it in one sentence.

### 4.1 Navbar
- **Primary:** Aceternity **Resizable Navbar**. It starts full-width and transparent, then shrinks into a floating, blurred pill on scroll.
- Left: logo (on-dark SVG, 24px tall). Centre: `Capabilities`, `Approach`, `Principles`, `Contact` (anchor links, smooth scroll). Right: primary CTA pill **"Start a conversation"**.
- Add Magic UI **Progressive Blur** under the navbar area so content blurs as it scrolls beneath.
- Mobile: full-screen menu. React Bits **Staggered Menu** is the reference for the motion; keep it in brand colours.

### 4.2 Hero: "the point of contact"
The signature moment, and where the huly.io feeling lives.
- **Background (pick one):** React Bits **Light Rays** (origin top-centre, vermilion, low spread) **or** React Bits **Light Pillar**. One beam of vermilion light falls from above and lands on the Qaf Labs mark. Under it, Magic UI **Dot Pattern** or Aceternity **Grid and Dot Backgrounds**, masked with a radial fade so it only shows near the centre.
- **Fallback:** Aceternity **Spotlight New** (recoloured), or Aceternity **Lamp Effect**.
- **Composition (centred):**
  1. The **mark** (on-dark SVG, about 72–96px), with a soft vermilion radial glow *behind* it at the touch point. Entrance: one-unit fade and scale from 0.96, 600ms.
  2. Eyebrow pill: Magic UI **Animated Shiny Text** inside a hairline-bordered pill: `QAF LABS · SOFTWARE COMPANY`.
  3. Headline: React Bits **Split Text** (per word, not per letter) or **Blur Text**. The headline must be in the SSR HTML and readable without JS; animation is enhancement only.
  4. Sub-headline in `--muted`, max 560px wide.
  5. Two CTAs: primary (vermilion fill, ink text) using Magic UI **Shimmer Button** in brand colours, or Spectrum UI **Metal Button** restyled. Secondary is a ghost button with Aceternity **Hover Border Gradient**, using a vermilion-only gradient.
- Below the fold edge: a thin Geist Mono scroll cue `SCROLL ↓` that fades out once the user scrolls.

### 4.3 Capability band
- **Primary:** React Bits **Scroll Velocity**. One huge outlined/solid alternating text band, scroll-linked: `WEB APPS ◼ MOBILE ● DESKTOP ◼ AI PRODUCTS ● E-COMMERCE ◼ DESIGN SYSTEMS ●`. The ◼ and ● separators echo the mark: a small square and a small circle, with the circle in vermilion.
- **Fallback:** Magic UI **Marquee**.

### 4.4 `01 / Capabilities`: bento
- **Primary:** React Bits **Magic Bento** (spotlight and border glow on hover, glow colour vermilion, particles off or minimal). **Fallback:** Aceternity **Bento Grid** plus Aceternity **Glowing Effect** on each card.
- Six cards, asymmetric grid (2 large, 4 small). Each card has a Geist Mono label, a title, one line of copy and a **live mini-visual built from library components** (abstract, never a real product screenshot):
  - **Web apps:** Magic UI **Safari** mock containing an abstract skeleton UI (grey bars and blocks, one vermilion accent).
  - **Mobile apps:** Magic UI **iPhone** mock with the same abstract UI language.
  - **AI products:** Magic UI **Animated Beam**. Several input nodes beam into a central node holding the Qaf Labs mark, then out to one output.
  - **Desktop apps:** a minimal window frame with Magic UI **Animated List** of notification-style rows.
  - **E-commerce:** Spectrum UI **Number Ticker** or Magic UI **Number Ticker** counting an abstract order total, with a small Spectrum UI **Animated SVG Chart**.
  - **Engineering / infra:** Magic UI **Terminal** typing a short, realistic sequence (`pnpm build` → `✓ compiled` → `deploying…` → `● live`).
- Cards enter with Magic UI **Blur Fade**, staggered 60ms.

### 4.5 Manifesto: the one light section
A deliberate inversion for rhythm: `--paper` background, `--ink` text. It's the only light section on the page.
- **Primary:** React Bits **Scroll Reveal** (or Magic UI **Text Reveal**). A large 2–3 sentence manifesto whose words light up from 15% to 100% opacity as you scroll.
- A small **ink** Qaf Labs mark (`qaf-labs-mark.svg`) sits above the text. The vermilion circle is the only colour in the section.
- Transition into and out of this section with a soft gradient edge, not a hard cut.

### 4.6 `02 / Approach`: how we build
- **Primary:** Aceternity **Sticky Scroll Reveal**. Left column: steps scroll past. Right column: a sticky panel whose visual changes per step.
- Steps: **Discover → Design → Engineer → Ship → Evolve**. Each has a Geist Mono index, a title and two lines of copy.
- Sticky visuals are abstract geometry built from the brand's square and circle: they rearrange, align and finally **touch at one point** on the last step. Build these with `motion` and plain SVG.
- **Fallback:** Aceternity **Timeline** or **Tracing Beam**.

### 4.7 `03 / Principles` + stack
- Four principle cards in a row (2×2 on tablet, stacked on mobile) using React Bits **Spotlight Card** (spotlight colour vermilion at about 25% alpha), or Aceternity **Card Spotlight**. Optional: Spectrum UI **3D Tilt Card** on desktop only, max 6° tilt.
  - *Craft over volume.* / *Engineering is design.* / *Small, senior teams.* / *Built to last.*
- Under the cards, a "Tools we trust" block: Magic UI **Orbiting Circles** with the Qaf Labs **mark at the centre** and real technology icons on two orbits (e.g. TypeScript, React, Next.js, React Native / Expo, Node.js, Rust, PostgreSQL, Kubernetes, OpenAI / Anthropic APIs). Monochrome `--paper` icons at 60% opacity. **Fallback:** Magic UI **Icon Cloud**.

### 4.8 Final CTA + footer
- **CTA:** Aceternity **Lamp Effect**, recoloured to vermilion, with the headline **"Let's build something with intent."**, a one-line sub, a primary CTA (`mailto:` link) and a secondary "Copy email" button that shows a small confirmation. Spectrum UI **Morph Button** is the reference for that copy → copied state.
- **Footer:** a large on-dark logo (SVG, not retyped), three columns (Company, Connect, Legal), Geist Mono copyright line `© 2026 Qaf Labs`, and social links as placeholders. Optional: a bottom-edge Aceternity **Background Beams** at very low intensity.

### Global motion
- Section entrance: Magic UI **Blur Fade** (y: 12px, blur 6px → 0, 500ms, `ease-out`), once per element, triggered at 20% visibility.
- Smooth scrolling: Lenis is allowed if it doesn't fight sticky sections. Test it with the Sticky Scroll Reveal before keeping it.
- **No** custom cursors (Splash Cursor, Blob Cursor, Target Cursor, etc.), no confetti, no meteors, no rainbow borders, no auto-playing sound.
- **Effect budget:** at most **one** WebGL/canvas effect is running in the viewport at any time. Hero rays pause when the hero is off-screen.

---

## 5. Copy (use as written; mark anything you invent with `{/* TODO copy */}`)

- **Eyebrow:** QAF LABS · SOFTWARE COMPANY
- **Hero headline:** Where structure meets craft.
- **Hero sub:** We design and engineer digital products across web, mobile, desktop and AI, built with rigor and finished with care.
- **Primary CTA:** Start a conversation · **Secondary CTA:** See what we build (scrolls to Capabilities)
- **Capabilities intro:** One team, every surface. From the first sketch to the production server.
- **Manifesto:** Most software is built fast and forgotten faster. We build the other kind: structured enough to scale, crafted enough to feel inevitable. Two disciplines, one point of contact. That point is where we work.
- **Approach intro:** A calm process for ambitious work.
- **Final CTA:** Let's build something with intent. / Tell us what you're making. We reply within two working days.
- **Contact email:** `hello@qaflabs.net` (placeholder; keep it in one constant in `src/config/site.ts`).

---

## 6. Engineering requirements

- **Stack:** use what the repo already has. Expected: Next.js App Router, React, TypeScript, Tailwind v4. If Tailwind is v3, stop and report; do not upgrade without approval.
- **TypeScript strict.** No `any`, no `@ts-ignore`, no non-null assertions to silence errors.
- **Structure:** `src/app/page.tsx` composes sections from `src/components/sections/*` (one file per section). Library components stay in `src/components/ui/` as the CLI installs them. Brand wrappers (recoloured / tamed variants) go in `src/components/brand/`. Content strings live in `src/content/home.ts`, not inline in JSX.
- **Server-first:** sections are Server Components. Only the interactive leaves are `"use client"`.
- **Performance budget (mobile, Lighthouse):** Performance ≥ 90, Accessibility ≥ 95, Best Practices ≥ 95, SEO 100. LCP < 2.5s, CLS < 0.05. The hero headline must be the LCP element and must not wait for JS.
- **Accessibility:** semantic landmarks, one `h1`, logical heading order, visible focus rings (vermilion 2px outline with offset), all interactive components keyboard-operable, decorative canvases `aria-hidden`. `prefers-reduced-motion` disables scroll-linked motion, text-split animations and WebGL, and shows static end states.
- **Responsive:** design at 1440, verify at 1280, 1024, 768, 390 and 360. No horizontal scroll at any width. Bento and sticky-scroll sections get their own mobile layouts, not just squeezed desktop ones.
- **Metadata:** title `Qaf Labs: Where structure meets craft`, description, Open Graph and Twitter cards using `/brand/png/qaf-labs-logo-on-dark-2400.png`, favicons and apple-touch-icon from `/brand/favicon/`, `theme-color` `#0B0B0F`.
- **Dependencies:** add only what installed components require. List every new dependency and why in your report.

---

## 7. How to work: gated phases

Work in phases. At the end of each phase, **stop, report and wait for my approval** before continuing. Stay strictly in scope: no opportunistic refactors, no changes to files outside what the phase needs, no "while I'm here" fixes. Note anything else you notice in the report instead.

### Phase 0: Discovery (read-only, change nothing)
1. List the repo structure (`src/`, `public/`, `docs/`, configs).
2. Read `package.json`, `next.config.*`, `tsconfig.json`, `components.json` (if present), the global CSS and `src/app/layout.tsx` / `page.tsx`.
3. Read `public/brand/README.md` and open the on-dark logo and mark SVGs to confirm their viewBox and dimensions.
4. Report: Next.js / React / Tailwind versions, whether shadcn is initialised, existing fonts and tokens, anything that conflicts with this brief, and your **final component pick per section**. Confirm that each picked component name resolves in its registry (run the CLI with `--dry-run` or view the registry JSON). Cite file paths for every finding.
5. **STOP.**

### Phase 1: Foundation
Tokens, fonts, grain overlay, base layout, navbar, footer, metadata/favicons, `site.ts` config and content file. Screenshot at 1440 and 390. **STOP.**

### Phase 2: Hero
Build the hero only, to finished quality. Report the LCP element and measured Lighthouse mobile scores, with screenshots at 1440 and 390, reduced-motion on and off. **STOP.**

### Phase 3: Sections
Capability band → Capabilities bento → Manifesto → Approach → Principles + stack → Final CTA. Screenshot each section at 1440 and 390. **STOP.**

### Phase 4: Polish and audit
Tune motion timings, check the effect budget, run Lighthouse (mobile + desktop), axe accessibility, a keyboard-only pass and the reduced-motion pass. Fix what's in scope. Final report:
- scores table
- every installed component → section → customisations made
- new dependencies and their reason
- open TODOs (copy, links, email)

---

## 8. Definition of done

- [ ] Feels like a premium, cinematic, dark product-lab site in the spirit of huly.io, with vermilion as the only light.
- [ ] The square-meets-circle "point of contact" idea is visible in the hero, the manifesto, the approach steps and the stack orbit.
- [ ] The logo is used only as provided: never retyped, recoloured, separated or rotated.
- [ ] Only Ink, Paper and Vermilion (plus their alphas) appear on the page.
- [ ] No specific Qaf Labs product appears anywhere, and there are no fake logos, testimonials or stats.
- [ ] At most one WebGL effect is active per viewport, and all motion respects reduced-motion.
- [ ] Lighthouse mobile: Performance ≥ 90, Accessibility ≥ 95, Best Practices ≥ 95, SEO 100.
- [ ] TypeScript strict passes, with no lint errors and no console errors.
