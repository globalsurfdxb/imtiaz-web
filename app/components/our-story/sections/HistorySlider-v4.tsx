"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
// import { historyData } from "../data";
import Image from "next/image";
import { SectionHeading } from "../../animations/SectionHeading";
import { SectionDescription } from "../../animations/SectionDescription";
import SliderArrowButton from "../../common/SliderNavigationButton-v4";
import ContainerAnchor from "../../layout/ContainerAnchor";
import { useContainerInset } from "@/app/hooks/useContainerInset";
import { useParallax } from "@/app/hooks/useParallax";

/* ─────────────────────────── constants ────────────────────────── */

const AUTO_INTERVAL = 2500;

/* ──────────────────────────── types ───────────────────────────── */

interface CardData {
  id: string;
  year: number;
  title: string;
  description: string;
  image: string;
}

interface FormattedCard {
  id: string;
  year: number;
  title: string;
  description: string;
  image: string;
}

interface FormattedHistory {
  year: number;
  cards: FormattedCard[];
}

/* ═══════════════════════════════════════════════════════════════
   HistorySection
═══════════════════════════════════════════════════════════════ */

export default function HistorySection({
  title,
  description,
  history,
}: {
  title: string;
  description: string;
  history: FormattedHistory[];
}) {
  const historyData = history;
  const allCards: CardData[] = historyData.flatMap((y) => y.cards);
  const years = historyData.map((y) => y.year);

  const [activeCardIdx, setActiveCardIdx] = useState(0);

  const cardSwiperRef = useRef<SwiperType | null>(null);
  const yearSwiperRef = useRef<SwiperType | null>(null);

  const activeYear = allCards[activeCardIdx]?.year ?? years[0];
  const activeYearData = historyData.find((y) => y.year === activeYear)!;
  const activeYearIdx = years.indexOf(activeYear);

  const cardsInYear = activeYearData?.cards ?? [];
  const cardIdxInYear = cardsInYear.findIndex(
    (c) => c.id === allCards[activeCardIdx]?.id,
  );

  const progressPct =
    cardsInYear.length > 1
      ? (cardIdxInYear / (cardsInYear.length - 1)) * 100
      : 100;

  // When card changes → sync year swiper to matching year (no animation jump)
  useEffect(() => {
    const ys = yearSwiperRef.current;
    if (!ys) return;

    // When looping back to year index 0, snap the timeline to start instantly
    if (activeYearIdx === 0) {
      // Small delay so the dot re-render fires first
      setTimeout(() => {
        ys.translateTo(0, 0);
      }, 0);
    }
  }, [activeYearIdx]);

  const goToCard = useCallback((realIdx: number) => {
    const cs = cardSwiperRef.current;
    if (cs && cs.realIndex !== realIdx) {
      cs.slideToLoop(realIdx, 700);
    }
    setActiveCardIdx(realIdx);
  }, []);

  const goToYear = useCallback(
    (year: number) => {
      const firstIdx = allCards.findIndex((c) => c.year === year);
      if (firstIdx !== -1) goToCard(firstIdx);
    },
    [allCards, goToCard],
  );

  return (
    <section
      data-header="dark"
      className="w-full bg-white py-[50px] md:py-120 3xl:pt-130 3xl:pb-180 overflow-hidden"
    >
      {/* ── Header ── */}
      <div className="container text-center mb-[90px] max-md:mb-0 md:mb-150 lg:mb-50">
        <div className="content-spacing-mobile">
          <SectionHeading title={title} className="mb-5 uppercase" />
          <SectionDescription
            text={description}
            className="max-w-[870px] text-foreground-light mx-auto text-center"
          />
        </div>
      </div>

      {/* ── Cards Slider ── */}
      <CardsSlider
        allCards={allCards}
        activeCardIdx={activeCardIdx}
        swiperRef={cardSwiperRef}
        onCardChange={(realIdx) => setActiveCardIdx(realIdx)}
      />

      {/* ── Year Timeline ── */}
      <YearTimeline
        years={years}
        activeYearIdx={activeYearIdx}
        activeCardIdx={activeCardIdx}
        progressPct={progressPct}
        swiperRef={yearSwiperRef}
        onYearClick={goToYear}
      />
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════
   CardsSlider
═══════════════════════════════════════════════════════════════ */

function CardsSlider({
  allCards,
  activeCardIdx,
  swiperRef,
  onCardChange,
}: {
  allCards: CardData[];
  activeCardIdx: number;
  swiperRef: React.MutableRefObject<SwiperType | null>;
  onCardChange: (realIdx: number) => void;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const paddingInset = useContainerInset(containerRef);
  return (
    <div className="relative">
      <ContainerAnchor ref={containerRef} />
      <div
        style={{
          background:
            "linear-gradient(270deg, rgba(235, 235, 236, 0) 0%, #EBEBEC 100%)",
        }}
        className="hidden lg:block absolute w-200 left-0 top-0 h-full z-10"
      />
      <div
        style={{
          background:
            "linear-gradient(90deg, rgba(235, 235, 236, 0) 0%, #EBEBEC 100%)",
        }}
        className="hidden lg:block absolute w-200 right-0 top-0 h-full z-10"
      />
      <div className="max-md:static max-md:mt-[20px] md:absolute md:-top-[70px] lg:top-1/2 lg:-translate-y-1/2 z-30 flex gap-3 min-w-full justify-center lg:justify-between">
        {/* ── Prev btn ── */}
        <div style={{ paddingLeft: paddingInset }} className="max-lg:!pl-0">
          <SliderArrowButton
            direction="prev"
            variant="dark"
            onClick={() => swiperRef.current?.slidePrev()}
          />
        </div>
        {/* ── Next btn ── */}
        <div style={{ paddingRight: paddingInset }} className="max-lg:!pr-0">
          <SliderArrowButton
            direction="next"
            variant="dark"
            onClick={() => swiperRef.current?.slideNext()}
          />
        </div>
      </div>
      <div className="relative w-full max-md:mt-[20px]">
        <Swiper
          modules={[Navigation, Autoplay]}
          loop={true}
          centeredSlides={true}
          autoplay={{
            delay: AUTO_INTERVAL,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}
          slidesPerView={1.1}
          breakpoints={{
            480: { slidesPerView: 1.2 },
            640: { slidesPerView: 1.5 },
            768: { slidesPerView: 1.8 },
            1024: { slidesPerView: 1.4 },
            1280: { slidesPerView: 1.6, spaceBetween: 30 },
            1440: { slidesPerView: 1.82, spaceBetween: 40 },
            1600: { slidesPerView: 2.19, spaceBetween: 50 },
          }}
          spaceBetween={20}
          speed={1000}
          grabCursor={true}
          onSwiper={(swiper) => {
            swiperRef.current = swiper;
          }}
          onSlideChange={(swiper) => onCardChange(swiper.realIndex)}
          className="w-full !overflow-visible [&_.swiper-wrapper]:!items-stretch [&_.swiper-slide]:!h-auto"
        >
          {allCards.map((card, idx) => (
            <SwiperSlide key={card.id} className="!h-full">
              <HistoryCard card={card} isActive={idx === activeCardIdx} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   HistoryCard
═══════════════════════════════════════════════════════════════ */

function HistoryCard({
  card,
  isActive,
}: {
  card: CardData;
  isActive: boolean;
}) {
  const { ref, parallaxY } = useParallax(15);
  return (
    <div className="flex flex-col lg:flex-row items-stretch rounded-[10px] overflow-hidden lg:h-[371px] h-full">
      {/* Image */}
      <div
        ref={ref}
        className="flex-shrink-0 w-full lg:w-[51.84%] h-[211px] sm:h-[250px] md:h-[300px] lg:h-full overflow-hidden"
      >
        <Image
          width={800}
          height={800}
          src={card.image}
          alt={card.title}
          className="w-full h-full object-cover"
          style={{
            transform: `scale(${1.35}) translateY(${parallaxY}vh)`,
          }}
        />
      </div>

      {/* Content */}
      <div className="flex flex-col justify-between p-30 flex-1 h-full bg-gray">
        <span className="text-heading text-primary mb-50">{card.year}</span>

        <div className="mb-[10px]">
          <h3 className="text-25 font-[optima] text-foreground-light uppercase mb-[10px]">
            {card.title}
          </h3>
          <p className="text-description">{card.description}</p>
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   YearTimeline  — scrolls active dot rightward, resets on loop
═══════════════════════════════════════════════════════════════ */

function YearTimeline({
  years,
  activeYearIdx,
  activeCardIdx,
  progressPct,
  swiperRef,
  onYearClick,
}: {
  years: number[];
  activeYearIdx: number;
  activeCardIdx: number;
  progressPct: number;
  swiperRef: React.MutableRefObject<SwiperType | null>;
  onYearClick: (year: number) => void;
}) {
  // Ghost first year appended so last year always has a connecting line
  const loopedYears = [...years, years[0]];
  const scrollTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const prevYearIdxRef = useRef(activeYearIdx);

  useEffect(() => {
    const swiper = swiperRef.current;
    if (!swiper) return;

    const isLoopingBack =
      prevYearIdxRef.current === years.length - 1 && activeYearIdx === 0;

    prevYearIdxRef.current = activeYearIdx;

    if (scrollTimerRef.current) clearTimeout(scrollTimerRef.current);

    scrollTimerRef.current = setTimeout(() => {
      const slides = swiper.slides as HTMLElement[];
      const wrapperEl = swiper.el as HTMLElement;
      if (!slides?.length || !wrapperEl) return;

      // On loop-back: instantly snap to start with no animation
      if (isLoopingBack) {
        swiper.translateTo(0, 0);
        return;
      }

      const wRect = wrapperEl.getBoundingClientRect();
      const BUFFER = 24;

      // Check active dot
      const activeSlide = slides[activeYearIdx];
      // Check next dot (could be ghost dot at loopedYears length)
      const nextSlide =
        typeof window !== "undefined" && window.innerWidth < 1024
          ? (slides[activeYearIdx] ?? slides[activeYearIdx])
          : (slides[activeYearIdx + 1] ?? slides[activeYearIdx]);

      if (!activeSlide) return;

      const aRect = activeSlide.getBoundingClientRect();
      const nRect = nextSlide.getBoundingClientRect();

      const activeFits =
        aRect.left >= wRect.left + BUFFER &&
        aRect.right <= wRect.right - BUFFER;
      const nextFits =
        nRect.left >= wRect.left + BUFFER &&
        nRect.right <= wRect.right - BUFFER;

      if (activeFits && nextFits) return; // both visible — do nothing

      if (nRect.right > wRect.right - BUFFER) {
        // Scroll left to reveal next
        const scrollBy = nRect.right - wRect.right + BUFFER;
        swiper.translateTo(swiper.getTranslate() - scrollBy, 400);
      } else if (aRect.left < wRect.left + BUFFER) {
        // Scroll right to reveal active (going backwards)
        const scrollBy = wRect.left - aRect.left + BUFFER;
        swiper.translateTo(swiper.getTranslate() + scrollBy, 400);
      }
    }, 50);

    return () => {
      if (scrollTimerRef.current) clearTimeout(scrollTimerRef.current);
    };
  }, [activeYearIdx, activeCardIdx, years.length, swiperRef]);

  return (
    <div className="w-full mt-50 select-none">
      <div className="overflow-y-visible pt-50 pb-2 px-40">
        <Swiper
          loop={false}
          slidesPerView="auto"
          spaceBetween={0}
          speed={400}
          allowTouchMove={true}
          freeMode={false}
          onSwiper={(s) => {
            swiperRef.current = s;
          }}
          className="!overflow-visible"
        >
          {loopedYears.map((year, idx) => {
            const isActive = idx === activeYearIdx;
            const isNextActive = idx + 1 === activeYearIdx;
            const hasLine = idx < loopedYears.length - 1;
            const isGhost = idx === loopedYears.length - 1;

            return (
              <SwiperSlide
                key={`${year}-${idx}`}
                style={{ width: "auto" }}
                className="!flex !items-center !overflow-visible"
              >
                <button
                  onClick={() => !isGhost && onYearClick(year)}
                  disabled={isGhost}
                  className="relative flex-shrink-0 flex items-center justify-center w-[10px] h-[10px] outline-none z-10 cursor-pointer disabled:cursor-default"
                >
                  {/* Year label */}
                  <span
                    className={`
                      absolute whitespace-nowrap text-25 font-[optima] tracking-[2%] pointer-events-none
                      bottom-[calc(100%+10px)] left-1/2 -translate-x-1/2
                      transition-colors duration-300
                      ${isActive ? "text-primary" : "text-foreground"}
                    `}
                  >
                    {year}
                  </span>

                  {/* Active ring */}
                  {isActive && (
                    <span className="absolute inset-[-4px] rounded-full ring-1 ring-primary transition-all duration-300" />
                  )}

                  {/* Core dot */}
                  <span
                    className={`block w-[10px] h-[10px] rounded-full bg-primary transition-opacity duration-300 ${
                      isGhost ? "opacity-40" : ""
                    }`}
                  />
                </button>

                {/* ── Line after dot ── */}
                {hasLine && (
                  <div
                    className="relative h-[1.5px] w-[120px] md:w-[150px] lg:w-[200px] xl:w-[255px] flex-shrink-0 self-center"
                    style={{
                      marginLeft: isActive ? 16 : 10,
                      marginRight: isNextActive ? 16 : 10,
                    }}
                  >
                    {!isActive && (
                      <div className="absolute inset-0 bg-black/50" />
                    )}
                    {isActive && (
                      <>
                        <div
                          className="absolute inset-0 w-full"
                          style={{
                            backgroundImage:
                              "repeating-linear-gradient(90deg, #5B1A1A 0px, #5B1A1A 6px, transparent 6px, transparent 10px)",
                            backgroundSize: "100% 2px",
                            backgroundRepeat: "no-repeat",
                            backgroundPosition: "center",
                          }}
                        />
                        <div
                          className="absolute -top-[1px] left-0 h-[3px] bg-primary transition-[width] duration-500 ease-[cubic-bezier(0.4,0,0.2,1)]"
                          style={{ width: `${progressPct}%` }}
                        />
                      </>
                    )}
                  </div>
                )}
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
    </div>
  );
}