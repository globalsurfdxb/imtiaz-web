"use client";

import { useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, EffectFade } from "swiper/modules";
import Image from "next/image";
import gsap from "gsap";
import { motion } from "framer-motion";
import { moveUp } from "@/app/components/motionVariants";
import SliderArrowButton from "@/app/components/common/SliderNavigationButton-v4";
import type { Swiper as SwiperType } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

interface SlideImage {
  src: string;
  alt: string;
}

interface MonthData {
  month: string;
  date: string;
  location: string;
  images: SlideImage[];
}

interface SwiperModalProps {
  isOpen: boolean;
  onClose: () => void;
  monthData: MonthData;
}

export default function SwiperModal({
  isOpen,
  onClose,
  monthData,
}: SwiperModalProps) {
  const backdropRef = useRef<HTMLDivElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);
  const [renderModal, setRenderModal] = useState(false);
  const [swiperInstance, setSwiperInstance] = useState<SwiperType | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  // Open animation
  useEffect(() => {
    if (!isOpen) return;
    setRenderModal(true);

    requestAnimationFrame(() => {
      if (!backdropRef.current || !modalRef.current) return;

      gsap.fromTo(
        backdropRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.5, ease: "power2.out" },
      );

      gsap.fromTo(
        modalRef.current,
        {
          opacity: 0,
          scale: 1.08,
          filter: "blur(8px)",
          transformOrigin: "center center",
        },
        {
          opacity: 1,
          scale: 1,
          filter: "blur(0px)",
          duration: 0.55,
          ease: "power3.out",
        },
      );
    });
  }, [isOpen]);

  // Close animation
  const handleClose = () => {
    if (!backdropRef.current || !modalRef.current) return;

    gsap.to(backdropRef.current, {
      opacity: 0,
      duration: 0.3,
      ease: "power2.in",
    });

    gsap.to(modalRef.current, {
      opacity: 0,
      scale: 1.06,
      filter: "blur(16px)",
      duration: 0.5,
      ease: "power3.out",
      onComplete: () => {
        setRenderModal(false);
        onClose();
      },
    });
  };

  if (!renderModal) return null;

  return (
    <div
      ref={backdropRef}
      className="fixed inset-0 z-[9999] bg-black/95 flex items-center justify-center"
      onClick={handleClose}
    >
      {/* Modal container */}
      <div
        ref={modalRef}
        className="relative w-full max-w-[90vw] md:max-w-[80vw] lg:max-w-[70vw] mx-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={handleClose}
          className="absolute -top-12 right-0 z-10 text-white opacity-70 hover:opacity-100 transition-opacity duration-200"
        >
          <Image
            src="/icons/close_nav.svg"
            alt="close"
            width={24}
            height={24}
            className="invert brightness-0 w-[20px] h-[20px]"
          />
        </button>

        {/* Swiper */}
        <div className="relative h-[35vh] sm:h-[45vh] md:h-[65vh] lg:h-[70vh] xl:h-[75vh] overflow-hidden rounded-sm">
          <Swiper
            modules={[Navigation, Pagination, EffectFade]}
            onSwiper={setSwiperInstance}
            onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
            effect="fade"
            fadeEffect={{ crossFade: true }}
            navigation={{
              nextEl: `.modal-swiper-next`,
              prevEl: `.modal-swiper-prev`,
            }}
            pagination={{
              clickable: true,
              el: `.modal-swiper-pagination`,
            }}
            className="w-full h-full"
            loop
          >
            {monthData.images.map((image, imgIdx) => (
              <SwiperSlide key={imgIdx}>
                <div className="relative w-full h-full">
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    className="object-cover"
                  />

                  {/* Left gradient */}
                  <div className="pointer-events-none absolute inset-y-0 left-0 w-[50%] bg-gradient-to-r from-black/60 to-transparent z-10" />

                  {/* Right gradient */}
                  <div className="pointer-events-none absolute inset-y-0 right-0 w-[50%] bg-gradient-to-l from-black/60 to-transparent z-10" />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Prev Button */}
          <motion.div
            variants={moveUp(0.2)}
            initial="hidden"
            animate="show"
            className="absolute left-20 top-1/2 -translate-y-1/2 z-30 pointer-events-auto"
          >
            {/* Swiper binds navigation to this wrapper's class */}
            <div className="modal-swiper-prev">
              <SliderArrowButton direction="prev" variant="light" />
            </div>
          </motion.div>

          {/* Next Button */}
          <motion.div
            variants={moveUp(0.3)}
            initial="hidden"
            animate="show"
            className="absolute right-20 top-1/2 -translate-y-1/2 z-30 pointer-events-auto"
          >
            <div className="modal-swiper-next">
              <SliderArrowButton direction="next" variant="light" />
            </div>
          </motion.div>

          {/* Pagination */}
          <div className="modal-swiper-pagination absolute bottom-4 left-1/2 -translate-x-1/2 z-10" />
        </div>

        {/* Month Info — lg and above: single row with date / thumbs / location */}
        <div className="mt-[10px] md:mt-20 hidden lg:flex justify-between items-center">
          <h3 className="text-25 font-[optima] leading-[1.4] text-white">
            {monthData.date}
          </h3>

          {/* Thumbnails — center */}
          <div className="flex gap-2 justify-center flex-wrap">
            {monthData.images.map((img, i) => (
              <button
                key={i}
                onClick={() => {
                  swiperInstance?.slideToLoop(i);
                  setActiveIndex(i);
                }}
                className={`relative w-[50px] h-[50px] overflow-hidden rounded-sm cursor-pointer transition-all duration-200 ${
                  i === activeIndex
                    ? "border-2 border-white p-[4px]"
                    : "border-2 border-transparent opacity-70"
                }`}
              >
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  className="object-cover rounded-sm"
                />
              </button>
            ))}
          </div>

          <p className="text-description text-white opacity-80">
            {monthData.location}
          </p>
        </div>

        {/* Month Info — below lg: date and location in a row, thumbs centered below */}
        <div className="mt-5 flex flex-col lg:hidden gap-3">
          <div className="flex justify-between items-start">
            <h3 className="text-25 font-[optima] leading-[1.4] text-white">
              <div>{monthData.date.split(" ")[0]}</div>
              <div>{monthData.date.split(" ")[1]}</div>
            </h3>
            <p className="text-description text-white opacity-80">
              {monthData.location}
            </p>
          </div>

          {/* Thumbnails — centered below everything on mobile */}
          <div className="flex gap-2 justify-center flex-wrap">
            {monthData.images.map((img, i) => (
              <button
                key={i}
                onClick={() => {
                  swiperInstance?.slideToLoop(i);
                  setActiveIndex(i);
                }}
                className={`relative w-[50px] h-[50px] overflow-hidden rounded-sm cursor-pointer transition-all duration-200 ${
                  i === activeIndex
                    ? "border-2 border-white p-[4px]"
                    : "border-2 border-transparent opacity-70"
                }`}
              >
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  className="object-cover rounded-sm"
                />
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}