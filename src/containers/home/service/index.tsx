"use client";

import { services } from "@/data/services";
import { Service as Type } from "@/types/Service";
import Image from "next/image";
import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const skillsData = [
  { name: "React / Next.js", percentage: 92 },
  { name: "TailwindCSS / Bootstrap", percentage: 95 },
  { name: "Laravel / SQLite / MySQL", percentage: 88 },
  { name: "Node.js / ExpressJS / Postgres", percentage: 85 },
  { name: "ASP.NET / SQL Server", percentage: 80 },
  { name: "Python / Flask", percentage: 80 }
];

const Service = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const marqueeRef = useRef<HTMLDivElement>(null);
  const skillsGridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const marquee = marqueeRef.current;
    const skillsGrid = skillsGridRef.current;

    // 1. Infinite marquee that speeds up with scroll velocity and follows scroll direction
    if (marquee) {
      const track = marquee.querySelector(".marquee-track");
      const loop = gsap.to(track, {
        xPercent: -50,
        ease: "none",
        duration: 18,
        repeat: -1,
      });
      // Start deep into the repeats so a negative timeScale has room to run backwards
      loop.totalTime(loop.duration() * 1000);

      ScrollTrigger.create({
        trigger: marquee,
        start: "top bottom",
        end: "bottom top",
        onUpdate: (self) => {
          const boost = gsap.utils.clamp(1, 6, Math.abs(self.getVelocity()) / 250);
          // overwrite kills the previous settle tween so the newest scroll input always wins
          gsap.to(loop, { timeScale: self.direction * boost, duration: 0.2, overwrite: true });
          gsap.to(loop, { timeScale: self.direction, duration: 1, delay: 0.2, ease: "power2.out" });
        },
      });
    }

    // 2. Service cards stagger fade-in
    gsap.fromTo(
      ".service-card",
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".services-trigger",
          start: "top 80%",
          once: true
        }
      }
    );

    // 3. Skills list reveal with stagger from left + progress bar animation
    if (skillsGrid) {
      const items = skillsGrid.querySelectorAll(".skill-item");
      const bars = skillsGrid.querySelectorAll(".skill-bar");

      // Stagger items from left
      gsap.fromTo(
        items,
        { x: -50, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.08,
          ease: "power3.out",
          scrollTrigger: {
            trigger: skillsGrid,
            start: "top 85%",
            once: true
          }
        }
      );

      // Tween progress bars from 0 to target value
      gsap.fromTo(
        bars,
        { width: "0%" },
        {
          width: (idx, el) => el.getAttribute("data-target") + "%",
          duration: 1.6,
          delay: 0.2,
          stagger: 0.08,
          ease: "power3.out",
          scrollTrigger: {
            trigger: skillsGrid,
            start: "top 85%",
            once: true
          }
        }
      );
    }
  }, []);

  return (
    <div ref={containerRef} className="bg-foam pt-20 md:pt-28 pb-10 md:pb-14 px-4 md:px-6" id="service">
      <div className="max-w-6xl mx-auto">
        
        {/* --- SERVICE OFFERINGS --- */}
        <div className="grid grid-cols-1 md:grid-cols-12 items-start gap-10 md:gap-12 mb-20 md:mb-24 services-trigger">
          {/* Left Column: Heading */}
          <div className="md:col-span-4 md:sticky md:top-28">
            <p className="text-ink font-mono tracking-[0.3em] uppercase text-xs mb-4">
              02. Services
            </p>
            <h2 data-split-reveal className="text-3xl sm:text-4xl md:text-5xl font-black text-ink leading-tight uppercase tracking-tight">
              Let’s Build <br />
              Something Great <br />
              Together
            </h2>
            <div className="h-[0.5px] w-16 bg-ink mt-6" />
            <p className="mt-6 text-ocean text-xs tracking-widest uppercase font-mono">
              — Specialized Solutions
            </p>
          </div>

          {/* Right Column: Service Cards */}
          <div className="md:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
            {services.map((data: Type) => (
              <div
                key={data.id}
                className="service-card group p-6 md:p-8 rounded-3xl bg-mist border border-ocean/10 hover:border-ink/40 transition-all duration-500 shadow-sm relative overflow-hidden"
              >
                {/* Subtle teal glow behind icon on hover */}
                <div className="absolute -inset-10 bg-ocean/5 blur-3xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                
                <div className="relative mb-6 flex justify-start">
                  <Image
                    src={data.image}
                    width={110}
                    height={110}
                    alt={`${data.title} illustration`}
                    className="relative z-10 h-16 md:h-24 w-auto object-contain grayscale group-hover:grayscale-0 transition-all duration-500 scale-95 group-hover:scale-100"
                  />
                </div>
                <h3 className="text-xl font-bold mb-3 text-ink group-hover:text-ocean transition-colors uppercase tracking-wide">
                  {data.title}
                </h3>
                <p className="text-ocean text-xs md:text-sm leading-relaxed">
                  {data.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* --- INFINITE MARQUEE TEXT --- */}
        <div 
          ref={marqueeRef}
          className="w-full overflow-hidden bg-mist py-4 md:py-6 rounded-2xl border border-ocean/10 select-none relative"
        >
          <div className="flex flex-row flex-nowrap whitespace-nowrap marquee-track font-black uppercase text-2xl md:text-5xl text-ink tracking-[0.15em]">
            <span className="px-6">FRONTEND • BACKEND • REST API • DATABASE • AUTOMATION • PERFORMANCE • SCALABLE SYSTEMS • </span>
            <span className="px-6">FRONTEND • BACKEND • REST API • DATABASE • AUTOMATION • PERFORMANCE • SCALABLE SYSTEMS • </span>
          </div>
        </div>

        {/* --- TECHNICAL SKILLS SECTION --- */}
        {/* <div className="max-w-4xl mx-auto">
          <div className="text-center mb-10 md:mb-16">
            <p className="text-ocean font-mono tracking-[0.4em] uppercase text-xs mb-3">
              Proficiency
            </p>
            <h3 data-split-reveal className="text-2xl sm:text-3xl md:text-4xl font-black text-ink uppercase tracking-tight">
              Skills & Core Proficiencies
            </h3>
            <div className="h-[0.5px] w-20 bg-ocean/20 mx-auto mt-4" />
          </div>

          <div ref={skillsGridRef} className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-6">
            {skillsData.map((skill) => (
              <div
                key={skill.name}
                className="skill-item p-5 md:p-6 rounded-2xl bg-mist border border-ocean/10 flex flex-col justify-between shadow-sm"
              >
                <div className="flex justify-between items-center gap-4 mb-3">
                  <span className="text-ink font-bold tracking-wider uppercase text-xs md:text-sm">
                    {skill.name}
                  </span>
                  <span className="text-ink font-mono text-sm font-extrabold">
                    {skill.percentage}%
                  </span>
                </div>
                <div className="w-full h-1.5 bg-foam rounded-full overflow-hidden">
                  <div
                    className="skill-bar h-full bg-ink w-0 rounded-full"
                    data-target={skill.percentage}
                  />
                </div>
              </div>
            ))}
          </div>
        </div> */}

      </div>
    </div>
  );
};

export default Service;
