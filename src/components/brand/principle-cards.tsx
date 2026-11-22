"use client";

import Image from "next/image";
import SpotlightCard from "@/components/SpotlightCard";
import { TiltCard } from "@/components/spectrumui/tilt-card";
import { principles } from "@/content/home";

export function PrincipleCards() {
  return (
    <ul className="mt-14 grid list-none grid-cols-3 gap-4 p-0 max-[1000px]:grid-cols-1">
      {principles.items.map((item) => (
        <li key={item.title}>
          <TiltCard maxTilt={5} containerClassName="h-full" className="h-full">
            <SpotlightCard
              spotlightColor="#ff4a1c"
              intensity={0.2}
              spotlightSize={340}
              borderGlow={0.5}
              className="flex h-full min-h-[280px] flex-col rounded-card p-8"
            >
              {/* The supplied mark, unrotated on every card (ADR 0001). */}
              <Image src="/brand/svg/qaf-labs-mark-on-dark.svg" alt="" width={44} height={44} unoptimized />
              <h3 className="mt-auto pt-12 text-[clamp(1.75rem,2.6vw,2.25rem)] leading-[1.05] font-semibold tracking-[-0.035em]">
                {item.title}
              </h3>
              <p className="mt-3 text-muted">{item.line}</p>
            </SpotlightCard>
          </TiltCard>
        </li>
      ))}
    </ul>
  );
}
