"use client";

import { useRef, useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperType } from "swiper";
import Image from "next/image";
// import { coreExpertiseData } from "../data";
import SliderArrowButton from "../../common/SliderNavigationButton";

import "swiper/css";
import { SectionHeading } from "../../animations/SectionHeading";
import { Autoplay } from "swiper/modules";

export interface ExpertiseItem {
  title: string;
  description: string;
  image: string;
  mobileImage: string;
}

export interface ExpertiseSection {
  title: string;
  slides: ExpertiseItem[];
}

export default function ExpertiseSlider({ data }: { data: ExpertiseSection }) {
  const swiperRef = useRef<SwiperType | null>(null);
  const [activeIndex, setActiveIndex] = useState(-1);
  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(false);

  useEffect(() => {
    if (window.innerWidth < 1280) setActiveIndex(0);
  }, []);

  return (
    <section
      data-header="dark"
      className="bg-gray py-120 2xl:py-130 overflow-hidden"
    >
      <div className="container">
        <div className="w-full flex items-center justify-center text-center">
          <SectionHeading
            title={data.title}
            className="mb-[30px] md:mb-50 text-foreground max-w-[35ch]"
          />
        </div>

        <div className="w-full px-[10px]">
          <Swiper
            modules={[Autoplay]}
            onSwiper={(swiper) => {
              swiperRef.current = swiper;
              setIsBeginning(swiper.isBeginning);
              setIsEnd(swiper.isEnd);
            }}
            onSlideChange={(swiper) => {
              setIsBeginning(swiper.isBeginning);
              setIsEnd(swiper.isEnd);
            }}
            onActiveIndexChange={(swiper) => {
              setActiveIndex(window.innerWidth >= 1280 ? -1 : swiper.realIndex);
            }}
            autoplay={{
              delay: 3500,
              disableOnInteraction: false,
              pauseOnMouseEnter: false,
            }}
            initialSlide={0}
            speed={700}
            // loop
            centeredSlides={false}
            spaceBetween={25}
            breakpoints={{
              0: { slidesPerView: 1, spaceBetween: 16 },
              480: { slidesPerView: 1.6, spaceBetween: 20 },
              640: { slidesPerView: 1.8, spaceBetween: 20 },
              768: { slidesPerView: 2.2, spaceBetween: 25 },
              1024: { slidesPerView: 2.8, spaceBetween: 25 },
              1280: { slidesPerView: 3, spaceBetween: 25 },
              1400: { slidesPerView: 3.2, spaceBetween: 25 },
              1580: { slidesPerView: 3.45, spaceBetween: 25 },
            }}
            className="!overflow-visible"
          >
            {data.slides.map((slide, i) => {
              const isActive = i === activeIndex;
              return (
                <SwiperSlide
                  key={i}
                  onClick={() => swiperRef.current?.slideTo(i)}
                >
                  <div className="group relative aspect-[3/4] 3xl:aspect-auto 3xl:h-[545px] overflow-hidden cursor-pointer">
                    <Image
                      src={slide.image}
                      alt={slide.title}
                      fill
                      className="hidden lg:block object-cover transition-transform duration-700 group-hover:scale-105"
                    />

                    <Image
                      src={slide.mobileImage ? slide.mobileImage : slide.image}
                      alt={slide.title}
                      fill
                      className="lg:hidden object-cover transition-transform duration-700 group-hover:scale-105"
                    />

                    <div
                      className={`absolute inset-0 transition-opacity duration-500 ${isActive ? "opacity-0" : "opacity-100"}`}
                      style={{
                        background:
                          "linear-gradient(180deg, rgba(0,0,0,0) -0.01%, rgba(0,0,0,0.8) 100%)",
                      }}
                    />
                    <div
                      className={`absolute inset-0 transition-opacity duration-500 ${isActive ? "opacity-80" : "opacity-0 group-hover:opacity-80"}`}
                      style={{
                        background: "linear-gradient(0deg, #000000, #000000)",
                      }}
                    />
                    <div className="absolute inset-0 flex flex-col justify-end p-[30px] text-white">
                      <p className="text-[18px] md:text-25 leading-[1.5] md:leading-[1.4] mb-0 tracking-[-0.02em]">
                        {slide.title}
                      </p>
                      <div
                        className={`grid transition-all duration-500 ease-out ${
                          isActive
                            ? "grid-rows-[1fr] opacity-100 mt-20"
                            : "grid-rows-[0fr] opacity-0 group-hover:grid-rows-[1fr] group-hover:opacity-100 group-hover:mt-20"
                        }`}
                      >
                        <div className="overflow-hidden">
                          <div
                            className="w-full mb-20"
                            style={{
                              height: "1px",
                              background:
                                "linear-gradient(90deg, #FFFFFF 49.22%, rgba(255, 255, 255, 0) 100%)",
                            }}
                          />
                          <p className="text-description">
                            {slide.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              );
            })}
          </Swiper>
        </div>

        <div className="flex items-center justify-center gap-3 mt-[30px] md:mt-50">
          <SliderArrowButton
            direction="prev"
            variant="dark"
            disabled={isBeginning}
            onClick={() => swiperRef.current?.slidePrev()}
          />
          <SliderArrowButton
            direction="next"
            variant="dark"
            disabled={isEnd}
            onClick={() => swiperRef.current?.slideNext()}
          />
        </div>
      </div>
    </section>
  );
}
