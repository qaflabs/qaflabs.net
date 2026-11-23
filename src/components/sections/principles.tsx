import { PrincipleCards } from "@/components/brand/principle-cards";
import { SectionLabel } from "@/components/brand/section-label";
import { StackOrbit } from "@/components/brand/stack-orbit";
import { principles } from "@/content/home";

export function Principles() {
  return (
    <section
      id="principles"
      aria-labelledby="principles-title"
      className="relative z-[2] mx-auto max-w-[1240px] px-6 pt-[clamp(40px,6vw,80px)] pb-[clamp(64px,9vw,130px)]"
    >
      <SectionLabel number={principles.number} label={principles.label} />
      <h2
        id="principles-title"
        className="mt-[18px] max-w-[760px] text-heading leading-none font-semibold tracking-[-0.04em]"
      >
        {principles.title}
      </h2>
      <PrincipleCards />
      <div id="stack" role="group" aria-labelledby="stack-title">
        <StackOrbit />
      </div>
    </section>
  );
}
