// Copy from docs/design/landing/index.html; "TODO copy" strings still need owner sign-off.

export const meta = {
  title: "Qaf Labs: Where structure meets craft",
  // TODO copy: owner to approve
  description:
    "Qaf Labs designs and engineers digital products across web, mobile, desktop and AI, built with rigor and finished with care.",
  skipLink: "Skip to content",
} as const;

export const hero = {
  // TODO copy: owner to approve
  eyebrow: "Qaf Labs · software company",
  headlineLead: "Where structure meets",
  headlineAccent: "craft.",
  subheadline:
    "We design and engineer digital products across web, mobile, desktop and AI, built with rigor and finished with care.",
  primaryCta: "Start a conversation",
  secondaryCta: "See what we build",
  frameLabel:
    "Illustration: a button component designed on a canvas, written as code, and previewed on a phone",
} as const;

export const capabilityBand = [
  "WEB APPS",
  "MOBILE",
  "DESKTOP",
  "AI PRODUCTS",
  "E-COMMERCE",
  "DESIGN SYSTEMS",
] as const;

export const capabilities = {
  number: "01",
  label: "Capabilities",
  title: "One team, every surface.",
  intro: "We design the first screen and deploy the production server.",
  // TODO copy: owner to approve
  cards: [
    {
      id: "web",
      number: "01.1",
      kind: "Web apps",
      title: "Web apps that stay fast as they grow",
      line: "Dashboards, portals and internal tools, built on Next.js and React.",
    },
    {
      id: "mobile",
      number: "01.2",
      kind: "Mobile apps",
      title: "One codebase, iOS and Android",
      line: "Native-feeling apps built with React Native and Expo.",
    },
    {
      id: "ai",
      number: "01.3",
      kind: "AI products",
      title: "AI that answers from your data",
      line: "Models wired into your product, with evaluation and guardrails for production.",
    },
    {
      id: "desktop",
      number: "01.4",
      kind: "Desktop apps",
      title: "Desktop software people keep open all day",
      line: "Fast, offline-ready apps for macOS and Windows.",
    },
    {
      id: "commerce",
      number: "01.5",
      kind: "E-commerce",
      title: "Checkouts built for how people buy",
      line: "Storefronts, carts and payments that hold up on launch day.",
    },
    {
      id: "infra",
      number: "01.6",
      kind: "Engineering and infrastructure",
      title: "From commit to production, set up to last",
      line: "CI, deploys and servers on Kubernetes, handed over so you own them.",
    },
  ],
} as const;

export const manifesto = {
  label: "Manifesto",
  sentences: [
    "Most software is built fast and forgotten faster.",
    "We build the other kind: structured enough to scale, and made with enough care that people keep using it.",
    "Engineering and design meet at one point, and that point is where we work.",
  ],
} as const;

export const approach = {
  number: "02",
  label: "Approach",
  title: "A calm process for ambitious work.",
  // TODO copy: owner to approve
  steps: [
    {
      title: "Discover",
      line: "We learn the problem, the people who have it, and the limits we have to work inside.",
    },
    {
      title: "Design",
      line: "We shape the product in screens you can click, before code makes every change expensive.",
    },
    {
      title: "Engineer",
      line: "We build it in small, reviewed pieces, with tests on the paths that matter most.",
    },
    {
      title: "Ship",
      line: "We release it to real users and watch what they actually do with it.",
    },
    {
      title: "Evolve",
      line: "We keep improving it from what real usage tells us, not from guesses.",
    },
  ],
} as const;

export const principles = {
  number: "03",
  label: "Principles",
  title: "How we hold the work.",
  // TODO copy: owner to approve
  items: [
    {
      title: "Craft over volume.",
      line: "We take on fewer projects and finish each one properly.",
    },
    {
      title: "Engineering decisions are design decisions.",
      line: "The data model, the load time and the error states are part of what people feel.",
    },
    {
      title: "Built to last.",
      line: "Code your next team can read, on infrastructure you own.",
    },
  ],
} as const;

export const stack = {
  number: "04",
  label: "Stack",
  title: "The tools we trust.",
  tools: [
    "TypeScript",
    "React",
    "Next.js",
    "Node.js",
    "Expo",
    "PostgreSQL",
    "Kubernetes",
    "Anthropic API",
    "OpenAI API",
  ],
  pauseLabel: "Pause orbit",
  resumeLabel: "Resume orbit",
} as const;

export const contact = {
  title: "Tell us what you're making.",
  line: "A few lines about the product and where it stands is enough to start.",
  primaryCta: "Start a conversation",
  copyCta: "Copy email",
  copiedLabel: "Copied",
} as const;

export const footer = {
  copyright: "© 2026 Qaf Labs",
} as const;
