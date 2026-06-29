"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Reveal from "../animations/RevealOneByOneAnimation";
import { moveUpV2, moveUpV3 } from "../motionVariants";
import { footerV2Data } from "../common/data";
import Image from "next/image";

type LatestProject = {
  slug: string;
  title: string;
};

const getColumnItems = (
  col: typeof footerV2Data.columns[0],
  latestProjects: LatestProject[],
  latestCommunities: LatestProject[]
) => {
  if (col.heading === "Latest Projects") {
    return latestProjects.map((p) => ({ label: p.title, link: `/properties/${p.slug}` }));
  }
  if (col.heading === "COMMUNITIES") {
    return latestCommunities.map((c) => ({ label: c.title, link: `/communities/${c.slug}` }));
  }
  return col.items;
};

// ---- Accordion (mobile only) ----
const FooterAccordion = ({ latestProjects,latestCommunities }: { latestProjects: LatestProject[],latestCommunities:LatestProject[] }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const toggle = (i: number) => setOpenIndex(openIndex === i ? null : i);
  return (
    <div className="sm:hidden bg-white/2">
      {footerV2Data.columns.map((col, i) => {
        const items = getColumnItems(col, latestProjects, latestCommunities);
        return (
          <div key={i} className="border-b border-white/15">
            <button
              onClick={() => toggle(i)}
              className="w-full flex items-center justify-between py-[20px] text-left container"
            >
              <span className="uppercase text-white font-bold text-16 leading-[1.62]">
                {col.heading}
              </span>
              <motion.span
                animate={{ rotate: openIndex === i ? 180 : 0 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="text-white"
              >
                <Image src="/icons/footer/accordian-arrow.svg" alt="arrow-down" className="h-[6px] mb-1 w-auto shrink-0" width={20} height={20} />
              </motion.span>
            </button>

            <AnimatePresence initial={false}>
              {openIndex === i && (
                <motion.div
                  key="content"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.35, ease: "easeInOut" }}
                  style={{ overflow: "hidden" }}
                >
                  <ul className="pb-[25px] pt-[8px] space-y-6 container">
                    {items.map((item, idx) => (
                      <li key={idx} className="text-white/80 font-[avenirBook] hover:text-white transition-colors duration-300 cursor-pointer leading-[1.5625]">
                        <Link href={item.link}>{item.label}</Link>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
};

// ---- Grid (sm+) ----
const FooterGrid = ({ latestProjects, latestCommunities }: { latestProjects: LatestProject[], latestCommunities:LatestProject[] }) => (
  <div className="hidden sm:grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-5 xl:gap-10 container">
    {footerV2Data.columns.map((col, i) => {
      const items = getColumnItems(col, latestProjects, latestCommunities);
      return (
        <Reveal variants={moveUpV2} key={i}>
          <div>
            <h4 className="uppercase text-white md:text-19 font-[800] font-[avenirBook] mb-30">
              {col.heading}
            </h4>
            <ul className="space-y-2">
              {items.map((item, idx) => (
                <Reveal variants={moveUpV3} key={idx}>
                  <li className="text-white/80 3xl:text-19 font-[avenirBook] hover:text-white transition-colors duration-300 cursor-pointer leading-[2.105]">
                    <Link href={item.link}>{item.label}</Link>
                  </li>
                </Reveal>
              ))}
            </ul>
          </div>
        </Reveal>
      );
    })}
  </div>
);

// ---- Section wrapper (drop-in replacement) ----
const FooterColumns = ({ latestProjects = [], latestCommunities = [] }: { latestProjects?: LatestProject[],latestCommunities?:LatestProject[] }) => {
  return (
  <div className=" pt-[40px] md:py-100">
    <div>
          <FooterAccordion latestProjects={latestProjects} latestCommunities={latestCommunities}/>
          <FooterGrid latestProjects={latestProjects} latestCommunities={latestCommunities}/>
      </div>
    </div>
);
}
export default FooterColumns;