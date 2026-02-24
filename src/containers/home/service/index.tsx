"use client";
import { services } from "@/data/services";
import { Service as Type } from "@/types/Service";
import Image from "next/image";
import React from "react";
import { motion } from "framer-motion";

const Service = () => {
  // Variasi animasi untuk teks slide up
  const lineVariant = {
    hidden: { y: "100%" },
    visible: {
      y: 0,
      transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
    },
  };

  const containerVariant = {
    visible: { transition: { staggerChildren: 0.1 } },
  };

  return (
    <div className="bg-[#050505] py-24" id="service">
      <div className="max-w-5xl mx-auto px-6 md:px-0">
        <div className="grid grid-cols-1 md:grid-cols-3 items-start gap-12">
          {/* KOLOM KIRI: Judul dengan Slide Up Animation */}
          <motion.div
            variants={containerVariant}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="col-span-1 sticky top-24"
          >
            <div className="overflow-hidden">
              <motion.h1
                variants={lineVariant}
                className="text-3xl md:text-5xl font-bold text-white leading-tight"
              >
                Let’s Build
              </motion.h1>
            </div>
            <div className="overflow-hidden">
              <motion.h1
                variants={lineVariant}
                className="text-3xl md:text-5xl font-bold text-white leading-tight"
              >
                Something Great
              </motion.h1>
            </div>
            <div className="overflow-hidden">
              <motion.h1
                variants={lineVariant}
                className="text-3xl md:text-5xl font-bold text-white leading-tight"
              >
                Together
              </motion.h1>
            </div>
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: "4rem" }}
              transition={{ delay: 0.5, duration: 1 }}
              className="h-1 bg-blue-600 mt-6"
            />
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
              className="mt-6 text-gray-400 text-sm tracking-widest uppercase font-mono"
            >
              — Here’s How I Can Help
            </motion.p>
          </motion.div>

          {/* KOLOM KANAN: Service Cards */}
          <div className="col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-6">
            {services.map((data: Type, index: number) => (
              <motion.div
                key={data.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -10 }}
                className="group p-8 rounded-2xl bg-white/[0.03] border border-white/5 hover:border-blue-500/50 hover:bg-white/[0.05] transition-all duration-500"
              >
                <div className="relative mb-6 flex justify-center">
                  {/* Glowing background behind image on hover */}
                  <div className="absolute inset-0 bg-blue-600/20 blur-[50px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
                  <Image
                    src={data.image}
                    width={140}
                    height={140}
                    alt={data.title}
                    className="relative z-10 h-32 w-auto object-contain grayscale group-hover:grayscale-0 transition-all duration-500 scale-90 group-hover:scale-100"
                  />
                </div>
                <h3 className="text-xl font-bold mb-3 text-white group-hover:text-blue-400 transition-colors">
                  {data.title}
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  {data.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Service;
