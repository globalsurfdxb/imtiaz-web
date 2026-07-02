// "use client";

// import { useRef, useState, useEffect } from "react";
// import Image from "next/image";
// import CustomOutlineButton from "../../common/CustomOutlineButton";
// import { Swiper, SwiperSlide } from "swiper/react";
// import { Navigation } from "swiper/modules";
// // import { projectsData } from "../data";
// import ProjectCard from "../../common/ProjectCard";
// import "swiper/css";
// import "swiper/css/navigation";
// import type { Swiper as SwiperType } from "swiper";
// import { motion } from "framer-motion";
// import { moveUp } from "../../motionVariants";
// import gsap from "gsap";
// import { ScrollTrigger } from "gsap/ScrollTrigger";
// import Link from "next/link";

// gsap.registerPlugin(ScrollTrigger);

// type ImtiazPropertiesData = {
//   data: {
//     sectionTitle: string;
//     properties: {
//       id: string;
//       title: string;
//       image: string;
//       link: string;
//       hoverImage: string;
//     }[];
//   };
//   title: string;
//   className?: string;
// };

// const ImtiazProperties = ({ data, title, className }: ImtiazPropertiesData) => {
//   const prevRef = useRef<HTMLButtonElement | null>(null);
//   const nextRef = useRef<HTMLButtonElement | null>(null);
//   const swiperRef = useRef<SwiperType | null>(null);

//   // ⭐ No default active item anymore
//   const [activeSlide, setActiveSlide] = useState<number | null>(null);

//   // ⭐ Track hover on desktop
//   const [hoverIndex, setHoverIndex] = useState<number | null>(null);

//   const [isMobile, setIsMobile] = useState(false);

//   const rootRef = useRef<HTMLDivElement>(null);

//   const wrapRefs = useRef<HTMLDivElement[]>([]);
//   const imgRefs = useRef<HTMLImageElement[]>([]);

//   const setWrapRef = (el: HTMLDivElement | null, i: number) => {
//     if (el) wrapRefs.current[i] = el;
//   };

//   const setImgRef = (el: HTMLImageElement | null, i: number) => {
//     if (el) imgRefs.current[i] = el;
//   };

//   // ⭐ Detect screen size
//   useEffect(() => {
//     const check = () => setIsMobile(window.innerWidth <= 1024);
//     check();
//     window.addEventListener("resize", check);
//     return () => window.removeEventListener("resize", check);
//   }, []);

//   // ⭐ Mobile-only intersection observer
//   useEffect(() => {
//     if (!isMobile) return;

//     const observer = new IntersectionObserver(
//       (entries) => {
//         entries.forEach((entry) => {
//           const index = Number(entry.target.getAttribute("data-idx"));
//           if (entry.isIntersecting) {
//             setActiveSlide(index);
//           }
//         });
//       },
//       { threshold: 0.5 },
//     );

//     wrapRefs.current.forEach((el, idx) => {
//       if (!el) return;
//       el.setAttribute("data-idx", String(idx));
//       observer.observe(el);
//     });

//     return () => observer.disconnect();
//   }, [isMobile]);

//   const initGSAP = () => {
//     const section = rootRef.current;
//     if (!section) return;

//     const ctx = gsap.context(() => {
//       wrapRefs.current.forEach((wrapper, i) => {
//         const img = imgRefs.current[i];
//         if (!wrapper || !img) return;

//         gsap.fromTo(
//           img,
//           { y: "-5vh" },
//           {
//             y: "5vh",
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

//   useEffect(() => {
//     const listener = () => initGSAP();
//     window.addEventListener("homeAnimationsReady", listener);
//     return () => window.removeEventListener("homeAnimationsReady", listener);
//   }, []);

//   return (
//     <section
//       data-header="dark"
//       className={`make-header-black w-full h-[100svh] bg-white z-10 relative flex items-center justify-center`}
//     >
//       <div className="container">
//         <div className="overflow-hidden">
//           <motion.h2
//             // variants={moveUp(0.35)}
//             variants={moveUp(0.2)}
//             initial="hidden"
//             whileInView="show"
//             viewport={{ once: true }}
//             className="text-center text-heading mb-[20px] sm:mb-50"
//           >
//             {title}
//           </motion.h2>
//         </div>
//         <div className="relative" ref={rootRef}>
//           <Swiper
//             modules={[Navigation]}
//             spaceBetween={28}
//             slidesPerView={1}
//             loop
//             speed={600}
//             onSwiper={(swiper) => (swiperRef.current = swiper)}
//             breakpoints={{
//               640: { slidesPerView: 2 },
//               1140: { slidesPerView: 3 },
//               1700: { slidesPerView: 4 },
//             }}
//           >
//             {data.properties.map((project, i) => {
//               return (
//                 <SwiperSlide key={i}>
//                   <ProjectCard key={i} {...project} />
//                 </SwiperSlide>
//               );
//             })}
//           </Swiper>
//         </div>
//         {/* BOTTOM BUTTONS */}
//         <div className="flex items-center justify-between md:justify-center mt-[20px] sm:mt-50">
//           <motion.div
//             variants={moveUp(0.1)}
//             initial="hidden"
//             whileInView="show"
//             viewport={{ once: true }}
//           >
//             <Link href="/properties">
//               <CustomOutlineButton
//                 text="View All"
//                 variant="dark"
//                 borderColor="border-primary"
//                 textColor="text-primary"
//                 px="px-10 xl:px-[37px] h-[44px] md:h-[50px]  xl:h-[66px]"
//               />
//             </Link>
//           </motion.div>
//           <div className="flex gap-[15px] ml-[30px]">
//             <motion.div
//               variants={moveUp(0.16)}
//               initial="hidden"
//               whileInView="show"
//               viewport={{ once: true }}
//             >
//               <button
//                 onClick={() => swiperRef.current?.slidePrev()}
//                 className="relative cursor-pointer w-[50px] h-[50px] 3xl:w-[62px] 3xl:h-[62px] group  border border-[#404040] rounded-[50px] flex items-center justify-center overflow-hidden"
//               >
//                 {/* FILL ANIMATION */}
//                 <span className="absolute right-0 top-0 h-full w-0 bg-primary transition-all duration-300 group-hover:w-full z-0" />
//                 {/* ICON */}
//                 <Image
//                   src="/icons/left_arrow_slider_primary.svg"
//                   alt="Arrow Right"
//                   width={28}
//                   height={28}
//                   className="relative z-10  object-contain 3xl:w-[28px] 3xl:h-[28px] lg:w-[22px] lg:h-[22px] w-[21px] h-[21px] group-hover:invert group-hover:brightness-0 transition-colors duration-300"
//                 />
//               </button>
//             </motion.div>
//             <motion.div
//               variants={moveUp(0.22)}
//               initial="hidden"
//               whileInView="show"
//               viewport={{ once: true }}
//             >
//               <button
//                 onClick={() => swiperRef.current?.slideNext()}
//                 className="relative cursor-pointer w-[50px] h-[50px] 3xl:w-[62px] 3xl:h-[62px] group  border border-[#404040] rounded-[50px] flex items-center justify-center overflow-hidden"
//               >
//                 {/* FILL ANIMATION */}
//                 <span className="absolute left-0 top-0 h-full w-0 bg-primary transition-all duration-300 group-hover:w-full z-0" />
//                 {/* ICON */}
//                 <Image
//                   src="/icons/left_arrow_slider_primary.svg"
//                   alt="Arrow Right"
//                   width={28}
//                   height={28}
//                   className="relative z-10 rotate-180 object-contain 3xl:w-[28px] 3xl:h-[28px] lg:w-[22px] lg:h-[22px] w-[20px] h-[20px] group-hover:invert group-hover:brightness-0 transition-colors duration-300"
//                 />
//               </button>
//             </motion.div>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default ImtiazProperties;




"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import CustomOutlineButton from "../../common/CustomOutlineButton";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import ProjectCard from "../../common/ProjectCard";
import "swiper/css";
import "swiper/css/navigation";
import type { Swiper as SwiperType } from "swiper";
import { motion } from "framer-motion";
import { moveUp } from "../../motionVariants";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";

gsap.registerPlugin(ScrollTrigger);

type ImtiazPropertiesData = {
  data: {
    sectionTitle: string;
    properties: {
      id: string;
      title: string;
      image: string;
      mobileImage:string;
      link: string;
      hoverImage: string;
    }[];
  };
  title: string;
  className?: string;
};

const ImtiazProperties = ({ data, title, className }: ImtiazPropertiesData) => {
  const swiperRef = useRef<SwiperType | null>(null);

  // useEffect(() => {
  //   const ctx = gsap.context(() => {
  //     gsap.utils
  //       .toArray<HTMLImageElement>(".imtiaz-parallax-image")
  //       .forEach((image) => {
  //         gsap.fromTo(
  //           image,
  //           { yPercent: -4 },
  //           {
  //             yPercent: 4,
  //             ease: "none",
  //             scrollTrigger: {
  //               trigger: image.closest(".swiper-slide"),
  //               start: "top bottom",
  //               end: "bottom top",
  //               scrub: true,
  //             },
  //           },
  //         );
  //       });
  //   });

  //   requestAnimationFrame(() => {
  //     ScrollTrigger.refresh();
  //   });

  //   return () => ctx.revert();
  // }, []);

  return (
    <section
      data-header="dark"
      className={`make-header-black w-full h-[100svh] bg-white z-10 relative flex items-center justify-center`}
    >
      <div className="container">
        <div className="overflow-hidden">
          <motion.h2
            variants={moveUp(0.2)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="text-center text-heading mb-[20px] sm:mb-50"
          >
            {title}
          </motion.h2>
        </div>

        <div className="relative">
          <Swiper
            modules={[Navigation]}
            spaceBetween={28}
            slidesPerView={1}
            loop
            speed={600}
            onSwiper={(swiper) => (swiperRef.current = swiper)}
            breakpoints={{
              640: { slidesPerView: 2 },
              1140: { slidesPerView: 3 },
              1700: { slidesPerView: 4 },
            }}
          >
            {data.properties.map((project, i) => {
              return (
                <SwiperSlide key={i}>
                  <ProjectCard
                    {...project}
                    enableParallax={false}
                    // imageClassName="imtiaz-parallax-image"
                  />
                </SwiperSlide>
              );
            })}
          </Swiper>
        </div>
        {/* BOTTOM BUTTONS */}
        <div className="flex items-center justify-between md:justify-center mt-[20px] sm:mt-50">
          <motion.div
            variants={moveUp(0.1)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
          >
            <Link href="/properties">
              <CustomOutlineButton
                text="View All"
                variant="dark"
                borderColor="border-primary"
                textColor="text-primary"
                px="px-10 xl:px-[37px] h-[44px] md:h-[50px]  xl:h-[66px]"
              />
            </Link>
          </motion.div>
          <div className="flex gap-[15px] ml-[30px]">
            <motion.div
              variants={moveUp(0.16)}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
            >
              <button
                onClick={() => swiperRef.current?.slidePrev()}
                className="relative cursor-pointer w-[50px] h-[50px] 3xl:w-[62px] 3xl:h-[62px] group  border border-[#404040] rounded-[50px] flex items-center justify-center overflow-hidden"
              >
                <span className="absolute right-0 top-0 h-full w-0 bg-primary transition-all duration-300 group-hover:w-full z-0" />
                <Image
                  src="/icons/left_arrow_slider_primary.svg"
                  alt="Arrow Right"
                  width={28}
                  height={28}
                  className="relative z-10  object-contain 3xl:w-[28px] 3xl:h-[28px] lg:w-[22px] lg:h-[22px] w-[21px] h-[21px] group-hover:invert group-hover:brightness-0 transition-colors duration-300"
                />
              </button>
            </motion.div>
            <motion.div
              variants={moveUp(0.22)}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
            >
              <button
                onClick={() => swiperRef.current?.slideNext()}
                className="relative cursor-pointer w-[50px] h-[50px] 3xl:w-[62px] 3xl:h-[62px] group  border border-[#404040] rounded-[50px] flex items-center justify-center overflow-hidden"
              >
                <span className="absolute left-0 top-0 h-full w-0 bg-primary transition-all duration-300 group-hover:w-full z-0" />
                <Image
                  src="/icons/left_arrow_slider_primary.svg"
                  alt="Arrow Right"
                  width={28}
                  height={28}
                  className="relative z-10 rotate-180 object-contain 3xl:w-[28px] 3xl:h-[28px] lg:w-[22px] lg:h-[22px] w-[20px] h-[20px] group-hover:invert group-hover:brightness-0 transition-colors duration-300"
                />
              </button>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ImtiazProperties;
