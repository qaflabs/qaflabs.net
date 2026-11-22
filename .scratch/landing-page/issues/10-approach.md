# 10: Approach

**What to build:** A visitor reads `02 Approach` ("A calm process for ambitious work.") through five Approach steps. On desktop a sticky panel shows the square and the circle drawing closer with each step; on Evolve they touch, become the mark, and a flare lights the touch point. A tracing beam fills as they read. Below 900px each step shows its own still drawing.

**Blocked by:** 01: Foundation and test harness

**Status:** ready-for-agent

- [ ] Aceternity Sticky Scroll Reveal: Discover, Design, Engineer, Ship, Evolve on the left, sticky panel on the right
- [ ] Aceternity Tracing Beam on the left edge fills with vermilion as you scroll
- [ ] Panel: square and circle are plain shapes while apart; on Evolve they become the supplied mark file and the flare appears behind the touch point (ADR 0001); white only at the flare core
- [ ] Magic UI Border Beam on the panel edge, three runs
- [ ] Below 900px the panel is hidden and each step shows a small static drawing
- [ ] Reduced motion: panel shows the end state, no beam movement
- [ ] Effects clean up on Activity hide
- [ ] Step copy carries the copy-approval marker
- [ ] Tests: five steps present; on the last step the panel shows the mark; per-step drawings visible at 390; axe clean
- [ ] Screenshots next to `desktop-06-approach.jpg`, `desktop-07-approach-end.jpg` and mobile references; Delivery Gate reported

## Comments

- 2026-11-23: Implemented. Sticky Scroll Reveal and Tracing Beam rewritten in place (page scroll, brand colours, render props, object-param step renderer). Loose shapes until Evolve, then the supplied mark fills their footprint with the flare behind. Only step titles dim (45%, 4.26:1 on large text) so bodies keep full contrast. Section labels now match the reference (14px sans, mono number). 110 tests pass.
