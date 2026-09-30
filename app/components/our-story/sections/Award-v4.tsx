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
      // Tuning per breakpoint: --img-h = image height, --safe-line = line (from top) the description may never rise above
      className="relative w-full overflow-hidden flex flex-col min-h-[var(--img-h)] bg-[#111316]
        [--img-h:655px] [--safe-line:460px]
        sm:[--img-h:980px] sm:[--safe-line:520px]
        3xl:[--img-h:1140px] 3xl:[--safe-line:660px]"
    >
      {/* Background Image — fixed height so it never scales with content */}
      <div className="absolute top-0 inset-x-0 h-[var(--img-h)] z-0 overflow-hidden">
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
        {/* Darken the image bottom for text legibility, then fade into the section colour for when content extends past the image */}
        <div
          className="absolute bottom-0 inset-x-0 h-1/2"
          style={{
            background:
              "linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.8) 80%, #111316 100%)",
          }}
        />
      </div>

      <div
        className="absolute inset-0 w-full"
        style={{
          background:
            "linear-gradient(180deg, rgba(0, 0, 0, 0.1) 0%, rgba(0, 0, 0, 0) 18.57%)",
        }}
      />

      <div className="flex flex-1 flex-col justify-between">
        {/* Title block — top */}
        <div className="relative z-10 flex flex-col items-center container pt-[50px] sm:pt-120 3xl:pt-130 min-h-[var(--safe-line)]">
          <SectionHeading
            title={title}
            className="max-w-[45ch] text-center min-[450px]:mb-20"
          />
          {/* <h2 className="text-heading text-center text-trim" dangerouslySetInnerHTML={{ __html: title }} /> */}

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
        <div className="relative z-20 w-full pb-[50px]">
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
