"use client";

import React, { useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperType } from "swiper";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import Image from "next/image";

import CustomOutlineButton from "../../common/CustomOutlineButton";
import { motion, useInView } from "framer-motion";
import { textFade, moveUp, moveUpV2 } from "../../motionVariants";

import "swiper/css";
import "swiper/css/pagination";

import { cubicBezier } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Reveal from "../../animations/RevealOneByOneAnimation";
import { communityNamesData, InvestorRelationsPageResponse } from "../data";
import { SectionHeading } from "../../animations/SectionHeading";
import Link from "next/link";

gsap.registerPlugin(ScrollTrigger);

export default function HeroFeatureSlider({
  data,
  title,
}: {
  title: string;
  data: InvestorRelationsPageResponse["data"]["communities"];
}) {
  // const { heading, communities = [] } = communityNamesData;

  const heading = title;
  const communities = data;

  const initialActive = communities?.[1] ? 1 : 0;

  const [activeFeat, setActiveFeat] = useState<number>(initialActive);
  const [swiper, setSwiper] = useState<SwiperType | null>(null);

  /* Background fade logic */
  const [bgBase, setBgBase] = useState<string | null>(
    communities?.[initialActive]?.featured_image_desktop ??
      communities?.[0]?.featured_image_desktop ??
      null,
  );
  const [prevBg, setPrevBg] = useState<string | null>(null);

  const bgRef = useRef<HTMLDivElement | null>(null);
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const prevRef = useRef<HTMLButtonElement | null>(null);
  const nextRef = useRef<HTMLButtonElement | null>(null);

  const preloadImage = (src: string) =>
    new Promise<void>((resolve) => {
      const img = new window.Image();
      img.src = src;
      img.onload = () => resolve();
      img.onerror = () => resolve();
    });

  const switchBg = async (bg: string) => {
    if (!bg) return;
    await preloadImage(bg);
    setPrevBg(bgBase);
    setBgBase(bg);
  };

  const isHalfInView = useInView(sectionRef, {
    margin: "-70% 0px -70% 0px",
    once: true,
  });

  const [bp, setBp] = useState<"mobile" | "desktop">("desktop");

  useEffect(() => {
    const handleResize = () => {
      setBp(window.innerWidth < 768 ? "mobile" : "desktop");
    };

    handleResize(); // run once
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);
  const dropWrapper = {
    hidden: { opacity: 0, y: -60 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: cubicBezier(0.16, 1, 0.3, 1),
      },
    },
  };

  const initGSAP = () => {
    if (!bgRef.current || !sectionRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        bgRef.current,
        { y: "-25vh" },
        {
          y: "25vh",
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            scrub: true,
            start: "top bottom",
            end: "bottom top",
          },
        },
      );
    });

    ScrollTrigger.refresh();
    return () => ctx.revert();
  };

  useEffect(() => {
    const listener = () => initGSAP();
    window.addEventListener("homeAnimationsReady", listener);
    initGSAP();
    return () => window.removeEventListener("homeAnimationsReady", listener);
  }, []);

  const handleMouseLeave = () => {
    const current = communities[activeFeat] ?? communities[0];
    if (current?.featured_image_desktop)
      switchBg(current.featured_image_desktop);
  };

  useEffect(() => {
    if (!swiper) return;
    if (!prevRef.current || !nextRef.current) return;

    if (
      swiper.params.navigation &&
      typeof swiper.params.navigation !== "boolean"
    ) {
      swiper.params.navigation.prevEl = prevRef.current;
      swiper.params.navigation.nextEl = nextRef.current;
    }

    swiper.navigation.update();
  }, [swiper, prevRef.current, nextRef.current]);

  const gap = bp === "mobile" ? "20px" : "50px";

  return (
    <section
      ref={sectionRef}
      className="w-full relative overflow-hidden h-[92vh] max-h-[745px] md:max-h-full md:h-screen z-10"
    >
      {/* Nav Buttons */}
      <div className="absolute w-full z-50 h-fit inset-0 flex justify-between top-1/2 -translate-y-1/2 mx-auto container items-center !px-[20px] md:!px-[15px]">
        <div>
          {/* Prev Button */}
          <motion.div
            variants={moveUp(0.2)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
          >
            <button
              ref={prevRef}
              className="relative  md:w-[62px]  md:h-[62px] w-[50px] h-[50px]   group   border border-white rounded-[50px] flex items-center justify-center overflow-hidden"
            >
              <span className="absolute right-0 top-0 h-full w-0 bg-white/30 transition-all duration-300 group-hover:w-full z-0" />
              <Image
                src="/icons/left_arrow_slider_primary.svg"
                alt="Previous"
                width={28}
                height={28}
                className="relative z-10 object-contain md:w-[28px] md:h-[28px] w-[20px] h-[20px]   invert brightness-0 group-hover:invert-0 group-hover:brightness-100 transition-all duration-300"
              />
            </button>
          </motion.div>
        </div>
        <div>
          {/* NEXT BUTTON */}
          <motion.div
            variants={moveUp(0.3)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
          >
            <button
              ref={nextRef}
              className="relative  md:w-[62px]  md:h-[62px] w-[50px] h-[50px]    group border border-white rounded-[50px] flex items-center justify-center overflow-hidden"
            >
              <span className="absolute left-0 top-0 h-full w-0 bg-white/30 transition-all duration-300 group-hover:w-full z-0" />
              <Image
                src="/icons/left_arrow_slider_primary.svg"
                alt="Next"
                width={28}
                height={28}
                className="relative rotate-180 z-10 object-contain md:w-[28px] md:h-[28px] w-[20px] h-[20px]   invert brightness-0 group-hover:invert-0 group-hover:brightness-100 transition-all duration-300"
              />
            </button>
          </motion.div>
        </div>
      </div>
      {/* Background */}
      <div
        ref={bgRef}
        className="absolute w-full h-full inset-0 -z-20 overflow-hidden scale-[1.08]"
      >
        {prevBg && (
          <motion.div
            key={`prev-${prevBg}`}
            initial={{ opacity: 1, filter: "blur(0px)" }}
            animate={{ opacity: 0.9, filter: "blur(1px)" }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
            className="absolute inset-0 w-full h-full bg-cover bg-center scale-[1.2]"
            style={{ backgroundImage: `url('${prevBg}')` }}
          />
        )}
        {bgBase && (
          <motion.div
            key={`base-${bgBase}`}
            initial={{ opacity: 0, filter: "blur(1px)" }}
            animate={{ opacity: 1, filter: "blur(0px)" }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="absolute inset-0 w-full h-full bg-cover bg-center scale-[1.2]"
            style={{ backgroundImage: `url('${bgBase}')` }}
          />
        )}
      </div>

      {/* Top overlay */}
      <div
        className="absolute inset-0 z-[1]"
        style={{
          background:
            "linear-gradient(180deg, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.6) 100%)",
        }}
      />

      {/* Heading */}
      <div className="container pt-[70px] md:pt-120 2xl:pt-[130px] relative z-10">
        <motion.div className="flex items-center justify-center relative">
          <SectionHeading
            title={heading}
            className="text-center text-white text-heading"
          />
        </motion.div>
      </div>

      {/* Swiper Feature Cards */}
      <div
        className="absolute bottom-0 w-full z-20 "
        onMouseLeave={handleMouseLeave}
      >
        <Swiper
          modules={[Autoplay, Navigation, Pagination]}
          navigation={{
            prevEl: prevRef.current,
            nextEl: nextRef.current,
          }}
          pagination={{
            el: ".custom-pagination ",
            clickable: true,
          }}
          slidesPerView={4}
          loop={true}
          speed={600}
          breakpoints={{
            0: { slidesPerView: 1 },
            640: { slidesPerView: 2 },
            768: { slidesPerView: 3 },
            1024: { slidesPerView: 4 },
            1580: { slidesPerView: 5 },
          }}
          onSwiper={setSwiper}
          onSlideChange={(s) => {
            const idx = s.realIndex;
            setActiveFeat(idx);
            switchBg(communities[idx]?.featured_image_desktop);
          }}
          className="w-full"
        >
          {communities.map((c, i) => {
            const active = activeFeat === i;

            return (
              <SwiperSlide key={i}>
                <Reveal key={i} variants={moveUpV2}>
                  <div className="relative flex flex-1 ">
                    <div
                      className="relative flex-1 min-h-[360px] md:min-h-[420px] 3xl:h-[500px] flex justify-center items-end px-4 cursor-pointer"
                      onMouseEnter={() => {
                        setActiveFeat(i);
                        switchBg(c.featured_image_desktop);
                      }}
                    >
                      <div
                        className={`absolute inset-0 transition-opacity duration-400 ${
                          active ? "opacity-100" : "opacity-0"
                        }`}
                        style={{
                          background:
                            "linear-gradient(180deg, rgba(0,0,0,0) 7.68%, rgba(0,0,0,0.66) 100%)",
                        }}
                      />
                      <div className="relative z-20 w-full flex justify-center pointer-events-none">
                        <div className="flex flex-col items-center absolute bottom-[70px] xl:bottom-22 3xl:bottom-[100px]">
                          <motion.h3
                            key={`feat-title-${i}-${active}`}
                            initial={{ y: 0 }}
                            animate={{
                              y: bp === "mobile" ? 0 : active ? -16 : 0, // 👈 disable on mobile
                            }}
                            transition={{
                              duration: 0.9,
                              ease: [0.25, 0.46, 0.45, 0.94],
                              delay: active && bp !== "mobile" ? 0.08 : 0, // 👈 also remove delay on mobile
                            }}
                            className="text-white font-[optima] uppercase text-center text-[25px] leading-[1.4] px-4"
                          >
                            {c.title}
                          </motion.h3>

                          {/* Button wrapper — remove the instant class swap, use opacity+y only */}
                          <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{
                              opacity: active ? 1 : 0,
                              y: active ? 0 : 30,
                              marginTop: active ? "var(--gap-active)" : "0px",
                            }}
                            transition={{
                              duration: active ? 0.5 : 0.5,
                              ease: [0.25, 0.1, 0.25, 1],
                            }}
                            style={
                              {
                                ["--gap-active"]: gap,
                              } as React.CSSProperties
                            }
                            className="gap-responsive pointer-events-none"
                          >
                            <div
                              style={{
                                pointerEvents: active ? "auto" : "none",
                              }}
                            >
                              <Link
                                // href={`/communities/${c.title.toLowerCase().replace(/\s+/g, "-")}`}
                                href={`/communities/${c.slug}`}
                              >
                                <CustomOutlineButton
                                  text="Read More"
                                  borderColor="border-white"
                                  textColor="text-white"
                                  px="h-[44px] md:h-[50px]  xl:h-[66px] px-[30px] md:px-[37px]"
                                />
                              </Link>
                            </div>
                          </motion.div>

                          {/* Pagination (only below 1540px) */}
                          <div className="flex md:hidden justify-center mt-[50px] gap-[10px] min-[1540px]:hidden">
                            {communities.map((_, i) => (
                              <button
                                key={i}
                                // onClick={() => swiperRef.current?.slideToLoop(i)}
                                className={`w-[10px] h-[10px] rounded-full border border-white transition-all duration-300 cursor-pointer ${
                                  i === activeFeat
                                    ? "bg-white"
                                    : "bg-transparent"
                                }`}
                              />
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>

                    <div
                      className="hidden sm:block absolute top-0 right-0 h-full w-[1px]"
                      style={{
                        background:
                          "linear-gradient(180deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.5) 100%)",
                      }}
                    />
                  </div>
                </Reveal>
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
    </section>
  );
}
