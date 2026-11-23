const nav = [
  { label: "Capabilities", href: "#capabilities" },
  { label: "Approach", href: "#approach" },
  { label: "Principles", href: "#principles" },
  { label: "Contact", href: "#contact" },
] as const;

const socials = [
  { label: "GitHub", href: "https://github.com/qaflabs", icon: "github" },
  { label: "Facebook", href: "https://www.facebook.com/qaflabs.net/", icon: "facebook" },
] as const;

export const site = {
  name: "Qaf Labs",
  url: "https://qaflabs.net",
  email: "hello@qaflabs.net",
  nav,
  socials,
  // The footer sits under Contact, so it links back to the other sections only.
  footerNav: nav.filter((item) => item.href !== "#contact"),
} as const;

export const mailto = `mailto:${site.email}`;
