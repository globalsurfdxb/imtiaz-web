"use client";

import React, { useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperType } from "swiper";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import CustomOutlineButton from "../../common/CustomOutlineButton-v4";
import SliderArrowButton from "../../common/SliderNavigationButton-v4";
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

  const [bp, setBp] = useState<"mobile" | "desktop">("desktop");

  const getImageForBp = (c: (typeof communities)[number]) =>
    bp === "mobile"
      ? c.featured_image_mobile || c.featured_image_desktop // fallback if mobile image missing
      : c.featured_image_desktop;

  /* Background fade logic */
  const [bgBase, setBgBase] = useState<string | null>(
    getImageForBp(communities?.[initialActive] ?? communities?.[0]) ?? null,
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
    const img = getImageForBp(current);
    if (img) switchBg(img);
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

  useEffect(() => {
    communities.forEach((c) => {
      if (c.featured_image_desktop) preloadImage(c.featured_image_desktop);
      if (c.featured_image_mobile) preloadImage(c.featured_image_mobile);
    });
  }, [communities]);

  const gap = bp === "mobile" ? "24px" : "50px";

  useEffect(() => {
    const current = communities[activeFeat] ?? communities[0];
    const img = getImageForBp(current);
    if (img) switchBg(img);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [bp]);

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
            <SliderArrowButton ref={prevRef} direction="prev" variant="light" />
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
            <SliderArrowButton ref={nextRef} direction="next" variant="light" />
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
            initial={{ opacity: 1 }}
            animate={{ opacity: 0.9 }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
            className="absolute inset-0 w-full h-full bg-cover bg-center scale-[1.2]"
            style={{ backgroundImage: `url('${prevBg}')` }}
          />
        )}
        {bgBase && (
          <motion.div
            key={`base-${bgBase}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="absolute inset-0 w-full h-full bg-cover bg-center scale-[1.2]"
            style={{ backgroundImage: `url('${bgBase}')` }}
          />
        )}
      </div>

      {/* Top overlay */}
      <div
        className="absolute inset-0 z-[1] opacity-65"
        style={{
          background:
            "linear-gradient(180deg, rgba(0,0,0,0.3) 0%, rgba(0,0,0,1) 100%)",
        }}
      />

      {/* Heading */}
      <div className="container pt-120 2xl:pt-[130px] relative z-10">
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
        {/* Fixed bottom gradient (mobile) — stays put while slides change */}
        <div
          className="md:hidden absolute inset-x-0 bottom-0 h-[65%] z-[15] pointer-events-none"
          style={{
            background:
              "linear-gradient(180deg, rgba(0,0,0,0) 7.68%, rgba(0,0,0,0.66) 100%)",
          }}
        />

        {/* Fixed pagination (mobile) — stays put while slides change */}
        <div className="flex md:hidden justify-center absolute inset-x-0 bottom-[50px] gap-[10px] z-30 min-[1540px]:hidden pointer-events-auto">
          {communities.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => swiper?.slideToLoop(i)}
              className={`w-[10px] h-[10px] rounded-full border border-white transition-all duration-300 cursor-pointer ${
                i === activeFeat ? "bg-white" : "bg-transparent"
              }`}
            />
          ))}
        </div>

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
          initialSlide={initialActive}
          loop={true}
          speed={600}
          breakpoints={{
            0: { slidesPerView: 1 },
            640: { slidesPerView: 2 },
            1024: { slidesPerView: 4 },
            1580: { slidesPerView: 5 },
          }}
          onSwiper={setSwiper}
          onSlideChange={(s) => {
            const idx = s.realIndex;
            setActiveFeat(idx);
            const img = getImageForBp(communities[idx]);
            if (img) switchBg(img);
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
                      className="relative flex-1 min-h-[360px] md:min-h-[420px] 3xl:h-[500px] flex justify-center items-end cursor-pointer"
                      onMouseEnter={() => {
                        setActiveFeat(i);
                        const img = getImageForBp(c);
                        if (img) switchBg(img);
                      }}
                    >
                      <div
                        className={`hidden md:block absolute inset-0 transition-opacity duration-400 ${
                          active ? "opacity-100" : "opacity-0"
                        }`}
                        style={{
                          background:
                            "linear-gradient(180deg, rgba(0,0,0,0) 7.68%, rgba(0,0,0,0.66) 100%)",
                        }}
                      />
                      <div className="relative z-20 w-full flex justify-center pointer-events-none">
                        <div className="flex flex-col items-center absolute bottom-[110px] xl:bottom-22 3xl:bottom-[100px]">
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
                            className="text-white font-[optima] uppercase text-center text-[25px] leading-[1.4] px-4 text-trim"
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
