"use client";
import React from "react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";
import { usePrefersReducedMotion } from "@/lib/use-prefers-reduced-motion";

// Brand edits (ADR 0002): vermilion cone, glow and filament on ink instead of cyan on slate,
// sized as a section header (not a full screen), opens once in view and is static under
// reduced motion; the demo default export is removed.
interface LampContainerProps {
  children: React.ReactNode;
  className?: string;
}

export const LampContainer = ({ children, className }: LampContainerProps) => {
  const reduced = usePrefersReducedMotion();
  const open = (from: string, to: string) =>
    reduced
      ? { initial: false as const, animate: { width: to, opacity: 1 } }
      : {
          initial: { width: from, opacity: 0.5 },
          whileInView: { width: to, opacity: 1 },
          viewport: { once: true },
          transition: { delay: 0.2, duration: 0.8, ease: "easeInOut" as const },
        };

  return (
    <div className={cn("relative z-0 w-full", className)}>
      <div aria-hidden="true" className="pointer-events-none relative mx-auto h-[300px] max-w-[1100px]">
        <motion.div
          {...open("40%", "min(980px, 100%)")}
          className="absolute top-10 left-1/2 h-80 -translate-x-1/2 blur-[18px]"
        >
          <div className="size-full bg-[linear-gradient(rgb(255_74_28/0.5),rgb(255_74_28/0.12)_55%,transparent)] [clip-path:polygon(32%_0,68%_0,100%_100%,0_100%)]" />
        </motion.div>
        <div className="absolute top-2.5 left-1/2 h-[90px] w-[520px] max-w-[80%] -translate-x-1/2 rounded-full bg-vermilion opacity-55 blur-[46px]" />
        <div className="absolute top-10 left-1/2 h-[60px] w-[300px] max-w-[60%] -translate-x-1/2 rounded-full bg-vermilion-soft opacity-60 blur-[26px]" />
        <motion.div
          {...open("20%", "min(560px, 86%)")}
          className="absolute top-[39px] left-1/2 h-0.5 -translate-x-1/2 bg-[linear-gradient(90deg,transparent,var(--vermilion-soft),var(--paper),var(--vermilion-soft),transparent)] shadow-[0_0_18px_2px_rgb(255_74_28/0.8)]"
        />
      </div>
      <div className="relative -mt-[150px]">{children}</div>
    </div>
  );
};
