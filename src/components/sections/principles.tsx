import { SectionLabel } from "@/components/brand/section-label";
import { principles, stack } from "@/content/home";

export function Principles() {
  return (
    <section
      id="principles"
      aria-labelledby="principles-title"
      className="mx-auto max-w-[1240px] px-6 pt-[clamp(40px,6vw,80px)] pb-[clamp(64px,9vw,130px)]"
    >
      <SectionLabel number={principles.number} label={principles.label} />
      <h2
        id="principles-title"
        className="mt-5 max-w-[760px] text-[clamp(2.25rem,4.6vw,4rem)] leading-none font-semibold tracking-[-0.04em]"
      >
        {principles.title}
      </h2>
      <div id="stack" className="mt-[clamp(88px,11vw,150px)]">
        <SectionLabel number={stack.number} label={stack.label} />
        <h3 className="mt-5 text-[clamp(2rem,3.4vw,3rem)] leading-[1.02] font-semibold tracking-[-0.04em]">
          {stack.title}
        </h3>
      </div>
    </section>
  );
}
