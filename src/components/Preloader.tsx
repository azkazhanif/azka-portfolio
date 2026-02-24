"use client";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { motion, AnimatePresence } from "framer-motion";

const words = [
  "Selamat Datang",
  "Welcome",
  "Bienvenido",
  "Bienvenue",
  "Willkommen",
  "Benvenuto",
  "Bem-vindo",
  "Välkommen",
  "Namaste",
  "Irashaimase",
  "Konnichiwa",
  "Aloha",
  "Hullo",
  "Shalom",
  "Sawubona",
  "Vitejte",
  "Ahlan",
];

export default function Preloader({ onComplete }: { onComplete: () => void }) {
  const containerRef = useRef(null);
  const leftPanelRef = useRef(null);
  const rightPanelRef = useRef(null);
  const textContainerRef = useRef(null);

  const [index, setIndex] = useState(0);
  const [isFinal, setIsFinal] = useState(false);

  useEffect(() => {
    // 1. Timer ganti bahasa
    const interval = setInterval(() => {
      setIndex((prev) => {
        if (prev < words.length - 1) return prev + 1;
        clearInterval(interval);
        setTimeout(() => setIsFinal(true), 500); // Jeda sebelum ke "azka.dev"
        return prev;
      });
    }, 150);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (isFinal) {
      const tl = gsap.timeline({
        onComplete: () => onComplete(),
      });

      tl.to(textContainerRef.current, {
        scale: 1.2,
        duration: 0.8,
        filter: "drop-shadow(0 0 15px rgba(255,255,255,0.8))",
        ease: "power2.out",
      })
        .to(textContainerRef.current, {
          opacity: 0,
          duration: 0.3,
          delay: 0.5,
        })
        .to(leftPanelRef.current, {
          xPercent: -100,
          duration: 1.2,
          ease: "expo.inOut",
        })
        .to(
          rightPanelRef.current,
          {
            xPercent: 100,
            duration: 1.2,
            ease: "expo.inOut",
          },
          "<",
        ) // Start barengan sama panel kiri
        .to(containerRef.current, {
          display: "none",
        });
    }
  }, [isFinal, onComplete]);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[9999] flex items-center justify-center overflow-hidden bg-transparent font-sans"
    >
      {/* Background Panels */}
      <div
        ref={leftPanelRef}
        className="absolute inset-y-0 left-0 w-1/2 bg-[#0a0a0a] border-r border-white/5"
      />
      <div
        ref={rightPanelRef}
        className="absolute inset-y-0 right-0 w-1/2 bg-[#0a0a0a] border-l border-white/5"
      />

      {/* Text Wrapper */}
      <div
        ref={textContainerRef}
        className="relative z-10 flex flex-col items-center"
      >
        <AnimatePresence mode="wait">
          {!isFinal ? (
            <motion.p
              key={words[index]}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.15 }}
              className="text-2xl md:text-5xl font-medium text-white tracking-tight"
            >
              <span className="mr-3 text-white/40">•</span>
              {words[index]}
            </motion.p>
          ) : (
            <motion.h1
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-4xl md:text-7xl font-bold text-white tracking-tighter"
            >
              azka<span className="text-blue-500">.</span>dev
            </motion.h1>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
