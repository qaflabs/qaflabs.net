import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Grain } from "@/components/brand/grain";
import { site } from "@/config/site";
import { meta } from "@/content/home";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const { title, description } = meta;
const shareAlt = "Qaf Labs: Where structure meets craft. A vermilion beam lands on the Qaf Labs mark.";
const ogImage = {
  url: "/brand/social/qaf-labs-og-1200x630.png",
  width: 1200,
  height: 630,
  alt: shareAlt,
};
// X crops large cards to 2:1, so it gets its own 1200 x 600 file.
const xImage = {
  url: "/brand/social/qaf-labs-x-card-1200x600.png",
  width: 1200,
  height: 600,
  alt: shareAlt,
};

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title,
  description,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: "/",
    siteName: site.name,
    title,
    description,
    images: [ogImage],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: [xImage],
  },
  icons: {
    icon: [
      { url: "/brand/favicon/favicon.svg", type: "image/svg+xml" },
      { url: "/brand/favicon/favicon-32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: { url: "/brand/favicon/favicon-180.png", sizes: "180x180" },
  },
};

export const viewport: Viewport = {
  themeColor: "#0B0B0F",
  colorScheme: "dark",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} antialiased`}
    >
      <body className="min-h-dvh">
        <a
          href="#main"
          className="absolute left-4 -top-20 z-[200] rounded-lg bg-paper px-4 py-3 font-semibold text-ink no-underline focus:top-4"
        >
          {meta.skipLink}
        </a>
        {children}
        <Grain />
      </body>
    </html>
  );
}
