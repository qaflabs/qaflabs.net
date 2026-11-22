# 05: The light

**What to build:** A visitor sees a vermilion beam fall at 68% of the width, splash onto the top edge of the hero frame behind the mark, and pour over its corners. After about 14 seconds the light settles; it still answers the cursor. It stops drawing when the hero scrolls away, and shows one still frame under reduced motion. On a phone the beam stays clear of every line of hero text.

**Blocked by:** 04: Hero frame

**Status:** ready-for-agent

- [ ] React Bits Laser Flow installed; `TINTS` rewritten so every tint stays within about 22 degrees of vermilion (no cyan, pink, green, blue or purple), matching the reference approach
- [ ] Clock limit added: time freezes at about 14 seconds, cursor reaction continues
- [ ] Settings: intensity 1.45, beamWidth 1.35, flare 1.4, spread 1.4, spill 1, fog 0.22, dust 0.9, streaks 1.2, dots 0.9, pulse 0.8, speed 1; `surfaceRef` on the hero frame
- [ ] Loaded with `next/dynamic` and `ssr: false` from a client component; canvas `aria-hidden`; render loop stops in effect cleanup (Activity)
- [ ] Off-screen pause and reduced-motion still frame both work
- [ ] Below 760px the beam sits at 90% and the hero text block is capped at about 82% of the width, so no headline or sub-headline line reaches the beam at 390
- [ ] Mark stays above the light; the light is behind it, never on it (ADR 0001)
- [ ] Tests: canvas present and hidden from assistive technology; text bounding boxes end left of the beam at 390; reduced motion leaves one frame; no console errors
- [ ] LCP element identified as the `h1`; Lighthouse mobile measured (median of 3 local runs), numbers reported as measured or "not measured"
- [ ] Screenshots at 1440 and 390, reduced motion on and off, next to the hero references; Delivery Gate reported
