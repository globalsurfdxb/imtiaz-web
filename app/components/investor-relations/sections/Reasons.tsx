"use client";

import Image from "next/image";
// import { investReasonsData } from "../data";
import { SectionHeading } from "../../animations/SectionHeading";
import { SectionDescription } from "../../animations/SectionDescription";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import { useRef, useLayoutEffect, useState, useCallback } from "react";
import type { Swiper as SwiperType } from "swiper";
import "swiper/css";
import Reveal from "../../animations/RevealOneByOneAnimation";
import { moveUp, moveUpV2 } from "../../motionVariants";
import { motion } from "framer-motion";

type InvestReasonsData = {
  sectionTitle: string;

  sectionDescription: string;

  reasons: {
    id: number;
    icon: string;
    title: string;
    description: string;
  }[];
};

const LINE_GRADIENT_H =
  "linear-gradient(90deg, rgba(73,9,5,0) 0%, #490905 50%, rgba(73,9,5,0) 100%)";
const LINE_GRADIENT_V =
  "linear-gradient(180deg, rgba(73,9,5,0) 0%, #490905 50%, rgba(73,9,5,0) 100%)";

export default function Reasons({data}:{data:InvestReasonsData}) {
  const { sectionTitle, sectionDescription, reasons } = data;
  const [activeIndex, setActiveIndex] = useState(0);
  const [dotCount, setDotCount] = useState(0);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const swiperRef = useRef<SwiperType | null>(null);

  const slides: (typeof reasons)[] = [];
  for (let i = 0; i < reasons.length; i += 2) {
    slides.push(reasons.slice(i, i + 2));
  }
  const total = slides.length; // e.g. 4

  // innerSlideIndices: set of original slide indices (0..total-1) that should
  // show a vertical line on their right — i.e. all visible except the rightmost.
  const [innerSlideIndices, setInnerSlideIndices] = useState<Set<number>>(
    new Set(),
  );

  const computeInnerIndices = useCallback(
    (swiper: SwiperType) => {
      const spv = Math.round(swiper.params.slidesPerView as number) || 1;
      // activeIndex is the real DOM index (includes clones in loop mode)
      // realIndex maps it back to original 0..total-1
      const startReal = swiper.realIndex; // 0-based original index of leftmost visible slide

      // Build list of original indices currently visible, left to right
      const visible: number[] = [];
      for (let i = 0; i < spv; i++) {
        visible.push((startReal + i) % total);
      }

      // All except the last (rightmost) get a line
      const inner = new Set(visible.slice(0, -1));
      setInnerSlideIndices(inner);
    },
    [total],
  );

  // Equalize all card heights across all slides
  useLayoutEffect(() => {
    const measure = () => {
      cardRefs.current.forEach((el) => {
        if (el) el.style.height = "auto";
      });
      const maxH = Math.max(
        0,
        ...cardRefs.current.map(
          (el) => el?.getBoundingClientRect().height ?? 0,
        ),
      );
      if (maxH > 0) {
        cardRefs.current.forEach((el) => {
          if (el) el.style.height = `${maxH}px`;
        });
      }
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  return (
    <section data-header="dark" className="w-full bg-gray">
      <div className="container py-[70px] lg:py-120 3xl:py-130">
        <div className="text-center mb-[40px] lg:mb-60 3xl:mb-[66px]">
          <SectionHeading title={sectionTitle} className="uppercase mb-[20px] lg:mb-20" />
          <SectionDescription
            text={sectionDescription}
            className="max-w-[750px] mx-auto text-foreground-light whitespace-pre-line"
          />
        </div>

        <Swiper
          modules={[Autoplay]}
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          speed={700}
          // loop={true}
          watchSlidesProgress={true}
          slidesPerView={1}
          onSwiper={(s) => {
            swiperRef.current = s;
            computeInnerIndices(s);
            setActiveIndex(s.realIndex);
            setDotCount(s.snapGrid.length);
          }}
          onSlideChange={(s) => {
            computeInnerIndices(s);
            setActiveIndex(s.realIndex);
          }}
          onReachEnd={(s) => setActiveIndex(s.snapGrid.length - 1)}
          onBreakpoint={(s) => {
            computeInnerIndices(s);
            setDotCount(s.snapGrid.length);
          }}
          onResize={(s) => setDotCount(s.snapGrid.length)}
          breakpoints={{
            728: { slidesPerView: 2 },
            1280: { slidesPerView: 3 },
            1540: { slidesPerView: 4 },
          }}
        >
          {slides.map((pair, slideIndex) => (
            <SwiperSlide key={slideIndex}>
              <Reveal variants={moveUpV2} delayRange={slideIndex * 0.12}>
                <div className="relative flex flex-col">
                  {pair.map((reason, cardIndex) => {
                    const reasonIndex = slideIndex * 2 + cardIndex;
                    const refIndex = slideIndex * 2 + cardIndex;
                    const isLastCard = cardIndex === pair.length - 1;
                    const showLine = innerSlideIndices.has(slideIndex);

                    return (
                      <div
                        key={reason.id}
                        ref={(el) => {
                          cardRefs.current[refIndex] = el;
                        }}
                        className="relative flex flex-col"
                      >
                        <div className="flex flex-col items-center justify-center flex-1 px-50 py-[20px] md:py-40 3xl:py-[46px] overflow-hidden">
                          <div
                            className="flex items-center justify-center mb-[10px] md:mb-20
                                     w-[64px] h-[64px] xl:w-[72px] xl:h-[72px] 3xl:w-[80px] 3xl:h-[80px]
                                     rounded-full bg-[#4909050D] backdrop-blur-[30px]"
                          >
                            <Image
                              src={reason.icon}
                              alt={reason.title}
                              width={50}
                              height={50}
                              className={`object-contain ${
                                reasonIndex === 0 ? "h-[22px]" : "h-8"
                              } w-auto`}
                            />
                          </div>
                          <motion.h3
                            variants={moveUp(0.1)}
                            initial="hidden"
                            whileInView="show"
                            viewport={{ once: true }}
                            className="font-[optima] uppercase text-25 leading-[1.4] mb-[10px] md:mb-20 tracking-[2%] text-foreground text-center"
                          >
                            {reason.title}
                          </motion.h3>
                          <motion.p
                            variants={moveUp(0.15)}
                            initial="hidden"
                            whileInView="show"
                            viewport={{ once: true }}
                            className="text-description max-w-[335px] text-center text-foreground-light"
                          >
                            {reason.description}
                          </motion.p>
                        </div>

                        {/* Horizontal separator between stacked cards */}
                        {!isLastCard && (
                          <div
                            className="absolute bottom-0 left-1/2 -translate-x-1/2 h-[1px] w-[87%]"
                            style={{ background: LINE_GRADIENT_H }}
                          />
                        )}

                        {/* Vertical line — only on inner visible slides, never on rightmost */}
                        <div
                          className="absolute top-[6.5%] right-0 w-[1px] hidden md:block"
                          style={{
                            height: "87%",
                            background: LINE_GRADIENT_V,
                            opacity: showLine ? 1 : 0,
                            transition: "opacity 0.4s ease",
                          }}
                        />
                      </div>
                    );
                  })}
                </div>
              </Reveal>
            </SwiperSlide>
          ))}
        </Swiper>
        {/* Pagination (only below 1540px) */}
        <div className="flex justify-center mt-[40px] md:mt-50 gap-[10px] min-[1540px]:hidden">
          {Array.from({ length: dotCount }, (_, i) => (
            <button
              key={i}
              onClick={() => swiperRef.current?.slideToLoop(i)}
              className={`w-[10px] h-[10px] rounded-full border border-primary transition-all duration-300 cursor-pointer ${
                i === activeIndex ? "bg-primary" : "bg-white"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
