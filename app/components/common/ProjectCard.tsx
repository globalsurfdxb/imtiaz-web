// "use client";

// import Image from "next/image";
// import { useState, useEffect, useId } from "react";

// import type { ProjectCardType } from "@/types/cardtype";
// import { useParallax } from "@/app/hooks/useParallax";
// import CustomOutlineButton from "./CustomOutlineButton";
// import Link from "next/link";

// export default function ProjectCard({
//   image,
//   status,
//   location,
//   title,
//   subtitle,
//   startingFrom,
//   units,
//   hoverImage,
// }: ProjectCardType) {
//   const { ref, parallaxY } = useParallax(15);
//   const [isHovered, setIsHovered] = useState(false);
//   const [isActive, setIsActive] = useState(false);
//   const cardId = useId(); // unique ID for each card instance

//   const show = isHovered || isActive;

//   useEffect(() => {
//     // When another card broadcasts its activation, deactivate this one
//     const handleOtherCardActive = (e: Event) => {
//       const { id } = (e as CustomEvent).detail;
//       if (id !== cardId) setIsActive(false);
//     };

//     window.addEventListener("card:activated", handleOtherCardActive);
//     return () => window.removeEventListener("card:activated", handleOtherCardActive);
//   }, [cardId]);

// const handleCardClick = () => {
//   if (!window.matchMedia("(hover: none)").matches) return;

//   const next = !isActive;
//   setIsActive(next);

//   if (next) {
//     window.dispatchEvent(
//       new CustomEvent("card:activated", { detail: { id: cardId } })
//     );
//   }
// };

//   return (
//     <div
//       className="block w-full"
//       ref={ref}
//       onMouseEnter={() => setIsHovered(true)}
//       onMouseLeave={() => setIsHovered(false)}
//       onClick={handleCardClick}
//     >
//       <div className="relative w-full aspect-[9.9/13] sm:aspect-[9.4/13] md:aspect-[9/13] xl:aspect-[8.8/13] 3xl:aspect-[8.48/13] overflow-hidden">
//         <Image
//           src={image}
//           alt={title}
//           fill
//           className="object-cover"
//           style={{
//             transform: `scale(${1.15}) translateY(${parallaxY}vh)`,
//           }}
//         />

//         {/* Default overlay */}
//         <div
//           className="absolute inset-0 z-10 transition-opacity"
//           style={{
//             background:
//               "linear-gradient(180deg, rgba(0, 0, 0, 0) 35.69%, rgba(0, 0, 0, 0.8) 84.83%), linear-gradient(0deg, rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2))",
//           }}
//         />

//         {/* Hover overlay */}
//         <div
//           className={`absolute inset-0 z-10 transition-opacity duration-500 ${show ? "opacity-100" : "opacity-0"}`}
//           style={{
//             background:
//               "linear-gradient(180deg, rgba(0, 0, 0, 0) 44.3%, #000000 100%), linear-gradient(0deg, rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6))",
//           }}
//         />

//         {/* ── DEFAULT STATE ── */}
//         <div
//           className={`absolute inset-0 z-20 flex flex-col transition-opacity my-[32px] xl:my-10 duration-700 pointer-events-none ${show ? "opacity-0" : "opacity-100"}`}
//         >
//           <div className={`absolute top-0 left-0 right-0 flex justify-center flex-col items-center transition-opacity duration-500 ${show ? "opacity-0 delay-0" : "opacity-100 delay-100"}`}>
//             {status && (
//               <div className={`bg-[#818082]/60 px-[15px] py-[1.5px] rounded-full h-[28px] flex items-center justify-center transition-transform duration-900 ${show ? "translate-y-0" : "-translate-y-2"}`}>
//                 <p className="text-white/80 text-description uppercase h-[18px] lg:h-[22px]">
//                   {status}
//                 </p>
//               </div>
//             )}
//             <div className={`flex items-center justify-center gap-[10px] mt-20 transition-transform duration-900 ${show ? "translate-y-0" : "-translate-y-2"}`}>
//               {location && (
//                 <>
//                   <svg width="19" height="22" viewBox="0 0 19 22" fill="none">
//                     <path d="M9.34539 12.1493C11.0689 12.1493 12.4662 10.7521 12.4662 9.0285C12.4662 7.30494 11.0689 5.90771 9.34539 5.90771C7.62183 5.90771 6.22461 7.30494 6.22461 9.0285C6.22461 10.7521 7.62183 12.1493 9.34539 12.1493Z" stroke="white" strokeWidth="1.44"/>
//                     <path d="M0.96352 7.21184C2.93401 -1.45033 15.7672 -1.44032 17.7277 7.22184C18.878 12.3031 15.7172 16.6042 12.9465 19.2649C10.936 21.2053 7.75522 21.2053 5.73471 19.2649C2.97402 16.6042 -0.186768 12.2931 0.96352 7.21184Z" stroke="white" strokeWidth="1.44"/>
//                   </svg>
//                   <span className="text-white/80 text-description">{location}</span>
//                 </>
//               )}
//             </div>
//           </div>

//           <div className={`absolute bottom-0 xl:bottom-[13px] left-0 right-0 px-5 transition-opacity duration-500 ${show ? "opacity-0 delay-0" : "opacity-100 delay-150"}`}>
//             <h3
//               className={`font-[optima] text-white text-25 leading-[1.4] uppercase text-center mb-[10px] transition-transform duration-900 ${show ? "translate-y-0" : "translate-y-2"}`}
//               dangerouslySetInnerHTML={{ __html: title }}
//             />
//             <div
//               className={`w-full h-px mb-[10px] transition-transform duration-900 ${show ? "translate-y-0" : "translate-y-2"}`}
//               style={{
//                 background: "linear-gradient(90deg, rgba(255,255,255,0) 0%, #FFFFFF 50%, rgba(255,255,255,0) 100%)",
//               }}
//             />
//             <p className={`text-white/80 text-description text-center transition-transform duration-900 ${show ? "translate-y-0" : "translate-y-2"}`}>
//               {subtitle}
//             </p>
//           </div>
//         </div>

//         {/* ── HOVER STATE ── */}
//         <div
//           className={`absolute inset-0 z-20 flex flex-col items-center justify-between py-80 3xl:py-[88px] px-20 transition-opacity duration-500 ${show ? "opacity-100 delay-140" : "opacity-0"}`}
//         >
//           <div className={`flex flex-col items-center transition-opacity duration-300 ${show ? "opacity-100 delay-100" : "opacity-0 delay-0"}`}>
//             <Image
//               src={hoverImage}
//               alt="Hover Image"
//               width={160}
//               height={70}
//               className="h-[50px] 2x:h-[70px] w-auto"
//             />
//           </div>

//           <div className={`flex sm:flex-col md:flex-row items-center sm:items-start md:items-center justify-center gap-30 lg:gap-40 w-full sm:w-fit md:w-full py-1 transition-transform duration-500 delay-100 ${show ? "translate-y-0" : "translate-y-2"}`}>
//             <div className="flex items-center gap-[10px]">
//               <div className="xl:w-[49px] xl:h-[49px] w-[44px] h-[44px] rounded-full bg-[#818082] will-change-transform transform-gpu flex items-center justify-center shrink-0">
//                 <svg className="w-[22px] h-[15px] md:w-[25px] md:h-[18px]" viewBox="0 0 25 18" fill="none">
//                   <path d="M8.72021 8.72022C8.72021 6.51022 10.5102 4.72021 12.7202 4.72021C14.9302 4.72021 16.7202 6.51022 16.7202 8.72022C16.7202 10.9302 14.9302 12.7202 12.7202 12.7202C10.5102 12.7202 8.72021 10.9302 8.72021 8.72022Z" stroke="white" strokeWidth="1.44"/>
//                   <path d="M23.7202 16.7202H0.720215V0.720215H23.7202V16.7202Z" stroke="white" strokeWidth="1.44"/>
//                 </svg>
//               </div>
//               <div className="flex flex-col items-baseline gap-1">
//                 <span className="text-white text-description text-left">Starting From</span>
//                 <span className="text-white text-description text-left">{startingFrom}</span>
//               </div>
//             </div>

//             <div className="flex items-center gap-[10px]">
//               <div className="xl:w-[49px] xl:h-[49px] w-[44px] h-[44px] rounded-full bg-[#818082] will-change-transform transform-gpu flex items-center justify-center shrink-0">
//                 <svg className="w-[19px] h-[16px] md:w-[22px] md:h-[19px]" viewBox="0 0 22 19" fill="none">
//                   <path d="M17.7058 8.91778V2.33544C17.7058 1.44478 17.5743 0.720215 16.8603 0.720215H4.27831C3.56435 0.720215 2.98352 1.44484 2.98352 2.33544L2.85947 8.91778M19.0473 14.7982H20.009C20.3926 14.7982 20.7047 14.4088 20.7047 13.9303V11.0997C20.7048 10.2045 21.0277 8.91778 18.7251 8.91778H3.052H1.38263C0.719653 8.91778 0.720215 10.4744 0.720215 11.3229V13.9303C0.720215 14.1871 0.887648 14.396 1.09354 14.396H20.0091M2.85947 17.7202V14.8341M18.1551 17.7202L18.1551 14.8341H18.7251" stroke="white" strokeWidth="1.44" strokeLinecap="round"/>
//                 </svg>
//               </div>
//               <div className="flex flex-col items-baseline gap-1">
//                 <span className="text-white text-description text-left">Units</span>
//                 <span className="text-white text-description text-left">{units}</span>
//               </div>
//             </div>
//           </div>

//           <div onClick={(e) => e.stopPropagation()}>
//             <Link
//   href={`/properties/${title
//     .replace(/<br\s*\/?>/gi, "")
//     .toLowerCase()
//     .replace(/\s+/g, "-")}`}
// >
//               <CustomOutlineButton
//                 text="View Property"
//                 px="px-[20px] lg:px-[25px] 2xl:px-[30px] 3xl:px-10"
//                 className="translate-y-2 transition-all duration-300 delay-100 cursor-pointer flex items-center justify-center relative overflow-hidden"
//               />
//             </Link>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }











// "use client";

// import Image from "next/image";
// import { useState, useEffect, useId } from "react";

// import type { ProjectCardType } from "@/types/cardtype";
// import { useParallax } from "@/app/hooks/useParallax";
// import CustomOutlineButton from "./CustomOutlineButton";
// import Link from "next/link";

// export default function ProjectCard({
//   image,
//   status,
//   location,
//   title,
//   subtitle,
//   startingFrom,
//   units,
//   hoverImage,
//   isCommunity,
// }: ProjectCardType) {
//   const { ref, parallaxY } = useParallax(2);
//   const [isHovered, setIsHovered] = useState(false);
//   const [isActive, setIsActive] = useState(false);
//   const cardId = useId(); // unique ID for each card instance

//   const isMobile =
//     typeof window !== "undefined" && window.matchMedia("(hover: none)").matches;

//   const show = isMobile ? false : (isHovered || isActive);
//   const breakWord = "by Imtiaz";

//   const parts = title.split(new RegExp(`(${breakWord})`, "i"));
//   useEffect(() => {
//     // When another card broadcasts its activation, deactivate this one
//     const handleOtherCardActive = (e: Event) => {
//       const { id } = (e as CustomEvent).detail;
//       if (id !== cardId) setIsActive(false);
//     };

//     window.addEventListener("card:activated", handleOtherCardActive);
//     return () =>
//       window.removeEventListener("card:activated", handleOtherCardActive);
//   }, [cardId]);

//   const handleCardClick = () => {
//     if (!window.matchMedia("(hover: none)").matches) return;

//     const next = !isActive;
//     setIsActive(next);

//     if (next) {
//       window.dispatchEvent(
//         new CustomEvent("card:activated", { detail: { id: cardId } }),
//       );
//     }
//   };

//   return (
//     <div
//       className="block w-full"
//       ref={ref}
//       onMouseEnter={() => setIsHovered(true)}
//       onMouseLeave={() => setIsHovered(false)}
//       onClick={handleCardClick}
//     >
//       {/* <div className="relative w-full aspect-[8.2/10] md:aspect-[9/13] xl:aspect-[9.3/13] 3xl:aspect-[8.48/13] overflow-hidden"> */}
//       <div className="relative w-full aspect-[7.5/10] md:aspect-[9/13] xl:aspect-[9.3/11] min-[1500px]:aspect-[12/13] min-[1600px]:aspect-[9.8/11] 3xl:aspect-[9/13] overflow-hidden">
//         <Image
//           src={image}
//           alt={title}
//           fill
//           className="object-cover"
//           style={{
//             transform: `scale(${1.02}) translateY(${parallaxY}vh)`,
//           }}
//         />

//         {/* Default overlay */}
//         <div
//           className="absolute inset-0 z-10 transition-opacity"
//           style={{
//             background:
//               "linear-gradient(180deg, rgba(0, 0, 0, 0) 35.69%, rgba(0, 0, 0, 0.8) 84.83%), linear-gradient(0deg, rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2))",
//           }}
//         />

//         {/* Hover overlay */}
//         <div
//           className={`absolute inset-0 z-10 transition-opacity duration-500 ${show ? "opacity-100" : "opacity-0"}`}
//           style={{
//             background:
//               "linear-gradient(180deg, rgba(0, 0, 0, 0) 36.05%, rgba(0, 0, 0, 0.) 83.74%),linear-gradient(0deg, rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2))",
//           }}
//         />

//         {/* ── DEFAULT STATE ── */}
//         <div
//           className={`absolute inset-0 z-20 flex flex-col transition-opacity mt-[30px] sm:mt-[38px] mb-[30px] md:my-[30px] xl:my-10 duration-700 pointer-events-none ${show ? "opacity-100 sm:opacity-0" : "opacity-100"}`}
//         >
//           <div
//             className={`absolute top-0 left-0 right-0 flex justify-center flex-col items-center transition-opacity duration-500 ${show ? "opacity-100 sm:opacity-0 delay-0" : "opacity-100 delay-100"}`}
//           >
//             {status && (
//               <div
//                 className={`bg-white/30 backdrop-blur-[30px] px-[15px] py-[1.5px] rounded-full h-[28px] flex items-center justify-center transition-transform duration-900 ${show ? "translate-y-0" : "-translate-y-2"}`}
//               >
//                 <p className="text-white/80 text-description   uppercase h-[18px] lg:h-[22px]">
//                   {status}
//                 </p>
//               </div>
//             )}
//             {/* <div className={`flex items-center justify-center gap-[10px] mt-[20px] transition-transform duration-900 ${show ? "translate-y-0" : "-translate-y-2"}`}>
//               {location && (
//                 <>
//                   <svg width="19" height="22" viewBox="0 0 19 22" fill="none">
//                     <path d="M9.34539 12.1493C11.0689 12.1493 12.4662 10.7521 12.4662 9.0285C12.4662 7.30494 11.0689 5.90771 9.34539 5.90771C7.62183 5.90771 6.22461 7.30494 6.22461 9.0285C6.22461 10.7521 7.62183 12.1493 9.34539 12.1493Z" stroke="white" strokeWidth="1.44"/>
//                     <path d="M0.96352 7.21184C2.93401 -1.45033 15.7672 -1.44032 17.7277 7.22184C18.878 12.3031 15.7172 16.6042 12.9465 19.2649C10.936 21.2053 7.75522 21.2053 5.73471 19.2649C2.97402 16.6042 -0.186768 12.2931 0.96352 7.21184Z" stroke="white" strokeWidth="1.44"/>
//                   </svg>
//                   <span className="text-white/80 text-description">{location}</span>
//                 </>
//               )}
//             </div> */}
//           </div>

//           <div
//             className={`absolute bottom-0 xl:bottom-[13px] left-0 right-0 px-5 transition-opacity duration-500 ${show ? "opacity-100 sm:opacity-0 delay-0" : "opacity-100 delay-150"}`}
//           >
//             {/* <h3
//               className={`font-[optima] text-white text-25 leading-[1.4] uppercase text-center mb-[10px] transition-transform duration-900 ${show ? "translate-y-0" : "translate-y-2"}`}
//               dangerouslySetInnerHTML={{ __html: title }}
//             /> */}
//             <h3
//               className={`font-[optima] text-white text-25 leading-[1.4] uppercase text-center mb-[10px] transition-transform duration-900 ${
//                 show ? "translate-y-0" : "translate-y-2"
//               }`}
//             >
//               {parts.length > 1 ? (
//                 <>
//                   {parts[0]}
//                   <br className="hidden sm:block" />
//                   {breakWord}
//                 </>
//               ) : (
//                 title
//               )}
//             </h3>
//             <div
//               className={`w-full h-px mb-[10px] transition-transform duration-900 ${show ? "translate-y-0" : "translate-y-2"}`}
//               style={{
//                 background:
//                   "linear-gradient(90deg, rgba(255,255,255,0) 0%, #FFFFFF 50%, rgba(255,255,255,0) 100%)",
//               }}
//             />
//             {isCommunity && (
//               <p
//                 className={`text-white/80 text-description text-center transition-transform duration-900 ${show ? "translate-y-0" : "translate-y-2"}`}
//               >
//                 {subtitle}
//               </p>
//             )}
//             {!isCommunity && (
//               <div
//                 className={`flex items-center justify-center gap-[10px] mt-[30px] transition-transform duration-900 ${show ? "translate-y-0" : "-translate-y-2"}`}
//               >
//                 {location && (
//                   <>
//                     <svg width="19" height="22" viewBox="0 0 19 22" fill="none">
//                       <path
//                         d="M9.34539 12.1493C11.0689 12.1493 12.4662 10.7521 12.4662 9.0285C12.4662 7.30494 11.0689 5.90771 9.34539 5.90771C7.62183 5.90771 6.22461 7.30494 6.22461 9.0285C6.22461 10.7521 7.62183 12.1493 9.34539 12.1493Z"
//                         stroke="white"
//                         strokeWidth="1.44"
//                       />
//                       <path
//                         d="M0.96352 7.21184C2.93401 -1.45033 15.7672 -1.44032 17.7277 7.22184C18.878 12.3031 15.7172 16.6042 12.9465 19.2649C10.936 21.2053 7.75522 21.2053 5.73471 19.2649C2.97402 16.6042 -0.186768 12.2931 0.96352 7.21184Z"
//                         stroke="white"
//                         strokeWidth="1.44"
//                       />
//                     </svg>
//                     <span className="text-white/80 text-description">
//                       {location}
//                     </span>
//                   </>
//                 )}
//               </div>
//             )}
//             <div
//               onClick={(e) => e.stopPropagation()}
//               className="mx-auto w-fit mt-6 md:mt-5  sm:hidden"
//             >
//               <Link
//                 href={`/properties/${title
//                   .replace(/<br\s*\/?>/gi, "")
//                   .toLowerCase()
//                   .replace(/\s+/g, "-")}`}
//               >
//                 <CustomOutlineButton
//                   text="View Property"
//                   px="py-[16px] px-[29.4px] sm:px-[20px] lg:px-[25px] 2xl:px-[30px] 3xl:px-10"
//                   className=" "
//                 />
//               </Link>
//             </div>
//           </div>
//         </div>

//         {/* ── HOVER STATE ── */}
//         <div
//           className={`absolute inset-0 z-20 flex flex-col items-center justify-between py-40 3xl:py-[40px] px-20 min-[1850px]:px-40 transition-opacity duration-500 ${show ? "opacity-0 sm:opacity-100 delay-140" : "opacity-0"}`}
//         >
//           <div
//             className={`flex flex-col items-center transition-opacity duration-300 ${show ? "opacity-100 delay-100" : "opacity-0 delay-0"}`}
//           >
//             <Image
//               src={hoverImage}
//               alt="Hover Image"
//               width={160}
//               height={70}
//               className="h-[50px] 2xl:h-[70px] w-auto invert brightness-0"
//             />
//           </div>

//           <div className="flex flex-col justify-center gap-7 w-full">
//             <div className={`flex sm:flex-col md:flex-row items-center sm:items-start md:items-center justify-center gap-40 w-full sm:w-fit md:w-full py-1 transition-transform duration-500 delay-100 ${show ? "translate-y-0" : "translate-y-2"}`}>
//               <div className="flex items-center gap-[10px]">
//                 <div className="xl:w-[49px] xl:h-[49px] w-[44px] h-[44px] rounded-full bg-white/25 backdrop-blur-[18px] will-change-transform transform-gpu flex items-center justify-center shrink-0">
//                   {/* <svg className="w-[22px] h-[15px] md:w-[25px] md:h-[18px]" viewBox="0 0 25 18" fill="none">
//                   <path d="M8.72021 8.72022C8.72021 6.51022 10.5102 4.72021 12.7202 4.72021C14.9302 4.72021 16.7202 6.51022 16.7202 8.72022C16.7202 10.9302 14.9302 12.7202 12.7202 12.7202C10.5102 12.7202 8.72021 10.9302 8.72021 8.72022Z" stroke="white" strokeWidth="1.44"/>
//                   <path d="M23.7202 16.7202H0.720215V0.720215H23.7202V16.7202Z" stroke="white" strokeWidth="1.44"/>
//                 </svg> */}
//                   {/* <Image src={'/icons/startingFrom.svg'} width={22} height={15} alt="" className="md:w-[25px] md:h-[18px]"/> */}
//                   <img
//                     src="/icons/startingFrom.svg"
//                     alt=""
//                     className="w-[22px] h-[15px] md:w-[25px] md:h-[18px]"
//                   />
//                 </div>
//                 <div className="flex flex-col items-baseline gap-1">
//                   <span className="text-white text-description text-left projectCardFontSize">Starting From</span>
//                   <span className="text-white text-description text-left projectCardFontSize">{startingFrom}</span>
//                 </div>
//               </div>

//               <div className="flex items-center gap-[10px]">
//                 <div className="xl:w-[49px] xl:h-[49px] w-[44px] h-[44px] rounded-full bg-white/25 backdrop-blur-[18px] will-change-transform transform-gpu flex items-center justify-center shrink-0">
//                   {/* <svg className="w-[19px] h-[16px] md:w-[22px] md:h-[19px]" viewBox="0 0 22 19" fill="none">
//                     <path d="M17.7058 8.91778V2.33544C17.7058 1.44478 17.5743 0.720215 16.8603 0.720215H4.27831C3.56435 0.720215 2.98352 1.44484 2.98352 2.33544L2.85947 8.91778M19.0473 14.7982H20.009C20.3926 14.7982 20.7047 14.4088 20.7047 13.9303V11.0997C20.7048 10.2045 21.0277 8.91778 18.7251 8.91778H3.052H1.38263C0.719653 8.91778 0.720215 10.4744 0.720215 11.3229V13.9303C0.720215 14.1871 0.887648 14.396 1.09354 14.396H20.0091M2.85947 17.7202V14.8341M18.1551 17.7202L18.1551 14.8341H18.7251" stroke="white" strokeWidth="1.44" strokeLinecap="round" />
//                   </svg> */}
//                   <img
//                     src="/icons/units.svg"
//                     alt=""
//                     className="w-[19px] h-[16px] md:w-[22px] md:h-[19px]"
//                   />
//                 </div>
//                 <div className="flex flex-col items-baseline gap-1">
//                   <span className="text-white text-description text-left projectCardFontSize">Units</span>
//                   <span className="text-white text-description text-left projectCardFontSize">{units}</span>
//                 </div>
//               </div>
//             </div>

//             <div onClick={(e) => e.stopPropagation()}>
//               <Link
//                 href={`/properties/${title
//                   .replace(/<br\s*\/?>/gi, "")
//                   .toLowerCase()
//                   .replace(/\s+/g, "-")}`}
//               >
//                 <CustomOutlineButton
//                   text="View Property"
//                   px="px-[20px] lg:px-[25px] 2xl:px-[30px] 3xl:px-10"
//                   className="mx-auto translate-y-2 transition-all duration-300 delay-100 cursor-pointer flex items-center justify-center relative overflow-hidden"
//                 />
//               </Link>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }















"use client";

import Image from "next/image";
import { useState, useEffect, useId } from "react";

import type { ProjectCardType } from "@/types/cardtype";
import { useParallax } from "@/app/hooks/useParallax";
import CustomOutlineButton from "./CustomOutlineButton";
import Link from "next/link";

export default function ProjectCard({
  image,
  status,
  location,
  title,
  subtitle,
  startingFrom,
  units,
  hoverImage,
  isCommunity,
  enableParallax = true,
  imageClassName,
  mobileImage
}: ProjectCardType) {
  const { ref, parallaxY } = useParallax(enableParallax ? 2 : 0);
  const [isHovered, setIsHovered] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const cardId = useId(); // unique ID for each card instance

  const isMobile =
    typeof window !== "undefined" && window.matchMedia("(hover: none)").matches;

  const show = isMobile ? false : (isHovered || isActive);
  const breakWord = "by Imtiaz";

  const parts = title.split(new RegExp(`(${breakWord})`, "i"));
  useEffect(() => {
    // When another card broadcasts its activation, deactivate this one
    const handleOtherCardActive = (e: Event) => {
      const { id } = (e as CustomEvent).detail;
      if (id !== cardId) setIsActive(false);
    };

    window.addEventListener("card:activated", handleOtherCardActive);
    return () =>
      window.removeEventListener("card:activated", handleOtherCardActive);
  }, [cardId]);

  const handleCardClick = () => {
    if (!window.matchMedia("(hover: none)").matches) return;

    const next = !isActive;
    setIsActive(next);

    if (next) {
      window.dispatchEvent(
        new CustomEvent("card:activated", { detail: { id: cardId } }),
      );
    }
  };

  return (
    <div
      className="block w-full"
      ref={enableParallax ? ref : undefined}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleCardClick}
    >
      {/* <div className="relative w-full aspect-[8.2/10] md:aspect-[9/13] xl:aspect-[9.3/13] 3xl:aspect-[8.48/13] overflow-hidden"> */}
      <div className="relative w-full aspect-[7.5/10] md:aspect-[9/13] xl:aspect-[9.3/11] min-[1500px]:aspect-[12/13] min-[1600px]:aspect-[9.8/11] 3xl:aspect-[9/13] overflow-hidden">
        <Image
          src={image}
          alt={title}
          fill
  className={`object-cover ${imageClassName ?? ""} will-change-transform hidden`}
  style={{
    transform: enableParallax
      ? `scale(1.02) translateY(${parallaxY}vh)`
      : "scale(1.02)",
  }}
        />

                <Image
          src={mobileImage ? mobileImage : image}
          alt={title}
          fill
  className={`object-cover ${imageClassName ?? ""} will-change-transform`}
  style={{
    transform: enableParallax
      ? `scale(1.02) translateY(${parallaxY}vh)`
      : "scale(1.02)",
  }}
        />

        {/* Default overlay */}
        <div
          className="absolute inset-0 z-10 transition-opacity"
          style={{
            background:
              "linear-gradient(180deg, rgba(0, 0, 0, 0) 35.69%, rgba(0, 0, 0, 0.8) 84.83%), linear-gradient(0deg, rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2))",
          }}
        />

        {/* Hover overlay */}
        <div
          className={`absolute inset-0 z-10 transition-opacity duration-500 ${show ? "opacity-100" : "opacity-0"}`}
          style={{
            background:
              "linear-gradient(180deg, rgba(0, 0, 0, 0) 36.05%, rgba(0, 0, 0, 0.) 83.74%),linear-gradient(0deg, rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2))",
          }}
        />

        {/* ── DEFAULT STATE ── */}
        <div
          className={`absolute inset-0 z-20 flex flex-col transition-opacity mt-[30px] sm:mt-[38px] mb-[30px] md:my-[30px] xl:my-10 duration-700 pointer-events-none ${show ? "opacity-100 sm:opacity-0" : "opacity-100"}`}
        >
          <div
            className={`absolute top-0 left-0 right-0 flex justify-center flex-col items-center transition-opacity duration-500 ${show ? "opacity-100 sm:opacity-0 delay-0" : "opacity-100 delay-100"}`}
          >
            {status && (
              <div
                className={`bg-white/30 backdrop-blur-[30px] px-[15px] py-[1.5px] rounded-full h-[28px] flex items-center justify-center transition-transform duration-900 ${show ? "translate-y-0" : "-translate-y-2"}`}
              >
                <p className="text-white/80 text-description   uppercase h-[18px] lg:h-[22px]">
                  {status}
                </p>
              </div>
            )}
            {/* <div className={`flex items-center justify-center gap-[10px] mt-[20px] transition-transform duration-900 ${show ? "translate-y-0" : "-translate-y-2"}`}>
              {location && (
                <>
                  <svg width="19" height="22" viewBox="0 0 19 22" fill="none">
                    <path d="M9.34539 12.1493C11.0689 12.1493 12.4662 10.7521 12.4662 9.0285C12.4662 7.30494 11.0689 5.90771 9.34539 5.90771C7.62183 5.90771 6.22461 7.30494 6.22461 9.0285C6.22461 10.7521 7.62183 12.1493 9.34539 12.1493Z" stroke="white" strokeWidth="1.44"/>
                    <path d="M0.96352 7.21184C2.93401 -1.45033 15.7672 -1.44032 17.7277 7.22184C18.878 12.3031 15.7172 16.6042 12.9465 19.2649C10.936 21.2053 7.75522 21.2053 5.73471 19.2649C2.97402 16.6042 -0.186768 12.2931 0.96352 7.21184Z" stroke="white" strokeWidth="1.44"/>
                  </svg>
                  <span className="text-white/80 text-description">{location}</span>
                </>
              )}
            </div> */}
          </div>

          <div
            className={`absolute bottom-0 xl:bottom-[13px] left-0 right-0 px-5 transition-opacity duration-500 ${show ? "opacity-100 sm:opacity-0 delay-0" : "opacity-100 delay-150"}`}
          >
            {/* <h3
              className={`font-[optima] text-white text-25 leading-[1.4] uppercase text-center mb-[10px] transition-transform duration-900 ${show ? "translate-y-0" : "translate-y-2"}`}
              dangerouslySetInnerHTML={{ __html: title }}
            /> */}
            <h3
              className={`font-[optima] text-white text-25 leading-[1.4] uppercase text-center mb-[10px] transition-transform duration-900 ${
                show ? "translate-y-0" : "translate-y-2"
              }`}
            >
              {parts.length > 1 ? (
                <>
                  {parts[0]}
                  <br className="hidden sm:block" />
                  {breakWord}
                </>
              ) : (
                title
              )}
            </h3>
            <div
              className={`w-full h-px mb-[10px] transition-transform duration-900 ${show ? "translate-y-0" : "translate-y-2"}`}
              style={{
                background:
                  "linear-gradient(90deg, rgba(255,255,255,0) 0%, #FFFFFF 50%, rgba(255,255,255,0) 100%)",
              }}
            />
            {isCommunity && (
              <p
                className={`text-white/80 text-description text-center transition-transform duration-900 ${show ? "translate-y-0" : "translate-y-2"}`}
              >
                {subtitle}
              </p>
            )}
            {!isCommunity && (
              <div
                className={`flex items-center justify-center gap-[10px] mt-[30px] transition-transform duration-900 ${show ? "translate-y-0" : "-translate-y-2"}`}
              >
                {location && (
                  <>
                    <svg width="19" height="22" viewBox="0 0 19 22" fill="none">
                      <path
                        d="M9.34539 12.1493C11.0689 12.1493 12.4662 10.7521 12.4662 9.0285C12.4662 7.30494 11.0689 5.90771 9.34539 5.90771C7.62183 5.90771 6.22461 7.30494 6.22461 9.0285C6.22461 10.7521 7.62183 12.1493 9.34539 12.1493Z"
                        stroke="white"
                        strokeWidth="1.44"
                      />
                      <path
                        d="M0.96352 7.21184C2.93401 -1.45033 15.7672 -1.44032 17.7277 7.22184C18.878 12.3031 15.7172 16.6042 12.9465 19.2649C10.936 21.2053 7.75522 21.2053 5.73471 19.2649C2.97402 16.6042 -0.186768 12.2931 0.96352 7.21184Z"
                        stroke="white"
                        strokeWidth="1.44"
                      />
                    </svg>
                    <span className="text-white/80 text-description uppercase">
                      {location}
                    </span>
                  </>
                )}
              </div>
            )}
            <div
              onClick={(e) => e.stopPropagation()}
              className="mx-auto w-fit mt-6 md:mt-5  sm:hidden"
            >
              <Link
                href={`/properties/${title
                  .replace(/<br\s*\/?>/gi, "")
                  .toLowerCase()
                  .replace(/\s+/g, "-")}`}
              >
                <CustomOutlineButton
                  text="View Property"
                  px="py-[16px] px-[29.4px] sm:px-[20px] lg:px-[25px] 2xl:px-[30px] 3xl:px-10"
                  className=" "
                />
              </Link>
            </div>
          </div>
        </div>

        {/* ── HOVER STATE ── */}
        <div
          className={`absolute inset-0 z-20 flex flex-col items-center justify-between py-40 3xl:py-[40px] px-20 min-[1850px]:px-40 transition-opacity duration-500 ${show ? "opacity-0 sm:opacity-100 delay-140" : "opacity-0"}`}
        >
          <div
            className={`flex flex-col items-center transition-opacity duration-300 ${show ? "opacity-100 delay-100" : "opacity-0 delay-0"}`}
          >
            <Image
              src={hoverImage}
              alt="Hover Image"
              width={160}
              height={70}
              className="h-[50px] 2xl:h-[70px] w-auto invert brightness-0"
            />
          </div>

          <div className="flex flex-col justify-center gap-7 w-full">
            <div className={`flex sm:flex-col md:flex-row items-center sm:items-start md:items-center justify-center gap-40 w-full sm:w-fit md:w-full py-1 transition-transform duration-500 delay-100 ${show ? "translate-y-0" : "translate-y-2"}`}>
              <div className="flex items-center gap-[10px]">
                <div className="xl:w-[49px] xl:h-[49px] w-[44px] h-[44px] rounded-full bg-white/25 backdrop-blur-[18px] will-change-transform transform-gpu flex items-center justify-center shrink-0">
                  {/* <svg className="w-[22px] h-[15px] md:w-[25px] md:h-[18px]" viewBox="0 0 25 18" fill="none">
                  <path d="M8.72021 8.72022C8.72021 6.51022 10.5102 4.72021 12.7202 4.72021C14.9302 4.72021 16.7202 6.51022 16.7202 8.72022C16.7202 10.9302 14.9302 12.7202 12.7202 12.7202C10.5102 12.7202 8.72021 10.9302 8.72021 8.72022Z" stroke="white" strokeWidth="1.44"/>
                  <path d="M23.7202 16.7202H0.720215V0.720215H23.7202V16.7202Z" stroke="white" strokeWidth="1.44"/>
                </svg> */}
                  {/* <Image src={'/icons/startingFrom.svg'} width={22} height={15} alt="" className="md:w-[25px] md:h-[18px]"/> */}
                  <img
                    src="/icons/startingFrom.svg"
                    alt=""
                    className="w-[22px] h-[15px] md:w-[25px] md:h-[18px]"
                  />
                </div>
                <div className="flex flex-col items-baseline gap-1">
                  <span className="text-white text-description text-left projectCardFontSize">Starting From</span>
                  <span className="text-white text-description text-left projectCardFontSize">{startingFrom}</span>
                </div>
              </div>

              <div className="flex items-center gap-[10px]">
                <div className="xl:w-[49px] xl:h-[49px] w-[44px] h-[44px] rounded-full bg-white/25 backdrop-blur-[18px] will-change-transform transform-gpu flex items-center justify-center shrink-0">
                  {/* <svg className="w-[19px] h-[16px] md:w-[22px] md:h-[19px]" viewBox="0 0 22 19" fill="none">
                    <path d="M17.7058 8.91778V2.33544C17.7058 1.44478 17.5743 0.720215 16.8603 0.720215H4.27831C3.56435 0.720215 2.98352 1.44484 2.98352 2.33544L2.85947 8.91778M19.0473 14.7982H20.009C20.3926 14.7982 20.7047 14.4088 20.7047 13.9303V11.0997C20.7048 10.2045 21.0277 8.91778 18.7251 8.91778H3.052H1.38263C0.719653 8.91778 0.720215 10.4744 0.720215 11.3229V13.9303C0.720215 14.1871 0.887648 14.396 1.09354 14.396H20.0091M2.85947 17.7202V14.8341M18.1551 17.7202L18.1551 14.8341H18.7251" stroke="white" strokeWidth="1.44" strokeLinecap="round" />
                  </svg> */}
                  <img
                    src="/icons/units.svg"
                    alt=""
                    className="w-[19px] h-[16px] md:w-[22px] md:h-[19px]"
                  />
                </div>
                <div className="flex flex-col items-baseline gap-1">
                  <span className="text-white text-description text-left projectCardFontSize">Units</span>
                  <span className="text-white text-description text-left projectCardFontSize">{units}</span>
                </div>
              </div>
            </div>

            <div onClick={(e) => e.stopPropagation()}>
              <Link
                href={`/properties/${title
                  .replace(/<br\s*\/?>/gi, "")
                  .toLowerCase()
                  .replace(/\s+/g, "-")}`}
              >
                <CustomOutlineButton
                  text="View Property"
                  px="px-[20px] lg:px-[25px] 2xl:px-[30px] 3xl:px-10"
                  className="mx-auto translate-y-2 transition-all duration-300 delay-100 cursor-pointer flex items-center justify-center relative overflow-hidden"
                />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
