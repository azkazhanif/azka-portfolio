"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import gsap from "gsap";
import { setScrollLock } from "@/lib/scroll";

export type LightboxImage = { src: string; alt: string; caption?: string };

type Props = {
  images: LightboxImage[];
  index: number | null;
  onChange: (index: number | null) => void;
};

// Full-screen viewer for project screenshots. Rendered into <body> so the page's
// GSAP transforms (which would trap position: fixed) don't affect it.
export default function ImageLightbox({ images, index, onChange }: Props) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const touchStartX = useRef<number | null>(null);
  const isOpen = index !== null;
  const count = images.length;

  const close = useCallback(() => onChange(null), [onChange]);
  const step = useCallback(
    (dir: 1 | -1) => {
      if (index === null || count < 2) return;
      onChange((index + dir + count) % count);
    },
    [index, count, onChange]
  );

  // Lock scroll, move focus into the dialog and return it to the trigger on close
  useEffect(() => {
    if (!isOpen) return;
    const previouslyFocused = document.activeElement as HTMLElement | null;
    setScrollLock(true);
    closeRef.current?.focus();

    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      gsap.fromTo(overlayRef.current, { opacity: 0 }, { opacity: 1, duration: 0.3, ease: "power2.out" });
    });

    return () => {
      mm.revert();
      setScrollLock(false);
      previouslyFocused?.focus();
    };
  }, [isOpen]);

  // Ease each newly shown image in
  useEffect(() => {
    if (index === null) return;
    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      gsap.fromTo(frameRef.current, { opacity: 0, scale: 0.96 }, { opacity: 1, scale: 1, duration: 0.4, ease: "power3.out" });
    });
    return () => mm.revert();
  }, [index]);

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      else if (e.key === "ArrowRight") step(1);
      else if (e.key === "ArrowLeft") step(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen, close, step]);

  if (index === null || typeof document === "undefined") return null;
  const image = images[index];

  return createPortal(
    <div
      ref={overlayRef}
      role="dialog"
      aria-modal="true"
      aria-label={image.alt}
      onClick={close}
      onTouchStart={(e) => (touchStartX.current = e.touches[0].clientX)}
      onTouchEnd={(e) => {
        if (touchStartX.current === null) return;
        const dx = e.changedTouches[0].clientX - touchStartX.current;
        touchStartX.current = null;
        if (Math.abs(dx) > 50) step(dx < 0 ? 1 : -1);
      }}
      className="fixed inset-0 z-[200] flex flex-col items-center justify-center bg-ink/95 dark:bg-foam/95 backdrop-blur-sm px-4 py-16 md:px-20"
    >
      {/* Top bar: counter + close */}
      <div className="absolute top-0 inset-x-0 flex items-center justify-between px-4 md:px-6 py-4">
        <span className="font-mono text-xs tracking-widest text-foam dark:text-ink">
          {count > 1 && `${index + 1} / ${count}`}
        </span>
        <button
          ref={closeRef}
          type="button"
          onClick={close}
          aria-label="Close image"
          className="w-11 h-11 rounded-full border border-foam/30 dark:border-ink/30 text-foam dark:text-ink flex items-center justify-center hover:bg-foam/10 dark:hover:bg-ink/10 transition-colors"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <div
        ref={frameRef}
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-6xl h-full max-h-[78svh]"
      >
        <Image
          key={image.src}
          src={image.src}
          alt={image.alt}
          fill
          sizes="(max-width: 1280px) 100vw, 1152px"
          quality={90}
          className="object-contain"
        />
      </div>

      {image.caption && (
        <p
          onClick={(e) => e.stopPropagation()}
          className="mt-4 max-w-2xl text-center text-xs md:text-sm text-foam/85 dark:text-ink/85 leading-relaxed"
        >
          {image.caption}
        </p>
      )}

      {count > 1 && (
        <>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              step(-1);
            }}
            aria-label="Previous image"
            className="absolute left-2 md:left-6 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full hidden md:flex bg-foam/10 dark:bg-ink/10 border border-foam/30 dark:border-ink/30 text-foam dark:text-ink items-center justify-center hover:bg-foam/20 dark:hover:bg-ink/20 transition-colors"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              step(1);
            }}
            aria-label="Next image"
            className="absolute right-2 md:right-6 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full hidden md:flex bg-foam/10 dark:bg-ink/10 border border-foam/30 dark:border-ink/30 text-foam dark:text-ink items-center justify-center hover:bg-foam/20 dark:hover:bg-ink/20 transition-colors"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </>
      )}
    </div>,
    document.body
  );
}
