"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import "swiper/css";
import "swiper/css/effect-fade";
import { motion, AnimatePresence } from "framer-motion";
import { PressItem } from "../data";
import CustomOutlineButton from "@/app/components/common/CustomOutlineButton";
import { useParallax } from "@/app/hooks/useParallax";
import { moveUp } from "../../motionVariants";

const LatestNewsSlider = ({ news }: { news: PressItem[] }) => {
  const swiperRef = useRef<SwiperType | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const { ref, parallaxY } = useParallax(15);

  const formatted = (date: string) => {
    const d = new Date(date);
    const day = String(d.getDate()).padStart(2, "0");
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const year = d.getFullYear();
    return `${month}-${day}-${year}`;
  };

  const activeItem = news[activeIndex];

  return (
    <div className="relative w-full">
      {/* Swiper */}
      <div
        ref={ref}
        className="relative w-full h-[453px] md:h-[540px] lg:h-[600px] 2xl:h-[650px] 3xl:h-[763px] cursor-grab"
      >
        <Swiper
          modules={[Autoplay, EffectFade]}
          effect="fade"
          fadeEffect={{ crossFade: true }}
          autoplay={{ delay: 5000, disableOnInteraction: false }}
          loop
          onSwiper={(swiper) => (swiperRef.current = swiper)}
          onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
          className="w-full h-full"
        >
          {news.map((item, i) => (
            <SwiperSlide key={item.id} className="relative w-full h-full">
              <Image
                src={item.image}
                alt={item.title}
                fill
                className="object-cover hidden lg:block"
                priority={i === 0}
                style={{
                  transform: `scale(1.15) translateY(${parallaxY}vh)`,
                }}
              />
              <Image
                src={item.mobileImage}
                alt={item.title}
                fill
                className="object-cover lg:hidden"
                priority={i === 0}
                style={{
                  transform: `scale(1.15) translateY(${parallaxY}vh)`,
                }}
              />
              <div
                className="hidden md:block absolute inset-0"
                style={{
                  background:
                    "linear-gradient(180deg, rgba(0, 0, 0, 0) 32.99%, #000000 104.8%)",
                }}
              />
              <div
                className="block md:hidden absolute inset-0"
                style={{
                  background:
                    "linear-gradient(180deg, rgba(0, 0, 0, 0) 20.99%, #000000 104.8%)",
                }}
              />
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Content overlay — outside Swiper slides */}
        <div className="absolute inset-0 flex flex-col items-center justify-between py-50 px-20 sm:px-40 md:px-50 text-center pointer-events-none z-10">
          {/* Top label */}
          <div  >
            <span className="hidden md:block text-19 leading-[100%] text-white font-[avenirBook] font-[800] px-6 py-1 uppercase bg-[#FFFFFF3D] backdrop-blur-[30px] rounded-full">
              Latest News
            </span>
          </div>

          {/* Bottom content */}
          <div className="flex flex-col items-center pointer-events-auto">
            <AnimatePresence mode="wait">
              <motion.p
                key={`cat-${activeIndex}`}
                className="text-white/80 text-description mb-20 capitalize hidden md:block"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{
                  duration: 0.5,
                  delay: 0.05,
                  ease: [0.25, 0.1, 0.25, 1],
                }}
              >
                {activeItem.category} · {formatted(activeItem.date)}
              </motion.p>
            </AnimatePresence>

            <AnimatePresence mode="wait">
              <motion.h2
                key={`title-${activeIndex}`}
                className="text-heading text-white max-w-[1638px] mb-20 line-clamp-2"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{
                  duration: 0.5,
                  delay: 0.12,
                  ease: [0.25, 0.1, 0.25, 1],
                }}
              >
                {activeItem.title}
              </motion.h2>
            </AnimatePresence>

            <AnimatePresence mode="wait">
              <motion.div
                key={`btn-${activeIndex}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{
                  duration: 0.5,
                  delay: 0.2,
                  ease: [0.25, 0.1, 0.25, 1],
                }}
              >
                <Link href={`/media-center/news/${activeItem.slug}`}>
                  <CustomOutlineButton
                    text="Read More"
                    borderColor="border-white/90"
                    px="px-[12px] lg:px-[22px] 3xl:px-[36.6px]"
                  />
                </Link>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Pagination */}
      <motion.div
        variants={moveUp(0.14)}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        className="flex items-center justify-center gap-3 mt-20"
      >
        {news.map((_, i) => (
          <button
            key={i}
            onClick={() => swiperRef.current?.slideToLoop(i)}
            className={`rounded-full transition-all duration-300 cursor-pointer ${
              activeIndex === i
                ? "bg-primary w-[10px] h-[10px]"
                : "bg-white border border-[#404040] w-[10px] h-[10px]"
            }`}
          />
        ))}
      </motion.div>
    </div>
  );
};

export default LatestNewsSlider;
