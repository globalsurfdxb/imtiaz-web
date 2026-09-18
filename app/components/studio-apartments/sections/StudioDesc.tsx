"use client";

import { SectionHeading } from "../../animations/SectionHeading";
import { moveUp } from "../../motionVariants";
import { motion } from "framer-motion";

export default function StudioDesc({data}: any) {

  return (
    <section data-header="dark" className="w-full bg-gray">
      <div className="container py-120 3xl:py-130">
        <div className="flex flex-col items-center text-center mx-auto">
          {/* Title */}
          <SectionHeading
            title={data?.why_title}
            className="mb-50 text-center uppercase max-w-[30ch]"
          />

          {/* Description — rendered as HTML from rich text editor */}
          <motion.div
            variants={moveUp(0.12)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="studio-content max-w-[973px] text-left"
            dangerouslySetInnerHTML={{ __html: data.why_caption }}
          />
        </div>
      </div>
    </section>
  );
}
