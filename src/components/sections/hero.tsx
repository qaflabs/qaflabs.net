import Image from "next/image";
import { HeroFrame } from "@/components/brand/hero-frame";
import { HeroHeadline } from "@/components/brand/hero-headline";
import { HeroLight } from "@/components/brand/hero-light";
import { AnimatedShinyText } from "@/components/ui/animated-shiny-text";
import { HoverBorderGradient } from "@/components/ui/hover-border-gradient";
import { ShimmerButton } from "@/components/ui/shimmer-button";
import { mailto } from "@/config/site";
import { hero } from "@/content/home";

export function Hero() {
  return (
    <section id="hero" aria-labelledby="hero-title" className="relative overflow-hidden px-6 pt-[150px]">
      <HeroLight surfaceId="hero-frame" />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-[900px] bg-[radial-gradient(50%_55%_at_68%_0%,rgb(255_74_28/0.1),transparent_70%)] max-[760px]:bg-[radial-gradient(50%_55%_at_90%_0%,rgb(255_74_28/0.1),transparent_70%)]"
      />
      {/* Below 760px the text stops at 82% so no line reaches the beam at 90%. */}
      <div className="relative z-[11] mx-auto max-w-[1200px] max-[760px]:mr-[18%]">
        <p className="flex w-fit max-w-full items-center gap-2.5 rounded-full border border-paper/12 bg-ink-2/70 py-1.5 pr-3.5 pl-2 font-mono text-[13px]">
          <Image src="/brand/svg/qaf-labs-mark-on-dark.svg" alt="" width={18} height={18} unoptimized />
          <AnimatedShinyText>{hero.eyebrow}</AnimatedShinyText>
        </p>
        <HeroHeadline id="hero-title" text={`${hero.headlineLead} ${hero.headlineAccent}`}>
          {hero.headlineLead}{" "}
          <span className="[text-shadow:0_0_40px_color-mix(in_srgb,var(--vermilion)_45%,transparent)]">
            {hero.headlineAccent}
          </span>
        </HeroHeadline>
        <p className="mt-7 max-w-[520px] text-[clamp(1.0625rem,1.4vw,1.25rem)] leading-[1.55] text-muted [text-shadow:0_0_18px_var(--ink),0_0_4px_var(--ink)]">
          {hero.subheadline}
        </p>
        <div className="mt-10 flex flex-wrap gap-3">
          <ShimmerButton href={mailto} className="min-h-[54px] px-[30px] font-semibold">
            {hero.primaryCta}
          </ShimmerButton>
          <HoverBorderGradient
            as="a"
            href="#capabilities"
            className="inline-flex min-h-[52px] items-center px-[30px] font-semibold"
          >
            {hero.secondaryCta}
          </HoverBorderGradient>
        </div>
      </div>
      <HeroFrame />
    </section>
  );
}
