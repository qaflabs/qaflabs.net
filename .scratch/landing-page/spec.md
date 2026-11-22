# Spec: Qaf Labs landing page

Status: ready-for-agent

## Problem Statement

Qaf Labs has an approved landing page design (`docs/design/landing/`) and a brand kit, but the site at `/` is still the Create Next App starter. Founders and product leads looking for a build partner have nothing to read, and the owner has no page to send them to. The design exists only as a reference HTML file that imitates library components with hand-written code, so it can't ship as is.

## Solution

Build `/` in the Next.js app so it matches the approved design at 1440 and 390 wide. Use the real components from React Bits, Magic UI, Aceternity UI and Spectrum UI, recoloured to the brand colors (ink, paper, vermilion). The page opens on the light: a vermilion beam lands on the hero frame and pours over its edges. It then walks through the capability band, Capabilities, the Manifesto, Approach, Principles and Stack, and ends on Contact. It must read without JavaScript, respect reduced motion, work by keyboard, and meet the mobile Lighthouse targets.

Where the design and the brand kit disagree, the brand kit wins (ADR 0001). Where a library default disagrees with the design or the performance targets, the installed component is edited in place (ADR 0002).

## User Stories

1. As a founder visiting qaflabs.net, I want to read what Qaf Labs does in the first screen, so that I can decide quickly whether to keep reading.
2. As a visitor, I want the headline, sub-headline and both buttons to appear immediately, even before scripts load, so that a slow connection doesn't leave me looking at a blank hero.
3. As a visitor with JavaScript off, I want the full page content and every link to work, so that I can still read it and get in touch.
4. As a visitor, I want the light to fall onto the hero frame and spill over its edges, so that the page has one clear focal point.
5. As a visitor, I want the hero light to settle after a short intro and stop animating, so that it doesn't keep pulling my eye while I read.
6. As a visitor moving the cursor over the hero, I want the light to respond subtly, so that the page feels alive without looping.
7. As a visitor who scrolls past the hero, I want the light to stop drawing, so that my laptop doesn't keep rendering something I can't see.
8. As a visitor with reduced motion on, I want one still frame of the light, so that I see the design without movement.
9. As a visitor, I want the hero frame to show design, code and a phone preview of one button, so that I understand Qaf Labs designs and engineers the same thing.
10. As a screen reader user, I want the hero frame announced as one illustration with a short description, so that I'm not read a fake code file line by line.
11. As a visitor, I want the Qaf Labs mark to sit where the light lands, with the light behind it and never on it, so that the brand reads clearly.
12. As a visitor, I want the eyebrow pill ("Qaf Labs · software company") to shine twice and then stop, so that it catches my eye once without looping.
13. As a visitor, I want the headline words to rise into place on first load, so that the hero has a small moment of arrival.
14. As a visitor, I want "craft." to carry a soft vermilion glow, so that the key word stands out.
15. As a visitor, I want "Start a conversation" to open an email to Qaf Labs, so that I can reach them in one click.
16. As a visitor, I want "See what we build" to scroll to Capabilities, so that I can see the work before writing.
17. As a desktop visitor, I want the navbar to shrink into a compact pill after I scroll, so that it stays out of the way but within reach.
18. As a visitor, I want every navbar link to scroll to a section that exists, so that no link is a dead end.
19. As a phone visitor, I want a labelled Menu button that opens a full-screen menu, so that I can reach every section with my thumb.
20. As a keyboard user, I want the open menu to keep focus inside it, close on Escape, and return focus to the Menu button, so that I never lose my place.
21. As a keyboard user, I want a skip link as the first focusable element, so that I can jump straight to the main content.
22. As a keyboard user, I want a clear 2px vermilion focus ring with offset on every control, so that I always know where I am.
23. As a mouse user, I want a pointer cursor on every enabled control, so that I know what can be clicked.
24. As a visitor, I want the capability band to move with my scroll in two opposite rows, so that the list of capabilities has energy without autoplaying.
25. As a screen reader user, I want the capability band hidden from assistive technology, so that I don't hear a repeated word list that the Capabilities section already covers.
26. As a visitor with reduced motion on, I want the capability band to stay still, so that nothing moves when I scroll.
27. As a founder, I want Capabilities to show six kinds of work (web apps, mobile, AI products, desktop, e-commerce, engineering and infrastructure), each with a small illustration, so that I can see whether Qaf Labs builds what I need.
28. As a visitor, I want each capability card to glow at the border and show a soft spotlight under my cursor, so that the grid feels responsive.
29. As a visitor, I want the AI products card to show inputs flowing into the mark and out to an answer, played twice when it comes into view, so that I see the idea without a loop.
30. As a visitor, I want the desktop card's inbox to fill with notifications, the e-commerce card to show a quantity stepper and an order total, and the engineering card to type a build and deploy, so that each illustration shows its kind of work.
31. As a phone visitor, I want the web-app card's status rows to stay on one line, so that the illustration doesn't break at 390px.
32. As a tablet visitor, I want Capabilities in two columns, and in one column below 700px, so that cards are never crushed.
33. As any visitor, I want every mockup to be clearly an illustration with placeholder content (app.yourcompany.com, a placeholder cart item), so that nothing pretends to be a client product.
34. As a visitor, I want the Manifesto as the one light section, its sentences brightening as I scroll, so that the page's beliefs land one at a time.
35. As a low-vision visitor, I want Manifesto text never below 45% opacity, so that every sentence stays readable while it reveals.
36. As a visitor, I want the ink mark above the Manifesto text, so that the brand carries into the light section.
37. As a founder, I want Approach to walk through Discover, Design, Engineer, Ship and Evolve, so that I understand how a project runs.
38. As a desktop visitor, I want a sticky panel beside the Approach steps that shows the square and the circle moving toward each other, touching on Evolve with a flare, so that the brand idea plays out as I scroll.
39. As a desktop visitor, I want a tracing beam on the left that fills with vermilion as I move through the steps, so that I can see my progress.
40. As a visitor below 900px, I want each Approach step to show its own small still drawing instead of the sticky panel, so that the section works on a phone.
41. As a visitor, I want three Principle cards, each with the mark, a title and one line, so that I know how Qaf Labs holds the work.
42. As a desktop mouse user, I want the Principle cards to tilt slightly (at most 5 degrees) and show a spotlight under my cursor, so that they feel tactile.
43. As a touch or reduced-motion visitor, I want no tilt, so that cards don't move unexpectedly.
44. As a technical buyer, I want Stack to show the tools Qaf Labs uses as an orbit around the mark, with a readable list beside it, so that I can check the stack without decoding logos.
45. As a visitor, I want a visible Pause orbit button, so that I can stop the motion.
46. As a visitor with reduced motion on, I want the orbit still from the start, so that nothing circles.
47. As a visitor ready to talk, I want Contact to show "Tell us what you're making." under a vermilion lamp, with Start a conversation and Copy email, so that I can choose how to reach out.
48. As a visitor, I want Copy email to turn into "Copied" with a check, so that I know it worked.
49. As a screen reader user, I want the copy result announced, so that I get the same confirmation.
50. As a visitor whose browser blocks the clipboard, I want the email address shown on the page, so that I can still copy it by hand.
51. As a visitor, I want a footer with the large logo, the email, links to the three sections above, and the year, so that I have one more way to get in touch.
52. As a visitor who zooms text to 200%, I want nothing clipped or overlapping, so that I can still read everything.
53. As a phone visitor, I want no horizontal scroll and 44px tap targets, so that the page is comfortable on a phone.
54. As a phone visitor at 390px, I want the hero light to stay clear of the headline and sub-headline, so that the beam never crosses the text.
55. As a visitor, I want smooth scrolling that never breaks the pinned Approach section, so that scrolling feels polished without glitches.
56. As a visitor with reduced motion on, I want native scrolling, so that scroll speed is never altered.
57. As someone sharing the link, I want the title "Qaf Labs: Where structure meets craft", a description, and a preview image of the logo, so that the link looks right in chats and social posts.
58. As a visitor, I want the Qaf Labs favicon and an ink browser theme colour, so that the tab and the mobile browser bar match the brand.
59. As the owner, I want only ink, paper and vermilion on the page (white only inside the supplied mark and as the hot core of the light), so that the brand stays consistent.
60. As the owner, I want the logo and mark used only as the supplied files, unrotated, unrecoloured and whole, so that the brand rules hold.
61. As the owner, I want every string the design added marked for my approval, so that nothing ships in my voice without my sign-off.
62. As the owner, I want no client logos, testimonials, statistics or invented claims, so that everything on the page is true.
63. As the owner, I want copy and site settings (email, nav) kept in one place each, so that I can change them without editing sections.
64. As the owner, I want measured mobile Lighthouse scores of Performance 90+, Accessibility 95+, Best Practices 95+ and SEO 100, with LCP under 2.5s and CLS under 0.05, so that the page is fast and findable.
65. As a developer, I want sections rendered on the server, with client code only in interactive pieces, so that the page ships little JavaScript.
66. As a developer, I want every edit to an installed library file documented, so that re-running the installer doesn't silently undo brand fixes.

## Implementation Decisions

**Structure**
- The page composes one module per section: Navbar, Hero, Capability band, Capabilities, Manifesto, Approach, Principles and Stack, Contact, Footer. Sections are Server Components. Only interactive pieces are Client Components.
- Copy lives in one content module. Site settings (contact email, nav anchors) live in one config module. Strings the design added (eyebrow, capability titles and lines, Approach steps, principle lines) carry a `TODO copy: owner to approve` marker.
- Library components install with the shadcn CLI. Brand-tuned wrappers live in a separate brand components folder. Installed files stay where the CLI writes them (React Bits, Magic UI/Aceternity, Spectrum UI each have their own folder).

**Brand system**
- Tokens are defined once as CSS variables and Tailwind v4 `@theme` tokens: `--ink`, `--ink-2`, `--card`, `--paper`, `--vermilion`, `--vermilion-soft`, `--muted`, `--line`, `--line-strong`. Every library colour maps to these.
- Type: Geist (600 headings, 400 body) and Geist Mono for labels, section numbers and code, from the existing font setup. The starter's Arial rule is removed.
- Film grain over the whole page: SVG turbulence at 0.06 opacity, overlay blend.
- The page is dark with one light section and no theme toggle (owner-approved override).

**Brand rules over spec (ADR 0001)**
- Principle cards use the supplied on-dark mark, unrotated, on all three cards.
- In the hero, the mark sits above the light, unfiltered. The light splashes behind it.
- In Approach, the square and the circle are plain shapes while apart, and become the supplied mark file only when they touch.
- White appears only inside supplied brand files and as the hot core of the light.

**Library setup and edits (ADR 0002)**
- shadcn init uses the `base-nova` preset. Afterwards: strip its neutral token set and `.dark` variant back to brand tokens, fix `--font-sans` (init points it at itself), move `shadcn` to devDependencies, and remove the unused starter button and `@base-ui/react`.
- One animation library: Spectrum UI components import `motion/react` instead of `framer-motion`.
- Unused icon packages are removed: `@tabler/icons-react` (Resizable Navbar) and `@hugeicons/*` (Magic Bento). `lucide-react` covers any icon needed.
- The lamp is `@aceternity/lamp` (`LampContainer`), recoloured from slate and cyan.
- Split Text renders the hero `h1`, stays visible in the server HTML, and animates words with movement and a clip mask only, from full opacity. Under reduced motion it doesn't animate.
- Laser Flow: rewrite `TINTS` so every hue stays within about 22 degrees of vermilion. Add a clock limit that freezes time at about 14 seconds while the cursor effect keeps working. Settings: beam at 68% of the width (90% below 760px), intensity 1.45, beamWidth 1.35, flare 1.4, spread 1.4, spill 1, fog 0.22, dust 0.9, streaks 1.2, dots 0.9, pulse 0.8, speed 1. `surfaceRef` points at the hero frame. Its built-in reduced-motion still frame and off-screen pause are kept.

**Next.js 16 with Cache Components**
- The Laser Flow canvas loads through `next/dynamic` with `ssr: false`, called from a client component, because Server Components can't use `ssr: false` and don't code-split dynamic imports.
- Client render output is deterministic. Anything random, time-based or `window`-based runs in effects.
- Because pages are hidden with Activity instead of unmounted, effect cleanup must stop the WebGL loop, Lenis, scroll listeners and the orbit timer. The mobile menu resets to closed in a layout-effect cleanup.

**Motion**
- One WebGL effect (Laser Flow). No endless loops: Border Beam runs three times, the shiny text twice, the AI-card beam twice. The orbit has a visible Pause orbit button.
- Reduced motion shows end states: one still light frame, static text, no band movement, no orbit, no tilt, native scroll.
- Lenis smooth scroll runs on GSAP's ticker and keeps ScrollTrigger in sync. It is off under reduced motion, stopped while the mobile menu is open, and drives anchor links with a navbar offset. It stays only if Sticky Scroll Reveal still pins and steps correctly with it.

**Mobile**
- Breakpoints follow the reference: 1000px (code pane hidden), 900px (Approach panel replaced by per-step drawings), 860px (Menu replaces nav links), 760px (beam to 90%), 700px (phone pane hidden, selection scaled to 66%, single-column Capabilities).
- Below 760px the hero text block is capped at about 82% of the width so no line reaches the beam.
- Below 700px the Safari mockup hides its sidebar so the web-app status rows don't wrap. The copy stays the same.

**Accessibility**
- `<html lang="en">`, a skip link, header, nav, main and footer landmarks, one `h1`, no skipped heading levels.
- `cursor: pointer` on enabled controls and `cursor: not-allowed` on disabled ones, set once in the base layer. A 2px vermilion focus-visible ring with offset.
- Only real `<button>` and `<a href>` elements. Icon-only controls get `aria-label`. Decorative canvases and the capability band are `aria-hidden`. Mockups are labelled as illustrations. The hero frame is `role="img"` with the reference's `aria-label`.
- Contrast pairs follow the spec: ink text on vermilion buttons at 5.84:1, never paper text on vermilion below 24px, Manifesto reveal never below 45%. Every new pair is checked with the contrast script.

**Metadata**
- Title `Qaf Labs: Where structure meets craft`, a description, Open Graph and Twitter cards using the 2400px on-dark logo PNG, favicons from the brand kit, and theme colour `#0B0B0F`.

## Testing Decisions

- **One seam:** Playwright driving the production build (`next build` then `next start`) at 1440 x 900 and 390 x 844. Tests check what a visitor sees and can do, never component internals. A test passes or fails based on the DOM, screenshots, focus and visible text, not on which library renders a part.
- What the tests cover:
  - Every control does its job: nav anchors reach sections that exist, the menu opens, keeps focus inside, closes on Escape and returns focus, the skip link moves focus to main, Copy email shows "Copied" with an announcement or shows the address when the clipboard is denied, Pause orbit stops the orbit, and the email buttons point to the configured address.
  - Server HTML: with JavaScript off, the `h1`, sub-headline and buttons are present and visible.
  - Reduced motion (emulated): end states are shown, the orbit doesn't move, there's no tilt, and Lenis is inactive.
  - axe finds no violations at both widths.
  - Layout: no horizontal scroll at 390, tap targets at least 44px, nothing clipped at 200% text zoom, web-app status rows on one line at 390, and hero text clear of the beam at 390.
  - Screenshots of each section compared with the matching reference screenshots, with a tolerance that allows the animated light.
  - Colours: sampled computed colours on the page fall within the brand tokens and their alphas.
  - Console: no errors during load and click-through.
- Lighthouse is a measured check, not a test: mobile preset, median of 3 local runs of the production build, reported with real numbers only.
- Prior art: none. The repo has no tests, so Playwright and `@axe-core/playwright` are new dev dependencies, installed with bun.

## Out of Scope

- Pages other than `/`.
- A light theme or theme toggle.
- A contact form or backend. Contact goes through `mailto:` and Copy email.
- Final copy. The design's strings ship marked for owner approval.
- Confirming that `hello@qaflabs.net` is a live inbox, and finalising the tools list.
- Analytics, cookie banners and third-party scripts.
- Deployment and CI.
- Refactors outside what each phase needs.

## Further Notes

- Work in the phases from `docs/prompts/build-landing-page.md`: Foundation, Hero, Sections, Polish and audit. Stop after each phase with screenshots next to the references and the antislop Delivery Gate.
- Owner-approved antislop overrides (R-37): the bento grid with mockup illustrations (including the terminal), the eyebrow pill, glow on the hero, frame edge, bento borders, Approach flare and contact lamp, Geist and Geist Mono, and the dark page with one light section.
- The package manager is bun. In the Claude Code sandbox, `bun install`, `next build` and Playwright need to run outside the sandbox (temp-dir, port-binding and Chromium launch restrictions).
- Vocabulary follows `GLOSSARY.md`: mark, logo, light, hero frame, capability, capability band, Manifesto, Approach step, Principle, illustration.
