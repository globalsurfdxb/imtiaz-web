"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { moveUp } from "../../motionVariants";
// import { otherPageSliderData } from "../data";
import gsap from "gsap";
import CustomOutlineButton from "../../common/CustomOutlineButton";
import Image from "next/image";

type OtherPageSliderData = {
  learnMoreText: string;

  slides: {
    title: string;
    description: string;
    link: string;
    bgImage: string;
    bgImageMobile: string;
    alt: string;
    buttonText: string;
  }[];
};

export default function OtherPageSlider({ data }: { data: OtherPageSliderData }) {
  const slides = data.slides
  const [current, setCurrent] = useState(0);
  const currentRef = useRef(0);
  const transitioning = useRef(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const cooldownRef = useRef(false); // debounce guard

  const [bp, setBp] = useState<"mobile" | "desktop">("desktop");

  useEffect(() => {
    const handleResize = () => {
      setBp(window.innerWidth < 768 ? "mobile" : "desktop");
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const getImageForBp = useCallback(
    (slide: OtherPageSliderData["slides"][number]) =>
      bp === "mobile" ? slide.bgImageMobile || slide.bgImage : slide.bgImage,
    [bp],
  );

  // Two canvas layers
  const layerARef = useRef<HTMLDivElement>(null);
  const layerBRef = useRef<HTMLDivElement>(null);
  const activeLayerRef = useRef<"A" | "B">("A");

  // Drag tracking
  const dragStartX = useRef<number | null>(null);
  const isDragging = useRef(false);

  // Preloaded images cache
  const imageCache = useRef<Record<string, HTMLImageElement>>({});

  // Preload all images on mount
  useEffect(() => {
    slides.forEach((slide) => {
      [slide.bgImage, slide.bgImageMobile].forEach((src) => {
        if (src && !imageCache.current[src]) {
          const img = new window.Image();
          img.src = src;
          imageCache.current[src] = img;
        }
      });
    });
  }, [slides]);

  // Parallax on scroll
  useEffect(() => {
    const PARALLAX_STRENGTH = 15; // vh units

    const handleScroll = () => {
      const section = layerARef.current?.closest(
        "section",
      ) as HTMLElement | null;
      if (!section) return;

      const { top, height } = section.getBoundingClientRect();
      const viewportH = window.innerHeight;

      // progress: -1 (section bottom at top of viewport) → +1 (section top at bottom)
      const progress = (viewportH / 2 - (top + height / 2)) / (viewportH / 2);
      const offset = progress * PARALLAX_STRENGTH;

      [layerARef.current, layerBRef.current].forEach((layer) => {
        if (!layer) return;
        layer.style.backgroundPositionY = `calc(50% + ${offset}vh)`;
        // scale is applied via transform on a wrapper — use backgroundSize for zoom
        layer.style.backgroundSize = `cover`;
        layer.style.transform = `scale(1.15)`;
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // run once on mount
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const setLayerBg = (layer: HTMLDivElement, src: string) => {
    layer.style.backgroundImage = `url(${src})`;
    layer.style.backgroundSize = "cover";
    layer.style.backgroundPosition = "center";
    layer.style.transform = "scale(1.15)"; // headroom for parallax movement
  };

  // Reset autoplay — always restarts the 4500ms clock from zero
  const resetAutoplay = useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      goNextAuto();
    }, 4500);
  }, []); // goNextAuto defined below via ref to avoid stale closure

  const goNextAutoRef = useRef<() => void>(() => { });

  const goTo = useCallback(
    (index: number, fromAuto = false) => {
      if (transitioning.current) return;
      if (index === currentRef.current) return;

      transitioning.current = true;
      if (fromAuto) cooldownRef.current = true;

      const layerA = layerARef.current!;
      const layerB = layerBRef.current!;
      const incoming = activeLayerRef.current === "A" ? layerB : layerA;
      const outgoing = activeLayerRef.current === "A" ? layerA : layerB;
      setLayerBg(incoming, getImageForBp(slides[index]));
      gsap.set(incoming, { opacity: 0, zIndex: 10 });
      gsap.set(outgoing, { zIndex: 5 });

      currentRef.current = index;
      setCurrent(index);

      const duration = fromAuto ? 1 : 0.45; // fast for manual, smooth for auto

      gsap.to(incoming, {
        opacity: 1,
        duration,
        ease: "power2.inOut",
        onComplete: () => {
          gsap.set(outgoing, { opacity: 0 });
          activeLayerRef.current = activeLayerRef.current === "A" ? "B" : "A";
          transitioning.current = false;

          if (fromAuto) {
            setTimeout(() => {
              cooldownRef.current = false;
            }, 600);
          }
        },
      });
    },
    [slides,getImageForBp],
  );

  const goPrev = useCallback(() => {
    resetAutoplay();
    goTo((currentRef.current - 1 + slides.length) % slides.length);
  }, [slides.length, goTo, resetAutoplay]);

  const goNext = useCallback(() => {
    resetAutoplay();
    goTo((currentRef.current + 1) % slides.length);
  }, [slides.length, goTo, resetAutoplay]);

  const goNextAuto = useCallback(() => {
    goTo((currentRef.current + 1) % slides.length, true);
  }, [slides.length, goTo]);

  // Keep ref in sync so resetAutoplay's interval always calls latest goNextAuto
  useEffect(() => {
    goNextAutoRef.current = goNextAuto;
  }, [goNextAuto]);

  // Init layer A with first slide
useEffect(() => {
  if (layerARef.current) {
    setLayerBg(layerARef.current, getImageForBp(slides[0]));
    gsap.set(layerARef.current, { opacity: 1, zIndex: 10 });
  }
  if (layerBRef.current) {
    gsap.set(layerBRef.current, { opacity: 0, zIndex: 5 });
  }
}, [slides, getImageForBp]);

useEffect(() => {
  const activeRef = activeLayerRef.current === "A" ? layerARef : layerBRef;
  if (activeRef.current) {
    setLayerBg(activeRef.current, getImageForBp(slides[currentRef.current]));
  }
  // eslint-disable-next-line react-hooks/exhaustive-deps
}, [bp]);

  // Initial autoplay
  useEffect(() => {
    intervalRef.current = setInterval(() => {
      goNextAutoRef.current();
    }, 4500);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  // ── Drag handlers ──────────────────────────────────────────────
  const DRAG_THRESHOLD = 50; // px needed to trigger a slide change

  const onPointerDown = useCallback((e: React.PointerEvent) => {
    dragStartX.current = e.clientX;
    isDragging.current = false;
  }, []);

  const onPointerMove = useCallback((e: React.PointerEvent) => {
    if (dragStartX.current === null) return;
    if (Math.abs(e.clientX - dragStartX.current) > 8) {
      isDragging.current = true;
    }
  }, []);

  const onPointerUp = useCallback(
    (e: React.PointerEvent) => {
      if (dragStartX.current === null) return;
      const delta = e.clientX - dragStartX.current;

      if (isDragging.current && Math.abs(delta) >= DRAG_THRESHOLD) {
        if (delta < 0) {
          goNext(); // dragged left → next
        } else {
          goPrev(); // dragged right → prev
        }
      }

      dragStartX.current = null;
      isDragging.current = false;
    },
    [goNext, goPrev],
  );

  const onPointerLeave = useCallback(() => {
    dragStartX.current = null;
    isDragging.current = false;
  }, []);

  return (
    <section
      data-header="dark"
      className="relative w-full overflow-hidden select-none h-screen cursor-grab"
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerLeave={onPointerLeave}
    >
      {/* Full-bleed background layers — these must stay outside container to cover full width */}
      <div
        ref={layerARef}
        className="absolute inset-0"
        style={{ willChange: "opacity" }}
      >
        <div className="absolute inset-0 bg-black/50" />
      </div>
      <div
        ref={layerBRef}
        className="absolute inset-0"
        style={{ willChange: "opacity" }}
      >
        <div className="absolute inset-0 bg-black/50" />
      </div>

      {/* Container — all visible UI lives here */}
      <div className="container h-full relative z-20">
        {/* Left nav */}
        <div className="hidden md:flex absolute left-0 top-1/2 lg:-translate-y-1/2  z-30 min-w-full justify-between">
          <motion.div
            variants={moveUp(0.3)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className=" "
          >
            <button
              onClick={(e) => {
                e.stopPropagation();
                goPrev();
              }}
              style={{ cursor: "pointer" }}
              className="relative lg:w-[62px] lg:h-[62px] w-[50px] h-[50px] group border border-white rounded-[50px] flex items-center justify-center overflow-hidden"
            >
              <span className="absolute left-0 top-0 h-full w-0 bg-white/30 transition-all duration-300 group-hover:w-full z-0" />
              <Image
                width={58}
                height={58}
                src="/icons/left_arrow_slider_primary.svg"
                alt="Prev"
                className="relative z-10 object-contain lg:w-[28px] lg:h-[28px] w-[21px] h-[21px]  invert brightness-0 group-hover:invert-0 group-hover:brightness-100 transition-all duration-300"
              />
            </button>
          </motion.div>

          {/* Right nav */}
          <motion.div
            variants={moveUp(0.3)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className=" "
          >
            <button
              onClick={(e) => {
                e.stopPropagation();
                goNext();
              }}
              style={{ cursor: "pointer" }}
              className="relative lg:w-[62px] lg:h-[62px] w-[50px] h-[50px]   group border border-white rounded-[50px] flex items-center justify-center overflow-hidden"
            >
              <span className="absolute left-0 top-0 h-full w-0 bg-white/30 transition-all duration-300 group-hover:w-full z-0" />
              <Image
                width={58}
                height={58}
                src="/icons/left_arrow_slider_primary.svg"
                alt="Next"
                className="relative rotate-180 z-10 object-contain lg:w-[28px] lg:h-[28px] w-[21px] h-[21px]  invert brightness-0 group-hover:invert-0 group-hover:brightness-100 transition-all duration-300"
              />
            </button>
          </motion.div>
        </div>

        {/* Center content */}
        <div
          key={current}
          className="absolute inset-0 flex flex-col items-center justify-center text-center"
        >
          <motion.h2
            variants={moveUp(0)}
            initial="hidden"
            animate="show"
            className="uppercase text-white text-heading mb-20"
          >
            {slides[current].title}
          </motion.h2>
          <motion.p
            variants={moveUp(0.15)}
            initial="hidden"
            animate="show"
            className="text-description text-white/80 mb-50 max-w-[50ch]"
          >
            {slides[current].description}
          </motion.p>
          <motion.div variants={moveUp(0.2)} initial="hidden" animate="show">
            <Link href={slides[current].link}>
              <CustomOutlineButton
                text={slides[current].buttonText}
                className="capitalize"
                variant="light"
                px="px-[12px] sm:px-[26px] lg:px-[34px] 3xl:w-[172px] lg:w-auto h-[44px] md:h-[50px]  xl:h-[66px]"
              />
            </Link>
          </motion.div>

          <div className="md:hidden flex mt-[60px] justify-center gap-20">
            <motion.div
              variants={moveUp(0.3)}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              className=" "
            >
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  goPrev();
                }}
                style={{ cursor: "pointer" }}
                className="relative lg:w-[62px] lg:h-[62px] w-[50px] h-[50px] group border border-white rounded-[50px] flex items-center justify-center overflow-hidden"
              >
                <span className="absolute left-0 top-0 h-full w-0 bg-white/30 transition-all duration-300 group-hover:w-full z-0" />
                <Image
                  width={58}
                  height={58}
                  src="/icons/left_arrow_slider_primary.svg"
                  alt="Prev"
                  className="relative z-10 object-contain lg:w-[28px] lg:h-[28px] w-[21px] h-[21px]  invert brightness-0 group-hover:invert-0 group-hover:brightness-100 transition-all duration-300"
                />
              </button>
            </motion.div>

            {/* Right nav */}
            <motion.div
              variants={moveUp(0.3)}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              className=" "
            >
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  goNext();
                }}
                style={{ cursor: "pointer" }}
                className="relative lg:w-[62px] lg:h-[62px] w-[50px] h-[50px]   group border border-white rounded-[50px] flex items-center justify-center overflow-hidden"
              >
                <span className="absolute left-0 top-0 h-full w-0 bg-white/30 transition-all duration-300 group-hover:w-full z-0" />
                <Image
                  width={58}
                  height={58}
                  src="/icons/left_arrow_slider_primary.svg"
                  alt="Next"
                  className="relative rotate-180 z-10 object-contain lg:w-[28px] lg:h-[28px] w-[21px] h-[21px]  invert brightness-0 group-hover:invert-0 group-hover:brightness-100 transition-all duration-300"
                />
              </button>
            </motion.div>
          </div>
        </div>

        {/* Pagination dots */}
        <div className="absolute bottom-[70px] md:bottom-70 left-1/2 -translate-x-1/2 z-30 flex items-center justify-center gap-3">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={(e) => {
                e.stopPropagation();
                resetAutoplay();
                goTo(i);
              }}
              style={{ cursor: "pointer" }}
              className={`rounded-full transition-all duration-300 border border-white w-[10px] h-[10px] ${i === current ? "bg-white" : "bg-transparent"
                }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
