"use client";

import Image from "next/image";
import { useInView } from "motion/react";
import { useRef } from "react";
import { BorderBeam } from "@/components/ui/border-beam";
import { StickyScroll, type StickyScrollItem, type StickyScrollStep } from "@/components/ui/sticky-scroll-reveal";
import { TracingBeam } from "@/components/ui/tracing-beam";
import { approach } from "@/content/home";
import { cn } from "@/lib/utils";
import { usePrefersReducedMotion } from "@/lib/use-prefers-reduced-motion";

// Square (x, y) and circle centre (x, y) per step, in a 360 box; on the last step they touch.
const POSITIONS = [
  [40, 240, 300, 60],
  [40, 150, 300, 120],
  [80, 170, 260, 110],
  [95, 170, 232, 128],
  [100, 170, 211.92, 138.08],
] as const;
const LAST = POSITIONS.length - 1;
const SQUARE = "M14 0H80V66A14 14 0 0 1 66 80H14A14 14 0 0 1 0 66V14A14 14 0 0 1 14 0Z";
const RADIUS = 45.1;
// The mark's proportions differ from the loose shapes, so it fills their final footprint (x 100-257, y 93-250).
const MARK_SIZE = 157;

const items: StickyScrollItem[] = approach.steps.map((step) => ({ title: step.title, description: step.line }));

interface ShapesProps {
  step: number;
  animated: boolean;
}

// While apart these are plain shapes, not the logo; at the touch point the supplied mark takes over (ADR 0001).
function Shapes({ step, animated }: ShapesProps) {
  const [sx, sy, cx, cy] = POSITIONS[step];
  const touching = step === LAST;
  const motion = cn({
    "transition-[transform,opacity] duration-800 ease-[cubic-bezier(.2,.7,.2,1)] motion-reduce:transition-none": animated,
  });
  return (
    <div className="relative size-[360px]">
      <svg width="360" height="360" viewBox="0 0 360 360" className={cn("absolute inset-0", motion, { "opacity-0": touching })}>
        <g className={motion} style={{ transform: `translate(${sx}px, ${sy}px)` }}>
          <path d={SQUARE} fill="#f6f5f1" />
        </g>
        <g className={motion} style={{ transform: `translate(${cx}px, ${cy}px)` }}>
          <circle cx="0" cy="0" r={RADIUS} fill="#ff4a1c" />
        </g>
      </svg>
      <Image
        src="/brand/svg/qaf-labs-mark-on-dark.svg"
        alt=""
        width={MARK_SIZE}
        height={MARK_SIZE}
        unoptimized
        className={cn("absolute", motion, { "opacity-0": !touching })}
        style={{ left: 100, top: 93 }}
      />
    </div>
  );
}

interface ApproachPanelProps {
  active: number;
}

function ApproachPanel({ active }: ApproachPanelProps) {
  const ref = useRef<HTMLDivElement>(null);
  const seen = useInView(ref, { once: true, amount: 0.4 });
  const reduced = usePrefersReducedMotion();
  // Under reduced motion the panel holds its end state: the shapes have met and become the mark.
  const step = reduced ? LAST : active;

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className="relative flex h-[480px] items-center justify-center overflow-hidden rounded-card border border-paper/10 bg-card shadow-[0_-30px_90px_-50px_rgb(255_74_28/0.6)]"
    >
      <div className="absolute inset-0 bg-[radial-gradient(rgb(246_245_241/0.1)_1px,transparent_1.3px)] bg-size-[20px_20px] mask-[radial-gradient(closest-side,#000,transparent)]" />
      {seen && <BorderBeam size={160} duration={8} delay={0.4} />}
      <div
        className={cn(
          "absolute top-1/2 left-1/2 size-[280px] translate-x-[-50%] translate-y-[-47%] bg-[radial-gradient(closest-side,rgb(255_255_255/0.85),rgb(255_122_80/0.5)_18%,rgb(255_74_28/0.12)_50%,transparent)] opacity-0 transition-opacity duration-800 motion-reduce:transition-none",
          { "opacity-100": step === LAST },
        )}
      />
      <div className="relative">
        <Shapes step={step} animated />
      </div>
      <p className="absolute bottom-4 left-[22px] font-mono text-[12.5px] text-muted">
        {`0${active + 1} / 05  ${approach.steps[active].title}`}
      </p>
    </div>
  );
}

function Step({ item, index, active }: StickyScrollStep) {
  return (
    <div className="min-h-[300px] max-[901px]:min-h-0 max-[901px]:pb-14">
      <div aria-hidden="true" className="mb-3 hidden size-[72px] max-[901px]:block">
        <div className="origin-top-left scale-[0.2]">
          <Shapes step={index} animated={false} />
        </div>
      </div>
      <p className="font-mono text-[13px] text-vermilion-soft">{`0${index + 1}`}</p>
      {/* Only the title dims: the body keeps full muted contrast on every step. */}
      <h3
        className={cn(
          "mt-1.5 text-title leading-[1.05] font-semibold tracking-[-0.035em] transition-opacity duration-400 max-[901px]:opacity-100",
          { "opacity-45": !active },
        )}
      >
        {item.title}
      </h3>
      <p className="mt-3.5 max-w-[440px] text-muted">{item.description}</p>
    </div>
  );
}

export function ApproachSteps() {
  return (
    <StickyScroll
      content={items}
      renderItem={Step}
      panel={(active) => <ApproachPanel active={active} />}
      wrapList={(list) => <TracingBeam className="pb-[120px] max-[901px]:pb-0">{list}</TracingBeam>}
      className="mt-[72px] grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] gap-[72px] max-[901px]:grid-cols-1 max-[901px]:gap-0"
      contentClassName="max-[901px]:hidden"
    />
  );
}
