"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { themeColor } from "@/lib/theme";

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const followerRef = useRef<HTMLDivElement>(null);
  const [viewText, setViewText] = useState(false);

  useEffect(() => {
    const dot = dotRef.current;
    const follower = followerRef.current;
    if (!dot || !follower) return;

    // Set initial positions off-screen to avoid jumping
    gsap.set(dot, { xPercent: -50, yPercent: -50, x: -100, y: -100 });
    gsap.set(follower, { xPercent: -50, yPercent: -50, x: -100, y: -100 });

    // Instantly follow mouse coordinates for the core dot
    const xToDot = gsap.quickTo(dot, "x", { duration: 0.08, ease: "power3.out" });
    const yToDot = gsap.quickTo(dot, "y", { duration: 0.08, ease: "power3.out" });

    // Lag ease follower (0.15s lag)
    const xToFollower = gsap.quickTo(follower, "x", { duration: 0.35, ease: "power2.out" });
    const yToFollower = gsap.quickTo(follower, "y", { duration: 0.35, ease: "power2.out" });

    const handleMouseMove = (e: MouseEvent) => {
      xToDot(e.clientX);
      yToDot(e.clientY);
      xToFollower(e.clientX);
      yToFollower(e.clientY);
    };

    window.addEventListener("mousemove", handleMouseMove);

    // Hover states for interactions (Ocean Calm Theme: deep teal accent, medium teal hover fill)
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target) return;

      const isLink = target.closest("a, button, [role='button'], input, textarea, select");
      const isProjectCard = target.closest("[data-cursor='project']");

      if (isProjectCard) {
        setViewText(true);
        gsap.to(follower, {
          width: 80,
          height: 80,
          backgroundColor: themeColor("ocean", 0.15),
          borderColor: themeColor("ink", 0.5),
          duration: 0.3,
          overwrite: "auto",
        });
        gsap.to(dot, {
          scale: 0,
          duration: 0.2,
          overwrite: "auto",
        });
      } else if (isLink) {
        setViewText(false);
        gsap.to(follower, {
          width: 80,
          height: 80,
          backgroundColor: themeColor("ocean", 0.15),
          borderColor: themeColor("ink", 0.5),
          duration: 0.3,
          overwrite: "auto",
        });
        gsap.to(dot, {
          scale: 1,
          duration: 0.2,
          overwrite: "auto",
        });
      } else {
        setViewText(false);
        gsap.to(follower, {
          width: 40,
          height: 40,
          backgroundColor: "rgba(255, 255, 255, 0)",
          borderColor: themeColor("ink", 0.4),
          duration: 0.3,
          overwrite: "auto",
        });
        gsap.to(dot, {
          scale: 1,
          duration: 0.2,
          overwrite: "auto",
        });
      }
    };

    window.addEventListener("mouseover", handleMouseOver);

    // Hide custom cursors when leaving/entering the browser window
    const handleMouseLeave = () => {
      gsap.to([dot, follower], { opacity: 0, duration: 0.3 });
    };
    const handleMouseEnter = () => {
      gsap.to([dot, follower], { opacity: 1, duration: 0.3 });
    };

    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseover", handleMouseOver);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
    };
  }, []);

  return (
    <>
      <div
        ref={dotRef}
        className="fixed top-0 left-0 w-1.5 h-1.5 bg-ink rounded-full pointer-events-none z-[9999]"
      />
      <div
        ref={followerRef}
        className="fixed top-0 left-0 w-10 h-10 border border-ink/40 rounded-full pointer-events-none z-[9998] flex items-center justify-center overflow-hidden transition-[width,height] duration-300"
      >
        {viewText && (
          <span className="text-[10px] text-ink tracking-[0.22em] font-extrabold uppercase select-none">
            VIEW
          </span>
        )}
      </div>
    </>
  );
}
