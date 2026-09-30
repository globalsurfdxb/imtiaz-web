"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SectionHeading } from "../animations/SectionHeading";
import { SectionDescription } from "../animations/SectionDescription";
type EverythingWithinData = {
  title: string;
  description: string;
  amenities: {
    icon: string;
    label: string;
  }[];
};

type Props = {
  data: EverythingWithinData;
  maxTitle?: string;
};

export default function Amenities({ data, maxTitle }: Props) {
  const gridRef = useRef<HTMLDivElement>(null);

  const [isXL, setIsXL] = useState(false);

  useEffect(() => {
    const check = () => setIsXL(window.innerWidth >= 1280);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  useEffect(() => {
    if (!gridRef.current) return;

    const cards = gridRef.current.querySelectorAll(".amenity-card");

    gsap.set(cards, { opacity: 0, y: 50, scale: 0.95 });

    gsap.to(cards, {
      opacity: 1,
      y: 0,
      scale: 1,
      duration: 0.6,
      ease: "power3.out",
      stagger: 0.1,
      scrollTrigger: {
        trigger: gridRef.current,
        start: "top 80%",
        once: true,
      },
    });

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, [data.amenities]);

  return (
    <section
      data-header="dark"
      className="w-full py-[50px] lg:py-120 3xl:py-130 "
    >
      <div className="container flex flex-col justify-center">
        {/* Header */}
        <div className="text-center content-spacing-mobile-padding">
          {data.title && (
            <SectionHeading
              title={data.title}
              className="mb-6 md:mb-20 text-foreground"
            />
          )}
          {data.description && (
            <SectionDescription
              text={data.description}
              className={`shrink-0  mx-auto text-foreground-light whitespace-pre-line ${maxTitle ? maxTitle : ""}`}
            />
          )}
        </div>
        <div>
          <div>
            {/* <div
              ref={gridRef}
              className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-5 mx-auto justify-center items-center mt-[40px] md:mt-50 gap-y-[40px] lg:gap-y-60"
            > */}
            <div
              ref={gridRef}
              // Container
              className="flex flex-wrap justify-center items-start mt-[40px] md:mt-50 gap-y-2.5 md:gap-y-[35px] lg:gap-y-[40px] lg:gap-y-60"
            >
              {data?.amenities?.map((item, i) => (
                <div
                  key={i}
                  className="amenity-card w-[calc(100%/2)] md:w-[calc(100%/3)] xl:w-[calc(100%/5)] group relative   flex flex-col items-center justify-center md:gap-4 xl:gap-[25px] p-3 md:px-6 md:py-[20px] text-center cursor-default  overflow-hidden"
                >
                  {/* Left fill */}
                  {/* <span className="absolute inset-y-0 left-0 w-[50%] bg-[#EAEAEA] transform scale-x-0 origin-left transition-transform duration-300 ease-out group-hover:scale-x-100" /> */}
                  {/* Right fill */}
                  {/* <span className="absolute inset-y-0 right-0 w-[50%] bg-[#EAEAEA] transform scale-x-0 origin-right transition-transform duration-300 ease-out group-hover:scale-x-100" /> */}

                  {/* Icon */}
                  {/* <div className="relative z-10 w-[30px] h-[30px] md:w-11 md:h-11 xl:w-14 xl:h-14 flex items-center justify-center transition-transform duration-300 
                  transform group-hover:-translate-y-2  "> */}
                  <div className="w-[50px] h-[50px] md:w-[60px] md:h-[60px] lg:w-[70px] mb-6 md:mb-20 lg:h-[70px] xl:w-[80px] xl:h-[80px] rounded-full flex items-center justify-center bg-primary/5">
                    <Image
                      src={item.icon || ""}
                      alt={item.label.replace("\n", " ")}
                      width={isXL ? 40 : 28}
                      height={isXL ? 34 : 28}
                      className="object-contain"
                    />
                  </div>

                  {/* Label */}
                  {item.label && (
                    <p className="relative z-10 px-2 sm:px-0 font-[optima]  text-19 md:text-25 text-foreground leading-[1.4] uppercase transition-colors duration-300 text-trim">
                      {item.label}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
