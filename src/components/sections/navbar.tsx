import Image from "next/image";
import { site } from "@/config/site";

export function Navbar() {
  return (
    <header className="absolute inset-x-0 top-0 z-50">
      <div className="mx-auto flex max-w-[1240px] items-center px-6 py-6">
        <a href="#top" className="inline-flex min-h-11 items-center" aria-label={`${site.name}, back to top`}>
          <Image
            src="/brand/svg/qaf-labs-logo-on-dark.svg"
            alt=""
            width={90}
            height={24}
            unoptimized
            priority
            className="h-6 w-auto"
          />
        </a>
      </div>
    </header>
  );
}
