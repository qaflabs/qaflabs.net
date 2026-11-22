import { contact } from "@/content/home";

export function Contact() {
  return (
    <section id="contact" aria-labelledby="contact-title" className="px-6 py-[clamp(96px,12vw,160px)] text-center">
      <h2
        id="contact-title"
        className="mx-auto max-w-[900px] text-[clamp(2.75rem,6.8vw,6rem)] leading-[0.98] font-semibold tracking-[-0.048em]"
      >
        {contact.title}
      </h2>
      <p className="mx-auto mt-6 max-w-[480px] text-muted">{contact.line}</p>
    </section>
  );
}
