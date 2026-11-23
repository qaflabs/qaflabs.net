# Landing page design reference

This folder holds the approved design for the qaflabs.net landing page (`/`). Build the page to match it. The build prompt is [`docs/prompts/build-landing-page.md`](../../prompts/build-landing-page.md).

## What is in this folder

| Path | What it is |
| --- | --- |
| `index.html` | The design as one runnable page: real layout, copy, motion, and the hero light. Open it to see how the page should look and move. |
| `screenshots/` | Desktop (1440 x 900) and mobile (390 x 844) captures of every section, numbered in page order. |
| `source/Main.dc.html` | The original artboard from the Claude design canvas. Keep it for reference. Do not import it into the app. |
| `source/canvas.json` | The canvas index for that artboard. |

To open the reference page, serve the repo root so the brand files resolve:

```bash
npx serve .
# then open http://localhost:3000/docs/design/landing/
```

`index.html` uses lit-html (inlined) to run the same logic the canvas runs. It is a reference, not production code. The production page is built from the component libraries listed below.

## Design read

Company site for a software product lab, for founders and product leads choosing a build partner. Cinematic, single light source on a dark canvas. Dials: ENERGY 3 / RHYTHM 3 / MOTION 3. Motion is spent on the hero light and the pinned Approach sequence. The rest of the page moves once or follows the cursor.

Style reference: [huly.io](https://huly.io). The page takes its beam-on-a-window hero, lit frame edges, and dark cards with inner light. It does not take its layout, copy, or blue palette.

## Tokens

Only these three colors and their alphas appear on the page.

| Token | Value | Use |
| --- | --- | --- |
| `--ink` | `#0B0B0F` | Page background, text on the light section |
| `--ink-2` | `#121217` | Raised surfaces, frames |
| `--card` | `#0F0F14` | Card background |
| `--paper` | `#F6F5F1` | Primary text, the manifesto background |
| `--vermilion` | `#FF4A1C` | The light, primary buttons, focus rings, accents |
| `--vermilion-soft` | `#FF7A50` | Section numbers, code keywords, redlines (7.6:1 on ink) |
| `--muted` | `rgb(246 245 241 / 0.62)` | Secondary text (7.2:1 on ink, 7.1:1 on cards) |
| `--line` | `rgb(246 245 241 / 0.08)` | Decorative dividers and card borders |
| `--line-strong` | `rgb(246 245 241 / 0.42)` | Borders that identify a control (3.8:1 on ink) |

Computed contrast: paper on ink 18.0:1. Vermilion on ink 5.84:1. Ink on vermilion 5.84:1, so primary buttons use ink text. Paper on vermilion is 3.08:1, so never put paper text on vermilion below 24px.

Type: Geist (600 for headings, 400 for body) and Geist Mono for labels, section numbers, and code. The brand README names Geist SemiBold for the wordmark. Sizes follow huly.io's steps (owner decision) and live as tokens in `globals.css`, each running from its 390px size to its 1280px size: hero headline and capability band 32 → 84px (`text-display`), contact heading 32 → 72px (`text-closing`), section headings 30 → 56px (`text-heading`), manifesto 24 → 44px (`text-statement`), step and principle titles 20 → 32px (`text-title`), card titles 18 → 20px (`text-title-sm`), hero sub-text 15 → 18px (`text-lead`), body 15px on phones and 16px from 768px. Hero tracking `-0.048em`, line height 0.95; section heading tracking `-0.04em`.

Radii: 999px for buttons and pills, 18px for cards, 16px for frames, 12px for inner windows.

Texture: film grain over the whole page (SVG `feTurbulence`, opacity 0.06, `mix-blend-mode: overlay`).

## Sections

Each section lists the library component the build uses. The reference page imitates these components; the build installs the real ones.

### 1. Navbar

- **Aceternity Resizable Navbar.** Full width and transparent at the top. After 40px of scroll it shrinks to an 880px pill with an ink background at 72%, a hairline border, and a shadow.
- **Magic UI Progressive Blur** under it, shown only after scroll.
- Logo (`public/brand/svg/qaf-labs-logo-on-dark.svg`, 24px tall), four anchors (`#capabilities`, `#approach`, `#principles`, `#contact`), and the primary button.
- Below 860px: a menu icon (two lines, on a dark disc so it reads over the beam) opens a full-screen menu (**React Bits Staggered Menu** motion). It traps focus, closes on Escape, and returns focus to the menu icon. Its Close is an × in the same spot.

Screens: `desktop-01-hero.jpg`, `mobile-01-hero.jpg`.

### 2. Hero

- **React Bits Laser Flow** in vermilion. The beam falls at 68% of the width (90% below 760px) and splashes onto the top edge of the hero frame, then pours over its corners. Settings used in the reference: intensity 1.45, beam width 1.35, flare 1.4, spread 1.4, spill 1, fog 0.22, dust 0.9, streaks 1.2, dots 0.9, pulse 0.8, speed 1. The default tints include cyan and pink; recolor every tint to stay within about 22 degrees of vermilion's hue.
- The Qaf Labs mark (52px at full width, 28px minimum, scaling with the frame) sits on the frame's top edge where the beam lands, so the light hits the point where the square and the circle touch.
- **Magic UI Animated Shiny Text** in a pill: `Qaf Labs · software company`.
- **React Bits Split Text** headline, per word: "Where structure meets craft." The word "craft." carries a soft vermilion text glow.
- Sub-headline in `--muted`, at most 520px wide.
- **Magic UI Shimmer Button** (vermilion fill, ink text, glow) for **Start a conversation** (`mailto:`). **Aceternity Hover Border Gradient** for **See what we build** (`#capabilities`). Below 768px the hero keeps only Start a conversation and drops the eyebrow, as huly.io keeps one call to action on phones (owner decision).
- The hero frame is an illustration of how Qaf Labs works, not a product screenshot. Three panes: a design canvas with the primary button selected and redlined, the `Button.tsx` code for it, and a phone preview. **Magic UI Border Beam** travels its edge three times, then stops. The frame fades out at the bottom.
- The frame keeps its 1240px three-pane layout at every width and zooms to fit, so phones see the whole frame like a screenshot, as huly.io shows its app (owner decision).

Screens: `desktop-01-hero.jpg`, `desktop-02-frame.jpg`, `mobile-01-hero.jpg`, `mobile-02-frame.jpg`.

### 3. Capability band

- **React Bits Scroll Velocity**, two rows moving in opposite directions, driven by scroll only. Words alternate solid and outlined: WEB APPS, MOBILE, DESKTOP, AI PRODUCTS, E-COMMERCE, DESIGN SYSTEMS. Separators are a small square (paper) and a small circle (vermilion, glowing). The band is `aria-hidden`.

### 4. `01 Capabilities`

- Heading "One team, every surface." with the intro line beside it.
- **React Bits Magic Bento** on a 12-column grid: rows of 7 + 5, 5 + 7, 6 + 6. A vermilion border glow and a soft spotlight follow the cursor. Each card has a hairline highlight on its top edge and a faint vermilion glow behind it.
- Card visuals, all illustrations:
  - Web apps: **Magic UI Safari** with a small dashboard (sidebar, area chart, two status rows).
  - Mobile apps: **Magic UI iPhone** with a task list (**Spectrum UI Task Checkbox** style) and a floating button.
  - AI products: **Magic UI Animated Beam**. Three inputs (docs, tickets, chat) flow into a node holding the mark, then out to "answer". Plays twice on first view.
  - Desktop apps: an inbox window with **Magic UI Animated List** notifications.
  - E-commerce: a cart card with a **Spectrum UI Quantity Stepper** and a **Magic UI Number Ticker** order total.
  - Engineering and infrastructure: **Magic UI Terminal** typing `pnpm build` and `pnpm deploy --prod`.
- Tablet: two columns. Below 700px: one column.

Screens: `desktop-03-capabilities.jpg`, `desktop-04-capabilities-cards.jpg`, `mobile-03…04`.

### 5. Manifesto (the one light section)

- Paper background, ink text, a soft gradient edge in and out.
- **React Bits Scroll Reveal**: sentences rise from 45% to 100% opacity as you scroll. Never start below 45% (ink at 45% on paper is 3.09:1, the floor for large text).
- The ink mark (`qaf-labs-mark.svg`) sits above the text.

Screen: `desktop-05-manifesto.jpg`.

### 6. `02 Approach`

- **Aceternity Sticky Scroll Reveal**: five steps on the left (Discover, Design, Engineer, Ship, Evolve), a sticky panel on the right.
- **Aceternity Tracing Beam** on the left edge fills with vermilion as you scroll.
- The panel shows the square and the circle moving toward each other. On the last step they touch and a light flare appears at the touch point. **Magic UI Border Beam** on the panel edge.
- Below 900px the panel is hidden and each step shows its own small static drawing.

Screens: `desktop-06-approach.jpg`, `desktop-07-approach-end.jpg`.

### 7. `03 Principles` and `04 Stack`

- Three **React Bits Spotlight Card**s with a **Spectrum UI Tilt Card** tilt (at most 5 degrees, desktop only). Each card shows the mark rotated a different way, a title, and one line.
- Stack: **Magic UI Orbiting Circles** with the mark at the center and two orbits of tool logos (TypeScript, React, Next.js, Node.js, Expo, PostgreSQL, Kubernetes, Anthropic; OpenAI as a text label because Simple Icons does not ship its logo). A visible list of the tool names sits beside it. A **Pause orbit** button stops the motion.

Screens: `desktop-08-principles.jpg`, `desktop-09-stack.jpg`.

### 8. Contact and footer

- **Aceternity Lamp** in vermilion over the heading "Tell us what you're making."
- **Shimmer Button** for **Start a conversation** and a **Spectrum UI Morph Button** for **Copy email**, which turns into "Copied" with a check. Results are announced in an `aria-live` region. If the clipboard fails, the page shows the address instead.
- Footer: the large on-dark logo, the email, the three section anchors, `© 2026 Qaf Labs`, and a low vermilion glow at the bottom edge.

Screens: `desktop-10-contact.jpg`, `desktop-11-footer.jpg`.

## Motion and performance rules

- One WebGL effect: the hero Laser Flow. Load it with `next/dynamic` and `ssr: false`, pause it when the hero leaves the viewport, and stop its time after about 14 seconds. It still reacts to the cursor after that.
- Endless loops are banned. The border beams run three times, the shine runs twice, and the orbit has a pause button.
- Under `prefers-reduced-motion: reduce`: the laser draws one still frame, text is shown in its end state, and the band, orbit, beams, and tilt stop.
- The hero headline is the LCP element and must render without JavaScript.

## Content rules

- No client logos, testimonials, statistics, team sizes, or response-time promises.
- Every mockup on the page is an illustration of the kind of work, not a real product. `app.yourcompany.com` and the cart item are placeholders.

## Open items

- Approve the copy the design added: the eyebrow, the six capability card titles and lines, the five Approach steps, and the three principle lines.
- Confirm the tools list and that `hello@qaflabs.net` is a live inbox.
- The mobile hero beam still crosses the end of the headline at 390px. Move the beam or narrow the headline in the build.
- The web-app card's status rows wrap at 390px. Shorten the labels or stack them.
