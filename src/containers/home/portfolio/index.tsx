"use client";

import { portfolios } from "@/data/portfolio";
import { Portfolio as Type } from "@/types/Portfolio";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { themeColor } from "@/lib/theme";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import TransitionLink from "@/components/TransitionLink";
import ProjectPlaceholder from "@/components/ProjectPlaceholder";

gsap.registerPlugin(ScrollTrigger);

const Portfolio = () => {
  const triggerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const hoverImgRef = useRef<HTMLDivElement>(null);
  const [hoveredImageSrc, setHoveredImageSrc] = useState<string>("");

  useEffect(() => {
    const trigger = triggerRef.current;
    const track = trackRef.current;
    const hoverImg = hoverImgRef.current;

    if (!trigger || !track) return;

    const mm = gsap.matchMedia();

    // 1. Horizontal pinned scroll on desktop only; smaller screens use a vertical grid
    mm.add("(min-width: 1024px)", () => {
      // clientWidth excludes the scrollbar, so the track never overshoots the viewport
      const getDistance = () => track.scrollWidth - trigger.clientWidth;

      const horizontal = gsap.to(track, {
        x: () => -getDistance(),
        ease: "none",
        scrollTrigger: {
          trigger: trigger,
          pin: true,
          scrub: 1,
          start: "top top",
          end: () => `+=${getDistance()}`,
          invalidateOnRefresh: true,
        },
      });

      // Images drift inside their frames while the track slides past
      track.querySelectorAll<HTMLElement>(".project-media").forEach((media) => {
        gsap.fromTo(
          media,
          { xPercent: -6 },
          {
            xPercent: 6,
            ease: "none",
            scrollTrigger: {
              trigger: media,
              containerAnimation: horizontal,
              start: "left right",
              end: "right left",
              scrub: true,
            },
          }
        );
      });
    });

    // Mobile/tablet: simple fade-up per card
    mm.add("(max-width: 1023px)", () => {
      track.querySelectorAll(".project-card").forEach((card) => {
        gsap.fromTo(
          card,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: { trigger: card, start: "top 90%", once: true },
          }
        );
      });
    });

    // 2. Mouse-following thumbnail, only for real pointers
    mm.add("(min-width: 1024px) and (hover: hover) and (pointer: fine)", () => {
      if (!hoverImg) return;

      gsap.set(hoverImg, { scale: 0, opacity: 0 });
      const xTo = gsap.quickTo(hoverImg, "x", { duration: 0.25, ease: "power2.out" });
      const yTo = gsap.quickTo(hoverImg, "y", { duration: 0.25, ease: "power2.out" });

      const handleMouseMove = (e: MouseEvent) => {
        xTo(e.clientX + 15);
        yTo(e.clientY + 15);
      };

      window.addEventListener("mousemove", handleMouseMove);
      return () => window.removeEventListener("mousemove", handleMouseMove);
    });

    return () => mm.revert();
  }, []);

  // Hover handlers (Ocean Calm Theme: deep teal border highlight, shadow)
  const handleMouseEnterCard = (imageSrc: string, e: React.MouseEvent<HTMLDivElement>) => {
    setHoveredImageSrc(imageSrc);
    const hoverImg = hoverImgRef.current;
    const card = e.currentTarget;
    const canHover = window.matchMedia("(min-width: 1024px) and (hover: hover) and (pointer: fine)").matches;
    if (!canHover) return;

    // Projects without an image yet skip the floating preview
    if (hoverImg && imageSrc) {
      gsap.to(hoverImg, {
        scale: 1,
        opacity: 1,
        duration: 0.3,
        ease: "power3.out",
        overwrite: "auto",
      });
    }

    gsap.to(card, {
      scale: 1.02,
      borderColor: themeColor("ink"),
      boxShadow: `0 10px 30px ${themeColor("shadow", 0.12)}`,
      duration: 0.4,
      ease: "power3.out",
      overwrite: "auto",
    });
  };

  const handleMouseLeaveCard = (e: React.MouseEvent<HTMLDivElement>) => {
    const hoverImg = hoverImgRef.current;
    const card = e.currentTarget;

    if (hoverImg) {
      gsap.to(hoverImg, {
        scale: 0,
        opacity: 0,
        duration: 0.3,
        ease: "power3.in",
        overwrite: "auto",
      });
    }

    gsap.to(card, {
      scale: 1.0,
      borderColor: themeColor("ocean", 0.1),
      boxShadow: "none",
      clearProps: "borderColor,boxShadow",
      duration: 0.4,
      ease: "power3.out",
      overwrite: "auto",
    });
  };

  return (
    <div ref={triggerRef} className="bg-foam relative" id="portfolio">
      {/* Floating Mouse-Following Thumbnail Container */}
      <div
        ref={hoverImgRef}
        className="hidden lg:block fixed top-0 left-0 w-[240px] h-[150px] rounded-2xl overflow-hidden pointer-events-none z-[80] border border-ink/20 shadow-2xl bg-mist opacity-0"
        style={{ transform: "translate(-50%, -50%)" }}
      >
        {hoveredImageSrc && (
          <div className="relative w-full h-full">
            <Image
              src={hoveredImageSrc}
              fill
              alt="Floating Project Preview"
              className="object-cover"
              sizes="240px"
              priority
            />
          </div>
        )}
      </div>

      <div className="w-full py-20 md:py-28 lg:py-0 lg:h-screen flex flex-col justify-center overflow-hidden">
        <div
          ref={trackRef}
          className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-6xl mx-auto px-4 md:px-6 lg:max-w-none lg:mx-0 lg:flex lg:flex-row lg:flex-nowrap lg:items-center lg:gap-0 lg:px-[8vw]"
        >
          
          {/* Header Card */}
          <div className="sm:col-span-2 lg:w-[450px] shrink-0 lg:mr-16 mb-4 lg:mb-0 flex flex-col items-start select-none">
            <p className="text-ink font-mono tracking-[0.3em] uppercase text-xs mb-4">
              04. Projects
            </p>
            <h2 data-split-reveal className="text-3xl sm:text-4xl md:text-6xl font-black text-ink tracking-tight leading-tight uppercase">
              Selected <br className="hidden lg:block" /> Works & <br /> Case Studies
            </h2>
            <div className="h-[0.5px] w-20 bg-ink/20 mt-6" />
            <p className="hidden lg:block text-ocean text-xs mt-6 font-mono uppercase tracking-[0.2em]">
              ← Scroll vertically to navigate →
            </p>
          </div>

          {/* Project Horizontal Loop */}
          {portfolios.map((data: Type, index: number) => {
            // Alternate card background colors for mosaic bento feel
            const bgClass = index % 2 === 0 ? "bg-mist" : "bg-sand";
            const gradientClass = index % 2 === 0 
              ? "bg-gradient-to-t from-mist via-transparent to-transparent" 
              : "bg-gradient-to-t from-sand via-transparent to-transparent";

            return (
              <div key={data.id} className="project-card w-full lg:w-[440px] shrink-0 lg:px-6">
                <div
                  onMouseEnter={(e) => handleMouseEnterCard(data.image, e)}
                  onMouseLeave={handleMouseLeaveCard}
                  className={`group relative flex flex-col h-full rounded-3xl ${bgClass} border border-ocean/10 overflow-hidden transition-shadow duration-300 w-full`}
                  data-cursor="project"
                >
                  {/* PROJECT IMAGE */}
                  <div className="relative aspect-[16/10] w-full overflow-hidden">
                    {data.image ? (
                      // Oversized so the desktop parallax never reveals the frame edges
                      <div className="project-media absolute inset-0 lg:scale-[1.15]">
                        <Image
                          src={data.image}
                          fill
                          alt={data.title}
                          className="object-cover transition-transform duration-700 ease-out group-hover:scale-105 grayscale group-hover:grayscale-0"
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 440px"
                        />
                      </div>
                    ) : (
                      <ProjectPlaceholder title={data.title} />
                    )}
                    {/* Vignette overlay matching card background */}
                    <div className={`absolute inset-0 ${gradientClass} opacity-95`} />

                    {/* FLOATING TECH BADGES */}
                    <div className="absolute top-4 left-4 flex flex-wrap gap-2">
                      {data.technologies.slice(0, 2).map((tech) => (
                        <span
                          key={tech}
                          className="bg-foam text-ink text-[9px] px-3 py-1 rounded-full border border-ocean/10 uppercase tracking-widest font-mono font-bold"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* CONTENT AREA */}
                  <div className="p-6 md:p-8 flex flex-1 flex-col justify-between">
                    <div>
                      <span className="text-ocean text-[10px] font-mono tracking-widest uppercase">
                        {data.duration || "Coming soon"}
                      </span>
                      <h3 className="text-2xl font-bold text-ink mt-1 group-hover:text-ocean transition-colors leading-tight uppercase">
                        {data.title}
                      </h3>
                      <p className="text-ocean/80 text-xs md:text-sm mt-3 leading-relaxed line-clamp-3">
                        {data.description || "Project details coming soon."}
                      </p>
                    </div>

                    <div className="mt-6 pt-6 border-t border-ocean/10 flex items-center justify-between">
                      <TransitionLink
                        href={`/portfolio/${data.slug}`}
                        title={data.title}
                        // after: stretches the click area over the whole card
                        className="inline-flex items-center text-xs font-bold tracking-[0.2em] text-ink group-hover:text-ocean uppercase transition-colors after:absolute after:inset-0 after:z-10 after:content-['']"
                      >
                        View Case Study
                        <span className="ml-2 h-[1px] w-4 bg-ink/30 group-hover:w-8 group-hover:bg-ink transition-all duration-300" />
                      </TransitionLink>

                      <div className="w-10 h-10 rounded-full border border-ocean/10 flex items-center justify-center group-hover:bg-ink group-hover:border-ink group-hover:text-foam transition-all duration-500">
                        <svg
                          className="w-4 h-4 text-ink group-hover:text-foam transition-colors rotate-[-45deg] group-hover:rotate-0"
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
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Portfolio;
