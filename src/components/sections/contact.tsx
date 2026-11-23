import { CopyEmail } from "@/components/brand/copy-email";
import { LampContainer } from "@/components/ui/lamp";
import { ShimmerButton } from "@/components/ui/shimmer-button";
import { mailto } from "@/config/site";
import { contact } from "@/content/home";

export function Contact() {
  return (
    <section
      id="contact"
      aria-labelledby="contact-title"
      className="relative z-[2] overflow-hidden px-6 pb-[clamp(96px,12vw,160px)] text-center"
    >
      <LampContainer>
        <h2
          id="contact-title"
          className="mx-auto max-w-[900px] text-[clamp(2.75rem,6.8vw,6rem)] leading-[0.98] font-semibold tracking-[-0.048em]"
        >
          {contact.title}
        </h2>
        <p className="mx-auto mt-6 max-w-[520px] text-lg text-muted">{contact.line}</p>
        <div className="mt-10 flex flex-wrap justify-center gap-3">
          <ShimmerButton href={mailto} className="min-h-14 px-8 font-semibold">
            {contact.primaryCta}
          </ShimmerButton>
          <CopyEmail />
        </div>
      </LampContainer>
    </section>
  );
}
