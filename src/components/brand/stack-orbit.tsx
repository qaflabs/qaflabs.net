"use client";

import Image from "next/image";
import { useState, type ReactNode } from "react";
import { HoverBorderGradient } from "@/components/ui/hover-border-gradient";
import { OrbitingCircles } from "@/components/ui/orbiting-circles";
import { stack } from "@/content/home";
import { toolIcons, type ToolIcon } from "@/content/tool-icons";

// Languages and runtimes on the inner ring, what we build with on the outer one.
const INNER: ToolIcon[] = ["typescript", "python", "dart", "nodedotjs"];
const OUTER: ToolIcon[] = ["react", "nextdotjs", "nestjs", "fastapi", "flutter", "postgresql", "redis", "docker", "kubernetes", "anthropic"];

interface TileProps {
  children: ReactNode;
}

function Tile({ children }: TileProps) {
  return (
    <span className="grid size-12 place-items-center rounded-[14px] border border-paper/12 bg-ink-2">{children}</span>
  );
}

interface GlyphProps {
  name: ToolIcon;
}

function Glyph({ name }: GlyphProps) {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" aria-hidden="true">
      <path d={toolIcons[name]} fill="rgb(246 245 241 / 0.7)" />
    </svg>
  );
}

export function StackOrbit() {
  const [paused, setPaused] = useState(false);

  return (
    <div className="mt-[clamp(88px,11vw,150px)] flex flex-wrap items-center justify-between gap-12">
      <div className="max-w-[440px] flex-[1_1_320px]">
        <p className="mb-3.5 text-sm text-muted">
          <span className="font-mono text-vermilion-soft">{stack.number}</span> {stack.label}
        </p>
        <h3 id="stack-title" className="text-[clamp(2rem,3.4vw,3rem)] leading-[1.02] font-semibold tracking-[-0.04em]">
          {stack.title}
        </h3>
        <p className="mt-3.5 text-muted">{stack.line}</p>
        <ul className="mt-[18px] flex list-none flex-wrap gap-2 p-0">
          {stack.tools.map((tool) => (
            <li key={tool} className="rounded-full border border-paper/10 px-2.5 py-[5px] font-mono text-xs text-muted">
              {tool}
            </li>
          ))}
        </ul>
        <HoverBorderGradient
          as="button"
          type="button"
          aria-pressed={paused}
          onClick={() => setPaused((value) => !value)}
          containerClassName="mt-[26px]"
          className="inline-flex min-h-11 items-center px-5 text-[15px] font-semibold"
        >
          {paused ? stack.resumeLabel : stack.pauseLabel}
        </HoverBorderGradient>
      </div>

      {/* 470px orbit, scaled to 330px below 900px as in the reference. */}
      <div className="mx-auto size-[470px] flex-none max-[900px]:size-[330px]">
        <div
          aria-hidden="true"
          data-orbit
          className="relative flex size-[470px] origin-top-left items-center justify-center max-[900px]:scale-[0.7021]"
        >
          <div className="absolute inset-0 bg-[radial-gradient(closest-side,rgb(255_74_28/0.14),transparent_60%)]" />
          <Image src="/brand/svg/qaf-labs-mark-on-dark.svg" alt="" width={72} height={72} unoptimized className="relative z-10" />
          <OrbitingCircles radius={120} duration={60} iconSize={48} paused={paused}>
            {INNER.map((name) => (
              <Tile key={name}>
                <Glyph name={name} />
              </Tile>
            ))}
          </OrbitingCircles>
          <OrbitingCircles radius={206} duration={90} iconSize={48} reverse paused={paused}>
            {[
              ...OUTER.map((name) => (
                <Tile key={name}>
                  <Glyph name={name} />
                </Tile>
              )),
              <Tile key="openai">
                <span className="font-mono text-[9.5px] text-paper/70">OpenAI</span>
              </Tile>,
            ]}
          </OrbitingCircles>
        </div>
      </div>
    </div>
  );
}
