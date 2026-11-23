"use client";

import Image from "next/image";
import { lazy, Suspense, useCallback, useEffect, useLayoutEffect, useRef, useState, type MouseEvent } from "react";
import { SocialLinks } from "@/components/brand/social-links";
import { ProgressiveBlur } from "@/components/ui/progressive-blur";
import { NavBody, NavItems, Navbar as ResizableNavbar } from "@/components/ui/resizable-navbar";
import { ShimmerButton } from "@/components/ui/shimmer-button";
import { mailto, site } from "@/config/site";
import { nav as copy } from "@/content/home";
import { setScrollLocked } from "@/lib/smooth-scroll";
import { cn } from "@/lib/utils";

// The menu (and GSAP) loads after the page settles, so it never weighs on the first paint.
const StaggeredMenu = lazy(() => import("@/components/StaggeredMenu"));
// Matches the breakpoint where the Menu button shows.
const MENU_QUERY = "(max-width: 860px)";

const navItems = site.nav.map((item) => ({ name: item.label, link: item.href }));
const menuItems = site.nav.map((item) => ({
  label: item.label,
  ariaLabel: item.label,
  link: item.href,
}));

// Plain icons, not pills, so the phone header carries a single call to action.
// The Menu icon gets a dark disc because the phone beam runs right behind it.
const iconButton =
  "-mr-2.5 inline-flex size-11 items-center justify-center rounded-full text-paper transition-colors hover:text-vermilion-soft";

interface MenuIconProps {
  path: string;
}

function MenuIcon({ path }: MenuIconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="size-6 fill-none stroke-current stroke-[1.75]" strokeLinecap="round">
      <path d={path} />
    </svg>
  );
}

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

  // Mount the closed menu at idle on phones, so the first tap plays the animation instead of loading it.
  useEffect(() => {
    if (!window.matchMedia(MENU_QUERY).matches) return;
    const load = () => setMenuLoaded(true);
    if ("requestIdleCallback" in window) {
      const id = window.requestIdleCallback(load, { timeout: 4000 });
      return () => window.cancelIdleCallback(id);
    }
    const id = setTimeout(load, 2000);
    return () => clearTimeout(id);
  }, []);

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
          <button
            type="button"
            ref={menuButtonRef}
            aria-label={copy.menu}
            aria-expanded={menuOpen}
            aria-controls="staggered-menu-panel"
            onClick={() => {
              setMenuLoaded(true);
              setMenuOpen(true);
            }}
            className={cn(iconButton, "bg-ink/70 min-[861px]:hidden")}
          >
            <MenuIcon path="M4 8.5h16M4 15.5h16" />
          </button>
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
            // Same spots as the navbar's logo and Menu button, so nothing jumps when the menu opens.
            <div className="flex items-center justify-between pl-3">
              <Logo />
              <button type="button" aria-label={copy.close} onClick={closeMenu} className={iconButton}>
                <MenuIcon path="M6 6l12 12M18 6 6 18" />
              </button>
            </div>
          }
          footer={
            <div className="flex flex-col gap-5">
              <SocialLinks />
              <ShimmerButton href={mailto} className="min-h-[54px] w-full font-semibold">
                {copy.cta}
              </ShimmerButton>
            </div>
          }
        />
      </div>
      </Suspense>
      )}
    </header>
  );
}
