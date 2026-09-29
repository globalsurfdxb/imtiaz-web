"use client";

import { SectionHeading } from "../../animations/SectionHeading";
import { moveUp } from "../../motionVariants";
import { whyInvestData } from "../data";
import { motion } from "framer-motion";

export default function WhyInvest() {
  const { title, description } = whyInvestData;

  return (
    <section data-header="dark" className="w-full bg-gray">
      <div className="container py-120 3xl:py-130">
        <div className="flex flex-col items-center text-center mx-auto content-spacing-mobile-padding">
          {/* Title */}
          <SectionHeading
            title={title}
            className="mb-6 md:mb-20 text-center uppercase max-w-[30ch]"
          />

          {/* Description — rendered as HTML from rich text editor */}
          <motion.div
            variants={moveUp(0.12)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="text-description text-foreground-light award-description max-w-[1237px]"
            dangerouslySetInnerHTML={{ __html: description }}
          />
        </div>
      </div>
    </section>
  );
}
