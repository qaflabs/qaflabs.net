# Installed library components are edited in place

The landing page uses real components from React Bits, Magic UI, Aceternity UI and Spectrum UI, installed with the shadcn CLI. A few defaults conflict with the design or the performance targets, so we edit those installed files rather than wrap or fork them. Re-running `shadcn add` on these components will overwrite the edits, so reapply them afterwards.

- **Split Text** renders the hero headline as `h1`, is visible in the server HTML, and animates words with movement only from full opacity. The library default hides the text until fonts load and fades from opacity 0, which blanks the headline without JavaScript and delays LCP.
- **Laser Flow** freezes its clock after about 14 seconds (cursor reaction continues), and its `TINTS` hue shifts stay within about 22 degrees of vermilion, so no cyan, pink or green appears.
- **Spectrum UI** components import `motion/react` instead of `framer-motion`, so one animation library ships.
- Unused icon packages (`@tabler/icons-react`, `@hugeicons/*`) are removed from imports; `lucide-react` covers any icon needed.
- Library colours are replaced with brand tokens.

## Considered Options

- Wrapping only, leaving CLI files untouched: rejected because the problems (hidden text, opacity-0 start, endless clock, hard-coded hues) are inside the components and can't be fixed from props.
