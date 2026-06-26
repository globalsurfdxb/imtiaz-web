// "use client";
// import Image from "next/image";

// type Props = {
//   titleRef: React.RefObject<HTMLHeadingElement | null>;
//   scrollRef: React.RefObject<HTMLImageElement | null>;
// };

// export default function HeroSection({ titleRef, scrollRef }: Props) {
//   return (
//     <section
//       id="sec1"
//       className="h-screen bg-black text-white flex items-center justify-center relative text-center"
//     >
//       <div className="relative w-full h-screen overflow-hidden flex items-center justify-center text-center">
//         <video
//           className="absolute top-0 left-0 w-full object-cover h-[99.9%]"
//           src="/videos/BNR01.mp4"
//           poster="/videos/banner-vid.jpg"
//           autoPlay
//           loop
//           muted
//           playsInline
//         />
//         <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.3)_1.12%,rgba(0,0,0,0.15)_40.24%,rgba(0,0,0,0.75)_100%)] pointer-events-none" />
//         <div className="absolute bottom-[90px] 3xl:bottom-[90px] max-w-[135ch] flex flex-col gap-[40px] md:gap-[60px] 3xl:gap-[72px] items-center justify-center">
//           <div className="relative overflow-hidden">
//             <h1
//               ref={titleRef}
//               className="text-70 font-[optima] leading-[1.143] uppercase text-white opacity-0"
//             >
//               Redefining Spaces <br />
//               Elevating Lives
//             </h1>
//           </div>
//           <div className="overflow-hidden">
//             <Image
//               ref={scrollRef}
//               className="opacity-0 w-[30px]"
//               alt=""
//               src="/icons/mouse.svg"
//               width={50}
//               height={50}
//             />
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }

"use client";
import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import PropertyFilterBar from "./PropertyFilterBar";

type Props = {
  titleRef: React.RefObject<HTMLHeadingElement | null>;
  desktopVideo: string;
  mobileVideo: string;
  title: string;
  posterDesktop:string;
  posterMobile:string;
};

export default function HeroSection({
  titleRef,
  desktopVideo,
  mobileVideo,
  title,
  posterDesktop,
  posterMobile
}: Props) {
  const [isVisible, setIsVisible] = useState(false);
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
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);
  return (
    <>
      <section
        id="sec1"
        className="h-[100svh] bg-black text-white flex items-center justify-center relative text-center sticky top-0 z-0"
      >
        <div className="relative w-full h-screen overflow-hidden flex items-center justify-center text-center">
          {/* Portrait video — mobile only */}
          <video
            className="absolute top-0 left-0 w-full object-cover h-[99.9%] block md:hidden"
            src={mobileVideo}
            poster={posterMobile}
            autoPlay
            loop
            muted
            playsInline
          />
          {/* Landscape video — tablet and above */}
          <video
            className="absolute top-0 left-0 w-full object-cover h-[99.9%] hidden md:block"
            src={desktopVideo}
            poster={posterDesktop}
            autoPlay
            loop
            muted
            playsInline
          />

          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.3)_1.12%,rgba(0,0,0,0.15)_40.24%,rgba(0,0,0,0.75)_100%)] pointer-events-none" />
          <div className="absolute w-full bottom-[100px] md:bottom-[100px] flex flex-col gap-10 md:gap-8 lg:gap-50 items-center justify-center">
            <div className="relative overflow-hidden">
              <h1
                ref={titleRef}
                className="text-heading uppercase text-white opacity-0 max-w-[135ch]"
              >
                {/* BUILDING WITH PURPOSE. <br />
                DELIVERING WITH PRECISION. */}
                {title.split(/(?<=\.)/).map((item, index) => (
                  <span key={index}>
                    {item.trim()}
                    <br />
                  </span>
                ))}
              </h1>
            </div>

            {/* <div className="hidden lg:block opacity-0" ref={searchRef}>
              <div className="w-full">
                <PropertyFilterBar communitiesData={communitiesData} />
              </div>
            </div>

            <div className="w-full lg:hidden px-5 opacity-0" ref={mobsearchRef}>
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
            </div> */}

            {/* Mouse icon — now below the search pill */}
            {/* <div className="overflow-hidden">
              <Image
                ref={scrollRef}
                className="opacity-0 w-[30px]"
                alt=""
                src="/icons/mouse.svg"
                width={50}
                height={50}
              />
            </div> */}
          </div>
        </div>
      </section>
      {/* <div
        className={`fixed -bottom-1 left-0 right-0 z-[9999] flex justify-center px-4 pb-6 transition-transform duration-500 ease-out ${
          isVisible ? "translate-y-0" : "translate-y-full"
        }`}
      >
        <div className="w-full  " ref={containerRef}>
          <PropertyFilterBar communitiesData={communitiesData} />
        </div>
      </div> */}
    </>
  );
}
