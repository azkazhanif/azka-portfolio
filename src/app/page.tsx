"use client";

import { useState, useEffect } from "react";
import Preloader from "@/components/Preloader";
import Footer from "@/components/Footer";
import { Navbar } from "@/components/Navbar";
import About from "@/containers/home/about";
import Contact from "@/containers/home/contact";
import Experience from "@/containers/home/experience";
import Hero from "@/containers/home/hero";
import Portfolio from "@/containers/home/portfolio";
import Service from "@/containers/home/service";
import Tools from "@/containers/home/tools";

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);

  // Mencegah scroll saat loading
  useEffect(() => {
    if (isLoading) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [isLoading]);

  return (
    <>
      {/* Layar Preloader */}
      <Preloader onComplete={() => setIsLoading(false)} />

      {/* Konten Utama */}
      <main
        className={`relative transition-opacity duration-1000 ${isLoading ? "opacity-0" : "opacity-100"}`}
      >
        <Navbar />
        <Hero />
        <About />
        <Service />
        <Tools />
        <Experience />
        <Portfolio />
        <Contact />
      </main>
    </>
  );
}
