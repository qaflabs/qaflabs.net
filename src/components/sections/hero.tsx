import { hero } from "@/content/home";

export function Hero() {
  return (
    <section id="hero" aria-labelledby="hero-title" className="relative overflow-hidden px-6 pt-[150px] pb-24">
      <div className="relative mx-auto max-w-[1200px]">
        <h1
          id="hero-title"
          className="mt-7 max-w-[820px] text-[clamp(3rem,7.6vw,7.25rem)] leading-[0.95] font-semibold tracking-[-0.048em]"
        >
          {hero.headlineLead}{" "}
          <span className="[text-shadow:0_0_40px_color-mix(in_srgb,var(--vermilion)_45%,transparent)]">
            {hero.headlineAccent}
          </span>
        </h1>
        <p className="mt-7 max-w-[520px] text-[clamp(1.0625rem,1.4vw,1.25rem)] leading-[1.55] text-muted">
          {hero.subheadline}
        </p>
      </div>
    </section>
  );
}
