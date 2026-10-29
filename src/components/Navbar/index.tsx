"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ThemeToggle from "@/components/ThemeToggle";
import { setScrollLock } from "@/lib/scroll";

const NAV_ITEMS = ["Home", "About", "Portfolio", "Contact"];
const WHATSAPP_URL = "https://wa.me/6282214984819";

gsap.registerPlugin(ScrollTrigger);

export const Navbar = () => {
  const pathname = usePathname();
  const navbarRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const menuTl = useRef<gsap.core.Timeline | null>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const isMenuOpenRef = useRef(false);
  isMenuOpenRef.current = isMenuOpen;
  const isHome = pathname === "/";

  const getHref = (item: string) => {
    if (item === "Home") return "/";
    return isHome ? `#${item.toLowerCase()}` : `/#${item.toLowerCase()}`;
  };

  useEffect(() => {
    const navbar = navbarRef.current;
    if (!navbar) return;

    // Slide down navbar on mount using GSAP
    gsap.fromTo(
      navbar,
      { y: -100, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1.0,
        delay: 0.6,
        ease: "power3.out",
      }
    );
  }, []);

  // Scroll progress bar + hide on scroll down, reveal on scroll up
  useEffect(() => {
    const navbar = navbarRef.current;
    const progress = progressRef.current;
    if (!navbar || !progress) return;

    gsap.set(progress, { scaleX: 0 });
    const setProgress = gsap.quickSetter(progress, "scaleX");
    let isHidden = false;

    const trigger = ScrollTrigger.create({
      start: 0,
      end: "max",
      onUpdate: (self) => {
        setProgress(self.progress);
        const shouldHide = self.direction === 1 && self.scroll() > 200 && !isMenuOpenRef.current;
        if (shouldHide === isHidden) return;
        isHidden = shouldHide;
        gsap.to(navbar, { yPercent: isHidden ? -100 : 0, duration: 0.4, ease: "power3.out", overwrite: "auto" });
      },
    });

    return () => trigger.kill();
  }, []);

  // Mobile menu: curtain slide + staggered links
  useEffect(() => {
    const menu = menuRef.current;
    if (!menu) return;

    gsap.set(menu, { yPercent: -100, autoAlpha: 0 });
    menuTl.current = gsap
      .timeline({ paused: true })
      .to(menu, { yPercent: 0, autoAlpha: 1, duration: 0.6, ease: "power4.inOut" })
      .fromTo(
        menu.querySelectorAll(".mobile-menu-item"),
        { yPercent: 110 },
        { yPercent: 0, duration: 0.6, stagger: 0.06, ease: "power3.out" },
        "-=0.2"
      );

    return () => {
      menuTl.current?.kill();
    };
  }, []);

  const hasOpenedMenu = useRef(false);

  useEffect(() => {
    if (isMenuOpen) {
      hasOpenedMenu.current = true;
      menuTl.current?.timeScale(1).play();
      setScrollLock(true);
    } else if (hasOpenedMenu.current) {
      // Only undo our own scroll lock so the preloader's lock stays intact on mount
      menuTl.current?.timeScale(1.6).reverse();
      setScrollLock(false);
    }
  }, [isMenuOpen]);

  // Close the menu when switching to desktop width
  useEffect(() => {
    const media = window.matchMedia("(min-width: 768px)");
    const handleChange = (e: MediaQueryListEvent) => {
      if (e.matches) setIsMenuOpen(false);
    };
    media.addEventListener("change", handleChange);
    return () => media.removeEventListener("change", handleChange);
  }, []);

  return (
    <>
      <nav
        ref={navbarRef}
        className="fixed top-0 left-0 w-full z-[100] bg-foam/85 backdrop-blur-md border-b border-ocean/10 opacity-0 select-none"
      >
        <div className="max-w-6xl flex items-center justify-between mx-auto py-3 md:py-4 px-4 md:px-6">
          <Link
            href="/"
            onClick={() => setIsMenuOpen(false)}
            aria-label="AZH — Azka Zufar Hanif, home"
            className="text-xl font-black tracking-tight text-ink uppercase hover:text-ocean transition-colors"
          >
            AZH
          </Link>

          <div className="hidden md:flex items-center gap-8">
            {NAV_ITEMS.map((item) => (
              <a
                key={item}
                href={getHref(item)}
                className="text-xs text-ocean hover:text-ink transition-colors uppercase tracking-[0.2em] font-bold"
              >
                {item}
              </a>
            ))}
            <a
              href={WHATSAPP_URL}
              target="_blank"
              data-magnetic
              className="bg-ink hover:bg-ocean text-foam px-6 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-300 shadow-sm"
            >
              Let’s Talk
            </a>
            <ThemeToggle />
          </div>

          <div className="flex md:hidden items-center gap-2">
            <ThemeToggle />
            <button
              type="button"
              onClick={() => setIsMenuOpen((open) => !open)}
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={isMenuOpen}
              aria-controls="mobile-menu"
              className="relative w-11 h-11 rounded-full border border-ocean/20 flex items-center justify-center"
            >
              <span
                className={`absolute h-[1.5px] w-5 bg-ink transition-transform duration-300 ${
                  isMenuOpen ? "rotate-45" : "-translate-y-[4px]"
                }`}
              />
              <span
                className={`absolute h-[1.5px] w-5 bg-ink transition-transform duration-300 ${
                  isMenuOpen ? "-rotate-45" : "translate-y-[4px]"
                }`}
              />
            </button>
          </div>
        </div>
        <div ref={progressRef} className="absolute left-0 bottom-0 h-[2px] w-full bg-accent origin-left" aria-hidden="true" />
      </nav>

      {/* Mobile fullscreen menu */}
      <div
        ref={menuRef}
        id="mobile-menu"
        className="md:hidden fixed inset-0 z-[90] bg-foam flex flex-col justify-between px-4 pt-28 pb-10 invisible"
      >
        <ul className="flex flex-col gap-2">
          {NAV_ITEMS.map((item, idx) => (
            <li key={item} className="overflow-hidden">
              <a
                href={getHref(item)}
                onClick={() => setIsMenuOpen(false)}
                className="mobile-menu-item flex items-baseline gap-4 py-2 text-5xl font-black uppercase tracking-tighter text-ink"
              >
                <span className="text-xs font-mono text-ocean tracking-widest">0{idx + 1}</span>
                {item}
              </a>
            </li>
          ))}
        </ul>

        <div className="overflow-hidden">
          <a
            href={WHATSAPP_URL}
            target="_blank"
            className="mobile-menu-item flex items-center justify-center w-full bg-ink text-foam py-4 rounded-full text-xs font-bold uppercase tracking-[0.2em]"
          >
            Let’s Talk
          </a>
        </div>
      </div>
    </>
  );
};
