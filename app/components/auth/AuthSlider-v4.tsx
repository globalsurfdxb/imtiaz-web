"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { slides } from "./data";

const DELAY = 5000;

// Each slide drifts to a unique destination — starts from center every time
const DRIFT = [
  { x: "-2%", y: "-1.5%" },
  { x: "2%", y: "-2%" },
  { x: "-1.5%", y: "1.5%" },
  { x: "1.5%", y: "-1%" },
];

export default function AuthSlider() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [baseIndex, setBaseIndex] = useState(0);

  // One ref per slide image wrapper (Ken Burns + opacity target)
  const imgRefs = useRef<(HTMLDivElement | null)[]>([]);
  const titleRef = useRef<HTMLParagraphElement | null>(null);

  // Track current index synchronously — no stale closure
  const currentRef = useRef(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // ── Ken Burns: always from a clean start position ──────────────────────────
  // We never animate from current position because mid-drift state causes the
  // snap-back feel. Instead: set to origin silently, then drift over full duration.
  const startKenBurns = useCallback((i: number) => {
    const el = imgRefs.current[i];
    if (!el) return;
    const d = DRIFT[i % DRIFT.length];
    gsap.killTweensOf(el);
    // Instant silent reset to origin (invisible because opacity is still 0 or
    // transitioning in — no snap visible to the user)
    gsap.set(el, { scale: 1, x: "0%", y: "0%" });
    gsap.to(el, {
      scale: 1.07,
      x: d.x,
      y: d.y,
      duration: DELAY / 1000 + 1.5, // slightly longer than interval so it never completes visibly
      ease: "none",
    });
  }, []);

  // ── Transition to a specific index ─────────────────────────────────────────
  const goTo = useCallback(
    (next: number) => {
      const prev = currentRef.current;
      if (next === prev) return;
      currentRef.current = next;

      setBaseIndex(prev);
      setActiveIndex(next);

      const prevEl = imgRefs.current[prev];
      const nextEl = imgRefs.current[next];

      // Freeze leaving slide exactly where it is, then fade out
      if (prevEl) {
        gsap.killTweensOf(prevEl);
        gsap.to(prevEl, { opacity: 0, duration: 1, ease: "power2.inOut" });
      }

      // Fade in entering slide — Ken Burns starts silently before opacity hits 1
      // so by the time it's visible, it's already smoothly in motion
      if (nextEl) {
        startKenBurns(next);
        gsap.fromTo(
          nextEl,
          { opacity: 0 },
          { opacity: 1, duration: 1, ease: "power2.inOut" },
        );
      }

      // Title wipe up
      if (titleRef.current) {
        gsap.fromTo(
          titleRef.current,
          { y: 40, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8, ease: "power3.out", delay: 0.2 },
        );
      }
    },
    [startKenBurns],
  );

  // ── Mount: init all slides, start first Ken Burns + title ──────────────────
  useEffect(() => {
    imgRefs.current.forEach((el, i) => {
      if (!el) return;
      gsap.set(el, { opacity: i === 0 ? 1 : 0, scale: 1, x: "0%", y: "0%" });
    });

    startKenBurns(0);

    if (titleRef.current) {
      gsap.fromTo(
        titleRef.current,
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.9, ease: "power3.out", delay: 0.4 },
      );
    }
  }, [startKenBurns]);

  // ── Consistent auto-advance via plain setInterval ──────────────────────────
  useEffect(() => {
    timerRef.current = setInterval(() => {
      const next = (currentRef.current + 1) % slides.length;
      goTo(next);
    }, DELAY);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [goTo]);

  // ── Dot click: jump to index, reset timer so it doesn't fire immediately after ──
  const handleDotClick = (i: number) => {
    if (timerRef.current) clearInterval(timerRef.current);
    goTo(i);
    timerRef.current = setInterval(() => {
      const next = (currentRef.current + 1) % slides.length;
      goTo(next);
    }, DELAY);
  };

  return (
    <div className="relative w-full h-full overflow-hidden">
      {/* Base layer — always shows the leaving slide so exit fade has no black gap */}
      <div className="absolute inset-0 z-0">
        <Image
          src={slides[baseIndex].src}
          alt=""
          fill
          className="object-cover object-center"
          aria-hidden
        />
        <div
          style={{
            background:
              "linear-gradient(180deg, rgba(0,0,0,0) 39.74%, #000000 110.68%)",
          }}
          className="absolute inset-0"
        />
      </div>

      {/* Static logo */}
      <div className="absolute top-90 left-1/2 -translate-x-1/2 z-20 pointer-events-none">
        <Image
          src="/images/footer-logo-inner.svg"
          alt="Imtiaz Developments logo"
          width={222}
          height={60}
          priority
          className="h-[60px] w-auto"
        />
      </div>

      {/* Slide images — all stacked, GSAP opacity controls visibility */}
      <div className="absolute inset-0 z-10">
        {slides.map((slide, i) => (
          <div key={slide.id} className="absolute inset-0 overflow-hidden">
            <div
              ref={(el) => {
                imgRefs.current[i] = el;
              }}
              className="absolute inset-0 will-change-transform"
            >
              <Image
                src={slide.src}
                alt={slide.title}
                fill
                className="object-cover object-center"
                priority={i === 0}
              />
            </div>
            <div
              style={{
                background:
                  "linear-gradient(180deg, rgba(0,0,0,0) 39.74%, #000000 110.68%)",
              }}
              className="absolute inset-0"
            />
          </div>
        ))}
      </div>

      {/* Title + pagination */}
      <div className="absolute bottom-90 left-0 right-0 z-20 flex flex-col items-center justify-center px-50">
        <div className="overflow-hidden mb-50">
          <p
            ref={titleRef}
            className="text-heading text-white text-center max-w-[32ch]"
          >
            {slides[activeIndex]?.title}
          </p>
        </div>

        <div className="flex gap-[10px]">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => handleDotClick(i)}
              aria-label={`Go to slide ${i + 1}`}
              className={[
                "w-[10px] h-[10px] rounded-full border border-white cursor-pointer transition-all duration-300",
                i === activeIndex ? "bg-primary-2" : "",
              ].join(" ")}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
