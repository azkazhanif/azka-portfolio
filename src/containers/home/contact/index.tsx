"use client";

import React, { useEffect, useRef } from "react";
import { FaWhatsapp, FaEnvelope } from "react-icons/fa";
import type { IconType } from "react-icons";
import gsap from "gsap";
import { themeColor } from "@/lib/theme";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { TextPlugin } from "gsap/TextPlugin";

gsap.registerPlugin(ScrollTrigger, TextPlugin);

interface ContactCardProps {
  href: string;
  icon: IconType;
  title: string;
  label: string;
}

const ContactCard = ({ href, icon: Icon, title, label }: ContactCardProps) => {
  const cardRef = useRef<HTMLAnchorElement>(null);

  // Magnetic Button effect (moves ±20px)
  const handleMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const card = cardRef.current;
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    gsap.to(card, {
      x: x * 0.3,
      y: y * 0.3,
      scale: 1.01,
      borderColor: themeColor("ink"),
      boxShadow: `0 15px 35px ${themeColor("shadow", 0.12)}`,
      duration: 0.3,
      ease: "power2.out",
    });
  };

  const handleMouseLeave = () => {
    const card = cardRef.current;
    if (!card) return;

    gsap.to(card, {
      x: 0,
      y: 0,
      scale: 1.0,
      borderColor: themeColor("ocean", 0.1),
      boxShadow: "none",
      clearProps: "borderColor,boxShadow",
      duration: 0.5,
      ease: "power3.out",
    });
  };

  return (
    <a
      ref={cardRef}
      href={href}
      target="_blank"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="group relative w-full flex items-center justify-between p-5 md:p-8 rounded-3xl bg-mist border border-ocean/10 overflow-hidden transition-all duration-300 select-none shadow-sm"
    >
      {/* Ocean Teal Glow */}
      <div className="absolute inset-0 bg-ocean/5 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

      <div className="relative z-10 flex items-center gap-4 md:gap-6">
        <div className="p-3 md:p-4 rounded-2xl bg-foam text-2xl md:text-3xl text-ink group-hover:scale-110 transition-transform duration-500 shadow-inner">
          <Icon />
        </div>
        <div>
          <h3 className="text-ocean/70 font-mono text-[10px] uppercase tracking-[0.3em] mb-1">
            {title}
          </h3>
          <p className="text-lg md:text-3xl font-extrabold text-ink tracking-tight uppercase">
            {label}
          </p>
        </div>
      </div>

      <div className="relative z-10 hidden md:block">
        <div className="w-12 h-12 rounded-full border border-ocean/10 flex items-center justify-center group-hover:bg-ink group-hover:border-ink group-hover:text-foam transition-all duration-500">
          <span className="text-ink group-hover:text-foam text-xl">↗</span>
        </div>
      </div>
    </a>
  );
};

const Contact = () => {
  const headingRef = useRef<HTMLHeadingElement>(null);
  const emailStr = "creativewithazka@gmail.com";

  useEffect(() => {
    // 1. Typewriter reveal for the heading
    if (headingRef.current) {
      gsap.fromTo(
        headingRef.current,
        { text: "" },
        {
          text: "READY TO COLLABORATE?",
          duration: 1.8,
          ease: "none",
          scrollTrigger: {
            trigger: headingRef.current,
            start: "top 85%",
            once: true,
          },
        }
      );
    }
  }, []);

  // 2. Character hover scale handlers
  const handleCharEnter = (e: React.MouseEvent<HTMLSpanElement>) => {
    gsap.to(e.currentTarget, {
      scale: 1.35,
      y: -5,
      color: themeColor("ink"),
      duration: 0.25,
      ease: "power2.out",
    });
  };

  const handleCharLeave = (e: React.MouseEvent<HTMLSpanElement>) => {
    gsap.to(e.currentTarget, {
      scale: 1.0,
      y: 0,
      color: themeColor("ocean"),
      duration: 0.4,
      clearProps: "color",
      ease: "power3.out",
    });
  };

  return (
    <div className="bg-foam py-20 md:py-28 relative overflow-hidden" id="contact">
      <div className="max-w-6xl mx-auto px-4 md:px-6">
        
        {/* HEADER SECTION */}
        <div className="mb-10 md:mb-16 text-center md:text-left">
          <p className="text-ink font-mono tracking-[0.3em] uppercase text-xs mb-4">
            05. Contact
          </p>
          <div className="min-h-16 flex items-center justify-center md:justify-start">
            <h2
              ref={headingRef}
              className="text-3xl sm:text-4xl md:text-6xl font-black text-ink tracking-tight uppercase min-h-[1.2em]"
            >
              {/* Typewriter target */}
            </h2>
          </div>
        </div>

        {/* CONTACT METHOD CARDS */}
        <div className="flex flex-col gap-4 md:gap-6 max-w-4xl mx-auto">
          <ContactCard
            href="https://wa.me/6282214984819"
            icon={FaWhatsapp}
            title="Fast Response"
            label="WhatsApp Business"
          />

          {/* Email Card with character splits */}
          <div className="w-full flex flex-col items-center justify-center p-6 md:p-10 rounded-3xl bg-mist border border-ocean/10 relative overflow-hidden select-none mb-4 shadow-sm">
            <p className="text-ocean/70 font-mono text-[10px] uppercase tracking-[0.3em] mb-4">
              Official Mail
            </p>
            
            <div className="flex flex-wrap justify-center items-center">
              {emailStr.split("").map((char, index) => (
                <span
                  key={index}
                  onMouseEnter={handleCharEnter}
                  onMouseLeave={handleCharLeave}
                  className="inline-block text-base sm:text-2xl md:text-4xl lg:text-5xl font-black text-ocean font-mono py-1 sm:px-0.5 tracking-tight transition-colors duration-300"
                >
                  {char}
                </span>
              ))}
            </div>
            
            <a
              href={`mailto:${emailStr}`}
              data-magnetic
              className="mt-6 py-3 text-xs text-ink font-bold tracking-widest uppercase hover:text-ocean transition-colors flex items-center gap-2"
            >
              SEND DIRECT EMAIL ↗
            </a>
          </div>
        </div>

        {/* FOOTER AREA */}
        <div className="mt-20 md:mt-24 flex flex-col md:flex-row justify-between items-center border-t border-ocean/10 pt-12 gap-8 text-center md:text-left">
          <p className="text-ocean/60 font-mono text-xs uppercase tracking-widest">
            © {new Date().getFullYear()} Azka Zufar Hanif — Built with Passion
          </p>
          <div className="flex flex-wrap justify-center gap-6 md:gap-8">
            {["Instagram", "LinkedIn", "Github"].map((social) => (
              <a
                key={social}
                href="#"
                className="text-xs font-bold text-ocean/55 hover:text-ink transition-colors uppercase tracking-[0.2em] relative"
              >
                {social}
              </a>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

export default Contact;
