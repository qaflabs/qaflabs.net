import ScrollVelocity from "@/components/ScrollVelocity";
import { capabilityBand } from "@/content/home";
import { cn } from "@/lib/utils";

interface RowProps {
  offset: 0 | 1;
}

function Row({ offset }: RowProps) {
  return (
    <span className="flex items-center gap-[0.42em] pr-[0.42em]">
      {capabilityBand.map((word, i) => {
        const odd = (i + offset) % 2 === 1;
        return (
          <span key={word} className="flex items-center gap-[0.42em]">
            <span
              className={cn({
                "text-transparent [-webkit-text-stroke:1.5px_rgb(246_245_241/0.55)]": odd,
                "text-paper": !odd,
              })}
            >
              {word}
            </span>
            {odd ? (
              <span className="inline-block size-[0.34em] rounded-full bg-vermilion shadow-[0_0_30px_rgb(255_74_28/0.6)]" />
            ) : (
              <span className="inline-block size-[0.3em] rounded-[0.06em_0_0.06em_0.06em] bg-paper" />
            )}
          </span>
        );
      })}
    </span>
  );
}

export function CapabilityBand() {
  return (
    <div id="capability-band" aria-hidden="true" className="relative z-[3] -mt-10 overflow-hidden pt-[22px] pb-[26px]">
      <ScrollVelocity
        scrollOnly
        texts={[<Row key="a" offset={0} />, <Row key="b" offset={1} />]}
        velocity={-60}
        numCopies={3}
        velocityMapping={{ input: [0, 1000], output: [0, 5] }}
        scrollerClassName="text-[clamp(3rem,8.4vw,8rem)] leading-[1.05] font-semibold tracking-[-0.045em]"
        parallaxClassName="[&+&]:mt-1.5"
      />
    </div>
  );
}
