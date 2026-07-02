// "use client";

// import Image from "next/image";
// import Link from "next/link";
// import { useState, useEffect, useId } from "react";
// import { CommunityCard as CommunityCardType } from "../data";
// import OutlineButton from "@/app/components/common/CustomOutlineButton";
// import { useParallax } from "@/app/hooks/useParallax";

// const CommunityCard = ({ card }: { card: CommunityCardType }) => {
//   const [isHovered, setIsHovered] = useState(false);
//   const [isActive, setIsActive] = useState(false);
//   const cardId = useId();
//   const { ref, parallaxY } = useParallax(15);

//   const active = isHovered || isActive;

//   useEffect(() => {
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
//       ref={ref}
//       className="relative w-full h-[400px] lg:h-[520px] 3xl:h-[579px] overflow-hidden cursor-pointer select-none"
//       onMouseEnter={() => setIsHovered(true)}
//       onMouseLeave={() => setIsHovered(false)}
//       onClick={handleCardClick}
//     >
//       {/* Background Image */}
//       <Image
//         src={card.image}
//         alt={card.title}
//         fill
//         sizes="100vw"
//         className="object-cover object-center"
//         style={{
//           transform: `scale(1.15) translateY(${parallaxY}vh)`,
//         }}
//       />

//       {/* Base gradient — desktop */}
//       {/* below 3xl */}
//       <div
//         className="hidden md:block 3xl:hidden absolute inset-0 pointer-events-none"
//         style={{
//           background: `linear-gradient(180deg, rgba(0,0,0,0) 35.09%, #000000 100%)`,
//         }}
//       />

//       {/* 3xl */}
//       <div
//         className="hidden 3xl:block absolute inset-0 pointer-events-none"
//         style={{
//           background: `linear-gradient(180deg, rgba(0,0,0,0) 50.09%, #000000 100%)`,
//         }}
//       />

//       {/* Base overlay — mobile */}
//       <div className="md:hidden absolute inset-0 bg-black/50 pointer-events-none" />

//       {/* Active overlay */}
//       <div
//         className="absolute inset-0 pointer-events-none transition-opacity duration-500 ease-in-out"
//         style={{
//           opacity: active ? 1 : 0,
//           background: `linear-gradient(180deg, rgba(0,0,0,0) 35.92%, #000000 100%), linear-gradient(0deg, rgba(0,0,0,0.5), rgba(0,0,0,0.5))`,
//         }}
//       />

//       {/* DEFAULT STATE */}
//       <div
//         className="absolute inset-0 flex flex-col justify-end px-30 pb-30 lg:px-40 lg:pb-40 transition-opacity duration-500 ease-in-out pointer-events-none"
//         style={{ transform: active ? "translateY(110%)" : "translateY(0)" }}
//       >
//         <h3
//           className="text-white font-[optima] text-25 leading-[1.4] text-center mb-[10px] lg:mb-20 px-10 md:px-4"
//           style={{
//             opacity: active ? 0 : 1,
//             transition: active
//               ? "opacity 0.2s ease-in-out"
//               : "opacity 0.4s ease-in-out 0.2s",
//           }}
//         >
//           {card.title}
//         </h3>

//         <div className="3xl:hidden grid grid-cols-1 2xl:grid-cols-2 bg-[#FFFFFF0D] backdrop-blur-[30px] border border-[#FFFFFF0D] rounded-[20px] w-full overflow-hidden">
//           {card.tags.map((tag, i) => {
//             const isLastOdd =
//               card.tags.length % 2 !== 0 && i === card.tags.length - 1;
//             const showHorizontal = i > 0;
//             const hideHorizontalAt2xl = i === 1;
//             const isLeftCol = i % 2 === 0 && !isLastOdd;
//             const isRightCol = i % 2 !== 0;
//             return (
//               <div
//                 key={i}
//                 className={`flex flex-col ${isLastOdd ? "2xl:col-span-2" : ""}`}
//               >
//                 {/* Horizontal separator */}
//                 {showHorizontal && (
//                   <div
//                     className={`h-px w-full ${hideHorizontalAt2xl ? "2xl:hidden" : ""}`}
//                     style={{
//                       background:
//                         "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.3) 50%, transparent 100%)",
//                     }}
//                   />
//                 )}
//                 {/* Cell content */}
//                 <div
//                   style={{
//                     opacity: active ? 0 : 1,
//                     transform: active ? "translateY(8px)" : "translateY(0)",
//                     transition: active
//                       ? "opacity 0.2s ease-in-out, transform 0.2s ease-in-out"
//                       : `opacity 0.3s ease-out ${0.15 + i * 0.18}s, transform 0.3s ease-out ${0.15 + i * 0.18}s`,
//                   }}
//                   className={`
//             relative flex items-center gap-[10px] py-[10px] lg:py-[20px]
//             justify-center px-5
//             ${isLeftCol ? "2xl:justify-end 2xl:pr-80 2xl:pl-5" : ""}
//             ${isRightCol ? "2xl:justify-start 2xl:pl-80 2xl:pr-5" : ""}
//             ${isLastOdd ? "2xl:justify-center 2xl:px-5" : ""}
//           `}
//                 >
//                   <Image
//                     src={tag.icon}
//                     alt={tag.label}
//                     width={25}
//                     height={25}
//                     className="h-[14px] w-auto"
//                   />
//                   <span className="text-white font-[avenirBook] text-16 uppercase">
//                     {tag.label}
//                   </span>
//                   {/* Vertical separator — fixed at right edge of left column */}
//                   {isLeftCol && (
//                     <div
//                       className="hidden 2xl:block absolute right-0 top-[15%] h-[70%] w-px"
//                       style={{
//                         background:
//                           "linear-gradient(180deg, transparent 0%, rgba(255,255,255,0.35) 50%, transparent 100%)",
//                       }}
//                     />
//                   )}
//                 </div>
//               </div>
//             );
//           })}
//         </div>
//         <div className="hidden 3xl:flex bg-[#FFFFFF0D] justify-center backdrop-blur-[30px] rounded-full px-[30px] py-[34px] w-full gap-50">
//           {card.tags.map((tag, i) => (
//             <div
//               key={i}
//               className="flex items-center gap-[10px]"
//               style={{
//                 opacity: active ? 0 : 1,
//                 transform: active ? "translateY(8px)" : "translateY(0)",
//                 transition: active
//                   ? "opacity 0.2s ease-in-out, transform 0.2s ease-in-out"
//                   : `opacity 0.3s ease-out ${0.15 + i * 0.18}s, transform 0.3s ease-out ${0.15 + i * 0.18}s`,
//               }}
//             >
//               <Image
//                 src={tag.icon}
//                 alt={tag.label}
//                 width={25}
//                 height={25}
//                 className="h-[18px] w-auto mb-1"
//               />
//               <span className="text-white font-[avenirBook] text-16 uppercase">
//                 {tag.label}
//               </span>
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* ACTIVE STATE */}
//       <div
//         className="absolute inset-0 flex flex-col items-center justify-center gap-5 transition-opacity duration-300 ease-in-out"
//         style={{
//           opacity: active ? 1 : 0,
//           pointerEvents: active ? "auto" : "none",
//         }}
//       >
//         <h3 className="text-white font-[optima] text-25 text-center mb-120">
//           {card.title}
//         </h3>
//         <Link href={card.href} onClick={(e) => e.stopPropagation()}>
//           <OutlineButton
//             text="View Community"
//             borderColor="rgba(255,255,255,0.9)"
//             px="px-6 lg:px-8 3xl:px-10"
//           />
//         </Link>
//       </div>
//     </div>
//   );
// };

// export default CommunityCard;



"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect, useId } from "react";
import { CommunityCard as CommunityCardType } from "../data";
import { useParallax } from "@/app/hooks/useParallax";
import CustomOutlineButton from "@/app/components/common/CustomOutlineButton";

type IconUrlKey = `icon${1 | 2 | 3}_url`;
type IconTextKey = `icon${1 | 2 | 3}_text`;

const CommunityCard = ({ card }: { card: CommunityCardType }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const cardId = useId();
  const { ref, parallaxY } = useParallax(10);

  const active = isHovered || isActive;
  
const tags = [];

for (let i = 1; i <= 3; i++) {
  const icon = card[`icon${i}_url` as IconUrlKey];
  const label = card[`icon${i}_text` as IconTextKey];

  if (icon && label) {
    tags.push({
      icon,
      label,
    });
  }
}

  useEffect(() => {
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
    <div className="grid lg:grid-cols-2 3xl:grid-cols-[1044px_1fr]"> 
    <div
      ref={ref}
      className="relative w-full h-[199px] md:h-[400px] lg:h-[520px] 3xl:h-[579px] overflow-hidden  select-none"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleCardClick}
    >
      {/* Background Image */}
      <Image
        src={card.featured_image_desktop}
        alt={card.featured_image_alt}
        fill
        sizes="100vw"
        className="object-cover object-center hidden lg:block"
        style={{
          transform: `scale(1.5) translateY(${parallaxY}vh)`,
        }}
      />

      {/* Background Image */}
      <Image
        src={card.featured_image_mobile ? card.featured_image_mobile : card.featured_image_desktop}
        alt={card.featured_image_alt}
        fill
        sizes="100vw"
        className="object-cover object-center lg:hidden"
        style={{
          transform: `scale(1.5) translateY(${parallaxY}vh)`,
        }}
      />
    </div>

     {/* BELOW LG — always-visible state matching the image */}
      <div className="max-lg:pt-10 bg-gray flex flex-col items-center justify-center pointer-events-none">
        {/* Title at top */}
         
        {/* Bottom section: pill + divider + CTA */}
        <div className="w-full flex flex-col items-center justify-center gap-[50px]">

            <h3
          className="text-foreground font-[optima] text-24 leading-[35px] text-center px-10 md:px-4 uppercase"
          style={{
            transition: active
              ? "opacity 0.2s ease-in-out"
              : "opacity 0.4s ease-in-out 0.2s",
          }}
        >
          {card.title}
        </h3>

          {/* Tags pill — full width, flex wrap, centered */}
          <div className="flex flex-wrap items-center justify-center gap-x-[50px] gap-y-[20px]  w-[80%] px-[1px] max-lg:pb-10">
            {tags.reverse().map((tag, i) => (
              <div key={i} className="flex items-center gap-[10px]">
                <Image
                  src={tag.icon}
                  alt={tag.label}
                  width={25}
                  height={25}
                  className="h-[18px] w-auto brightness-100 invert"
                />
                <span className="pt-1 text-foreground font-[avenirBook] text-[12px] md:text-16 uppercase leading-[1.72]">
                  {tag.label}
                </span>

                
              </div>
            ))}
                      
          {/* CTA button */}
          <div className="min-w-full lg:mt-[30px]">
            <Link
            href={`/communities/${card.slug}`}
            className="pointer-events-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <CustomOutlineButton
              text="View Community" 
              px="px-[30px] h-[44px] md:h-[50px]  xl:h-[66px] w-fit mx-auto" 
              borderColor="border-primary-2"
              textColor="text-foreground-light"
              variant="dark" 
            />
          </Link>
          </div>
          </div>
        </div>
      </div>
      </div>
    
  );
};

export default CommunityCard;