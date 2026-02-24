"use client";
import { experiences } from "@/data/experiences";
import { Experience as Type } from "@/types/Experience";
import React from "react";
import { motion } from "framer-motion";

const Experience = () => {
  return (
    <div className="bg-[#050505] text-white py-24" id="experience">
      <div className="max-w-5xl mx-auto px-6 md:px-0">
        {/* Header Section */}
        <div className="mb-16">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-blue-500 font-mono tracking-[0.3em] uppercase text-sm mb-4"
          >
            03. Professional Path
          </motion.p>
          <motion.h2
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            className="text-4xl md:text-6xl font-bold tracking-tighter"
          >
            Experience
          </motion.h2>
        </div>

        {/* --- WORK EXPERIENCE LIST --- */}
        <div className="space-y-4 mb-24">
          {experiences.map((data: Type, index: number) => (
            <motion.div
              key={data.id}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="group relative p-6 md:p-10 rounded-3xl border border-white/5 bg-white/[0.02] hover:bg-white/[0.05] hover:border-blue-500/30 transition-all duration-500 overflow-hidden"
            >
              {/* Background Numbering */}
              <span className="absolute -right-4 -bottom-4 text-8xl font-black text-white/[0.02] group-hover:text-blue-500/[0.05] transition-colors">
                0{index + 1}
              </span>

              <div className="relative z-10 md:flex justify-between items-start gap-8">
                <div className="flex-1">
                  <h4 className="text-2xl md:text-3xl font-bold text-white group-hover:text-blue-400 transition-colors mb-2">
                    {data.title}
                  </h4>
                  <div className="flex items-center gap-3 mb-4">
                    <span className="px-3 py-1 rounded-full bg-blue-500/10 text-blue-400 text-xs font-mono uppercase tracking-widest">
                      {data.position}
                    </span>
                    <span className="text-gray-500 text-sm font-mono">
                      {data.duration}
                    </span>
                  </div>
                  <p className="text-gray-400 leading-relaxed max-w-2xl group-hover:text-gray-200 transition-colors">
                    {data.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* --- AWARDS & EDUCATION BENTO GRID --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* AWARDS COLUMN */}
          <div className="space-y-6">
            <h3 className="text-xl font-bold flex items-center gap-3 mb-8">
              <span className="w-8 h-[1px] bg-blue-500" /> Awards
            </h3>

            <div className="group border-l-2 border-white/10 hover:border-blue-500 pl-6 py-2 transition-colors">
              <h4 className="text-lg font-bold text-white mb-1">
                Champion Winner Mattel Global Internship 2024
              </h4>
              <p className="text-sm text-gray-500 mb-3">
                PT. Mattel Indonesia — 2025
              </p>
              <a
                href="https://drive.google.com/..."
                target="_blank"
                className="text-xs font-mono text-blue-500 hover:text-white uppercase tracking-tighter flex items-center gap-2"
              >
                View Proof <span className="text-lg">→</span>
              </a>
            </div>

            <div className="group border-l-2 border-white/10 hover:border-blue-500 pl-6 py-2 transition-colors">
              <h4 className="text-lg font-bold text-white mb-1">
                Distinction Graduate Bangkit Academy
              </h4>
              <p className="text-sm text-gray-500 mb-3">
                Google, GoTo, Traveloka — 2023
              </p>
              <a
                href="https://drive.google.com/..."
                target="_blank"
                className="text-xs font-mono text-blue-500 hover:text-white uppercase tracking-tighter flex items-center gap-2"
              >
                View Proof <span className="text-lg">→</span>
              </a>
            </div>
          </div>

          {/* EDUCATION COLUMN */}
          <div className="space-y-6">
            <h3 className="text-xl font-bold flex items-center gap-3 mb-8">
              <span className="w-8 h-[1px] bg-blue-500" /> Education
            </h3>

            <div className="relative pl-8 before:absolute before:left-0 before:top-2 before:w-2 before:h-2 before:bg-blue-500 before:rounded-full">
              <h4 className="text-lg font-bold text-white">
                President University
              </h4>
              <p className="text-gray-400 text-sm">
                Informatics - Computer Science
              </p>
              <p className="text-xs text-gray-500 mt-1 font-mono">
                2021 — 2024
              </p>
            </div>

            <div className="relative pl-8 before:absolute before:left-0 before:top-2 before:w-2 before:h-2 before:bg-white/20 before:rounded-full">
              <h4 className="text-lg font-bold text-white">SMK Al-Wafa</h4>
              <p className="text-gray-400 text-sm">Multimedia</p>
              <p className="text-xs text-gray-500 mt-1 font-mono">
                2018 — 2021
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Experience;
