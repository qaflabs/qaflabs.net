import Image from "next/image";
import { mailto, site } from "@/config/site";
import { footer } from "@/content/home";

export function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-line">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-[260px] left-1/2 h-[420px] w-[900px] -translate-x-1/2 bg-[radial-gradient(closest-side,rgb(255_74_28/0.22),transparent)]"
      />
      <div className="relative mx-auto max-w-[1240px] px-6 pt-[72px] pb-9">
        <Image
          src="/brand/svg/qaf-labs-logo-on-dark.svg"
          alt={site.name}
          width={1633}
          height={438}
          unoptimized
          className="block h-auto w-[clamp(260px,56vw,720px)]"
        />
        <div className="mt-14 flex flex-wrap items-center justify-between gap-5">
          <a href={mailto} className="inline-flex min-h-11 items-center text-lg font-semibold text-paper hover:text-vermilion-soft">
            {site.email}
          </a>
          <nav aria-label="Footer" className="flex flex-wrap gap-x-[22px] text-[15px]">
            {site.footerNav.map((item) => (
              <a key={item.href} href={item.href} className="inline-flex min-h-11 items-center text-muted transition-colors hover:text-paper">
                {item.label}
              </a>
            ))}
          </nav>
          <p className="font-mono text-[13px] text-muted">{footer.copyright}</p>
        </div>
      </div>
    </footer>
  );
}
