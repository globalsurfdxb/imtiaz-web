// "use client";

// import React, { useState, useRef, useEffect } from "react";
// import Image from "next/image";
// import { Swiper, SwiperSlide } from "swiper/react";
// import { EffectFade, Navigation, Autoplay } from "swiper/modules";
// import { motion, AnimatePresence } from "framer-motion";
// import type { Swiper as SwiperType } from "swiper";
// import gsap from "gsap";
// import { ScrollTrigger } from "gsap/ScrollTrigger";
// gsap.registerPlugin(ScrollTrigger);
// import { useInView } from "framer-motion";
// import CustomOutlineButton from "../../common/CustomOutlineButton";
// import "swiper/css";
// import "swiper/css/navigation";

// import { moveUpExit, moveUp } from "../../motionVariants";
// import Link from "next/link";

// export interface feats {
//   icon: string;
//   label: string;
// }

// export interface SlideData {
//   title: string;
//   video: string;
//   pillFeatures: {
//     title: string;
//     features: feats[];
//   };
// }

// type HeroSliderProps = {
//   slides: SlideData[];
//   RightLabel?: string;
// };

// const fadeUp = {
//   hidden: { opacity: 0, y: 40 },
//   show: (d: number = 0) => ({
//     opacity: 1,
//     y: 0,
//     transition: { duration: 0.7, delay: d },
//   }),
//   exit: moveUpExit.exit,
// };

// export default function HeroSlider({ slides, RightLabel }: HeroSliderProps) {
//   const [activeIndex, setActiveIndex] = useState(0);
//   const [swiperInstance, setSwiperInstance] = useState<SwiperType | null>(null);

//   const sectionRef = useRef(null);
//   const startAnim = useInView(sectionRef, { once: true, amount: 0.3 });

//   const wrapRefs = useRef<HTMLDivElement[]>([]);
//   const imgRefs = useRef<HTMLVideoElement[]>([]);

//   const setWrapRef = (el: HTMLDivElement | null, i: number) => {
//     if (el) wrapRefs.current[i] = el;
//   };

//   const setImgRef = (el: HTMLVideoElement | null, i: number) => {
//     if (el) imgRefs.current[i] = el;
//   };
//   const [isMobile, setIsMobile] = useState(false);

//   useEffect(() => {
//     const handleResize = () => {
//       setIsMobile(window.innerWidth < 768);
//     };

//     handleResize(); // initial check
//     window.addEventListener("resize", handleResize);

//     return () => window.removeEventListener("resize", handleResize);
//   }, []);

//   return (
//     <div className="w-full relative h-screen" ref={sectionRef}>
//       <Swiper
//         effect="fade"
//         fadeEffect={{ crossFade: true }}
//         slidesPerView={1}
//         loop
//         modules={[EffectFade, Autoplay, Navigation]}
//         autoplay={{ delay: 8000, disableOnInteraction: false }}
//         onSwiper={setSwiperInstance}
//         navigation={{ nextEl: ".swiper-btn-next", prevEl: ".swiper-btn-prev" }}
//         className="w-full swiper-fade h-full"
//         onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
//       >
//         {slides.map((slide, index) => (
//           <SwiperSlide key={index}>
//             <div className="relative w-full h-full flex flex-col pt-15 lg:pt-0  justify-center items-center">
//               {/* -------------------------------- VIDEO BG -------------------------------- */}
//               <div
//                 className="absolute inset-0 -z-10 overflow-hidden"
//                 ref={(el) => setWrapRef(el, index)}
//               >
//                 <video
//                   ref={(el) => setImgRef(el, index)}
//                   src={slide.video}
//                   autoPlay
//                   loop
//                   muted
//                   playsInline
//                   className="w-full h-full object-cover "
//                 />
//                 <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.5)_0%,rgba(0,0,0,0.5)_100%)]" />
//               </div>

//               {/* -------------------------------- TOP AREA -------------------------------- */}
//               <div className="container px-4 md:px-6 lg:px-10 w-full absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pb-200 min-[450px]:pb-0">
//                 <AnimatePresence mode="wait">
//                   <motion.div
//                     key={`top-${activeIndex}`}
//                     initial="hidden"
//                     animate={startAnim ? "show" : "hidden"}
//                     exit="exit"
//                     className="flex flex-col justify-between items-center"
//                   >
//                     {/* Right Label */}
//                     <div className="overflow-hidden mb-5 md:mb-50">
//                       <motion.div
//                         variants={moveUp(0.25)}
//                         initial="hidden"
//                         animate={startAnim ? "show" : "hidden"}
//                       >
//                         <span className="text-white   uppercase text-description !text-25 !leading-[1]">
//                           {RightLabel}
//                         </span>
//                       </motion.div>
//                     </div>

//                     {/* Title */}
//                     <div className="overflow-hidden">
//                       <motion.h1
//                         variants={moveUp(0.2)}
//                         initial="hidden"
//                         animate={startAnim ? "show" : "hidden"}
//                         className="text-white uppercase  text-heading  text-center "
//                       >
//                         {slide.title}
//                       </motion.h1>
//                     </div>

//                     <motion.div
//                       className="block md:hidden mt-[50px] left-0 w-full z-[60] "
//                     >
//                       <div className="container flex items-center justify-center gap-5">
//                         {/* Prev */}
//                         <button
//                           aria-label="Previous slide"
//                           className="swiper-btn-prev relative w-[50px] h-[50px] group  border border-white rounded-[50px] flex items-center justify-center overflow-hidden"
//                         >
//                           <span className="absolute left-0 top-0 h-full w-0 bg-white/30 transition-all duration-300 group-hover:w-full z-0" />
//                           <Image
//                             src="/icons/left_arrow_slider_primary.svg"
//                             alt="Next"
//                             width={28}
//                             height={28}
//                             className="relative z-10 object-contain w-[20px] h-[20px] invert brightness-0 group-hover:invert-0 group-hover:brightness-100 transition-all duration-300"
//                           />
//                         </button>

//                         {/* Next */}
//                         <button
//                           aria-label="Next slide"
//                           className="swiper-btn-next relative   w-[50px] h-[50px]  group   border border-white rounded-[50px] flex items-center justify-center overflow-hidden"
//                         >
//                           <span className="absolute left-0 top-0 h-full w-0 bg-white/30 transition-all duration-300 group-hover:w-full z-0" />
//                           <Image
//                             src="/icons/left_arrow_slider_primary.svg"
//                             alt="Next"
//                             width={28}
//                             height={28}
//                             className="relative rotate-180 z-10 object-contain  w-[20px] h-[20px] invert brightness-0 group-hover:invert-0 group-hover:brightness-100 transition-all duration-300"
//                           />
//                         </button>
//                       </div>
//                     </motion.div>
//                   </motion.div>
//                 </AnimatePresence>
//               </div>

//               {/* -------------------------------- PILL SECTION -------------------------------- */}
//               <div className="absolute w-full bottom-0 md:bottom-15 lg:bottom-[50px]">
//                 <motion.div
//                   variants={moveUp(1.2)}
//                   initial="hidden"
//                   animate={startAnim ? "show" : "hidden"}
//                   exit="exit"
//                   className={`${isMobile ? "" : "container  md:!px-[15px]"} mt-10 lg:mt-[150px] 2xl:mt-[170px] 3xl:mt-[184px]  overflow-hidden`}
//                 >
//                   <div className="relative">
//                     <div className="absolute inset-0 bg-white/5 backdrop-blur-[30px] rounded-tl-[20px] rounded-tr-[20px] md:rounded-xl lg:rounded-full pointer-events-none" />
//                     <motion.div
//                       key={`pill-${activeIndex}`}
//                       className="bg-white/5 backdrop-blur-[30px] py-[30px] md:py-6 lg:py-0 rounded-tl-[20px] rounded-tr-[20px] md:rounded-xl lg:rounded-full flex flex-col lg:flex-row md:items-center justify-between  gap-5    lg:min-h-[90px]"
//                     >
//                       {/* Features */}
//                       <div className=" grid grid-cols-2 md:flex gap-7 md:gap-4  3xl:gap-[80px] md:items-center  flex-wrap lg:flex-nowrap   px-5 lg:px-[30px] 3xl:px-[68px]">
//                         {slide.pillFeatures.features.map((f, idx) => (
//                           <motion.div
//                             variants={moveUp(idx * 0.11)}
//                             initial="hidden"
//                             animate="show"
//                             key={`${idx}-${activeIndex}`}
//                           >
//                             <motion.div className="flex items-center    gap-3">
//                               <Image
//                                 src={f.icon}
//                                 width={20}
//                                 height={20}
//                                 alt={f.label}
//                               />
//                               <span className="text-white text-[16px] text-description uppercase">
//                                 {f.label}
//                               </span>
//                             </motion.div>
//                           </motion.div>
//                         ))}
//                       </div>

//                       <motion.div className="md:pr-6 md:pr-[15px] flex items-center justify-center ">
//                         <AnimatePresence mode="wait">
//                           <motion.div
//                             key={`btns-${activeIndex}`}
//                             variants={moveUp(0)}
//                             initial="hidden"
//                             animate={startAnim ? "show" : "hidden"}
//                             exit="exit"
//                             className="flex gap-4 font-[avenirRoman] overflow-hidden px-[15px] md:px-0 w-full"
//                           >
//                             <motion.div
//                               variants={moveUp(0.2)}
//                               className="w-full"
//                             >
//                               <CustomOutlineButton
//                                 className="w-full"
//                                 text="Register"
//                                 borderColor="border-white"
//                                 textColor="text-white"
//                                 px="px-[18px] h-[50px]  md:h-[66px]   !leading-[1.58]"
//                               />
//                             </motion.div>

//                             <motion.div
//                               variants={moveUp(0.5)}
//                               className="w-full"
//                             >
//                               <Link
//                                 href={`/properties/${slide.title.toLowerCase().replace(/\s+/g, "-")}`}
//                               >
//                                 <CustomOutlineButton
//                                   text="Explore"
//                                   className="w-full"
//                                   borderColor="border-white"
//                                   textColor="text-white"
//                                   px="px-[16px]  h-[50px]  md:h-[66px]  !leading-[1.58]"
//                                 />
//                               </Link>
//                             </motion.div>
//                           </motion.div>
//                         </AnimatePresence>
//                       </motion.div>
//                     </motion.div>
//                   </div>
//                 </motion.div>
//               </div>
//             </div>
//           </SwiperSlide>
//         ))}
//       </Swiper>

//       {/* -------------------------------- ARROWS -------------------------------- */}
//       <motion.div
//         variants={fadeUp}
//         custom={0.5}
//         initial="hidden"
//         animate={startAnim ? "show" : "hidden"}
//         exit="exit"
//         className="hidden md:block absolute top-1/2 -translate-y-1/2 left-0 w-full z-[60] "
//       >
//         <div className="container flex items-center justify-center gap-5 md:justify-between">
//           {/* Prev */}
//           <button
//             aria-label="Previous slide"
//             className="swiper-btn-prev relative  w-[62px] l h-[62px] group  border border-white rounded-[50px] flex items-center justify-center overflow-hidden"
//           >
//             <span className="absolute left-0 top-0 h-full w-0 bg-white/30 transition-all duration-300 group-hover:w-full z-0" />
//             <Image
//               src="/icons/left_arrow_slider_primary.svg"
//               alt="Next"
//               width={28}
//               height={28}
//               className="relative z-10 object-contain  w-[28px]  h-[28px] invert brightness-0 group-hover:invert-0 group-hover:brightness-100 transition-all duration-300"
//             />
//           </button>

//           {/* Next */}
//           <button
//             aria-label="Next slide"
//             className="swiper-btn-next relative   w-[62px] l h-[62px]  group   border border-white rounded-[50px] flex items-center justify-center overflow-hidden"
//           >
//             <span className="absolute left-0 top-0 h-full w-0 bg-white/30 transition-all duration-300 group-hover:w-full z-0" />
//             <Image
//               src="/icons/left_arrow_slider_primary.svg"
//               alt="Next"
//               width={28}
//               height={28}
//               className="relative rotate-180 z-10 object-contain  w-[28px]  h-[28px] invert brightness-0 group-hover:invert-0 group-hover:brightness-100 transition-all duration-300"
//             />
//           </button>
//         </div>
//       </motion.div>
//     </div>
//   );
// }

"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectFade, Navigation, Autoplay } from "swiper/modules";
import { motion } from "framer-motion";
import type { Swiper as SwiperType } from "swiper";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);
import { useInView } from "framer-motion";
import CustomOutlineButton from "../../common/CustomOutlineButton";
import CarouselSlider from "./CarouselSlider";
import "swiper/css";
import "swiper/css/navigation";
import { createPortal } from "react-dom";
import RegisterInterestForm from "@/app/components/Home/sections/RegisterInterestForm";

import { moveUpExit, moveUp } from "../../motionVariants";
import Link from "next/link";
import { useLenis } from "@/app/contexts/LenisContext";

export interface feats {
  icon: string;
  label: string;
}

export interface SlideData {
  title: string;
  video: string;
  mobileVideo:string;
  slug: string;
  bgImage?: string; // optional per-slide fallback image shown during transition
  pillFeatures: {
    title: string;
    features: feats[];
  };
}

type HeroSliderProps = {
  slides: SlideData[];
  RightLabel?: string;
  heroBgImage?: string; // static fallback image shown behind all slides
  title: string;
};

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  show: (d: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay: d },
  }),
  exit: moveUpExit.exit,
};

export default function HeroSlider({
  slides,
  RightLabel,
  title,
}: HeroSliderProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [swiperInstance, setSwiperInstance] = useState<SwiperType | null>(null);
  const [mounted, setMounted] = useState(false);
  const [enquiryOpen, setEnquiryOpen] = useState(false);
  const [enquiryVisible, setEnquiryVisible] = useState(false);
  const backdropRef = useRef<HTMLDivElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);

  const { lock, unlock } = useLenis();

  const sectionRef = useRef(null);
  const startAnim = useInView(sectionRef, { once: true, amount: 0.3 });

  const wrapRefs = useRef<HTMLDivElement[]>([]);
  const imgRefs = useRef<HTMLVideoElement[]>([]);

  const setWrapRef = (el: HTMLDivElement | null, i: number) => {
    if (el) wrapRefs.current[i] = el;
  };
  const setImgRef = (el: HTMLVideoElement | null, i: number) => {
    if (el) imgRefs.current[i] = el;
  };

  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 992);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!enquiryOpen) return;
    setEnquiryVisible(true);
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        if (!backdropRef.current || !modalRef.current) return;
        gsap.fromTo(
          backdropRef.current,
          { opacity: 0 },
          { opacity: 1, duration: 0.5, ease: "power2.out" },
        );
        gsap.fromTo(
          modalRef.current,
          {
            opacity: 0,
            scale: 1.08,
            filter: "blur(8px)",
            transformOrigin: "center center",
          },
          {
            opacity: 1,
            scale: 1,
            filter: "blur(0px)",
            duration: 0.55,
            ease: "power3.out",
          },
        );
      });
    });
  }, [enquiryOpen]);

  const closeModal = () => {
    if (!backdropRef.current || !modalRef.current) return;
    gsap.to(backdropRef.current, {
      opacity: 0,
      duration: 0.3,
      ease: "power2.in",
    });
    gsap.to(modalRef.current, {
      opacity: 0,
      scale: 1.06,
      filter: "blur(16px)",
      duration: 0.5,
      ease: "power3.out",
      onComplete: () => {
  setEnquiryVisible(false);
  setEnquiryOpen(false);
  unlock();
  document.body.style.overflow = "";
},
    });
  };

  // Fast nav
  const handlePrev = () => {
    if (!swiperInstance) return;
    swiperInstance.animating = false;
    swiperInstance.slidePrev(300);
  };
  const handleNext = () => {
    if (!swiperInstance) return;
    swiperInstance.animating = false;
    swiperInstance.slideNext(300);
  };

  useEffect(() => {
    if (!enquiryOpen) return;
    lock();
    document.body.style.overflow = "hidden";
  }, [enquiryOpen]);

  return (
    <div className="w-full relative h-[100svh] bg-white" ref={sectionRef}>
      <style jsx global>{`
        .hero-pro-slider .swiper-slide:not(.swiper-slide-active) {
          pointer-events: none;
        }
      `}</style>
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        {/* <Image
            src="/images/home/pro-slider/bg-1.jpg"
            alt=""
            width={2520}
            height={1580}
            className="w-full h-full object-cover pointer-events-none"
          /> */}
        <div className="absolute inset-0 bg-black" />
      </div>

      {/* ── Swiper with per-slide videos (z-10) ──────────────────────────────── */}
      <div className="absolute inset-0 z-10">
        <Swiper
          effect="fade"
          fadeEffect={{ crossFade: true }}
          slidesPerView={1}
          loop
          modules={[EffectFade, Autoplay, Navigation]}
          // autoplay={{ delay: 8000, disableOnInteraction: false }}
          onSwiper={setSwiperInstance}
          className="w-full swiper-fade hero-pro-slider h-full"
          onSlideChange={(swiper) => {
            setActiveIndex(swiper.realIndex);
          }}
        >
          {slides.map((slide, index) => (
            <SwiperSlide key={index}>
              <div className="relative w-full h-full flex flex-col pt-15 lg:pt-0 justify-end lg:justify-center items-center">
                {/* VIDEO BG per slide */}
                <div
                  className="absolute inset-0 -z-10 overflow-hidden"
                  ref={(el) => setWrapRef(el, index)}
                >
                  <video
                    ref={(el) => setImgRef(el, index)}
                    src={slide.video}
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="w-full h-full object-cover hidden lg:block"
                  />

                  <video
                    ref={(el) => setImgRef(el, index)}
                    src={slide.mobileVideo ? slide.mobileVideo : slide.video}
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="w-full h-full object-cover lg:hidden"
                  />

                  <div
                    className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.5)_0%,rgba(0,0,0,0.5)_100%)]"
                    style={{
                      background:
                        "linear-gradient(180deg, rgb(0 0 0 / 36%) 0%, rgb(0 0 0 / 90%) 100%)",
                    }}
                  />
                </div>

                {/* Mobile nav */}
                {slides.length > 1 && (
                  <motion.div className="block lg:hidden absolute left-0 top-1/2 -translate-y-1/2 w-full opacity-60">
                    <div className="container flex items-center justify-between w-full">
                      <button
                        aria-label="Previous slide"
                        onClick={handlePrev}
                        className="relative w-[50px] h-[50px] group border border-white rounded-[50px] flex items-center justify-center overflow-hidden"
                      >
                        <span className="absolute left-0 top-0 h-full w-0 bg-white/30 transition-all duration-300 group-hover:w-full z-0" />
                        <Image
                          src="/icons/left_arrow_slider_primary.svg"
                          alt="Prev"
                          width={28}
                          height={28}
                          className="relative z-10 object-contain w-[20px] h-[20px] invert brightness-0 group-hover:invert-0 group-hover:brightness-100 transition-all duration-300"
                        />
                      </button>
                      <button
                        aria-label="Next slide"
                        onClick={handleNext}
                        className="relative w-[50px] h-[50px] group border border-white rounded-[50px] flex items-center justify-center overflow-hidden"
                      >
                        <span className="absolute left-0 top-0 h-full w-0 bg-white/30 transition-all duration-300 group-hover:w-full z-0" />
                        <Image
                          src="/icons/left_arrow_slider_primary.svg"
                          alt="Next"
                          width={28}
                          height={28}
                          className="relative rotate-180 z-10 object-contain w-[20px] h-[20px] invert brightness-0 group-hover:invert-0 group-hover:brightness-100 transition-all duration-300"
                        />
                      </button>
                    </div>
                  </motion.div>
                )}

                {/* TOP AREA */}
                <div className="container px-4 md:px-6 lg:px-10 w-full lg:absolute lg:top-1/2 lg:left-1/2 lg:-translate-x-1/2 lg:-translate-y-1/2   min-[450px]:pb-0">
                  <motion.div
                    key={`top-${activeIndex}`}
                    initial="hidden"
                    animate={startAnim ? "show" : "hidden"}
                    className="flex flex-col justify-between items-center"
                  >
                    {/* Right Label */}
                    <div className="overflow-hidden mb-[11px] lg:mb-50">
                      <motion.div
                        variants={moveUp(0.25)}
                        initial="hidden"
                        animate={startAnim ? "show" : "hidden"}
                      >
                        <span className="text-white uppercase text-description !text-25 !leading-[1]">
                          {title}
                        </span>
                      </motion.div>
                    </div>

                    {/* Title */}
                    <div className="overflow-hidden">
                      <motion.h1
                        variants={moveUp(0.2)}
                        initial="hidden"
                        animate={startAnim ? "show" : "hidden"}
                        className="text-white uppercase text-heading text-center"
                      >
                        {slide.title}
                      </motion.h1>
                    </div>
                  </motion.div>
                </div>

                {/* PILL SECTION */}
                <div className="lg:absolute w-full pb-[30px] lg:pb-0  lg:bottom-[67px]">
                  <motion.div
                    variants={moveUp(1.2)}
                    initial="hidden"
                    animate={startAnim ? "show" : "hidden"}
                    className={`${isMobile ? "" : "container md:!px-[15px]"} mt-[30px] lg:mt-[150px] 2xl:mt-[170px] 3xl:mt-[184px] overflow-hidden`}
                  >
                    <div className="relative">
                      <div className="absolute inset-0 lg:bg-white/5 lg:backdrop-blur-[30px] rounded-tl-[20px] rounded-tr-[20px] md:rounded-xl lg:rounded-full pointer-events-none" />
                      <motion.div className="lg:bg-white/5 lg:backdrop-blur-[30px] py-0 lg:py-6 xl:py-0 rounded-tl-[20px] rounded-tr-[20px] md:rounded-xl lg:rounded-full flex flex-col xl:flex-row md:items-center justify-between gap-[30px] md:gap-5 xl:min-h-[90px]">
                        <div className="hidden lg:block grid grid-cols-2 lg:flex gap-7 md:gap-4 lg:gap-10 3xl:gap-[80px] md:items-center flex-wrap lg:flex-nowrap px-5 lg:px-[30px] 3xl:px-[68px]">
                          {slide.pillFeatures.features.map((f, idx) => (
                            <motion.div
                              variants={moveUp(idx * 0.11)}
                              initial="hidden"
                              animate="show"
                              key={`${idx}-${activeIndex}`}
                            >
                              <motion.div className="flex items-center gap-3">
                                <Image
                                  src={f.icon}
                                  width={30}
                                  height={30}
                                  alt={f.label}
                                  className="invert brightness-0"
                                />
                                <span className="text-white text-16 text-description uppercase">
                                  {f.label}
                                </span>
                              </motion.div>
                            </motion.div>
                          ))}
                        </div>
                        <div className="lg:hidden">
                          <div
                            className="h-[1px]"
                            style={{
                              background:
                                "linear-gradient(90deg, rgba(255, 255, 255, 0) 0%, #FFFFFF 50%, rgba(255, 255, 255, 0) 100%)",
                            }}
                          ></div>
                          <div className="overflow-hidden  lg:px-[30px] 3xl:px-[68px] py-3 md:py-5">
                            <CarouselSlider
                              features={slide.pillFeatures.features}
                              activeIndex={activeIndex}
                            />
                          </div>
                          <div
                            className="h-[1px]"
                            style={{
                              background:
                                "linear-gradient(90deg, rgba(255, 255, 255, 0) 0%, #FFFFFF 50%, rgba(255, 255, 255, 0) 100%)",
                            }}
                          ></div>
                        </div>

                        <motion.div className="md:pr-[15px] flex items-center justify-center pb-10 sm:pb-0">
                          <motion.div
                            key={`btns-${activeIndex}`}
                            variants={moveUp(0)}
                            initial="hidden"
                            animate={startAnim ? "show" : "hidden"}
                            className="flex gap-4 font-[avenirRoman] overflow-hidden px-[15px] md:px-0 w-full justify-center"
                          >
                            <motion.div variants={moveUp(0.2)}>
                              <CustomOutlineButton
                                className=" w-fit"
                                text="Register"
                                borderColor="border-white"
                                textColor="text-white"
                                px="px-[27px] h-[44px] md:h-[50px]  xl:h-[66px] !leading-[1.58]"
                                onClick={() => setEnquiryOpen(true)}
                              />
                            </motion.div>
                            <motion.div variants={moveUp(0.5)}>
                              <Link
                                href={`/properties/${slide.slug}`}
                                onClick={(e) => {
                                  if (index !== activeIndex) e.preventDefault();
                                }}
                              >
                                <CustomOutlineButton
                                  text="Explore"
                                  className="w-fit"
                                  borderColor="border-white"
                                  textColor="text-white"
                                  px="px-[27px] h-[44px] md:h-[50px]  xl:h-[66px] !leading-[1.58]"
                                />
                              </Link>
                            </motion.div>
                          </motion.div>
                        </motion.div>
                      </motion.div>
                    </div>
                  </motion.div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* ── DESKTOP NAV ARROWS (z-20, above Swiper z-10) ────────────────────── */}
      {slides.length > 1 && (
        <motion.div
          variants={fadeUp}
          custom={0.5}
          initial="hidden"
          animate={startAnim ? "show" : "hidden"}
          exit="exit"
          className="hidden lg:block absolute top-1/2 -translate-y-1/2 left-0 w-full z-20 pointer-events-none"
        >
          <div className="container flex items-center justify-center gap-5 md:justify-between">
            <button
              aria-label="Previous slide"
              onClick={handlePrev}
              className="pointer-events-auto relative w-[62px] h-[62px] group border border-white rounded-[50px] flex items-center justify-center overflow-hidden"
            >
              <span className="absolute left-0 top-0 h-full w-0 bg-white/30 transition-all duration-300 group-hover:w-full z-0" />
              <Image
                src="/icons/left_arrow_slider_primary.svg"
                alt="Prev"
                width={28}
                height={28}
                className="relative z-10 object-contain w-[28px] h-[28px] invert brightness-0 group-hover:invert-0 group-hover:brightness-100 transition-all duration-300"
              />
            </button>

            <button
              aria-label="Next slide"
              onClick={handleNext}
              className="pointer-events-auto relative w-[62px] h-[62px] group border border-white rounded-[50px] flex items-center justify-center overflow-hidden"
            >
              <span className="absolute left-0 top-0 h-full w-0 bg-white/30 transition-all duration-300 group-hover:w-full z-0" />
              <Image
                src="/icons/left_arrow_slider_primary.svg"
                alt="Next"
                width={28}
                height={28}
                className="relative rotate-180 z-10 object-contain w-[28px] h-[28px] invert brightness-0 group-hover:invert-0 group-hover:brightness-100 transition-all duration-300"
              />
            </button>
          </div>
        </motion.div>
      )}
      {mounted &&
        enquiryVisible &&
        createPortal(
          <>
            <div
              ref={backdropRef}
              className="fixed inset-0 z-[1000] bg-black/80 backdrop-blur-[6px] opacity-0"
              onClick={closeModal}
            />
            <div
              onClick={closeModal}
              ref={modalRef}
              className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[1001] w-full h-screen"
            >
              <div className="h-full">
                <div className="relative w-full h-full overflow-hidden pointer-events-none">
                  <div
                    className="absolute inset-0 overflow-y-auto pointer-events-auto overscroll-contain"
                    style={{ touchAction: "pan-y" }}
                    onWheel={(e) => e.stopPropagation()}
                    onTouchMove={(e) => e.stopPropagation()}
                  >
                    <div className="min-h-full flex items-center justify-center py-10">
                      <RegisterInterestForm onClose={closeModal} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>,
          document.body,
        )}
    </div>
  );
}
