# 04: Hero frame

**What to build:** Below the hero copy, a visitor sees the hero frame: an illustration of one primary button as a design (selected and redlined), as its code, and on a phone. The mark sits on the frame's top edge. A Border Beam travels the edge three times, then stops. Screen readers hear one short description instead of the panes.

**Blocked by:** 03: Hero copy and headline

**Status:** ready-for-agent

- [ ] Three panes built as real markup, matching the reference values: design canvas, `Button.tsx` code, phone preview; tab row and the "main · checks passed" status
- [ ] Figure has `role="img"` and the reference's `aria-label`; inner panes hidden from assistive technology
- [ ] Supplied mark (52px, on-dark file) sits on the top edge at the beam's landing point, whole and unfiltered (ADR 0001)
- [ ] Magic UI Border Beam in vermilion runs three times and stops; static under reduced motion
- [ ] Frame fades out at the bottom; radius 16px, inner windows 12px
- [ ] Below 1000px the code pane is hidden; below 700px the phone pane is hidden and the selection scales to 66%
- [ ] No horizontal scroll at 390; code text contrast checked
- [ ] Tests: frame exposes one labelled image; pane visibility at 1440, 900 and 390; Border Beam stops; axe clean
- [ ] Screenshots next to `desktop-02-frame.jpg` and `mobile-02-frame.jpg`; Delivery Gate reported
