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
const shareImage = {
  url: "/brand/png/qaf-labs-logo-on-dark-2400.png",
  width: 2400,
  height: 644,
  alt: "Qaf Labs",
};

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title,
  description,
  openGraph: {
    type: "website",
    url: "/",
    siteName: site.name,
    title,
    description,
    images: [shareImage],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: [shareImage.url],
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
