"use client";

import Image from "next/image";
// import { investmentAppealData } from "../data";
import { SectionHeading } from "../../animations/SectionHeading";
import { SectionDescription } from "../../animations/SectionDescription";
import { useParallax } from "../../../hooks/useParallax";
import Reveal from "../../animations/RevealOneByOneAnimation";
import { moveUpV2, moveUp } from "../../motionVariants";
import { motion } from "framer-motion";
import Counter from "../../common/Counter";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import { useCallback, useState } from "react";
import type { Swiper as SwiperType } from "swiper";
import "swiper/css";

type InvestmentAppealData = {
  sectionTitle: string;

  sectionDescription: string;

  image: {
    src: string;
    mobileSrc: string;
    alt: string;
  };

  stats: {
    id: number;
    value: string;
    label: string;
  }[];
};


export default function InvestmentSection({data}:{data:InvestmentAppealData}) {
  const total = data.stats.length;
  const { ref, parallaxY } = useParallax(15);
  const [innerIndices, setInnerIndices] = useState<Set<number>>(new Set());
  const [swiper, setSwiper] = useState<SwiperType | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [slidesPerView, setSlidesPerView] = useState(2);
  const showPagination = total > slidesPerView;

  const computeInnerIndices = useCallback((swiper: SwiperType) => {
    const spv = Math.round(swiper.params.slidesPerView as number) || 1;
    const startReal = swiper.realIndex;

    const visible: number[] = [];
    for (let i = 0; i < spv; i++) {
      visible.push((startReal + i) % total);
    }

    // All except rightmost get a separator line
    setInnerIndices(new Set(visible.slice(0, -1)));
  }, []);

  return (
    <section data-header="dark" className="w-full bg-white">
      {/* Top white header */}
      <div className="container text-center pt-[70px] lg:pt-120 3xl:pt-160">
        <SectionHeading
          title={data.sectionTitle}
          className="uppercase mb-20"
        />
        <SectionDescription
          text={data.sectionDescription}
          className="max-w-[754px] mx-auto mb-50 text-foreground-light whitespace-pre-line"
        />
      </div>

      {/* Image section */}
      <div className="relative w-full h-[68vh] xl:h-[90vh] 3xl:h-[96.5vh]">
        {/* Full-width image */}
        <div ref={ref} className="relative w-full h-full overflow-hidden">
          <Image
            src={data.image.src}
            alt="bg-image-investment"
            fill
            className="object-cover hidden lg:block"
            priority
            style={{ transform: `translateY(${parallaxY}vh)` }}
          />

          <Image
            src={data.image.mobileSrc ? data.image.mobileSrc : data.image.src}
            alt="bg-image-investment"
            fill
            className="object-cover lg:hidden"
            priority
            style={{ transform: `translateY(${parallaxY}vh)` }}
          />

        </div>

        {/* Overlay gradient */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, rgba(0, 0, 0, 0) 47.08%, #000000 106.98%)",
          }}
        />

        {/* Stats — pinned to bottom */}
        <div className="absolute bottom-0 left-0 right-0 pb-[70px] lg:pb-60">
          <div>
            <Swiper
              modules={[Autoplay]}
              autoplay={{ delay: 3000, disableOnInteraction: false }}
              speed={700}
              loop={true}
              slidesPerView={2}
              onSwiper={(s) => {
                setSwiper(s);
                computeInnerIndices(s);
                setSlidesPerView(
                  Math.round(s.params.slidesPerView as number) || 1,
                );
              }}
              onSlideChange={(s) => {
                setActiveIndex(s.realIndex);
                computeInnerIndices(s);
              }}
              onBreakpoint={(s) => {
                computeInnerIndices(s);
                setSlidesPerView(
                  Math.round(s.params.slidesPerView as number) || 1,
                );
              }}
              breakpoints={{
                768: { slidesPerView: 3 },
                1024: { slidesPerView: 4 },
                1560: { slidesPerView: 5 },
              }}
            >
              {data.stats.map((stat, index) => {
                const showLine = innerIndices.has(index);

                return (
                  <SwiperSlide key={index}>
                    <Reveal variants={moveUpV2}>
                      <div className="relative flex flex-col items-center justify-center py-40">
                        {/* Value */}
                        <motion.span
                          variants={moveUp(0.1)}
                          initial="hidden"
                          whileInView="show"
                          viewport={{ once: true }}
                          className="text-heading text-white mb-[10px]"
                        >
                          <Counter value={stat.value} duration={2000} />
                        </motion.span>

                        {/* Label */}
                        <motion.span
                          variants={moveUp(0.15)}
                          initial="hidden"
                          whileInView="show"
                          viewport={{ once: true }}
                          className="text-description text-white py-1 sm:py-0"
                        >
                          {stat.label}
                        </motion.span>

                        {/* Vertical separator — only between visible slides, never at right edge */}
                        <div
                          className="absolute top-0 right-0 w-px h-full"
                          style={{
                            borderRight: "1px solid",
                            borderImageSource:
                              "linear-gradient(180deg, rgba(255, 255, 255, 0) -6.9%, #FFFFFF 46.55%, rgba(255, 255, 255, 0) 100%)",
                            borderImageSlice: 1,
                            opacity: showLine ? 1 : 0,
                            transition: "opacity 0.4s ease",
                          }}
                        />
                      </div>
                    </Reveal>
                  </SwiperSlide>
                );
              })}
            </Swiper>
            {showPagination && (
              <div className="flex justify-center mt-[30px] md:mt-50 gap-[10px]">
                {data.stats.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => swiper?.slideToLoop(i)}
                    className={`w-[10px] h-[10px] rounded-full border border-white transition-all duration-300 cursor-pointer ${
                      i === activeIndex ? "bg-white" : "bg-transparent"
                    }`}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
