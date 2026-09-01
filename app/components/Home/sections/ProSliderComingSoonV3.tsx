// "use client";

// import React, { useState, useRef, useEffect } from "react";
// import Image from "next/image";
// import { Swiper, SwiperSlide } from "swiper/react";
// import { EffectFade, Navigation, Autoplay } from "swiper/modules";
// import { motion, AnimatePresence, useInView } from "framer-motion";
// import CustomOutlineButton from "../../common/CustomOutlineButton";
// import { createPortal } from "react-dom";
// import RegisterInterestForm from "@/app/components/Home/sections/RegisterInterestForm";
// // import type { Swiper as SwiperType } from "swiper";
// import gsap from "gsap";
// import { ScrollTrigger } from "gsap/ScrollTrigger";

// type AuthView = "enquiry";
// gsap.registerPlugin(ScrollTrigger);

// import "swiper/css";
// import "swiper/css/navigation";

// import { moveUpExit } from "../../motionVariants";
// import Link from "next/link";

// export interface feats {
//   icon: string;
//   label: string;
// }

// export interface SlideData {
//   title: string;
//   desktopVideo: string;
//   mobileVideo: string;
// }

// type HeroSliderProps = {
//   slides: SlideData[];
//   RightLabel?: string;
//   video:string;
//   title:string;
//   buttonText:string;
//   url:string;
// };

// // -----------------------------------------------------
// // Shared motion variants
// // -----------------------------------------------------
// const fadeUp = {
//   hidden: { opacity: 0, y: 40 },
//   show: (d: number = 0) => ({
//     opacity: 1,
//     y: 0,
//     transition: { duration: 0.7, delay: d },
//   }),
//   exit: moveUpExit.exit,
// };

// export default function HeroSlider({ slides, RightLabel,video,title,buttonText,url }: HeroSliderProps) {
//   const [authView, setAuthView] = useState<AuthView | null>(null);
//   const [isModalVisible, setIsModalVisible] = useState(false);
//   const [mounted, setMounted] = useState(false);
//   // 👇 Only render portal after client mount
//   useEffect(() => {
//     setMounted(true);
//   }, []);

//   const backdropRef = useRef<HTMLDivElement>(null);
//   const modalRef = useRef<HTMLDivElement>(null);

//   // ── GSAP open animation
//   useEffect(() => {
//     if (!isModalVisible) return;

//     requestAnimationFrame(() => {
//       if (!backdropRef.current || !modalRef.current) return;

//       gsap.fromTo(
//         backdropRef.current,
//         { opacity: 0 },
//         { opacity: 1, duration: 0.5, ease: "power2.out" },
//       );

//       gsap.fromTo(
//         modalRef.current,
//         {
//           opacity: 0,
//           scale: 1.08,
//           filter: "blur(8px)",
//           transformOrigin: "center center",
//         },
//         {
//           opacity: 1,
//           scale: 1,
//           filter: "blur(0px)",
//           duration: 0.55,
//           ease: "power3.out",
//         },
//       );
//     });
//   }, [isModalVisible]);

//   // ── GSAP close animation
//   const closeAuth = () => {
//     if (!backdropRef.current || !modalRef.current) return;

//     gsap.to(backdropRef.current, {
//       opacity: 0,
//       duration: 0.3,
//       ease: "power2.in",
//     });

//     gsap.to(modalRef.current, {
//       opacity: 0,
//       scale: 1.06,
//       filter: "blur(16px)",
//       duration: 0.5,
//       ease: "power3.out",
//       onComplete: () => {
//         setAuthView(null);
//         setIsModalVisible(false); // unmount after animation done
//       },
//     });
//   };

//   const [activeIndex, setActiveIndex] = useState(0);
//   // const [swiperInstance, setSwiperInstance] = useState<SwiperType | null>(null);

//   // -------- VIEWPORT TRIGGER --------
//   const rootRef = useRef(null);
//   const inView = useInView(rootRef, { once: true, amount: 0.4 });

//   //   const sectionRef = useRef<HTMLDivElement>(null);

//   // per-slide refs
//   const wrapRefs = useRef<HTMLDivElement[]>([]);
//   const imgRefs = useRef<HTMLVideoElement[]>([]);

//   const setWrapRef = (el: HTMLDivElement | null, i: number) => {
//     if (el) wrapRefs.current[i] = el;
//   };

//   const setImgRef = (el: HTMLVideoElement | null, i: number) => {
//     if (el) imgRefs.current[i] = el;
//   };

//   const initGSAP = () => {
//     const section = rootRef.current;
//     if (!section) return;

//     const ctx = gsap.context(() => {
//       wrapRefs.current.forEach((wrapper, i) => {
//         const img = imgRefs.current[i];

//         console.log(img);
//         if (!wrapper || !img) return;

//         gsap.fromTo(
//           img,
//           { y: "-25vh" },
//           {
//             y: "25vh",
//             ease: "none",
//             scrollTrigger: {
//               trigger: wrapper,
//               scrub: true,
//               start: "top bottom",
//               end: "bottom top",
//             },
//           },
//         );
//       });
//     });

//     ScrollTrigger.refresh();
//     return () => ctx.revert();
//   };

//   // Wait for "homeAnimationsReady"
//   useEffect(() => {
//     const listener = () => initGSAP();
//     window.addEventListener("homeAnimationsReady", listener);
//     return () => window.removeEventListener("homeAnimationsReady", listener);
//   }, []);

//   return (
//     <div className="w-full relative h-[100svh] bg-white" ref={rootRef}>
//       <Swiper
//         effect="fade"
//         fadeEffect={{ crossFade: true }}
//         slidesPerView={1}
//         loop
//         modules={[EffectFade, Autoplay, Navigation]}
//         autoplay={{ delay: 3500, disableOnInteraction: false }}
//         // onSwiper={setSwiperInstance}
//         navigation={{ nextEl: ".swiper-btn-next", prevEl: ".swiper-btn-prev" }}
//         className="w-full swiper-fade h-full"
//         onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
//       >
//         {slides.map((slide, index) => (
//           <SwiperSlide key={index}>
//             <div className="relative w-full h-full flex flex-col justify-center items-center">
//               {/* -------------------------------- VIDEO BG -------------------------------- */}
//               <div
//                 className="absolute inset-0 -z-10 overflow-hidden"
//                 ref={(el) => setWrapRef(el, index)}
//               >
//                 <video
//                   ref={(el) => setImgRef(el as HTMLVideoElement, index)}
//                   src={video}
//                   autoPlay
//                   loop
//                   muted
//                   playsInline
//                   className="w-full h-full object-cover scale-[1.08] hidden md:block"
//                 />
//                 <video
//                   ref={(el) => setImgRef(el as HTMLVideoElement, index)}
//                   src={slide.mobileVideo}
//                   autoPlay
//                   loop
//                   muted
//                   playsInline
//                   className="w-full h-full object-cover scale-[1.08] md:hidden"
//                 />
//                 <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.5)_0%,rgba(0,0,0,0.5)_100%)]" />
//               </div>

//               {/* -------------------------------- TOP AREA -------------------------------- */}
//               <div className="container px-4 md:px-6 lg:px-10 w-full overflow-hidden flex flex-col items-center justify-center">
//                 <AnimatePresence mode="wait">
//                   <motion.div
//                     key={`top-${activeIndex}`}
//                     initial="hidden"
//                     animate={inView ? "show" : "hidden"}
//                     exit="exit"
//                     className="flex flex-col justify-between items-center "
//                   >
//                     {/* Title */}
//                     <div className="overflow-hidden">
//                       <motion.h1
//                         variants={fadeUp}
//                         // custom={0.3}
//                         custom={0.2}
//                         initial="hidden"
//                         animate={inView ? "show" : "hidden"}
//                         className="text-white  uppercase text-heading text-center"
//                       >
//                         {title}
//                       </motion.h1>
//                     </div>

//                     <motion.div
//                       key={`btns-${activeIndex}`}
//                       initial="hidden"
//                       animate={inView ? "show" : "hidden"}
//                       exit="exit"
//                       className="flex gap-4 mt-5 md:mt-15 font-[avenirRoman] overflow-hidden"
//                     >
//                       {/* <motion.div
//                         variants={fadeUp}
//                         // custom={0.3}
//                         custom={0.23}
//                         initial="hidden"
//                         animate={inView ? "show" : "hidden"}
//                       >
//                         <CustomOutlineButton
//                           onClick={() => {
//                             setAuthView("enquiry");
//                             setIsModalVisible(true);
//                           }}
//                           text="Register Interest"
//                           borderColor="border-white"
//                           textColor="text-white"
//                           px="px-[30px] md:px-[25px] h-[44px] md:h-[50px]  xl:h-[66px] !leading-[1.58]"
//                         />
//                       </motion.div> */}

//                       <motion.div
//                         variants={fadeUp}
//                         // custom={0.3}
//                         custom={0.23}
//                         initial="hidden"
//                         animate={inView ? "show" : "hidden"}
//                       >
//                         <Link href={url}>
//                         <CustomOutlineButton
//                           text={buttonText}
//                           borderColor="border-white"
//                           textColor="text-white"
//                           px="px-[30px] md:px-[25px] h-[44px] md:h-[50px]  xl:h-[66px] !leading-[1.58]"
//                         />
//                         </Link>
//                       </motion.div>

//                     </motion.div>
//                   </motion.div>
//                 </AnimatePresence>
//               </div>
//             </div>
//           </SwiperSlide>
//         ))}
//       </Swiper>

//       {mounted &&
//         createPortal(
//           <>
//             {isModalVisible && (
//               <>
//                 {/* Backdrop */}
//                 <div
//                   ref={backdropRef}
//                   className="fixed inset-0 bg-black/80 z-[1000] cursor-pointer"
//                   onClick={closeAuth}
//                 />

//                 {/* Modal */}
//                 <div
//                   onClick={closeAuth}
//                   ref={modalRef}
//                   className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[1001] w-full h-screen"
//                 >
//                   <div className="h-full">
//                     <div className="relative w-full h-full overflow-hidden pointer-events-none">
//                       <div
//                         className="absolute inset-0 overflow-y-auto pointer-events-auto"
//                         onWheel={(e) => e.stopPropagation()}
//                         onTouchMove={(e) => e.stopPropagation()}
//                       >
//                         <div className="min-h-full flex items-center justify-center py-10">
//                           <RegisterInterestForm onClose={closeAuth} />
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </>
//             )}
//           </>,
//           document.body,
//         )}

//       {/* -------------------------------- ARROWS  -------------------------------- */}
//       {slides.length > 1 && (
//         <motion.div
//           variants={fadeUp}
//           custom={0.5}
//           initial="hidden"
//           animate={inView ? "show" : "hidden"}
//           exit="exit"
//           className="absolute top-[46%] left-0 w-full z-[60]"
//         >
//           <div className="container flex items-center justify-between">
//             {/* Prev */}
//             <button
//               aria-label="Previous slide"
//               className="swiper-btn-prev relative w-[62px] group h-[62px] border border-white rounded-[50px] flex items-center justify-center overflow-hidden"
//             >
//               <span className="absolute left-0 top-0 h-full w-0 bg-white/30 transition-all duration-300 group-hover:w-full z-0" />
//               <Image
//                 src="/icons/left_arrow_slider_primary.svg"
//                 alt="Next"
//                 width={28}
//                 height={28}
//                 className="relative z-10 object-contain w-[28px] h-[28px] invert brightness-0 group-hover:invert-0 group-hover:brightness-100 transition-all duration-300"
//               />
//             </button>
//             {/* Pagination Dots */}
//             {/* Next */}
//             <button
//               aria-label="Next slide"
//               className="swiper-btn-next relative w-[62px] group h-[62px] border border-white rounded-[50px] flex items-center justify-center overflow-hidden"
//             >
//               <span className="absolute left-0 top-0 h-full w-0 bg-white/30 transition-all duration-300 group-hover:w-full z-0" />
//               <Image
//                 src="/icons/left_arrow_slider_primary.svg"
//                 alt="Next"
//                 width={28}
//                 height={28}
//                 className="relative rotate-180 z-10 object-contain w-[28px] h-[28px] invert brightness-0 group-hover:invert-0 group-hover:brightness-100 transition-all duration-300"
//               />
//             </button>
//           </div>
//         </motion.div>
//       )}
//     </div>
//   );
// }

"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectFade, Navigation, Autoplay } from "swiper/modules";
import { motion, AnimatePresence, useInView } from "framer-motion";
import CustomOutlineButton from "../../common/CustomOutlineButton";
import { createPortal } from "react-dom";
import RegisterInterestForm from "@/app/components/Home/sections/RegisterInterestForm";
// import type { Swiper as SwiperType } from "swiper";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

type AuthView = "enquiry";
gsap.registerPlugin(ScrollTrigger);

import "swiper/css";
import "swiper/css/navigation";

import { moveUpExit } from "../../motionVariants";
import Link from "next/link";

export interface feats {
  icon: string;
  label: string;
}

export interface SlideData {
  title: string;
  desktopVideo: string;
  mobileVideo: string;
}

type HeroSliderProps = {
  slides: SlideData[];
  RightLabel?: string;
  video: string;
  title: string;
  buttonText: string;
  url: string;
};

// -----------------------------------------------------
// Shared motion variants
// -----------------------------------------------------
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
  video,
  title,
  buttonText,
  url,
}: HeroSliderProps) {
  const [authView, setAuthView] = useState<AuthView | null>(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [mounted, setMounted] = useState(false);
  // 👇 Only render portal after client mount
  useEffect(() => {
    setMounted(true);
  }, []);

  const backdropRef = useRef<HTMLDivElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);

  // ── GSAP open animation
  useEffect(() => {
    if (!isModalVisible) return;

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
  }, [isModalVisible]);

  // ── GSAP close animation
  const closeAuth = () => {
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
        setAuthView(null);
        setIsModalVisible(false); // unmount after animation done
      },
    });
  };

  const [activeIndex, setActiveIndex] = useState(0);
  // const [swiperInstance, setSwiperInstance] = useState<SwiperType | null>(null);

  // -------- VIEWPORT TRIGGER --------
  const rootRef = useRef(null);
  const inView = useInView(rootRef, { once: true, amount: 0.4 });

  return (
    <div className="w-full relative h-[100svh] bg-white" ref={rootRef}>
      <Swiper
        effect="fade"
        fadeEffect={{ crossFade: true }}
        slidesPerView={1}
        loop
        modules={[EffectFade, Autoplay, Navigation]}
        autoplay={{ delay: 3500, disableOnInteraction: false }}
        // onSwiper={setSwiperInstance}
        navigation={{ nextEl: ".swiper-btn-next", prevEl: ".swiper-btn-prev" }}
        className="w-full swiper-fade h-full"
        onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            <div className="relative w-full h-full flex flex-col justify-center items-center">
              {/* -------------------------------- VIDEO BG -------------------------------- */}
              <div className="absolute inset-0 -z-10 overflow-hidden">
                <video
                  src={video}
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="w-full h-full object-cover scale-[1.08] hidden md:block"
                />
                <video
                  src={video}
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="w-full h-full object-cover scale-[1.08] md:hidden"
                />
                <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.5)_0%,rgba(0,0,0,0.5)_100%)]" />
              </div>

              {/* -------------------------------- TOP AREA -------------------------------- */}
              <div className="container px-4 md:px-6 lg:px-10 w-full overflow-hidden flex flex-col items-center justify-center">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={`top-${activeIndex}`}
                    initial="hidden"
                    animate={inView ? "show" : "hidden"}
                    exit="exit"
                    className="flex flex-col justify-between items-center "
                  >
                    {/* Title */}
                    <div className="overflow-hidden">
                      <motion.h1
                        variants={fadeUp}
                        // custom={0.3}
                        custom={0.2}
                        initial="hidden"
                        animate={inView ? "show" : "hidden"}
                        className="text-white  uppercase text-heading text-center"
                      >
                        {title}
                      </motion.h1>
                    </div>

                    <motion.div
                      key={`btns-${activeIndex}`}
                      initial="hidden"
                      animate={inView ? "show" : "hidden"}
                      exit="exit"
                      className="flex gap-4 mt-5 md:mt-15 font-[avenirRoman] overflow-hidden"
                    >
                      {/* <motion.div
                        variants={fadeUp}
                        // custom={0.3}
                        custom={0.23}
                        initial="hidden"
                        animate={inView ? "show" : "hidden"}
                      >
                        <CustomOutlineButton
                          onClick={() => {
                            setAuthView("enquiry");
                            setIsModalVisible(true);
                          }}
                          text="Register Interest"
                          borderColor="border-white"
                          textColor="text-white"
                          px="px-[30px] md:px-[25px] h-[44px] md:h-[50px]  xl:h-[66px] !leading-[1.58]"
                        />
                      </motion.div> */}

                      <motion.div
                        variants={fadeUp}
                        // custom={0.3}
                        custom={0.23}
                        initial="hidden"
                        animate={inView ? "show" : "hidden"}
                      >
                        <Link href={url} target="_blank">
                          <CustomOutlineButton
                            text={buttonText}
                            borderColor="border-white"
                            textColor="text-white"
                            px="px-[30px] md:px-[25px] h-[44px] md:h-[50px]  xl:h-[66px] !leading-[1.58]"
                          />
                        </Link>
                      </motion.div>
                    </motion.div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {mounted &&
        createPortal(
          <>
            {isModalVisible && (
              <>
                {/* Backdrop */}
                <div
                  ref={backdropRef}
                  className="fixed inset-0 bg-black/80 z-[1000] cursor-pointer"
                  onClick={closeAuth}
                />

                {/* Modal */}
                <div
                  onClick={closeAuth}
                  ref={modalRef}
                  className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[1001] w-full h-screen"
                >
                  <div className="h-full">
                    <div className="relative w-full h-full overflow-hidden pointer-events-none">
                      <div
                        className="absolute inset-0 overflow-y-auto pointer-events-auto"
                        onWheel={(e) => e.stopPropagation()}
                        onTouchMove={(e) => e.stopPropagation()}
                      >
                        <div className="min-h-full flex items-center justify-center py-10">
                          <RegisterInterestForm onClose={closeAuth} />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )}
          </>,
          document.body,
        )}

      {/* -------------------------------- ARROWS  -------------------------------- */}
      {slides.length > 1 && (
        <motion.div
          variants={fadeUp}
          custom={0.5}
          initial="hidden"
          animate={inView ? "show" : "hidden"}
          exit="exit"
          className="absolute top-[46%] left-0 w-full z-[60]"
        >
          <div className="container flex items-center justify-between">
            {/* Prev */}
            <button
              aria-label="Previous slide"
              className="swiper-btn-prev cursor-pointer relative w-[62px] group h-[62px] border border-white rounded-[50px] flex items-center justify-center overflow-hidden"
            >
              <span className="absolute left-0 top-0 h-full w-0 bg-white/30 transition-all duration-300 group-hover:w-full z-0" />
              <Image
                src="/icons/left_arrow_slider_primary.svg"
                alt="Next"
                width={28}
                height={28}
                className="relative z-10 object-contain w-[28px] h-[28px] invert brightness-0 group-hover:invert-0 group-hover:brightness-100 transition-all duration-300"
              />
            </button>
            {/* Pagination Dots */}
            {/* Next */}
            <button
              aria-label="Next slide"
              className="swiper-btn-next cursor-pointer relative w-[62px] group h-[62px] border border-white rounded-[50px] flex items-center justify-center overflow-hidden"
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
    </div>
  );
}
