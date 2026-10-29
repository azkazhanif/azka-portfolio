"use client";

import React, { createContext, useContext, useState, useRef, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import gsap from "gsap";

interface TransitionContextType {
  transitionTo: (href: string, title: string) => void;
  isTransitioning: boolean;
}

const TransitionContext = createContext<TransitionContextType | undefined>(undefined);

export const useTransition = () => {
  const context = useContext(TransitionContext);
  if (!context) throw new Error("useTransition must be used within PageTransitionProvider");
  return context;
};

export default function PageTransitionProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [projectTitle, setProjectTitle] = useState("");
  const overlayRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  // Path we are leaving; the enter animation waits until the route actually changes
  const fromPathRef = useRef(pathname);

  // Leave Transition
  const transitionTo = (href: string, title: string) => {
    if (isTransitioning) return;
    fromPathRef.current = pathname;
    setIsTransitioning(true);
    setProjectTitle(title);
    // Start fetching (and in dev, compiling) the target while the curtain animates
    router.prefetch(href);

    const overlay = overlayRef.current;
    const text = textRef.current;
    if (!overlay || !text) {
      router.push(href);
      return;
    }

    gsap.killTweensOf([overlay, text]);

    const tl = gsap.timeline({
      onComplete: () => {
        router.push(href);
      },
    });

    // 1. Overlay curtain rises from the bottom (same motion language as the preloader)
    tl.set(overlay, { yPercent: 100, display: "flex" })
      .to(overlay, {
        yPercent: 0,
        duration: 0.6,
        ease: "power3.inOut",
      })
      // 2. In middle: project name appears (Seafoam light text #E8F4F0) with clipPath mask reveal
      .fromTo(
        text,
        { yPercent: 100, clipPath: "polygon(0 100%, 100% 100%, 100% 100%, 0 100%)" },
        {
          yPercent: 0,
          clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
          duration: 0.5,
          ease: "power3.out",
        },
        "-=0.2"
      )
      // 3. Panel stays still for 0.3s
      .to({}, { duration: 0.3 });
  };

  // Enter Transition (triggered after route changes)
  useEffect(() => {
    const overlay = overlayRef.current;
    const text = textRef.current;
    if (!overlay || !text || !isTransitioning || pathname === fromPathRef.current) return;

    const tl = gsap.timeline({
      onComplete: () => {
        setIsTransitioning(false);
        gsap.set(overlay, { display: "none" });
      },
    });

    // 4. Curtain lifts off the top, project title slides up and out
    tl.to(text, {
      yPercent: -100,
      clipPath: "polygon(0 0, 100% 0, 100% 0, 0 0)",
      duration: 0.4,
      ease: "power3.in",
    })
      .to(
        overlay,
        {
          yPercent: -100,
          duration: 0.6,
          ease: "power3.inOut",
        },
        "-=0.2"
      );

    const transitionCompleteEvent = new CustomEvent("pageTransitionComplete");
    window.dispatchEvent(transitionCompleteEvent);

  }, [pathname, isTransitioning]);

  return (
    <TransitionContext.Provider value={{ transitionTo, isTransitioning }}>
      {children}
      {/* Page transition overlay panel */}
      <div
        ref={overlayRef}
        style={{ display: "none" }}
        className="fixed inset-0 z-[99999] bg-ink dark:bg-mist items-center justify-center pointer-events-none"
      >
        <div className="overflow-hidden py-4 px-8 max-w-full">
          <h2
            ref={textRef}
            className="text-foam dark:text-ink font-extrabold tracking-widest text-center select-none uppercase"
            style={{ fontSize: "clamp(36px, 8vw, 110px)", lineHeight: 1.1 }}
          >
            {projectTitle}
          </h2>
        </div>
      </div>
    </TransitionContext.Provider>
  );
}
