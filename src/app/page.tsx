import { Approach } from "@/components/sections/approach";
import { Capabilities } from "@/components/sections/capabilities";
import { Contact } from "@/components/sections/contact";
import { Footer } from "@/components/sections/footer";
import { Hero } from "@/components/sections/hero";
import { Manifesto } from "@/components/sections/manifesto";
import { Navbar } from "@/components/sections/navbar";
import { Principles } from "@/components/sections/principles";

export default function Home() {
  return (
    <div id="top">
      <Navbar />
      <main id="main" tabIndex={-1}>
        <Hero />
        <Capabilities />
        <Manifesto />
        <Approach />
        <Principles />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
