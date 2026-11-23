import { ApproachSteps } from "@/components/brand/approach-steps";
import { SectionLabel } from "@/components/brand/section-label";
import { approach } from "@/content/home";

export function Approach() {
  return (
    <section
      id="approach"
      aria-labelledby="approach-title"
      className="relative z-[2] mx-auto max-w-[1240px] px-5 md:px-6 py-[clamp(64px,9vw,130px)]"
    >
      <SectionLabel number={approach.number} label={approach.label} />
      <h2
        id="approach-title"
        className="mt-5 max-w-[760px] text-heading leading-none font-semibold tracking-[-0.04em]"
      >
        {approach.title}
      </h2>
      <ApproachSteps />
    </section>
  );
}
