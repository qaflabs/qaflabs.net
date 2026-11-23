import { Approach } from "@/components/sections/approach";
import { Capabilities } from "@/components/sections/capabilities";
import { CapabilityBand } from "@/components/sections/capability-band";
import { Contact } from "@/components/sections/contact";
import { Footer } from "@/components/sections/footer";
import { Hero } from "@/components/sections/hero";
import { Manifesto } from "@/components/sections/manifesto";
import { Navbar } from "@/components/sections/navbar";
import { Principles } from "@/components/sections/principles";
import { SmoothScroll } from "@/components/brand/smooth-scroll";
import { site } from "@/config/site";

// Only facts that are true today: the name, site, logo and contact address.
const organization = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: site.name,
  url: site.url,
  logo: `${site.url}/brand/png/qaf-labs-logo-2400.png`,
  email: site.email,
};

export default function Home() {
  return (
    <div id="top">
      <script
        type="application/ld+json"
        // JSON.stringify of a fixed object; "<" is escaped so the string can't close the script tag.
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organization).replace(/</g, "\\u003c") }}
      />
      <Navbar />
      <main id="main" tabIndex={-1}>
        <Hero />
        <CapabilityBand />
        <Capabilities />
        <Manifesto />
        <Approach />
        <Principles />
        <Contact />
      </main>
      <Footer />
      <SmoothScroll />
    </div>
  );
}
