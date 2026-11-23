"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useSyncExternalStore } from "react";

const LaserFlow = dynamic(() => import("@/components/LaserFlow"), { ssr: false });

interface HeroLightProps {
  surfaceId: string;
}

const NARROW = "(max-width: 760px)";
// The beam settles after its intro; past this it holds still and only answers the cursor.
const CLOCK_SECONDS = 14;

const subscribe = (onChange: () => void) => {
  const query = window.matchMedia(NARROW);
  query.addEventListener("change", onChange);
  return () => query.removeEventListener("change", onChange);
};
const isNarrow = () => window.matchMedia(NARROW).matches;
const serverNarrow = () => false;

export function HeroLight({ surfaceId }: HeroLightProps) {
  const surfaceRef = useRef<HTMLElement | null>(null);
  const narrow = useSyncExternalStore(subscribe, isNarrow, serverNarrow);

  useEffect(() => {
    surfaceRef.current = document.getElementById(surfaceId);
  }, [surfaceId]);

  return (
    <LaserFlow
      aria-hidden="true"
      className="absolute! inset-0 z-[9]"
      surfaceRef={surfaceRef}
      color="#ff4a1c"
      beamPosition={narrow ? 0.9 : 0.68}
      intensity={1.45}
      beamWidth={1.35}
      flare={1.4}
      spread={1.4}
      spill={1}
      fog={0.22}
      dust={0.9}
      streaks={1.2}
      dots={0.9}
      pulse={0.8}
      speed={1}
      timeLimit={CLOCK_SECONDS}
    />
  );
}
