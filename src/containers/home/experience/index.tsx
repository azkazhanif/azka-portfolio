"use client";

import { experiences } from "@/data/experiences";
import { Experience as Type } from "@/types/Experience";
import React, { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Experience = () => {
  useEffect(() => {
    // Each experience card slides in as it reaches the viewport
    gsap.utils.toArray<HTMLElement>(".experience-item").forEach((item) => {
      gsap.fromTo(
        item,
        { opacity: 0, x: -30 },
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: { trigger: item, start: "top 85%", once: true },
        }
      );
    });

    // Timeline line fills up as you scroll through the list
    gsap.fromTo(
      ".experience-progress",
      { scaleY: 0 },
      {
        scaleY: 1,
        ease: "none",
        scrollTrigger: {
          trigger: ".experience-list-trigger",
          start: "top 70%",
          end: "bottom 70%",
          scrub: true,
        },
      }
    );

    // Fade-in bento grid columns
    gsap.fromTo(
      ".experience-bento-col",
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 1.0,
        stagger: 0.15,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".experience-bento-trigger",
          start: "top 80%",
          once: true
        }
      }
    );
  }, []);

  return (
    <div className="bg-foam text-ocean py-20 md:py-28" id="experience">
      <div className="max-w-6xl mx-auto px-4 md:px-6">
        
        {/* Header Section */}
        <div className="mb-10 md:mb-16">
          <p className="text-ink font-mono tracking-[0.3em] uppercase text-xs mb-4">
            03. Professional Path
          </p>
          <h2 data-split-reveal className="text-3xl sm:text-4xl md:text-6xl font-black tracking-tight uppercase text-ink">
            Experience
          </h2>
        </div>

        {/* --- WORK EXPERIENCE LIST --- */}
        <div className="relative pl-5 md:pl-10 space-y-4 mb-20 md:mb-24 experience-list-trigger">
          {/* Timeline track + scroll-driven fill */}
          <div className="absolute left-0 md:left-2 top-0 bottom-0 w-px bg-ocean/15" aria-hidden="true">
            <div className="experience-progress absolute inset-0 bg-ink origin-top" />
          </div>

          {experiences.map((data: Type, index: number) => (
            <div
              key={data.id}
              className="experience-item group relative p-6 md:p-10 rounded-3xl border border-ocean/10 bg-mist hover:border-ink/30 transition-all duration-500 overflow-hidden shadow-sm"
            >
              {/* Background Numbering (Tinted deep teal at very low opacity) */}
              <span className="absolute -right-4 -bottom-4 text-8xl font-black text-ink/[0.02] group-hover:text-ink/[0.04] transition-colors select-none pointer-events-none">
                0{index + 1}
              </span>

              <div className="relative z-10 md:flex justify-between items-start gap-8">
                <div className="flex-1">
                  <h4 className="text-xl md:text-3xl font-bold text-ink group-hover:text-ocean transition-colors mb-2 uppercase tracking-wide">
                    {data.title}
                  </h4>
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-2 mb-4">
                    <span className="px-3 py-1 rounded-full bg-ink/10 text-ink text-xs font-mono uppercase tracking-widest font-bold">
                      {data.position}
                    </span>
                    <span className="text-ocean/70 text-sm font-mono">
                      {data.duration}
                    </span>
                  </div>
                  <p className="text-ocean/80 text-sm md:text-base leading-relaxed max-w-3xl group-hover:text-ocean transition-colors">
                    {data.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* --- AWARDS & EDUCATION BENTO GRID --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 experience-bento-trigger">
          {/* AWARDS COLUMN */}
          <div className="space-y-6 experience-bento-col">
            <h3 className="text-xl font-bold flex items-center gap-3 mb-8 uppercase tracking-wider text-ink">
              <span className="w-8 h-[0.5px] bg-ink" /> Awards
            </h3>

            <div className="group border-l-2 border-ocean/20 hover:border-ink pl-6 py-2 transition-colors">
              <h4 className="text-base md:text-lg font-bold text-ink mb-1 uppercase tracking-wide">
                Champion Winner Mattel Global Internship 2024
              </h4>
              <p className="text-xs text-ocean/70 mb-3 font-mono uppercase">
                PT. Mattel Indonesia — 2025
              </p>
              <a
                href="https://drive.google.com/..."
                target="_blank"
                className="text-xs font-bold font-mono text-ink hover:text-ocean uppercase tracking-tighter flex items-center gap-2"
              >
                View Proof <span className="text-sm">→</span>
              </a>
            </div>

            <div className="group border-l-2 border-ocean/20 hover:border-ink pl-6 py-2 transition-colors">
              <h4 className="text-base md:text-lg font-bold text-ink mb-1 uppercase tracking-wide">
                Distinction Graduate Bangkit Academy
              </h4>
              <p className="text-xs text-ocean/70 mb-3 font-mono uppercase">
                Google, GoTo, Traveloka — 2023
              </p>
              <a
                href="https://drive.google.com/..."
                target="_blank"
                className="text-xs font-bold font-mono text-ink hover:text-ocean uppercase tracking-tighter flex items-center gap-2"
              >
                View Proof <span className="text-sm">→</span>
              </a>
            </div>
          </div>

          {/* EDUCATION COLUMN */}
          <div className="space-y-6 experience-bento-col">
            <h3 className="text-xl font-bold flex items-center gap-3 mb-8 uppercase tracking-wider text-ink">
              <span className="w-8 h-[0.5px] bg-ink" /> Education
            </h3>

            <div className="relative pl-8 before:absolute before:left-0 before:top-2 before:w-2 before:h-2 before:bg-ink before:rounded-full">
              <h4 className="text-lg font-bold text-ink uppercase tracking-wide">
                President University
              </h4>
              <p className="text-ocean/80 text-sm">
                Informatics - Computer Science
              </p>
              <p className="text-xs text-ocean/70 mt-1 font-mono">
                2021 — 2024
              </p>
            </div>

            <div className="relative pl-8 before:absolute before:left-0 before:top-2 before:w-2 before:h-2 before:bg-ocean/40 before:rounded-full">
              <h4 className="text-lg font-bold text-ink uppercase tracking-wide">SMK Al-Wafa</h4>
              <p className="text-ocean/80 text-sm">Multimedia</p>
              <p className="text-xs text-ocean/70 mt-1 font-mono">
                2018 — 2021
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Experience;
