"use client";

import { useState, useEffect } from "react";
import Preloader from "@/components/Preloader";
import { Navbar } from "@/components/Navbar";
import About from "@/containers/home/about";
import Contact from "@/containers/home/contact";
import Experience from "@/containers/home/experience";
import Hero from "@/containers/home/hero";
import Portfolio from "@/containers/home/portfolio";
import Service from "@/containers/home/service";
import Tools from "@/containers/home/tools";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { setScrollLock } from "@/lib/scroll";
import ScrollEffects from "@/components/ScrollEffects";

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);

  // Prevent scroll during preloading
  useEffect(() => {
    if (isLoading) {
      setScrollLock(true);
    } else {
      setScrollLock(false);
      // Recalculate pinned sections now that the scrollbar is back
      ScrollTrigger.refresh();
    }
  }, [isLoading]);

  return (
    <>
      {/* Layar Preloader */}
      <Preloader onComplete={() => setIsLoading(false)} />
      <ScrollEffects enabled={!isLoading} />

      {/* Konten Utama */}
      <main
        id="main-content"
        className={`relative ${isLoading ? "opacity-0" : "opacity-100"}`}
      >
        <Navbar />
        <Hero ready={!isLoading} />
        <div>
          <div className="section-divider" />
          <About />
        </div>
        <div>
          <div className="section-divider" />
          <Service />
        </div>
        <div>
          <div className="section-divider" />
          <Tools />
        </div>
        <div>
          <div className="section-divider" />
          <Experience />
        </div>
        <div>
          <div className="section-divider" />
          <Portfolio />
        </div>
        <div>
          <div className="section-divider" />
          <Contact />
        </div>
      </main>
    </>
  );
}
