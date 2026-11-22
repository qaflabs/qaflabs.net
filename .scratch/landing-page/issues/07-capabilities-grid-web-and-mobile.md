# 07: Capabilities grid with web and mobile cards

**What to build:** A visitor reaches `01 Capabilities` ("One team, every surface.") and sees a varied card grid that glows at the border and lights under the cursor. The web-app and mobile cards are complete with their illustrations; the other four cards show title and line, with illustrations filled in by ticket 08.

**Blocked by:** 01: Foundation and test harness

**Status:** ready-for-agent

- [ ] Heading and intro line beside it, section number in `--vermilion-soft`
- [ ] React Bits Magic Bento on a 12-column grid: rows of 7 + 5, 5 + 7, 6 + 6; vermilion border glow and soft spotlight follow the cursor; hairline top highlight and faint vermilion glow per card
- [ ] `@hugeicons/*` imports removed from the installed component
- [ ] Web apps card: Magic UI Safari with `app.yourcompany.com`, sidebar, area chart, two status rows; below 700px the sidebar is hidden so the rows stay on one line at 390
- [ ] Mobile card: Magic UI iPhone with a task list using Spectrum UI Task Checkbox (switched to `motion/react`) and a floating button
- [ ] Mockups labelled as illustrations; placeholder content only
- [ ] Two columns on tablet, one below 700px
- [ ] Card titles and lines carry the copy-approval marker
- [ ] Tests: six cards present; status rows single-line at 390; column count at 1440, 900 and 390; axe clean
- [ ] Screenshots next to `desktop-03`, `desktop-04`, `mobile-03`, `mobile-04`; Delivery Gate reported

## Comments

- 2026-11-23: Implemented with ticket 08. Magic Bento edited (demo visuals and @hugeicons removed, 12-col spans at full width, 2 then 1 column below 1000px and 700px). Safari and iPhone render live children; Safari sidebar hides below 700px so status rows stay on one line. 95 tests pass.
