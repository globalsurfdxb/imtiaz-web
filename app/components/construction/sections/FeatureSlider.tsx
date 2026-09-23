"use client";

import { useState, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import "swiper/css";

// ─── Types ───────────────────────────────────────────────────────────────────
interface Feature {
  key: string;
  value: string | number;
}

interface FeatureSliderProps {
  features: Feature[];
}

// ─── Gradient Separator ───────────────────────────────────────────────────────
const GradientSeparator = () => (
  <div
    className="self-stretch flex-shrink-0"
    style={{
      background:
        "linear-gradient(180deg, rgba(255,255,255,0) 0%, #FFFFFF 50%, rgba(255,255,255,0) 100%)",
      width: "1px",
      minHeight: "60px",
    }}
  />
);

const separatorStyle = {
  background:
    "linear-gradient(180deg, rgba(255,255,255,0) 0%, #FFFFFF 50%, rgba(255,255,255,0) 100%)",
  width: "1px",
};

// ─── Component ────────────────────────────────────────────────────────────────
const FeatureSlider = ({ features }: FeatureSliderProps) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [dotCount, setDotCount] = useState(features.length);
  const swiperRef = useRef<SwiperType | null>(null);

  const syncDotCount = (swiper: SwiperType) => {
    setDotCount(swiper.snapGrid.length || features.length);
  };

  return (
    <div className="overflow-hidden bg-white/10 backdrop-blur-[30px]">
      {/* ── Desktop (≥ lg): static row, exact same layout as before ── */}
      <div className="hidden lg:flex items-center justify-center">
        {features.map((feat, idx) => (
          <div
            key={idx}
            className="flex items-center py-30 3xl:py-[35px] gap-x-70"
          >
            <div className="flex flex-col items-center justify-center text-center pl-70">
              <span className="text-white text-heading mb-[10px]">
                {feat.key}
              </span>
              <span className="text-white text-description">{feat.value}</span>
            </div>
            {idx < features.length - 1 && <GradientSeparator />}
          </div>
        ))}
      </div>

      {/* ── Below lg: Swiper slider ── */}
      <div className="lg:hidden">
        <div className="relative" style={{ borderRight: "none" }}>
          <div
            className="hidden sm:block absolute right-0 top-0 bottom-0 z-10 pointer-events-none"
            style={separatorStyle}
          />

          <Swiper
            modules={[Autoplay]}
            slidesPerView={1}
            breakpoints={{
              640: { slidesPerView: 2 },
              800: { slidesPerView: 2.4 },
            }}
            autoplay={{ delay: 2500, disableOnInteraction: false }}
            centeredSlides={false}
            onSwiper={(swiper) => {
              swiperRef.current = swiper;
              syncDotCount(swiper);
            }}
            onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
            onBreakpoint={(swiper) => syncDotCount(swiper)}
            onResize={(swiper) => syncDotCount(swiper)}
            className="w-full"
          >
            {features.map((feat, idx) => (
              <SwiperSlide key={idx}>
                <div className="relative flex items-center justify-center py-[30px]">
                  {/* Left separator only — no right separator */}
                  <div
                    className="hidden sm:block absolute left-0 top-0 bottom-0"
                    style={separatorStyle}
                  />

                  {/* Feature content */}
                  <div className="flex flex-col items-center justify-center text-center px-8">
                    <span className="text-white text-heading mb-[10px]">
                      {feat.key}
                    </span>
                    <span className="text-white/70 text-description">
                      {feat.value}
                    </span>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {/* ── Pagination dots (below lg only) ── */}
        <div className="flex justify-center sm:pt-20 lg:pt-0 pb-[14px] gap-[10px]">
          {Array.from({ length: dotCount }, (_, i) => (
            <button
              key={i}
              onClick={() => swiperRef.current?.slideTo(i)}
              className={`w-[10px] h-[10px] rounded-full border border-white transition-all duration-300 cursor-pointer ${
                i === activeIndex ? "bg-white" : "bg-transparent"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default FeatureSlider;
