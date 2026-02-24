"use client";
import { tools } from "@/data/tools";
import { Tool as Type } from "@/types/Tool";
import Image from "next/image";
import React, { useRef } from "react";
import { motion } from "framer-motion";

const Tools = () => {
  const constraintsRef = useRef(null);

  // Fungsi untuk mendapatkan posisi random awal agar tidak numpuk
  const getRandomPosition = () => ({
    x: Math.random() * 20 - 10,
    y: Math.random() * 20 - 10,
  });

  return (
    <div className="bg-[#050505] py-32 overflow-hidden relative" id="tools">
      {/* Background Decorative Text */}
      <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center opacity-[0.02] pointer-events-none select-none">
        <h2 className="text-[20vw] font-black text-white">STACK</h2>
      </div>

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <div className="text-center mb-20">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-blue-500 font-mono tracking-[0.5em] uppercase text-sm mb-4"
          >
            Technical Arsenal
          </motion.p>
          <motion.h2
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            className="text-4xl md:text-6xl font-bold text-white tracking-tighter"
          >
            Tools I use to <br />{" "}
            <span className="text-gray-500 italic font-light">
              Bring Ideas to Life
            </span>
          </motion.h2>
        </div>

        {/* Game Area / Constraints */}
        <div
          ref={constraintsRef}
          className="relative min-h-[600px] w-full border border-white/5 rounded-[40px] bg-white/[0.01] backdrop-blur-3xl p-8 md:p-12 overflow-hidden shadow-2xl"
        >
          {tools.map((category: Type, catIdx: number) => (
            <div key={category.id} className="mb-12">
              <h3 className="text-white/30 font-mono text-[10px] tracking-[0.4em] uppercase mb-8 ml-4">
                // {category.title}
              </h3>

              <div className="flex flex-wrap gap-6 md:gap-10 justify-center">
                {category.item.map((item, idx) => (
                  <motion.div
                    key={item.id}
                    drag
                    dragConstraints={constraintsRef}
                    dragElastic={0.2}
                    whileDrag={{ scale: 1.1, cursor: "grabbing" }}
                    // Floating Animation
                    animate={{
                      y: [
                        getRandomPosition().y,
                        -getRandomPosition().y,
                        getRandomPosition().y,
                      ],
                      rotate: [0, 5, -5, 0],
                    }}
                    transition={{
                      duration: 4 + Math.random() * 2,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                    className="group relative"
                  >
                    {/* Glow Effect on Hover */}
                    <div className="absolute inset-0 bg-blue-600/20 blur-2xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                    <div className="relative w-20 h-20 md:w-28 md:h-28 bg-gradient-to-br from-white/[0.08] to-transparent border border-white/10 rounded-3xl p-5 backdrop-blur-md flex flex-col items-center justify-center hover:border-blue-500/50 hover:bg-white/[0.1] transition-all duration-300">
                      <div className="relative w-full h-full mb-2">
                        <Image
                          src={item.image}
                          fill
                          alt={item.title}
                          className="object-contain grayscale group-hover:grayscale-0 transition-all duration-500 group-hover:scale-110"
                        />
                      </div>
                      <span className="text-[9px] md:text-[10px] text-gray-500 font-bold tracking-widest uppercase opacity-0 group-hover:opacity-100 transition-opacity">
                        {item.title}
                      </span>
                    </div>

                    {/* Drag Handle Indicator */}
                    <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-1 h-1 bg-white/20 rounded-full group-hover:bg-blue-500 transition-colors" />
                  </motion.div>
                ))}
              </div>
            </div>
          ))}

          {/* Decorative Elements inside the box */}
          <div className="absolute top-4 right-6 flex gap-2">
            <div className="w-2 h-2 rounded-full bg-red-500/50" />
            <div className="w-2 h-2 rounded-full bg-yellow-500/50" />
            <div className="w-2 h-2 rounded-full bg-green-500/50" />
          </div>
        </div>

        <p className="text-center mt-8 text-white/20 text-[10px] tracking-widest font-mono animate-pulse">
          COMMAND: DRAG_AND_DROP_ELEMENTS_TO_ORGANIZE_WORKSPACE
        </p>
      </div>
    </div>
  );
};

export default Tools;
