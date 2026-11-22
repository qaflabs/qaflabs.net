import Image from "next/image";
import { ManifestoText } from "@/components/brand/manifesto-text";
import { manifesto } from "@/content/home";

export function Manifesto() {
  return (
    <>
      <div aria-hidden="true" className="h-[180px] bg-linear-to-b from-ink to-paper" />
      <section
        id="manifesto"
        aria-label={manifesto.label}
        className="relative overflow-hidden bg-paper px-6 pt-[clamp(40px,7vw,100px)] pb-[clamp(64px,9vw,130px)] text-ink"
      >
        <div
          aria-hidden="true"
          className="absolute -top-[20%] -right-[10%] h-[140%] w-[60%] bg-[radial-gradient(closest-side,rgb(255_74_28/0.1),transparent)]"
        />
        <div className="relative mx-auto max-w-[1080px]">
          <Image
            src="/brand/svg/qaf-labs-mark.svg"
            alt="Qaf Labs mark"
            width={60}
            height={60}
            unoptimized
            className="mb-11 block"
          />
          <ManifestoText text={manifesto.sentences.join(" ")} />
        </div>
      </section>
      <div aria-hidden="true" className="h-[180px] bg-linear-to-b from-paper to-ink" />
    </>
  );
}
