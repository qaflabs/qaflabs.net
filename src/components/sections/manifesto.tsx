import { manifesto } from "@/content/home";

export function Manifesto() {
  return (
    <section id="manifesto" aria-label={manifesto.label} className="bg-paper px-6 py-[clamp(96px,12vw,180px)] text-ink">
      <p className="mx-auto max-w-[1000px] text-[clamp(1.75rem,3.6vw,3.25rem)] leading-[1.12] font-semibold tracking-[-0.035em]">
        {manifesto.sentences.join(" ")}
      </p>
    </section>
  );
}
