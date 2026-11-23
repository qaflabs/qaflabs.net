import { CapabilityCards } from "@/components/brand/capability-cards";
import { SectionLabel } from "@/components/brand/section-label";
import { capabilities } from "@/content/home";

export function Capabilities() {
  return (
    <section
      id="capabilities"
      aria-labelledby="capabilities-title"
      className="relative z-[2] mx-auto max-w-[1240px] px-5 md:px-6 pt-[clamp(88px,11vw,160px)] pb-[clamp(64px,8vw,120px)]"
    >
      <SectionLabel number={capabilities.number} label={capabilities.label} />
      <div className="mt-5 flex flex-wrap items-end justify-between gap-6">
        <h2
          id="capabilities-title"
          className="max-w-[760px] text-heading leading-none font-semibold tracking-[-0.04em]"
        >
          {capabilities.title}
        </h2>
        <p className="max-w-[380px] text-muted">{capabilities.intro}</p>
      </div>
      <CapabilityCards />
    </section>
  );
}
