import Image from "next/image";
import { BorderBeam } from "@/components/ui/border-beam";
import { cn } from "@/lib/utils";
import { hero, heroFrame } from "@/content/home";

const swatchShape: Record<(typeof heroFrame.swatches)[number], string> = {
  ink: "rounded-[3px] border border-paper/30 bg-ink",
  paper: "rounded-[3px] bg-paper",
  vermilion: "rounded-full bg-vermilion",
};

const handle = "absolute size-2 border border-vermilion bg-paper";
const redlineTag = "absolute rounded px-1.5 py-px font-mono text-[11px] font-medium bg-vermilion text-ink";

function DesignPane() {
  return (
    <div className="relative h-full border-r border-line bg-[radial-gradient(rgb(246_245_241/0.09)_1px,transparent_1.3px)] bg-size-[18px_18px]">
      <p className="absolute top-4 left-5 font-mono text-xs text-muted">{heroFrame.layer}</p>
      <div className="absolute top-[44%] left-1/2 -translate-x-1/2 -translate-y-1/2 max-[701px]:scale-[0.66]">
        <div className="relative rounded-full bg-vermilion px-[30px] py-4 text-[17px] font-semibold whitespace-nowrap text-ink shadow-[0_12px_40px_-12px_rgb(255_74_28/0.8)]">
          {heroFrame.button}
        </div>
        <div className="absolute -inset-2 rounded-md border border-vermilion-soft" />
        <span className={cn(handle, "-top-3 -left-3")} />
        <span className={cn(handle, "-top-3 -right-3")} />
        <span className={cn(handle, "-bottom-3 -left-3")} />
        <span className={cn(handle, "-right-3 -bottom-3")} />
        <div className="absolute inset-x-0 -top-10 h-px bg-vermilion-soft" />
        <span className={cn(redlineTag, "-top-14 left-1/2 -translate-x-1/2")}>{heroFrame.padding}</span>
        <div className="absolute inset-y-0 -right-11 w-px bg-vermilion-soft" />
        <span className={cn(redlineTag, "top-1/2 -right-[78px] -translate-y-1/2")}>{heroFrame.height}</span>
      </div>
      <div className="absolute inset-x-5 bottom-[22px] flex flex-wrap gap-2">
        {heroFrame.swatches.map((name) => (
          <span
            key={name}
            className="inline-flex items-center gap-2 rounded-lg border border-paper/10 px-2.5 py-1.5 font-mono text-[11.5px] text-muted"
          >
            <span className={cn("size-3", swatchShape[name])} />
            {name}
          </span>
        ))}
        <span className="inline-flex items-center rounded-lg border border-paper/10 px-2.5 py-1.5 font-mono text-[11.5px] text-muted">
          {heroFrame.radius}
        </span>
      </div>
    </div>
  );
}

function CodePane() {
  return (
    <div className="overflow-hidden border-r border-line py-[22px] font-mono text-[13px] leading-[1.85] whitespace-pre text-muted max-[1001px]:hidden">
      {heroFrame.code.map(([keyword, token, rest], i) => (
        <div key={i} className="flex">
          <span className="w-11 flex-none pr-4 text-right text-paper/30">{i + 1}</span>
          <span>
            <span className="text-vermilion-soft">{keyword}</span>
            <span className="text-paper">{token}</span>
            <span>{rest}</span>
          </span>
        </div>
      ))}
    </div>
  );
}

function PreviewPane() {
  return (
    <div className="relative flex justify-center bg-[radial-gradient(60%_50%_at_50%_30%,rgb(255_74_28/0.08),transparent)] pt-[34px] max-[701px]:hidden">
      <div className="h-[440px] w-[212px] rounded-[34px] border border-paper/16 bg-ink p-2.5 shadow-[inset_0_0_0_4px_var(--ink-2)]">
        <div className="relative h-full rounded-[26px] bg-ink-2 px-4 pt-[38px] pb-4">
          <div className="absolute top-2.5 left-1/2 h-[18px] w-16 -translate-x-1/2 rounded-[10px] bg-ink" />
          <p className="text-xl leading-[1.05] font-semibold tracking-[-0.03em]">{heroFrame.phoneTitle}</p>
          <p className="mt-2.5 text-xs leading-[1.45] text-muted">{heroFrame.phoneLine}</p>
          <div className="mt-5 rounded-full bg-vermilion py-[11px] text-center text-[13px] font-semibold text-ink shadow-[0_8px_24px_-8px_rgb(255_74_28/0.9)]">
            {heroFrame.button}
          </div>
          <div className="mt-[22px] rounded-window border border-line p-3">
            <Image src="/brand/svg/qaf-labs-mark-on-dark.svg" alt="" width={28} height={28} unoptimized />
            <p className="mt-2.5 text-[11.5px] text-muted">{heroFrame.phoneNote}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export function HeroFrame() {
  return (
    <div className="relative z-10 mx-auto mt-[110px] max-w-[1240px]">
      {/* The light sits behind the mark; the mark file itself carries no filter (ADR 0001). */}
      <div
        aria-hidden="true"
        className="absolute top-0 left-[68%] z-10 size-40 -translate-1/2 rounded-full bg-[radial-gradient(closest-side,rgb(255_74_28/0.55),transparent)] max-[761px]:left-[90%]"
      />
      <Image
        src="/brand/svg/qaf-labs-mark-on-dark.svg"
        alt=""
        width={52}
        height={52}
        unoptimized
        priority
        className="absolute top-0 left-[68%] z-20 -translate-x-[50.95%] -translate-y-[49.05%] max-[761px]:left-[90%]"
      />
      <figure
        id="hero-frame"
        role="img"
        aria-label={hero.frameLabel}
        className="relative m-0 h-[560px] overflow-hidden rounded-t-frame border border-b-0 border-paper/10 bg-[linear-gradient(var(--ink-2),var(--card))] shadow-[0_-30px_120px_-40px_rgb(255_74_28/0.55)] mask-[linear-gradient(#000_70%,transparent)]"
      >
        <BorderBeam size={160} duration={8} delay={1.6} />
        <div aria-hidden="true" className="contents">
          <div className="flex h-[46px] items-center gap-2 border-b border-line px-3.5 text-[12.5px] text-muted">
            {heroFrame.tabs.map((tab, i) => (
              <span
                key={tab}
                className={cn("px-2.5 py-[5px] font-mono", {
                  "rounded-lg bg-paper/7 text-paper": i === 0,
                  "max-[701px]:hidden": i > 0,
                })}
              >
                {tab}
              </span>
            ))}
            <span className="ml-auto inline-flex items-center gap-2 font-mono whitespace-nowrap max-[701px]:hidden">
              <span className="size-[7px] rounded-full bg-vermilion" />
              {heroFrame.status}
            </span>
          </div>
          <div className="grid h-[514px] grid-cols-[minmax(0,40fr)_minmax(0,36fr)_minmax(0,24fr)] max-[1001px]:grid-cols-[minmax(0,58fr)_minmax(0,42fr)] max-[701px]:grid-cols-1">
            <DesignPane />
            <CodePane />
            <PreviewPane />
          </div>
        </div>
      </figure>
    </div>
  );
}
