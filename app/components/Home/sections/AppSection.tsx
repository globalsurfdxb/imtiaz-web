"use client";

import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef } from "react";
import { fadeUp } from "../../motionVariants";
import { motion } from "framer-motion";

gsap.registerPlugin(ScrollTrigger);

export type AppSectionData = {
  heading: string;
  subtitle: string;
  mobileImage: string; // the phone mockup svg
  download: {
    text: string;
    googlePlay: string;
    appStore: string;
  };
};

const AppSection = ({ data,title,description, appStore, playStore }: { data: AppSectionData,title:string,description:string, appStore:string, playStore:string }) => {
  const imageRef = useRef<HTMLDivElement>(null);
  const section5Ref = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  const initGSAP = () => {
    const image = imageRef.current;
    const section = section5Ref.current;
    const textBox = textRef.current;

    if (!image || !section || !textBox) return;

    const ctx = gsap.context(() => {
      /* --- PARALLAX --- */
      gsap.fromTo(
        image,
        { y: "11vh" },
        {
          y: "-32vh",
          ease: "none",
          scrollTrigger: {
            trigger: section,
            scrub: true,
            start: "top 85%",
            end: "bottom top",
          },
        },
      );
    });

    return () => ctx.revert();
  };

  useEffect(() => {
    const listener = () => initGSAP();
    window.addEventListener("homeAnimationsReady", listener);

    return () => window.removeEventListener("homeAnimationsReady", listener);
  }, []);

  const d = data;

  return (
    <section
      ref={section5Ref}
      // className="make-header-black w-full py-[70px] lg:py-120 3xl:py-[130px] bg-gray relative z-10"
className="make-header-black w-full h-[100svh] pt-[40px] lg:pt-0 lg:py-120 3xl:py-[130px] flex items-start md:items-center justify-center bg-gray relative z-10 overflow-hidden"
    >
      <div
        className="container"
        ref={textRef}
        style={{ perspective: "1200px", transformStyle: "preserve-3d" }}
      >
        {/* ----- MAIN LAYOUT ----- */}
        <div className="flex flex-col md:flex-row justify-center items-center gap-30 lg:gap-150">
          {/* PHONE - hidden on mobile, shown on md+ (left column) */}
          <div className="hidden md:flex justify-center">
            <div className="relative w-[316px] lg:w-[394px] h-[613px] lg:h-[761px] overflow-hidden phone-wrapper z-[100]">
              <Image
                className="absolute z-10 h-full w-full"
                src={"/images/home/app/sa-4.png"}
                alt="phone"
                width={900}
                height={900}
              />
              <div className="left-[25px] right-[25px] absolute" ref={imageRef}>
                <Image
                  src={d.mobileImage}
                  alt="mobile"
                  width={1500}
                  height={2000}
                  className="absolute w-full"
                />
                
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN (md+) / Full column (mobile) */}
          <div className="flex flex-col h-full justify-center items-center">
            <div className="overflow-hidden">
              <motion.h2
                variants={fadeUp}
                custom={0.2}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                className="mb-[20px] text-heading uppercase text-primary-2 text-center"
              >
                {title}
              </motion.h2>
            </div>

            <div className="overflow-hidden">
              <motion.p
                variants={fadeUp}
                custom={0.21}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                className="text-description text-[#404040] mb-[30px] md:mb-50 max-w-[58ch] text-center"
              >
                {description}
              </motion.p>
            </div>

                        <div className="md:hidden flex gap-[14px] justify-center mb-[10px]">
              <motion.div
                variants={fadeUp}
                custom={0.23}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
              >
                <a href={appStore} className="inline-block bg-black rounded-[11px]  hover:-translate-y-[3px] transition-all duration-300 cursor-pointer">
                  <Image
                    src="/images/home/app/appstore1.svg"
                    alt="Download on App Store"
                    width={194}
                    height={65}
                    className="w-auto h-[55px] lg:w-[194px] lg:h-[65px] "
                  />
                </a>
              </motion.div>

              <motion.div
                variants={fadeUp}
                custom={0.23}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
              >
                <a href={playStore} className="inline-block bg-black rounded-[11px]  hover:-translate-y-[3px] transition-all duration-300 cursor-pointer">
                  <Image
                    src="/images/home/app/playstore1.svg"
                    alt="Get it on Google Play"
                    width={194}
                    height={65}
                    className="w-auto h-[55px] lg:w-[194px] lg:h-[65px]"
                  />
                </a>
              </motion.div>
            </div>

            {/* PHONE - mobile only, between desc and buttons */}
            <div className="flex md:hidden justify-center  mb-[34px] md:50">
              <div className="relative w-[286px] h-[553px] overflow-hidden phone-wrapper z-[100]">
                <Image
                  className="absolute z-10 h-full w-full"
                  src={"/images/home/app/sa1.png"}
                  alt="phone"
                  width={900}
                  height={900}
                />
                <div className="left-[25px] right-[25px] absolute" >
                  <Image
                    src={d.mobileImage}
                    alt="mobile"
                    width={1500}
                    height={2000}
                    className="absolute w-full"
                  /> 
                </div>
              </div>
            </div>
          

            <div className="hidden md:flex gap-[14px] justify-center">
              <motion.div
                variants={fadeUp}
                custom={0.23}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
              >
                <a href={appStore} className="inline-block bg-black rounded-[11px]  hover:-translate-y-[3px] transition-all duration-300 cursor-pointer">
                  <Image
                    src="/images/home/app/appstore1.svg"
                    alt="Download on App Store"
                    width={194}
                    height={65}
                    className="w-auto h-[55px] lg:w-[194px] lg:h-[65px] "
                  />
                </a>
              </motion.div>

              <motion.div
                variants={fadeUp}
                custom={0.23}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
              >
                <a href={playStore} className="inline-block bg-black rounded-[11px]  hover:-translate-y-[3px] transition-all duration-300 cursor-pointer">
                  <Image
                    src="/images/home/app/playstore1.svg"
                    alt="Get it on Google Play"
                    width={194}
                    height={65}
                    className="w-auto h-[55px] lg:w-[194px] lg:h-[65px]"
                  />
                </a>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AppSection;