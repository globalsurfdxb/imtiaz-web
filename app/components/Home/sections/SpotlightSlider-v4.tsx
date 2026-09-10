"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import gsap from "gsap";
// import { spotlight } from "../data";
import CustomOutlineButton from "../../common/CustomOutlineButton";
import SliderArrowButton from "../../common/SliderNavigationButton";
import { moveUp, itemVariants } from "../../motionVariants";

export type SpotlightSlide = {
  id: string;
  date: string;
  title: string;
  href: string;
  image: string;
  alt: string;
};

export type SpotlightData = {
  title: string;
  viewAllHref: string;
  slides: SpotlightSlide[];
};

function ImageTrack({
  slides,
  targetRef,
  parallaxRef,
  className,
  pointerHandlers,
}: {
  slides: { image: string; alt: string }[];
  targetRef: React.MutableRefObject<HTMLImageElement[]>;
  parallaxRef: React.MutableRefObject<HTMLDivElement | null>; // fix: allow null
  className: string;
  pointerHandlers: React.HTMLAttributes<HTMLDivElement>;
}) {
  return (
    <div className={className} {...pointerHandlers}>
      <div
        ref={parallaxRef}
        className="absolute inset-0"
        style={{ transform: "scale(1.15) translateY(0vh)" }}
      >
        {slides.map((slide, i) => (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            key={i}
            ref={(el) => {
              if (el) targetRef.current[i] = el;
            }}
            src={slide.image}
            alt={slide.alt}
            className="absolute inset-0 w-full h-full object-cover object-center"
            draggable={false}
            style={{
              clipPath: i === 0 ? "inset(0% 0% 0% 0%)" : "inset(0% 100% 0% 0%)",
              zIndex: i === 0 ? 1 : 0,
            }}
          />
        ))}
      </div>
    </div>
  );
}

export default function SustainabilitySpotlight({data,title}:{data:SpotlightData,title:string}) {
  const slides = data.slides;

  const [current, setCurrent] = useState(0);

  const currentIdxRef = useRef(0);
  // While true, ALL user input (clicks, drags) is ignored completely.
  // This is the simplest, most robust way to prevent animation corruption.
  const isAnimRef = useRef(false);

  const dImgsRef = useRef<HTMLImageElement[]>([]);
  const mImgsRef = useRef<HTMLImageElement[]>([]);
  // MutableRefObject<HTMLDivElement | null> matches useRef<HTMLDivElement>(null)
  const dParallaxRef = useRef<HTMLDivElement>(null);
  const mParallaxRef = useRef<HTMLDivElement>(null);

  const dragStartX = useRef<number | null>(null);
  const isDragging = useRef(false);
  const DRAG_THRESHOLD = 50;

  const autoplayRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const goNextRef = useRef<() => void>(() => {});
  const sectionRef = useRef<HTMLElement>(null);

  // ── Parallax ──────────────────────────────────────────────────────────────────
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const onScroll = () => {
      const rect = section.getBoundingClientRect();
      const vh = window.innerHeight;
      const y = ((vh / 2 - (rect.top + rect.height / 2)) / vh) * 15;
      const t = `scale(1.15) translateY(${y}vh)`;
      if (dParallaxRef.current) dParallaxRef.current.style.transform = t;
      if (mParallaxRef.current) mParallaxRef.current.style.transform = t;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // ── Settle all images to a clean known state ──────────────────────────────────
  const settle = useCallback(
    (activeIdx: number) => {
      slides.forEach((_, i) => {
        const active = i === activeIdx;
        [dImgsRef.current[i], mImgsRef.current[i]].forEach((img) => {
          if (!img) return;
          gsap.set(img, {
            clipPath: active ? "inset(0% 0% 0% 0%)" : "inset(0% 100% 0% 0%)",
            zIndex: active ? 1 : 0,
            scale: 1,
          });
        });
      });
    },
    [slides],
  );

  // ── Core go() ─────────────────────────────────────────────────────────────────
  const go = useCallback(
    (nextIdx: number, forcedDir?: 1 | -1) => {
      // Hard block: if animating, ignore ALL calls — no queuing, no interrupting.
      // Autoplay, clicks, and drags all respect this. The animation always
      // completes cleanly before the next one can start.
      if (isAnimRef.current) return;
      if (nextIdx === currentIdxRef.current) return;

      const prevIdx = currentIdxRef.current;
      const dir: 1 | -1 = forcedDir ?? (nextIdx > prevIdx ? 1 : -1);

      currentIdxRef.current = nextIdx;
      isAnimRef.current = true;
      setCurrent(nextIdx);

      const fromClip =
        dir === 1 ? "inset(0% 0% 0% 100%)" : "inset(0% 100% 0% 0%)";

      [dImgsRef.current[nextIdx], mImgsRef.current[nextIdx]].forEach((img) => {
        if (img) gsap.set(img, { clipPath: fromClip, zIndex: 2, scale: 1.06 });
      });

      let dDone = false;
      let mDone = false;

      const onBothDone = () => {
        if (!dDone || !mDone) return;
        settle(nextIdx);
        isAnimRef.current = false;
      };

      const animate = (
        img: HTMLImageElement | undefined,
        onDone: () => void,
      ) => {
        if (!img) {
          onDone();
          return;
        }
        const tl = gsap.timeline({ onComplete: onDone });
        tl.to(img, {
          clipPath: "inset(0% 0% 0% 0%)",
          duration: 1.7,
          ease: "expo.inOut",
        });
        tl.to(img, { scale: 1, duration: 1.4, ease: "power2.out" }, "<");
      };

      animate(dImgsRef.current[nextIdx], () => {
        dDone = true;
        onBothDone();
      });
      animate(mImgsRef.current[nextIdx], () => {
        mDone = true;
        onBothDone();
      });
    },
    [slides, settle],
  );

  const goPrev = useCallback(() => {
    const i =
      currentIdxRef.current === 0
        ? slides.length - 1
        : currentIdxRef.current - 1;
    go(i, -1);
  }, [slides.length, go]);

  const goNext = useCallback(() => {
    const i =
      currentIdxRef.current === slides.length - 1
        ? 0
        : currentIdxRef.current + 1;
    go(i, 1);
  }, [slides.length, go]);

  useEffect(() => {
    goNextRef.current = goNext;
  }, [goNext]);

  // ── Autoplay ──────────────────────────────────────────────────────────────────
  const stopAutoplay = useCallback(() => {
    if (autoplayRef.current) {
      clearInterval(autoplayRef.current);
      autoplayRef.current = null;
    }
  }, []);

  const startAutoplay = useCallback(() => {
    stopAutoplay();
    autoplayRef.current = setInterval(() => goNextRef.current(), 4200);
  }, [stopAutoplay]);

  useEffect(() => {
    startAutoplay();
    return stopAutoplay;
  }, [startAutoplay, stopAutoplay]);

  // ── Pointer / drag — also respect isAnimRef so dragging mid-anim does nothing ─
  const handlePointerDown = (e: React.PointerEvent) => {
    if (isAnimRef.current) return;
    dragStartX.current = e.clientX;
    isDragging.current = false;
    stopAutoplay();
  };
  const handlePointerMove = (e: React.PointerEvent) => {
    if (dragStartX.current === null) return;
    if (Math.abs(e.clientX - dragStartX.current) > 5) isDragging.current = true;
  };
  const handlePointerUp = (e: React.PointerEvent) => {
    if (dragStartX.current === null) return;
    const delta = e.clientX - dragStartX.current;
    if (
      isDragging.current &&
      Math.abs(delta) >= DRAG_THRESHOLD &&
      !isAnimRef.current
    ) {
      delta < 0 ? goNext() : goPrev();
    }
    dragStartX.current = null;
    isDragging.current = false;
    startAutoplay();
  };
  const handlePointerLeave = () => {
    dragStartX.current = null;
    isDragging.current = false;
    startAutoplay();
  };

  const pointerHandlers = {
    onPointerDown: handlePointerDown,
    onPointerMove: handlePointerMove,
    onPointerUp: handlePointerUp,
    onPointerLeave: handlePointerLeave,
  };

  const slide = slides[current];

  return (
    <section
      ref={sectionRef}
      className="w-full make-header-black bg-white pt-[122px] pb-[90px] lg:py-130 relative z-10"
      data-header="dark"
    >
      <div className="container">
        {/* ══ MOBILE ══════════════════════════════════════════════════════════════ */}
        <div className="flex flex-col items-center lg:hidden">
          <motion.h2
            variants={moveUp(0)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="uppercase text-heading text-foreground mb-50 text-center"
          >
            {title}
          </motion.h2>

          <AnimatePresence mode="wait">
            <motion.div
              key={slide.id}
              className="flex flex-col items-center text-center mb-[30px] lg:mb-50"
            >
              <motion.span
                custom={0}
                variants={itemVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="text-16 font-[avenirBook] text-foreground-light mb-5 md:mb-[30px] lg:mb-20"
              >
                {slide.date}
              </motion.span>
              <motion.h3
                custom={1}
                variants={itemVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="text-25 font-[optima] uppercase text-foreground line-clamp-2 leading-[1.2] mb-[30px] lg:mb-50 max-w-[598px]"
              >
                {slide.title}
              </motion.h3>
              <motion.div
                custom={2}
                variants={itemVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
              >
                <Link
                  href={slide.href}
                  className="text-primary-2 text-19 leading-[100%] font-[avenirBook] hover:opacity-70 transition-opacity duration-300"
                >
                  <CustomOutlineButton
                    variant="dark"
                    text="Read More"
                    borderColor="border-primary-2"
                    textColor="text-primary-2"
                    px="px-[12px] lg:px-[20px] 3xl:px-[36.6px]"
                  />
                </Link>
              </motion.div>
            </motion.div>
          </AnimatePresence>

          <div className="flex items-center gap-[10px] mb-[30px] lg:mb-50">
            {slides.map((_, i) => (
              <button
                key={i}
                onClick={() => {
                  go(i);
                  startAutoplay();
                }}
                className={`rounded-full transition-all duration-300 cursor-pointer w-[10px] h-[10px] ${
                  i === current
                    ? "bg-primary-2"
                    : "bg-white border border-primary-2"
                }`}
              />
            ))}
          </div>

          <ImageTrack
            slides={slides}
            targetRef={mImgsRef}
            parallaxRef={mParallaxRef}
            className="w-full relative h-[328px] sm:h-[400px] overflow-hidden cursor-grab active:cursor-grabbing select-none mb-5 sm:mb-50"
            pointerHandlers={pointerHandlers}
          />

          <div className="flex items-center justify-between w-full gap-30">
            <CustomOutlineButton
              variant="dark"
              text="View All"
              borderColor="border-primary-2"
              textColor="text-primary-2"
              px="px-10 md:px-[30px] lg:px-[26px] h-[44px] md:h-[50px]  xl:h-[66px]"
            />
            <div className="flex items-center gap-[15px]">
              <SliderArrowButton
                onClick={() => {
                  goPrev();
                  startAutoplay();
                }}
                direction="prev"
                variant="dark"
              />
              <SliderArrowButton
                onClick={() => {
                  goNext();
                  startAutoplay();
                }}
                direction="next"
                variant="dark"
              />
            </div>
          </div>
        </div>

        {/* ══ DESKTOP ══════════════════════════════════════════════════════════════ */}
        <div className="hidden lg:block">
          <div className="flex items-center justify-center gap-50 3xl:gap-160">
            <div className="w-auto flex flex-col items-center justify-center">
              <div className="flex flex-col items-center text-center">
                <motion.h2
                  variants={moveUp(0)}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true }}
                  className="uppercase text-heading text-foreground mb-90"
                >
                  {data.title}
                </motion.h2>

                <AnimatePresence mode="wait">
                  <motion.div
                    key={slide.id}
                    className="flex flex-col items-center text-center"
                  >
                    <div className="overflow-hidden mb-20">
                      <motion.span
                        custom={0}
                        variants={moveUp(0)}
                        initial="hidden"
                        animate="show"
                        exit="exit"
                        className="text-16 font-[avenirBook] text-foreground-light"
                      >
                        {slide.date}
                      </motion.span>
                    </div>
                    <div className="overflow-hidden">
                      <motion.h3
                        custom={1}
                        variants={moveUp(0.1)}
                        initial="hidden"
                        animate="show"
                        exit="exit"
                        className="text-25 font-[optima] uppercase text-foreground line-clamp-2 leading-[1.2] mb-50 max-w-[598px]"
                      >
                        {slide.title}
                      </motion.h3>
                    </div>
                    <div className="overflow-hidden">
                      <motion.div
                        custom={2}
                        variants={moveUp(0.14)}
                        initial="hidden"
                        animate="show"
                        exit="exit"
                      >
                        <Link
                          href={`/media-center/news/${slide.title.toLowerCase().replace(/ /g, "-")}`}
                          className="text-primary-2 text-19 font-[avenirBook] leading-[100%]  transition-colors duration-300"
                        >
                          <CustomOutlineButton
                    variant="dark"
                    text="Read More"
                    borderColor="border-primary-2"
                    textColor="text-primary-2"
                    px="px-[12px] lg:px-[20px] 3xl:px-[36.6px]"
                    readMore
                  />
                        </Link>
                      </motion.div>
                    </div>
                  </motion.div>
                </AnimatePresence>

                <div className="flex items-center gap-[10px] mt-80">
                  {slides.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => {
                        go(i);
                        startAutoplay();
                      }}
                      className={`rounded-full transition-all duration-300 cursor-pointer w-[10px] h-[10px] ${
                        i === current
                          ? "bg-primary-2"
                          : "bg-white border border-primary-2"
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>

            <ImageTrack
              slides={slides}
              targetRef={dImgsRef}
              parallaxRef={dParallaxRef}
              className="w-1/2 relative h-[460px] 2xl:h-[520px] 3xl:h-[602px] overflow-hidden cursor-grab active:cursor-grabbing select-none"
              pointerHandlers={pointerHandlers}
            />
          </div>

          <div className="overflow-hidden">
            <div className="flex justify-center mt-50 gap-20 3xl:gap-30">
              <motion.div
                variants={moveUp(0)}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                exit="exit"
              >
                <Link href="/media-center/news">
                  <CustomOutlineButton
                    variant="dark"
                    text="View All"
                    borderColor="border-primary-2"
                    textColor="text-primary-2"
                    px="px-[12px] lg:px-[20px] 3xl:px-[36.6px]"
                  />
                </Link>
              </motion.div>
              <div className="flex items-center gap-[10px] 3xl:gap-[15px]">
                <motion.div
                  variants={moveUp(0.1)}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true }}
                  exit="exit"
                >
                  <SliderArrowButton
                    onClick={() => {
                      goPrev();
                      startAutoplay();
                    }}
                    direction="prev"
                    variant="dark"
                  />
                </motion.div>
                <motion.div
                  variants={moveUp(0.13)}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true }}
                  exit="exit"
                >
                  <SliderArrowButton
                    onClick={() => {
                      goNext();
                      startAutoplay();
                    }}
                    direction="next"
                    variant="dark"
                  />
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
