"use client";

import Image from "next/image";
import { useInView } from "motion/react";
import { useRef, useState, type CSSProperties, type ReactNode, type RefObject } from "react";
import MagicBento, { type MagicBentoItem } from "@/components/MagicBento";
import { TaskCheckbox } from "@/components/spectrumui/task-checkbox";
import { QuantityStepper } from "@/components/spectrumui/quantity-stepper";
import { AnimatedBeam } from "@/components/ui/animated-beam";
import { AnimatedList } from "@/components/ui/animated-list";
import { Iphone } from "@/components/ui/iphone";
import { NumberTicker } from "@/components/ui/number-ticker";
import { Safari } from "@/components/ui/safari";
import { AnimatedSpan, Terminal, TypingAnimation } from "@/components/ui/terminal";
import { capabilities, capabilityVisuals as v } from "@/content/home";
import { cn } from "@/lib/utils";

type CardId = (typeof capabilities.cards)[number]["id"];

interface CardTextProps {
  number: string;
  kind: string;
  title: string;
  line: string;
}

interface CardShellProps {
  visual: ReactNode;
  text: CardTextProps;
  visualClassName: string;
  decorative?: boolean;
}

// Cards draw their own padding, so Magic Bento's default inset is removed.
const BENTO_STYLE = { "--mb-pad": "0px" } as CSSProperties;

const CHART = "M0 92 C40 88 60 70 100 74 S160 40 200 50 S270 24 300 30 S360 12 400 8";

function CardText({ number, kind, title, line }: CardTextProps) {
  return (
    <div className="relative z-[1] px-7 pt-[22px] pb-7">
      <p className="font-mono text-[12.5px] text-muted">
        {number} · {kind}
      </p>
      <h3 className="mt-1.5 text-2xl font-semibold tracking-[-0.025em]">{title}</h3>
      <p className="mt-1.5 text-[15.5px] text-muted">{line}</p>
    </div>
  );
}

function CardShell({ visual, text, visualClassName, decorative = true }: CardShellProps) {
  return (
    <div className="relative flex h-full flex-col">
      <span aria-hidden="true" className="absolute inset-x-[10%] top-0 z-[2] h-px bg-linear-to-r from-transparent via-paper/28 to-transparent" />
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -top-[120px] left-1/2 h-60 w-[420px] -translate-x-1/2 bg-[radial-gradient(closest-side,rgb(255_74_28/0.16),transparent)]"
      />
      <div aria-hidden={decorative || undefined} className={visualClassName}>
        {visual}
      </div>
      <div className="mt-auto">
        <CardText {...text} />
      </div>
    </div>
  );
}

function WebVisual() {
  return (
    <Safari url={v.web.url} mode="simple" className="shadow-[0_-20px_60px_-30px_rgb(255_74_28/0.5)]">
      <div className="flex h-full bg-ink">
        <div className="flex w-[132px] flex-none flex-col gap-[9px] border-r border-paper/7 px-3 py-3.5 text-xs text-muted max-[701px]:hidden">
          {v.web.nav.map((item, i) =>
            i === 0 ? (
              <span key={item} className="flex items-center gap-[7px] text-paper">
                <span className="size-1.5 rounded-full bg-vermilion" />
                {item}
              </span>
            ) : (
              <span key={item}>{item}</span>
            ),
          )}
        </div>
        <div className="min-w-0 flex-1 px-4 py-3.5">
          <p className="text-sm font-semibold">{v.web.heading}</p>
          <svg viewBox="0 0 400 120" preserveAspectRatio="none" className="mt-2.5 block h-24 w-full">
            <defs>
              <linearGradient id="capability-chart" x1="0" x2="0" y1="0" y2="1">
                <stop offset="0" stopColor="#ff4a1c" stopOpacity=".35" />
                <stop offset="1" stopColor="#ff4a1c" stopOpacity="0" />
              </linearGradient>
            </defs>
            <path d={`${CHART} V120 H0 Z`} fill="url(#capability-chart)" />
            <path d={CHART} fill="none" stroke="#ff4a1c" strokeWidth="2" />
          </svg>
          <div className="mt-2.5 flex flex-col gap-[7px] text-[11.5px]">
            {v.web.rows.map((row, i) => (
              <div key={row.name} className="flex justify-between gap-3 rounded-[7px] bg-paper/4 px-2.5 py-[7px] whitespace-nowrap">
                <span className="truncate">{row.name}</span>
                <span className={cn("font-mono", { "text-vermilion-soft": i === 0, "text-muted": i !== 0 })}>{row.status}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Safari>
  );
}

function MobileVisual() {
  return (
    <div className="w-[196px]">
      <Iphone className="drop-shadow-[0_-20px_40px_rgb(255_74_28/0.25)]">
        <div className="relative h-full bg-ink-2 px-3.5 pt-14 pb-3.5">
          <p className="text-[19px] font-semibold tracking-[-0.03em]">{v.mobile.heading}</p>
          <div className="mt-3 flex flex-col gap-2">
            {v.mobile.tasks.map((task) => (
              <div key={task.label} className="rounded-[10px] bg-paper/5 px-2.5 py-2 [&_*]:text-[11.5px] [&_*]:leading-4 [&_*]:whitespace-nowrap">
                <TaskCheckbox size="sm" label={task.label} defaultChecked={task.done} disabled className="opacity-100" />
              </div>
            ))}
          </div>
          <span className="absolute right-3.5 bottom-16 size-[42px] rounded-full bg-vermilion shadow-[0_8px_24px_-6px_rgb(255_74_28/0.9)]" />
        </div>
      </Iphone>
    </div>
  );
}

interface NodeProps {
  nodeRef: RefObject<HTMLDivElement | null>;
  label: string;
  round?: boolean;
  accent?: boolean;
}

function Node({ nodeRef, label, round = false, accent = false }: NodeProps) {
  return (
    <div className="flex flex-col items-center gap-2">
      <div
        ref={nodeRef}
        className={cn("z-10 size-9 border bg-ink-2", {
          "rounded-full": round,
          "rounded-lg": !round,
          "border-vermilion": accent,
          "border-paper/30": !accent,
        })}
      />
      <span className="font-mono text-[11px] text-muted">{label}</span>
    </div>
  );
}

function AiVisual() {
  const container = useRef<HTMLDivElement>(null);
  const docs = useRef<HTMLDivElement>(null);
  const tickets = useRef<HTMLDivElement>(null);
  const chat = useRef<HTMLDivElement>(null);
  const hub = useRef<HTMLDivElement>(null);
  const answer = useRef<HTMLDivElement>(null);
  const seen = useInView(container, { once: true, amount: 0.5 });
  // 2.2px vermilion strokes with a glow, as in the reference diagram.
  const beam = {
    containerRef: container,
    toRef: hub,
    duration: 2.2,
    pathOpacity: 0.12,
    pathWidth: 2.2,
    className: "[filter:drop-shadow(0_0_6px_rgb(255_74_28/0.9))]",
  };

  return (
    <div ref={container} className="relative mx-auto flex h-full max-w-[440px] items-center justify-between px-[34px]">
      <div className="flex flex-col gap-4">
        <Node nodeRef={docs} label={v.ai.inputs[0]} />
        <Node nodeRef={tickets} label={v.ai.inputs[1]} round />
        <Node nodeRef={chat} label={v.ai.inputs[2]} />
      </div>
      <div ref={hub} className="z-10 grid size-[76px] place-items-center rounded-[20px] border border-paper/22 bg-ink-2">
        <Image src="/brand/svg/qaf-labs-mark-on-dark.svg" alt="" width={40} height={40} unoptimized />
      </div>
      <Node nodeRef={answer} label={v.ai.output} round accent />
      {seen && (
        <>
          <AnimatedBeam {...beam} fromRef={docs} curvature={40} />
          <AnimatedBeam {...beam} fromRef={tickets} delay={0.3} />
          <AnimatedBeam {...beam} fromRef={chat} curvature={-40} delay={0.6} />
          <AnimatedBeam {...beam} fromRef={hub} toRef={answer} delay={1.1} />
        </>
      )}
    </div>
  );
}

function DesktopVisual() {
  const glyphs = [
    <span key="0" className="size-2.5 rounded-full bg-vermilion" />,
    <span key="1" className="size-2.5 rounded-[2px] bg-paper" />,
    <span key="2" className="size-2.5 rounded-full border-[1.5px] border-paper" />,
  ];
  return (
    <div className="h-full overflow-hidden rounded-t-window border border-b-0 border-paper/12 bg-ink">
      <div className="flex h-9 items-center justify-between border-b border-line bg-ink-2 px-3.5 text-xs">
        <span className="font-semibold">{v.desktop.title}</span>
        <span className="font-mono text-[11px] text-muted">{v.desktop.tag}</span>
      </div>
      <AnimatedList delay={600} className="gap-[9px] p-3.5">
        {[...v.desktop.notes].reverse().map((note) => {
          const index = v.desktop.notes.findIndex((n) => n.title === note.title);
          return (
            <div key={note.title} className="flex w-full items-center gap-3 rounded-window border border-paper/7 bg-ink-2 px-3.5 py-[11px]">
              <span
                className={cn("grid size-[30px] flex-none place-items-center rounded-lg", {
                  "bg-vermilion/16": index === 0,
                  "bg-paper/8": index !== 0,
                })}
              >
                {glyphs[index]}
              </span>
              <span className="text-[13px] leading-snug">
                <b className="font-semibold">{note.title}</b>
                <br />
                <span className="text-muted">{note.line}</span>
              </span>
            </div>
          );
        })}
      </AnimatedList>
    </div>
  );
}

function CommerceVisual() {
  const [quantity, setQuantity] = useState(1);
  return (
    <div className="w-full max-w-[360px] rounded-frame border border-paper/10 bg-ink-2 p-[18px] shadow-[0_30px_60px_-30px_rgb(255_74_28/0.45)]">
      <div className="flex items-center gap-3.5">
        <span aria-hidden="true" className="grid size-14 flex-none place-items-center rounded-window bg-linear-135 from-paper/12 to-paper/4">
          <span className="size-[18px] rounded-full bg-vermilion" />
        </span>
        <span className="flex-1 text-sm">
          <b className="font-semibold">{v.commerce.item}</b>
          <br />
          <span className="text-muted">{v.commerce.variant}</span>
        </span>
        <QuantityStepper value={quantity} onValueChange={setQuantity} min={1} max={9} size="sm" />
      </div>
      <div className="mt-4 flex items-baseline justify-between border-t border-line pt-3.5">
        <span className="text-[13px] text-muted">{v.commerce.totalLabel}</span>
        <span className="font-mono text-[22px] font-medium">
          $<NumberTicker value={v.commerce.unitPrice * quantity} decimalPlaces={2} aria-live="polite" />
        </span>
      </div>
      <div aria-hidden="true" className="mt-3.5 rounded-full bg-vermilion py-3 text-center text-sm font-semibold text-ink">
        {v.commerce.pay}
      </div>
    </div>
  );
}

function InfraVisual() {
  return (
    <Terminal title={v.infra.title} className="text-[13px]">
      <span className="flex gap-1.5">
        <span className="text-vermilion-soft">$</span>
        <TypingAnimation duration={40}>{v.infra.build}</TypingAnimation>
      </span>
      <AnimatedSpan className="text-muted">{v.infra.built}</AnimatedSpan>
      <span className="flex gap-1.5">
        <span className="text-vermilion-soft">$</span>
        <TypingAnimation duration={40}>{v.infra.deploy}</TypingAnimation>
      </span>
      <AnimatedSpan className="text-muted">{v.infra.uploaded}</AnimatedSpan>
      <AnimatedSpan>
        <span>
          <span className="text-vermilion">●</span> {v.infra.live}
        </span>
      </AnimatedSpan>
    </Terminal>
  );
}

interface CardVisual {
  node: ReactNode;
  className: string;
  span: number;
  decorative?: boolean;
}

const VISUALS: Record<CardId, CardVisual> = {
  web: { node: <WebVisual />, className: "relative z-[1] h-[300px] overflow-hidden px-7 pt-7", span: 7 },
  mobile: { node: <MobileVisual />, className: "relative z-[1] flex h-[300px] justify-center overflow-hidden pt-7", span: 5 },
  ai: { node: <AiVisual />, className: "relative z-[1] h-[300px] px-[18px] pt-6", span: 5 },
  desktop: { node: <DesktopVisual />, className: "relative z-[1] h-[300px] overflow-hidden px-7 pt-7", span: 7 },
  commerce: {
    node: <CommerceVisual />,
    className: "relative z-[1] flex h-[280px] items-center justify-center p-7",
    span: 6,
    decorative: false,
  },
  infra: { node: <InfraVisual />, className: "relative z-[1] h-[280px] p-7", span: 6 },
};

export function CapabilityCards() {
  const items: MagicBentoItem[] = capabilities.cards.map((card) => {
    const visual = VISUALS[card.id];
    return {
      id: card.id,
      colSpan: visual.span,
      content: (
        <CardShell
          visual={
            visual.decorative === false ? (
              <div role="group" aria-label={v.commerce.label} className="contents">
                {visual.node}
              </div>
            ) : (
              visual.node
            )
          }
          visualClassName={visual.className}
          decorative={visual.decorative !== false}
          text={{ number: card.number, kind: card.kind, title: card.title, line: card.line }}
        />
      ),
    };
  });

  return (
    <MagicBento
      items={items}
      columns={12}
      minCell={64.7}
      minPair={318.5}
      rowHeight={420}
      gap={16}
      radius={18}
      glowColor="#ff4a1c"
      spotlightRadius={360}
      textAutoHide={false}
      clickEffect={false}
      enableStars={false}
      enableTilt={false}
      enableMagnetism={false}
      className="mt-14"
      style={BENTO_STYLE}
    />
  );
}
