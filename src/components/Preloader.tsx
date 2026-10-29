"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

// Italian, Japanese, Korean, Indonesian, French, then English last
const GREETINGS = ["Benvenuto", "ようこそ", "환영합니다", "Selamat Datang", "Bienvenue", "Welcome"];

const SEEN_KEY = "preloader-seen";

// Bottom edge of the curtain: bulges down while the panel lifts, then flattens
const CURVED_EDGE = "M0 0 L100 0 L100 0 Q50 100 0 0 Z";
const FLAT_EDGE = "M0 0 L100 0 L100 0 Q50 0 0 0 Z";

export default function Preloader({ onComplete }: { onComplete: () => void }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const wordRef = useRef<HTMLSpanElement>(null);
  const edgeRef = useRef<SVGPathElement>(null);

  // Keep the latest callback without restarting the timeline on parent re-renders
  const onCompleteRef = useRef(onComplete);
  onCompleteRef.current = onComplete;

  useEffect(() => {
    const container = containerRef.current;
    const panel = panelRef.current;
    const word = wordRef.current;
    const edge = edgeRef.current;
    if (!container || !panel || !word || !edge) return;

    let seen = false;
    try {
      seen = sessionStorage.getItem(SEEN_KEY) === "1";
    } catch {}

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    // Mark as seen only once it actually finishes (Strict Mode runs effects twice in dev)
    const finish = () => {
      try {
        sessionStorage.setItem(SEEN_KEY, "1");
      } catch {}
      container.classList.remove("preloader-active");
      onCompleteRef.current();
    };
    const setWord = (text: string) => {
      word.textContent = text;
    };

    const ctx = gsap.context(() => {
      const tl = gsap.timeline();

      if (reduceMotion) {
        // No movement: show the final greeting, then fade out
        setWord(GREETINGS[GREETINGS.length - 1]);
        tl.to({}, { duration: 0.6 })
          .call(finish)
          .to(container, { autoAlpha: 0, duration: 0.4 })
          .set(container, { display: "none" });
        return;
      }

      // Repeat visits in the same session only get the final greeting
      const words = seen ? GREETINGS.slice(-1) : GREETINGS;

      setWord(words[0]);
      tl.fromTo(word, { yPercent: 110 }, { yPercent: 0, duration: 0.3, ease: "power3.out" })
        .to({}, { duration: seen ? 0.15 : 0.2 });

      words.slice(1).forEach((text, idx) => {
        const isLast = idx === words.length - 2;
        tl.to(word, { yPercent: -110, duration: 0.08, ease: "power2.in" })
          .call(setWord, [text])
          .fromTo(word, { yPercent: 110 }, { yPercent: 0, duration: isLast ? 0.25 : 0.09, ease: "power3.out" })
          .to({}, { duration: isLast ? 0.25 : 0 });
      });

      // Exit: reveal the page underneath while the curtain lifts with a curved edge
      tl.to(word, { yPercent: -110, opacity: 0, duration: 0.25, ease: "power2.in" })
        .call(finish, [], "-=0.1")
        .to(panel, { yPercent: -100, duration: 0.65, ease: "power3.inOut" }, "<")
        .fromTo(edge, { attr: { d: CURVED_EDGE } }, { attr: { d: FLAT_EDGE }, duration: 0.65, ease: "power3.inOut" }, "<")
        .set(container, { display: "none" });
    }, container);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={containerRef}
      className="preloader-active fixed inset-0 z-[99999] overflow-hidden pointer-events-none select-none"
      aria-hidden="true"
    >
      <div
        ref={panelRef}
        className="absolute inset-0 flex items-center justify-center bg-ink text-foam dark:bg-mist dark:text-ink"
      >
        <div className="overflow-hidden px-6 py-2">
          <div className="flex items-center gap-3 md:gap-5 text-4xl sm:text-6xl md:text-7xl font-black tracking-tight">
            <span className="block w-2.5 h-2.5 md:w-3.5 md:h-3.5 rounded-full bg-accent shrink-0" />
            <span ref={wordRef} className="block" />
          </div>
        </div>

        <svg
          className="absolute top-full left-0 w-full h-[12vh] text-ink dark:text-mist"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
        >
          <path ref={edgeRef} d={CURVED_EDGE} fill="currentColor" />
        </svg>
      </div>
    </div>
  );
}
