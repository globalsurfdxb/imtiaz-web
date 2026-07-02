"use client";

import { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import "swiper/css";
import SliderArrowButton from "../../common/SliderNavigationButton";
import { SectionHeading } from "../../animations/SectionHeading";
import Reveal from "../../animations/RevealOneByOneAnimation";
import { moveUpV2 } from "../../motionVariants";
import { SectionDescription } from "../../animations/SectionDescription";

type ImpactAreaItem = {
  id: string;
  title: string;
  description: string;
  image: string;
  mobileImage: string;
};

type ImpactAreas = {
  title: string;
  description?: string;
  items: ImpactAreaItem[];
};

const ColItem = ({
  item,
  i,
  isActive,
  showDivider,
  onEnter,
}: {
  item: ImpactAreaItem;
  i: number;
  isActive: boolean;
  showDivider: boolean;
  onEnter: (i: number) => void;
}) => (
  <div
    className="flex-1 relative flex items-end pb-[130px] md:pb-0 md:items-center justify-center cursor-default min-h-[368px]"
    onMouseEnter={() => onEnter(i)}
  >
    {showDivider && (
      <div
        className="absolute left-0 top-0 h-full w-[1px] -translate-x-1/2"
        style={{
          background:
            "linear-gradient(180deg, rgba(255,255,255,0) 0%, #FFFFFF 100%)",
        }}
      />
    )}

    <motion.div
      className="absolute inset-0"
      initial={false}
      animate={{ opacity: isActive ? 1 : 0 }}
      transition={{ duration: 0.9, ease: [0.62, 0.05, 0.01, 0.99] }}
      style={{
        background:
          "linear-gradient(180deg, rgba(0,0,0,0) 7.68%, rgba(0,0,0,0.94) 100%)",
      }}
    />

    <div className="relative flex flex-col items-center justify-center text-center">
      {/* Title — moves up smoothly */}
      <motion.h3
        className="text-white font-[optima] uppercase max-w-[201px] md:max-w-full text-25"
        initial={false}
        animate={{ y: isActive ? -16 : 0 }}
        transition={{
          duration: 0.9,
          ease: [0.25, 0.46, 0.45, 0.94],
          delay: isActive ? 0.08 : 0,
        }}
      >
        {item.title}
      </motion.h3>

      {/* Clip wrapper — animate height via motion, not maxHeight */}
      <motion.div
        className="overflow-hidden"
        initial={false}
        animate={{ height: isActive ? "auto" : 0 }}
        transition={{
          duration: 0.7,
          ease: [0.25, 0.46, 0.45, 0.94],
          delay: isActive ? 0.15 : 0,
        }}
      >
        <motion.div
          initial={false}
          animate={{
            opacity: isActive ? 1 : 0,
            y: isActive ? 0 : 16,
          }}
          transition={{
            opacity: {
              duration: 0.6,
              ease: [0.25, 0.46, 0.45, 0.94],
              delay: isActive ? 0.2 : 0,
            },
            y: {
              duration: 0.6,
              ease: [0.25, 0.46, 0.45, 0.94],
              delay: isActive ? 0.25 : 0,
            },
          }}
          className="pt4 md:pt-[10px]"
        >
          <p className="text-white/80 text-16 font-[avenirBook] leading-[1.54] max-w-[507px] mx-auto px-30 3xl:px-5">
            {item.description}
          </p>
        </motion.div>
      </motion.div>
    </div>
  </div>
);

export default function ImpactAreas({ data }: { data: ImpactAreas }) {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const fadeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const swiperRef = useRef<SwiperType | null>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const bgImageDesktopRef = useRef<HTMLImageElement>(null);
  const bgImageMobileRef = useRef<HTMLImageElement>(null);
  const bgPrevImageDesktopRef = useRef<HTMLImageElement>(null);
  const bgPrevImageMobileRef = useRef<HTMLImageElement>(null);
  const bgCurrentWrapperRef = useRef<HTMLDivElement>(null); // only current 




  useEffect(() => {
    data.items.forEach((item) => {
      const img = new window.Image();
      img.src = item.image;
      const mImg = new window.Image();
      mImg.src = item.mobileImage;
    });
  }, []);

  // Parallax — stable ref, works throughout entire scroll
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const handleScroll = () => {
      const rect = section.getBoundingClientRect();
      const vh = window.innerHeight;
      const progress = (vh / 2 - (rect.top + rect.height / 2)) / vh;
      const y = progress * 15;
      [bgImageDesktopRef, bgImageMobileRef, bgPrevImageDesktopRef, bgPrevImageMobileRef].forEach((ref) => {
        if (ref.current) {
          ref.current.style.transform = `scale(1.15) translateY(${y}vh)`;
        }
      });
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);


const swapImages = (index: number) => {
  const nextSrc = data.items[index].image;
  const nextMobileSrc = data.items[index].mobileImage;

  const swap = () => {
    if (bgPrevImageDesktopRef.current && bgImageDesktopRef.current) {
      bgPrevImageDesktopRef.current.src = bgImageDesktopRef.current.src;
    }
    if (bgPrevImageMobileRef.current && bgImageMobileRef.current) {
      bgPrevImageMobileRef.current.src = bgImageMobileRef.current.src;
    }
    if (bgImageDesktopRef.current) {
      bgImageDesktopRef.current.src = nextSrc;
    }
    if (bgImageMobileRef.current) {
      bgImageMobileRef.current.src = nextMobileSrc;
    }
    if (bgCurrentWrapperRef.current) {
      bgCurrentWrapperRef.current.style.transition = "none";
      bgCurrentWrapperRef.current.style.opacity = "0";
      void bgCurrentWrapperRef.current.offsetHeight;
      bgCurrentWrapperRef.current.style.transition = "opacity 0.6s ease";
      bgCurrentWrapperRef.current.style.opacity = "1";
    }
  };

  const preloadDesktop = new window.Image();
  const preloadMobile = new window.Image();

  let settled = 0;
  let swapped = false;
  const total = 2;

  const trySwap = () => {
    settled++;
    // Fire as soon as both have settled — success OR failure — never hang forever
    if (settled >= total && !swapped) {
      swapped = true;
      swap();
    }
  };

  preloadDesktop.onload = trySwap;
  preloadDesktop.onerror = trySwap; // don't let a broken image block the swap
  preloadMobile.onload = trySwap;
  preloadMobile.onerror = trySwap;

  preloadDesktop.src = nextSrc;
  preloadMobile.src = nextMobileSrc;

  if (preloadDesktop.complete) trySwap();
  if (preloadMobile.complete) trySwap();

  // Safety net: if something weird happens and neither load nor error fires
  // (e.g. request stalls indefinitely), force the swap after a short timeout
  // rather than leaving the UI permanently stuck.
  setTimeout(() => {
    if (!swapped) {
      swapped = true;
      swap();
    }
  }, 800);

  setCurrentIndex(index);
  setActiveIndex(index);
};

    const handleEnter = (index: number) => {
    if (index === activeIndex) return;
    if (fadeTimer.current) clearTimeout(fadeTimer.current);
    swapImages(index);
  };

  const handleSlideChange = (swiper: SwiperType) => {
    swapImages(swiper.realIndex);
  };

  return (
    <section
      ref={sectionRef}
      className="relative w-full h-screen overflow-hidden"
      data-header="light"
    >
<div className="absolute inset-0 bg-[#0a0a0a] z-0" />

      <div className="absolute inset-0 z-[1]">
        {/* Previous — desktop */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          ref={bgPrevImageDesktopRef}
          src={data.items[0].image}
          alt=""
          className="absolute inset-0 w-full h-full object-cover object-center hidden lg:block"
          style={{ transform: "scale(1.15) translateY(0vh)" }}
        />
        {/* Previous — mobile */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          ref={bgPrevImageMobileRef}
          src={data.items[0].mobileImage}
          alt=""
          className="absolute inset-0 w-full h-full object-cover object-center lg:hidden"
          style={{ transform: "scale(1.15) translateY(0vh)" }}
        />

        <div ref={bgCurrentWrapperRef} className="absolute inset-0">
          {/* Current — desktop */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            ref={bgImageDesktopRef}
            src={data.items[0].image}
            alt=""
            className="absolute inset-0 w-full h-full object-cover object-center hidden lg:block"
            style={{ transform: "scale(1.15) translateY(0vh)" }}
          />
          {/* Current — mobile */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            ref={bgImageMobileRef}
            src={data.items[0].mobileImage}
            alt=""
            className="absolute inset-0 w-full h-full object-cover object-center lg:hidden"
            style={{ transform: "scale(1.15) translateY(0vh)" }}
          />
        </div>
      </div>

      <div className="absolute inset-0 bg-black/50 z-10" />

      <div className="absolute top-120 md:top-130 left-1/2 -translate-x-1/2 z-20 container">
        <SectionHeading
          title={data.title}
          className="text-white text-center pointer-events-none mb-20"
        />
        {data.description && (
          <SectionDescription
            text={data.description}
            className="text-white text-center max-w-[931px] mx-auto whitespace-pre-line"
          />
        )}
      </div>

      {/* Desktop (md+) */}
      <div className="absolute left-0 bottom-0 right-0 z-20 hidden md:grid md:grid-cols-3">
        {data.items.map((item, i) => (
          <Reveal key={item.id} variants={moveUpV2}>
            <ColItem
              item={item}
              i={i}
              isActive={activeIndex === i}
              showDivider={i !== 0}
              onEnter={handleEnter}
            />
          </Reveal>
        ))}
      </div>

      {/* Mobile nav buttons */}
      <div className="absolute top-1/2 -translate-y-1/2 left-0 right-0 z-30 flex justify-between px-30 pointer-events-none md:hidden">
        {data.items.length > 1 && (
          <>
            <div className="pointer-events-auto">
              <SliderArrowButton
                onClick={() => swiperRef.current?.slidePrev()}
                direction="prev"
                variant="light"
              />
            </div>
            <div className="pointer-events-auto">
              <SliderArrowButton
                onClick={() => swiperRef.current?.slideNext()}
                direction="next"
                variant="light"
              />
            </div>
          </>
        )}
      </div>

      {/* Mobile (below md) */}
      <div className="absolute left-0 bottom-0 right-0 z-20 md:hidden">
        <Swiper
          modules={[Autoplay]}
          slidesPerView={1}
          breakpoints={{ 640: { slidesPerView: 2 } }}
          autoplay={{ delay: 4000, disableOnInteraction: false }}
          loop
          onSwiper={(swiper) => {
            swiperRef.current = swiper;
            handleSlideChange(swiper);
          }}
          onSlideChange={handleSlideChange}
        >
          {data.items.map((item, i) => (
            <SwiperSlide key={item.id}>
              <ColItem
                item={item}
                i={i}
                isActive={activeIndex === i}
                showDivider={i !== 0}
                onEnter={handleEnter}
              />
            </SwiperSlide>
          ))}
        </Swiper>
        {/* Pagination Dots */}
        <div className="flex gap-3 justify-center items-center z-[50] absolute bottom-[70px] md:bottom-70 left-1/2 -translate-x-1/2">
          {data.items.map((_, i) => (
            <button
              key={i}
              onClick={() => swiperRef.current?.slideToLoop(i)}
              className={`w-[10px] h-[10px] rounded-full border transition-all cursor-pointer ${activeIndex === i
                ? "bg-white border-white"
                : "border-white bg-transparent"
                }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
