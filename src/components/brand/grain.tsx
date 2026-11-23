// A pre-rendered noise tile on its own layer: a live SVG filter with a blend mode re-renders on
// every scroll frame and dropped Safari to about 15fps.
export function Grain() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[60] bg-[url('/textures/grain.png')] bg-size-[128px_128px] opacity-[0.05] will-change-transform"
    />
  );
}
