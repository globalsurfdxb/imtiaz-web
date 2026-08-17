"use client";

import ItemCard from "./ItemCard";
import CustomOutlineButton from "../../common/CustomOutlineButton";
import { motion } from "framer-motion";
import { moveUp, moveUpV2 } from "@/app/components/motionVariants";
import Reveal from "../../animations/RevealOneByOneAnimation";
import { SectionHeading } from "../../animations/SectionHeading";
import Link from "next/link";

// ──────────────────────────────────────────────────────────────
const RelatedInitiative = ({ data }: { data: any }) => {
  return (
    <section className="w-full bg-white pb-120 2xl:pb-130" data-header="dark">
      <div className="container">
        <div className="w-full my-[40px] md:my-50">
          <div className="relative w-full h-px overflow-hidden">
            <motion.div
              className="absolute inset-0 bg-black/10 origin-center"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, ease: "easeInOut" }}
            />
          </div>
        </div>

        <div className="container">
          <SectionHeading
            title="Related Initiatives"
            className="text-center mb-5 md:mb-50 text-foreground"
          />
        </div>

        <div id="news-list" className="scroll-mt-20">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-25 gap-y-5 md:gap-y-40">
            {data.slice(0, 3).map((item: any) => (
              <Reveal variants={moveUpV2} key={item.id}>
                <ItemCard item={item} />
              </Reveal>
            ))}
          </div>
        </div>

        <div className="flex justify-center mt-[50px]">
          <motion.div
            variants={moveUp(0.1)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
          >
            <Link href="/media-center/initiatives">
              <CustomOutlineButton
                text="View All"
                variant="dark"
                borderColor="border-primary"
                textColor="text-primary"
                px="px-10 xl:px-[37px] h-[44px] md:h-[50px]  xl:h-[66px]"
              />
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default RelatedInitiative;
