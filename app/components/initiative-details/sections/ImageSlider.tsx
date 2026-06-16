"use client";

import { useRef, useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperType } from "swiper";
import { Autoplay, EffectFade } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-fade";
import { motion } from "framer-motion";
import { moveUp } from "@/app/components/motionVariants";

const ImageSlider = ({ images }: { images: {featured_image_desktop:string;}[] }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const slideImageRefs = useRef<(HTMLImageElement | null)[]>([]);
  const bgImgRef = useRef<HTMLImageElement>(null);
  const swiperRef = useRef<SwiperType | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  // Parallax — direct DOM, zero state
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const handleScroll = () => {
      const rect = container.getBoundingClientRect();
      const vh = window.innerHeight;
      const progress = (vh / 2 - (rect.top + rect.height / 2)) / vh;
      const y = progress * 15;
      if (bgImgRef.current)
        bgImgRef.current.style.transform = `scale(1.15) translateY(${y}vh)`;
      slideImageRefs.current.forEach((img) => {
        if (img) img.style.transform = `scale(1.15) translateY(${y}vh)`;
      });
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSlideChange = useCallback(
    (swiper: SwiperType) => {
      const prev = (swiper.previousIndex ?? 0) % images.length;
      if (bgImgRef.current) {
        // Smoothly crossfade bg to previous slide image
        bgImgRef.current.style.transition = "none";
        bgImgRef.current.style.opacity = "1";
        bgImgRef.current.src = images[prev].featured_image_desktop;
        // After swiper fade completes, fade bg out too so next slide shows cleanly
        requestAnimationFrame(() => {
          if (bgImgRef.current) {
            bgImgRef.current.style.transition =
              "opacity 1.4s cubic-bezier(0.4, 0, 0.2, 1)";
            bgImgRef.current.style.opacity = "0";
          }
        });
      }
    },
    [images],
  );

  const handleSwiper = useCallback((swiper: SwiperType) => {
    swiperRef.current = swiper;
    // Ensure bg starts invisible — first slide is already on top
    if (bgImgRef.current) {
      bgImgRef.current.style.opacity = "0";
    }
  }, []);

  return (
    <section className="w-full bg-white" data-header="light">

      <div
        ref={containerRef}
        className="relative w-full h-[396px] md:h-[680px] 2xl:h-screen overflow-hidden bg-black cursor-grab active:cursor-grabbing"
      >
        {/* z-0 — previous slide bg, fades out after each transition for zero flash */}
        <div className="absolute inset-0 z-0">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            ref={bgImgRef}
            src={images[0]?.featured_image_desktop}
            alt=""
            aria-hidden="true"
            className="w-full h-full object-cover"
            style={{
              transform: "scale(1.15) translateY(0vh)",
              opacity: 0,
              willChange: "opacity, transform",
            }}
          />
        </div>

        {/* z-10 — Swiper crossfade on top */}
        <div className="absolute inset-0 z-10">
          <Swiper
            modules={[Autoplay, EffectFade]}
            effect="fade"
            fadeEffect={{ crossFade: true }}
            speed={500}
            loop={true}
            autoplay={{
              delay: 4500,
              disableOnInteraction: false,
              waitForTransition: false, // ← key fix
            }}
            onSwiper={handleSwiper}
            onSlideChange={(swiper) => {
              setActiveIndex(swiper.realIndex);
              handleSlideChange(swiper);
            }}
            className="w-full h-full"
            allowTouchMove={true}
            style={{ cursor: "inherit" }}
          >
            {images?.map((src, i) => (
              <SwiperSlide
                key={i}
                className="relative w-full h-full"
                style={{ cursor: "inherit" }}
              >
                <Image
                  ref={(el) => {
                    slideImageRefs.current[i] = el;
                  }}
                  src={src.featured_image_desktop}
                  alt={`Gallery image ${i + 1}`}
                  fill
                  sizes="100vw"
                  className="object-cover"
                  priority={i === 0}
                  style={{
                    transform: "scale(1.15) translateY(0vh)",
                    willChange: "transform",
                  }}
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {/* z-20 — gradient overlay — pointer-events-none so clicks pass through to swiper */}
        <div
          className="hidden lg:block absolute inset-0 z-20 pointer-events-none"
          style={{
            background:
              "linear-gradient(180deg, rgba(0, 0, 0, 0) 64.27%, rgba(0, 0, 0, 0.8) 100%)",
          }}
        />
        <div
          className="lg:hidden absolute inset-0 z-20 pointer-events-none"
          style={{
            background:
              "linear-gradient(180deg, rgba(0, 0, 0, 0) 55.27%, rgba(0, 0, 0, 1) 100%)",
          }}
        />

        {/* prev button — z-30 above gradient, pointer-events-auto */}
        <motion.div
          variants={moveUp(0.2)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="absolute left-20 lg:left-70 top-1/2 -translate-y-1/2 z-30 pointer-events-auto"
        >
          <button
            onClick={() => swiperRef.current?.slidePrev()}
            className="cursor-pointer group w-[50px] h-[50px] 3xl:w-[62px] 3xl:h-[62px] border border-white rounded-[50px] flex items-center justify-center overflow-hidden relative"
          >
            <span className="absolute right-0 top-0 h-full w-0 bg-white/30 transition-all duration-300 group-hover:w-full z-0" />
            <Image
              src="/icons/left_arrow_slider_primary.svg"
              alt="Previous"
              width={28}
              height={28}
              className="relative z-10 object-contain 3xl:w-[28px] 3xl:h-[28px] lg:w-[22px] lg:h-[22px] w-[20px] h-[20px] invert brightness-0 group-hover:invert-0 group-hover:brightness-100 transition-all duration-300"
            />
          </button>
        </motion.div>

        {/* next button — z-30 above gradient, pointer-events-auto */}
        <motion.div
          variants={moveUp(0.3)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="absolute right-20 lg:right-70 top-1/2 -translate-y-1/2 z-30 pointer-events-auto"
        >
          <button
            onClick={() => swiperRef.current?.slideNext()}
            className="cursor-pointer group w-[50px] h-[50px] 3xl:w-[62px] 3xl:h-[62px]  border border-white rounded-[50px] flex items-center justify-center overflow-hidden relative"
          >
            <span className="absolute left-0 top-0 h-full w-0 bg-white/30 transition-all duration-300 group-hover:w-full z-0" />
            <Image
              src="/icons/left_arrow_slider_primary.svg"
              alt="Next"
              width={28}
              height={28}
              className="relative rotate-180 z-10 object-contain 3xl:w-[28px] 3xl:h-[28px] lg:w-[22px] lg:h-[22px] w-[20px] h-[20px] invert brightness-0 group-hover:invert-0 group-hover:brightness-100 transition-all duration-300"
            />
          </button>
        </motion.div>

        {/* dots — z-30, pointer-events-auto */}
        <div className="absolute bottom-120 3xl:bottom-130 left-1/2 -translate-x-1/2 z-30 pointer-events-auto flex items-center justify-center gap-3">
          {images.map((_, i) => (
            <button
              key={i}
              onClick={() => swiperRef.current?.slideToLoop(i)}
              className={`cursor-pointer rounded-full transition-all duration-300 border border-white w-[10px] h-[10px] ${
                activeIndex === i ? "bg-white" : "bg-transparent"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ImageSlider;
