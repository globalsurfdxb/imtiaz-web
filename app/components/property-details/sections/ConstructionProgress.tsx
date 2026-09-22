// "use client";

// import { useEffect, useRef, useState } from "react";
// import { gsap } from "gsap";
// import { ScrollTrigger } from "gsap/ScrollTrigger";
// import Image from "next/image";
// import CustomOutlineButton from "../../common/CustomOutlineButton";
// import { SectionHeading } from "../../animations/SectionHeading";
// import { SectionDescription } from "../../animations/SectionDescription";

// import { useGsapStagger } from "../../../hooks/useGsapStagger";
// import { useScrollFadeUp } from "../../../hooks/useScrollFadeUp";
// import { useParallax } from "@/app/hooks/useParallax";
// gsap.registerPlugin(ScrollTrigger);

// interface CircularProgressProps {
//   percentage: number;
//   size?: number;
//   strokeWidth?: number;
//   label: string;
//   isLarge?: boolean;
//   animationDelay?: number;
// }

// function CircularProgress({
//   percentage,
//   size = 100,
//   strokeWidth = 6,
//   label,
//   isLarge = false,
//   animationDelay = 0,
// }: CircularProgressProps) {
//   const circleRef = useRef<SVGCircleElement>(null);
//   const containerRef = useRef<HTMLDivElement>(null);
//   const textRef = useRef<HTMLSpanElement>(null);

//   const radius = (size - strokeWidth) / 2;
//   const circumference = 2 * Math.PI * radius;
//   const offset = circumference - (percentage / 100) * circumference;

//   useEffect(() => {
//     const circle = circleRef.current;
//     const container = containerRef.current;
//     const textEl = textRef.current;

//     if (!circle || !container || !textEl) return;

//     // Set initial state — fully hidden (no progress)
//     gsap.set(circle, { strokeDashoffset: circumference });
//     gsap.set(textEl, { textContent: "0%" });

//     const counter = { value: 0 };

//     const tl = gsap.timeline({
//       scrollTrigger: {
//         trigger: container,
//         start: "top 85%",
//         once: true,
//       },
//       delay: animationDelay,
//     });

//     tl.to(
//       circle,
//       {
//         strokeDashoffset: offset,
//         duration: 1.6,
//         ease: "power3.out",
//       },
//       0
//     ).to(
//       counter,
//       {
//         value: percentage,
//         duration: 1.6,
//         ease: "power3.out",
//         onUpdate: () => {
//           if (textEl) {
//             textEl.textContent = `${Math.round(counter.value)}%`;
//           }
//         },
//       },
//       0
//     );

//     return () => {
//       tl.kill();
//       ScrollTrigger.getAll().forEach((st) => {
//         if (st.vars.trigger === container) st.kill();
//       });
//     };
//   }, [circumference, offset, percentage, animationDelay]);

//   return (
//     <div
//       ref={containerRef}
//       className={`flex flex-col items-center gap-3 lg:gap-[20px] ${isLarge ? "" : ""}`}
//     >
//       <div className="relative" style={{ width: size, height: size }}>
//         <svg
//           width={size}
//           height={size}
//           viewBox={`0 0 ${size} ${size}`}
//           className="-rotate-90"
//         >
//           {/* Track */}
//           <circle
//             cx={size / 2}
//             cy={size / 2}
//             r={radius}
//             fill="none"
//             stroke="#00000008"
//             strokeWidth={strokeWidth}
//           />
//           {/* Progress */}
//           <circle
//             ref={circleRef}
//             cx={size / 2}
//             cy={size / 2}
//             r={radius}
//             fill="none"
//             stroke="#490905"
//             strokeWidth={strokeWidth}
//             strokeLinecap="round"
//             strokeDasharray={circumference}
//             strokeDashoffset={circumference}
//           />
//         </svg>

//         {/* Percentage text centered */}
//         <div className="absolute inset-0 flex flex-col items-center justify-center">
//           <span
//             ref={textRef}
//             className={`font-[optima] text-black  ${
//               isLarge
//                 ? "text-heading leading-[1.4]"
//                 : "text-25  leading-[1.4] tracking-[2%]"
//             }`}
//           >
//             0%
//           </span>
//           {isLarge && (
//             <span className="text-description mt-[2px]">
//               overall
//             </span>
//           )}
//         </div>
//       </div>

//       {!isLarge && (
//         <span className="text-description uppercase text-foreground-light text-center">
//           {label}
//         </span>
//       )}
//     </div>
//   );
// }

// export default function WynwoodProgress() {
//   const sectionRef = useRef<HTMLElement>(null);
//   const [circleSize, setCircleSize] = useState(203);
//   const [strokeWidth, setStrokeWidth] = useState(15);

//   // Move useParallax hook to parent component

//   const { ref: parallaxRef, parallaxY } = useParallax(15);

//   const refs = useScrollFadeUp({ y: 40, duration: 0.7, start: "top 90%" });
//   const firstref = useScrollFadeUp({ y: 50, duration: 0.7, start: "top 90%" });

//   const stats = [
//     { percentage: 92, label: "Sub-Structure" },
//     { percentage: 45, label: "Sub-Structure" },
//     { percentage: 1, label: "MEP Works" },
//     { percentage: 0, label: "Finishing Works" },
//   ];

//   const statsData = {
//     title: "construction progress",
//     description: "As the project progresses, significant milestones are reached, showcasing our team's dedication and expertise. We are steadily moving closer to our completion goal, ensuring quality and safety at every step.",
//   };

//   const gridRef = useGsapStagger({
//     selector: ".selector",
//     from: { opacity: 0, y: 40 },
//     to: { opacity: 1, y: 0, duration: 0.7, ease: "power3.out" },
//     stagger: 0.15,
//     start: "top 80%",
//   });

//   // Handle responsive sizing
//   useEffect(() => {
//     const handleResize = () => {
//       if (window.innerWidth < 640) {
//         // sm breakpoint
//         setCircleSize(120);
//         setStrokeWidth(8);
//       } else if (window.innerWidth < 1024) {
//         // lg breakpoint
//         setCircleSize(160);
//         setStrokeWidth(12);
//       } else {
//         // lg and above
//         setCircleSize(203);
//         setStrokeWidth(15);
//       }
//     };

//     handleResize();
//     window.addEventListener("resize", handleResize);
//     return () => window.removeEventListener("resize", handleResize);
//   }, []);

//   return (
//     <>
//       <section ref={sectionRef} className="pt-120 2xl:pt-[160px]">
//         <div className="text-center container">
//           <SectionHeading title={statsData.title} className="mb-20 text-foreground" />
//           <SectionDescription
//             text={statsData.description}
//             className="shrink-0 max-w-[74ch] mx-auto text-foreground-light mb-50"
//           />
//         </div>
//         <div className="w-full flex flex-col lg:flex-row 3xl:grid 3xl:grid-cols-[auto_920px] overflow-hidden bg-gray">
//           {/* LEFT — Building Image */}
//           <div ref={parallaxRef} className="relative w-full h-[300px] lg:h-auto overflow-hidden">
//             <Image
//               src="/images/projects/progress.jpg"
//               alt="Wynwood Horizon Building"
//               fill
//               priority
//               className="object-cover object-center"
//               style={{
//                 transform: `scale(${1.15}) translateY(${parallaxY}vh)`,
//               }}
//             />
//             {/* Subtle right-side fade to blend into info panel */}
//             <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-[#F0EDE8]/30 pointer-events-none" />
//           </div>

//           {/* RIGHT — Info Panel */}
//           <div className="py-120 3xl:py-[130px] w-full px-[15px]  bg-gray flex flex-col justify-center gap-12 2xl:gap-[45px] 3xl:gap-[60px] container lg:!px-10 2xl:!px-[70px] lg:!max-w-none">
//             {/* Top — Overall Progress */}
//             <div
//               className="flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-10 lg:gap-15 2xl:gap-[142px]"
//               ref={firstref}
//               style={{ opacity: 0 }}
//             >
//               {/* Big circle - responsive size */}
//               <div className="flex-shrink-0">
//                 <CircularProgress
//                   percentage={19}
//                   size={circleSize}
//                   strokeWidth={strokeWidth}
//                   label="overall"
//                   isLarge
//                   animationDelay={0}
//                 />
//               </div>

//               {/* Completion date */}
//               <div className="flex flex-col justify-center text-center sm:text-left">
//                 <p className="text-25 leading-[1.4] font-[optima] uppercase text-foreground mb-2 lg:mb-[30px] tracking-[2%]">
//                   Estimated
//                   <br />
//                   Completion Date
//                 </p>
//                 <p className="text-heading text-black leading-[1.4]">Q4 - 2026</p>
//               </div>
//             </div>

//             {/* Divider */}
//             <div className="w-full h-px bg-black/30 2xl:my-[10px]" />

//             {/* Bottom — Sub-stats */}
//             <div className="flex flex-wrap justify-between gap-y-8 gap-x-4" ref={gridRef}>
//               {stats.map((stat, i) => (
//                 <div className="selector 3xl:px-[18.65px]" key={i}>
//                   <CircularProgress
//                     percentage={stat.percentage}
//                     size={108}
//                     strokeWidth={10}
//                     label={stat.label}
//                     isLarge={false}
//                     animationDelay={i * 0.12}
//                   />
//                 </div>
//               ))}
//             </div>

//             {/* CTA Button */}
//             <div ref={refs} style={{ opacity: 0 }}>
//               <CustomOutlineButton
//                 className="w-fit mx-auto 2xl:!px-[57.1px] 2xl:!py-[22.5px]"
//                 text="Construction updates"
//                 borderColor="border-primary"
//                 textColor="text-foreground-light"
//                 variant="dark"
//               />
//             </div>
//           </div>
//         </div>
//       </section>
//     </>
//   );
// }



"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import CustomOutlineButton from "../../common/CustomOutlineButton";
import { SectionHeading } from "../../animations/SectionHeading";
import { SectionDescription } from "../../animations/SectionDescription";
import Reveal from "../../animations/RevealOneByOneAnimation";
import { moveUp, moveUpV2 } from "../../motionVariants";
import { motion, useInView } from "framer-motion";
import { useParallax } from "@/app/hooks/useParallax";
import Link from "next/link";

interface CircularProgressProps {
  percentage: number;
  size?: number;
  strokeWidth?: number;
  label: string;
  isLarge?: boolean;
  animationDelay?: number;
}

interface Props {
  title: string;
  image: string;
  description: string;
  estimated_completion: string;
  percent_overall: number;
  percent1: number;
  percent1_label: string;
  percent2: number;
  percent2_label: string;
  percent3: number;
  percent3_label: string;
  percent4: number;
  percent4_label: string;
  construction_button_text: string;
  construction_button_url: string;
  slug:string;
}

function CircularProgress({
  percentage,
  size = 100,
  strokeWidth = 6,
  label,
  isLarge = false,
  animationDelay = 0,
}: CircularProgressProps) {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (percentage / 100) * circumference;

  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  return (
    <div ref={ref} className={`flex flex-col items-center gap-3 lg:gap-[20px]`}>
      <div className="relative" style={{ width: size, height: size }}>
        <svg
          width={size}
          height={size}
          viewBox={`0 0 ${size} ${size}`}
          className="-rotate-90"
        >
          {/* Track */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke="#0000000D"
            strokeWidth={strokeWidth}
          />
          {/* Progress */}
          <motion.circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke="#490905"
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset: inView ? offset : circumference }}
            transition={{ duration: 1.2, ease: "easeOut", delay: animationDelay }}
          />
        </svg>

        {/* Percentage text */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span
            className={`font-[optima] text-black ${isLarge
                ? "text-heading leading-[1.4]"
                : "text-25 leading-[1.4] tracking-[2%]"
              }`}
          >
            {percentage}%
          </span>
          {isLarge && (
            <span className="text-description capitalize mt-[2px]">overall</span>
          )}
        </div>
      </div>

      {!isLarge && (
        <span className="text-[12px] md:text-16 text-description uppercase text-foreground-light font-bold text-center leading-[1.63]">
          {label}
        </span>
      )}
    </div>
  );
}

export default function WynwoodProgress({
  title,
  image,
  description,
  estimated_completion,
  percent_overall,
  percent1,
  percent1_label,
  percent2,
  percent2_label,
  percent3,
  percent3_label,
  percent4,
  percent4_label,
  construction_button_text,
  construction_button_url,
  slug
}: Props) {
  const [circleSize, setCircleSize] = useState(203);
  const [strokeWidth, setStrokeWidth] = useState(15);
  const lineRef = useRef(null);
  const inView = useInView(lineRef, { once: true });
  const { ref, parallaxY } = useParallax(10);

  const stats = [
    { percentage: percent1, label: percent1_label },
    { percentage: percent2, label: percent2_label },
    { percentage: percent3, label: percent3_label },
    { percentage: percent4, label: percent4_label },
  ];

  const statsData = {
    title,
    description
  };

  function useWindowSize() {
    const [width, setWidth] = useState(
      typeof window !== "undefined" ? window.innerWidth : 1024
    );
    useEffect(() => {
      const fn = () => setWidth(window.innerWidth);
      window.addEventListener("resize", fn);
      return () => window.removeEventListener("resize", fn);
    }, []);
    return width;
  }

  // Inside your component:
  const windowWidth = useWindowSize();
  const isMobile = windowWidth < 768;

  const smallCircleSize = isMobile ? 67 : 118;
  const circleStroke = isMobile ? 5 : 7.5;


  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setCircleSize(137);
        setStrokeWidth(10);
      } else if (window.innerWidth < 1024) {
        setCircleSize(160);
        setStrokeWidth(12);
      } else if (window.innerWidth < 1550) {
        setCircleSize(180);
        setStrokeWidth(14);
      } else {
        setCircleSize(203);
        setStrokeWidth(15);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      <section data-header="dark" className="pt-[70px] lg:pt-120 2xl:pt-[160px]">
        <div className="text-center container">
          {statsData.title && <SectionHeading
            title={statsData.title}
            className="mb-20 text-foreground"
          />}
          {statsData.description && <SectionDescription
            text={statsData.description}
            className="shrink-0 max-w-[74ch] mx-auto text-foreground-light mb-10 md:mb-50"
          />}
        </div>
        <div className="w-full flex flex-col lg:flex-row 3xl:grid 3xl:grid-cols-[auto_920px] overflow-hidden bg-gray">
          {/* LEFT — Building Image */}
          <div ref={ref} className="relative w-full h-[275px] lg:h-auto overflow-hidden">
            <Image
              src={image}
              alt={title}
              fill
              priority
              className="object-cover object-center"
              style={{ transform: `scale(${1.25}) translateY(${parallaxY}vh)` }}
            />
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-[#F0EDE8]/30 pointer-events-none" />
          </div>

          {/* RIGHT — Info Panel */}
          <div className="py-[30px] md:py-120 3xl:py-[130px] w-full px-[15px] bg-gray flex flex-col justify-center gap-[30px] md:gap-12 2xl:gap-[45px] 3xl:gap-[60px] container lg:!px-10 2xl:!px-[70px] lg:!max-w-none">
            {/* Top — Overall Progress */}
            <div className="flex flex-row items-center lg:justify-center gap-[36px] lg:gap-15 2xl:gap-[142px]">
              <motion.div
                variants={moveUp(0.1)}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                className="flex-shrink-0"
              >
                {percent_overall && <CircularProgress
                  percentage={percent_overall}
                  size={circleSize}
                  strokeWidth={strokeWidth}
                  label="overall"
                  isLarge
                  animationDelay={0.3}
                />}
              </motion.div>

              <motion.div
                variants={moveUp(0.16)}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                className="flex flex-col justify-center text-left"
              >
                <p className="text-25 leading-[1.4] font-[optima] uppercase text-foreground mb-[10px] lg:mb-[30px] tracking-[2%]">
                  Estimated
                  <br />
                  Completion Date
                </p>
                {estimated_completion && <p className="text-heading text-black leading-[1.4]">{estimated_completion}</p>}
              </motion.div>
            </div>

            {/* Divider */}
            <div
              ref={lineRef}
              className="relative w-full h-px 2xl:my-[10px] flex justify-center overflow-hidden"
            >
              <motion.div
                className="h-full bg-black/30"
                initial={{ width: "0%" }}
                animate={{ width: inView ? "100%" : "0%" }}
                transition={{ duration: 0.7, ease: "easeOut" }}
              />
            </div>

            {/* Bottom — Sub-stats - from md */}
            <div className="hidden md:flex flex-wrap justify-between gap-y-8 gap-x-4  ">
              {stats.map((stat, i) => (
                <Reveal key={i} variants={moveUpV2} delayRange={i * 0.12}>
                  <div className="3xl:px-[20.4px]">
                    {stat.percentage && <CircularProgress
                      percentage={stat.percentage}
                      size={118}
                      strokeWidth={10}
                      label={stat.label}
                      isLarge={false}
                      animationDelay={i * 0.15}
                    />}
                  </div>
                </Reveal>
              ))}
            </div>

            {/* Bottom — Sub-stats - until md */}
            <div className="flex flex-wrap md:hidden justify-between gap-y-8 gap-x-1 md:gap-x-4">
              {stats.map((stat, i) => (
                <Reveal key={i} variants={moveUpV2} delayRange={i * 0.12}>
                  <div className="3xl:px-[20.4px]">
                    {stat.percentage && <CircularProgress
                      percentage={stat.percentage}
                      size={smallCircleSize}
                      strokeWidth={circleStroke}
                      label={stat.label}
                      isLarge={false}
                      animationDelay={i * 0.15}
                    />}
                  </div>
                </Reveal>
              ))}
            </div>

            {/* CTA Button */}
            <motion.div
              variants={moveUp(0.2)}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              className="mt-[10px]"
            >
              <Link href={`/construction-progress-listing/${slug}` || "#"}>
                <CustomOutlineButton
                  className="w-fit  mx-auto 2xl:!px-[57.1px] 2xl:!py-[22.5px] px-[30px] h-[44px] md:h-[50px]  xl:h-[66px] "
                  text={construction_button_text || "Construction Updates"}
                  borderColor="border-primary"
                  textColor="text-primary"
                  variant="dark"
                />
              </Link>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
}