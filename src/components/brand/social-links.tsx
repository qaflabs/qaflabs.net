import { site } from "@/config/site";
import { socialIcons } from "@/content/social-icons";
import { cn } from "@/lib/utils";

interface SocialLinksProps {
  className?: string;
}

export function SocialLinks({ className }: SocialLinksProps) {
  return (
    <ul role="list" className={cn("flex items-center gap-2", className)}>
      {site.socials.map((social) => (
        <li key={social.href}>
          <a
            href={social.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${site.name} on ${social.label}`}
            className="inline-flex size-11 items-center justify-center rounded-full border border-line text-muted transition-colors hover:border-line-strong hover:text-paper"
          >
            <svg viewBox="0 0 24 24" aria-hidden="true" className="size-[18px] fill-current">
              <path d={socialIcons[social.icon]} />
            </svg>
          </a>
        </li>
      ))}
    </ul>
  );
}
