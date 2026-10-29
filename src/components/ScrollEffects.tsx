"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(ScrollTrigger, SplitText);

/**
 * Page-wide, attribute-driven effects. Mount once the preloader is done.
 * - [data-split-reveal]: words rise out of a line mask when scrolled into view
 * - [data-scrub-text]: words light up one by one as you scroll through
 * - [data-magnetic]: element drifts toward the cursor (fine pointers only)
 */
export default function ScrollEffects({ enabled = true }: { enabled?: boolean }) {
  useEffect(() => {
    if (!enabled) return;

    const mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const splits: SplitText[] = [];

      document.querySelectorAll<HTMLElement>("[data-split-reveal]").forEach((el) => {
        splits.push(
          SplitText.create(el, {
            type: "lines,words",
            mask: "lines",
            autoSplit: true,
            onSplit: (self) =>
              gsap.from(self.words, {
                yPercent: 110,
                duration: 0.9,
                stagger: 0.05,
                ease: "power4.out",
                scrollTrigger: { trigger: el, start: "top 85%", once: true },
              }),
          })
        );
      });

      document.querySelectorAll<HTMLElement>("[data-scrub-text]").forEach((el) => {
        splits.push(
          SplitText.create(el, {
            type: "words",
            autoSplit: true,
            onSplit: (self) =>
              gsap.fromTo(
                self.words,
                { opacity: 0.15 },
                {
                  opacity: 1,
                  stagger: 0.1,
                  ease: "none",
                  scrollTrigger: { trigger: el, start: "top 85%", end: "bottom 55%", scrub: true },
                }
              ),
          })
        );
      });

      return () => splits.forEach((split) => split.revert());
    });

    mm.add("(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)", () => {
      const cleanups = Array.from(document.querySelectorAll<HTMLElement>("[data-magnetic]")).map((el) => {
        const xTo = gsap.quickTo(el, "x", { duration: 0.4, ease: "power3.out" });
        const yTo = gsap.quickTo(el, "y", { duration: 0.4, ease: "power3.out" });

        const handleMove = (e: MouseEvent) => {
          const rect = el.getBoundingClientRect();
          xTo((e.clientX - rect.left - rect.width / 2) * 0.3);
          yTo((e.clientY - rect.top - rect.height / 2) * 0.3);
        };
        const handleLeave = () => {
          xTo(0);
          yTo(0);
        };

        el.addEventListener("mousemove", handleMove);
        el.addEventListener("mouseleave", handleLeave);
        return () => {
          el.removeEventListener("mousemove", handleMove);
          el.removeEventListener("mouseleave", handleLeave);
        };
      });

      return () => cleanups.forEach((cleanup) => cleanup());
    });

    return () => mm.revert();
  }, [enabled]);

  return null;
}
