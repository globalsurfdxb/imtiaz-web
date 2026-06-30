// "use client";

// import Image from "next/image";
// import { Dispatch, SetStateAction, useState, useEffect, useRef } from "react";
// import { menuItems, subMenuItems, contactInfo, socialLinks } from "./data";
// import { moveRight, moveUp } from "../motionVariants";
// import Link from "next/link";
// import { useRouter } from "next/navigation";
// import { motion, AnimatePresence } from "framer-motion";
// type MenuItem = {
//   id: string;
//   label: string;
//   href?: string;
//   children?: MenuItem[];
// };
// export default function MegaMenu({
//   setIsMenuOpen,
// }: {
//   setIsMenuOpen?: Dispatch<SetStateAction<boolean>>;
// }) {
//   const [activeCategory, setActiveCategory] = useState<string | null>(null);
//   const router = useRouter();
//   const mounted = useRef(true);
//   const navTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

//   const [activeMenu, setActiveMenu] = useState(menuItems[0]);
//   const currentSubmenu = subMenuItems[
//     activeMenu.id as keyof typeof subMenuItems
//   ] as MenuItem[];

//   // ── Two permanent BG layers, no key-swapping ──────────────────────────────
//   const [bgA, setBgA] = useState(menuItems[0].bgImage);
//   const [bgB, setBgB] = useState(menuItems[0].bgImage);
//   const [aOnTop, setAOnTop] = useState(true); // which layer is currently visible
//   // ─────────────────────────────────────────────────────────────────────────

//   useEffect(() => {
//     mounted.current = true;
//     return () => {
//       mounted.current = false;
//       if (navTimer.current) clearTimeout(navTimer.current);
//     };
//   }, []);

//   const handleMenuChange = (item: (typeof menuItems)[0]) => {
//     if (!mounted.current) return;
//     setActiveMenu(item);
//     // Load the new image into the hidden layer, then flip
//     if (aOnTop) {
//       setBgB(item.bgImage);
//       setAOnTop(false);
//     } else {
//       setBgA(item.bgImage);
//       setAOnTop(true);
//     }
//   };

//   const handleNavigate = (href?: string) => {
//     if (!mounted.current) return;

//     if (href && href !== "#") {
//       // Instantly unmount without waiting for animation
//       setIsMenuOpen?.(false);
//       router.push(href);
//     } else {
//       setIsMenuOpen?.(false);
//     }
//   };

//   return (
//     <div className="relative w-full h-screen overflow-hidden z-1000 bg-white flex flex-col">
//       <div className="w-full" />

//       <div className="relative flex-1 flex overflow-hidden">
//         {/* ── PRELOAD ALL BG IMAGES (hidden, no layout impact) ── */}
//         <div
//           aria-hidden
//           className="absolute w-0 h-0 overflow-hidden opacity-0 pointer-events-none"
//         >
//           {menuItems.map((item) => (
//             <Image
//               key={item.id}
//               src={item.bgImage}
//               alt=""
//               width={1}
//               height={1}
//               priority
//             />
//           ))}
//         </div>

//         {/* ── BG LAYER A ── */}
//         <motion.div
//           className="absolute inset-0 z-0"
//           animate={{ opacity: aOnTop ? 1 : 0 }}
//           transition={{ duration: 0.3, ease: "easeInOut" }}
//         >
//           <Image
//             src={bgA}
//             alt="background"
//             fill
//             className="object-cover"
//             priority
//           />
//         </motion.div>

//         {/* ── BG LAYER B ── */}
//         <motion.div
//           className="absolute inset-0 z-0"
//           animate={{ opacity: aOnTop ? 0 : 1 }}
//           transition={{ duration: 0.3, ease: "easeInOut" }}
//         >
//           <Image
//             src={bgB}
//             alt="background"
//             fill
//             className="object-cover"
//             priority
//           />
//         </motion.div>

//         {/* BLACK OVERLAY */}
//         <div className="absolute inset-0 bg-black/75" />

//         {/* CONTENT WRAPPER */}
//         <div className="relative z-20 flex h-full w-full container pt-120">
//           {/* LEFT MENU */}
//           <div className="w-1/2 lg:w-1/3 2xl:w-1/4 flex flex-col justify-between xl:mr-4">
//             <div className="flex flex-col justify-center gap-[22px] w-full text-white relative mb-120">
//               {menuItems.map((item, index) => {
//                 const isActive = activeMenu.id === item.id;
//                 return (
//                   <motion.div
//                     variants={moveRight(index * 0.13)}
//                     initial="hidden"
//                     whileInView="show"
//                     viewport={{ once: true }}
//                     key={item.id}
//                     className="relative flex items-center cursor-pointer"
//                     onMouseEnter={() => handleMenuChange(item)}
//                     onClick={() => item.href && handleNavigate(item.href)}
//                   >
//                     {/* ARROW */}
//                     <motion.div
//                       initial={false}
//                       animate={
//                         isActive ? { opacity: 1, x: 0 } : { opacity: 0, x: -10 }
//                       }
//                       transition={{ duration: 0.35, ease: "easeOut" }}
//                       className="absolute left-0 top-1/2 -translate-y-1/2 pb-1"
//                     >
//                       <Image
//                         src="/icons/arrow_nav.svg"
//                         alt={item.label}
//                         width={28}
//                         height={21}
//                         className="md:w-[28px] md:h-[21px] w-[20px] h-[18px] invert brightness-0"
//                       />
//                     </motion.div>

//                     {/* TITLE */}
//                     <motion.div
//                       initial={false}
//                       animate={isActive ? { x: 40 } : { x: 0 }}
//                       transition={{ duration: 0.25, ease: "easeOut" }}
//                       className="relative inline-block"
//                     >
//                       <motion.span
//                         initial={false}
//                         animate={isActive ? { opacity: 0 } : { opacity: 1 }}
//                         transition={{ duration: 0.25, ease: "easeOut" }}
//                         className="text-16 md:text-25 3xl:text-30 font-[optima] uppercase text-white"
//                       >
//                         {item.label}
//                       </motion.span>
//                       <motion.span
//                         aria-hidden="true"
//                         initial={{ opacity: 0 }}
//                         animate={isActive ? { opacity: 1 } : { opacity: 0 }}
//                         transition={{ duration: 0.25, ease: "easeOut" }}
//                         className="absolute left-0 top-0 text-16 md:text-25 3xl:text-30 font-[optima] uppercase text-white"
//                       >
//                         {item.label}
//                       </motion.span>
//                     </motion.div>
//                   </motion.div>
//                 );
//               })}
//             </div>

//             {/* CONTACT */}
//             <motion.div
//               variants={moveUp(0.2)}
//               initial="hidden"
//               animate="show"
//               className="flex-col text-white text-sm pb-90 flex"
//             >
//               <div>
//                 <motion.div
//                   variants={moveUp(0.2)}
//                   initial="hidden"
//                   animate="show"
//                   className="mb-[5px] font-[avenir] font-[900] text-16 opacity-70"
//                 >
//                   <div
//                     className="cursor-pointer"
//                     onClick={(e) => {
//                       e.preventDefault();
//                       handleNavigate("/contact-us");
//                     }}
//                   >
//                     CONTACT US
//                   </div>
//                 </motion.div>
//                 <div className="flex flex-col lg:flex-row lg:items-center font-[avenirRoman] lg:gap-4 text-white opacity-70">
//                   <motion.div
//                     variants={moveUp(0.25)}
//                     initial="hidden"
//                     animate="show"
//                     className="text-16 leading-[2.2]"
//                   >
//                     <a href={`mailto:${contactInfo.email}`}>
//                       {contactInfo.email}
//                     </a>
//                   </motion.div>
//                   <div className="hidden lg:block w-[1px] h-[13px] bg-white" />
//                   <motion.div
//                     variants={moveUp(0.2)}
//                     initial="hidden"
//                     animate="show"
//                     className="text-[18px] leading-[2.2]"
//                   >
//                     <a href={`tel:${contactInfo.phone}`}>{contactInfo.phone}</a>
//                   </motion.div>
//                 </div>
//                 <div className="flex gap-[5px] w-full mt-[30px]">
//                   {socialLinks.map((icon, i) => (
//                     <motion.div
//                       variants={moveUp(i * 0.2)}
//                       initial="hidden"
//                       whileInView="show"
//                       viewport={{ amount: 0.2, once: true }}
//                       key={i}
//                       className="cursor-pointer rounded-full w-[33px] h-[33px] bg-white/25 backdrop-blur-[30px] flex items-center justify-center"
//                     >
//                       <Image
//                         src={icon}
//                         alt="icon"
//                         width={22}
//                         height={22}
//                         className="opacity-100 w-[16px] h-[16px] hover:opacity-70 transition-opacity duration-300"
//                       />
//                     </motion.div>
//                   ))}
//                 </div>
//               </div>
//             </motion.div>
//           </div>

//           {/* MIDDLE DIVIDER */}
//           <div className="relative w-[1px] mr-10 lg:mr-[70px] z-30">
//             <div
//               className="absolute left-0 top-0 h-full w-[1px] z-30"
//               style={{
//                 background:
//                   "linear-gradient(180deg, rgba(255,255,255,0) 0%, #FFFFFF 50%, rgba(255,255,255,0.8) 100%)",
//               }}
//             />
//           </div>

//           {/* RIGHT SUBMENU */}
//           <div className="flex flex-col gap-2 lg:gap-4 text-white w-1/3 mt-[8%] relative">
//             {currentSubmenu.map((item, idx) => (
//               <div
//                 key={item.id}
//                 onMouseEnter={() => item.children && setActiveCategory(item.id)}
//                 onMouseLeave={() => setActiveCategory(null)}
//                 className="relative flex flex-col"
//               >
//                 {/* MAIN ITEM */}
//                 {item.href ? (
//                   <Link
//                     href={item.href}
//                     onClick={(e) => {
//                       e.preventDefault();
//                       handleNavigate(item.href);
//                     }}
//                     className="block text-description md:text-18 leading-[2.2] uppercase hover:translate-x-2 transition-all duration-300"
//                   >
//                     {item.label}
//                   </Link>
//                 ) : (
//                   <div className="text-description md:text-18 leading-[2.2] uppercase cursor-pointer">
//                     {item.label}
//                   </div>
//                 )}

//                 {/* CHILDREN MENU */}
//                 {/* {item.children && activeCategory === item.id && (
//         <div className="  left-full top-0   flex flex-col gap-2     px-4 min-w-[220px]">
//           {item.children.map((child) => (
//             <Link
//               key={child.id}
//               href={child.href || "#"}
//               onClick={(e) => {
//                 e.preventDefault();
//                 handleNavigate(child.href);
//               }}
//               className="text-description uppercase hover:translate-x-2 transition-all duration-300"
//             >
//               {child.label}
//             </Link>
//           ))}
//         </div>
//       )} */}
//                 <AnimatePresence>
//                   {item.children && activeCategory === item.id && (
//                     <motion.div
//                       // 1. Accordion Animation Settings
//                       initial={{ height: 0, opacity: 0 }}
//                       animate={{
//                         height: "auto",
//                         opacity: 1,
//                         transition: {
//                           height: { duration: 0.3 },
//                           opacity: { duration: 0.2, delay: 0.1 },
//                         },
//                       }}
//                       exit={{
//                         height: 0,
//                         opacity: 0,
//                         transition: {
//                           height: { duration: 0.3 },
//                           opacity: { duration: 0.2 },
//                         },
//                       }}
//                       // 2. Layout Classes (Removed absolute, left-full, etc.)
//                       className="overflow-hidden flex flex-col gap-2 px-2 md:px-4"
//                     >
//                       {item.children.map((child) => (
//                         <Link
//                           key={child.id}
//                           href={child.href || "#"}
//                           onClick={(e) => {
//                             e.preventDefault();
//                             handleNavigate(child.href);
//                           }}
//                           className="!text-[11px] md:!text-[14px] text-description uppercase py-1 hover:translate-x-2 transition-all duration-300 block"
//                         >
//                           {child.label}
//                         </Link>
//                       ))}
//                     </motion.div>
//                   )}
//                 </AnimatePresence>
//               </div>
//             ))}
//           </div>

//           {/* CLOSE BTN */}
//           <button
//             className="absolute top-4 md:top-8 lg:top-10 left-[50%] lg:left-[33.6%] 2xl:left-[26.5%] 3xl:left-[26.2%] -translate-x-1/2 bg-white/25 text-white rounded-full w-[40px] h-[40px] xl:h-[60px] xl:w-[60px] flex items-center justify-center cursor-pointer"
//             onClick={() => setIsMenuOpen?.(false)}
//           >
//             <Image
//               src="/icons/close_nav.svg"
//               alt="close"
//               width={21}
//               height={19}
//               className="w-[21px] h-[19px] hover:scale-[1.2] transition-all duration-300"
//             />
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }

// "use client";

// import Image from "next/image";
// import { Dispatch, SetStateAction, useState, useEffect, useRef } from "react";
// import { menuItems, subMenuItems, contactInfo, socialLinks } from "./data";
// import { moveRight, moveUp } from "../motionVariants";
// import Link from "next/link";
// import { useRouter } from "next/navigation";
// import { motion, AnimatePresence } from "framer-motion";
// import CustomOutlineButton from "@/app/components/common/CustomOutlineButton";

// type MenuItem = {
//   id: string;
//   label: string;
//   href?: string;
//   isButton?: boolean;
//   children?: MenuItem[];
// };
// export default function MegaMenu({
//   setIsMenuOpen,
// }: {
//   setIsMenuOpen?: Dispatch<SetStateAction<boolean>>;
// }) {
//   const [activeCategory, setActiveCategory] = useState<string | null>(null);
//   const router = useRouter();
//   const mounted = useRef(true);
//   const navTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

//   const [activeMenu, setActiveMenu] = useState(menuItems[0]);
//   const currentSubmenu = subMenuItems[
//     activeMenu.id as keyof typeof subMenuItems
//   ] as MenuItem[];

//   // ── Two permanent BG layers, no key-swapping ──────────────────────────────
//   const [bgA, setBgA] = useState(menuItems[0].bgImage);
//   const [bgB, setBgB] = useState(menuItems[0].bgImage);
//   const [aOnTop, setAOnTop] = useState(true); // which layer is currently visible
//   // ─────────────────────────────────────────────────────────────────────────

//   useEffect(() => {
//     mounted.current = true;
//     return () => {
//       mounted.current = false;
//       if (navTimer.current) clearTimeout(navTimer.current);
//     };
//   }, []);

//   const handleMenuChange = (item: (typeof menuItems)[0]) => {
//     if (!mounted.current) return;
//     setActiveMenu(item);
//     // Load the new image into the hidden layer, then flip
//     if (aOnTop) {
//       setBgB(item.bgImage);
//       setAOnTop(false);
//     } else {
//       setBgA(item.bgImage);
//       setAOnTop(true);
//     }
//   };

//   const handleNavigate = (href?: string) => {
//     if (!mounted.current) return;

//     if (href && href !== "#") {
//       // Instantly unmount without waiting for animation
//       setIsMenuOpen?.(false);
//       router.push(href);
//     } else {
//       setIsMenuOpen?.(false);
//     }
//   };

//   // Separate button items from regular items
//   const regularItems = currentSubmenu.filter((item) => !item.isButton);
//   const buttonItems = currentSubmenu.filter((item) => item.isButton);

//   return (
//     <div className="relative w-full h-screen overflow-hidden z-1000 bg-white flex flex-col">
//       <div className="w-full" />

//       <div className="relative flex-1 flex overflow-hidden">
//         {/* ── PRELOAD ALL BG IMAGES (hidden, no layout impact) ── */}
//         <div
//           aria-hidden
//           className="absolute w-0 h-0 overflow-hidden opacity-0 pointer-events-none"
//         >
//           {menuItems.map((item) => (
//             <Image
//               key={item.id}
//               src={item.bgImage}
//               alt=""
//               width={1}
//               height={1}
//               priority
//             />
//           ))}
//         </div>

//         {/* ── BG LAYER A ── */}
//         <motion.div
//           className="absolute inset-0 z-0"
//           animate={{ opacity: aOnTop ? 1 : 0 }}
//           transition={{ duration: 0.3, ease: "easeInOut" }}
//         >
//           <Image
//             src={bgA}
//             alt="background"
//             fill
//             className="object-cover"
//             priority
//           />
//         </motion.div>

//         {/* ── BG LAYER B ── */}
//         <motion.div
//           className="absolute inset-0 z-0"
//           animate={{ opacity: aOnTop ? 0 : 1 }}
//           transition={{ duration: 0.3, ease: "easeInOut" }}
//         >
//           <Image
//             src={bgB}
//             alt="background"
//             fill
//             className="object-cover"
//             priority
//           />
//         </motion.div>

//         {/* BLACK OVERLAY */}
//         <div className="absolute inset-0 bg-black/75" />

//         {/* CONTENT WRAPPER */}
//         <div className="relative z-20 flex h-full w-full container pt-120">
//           {/* LEFT MENU */}
//           <div className="w-1/2 lg:w-1/3 2xl:w-1/4 flex flex-col justify-between xl:mr-4">
//             <div className="flex flex-col justify-center gap-[22px] w-full text-white relative mb-120">
//               {menuItems.map((item, index) => {
//                 const isActive = activeMenu.id === item.id;
//                 return (
//                   <motion.div
//                     variants={moveRight(index * 0.13)}
//                     initial="hidden"
//                     whileInView="show"
//                     viewport={{ once: true }}
//                     key={item.id}
//                     className="relative flex items-center cursor-pointer"
//                     onMouseEnter={() => handleMenuChange(item)}
//                     onClick={() => item.href && handleNavigate(item.href)}
//                   >
//                     {/* ARROW */}
//                     <motion.div
//                       initial={false}
//                       animate={
//                         isActive ? { opacity: 1, x: 0 } : { opacity: 0, x: -10 }
//                       }
//                       transition={{ duration: 0.35, ease: "easeOut" }}
//                       className="absolute left-0 top-1/2 -translate-y-1/2 pb-1"
//                     >
//                       <Image
//                         src="/icons/arrow_nav.svg"
//                         alt={item.label}
//                         width={28}
//                         height={21}
//                         className="md:w-[28px] md:h-[21px] w-[20px] h-[18px] invert brightness-0"
//                       />
//                     </motion.div>

//                     {/* TITLE */}
//                     <motion.div
//                       initial={false}
//                       animate={isActive ? { x: 40 } : { x: 0 }}
//                       transition={{ duration: 0.25, ease: "easeOut" }}
//                       className="relative inline-block"
//                     >
//                       <motion.span
//                         initial={false}
//                         animate={isActive ? { opacity: 0 } : { opacity: 1 }}
//                         transition={{ duration: 0.25, ease: "easeOut" }}
//                         className="text-16 md:text-25 3xl:text-30 font-[optima] uppercase text-white"
//                       >
//                         {item.label}
//                       </motion.span>
//                       <motion.span
//                         aria-hidden="true"
//                         initial={{ opacity: 0 }}
//                         animate={isActive ? { opacity: 1 } : { opacity: 0 }}
//                         transition={{ duration: 0.25, ease: "easeOut" }}
//                         className="absolute left-0 top-0 text-16 md:text-25 3xl:text-30 font-[optima] uppercase text-white"
//                       >
//                         {item.label}
//                       </motion.span>
//                     </motion.div>
//                   </motion.div>
//                 );
//               })}
//             </div>

//             {/* CONTACT */}
//             <motion.div
//               variants={moveUp(0.2)}
//               initial="hidden"
//               animate="show"
//               className="flex-col text-white text-sm pb-90 flex"
//             >
//               <div>
//                 <motion.div
//                   variants={moveUp(0.2)}
//                   initial="hidden"
//                   animate="show"
//                   className="mb-[5px] font-[avenir] font-[900] text-16 opacity-70"
//                 >
//                   <div
//                     className="cursor-pointer"
//                     onClick={(e) => {
//                       e.preventDefault();
//                       handleNavigate("/contact-us");
//                     }}
//                   >
//                     CONTACT US
//                   </div>
//                 </motion.div>
//                 <div className="flex flex-col lg:flex-row lg:items-center font-[avenirRoman] lg:gap-4 text-white opacity-70">
//                   <motion.div
//                     variants={moveUp(0.25)}
//                     initial="hidden"
//                     animate="show"
//                     className="text-16 leading-[2.2]"
//                   >
//                     <a href={`mailto:${contactInfo.email}`}>
//                       {contactInfo.email}
//                     </a>
//                   </motion.div>
//                   <div className="hidden lg:block w-[1px] h-[13px] bg-white" />
//                   <motion.div
//                     variants={moveUp(0.2)}
//                     initial="hidden"
//                     animate="show"
//                     className="text-[18px] leading-[2.2]"
//                   >
//                     <a href={`tel:${contactInfo.phone}`}>{contactInfo.phone}</a>
//                   </motion.div>
//                 </div>
//                 <div className="flex gap-[5px] w-full mt-[30px]">
//                   {socialLinks.map((icon, i) => (
//                     <motion.div
//                       variants={moveUp(i * 0.2)}
//                       initial="hidden"
//                       whileInView="show"
//                       viewport={{ amount: 0.2, once: true }}
//                       key={i}
//                       className="cursor-pointer rounded-full w-[33px] h-[33px] bg-white/25 backdrop-blur-[30px] flex items-center justify-center"
//                     >
//                       <Image
//                         src={icon}
//                         alt="icon"
//                         width={22}
//                         height={22}
//                         className="opacity-100 w-[16px] h-[16px] hover:opacity-70 transition-opacity duration-300"
//                       />
//                     </motion.div>
//                   ))}
//                 </div>
//               </div>
//             </motion.div>
//           </div>

//           {/* MIDDLE DIVIDER */}
//           <div className="relative w-[1px] mr-10 lg:mr-[70px] z-30">
//             <div
//               className="absolute left-0 top-0 h-full w-[1px] z-30"
//               style={{
//                 background:
//                   "linear-gradient(180deg, rgba(255,255,255,0) 0%, #FFFFFF 50%, rgba(255,255,255,0.8) 100%)",
//               }}
//             />
//           </div>

//           {/* RIGHT SUBMENU */}
//           <div className="flex flex-col gap-2 lg:gap-4 text-white w-1/3 mt-[8%] relative">
//             {/* Regular (non-button) items */}
//             {regularItems.map((item, idx) => (
//               <div
//                 key={item.id}
//                 onMouseEnter={() => item.children && setActiveCategory(item.id)}
//                 onMouseLeave={() => setActiveCategory(null)}
//                 className="relative flex flex-col"
//               >
//                 {/* MAIN ITEM */}
//                 {item.href ? (
//                   <Link
//                     href={item.href}
//                     onClick={(e) => {
//                       e.preventDefault();
//                       handleNavigate(item.href);
//                     }}
//                     className="block text-description md:text-18 leading-[2.2] uppercase hover:translate-x-2 transition-all duration-300"
//                   >
//                     {item.label}
//                   </Link>
//                 ) : (
//                   <div className="text-description md:text-18 leading-[2.2] uppercase cursor-pointer">
//                     {item.label}
//                   </div>
//                 )}

//                 {/* CHILDREN MENU */}
//                 <AnimatePresence>
//                   {item.children && activeCategory === item.id && (
//                     <motion.div
//                       initial={{ height: 0, opacity: 0 }}
//                       animate={{
//                         height: "auto",
//                         opacity: 1,
//                         transition: {
//                           height: { duration: 0.3 },
//                           opacity: { duration: 0.2, delay: 0.1 },
//                         },
//                       }}
//                       exit={{
//                         height: 0,
//                         opacity: 0,
//                         transition: {
//                           height: { duration: 0.3 },
//                           opacity: { duration: 0.2 },
//                         },
//                       }}
//                       className="overflow-hidden flex flex-col gap-2 px-2 md:px-4"
//                     >
//                       {item.children.map((child) => (
//                         <Link
//                           key={child.id}
//                           href={child.href || "#"}
//                           onClick={(e) => {
//                             e.preventDefault();
//                             handleNavigate(child.href);
//                           }}
//                           className="!text-[11px] md:!text-[14px] text-description uppercase py-1 hover:translate-x-2 transition-all duration-300 block"
//                         >
//                           {child.label}
//                         </Link>
//                       ))}
//                     </motion.div>
//                   )}
//                 </AnimatePresence>
//               </div>
//             ))}

//             {/* Button items — rendered in a single row */}
//             {buttonItems.length > 0 && (
//               <div className="flex flex-row gap-5 mt-40 flex-wrap">
//                 {buttonItems.map((item) => (
//                   <div
//                     key={item.id}
//                     onClick={() => handleNavigate(item.href)}
//                   >
//                     <CustomOutlineButton
//                       text={item.label}
//                       borderColor="border-white"
//                       textColor="text-white"
//                       px="px-[20px] md:px-[36px] h-[50px] md:h-[66px] !leading-[1.58]"
//                     />
//                   </div>
//                 ))}
//               </div>
//             )}
//           </div>

//           {/* CLOSE BTN */}
//           <button
//             className="absolute top-4 md:top-8 lg:top-10 left-[50%] lg:left-[33.6%] 2xl:left-[26.5%] 3xl:left-[26.2%] -translate-x-1/2 bg-white/25 text-white rounded-full w-[40px] h-[40px] xl:h-[60px] xl:w-[60px] flex items-center justify-center cursor-pointer"
//             onClick={() => setIsMenuOpen?.(false)}
//           >
//             <Image
//               src="/icons/close_nav.svg"
//               alt="close"
//               width={21}
//               height={19}
//               className="w-[21px] h-[19px] hover:scale-[1.2] transition-all duration-300"
//             />
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }

// "use client";

// import Image from "next/image";
// import { Dispatch, SetStateAction, useState, useEffect, useRef } from "react";
// import { menuItems, subMenuItems, contactInfo, socialLinks } from "./data";
// import { moveRight, moveUp } from "../motionVariants";
// import Link from "next/link";
// import { useRouter } from "next/navigation";
// import { motion, AnimatePresence } from "framer-motion";
// import CustomOutlineButton from "@/app/components/common/CustomOutlineButton";

// type MenuItem = {
//   id: string;
//   label: string;
//   href?: string;
//   isButton?: boolean;
//   children?: MenuItem[];
// };
// export default function MegaMenu({
//   setIsMenuOpen,
// }: {
//   setIsMenuOpen?: Dispatch<SetStateAction<boolean>>;
// }) {
//   const [activeCategory, setActiveCategory] = useState<string | null>(null);
//   const router = useRouter();
//   const mounted = useRef(true);
//   const navTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

//   const [activeMenu, setActiveMenu] = useState(menuItems[0]);
//   const currentSubmenu = subMenuItems[
//     activeMenu.id as keyof typeof subMenuItems
//   ] as MenuItem[];

//   // ── Two permanent BG layers, no key-swapping ──────────────────────────────
//   const [bgA, setBgA] = useState(menuItems[0].bgImage);
//   const [bgB, setBgB] = useState(menuItems[0].bgImage);
//   const [aOnTop, setAOnTop] = useState(true); // which layer is currently visible
//   // ─────────────────────────────────────────────────────────────────────────

//   useEffect(() => {
//     mounted.current = true;
//     return () => {
//       mounted.current = false;
//       if (navTimer.current) clearTimeout(navTimer.current);
//     };
//   }, []);

//   const handleMenuChange = (item: (typeof menuItems)[0]) => {
//     if (!mounted.current) return;
//     setActiveMenu(item);
//     // Load the new image into the hidden layer, then flip
//     if (aOnTop) {
//       setBgB(item.bgImage);
//       setAOnTop(false);
//     } else {
//       setBgA(item.bgImage);
//       setAOnTop(true);
//     }
//   };

//   const handleNavigate = (href?: string) => {
//     if (!mounted.current) return;

//     if (href && href !== "#") {
//       // Instantly unmount without waiting for animation
//       setIsMenuOpen?.(false);
//       router.push(href);
//     } else {
//       setIsMenuOpen?.(false);
//     }
//   };

//   // Separate button items from regular items
//   const regularItems = currentSubmenu.filter((item) => !item.isButton);
//   const buttonItems = currentSubmenu.filter((item) => item.isButton);

//   return (
//     <div className="relative w-full h-screen overflow-hidden z-1000 bg-white flex flex-col">
//       <div className="w-full" />

//       <div className="relative flex-1 flex overflow-hidden">
//         {/* ── PRELOAD ALL BG IMAGES (hidden, no layout impact) ── */}
//         <div
//           aria-hidden
//           className="absolute w-0 h-0 overflow-hidden opacity-0 pointer-events-none"
//         >
//           {menuItems.map((item) => (
//             <Image
//               key={item.id}
//               src={item.bgImage}
//               alt=""
//               width={1}
//               height={1}
//               priority
//             />
//           ))}
//         </div>

//         {/* ── BG LAYER A ── */}
//         <motion.div
//           className="absolute inset-0 z-0"
//           animate={{ opacity: aOnTop ? 1 : 0 }}
//           transition={{ duration: 0.3, ease: "easeInOut" }}
//         >
//           <Image
//             src={bgA}
//             alt="background"
//             fill
//             className="object-cover"
//             priority
//           />
//         </motion.div>

//         {/* ── BG LAYER B ── */}
//         <motion.div
//           className="absolute inset-0 z-0"
//           animate={{ opacity: aOnTop ? 0 : 1 }}
//           transition={{ duration: 0.3, ease: "easeInOut" }}
//         >
//           <Image
//             src={bgB}
//             alt="background"
//             fill
//             className="object-cover"
//             priority
//           />
//         </motion.div>

//         {/* BLACK OVERLAY */}
//         <div className="absolute inset-0 bg-black/75" />

//         {/* CONTENT WRAPPER */}
//         <div className="relative z-20 flex h-full w-full container pt-120">
//           {/* LEFT MENU */}
//           <div className="w-1/2 lg:w-1/3 2xl:w-1/4 flex flex-col justify-between xl:mr-4">
//             <div className="flex flex-col justify-center gap-[22px] w-full text-white relative mb-120">
//               {menuItems.map((item, index) => {
//                 const isActive = activeMenu.id === item.id;
//                 return (
//                   <motion.div
//                     variants={moveRight(index * 0.13)}
//                     initial="hidden"
//                     whileInView="show"
//                     viewport={{ once: true }}
//                     key={item.id}
//                     className="relative flex items-center cursor-pointer"
//                     onMouseEnter={() => handleMenuChange(item)}
//                     onClick={() => item.href && handleNavigate(item.href)}
//                   >
//                     {/* ARROW */}
//                     <motion.div
//                       initial={false}
//                       animate={
//                         isActive ? { opacity: 1, x: 0 } : { opacity: 0, x: -10 }
//                       }
//                       transition={{ duration: 0.35, ease: "easeOut" }}
//                       className="absolute left-0 top-1/2 -translate-y-1/2 pb-1"
//                     >
//                       <Image
//                         src="/icons/arrow_nav.svg"
//                         alt={item.label}
//                         width={28}
//                         height={21}
//                         className="md:w-[28px] md:h-[21px] w-[20px] h-[18px] invert brightness-0"
//                       />
//                     </motion.div>

//                     {/* TITLE */}
//                     <motion.div
//                       initial={false}
//                       animate={isActive ? { x: 40 } : { x: 0 }}
//                       transition={{ duration: 0.25, ease: "easeOut" }}
//                       className="relative inline-block"
//                     >
//                       <motion.span
//                         initial={false}
//                         animate={isActive ? { opacity: 0 } : { opacity: 1 }}
//                         transition={{ duration: 0.25, ease: "easeOut" }}
//                         className="text-16 md:text-25 3xl:text-30 font-[optima] uppercase text-white"
//                       >
//                         {item.label}
//                       </motion.span>
//                       <motion.span
//                         aria-hidden="true"
//                         initial={{ opacity: 0 }}
//                         animate={isActive ? { opacity: 1 } : { opacity: 0 }}
//                         transition={{ duration: 0.25, ease: "easeOut" }}
//                         className="absolute left-0 top-0 text-16 md:text-25 3xl:text-30 font-[optima] uppercase text-white"
//                       >
//                         {item.label}
//                       </motion.span>
//                     </motion.div>
//                   </motion.div>
//                 );
//               })}
//             </div>

//             {/* CONTACT */}
//             <motion.div
//               variants={moveUp(0.2)}
//               initial="hidden"
//               animate="show"
//               className="flex-col text-white text-sm pb-90 flex"
//             >
//               <div>
//                 <motion.div
//                   variants={moveUp(0.2)}
//                   initial="hidden"
//                   animate="show"
//                   className="mb-[5px] font-[avenir] font-[900] text-16 opacity-70"
//                 >
//                   <div
//                     className="cursor-pointer"
//                     onClick={(e) => {
//                       e.preventDefault();
//                       handleNavigate("/contact-us");
//                     }}
//                   >
//                     CONTACT US
//                   </div>
//                 </motion.div>
//                 <div className="flex flex-col lg:flex-row lg:items-center font-[avenirRoman] lg:gap-4 text-white opacity-70">
//                   <motion.div
//                     variants={moveUp(0.25)}
//                     initial="hidden"
//                     animate="show"
//                     className="text-16 leading-[2.2]"
//                   >
//                     <a href={`mailto:${contactInfo.email}`}>
//                       {contactInfo.email}
//                     </a>
//                   </motion.div>
//                   <div className="hidden lg:block w-[1px] h-[13px] bg-white" />
//                   <motion.div
//                     variants={moveUp(0.2)}
//                     initial="hidden"
//                     animate="show"
//                     className="text-[18px] leading-[2.2]"
//                   >
//                     <a href={`tel:${contactInfo.phone}`}>{contactInfo.phone}</a>
//                   </motion.div>
//                 </div>
//                 <div className="flex gap-[5px] w-full mt-[30px]">
//                   {socialLinks.map((icon, i) => (
//                     <motion.div
//                       variants={moveUp(i * 0.2)}
//                       initial="hidden"
//                       whileInView="show"
//                       viewport={{ amount: 0.2, once: true }}
//                       key={i}
//                       className="cursor-pointer rounded-full w-[33px] h-[33px] bg-white/25 backdrop-blur-[30px] flex items-center justify-center"
//                     >
//                       <Image
//                         src={icon}
//                         alt="icon"
//                         width={22}
//                         height={22}
//                         className="opacity-100 w-[16px] h-[16px] hover:opacity-70 transition-opacity duration-300"
//                       />
//                     </motion.div>
//                   ))}
//                 </div>
//               </div>
//             </motion.div>
//           </div>

//           {/* MIDDLE DIVIDER */}
//           <div className="relative w-[1px] mr-20 md:mr-10 xl:mr-[70px] z-30">
//             <div
//               className="absolute left-0 top-0 h-full w-[1px] z-30"
//               style={{
//                 background:
//                   "linear-gradient(180deg, rgba(255,255,255,0) 0%, #FFFFFF 50%, rgba(255,255,255,0.8) 100%)",
//               }}
//             />
//           </div>

//           {/* RIGHT SUBMENU */}
//           <div className="flex flex-col gap-2 lg:gap-4 text-white w-1/2 sm:w-1/3 xl:w-fit mt-[8%] relative">
//             {/* Regular (non-button) items */}
//             {regularItems.map((item, idx) => (
//               <div
//                 key={item.id}
//                 onMouseEnter={() => item.children && setActiveCategory(item.id)}
//                 onMouseLeave={() => setActiveCategory(null)}
//                 className="relative flex flex-col"
//               >
//                 {/* MAIN ITEM */}
//                 <div className="relative flex items-center">
//                   {/* ARROW — only shown for items with children */}
//                   {item.children && (
//                     <motion.div
//                       initial={false}
//                       animate={
//                         activeCategory === item.id
//                           ? { opacity: 1, x: 0 }
//                           : { opacity: 0, x: -10 }
//                       }
//                       transition={{ duration: 0.35, ease: "easeOut" }}
//                       className="absolute left-0 top-1/2 -translate-y-1/2"
//                     >
//                       <Image
//                         src="/icons/arrow_nav.svg"
//                         alt=""
//                         width={20}
//                         height={16}
//                         className="w-[16px] h-[14px] md:w-[20px] md:h-[16px] invert brightness-0"
//                       />
//                     </motion.div>
//                   )}

//                   {/* LABEL — shifts right when arrow appears */}
//                   <motion.div
//                     initial={false}
//                     animate={
//                       item.children && activeCategory === item.id
//                         ? { x: 30 }
//                         : { x: 0 }
//                     }
//                     transition={{ duration: 0.25, ease: "easeOut" }}
//                   >
//                     {item.href ? (
//                       <Link
//                         href={item.href}
//                         onClick={(e) => {
//                           e.preventDefault();
//                           handleNavigate(item.href);
//                         }}
//                         className="block text-description md:text-18 leading-[2.2] uppercase hover:translate-x-2 transition-all duration-300"
//                       >
//                         {item.label}
//                       </Link>
//                     ) : (
//                       <div className="text-description md:text-18 leading-[2.2] uppercase cursor-pointer">
//                         {item.label}
//                       </div>
//                     )}
//                   </motion.div>
//                 </div>

//                 {/* CHILDREN MENU — below on < lg, to the right from lg */}
//                 <AnimatePresence>
//                   {item.children && activeCategory === item.id && (
//                     <motion.div
//                       initial={{ x: 10, opacity: 0 }}
//                       animate={{
//                         x: 0,
//                         opacity: 1,
//                         transition: {
//                           x: { duration: 0.3 },
//                           opacity: { duration: 0.2, delay: 0.1 },
//                         },
//                       }}
//                       exit={{
//                         x: 10,
//                         opacity: 0,
//                         transition: {
//                           x: { duration: 0.3 },
//                           opacity: { duration: 0.2 },
//                         },
//                       }}
//                       className="overflow-hidden flex flex-col gap-2 px-2 md:px-4 lg:absolute lg:overflow-visible lg:px-0 lg:left-full lg:top-1/2 lg:-translate-y-1/2 lg:pl-[6%] xl:pl-[20%] lg:py-80 lg:min-w-max"
//                     >
//                       {item.children.map((child) => (
//                         <Link
//                           key={child.id}
//                           href={child.href || "#"}
//                           onClick={(e) => {
//                             e.preventDefault();
//                             handleNavigate(child.href);
//                           }}
//                           className="text-16 text-description uppercase py-1 hover:translate-x-2 transition-all duration-300 block"
//                         >
//                           {child.label}
//                         </Link>
//                       ))}
//                     </motion.div>
//                   )}
//                 </AnimatePresence>
//               </div>
//             ))}

//             {/* Button items — rendered in a single row */}
//             {buttonItems.length > 0 && (
//               <div className="flex flex-row gap-5 mt-40 flex-wrap">
//                 {buttonItems.map((item) => (
//                   <div key={item.id} onClick={() => handleNavigate(item.href)}>
//                     <CustomOutlineButton
//                       text={item.label}
//                       borderColor="border-white"
//                       textColor="text-white"
//                       px="px-[18px] sm:px-[20px]  md:px-[36px] h-[50px] md:h-[66px] !leading-[1.58]"
//                     />
//                   </div>
//                 ))}
//               </div>
//             )}
//           </div>

//           {/* CLOSE BTN */}
//           <button
//             className="absolute top-4 md:top-8 lg:top-10 left-[50%] lg:left-[33.6%] 2xl:left-[26.5%] 3xl:left-[26.2%] -translate-x-1/2 bg-white/25 text-white rounded-full w-[40px] h-[40px] xl:h-[60px] xl:w-[60px] flex items-center justify-center cursor-pointer"
//             onClick={() => setIsMenuOpen?.(false)}
//           >
//             <Image
//               src="/icons/close_nav.svg"
//               alt="close"
//               width={21}
//               height={19}
//               className="w-[21px] h-[19px] hover:scale-[1.2] transition-all duration-300"
//             />
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }

"use client";

import Image from "next/image";
import { Dispatch, SetStateAction, useState, useEffect, useRef } from "react";
import { menuItems, subMenuItems, contactInfo, socialLinks } from "./data";
import { moveRight, moveUp } from "../motionVariants";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import CustomOutlineButton from "@/app/components/common/CustomOutlineButton";

type MenuItem = {
  id: string;
  label: string;
  href?: string;
  isButton?: boolean;
  newTab?: boolean;
  children?: MenuItem[];
};

// ─── Mobile single-col sliding menu ──────────────────────────────────────────

function MobileMegaMenu({
  setIsMenuOpen,
  menuData
}: {
  setIsMenuOpen?: Dispatch<SetStateAction<boolean>>;
  menuData: any
}) {
  const router = useRouter();
  const mounted = useRef(true);

  const [activeMenu, setActiveMenu] = useState<(typeof menuItems)[0] | null>(
    null,
  );
  const [expandedChild, setExpandedChild] = useState<string | null>(null);

  // ── Two permanent BG layers (same as desktop) ─────────────────────────────
  const [bgA, setBgA] = useState(menuItems[0].bgImage);
  const [bgB, setBgB] = useState(menuItems[0].bgImage);
  const [aOnTop, setAOnTop] = useState(true);
  // ──────────────────────────────────────────────────────────────────────────

  useEffect(() => {
    mounted.current = true;
    return () => {
      mounted.current = false;
    };
  }, []);

  const handleNavigate = (href?: string, newTab?: boolean) => {
    if (!mounted.current) return;
    if (href && href !== "#") {
      if (newTab) {
        window.open(href, "_blank", "noopener,noreferrer");
      } else {
        setIsMenuOpen?.(false);
        router.push(href);
      }
    } else {
      setIsMenuOpen?.(false);
    }
  };

  const openSubmenu = (item: (typeof menuItems)[0]) => {
    setExpandedChild(null);
    setActiveMenu(item);
    // ── Crossfade to this item's bg image ──────────────────────────────────
    if (aOnTop) {
      setBgB(item.bgImage);
      setAOnTop(false);
    } else {
      setBgA(item.bgImage);
      setAOnTop(true);
    }
    // ───────────────────────────────────────────────────────────────────────
  };

  const closeSubmenu = () => {
    setExpandedChild(null);
    setActiveMenu(null);
  };

  const [dynamicSubMenuItems, setDynamicSubMenuItems] =
    useState(subMenuItems);

  const currentSubmenu = activeMenu ? dynamicSubMenuItems[
    activeMenu.id as keyof typeof dynamicSubMenuItems
  ] as MenuItem[] : [];


  // useEffect(() => {
  //   if (!menuData) return;
  //   const formattedProperties = menuData?.map((community: any) => {
  //     const relatedProperties =
  //       community.related_property?.map((property: any) => ({
  //         id: property.property_slug,
  //         label: property.property_name,
  //         href: `/properties/${property.property_slug}`,
  //       })) || [];

  //     return {
  //       id: community.community_slug,
  //       label: community.community_title,
  //       href:
  //         relatedProperties.length === 0
  //           ? `/communities/${community.community_slug}`
  //           : undefined,

  //       children:
  //         relatedProperties.length > 0
  //           ? [
  //             ...relatedProperties,
  //             {
  //               id: `${community.community_slug}-view-community`,
  //               label: "View Community",
  //               href: `/communities/${community.community_slug}`,
  //             },
  //           ]
  //           : [],
  //     };
  //   });

  //   setDynamicSubMenuItems((prev) => ({
  //     ...prev,
  //     properties: [
  //       ...formattedProperties,
  //       {
  //         id: "all-communities",
  //         label: "ALL COMMUNITIES",
  //         isButton: true,
  //         href: "/communities",
  //       },
  //       {
  //         id: "all-properties",
  //         label: "ALL PROPERTIES",
  //         isButton: true,
  //         href: "/properties",
  //       },
  //     ],
  //   }));
  // }, [menuData]);

  const [propertyFilter, setPropertyFilter] = useState<
    "all" | "off-plan" | "completed" | null
  >("all");

  useEffect(() => {
    if (!menuData) return;

    const formattedProperties = menuData?.map((community: any) => {
      const relatedProperties =
        community.related_property?.map((property: any, index: number) => ({
          id: property.property_slug,
          label: property.property_name,
          href: `/properties/${property.property_slug}`,

          // RANDOM TEMP STATUS
          status: property.property_status,
        })) || [];

      const filteredProperties =
        propertyFilter == "all"
          ? relatedProperties
          : relatedProperties.filter(
            (property: any) => property.status === propertyFilter
          );

      return {
        id: community.community_slug,
        label: community.community_title,
        href:
          relatedProperties.length === 0
            ? `/communities/${community.community_slug}`
            : undefined,

        children:
          filteredProperties.length > 0
            ? [
              ...filteredProperties,
              {
                id: `${community.community_slug}-view-community`,
                label: "View Community",
                href: `/communities/${community.community_slug}`,
              },
            ]
            : [],
      };
    });

    setDynamicSubMenuItems((prev) => ({
      ...prev,
      properties: [
        ...formattedProperties,
        {
          id: "all-communities",
          label: "ALL COMMUNITIES",
          isButton: true,
          href: "/communities",
        },
        {
          id: "all-properties",
          label: "ALL PROPERTIES",
          isButton: true,
          href: "/properties",
        },
      ],
    }));
  }, [menuData, propertyFilter]);

  const regularItems = currentSubmenu.filter((item) => !item.isButton);
  const buttonItems = currentSubmenu.filter((item) => item.isButton);

  const mainPanelVariants = {
    visible: {
      x: "0%",
      transition: {
        duration: 0.38,
        ease: [0.32, 0.72, 0, 1] as [number, number, number, number],
      },
    },
    hiddenLeft: {
      x: "-100%",
      transition: {
        duration: 0.38,
        ease: [0.32, 0.72, 0, 1] as [number, number, number, number],
      },
    },
  };

  const subPanelVariants = {
    hidden: {
      x: "100%",
      transition: {
        duration: 0.38,
        ease: [0.32, 0.72, 0, 1] as [number, number, number, number],
      },
    },
    visible: {
      x: "0%",
      transition: {
        duration: 0.38,
        ease: [0.32, 0.72, 0, 1] as [number, number, number, number],
      },
    },
  };

  const accordionVariants = {
    collapsed: {
      height: 0,
      opacity: 0,
      transition: { duration: 0.28, ease: "easeInOut" as const },
    },
    expanded: {
      height: "auto",
      opacity: 1,
      transition: { duration: 0.28, ease: "easeInOut" as const },
    },
  };

  return (
    <div className="fixed w-full h-[100dvh] overflow-hidden flex flex-col md:hidden">
      {/* ── PRELOAD ALL BG IMAGES ── */}
      <div
        aria-hidden
        className="absolute w-0 h-0 overflow-hidden opacity-0 pointer-events-none"
      >
        {menuItems.map((item) => (
          <Image
            key={item.id}
            src={item.bgImage}
            alt=""
            width={1}
            height={1}
            priority
          />
        ))}
      </div>

      {/* ── BG LAYER A ── */}
      <motion.div
        className="absolute inset-0 z-0"
        animate={{ opacity: aOnTop ? 1 : 0 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
      >
        <Image
          src={bgA}
          alt="background"
          fill
          className="object-cover"
          priority
        />
      </motion.div>

      {/* ── BG LAYER B ── */}
      <motion.div
        className="absolute inset-0 z-0"
        animate={{ opacity: aOnTop ? 0 : 1 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
      >
        <Image
          src={bgB}
          alt="background"
          fill
          className="object-cover"
          priority
        />
      </motion.div>

      {/* BLACK OVERLAY */}
      <div className="absolute inset-0 bg-black/75 z-[1]" />

      {/* Close button — always on top */}
      <button
        className="absolute top-6 right-6 z-50 bg-white/25 text-white rounded-full w-[30px] h-[30px] flex items-center justify-center cursor-pointer"
        onClick={() => setIsMenuOpen?.(false)}
        aria-label="Close menu"
      >
        <Image
          src="/icons/close_nav.svg"
          alt="close"
          width={21}
          height={19}
          className="w-auto h-[10px] hover:scale-110 transition-transform duration-300"
        />
      </button>

      {/* ── MAIN MENU PANEL ── */}
      <motion.div
        className="absolute inset-0 flex flex-col justify-between container pt-19 pb-12 z-10"
        animate={activeMenu ? "hiddenLeft" : "visible"}
        variants={mainPanelVariants}
        initial={false}
      >
        {/* Main nav items */}
        <nav className="flex flex-col gap-6">
          {menuItems.map((item, index) => (
            <motion.div
              key={item.id}
              variants={moveRight(index * 0.08)}
              initial="hidden"
              animate="show"
              className="flex items-center gap-3 cursor-pointer group"
              onClick={() => openSubmenu(item)}
            >
              <span className="text-white font-[optima] uppercase text-[18px] leading-none tracking-wide group-active:opacity-70 transition-opacity duration-150">
                {item.label}
              </span>
              <svg
                className="w-4 h-4 text-white/50 flex-shrink-0 relative top-[-1px]"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={3}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </motion.div>
          ))}
        </nav>

        {/* Contact + social */}
        <motion.div
          variants={moveUp(0.2)}
          initial="hidden"
          animate="show"
          className="flex flex-col text-white"
        >
          <div
            className="mb-1 font-[avenir] font-[900] text-[14px] opacity-70 cursor-pointer"
            onClick={() => handleNavigate("/contact-us")}
          >
            CONTACT US
          </div>
          <a
            href={`mailto:${contactInfo.emailInfo}`}
            className="font-[avenirRoman] text-[14px] opacity-70 leading-loose"
          >
            {contactInfo.emailInfo}
          </a>
          <a
            href={`mailto:${contactInfo.emailSales}`}
            className="font-[avenirRoman] text-[14px] opacity-70 leading-loose"
          >
            {contactInfo.emailSales}
          </a>
          <a
            href={`tel:${contactInfo.phone}`}
            className="font-[avenirRoman] text-[15px] opacity-70 leading-loose"
          >
            {contactInfo.phone}
          </a>
          <div className="flex gap-[5px] mt-5">
            {socialLinks.map((icon, i) => (
              <Link
              href={icon.url}
              target="_blank"
                key={i}
                className="cursor-pointer rounded-full w-[33px] h-[33px] bg-white/25 backdrop-blur-[30px] flex items-center justify-center"
              >
                <Image
                  src={icon.image}
                  alt="icon"
                  width={22}
                  height={22}
                  className="w-[16px] h-[16px] opacity-100 hover:opacity-70 transition-opacity duration-300"
                />
              </Link>
            ))}
          </div>
        </motion.div>
      </motion.div>

      {/* ── SUBMENU PANEL ── */}
      <motion.div
        className="absolute inset-0 flex flex-col px-6 pt-16 pb-10 z-20 overflow-y-auto"
        animate={activeMenu ? "visible" : "hidden"}
        variants={subPanelVariants}
        initial={false}
      >
        {/* Header: back arrow + active menu label */}
        <div className="flex items-center gap-3 mb-40">
          <button
            onClick={closeSubmenu}
            className="flex items-center justify-center w-[36px] h-[36px] rounded-full bg-white/15 flex-shrink-0"
            aria-label="Back to main menu"
          >
            <svg
              className="w-4 h-4 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>
          <span className="text-white font-[optima] uppercase text-[18px] tracking-wide opacity-80">
            {activeMenu?.label}
          </span>
        </div>

        <div className="w-full h-[1px] bg-white/20 mb-20" />

        <div className="flex flex-col flex-1">
          {regularItems.map((item) => {
            const hasChildren = !!(item.children && item.children.length > 0);
            const isExpanded = expandedChild === item.id;

            return (
              <div
                key={item.id}
                className="border-b border-white/10 last:border-b-0"
              >
                <div
                  className="flex items-center justify-between py-3 cursor-pointer group"
                  onClick={() => {
                    if (hasChildren) {
                      setExpandedChild(isExpanded ? null : item.id);
                    } else {
                      handleNavigate(item.href, item.newTab);
                    }
                  }}
                >
                  <span className="text-white font-[avenirRoman] uppercase text-[16px] tracking-wide group-active:opacity-60 transition-opacity duration-150">
                    {item.label}
                  </span>
                  {hasChildren && (
                    <motion.div
                      animate={{ rotate: isExpanded ? 180 : 0 }}
                      transition={{ duration: 0.25, ease: "easeInOut" }}
                    >
                      <svg
                        className="w-4 h-4 text-white/50"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </motion.div>
                  )}
                </div>

                {(
                  <AnimatePresence initial={false}>
                    {isExpanded && (
                      <motion.div
                        key="accordion"
                        variants={accordionVariants}
                        initial="collapsed"
                        animate="expanded"
                        exit="collapsed"
                        className="overflow-hidden"
                      >
                        {
                           (<div className="flex gap-6 py-[7px] pl-3">
                            {[
                              { label: "ALL", value: "all" },
                              { label: "OFF PLAN", value: "Off Plan" },
                              { label: "COMPLETED", value: "Completed" },
                            ].map((filter) => {
                              const isActive = propertyFilter === filter.value;

                              return (
                                <button
                                  key={filter.value}
                                  onClick={() =>
                                    setPropertyFilter(
                                      isActive
                                        ? null
                                        : (filter.value as "off-plan" | "completed")
                                    )
                                  }
                                  className={`
          relative text-[12px] uppercase tracking-[1px]
          transition-all duration-300 pb-1 cursor-pointer
          ${isActive
                                      ? "text-white"
                                      : "text-white/60 hover:text-white"
                                    }
        `}
                                >
                                  {filter.label}

                                  <span
                                    className={`
            absolute left-0 bottom-0 h-[1px] bg-white
            transition-all duration-300
            ${isActive
                                        ? "w-full opacity-100"
                                        : "w-0 opacity-0"
                                      }
          `}
                                  />
                                </button>
                              );
                            })}
                          </div>)}
                        <div className="flex flex-col pb-3 pl-3 gap-0">
                          {item.children!.map((child) => (
                            <div
                              key={child.id}
                              className="py-[7px] cursor-pointer border-b border-white/5 last:border-b-0"
                              onClick={() =>
                                handleNavigate(child.href, child.newTab)
                              }
                            >
                              <span className="text-white/70 font-[avenirRoman] uppercase text-[14px] tracking-wide hover:text-white transition-colors duration-200">
                                {child.label}
                              </span>
                            </div>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                )}
              </div>
            );
          })}

          {buttonItems.length > 0 && (
            <div className="flex flex-row flex-wrap gap-4 mt-8">
              {buttonItems.map((item) => (
                <div
                  key={item.id}
                  onClick={() => handleNavigate(item.href, item.newTab)}
                >
                  <CustomOutlineButton
                    text={item.label}
                    borderColor="border-white"
                    textColor="text-white"
                    px="px-[18px] h-[50px] !leading-[1.58]"
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
}

// ─── Desktop mega menu (UNCHANGED from original) ──────────────────────────────

function DesktopMegaMenu({
  setIsMenuOpen,
  menuData
}: {
  setIsMenuOpen?: Dispatch<SetStateAction<boolean>>;
  menuData: any
}) {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const router = useRouter();
  const mounted = useRef(true);
  const navTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const [activeMenu, setActiveMenu] = useState(menuItems[0]);


  const [bgA, setBgA] = useState(menuItems[0].bgImage);
  const [bgB, setBgB] = useState(menuItems[0].bgImage);
  const [aOnTop, setAOnTop] = useState(true);


  const [dynamicSubMenuItems, setDynamicSubMenuItems] =
    useState(subMenuItems);

  const currentSubmenu = dynamicSubMenuItems[
    activeMenu.id as keyof typeof dynamicSubMenuItems
  ] as MenuItem[];

  // useEffect(() => {
  //   if (!menuData) return;
  //   const formattedProperties = menuData?.map((community: any) => {
  //     const relatedProperties =
  //       community.related_property?.map((property: any) => ({
  //         id: property.property_slug,
  //         label: property.property_name,
  //         href: `/properties/${property.property_slug}`,
  //       })) || [];

  //     return {
  //       id: community.community_slug,
  //       label: community.community_title,
  //       href:
  //         relatedProperties.length === 0
  //           ? `/communities/${community.community_slug}`
  //           : undefined,

  //       children:
  //         relatedProperties.length > 0
  //           ? [
  //             ...relatedProperties,
  //             {
  //               id: `${community.community_slug}-view-community`,
  //               label: "View Community",
  //               href: `/communities/${community.community_slug}`,
  //             },
  //           ]
  //           : [],
  //     };
  //   });

  //   setDynamicSubMenuItems((prev) => ({
  //     ...prev,
  //     properties: [
  //       ...formattedProperties,
  //       {
  //         id: "all-communities",
  //         label: "ALL COMMUNITIES",
  //         isButton: true,
  //         href: "/communities",
  //       },
  //       {
  //         id: "all-properties",
  //         label: "ALL PROPERTIES",
  //         isButton: true,
  //         href: "/properties",
  //       },
  //     ],
  //   }));
  // }, [menuData]);

  const [propertyFilter, setPropertyFilter] = useState<
    "all" | "off-plan" | "completed" | null
  >("all");

  useEffect(() => {
    if (!menuData) return;

    const formattedProperties = menuData?.map((community: any) => {
      const relatedProperties =
        community.related_property?.map((property: any, index: number) => ({
          id: property.property_slug,
          label: property.property_name,
          href: `/properties/${property.property_slug}`,

          // RANDOM TEMP STATUS
          status: property.property_status,
        })) || [];

      const filteredProperties =
        propertyFilter == "all"
          ? relatedProperties
          : relatedProperties.filter(
            (property: any) => property.status === propertyFilter
          );

      return {
        id: community.community_slug,
        label: community.community_title,
        href:
          relatedProperties.length === 0
            ? `/communities/${community.community_slug}`
            : undefined,

        children:
          filteredProperties.length > 0
            ? [
              ...filteredProperties,
              // {
              //   id: `${community.community_slug}-view-community`,
              //   label: "View Community",
              //   href: `/communities/${community.community_slug}`,
              // },
            ]
            : [],
      };
    });

    setDynamicSubMenuItems((prev) => ({
      ...prev,
      properties: [
        ...formattedProperties,
        {
          id: "all-communities",
          label: "ALL COMMUNITIES",
          isButton: true,
          href: "/communities",
        },
        {
          id: "all-properties",
          label: "ALL PROPERTIES",
          isButton: true,
          href: "/properties",
        },
      ],
    }));
  }, [menuData, propertyFilter]);

  const activeCommunityHref = activeCategory
  ? `/communities/${activeCategory}`
  : undefined;

  useEffect(() => {
    mounted.current = true;
    return () => {
      mounted.current = false;
      if (navTimer.current) clearTimeout(navTimer.current);
    };
  }, []);

  const handleMenuChange = (item: (typeof menuItems)[0]) => {
    if (!mounted.current) return;
    setActiveMenu(item);
    if (aOnTop) {
      setBgB(item.bgImage);
      setAOnTop(false);
    } else {
      setBgA(item.bgImage);
      setAOnTop(true);
    }
  };

  const handleNavigate = (href?: string, newTab?: boolean) => {
    if (!mounted.current) return;
    if (href && href !== "#") {
      if (newTab) {
        window.open(href, "_blank", "noopener,noreferrer");
      } else {
        setIsMenuOpen?.(false);
        router.push(href);
      }
    } else {
      setIsMenuOpen?.(false);
    }
  };

  const regularItems = currentSubmenu.filter((item) => !item.isButton);
  const buttonItems = currentSubmenu.filter((item) => item.isButton);

  const activeItem = regularItems.find((item) => item.id === activeCategory);


  const activeChildren = activeItem?.children || [];

  useEffect(() => {
  setPropertyFilter("all");
}, [activeCategory]);


const childrenScrollRef = useRef<HTMLDivElement>(null);

useEffect(() => {
  if (childrenScrollRef.current) {
    childrenScrollRef.current.scrollTop = 0;
  }
}, [propertyFilter]);

  return (
    <div className="relative w-full h-screen overflow-hidden z-1000 bg-white flex-col hidden md:flex">
      <div className="w-full" />

      <div className="relative flex-1 flex overflow-hidden">
        {/* PRELOAD ALL BG IMAGES */}
        <div
          aria-hidden
          className="absolute w-0 h-0 overflow-hidden opacity-0 pointer-events-none"
        >
          {menuItems.map((item) => (
            <Image
              key={item.id}
              src={item.bgImage}
              alt=""
              width={1}
              height={1}
              priority
            />
          ))}
        </div>

        {/* BG LAYER A */}
        <motion.div
          className="absolute inset-0 z-0"
          animate={{ opacity: aOnTop ? 1 : 0 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
        >
          <Image
            src={bgA}
            alt="background"
            fill
            className="object-cover"
            priority
          />
        </motion.div>

        {/* BG LAYER B */}
        <motion.div
          className="absolute inset-0 z-0"
          animate={{ opacity: aOnTop ? 0 : 1 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
        >
          <Image
            src={bgB}
            alt="background"
            fill
            className="object-cover"
            priority
          />
        </motion.div>

        {/* BLACK OVERLAY */}
        <div className="absolute inset-0 bg-black/75" />

        {/* CONTENT WRAPPER */}
        <div className="relative z-20 flex h-full w-full container pt-120">
          {/* LEFT MENU */}
          <div className="w-1/2 lg:w-1/3 2xl:w-1/4 flex flex-col justify-between xl:mr-4">
            <div className="flex flex-col justify-center gap-[22px] w-full text-white relative mb-120">
              {menuItems.map((item, index) => {
                const isActive = activeMenu.id === item.id;
                return (
                  <Link href={(item.label === "AGENCY" || item.label === "INDIVIDUAL") ? (item.href || "#") : "#"}>
                  <motion.div
                    variants={moveRight(index * 0.13)}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true }}
                    key={item.id}
                    className="relative flex items-center cursor-pointer"
                    onMouseEnter={() => handleMenuChange(item)}
                    onClick={() => item.href && handleNavigate(item.href)}
                  >
                    {/* ARROW */}
                    <motion.div
                      initial={false}
                      animate={
                        isActive ? { opacity: 1, x: 0 } : { opacity: 0, x: -10 }
                      }
                      transition={{ duration: 0.35, ease: "easeOut" }}
                      className="absolute left-0 top-1/2 -translate-y-1/2 pb-1"
                    >
                      <Image
                        src="/icons/arrow_nav.svg"
                        alt={item.label}
                        width={28}
                        height={21}
                        className="md:w-[28px] md:h-[21px] w-[20px] h-[18px] invert brightness-0"
                      />
                    </motion.div>

                    {/* TITLE */}
                    <motion.div
                      initial={false}
                      animate={isActive ? { x: 40 } : { x: 0 }}
                      transition={{ duration: 0.25, ease: "easeOut" }}
                      className="relative inline-block"
                    >
                      <motion.span
                        initial={false}
                        animate={isActive ? { opacity: 0 } : { opacity: 1 }}
                        transition={{ duration: 0.25, ease: "easeOut" }}
                        className="text-16 md:text-25 3xl:text-30 font-[optima] uppercase text-white"
                      >
                        {item.label}
                      </motion.span>
                      <motion.span
                        aria-hidden="true"
                        initial={{ opacity: 0 }}
                        animate={isActive ? { opacity: 1 } : { opacity: 0 }}
                        transition={{ duration: 0.25, ease: "easeOut" }}
                        className="absolute left-0 top-0 text-16 md:text-25 3xl:text-30 font-[optima] uppercase text-white"
                      >
                        {item.label}
                      </motion.span>
                    </motion.div>
                  </motion.div>
                  </Link>
                );
              })}
            </div>

            {/* CONTACT */}
            <motion.div
              variants={moveUp(0.2)}
              initial="hidden"
              animate="show"
              className="flex-col text-white text-sm pb-90 flex"
            >
              <div>
                <motion.div
                  variants={moveUp(0.2)}
                  initial="hidden"
                  animate="show"
                  className="mb-[5px] font-[avenir] font-[900] text-16 opacity-70"
                >
                  <div
                    className="cursor-pointer"
                    onClick={(e) => {
                      e.preventDefault();
                      handleNavigate("/contact-us");
                    }}
                  >
                    CONTACT US
                  </div>
                </motion.div>
                <div className="flex flex-col lg:flex-row lg:items-center font-[avenirRoman] lg:gap-4 text-white opacity-70">
                  <motion.div
                    variants={moveUp(0.25)}
                    initial="hidden"
                    animate="show"
                    className="text-16 leading-[2.2] flex flex-col"
                  >
                    <a href={`mailto:${contactInfo.emailInfo}`}>
                      {contactInfo.emailInfo}
                    </a>
                  </motion.div>
                  <div className="hidden lg:block w-[1px] h-[13px] bg-white" />
                  <motion.div
                    variants={moveUp(0.2)}
                    initial="hidden"
                    animate="show"
                    className="text-[18px] leading-[2.2]"
                  >
                    <a href={`tel:${contactInfo.phone}`}>{contactInfo.phone}</a>
                  </motion.div>
                </div>
                <div className="flex flex-col lg:flex-row lg:items-center font-[avenirRoman] lg:gap-4 text-white opacity-70">
                  <motion.div
                    variants={moveUp(0.25)}
                    initial="hidden"
                    animate="show"
                    className="text-16 leading-[2.2] flex flex-col"
                  >
                    <a href={`mailto:${contactInfo.emailSales}`}>
                      {contactInfo.emailSales}
                    </a>
                  </motion.div>
                </div>
                <div className="flex gap-[5px] w-full mt-[30px]">
                  {socialLinks.map((icon, i) => (
                    <Link href={icon.url} target="_blank">
                    <motion.div
                      variants={moveUp(i * 0.2)}
                      initial="hidden"
                      whileInView="show"
                      viewport={{ amount: 0.2, once: true }}
                      key={i}
                      className="cursor-pointer rounded-full w-[33px] h-[33px] bg-white/25 backdrop-blur-[30px] flex items-center justify-center"
                    >
                      <Image
                        src={icon.image}
                        alt="icon"
                        width={22}
                        height={22}
                        className="opacity-100 w-[16px] h-[16px] hover:opacity-70 transition-opacity duration-300"
                      />
                    </motion.div>
                    </Link>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>

          {/* MIDDLE DIVIDER */}
          <div className="relative w-[1px] mr-20 md:mr-10 xl:mr-[70px] z-30">
            <div
              className="absolute left-0 top-0 h-full w-[1px] z-30"
              style={{
                background:
                  "linear-gradient(180deg, rgba(255,255,255,0) 0%, #FFFFFF 50%, rgba(255,255,255,0.8) 100%)",
              }}
            />
          </div>

          {/* RIGHT SUBMENU */}
          <div
            className="flex gap-[60px] self-start pt-50"
            onMouseLeave={() => setActiveCategory(null)}
          >

            {/* FIRST COLUMN */}
            <div className="flex flex-col gap-2 lg:gap-4 text-white w-1/2 sm:w-1/3 xl:w-fit">
              {regularItems.map((item) => (
                <div key={item.id} className="relative flex flex-col">
                  <div
                    className="relative flex items-center w-fit"
                    onMouseEnter={() =>
                      item.children && setActiveCategory(item.id)
                    }
                    onClick={() =>
                      item.children ? setActiveCategory(item.id) : null
                    }
                  >
                    {item.children && (
                      <motion.div
                        initial={false}
                        animate={
                          activeCategory === item.id
                            ? { opacity: 1, x: 0 }
                            : { opacity: 0, x: -10 }
                        }
                        transition={{ duration: 0.35, ease: "easeOut" }}
                        className="absolute left-0 top-1/2 -translate-y-1/2"
                      >
                        <Image
                          src="/icons/arrow_nav.svg"
                          alt=""
                          width={20}
                          height={16}
                          className="w-[16px] h-[14px] md:w-[20px] md:h-[16px] invert brightness-0"
                        />
                      </motion.div>
                    )}

                    <motion.div
                      initial={false}
                      animate={
                        item.children && activeCategory === item.id
                          ? { x: 30 }
                          : { x: 0 }
                      }
                      transition={{ duration: 0.25, ease: "easeOut" }}
                    >
                      {item.href ? (
                        <Link
                          href={item.href}
                          onClick={(e) => {
                            e.preventDefault();
                            handleNavigate(item.href, item.newTab);
                          }}
                          className="block text-description md:text-18 leading-[2.2] uppercase hover:translate-x-2 transition-all duration-300"
                        >
                          {item.label}
                        </Link>
                      ) : (
                        <div className="text-description md:text-18 leading-[2.2] uppercase cursor-pointer">
                          {item.label}
                        </div>
                      )}
                    </motion.div>
                  </div>
                </div>
              ))}

              {buttonItems.length > 0 && (
                <div className="flex flex-row gap-5 mt-40 flex-wrap">
                  {buttonItems.map((item) => (
                    <div
                      key={item.id}
                      onClick={() => handleNavigate(item.href, item.newTab)}
                    >
                      <CustomOutlineButton
                        text={item.label}
                        borderColor="border-white"
                        textColor="text-white"
                        px="px-[18px] sm:px-[20px] md:px-[36px] h-[44px] md:h-[50px] xl:h-[66px] !leading-[1.58]"
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* SECOND COLUMN */}
            <div>
              {activeMenu.id === "properties" && activeCategory &&
                 (
                  <div className="flex gap-6 mb-6 border-b border-white/20">
                    {[
                      { label: "ALL", value: "all" },
                      { label: "OFF PLAN", value: "Off Plan" },
                      { label: "COMPLETED", value: "Completed" },
                    ].map((filter) => {
                      const isActive = propertyFilter === filter.value;

                      return (
                        <button
                          key={filter.value}
                          onClick={() =>
                            setPropertyFilter(
                              isActive
                                ? null
                                : (filter.value as "off-plan" | "completed")
                            )
                          }
                          className={`
              relative text-[14px] uppercase tracking-[1px]
              transition-all duration-300 pb-3 cursor-pointer
              ${isActive
                              ? "text-white"
                              : "text-white/60 hover:text-white"
                            }
            `}
                        >
                          {filter.label}

                          {/* ACTIVE BORDER */}
                          <span
                            className={`
                absolute left-0 bottom-[-1px] h-[1px]
                bg-white transition-all duration-300
                ${isActive
                                ? "w-full opacity-100"
                                : "w-full opacity-0"
                              }
              `}
                          />
                        </button>
                      );
                    })}
                  </div>
                )}
                <div className="flex flex-col gap-10">
              <div ref={childrenScrollRef} onWheel={(e) => e.stopPropagation()} className={`min-w-[250px] text-white flex items-start max-h-[335px] overflow-y-auto menu-scrollbar pr-2 overflow-x-hidden`}>
                <AnimatePresence mode="wait">
                  {activeChildren.length > 0 && (
                    <motion.div
                      key={activeCategory}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      transition={{ duration: 0.3 }}
                      className="flex flex-col gap-2 lg:gap-4"
                    >
                      {activeChildren.map((child) => (
                        <Link
                          key={child.id}
                          href={child.href || "#"}
                          onClick={(e) => {
                            e.preventDefault();
                            handleNavigate(child.href, child.newTab);
                          }}
                          className="text-16 text-description uppercase py-1 hover:translate-x-2 transition-all duration-300 block"
                        >
                          {child.label}
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
              
              {activeCategory && <Link href={activeCommunityHref || ""} className="">
              <CustomOutlineButton
                        text={"View Community"}
                        onClick={()=>setIsMenuOpen?.(false)}
                        borderColor="border-white"
                        textColor="text-white"
                        px="px-[18px] sm:px-[20px] md:px-[36px] h-[44px] md:h-[50px] xl:h-[66px] !leading-[1.58]"
                      />
                      </Link>}
                      </div>
            </div>
          </div>

          {/* CLOSE BTN */}
          <button
            className="absolute top-4 md:top-8 lg:top-10 left-[50%] lg:left-[33.6%] 2xl:left-[26.5%] 3xl:left-[26.2%] -translate-x-1/2 bg-white/25 text-white rounded-full w-[40px] h-[40px] xl:h-[60px] xl:w-[60px] flex items-center justify-center cursor-pointer"
            onClick={() => setIsMenuOpen?.(false)}
          >
            <Image
              src="/icons/close_nav.svg"
              alt="close"
              width={21}
              height={19}
              className="w-[21px] h-[19px] hover:scale-[1.2] transition-all duration-300"
            />
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Root export — renders the right variant per breakpoint ───────────────────

export default function MegaMenu({
  setIsMenuOpen,
  menuData
}: {
  setIsMenuOpen?: Dispatch<SetStateAction<boolean>>;
  menuData: any
}) {
  return (
    <>
      {/* Mobile: single-col sliding (< md) */}
      <MobileMegaMenu setIsMenuOpen={setIsMenuOpen} menuData={menuData} />
      {/* Desktop: original two-col mega menu (≥ md) */}
      <DesktopMegaMenu setIsMenuOpen={setIsMenuOpen} menuData={menuData} />
    </>
  );
}
