// "use client";

// import { useState, useRef, useEffect } from "react";
// import { Swiper, SwiperSlide } from "swiper/react";
// import { Pagination, EffectFade, Autoplay } from "swiper/modules";
// import type { Swiper as SwiperType } from "swiper";
// import Image from "next/image";
// import gsap from "gsap";
// import { ScrollTrigger } from "gsap/ScrollTrigger";
// import { useParallax } from "@/app/hooks/useParallax";

// import "swiper/css";
// import "swiper/css/navigation";
// import "swiper/css/pagination";
// import "swiper/css/effect-fade";
// import { GalleryItem } from "../data";

// gsap.registerPlugin(ScrollTrigger);

// type TabType = "interior" | "exterior";

// function SlideContent({
//   src,
//   alt,
//   parallaxY,
// }: {
//   src: string;
//   alt: string;
//   parallaxY: number;
// }) {
//   return (
//     <div className="relative w-full h-full">
//       <Image
//         src={src}
//         alt={alt}
//         fill
//         className="object-cover"
//         priority
//         sizes="100vw"
//         style={{ transform: `scale(1.15) translateY(${parallaxY}vh)` }}
//       />
//       {/* <div
//         className="absolute inset-0"
//         style={{
//           background:
//             "radial-gradient(ellipse at center, transparent 0%, rgba(0,0,0,0.45) 100%)",
//         }}
//       /> */}
//       <div
//         className="absolute inset-x-0 bottom-0 h-full"
//         style={{
//           background:
//             "linear-gradient(180deg, rgba(0, 0, 0, 0) 52.5%, rgba(0, 0, 0, 0.8) 100%)",
//         }}
//       />
//     </div>
//   );
// }

// function TabSwiper({
//   slides,
//   paginationRef,
//   swiperRef,
//   parallaxY,
// }: {
//   slides: GalleryItem[];
//   paginationRef: React.RefObject<HTMLDivElement | null>;
//   swiperRef: React.MutableRefObject<SwiperType | null>;
//   parallaxY: number;
// }) {
//   return (
//     <Swiper
//       modules={[Pagination, EffectFade, Autoplay]}
//       effect="fade"
//       fadeEffect={{ crossFade: true }}
//       allowTouchMove={true}
//       pagination={{
//         clickable: true,
//         el: paginationRef.current,
//       }}
//       onBeforeInit={(swiper) => {
//         // @ts-expect-error swiper pagination type
//         swiper.params.pagination.el = paginationRef.current;
//       }}
//       onSwiper={(swiper) => {
//         swiperRef.current = swiper;
//         swiper.pagination.render();
//         swiper.pagination.update();
//       }}
//       // autoplay={{
//       //   delay: 4500,
//       //   disableOnInteraction: false,
//       //   waitForTransition: false,
//       //   pauseOnMouseEnter: true,
//       // }}
//       loop={slides.length > 1}
//       speed={300}
//       className="w-full h-full"
//     >
//       {slides?.map((slide, index) => (
//         <SwiperSlide key={index} className="relative w-full h-full">
//           <SlideContent
//             src={slide.image_url}
//             alt={slide.caption}
//             parallaxY={parallaxY}
//           />
//         </SwiperSlide>
//       ))}
//     </Swiper>
//   );
// }

// export default function GallerySlider({ data }: { data: GalleryItem[] }) {
//   console.log(data, "hi");
//   const INTERIOR_SLIDES = data?.filter((item) => item.caption == "Interior");

//   const EXTERIOR_SLIDES = data?.filter((item) => item.caption == "Exterior");

//   const [activeTab, setActiveTab] = useState<TabType>("interior");
//   const [mounted, setMounted] = useState(false);

//   const { ref: parallaxRef, parallaxY } = useParallax(15);

//   const sectionRef = useRef<HTMLElement>(null);
//   const swiperWrapperRef = useRef<HTMLDivElement>(null);
//   const navButtonsRef = useRef<HTMLDivElement>(null);
//   const interiorPaginationRef = useRef<HTMLDivElement>(null);
//   const exteriorPaginationRef = useRef<HTMLDivElement>(null);

//   const interiorSwiperRef = useRef<SwiperType | null>(null);
//   const exteriorSwiperRef = useRef<SwiperType | null>(null);

//   const handlePrev = () => {
//     const swiper =
//       activeTab === "interior"
//         ? interiorSwiperRef.current
//         : exteriorSwiperRef.current;
//     if (!swiper) return;
//     swiper.animating = false; // ← ADD THIS
//     swiper.slidePrev(300);
//   };

//   const handleNext = () => {
//     const swiper =
//       activeTab === "interior"
//         ? interiorSwiperRef.current
//         : exteriorSwiperRef.current;
//     if (!swiper) return;
//     swiper.animating = false; // ← ADD THIS
//     swiper.slideNext(300);
//   };

//   useEffect(() => {
//     setMounted(true);
//   }, []);

//   useEffect(() => {
//     if (!sectionRef.current || !mounted) return;

//     ScrollTrigger.getAll().forEach((t) => {
//       if (t.vars.id === "gallery-scroll") t.kill();
//     });

//     const tl = gsap.timeline({
//       scrollTrigger: {
//         trigger: sectionRef.current,
//         start: "top 70%",
//         end: "top 20%",
//         toggleActions: "play none none none",
//         id: "gallery-scroll",
//       },
//     });

//     if (swiperWrapperRef.current) {
//       tl.fromTo(
//         swiperWrapperRef.current,
//         { opacity: 0, scale: 0.98 },
//         { opacity: 1, scale: 1, duration: 1, ease: "power2.out" },
//         0,
//       );
//     }

//     if (navButtonsRef.current) {
//       const allButtons = navButtonsRef.current.querySelectorAll("button");
//       if (allButtons[0])
//         tl.fromTo(
//           allButtons[0],
//           { opacity: 0, x: -50 },
//           { opacity: 1, x: 0, duration: 0.7, ease: "power2.out" },
//           0.2,
//         );
//       if (allButtons[1])
//         tl.fromTo(
//           allButtons[1],
//           { opacity: 0, x: 50 },
//           { opacity: 1, x: 0, duration: 0.7, ease: "power2.out" },
//           0.2,
//         );
//     }

//     return () => {
//       tl.kill();
//       ScrollTrigger.getAll().forEach((t) => {
//         if (t.vars.id === "gallery-scroll") t.kill();
//       });
//     };
//   }, [mounted]);

//   return (
//     <section
//       ref={sectionRef}
//       className="gallery-slider-root relative w-full overflow-hidden h-[90vh] 2xl:h-screen bg-[#0e0e0e] cursor-grab"
//     >
//       {/* ── Swiper layer ── */}
//       <div ref={swiperWrapperRef} className="absolute inset-0">
//         {mounted && (
//           <>
//             {/* Interior — always mounted, toggle visibility */}
//             <div
//               className="absolute inset-0 transition-opacity duration-700"
//               style={{
//                 opacity: activeTab === "interior" ? 1 : 0,
//                 pointerEvents: activeTab === "interior" ? "auto" : "none",
//               }}
//             >
//               <TabSwiper
//                 slides={INTERIOR_SLIDES}
//                 paginationRef={interiorPaginationRef}
//                 swiperRef={interiorSwiperRef}
//                 parallaxY={parallaxY}
//               />
//             </div>

//             {/* Exterior — always mounted, toggle visibility */}
//             <div
//               className="absolute inset-0 transition-opacity duration-700"
//               style={{
//                 opacity: activeTab === "exterior" ? 1 : 0,
//                 pointerEvents: activeTab === "exterior" ? "auto" : "none",
//               }}
//             >
//               <TabSwiper
//                 slides={EXTERIOR_SLIDES}
//                 paginationRef={exteriorPaginationRef}
//                 swiperRef={exteriorSwiperRef}
//                 parallaxY={parallaxY}
//               />
//             </div>
//           </>
//         )}
//       </div>

//       {/* ── Nav arrows ── */}
//       <div
//         ref={navButtonsRef}
//         className="container absolute inset-0 h-full pointer-events-none"
//       >
//         <button
//           onClick={handlePrev}
//           className="pointer-events-auto absolute left-6 top-1/2 -translate-y-1/2 z-20 w-[50px] h-[50px] 3xl:w-[62px] 3xl:h-[62px] cursor-pointer group rounded-[50px] flex items-center justify-center overflow-hidden border border-white"
//           aria-label="Previous slide"
//         >
//           <span className="absolute top-0 left-0 h-full w-0 transition-all duration-300 group-hover:w-full z-0 bg-white/30" />
//           <Image
//             src="/icons/left_arrow_slider_primary.svg"
//             alt="Prev"
//             width={28}
//             height={28}
//             className="relative z-10 object-contain 3xl:w-[28px] 3xl:h-[28px] lg:w-[22px] lg:h-[22px] w-[21px] h-[21px] transition-all duration-300 invert brightness-0 group-hover:brightness-100 group-hover:invert-0"
//           />
//         </button>

//         <button
//           onClick={handleNext}
//           className="pointer-events-auto absolute right-6 top-1/2 -translate-y-1/2 z-20 w-[50px] h-[50px] 3xl:w-[62px] 3xl:h-[62px] cursor-pointer group rounded-[50px] flex items-center justify-center overflow-hidden border border-white"
//           aria-label="Next slide"
//         >
//           <span className="absolute top-0 left-0 h-full w-0 transition-all duration-300 group-hover:w-full z-0 bg-white/30" />
//           <Image
//             src="/icons/left_arrow_slider_primary.svg"
//             alt="Next"
//             width={28}
//             height={28}
//             className="relative z-10 object-contain 3xl:w-[28px] 3xl:h-[28px] lg:w-[22px] lg:h-[22px] w-[21px] h-[21px] transition-all duration-300 rotate-180 invert brightness-0 group-hover:brightness-100 group-hover:invert-0"
//           />
//         </button>
//       </div>

//       {/* ── Bottom controls ── */}
//       <div className="absolute bottom-[70px] lg:bottom-120 3xl:bottom-130 inset-x-0 z-30 flex flex-col items-center gap-[30px]">
//         {/* Tab pill */}
//         <div className="p-[6px] md:p-[8px] backdrop-blur-[30px] rounded-full">
//           <div className="relative flex overflow-hidden 2xl:gap-[29.5px]">
//             <div
//               className="absolute top-0 h-full w-1/2 bg-white transition-transform duration-400 ease-in-out rounded-full"
//               style={{
//                 transform:
//                   activeTab === "interior"
//                     ? "translateX(0%)"
//                     : "translateX(100%)",
//               }}
//             />
//             <button
//               onClick={() => setActiveTab("interior")}
//               className={`cursor-pointer uppercase tracking-[2%] relative z-10 text-25 leading-[1.4] px-[35px] md:px-[68px] py-3 md:py-[20px] 2xl:py-[21.6px] 2xl:px-[45px] 3xl:px-[60px] font-[optima] h-[57px] md:h-[75px] transition-colors duration-300 ${activeTab === "interior" ? "text-primary" : "text-white"}`}
//             >
//               Interior
//             </button>
//             <button
//               onClick={() => setActiveTab("exterior")}
//               className={`cursor-pointer uppercase tracking-[2%] relative z-10 text-25 leading-[1.4] px-[35px] md:px-[68px] py-3 md:py-[20px] 2xl:py-[21.6px] 2xl:px-[45px] 3xl:px-[60px] font-[optima] h-[57px] md:h-[75px] transition-colors duration-300 ${activeTab === "exterior" ? "text-primary" : "text-white"}`}
//             >
//               Exterior
//             </button>
//           </div>
//         </div>

//         {/* Pagination — show only active tab's dots */}
//         <div
//           ref={interiorPaginationRef}
//           className="custom-pagination flex items-center gap-[10px] justify-center"
//           style={{
//             opacity: activeTab === "interior" ? 1 : 0,
//             position: activeTab === "exterior" ? "absolute" : "relative",
//             pointerEvents: activeTab === "interior" ? "auto" : "none",
//           }}
//         />
//         <div
//           ref={exteriorPaginationRef}
//           className="custom-pagination flex items-center gap-[10px] justify-center"
//           style={{
//             opacity: activeTab === "exterior" ? 1 : 0,
//             position: activeTab === "interior" ? "absolute" : "relative",
//             pointerEvents: activeTab === "exterior" ? "auto" : "none",
//           }}
//         />
//       </div>
//     </section>
//   );
// }



"use client";

import { useState, useRef, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, EffectFade, Autoplay } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useParallax } from "@/app/hooks/useParallax";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-fade";
import { GalleryItem } from "../data";

gsap.registerPlugin(ScrollTrigger);

type TabType = "interior" | "exterior";

function SlideContent({
  src,
  alt,
  parallaxY,
}: {
  src: string;
  alt: string;
  parallaxY: number;
}) {
  return (
    <div className="relative w-full h-full">
      <Image
        src={src || ""}
        alt={alt}
        fill
        className="object-cover"
        priority
        sizes="100vw"
        style={{ transform: `translateY(${parallaxY}vh)` }}
      />
      {/* <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 0%, rgba(0,0,0,0.45) 100%)",
        }}
      /> */}
      <div
        className="absolute inset-x-0 bottom-0 h-full"
        style={{
          background:
            "linear-gradient(180deg, rgba(0, 0, 0, 0) 52.5%, rgba(0, 0, 0, 0.8) 100%)",
        }}
      />
    </div>
  );
}

function TabSwiper({
  slides,
  paginationRef,
  swiperRef,
  parallaxY,
}: {
  slides: GalleryItem[];
  paginationRef: React.RefObject<HTMLDivElement | null>;
  swiperRef: React.MutableRefObject<SwiperType | null>;
  parallaxY: number;
}) {
  return (
    <Swiper
      modules={[Pagination, EffectFade, Autoplay]}
      effect="fade"
      fadeEffect={{ crossFade: true }}
      allowTouchMove={true}
      pagination={{
  clickable: true,
  renderBullet: (index, className) => {
    return `<span class="${className}" data-index="${index}"></span>`;
  },
}}
      onBeforeInit={(swiper) => {
        // @ts-expect-error swiper pagination type
        swiper.params.pagination.el = paginationRef.current;
      }}
onSwiper={(swiper) => {
  swiperRef.current = swiper;
  if (paginationRef.current) {
    // @ts-expect-error swiper pagination type
    swiper.params.pagination.el = paginationRef.current;
    swiper.pagination.init();
    swiper.pagination.render();
    swiper.pagination.update();

    // Bypass Swiper's internal animating-guard on rapid pagination clicks
    paginationRef.current.addEventListener("click", (e) => {
      const target = (e.target as HTMLElement).closest("[data-index]");
      if (!target) return;
      const idx = Number(target.getAttribute("data-index"));
      swiper.animating = false;
      swiper.slideToLoop(idx, 300);
    });
  }
}}
      // autoplay={{
      //   delay: 4500,
      //   disableOnInteraction: false,
      //   waitForTransition: false,
      //   pauseOnMouseEnter: true,
      // }}
      loop={slides.length > 1}
      speed={300}
      className="w-full h-full"
    >
      {slides?.map((slide, index) => (
        <SwiperSlide key={index} className="relative w-full h-full">
          <SlideContent
            src={slide.image_url || ""}
            alt={slide.caption}
            parallaxY={parallaxY}
          />
        </SwiperSlide>
      ))}
    </Swiper>
  );
}

export default function GallerySlider({ data }: { data: any }) {
  // const safeData: GalleryItem[] = Array.isArray(data)
  //   ? data
  //   : Array.isArray(Object.values(data)?.[0])
  //   ? (Object.values(data)[0] as GalleryItem[])
  //   : [];

  const safeData: GalleryItem[] = Array.isArray(data)
  ? data
  : data && typeof data === "object"
  ? Object.values(data).flat().filter(Boolean) as GalleryItem[]
  : [];

  const INTERIOR_SLIDES = safeData.filter((item) => item.caption === "Interior" || item.type === "Interior");
  const EXTERIOR_SLIDES = safeData.filter((item) => item.caption === "Exterior" || item.type === "Exterior");

  const [activeTab, setActiveTab] = useState<TabType>("interior");
  const [mounted, setMounted] = useState(false);

  const { ref: parallaxRef, parallaxY } = useParallax(15);

  const sectionRef = useRef<HTMLElement>(null);
  const swiperWrapperRef = useRef<HTMLDivElement>(null);
  const navButtonsRef = useRef<HTMLDivElement>(null);
  const interiorPaginationRef = useRef<HTMLDivElement>(null);
  const exteriorPaginationRef = useRef<HTMLDivElement>(null);

  const interiorSwiperRef = useRef<SwiperType | null>(null);
  const exteriorSwiperRef = useRef<SwiperType | null>(null);

  const handlePrev = () => {
    const swiper =
      activeTab === "interior"
        ? interiorSwiperRef.current
        : exteriorSwiperRef.current;
    if (!swiper) return;
    swiper.animating = false; // ← ADD THIS
    swiper.slidePrev(300);
  };

  const handleNext = () => {
    const swiper =
      activeTab === "interior"
        ? interiorSwiperRef.current
        : exteriorSwiperRef.current;
    if (!swiper) return;
    swiper.animating = false; // ← ADD THIS
    swiper.slideNext(300);
  };

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!sectionRef.current || !mounted) return;

    ScrollTrigger.getAll().forEach((t) => {
      if (t.vars.id === "gallery-scroll") t.kill();
    });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 70%",
        end: "top 20%",
        toggleActions: "play none none none",
        id: "gallery-scroll",
      },
    });

    if (swiperWrapperRef.current) {
      tl.fromTo(
        swiperWrapperRef.current,
        { opacity: 0, scale: 0.98 },
        { opacity: 1, scale: 1, duration: 1, ease: "power2.out" },
        0,
      );
    }

    if (navButtonsRef.current) {
      const allButtons = navButtonsRef.current.querySelectorAll("button");
      if (allButtons[0])
        tl.fromTo(
          allButtons[0],
          { opacity: 0, x: -50 },
          { opacity: 1, x: 0, duration: 0.7, ease: "power2.out" },
          0.2,
        );
      if (allButtons[1])
        tl.fromTo(
          allButtons[1],
          { opacity: 0, x: 50 },
          { opacity: 1, x: 0, duration: 0.7, ease: "power2.out" },
          0.2,
        );
    }

    return () => {
      tl.kill();
      ScrollTrigger.getAll().forEach((t) => {
        if (t.vars.id === "gallery-scroll") t.kill();
      });
    };
  }, [mounted]);

  return (
    <section
      ref={sectionRef}
      className="gallery-slider-root relative w-full overflow-hidden h-[65vh] md:h-[90vh] 2xl:h-screen bg-[#0e0e0e] cursor-grab"
    >
      {/* ── Swiper layer ── */}
      <div ref={swiperWrapperRef} className="absolute inset-0">
        {mounted && (
          <>
            {/* Interior — always mounted, toggle visibility */}
            <div
              className="absolute inset-0 transition-opacity duration-700"
              style={{
                opacity: activeTab === "interior" ? 1 : 0,
                pointerEvents: activeTab === "interior" ? "auto" : "none",
              }}
            >
              <TabSwiper
                slides={INTERIOR_SLIDES}
                paginationRef={interiorPaginationRef}
                swiperRef={interiorSwiperRef}
                parallaxY={parallaxY}
              />
            </div>

            {/* Exterior — always mounted, toggle visibility */}
            <div
              className="absolute inset-0 transition-opacity duration-700"
              style={{
                opacity: activeTab === "exterior" ? 1 : 0,
                pointerEvents: activeTab === "exterior" ? "auto" : "none",
              }}
            >
              <TabSwiper
                slides={EXTERIOR_SLIDES}
                paginationRef={exteriorPaginationRef}
                swiperRef={exteriorSwiperRef}
                parallaxY={parallaxY}
              />
            </div>
          </>
        )}
      </div>

      {/* ── Nav arrows ── */}
      <div
        ref={navButtonsRef}
        className="container absolute inset-0 h-full pointer-events-none"
      >
        <button
          onClick={handlePrev}
          className="pointer-events-auto absolute left-6 top-1/2 -translate-y-1/2 z-20 w-[50px] h-[50px] 3xl:w-[62px] 3xl:h-[62px] cursor-pointer group rounded-[50px] flex items-center justify-center overflow-hidden border border-white"
          aria-label="Previous slide"
        >
          <span className="absolute top-0 left-0 h-full w-0 transition-all duration-300 group-hover:w-full z-0 bg-white/30" />
          <Image
            src="/icons/left_arrow_slider_primary.svg"
            alt="Prev"
            width={28}
            height={28}
            className="relative z-10 object-contain 3xl:w-[28px] 3xl:h-[28px] lg:w-[22px] lg:h-[22px] w-[21px] h-[21px] transition-all duration-300 invert brightness-0 group-hover:brightness-100 group-hover:invert-0"
          />
        </button>

        <button
          onClick={handleNext}
          className="pointer-events-auto absolute right-6 top-1/2 -translate-y-1/2 z-20 w-[50px] h-[50px] 3xl:w-[62px] 3xl:h-[62px] cursor-pointer group rounded-[50px] flex items-center justify-center overflow-hidden border border-white"
          aria-label="Next slide"
        >
          <span className="absolute top-0 left-0 h-full w-0 transition-all duration-300 group-hover:w-full z-0 bg-white/30" />
          <Image
            src="/icons/left_arrow_slider_primary.svg"
            alt="Next"
            width={28}
            height={28}
            className="relative z-10 object-contain 3xl:w-[28px] 3xl:h-[28px] lg:w-[22px] lg:h-[22px] w-[21px] h-[21px] transition-all duration-300 rotate-180 invert brightness-0 group-hover:brightness-100 group-hover:invert-0"
          />
        </button>
      </div>

      {/* ── Bottom controls ── */}
      <div className="absolute bottom-[20px] md:bottom-[70px] lg:bottom-120 3xl:bottom-130 inset-x-0 z-30 flex flex-col items-center gap-[30px]">
        {/* Tab pill */}
        <div className="p-[6px] md:p-[8px] backdrop-blur-[30px] rounded-full">
          <div className="relative flex overflow-hidden 2xl:gap-[29.5px]">
            <div
              className="absolute top-0 h-full w-1/2 bg-white transition-transform duration-400 ease-in-out rounded-full"
              style={{
                transform:
                  activeTab === "interior"
                    ? "translateX(0%)"
                    : "translateX(100%)",
              }}
            />
            <button
              onClick={() => setActiveTab("interior")}
              className={`cursor-pointer uppercase tracking-[2%] relative z-10 text-25 leading-[1.4] px-[35px] md:px-[68px] py-3 md:py-[20px] 2xl:py-[21.6px] 2xl:px-[45px] 3xl:px-[60px] font-[optima] h-[57px] md:h-[75px] transition-colors duration-300 ${activeTab === "interior" ? "text-primary" : "text-white"}`}
            >
              Interior
            </button>
            <button
              onClick={() => setActiveTab("exterior")}
              className={`cursor-pointer uppercase tracking-[2%] relative z-10 text-25 leading-[1.4] px-[35px] md:px-[68px] py-3 md:py-[20px] 2xl:py-[21.6px] 2xl:px-[45px] 3xl:px-[60px] font-[optima] h-[57px] md:h-[75px] transition-colors duration-300 ${activeTab === "exterior" ? "text-primary" : "text-white"}`}
            >
              Exterior
            </button>
          </div>
        </div>

        {/* Pagination — show only active tab's dots */}
        <div
          ref={interiorPaginationRef}
          className="custom-pagination flex items-center gap-[10px] justify-center"
          style={{
            opacity: activeTab === "interior" ? 1 : 0,
            position: activeTab === "exterior" ? "absolute" : "relative",
            pointerEvents: activeTab === "interior" ? "auto" : "none",
          }}
          
        />
        <div
          ref={exteriorPaginationRef}
          className="custom-pagination flex items-center gap-[10px] justify-center"
          style={{
            opacity: activeTab === "exterior" ? 1 : 0,
            position: activeTab === "interior" ? "absolute" : "relative",
            pointerEvents: activeTab === "exterior" ? "auto" : "none",
          }}
        />
      </div>
    </section>
  );
}
