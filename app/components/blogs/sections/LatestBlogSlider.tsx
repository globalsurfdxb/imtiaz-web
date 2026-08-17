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
import { Blog } from "../data";
import CustomOutlineButton from "@/app/components/common/CustomOutlineButton";
import { useParallax } from "@/app/hooks/useParallax";
import { moveUp } from "../../motionVariants";

const LatestBlogSlider = ({ blogs }: { blogs: Blog[] }) => {
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

  const activeBlog = blogs[activeIndex];

  return (
    <div className="relative w-full">
      {/* Swiper */}
      <div
        ref={ref}
        className="relative w-full h-[495px] md:h-[540px] lg:h-[600px] 2xl:h-[650px] 3xl:h-[763px] cursor-grab"
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
          {blogs.map((blog, i) => (
            <SwiperSlide key={blog.id} className="relative w-full h-full">
              <Image
                src={blog.image}
                alt={blog.title}
                fill
                className="object-cover hidden lg:block"
                priority={i === 0}
                style={{
                  transform: `scale(${i === 0 ? 1.06 : 1.15}) translateY(${parallaxY}vh)`,
                }}
              />

              <Image
                src={blog.mobileImage ? blog.mobileImage : blog.image}
                alt={blog.title}
                fill
                className="object-cover lg:hidden"
                priority={i === 0}
                style={{
                  transform: `scale(${i === 0 ? 1.06 : 1.15}) translateY(${parallaxY}vh)`,
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

        {/* Content overlay — outside Swiper slides, AnimatePresence handles stagger per slide */}
        <div className="absolute inset-0 flex flex-col items-center justify-between py-[30px] md:py-50 px-20 sm:px-40 md:px-50 text-center pointer-events-none z-10">
          {/* Top label */}
          <div>
            <span className="text-19 leading-[100%] text-white font-[avenirBook] font-[800] px-6 py-1 uppercase bg-[#FFFFFF3D] backdrop-blur-[30px] rounded-full">
              Latest Blog
            </span>
          </div>

          {/* Bottom content */}
          <div className="flex flex-col items-center pointer-events-auto">
            <AnimatePresence mode="wait">
              <motion.p
                key={`cat-${activeIndex}`}
                className="text-white/80   text-description mb-20 capitalize"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{
                  duration: 0.5,
                  delay: 0.05,
                  ease: [0.25, 0.1, 0.25, 1],
                }}
              >
                {activeBlog.category} <span className={`${activeBlog.category?.length > 0  ?  'block' : 'hidden'}`}>·</span> {formatted(activeBlog.date)}
              </motion.p>
            </AnimatePresence>

            <AnimatePresence mode="wait">
              <motion.h2
                key={`title-${activeIndex}`}
                className="text-[18px]  md:text-50 text-heading text-white max-w-[1000px] mb-20 line-clamp-2"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{
                  duration: 0.5,
                  delay: 0.12,
                  ease: [0.25, 0.1, 0.25, 1],
                }}
              >
                {activeBlog.title}
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
                <Link href={`/media-center/blog/${activeBlog.slug}`}>
                  <CustomOutlineButton
                    text="Read More"
                    borderColor="border-white/90"
                    px="h-[44px] md:h-[50px]  xl:h-[66px] px-[29px] md:px-[12px] lg:px-[22px] 3xl:px-[36.6px]"
                  />
                </Link>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Custom dots */}
      <motion.div
        variants={moveUp(0.14)}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        className="flex items-center justify-center gap-3 mt-20"
      >
        {blogs.map((_, i) => (
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

export default LatestBlogSlider;
