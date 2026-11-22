import { SectionLabel } from "@/components/brand/section-label";
import { capabilities } from "@/content/home";

export function Capabilities() {
  return (
    <section
      id="capabilities"
      aria-labelledby="capabilities-title"
      className="mx-auto max-w-[1240px] px-6 py-[clamp(64px,9vw,130px)]"
    >
      <SectionLabel number={capabilities.number} label={capabilities.label} />
      <div className="mt-5 flex flex-wrap items-end justify-between gap-6">
        <h2
          id="capabilities-title"
          className="max-w-[760px] text-[clamp(2.25rem,4.6vw,4rem)] leading-none font-semibold tracking-[-0.04em]"
        >
          {capabilities.title}
        </h2>
        <p className="max-w-[360px] text-muted">{capabilities.intro}</p>
      </div>
    </section>
  );
}
