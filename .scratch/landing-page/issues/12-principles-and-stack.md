# 12: Principles and Stack

**What to build:** A visitor reads `03 Principles` ("How we hold the work.") on three cards that tilt slightly and light under the cursor, then `04 Stack` ("The tools we trust."): the mark at the centre of two orbits of tool logos, a readable list of the tools beside it, and a Pause orbit button.

**Blocked by:** 01: Foundation and test harness

**Status:** ready-for-agent

- [ ] Three React Bits Spotlight Cards with Spectrum UI Tilt Card (switched to `motion/react`): at most 5 degrees, desktop mouse only, none on touch or under reduced motion
- [ ] Each card shows the supplied on-dark mark, unrotated (ADR 0001), a title and one line; lines carry the copy-approval marker
- [ ] Magic UI Orbiting Circles: mark at the centre, two orbits of TypeScript, React, Next.js, Node.js, Expo, PostgreSQL, Kubernetes, Anthropic, and OpenAI as a text label
- [ ] Visible tool list beside the orbit
- [ ] Pause orbit button (real `<button>`, label changes to resume) stops and restarts the motion; orbit still from the start under reduced motion
- [ ] Orbit timer cleaned up on Activity hide
- [ ] Tests: Pause orbit stops movement and toggles its label; no tilt under reduced motion; tool list readable; axe clean
- [ ] Screenshots next to `desktop-08-principles.jpg`, `desktop-09-stack.jpg` and mobile references; Delivery Gate reported

## Comments

- 2026-11-23: Implemented. Spotlight Card (brand surface, settings synced in a layout effect), Tilt Card (motion/react, 5 degrees, mouse-only, no glare), Orbiting Circles (paused prop, paused under reduced motion). Tool glyphs from Simple Icons via the reference; OpenAI as text. 127 tests pass.
- 2026-11-23: Stack updated from the owner's resume (Technical Skills) at their request: languages first (TypeScript, Python, Dart, SQL), 21 tools, languages and runtimes on the inner orbit, a new polyglot line marked TODO copy. OpenAI shows as a text tile and AWS is list-only (neither has a Simple Icons glyph); the orbit carries 15 of the 21 listed tools. 127 tests pass.
