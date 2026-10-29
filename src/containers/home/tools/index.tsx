"use client";

import Image from "next/image";
import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { tools } from "@/data/tools";
import { Tool } from "@/types/Tool";

gsap.registerPlugin(ScrollTrigger);

const Tools = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Each category reveals its badge first, then its cards from left to right
    const groups = container.querySelectorAll<HTMLDivElement>(".tool-group");
    const triggers = Array.from(groups).map((group) =>
      gsap
        .timeline({
          scrollTrigger: {
            trigger: group,
            start: "top 85%",
            once: true,
          },
        })
        .fromTo(
          group.querySelector(".category-badge-pill"),
          { opacity: 0, y: 10 },
          { opacity: 1, y: 0, duration: 0.5, ease: "power3.out" }
        )
        .fromTo(
          group.querySelectorAll(".tool-card"),
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.7, stagger: 0.05, ease: "power3.out" },
          "-=0.3"
        )
    );

    return () => {
      triggers.forEach((tl) => tl.scrollTrigger?.kill());
    };
  }, []);

  // Card hover scale using GSAP
  const handleCardHoverEnter = (e: React.MouseEvent<HTMLDivElement>) => {
    gsap.to(e.currentTarget, {
      scale: 1.04,
      duration: 0.2,
      ease: "power2.out",
      overwrite: "auto",
    });
  };

  const handleCardHoverLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    gsap.to(e.currentTarget, {
      scale: 1.0,
      duration: 0.2,
      ease: "power2.out",
      overwrite: "auto",
    });
  };

  return (
    <div
      ref={containerRef}
      className="bg-foam py-20 md:py-28 relative select-none"
      id="tools"
    >
      <div className="max-w-6xl mx-auto px-4 md:px-6">
        {/* SECTION HEADER */}
        <div className="text-center mb-12 md:mb-20">
          <p className="text-ocean font-mono tracking-[0.5em] uppercase text-xs mb-3">
            Technical Arsenal
          </p>
          <h2 data-split-reveal className="text-3xl sm:text-4xl md:text-6xl font-black text-ink tracking-tight uppercase leading-none mb-2">
            Tools &
          </h2>
          <p className="text-accent text-xl md:text-3xl font-medium italic lowercase tracking-tight">
            technologies i leverage
          </p>
        </div>

        <div className="space-y-12 md:space-y-16">
          {tools.map((category: Tool) => (
            <div key={category.id} className="tool-group">
              <div className="category-badge-pill opacity-0 inline-flex items-center gap-2 bg-mist px-4 py-1.5 rounded-full mb-5">
                <div className="w-1.5 h-1.5 bg-ocean rounded-full" />
                <span className="text-[10px] md:text-xs font-mono text-ocean font-black uppercase tracking-widest">
                  {category.title}
                </span>
              </div>

              <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3">
                {category.item.map((tool) => (
                  <div
                    key={tool.id}
                    onMouseEnter={handleCardHoverEnter}
                    onMouseLeave={handleCardHoverLeave}
                    className="tool-card opacity-0 flex flex-col items-center justify-center gap-3 aspect-square sm:aspect-auto sm:py-6 p-3 rounded-2xl bg-mist border border-ocean/10 hover:border-ink/30 transition-colors duration-300 text-center"
                  >
                    <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-foam flex items-center justify-center p-2 shadow-sm">
                      <Image
                        src={tool.image}
                        width={32}
                        height={32}
                        alt={tool.title}
                        className="object-contain rounded-md"
                      />
                    </div>
                    <span className="text-[10px] md:text-xs text-ink font-bold tracking-wider uppercase leading-tight">
                      {tool.title}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Tools;
