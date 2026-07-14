// "use client";

// import Image from "next/image";
// import { useState, useRef, useEffect } from "react";
// import gsap from "gsap";
// import { ScrollTrigger } from "gsap/ScrollTrigger";
// import CustomIconButton from "../../common/CustomIconButton";
// import { SectionHeading } from "../../animations/SectionHeading";
// import { useLenis } from "@/app/contexts/LenisContext";

// gsap.registerPlugin(ScrollTrigger);

// const units = [
//   {
//     id: "1bhk",
//     label: "1 Bedroom",
//     tag: "1 BHK",
//     units: 94,
//     area: "755 sq ft — 1100 sq ft",
//     image: "/images/projects/floor.png",
//   },
//   {
//     id: "2bhk",
//     label: "2 Bedroom",
//     tag: "2 BHK",
//     units: 72,
//     area: "1100 sq ft — 1450 sq ft",
//     image: "/images/projects/floor.png",
//   },
//   {
//     id: "3bhk",
//     label: "3 Bedroom",
//     tag: "3 BHK",
//     units: 48,
//     area: "1450 sq ft — 1900 sq ft",
//     image: "/images/projects/floor.png",
//   },
//   {
//     id: "3bhk-ph",
//     label: "3 bedroom penthouse",
//     tag: "3 BHK PH",
//     units: 12,
//     area: "2200 sq ft — 2800 sq ft",
//     image: "/images/projects/floor.png",
//   },
//   {
//     id: "3bhk-dx",
//     label: "3 Bedroom Duplex",
//     tag: "3 BHK DX",
//     units: 20,
//     area: "1900 sq ft — 2400 sq ft",
//     image: "/images/projects/floor.png",
//   },
//   {
//     id: "4bhk-dx",
//     label: "4 Bedroom Duplex",
//     tag: "4 BHK DX",
//     units: 16,
//     area: "2400 sq ft — 3200 sq ft",
//     image: "/images/projects/floor.png",
//   },
//   {
//     id: "3bhk-th",
//     label: "3 bedroom town house",
//     tag: "3 BHK TH",
//     units: 8,
//     area: "2600 sq ft — 3000 sq ft",
//     image: "/images/projects/floor.png",
//   },
// ];

// type Unit = (typeof units)[0];

// function FloorPlanImage({ unit }: { unit: Unit }) {
//   const imageRef = useRef<HTMLDivElement>(null);

//   useEffect(() => {
//     if (!imageRef.current) return;

//     // Animate image fade and scale on unit change
//     gsap.fromTo(
//       imageRef.current,
//       {
//         opacity: 0,
//         scale: 0.95,
//       },
//       {
//         opacity: 1,
//         scale: 1,
//         duration: 0.6,
//         ease: "power2.out",
//       },
//     );
//   }, [unit.id]);

//   return (
//     <div ref={imageRef} className="relative w-full h-full">
//       <Image
//         src={unit.image}
//         alt={`${unit.label} floor plan`}
//         fill
//         className="object-contain"
//         sizes="(max-width: 454px) 90vw, 454px"
//         priority
//       />
//     </div>
//   );
// }

// function MobileFloorPanel({ unit }: { unit: Unit }) {
//   const panelRef = useRef<HTMLDivElement>(null);

//   useEffect(() => {
//     if (!panelRef.current) return;

//     // Animate panel appearance on mobile
//     gsap.fromTo(
//       panelRef.current,
//       {
//         opacity: 0,
//         y: 20,
//         height: 0,
//       },
//       {
//         opacity: 1,
//         y: 0,
//         height: "auto",
//         duration: 0.5,
//         ease: "power2.out",
//       },
//     );
//   }, [unit.id]);

//   return (
//     <div
//       ref={panelRef}
//       className="bg-[#f5f0eb] rounded-xl p-4 border border-[#ddd8d0] shadow-sm overflow-hidden"
//     >
//       {/* Floor plan image */}
//       <div className="relative w-full aspect-square max-w-[320px] mx-auto mb-6">
//         <FloorPlanImage unit={unit} />
//       </div>

//       {/* Stats row */}
//       <div className="flex flex-row justify-around border-t border-[#ddd8d0] pt-4">
//         <div className="text-center">
//           <p className="text-25 font-[optima] leading-[1.4] mb-2 text-foreground">
//             UNITS
//           </p>
//           <p className="text-description text-foreground-light">
//             {unit.units} units
//           </p>
//         </div>
//         <div className="w-px bg-[#ddd8d0]" />
//         <div className="text-center">
//           <p className="text-25 font-[optima] leading-[1.4] mb-2 text-foreground">
//             TOTAL AREA
//           </p>
//           <p className="text-description text-foreground-light">{unit.area}</p>
//         </div>
//       </div>

//       {/* Download button */}
//       <a href={unit.image} download={`${unit.image}`}>
//         <div className="w-fit mx-auto mt-50 group flex items-center justify-center gap-2 border border-[#6b1a1a] leading-[1.37] text-foreground-light rounded-full px-6 py-3 2xl:px-[42px] 2xl:py-[20px] text-description 2xl:!text-[19px] hover:bg-[#6b1a1a] hover:text-white transition-colors duration-300 mt-2">
//           <div className="flex items-center gap-[10px]">
//             <span>
//               <svg
//                 width="24"
//                 height="24"
//                 viewBox="0 0 24 24"
//                 fill="none"
//                 xmlns="http://www.w3.org/2000/svg"
//               >
//                 <path
//                   d="M20 14.6665V18.2221C20 18.6936 19.8127 19.1457 19.4793 19.4791C19.1459 19.8125 18.6937 19.9998 18.2222 19.9998H5.77778C5.30628 19.9998 4.8541 19.8125 4.5207 19.4791C4.1873 19.1457 4 18.6936 4 18.2221V14.6665"
//                   stroke="#490905"
//                   className="group-hover:stroke-white transition-colors duration-300"
//                   strokeWidth="1.44"
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                 />
//                 <path
//                   d="M7.55469 10.2222L11.9991 14.6666L16.4436 10.2222"
//                   stroke="#490905"
//                   className="group-hover:stroke-white transition-colors duration-300"
//                   strokeWidth="1.44"
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                 />
//                 <path
//                   d="M12 14.6667V4"
//                   stroke="#490905"
//                   className="group-hover:stroke-white transition-colors duration-300"
//                   strokeWidth="1.44"
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                 />
//               </svg>
//             </span>
//             <span className="2xl:px-[15px]">Download Unit layout</span>
//           </div>
//         </div>
//       </a>
//     </div>
//   );
// }

// function SideInfo({ unit }: { unit: Unit }) {
//   const sideInfoRef = useRef<HTMLDivElement>(null);

//   useEffect(() => {
//     if (!sideInfoRef.current) return;

//     // Animate side info appearance
//     gsap.fromTo(
//       sideInfoRef.current,
//       {
//         opacity: 0,
//         x: 30,
//       },
//       {
//         opacity: 1,
//         x: 0,
//         duration: 0.6,
//         ease: "power2.out",
//       },
//     );
//   }, [unit.id]);

//   return (
//     <div ref={sideInfoRef} className="flex flex-col gap-6 2xl:gap-[30px]">
//       <div>
//         <p className="text-25 font-[optima] leading-[1.4] mb-20 text-foreground">
//           UNITS
//         </p>
//         <div className="border-b border-black/30 pb-30">
//           <p className="text-description text-foreground-light">
//             {unit.units} units
//           </p>
//         </div>
//       </div>

//       <div>
//         <p className="text-25 font-[optima] leading-[1.4] mb-20 text-foreground">
//           TOTAL AREA
//         </p>
//         <div>
//           <p className="text-description text-foreground-light">{unit.area}</p>
//         </div>
//       </div>

//       <a href={unit.image} download={`${unit.image}`}>
//         <CustomIconButton
//           icondownload={true}
//           iconColor="dark"
//           className="w-fit 2xl:!px-[37.5px] 3xl:!px-[41px] 2xl:!py-[20px]"
//           text="Download Unit layout"
//           borderColor="border-primary-2"
//           textColor="text-foreground-light"
//           variant="dark"
//         />
//       </a>
//     </div>
//   );
// }

// export default function UnitLayout() {
//   const [activeId, setActiveId] = useState<string | null>("1bhk");
//   const activeUnit = units.find((u) => u.id === activeId);
//   const sectionRef = useRef<HTMLElement>(null);
//   const titleRef = useRef<HTMLHeadingElement>(null);
//   const buttonsContainerRef = useRef<HTMLDivElement>(null);
//   const centerRef = useRef<HTMLDivElement>(null);
//   const panelRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});
//   const { scrollTo } = useLenis();

//   const handleUnitClick = (unitId: string) => {
//     const isCurrentlyActive = activeId === unitId;
//     setActiveId(isCurrentlyActive ? null : unitId);

//     if (
//       !isCurrentlyActive &&
//       typeof window !== "undefined" &&
//       window.innerWidth < 1024
//     ) {
//       setTimeout(() => {
//         const button = buttonsContainerRef.current?.querySelector(
//           `[data-unit-id="${unitId}"]`,
//         );
//         if (button) {
//           const top = button.getBoundingClientRect().top + window.scrollY - 80;
//           scrollTo(top, { duration: 1 });
//         }
//       }, 100);
//     }
//   };

//   // Scroll trigger animation for entire section
//   useEffect(() => {
//     if (!sectionRef.current) return;

//     // Kill existing triggers to prevent conflicts
//     ScrollTrigger.getAll().forEach((trigger) => {
//       if (trigger.vars.id === "unit-layout-scroll") trigger.kill();
//     });

//     const tl = gsap.timeline({
//       scrollTrigger: {
//         trigger: sectionRef.current,
//         start: "top 80%",
//         end: "top 20%",
//         toggleActions: "play none none none",
//         id: "unit-layout-scroll",
//       },
//     });

//     // Animate title
//     if (titleRef.current) {
//       tl.fromTo(
//         titleRef.current,
//         {
//           opacity: 0,
//           y: 30,
//         },
//         {
//           opacity: 1,
//           y: 0,
//           duration: 0.8,
//           ease: "power2.out",
//         },
//         0,
//       );
//     }

//     // Animate buttons with stagger
//     if (buttonsContainerRef.current) {
//       const buttons = buttonsContainerRef.current.querySelectorAll("button");
//       tl.fromTo(
//         buttons,
//         {
//           opacity: 0,
//           x: -30,
//         },
//         {
//           opacity: 1,
//           x: 0,
//           duration: 0.6,
//           stagger: 0.1,
//           ease: "power2.out",
//         },
//         0.2,
//       );
//     }

//     // Animate center content
//     if (centerRef.current) {
//       tl.fromTo(
//         centerRef.current,
//         {
//           opacity: 0,
//           scale: 0.95,
//         },
//         {
//           opacity: 1,
//           scale: 1,
//           duration: 0.8,
//           ease: "power2.out",
//         },
//         0.2,
//       );
//     }

//     return () => {
//       tl.kill();
//       ScrollTrigger.getAll().forEach((trigger) => {
//         if (trigger.vars.id === "unit-layout-scroll") trigger.kill();
//       });
//     };
//   }, []);

//   return (
//     <section
//       data-header="dark"
//       ref={sectionRef}
//       className="bg-gray py-120 2xl:py-130"
//     >
//       <SectionHeading
//         title={"UNIT LAYOUT"}
//         className="text-center text-heading mb-50"
//       />
//       <div className="container">
//         <div className="mx-auto 3xl:!max-w-[1605px] flex items-end flex-col lg:flex-row gap-8 lg:gap-12">
//           {/* LEFT: Accordion buttons */}
//           <div className="w-full lg:w-64 xl:w-[305px] flex-shrink-0">
//             <div
//               ref={buttonsContainerRef}
//               className="flex flex-col gap-2 lg:gap-[18px]"
//             >
//               {units.map((unit) => {
//                 const isActive = activeId === unit.id;
//                 return (
//                   <div key={unit.id}>
//                     <button
//                       data-unit-id={unit.id}
//                       className={`cursor-pointer flex items-center justify-center group relative transition-colors duration-300 overflow-hidden w-full text-center py-4 px-6 3xl:py-[16.67px] rounded-full bg-white text-foreground-light font-[avenirBook] text-16 leading-[100%] 2xl:h-[58.33px] 2xl:max-w-[305px]`}
//                       onClick={() => handleUnitClick(unit.id)}
//                     >
//                       <div className="flex items-center gap-[10px] 2xl:gap-[10px]">
//                         <span
//                           className={`${
//                             isActive ? "scale-x-100" : ""
//                           } absolute inset-y-0 left-0 w-[50%] bg-primary-2 transform scale-x-0 origin-left transition-transform duration-300 ease-out group-hover:scale-x-100`}
//                         ></span>
//                         <span
//                           className={`${
//                             isActive ? "scale-x-100" : ""
//                           } absolute inset-y-0 right-0 w-[50%] bg-primary-2 transform scale-x-0 origin-right transition-transform duration-300 ease-out group-hover:scale-x-100`}
//                         ></span>
//                         <span
//                           className={`${
//                             isActive ? "text-white" : ""
//                           } relative z-10 transition-colors duration-300 min-w-[98px] inline-block text-center group-hover:text-white`}
//                         >
//                           {unit.label}
//                         </span>
//                       </div>
//                     </button>

//                     {/* Mobile: inline accordion panel */}
//                     {isActive && (
//                       <div
//                         ref={(el) => {
//                           if (el) panelRefs.current[unit.id] = el;
//                         }}
//                         className="block lg:hidden mt-3 mb-1"
//                       >
//                         <MobileFloorPanel unit={unit} />
//                       </div>
//                     )}
//                   </div>
//                 );
//               })}
//             </div>
//           </div>

//           {/* CENTER: Floor plan image — desktop only */}
//           <div
//             ref={centerRef}
//             className="hidden lg:flex flex-1 items-center justify-center"
//           >
//             {activeUnit ? (
//               <div className="relative w-full max-w-[454px] aspect-square">
//                 <FloorPlanImage unit={activeUnit} />
//               </div>
//             ) : (
//               <div className="flex items-center justify-center flex-1 text-[#999] text-sm tracking-widest">
//                 SELECT A UNIT TYPE
//               </div>
//             )}
//           </div>

//           {/* RIGHT: Stats + download — desktop only */}
//           {activeUnit && (
//             <div className="hidden lg:flex flex-col justify-center gap-6 min-w-[300px] 3xl:min-w-[358px]">
//               <SideInfo unit={activeUnit} />
//             </div>
//           )}
//         </div>
//       </div>
//     </section>
//   );
// }



"use client";

import Image from "next/image";
import { useState, useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import CustomIconButton from "../../common/CustomIconButton";
import { SectionHeading } from "../../animations/SectionHeading";
import { useLenis } from "@/app/contexts/LenisContext";
import { UnitLayoutItem } from "../data";
import EnquiryForm from "../../auth/EnquiryForm";

gsap.registerPlugin(ScrollTrigger);



type Unit = {
  id: number,
  label: string,
  units: string,
  area: string,
  image: string,
  brand_logo: string
}

function FloorPlanImage({ unit }: { unit: Unit }) {
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!imageRef.current) return;

    gsap.fromTo(
      imageRef.current,
      { opacity: 0, scale: 0.95 },
      { opacity: 1, scale: 1, duration: 0.6, ease: "power2.out" },
    );
  }, [unit.id]);

  return (
    <div ref={imageRef} className="relative w-full h-full">
      <Image
        src={unit.image}
        alt={`${unit.label} floor plan`}
        fill
        className="object-contain"
        priority
      />
    </div>
  );
}

function MobileFloorPanel({ unit }: { unit: Unit }) {
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!panelRef.current) return;

    gsap.fromTo(
      panelRef.current,
      { opacity: 0, y: 20, height: 0 },
      { opacity: 1, y: 0, height: "auto", duration: 0.5, ease: "power2.out" },
    );
  }, [unit.id]);

  return (
    <div
      ref={panelRef}
      className="overflow-hidden"
    >
      {/* Floor plan image */}
      <div className="relative w-full aspect-square max-w-[340px] md:max-w-[360px] lg:max-w-[320px] mx-auto mb-20 md:mb-6">
        <FloorPlanImage unit={unit} />
      </div>

      {/* Stats row — top border full width, vertical divider in center like a T */}
      <div className="border-t border-[#ddd8d0] flex flex-row">
        <div className="pt-[15px] text-left w-[135px] pl-[30px]">
          <p className="text-25 font-[optima] leading-[1.4] mb-1 text-foreground">
            UNITS
          </p>
          <p className="text-description text-foreground-light">
            {unit.units} units
          </p>
        </div>
        <div className="w-px bg-[#ddd8d0] self-stretch" />
        <div className="flex-1 pl-[50px] pt-[15px] pb-[14px] text-left">
          <p className="text-25 font-[optima] leading-[1.4] mb-1 text-foreground">
            TOTAL AREA
          </p>
          <p className="text-description text-foreground-light">{unit.area}</p>
        </div>
      </div>

      {/* Download button */}
      <a href={unit.image} download={`${unit.image}`}>
        <div className="w-fit mx-auto mt-[30px]  group flex items-center justify-center gap-2 border border-[#6b1a1a] leading-[1.37] text-foreground-light rounded-full px-6 py-3 text-description hover:bg-[#6b1a1a] hover:text-white transition-colors duration-300">
          <div className="flex items-center gap-[10px]">
            <span>
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M20 14.6665V18.2221C20 18.6936 19.8127 19.1457 19.4793 19.4791C19.1459 19.8125 18.6937 19.9998 18.2222 19.9998H5.77778C5.30628 19.9998 4.8541 19.8125 4.5207 19.4791C4.1873 19.1457 4 18.6936 4 18.2221V14.6665"
                  stroke="#490905"
                  className="group-hover:stroke-white transition-colors duration-300"
                  strokeWidth="1.44"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M7.55469 10.2222L11.9991 14.6666L16.4436 10.2222"
                  stroke="#490905"
                  className="group-hover:stroke-white transition-colors duration-300"
                  strokeWidth="1.44"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M12 14.6667V4"
                  stroke="#490905"
                  className="group-hover:stroke-white transition-colors duration-300"
                  strokeWidth="1.44"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
            <span>Fact Sheet</span>
          </div>
        </div>
      </a>
    </div>
  );
}

function SideInfo({ unit, openModal }: { unit: Unit; openModal: (url: string, fileName: string) => void }) {
  const sideInfoRef = useRef<HTMLDivElement>(null);

  const getFileName = (path: string, label: string) => {
    const fileName = path?.split('/').pop() || label.toLowerCase();
    return fileName;
  };


  useEffect(() => {
    if (!sideInfoRef.current) return;

    gsap.fromTo(
      sideInfoRef.current,
      { opacity: 0, x: 30 },
      { opacity: 1, x: 0, duration: 0.6, ease: "power2.out" },
    );
  }, [unit.id]);

  return (
    <div ref={sideInfoRef} className="flex flex-col gap-6 2xl:gap-[30px]">
      <div>
        <p className="text-25 font-[optima] leading-[1.4] mb-20 text-foreground">
          UNITS
        </p>
        <div className="border-b border-black/30 pb-30">
          <p className="text-description text-foreground-light">
            {unit.units} units
          </p>
        </div>
      </div>

      <div>
        <p className="text-25 font-[optima] leading-[1.4] mb-20 text-foreground">
          TOTAL AREA
        </p>
        <div>
          <p className="text-description text-foreground-light">{unit.area}</p>
        </div>
      </div>

      <div onClick={() => openModal(unit.image, getFileName(unit.image, unit.label))}>
        <CustomIconButton
          icondownload={true}
          iconColor="dark"
          className="w-fit 2xl:!px-[37.5px] 3xl:!px-[41px] 2xl:!py-[20px]"
          text="Download Unit layout"
          borderColor="border-primary-2"
          textColor="text-primary-2"
          variant="dark"
        />
      </div>
    </div>
  );
}

export default function UnitLayout({ data }: { data: UnitLayoutItem[] }) {

  const units = (data || []).map((item, index) => ({
    id: index,
    label: item.title || "",
    area: item.total_area || "",
    image: item.image_url || "",
    ...item,
  }));

  const [enquiryVisible, setEnquiryVisible] = useState(false);
  const backdropRef = useRef<HTMLDivElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);
  const pendingDownload = useRef<{ url: string; fileName: string } | null>(null);



  const openModal = (url: string, fileName: string) => {
    pendingDownload.current = { url, fileName };
    setEnquiryVisible(true);
  };

  // Animate in after visible
  useEffect(() => {
    if (!enquiryVisible) return;
    setTimeout(() => {
      if (!backdropRef.current || !modalRef.current) return;
      gsap.fromTo(backdropRef.current, { opacity: 0 }, { opacity: 1, duration: 0.5, ease: "power2.out" });
      gsap.fromTo(
        modalRef.current,
        { opacity: 0, scale: 1.08, filter: "blur(8px)" },
        { opacity: 1, scale: 1, filter: "blur(0px)", duration: 0.55, ease: "power3.out" }
      );
    }, 50);
  }, [enquiryVisible]);

  const closeModal = () => {
    if (!backdropRef.current || !modalRef.current) return;
    gsap.to(backdropRef.current, { opacity: 0, duration: 0.3, ease: "power2.in" });
    gsap.to(modalRef.current, {
      opacity: 0, scale: 1.06, filter: "blur(16px)", duration: 0.5, ease: "power3.out",
      onComplete: () => setEnquiryVisible(false),
    });
  };

const handleSuccess = async () => {
  closeModal();
  if (!pendingDownload.current) return;
  const { url, fileName } = pendingDownload.current;
  pendingDownload.current = null;

  try {
    const response = await fetch(url);
    const blob = await response.blob();

    const mimeToExt: Record<string, string> = {
      "image/jpeg": "jpg",
      "image/png": "png",
      "image/webp": "webp",
      "application/pdf": "pdf",
    };
    const mime = blob.type.split(";")[0].trim();
    const ext = mimeToExt[mime] || "jpg";
    const baseName = fileName.replace(/\.[^/.]+$/, "");
    const finalName = `${baseName}.${ext}`;

    const objectUrl = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = objectUrl;
    a.download = finalName;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(objectUrl);
  } catch {
    window.open(url, "_blank");
  }
};

  const [activeId, setActiveId] = useState<number | null>(0);
  const activeUnit = units.find((u: { id: number }) => u.id === activeId);
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const buttonsContainerRef = useRef<HTMLDivElement>(null);
  const centerRef = useRef<HTMLDivElement>(null);
  const panelRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});
  const { scrollTo } = useLenis();

  console.log(activeUnit)
  const handleUnitClick = (unitId: number) => {
    const isCurrentlyActive = activeId === unitId;
    console.log(isCurrentlyActive)
    setActiveId(unitId);

    if (
      !isCurrentlyActive &&
      typeof window !== "undefined" &&
      window.innerWidth < 1024
    ) {
      setTimeout(() => {
        const button = buttonsContainerRef.current?.querySelector(
          `[data-unit-id="${unitId}"]`,
        );
        if (button) {
          const top = button.getBoundingClientRect().top + window.scrollY - 80;
          scrollTo(top, { duration: 1 });
        }
      }, 100);
    }
  };

  useEffect(() => {
    if (!sectionRef.current) return;

    ScrollTrigger.getAll().forEach((trigger) => {
      if (trigger.vars.id === "unit-layout-scroll") trigger.kill();
    });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 80%",
        end: "top 20%",
        toggleActions: "play none none none",
        id: "unit-layout-scroll",
      },
    });

    if (titleRef.current) {
      tl.fromTo(
        titleRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" },
        0,
      );
    }

    if (buttonsContainerRef.current) {
      const buttons = buttonsContainerRef.current.querySelectorAll("button");
      tl.fromTo(
        buttons,
        { opacity: 0, x: -30 },
        { opacity: 1, x: 0, duration: 0.6, stagger: 0.1, ease: "power2.out" },
        0.2,
      );
    }

    if (centerRef.current) {
      tl.fromTo(
        centerRef.current,
        { opacity: 0, scale: 0.95 },
        { opacity: 1, scale: 1, duration: 0.8, ease: "power2.out" },
        0.2,
      );
    }

    return () => {
      tl.kill();
      ScrollTrigger.getAll().forEach((trigger) => {
        if (trigger.vars.id === "unit-layout-scroll") trigger.kill();
      });
    };
  }, []);

  return (
    <section
      data-header="dark"
      ref={sectionRef}
      className="bg-gray py-[70px] lg:py-120 2xl:py-130"
    >
      <SectionHeading
        title={"UNIT LAYOUT"}
        className="text-center text-heading mb-50"
      />
      <div className="container">
        <div className="mx-auto 3xl:!max-w-[1605px] flex items-end flex-col lg:flex-row gap-8 lg:gap-12">
          {/* LEFT: Accordion buttons */}
          <div className="w-full lg:w-64 xl:w-[305px] flex-shrink-0">
            <div
              ref={buttonsContainerRef}
              onWheel={(e) => e.stopPropagation()}
              className="show-scrollbar grid grid-cols-2 gap-x-[10px] gap-y-[16px] lg:flex lg:flex-col lg:gap-[18px] max-h-[300px] lg:max-h-[500px] overflow-y-auto pr-2"
            >
              {units.map((unit) => {
                const isActive = activeId === unit.id;
                return (
                  <div key={unit.id} className="contents lg:block">
                    <button
                      data-unit-id={unit.id}
                      className={`cursor-pointer flex items-center justify-center group relative transition-colors duration-300 overflow-hidden w-full text-center py-4 px-6 3xl:py-[16.67px] rounded-full bg-white text-foreground-light font-[avenirBook] text-16 leading-[100%] 2xl:h-[58.33px] 2xl:max-w-[305px]`}
                      onClick={() => handleUnitClick(unit.id)}
                    >
                      <div className="flex items-center gap-[10px] 2xl:gap-[10px]">
                        <span
                          className={`${isActive ? "scale-x-100" : ""
                            } absolute inset-y-0 left-0 w-[50%] bg-primary-2 transform scale-x-0 origin-left transition-transform duration-300 ease-out group-hover:scale-x-100`}
                        ></span>
                        <span
                          className={`${isActive ? "scale-x-100" : ""
                            } absolute inset-y-0 right-0 w-[50%] bg-primary-2 transform scale-x-0 origin-right transition-transform duration-300 ease-out group-hover:scale-x-100`}
                        ></span>
                        <span
                          className={`${isActive ? "text-white" : ""
                            } relative z-10 transition-colors duration-300 min-w-[98px] inline-block text-center group-hover:text-white`}
                        >
                          {unit.label}
                        </span>
                      </div>
                    </button>
                  </div>
                );
              })}
            </div>

            {/* Mobile: panel rendered BELOW the full grid */}
            {activeUnit && (
              <div className="block lg:hidden mt-[30px]">
                <MobileFloorPanel unit={activeUnit} />
              </div>
            )}
          </div>

          {/* CENTER: Floor plan image — desktop only */}
          <div
            ref={centerRef}
            className="hidden lg:flex flex-1 items-center justify-center"
          >
            {activeUnit ? (
              <div className="relative w-full max-w-[454px] 3xl:max-w-[530px] aspect-square">
                <FloorPlanImage unit={activeUnit} />
              </div>
            ) : (
              <div className="flex items-center justify-center flex-1 text-[#999] text-sm tracking-widest">
                SELECT A UNIT TYPE
              </div>
            )}
          </div>

          {/* RIGHT: Stats + download — desktop only */}
          {activeUnit && (
            <div className="hidden lg:flex flex-col justify-center gap-6 min-w-[300px] 3xl:min-w-[358px]">
              <SideInfo unit={activeUnit} openModal={openModal}/>
            </div>
          )}
        </div>
      </div>

      {/* Enquiry Modal */}
      {enquiryVisible && (
        <>
          <div ref={backdropRef} className="fixed inset-0 z-[1000] bg-black/80 backdrop-blur-[6px] opacity-0" onClick={closeModal} />
          <div ref={modalRef} className="fixed inset-0 z-[1001] flex items-center justify-center opacity-0 pointer-events-none">
            <div className="pointer-events-auto w-full">
              <EnquiryForm onClose={closeModal} onSwitch={() => { }} onSuccess={handleSuccess} />
            </div>
          </div>
        </>
      )}

    </section>
  );
}