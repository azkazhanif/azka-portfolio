"use client";

import React, { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { FaWhatsapp, FaEnvelope } from "react-icons/fa"; // Pastikan install react-icons

const ContactCard = ({ href, icon: Icon, title, label, color }: any) => {
  const ref = useRef<HTMLAnchorElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  // REVERSE MOVE: Teks bergerak berlawanan dengan kursor
  const textX = useTransform(mouseXSpring, [-0.5, 0.5], ["20px", "-20px"]);
  const textY = useTransform(mouseYSpring, [-0.5, 0.5], ["10px", "-10px"]);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    x.set(mouseX / width - 0.5);
    y.set(mouseY / height - 0.5);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.a
      ref={ref}
      href={href}
      target="_blank"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.02 }}
      className="group relative w-full flex items-center justify-between p-8 rounded-3xl bg-white/[0.02] border border-white/5 overflow-hidden transition-all duration-500 hover:border-white/20"
    >
      {/* GLOW EFFECT */}
      <div
        className={`absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-500 blur-3xl pointer-events-none`}
        style={{ backgroundColor: color }}
      />

      <motion.div
        style={{ x: textX, y: textY }}
        className="relative z-10 flex items-center gap-6"
      >
        <div className="p-4 rounded-2xl bg-white/5 text-3xl group-hover:scale-110 transition-transform duration-500">
          <Icon style={{ color: color }} />
        </div>
        <div>
          <h3 className="text-gray-500 font-mono text-[10px] uppercase tracking-[0.3em] mb-1">
            {title}
          </h3>
          <p className="text-xl md:text-3xl font-bold text-white tracking-tighter">
            {label}
          </p>
        </div>
      </motion.div>

      <div className="relative z-10 hidden md:block">
        <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all duration-500">
          <span className="text-xl">↗</span>
        </div>
      </div>
    </motion.a>
  );
};

const Contact = () => {
  return (
    <div className="bg-[#050505] py-32" id="contact">
      <div className="max-w-5xl mx-auto px-6">
        <div className="mb-16 text-center md:text-left">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-blue-500 font-mono tracking-[0.3em] uppercase text-sm mb-4"
          >
            05. Contact
          </motion.p>
          <motion.h2
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            className="text-4xl md:text-7xl font-bold text-white tracking-tighter"
          >
            Ready to{" "}
            <span className="italic font-light text-gray-500">
              Collaborate?
            </span>
          </motion.h2>
        </div>

        <div className="flex flex-col gap-6">
          <ContactCard
            href="https://wa.me/6282214984819"
            icon={FaWhatsapp}
            title="Fast Response"
            label="WhatsApp Business"
            color="#25D366"
          />
          <ContactCard
            href="mailto:azkazhanif@gmail.com"
            icon={FaEnvelope}
            title="Official Mail"
            label="azkazhanif@gmail.com"
            color="#3B82F6"
          />
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="mt-20 flex flex-col md:flex-row justify-between items-center border-t border-white/5 pt-12 gap-8"
        >
          <p className="text-gray-500 font-mono text-xs uppercase tracking-widest">
            © 2026 Azka.dev — Built with Passion
          </p>
          <div className="flex gap-8">
            {["Instagram", "LinkedIn", "Github"].map((social) => (
              <a
                key={social}
                href="#"
                className="text-xs font-bold text-white/40 hover:text-white transition-colors uppercase tracking-[0.2em]"
              >
                {social}
              </a>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Contact;
