"use client";
import { portfolios } from "@/data/portfolio";
import { Portfolio as Type } from "@/types/Portfolio";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { motion } from "framer-motion";

const Portfolio = () => {
  const MAX_DISPLAY = 3;

  const titleLines = ["Selected", "Works &", "Digital Case Studies"];

  return (
    <div className="bg-[#050505] py-24" id="portfolio">
      <div className="max-w-6xl mx-auto px-6 md:px-0">
        {/* HEADER DENGAN ANIMASI PER LINE */}
        <div className="mb-20">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-blue-500 font-mono tracking-[0.3em] uppercase text-sm mb-4"
          >
            04. Projects
          </motion.p>

          <div className="flex flex-col">
            {titleLines.map((line, i) => (
              <div key={i} className="overflow-hidden">
                <motion.h2
                  initial={{ y: "100%" }}
                  whileInView={{ y: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.8,
                    delay: i * 0.1,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="text-4xl md:text-7xl font-bold text-white tracking-tighter leading-tight"
                >
                  {line}
                </motion.h2>
              </div>
            ))}
          </div>
        </div>

        {/* GRID LAYOUT YANG LEBIH WOW */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          {portfolios.map((data: Type, index: number) => (
            <motion.div
              key={data.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
            >
              <Link
                href={`/portfolio/${data.slug}`}
                className="group relative block w-full rounded-3xl overflow-hidden bg-white/[0.02] border border-white/5"
              >
                {/* IMAGE CONTAINER WITH ZOOM EFFECT */}
                <div className="relative aspect-[16/10] overflow-hidden">
                  <Image
                    src={data.image}
                    fill
                    alt={data.title}
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-110 grayscale group-hover:grayscale-0"
                  />
                  {/* OVERLAY GRADIENT */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent opacity-80 group-hover:opacity-40 transition-opacity duration-500" />

                  {/* FLOATING TECH BADGE (MUNCUL SAAT HOVER) */}
                  <div className="absolute top-6 left-6 flex gap-2 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-[-10px] group-hover:translate-y-0">
                    {data.technologies.slice(0, 2).map((tech) => (
                      <span
                        key={tech}
                        className="bg-white/10 backdrop-blur-md text-white text-[10px] px-3 py-1 rounded-full border border-white/10 uppercase tracking-widest font-mono"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* CONTENT AREA */}
                <div className="p-8">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-2xl md:text-3xl font-bold text-white mb-1 group-hover:text-blue-500 transition-colors">
                        {data.title}
                      </h3>
                      <p className="text-gray-500 text-sm font-mono uppercase tracking-widest">
                        {data.duration}
                      </p>
                    </div>
                    <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center group-hover:bg-white group-hover:border-white transition-all duration-500">
                      <svg
                        className="w-5 h-5 text-white group-hover:text-black transition-colors rotate-[-45deg] group-hover:rotate-0"
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
                    </div>
                  </div>

                  <p className="text-gray-400 text-sm leading-relaxed mb-6 line-clamp-2 group-hover:text-gray-200 transition-colors">
                    {data.description}
                  </p>

                  <div className="flex items-center text-xs font-bold tracking-[0.2em] text-white/40 group-hover:text-blue-500 uppercase transition-colors">
                    View Case Study{" "}
                    <span className="ml-2 h-[1px] w-0 group-hover:w-8 bg-blue-500 transition-all duration-500" />
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* VIEW ALL WORK (Optional Decorative) */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="mt-20 text-center"
        >
          <p className="text-white/20 font-mono text-[10px] uppercase tracking-[0.5em]">
            More projects available on GitHub / Behance
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default Portfolio;
