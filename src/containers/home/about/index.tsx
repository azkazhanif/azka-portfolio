"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { themeColor } from "@/lib/theme";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const textContainerRef = useRef<HTMLDivElement>(null);
  const resumeButtonRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const img = imageRef.current;
    const textContainer = textContainerRef.current;

    if (!section) return;

    // 1. Parallax Image Animation (moves slower than scroll)
    if (img) {
      gsap.fromTo(
        img,
        { yPercent: -15 },
        {
          yPercent: 15,
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        },
      );
    }

    // 2. Text Reveal with Mask (overflow hidden + translateY from below)
    if (textContainer) {
      gsap.fromTo(
        textContainer.querySelectorAll(".reveal-item"),
        {
          yPercent: 100,
          opacity: 0,
        },
        {
          yPercent: 0,
          opacity: 1,
          duration: 1.0,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: textContainer,
            start: "top 80%",
            once: true,
          },
        },
      );
    }

    // 3. Stats counter from 0 on ScrollTrigger onEnter
    const statsElements = section.querySelectorAll(".stat-number");
    statsElements.forEach((el) => {
      const targetVal = parseInt(el.getAttribute("data-target") || "0", 10);
      const valObj = { val: 0 };

      gsap.to(valObj, {
        val: targetVal,
        duration: 2.0,
        ease: "power3.out",
        scrollTrigger: {
          trigger: el,
          start: "top 85%",
          once: true,
        },
        onUpdate: () => {
          el.textContent = Math.floor(valObj.val).toString();
        },
      });
    });
  }, []);

  // CTA Magnetic Button logic for Resume Button
  const handleMagneticMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const btn = resumeButtonRef.current;
    if (!btn) return;
    const rect = btn.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    gsap.to(btn, {
      x: x * 0.35,
      y: y * 0.35,
      scale: 1.02,
      backgroundColor: themeColor("ink"),
      color: themeColor("foam"),
      duration: 0.3,
      ease: "power2.out",
    });
  };

  const handleMagneticLeave = () => {
    const btn = resumeButtonRef.current;
    if (!btn) return;

    gsap.to(btn, {
      x: 0,
      y: 0,
      scale: 1.0,
      backgroundColor: "transparent",
      duration: 0.5,
      clearProps: "backgroundColor,color",
      ease: "power3.out",
    });
  };

  return (
    <section
      ref={sectionRef}
      className="bg-foam py-20 md:py-28 px-4 md:px-6 overflow-hidden relative"
      id="about"
    >
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 gap-10 md:gap-16 md:grid-cols-12 items-center">
          {/* KOLOM KIRI: Parallax Image */}
          <div className="md:col-span-5 relative aspect-[4/5] w-full max-w-md mx-auto md:max-w-none rounded-3xl overflow-hidden bg-mist border border-ocean/10 shadow-md">
            <Image
              ref={imageRef}
              src="/images/about_parallax.png"
              fill
              alt="About Parallax Art"
              className="object-cover scale-110 brightness-[0.85] contrast-[1.05]"
              sizes="(max-width: 768px) 100vw, 40vw"
            />
            {/* Seafoam overlay blend */}
            <div className="absolute inset-0 bg-gradient-to-t from-foam/40 to-transparent" />
          </div>

          {/* KOLOM KANAN: Detail & Stats */}
          <div
            ref={textContainerRef}
            className="md:col-span-7 flex flex-col items-start"
          >
            <div className="overflow-hidden mb-2">
              <p className="font-mono text-ink tracking-[0.3em] uppercase text-xs reveal-item">
                01. Behind the Code
              </p>
            </div>

            <div className="overflow-hidden mb-8">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-ink leading-tight reveal-item">
                A Tech & <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-ink to-ocean">
                  Design Enthusiast
                </span>
              </h2>
            </div>

            <div className="overflow-hidden mb-6">
              <p
                data-scrub-text
                className="text-base md:text-xl font-medium text-ink/90 leading-relaxed italic reveal-item"
              >
                &quot;Turning ideas into functional art—where code meets
                creativity&quot;
              </p>
            </div>

            <div className="space-y-4 text-ocean leading-relaxed text-sm md:text-base mb-8">
              <div className="overflow-hidden">
                <p className="reveal-item">
                  With{" "}
                  <span className="text-ink font-bold">
                    2+ years of coding experience
                  </span>
                  , I blend technical skills and design thinking to build
                  impactful digital solutions.
                </p>
              </div>
              <div className="overflow-hidden">
                <p className="reveal-item">
                  My journey includes interning at{" "}
                  <span className="text-ink font-semibold">
                    PT. Mattel Indonesia
                  </span>
                  , where I developed internal web systems, and leading design
                  initiatives as Vice Director of Department Communication &
                  Design at PUMA Computing.
                </p>
              </div>
              <div className="overflow-hidden">
                <p className="reveal-item">
                  Passionate about merging logic with aesthetics, I thrive on
                  creating intuitive, user-driven experiences—let’s collaborate
                  and bring ideas to life!
                </p>
              </div>
            </div>

            {/* Statistics Section */}
            <div className="grid grid-cols-3 gap-4 sm:gap-8 w-full border-t border-ocean/10 pt-8 mb-8">
              <div>
                <div className="overflow-hidden flex items-baseline">
                  <span
                    className="stat-number text-ink font-black text-2xl sm:text-3xl md:text-4xl tracking-tight"
                    data-target="3"
                  >
                    0
                  </span>
                  <span className="text-ocean font-black text-xl sm:text-2xl md:text-3xl ml-0.5">
                    +
                  </span>
                </div>
                <p className="text-ocean/70 text-[10px] tracking-widest uppercase font-mono mt-1">
                  Years Exp
                </p>
              </div>
              <div>
                <div className="overflow-hidden flex items-baseline">
                  <span
                    className="stat-number text-ink font-black text-2xl sm:text-3xl md:text-4xl tracking-tight"
                    data-target="20"
                  >
                    0
                  </span>
                  <span className="text-ocean font-black text-xl sm:text-2xl md:text-3xl ml-0.5">
                    +
                  </span>
                </div>
                <p className="text-ocean/70 text-[10px] tracking-widest uppercase font-mono mt-1">
                  Projects
                </p>
              </div>
              <div>
                <div className="overflow-hidden flex items-baseline">
                  <span
                    className="stat-number text-ink font-black text-2xl sm:text-3xl md:text-4xl tracking-tight"
                    data-target="15"
                  >
                    0
                  </span>
                  <span className="text-ocean font-black text-xl sm:text-2xl md:text-3xl ml-0.5">
                    +
                  </span>
                </div>
                <p className="text-ocean/70 text-[10px] tracking-widest uppercase font-mono mt-1">
                  Clients
                </p>
              </div>
            </div>

            {/* Resume Button */}
            <div className="overflow-hidden py-2">
              <a
                ref={resumeButtonRef}
                onMouseMove={handleMagneticMove}
                onMouseLeave={handleMagneticLeave}
                href="https://drive.google.com/file/..."
                target="_blank"
                className="reveal-item inline-flex items-center gap-3 px-8 py-3.5 border border-ink/20 rounded-full text-ink bg-transparent hover:bg-ink hover:text-foam hover:border-ink transition-all duration-300 shadow-sm hover:shadow-[0_4px_15px_rgb(var(--shadow)/0.1)]"
              >
                <span className="text-xs font-bold tracking-widest uppercase">
                  See My Resume
                </span>
                <svg
                  className="w-4 h-4"
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
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
