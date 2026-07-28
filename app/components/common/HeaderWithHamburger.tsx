// "use client";

// import { useState, useRef, useEffect } from "react";
// import { createPortal } from "react-dom";
// import clsx from "clsx";
// import Image from "next/image";
// import { ChevronDown } from "lucide-react";
// import gsap from "gsap";
// import { ScrollTrigger } from "gsap/all";
// import NavPageV3 from "./NavPageV3";
// import { motion, AnimatePresence } from "framer-motion";
// import AuthSlider from "../auth/AuthSlider";
// import SignupForm from "../auth/SignupForm";
// import LoginForm from "../auth/LoginForm";

// gsap.registerPlugin(ScrollTrigger);

// type AuthView = "login" | "signup";

// const HeaderWithHamburger = ({menuData}:{menuData:any}) => {
//   const [isMenuOpen, setIsMenuOpen] = useState(false);
//   const [showHeader, setShowHeader] = useState(true);
//   const [darkHeader, setDarkHeader] = useState(false);
//   const [authView, setAuthView] = useState<AuthView | null>(null);
//   const [mounted, setMounted] = useState(false);
//   const closeAuth = () => setAuthView(null);

//   const lastScroll = useRef(0);
//   const headerRef = useRef<HTMLDivElement>(null);
//   const [langPos, setLangPos] = useState({ top: 0, right: 0 });
//   const langBtnRef = useRef<HTMLButtonElement>(null);
//   const [langOpen, setLangOpen] = useState(false);
//   const langRef = useRef<HTMLDivElement>(null);

//   useEffect(() => {
//     const handler = (e: MouseEvent) => {
//       if (langRef.current && !langRef.current.contains(e.target as Node))
//         setLangOpen(false);
//     };
//     document.addEventListener("mousedown", handler);
//     return () => document.removeEventListener("mousedown", handler);
//   }, []);

//   // 👇 Only render portal after client mount
//   useEffect(() => {
//     setMounted(true);
//   }, []);

//   // useEffect(() => {
//   //   const handleScroll = () => {
//   //     const current = window.scrollY;

//   //     if (current > lastScroll.current && current > 300) {
//   //       setShowHeader(false);
//   //     } else {
//   //       setShowHeader(true);
//   //     }

//   //     lastScroll.current = current;
//   //   };

//   //   window.addEventListener("scroll", handleScroll);
//   //   return () => window.removeEventListener("scroll", handleScroll);
//   // }, []);

// useEffect(() => {
//   let ticking = false;

//   const handleScroll = () => {
//     const current = Math.max(window.scrollY, 0);
//     const delta = current - lastScroll.current;

//     if (Math.abs(delta) > 5) {
//       if (delta > 0 && current > 300) {
//         setShowHeader(false);
//       } else if (delta < 0) {
//         setShowHeader(true);
//       }
//       lastScroll.current = current;
//     }

//     ticking = false;
//   };

//   const onScroll = () => {
//     if (!ticking) {
//       ticking = true;
//       requestAnimationFrame(handleScroll);
//     }
//   };

//   window.addEventListener("scroll", onScroll, { passive: true });
//   return () => window.removeEventListener("scroll", onScroll);
// }, []);

//   useEffect(() => {
//     const w = window.innerWidth;

//     // Responsive start → end heights matching Tailwind breakpoints
//     let startH: string, endH: string, hdrcntsH: string;

//     if (w >= 1920) {
//       // 3xl
//       startH = "70px";
//       endH = "40px";
//       hdrcntsH = "80px";
//     } else if (w >= 1024) {
//       // lg
//       startH = "65px";
//       endH = "35px";
//       hdrcntsH = "75px";
//     } else if (w >= 768) {
//       // md
//       startH = "45px";
//       endH = "30px";
//       hdrcntsH = "65px";
//     } else if (w < 410 && w >= 375) {
//       startH = "40px";
//       endH = "20px";
//       hdrcntsH = "80px";
//     } else {
//       startH = "39px";
//       endH = "20px";
//       hdrcntsH = "70px";
//     }

//     gsap.set(".hdrlgs svg", { height: startH });

//     const tl = gsap.timeline();

//     tl.to(".group-1 path", { y: 0, opacity: 1, stagger: 0.15, duration: 0.8 })
//       // .to(".group-2 path", { y: 0, opacity: 1, stagger: 0.15, duration: 1 })
//       .to(".hdrcnts", { height: hdrcntsH, duration: 0.5 })
//       .to(".hdrlgs svg", { height: endH, duration: 0.5 }, "<")
//       .to(".ovrlyabg", { opacity: "0", duration: 0.6 })
//       .to(".bckbg", { height: "100%", duration: 0.6 }, "-=2")
//       .to(".bckbg", { height: "100%", width: "100%", duration: 0.8 })
//       .to(".ovrlyabg", { opacity: "0", zIndex: "-1", height: "0%" })
//       .fromTo(
//         ".mnhmns button",
//         { y: 40 },
//         { y: 0, opacity: 1, stagger: 0.2, duration: 1 },
//         "-=0.8",
//       )
//       .fromTo(
//         ".rgtbtn button",
//         { y: 40 },
//         { y: 0, opacity: 1, stagger: 0.2, duration: 1 },
//         "<",
//       )
//       .add(() => {
//         const w = window.innerWidth;
//         const finalH =
//           w >= 1620 ? "80px" : w >= 1024 ? "75px" : w >= 768 ? "65px" : "80px";
//         gsap.set(".bckbg", { height: finalH });
//         window.dispatchEvent(new Event("headerAnimationComplete"));
//       });
//   }, []);

//   useEffect(() => {
//     const check = () => {
//       const header = document.querySelector(".mnhdr") as HTMLElement;
//       if (!header) return;

//       const old = header.style.pointerEvents;
//       header.style.pointerEvents = "none";

//       const el = document.elementFromPoint(window.innerWidth / 2, 80);

//       header.style.pointerEvents = old;

//       if (!el) return;

//       let node: HTMLElement | null = el as HTMLElement;
//       let shouldBeBlack = false;

//       while (node && node !== document.body) {
//         if (node.classList.contains("make-header-black")) {
//           shouldBeBlack = true;
//           break;
//         }
//         node = node.parentElement;
//       }

//       setDarkHeader(shouldBeBlack);
//     };

//     window.addEventListener("scroll", check);
//     window.addEventListener("resize", check);
//     check();

//     return () => {
//       window.removeEventListener("scroll", check);
//       window.removeEventListener("resize", check);
//     };
//   }, []);

//   // useEffect(() => {
//   //   const handleScroll = () => {
//   //     const current = window.scrollY;
//   //     if (!headerRef.current) return;

//   //     if (current > lastScroll.current && current > 300) {
//   //       headerRef.current.style.transform =
//   //         "translateX(-50%) translateY(-100%)";
//   //     } else {
//   //       headerRef.current.style.transform = "translateX(-50%) translateY(0px)";
//   //     }

//   //     lastScroll.current = current;
//   //   };

//   //   window.addEventListener("scroll", handleScroll);
//   //   return () => window.removeEventListener("scroll", handleScroll);
//   // }, []);
//   const [isMobile, setIsMobile] = useState(false);

//   useEffect(() => {
//     const handleResize = () => {
//       setIsMobile(window.innerWidth < 768);
//     };

//     handleResize(); // initial check
//     window.addEventListener("resize", handleResize);

//     return () => window.removeEventListener("resize", handleResize);
//   }, []);
//   return (
//     <>
//       <div
//         id="header"
//         className={clsx(
//           "mnhdr fixed w-full z-[999] left-1/2 -translate-x-1/2 transition-all duration-500",
//           showHeader
//             ? "translate-y-0"
//             : "-translate-y-full pointer-events-none",
//         )}
//       >
//         <div className="ovrlyabg bg-black/60 w-full h-screen z-0 absolute"></div>
//         <header className="overflow-hidden w-full">
//           <div className="container   flex justify-center  lg:!px-[15px]">
//             <div className="hdrcnts flex items-center justify-between rounded-[150px] py-[30px] px-[20px] md:py-[15px] md:px-20 xl:pl-30 w-full relative h-screen  mt-5">
//               <div
//                 className={clsx(
//                   "bckbg backdrop-blur-[30px] left-1/2 w-0 -translate-x-1/2 absolute rounded-[150px] z-[-1] transition-colors duration-500",
//                   darkHeader ? "bg-black/60" : "bg-white/10",
//                 )}
//               ></div>

//               {/* ------- LEFT MENU ------- */}
//               <div className="flex items-center w-[35%] sm:w-[40%] 2xl:w-[33.33%] mnhmns">
//                 <button
//                   className="flex items-center justify-center w-[40px] h-[40px] cursor-pointer opacity-0"
//                   onClick={() => setIsMenuOpen(true)}
//                 >
//                   <Image
//                     src="/images/hamburger-desktop.svg"
//                     alt="menu"
//                     width={22}
//                     height={22}
//                     className="w-[18px] h-[16px] md:w-auto md:h-[15.13px]"
//                   />
//                 </button>
//               </div>

//               {/* ------- CENTER LOGO ------- */}
//               <div className="hdrlgs">
//                   <svg className="w-auto h-[60px]" id="eaSfcpdDOLI1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 133.1 24.2" shapeRendering="geometricPrecision" textRendering="geometricPrecision" project-id="313d9f857086497caad8e8067c79b740" export-id="67da73b20e1c4d4d90724f34fead18dd" ><g clipPath="url(#eaSfcpdDOLI9)" className="logo-group group-1"><path d="M56.9,2.9c1,0,2.2,0,3.2,0c2.2,0,4.3.4,6.5.9L66.1,0L43,0l-.6,3.8c2.1-.5,4.3-.8,6.5-.9c1,0,2.2,0,3.2,0v16.8c0,1.4-.3,3.2-.6,4.5h6.1c-.3-1.3-.6-3.2-.6-4.5v-16.8h-.1Z" fill="#fff"/><path d="M71.1,4.5c0-1.4-.3-3.2-.6-4.5h6.1c-.3,1.3-.6,3.2-.6,4.5v15.1c0,1.4.3,3.2.6,4.5h-6.1c.3-1.3.6-3.2.6-4.5v-15.1Z" fill="#fff"/><path d="M89.4,14.4l3.8-8.6L97,14.4h-7.6Zm-1.3,3.8c.2-.3.5-.6.8-.7.2,0,.3,0,.4-.1.5,0,.8,0,1.3,0c.7,0,1.6,0,2.5,0s1.8,0,2.5,0c.5,0,.8,0,1.3,0c.1,0,.3,0,.5.1.3,0,.6.3.8.7.5,1,1.2,2.5,1.9,4.2c0,.2.1.4.1.5c0,.3-.2.5-.5.8-.2.2-.4.4-.5.5h8c-.8-.9-1.5-1.9-2.1-2.9-1.6-2.5-2.7-5.4-3.9-8.1s-2.4-5.4-3.6-8.1c-.3-.7-.6-1.4-.9-2.1-.4-.8-1-2.4-1.2-3h-5.8c.2.2.4.4.6.6s.4.4.5.6c.2.6,0,1.2-.2,1.7-2.7,6.4-7.2,16.7-7.6,17.6-.6,1.3-1.5,2.5-2.4,3.7h6.6c-.2-.2-.3-.4-.5-.5-.3-.3-.4-.4-.5-.8c0-.2,0-.4.1-.5.7-1.6,1.4-3.2,1.9-4.2" fill="#fff"/><path d="M35.3,8c0,0,5.6,14.4,5.7,14.5c0,.2,0,.4,0,.6c0,.4-.2.8-.2,1.1h6.7l-.3-.4c-.6-.9-1.1-1.7-1.6-2.5-.5-.9-1-1.9-1.5-2.9L36.3,0h-4.9l1.3,3.3v0c.4.9.4,2,0,3l-4.4,11L21.1,0h-5.2c0,0,1.5,3.5,1.6,3.5.2.5.3,1,.3,1.5c0,.4,0,.7-.1,1.1-1.1,3.2-2.4,6.5-3.9,10.2-.3.8-.8,1.9-1.1,2.6-.1.4-.3.8-.5,1.2-.4.9-.7,1.7-1.2,2.5-.3.6-.6,1-.9,1.6h5.6c0,0-.2-.3-.4-.6-.2-.4-.4-.9-.3-1.4c0,0,0,0,0,0c.2-.8.4-1.6.7-2.4C17.1,16.2,20,8.1,20.1,8L27,24.2h2.3L35.5,8h-.2Z" fill="#fff"/><path d="M0.6,4.5C0.6,3.2,0.3,1.3,0,0h6.1c-.3,1.3-.6,3.2-.6,4.5v15.1c0,1.4.3,3.2.6,4.5h-6.1c.3-1.3.6-3.2.6-4.5v-15.1Z" fill="#fff"/><path d="M132.2,24.2l.9-3.8c-2.4.6-4.8.9-7.3.9-2.4,0-6.7,0-9,0c1.8-2.4,14.4-18.7,16.3-21.3h-23.3l-.9,3.8c2.4-.6,4.8-.9,7.3-.9c2.4,0,6.6,0,9,0L109.1,24.2h23.1Z" fill="#fff"/><clipPath id="eaSfcpdDOLI9"><rect width="133.1" height="24.200001" rx="0" ry="0" transform="matrix(1.000003 0 0 1.000003 -0.0002 -0.000035)" fill="#d2dbed" strokeWidth="0"/></clipPath></g></svg>

//                 {/* <svg
//                   className="w-auto"
//                   id="ekcavZ6yIE91"
//                   xmlns="http://www.w3.org/2000/svg"
//                   viewBox="0 0 183 50"
//                   shapeRendering="geometricPrecision"
//                   textRendering="geometricPrecision"
//                   project-id="1b9e9c8c7e8940c6a5e9634ed0e26e37"
//                   export-id="63f0341249714b0f8c20b33a3ec98203"
//                 >
//                   <g clipPath="url(#ekcavZ6yIE927)">
//                     <g>
//                       <g>
//                         <g
//                           className="logo-group group-1"
//                           mask="url(#ekcavZ6yIE912)"
//                         >
//                           <path
//                             d="M59.3311,0.105377L58.543,5.10916l.549-.12513c2.7667-.62733,5.6075-.97968,8.4467-1.04719h4.2011v23.27526c-.0033,1.7338-.2407,3.4001-.6859,4.8177l-.155.494h8.206l-.1566-.494c-.4452-1.416-.6826-3.0823-.6859-4.816v-23.27696h4.2027c2.8376.06751,5.6801.41986,8.4468,1.04719l.549.12513-.7881-5.003783h-31.3401-.0016Z"
//                             fill="#fff"
//                           />
//                           <path
//                             d="M104.833,31.2691l-.02-.0642c-.097-.2947-.174-.5977-.231-.9023l-.158-2.0021v-23.77421l.158-2.00217c.057-.30461.134-.60921.231-.90394l.004-.00823c.099-.32601.201-.665199.303-1.020848l.14-.485725h-8.2388l.1401.485725c.1039.357296.2077.701418.3034,1.020848l.0033.00823c.0973.29473.1731.59769.2292.90394l.1582,2.00053v23.77585l-.1582,2.0021c-.0561.3063-.1336.6109-.2292.904l-.0066.0197c-.0775.2552-.183.6027-.2506.7064l-.3924.5911h8.6446l-.391-.5911c-.064-.0988-.161-.41-.239-.6652"
//                             fill="#fff"
//                           />
//                           <path
//                             d="M60.1012,28.6347c-.6727-1.1904-1.3356-2.483-1.972-3.843l-3.6834-8.5339-1.4229-3.3952L47.427,0.019756l-.6463.011526h-5.9258L42.662,4.5016l.0033.00987c.5441,1.24313.5771,2.68713.0907,3.96154L37.6645,23.1831L28.306,0.042808l-7.0617-.011526L23.3432,4.73869c.5491,1.2316.5936,2.66902.1237,3.94178-.0198.05269-.038.10538-.0561.15313-.0198.05598-.0396.10867-.0577.15807-1.3504,3.65203-2.9546,7.75843-4.7699,12.20073l-1.7444,4.1641-.0083.0247c-.1236.3622-.2704.7179-.432,1.057l-.2423.5434c-.1798.4034-.3215.7228-.4304.955l-.0049.0115c-.3594.8513-.7749,1.6811-1.23,2.4616-.4105.6849-.6941,1.164-.9002,1.5592l-.2919.5565h7.6702l-.9217-1.5395c-.0577-.382-.061-.7705-.0115-1.1542.2687-1.4489.6941-2.855,1.2646-4.1772l.0082-.0198c1.8302-5.0038,3.3751-9.204,4.9661-13.4307.0099-.0181.0182-.0378.0248-.0576.1319-.3523.2654-.7047.399-1.0554.0412-.112.0841-.2223.1253-.3326l8.0164,21.7687h3.7592l7.1178-21.2797c.2687.6257.5342,1.2382.7947,1.8309.5161,1.1905,1.0288,2.3809,1.5416,3.573.5293,1.23,1.0783,2.5011,1.6191,3.7508l.3743.8628c.6298,1.4555,1.2811,2.9604,1.9274,4.434l.1154.2816.094.3293.0165.0313c.0659.1301.1302.2684.1978.4231l.0033.0083c.2177.4692.4419,1.0077.6876,1.6482l.0049.0115c.249.5944.4749,1.2135.6711,1.8342.0841.2783,0,.6767-.1171,1.2283-.0362.1745-.0775.3721-.1187.5845l-.0857.4512h9.1804l-.4221-.601c-.8112-1.1509-1.4971-2.2278-2.0972-3.2898"
//                             fill="#fff"
//                           />
//                           <path
//                             d="M7.52309,2.49448c.05606-.30296.1319-.60592.22918-.89735l.0033-.00823c.10057-.33425.1995-.663553.30172-1.014262l.1418-.485725h-8.199394l.140146.485725c.102225.354002.206098.696482.301727,1.014262v.00823c.098927.29308.174771.59604.23083.899l.158283,1.989v23.63587l-.158283,1.9923c-.056059.3029-.133552.6059-.229181.8973l-.003298.0083c-.095629.3178-.199502.6602-.301727,1.0142l-.140146.4858h8.196093L8.054,32.0331c-.07585-.2634-.15169-.517-.23578-.7969l.00659-.0066-.07419-.2223c-.09563-.293-.17312-.5943-.22918-.8973l-.15828-1.9907v-23.63581l.15828-1.99065.00165.00164Z"
//                             fill="#fff"
//                           />
//                           <path
//                             d="M142.903,28.4322c-1.686-2.7118-3-5.6822-4.27-8.5554-.265-.6009-.537-1.2102-.8-1.798-.468-1.0439-.934-2.0878-1.401-3.1333-.234-.5236-.468-1.0472-.702-1.5708-.274-.6125-.549-1.2266-.823-1.8392-.427-.9549-.854-1.90992-1.283-2.8682-.313-.6866-.626-1.39131-.931-2.07297l-.179-.39846c-.338-.76069-.689-1.54773-1.038-2.3216L129.871,0h-7.793l1.055,1.11305c.351.36718.374.44456.412.57464l.008.02963c.047.20911.068.41164.063.59934-.015.39023-.081.77881-.196,1.15915l-.035.11197c-.028.09549-.058.19429-.087.27826-3.88,8.91926-10.104,23.20446-10.308,23.61116-.422.8578-.906,1.6844-1.436,2.4566-.39.5631-.706,1.0126-.965,1.3798l-.819,1.1707h8.985l-1.408-1.9166c-.051-.3178-.051-.6454,0-.9714.038-.1367.368-1.0736,2.922-7.2826.907-.2387,1.822-.3804,2.722-.4182l6.935-.0033c.918.0411,1.845.1844,2.755.4281.491,1.0175,2.659,5.5307,3.664,8.091.023.354-.104.7031-.353.9649l-1.064,1.1147l10.958-.0198-.866-1.0686c-.774-.9566-1.488-1.9561-2.121-2.972M130.854,17.9817h-8.78c.968-2.3397,3.168-7.6514,4.216-10.1673l4.564,10.1673Z"
//                             fill="#fff"
//                           />
//                           <path
//                             d="M172.613,28.6973l-8.961.1235-2.546.023.688-.8908L183.001,0.102085h-30.631L151.161,5.1388l.594-.13007c3.126-.6866,6.336-1.05049,9.536-1.07848h10.973L156.373,24.3686l-6.371,8.1585h21.823.869h8.839l1.209-5.0367-.594.13c-3.126.6866-6.336,1.0505-9.536,1.0785"
//                             fill="#fff"
//                           />
//                           <mask
//                             id="ekcavZ6yIE912"
//                             mask-type="luminance"
//                             x="-150%"
//                             y="-150%"
//                             height="400%"
//                             width="400%"
//                           >
//                             <rect
//                               width="183"
//                               height="32.425023"
//                               rx="0"
//                               ry="0"
//                               transform="translate(0 0.105377)"
//                               fill="#d2dbed"
//                               strokeWidth="0"
//                             />
//                           </mask>
//                         </g>
//                       </g>
//                       <g className="logo-group group-2">
//                         <path
//                           d="M25.1641,49.7942v-8.1931h1.7032c1.1656,0,2.0197.0856,2.5655.2568.5441.1713,1.0156.4413,1.4113.8101s.7008.82.9134,1.3518.3199,1.1542.3199,1.8655-.1665,1.3798-.4979,2.0088c-.3314.6273-.7815,1.1015-1.3487,1.4209-.5672.3195-1.385.4792-2.4501.4792h-2.6166Zm.7881-.7755h.948c.9909,0,1.7082-.0494,2.1533-.1482s.836-.2948,1.1707-.5878.5902-.6488.765-1.067.2622-.8973.2622-1.4374-.1023-1.0389-.3034-1.495c-.2028-.4561-.4897-.8332-.8623-1.1296s-.8129-.4972-1.319-.5993-1.2515-.1531-2.2341-.1531h-.5821v6.619l.0017-.0016Z"
//                           fill="#fff"
//                         />
//                         <path
//                           d="M38.0176,41.6011h4.7073v.8101h-3.8846v2.557h3.8499v.7986h-3.8499v3.2173h3.8499v.8101h-4.6726v-8.1931Z"
//                           fill="#fff"
//                         />
//                         <path
//                           d="M47.8535,41.6011h.892l2.7189,6.5383l2.765-6.5383h.892L51.5451,50h-.1714l-3.5202-8.3989Z"
//                           fill="#fff"
//                         />
//                         <path
//                           d="M60.8457,41.6011h4.7073v.8101h-3.8846v2.557h3.8516v.7986h-3.8516v3.2173h3.8516v.8101h-4.6743v-8.1931Z"
//                           fill="#fff"
//                         />
//                         <path
//                           d="M71.3008,41.6011h.8343v7.406h3.1524v.7871h-3.9867v-8.1931Z"
//                           fill="#fff"
//                         />
//                         <path
//                           d="M80.5664,45.7322c0-.7903.1913-1.5214.5721-2.1915.3809-.6685.9019-1.1937,1.5647-1.5741.6628-.3803,1.385-.5713,2.1649-.5713s1.5086.1893,2.183.5647c.6743.3771,1.2036.8974,1.5877,1.5642.3842.6652.5771,1.388.5771,2.1685c0,.7804-.1896,1.5016-.5705,2.1685-.3808.6652-.9035,1.1888-1.5713,1.5691-.6661.3803-1.3899.5697-2.1714.5697s-1.507-.1877-2.1764-.5648c-.671-.377-1.1987-.8957-1.5828-1.5576-.3842-.6619-.5771-1.3765-.5771-2.1454Zm7.7922-.0346c0-.9813-.3413-1.8095-1.0223-2.4879-.6826-.6767-1.502-1.0159-2.4616-1.0159s-1.8038.3409-2.4617,1.0209c-.6595.6816-.9876,1.5098-.9876,2.4879s.338,1.8046,1.0173,2.4813c.6777.6767,1.4971,1.0159,2.4567,1.0159s1.7774-.331,2.4501-.9929c.6744-.6619,1.0107-1.4983,1.0107-2.5109"
//                           fill="#fff"
//                         />
//                         <path
//                           d="M95.1895,41.6011h1.6339c.9678,0,1.5993.0378,1.8961.1136.2968.0757.5688.2091.8178.4001.2473.1893.4402.4281.5767.7129.137.2849.206.6027.206.9534c0,.5631-.153,1.0225-.4563,1.3814-.305.3573-.6875.5845-1.1492.6784-.4616.0955-1.1673.1432-2.1203.1432h-.582v3.8101h-.8227v-8.1931Zm.8227.8002v2.7958h1.3833c.8294.0148,1.3817-.1202,1.657-.4051.2754-.2848.4106-.6223.4106-1.0093c0-.9204-.6661-1.3814-2-1.3814h-1.4509Z"
//                           fill="#fff"
//                         />
//                         <path
//                           d="M105.932,49.7942l1.165-8.1931h.126l3.335,6.7211l3.314-6.7211h.125l1.178,8.1931h-.811l-.8-5.8649-2.902,5.8649h-.206l-2.937-5.9094-.799,5.9094h-.788Z"
//                           fill="#fff"
//                         />
//                         <path
//                           d="M121.15,41.6011h4.708v.8101h-3.885v2.557h3.85v.7986h-3.85v3.2173h3.85v.8101h-4.673v-8.1931Z"
//                           fill="#fff"
//                         />
//                         <path
//                           d="M131.615,49.7942v-8.1931h.183l5.449,6.2765v-6.2765h.812v8.1931h-.183l-5.417-6.1959v6.1959h-.844Z"
//                           fill="#fff"
//                         />
//                         <path
//                           d="M143.59,42.4013v-.8002h4.501v.8002h-1.827v7.3929h-.834v-7.3929h-1.84Z"
//                           fill="#fff"
//                         />
//                         <path
//                           d="M152.764,48.2662l.697-.41c.488.8974,1.055,1.3469,1.703,1.3469.419,0,.777-.1334,1.074-.4001.296-.2668.445-.5977.445-.9929c0-.3112-.125-.6273-.378-.9467-.252-.3195-.668-.6982-1.251-1.1361-.584-.4364-.975-.764-1.177-.9814s-.35-.4478-.446-.6964c-.095-.247-.143-.4956-.143-.7476c0-.5318.188-.9829.566-1.3518.377-.3688.85-.5532,1.422-.5532.451,0,.843.112,1.178.3359.334.2239.659.5565.971.9978l-.663.5137c-.213-.2898-.434-.5285-.663-.7195s-.508-.2849-.839-.2849-.602.0988-.811.2964c-.21.1976-.315.4495-.315.7525c0,.3029.092.5697.28.7936.186.2239.608.5796,1.268,1.0669.66.4874,1.139.9353,1.439,1.3469.302.4116.452.8447.452,1.3008c0,.5943-.231,1.1097-.691,1.546-.461.438-.996.6554-1.604.6554-1.073,0-1.913-.578-2.513-1.7338"
//                           fill="#fff"
//                         />
//                       </g>
//                     </g>
//                     <clipPath id="ekcavZ6yIE927">
//                       <rect width="183" height="50" rx="0" ry="0" fill="#fff" />
//                     </clipPath>
//                   </g>
//                 </svg> */}
//               </div>

//               {/* RIGHT — Icons */}
//               <div className="w-[35%] 2xl:w-[33.33%] flex justify-end">
//                 <div className="flex items-center gap-[5px] sm:gap-[10px] rgtbtn">
//                   <button
//                     onClick={() => setAuthView("login")}
//                     className="flex group items-center justify-center w-[24px] h-[24px] sm:w-[32px] sm:h-[32px] bg-white/25 backdrop-blur-[30px] rounded-full cursor-pointer opacity-0"
//                   >
//                     <Image
//                       src="/images/account.svg"
//                       alt="account"
//                       width={14}
//                       height={15}
//                       className="invert w-[10px] h-[12px] sm:h-[15.16px] sm:w-[14px] w-auto group-hover:scale-110 transition-all duration-400"
//                     />
//                   </button>

//                   {/* <div className="relative" ref={langRef}>
//                     <button
//                       ref={langBtnRef}
//                       onClick={() => {
//                         if (!langOpen && langBtnRef.current) {
//                           const rect =
//                             langBtnRef.current.getBoundingClientRect();
//                           setLangPos({
//                             top: rect.bottom + 8,
//                             right: window.innerWidth - rect.right,
//                           });
//                         }
//                         setLangOpen((p) => !p);
//                       }}
//                       className="group flex items-center justify-center gap-[5px] sm:gap-[10px] md:gap-[8px] w-auto px-[7px] py-[6px]  md:px-[6px]  bg-white/25  backdrop-blur-[30px]  rounded-full cursor-pointer opacity-0 sm:h-[32px]"
//                     >
//                       <Image
//                         src="/images/map.svg"
//                         alt="map"
//                         width={24}
//                         height={24}
//                         className="invert h-[12.24px] sm:h-[24px] w-auto group-hover:scale-110 transition-all duration-400"
//                       />
//                       <div className="block">
//                         <ChevronDown className="text-white w-[12px] h-[12px] sm:w-[18px] sm:h-[18px]" />
//                       </div>
//                     </button>

//                     {mounted &&
//                       createPortal(
//                         <AnimatePresence>
//                           {langOpen && (
//                             <motion.div
//                               initial={{
//                                 opacity: 0,
//                                 clipPath: "inset(0% 0% 100% 0% round 12px)",
//                               }}
//                               animate={{
//                                 opacity: 1,
//                                 clipPath: "inset(0% 0% 0% 0% round 12px)",
//                               }}
//                               exit={{
//                                 opacity: 0,
//                                 clipPath: "inset(0% 0% 100% 0% round 12px)",
//                               }}
//                               transition={{
//                                 duration: 0.5,
//                                 ease: [0.76, 0, 0.24, 1],
//                                 opacity: { duration: 0.3, ease: "easeIn" },
//                               }}
//                               style={{
//                                 transformOrigin: "top",
//                                 position: "fixed",
//                                 top: langPos.top,
//                                 right: langPos.right,
//                                 zIndex: 9999,
//                               }}
//                               className="bg-white/25 backdrop-blur-[30px] rounded-[12px] overflow-hidden"
//                             >
//                               <button
//                                 onClick={() => setLangOpen(false)}
//                                 className="w-full text-left px-5 py-2 text-white text-[14px] font-[avenirRoman] hover:bg-white/10 transition-colors duration-150"
//                               >
//                                 العربية
//                               </button>
//                             </motion.div>
//                           )}
//                         </AnimatePresence>,
//                         document.body,
//                       )}
//                   </div> */}
//                 </div>
//               </div>
//             </div>
//           </div>
//         </header>
//       </div>

//       {mounted &&
//         createPortal(
//           <AnimatePresence mode="wait">
//             {authView && (
//               <>
//                 <motion.div
//                   key="auth-backdrop"
//                   className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[1000]"
//                   initial={{ opacity: 0 }}
//                   animate={{ opacity: 1 }}
//                   exit={{ opacity: 0 }}
//                   onClick={closeAuth}
//                 />

//                 <motion.div
//                   className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[1001] w-full h-full  "
//                   initial={{ opacity: 0, scale: 0.96 }}
//                   animate={{ opacity: 1, scale: 1 }}
//                   exit={{ opacity: 0, scale: 0.96 }}
//                   transition={{ duration: 0.2, ease: [0.25, 1, 0.5, 1] }}
//                 >
//                   <div className="flex w-full overflow-hidden bg-white h-full">
//                     <div className="relative h-full flex-shrink-0 hidden md:block md:w-[48.4%]">
//                       <AuthSlider />
//                     </div>

//                     <div className="relative w-full md:w-[51.6%] h-full bg-white overflow-hidden pointer-events-none">
//                       {/* Background decoration — behind scroll layer */}
//                       <div className="absolute bottom-0 left-0 pointer-events-none">
//                         <Image
//                           src="/icons/layout_icons/m-icon.svg"
//                           alt="Icon"
//                           width={534}
//                           height={704}
//                         />
//                       </div>

//                       <AnimatePresence mode="wait">
//                         <motion.div
//                           key={authView}
//                           className="absolute inset-0 flex items-start justify-center overflow-y-auto py-150 3xl:py-0 pointer-events-auto dark-section-2"
//                           onWheel={(e) => e.stopPropagation()}
//                           onTouchMove={(e) => e.stopPropagation()}
//                           initial={{ opacity: 0, x: 40 }}
//                           animate={{ opacity: 1, x: 0 }}
//                           exit={{ opacity: 0, x: -40 }}
//                           transition={{
//                             duration: 0.25,
//                             ease: [0.25, 1, 0.5, 1],
//                           }}
//                         >
//                           {authView === "login" ? (
//                             <LoginForm
//                               onClose={closeAuth}
//                               onSwitch={() => setAuthView("signup")}
//                             />
//                           ) : (
//                             <SignupForm
//                               onClose={closeAuth}
//                               onSwitch={() => setAuthView("login")}
//                             />
//                           )}
//                         </motion.div>
//                       </AnimatePresence>
//                     </div>
//                   </div>
//                 </motion.div>
//               </>
//             )}
//           </AnimatePresence>,
//           document.body,
//         )}

//       {/* ========================= SIDEBAR ========================= */}
//       {mounted &&
//         createPortal(
//           <AnimatePresence>
//             {isMenuOpen && (
//               <>
//                 <motion.div
//                   className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[998]"
//                   initial={{ opacity: 0 }}
//                   animate={{ opacity: 1 }}
//                   exit={{ opacity: 0 }}
//                   onClick={() => setIsMenuOpen(false)}
//                 />
//                 <motion.div
//                   className="fixed inset-0 z-[999]"
//                   initial={{ y: "-100%" }}
//                   animate={{ y: 0 }}
//                   exit={{ y: "-100%" }}
//                   transition={{ duration: 0.6, ease: [0.25, 1, 0.5, 1] }}
//                 >
//                   <NavPageV3 setIsMenuOpen={setIsMenuOpen} menuData={menuData}/>
//                 </motion.div>
//               </>
//             )}
//           </AnimatePresence>,
//           document.body,
//         )}
//     </>
//   );
// };

// export default HeaderWithHamburger;

"use client";

import { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import clsx from "clsx";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import NavPageV3 from "./NavPageV3";
import { motion, AnimatePresence } from "framer-motion";
import AuthSlider from "../auth/AuthSlider";
import SignupForm from "../auth/SignupForm";
import LoginForm from "../auth/LoginForm";
import Link from "next/link";

gsap.registerPlugin(ScrollTrigger);

type AuthView = "login" | "signup";

const HeaderWithHamburger = ({ menuData }: { menuData: any }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showHeader, setShowHeader] = useState(true);
  const [darkHeader, setDarkHeader] = useState(false);
  const [authView, setAuthView] = useState<AuthView | null>(null);
  const [mounted, setMounted] = useState(false);
  const closeAuth = () => setAuthView(null);

  const lastScroll = useRef(0);
  const headerRef = useRef<HTMLDivElement>(null);
  const [langPos, setLangPos] = useState({ top: 0, right: 0 });
  const langBtnRef = useRef<HTMLButtonElement>(null);
  const [langOpen, setLangOpen] = useState(false);
  const langRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (langRef.current && !langRef.current.contains(e.target as Node))
        setLangOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  // 👇 Only render portal after client mount
  useEffect(() => {
    setMounted(true);
  }, []);

  // useEffect(() => {
  //   let ticking = false;

  //   const handleScroll = () => {
  //     const current = Math.max(window.scrollY, 0);
  //     const delta = current - lastScroll.current;

  //     if (Math.abs(delta) > 5) {
  //       if (delta > 0 && current > 300) {
  //         setShowHeader(false);
  //       } else if (delta < 0) {
  //         setShowHeader(true);
  //       }
  //       lastScroll.current = current;
  //     }

  //     ticking = false;
  //   };

  //   const onScroll = () => {
  //     if (!ticking) {
  //       ticking = true;
  //       requestAnimationFrame(handleScroll);
  //     }
  //   };

  //   window.addEventListener("scroll", onScroll, { passive: true });
  //   return () => window.removeEventListener("scroll", onScroll);
  // }, []);

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      const current = Math.max(window.scrollY, 0);

      // rubber-band guard: at/near top, always show, don't trust delta
      if (current <= 0) {
        setShowHeader(true);
        lastScroll.current = 0;
        ticking = false;
        return;
      }

      const delta = current - lastScroll.current;

      if (Math.abs(delta) > 5) {
        if (delta > 0 && current > 300) {
          setShowHeader(false);
        } else if (delta < 0) {
          setShowHeader(true);
        }
        lastScroll.current = current;
      }

      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(handleScroll);
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const w = window.innerWidth;
    const vh = window.innerHeight;

    const getHeaderMetrics = (w: number) => {
      if (w >= 1920) return { startH: "70px", endH: "40px", hdrcntsH: "80px" };
      if (w >= 1024) return { startH: "65px", endH: "35px", hdrcntsH: "75px" };
      if (w >= 768) return { startH: "45px", endH: "30px", hdrcntsH: "65px" };
      if (w >= 375) return { startH: "40px", endH: "20px", hdrcntsH: "80px" };
      return { startH: "39px", endH: "20px", hdrcntsH: "70px" };
    };

    const { startH, endH, hdrcntsH } = getHeaderMetrics(w);

    // exact pixel height of the real viewport — no vh guessing, no clipping bug
    gsap.set(".hdrcnts", { height: vh });
    gsap.set(".hdrlgs svg", { height: startH });

    const tl = gsap.timeline();

    tl.to(".group-1 path", { y: 0, opacity: 1, stagger: 0.15, duration: 0.8 })
      .to(".hdrcnts", { height: hdrcntsH, duration: 0.5 })
      .to(".hdrlgs svg", { height: endH, duration: 0.5 }, "<")
      .to(".ovrlyabg", { opacity: "0", duration: 0.6 })
      .to(".bckbg", { height: "100%", duration: 0.6 }, "-=2")
      .to(".bckbg", { height: "100%", width: "100%", duration: 0.8 })
      .to(".ovrlyabg", { opacity: "0", zIndex: "-1", height: "0%" })
      .fromTo(
        ".mnhmns button",
        { y: 40 },
        { y: 0, opacity: 1, stagger: 0.2, duration: 1 },
        "-=0.8",
      )
      .fromTo(
        ".rgtbtn button",
        { y: 40 },
        { y: 0, opacity: 1, stagger: 0.2, duration: 1 },
        "<",
      )
      .add(() => {
        gsap.set(".bckbg", { height: hdrcntsH }); // matches hdrcnts exactly, no drift
        window.dispatchEvent(new Event("headerAnimationComplete"));
      });
  }, []);

  useEffect(() => {
    const check = () => {
      const header = document.querySelector(".mnhdr") as HTMLElement;
      if (!header) return;

      const old = header.style.pointerEvents;
      header.style.pointerEvents = "none";

      const el = document.elementFromPoint(window.innerWidth / 2, 80);

      header.style.pointerEvents = old;

      if (!el) return;

      let node: HTMLElement | null = el as HTMLElement;
      let shouldBeBlack = false;

      while (node && node !== document.body) {
        if (node.classList.contains("make-header-black")) {
          shouldBeBlack = true;
          break;
        }
        node = node.parentElement;
      }

      setDarkHeader(shouldBeBlack);
    };

    window.addEventListener("scroll", check);
    window.addEventListener("resize", check);
    check();

    return () => {
      window.removeEventListener("scroll", check);
      window.removeEventListener("resize", check);
    };
  }, []);

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    handleResize(); // initial check
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);
  return (
    <>
      <div
        id="header"
        className={clsx(
          "mnhdr fixed w-full z-[999] left-1/2 -translate-x-1/2 transition-transform duration-500",
          showHeader
            ? "translate-y-0"
            : "-translate-y-full pointer-events-none",
        )}
      >
        <div className="ovrlyabg bg-black/60 w-full h-[100dvh] z-0 absolute"></div>
        {/* <header className="overflow-hidden w-full"> */}
        <header className="w-full">
          <div className="container   flex justify-center  lg:!px-[15px]">
            <div className="hdrcnts flex items-center justify-between rounded-[150px] py-[30px] px-[20px] md:py-[15px] md:px-20 xl:pl-30 w-full relative h-[100dvh]  mt-5">
              <div
                className={clsx(
                  "bckbg backdrop-blur-[30px] left-1/2 w-0 -translate-x-1/2 absolute rounded-[150px] z-[-1] transition-colors duration-500",
                  darkHeader ? "bg-black/60" : "bg-white/10",
                )}
              ></div>

              {/* ------- LEFT MENU ------- */}
              <div className="flex items-center w-[35%] sm:w-[40%] 2xl:w-[33.33%] mnhmns">
                <button
                  className="flex items-center justify-center w-[40px] h-[40px] cursor-pointer opacity-0"
                  onClick={() => setIsMenuOpen(true)}
                >
                  <Image
                    src="/images/hamburger-desktop.svg"
                    alt="menu"
                    width={22}
                    height={22}
                    className="w-[18px] h-[16px] md:w-auto md:h-[15.13px]"
                  />
                </button>
              </div>

              {/* ------- CENTER LOGO ------- */}
              <Link className="hdrlgs cursor-pointer" href={"/"}>
                <svg
                  className="w-auto h-[60px]"
                  id="eaSfcpdDOLI1"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 133.1 24.2"
                  shapeRendering="geometricPrecision"
                  textRendering="geometricPrecision"
                  project-id="313d9f857086497caad8e8067c79b740"
                  export-id="67da73b20e1c4d4d90724f34fead18dd"
                >
                  <g
                    clipPath="url(#eaSfcpdDOLI9)"
                    className="logo-group group-1"
                  >
                    <path
                      d="M56.9,2.9c1,0,2.2,0,3.2,0c2.2,0,4.3.4,6.5.9L66.1,0L43,0l-.6,3.8c2.1-.5,4.3-.8,6.5-.9c1,0,2.2,0,3.2,0v16.8c0,1.4-.3,3.2-.6,4.5h6.1c-.3-1.3-.6-3.2-.6-4.5v-16.8h-.1Z"
                      fill="#fff"
                    />
                    <path
                      d="M71.1,4.5c0-1.4-.3-3.2-.6-4.5h6.1c-.3,1.3-.6,3.2-.6,4.5v15.1c0,1.4.3,3.2.6,4.5h-6.1c.3-1.3.6-3.2.6-4.5v-15.1Z"
                      fill="#fff"
                    />
                    <path
                      d="M89.4,14.4l3.8-8.6L97,14.4h-7.6Zm-1.3,3.8c.2-.3.5-.6.8-.7.2,0,.3,0,.4-.1.5,0,.8,0,1.3,0c.7,0,1.6,0,2.5,0s1.8,0,2.5,0c.5,0,.8,0,1.3,0c.1,0,.3,0,.5.1.3,0,.6.3.8.7.5,1,1.2,2.5,1.9,4.2c0,.2.1.4.1.5c0,.3-.2.5-.5.8-.2.2-.4.4-.5.5h8c-.8-.9-1.5-1.9-2.1-2.9-1.6-2.5-2.7-5.4-3.9-8.1s-2.4-5.4-3.6-8.1c-.3-.7-.6-1.4-.9-2.1-.4-.8-1-2.4-1.2-3h-5.8c.2.2.4.4.6.6s.4.4.5.6c.2.6,0,1.2-.2,1.7-2.7,6.4-7.2,16.7-7.6,17.6-.6,1.3-1.5,2.5-2.4,3.7h6.6c-.2-.2-.3-.4-.5-.5-.3-.3-.4-.4-.5-.8c0-.2,0-.4.1-.5.7-1.6,1.4-3.2,1.9-4.2"
                      fill="#fff"
                    />
                    <path
                      d="M35.3,8c0,0,5.6,14.4,5.7,14.5c0,.2,0,.4,0,.6c0,.4-.2.8-.2,1.1h6.7l-.3-.4c-.6-.9-1.1-1.7-1.6-2.5-.5-.9-1-1.9-1.5-2.9L36.3,0h-4.9l1.3,3.3v0c.4.9.4,2,0,3l-4.4,11L21.1,0h-5.2c0,0,1.5,3.5,1.6,3.5.2.5.3,1,.3,1.5c0,.4,0,.7-.1,1.1-1.1,3.2-2.4,6.5-3.9,10.2-.3.8-.8,1.9-1.1,2.6-.1.4-.3.8-.5,1.2-.4.9-.7,1.7-1.2,2.5-.3.6-.6,1-.9,1.6h5.6c0,0-.2-.3-.4-.6-.2-.4-.4-.9-.3-1.4c0,0,0,0,0,0c.2-.8.4-1.6.7-2.4C17.1,16.2,20,8.1,20.1,8L27,24.2h2.3L35.5,8h-.2Z"
                      fill="#fff"
                    />
                    <path
                      d="M0.6,4.5C0.6,3.2,0.3,1.3,0,0h6.1c-.3,1.3-.6,3.2-.6,4.5v15.1c0,1.4.3,3.2.6,4.5h-6.1c.3-1.3.6-3.2.6-4.5v-15.1Z"
                      fill="#fff"
                    />
                    <path
                      d="M132.2,24.2l.9-3.8c-2.4.6-4.8.9-7.3.9-2.4,0-6.7,0-9,0c1.8-2.4,14.4-18.7,16.3-21.3h-23.3l-.9,3.8c2.4-.6,4.8-.9,7.3-.9c2.4,0,6.6,0,9,0L109.1,24.2h23.1Z"
                      fill="#fff"
                    />
                    <clipPath id="eaSfcpdDOLI9">
                      <rect
                        width="133.1"
                        height="24.200001"
                        rx="0"
                        ry="0"
                        transform="matrix(1.000003 0 0 1.000003 -0.0002 -0.000035)"
                        fill="#d2dbed"
                        strokeWidth="0"
                      />
                    </clipPath>
                  </g>
                </svg>

                {/* <svg
                  className="w-auto"
                  id="ekcavZ6yIE91"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 183 50"
                  shapeRendering="geometricPrecision"
                  textRendering="geometricPrecision"
                  project-id="1b9e9c8c7e8940c6a5e9634ed0e26e37"
                  export-id="63f0341249714b0f8c20b33a3ec98203"
                >
                  <g clipPath="url(#ekcavZ6yIE927)">
                    <g>
                      <g>
                        <g
                          className="logo-group group-1"
                          mask="url(#ekcavZ6yIE912)"
                        >
                          <path
                            d="M59.3311,0.105377L58.543,5.10916l.549-.12513c2.7667-.62733,5.6075-.97968,8.4467-1.04719h4.2011v23.27526c-.0033,1.7338-.2407,3.4001-.6859,4.8177l-.155.494h8.206l-.1566-.494c-.4452-1.416-.6826-3.0823-.6859-4.816v-23.27696h4.2027c2.8376.06751,5.6801.41986,8.4468,1.04719l.549.12513-.7881-5.003783h-31.3401-.0016Z"
                            fill="#fff"
                          />
                          <path
                            d="M104.833,31.2691l-.02-.0642c-.097-.2947-.174-.5977-.231-.9023l-.158-2.0021v-23.77421l.158-2.00217c.057-.30461.134-.60921.231-.90394l.004-.00823c.099-.32601.201-.665199.303-1.020848l.14-.485725h-8.2388l.1401.485725c.1039.357296.2077.701418.3034,1.020848l.0033.00823c.0973.29473.1731.59769.2292.90394l.1582,2.00053v23.77585l-.1582,2.0021c-.0561.3063-.1336.6109-.2292.904l-.0066.0197c-.0775.2552-.183.6027-.2506.7064l-.3924.5911h8.6446l-.391-.5911c-.064-.0988-.161-.41-.239-.6652"
                            fill="#fff"
                          />
                          <path
                            d="M60.1012,28.6347c-.6727-1.1904-1.3356-2.483-1.972-3.843l-3.6834-8.5339-1.4229-3.3952L47.427,0.019756l-.6463.011526h-5.9258L42.662,4.5016l.0033.00987c.5441,1.24313.5771,2.68713.0907,3.96154L37.6645,23.1831L28.306,0.042808l-7.0617-.011526L23.3432,4.73869c.5491,1.2316.5936,2.66902.1237,3.94178-.0198.05269-.038.10538-.0561.15313-.0198.05598-.0396.10867-.0577.15807-1.3504,3.65203-2.9546,7.75843-4.7699,12.20073l-1.7444,4.1641-.0083.0247c-.1236.3622-.2704.7179-.432,1.057l-.2423.5434c-.1798.4034-.3215.7228-.4304.955l-.0049.0115c-.3594.8513-.7749,1.6811-1.23,2.4616-.4105.6849-.6941,1.164-.9002,1.5592l-.2919.5565h7.6702l-.9217-1.5395c-.0577-.382-.061-.7705-.0115-1.1542.2687-1.4489.6941-2.855,1.2646-4.1772l.0082-.0198c1.8302-5.0038,3.3751-9.204,4.9661-13.4307.0099-.0181.0182-.0378.0248-.0576.1319-.3523.2654-.7047.399-1.0554.0412-.112.0841-.2223.1253-.3326l8.0164,21.7687h3.7592l7.1178-21.2797c.2687.6257.5342,1.2382.7947,1.8309.5161,1.1905,1.0288,2.3809,1.5416,3.573.5293,1.23,1.0783,2.5011,1.6191,3.7508l.3743.8628c.6298,1.4555,1.2811,2.9604,1.9274,4.434l.1154.2816.094.3293.0165.0313c.0659.1301.1302.2684.1978.4231l.0033.0083c.2177.4692.4419,1.0077.6876,1.6482l.0049.0115c.249.5944.4749,1.2135.6711,1.8342.0841.2783,0,.6767-.1171,1.2283-.0362.1745-.0775.3721-.1187.5845l-.0857.4512h9.1804l-.4221-.601c-.8112-1.1509-1.4971-2.2278-2.0972-3.2898"
                            fill="#fff"
                          />
                          <path
                            d="M7.52309,2.49448c.05606-.30296.1319-.60592.22918-.89735l.0033-.00823c.10057-.33425.1995-.663553.30172-1.014262l.1418-.485725h-8.199394l.140146.485725c.102225.354002.206098.696482.301727,1.014262v.00823c.098927.29308.174771.59604.23083.899l.158283,1.989v23.63587l-.158283,1.9923c-.056059.3029-.133552.6059-.229181.8973l-.003298.0083c-.095629.3178-.199502.6602-.301727,1.0142l-.140146.4858h8.196093L8.054,32.0331c-.07585-.2634-.15169-.517-.23578-.7969l.00659-.0066-.07419-.2223c-.09563-.293-.17312-.5943-.22918-.8973l-.15828-1.9907v-23.63581l.15828-1.99065.00165.00164Z"
                            fill="#fff"
                          />
                          <path
                            d="M142.903,28.4322c-1.686-2.7118-3-5.6822-4.27-8.5554-.265-.6009-.537-1.2102-.8-1.798-.468-1.0439-.934-2.0878-1.401-3.1333-.234-.5236-.468-1.0472-.702-1.5708-.274-.6125-.549-1.2266-.823-1.8392-.427-.9549-.854-1.90992-1.283-2.8682-.313-.6866-.626-1.39131-.931-2.07297l-.179-.39846c-.338-.76069-.689-1.54773-1.038-2.3216L129.871,0h-7.793l1.055,1.11305c.351.36718.374.44456.412.57464l.008.02963c.047.20911.068.41164.063.59934-.015.39023-.081.77881-.196,1.15915l-.035.11197c-.028.09549-.058.19429-.087.27826-3.88,8.91926-10.104,23.20446-10.308,23.61116-.422.8578-.906,1.6844-1.436,2.4566-.39.5631-.706,1.0126-.965,1.3798l-.819,1.1707h8.985l-1.408-1.9166c-.051-.3178-.051-.6454,0-.9714.038-.1367.368-1.0736,2.922-7.2826.907-.2387,1.822-.3804,2.722-.4182l6.935-.0033c.918.0411,1.845.1844,2.755.4281.491,1.0175,2.659,5.5307,3.664,8.091.023.354-.104.7031-.353.9649l-1.064,1.1147l10.958-.0198-.866-1.0686c-.774-.9566-1.488-1.9561-2.121-2.972M130.854,17.9817h-8.78c.968-2.3397,3.168-7.6514,4.216-10.1673l4.564,10.1673Z"
                            fill="#fff"
                          />
                          <path
                            d="M172.613,28.6973l-8.961.1235-2.546.023.688-.8908L183.001,0.102085h-30.631L151.161,5.1388l.594-.13007c3.126-.6866,6.336-1.05049,9.536-1.07848h10.973L156.373,24.3686l-6.371,8.1585h21.823.869h8.839l1.209-5.0367-.594.13c-3.126.6866-6.336,1.0505-9.536,1.0785"
                            fill="#fff"
                          />
                          <mask
                            id="ekcavZ6yIE912"
                            mask-type="luminance"
                            x="-150%"
                            y="-150%"
                            height="400%"
                            width="400%"
                          >
                            <rect
                              width="183"
                              height="32.425023"
                              rx="0"
                              ry="0"
                              transform="translate(0 0.105377)"
                              fill="#d2dbed"
                              strokeWidth="0"
                            />
                          </mask>
                        </g>
                      </g>
                      <g className="logo-group group-2">
                        <path
                          d="M25.1641,49.7942v-8.1931h1.7032c1.1656,0,2.0197.0856,2.5655.2568.5441.1713,1.0156.4413,1.4113.8101s.7008.82.9134,1.3518.3199,1.1542.3199,1.8655-.1665,1.3798-.4979,2.0088c-.3314.6273-.7815,1.1015-1.3487,1.4209-.5672.3195-1.385.4792-2.4501.4792h-2.6166Zm.7881-.7755h.948c.9909,0,1.7082-.0494,2.1533-.1482s.836-.2948,1.1707-.5878.5902-.6488.765-1.067.2622-.8973.2622-1.4374-.1023-1.0389-.3034-1.495c-.2028-.4561-.4897-.8332-.8623-1.1296s-.8129-.4972-1.319-.5993-1.2515-.1531-2.2341-.1531h-.5821v6.619l.0017-.0016Z"
                          fill="#fff"
                        />
                        <path
                          d="M38.0176,41.6011h4.7073v.8101h-3.8846v2.557h3.8499v.7986h-3.8499v3.2173h3.8499v.8101h-4.6726v-8.1931Z"
                          fill="#fff"
                        />
                        <path
                          d="M47.8535,41.6011h.892l2.7189,6.5383l2.765-6.5383h.892L51.5451,50h-.1714l-3.5202-8.3989Z"
                          fill="#fff"
                        />
                        <path
                          d="M60.8457,41.6011h4.7073v.8101h-3.8846v2.557h3.8516v.7986h-3.8516v3.2173h3.8516v.8101h-4.6743v-8.1931Z"
                          fill="#fff"
                        />
                        <path
                          d="M71.3008,41.6011h.8343v7.406h3.1524v.7871h-3.9867v-8.1931Z"
                          fill="#fff"
                        />
                        <path
                          d="M80.5664,45.7322c0-.7903.1913-1.5214.5721-2.1915.3809-.6685.9019-1.1937,1.5647-1.5741.6628-.3803,1.385-.5713,2.1649-.5713s1.5086.1893,2.183.5647c.6743.3771,1.2036.8974,1.5877,1.5642.3842.6652.5771,1.388.5771,2.1685c0,.7804-.1896,1.5016-.5705,2.1685-.3808.6652-.9035,1.1888-1.5713,1.5691-.6661.3803-1.3899.5697-2.1714.5697s-1.507-.1877-2.1764-.5648c-.671-.377-1.1987-.8957-1.5828-1.5576-.3842-.6619-.5771-1.3765-.5771-2.1454Zm7.7922-.0346c0-.9813-.3413-1.8095-1.0223-2.4879-.6826-.6767-1.502-1.0159-2.4616-1.0159s-1.8038.3409-2.4617,1.0209c-.6595.6816-.9876,1.5098-.9876,2.4879s.338,1.8046,1.0173,2.4813c.6777.6767,1.4971,1.0159,2.4567,1.0159s1.7774-.331,2.4501-.9929c.6744-.6619,1.0107-1.4983,1.0107-2.5109"
                          fill="#fff"
                        />
                        <path
                          d="M95.1895,41.6011h1.6339c.9678,0,1.5993.0378,1.8961.1136.2968.0757.5688.2091.8178.4001.2473.1893.4402.4281.5767.7129.137.2849.206.6027.206.9534c0,.5631-.153,1.0225-.4563,1.3814-.305.3573-.6875.5845-1.1492.6784-.4616.0955-1.1673.1432-2.1203.1432h-.582v3.8101h-.8227v-8.1931Zm.8227.8002v2.7958h1.3833c.8294.0148,1.3817-.1202,1.657-.4051.2754-.2848.4106-.6223.4106-1.0093c0-.9204-.6661-1.3814-2-1.3814h-1.4509Z"
                          fill="#fff"
                        />
                        <path
                          d="M105.932,49.7942l1.165-8.1931h.126l3.335,6.7211l3.314-6.7211h.125l1.178,8.1931h-.811l-.8-5.8649-2.902,5.8649h-.206l-2.937-5.9094-.799,5.9094h-.788Z"
                          fill="#fff"
                        />
                        <path
                          d="M121.15,41.6011h4.708v.8101h-3.885v2.557h3.85v.7986h-3.85v3.2173h3.85v.8101h-4.673v-8.1931Z"
                          fill="#fff"
                        />
                        <path
                          d="M131.615,49.7942v-8.1931h.183l5.449,6.2765v-6.2765h.812v8.1931h-.183l-5.417-6.1959v6.1959h-.844Z"
                          fill="#fff"
                        />
                        <path
                          d="M143.59,42.4013v-.8002h4.501v.8002h-1.827v7.3929h-.834v-7.3929h-1.84Z"
                          fill="#fff"
                        />
                        <path
                          d="M152.764,48.2662l.697-.41c.488.8974,1.055,1.3469,1.703,1.3469.419,0,.777-.1334,1.074-.4001.296-.2668.445-.5977.445-.9929c0-.3112-.125-.6273-.378-.9467-.252-.3195-.668-.6982-1.251-1.1361-.584-.4364-.975-.764-1.177-.9814s-.35-.4478-.446-.6964c-.095-.247-.143-.4956-.143-.7476c0-.5318.188-.9829.566-1.3518.377-.3688.85-.5532,1.422-.5532.451,0,.843.112,1.178.3359.334.2239.659.5565.971.9978l-.663.5137c-.213-.2898-.434-.5285-.663-.7195s-.508-.2849-.839-.2849-.602.0988-.811.2964c-.21.1976-.315.4495-.315.7525c0,.3029.092.5697.28.7936.186.2239.608.5796,1.268,1.0669.66.4874,1.139.9353,1.439,1.3469.302.4116.452.8447.452,1.3008c0,.5943-.231,1.1097-.691,1.546-.461.438-.996.6554-1.604.6554-1.073,0-1.913-.578-2.513-1.7338"
                          fill="#fff"
                        />
                      </g>
                    </g>
                    <clipPath id="ekcavZ6yIE927">
                      <rect width="183" height="50" rx="0" ry="0" fill="#fff" />
                    </clipPath>
                  </g>
                </svg> */}
              </Link>

              {/* RIGHT — Icons */}
              <div className="w-[35%] 2xl:w-[33.33%] flex justify-end">
                <div className="flex items-center gap-[5px] sm:gap-[10px] rgtbtn">
                  <button
                    onClick={() => setAuthView("login")}
                    className="flex group items-center justify-center w-[24px] h-[24px] sm:w-[32px] sm:h-[32px] bg-white/25 backdrop-blur-[30px] rounded-full cursor-pointer opacity-0"
                  >
                    <Image
                      src="/images/account.svg"
                      alt="account"
                      width={14}
                      height={15}
                      className="invert w-[10px] h-[12px] sm:h-[15.16px] sm:w-[14px] w-auto group-hover:scale-110 transition-all duration-400"
                    />
                  </button>

                  {/* <div className="relative" ref={langRef}>
                    <button
                      ref={langBtnRef}
                      onClick={() => {
                        if (!langOpen && langBtnRef.current) {
                          const rect =
                            langBtnRef.current.getBoundingClientRect();
                          setLangPos({
                            top: rect.bottom + 8,
                            right: window.innerWidth - rect.right,
                          });
                        }
                        setLangOpen((p) => !p);
                      }}
                      className="group flex items-center justify-center gap-[5px] sm:gap-[10px] md:gap-[8px] w-auto px-[7px] py-[6px]  md:px-[6px]  bg-white/25  backdrop-blur-[30px]  rounded-full cursor-pointer opacity-0 sm:h-[32px]"
                    >
                      <Image
                        src="/images/map.svg"
                        alt="map"
                        width={24}
                        height={24}
                        className="invert h-[12.24px] sm:h-[24px] w-auto group-hover:scale-110 transition-all duration-400"
                      />
                      <div className="block">
                        <ChevronDown className="text-white w-[12px] h-[12px] sm:w-[18px] sm:h-[18px]" />
                      </div>
                    </button>

                    {mounted &&
                      createPortal(
                        <AnimatePresence>
                          {langOpen && (
                            <motion.div
                              initial={{
                                opacity: 0,
                                clipPath: "inset(0% 0% 100% 0% round 12px)",
                              }}
                              animate={{
                                opacity: 1,
                                clipPath: "inset(0% 0% 0% 0% round 12px)",
                              }}
                              exit={{
                                opacity: 0,
                                clipPath: "inset(0% 0% 100% 0% round 12px)",
                              }}
                              transition={{
                                duration: 0.5,
                                ease: [0.76, 0, 0.24, 1],
                                opacity: { duration: 0.3, ease: "easeIn" },
                              }}
                              style={{
                                transformOrigin: "top",
                                position: "fixed",
                                top: langPos.top,
                                right: langPos.right,
                                zIndex: 9999,
                              }}
                              className="bg-white/25 backdrop-blur-[30px] rounded-[12px] overflow-hidden"
                            >
                              <button
                                onClick={() => setLangOpen(false)}
                                className="w-full text-left px-5 py-2 text-white text-[14px] font-[avenirRoman] hover:bg-white/10 transition-colors duration-150"
                              >
                                العربية
                              </button>
                            </motion.div>
                          )}
                        </AnimatePresence>,
                        document.body,
                      )}
                  </div> */}
                </div>
              </div>
            </div>
          </div>
        </header>
      </div>

      {mounted &&
        createPortal(
          <AnimatePresence mode="wait">
            {authView && (
              <>
                <motion.div
                  key="auth-backdrop"
                  className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[1000]"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onClick={closeAuth}
                />

                <motion.div
                  className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[1001] w-full h-full  "
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ duration: 0.2, ease: [0.25, 1, 0.5, 1] }}
                >
                  <div className="flex w-full overflow-hidden bg-white h-full">
                    <div className="relative h-full flex-shrink-0 hidden md:block md:w-[48.4%]">
                      <AuthSlider />
                    </div>

                    <div className="relative w-full md:w-[51.6%] h-full bg-white overflow-hidden pointer-events-none">
                      {/* Background decoration — behind scroll layer */}
                      <div className="absolute bottom-0 left-0 pointer-events-none">
                        <Image
                          src="/icons/layout_icons/m-icon.svg"
                          alt="Icon"
                          width={534}
                          height={704}
                        />
                      </div>

                      <AnimatePresence mode="wait">
                        <motion.div
                          key={authView}
                          className="absolute inset-0 flex items-start justify-center overflow-y-auto py-150 3xl:py-0 pointer-events-auto dark-section-2"
                          onWheel={(e) => e.stopPropagation()}
                          onTouchMove={(e) => e.stopPropagation()}
                          initial={{ opacity: 0, x: 40 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -40 }}
                          transition={{
                            duration: 0.25,
                            ease: [0.25, 1, 0.5, 1],
                          }}
                        >
                          {authView === "login" ? (
                            <LoginForm
                              onClose={closeAuth}
                              onSwitch={() => setAuthView("signup")}
                            />
                          ) : (
                            <SignupForm
                              onClose={closeAuth}
                              onSwitch={() => setAuthView("login")}
                            />
                          )}
                        </motion.div>
                      </AnimatePresence>
                    </div>
                  </div>
                </motion.div>
              </>
            )}
          </AnimatePresence>,
          document.body,
        )}

      {/* ========================= SIDEBAR ========================= */}
      {mounted &&
        createPortal(
          <AnimatePresence>
            {isMenuOpen && (
              <>
                <motion.div
                  className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[998]"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onClick={() => setIsMenuOpen(false)}
                />
                <motion.div
                  className="fixed inset-0 z-[999]"
                  initial={{ y: "-100%" }}
                  animate={{ y: 0 }}
                  exit={{ y: "-100%" }}
                  transition={{ duration: 0.6, ease: [0.25, 1, 0.5, 1] }}
                >
                  <NavPageV3
                    setIsMenuOpen={setIsMenuOpen}
                    menuData={menuData}
                  />
                </motion.div>
              </>
            )}
          </AnimatePresence>,
          document.body,
        )}
    </>
  );
};

export default HeaderWithHamburger;
