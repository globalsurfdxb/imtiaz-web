"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
// import { commitmentSection, commitmentSlides } from "../data";
import type { Swiper as SwiperType } from "swiper";
import "swiper/css";
import { SectionHeading } from "../../animations/SectionHeading";
import { SectionDescription } from "../../animations/SectionDescription";

type IconSliderData = {
 title:string;
 description:string;
 items:{
  icon:string;
  title:string;
 }[]
}

export default function IconSlider({data}:{data:IconSliderData}) {
  const swiperRef = useRef<SwiperType | null>(null);
  const showPagination = data.items.length > 1;

  const [activeSnap, setActiveSnap] = useState(0);
  const [snapCount, setSnapCount] = useState(1);

  return (
    <section data-header="dark" className="pb-120 2xl:pb-130 overflow-hidden">
      <div className="container relative pt-120 2xl:pt-130">
        <div
          className="absolute top-0 left-0 w-full h-px"
          style={{
            background:
              "linear-gradient(90deg, rgba(23, 23, 23, 0) 0%, #171717 50%, rgba(23, 23, 23, 0) 100%)",
          }}
        />
        {/* Header */}
        <div className="w-full flex-col gap-20 items-center justify-center text-center mb-[30px] md:mb-50">
          <SectionHeading
            title={data.title}
            className="mb-20 text-foreground max-w-[45ch] mx-auto"
          />
          <SectionDescription
            text={data.description}
            className="text-description max-w-[105ch] mx-auto 2xl:whitespace-pre-line"
          />
        </div>
        {/* Slider */}
        <Swiper
          onSwiper={(swiper) => {
            swiperRef.current = swiper;
            setTimeout(() => {
              setSnapCount(swiper.snapGrid.length);
              setActiveSnap(swiper.snapIndex);
            }, 0);
          }}
          onBreakpoint={(swiper) => {
            setSnapCount(swiper.snapGrid.length);
            setActiveSnap(swiper.snapIndex);
          }}
          onSlideChange={(swiper) => {
            setActiveSnap(swiper.snapIndex);
          }}
          onReachEnd={(swiper) => {
            setActiveSnap(swiper.snapGrid.length - 1);
          }}
          modules={[Autoplay]}
          slidesPerView={1.2}
          spaceBetween={0}
          breakpoints={{
            480: { slidesPerView: 1.8 },
            640: { slidesPerView: 2.2 },
            768: { slidesPerView: 2.55 },
            1024: { slidesPerView: 3.3 },
            1280: { slidesPerView: 3.38 },
          }}
          className="w-full !overflow-visible"
        >
          {data.items.map((slide, index) => (
            <SwiperSlide key={index}>
              <div className="px-50 py-20 flex flex-col items-center">
                {/* Icon */}
                <div className="w-[50px] h-[50px] md:w-[60px] md:h-[60px] lg:w-[80px] lg:h-[80px] rounded-full flex items-center justify-center bg-primary/5 mb-20">
                  {slide.icon && (
                    <Image
                      src={slide.icon}
                      alt={slide.title}
                      width={32}
                      height={32}
                    />
                  )}
                </div>
                {/* Gradient divider */}
                <div
                  className="w-full h-px mb-20"
                  style={{
                    border: "none",
                    height: "1px",
                    background:
                      "linear-gradient(90deg, rgba(73, 9, 5, 0) 0%, #490905 50%, rgba(73, 9, 5, 0) 100%)",
                  }}
                />
                {/* Title */}
                <p className="text-foreground font-[optima] text-25 leading-[1.4] uppercase text-center">
                  {slide.title}
                </p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
        {/* Pagination */}
        {showPagination && (
          <div className="flex justify-center mt-[20px] gap-[10px]">
            {Array.from({ length: snapCount }).map((_, i) => (
              <button
                key={i}
                onClick={() => swiperRef.current?.slideToLoop(i)}
                className={`w-[10px] h-[10px] rounded-full border border-primary transition-all duration-300 cursor-pointer ${
                  i === activeSnap ? "bg-primary" : "bg-white"
                }`}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
