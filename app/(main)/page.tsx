// "use client";

// import { useEffect, useRef } from "react";
// import gsap from "gsap";
// import { ScrollTrigger } from "gsap/ScrollTrigger";
// import Image from "next/image";

// import ProSliderV2 from "../components/Home/sections/ProSliderV2";
// import ProSliderV2ComingSoon from "../components/Home/sections/ProSliderV2ComingSoon";
// import {
//   heroSlides,
//   /*   aboutSectionJourney, */
//   ConstructionProgressData,
//   imtiazPropertiesData,
//   pressSpotlightData,
//   appSectionData,
//   communityYardData,
//   heroSlidesComingSoon,
// } from "../components/Home/data";

// /* import AbtJour from "../components/Home/sections/AbtJour"; */
// import ImtiazProperties from "../components/Home/sections/ImtiazPropsSlider";
// import ConstructionProgress2 from "../components/Home/sections/ConstructionProgress2";
// import PressSpotlight from "../components/Home/sections/PressSpotlight";
// import AppSection from "../components/Home/sections/AppSectionV2";
// import CommunitySlider from "../components/Home/sections/CommunitySlider";
// import { useLenis } from "../contexts/LenisContext";
// // import Link from "next/link";

// gsap.registerPlugin(ScrollTrigger);

// export default function Home() {
//   const leftBgRef = useRef<HTMLDivElement>(null);
//   const rightBgRef = useRef<HTMLDivElement>(null);
//   const leftTextRef = useRef<HTMLDivElement>(null);
//   const rightTextRef = useRef<HTMLDivElement>(null);
//   const centerTextRef = useRef<HTMLDivElement>(null);
//   const sec3Ref = useRef<HTMLDivElement>(null);
//   const titleRef = useRef<HTMLHeadingElement>(null);
//   const scrollRef = useRef<HTMLImageElement>(null);
//   let collapseCount = 0;

//   const { unlock } = useLenis();

//   useEffect(() => {
//     const startAnimations = () => {
//       unlock();
//       const ctx = gsap.context(() => {
//         const bar = document.getElementById("bar");
//         const img1 = document.querySelector(".img1-1");
//         const img2 = document.querySelector(".img1-2");
//         const img3 = document.querySelector(".img1-3");

//         const leftBg = leftBgRef.current!;
//         const rightBg = rightBgRef.current!;
//         const leftText = leftTextRef.current!;
//         const rightText = rightTextRef.current!;

//         const centerItems = centerTextRef.current
//           ? centerTextRef.current.querySelectorAll(".anim-item")
//           : [];

//         gsap.set([leftBg, leftText], { x: 0 });
//         gsap.set([rightBg, rightText], { x: 0 });

//         if (!bar || !img1 || !img2 || !img3) return;

//         gsap.set(bar, { height: 0, width: "0%" });
//         gsap.set([img1, img2, img3], { scale: 0 });

//         // Initial text fade-in
//         const t2 = gsap.timeline();
//         t2.fromTo(
//           titleRef.current,
//           { y: 40, opacity: 0 },
//           { y: 0, opacity: 1, duration: 1.2 }
//         ).fromTo(
//           scrollRef.current,
//           { y: 40, opacity: 0 },
//           { y: 0, opacity: 1, duration: 1 },
//           "-=0.3"
//         );

//         // Section 1 scroll animation
//         const tlSec1 = gsap.timeline({
//           scrollTrigger: {
//             trigger: "#sec1",
//             start: "end top",
//             end: "+=450%",
//             pin: true,
//             scrub: 1,
//           },
//         });

//         tlSec1
//           .to(bar, { height: "20px", duration: 0.8 })
//           .to(bar, { width: "100%", duration: 0.8 })
//           .to(bar, { height: "100vh", duration: 0.8 })
//           .to(img1, { scale: 1, duration: 2 }, "-=0.6")
//           .fromTo(
//             ".img1-im",
//             { y: "-20vh" },
//             { y: "20vh", duration: 2, ease: "none" },
//             "<"
//           )
//           .to(img2, { scale: 1, duration: 2 }, "-=1")
//           .fromTo(
//             ".img2-im",
//             { y: "-20vh" },
//             { y: "20vh", duration: 2, ease: "none" },
//             "<"
//           )
//           .to(img3, { scale: 1, duration: 2 }, "-=1")
//           .fromTo(
//             ".img3-im",
//             { y: "-20vh" },
//             { y: "20vh", duration: 2, ease: "none" },
//             "<"
//           )
//           .to(
//             ".split-section",
//             {
//               scale: 1,
//               duration: 2,
//             },
//             "-=1"
//           )
//           .from(
//             centerItems,
//             {
//               y: 40,
//               opacity: 0,
//               duration: 1.2,
//               stagger: 0.25,
//               /*    ease: "power3.out", */
//             },
//             "-=1"
//           )
//           .to(centerItems, {
//             y: 40,
//             opacity: 0,
//             duration: 0.8,
//             stagger: 0.25,
//             /*  ease: "power3.out", */
//             delay: 2,
//           })
//           .to([leftBg, leftText], {
//             x: "-100%",
//             duration: 2,
//             onComplete: () => {
//               collapseCount++;
//               if (collapseCount === 2)
//                 window.dispatchEvent(new Event("bgCollapseComplete"));
//             },
//             onReverseComplete: () => {
//               collapseCount--;
//               if (collapseCount === 0)
//                 window.dispatchEvent(new Event("bgCollapseReset"));
//             },
//           })
//           .to(
//             [rightBg, rightText],
//             {
//               x: "100%",
//               duration: 2,
//               onComplete: () => {
//                 collapseCount++;
//                 if (collapseCount === 2)
//                   window.dispatchEvent(new Event("bgCollapseComplete"));
//               },
//               onReverseComplete: () => {
//                 collapseCount--;
//                 if (collapseCount === 0)
//                   window.dispatchEvent(new Event("bgCollapseReset"));
//               },
//             },
//             "<"
//           )
//           .to(sec3Ref.current, { opacity: 1, duration: 1 }, "<")
//           .to(sec3Ref.current, {
//             opacity: 1,
//             zIndex: 70,
//             duration: 1,
//             delay: 1,
//           });
//       });

//       window.dispatchEvent(new Event("homeAnimationsReady"));

//       setTimeout(() => {
//         ScrollTrigger.refresh();
//       }, 300);

//       return () => ctx.revert();
//     };

//     window.addEventListener("headerAnimationComplete", startAnimations);

//     return () => {
//       window.removeEventListener("headerAnimationComplete", startAnimations);
//     };
//   }, []);

//   /*   useEffect(() => {
//     document.body.style.overflow = "hidden";

//     return () => ctx.revert();
//   }, []);
//  */
//   return (
//     <>
//       <section
//         id="sec1"
//         className="h-screen bg-black text-white flex items-center justify-center relative text-center"
//       >
//         <div className="relative w-full h-screen overflow-hidden flex items-center justify-center text-center">
//           <video
//             className="absolute top-0 left-0 w-full object-cover h-[99.9%]"
//             src="/videos/BNR01.mp4"
//             poster="/videos/banner-vid.jpg"
//             autoPlay
//             loop
//             muted
//             playsInline
//           />

//           <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.3)_1.12%,rgba(0,0,0,0.15)_40.24%,rgba(0,0,0,0.75)_100%)] pointer-events-none" />

//           <div className="absolute bottom-[110px] 3xl:bottom-[80px] max-w-[135ch] flex flex-col gap-[40px] md:gap-[60px] 3xl:gap-[72px] items-center justify-center">
//             <div className="relative overflow-hidden">
//               <h1
//                 ref={titleRef}
//                 className="text-[35px] md:text-[50px] lg:text-[64px] 2xl:text-[80px] font-[optima] leading-[1] uppercase text-white opacity-0"
//               >
//                 Redefining Spaces Elevating Lives
//               </h1>
//             </div>

//             <div className="overflow-hidden">
//               <Image
//                 ref={scrollRef}
//                 className="opacity-0 w-[30px]"
//                 alt=""
//                 src="/icons/mouse.svg"
//                 width={50}
//                 height={50}
//               />
//             </div>
//           </div>
//         </div>

//         <div
//           id="bar"
//           className="bg-primary absolute left-0 right-0 mx-auto z-10"
//         ></div>

//         <div className="img1-1 absolute w-full h-full z-20 inset-0 scale-[0] overflow-hidden">
//           <Image
//             className="img1-im w-full h-full object-cover object-center absolute scale-[1.4]"
//             src="/images/home/Wynwood-1.jpg"
//             alt=""
//             width={2500}
//             height={1000}
//           />
//         </div>

//         <div className="img1-2 absolute w-full h-full z-30 inset-0 scale-[0] overflow-hidden">
//           <Image
//             className="img2-im w-full h-full object-cover object-center absolute scale-[1.4]"
//             src="/images/home/Wynwood-2.jpg"
//             alt=""
//             width={2500}
//             height={1000}
//           />
//         </div>

//         <div className="img1-3 absolute w-full h-full z-40 inset-0 scale-[0] overflow-hidden">
//           <Image
//             className="img3-im w-full h-full object-cover object-center absolute scale-[1.4]"
//             src="/images/home/Wynwood-3.jpg"
//             alt=""
//             width={2500}
//             height={1000}
//           />
//         </div>

//         <div className="split-section h-screen w-screen bg-transparent overflow-hidden flex items-center justify-center absolute z-50 scale-0">
//           <div
//             ref={leftBgRef}
//             className="absolute left-0 top-0 w-1/2 h-full bg-primary z-10"
//           />

//           <div
//             ref={rightBgRef}
//             className="absolute right-0 top-0 w-1/2 h-full bg-primary z-10"
//           />

//           <div
//             ref={centerTextRef}
//             className="absolute  top-1/2 -translate-y-1/2 w-full h-auto overflow-hidden flex justify-end pr-4 z-20"
//           >
//             <div className="container">
//               <div className=" mx-auto text-center px-4">
//                 <div className="overflow-hidden">
//                   <p className="anim-item  text-[25px] font-[avenir] leading-[1] font-[800] text-white mb-10 md:mb-16 2xl:mb-[170px] uppercase">
//                     ABOUT
//                   </p>
//                 </div>
//                 <div className="overflow-hidden">
//                   <h2 className="anim-item  text-[40px] md:text-[50px] lg:text-[60px] 2xl:text-[70px] font-[400] font-[optima] text-white leading-[1] mb-[25px] uppercase">
//                     A JOURNEY TO PERFECTION
//                   </h2>
//                 </div>
//                 <div className="overflow-hidden">
//                   <h3 className="anim-item  text-[25px] font-[avenirBook] leading-[1] text-white mb-[40px] uppercase">
//                     CREATING DESTINATIONS OF DISTINCTION
//                   </h3>
//                 </div>
//                 <div className="overflow-hidden">
//                   <p className="anim-item text-[#FFD8E1] text-[19px] font-[avenirRoman] font-[400] leading-[1.3] mb-[50px] max-w-[75ch] mx-auto  text-center">
//                     We transform visions into living, breathing destinations. At
//                     Imtiaz Developments, our legacy is built on excellence,
//                     innovation, and uncompromising quality — delivering iconic
//                     properties that inspire and endure.
//                   </p>
//                 </div>
//                 <div className="overflow-hidden">
//                   {/* <Link
//                     href="" */}
//                   <button className="anim-item cursor-pointer inline-block px-9 py-[19.5px] rounded-full border border-white text-white text-[17px] leading-[1] font-[avenirRoman] font-[400]">
//                     About Imtiaz
//                   </button>
//                   {/* </Link> */}
//                 </div>
//               </div>
//             </div>
//           </div>
//           {/* <div
//             ref={leftTextRef}
//             className="absolute left-0 top-1/2 -translate-y-1/2 w-1/2 h-auto overflow-hidden flex justify-end pr-4 z-20"
//           >
//             <div className="translate-x-1/2">
//               <AbtJour data={aboutSectionJourney} />
//             </div>
//           </div>

//           <div
//             ref={rightTextRef}
//             className="absolute right-0 top-1/2 -translate-y-1/2 w-1/2 h-auto overflow-hidden flex justify-start pl-4 z-20"
//           >
//             <div className="-translate-x-[53.2%]">
//               <AbtJour data={aboutSectionJourney} />
//             </div>
//           </div> */}
//         </div>

//         <div
//           ref={sec3Ref}
//           className="h-screen w-screen bg-gray-900 text-white flex items-center justify-center absolute z-40 opacity-0"
//         >
//           <ProSliderV2 slides={heroSlides} RightLabel="New Launches" />
//         </div>
//       </section>

//       <ProSliderV2ComingSoon
//         slides={heroSlidesComingSoon}
//         RightLabel="Coming Soon"
//       />
//       <CommunitySlider slides={communityYardData} />
//       <ImtiazProperties data={imtiazPropertiesData} />
//       <ConstructionProgress2 data={ConstructionProgressData} />
//       <PressSpotlight data={pressSpotlightData} />
//       <AppSection data={appSectionData} />
//     </>
//   );
// }

// "use client";

// import { useEffect, useRef } from "react";
// import gsap from "gsap";
// import { ScrollTrigger } from "gsap/ScrollTrigger";
// import Image from "next/image";

// import ProSliderComingSoonV3 from "../components/Home/sections/ProSliderComingSoonV3";
// import ProSliderV3 from "../components/Home/sections/ProsliderV3";
// // import ProSliderLaunchV3 from "../components/Home/sections/ProSliderLaunchV3";
// import {
//     heroSlides,
//     /*   aboutSectionJourney, */
//     ConstructionProgressData,
//     imtiazPropertiesData,
//     pressSpotlightData,
//     appSectionData,
//     // communityYardData,
//     communityNamesData,
//     heroSlidesComingSoon,
// } from "../components/Home/data";

// /* import AbtJour from "../components/Home/sections/AbtJour"; */
// import ImtiazProperties from "../components/Home/sections/ImtiazPropsSlider";
// import ConstructionProgress2 from "../components/Home/sections/ConstructionProgress2";
// // import PressSpotlight from "../components/Home/sections/PressSpotlight";
// import PressSpotlightV3 from "../components/Home/sections/PressSpotlightV3";
// // import AppSection from "../components/Home/sections/AppSectionV2";
// import AppSectionV2 from "../components/Home/sections/AppSection";
// // import CommunitySlider from "../components/Home/sections/CommunitySlider";
// import CommunityNamesSlider from "../components/Home/sections/CommunityNamesSlider";
// import { useSmoothScrollContext } from "../contexts/smoothScrollContext";
// import AboutJourneyV3 from "../components/Home/sections/AboutJourneyV3";
// import SpotlightSlider from "../components/Home/sections/SpotlightSlider";
// // import Link from "next/link";

// gsap.registerPlugin(ScrollTrigger);

// export default function Home() {
//     const titleRef = useRef<HTMLHeadingElement>(null);
//     const scrollRef = useRef<HTMLImageElement>(null);

//     const { setSmoothScrollActive } = useSmoothScrollContext();

//     useEffect(() => {
//         // window.scrollTo(0, 0);
//         document.body.style.overflow = "hidden";
//     }, []);

//     useEffect(() => {
//         const startAnimations = () => {
//             // ENABLE scroll now
//             document.body.style.overflow = "hidden";
//             setSmoothScrollActive(true);

//             const ctx = gsap.context(() => {
//                 // Initial text fade-in
//                 const t2 = gsap.timeline();
//                 t2.fromTo(titleRef.current, { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 1.2 }).fromTo(
//                     scrollRef.current,
//                     { y: 40, opacity: 0 },
//                     { y: 0, opacity: 1, duration: 1 },
//                     "-=0.3"
//                 );

//                 ScrollTrigger.create({
//                     trigger: "#sec1",
//                     start: "top top",
//                     end: "bottom top",
//                     pin: true,
//                     pinSpacing: false, // optional
//                 });
//             });

//             window.dispatchEvent(new Event("homeAnimationsReady"));

//             setTimeout(() => {
//                 ScrollTrigger.refresh();
//             }, 300);

//             return () => ctx.revert();
//         };

//         window.addEventListener("headerAnimationComplete", startAnimations);

//         return () => {
//             window.removeEventListener("headerAnimationComplete", startAnimations);
//         };
//     }, []);

//     /*   useEffect(() => {
//     document.body.style.overflow = "hidden";

//     return () => ctx.revert();
//   }, []);
//  */
//     return (
//         <>
//             <section
//                 id="sec1"
//                 className="h-screen bg-black text-white flex items-center justify-center relative text-center"
//             >
//                 <div className="relative w-full h-screen overflow-hidden flex items-center justify-center text-center">
//                     <video
//                         className="absolute top-0 left-0 w-full object-cover h-[99.9%]"
//                         src="/videos/BNR01.mp4"
//                         poster="/videos/banner-vid.jpg"
//                         autoPlay
//                         loop
//                         muted
//                         playsInline
//                     />

//                     <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.3)_1.12%,rgba(0,0,0,0.15)_40.24%,rgba(0,0,0,0.75)_100%)] pointer-events-none" />

//                     <div className="absolute bottom-[90px] 3xl:bottom-[90px] max-w-[135ch] flex flex-col gap-[40px] md:gap-[60px] 3xl:gap-[72px] items-center justify-center">
//                         <div className="relative overflow-hidden">
//                             <h1
//                                 ref={titleRef}
//                                 className="text-70 font-[optima] leading-[1.143] uppercase text-white opacity-0"
//                             >
//                                 Redefining Spaces <br />
//                                 Elevating Lives
//                             </h1>
//                         </div>

//                         <div className="overflow-hidden">
//                             <Image
//                                 ref={scrollRef}
//                                 className="opacity-0 w-[30px]"
//                                 alt=""
//                                 src="/icons/mouse.svg"
//                                 width={50}
//                                 height={50}
//                             />
//                         </div>
//                     </div>
//                 </div>

//                 <div id="bar" className="bg-primary absolute left-0 right-0 mx-auto z-10"></div>

//                 <div className="img1-1 absolute w-full h-full z-20 inset-0 scale-[0] overflow-hidden">
//                     <Image
//                         className="img1-im w-full h-full object-cover object-center absolute scale-[1.5]"
//                         src="/images/home/img01.jpg"
//                         alt=""
//                         width={2500}
//                         height={1000}
//                     />
//                 </div>

//                 <div className="img1-2 absolute w-full h-full z-30 inset-0 scale-[0] overflow-hidden">
//                     <Image
//                         className="img2-im w-full h-full object-cover object-center absolute scale-[1.5]"
//                         src="/images/home/img02.jpg"
//                         alt=""
//                         width={2500}
//                         height={1000}
//                     />
//                 </div>

//                 <div className="img1-3 absolute w-full h-full z-40 inset-0 scale-[0] overflow-hidden">
//                     <Image
//                         className="img3-im w-full h-full object-cover object-center absolute scale-[1.5]"
//                         src="/images/home/imtiaz-properties/2.png"
//                         alt=""
//                         width={2500}
//                         height={1000}
//                     />
//                 </div>

//                 <div className="split-section h-screen w-screen bg-transparent overflow-hidden flex items-center justify-center absolute z-50 scale-0">
//                     {/*
//           <div
//             ref={centerTextRef}
//             className="absolute  top-1/2 -translate-y-1/2 w-full h-auto overflow-hidden flex justify-end pr-4 z-20"
//           >
//             <div className="container">
//               <div className=" mx-auto text-center px-4">
//                 <div className="overflow-hidden">
//                   <p className="anim-item  text-[25px] font-[avenir] leading-[1] font-[800] text-white mb-10 md:mb-25 2xl:mb-[170px] uppercase">
//                     ABOUT
//                   </p>
//                 </div>
//                 <div className="overflow-hidden">
//                   <h2 className="anim-item  text-[40px] md:text-[50px] lg:text-[60px] 3xl:text-[70px] font-[400] font-[optima] text-white leading-[1] mb-[25px] uppercase">
//                     A JOURNEY TO PERFECTION
//                   </h2>
//                 </div>
//                 <div className="overflow-hidden">
//                   <h3 className="anim-item  text-[25px] font-[avenirBook] leading-[1] text-white mb-[40px] uppercase">
//                     CREATING DESTINATIONS OF DISTINCTION
//                   </h3>
//                 </div>
//                 <div className="overflow-hidden">
//                   <p className="anim-item text-[#FFD8E1] text-[19px] font-[avenirRoman] font-[400] leading-[1.3] mb-[50px] max-w-[75ch] mx-auto  text-center">
//                     We transform visions into living, breathing destinations. At
//                     Imtiaz Developments, our legacy is built on excellence,
//                     innovation, and uncompromising quality — delivering iconic
//                     properties that inspire and endure.
//                   </p>
//                 </div>
//                 <div className="overflow-hidden">
//                   <button className="anim-item cursor-pointer inline-block px-9 py-[19.5px] rounded-full border border-white text-white text-[17px] leading-[1] font-[avenirRoman] font-[400]">
//                     About Imtiaz
//                   </button>
//                 </div>
//               </div>
//             </div>
//           </div> */}
//                     {/* <div
//             ref={leftTextRef}
//             className="absolute left-0 top-1/2 -translate-y-1/2 w-1/2 h-auto overflow-hidden flex justify-end pr-4 z-20"
//           >
//             <div className="translate-x-1/2">
//               <AbtJour data={aboutSectionJourney} />
//             </div>
//           </div>

//           <div
//             ref={rightTextRef}
//             className="absolute right-0 top-1/2 -translate-y-1/2 w-1/2 h-auto overflow-hidden flex justify-start pl-4 z-20"
//           >
//             <div className="-translate-x-[53.2%]">
//               <AbtJour data={aboutSectionJourney} />
//             </div>
//           </div> */}
//                 </div>
//             </section>

//             <AboutJourneyV3 />
//             <ProSliderV3 slides={heroSlides} RightLabel="New Launches" />
//             {/* <ProSliderLaunchV3 slides={heroSlides} RightLabel="New Launches" /> */}
//             {/* <ProSliderV2ComingSoon
//         slides={heroSlidesComingSoon}
//         RightLabel="Coming Soon"
//       /> */}
//             <ProSliderComingSoonV3 slides={heroSlidesComingSoon} RightLabel="Coming Soon" />
//             {/* <CommunitySlider slides={communityYardData} /> */}
//             <CommunityNamesSlider slides={communityNamesData} />
//             <ImtiazProperties data={imtiazPropertiesData} />
//             <ConstructionProgress2 data={ConstructionProgressData} />
//             {/* <PressSpotlight data={pressSpotlightData} /> */}
//             {/* <PressSpotlightV3 data={pressSpotlightData} /> */}
//             <SpotlightSlider />
//             {/* <AppSection data={appSectionData} /> */}
//             <AppSectionV2 data={appSectionData} />
//         </>
//     );
// }

// "use client";

// import { useEffect, useRef } from "react";
// import gsap from "gsap";
// import { ScrollTrigger } from "gsap/ScrollTrigger";
// import Image from "next/image";

// import ProSliderComingSoonV3 from "../components/Home/sections/ProSliderComingSoonV3";
// import ProSliderV3 from "../components/Home/sections/ProsliderV3";
// import {
//   heroSlides,
//   ConstructionProgressData,
//   imtiazPropertiesData,
//   appSectionData,
//   communityNamesData,
//   heroSlidesComingSoon,
// } from "../components/Home/data";

// import ImtiazProperties from "../components/Home/sections/ImtiazPropsSlider";
// import ConstructionProgress2 from "../components/Home/sections/ConstructionProgress2";
// import AppSectionV2 from "../components/Home/sections/AppSection";
// import CommunityNamesSlider from "../components/Home/sections/CommunityNamesSlider";
// import AboutJourneyV3 from "../components/Home/sections/AboutJourneyV3";
// import SpotlightSlider from "../components/Home/sections/SpotlightSlider";
// import { useLenis } from "../contexts/LenisContext";

// gsap.registerPlugin(ScrollTrigger);

// export default function Home() {
//   const titleRef = useRef<HTMLHeadingElement>(null);
//   const scrollRef = useRef<HTMLImageElement>(null);
//   const { unlock } = useLenis();

//   useEffect(() => {
//     document.body.style.overflow = "hidden"; // lock until animation done
//   }, []);

//   useEffect(() => {
//     const startAnimations = () => {
//       document.body.style.overflow = "";
//       unlock();

//       const ctx = gsap.context(() => {
//         // Initial text fade-in
//         const t2 = gsap.timeline();
//         t2.fromTo(
//           titleRef.current,
//           { y: 40, opacity: 0 },
//           { y: 0, opacity: 1, duration: 1.2 },
//         ).fromTo(
//           scrollRef.current,
//           { y: 40, opacity: 0 },
//           { y: 0, opacity: 1, duration: 1 },
//           "-=0.3",
//         );

//         ScrollTrigger.create({
//           trigger: "#sec1",
//           start: "top top",
//           end: "bottom top",
//           pin: true,
//           pinSpacing: false,
//         });
//       });

//       window.dispatchEvent(new Event("homeAnimationsReady"));

//       setTimeout(() => {
//         ScrollTrigger.refresh();
//       }, 300);

//       return () => ctx.revert();
//     };

//     window.addEventListener("headerAnimationComplete", startAnimations);

//     return () => {
//       window.removeEventListener("headerAnimationComplete", startAnimations);
//     };
//   }, []);

//   return (
//     <>
//       <section
//         id="sec1"
//         className="h-screen bg-black text-white flex items-center justify-center relative text-center"
//       >
//         <div className="relative w-full h-screen overflow-hidden flex items-center justify-center text-center">
//           <video
//             className="absolute top-0 left-0 w-full object-cover h-[99.9%]"
//             src="/videos/BNR01.mp4"
//             poster="/videos/banner-vid.jpg"
//             autoPlay
//             loop
//             muted
//             playsInline
//           />

//           <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.3)_1.12%,rgba(0,0,0,0.15)_40.24%,rgba(0,0,0,0.75)_100%)] pointer-events-none" />

//           <div className="absolute bottom-[90px] 3xl:bottom-[90px] max-w-[135ch] flex flex-col gap-[40px] md:gap-[60px] 3xl:gap-[72px] items-center justify-center">
//             <div className="relative overflow-hidden">
//               <h1
//                 ref={titleRef}
//                 className="text-70 font-[optima] leading-[1.143] uppercase text-white opacity-0"
//               >
//                 Redefining Spaces <br />
//                 Elevating Lives
//               </h1>
//             </div>

//             <div className="overflow-hidden">
//               <Image
//                 ref={scrollRef}
//                 className="opacity-0 w-[30px]"
//                 alt=""
//                 src="/icons/mouse.svg"
//                 width={50}
//                 height={50}
//               />
//             </div>
//           </div>
//         </div>

//         <div
//           id="bar"
//           className="bg-primary absolute left-0 right-0 mx-auto z-10"
//         ></div>

//         <div className="img1-1 absolute w-full h-full z-20 inset-0 scale-[0] overflow-hidden">
//           <Image
//             className="img1-im w-full h-full object-cover object-center absolute scale-[1.5]"
//             src="/images/home/img01.jpg"
//             alt=""
//             width={2500}
//             height={1000}
//           />
//         </div>

//         <div className="img1-2 absolute w-full h-full z-30 inset-0 scale-[0] overflow-hidden">
//           <Image
//             className="img2-im w-full h-full object-cover object-center absolute scale-[1.5]"
//             src="/images/home/img02.jpg"
//             alt=""
//             width={2500}
//             height={1000}
//           />
//         </div>

//         <div className="img1-3 absolute w-full h-full z-40 inset-0 scale-[0] overflow-hidden">
//           <Image
//             className="img3-im w-full h-full object-cover object-center absolute scale-[1.5]"
//             src="/images/home/imtiaz-properties/2.png"
//             alt=""
//             width={2500}
//             height={1000}
//           />
//         </div>

//         <div className="split-section h-screen w-screen bg-transparent overflow-hidden flex items-center justify-center absolute z-50 scale-0"></div>
//       </section>

//       <AboutJourneyV3 />
//       <ProSliderV3 slides={heroSlides} RightLabel="New Launches" />
//       <ProSliderComingSoonV3
//         slides={heroSlidesComingSoon}
//         RightLabel="Coming Soon"
//       />
//       <CommunityNamesSlider slides={communityNamesData} />
//       <ImtiazProperties data={imtiazPropertiesData} />
//       <ConstructionProgress2 data={ConstructionProgressData} />
//       <SpotlightSlider />
//       <AppSectionV2 data={appSectionData} />
//     </>
//   );
// }

// "use client";

// import { useEffect, useRef } from "react";
// import gsap from "gsap";
// import { ScrollTrigger } from "gsap/ScrollTrigger";
// import Image from "next/image";

// import ProSliderComingSoonV3 from "../components/Home/sections/ProSliderComingSoonV3";
// import ProSliderV3 from "../components/Home/sections/ProsliderV3";
// import {
//   heroSlides,
//   ConstructionProgressData,
//   imtiazPropertiesData,
//   appSectionData,
//   communityNamesData,
//   heroSlidesComingSoon,
// } from "../components/Home/data";

// import ImtiazProperties from "../components/Home/sections/ImtiazPropsSlider";
// import ConstructionProgress2 from "../components/Home/sections/ConstructionProgress2";
// import AppSectionV2 from "../components/Home/sections/AppSection";
// import CommunityNamesSlider from "../components/Home/sections/CommunityNamesSlider";
// import AboutJourneyV3 from "../components/Home/sections/AboutJourneyV3";
// import SpotlightSlider from "../components/Home/sections/SpotlightSlider";
// import { useLenis } from "../contexts/LenisContext";

// gsap.registerPlugin(ScrollTrigger);

// export default function Home() {
//   const titleRef = useRef<HTMLHeadingElement>(null);
//   const scrollRef = useRef<HTMLImageElement>(null);
//   const { unlock } = useLenis();

//   useEffect(() => {
//     document.body.style.overflow = "hidden"; // lock until animation done
//   }, []);

//   useEffect(() => {
//     const startAnimations = () => {
//       document.body.style.overflow = "";
//       unlock();

//       const ctx = gsap.context(() => {
//         // Initial text fade-in
//         const t2 = gsap.timeline();
//         t2.fromTo(
//           titleRef.current,
//           { y: 40, opacity: 0 },
//           { y: 0, opacity: 1, duration: 1.2 },
//         ).fromTo(
//           scrollRef.current,
//           { y: 40, opacity: 0 },
//           { y: 0, opacity: 1, duration: 1 },
//           "-=0.3",
//         );

//         ScrollTrigger.create({
//           trigger: "#sec1",
//           start: "top top",
//           end: "bottom top",
//           pin: true,
//           pinSpacing: false,
//         });
//       });

//       window.dispatchEvent(new Event("homeAnimationsReady"));

//       setTimeout(() => {
//         ScrollTrigger.refresh();
//       }, 300);

//       return () => ctx.revert();
//     };

//     window.addEventListener("headerAnimationComplete", startAnimations);

//     return () => {
//       window.removeEventListener("headerAnimationComplete", startAnimations);
//     };
//   }, []);

//   return (
//     <>
//       <section
//         id="sec1"
//         className="h-screen bg-black text-white flex items-center justify-center relative text-center"
//       >
//         <div className="relative w-full h-screen overflow-hidden flex items-center justify-center text-center">
//           <video
//             className="absolute top-0 left-0 w-full object-cover h-[99.9%]"
//             src="/videos/BNR01.mp4"
//             poster="/videos/banner-vid.jpg"
//             autoPlay
//             loop
//             muted
//             playsInline
//           />

//           <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.3)_1.12%,rgba(0,0,0,0.15)_40.24%,rgba(0,0,0,0.75)_100%)] pointer-events-none" />

//           <div className="absolute bottom-[90px] 3xl:bottom-[90px] max-w-[135ch] flex flex-col gap-[40px] md:gap-[60px] 3xl:gap-[72px] items-center justify-center">
//             <div className="relative overflow-hidden">
//               <h1
//                 ref={titleRef}
//                 className="text-70 font-[optima] leading-[1.143] uppercase text-white opacity-0"
//               >
//                 Redefining Spaces <br />
//                 Elevating Lives
//               </h1>
//             </div>

//             <div className="overflow-hidden">
//               <Image
//                 ref={scrollRef}
//                 className="opacity-0 w-[30px]"
//                 alt=""
//                 src="/icons/mouse.svg"
//                 width={50}
//                 height={50}
//               />
//             </div>
//           </div>
//         </div>
//       </section>

//       <AboutJourneyV3 />
//       <ProSliderV3 slides={heroSlides} RightLabel="New Launches" />
//       <ProSliderComingSoonV3
//         slides={heroSlidesComingSoon}
//         RightLabel="Coming Soon"
//       />
//       <CommunityNamesSlider slides={communityNamesData} />
//       <ImtiazProperties data={imtiazPropertiesData} />
//       <ConstructionProgress2 data={ConstructionProgressData} />
//       <SpotlightSlider />
//       <AppSectionV2 data={appSectionData} />
//     </>
//   );
// }

import type { Metadata } from "next";
import Index from "@/app/components/Home/Index";
import {
  heroSlides,
  ConstructionProgressData,
  imtiazPropertiesData,
  appSectionData,
  communityNamesData,
  heroSlidesComingSoon,
  promotion,
} from "../components/Home/data";

async function getHomeData() {
  const response = await fetch(`${process.env.BASE_URL}/api/home.php?lang=en`, {
    next: { revalidate: 60 },
  });
  return response.json();
}

export async function generateMetadata(): Promise<Metadata> {
  const data = await getHomeData();
  const meta = data?.data;

  return {
    title: meta?.meta_title,
    description: meta?.meta_description,
    openGraph: {
      title: meta?.meta_title,
      description: meta?.meta_description,
    },
  };
}

export default async function Page() {
  const data = await getHomeData();

  const communitiesResponse = await fetch(
    `${process.env.BASE_URL}/api/communities.php?lang=en`,
    {
      next: { revalidate: 60 },
    },
  );
  const communitiesData = await communitiesResponse.json();

  const propertyResponse = await fetch(
    `${process.env.BASE_URL}/api/properties.php?lang=en`,
    {
      next: { revalidate: 60 },
    },
  );
  const propertiesData = await propertyResponse.json();

  return (
    <Index
      heroSlides={heroSlides}
      heroSlidesComingSoon={heroSlidesComingSoon}
      promotion={promotion}
      communityNamesData={communityNamesData}
      imtiazPropertiesData={imtiazPropertiesData}
      ConstructionProgressData={ConstructionProgressData}
      appSectionData={appSectionData}
      data={data.data}
      communitiesData={communitiesData.data}
      propertiesData={propertiesData.data}
    />
  );
}
