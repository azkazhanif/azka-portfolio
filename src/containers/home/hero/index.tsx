"use client";

import Image from "next/image";
import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { themeColor } from "@/lib/theme";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(ScrollTrigger, SplitText);

const Hero = ({ ready = true }: { ready?: boolean }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const trailRef = useRef<HTMLDivElement>(null);
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);
  const mainTitleRef = useRef<HTMLHeadingElement>(null);
  const ctaRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const trail = trailRef.current;
    const scrollIndicator = scrollIndicatorRef.current;

    if (!container) return;

    // 1. Cursor Trail follow logic (Medium teal, trailing mouse with GSAP quickTo)
    if (trail) {
      gsap.set(trail, { xPercent: -50, yPercent: -50, x: -100, y: -100 });
      const xTo = gsap.quickTo(trail, "x", { duration: 0.7, ease: "power3.out" });
      const yTo = gsap.quickTo(trail, "y", { duration: 0.7, ease: "power3.out" });

      const handleMouseMove = (e: MouseEvent) => {
        const rect = container.getBoundingClientRect();
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;
        xTo(mouseX);
        yTo(mouseY);
      };

      container.addEventListener("mousemove", handleMouseMove);

      return () => {
        container.removeEventListener("mousemove", handleMouseMove);
      };
    }
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const mm = gsap.matchMedia(container);

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const split = SplitText.create(".hero-title", { type: "chars" });

      // 2. Hold everything hidden until the preloader hands over
      gsap.set(split.chars, { yPercent: 110 });
      gsap.set(".hero-sub", { yPercent: 110 });
      gsap.set(".hero-image-wrap", { clipPath: "inset(100% 0% 0% 0%)" });
      gsap.set(".hero-cta-wrap", { opacity: 0, y: 30 });

      if (!ready) return () => split.revert();

      gsap
        .timeline({ delay: 0.15 })
        .to(split.chars, { yPercent: 0, duration: 1.1, stagger: 0.04, ease: "power4.out" })
        .to(".hero-sub", { yPercent: 0, duration: 0.8, stagger: 0.05, ease: "power3.out" }, "-=0.8")
        .to(".hero-image-wrap", { clipPath: "inset(0% 0% 0% 0%)", duration: 1.3, ease: "power4.inOut" }, "-=1.0")
        .to(".hero-cta-wrap", { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" }, "-=0.6");

      // 3. Scroll parallax: headline drifts up and fades, portrait sinks slower than the page
      const scrub = { trigger: container, start: "top top", end: "bottom top", scrub: true };
      gsap.to(".hero-text", { yPercent: -40, opacity: 0, ease: "none", scrollTrigger: scrub });
      gsap.to(".hero-image-inner", { yPercent: 12, ease: "none", scrollTrigger: { ...scrub } });

      // 4. Scroll indicator looping bounce
      gsap.to(".hero-scroll-indicator", { y: 12, duration: 1.0, repeat: -1, yoyo: true, ease: "power1.inOut" });

      return () => split.revert();
    });

    return () => mm.revert();
  }, [ready]);

  // 5. CTA Magnetic Button interaction (Ocean Calm Theme: deep teal background, seafoam text)
  const handleMagneticMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const btn = ctaRef.current;
    if (!btn) return;

    const rect = btn.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    gsap.to(btn, {
      x: x * 0.35,
      y: y * 0.35,
      scale: 1.02,
      backgroundColor: themeColor("ocean"),
      boxShadow: `0 10px 25px ${themeColor("shadow", 0.25)}`,
      duration: 0.3,
      ease: "power2.out",
    });
  };

  const handleMagneticLeave = () => {
    const btn = ctaRef.current;
    if (!btn) return;

    gsap.to(btn, {
      x: 0,
      y: 0,
      scale: 1.0,
      backgroundColor: themeColor("ink"),
      boxShadow: "none",
      clearProps: "backgroundColor,boxShadow",
      duration: 0.5,
      ease: "power3.out",
    });
  };

  const titleText = "AZKA HANIF";
  const subTitleText = "Creative Fullstack Developer & Designer";

  return (
    <div
      ref={containerRef}
      className="relative min-h-[100svh] w-full bg-foam overflow-hidden flex flex-col items-center justify-start md:justify-center pt-[20svh] md:pt-0 select-none"
      id="home"
    >
      {/* Mouse Follower Trail (Medium Teal Accent) */}
      <div
        ref={trailRef}
        className="absolute w-8 h-8 rounded-full bg-ocean opacity-20 blur-xl pointer-events-none z-0"
      />

      {/* --- BACKGROUND DISPLAY TEXT --- */}
      <div className="hero-text relative z-20 flex flex-col items-center text-center md:-mt-[24vh] max-w-6xl px-4 md:px-6">
        <div className="overflow-hidden">
          <h1
            ref={mainTitleRef}
            className="text-[clamp(2.75rem,11vw,10rem)] leading-[0.9] font-black text-ink tracking-[0.04em] uppercase hero-title"
          >
            {titleText}
          </h1>
        </div>

        <div className="flex flex-wrap justify-center gap-x-2 md:gap-x-3 mt-4 md:mt-6">
          {subTitleText.split(" ").map((word, idx) => (
            <div key={idx} className="overflow-hidden py-1">
              <p className="text-ocean text-[11px] sm:text-sm md:text-base tracking-[0.2em] font-semibold uppercase hero-sub">
                {word}
              </p>
            </div>
          ))}
        </div>
        <div className="h-[0.5px] w-24 bg-ink mt-4 opacity-30" />
      </div>

      {/* --- PROFILE IMAGE SECTION --- */}
      <div className="hero-image-wrap absolute bottom-0 z-10 w-full max-w-[300px] sm:max-w-[380px] md:max-w-[460px] h-[56svh] md:h-[55vh]">
        <div className="hero-image-inner relative w-full h-full">
          <Image
            src="/images/profile.png"
            fill
            alt="Azka Profile"
            className="object-contain object-bottom grayscale brightness-[0.8] contrast-[1.1] hover:grayscale-0 hover:brightness-100 transition-all duration-1000"
            priority
          />
          {/* Shadow blend base into seafoam floor */}
          <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-foam to-transparent" />
        </div>
      </div>

      {/* --- ACTION CTA BUTTON --- */}
      <div className="hero-cta-wrap absolute bottom-20 md:bottom-24 z-20">
        <a
          ref={ctaRef}
          href="#contact"
          onMouseMove={handleMagneticMove}
          onMouseLeave={handleMagneticLeave}
          className="group relative flex items-center gap-3 md:gap-4 px-7 md:px-10 py-3.5 md:py-4 bg-ink rounded-full overflow-hidden transition-shadow duration-300 shadow-[0_4px_15px_rgb(var(--shadow)/0.15)] hover:shadow-[0_0_30px_rgb(var(--ocean)/0.3)]"
        >
          <span className="relative z-10 text-foam font-extrabold text-xs md:text-sm tracking-[0.15em] transition-colors duration-300 group-hover:text-foam">
            COLLABORATE NOW
          </span>
          <div className="absolute inset-0 bg-ocean translate-y-[100%] group-hover:translate-y-0 transition-transform duration-500 ease-out" />
          {/* Arrow Icon */}
          <svg
            className="relative z-10 w-4 h-4 text-foam group-hover:text-foam transition-colors duration-300"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2.5}
              d="M14 5l7 7m0 0l-7 7m7-7H3"
            />
          </svg>
        </a>
      </div>

      {/* --- SCROLL INDICATOR --- */}
      <div
        ref={scrollIndicatorRef}
        className="hero-scroll-indicator absolute bottom-6 z-20 flex flex-col items-center gap-2 pointer-events-none opacity-50"
      >
        <span className="text-[9px] font-bold tracking-[0.3em] text-ocean uppercase">SCROLL</span>
        <div className="w-5 h-8 border border-ocean rounded-full flex justify-center p-1">
          <div className="w-1.5 h-1.5 bg-ocean rounded-full" />
        </div>
      </div>
    </div>
  );
};

export default Hero;
