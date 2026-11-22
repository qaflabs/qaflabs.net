import { footer } from "@/content/home";

export function Footer() {
  return (
    <footer className="border-t border-line">
      <div className="mx-auto max-w-[1240px] px-6 py-10">
        <p className="font-mono text-[13px] text-muted">{footer.copyright}</p>
      </div>
    </footer>
  );
}
