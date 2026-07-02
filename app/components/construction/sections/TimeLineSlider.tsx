"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import type { Swiper as SwiperType } from "swiper";
import { Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { motion } from "framer-motion";

import "swiper/css";

import SliderArrowButton from "../../common/SliderNavigationButton";
// import { timelineSectionData } from "../data";
import { SectionHeading } from "../../animations/SectionHeading";
import { SectionDescription } from "../../animations/SectionDescription";
import { moveLeft, moveRight } from "../../motionVariants";

type TimeLineSlider = {
  title:string;
  description:string;
  slides:{
    year:string;
    title:string;
    image:string;
    mobileImage?:string;
  }[]
}

export default function TimelineSlider({data}:{data:TimeLineSlider}) {
  const { title, description, slides } = data;

  const [activeIndex, setActiveIndex] = useState(0);
  const mainSwiperRef = useRef<SwiperType | null>(null);
  const yearSwiperRef = useRef<SwiperType | null>(null);
  const isSyncing = useRef(false);

  const syncTo = (source: "main" | "year", realIndex: number) => {
    // Always update state — never block this
    setActiveIndex(realIndex);

    // Only block the cross-swiper call, not the state update
    if (isSyncing.current) return;
    isSyncing.current = true;

    if (source === "main") {
      yearSwiperRef.current?.slideToLoop(realIndex, 600);
    } else {
      mainSwiperRef.current?.slideToLoop(realIndex, 600);
    }

    setTimeout(() => {
      isSyncing.current = false;
    }, 650);
  };

  return (
    <section data-header="dark" className="w-full overflow-hidden bg-white py-120 2xl:pb-130">
      <div className="w-full flex-col gap-20 items-center justify-center text-center mb-[30px] md:mb-50 container">
        <SectionHeading
          title={title}
          className="mb-20 text-foreground max-w-[30ch] mx-auto"
        />
        <SectionDescription
          text={description}
          className="text-description max-w-[115ch] mx-auto sm:whitespace-pre-line"
        />

        <div className="lg:hidden flex gap-[10px] my-[30px] items-center justify-between">
          <motion.div
            variants={moveRight(0.2)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="pointer-events-auto"
          >
            <SliderArrowButton
              direction="prev"
              variant="dark"
              onClick={() => mainSwiperRef.current?.slidePrev()}
            />
          </motion.div>
          <motion.div
            variants={moveLeft(0.2)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="pointer-events-auto"
          >
            <SliderArrowButton
              direction="next"
              variant="dark"
              onClick={() => mainSwiperRef.current?.slideNext()}
            />
          </motion.div>
        </div>
      </div>

      {/* Image Slider */}
      <div className="relative h-[300px] md:h-[400px] 3xl:h-[482px]">
        <div
          className="absolute z-10 h-full xl:w-[13%] 3xl:w-[325px] top-0 bottom-0 left-0 opacity-50"
          style={{
            background:
              "linear-gradient(90deg, #FFFFFF 0.41%, rgba(255, 255, 255, 0) 78.67%)",
          }}
        />
        <div
          className="absolute z-10 h-full xl:w-[13%] 3xl:w-[325px] top-0 bottom-0 right-0 opacity-50"
          style={{
            background:
              "linear-gradient(269.52deg, #FFFFFF 0.41%, rgba(255, 255, 255, 0) 78.67%)",
          }}
        />
        <Swiper
          grabCursor
          modules={[Navigation]}
          centeredSlides
          loop
          spaceBetween={15}
          breakpoints={{
            768: { spaceBetween: 20 },
            1024: { spaceBetween: 30 },
          }}
          speed={600}
          onSwiper={(swiper) => {
            mainSwiperRef.current = swiper;
          }}
          onRealIndexChange={(swiper) => {
            syncTo("main", swiper.realIndex);
          }}
          slidesPerView="auto"
          className="!overflow-visible h-full"
        >
          {[...slides, ...slides, ...slides].map((slide, index) => {
            const isActive = activeIndex === index;

            return (
              <SwiperSlide
                key={`${slide.year}-${index}`}
                className="!w-[300px] sm:!w-[420px] md:!w-[560px] lg:!w-[700px] 2xl:!w-[750px] 3xl:!w-[896px] h-[300px] md:h-[400px] 3xl:!h-[482px] !flex !items-center"
              >
                <div
                  className={`relative w-full overflow-hidden transition-all duration-500 ${isActive ? "h-[300px] md:h-[400px] 3xl:h-[482px]" : "h-[220px] md:h-[270px] 3xl:h-[319px]"}`}
                  style={{ opacity: isActive ? 1 : 0.3 }}
                >
                  <Image
                    src={slide.image}
                    alt={slide.title}
                    fill
                    className="object-cover hidden lg:block"
                  />

                  <Image
                    src={slide.mobileImage ? slide.mobileImage : slide.image}
                    alt={slide.title}
                    fill
                    className="object-cover lg:hidden"
                  />
                  <div
                    className="absolute inset-0 transition-opacity duration-700 ease-in-out pointer-events-none"
                    style={{
                      opacity: isActive ? 1 : 0,
                      background:
                        "linear-gradient(180deg, rgba(0,0,0,0) 28.16%, #000000 115.22%)",
                    }}
                  />
                  <div
                    className="absolute right-0 bottom-0 left-0 flex justify-center p-40 transition-[opacity,transform] duration-700 ease-in-out pointer-events-none"
                    style={{
                      opacity: isActive ? 1 : 0,
                      transform: isActive
                        ? "translateY(0)"
                        : "translateY(120px)",
                    }}
                  >
                    <span className="text-white font-[optima] text-25 leading-[1.4] uppercase text-center tracking-[0.2em]">
                      {slide.title}
                    </span>
                  </div>
                </div>
              </SwiperSlide>
            );
          })}
        </Swiper>

        <div className="hidden lg:flex pointer-events-none absolute inset-0 z-20 items-center justify-between container">
          <motion.div
            variants={moveRight(0.2)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="pointer-events-auto"
          >
            <SliderArrowButton
              direction="prev"
              variant="dark"
              onClick={() => mainSwiperRef.current?.slidePrev()}
            />
          </motion.div>
          <motion.div
            variants={moveLeft(0.2)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="pointer-events-auto"
          >
            <SliderArrowButton
              direction="next"
              variant="dark"
              onClick={() => mainSwiperRef.current?.slideNext()}
            />
          </motion.div>
        </div>
      </div>

      {/* Divider */}
      <div className="relative flex items-center justify-center mt-[32px] mb-50 container">
        <div
          className="w-full h-px"
          style={{
            borderTop: "1px solid",
            borderImageSource:
              "linear-gradient(90deg, rgba(73,9,5,0) 0%, #490905 50%, rgba(73,9,5,0) 100%)",
            borderImageSlice: 1,
          }}
        />
        <div className="absolute w-4 h-4 rounded-full bg-primary outline outline-primary outline-offset-4" />
      </div>

      {/* Year Slider */}
      <div className="relative container">
        <Swiper
          grabCursor
          modules={[Navigation]}
          centeredSlides
          loop
          speed={600}
          onSwiper={(swiper) => {
            yearSwiperRef.current = swiper;
          }}
          onRealIndexChange={(swiper) => {
            syncTo("year", swiper.realIndex);
          }}
          slidesPerView="auto"
          className="!overflow-visible"
        >
          {[...slides, ...slides, ...slides].map((slide, index) => {
            const isActive = activeIndex === index;

            return (
              <SwiperSlide
                key={`year-${slide.year}-${index}`}
                className="!w-[120px] sm:!w-[220px] lg:!w-[300px] 3xl:!w-[409px] cursor-pointer"
                onClick={() => {
                  setActiveIndex(index);
                  if (isSyncing.current) return;
                  isSyncing.current = true;
                  mainSwiperRef.current?.slideToLoop(index, 600);
                  yearSwiperRef.current?.slideToLoop(index, 600);
                  setTimeout(() => {
                    isSyncing.current = false;
                  }, 650);
                }}
              >
                <span
                  className={`block text-center font-normal transition-colors duration-300 text-heading ${isActive ? "text-primary" : "text-primary/30"}`}
                >
                  {slide.year}
                </span>
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
    </section>
  );
}
