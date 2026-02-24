"use client";

import { portfolios } from "@/data/portfolio";
import { Portfolio } from "@/types/Portfolio";
import Image from "next/image";
import Footer from "@/components/Footer";
import { Navbar } from "@/components/Navbar";
import { use } from "react";
import { motion } from "framer-motion";

type tParams = Promise<{ slug: string }>;

const PortfolioDetail = ({ params }: { params: tParams }) => {
  const { slug }: { slug: string } = use(params);

  const data: Portfolio | undefined = portfolios.find((p) => p.slug === slug);

  if (!data)
    return (
      <div className="h-screen flex items-center justify-center bg-[#050505] text-white">
        <p className="font-mono tracking-widest uppercase">Project Not Found</p>
      </div>
    );

  // Animation Variants
  const slideUp = {
    hidden: { y: 100, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
    },
  };

  const staggerContainer = {
    visible: { transition: { staggerChildren: 0.1 } },
  };

  return (
    <div className="bg-[#050505] min-h-screen text-white">
      <Navbar />

      <main className="max-w-6xl mx-auto pt-32 pb-24 px-6">
        {/* --- HEADER SECTION --- */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
          className="mb-16"
        >
          <div className="overflow-hidden">
            <motion.p
              variants={slideUp}
              className="text-blue-500 font-mono tracking-[0.4em] uppercase text-xs md:text-sm mb-4"
            >
              Project Case Study / {data.duration}
            </motion.p>
          </div>

          <div className="overflow-hidden">
            <motion.h1
              variants={slideUp}
              className="text-5xl md:text-8xl font-bold tracking-tighter leading-none mb-8"
            >
              {data.title}
            </motion.h1>
          </div>

          <motion.div
            variants={slideUp}
            className="flex gap-3 flex-wrap items-center"
          >
            <span className="text-gray-500 font-mono text-xs uppercase mr-2">
              Technologies:
            </span>
            {data.technologies.map((tech) => (
              <span
                key={tech}
                className="bg-white/5 border border-white/10 rounded-full py-1.5 px-4 text-xs font-medium text-gray-300 backdrop-blur-sm"
              >
                {tech}
              </span>
            ))}
          </motion.div>
        </motion.div>

        {/* --- HERO IMAGE SECTION --- */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="relative w-full aspect-video rounded-[2rem] overflow-hidden border border-white/5 mb-20 group"
        >
          <Image
            src={data.image}
            alt={data.title}
            fill
            className="object-cover transition-transform duration-1000 group-hover:scale-105"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#050505]/40 to-transparent" />
        </motion.div>

        {/* --- CONTENT SECTION --- */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
          {/* Sidebar Info */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6 }}
            className="md:col-span-4 space-y-8"
          >
            <div>
              <h4 className="text-xs font-mono uppercase tracking-widest text-blue-500 mb-2">
                Role
              </h4>
              <p className="text-lg text-white">Lead Fullstack Designer</p>
            </div>
            <div>
              <h4 className="text-xs font-mono uppercase tracking-widest text-blue-500 mb-2">
                Year
              </h4>
              <p className="text-lg text-white">{data.duration}</p>
            </div>
            <div className="pt-8 border-t border-white/5">
              <button className="w-full py-4 bg-white text-black font-bold rounded-2xl hover:bg-blue-600 hover:text-white transition-all duration-300">
                LIVE PREVIEW ↗
              </button>
            </div>
          </motion.div>

          {/* Detailed Description */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="md:col-span-8"
          >
            <h3 className="text-2xl font-bold mb-6 text-white">Overview</h3>
            <p className="text-gray-400 text-lg leading-relaxed mb-8 first-letter:text-5xl first-letter:font-bold first-letter:mr-3 first-letter:float-left first-letter:text-white">
              {data.description}
            </p>

            {/* Project Goal Mockup Section */}
            <div className="bg-white/5 p-8 rounded-3xl border border-white/10 mt-12">
              <h4 className="text-blue-400 font-mono text-sm mb-4 uppercase tracking-widest">
                The Challenge
              </h4>
              <p className="text-gray-300 italic">
                Focusing on user-centric design while maintaining
                high-performance code architecture to deliver a seamless digital
                experience.
              </p>
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  );
};

export default PortfolioDetail;
