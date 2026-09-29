"use client";

import { SectionHeading } from "../../animations/SectionHeading";
import { SectionDescription } from "../../animations/SectionDescription";
import { motion } from "framer-motion";
import { moveUp } from "../../motionVariants";

const DubaiResidence = ({title,description,subTitle}:{title:string,description:string,subTitle:string}) => {
  // const { title, description, subtitle } = communitySectionData;

  return (
    <section data-header="dark" className="w-full py-120 3xl:py-160">
      <div className="container flex flex-col justify-center">
        {/* Header */}
        <div className="text-center content-spacing-mobile-padding">
          {title && <SectionHeading
            title={title}
            className="text-heading  text-primary-2 mb-6 md:mb-20 max-w-[666px] mx-auto"
          />}
          {subTitle && <SectionDescription
            text={subTitle}
            className="text-25 uppercase font-[optima] mb-5 md:mb-[40px] text-foreground-light leading-[1.5] md:leading-[1.4] font-normal"
          />}

          {description && <motion.p
            variants={moveUp(0.1)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="text-description text-foreground-light max-w-[754px] mx-auto whitespace-pre-line"
          >
            {description}
          </motion.p>}
        </div>
      </div>
    </section>
  );
};

export default DubaiResidence;
