import { defineConfig } from "@playwright/test";

const PORT = 4317;

export default defineConfig({
  testDir: "./tests/e2e",
  fullyParallel: true,
  // Timing-based checks (light clock, scroll, animations) get flaky when too many browsers share the CPU.
  workers: 4,
  reporter: "list",
  use: {
    baseURL: `http://localhost:${PORT}`,
    browserName: "chromium",
  },
  projects: [
    {
      name: "desktop",
      use: { viewport: { width: 1440, height: 900 } },
    },
    {
      name: "mobile",
      use: { viewport: { width: 390, height: 844 }, hasTouch: true, isMobile: true },
    },
  ],
  webServer: {
    command: `bun run build && bun run start -- -p ${PORT}`,
    url: `http://localhost:${PORT}`,
    reuseExistingServer: false,
    timeout: 240_000,
  },
});
