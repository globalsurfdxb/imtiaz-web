// "use client";

// import React, { useEffect, useRef, useState } from "react";
// import gsap from "gsap";
// import { ScrollTrigger } from "gsap/ScrollTrigger";
// import PropertyFilterBar from "./PropertyFilterBar";

// gsap.registerPlugin(ScrollTrigger);

// type Props = {
//   searchRef?: React.RefObject<HTMLDivElement | null>;
//   mobsearchRef?: React.RefObject<HTMLDivElement | null>;
//   communitiesData: any;
//   video: string;
//   title: string;
//   poster: string;
//   propertiesData: any;
// };

// const AboutJourneyV3 = ({
//   searchRef,
//   mobsearchRef,
//   communitiesData,
//   video,
//   title,
//   poster,
//   propertiesData,
// }: Props) => {
//   const sectionRef = useRef<HTMLDivElement>(null);
//   const videoRef = useRef<HTMLVideoElement>(null);
//   const textRef = useRef<HTMLDivElement>(null);

//   const [isVisible, setIsVisible] = useState(false);

//   const initGSAP = () => {
//     const section = sectionRef.current;
//     const video = videoRef.current;
//     const textBox = textRef.current;

//     if (!section || !video || !textBox) return;

//     const items = textBox.querySelectorAll(".anim-item");

//     const ctx = gsap.context(() => {
//       /* --- PARALLAX VIDEO --- */
//       gsap.fromTo(
//         video,
//         { y: "25vh" },
//         {
//           y: "-25vh",
//           ease: "none",
//           scrollTrigger: {
//             trigger: section,
//             scrub: true,
//             start: "top bottom",
//             end: "bottom top",
//           },
//         },
//       );

//       /* --- TEXT FADE IN --- */
//       gsap.fromTo(
//         items,
//         { y: 40, opacity: 0 },
//         {
//           y: 0,
//           opacity: 1,
//           duration: 1.2,
//           stagger: 0.25,
//           ease: "power3.out",
//           scrollTrigger: {
//             trigger: section,
//             start: "top center",
//             toggleActions: "play none none reverse",
//           },
//         },
//       );
//     });

//     ScrollTrigger.refresh();
//     return () => ctx.revert();
//   };

//   // MATCH WORKING COMPONENT BEHAVIOR (CRITICAL)
//   useEffect(() => {
//     const listener = () => initGSAP();
//     window.addEventListener("homeAnimationsReady", listener);

//     return () => window.removeEventListener("homeAnimationsReady", listener);
//   }, []);

//   const containerRef = useRef<HTMLDivElement>(null);

//   useEffect(() => {
//     function handleClickOutside(e: MouseEvent) {
//       if (
//         containerRef.current &&
//         !containerRef.current.contains(e.target as Node)
//       ) {
//         setIsVisible(false);
//       }
//     }
//     document.addEventListener("mousedown", handleClickOutside);
//     return () => document.removeEventListener("mousedown", handleClickOutside);
//   }, []);

//   return (
//     <>
//       <section
//         ref={sectionRef}
//         className="relative h-[100svh] overflow-hidden flex flex-col justify-center items-center bg-white"
//         // Added bottom padding like working component so section actually scrolls
//       >
//         {/* VIDEO */}
//         <video
//           ref={videoRef}
//           src="/videos/abt-mobile.mp4"
//           poster={poster}
//           autoPlay
//           muted
//           loop
//           playsInline
//           className="md:hidden absolute inset-0 w-full h-full object-cover scale-[1.6]"
//         />

//         <video
//           ref={videoRef}
//           src={video}
//           poster={poster}
//           autoPlay
//           muted
//           loop
//           playsInline
//           className="hidden md:block absolute inset-0 w-full h-full object-cover scale-[1.6]"
//         />

//         {/* OVERLAY */}
//         <div className="absolute inset-0 bg-black/40"></div>

//         {/* CONTENT */}
//         <div
//           ref={textRef}
//           className="relative z-0 container mx-auto text-center px-4 pb-2"
//         >
//           <div className="overflow-hidden">
//             <h2 className="anim-item   text-white text-heading mb-[20px] md:mb-30 uppercase">
//               {/* A JOURNEY TO PERFECTION */}
//               {title}
//             </h2>
//           </div>

//           {/* <div className="overflow-hidden">
//           <h3 className="anim-item text-25 text-white font-[avenirBook] leading-[1] mb-[40px] uppercase">
//             CREATING DESTINATIONS OF DISTINCTION
//           </h3>
//         </div> */}

//           {/* <div className="overflow-hidden">
//             <p className="anim-item text-white text-description max-w-[73ch] mx-auto   mb-50">
//               At Imtiaz Developments, excellence is never incidental. It is shaped
//               through considered design, elevated craftsmanship, and an unwavering
//               attention to detail. With innovation as our guide and integrity at
//               our core, we pursue perfection with intention at every step, in
//               every detail.
//             </p>
//           </div>

//           <div className="overflow-hidden mb-[20px] md:mb-50">
//             <div className="anim-item mx-auto w-fit">
//               <Link href={"/about/our-story"}>
//                 <CustomOutlineButton
//                   text="About Imtiaz"
//                   borderColor="border-white"
//                   textColor="text-white"
//                   px="px-[28px] h-[44px] md:h-[50px]  xl:h-[66px] !leading-[1.58]"
//                 />
//               </Link>
//             </div>
//           </div> */}
//         </div>

//         <div className="absolute bottom-[67px] w-full flex flex-col gap-10 md:gap-8 lg:gap-50 items-center">
//           <div className="hidden lg:block opacity-0" ref={searchRef}>
//             <div className="w-full">
//               <PropertyFilterBar
//                 communitiesData={communitiesData}
//                 propertiesData={propertiesData}
//               />
//             </div>
//           </div>

//           <div
//             className="w-full lg:hidden px-5 opacity-0 mt-[20px] "
//             ref={mobsearchRef}
//           >
//             <div className="w-full lg:hidden px-5">
//               <div
//                 className="flex items-center justify-between bg-white/5 backdrop-blur-[30px] border border-white/10 rounded-full px-5 py-3 min-w-full"
//                 onClick={() => setIsVisible(true)}
//               >
//                 <span className="text-white text-[12px] leading-[2] uppercase">
//                   Search Property
//                 </span>
//                 <span className="text-white text-xl leading-none">
//                   <svg
//                     width="12"
//                     height="12"
//                     viewBox="0 0 12 12"
//                     fill="none"
//                     xmlns="http://www.w3.org/2000/svg"
//                   >
//                     <path
//                       d="M0.720001 5.72003H10.72"
//                       stroke="white"
//                       strokeWidth="1.44"
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                     />
//                     <path
//                       d="M5.72003 10.72V0.719971"
//                       stroke="white"
//                       strokeWidth="1.44"
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                     />
//                   </svg>
//                 </span>
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>
//       <div
//         className={`fixed -bottom-1 left-0 right-0 z-[9999] flex justify-center px-4 pb-6 transition-transform duration-500 ease-out ${
//           isVisible ? "translate-y-0" : "translate-y-full"
//         }`}
//       >
//         <div className="w-full " ref={containerRef}>
//           <PropertyFilterBar communitiesData={communitiesData} />
//         </div>
//       </div>
//     </>
//   );
// };

// export default AboutJourneyV3;












"use client";

import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import PropertyFilterBar from "./PropertyFilterBar";

gsap.registerPlugin(ScrollTrigger);

type Props = {
  searchRef?: React.RefObject<HTMLDivElement | null>;
  mobsearchRef?: React.RefObject<HTMLDivElement | null>;
  communitiesData: any;
  video: string;
  title: string;
  poster: string;
  propertiesData: any;
  mobileVideo:string;
  posterMobile:string;
};

const AboutJourneyV3 = ({
  searchRef,
  mobsearchRef,
  communitiesData,
  video,
  title,
  poster,
  propertiesData,
  mobileVideo,
  posterMobile
}: Props) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  const [isVisible, setIsVisible] = useState(false);

  const initGSAP = () => {
    const section = sectionRef.current;
    const textBox = textRef.current;

    if (!section || !textBox) return;

    const items = textBox.querySelectorAll(".anim-item");

    const ctx = gsap.context(() => {
      /* --- TEXT FADE IN --- */
      gsap.fromTo(
        items,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.2,
          stagger: 0.25,
          ease: "power3.out",
          scrollTrigger: {
            trigger: section,
            start: "top center",
            toggleActions: "play none none reverse",
          },
        },
      );
    });

    ScrollTrigger.refresh();
    return () => ctx.revert();
  };

  // MATCH WORKING COMPONENT BEHAVIOR (CRITICAL)
  useEffect(() => {
    const listener = () => initGSAP();
    window.addEventListener("homeAnimationsReady", listener);

    return () => window.removeEventListener("homeAnimationsReady", listener);
  }, []);

  const containerRef = useRef<HTMLDivElement>(null);

useEffect(() => {
  function handleClickOutside(e: MouseEvent) {
    if (
      containerRef.current &&
      !containerRef.current.contains(e.target as Node)
    ) {
      setIsVisible(false);
    }
  }

  function handleScrollClose() {
    setIsVisible(false);
  }

  document.addEventListener("mousedown", handleClickOutside);

  if (isVisible) {
    window.addEventListener("wheel", handleScrollClose, { passive: true });
    window.addEventListener("touchmove", handleScrollClose, { passive: true });
  }

  return () => {
    document.removeEventListener("mousedown", handleClickOutside);
    window.removeEventListener("wheel", handleScrollClose);
    window.removeEventListener("touchmove", handleScrollClose);
  };
}, [isVisible]);

  return (
    <>
      <section
        ref={sectionRef}
        className="relative h-[100svh] overflow-hidden flex flex-col justify-center items-center bg-white"
        // Added bottom padding like working component so section actually scrolls
      >
        {/* VIDEO */}
        <video
          // src={mobileVideo}
          src="/videos/combine-handover-9*16.mp4"
          poster={posterMobile}
          autoPlay
          muted
          loop
          playsInline
          className="md:hidden absolute inset-0 w-full h-full object-cover scale-[1.6]"
        />

        <video
          src={video}
          poster={poster}
          autoPlay
          muted
          loop
          playsInline
          className="hidden md:block absolute inset-0 w-full h-full object-cover scale-[1.6]"
        />

        {/* OVERLAY */}
        <div className="absolute inset-0 bg-black/40"></div>

        {/* CONTENT */}
        <div
          ref={textRef}
          className="relative z-0 container mx-auto text-center px-4 pb-2"
        >
          <div className="overflow-hidden">
            <h2 className="anim-item   text-white text-heading mb-[20px] md:mb-30 uppercase">
              {/* A JOURNEY TO PERFECTION */}
              {title}
            </h2>
          </div>

          {/* <div className="overflow-hidden">
          <h3 className="anim-item text-25 text-white font-[avenirBook] leading-[1] mb-[40px] uppercase">
            CREATING DESTINATIONS OF DISTINCTION
          </h3>
        </div> */}

          {/* <div className="overflow-hidden">
            <p className="anim-item text-white text-description max-w-[73ch] mx-auto   mb-50">
              At Imtiaz Developments, excellence is never incidental. It is shaped
              through considered design, elevated craftsmanship, and an unwavering
              attention to detail. With innovation as our guide and integrity at
              our core, we pursue perfection with intention at every step, in
              every detail.
            </p>
          </div>

          <div className="overflow-hidden mb-[20px] md:mb-50">
            <div className="anim-item mx-auto w-fit">
              <Link href={"/about/our-story"}>
                <CustomOutlineButton
                  text="About Imtiaz"
                  borderColor="border-white"
                  textColor="text-white"
                  px="px-[28px] h-[44px] md:h-[50px]  xl:h-[66px] !leading-[1.58]"
                />
              </Link>
            </div>
          </div> */}
        </div>

        <div className="absolute bottom-[67px] w-full flex flex-col gap-10 md:gap-8 lg:gap-50 items-center">
          <div className="hidden lg:block opacity-0" ref={searchRef}>
            <div className="w-full">
              <PropertyFilterBar
                communitiesData={communitiesData}
                propertiesData={propertiesData}
              />
            </div>
          </div>

          <div
            className="w-full lg:hidden px-5 opacity-0 mt-[20px] "
            ref={mobsearchRef}
          >
            <div className="w-full lg:hidden px-5">
              <div
                className="flex items-center justify-between bg-white/5 backdrop-blur-[30px] border border-white/10 rounded-full px-5 py-3 min-w-full"
                onClick={() => setIsVisible(true)}
              >
                <span className="text-white text-[12px] leading-[2] uppercase">
                  Search Property
                </span>
                <span className="text-white text-xl leading-none">
                  <svg
                    width="12"
                    height="12"
                    viewBox="0 0 12 12"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M0.720001 5.72003H10.72"
                      stroke="white"
                      strokeWidth="1.44"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M5.72003 10.72V0.719971"
                      stroke="white"
                      strokeWidth="1.44"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
              </div>
            </div>
          </div>
        </div>

      </section>
      <div
        className={`fixed -bottom-1 left-0 right-0 z-[9999] flex justify-center px-4 pb-6 transition-transform duration-500 ease-out ${
          isVisible ? "translate-y-0" : "translate-y-full"
        }`}
      >
        <div className="w-full " ref={containerRef}>
          <PropertyFilterBar communitiesData={communitiesData} propertiesData={propertiesData} isSheetVisible={isVisible}/>
        </div>
      </div>
    </>
  );
};

export default AboutJourneyV3;
