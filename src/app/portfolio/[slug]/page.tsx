"use client";

import { portfolios } from "@/data/portfolio";
import { Portfolio } from "@/types/Portfolio";
import Image from "next/image";
import { Navbar } from "@/components/Navbar";
import { use, useEffect, useRef } from "react";
import gsap from "gsap";
import Link from "next/link";
import ProjectPlaceholder from "@/components/ProjectPlaceholder";

type tParams = Promise<{ slug: string }>;

const PortfolioDetail = ({ params }: { params: tParams }) => {
  const { slug }: { slug: string } = use(params);
  const data: Portfolio | undefined = portfolios.find((p) => p.slug === slug);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const runReveal = () => {
      // Stagger reveal project detail contents from top to bottom
      gsap.fromTo(
        ".detail-reveal-item",
        { 
          y: -40, 
          opacity: 0 
        },
        {
          y: 0,
          opacity: 1,
          duration: 1.0,
          stagger: 0.08,
          ease: "power3.out",
          overwrite: "auto"
        }
      );
    };

    // Listen to custom pageTransitionComplete event
    window.addEventListener("pageTransitionComplete", runReveal);

    // Fallback trigger (0.5s after mounting) to guarantee execution
    const fallbackTimer = setTimeout(runReveal, 550);

    return () => {
      window.removeEventListener("pageTransitionComplete", runReveal);
      clearTimeout(fallbackTimer);
    };
  }, []);

  if (!data)
    return (
      <div className="h-screen flex items-center justify-center bg-foam text-ink">
        <p className="font-mono tracking-widest uppercase text-xs font-bold">Project Not Found</p>
      </div>
    );

  return (
    <div ref={containerRef} className="bg-foam min-h-screen text-ocean select-none">
      <Navbar />

      <main className="max-w-6xl mx-auto pt-28 md:pt-36 pb-20 md:pb-24 px-4 md:px-6">
        
        {/* --- HEADER SECTION --- */}
        <div className="mb-10 md:mb-16">
          <div className="overflow-hidden mb-4">
            <p className="text-ink font-mono tracking-[0.2em] md:tracking-[0.4em] uppercase text-xs md:text-sm detail-reveal-item">
              Project Case Study{data.duration && ` / ${data.duration}`}
            </p>
          </div>

          <div className="overflow-hidden mb-8">
            <h1 className="text-3xl sm:text-4xl md:text-7xl font-black tracking-tight leading-none uppercase text-ink detail-reveal-item">
              {data.title}
            </h1>
          </div>

          {data.technologies.length > 0 && (
          <div className="flex gap-3 flex-wrap items-center detail-reveal-item">
            <span className="text-ocean/70 font-mono text-[10px] uppercase tracking-widest mr-2">
              Technologies:
            </span>
            {data.technologies.map((tech) => (
              <span
                key={tech}
                className="bg-mist border border-ocean/10 rounded-full py-1.5 px-4 text-xs font-semibold text-ink backdrop-blur-sm shadow-sm"
              >
                {tech}
              </span>
            ))}
          </div>
          )}
        </div>

        {/* --- HERO IMAGE SECTION --- */}
        <div className="relative w-full aspect-video rounded-[2rem] overflow-hidden border border-ocean/10 mb-12 md:mb-20 group detail-reveal-item">
          {data.image ? (
            <Image
              src={data.image}
              alt={data.title}
              fill
              className="object-cover transition-transform duration-1000 group-hover:scale-102"
              priority
              sizes="100vw"
            />
          ) : (
            <ProjectPlaceholder title={data.title} />
          )}
          {/* Subtle gradient overlay to match seafoam background */}
          <div className="absolute inset-0 bg-gradient-to-t from-foam/40 to-transparent" />
        </div>

        {/* --- CONTENT SECTION --- */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
          {/* Sidebar Info */}
          <div className="md:col-span-4 space-y-8 detail-reveal-item">
            <div>
              <h4 className="text-xs font-mono uppercase tracking-[0.2em] text-ink mb-2">
                Role
              </h4>
              <p className="text-lg text-ink font-bold uppercase tracking-wide">{data.role ?? "Lead Fullstack Developer"}</p>
            </div>
            <div>
              <h4 className="text-xs font-mono uppercase tracking-[0.2em] text-ink mb-2">
                Year
              </h4>
              <p className="text-lg text-ocean font-mono">{data.duration || "Coming soon"}</p>
            </div>
            <div className="pt-8 border-t border-ocean/10">
              <a
                href="https://github.com"
                target="_blank"
                className="block w-full py-4 bg-ink text-foam font-extrabold text-xs tracking-widest text-center rounded-2xl hover:bg-ocean hover:text-foam transition-all duration-300 shadow-sm hover:shadow-[0_4px_15px_rgb(var(--shadow)/0.2)]"
              >
                LIVE PREVIEW ↗
              </a>
            </div>
          </div>

          {/* Detailed Description */}
          <div className="md:col-span-8 space-y-8 detail-reveal-item">
            <div>
              <h3 className="text-2xl font-black mb-6 text-ink uppercase tracking-tight">Overview</h3>
              {data.description ? (
                <p className="text-ocean text-sm md:text-base leading-relaxed mb-8 first-letter:text-5xl first-letter:font-black first-letter:mr-3 first-letter:float-left first-letter:text-ink">
                  {data.description}
                </p>
              ) : (
                <p className="text-ocean/70 text-sm md:text-base font-mono uppercase tracking-widest mb-8">Coming soon</p>
              )}
            </div>

            {/* Project Challenge Box */}
            <div className="bg-mist p-8 rounded-3xl border border-ocean/10 mt-12 relative overflow-hidden shadow-sm">
                <h4 className="text-ink font-mono text-xs mb-4 uppercase tracking-widest relative z-10">
                The Challenge
              </h4>
              <p className="text-ocean italic text-sm leading-relaxed relative z-10">
                {data.challenge ??
                  "Focusing on user-centric design while maintaining high-performance code architecture to deliver a seamless digital experience."}
              </p>
            </div>
            
            <div className="pt-12">
              <Link
                href="/"
                className="text-xs font-bold text-ocean/70 hover:text-ink uppercase tracking-widest transition-colors inline-flex items-center gap-2"
              >
                ← Back to Home
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default PortfolioDetail;
