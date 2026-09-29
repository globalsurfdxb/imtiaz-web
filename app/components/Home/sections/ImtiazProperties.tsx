"use client";

import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import Image from "next/image";
import type { Swiper as SwiperType } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { properties } from "../data";
import { motion, AnimatePresence } from "framer-motion";

const ImtiazProperties = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [mainSwiper, setMainSwiper] = useState<SwiperType | null>(null);

  return (
    <section className="py-[75px]">
      <div>
        <h1 className="text-center font-[optima] text-[45px] font-[400] text-primary uppercase leading-[110%] mb-[64px]">
          IMTIAZ PROPERTIES
        </h1>
      </div>
      <div className="relative w-full h-screen overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <AnimatePresence initial={false} mode="sync">
            <motion.div
              key={activeIndex}
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{
                duration: 0.8,
                ease: [0.45, 0, 0.55, 1],
              }}
              className="absolute inset-0 will-change-transform z-0"
            >
              <Image
                src={properties[activeIndex].image}
                alt={properties[activeIndex].name}
                fill
                className="object-cover"
                priority
              />
              <div
                className="absolute inset-0"
                style={{
                  background: `linear-gradient(271.91deg, rgba(0, 0, 0, 0) 56.1%, rgba(0, 0, 0, 0.7) 97.75%),
                       linear-gradient(178.27deg, rgba(0, 0, 0, 0) 52.23%, #000000 107.15%)`,
                }}
              />
            </motion.div>
          </AnimatePresence>

          {/* Keep previous image underneath to prevent flash */}
          {/* <div className="absolute inset-0 -z-10">
            <Image
              src={
                properties[
                  activeIndex === 0 ? properties.length - 1 : activeIndex - 1
                ].image
              }
              alt="previous"
              fill
              className="object-cover"
              priority
            />
          </div> */}
        </div>

        {/* Content */}
        <div className="relative z-10 h-full flex flex-col justify-end">
          {/* Active Property Info */}
          <div className="mb-5 flex justify-between items-end container">
            <div className="flex flex-col">
              <h2 className="font-[avenir] text-[50px] font-[400] text-white uppercase leading-[100%] mb-6 md:mb-20">
                {properties[activeIndex].name}
              </h2>
              <p className="font-[avenir] text-[24px] font-[350] text-white/80 leading-[1] ">
                {properties[activeIndex].location}
              </p>
            </div>
            <div className="flex justify-center w-fit h-fit">
              <button className="p-[15px] border border-white text-white cursor-pointer hover:bg-white hover:text-[#7C2E2E] text-[14px] font-[avenir] uppercase tracking-wider rounded-full transition-all duration-300">
                VIEW ALL PROPERTIES
              </button>
            </div>
          </div>

          {/* Thumbnails Slider */}
          <div className="relative max-w-screen w-full bg-white/24 backdrop-blur-[33px] py-[20px] ">
            <div className="container">
              <Swiper
                modules={[Navigation, Pagination, Autoplay]}
                onSwiper={setMainSwiper}
                onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
                navigation={{
                  nextEl: ".properties-next",
                  prevEl: ".properties-prev",
                }}
                pagination={{
                  el: ".properties-pagination ",
                  clickable: true,
                }}
                // autoplay={{
                //   delay: 2000,
                //   disableOnInteraction: false,
                // }}
                loop
                slidesPerView={1.5}
                spaceBetween={56}
                centeredSlides={false}
                breakpoints={{
                  640: {
                    slidesPerView: 2.5,
                    spaceBetween: 56,
                  },
                  1024: {
                    slidesPerView: 4,
                    spaceBetween: 56,
                  },
                  1280: {
                    slidesPerView: 5,
                    spaceBetween: 56,
                  },
                }}
                className="properties-swiper "
              >
                {properties.map((property, index) => (
                  <SwiperSlide key={property.id}>
                    <div
                      className={`relative w-full cursor-pointer h-[171px] rounded-[7px] overflow-hidden group border-2 ${
                        index === activeIndex
                          ? "border-white"
                          : "border-transparent"
                      }`}
                      onClick={() => {
                        if (mainSwiper) {
                          mainSwiper.slideToLoop(index);
                        }
                      }}
                    >
                      <Image
                        src={property.thumbnail}
                        alt={property.name}
                        width={311}
                        height={171}
                        className="object-cover w-full h-full group-hover:scale-110 transition-all duration-500"
                      />
                      <div
                        className="absolute inset-0"
                        style={
                          index === activeIndex
                            ? {
                                background: `linear-gradient(180deg, rgba(0, 0, 0, 0) 47.37%, #000000 126.02%),
linear-gradient(344.37deg, rgba(0, 0, 0, 0) 69.75%, #000000 115.36%)

                          `,
                              }
                            : {
                                background: `
            linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, #000000 100%),
            linear-gradient(0deg, rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2))
          `,
                              }
                        }
                      />

                      <div className="absolute top-5 left-5">
                        <span className="font-[avenir] text-[20px] font-[350] text-white leading-[110%] tracking-wider">
                          {property.number}
                        </span>
                      </div>

                      <div className="absolute top-5 right-5 opacity-0 group-hover:opacity-100 transition-all duration-300">
                        <div className="w-[40px] h-[40px] bg-white rounded-full flex items-center justify-center">
                          <Image
                            src="/icons/arrow-right-top-primary.svg"
                            alt="arrow-up-right"
                            width={13}
                            height={15}
                          />
                        </div>
                      </div>

                      <div className="absolute bottom-5 left-5 right-5">
                        <h3 className="font-[avenir] text-[20px] font-[350] text-white uppercase leading-[110%]">
                          {property.name}
                        </h3>
                      </div>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
            <div className="properties-pagination mt-[20px]"></div>
          </div>
        </div>

        {/* Navigation Buttons - On main background */}
        <div className="container absolute top-[337px] inset-0 flex justify-between w-full">
          <button className="properties-prev z-20 w-[50px] h-[50px] md:w-[70px] cursor-pointer md:h-[70px] group bg-transparent border border-white hover:bg-white text-white hover:text-[#7C2E2E] rounded-full flex items-center justify-center transition-all duration-300">
            <Image
              src="/images/icons/arrow-right.svg"
              alt="arrow-right"
              width={28}
              height={28}
              className="w-[28px] h-[28px] rotate-180  invert brightness-1 group-hover:brightness-[1] group-hover:invert-[0] "
            />
          </button>
          <button className="properties-next z-20 w-[50px] h-[50px] md:w-[70px] cursor-pointer md:h-[70px] group bg-transparent border border-white hover:bg-white text-white hover:text-[#7C2E2E] rounded-full flex items-center justify-center transition-all duration-300">
            <Image
              src="/images/icons/arrow-right.svg"
              alt="arrow-right"
              width={28}
              height={28}
              className="w-[28px] h-[28px] invert brightness-0 group-hover:brightness-[1] group-hover:invert-[0] "
            />
          </button>
        </div>
      </div>
    </section>
  );
};

export default ImtiazProperties;
