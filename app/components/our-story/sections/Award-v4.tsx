"use client";

import Image from "next/image";
import { SectionHeading } from "../../animations/SectionHeading";
import { motion } from "framer-motion";
import { moveUp } from "../../motionVariants";

interface Props {
  title: string;
  descriptions: string;
  bgImage: string;
  bgImagemob: string;
}

export default function AwardSection({
  title,
  descriptions,
  bgImage,
  bgImagemob,
}: Props) {
  return (
    <section
      data-header="dark"
      className="relative w-full overflow-hidden flex flex-col max-[640px]:h-[955px]"
    >
      {/* Background Image */}
      <div className="absolute top-0 left-0 right-0 bottom-[140px] sm:inset-0 z-0 overflow-hidden">
        <Image
          src={bgImage}
          alt="background"
          fill
          className="object-cover object-center hidden min-[640px]:block"
        />
        <Image
          src={bgImagemob}
          alt="background"
          fill
          className="object-cover object-center max-[640px]:block hidden"
        />
      </div>

      {/* Bottom spacer — mobile only */}
      <div className="absolute bottom-0 inset-x-0 h-[140px] bg-[#111316] z-0 min-[640px]:hidden" />

      <div
        className="absolute inset-0 w-full"
        style={{
          background:
            "linear-gradient(180deg, rgba(0, 0, 0, 0.1) 0%, rgba(0, 0, 0, 0) 18.57%)",
        }}
      />

      <div className="max-[640px]:flex flex-col justify-between h-full">
        {/* Title block — top */}
        <div className="relative z-10 flex flex-col items-center container pt-[50px] sm:pt-120 3xl:pt-130 mb-250 3xl:mb-[384px]">
          <SectionHeading
            title={title}
            className="max-[640px]:font-normal max-w-[45ch] text-center min-[450px]:mb-20"
          />

          {/* Divider line */}
          <motion.div
            variants={moveUp(0)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="w-full max-w-[527px] mx-auto max-sm:hidden"
            style={{
              height: "1px",
              background:
                "linear-gradient(90deg, rgba(23, 23, 23, 0) 0%, #171717 50%, rgba(23, 23, 23, 0) 100%)",
            }}
          />
        </div>

        {/* Description block — bottom */}
        <div className="relative z-20 w-full flex items-end h-[471px] max-[640px]:h-auto pb-[50px]">
          {/* Dark overlay for text legibility — capped above the spacer on mobile so the spacer keeps its exact color */}
          <div
            style={{
              background:
                "linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.8) 90%)",
            }}
            className="absolute inset-0 max-[640px]:bottom-[140px]"
          />

          <div className="relative mx-auto text-center container">
            <motion.div
              variants={moveUp(0.12)}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              className="text-trim content-spacing-mobile-padding  award-description awd mx-auto max-w-[1301px] font-[avenirBook] text-16 leading-[1.54375] text-white/95 lg:text-white/70"
              dangerouslySetInnerHTML={{ __html: descriptions }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
