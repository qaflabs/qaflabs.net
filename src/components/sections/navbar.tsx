"use client";

import Image from "next/image";
import { lazy, Suspense, useCallback, useEffect, useLayoutEffect, useRef, useState, type MouseEvent } from "react";
import { HoverBorderGradient } from "@/components/ui/hover-border-gradient";
import { ProgressiveBlur } from "@/components/ui/progressive-blur";
import { NavBody, NavItems, Navbar as ResizableNavbar } from "@/components/ui/resizable-navbar";
import { ShimmerButton } from "@/components/ui/shimmer-button";
import { mailto, site } from "@/config/site";
import { nav as copy } from "@/content/home";
import { setScrollLocked } from "@/lib/smooth-scroll";

// The menu (and GSAP) loads on the first open, so it never weighs on the first paint.
const StaggeredMenu = lazy(() => import("@/components/StaggeredMenu"));

const navItems = site.nav.map((item) => ({ name: item.label, link: item.href }));
const menuItems = site.nav.map((item) => ({
  label: item.label,
  ariaLabel: item.label,
  link: item.href,
}));

function Logo() {
  return (
    <Image
      src="/brand/svg/qaf-labs-logo-on-dark.svg"
      alt=""
      width={90}
      height={24}
      unoptimized
      priority
      className="block h-6 w-[90px]"
    />
  );
}

export function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [menuLoaded, setMenuLoaded] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  const closeMenu = useCallback(() => {
    setMenuOpen(false);
    menuButtonRef.current?.focus();
  }, []);

  // Activity hides this page instead of unmounting it, so reset the transient menu state on hide.
  useLayoutEffect(() => () => setMenuOpen(false), []);

  useEffect(() => {
    if (!menuOpen) return;
    const root = document.documentElement;
    root.style.overflow = "hidden";
    setScrollLocked(true);
    return () => {
      root.style.overflow = "";
      setScrollLocked(false);
    };
  }, [menuOpen]);

  const closeOnLink = (event: MouseEvent<HTMLDivElement>) => {
    if (event.target instanceof Element && event.target.closest("a[href^='#']")) {
      // Unlock before Lenis handles the same click, or the anchor scroll is swallowed.
      setScrollLocked(false);
      closeMenu();
    }
  };

  return (
    <header>
      <ResizableNavbar className="group">
        <div
          aria-hidden="true"
          className="pointer-events-none fixed inset-x-0 top-0 h-24 opacity-0 transition-opacity duration-300 group-data-scrolled:opacity-100"
        >
          <ProgressiveBlur position="top" height="100%" blurLevels={[0.5, 1, 2, 4, 6, 8, 10, 12]} />
        </div>
        <NavBody>
          <a href="#top" aria-label={copy.logoLabel} className="inline-flex min-h-11 items-center">
            <Logo />
          </a>
          <nav aria-label="Main" className="max-[861px]:hidden">
            <NavItems items={navItems} />
          </nav>
          <ShimmerButton href={mailto} className="min-h-11 px-5 text-[15px] font-semibold max-[861px]:hidden">
            {copy.cta}
          </ShimmerButton>
          <HoverBorderGradient
            as="button"
            type="button"
            ref={menuButtonRef}
            aria-expanded={menuOpen}
            aria-controls="staggered-menu-panel"
            onClick={() => {
              setMenuLoaded(true);
              setMenuOpen(true);
            }}
            containerClassName="min-[861px]:hidden"
            className="inline-flex min-h-11 items-center px-5 text-[15px] font-semibold"
          >
            {copy.menu}
          </HoverBorderGradient>
        </NavBody>
      </ResizableNavbar>

      {menuLoaded && (
      <Suspense fallback={null}>
      <div onClickCapture={closeOnLink}>
        <StaggeredMenu
          isFixed
          hideHeader
          open={menuOpen}
          onClose={closeMenu}
          panelLabel={copy.menu}
          items={menuItems}
          displaySocials={false}
          panelHeader={
            <div className="flex items-center justify-between">
              <Logo />
              <HoverBorderGradient
                as="button"
                type="button"
                onClick={closeMenu}
                className="inline-flex min-h-11 items-center px-5 text-[15px] font-semibold"
              >
                {copy.close}
              </HoverBorderGradient>
            </div>
          }
          footer={
            <ShimmerButton href={mailto} className="min-h-[54px] w-full font-semibold">
              {copy.cta}
            </ShimmerButton>
          }
        />
      </div>
      </Suspense>
      )}
    </header>
  );
}
