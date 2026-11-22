// Fixed to the viewport so the noise filter paints once instead of across the full page height.
export function Grain() {
  return (
    <svg
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[60] h-full w-full opacity-[0.06] mix-blend-overlay"
      xmlns="http://www.w3.org/2000/svg"
    >
      <filter id="grain">
        <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves={2} stitchTiles="stitch" />
        <feColorMatrix type="saturate" values="0" />
      </filter>
      <rect width="100%" height="100%" filter="url(#grain)" />
    </svg>
  );
}
