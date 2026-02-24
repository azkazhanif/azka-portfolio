"use client";
import React from "react";
import { motion } from "framer-motion";

const About = () => {
  return (
    <section
      className="bg-[#050505] py-24 px-6 md:px-0 overflow-hidden"
      id="about"
    >
      <div className="max-w-5xl mx-auto">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 items-start">
          {/* Kolom Kiri: Judul & CTA */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <p className="font-mono text-blue-500 tracking-[0.3em] uppercase text-sm mb-4">
              Behind the Code
            </p>
            <h2 className="text-4xl md:text-6xl font-bold text-white mb-8 leading-tight">
              A Tech & <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-cyan-400">
                Design Enthusiast
              </span>
            </h2>

            <motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href="https://drive.google.com/file/..."
              target="_blank"
              className="inline-flex items-center gap-3 px-8 py-4 border border-white/10 rounded-full text-white hover:bg-white hover:text-black transition-all duration-300"
            >
              <span className="text-sm font-bold tracking-widest uppercase">
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
                  strokeWidth={2}
                  d="M14 5l7 7m0 0l-7 7m7-7H3"
                />
              </svg>
            </motion.a>
          </motion.div>

          {/* Kolom Kanan: Deskripsi */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            {/* Quote Decorative Icon */}
            <span className="absolute -top-10 -left-6 text-8xl text-white/5 font-serif select-none pointer-events-none">
              &ldquo;
            </span>

            <p className="text-xl md:text-2xl font-medium text-white/90 leading-relaxed mb-6 italic">
              &quot;Turning ideas into functional art—where code meets
              creativity&quot;
            </p>

            <div className="space-y-4 text-gray-400 leading-relaxed text-lg">
              <p>
                With{" "}
                <span className="text-white">
                  3+ years of coding experience
                </span>
                , I blend technical skills and design thinking to build
                impactful digital solutions.
              </p>
              <p>
                My journey includes interning at{" "}
                <span className="text-blue-400">PT. Mattel Indonesia</span>,
                where I developed internal web systems, and leading design
                initiatives as Vice Director of Design at PUMA Computing.
              </p>
              <p>
                Passionate about merging logic with aesthetics, I thrive on
                creating intuitive, user-driven experiences—let’s collaborate
                and bring ideas to life!
              </p>
            </div>

            {/* Stats Kecil (Opsional) */}
            <div className="flex gap-8 mt-12 border-t border-white/5 pt-8">
              <div>
                <p className="text-white font-bold text-2xl">3+</p>
                <p className="text-gray-500 text-xs tracking-widest uppercase">
                  Years Exp
                </p>
              </div>
              <div>
                <p className="text-white font-bold text-2xl">20+</p>
                <p className="text-gray-500 text-xs tracking-widest uppercase">
                  Projects
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
 