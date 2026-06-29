// "use client";

// import { useState, useRef, useEffect } from "react";
// import { Swiper, SwiperSlide } from "swiper/react";
// import { Navigation, Pagination, EffectFade } from "swiper/modules";
// import { motion, AnimatePresence } from "framer-motion";
// import Image from "next/image";
// import gsap from "gsap";
// import "swiper/css";
// import "swiper/css/navigation";
// import "swiper/css/pagination";

// import { moveUp } from "@/app/components/motionVariants";
// // Types
// interface SlideImage {
//   src: string;
//   alt: string;
// }

// interface MonthData {
//   month: string;
//   date: string;
//   location: string;
//   images: SlideImage[];
// }

// interface YearData {
//   year: string;
//   months: MonthData[];
// }

// // Data
// const constructionData: YearData[] = [
//   {
//     year: "2025",
//     months: [
//       {
//         month: "March",
//         date: "MARCH 2025",
//         location: "Sunset Bay 5 by Imtiaz",
//         images: [
//           {
//             src: "/images/construction-progress/slide01.jpg",
//             alt: "March 2025 - 1",
//           },
//           {
//             src: "/images/construction-progress/slide02.jpg",
//             alt: "March 2025 - 2",
//           },
//         ],
//       },
//       {
//         month: "February",
//         date: "FEBRUARY 2025",
//         location: "Sunset Bay 5 by Imtiaz",
//         images: [
//           {
//             src: "/images/construction-progress/slide02.jpg",
//             alt: "February 2025 - 1",
//           },
//           {
//             src: "/images/construction-progress/slide01.jpg",
//             alt: "February 2025 - 2",
//           },
//         ],
//       },
//       {
//         month: "January",
//         date: "JANUARY 2025",
//         location: "Sunset Bay 5 by Imtiaz",
//         images: [
//           {
//             src: "/images/construction-progress/slide03.jpg",
//             alt: "January 2025 - 1",
//           },
//           {
//             src: "/images/construction-progress/slide02.jpg",
//             alt: "January 2025 - 2",
//           },
//         ],
//       },
//     ],
//   },
//   {
//     year: "2026",
//     months: [
//       {
//         month: "March",
//         date: "MARCH 2026",
//         location: "Sunset Bay 5 by Imtiaz",
//         images: [
//           {
//             src: "/images/construction-progress/slide01.jpg",
//             alt: "March 2026 - 1",
//           },
//           {
//             src: "/images/construction-progress/slide03.jpg",
//             alt: "March 2026 - 2",
//           },
//         ],
//       },
//       {
//         month: "February",
//         date: "FEBRUARY 2026",
//         location: "Sunset Bay 5 by Imtiaz",
//         images: [
//           {
//             src: "/images/construction-progress/slide02.jpg",
//             alt: "February 2026 - 1",
//           },
//           {
//             src: "/images/construction-progress/slide01.jpg",
//             alt: "February 2026 - 2",
//           },
//         ],
//       },
//     ],
//   },
// ];

// // Tab Button Component
// interface TabButtonProps {
//   year: string;
//   isActive: boolean;
//   onClick: () => void;
// }

// const TabButton = ({ year, isActive, onClick }: TabButtonProps) => {
//   return (
//     <button
//       onClick={onClick}
//       className={`min-w-[96px] md:min-w-[136px] min-h-[50px] md:min-h-[58px] cursor-pointer flex items-center justify-center group relative transition-all duration-300 undefined overflow-hidden px-[12px] sm:px-[26px]
//     xl:px-[37px] py-[14px] lg:py-4 2xl:py-[19px] 3xl:py-[20.62px] rounded-full border  text-foreground-light font-[avenirBook] text-16 md:text-[19px] leading-[100%]  ${
//       isActive ? "border-white" : "border-primary"
//     }`}
//     >
//       <div className="flex items-center gap-[10px] 2xl:gap-[10px]">
//         <span
//           className={`absolute inset-y-0 left-0 w-[50%] bg-primary-2 transform scale-x-0 origin-left transition-transform duration-300 ease-out group-hover:scale-x-100  
//           ${isActive ? "scale-x-100" : ""}`}
//         ></span>
//         <span
//           className={`absolute inset-y-0 right-0 w-[50%] bg-primary-2 transform scale-x-0 origin-right transition-transform duration-300 ease-out group-hover:scale-x-100  ${
//             isActive ? "scale-x-100" : ""
//           }`}
//         ></span>
//         <span
//           className={`relative z-10 transition-colors duration-300 md:min-w-[98px] inline-block text-center group-hover:text-white ${isActive ? "text-white" : ""}`}
//         >
//           {" "}
//           {year}
//         </span>
//       </div>
//     </button>
//   );
// };

// // Month Card Component
// interface MonthCardProps {
//   monthData: MonthData;
//   index: number;
// }

// const MonthCard = ({ monthData, index }: MonthCardProps) => {
//   const cardRef = useRef<HTMLDivElement>(null);

//   useEffect(() => {
//     if (cardRef.current) {
//       gsap.fromTo(
//         cardRef.current,
//         { opacity: 0, y: 30 },
//         {
//           opacity: 1,
//           y: 0,
//           duration: 0.6,
//           delay: index * 0.1,
//           ease: "power3.out",
//         },
//       );
//     }
//   }, [index]);

//   return (
//     <motion.div
//       ref={cardRef}
//       initial={{ opacity: 0, y: 30 }}
//       animate={{ opacity: 1, y: 0 }}
//       transition={{ duration: 0.6, delay: index * 0.1 }}
//       className="w-full"
//     >
//       <div className="bg-white   overflow-hidden  ">
//         {/* Swiper Slider for Images */}
//         <div className="relative   h-[344px] md:h-[400px] lg:h-[500px]  3xl:h-[582px] overflow-hidden">
//           <Swiper
//             modules={[Navigation, Pagination, EffectFade]}
//             effect="fade"
//             fadeEffect={{ crossFade: true }}
//             navigation={{
//               nextEl: `.swiper-next-${index}`,
//               prevEl: `.swiper-prev-${index}`,
//             }}
//             pagination={{
//               clickable: true,
//               el: `.swiper-pagination-${index}`,
//             }}
//             className="w-full h-full"
//             loop
//           >
//             {monthData.images.map((image, imgIdx) => (
//               <SwiperSlide key={imgIdx}>
//                 <div className="relative w-full h-full">
//                   <Image
//                     src={image.src}
//                     alt={image.alt}
//                     fill
//                     className="object-cover"
//                   />

//                   {/* Overlay - Gradient from bottom */}
//                   <motion.div
//                     initial={{ opacity: 0 }}
//                     animate={{ opacity: 1 }}
//                     transition={{ duration: 0.3 }}
//                     className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"
//                   />

//                   {/* Dark overlay for better contrast */}
//                   <motion.div
//                     initial={{ opacity: 0 }}
//                     animate={{ opacity: 0.3 }}
//                     transition={{ duration: 0.3 }}
//                     className="absolute inset-0 bg-black"
//                   />
//                 </div>
//               </SwiperSlide>
//             ))}
//           </Swiper>

//           {/* Navigation Arrows */}

//           <motion.div
//             variants={moveUp(0.2)}
//             initial="hidden"
//             whileInView="show"
//             viewport={{ once: true }}
//             className=" absolute left-20   top-1/2 -translate-y-1/2 z-30 pointer-events-auto"
//           >
//             <button
//               className={`swiper-prev-${index} cursor-pointer group lg:w-[50px] lg:h-[50px] 3xl:w-[62px] 3xl:h-[62px] w-[45px] h-[45px] border border-white rounded-[50px] flex items-center justify-center overflow-hidden relative`}
//             >
//               <span className="absolute right-0 top-0 h-full w-0 bg-white/30 transition-all duration-300 group-hover:w-full z-0" />
//               <Image
//                 src="/icons/left_arrow_slider_primary.svg"
//                 alt="Previous"
//                 width={28}
//                 height={28}
//                 className="relative z-10 object-contain 3xl:w-[28px] 3xl:h-[28px] lg:w-[22px] lg:h-[22px] w-[20px] h-[20px] invert brightness-0 group-hover:invert-0 group-hover:brightness-100 transition-all duration-300"
//               />
//             </button>
//           </motion.div>

//           {/* next button — z-30 above gradient, pointer-events-auto */}
//           <motion.div
//             variants={moveUp(0.3)}
//             initial="hidden"
//             whileInView="show"
//             viewport={{ once: true }}
//             className="absolute right-20   top-1/2 -translate-y-1/2 z-30 pointer-events-auto"
//           >
//             <button
//               className={`swiper-next-${index} cursor-pointer group lg:w-[50px] lg:h-[50px] 3xl:w-[62px] 3xl:h-[62px] w-[45px] h-[45px] border border-white rounded-[50px] flex items-center justify-center overflow-hidden relative`}
//             >
//               <span className="absolute left-0 top-0 h-full w-0 bg-white/30 transition-all duration-300 group-hover:w-full z-0" />
//               <Image
//                 src="/icons/left_arrow_slider_primary.svg"
//                 alt="Next"
//                 width={28}
//                 height={28}
//                 className="relative rotate-180 z-10 object-contain 3xl:w-[28px] 3xl:h-[28px] lg:w-[22px] lg:h-[22px] w-[20px] h-[20px] invert brightness-0 group-hover:invert-0 group-hover:brightness-100 transition-all duration-300"
//               />
//             </button>
//           </motion.div>
//           {/* Pagination */}
//           <div
//             className={`swiper-pagination-${index} absolute bottom-4 left-1/2 -translate-x-1/2 z-10`}
//           />
//         </div>

//         {/* Month Info */}
//         <div className="mt-[10px] md:mt-20 flex justify-between md:items-center">
//           <h3 className="text-25 text-foreground leading-[1.4]">
//             {/* Mobile: First two words stacked */}
//             <span className="block md:hidden">
//               <div>{monthData.date.split(" ")[0]}</div>
//               <div>{monthData.date.split(" ")[1]}</div>
//             </span>

//             {/* Desktop: Full text */}
//             <span className="hidden md:block">{monthData.date}</span>
//           </h3>
//           <p className="text-description text-foreground-lite opacity-80">
//             {monthData.location}
//           </p>
//         </div>
//       </div>
//     </motion.div>
//   );
// };

// // Main Component
// export default function ConstructionProgress() {
//   const [activeYear, setActiveYear] = useState("2025");
//   const containerRef = useRef<HTMLDivElement>(null);

//   const currentYearData = constructionData.find((y) => y.year === activeYear);

//   return (
//     <section
//       className="w-full  pt-[40px] md:pt-120 pb-[70px] md:pb-120 3xl:pb-160 3xl:pt-100"
//       data-header="dark"
//     >
//       <div className="container mx-auto px-4 md:px-6">
//         {/* Year Tabs */}
//         <motion.div
//           initial={{ opacity: 0, y: -20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.6 }}
//           className="flex justify-center gap-5 md:gap-4 mb-[40px] lg:mb-50 py-20 border-b border-t border-black/10"
//         >
//           {constructionData.map((year) => (
//             <TabButton
//               key={year.year}
//               year={year.year}
//               isActive={activeYear === year.year}
//               onClick={() => setActiveYear(year.year)}
//             />
//           ))}
//         </motion.div>

//         {/* Months Grid */}
//         <div ref={containerRef}>
//           <AnimatePresence mode="wait">
//             <motion.div
//               key={activeYear}
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               exit={{ opacity: 0 }}
//               transition={{ duration: 0.4 }}
//               className="grid grid-cols-1 md:grid-cols-2  gap-x-50 gap-y-5 md:gap-y-[30px] md:gap-y-50 3xl:gap-y-70"
//             >
//               {currentYearData?.months.map((month, idx) => (
//                 <MonthCard
//                   key={`${activeYear}-${idx}`}
//                   monthData={month}
//                   index={idx}
//                 />
//               ))}
//             </motion.div>
//           </AnimatePresence>
//         </div>
//       </div>
//     </section>
//   );
// }


"use client";

import { useState, useRef, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, EffectFade } from "swiper/modules";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import gsap from "gsap";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import { moveUp } from "@/app/components/motionVariants";
import SwiperModal from "./SwiperModal";

// Types
interface SlideImage {
  src: string;
  alt: string;
}

interface MonthData {
  month: string;
  date: string;
  location: string;
  images: SlideImage[];
}

interface YearData {
  year: string;
  months: MonthData[];
}

// Data
// const constructionData: YearData[] = [
//   {
//     year: "2025",
//     months: [
//       {
//         month: "March",
//         date: "MARCH 2025",
//         location: "Sunset Bay 5 by Imtiaz",
//         images: [
//           {
//             src: "/images/construction-progress/slide01.jpg",
//             alt: "March 2025 - 1",
//           },
//           {
//             src: "/images/construction-progress/slide02.jpg",
//             alt: "March 2025 - 2",
//           },
//         ],
//       },
//       {
//         month: "February",
//         date: "FEBRUARY 2025",
//         location: "Sunset Bay 5 by Imtiaz",
//         images: [
//           {
//             src: "/images/construction-progress/slide02.jpg",
//             alt: "February 2025 - 1",
//           },
//           {
//             src: "/images/construction-progress/slide01.jpg",
//             alt: "February 2025 - 2",
//           },
//         ],
//       },
//       {
//         month: "January",
//         date: "JANUARY 2025",
//         location: "Sunset Bay 5 by Imtiaz",
//         images: [
//           {
//             src: "/images/construction-progress/slide03.jpg",
//             alt: "January 2025 - 1",
//           },
//           {
//             src: "/images/construction-progress/slide02.jpg",
//             alt: "January 2025 - 2",
//           },
//         ],
//       },
//     ],
//   },
//   {
//     year: "2026",
//     months: [
//       {
//         month: "March",
//         date: "MARCH 2026",
//         location: "Sunset Bay 5 by Imtiaz",
//         images: [
//           {
//             src: "/images/construction-progress/slide01.jpg",
//             alt: "March 2026 - 1",
//           },
//           {
//             src: "/images/construction-progress/slide03.jpg",
//             alt: "March 2026 - 2",
//           },
//         ],
//       },
//       {
//         month: "February",
//         date: "FEBRUARY 2026",
//         location: "Sunset Bay 5 by Imtiaz",
//         images: [
//           {
//             src: "/images/construction-progress/slide02.jpg",
//             alt: "February 2026 - 1",
//           },
//           {
//             src: "/images/construction-progress/slide01.jpg",
//             alt: "February 2026 - 2",
//           },
//         ],
//       },
//     ],
//   },
// ];

// Tab Button Component
interface TabButtonProps {
  year: string;
  isActive: boolean;
  onClick: () => void;
}

const TabButton = ({ year, isActive, onClick }: TabButtonProps) => {
  return (
    <button
      onClick={onClick}
      className={`min-w-[96px] md:min-w-[136px] min-h-[50px] md:min-h-[58px] cursor-pointer flex items-center justify-center group relative transition-all duration-300 undefined overflow-hidden px-[12px] sm:px-[26px]
    xl:px-[37px] py-[14px] lg:py-4 2xl:py-[19px] 3xl:py-[20.62px] rounded-full border  text-foreground-light font-[avenirBook] text-16 md:text-[19px] leading-[100%]  ${
      isActive ? "border-white" : "border-primary"
    }`}
    >
      <div className="flex items-center gap-[10px] 2xl:gap-[10px]">
        <span
          className={`absolute inset-y-0 left-0 w-[50%] bg-primary-2 transform scale-x-0 origin-left transition-transform duration-300 ease-out group-hover:scale-x-100  
          ${isActive ? "scale-x-100" : ""}`}
        ></span>
        <span
          className={`absolute inset-y-0 right-0 w-[50%] bg-primary-2 transform scale-x-0 origin-right transition-transform duration-300 ease-out group-hover:scale-x-100  ${
            isActive ? "scale-x-100" : ""
          }`}
        ></span>
        <span
          className={`relative z-10 transition-colors duration-300 md:min-w-[98px] inline-block text-center group-hover:text-white ${isActive ? "text-white" : ""}`}
        >
          {" "}
          {year}
        </span>
      </div>
    </button>
  );
};

// Month Card Component
interface MonthCardProps {
  monthData: MonthData;
  index: number;
}

const MonthCard = ({ monthData, index }: MonthCardProps) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    if (cardRef.current) {
      gsap.fromTo(
        cardRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          delay: index * 0.1,
          ease: "power3.out",
        },
      );
    }
  }, [index]);

  return (
    <>
      <motion.div
        ref={cardRef}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: index * 0.1 }}
        className="w-full"
      >
        <div
          className="bg-white overflow-hidden cursor-pointer"
          onClick={() => setModalOpen(true)}
        >
          {/* Swiper Slider for Images */}
          <div className="relative h-[344px] md:h-[400px] lg:h-[500px] 3xl:h-[582px] overflow-hidden">
            <Swiper
              modules={[Navigation, Pagination, EffectFade]}
              effect="fade"
              fadeEffect={{ crossFade: true }}
              navigation={{
                nextEl: `.swiper-next-${index}`,
                prevEl: `.swiper-prev-${index}`,
              }}
              pagination={{
                clickable: true,
                el: `.swiper-pagination-${index}`,
              }}
              className="w-full h-full"
              loop
            >
              {monthData.images.map((image, imgIdx) => (
                <SwiperSlide key={imgIdx}>
                  <div className="relative w-full h-full">
                    <Image
                      src={image.src}
                      alt={image.alt}
                      fill
                      className="object-cover"
                    />

                    {/* Overlay - Gradient from bottom */}
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.3 }}
                      className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent"
                    />

                    {/* Dark overlay for better contrast */}
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 0.3 }}
                      transition={{ duration: 0.3 }}
                      className="absolute inset-0 bg-black/40"
                    />
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>

            {/* Navigation Arrows — stop propagation so they don't open modal */}
            <motion.div
              variants={moveUp(0.2)}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              className="absolute left-20 top-1/2 -translate-y-1/2 z-30 pointer-events-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                className={`swiper-prev-${index} cursor-pointer group w-[50px] h-[50px] 3xl:w-[62px] 3xl:h-[62px]   border border-white rounded-[50px] flex items-center justify-center overflow-hidden relative`}
              >
                <span className="absolute right-0 top-0 h-full w-0 bg-white/30 transition-all duration-300 group-hover:w-full z-0" />
                <Image
                  src="/icons/left_arrow_slider_primary.svg"
                  alt="Previous"
                  width={28}
                  height={28}
                  className="relative z-10 object-contain 3xl:w-[28px] 3xl:h-[28px] lg:w-[22px] lg:h-[22px] w-[20px] h-[20px] invert brightness-0 group-hover:invert-0 group-hover:brightness-100 transition-all duration-300"
                />
              </button>
            </motion.div>

            {/* Next button */}
            <motion.div
              variants={moveUp(0.3)}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              className="absolute right-20 top-1/2 -translate-y-1/2 z-30 pointer-events-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                className={`swiper-next-${index} cursor-pointer group w-[50px] h-[50px] 3xl:w-[62px] 3xl:h-[62px]   border border-white rounded-[50px] flex items-center justify-center overflow-hidden relative`}
              >
                <span className="absolute left-0 top-0 h-full w-0 bg-white/30 transition-all duration-300 group-hover:w-full z-0" />
                <Image
                  src="/icons/left_arrow_slider_primary.svg"
                  alt="Next"
                  width={28}
                  height={28}
                  className="relative rotate-180 z-10 object-contain 3xl:w-[28px] 3xl:h-[28px] lg:w-[22px] lg:h-[22px] w-[20px] h-[20px] invert brightness-0 group-hover:invert-0 group-hover:brightness-100 transition-all duration-300"
                />
              </button>
            </motion.div>

            {/* Pagination */}
            <div
              className={`swiper-pagination-${index} absolute bottom-4 left-1/2 -translate-x-1/2 z-10`}
            />
          </div>

          {/* Month Info */}
          <div className="mt-[10px] md:mt-20 flex justify-between md:items-center">
            <h3 className="text-25 text-foreground leading-[1.4]">
              {/* Mobile: First two words stacked */}
              <span className="block md:hidden">
                <div>{monthData.date.split(" ")[0]}</div>
                <div>{monthData.date.split(" ")[1]}</div>
              </span>

              {/* Desktop: Full text */}
              <span className="hidden md:block">{monthData.date}</span>
            </h3>
            <p className="text-description text-foreground-light">
              {monthData.location}
            </p>
          </div>
        </div>
      </motion.div>

      {/* Modal */}
      <SwiperModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        monthData={monthData}
      />
    </>
  );
};

// Main Component
export default function ConstructionProgress({data}:{data:YearData[]}) {
  const [activeYear, setActiveYear] = useState(data[0]?.year || "");
  const containerRef = useRef<HTMLDivElement>(null);

  const currentYearData = data.find((y) => y.year === activeYear);

  return (
    <section
      className="w-full  pt-[40px] md:pt-120 pb-[70px] md:pb-120 3xl:pb-160 3xl:pt-100"
      data-header="dark"
    >
      <div className="container mx-auto px-4 md:px-6">
        {/* Year Tabs */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex justify-center gap-20 md:gap-4 mb-[40px] lg:mb-50 py-20 border-b border-t border-black/10"
        >
          {data.map((year) => (
            <TabButton
              key={year.year}
              year={year.year}
              isActive={activeYear === year.year}
              onClick={() => setActiveYear(year.year)}
            />
          ))}
        </motion.div>

        {/* Months Grid */}
        <div ref={containerRef}>
          <AnimatePresence mode="wait">
            <motion.div
              key={activeYear}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="grid grid-cols-1 md:grid-cols-2  gap-x-50 gap-y-20 gap-y-50 3xl:gap-y-70"
            >
              {currentYearData?.months.map((month, idx) => (
                <MonthCard
                  key={`${activeYear}-${idx}`}
                  monthData={month}
                  index={idx}
                />
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}