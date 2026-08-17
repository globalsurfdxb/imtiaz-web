"use client";

import Image from "next/image";
import Breadcrumb from "../../common/Breadcrumb"; 
import { SectionHeading } from "../../animations/SectionHeading";
import { motion } from "framer-motion";
import { moveDown, moveUp } from "../../motionVariants";
import { useParallax } from "@/app/hooks/useParallax";

 

const EventHero = ({title}:{title:string}) => { 

  return (
    <section className="w-full pt-[170px] lg:!pt-200" data-header="dark">
      <div className="container flex flex-col items-center shrink-0">
        {/* Breadcrumb */}
        <motion.div
          variants={moveDown(0.1)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
        >
          <Breadcrumb variant="black" />
        </motion.div>

        {/* Title */}
        <SectionHeading
          title={title ? title : "No construction progress found"}
          className="max-w-[32ch] text-foreground text-center uppercase mt-[40px] md:mt-100 tracking-[-0.03em] sm:-tracking-normal"
        />
 
      </div>
    </section>
  );
};

export default EventHero;
