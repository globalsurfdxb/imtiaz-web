"use client";

import Image from "next/image";
// import { visionSectionData } from "../data";
import { SectionHeading } from "../../animations/SectionHeading";
import { SectionDescription } from "../../animations/SectionDescription";
import Reveal from "../../animations/RevealOneByOneAnimation";
import { moveUpV2 } from "../../motionVariants";
import { motion } from "framer-motion";

type VisionSectionData = {
  title: string;
  description: string;
  bgImage: string;
  bgImageMobile: string;
  alt: string;

  stats: {
    value: string;
    label: string;
  }[];
};

export default function VisionSection({data}:{data:VisionSectionData}) {
  // const { title, description, bgImage, bgImageMobile, stats } = visionSectionData;

  return (
    <section data-header="dark" className="make   ">
      <div className="pt-[70px] pb-[40px] md:hidden">
        <div className="container text-center">
          <SectionHeading
            title={data.title}
            className="uppercase text-foreground mb-20"
          />
          <SectionDescription
            text={data.description}
            className="max-w-[870px] mx-auto text-foreground-light whitespace-pre-line"
          />
        </div>
      </div>
      <div className="relative w-full overflow-hidden text-white h-[316px] md:h-[700px] xl:h-[949px]">
        {/* Background Image */}
        <div className="hidden sm:block absolute inset-0 overflow-hidden">
          <Image
            src={data.bgImage}
            alt={data.title}
            fill
            priority
            className="object-cover object-top h-full w-full absolute"
          />
        </div>

        <div className="sm:hidden absolute inset-0 overflow-hidden">
          <Image
            src={data.bgImageMobile}
            alt={data.title}
            width={520}
            height={442}
            priority
            className="object-cover object-bottom h-full w-full"
          />
        </div>

        {/* Gradient Overlay */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, rgba(0, 0, 0, 0) 52.32%, #000000 105.74%)",
          }}
        />

        {/* Content */}
        <div className="relative z-10 pt-120 3xl:pt-130 pb-4 xl:pb-50 text-center flex flex-col justify-end md:justify-between items-center h-full container">
          {/* Title and Description */}
          <div className="hidden md:block md:-mt-10 lg:-mt-8 2xl:-mt-5">
            <div>
              <SectionHeading
                title={data.title}
                className="uppercase text-foreground mb-20"
              />
              <SectionDescription
                text={data.description}
                className="max-w-[870px] mx-auto text-foreground-light whitespace-pre-line"
              />
            </div>
          </div>

          {/* Stats */}
          <div className="flex justify-center items-stretch absolute bottom-0 md:relative">
            {data.stats.map((item, index) => (
              <Reveal variants={moveUpV2} key={index}>
                <div className="flex items-stretch">
                  {/* Column */}
                  <div className=" pb-5 xl:pb-0 ps-0 pe-5 md:px-[75px] last:pe-0 last:ps-5 last:md:px-[76px] text-center flex flex-col justify-center">
                    <motion.h3
                      viewport={{ once: true }}
                      className="text-heading text-white mb-[5px] md:mb-[10px] max-sm:text-30"
                    >
                      {item.value}
                    </motion.h3>
                    <motion.p
                      viewport={{ once: true }}
                      className="text-[14px] md:text-25 3xl:text-[24px] leading-[1.4] uppercase font-[optima] tracking-[2%] "
                    >
                      {item.label}
                    </motion.p>
                  </div>

                  {/* Separator */}
                  {index !== data.stats.length - 1 && (
                    <div
                      className="w-px self-stretch"
                      style={{
                        borderLeft: "1px solid",
                        borderImageSource:
                          "linear-gradient(180deg, rgba(255,255,255,0) 0%, #FFFFFF 50%, rgba(255,255,255,0) 100%)",
                        borderImageSlice: 1,
                      }}
                    />
                  )}
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
