// "use client";

// import Image from "next/image";
// import { useState, useEffect, useRef, useCallback } from "react";
// import { gsap } from "gsap";
// import { ScrollTrigger } from "gsap/ScrollTrigger";
// import CustomOutlineButton from "../../common/CustomOutlineButton";
// import { SectionHeading } from "../../animations/SectionHeading";
// import { useScrollFadeUp } from "../../../hooks/useScrollFadeUp";
// import Link from "next/link";
// import { motion } from "framer-motion";
// import { moveUp } from "../../motionVariants";
// import { OtherCommunity } from "../data";

// gsap.registerPlugin(ScrollTrigger);

// interface Slide {
//   id: number;
//   image: string;
//   title: string;
//   featured: boolean;
//   url?:string;
// }

// function useBreakpoint() {
//   const [bp, setBp] = useState<"mobile" | "desktop">("desktop");
//   useEffect(() => {
//     const update = () => setBp(window.innerWidth < 768 ? "mobile" : "desktop");
//     update();
//     window.addEventListener("resize", update);
//     return () => window.removeEventListener("resize", update);
//   }, []);
//   return bp;
// }

// type PanelPos = "left" | "center" | "right";

// export default function CommunitySlider({data,title}:{title:string,data:OtherCommunity[]}) {

// const communityTitles = [
//   "JUMEIRAH GARDEN CITY",
//   "JUMEIRAH VILLAGE CIRCLE",
//   "MEYDAN HORIZON",
//   "DUBAI SOUTH",
//   "DUBAILAND RESIDENCE COMPLEX",
//   "DUBAI ISLANDS",
//   "AL FURJAN",
// ];

// const communitySlugs = [
//   "jumeirah-garden-city",
//   "jvc",
//   "meydan-horizon",
//   "dubai-south",
//   "dubailand-residence-complex",
//   "dubai-islands",
//   "al-furjan",
// ];

// const slides = data.map((item, index) => ({
//   ...item,
//   slug: communitySlugs[index],
//   title: item.title || communityTitles[index] || "Community",
// }));

// const TOTAL = slides.length;
// function mod(n: number, m: number) {
//   return ((n % m) + m) % m;
// }

//   const [active, setActive] = useState(0);
//   const [hovered, setHovered] = useState<PanelPos | null>(null);
//   const bp = useBreakpoint();

//   const goTo = useCallback((i: number) => setActive(mod(i, TOTAL)), []);
//   const next = useCallback(() => goTo(active + 1), [active, goTo]);
//   const prev = useCallback(() => goTo(active - 1), [active, goTo]);

//   // desktop btn
//   const desktopBtnRef = useScrollFadeUp({
//     y: 40,
//     duration: 0.7,
//     start: "top 90%",
//   });
//   const csBtnRef = useScrollFadeUp({ y: 40, duration: 0.7, start: "top 90%" });
//   const [isBgActive, setIsBgActive] = useState(false);
//   // mobile — one ref per slide card
//   const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
//   const imageRefs = useRef<(HTMLDivElement | null)[]>([]);
//   const titleRefs = useRef<(HTMLHeadingElement | null)[]>([]);
//   const btnRefs = useRef<(HTMLDivElement | null)[]>([]);
//   const panelRefs = useRef<(HTMLDivElement | null)[]>([]);
//   useEffect(() => {
//     if (bp === "mobile") return;

//     const ctx = gsap.context(() => {
//       panelRefs.current.forEach((panel, i) => {
//         if (!panel) return;

//         const img = panel.querySelector("img");
//         const content = panel.querySelector(".panel-content");

//         // Panel fade + slight up
//         gsap.fromTo(
//           panel,
//           { opacity: 0, y: 40 },
//           {
//             opacity: 1,
//             y: 0,
//             duration: 0.8,
//             delay: i * 0.1,
//             ease: "power3.out",
//             scrollTrigger: { trigger: panel, start: "top 95%", once: true },
//           },
//         );

//         // Image zoom (subtle)
//         if (img) {
//           gsap.fromTo(
//             img,
//             { scale: 1.1 },
//             {
//               scale: 1,
//               duration: 1.2,
//               ease: "power3.out",
//             },
//           );
//         }

//         // Content animation
//         if (content) {
//           gsap.fromTo(
//             content,
//             { opacity: 0, y: 30 },
//             {
//               opacity: 1,
//               y: 0,
//               duration: 0.7,
//               delay: 0.2,
//               ease: "power3.out",
//             },
//           );
//         }
//       });
//     });

//     return () => ctx.revert();
//   }, [bp]);
//   useEffect(() => {
//     if (bp !== "mobile") return;

//     const ctx = gsap.context(() => {
//       slides.forEach((_, i) => {
//         const card = cardRefs.current[i];
//         const img = imageRefs.current[i];
//         const title = titleRefs.current[i];
//         const btn = btnRefs.current[i];

//         if (!card) return;

//         // image — fade + scale up
//         if (img) {
//           gsap.fromTo(
//             img,
//             { opacity: 0, scale: 1.08, y: 30 },
//             {
//               opacity: 1,
//               scale: 1,
//               y: 0,
//               duration: 0.9,
//               ease: "power3.out",
//               scrollTrigger: { trigger: card, start: "top 88%", once: true },
//             },
//           );
//         }

//         // title — slides up after image
//         if (title) {
//           gsap.fromTo(
//             title,
//             { opacity: 0, y: 28 },
//             {
//               opacity: 1,
//               y: 0,
//               duration: 0.7,
//               delay: 0.15,
//               ease: "power3.out",
//               scrollTrigger: { trigger: card, start: "top 88%", once: true },
//             },
//           );
//         }

//         // button — slides up last
//         if (btn) {
//           gsap.fromTo(
//             btn,
//             { opacity: 0, y: 20 },
//             {
//               opacity: 1,
//               y: 0,
//               duration: 0.6,
//               delay: 0.28,
//               ease: "power3.out",
//               scrollTrigger: { trigger: card, start: "top 88%", once: true },
//             },
//           );
//         }
//       });
//     });

//     return () => ctx.revert();
//   }, [bp]);

//   const panels: { pos: PanelPos; idx: number }[] =
//     bp === "mobile"
//       ? [{ pos: "center", idx: active }]
//       : [
//           { pos: "left", idx: mod(active - 1, TOTAL) },
//           { pos: "center", idx: active },
//           { pos: "right", idx: mod(active + 1, TOTAL) },
//         ];

//   const getWidth = (pos: PanelPos): string => {
//     if (bp !== "desktop") return "100%";
//     if (!hovered) return pos === "center" ? "45.4%" : "27.25%";
//     if (hovered === pos) return "45.4%";
//     return "27.25%";
//   };

//   const showActive = (pos: PanelPos): boolean => {
//     if (!hovered) return pos === "center";
//     return hovered === pos;
//   };

//   return (
//     <section data-header="dark">
//       <div className="container flex flex-col justify-center">
//         <div className="text-center">
//           <SectionHeading
//             title={title}
//             className="text-heading mb-20"
//           />

//           {/* desktop view-all */}
//           <div
//             ref={desktopBtnRef}
//             className="mb-10 lg:mb-50 w-fit  mx-auto"
//             style={{ opacity: 0 }}
//           >

//                     <Link href={'/communities'}   >
//             <CustomOutlineButton
//               className="w-fit mx-auto 2xl:!px-[35.5px] 2xl:!py-[22.5px] px-[30px] h-[44px] md:h-[50px]  xl:h-[66px]"
//               text="View All"
//               borderColor="border-primary-2"
//               textColor="text-primary-2"
//               variant="dark"
//             />
//             </Link>
//           </div>
//         </div>

//         {/* ── MOBILE LIST ── */}
//         {bp === "mobile" && (
//           <div className="flex flex-col gap-6">
//             {slides.map((slide, i) => (
//               <div
//                 key={i}
//                 ref={(el) => {
//                   cardRefs.current[i] = el;
//                 }}
//                 className="relative h-[380px] overflow-hidden"
//               >
//                 {/* image wrapper — animated separately */}
//                 <div
//                   ref={(el) => {
//                     imageRefs.current[i] = el;
//                   }}
//                   className="absolute inset-0"
//                   style={{ opacity: 0 }}
//                 >
//                   <Image
//                     src={slide.featured_image_desktop}
//                     alt={slide.featured_image_alt}
//                     fill
//                     className="object-cover"
//                   />
//                 </div>

//                 {/* gradient */}
//                 <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black z-10" />

//                 {/* text + button */}
//                 <div className="absolute inset-0 z-20 flex flex-col items-center justify-end mb-[30px] text-white text-center px-4">
//                   <h2
//                     ref={(el) => {
//                       titleRefs.current[i] = el;
//                     }}
//                     className="mb-20 text-25 font-[optima] tracking-[0.02em] text-white leading-[1.388]"
//                     style={{ opacity: 0 }}
//                   >
//                     {slide.title}
//                   </h2>

//                   <div
//                     ref={(el) => {
//                       btnRefs.current[i] = el;
//                     }}
//                     style={{ opacity: 0 }}
//                   >
//                        {/* <Link href={`${slide.slug}`}  > */}
//                       <CustomOutlineButton
//                       className="px-[30px] py-2 h-[44px] md:h-[50px]  xl:h-[66px]"
//                       text="View Community"
//                       borderColor="border-white/80"
//                       textColor="text-white"
//                       variant="dark"
//                     />
//                     {/* </Link> */}
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         )}
//       </div>

//       {/* ── DESKTOP SLIDER ── */}
//       {bp !== "mobile" && (
//         <div className="panel-content relative w-full h-[420px] md:h-[520px] lg:h-[620px] overflow-hidden">
//           <div
//             className={`flex w-full h-full justify-between transition-colors duration-500 ${
//               isBgActive ? "bg-black" : "bg-transparent"
//             }`}
//           >
//             {panels.map(({ pos, idx }) => {
//               const slide = slides[idx];
//               const active_ = showActive(pos);

//               return (
//                 <div
//                   ref={(el) => {
//                     panelRefs.current[idx] = el;
//                   }}
//                   key={`${pos}-${idx}`}
//                   onMouseEnter={() => {
//                     setHovered(pos);
//                     setIsBgActive(true);
//                   }}
//                   onMouseLeave={() => setHovered(null)}
//                   onClick={() => {
//                     if (pos === "left") prev();
//                     if (pos === "right") next();
//                   }}
//                   style={{
//                     width: getWidth(pos),
//                     transition: "width 600ms cubic-bezier(0.4,0,0.2,1)",
//                     flexShrink: 0,
//                     scale: active_ ? 1.003 : 1,
//                   }}
//                   className={` relative h-full overflow-hidden ${pos !== "center" ? "cursor-pointer" : "cursor-default"}`}
//                 >
//                   <Image
//                     src={slide.featured_image_desktop}
//                     alt={slide.featured_image_alt}
//                     fill
//                     className={`object-cover transition-transform duration-700 ease-in-out ${active_ ? "scale-105" : "scale-100"}`}
//                   />

//                   <div
//                     className={`absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0)_50.09%,#000000_100%)] transition-opacity duration-500 ${active_ ? "opacity-0" : "opacity-100"}`}
//                   />
//                   <div
//                     className={`absolute inset-0 bg-[linear-gradient(180deg,rgb(0_0_0/25%)_35.92%,#00000000_100%),linear-gradient(0deg,rgb(0_0_0/95%),rgba(0,0,0,0.5))] transition-opacity duration-500 ${active_ ? "opacity-100" : "opacity-0"}`}
//                   />

//                   {/* {slide.featured && !active_ && (
//                     <div className="absolute inset-0 bg-black/40 transition-all duration-500" />
//                   )} */}

//                   <div
//                     className={`absolute left-0 right-0 px-6 bottom-6 text-center transition-all duration-500 ${active_ ? "opacity-0 translate-y-2 pointer-events-none" : "opacity-100 translate-y-0"}`}
//                   >
//                     <h2 className="text-white font-light tracking-[2%] uppercase text-25 font-[optima]">
//                       {slide.title}
//                     </h2>
//                   </div>

//                   <div
//                     className={` absolute inset-0 flex flex-col items-center justify-center transition-all duration-500 ${active_ ? "opacity-100 translate-y-0 pointer-events-auto" : "opacity-0 translate-y-4 pointer-events-none"}`}
//                   >
//                     <h2
//                       className={`text-white font-light tracking-[2%] uppercase text-25 font-[optima] text-center px-4 transition-all duration-700 mb-10 xl:mb-[120px] ${active_ ? "translate-y-0" : "translate-y-6"}`}
//                     >
//                       {slide.title}
//                     </h2>
//                     <div>
//                        {/* <Link href={`${slide.slug}`}  > */}
//                       <CustomOutlineButton
//                         className="2xl:!px-[41px] 2xl:!py-[22.5px]"
//                         text="View Community"
//                         borderColor="border-white/80"
//                         textColor="text-white"
//                       />
//                       {/* </Link> */}
//                     </div>
//                   </div>
//                 </div>
//               );
//             })}
//           </div>
//         </div>
//       )}
//     </section>
//   );
// }

"use client";

import Image from "next/image";
import { useState, useEffect, useRef, useCallback } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import CustomOutlineButton from "../../common/CustomOutlineButton";
import { SectionHeading } from "../../animations/SectionHeading";
import { useScrollFadeUp } from "../../../hooks/useScrollFadeUp";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperType } from "swiper";
import Link from "next/link";
import "swiper/css";

gsap.registerPlugin(ScrollTrigger);

interface Slide {
  id: number;
  image: string;
  title: string;
  featured: boolean;
  url?: string;
}

function useBreakpoint() {
  const [bp, setBp] = useState<"mobile" | "desktop">("desktop");
  useEffect(() => {
    const update = () => setBp(window.innerWidth < 768 ? "mobile" : "desktop");
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);
  return bp;
}

type PanelPos = "left" | "center" | "right";

export default function CommunitySlider({
  data,
  title,
  currentItem
}: {
  title: string;
  data: any;
  currentItem:string;
}) {
  const slides = data.listing.map((item: any) => ({
    ...item,
  })).filter((item:{title:string})=>item.title !== currentItem);

  const TOTAL = slides.length;
  function mod(n: number, m: number) {
    return ((n % m) + m) % m;
  }

  const [active, setActive] = useState(0);
  const [hovered, setHovered] = useState<PanelPos | null>(null);
  const bp = useBreakpoint();

  const goTo = useCallback((i: number) => setActive(mod(i, TOTAL)), []);
  const next = useCallback(() => goTo(active + 1), [active, goTo]);
  const prev = useCallback(() => goTo(active - 1), [active, goTo]);
  const swiperRef = useRef<SwiperType | null>(null);

  const handlePrev = () => swiperRef.current?.slidePrev();
  const handleNext = () => swiperRef.current?.slideNext();

  // desktop btn
  const desktopBtnRef = useScrollFadeUp({
    y: 40,
    duration: 0.7,
    start: "top 90%",
  });
  const csBtnRef = useScrollFadeUp({ y: 40, duration: 0.7, start: "top 90%" });
  const [isBgActive, setIsBgActive] = useState(false);
  // mobile — one ref per slide card
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const imageRefs = useRef<(HTMLDivElement | null)[]>([]);
  const titleRefs = useRef<(HTMLHeadingElement | null)[]>([]);
  const btnRefs = useRef<(HTMLDivElement | null)[]>([]);
  const panelRefs = useRef<(HTMLDivElement | null)[]>([]);
  useEffect(() => {
    if (bp === "mobile") return;

    const ctx = gsap.context(() => {
      panelRefs.current.forEach((panel, i) => {
        if (!panel) return;

        const img = panel.querySelector("img");
        const content = panel.querySelector(".panel-content");

        // Panel fade + slight up
        gsap.fromTo(
          panel,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            delay: i * 0.1,
            ease: "power3.out",
            scrollTrigger: { trigger: panel, start: "top 95%", once: true },
          },
        );

        // Image zoom (subtle)
        if (img) {
          gsap.fromTo(
            img,
            { scale: 1.1 },
            {
              scale: 1,
              duration: 1.2,
              ease: "power3.out",
            },
          );
        }

        // Content animation
        if (content) {
          gsap.fromTo(
            content,
            { opacity: 0, y: 30 },
            {
              opacity: 1,
              y: 0,
              duration: 0.7,
              delay: 0.2,
              ease: "power3.out",
            },
          );
        }
      });
    });

    return () => ctx.revert();
  }, [bp]);
  useEffect(() => {
    if (bp !== "mobile") return;

    const ctx = gsap.context(() => {
      slides.forEach((_: any, i: number) => {
        const card = cardRefs.current[i];
        const img = imageRefs.current[i];
        const title = titleRefs.current[i];
        const btn = btnRefs.current[i];

        if (!card) return;

        // image — fade + scale up
        if (img) {
          gsap.fromTo(
            img,
            { opacity: 0, scale: 1.08, y: 30 },
            {
              opacity: 1,
              scale: 1,
              y: 0,
              duration: 0.9,
              ease: "power3.out",
              scrollTrigger: { trigger: card, start: "top 88%", once: true },
            },
          );
        }

        // title — slides up after image
        if (title) {
          gsap.fromTo(
            title,
            { opacity: 0, y: 28 },
            {
              opacity: 1,
              y: 0,
              duration: 0.7,
              delay: 0.15,
              ease: "power3.out",
              scrollTrigger: { trigger: card, start: "top 88%", once: true },
            },
          );
        }

        // button — slides up last
        if (btn) {
          gsap.fromTo(
            btn,
            { opacity: 0, y: 20 },
            {
              opacity: 1,
              y: 0,
              duration: 0.6,
              delay: 0.28,
              ease: "power3.out",
              scrollTrigger: { trigger: card, start: "top 88%", once: true },
            },
          );
        }
      });
    });

    return () => ctx.revert();
  }, [bp]);

  const panels: { pos: PanelPos; idx: number }[] =
    bp === "mobile"
      ? [{ pos: "center", idx: active }]
      : [
          { pos: "left", idx: mod(active - 1, TOTAL) },
          { pos: "center", idx: active },
          { pos: "right", idx: mod(active + 1, TOTAL) },
        ];

  const getWidth = (pos: PanelPos): string => {
    if (bp !== "desktop") return "100%";
    if (!hovered) return pos === "center" ? "45.4%" : "27.25%";
    if (hovered === pos) return "45.4%";
    return "27.25%";
  };

  const showActive = (pos: PanelPos): boolean => {
    if (!hovered) return pos === "center";
    return hovered === pos;
  };

  return (
    <section data-header="dark">
      <div className="container flex flex-col justify-center">
        <div className="text-center">
          <SectionHeading title={title} className="text-heading mb-20" />

          {/* desktop view-all */}
          <div
            ref={desktopBtnRef}
            className="mb-10 lg:mb-50 w-fit  mx-auto"
            style={{ opacity: 0 }}
          >
            <Link href={"/communities"}>
              <CustomOutlineButton
                className="w-fit mx-auto 2xl:!px-[35.5px] 2xl:!py-[22.5px] px-[30px] h-[44px] md:h-[50px]  xl:h-[66px]"
                text="View All"
                borderColor="border-primary-2"
                textColor="text-primary-2"
                variant="dark"
              />
            </Link>
          </div>
        </div>

        {/* ── MOBILE LIST ── */}
        {/* {bp === "mobile" && (
          <div className="flex flex-col gap-6">
            {slides.map((slide: any, i: number) => (
              <div
                key={i}
                ref={(el) => {
                  cardRefs.current[i] = el;
                }}
                className="relative h-[380px] overflow-hidden"
              >
                <div
                  ref={(el) => {
                    imageRefs.current[i] = el;
                  }}
                  className="absolute inset-0"
                  style={{ opacity: 0 }}
                >
                  <Image
                    src={slide.featured_image_desktop}
                    alt={slide.featured_image_alt}
                    fill
                    className="object-cover"
                  />
                </div>

                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black z-10 opacity-40 xl:opacity-100" />

                <div className="absolute inset-0 z-20 flex flex-col items-center justify-end mb-[30px] text-white text-center px-4">
                  <h2
                    ref={(el) => {
                      titleRefs.current[i] = el;
                    }}
                    className="mb-20 text-25 font-[optima] tracking-[0.02em] text-white leading-[1.388]"
                    style={{ opacity: 0 }}
                  >
                    {slide.title}
                  </h2>

                  <div
                    ref={(el) => {
                      btnRefs.current[i] = el;
                    }}
                    style={{ opacity: 0 }}
                  >
                    <Link href={`${slide.slug}`}>
                      <CustomOutlineButton
                        className="px-[30px] py-2 h-[44px] md:h-[50px]  xl:h-[66px]"
                        text="View Community"
                        borderColor="border-white/80"
                        textColor="text-white"
                        variant="dark"
                      />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )} */}

        {bp === "mobile" && (
          <>
            <Swiper
              onSwiper={(swiper) => {
                swiperRef.current = swiper;
              }}
              slidesPerView={1}
              speed={600}
              spaceBetween={20}
              className="!w-full !overflow-hidden"
            >
              {slides.map((slide: any, i: number) => (
                <SwiperSlide key={i}>
                  <div
                    ref={(el) => {
                      cardRefs.current[i] = el;
                    }}
                    className="relative h-[380px] overflow-hidden w-full"
                  >
                    {/* image wrapper — animated separately */}
                    <div
                      ref={(el) => {
                        imageRefs.current[i] = el;
                      }}
                      className="absolute inset-0"
                      style={{ opacity: 0 }}
                    >
                      <Image
                        src={slide.featured_image_desktop}
                        alt={slide.featured_image_alt}
                        fill
                        className="object-cover"
                      />
                    </div>

                    <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black z-10 opacity-30 xl:opacity-100" />

                    <div className="absolute inset-0 z-20 flex flex-col items-center justify-end mb-[30px] text-white text-center px-4">
                      <h2
                        ref={(el) => {
                          titleRefs.current[i] = el;
                        }}
                        className="mb-20 text-25 font-[optima] tracking-[0.02em] text-white leading-[1.388]"
                        style={{ opacity: 0 }}
                      >
                        {slide.title}
                      </h2>

                      <div
                        ref={(el) => {
                          btnRefs.current[i] = el;
                        }}
                        style={{ opacity: 0 }}
                      >
                        <Link href={`${slide.slug}`} onClick={(e) => e.stopPropagation()}>
                          <CustomOutlineButton
                            className="px-[30px] py-2 h-[44px] md:h-[50px] xl:h-[66px]"
                            text="View Community"
                            borderColor="border-white/80"
                            textColor="text-white"
                            variant="dark"
                          />
                        </Link>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>

            <div className="flex items-center justify-center gap-4 mt-6">
              <button
                aria-label="Previous slide"
                onClick={handlePrev}
                className="relative cursor-pointer w-[50px] h-[50px] 3xl:w-[62px] 3xl:h-[62px] group  border border-[#404040] rounded-[50px] flex items-center justify-center overflow-hidden"
              >
                <span className="absolute left-0 top-0 h-full w-0 bg-white/30 transition-all duration-300 group-hover:w-full z-0" />
                <Image
                  src="/icons/left_arrow_slider_primary.svg"
                  alt="Prev"
                  width={28}
                  height={28}
                  className="relative z-10  object-contain 3xl:w-[28px] 3xl:h-[28px] lg:w-[22px] lg:h-[22px] w-[21px] h-[21px] group-hover:invert group-hover:brightness-0 transition-colors duration-300"
                />
              </button>

              <button
                aria-label="Next slide"
                onClick={handleNext}
                className="relative cursor-pointer w-[50px] h-[50px] 3xl:w-[62px] 3xl:h-[62px] group  border border-[#404040] rounded-[50px] flex items-center justify-center overflow-hidden"
              >
                <span className="absolute left-0 top-0 h-full w-0 bg-white/30 transition-all duration-300 group-hover:w-full z-0" />
                <Image
                  src="/icons/left_arrow_slider_primary.svg"
                  alt="Next"
                  width={28}
                  height={28}
                  className="relative z-10 rotate-180 object-contain 3xl:w-[28px] 3xl:h-[28px] lg:w-[22px] lg:h-[22px] w-[20px] h-[20px] group-hover:invert group-hover:brightness-0 transition-colors duration-300"
                />
              </button>
            </div>
          </>
        )}
      </div>

      {/* ── DESKTOP SLIDER ── */}
      {bp !== "mobile" && (
        <div className="panel-content relative w-full h-[420px] md:h-[520px] lg:h-[620px] overflow-hidden">
          <div
            className={`flex w-full h-full justify-between transition-colors duration-500 ${
              isBgActive ? "bg-black" : "bg-transparent"
            }`}
          >
            {panels.map(({ pos, idx }) => {
              const slide = slides[idx];
              const active_ = showActive(pos);

              return (
                <div
                  ref={(el) => {
                    panelRefs.current[idx] = el;
                  }}
                  key={`${pos}-${idx}`}
                  onMouseEnter={() => {
                    setHovered(pos);
                    setIsBgActive(true);
                  }}
                  onMouseLeave={() => setHovered(null)}
                  onClick={() => {
                    if (pos === "left") prev();
                    if (pos === "right") next();
                  }}
                  style={{
                    width: getWidth(pos),
                    transition: "width 600ms cubic-bezier(0.4,0,0.2,1)",
                    flexShrink: 0,
                    scale: active_ ? 1.003 : 1,
                  }}
                  className={` relative h-full overflow-hidden ${pos !== "center" ? "cursor-pointer" : "cursor-default"}`}
                >
                  <Image
                    src={slide.featured_image_desktop}
                    alt={slide.featured_image_alt}
                    fill
                    className={`object-cover transition-transform duration-700 ease-in-out ${active_ ? "scale-105" : "scale-100"}`}
                  />

                  <div
                    className={`absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0)_50.09%,#000000_100%)] transition-opacity duration-500 ${active_ ? "opacity-0" : "opacity-100"}`}
                  />
                  <div
                    className={`absolute inset-0 bg-[linear-gradient(180deg,rgb(0_0_0/25%)_35.92%,#00000000_100%),linear-gradient(0deg,rgb(0_0_0/95%),rgba(0,0,0,0.5))] transition-opacity duration-500 ${active_ ? "opacity-100" : "opacity-0"}`}
                  />

                  {/* {slide.featured && !active_ && (
                    <div className="absolute inset-0 bg-black/40 transition-all duration-500" />
                  )} */}

                  <div
                    className={`absolute left-0 right-0 px-6 bottom-6 text-center transition-all duration-500 ${active_ ? "opacity-0 translate-y-2 pointer-events-none" : "opacity-100 translate-y-0"}`}
                  >
                    <h2 className="text-white font-light tracking-[2%] uppercase text-25 font-[optima]">
                      {slide.title}
                    </h2>
                  </div>

                  <div
                    className={` absolute inset-0 flex flex-col items-center justify-center transition-all duration-500 ${active_ ? "opacity-100 translate-y-0 pointer-events-auto" : "opacity-0 translate-y-4 pointer-events-none"}`}
                  >
                    <h2
                      className={`text-white font-light tracking-[2%] uppercase text-25 font-[optima] text-center px-4 transition-all duration-700 mb-10 xl:mb-[120px] ${active_ ? "translate-y-0" : "translate-y-6"}`}
                    >
                      {slide.title}
                    </h2>
                    <div>
                      <Link href={`${slide.slug}`} onClick={(e) => e.stopPropagation()}>
                        <CustomOutlineButton
                          className="2xl:!px-[41px] 2xl:!py-[22.5px]"
                          text="View Community"
                          borderColor="border-white/80"
                          textColor="text-white"
                        />
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </section>
  );
}
