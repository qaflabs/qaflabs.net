"use client";

import { useState } from "react";
import { MorphButton } from "@/components/spectrumui/morph-button";
import { site } from "@/config/site";
import { contact } from "@/content/home";

type Result = "idle" | "copied" | "failed";

// Copies the address; if the clipboard is blocked the address is shown so it can be copied by hand.
export function CopyEmail() {
  const [result, setResult] = useState<Result>("idle");

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(site.email);
      setResult("copied");
    } catch (error) {
      setResult("failed");
      throw error;
    }
  };

  return (
    <>
      <MorphButton size="lg" announce={false} onAction={copy} successLabel={contact.copiedLabel} errorLabel={contact.copyFailedLabel}>
        {contact.copyCta}
      </MorphButton>
      <p id="copy-status" aria-live="polite" className="mt-4 min-h-[1.6em] w-full basis-full text-[15px] text-muted">
        {result === "copied" && `${site.email} ${contact.copiedSuffix}`}
        {result === "failed" && (
          <>
            {contact.copyFailedMessage}{" "}
            <span className="font-mono text-paper select-all">{site.email}</span>
          </>
        )}
      </p>
    </>
  );
}
