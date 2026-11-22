"use client";
import React, { useEffect, useRef, useState } from "react";
import { motion, useTransform, useScroll, useSpring } from "motion/react";
import { cn } from "@/lib/utils";

// Brand edits (ADR 0002): a straight hairline that fills with vermilion and ends in a glowing dot,
// height measured with a ResizeObserver, no cyan or purple; under reduced motion only the line shows.
interface TracingBeamProps {
  children: React.ReactNode;
  className?: string;
}

export const TracingBeam = ({ children, className }: TracingBeamProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start center", "end center"],
  });

  const contentRef = useRef<HTMLDivElement>(null);
  const [svgHeight, setSvgHeight] = useState(0);

  useEffect(() => {
    const element = contentRef.current;
    if (!element) return;
    const observer = new ResizeObserver(([entry]) => setSvgHeight(entry.contentRect.height));
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  const end = useSpring(useTransform(scrollYProgress, [0, 1], [0, svgHeight]), {
    stiffness: 500,
    damping: 90,
  });
  const start = useTransform(end, (value) => Math.max(0, value - 240));

  return (
    <motion.div ref={ref} className={cn("relative w-full", className)}>
      <div aria-hidden="true" className="absolute top-2 left-0">
        <svg viewBox={`0 0 14 ${svgHeight}`} width="14" height={svgHeight} className="block overflow-visible">
          <path d={`M 7 0 V ${svgHeight}`} fill="none" stroke="rgb(246 245 241 / 0.1)" strokeWidth="1" />
          <motion.path
            d={`M 7 0 V ${svgHeight}`}
            fill="none"
            stroke="url(#tracing-gradient)"
            strokeWidth="1.25"
            className="motion-reduce:hidden"
          />
          <motion.circle
            cx="7"
            cy={end}
            r="4.5"
            fill="#ff4a1c"
            className="motion-reduce:hidden"
            style={{ filter: "drop-shadow(0 0 7px rgb(255 74 28 / 0.8))" }}
          />
          <defs>
            <motion.linearGradient id="tracing-gradient" gradientUnits="userSpaceOnUse" x1="0" x2="0" y1={start} y2={end}>
              <stop stopColor="#ff4a1c" stopOpacity="0" />
              <stop offset="1" stopColor="#ff4a1c" />
            </motion.linearGradient>
          </defs>
        </svg>
      </div>
      <div ref={contentRef} className="pl-9">
        {children}
      </div>
    </motion.div>
  );
};
