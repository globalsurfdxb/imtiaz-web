"use client";

import { useState } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import { coastalSlides } from "../data";
import type { Swiper as SwiperType } from "swiper";

const CoastalParadise = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [swiperInstance, setSwiperInstance] = useState<SwiperType | null>(null);

  return (
    <section className="w-full bg-white py-[75px]">
      <div className="container flex flex-col lg:flex-row gap-20 2xl:gap-[114px] items-stretch">
        {/* LEFT IMAGE SLIDER */}
        <div className="w-full lg:w-1/2 flex">
          <Swiper
            modules={[Autoplay]}
            autoplay={{ delay: 2500 }}
            loop
            onSwiper={setSwiperInstance}
            onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
            className="flex-1"
          >
            {coastalSlides.map((slide, idx) => (
              <SwiperSlide key={idx}>
                <div className="relative w-full h-[400px] lg:h-full 2xl:w-[909px] rounded-xl overflow-hidden">
                  <Image
                    src={slide.image}
                    alt={slide.title}
                    fill
                    className="object-cover"
                  />
                  <div
                    style={{
                      background:
                        "linear-gradient(180deg, rgba(0, 0, 0, 0) 75%, rgba(0, 0, 0, 0.75) 100%)",
                    }}
                    className="absolute inset-0"
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {/* RIGHT STATIC CONTENT */}
        <div className="w-full lg:w-1/2 flex flex-col justify-between">
          <div>
            <h2 className="text-primary text-[50px] font-[optima] font-[400] mb-[32px] uppercase leading-[1]">
              a coastal paradise
            </h2>
            <p className="text-black/80 font-[avenir] font-[300] text-[20px] mb-6 md:mb-20 max-w-[75ch] leading-[1.1]">
              Dubai Islands features 20 km of coastline to explore, offering a
              unique metropolitan lifestyle surrounded by nature. The
              fast-growing location is set to become the premier entertainment,
              dining and leisure destination.
            </p>
            <button className="border cursor-pointer leading-[1.444444444444444] border-primary text-primary p-[15px] rounded-[169px] text-[18px] font-[avenir] font-[400] hover:bg-primary hover:text-white transition w-fit">
              LEARN MORE
            </button>
          </div>

          {/* POINTS SECTION WITH MOVING INDICATOR */}
          <div className="mt-[74px] relative flex-1">
            {/* Background vertical line */}
            <div className="absolute left-0 top-0 h-full w-[1px] bg-black/35" />

            {/* Moving highlight bar */}
            <div
              className="absolute left-[-1px] w-[3px] bg-primary transition-all duration-700 ease-in-out"
              style={{
                top: `${activeIndex * (113 / coastalSlides.length - 1)}%`,
                height:
                  activeIndex === coastalSlides.length - 1 ? "105px" : "113px",
              }}
            />

            <ul className="space-y-[85px] pl-[41px] py-6">
              {coastalSlides.map((slide, i) => (
                <li
                  key={i}
                  className="flex items-center gap-[10px] cursor-pointer group"
                  onClick={() => swiperInstance?.slideToLoop(i)}
                >
                  <div className="w-[64px] h-[64px] rounded-full overflow-hidden bg-gray-100">
                    <Image
                      src={slide.thumb}
                      alt={slide.title}
                      width={64}
                      height={64}
                      className={`object-cover w-full h-full rounded-full transition-opacity duration-300 ${
                        i === activeIndex
                          ? "opacity-100"
                          : "opacity-60 group-hover:opacity-80"
                      }`}
                    />
                  </div>
                  <span
                    className={`text-[24px] font-[avenir] font-[400] uppercase text-black transition-opacity duration-300 ${
                      i === activeIndex
                        ? "opacity-100"
                        : "opacity-60 group-hover:opacity-80"
                    }`}
                  >
                    {slide.title}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CoastalParadise;
