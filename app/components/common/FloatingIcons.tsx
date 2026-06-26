// "use client";

// import { useEffect, useRef, useState } from "react";
// import Image from "next/image";
// import { AnimatePresence, motion } from "framer-motion";
// import EnquiryForm from "@/app/components/auth/EnquiryForm";
// import gsap from "gsap";

// export default function FloatingMobileIcons() {
//   const containerRef = useRef<HTMLDivElement>(null);
//   const wrapperRef = useRef<HTMLDivElement>(null);
//   const [open, setOpen] = useState(false);
//   const [enquiryOpen, setEnquiryOpen] = useState(false);
//   const [enquiryVisible, setEnquiryVisible] = useState(false);

//   const backdropRef = useRef<HTMLDivElement>(null);
//   const modalRef = useRef<HTMLDivElement>(null);

//   // ── Desktop icon entrance on mount
//   useEffect(() => {
//     if (!containerRef.current) return;
//     const icons = containerRef.current.querySelectorAll(".desk-icon");
//     gsap.fromTo(
//       icons,
//       { opacity: 0, x: 30, scale: 0.7 },
//       {
//         opacity: 1,
//         x: 0,
//         scale: 1,
//         duration: 0.6,
//         stagger: 0.1,
//         ease: "back.out(1.7)",
//         delay: 0.4,
//       },
//     );
//   }, []);

//   // ── Modal open animation
//   useEffect(() => {
//     if (!enquiryOpen) return;
//     setEnquiryVisible(true);

//     setTimeout(() => {
//       if (!backdropRef.current || !modalRef.current) return;

//       gsap.fromTo(
//         backdropRef.current,
//         { opacity: 0 },
//         { opacity: 1, duration: 0.5, ease: "power2.out" },
//       );

//       gsap.fromTo(
//         modalRef.current,
//         {
//           opacity: 0,
//           scale: 1.08,
//           filter: "blur(8px)",
//           transformOrigin: "center center",
//         },
//         {
//           opacity: 1,
//           scale: 1,
//           filter: "blur(0px)",
//           duration: 0.55,
//           ease: "power3.out",
//         },
//       );
//     }, 50);
//   }, [enquiryOpen]);

//   // ── Modal close animation
//   const closeModal = () => {
//     if (!backdropRef.current || !modalRef.current) return;

//     gsap.to(backdropRef.current, {
//       opacity: 0,
//       duration: 0.3,
//       ease: "power2.in",
//     });

//     gsap.to(modalRef.current, {
//       opacity: 0,
//       scale: 1.06,
//       filter: "blur(16px)",
//       duration: 0.5,
//       ease: "power3.out",
//       onComplete: () => {
//         setEnquiryVisible(false);
//         setEnquiryOpen(false);
//       },
//     });
//   };

//   // ── Mobile toggle icons (gsap stagger)
//   useEffect(() => {
//     if (!containerRef.current) return;
//     const icons = containerRef.current.querySelectorAll(".floating-icon");

//     gsap.to(icons, {
//       y: open ? 0 : 20,
//       opacity: open ? 1 : 0,
//       duration: 0.35,
//       stagger: 0.08,
//       ease: "power3.out",
//       pointerEvents: open ? "auto" : "none",
//     });
//   }, [open]);

//   // ── Close on outside click
//   useEffect(() => {
//     const handleClickOutside = (e: MouseEvent) => {
//       if (!wrapperRef.current?.contains(e.target as Node)) {
//         setOpen(false);
//       }
//     };
//     document.addEventListener("click", handleClickOutside);
//     return () => document.removeEventListener("click", handleClickOutside);
//   }, []);

//   // const icons = [
//   //   { src: "/icons/layout_icons/phone.svg", alt: "phone", onClick: () => {} },
//   //   {
//   //     src: "/icons/layout_icons/whatsapp.svg",
//   //     alt: "whatsapp",
//   //     onClick: () => {},
//   //   },
//   //   {
//   //     src: "/icons/layout_icons/message.svg",
//   //     alt: "message",
//   //     onClick: () => setEnquiryOpen(true),
//   //   },
//   // ];

//   const icons = [
//   {
//     src: "/icons/layout_icons/phone.svg",
//     alt: "phone",
//     onClick: () => { window.location.href = "tel:+971800468429"; }
//   },
//   {
//     src: "/icons/layout_icons/whatsapp.svg",
//     alt: "whatsapp",
//     onClick: () => { window.open("https://wa.me/971800468429", "_blank"); }
//   },
//   {
//     src: "/icons/layout_icons/message2.svg",
//     alt: "message",
//     onClick: () => setEnquiryOpen(true),
//   },
// ];

//   return (
//     <>
//       {/* ── Desktop — always visible */}
//       <div
//         ref={containerRef}
//         className="floating-icons hidden lg:flex fixed right-[6px] md:right-[12px] top-1/2 -translate-y-1/2 flex-col gap-[5px] md:gap-[9px] z-[900]"
//       >
//         {icons.map(({ src, alt, onClick }) => (
//           <div
//             key={alt}
//             onClick={onClick}
//             className="desk-icon w-[35px] h-[35px] md:w-[45px] md:h-[45px] group rounded-full backdrop-blur-[30px] flex items-center justify-center cursor-pointer bg-foreground-light/70 transition-colors duration-300 hover:bg-foreground-light/90"
//           >
//             <Image
//               src={src}
//               alt={alt}
//               width={27}
//               height={27}
//               className="w-[18px] h-[18px] md:w-[22px] md:h-[22px] group-hover:scale-[1.08] transition-transform duration-300"
//             />
//           </div>
//         ))}
//       </div>

//       {/* ── Mobile — toggled */}
//       <div
//         ref={wrapperRef}
//         className="fixed bottom-3 right-2 z-[900] lg:hidden"
//       >
//         <div className="flex flex-col items-end gap-3 mb-3">
//           <AnimatePresence>
//             {open &&
//               icons.map(({ src, alt, onClick }, i) => (
//                 <motion.div
//                   key={alt}
//                   initial={{ opacity: 0, y: 16, scale: 0.85 }}
//                   animate={{ opacity: 1, y: 0, scale: 1 }}
//                   exit={{ opacity: 0, y: 16, scale: 0.85 }}
//                   transition={{
//                     duration: 0.28,
//                     delay: i * 0.06,
//                     ease: [0.34, 1.56, 0.64, 1],
//                   }}
//                   onClick={(e) => {
//                     e.stopPropagation();
//                     onClick();
//                   }}
//                   className="floating-icon w-[35px] h-[35px] rounded-full backdrop-blur-[30px] flex items-center justify-center bg-foreground-light/70 cursor-pointer"
//                 >
//                   <Image src={src} alt={alt} width={18} height={18} />
//                 </motion.div>
//               ))}
//           </AnimatePresence>
//         </div>

//         {/* Main Button */}
//         <div
//           onClick={(e) => {
//             e.stopPropagation();
//             setOpen((p) => !p);
//           }}
//           className="w-[35px] h-[35px] rounded-full bg-foreground-light/60 text-white backdrop-blur-[20px] flex items-center justify-center cursor-pointer"
//         >
//           <Image
//             src="/images/icons/iconshare.svg"
//             alt="share"
//             width={18}
//             height={18}
//             className="brightness-0 invert-100"
//           />
//         </div>
//       </div>

//       {/* ── Enquiry Modal (GSAP animated) */}
//       {enquiryVisible && (
//         <>
//           {/* Backdrop */}
//           <div
//             ref={backdropRef}
//             className="fixed inset-0 z-[1000] bg-black/80 backdrop-blur-[6px] opacity-0"
//             onClick={closeModal}
//           />

//           {/* Modal */}
//           <div
//             ref={modalRef}
//             className="fixed inset-0 z-[1001] flex items-center justify-center opacity-0 pointer-events-none"
//           >
//             <div className="pointer-events-auto w-full">
//               <EnquiryForm onClose={closeModal} onSwitch={() => {}} />
//             </div>
//           </div>
//         </>
//       )}
//     </>
//   );
// }

"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import EnquiryForm from "@/app/components/auth/EnquiryForm";
import gsap from "gsap";

export default function FloatingMobileIcons() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [enquiryOpen, setEnquiryOpen] = useState(false);
  const [enquiryVisible, setEnquiryVisible] = useState(false);

  const backdropRef = useRef<HTMLDivElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);
  const pillRef = useRef<HTMLDivElement>(null);

  // ── Desktop icon entrance on mount
  useEffect(() => {
    if (!containerRef.current) return;
    const icons = containerRef.current.querySelectorAll(".desk-icon");
    gsap.fromTo(
      icons,
      { opacity: 0, x: 30, scale: 0.7 },
      {
        opacity: 1,
        x: 0,
        scale: 1,
        duration: 0.6,
        stagger: 0.1,
        ease: "back.out(1.7)",
        delay: 0.4,
      },
    );
  }, []);

  // ── Modal open animation
  useEffect(() => {
    if (!enquiryOpen) return;
    setEnquiryVisible(true);

    setTimeout(() => {
      if (!backdropRef.current || !modalRef.current) return;

      gsap.fromTo(
        backdropRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.5, ease: "power2.out" },
      );

      gsap.fromTo(
        modalRef.current,
        {
          opacity: 0,
          scale: 1.08,
          filter: "blur(8px)",
          transformOrigin: "center center",
        },
        {
          opacity: 1,
          scale: 1,
          filter: "blur(0px)",
          duration: 0.55,
          ease: "power3.out",
        },
      );
    }, 50);
  }, [enquiryOpen]);

  // ── Modal close animation
  const closeModal = () => {
    if (!backdropRef.current || !modalRef.current) return;

    gsap.to(backdropRef.current, {
      opacity: 0,
      duration: 0.3,
      ease: "power2.in",
    });

    gsap.to(modalRef.current, {
      opacity: 0,
      scale: 1.06,
      filter: "blur(16px)",
      duration: 0.5,
      ease: "power3.out",
      onComplete: () => {
        setEnquiryVisible(false);
        setEnquiryOpen(false);
      },
    });
  };

  useEffect(() => {
    if (!pillRef.current) return;
    gsap.fromTo(
      pillRef.current,
      { y: "140%", opacity: 0 },
      { y: "0%", opacity: 1, duration: 0.6, ease: "back.out(1.4)", delay: 0.5 },
    );
  }, []);

  // const icons = [
  //   { src: "/icons/layout_icons/phone.svg", alt: "phone", onClick: () => {} },
  //   {
  //     src: "/icons/layout_icons/whatsapp.svg",
  //     alt: "whatsapp",
  //     onClick: () => {},
  //   },
  //   {
  //     src: "/icons/layout_icons/message.svg",
  //     alt: "message",
  //     onClick: () => setEnquiryOpen(true),
  //   },
  // ];

  const icons = [
    {
      src: "/icons/layout_icons/phone.svg",
      alt: "phone",
      onClick: () => {
        window.location.href = "tel:+971800468429";
      },
    },
    {
      src: "/icons/layout_icons/whatsapp.svg",
      alt: "whatsapp",
      onClick: () => {
        window.open("https://wa.me/971800468429", "_blank");
      },
    },
    {
      src: "/icons/layout_icons/message2.svg",
      alt: "message",
      onClick: () => setEnquiryOpen(true),
    },
  ];

  return (
    <>
      {/* ── Desktop — always visible */}
      <div
        ref={containerRef}
        className="floating-icons hidden lg:flex fixed right-[6px] md:right-[12px] top-1/2 -translate-y-1/2 flex-col gap-[5px] md:gap-[9px] z-[900]"
      >
        {icons.map(({ src, alt, onClick }) => (
          <div
            key={alt}
            onClick={onClick}
            className="desk-icon w-[35px] h-[35px] md:w-[45px] md:h-[45px] group rounded-full backdrop-blur-[30px] flex items-center justify-center cursor-pointer bg-foreground-light/70 transition-colors duration-300 hover:bg-foreground-light/90"
          >
            <Image
              src={src}
              alt={alt}
              width={27}
              height={27}
              className="w-[18px] h-[18px] md:w-[22px] md:h-[22px] group-hover:scale-[1.08] transition-transform duration-300"
            />
          </div>
        ))}
      </div>

      {/* ── Mobile — pill bar */}
      <div
        ref={pillRef}
        style={{ transform: "translateY(140%)", opacity: 0 }}
        className="fixed bottom-0 left-1/2 -translate-x-1/2 z-[900] lg:hidden pb-1"
      >
        <div className="flex items-center gap-3 px-4 py-2 rounded-[50px] bg-white/10 backdrop-blur-[30px]">
          {icons.map(({ src, alt, onClick }) => (
            <div
              key={alt}
              onClick={onClick}
              className="w-[35px] h-[35px] rounded-full flex items-center justify-center cursor-pointer"
            >
              <Image src={src} alt={alt} width={18} height={18} />
            </div>
          ))}
        </div>
      </div>

      {/* ── Enquiry Modal (GSAP animated) */}
      {enquiryVisible && (
        <>
          {/* Backdrop */}
          <div
            ref={backdropRef}
            className="fixed inset-0 z-[1000] bg-black/80 backdrop-blur-[6px] opacity-0"
            onClick={closeModal}
          />

          {/* Modal */}
          <div
            ref={modalRef}
            className="fixed inset-0 z-[1001] flex items-center justify-center opacity-0 pointer-events-none"
          >
            <div className="pointer-events-auto w-full">
              <EnquiryForm onClose={closeModal} onSwitch={() => {}} />
            </div>
          </div>
        </>
      )}
    </>
  );
}
