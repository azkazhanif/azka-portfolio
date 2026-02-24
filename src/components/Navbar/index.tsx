"use client";
import { motion } from "framer-motion";
import Link from "next/link";

export const Navbar = () => {
  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 1, delay: 1.2, ease: "circOut" }}
      className="fixed top-0 left-0 w-full z-[100] bg-[#0a0a0a]/80 backdrop-blur-md border-b border-white/5"
    >
      <div className="max-w-7xl flex items-center justify-between mx-auto py-5 px-6">
        <Link
          href="/"
          className="text-xl font-bold tracking-tighter text-white"
        >
          azka<span className="text-blue-500">.</span>dev
        </Link>

        <div className="hidden md:flex items-center gap-8">
          {["Home", "About", "Portfolio", "Contact"].map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              className="text-sm text-gray-400 hover:text-white transition-colors uppercase tracking-widest"
            >
              {item}
            </a>
          ))}
          <a
            href="https://api.whatsapp.com/..."
            className="border border-white/20 hover:bg-white hover:text-black px-6 py-2 rounded-full text-sm transition-all duration-300 text-white"
          >
            Let’s Talk
          </a>
        </div>
      </div>
    </motion.nav>
  );
};
