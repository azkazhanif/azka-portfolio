"use client";
import Image from "next/image";
import React, { useRef } from "react";
import { motion, useTransform, useMotionValue, useSpring } from "framer-motion";

const Hero = () => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const handleMouseMove = (e: React.MouseEvent) => {
    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;
    mouseX.set(clientX / innerWidth - 0.5);
    mouseY.set(clientY / innerHeight - 0.5);
  };

  const springConfig = { stiffness: 100, damping: 30 };
  const x = useSpring(mouseX, springConfig);
  const y = useSpring(mouseY, springConfig);

  // Layer 1: Text (Deep Background) - Bergerak searah kursor
  const textX = useTransform(x, [-0.5, 0.5], ["-20px", "20px"]);
  const textY = useTransform(y, [-0.5, 0.5], ["-10px", "10px"]);

  // Layer 2: Image (Middle) - Bergerak berlawanan (Reverse)
  const imgX = useTransform(x, [-0.5, 0.5], ["30px", "-30px"]);

  // Layer 3: Button (Front) - Bergerak lebih agresif
  const btnX = useTransform(x, [-0.5, 0.5], ["50px", "-50px"]);

  return (
    <div
      onMouseMove={handleMouseMove}
      className="relative h-screen w-full bg-[#050505] overflow-hidden flex flex-col items-center"
      id="home"
    >
      {/* --- LAYER 1: THE TEXTS (BACK) --- */}
      <motion.div
        style={{ x: textX, y: textY }}
        className="relative z-0 mt-[10vh] flex flex-col items-center select-none pointer-events-none"
      >
        <motion.h1
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 0.15, scale: 1 }}
          transition={{ duration: 1.2, ease: "circOut" }}
          className="text-[28vw] leading-[0.8] font-bold text-white uppercase tracking-tighter"
          style={{ fontFamily: "var(--font-anton), sans-serif" }}
        >
          AZKA
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 0.6, y: 0 }}
          transition={{ delay: 0.8, duration: 1 }}
          className="flex flex-col items-center mt-4"
        >
          <p className="text-white text-sm md:text-xl tracking-[0.5em] font-light uppercase">
            Fullstack Developer
          </p>
          <div className="h-[1px] w-12 bg-blue-600 mt-2" />
          <p className="text-white/40 text-[10px] md:text-xs tracking-[0.3em] mt-2 uppercase">
            & UI Designer
          </p>
        </motion.div>
      </motion.div>

      {/* --- LAYER 2: IMAGE (MIDDLE) --- */}
      <motion.div
        style={{ x: imgX }}
        initial={{ y: 200, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1], delay: 0.4 }}
        className="absolute bottom-0 z-10 w-full max-w-[400px] md:max-w-[600px] h-[60vh] md:h-[80vh]"
      >
        <Image
          src="/images/profile.png"
          fill
          alt="Azka Profile"
          className="object-contain object-bottom grayscale brightness-75 contrast-125 hover:grayscale-0 hover:brightness-100 transition-all duration-1000"
          priority
        />
        {/* Shadow blend agar kaki gambar menyatu dengan gelapnya floor */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent" />
      </motion.div>

      {/* --- LAYER 3: BUTTON (FRONT) --- */}
      <motion.div
        style={{ x: btnX }}
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.8 }}
        className="absolute bottom-12 md:bottom-20 z-20"
      >
        <a
          href="#contact"
          className="group relative flex items-center gap-4 px-10 py-4 bg-white rounded-full overflow-hidden transition-all duration-300 hover:pr-12"
        >
          <span className="relative z-10 text-black font-black text-xs md:text-sm tracking-widest">
            COLLABORATION NOW
          </span>
          <div className="absolute inset-0 bg-blue-600 translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-500" />
          {/* Arrow Icon */}
          <svg
            className="relative z-10 w-4 h-4 text-black group-hover:text-white transition-colors"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M14 5l7 7m0 0l-7 7m7-7H3"
            />
          </svg>
        </a>
      </motion.div>

      {/* Efek Grain untuk mood profesional */}
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none mix-blend-overlay bg-white bg-[url('https://res.cloudinary.com/dvhnd9r37/image/upload/v1614713437/noise_vgllf0.png')]" />
    </div>
  );
};

export default Hero;
