"use client";

import Image from "next/image";
import { footerV2Data } from "./data";
import { moveUp } from "../motionVariants";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Link from "next/link";

const Footer = () => {
  const heroRef = useRef(null);

  // Track scroll for this footer section
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start end", "end start"],
  });

  // Convert scroll → Y movement (-25vh → 25vh)
  const y = useTransform(scrollYProgress, [0, 1], ["-25vh", "25vh"]);
  return (
    <footer className="w-full text-white">
      {/* ================= TOP HERO SECTION ================= */}
      <div
        ref={heroRef}
        className="relative w-full overflow-hidden py-12 md:py-[70px] lg:py-[100px] 3xl:py-[150px]"
      >
        {/* BG IMAGE WITH SCROLL ZOOM */}
        <motion.div
          style={{ y }}
          className="absolute inset-0 z-0 will-change-transform"
        >
          <Image
            src={footerV2Data.top.bgImage}
            alt="footer background"
            fill
            priority
            className="object-cover scale-[1.74] 3xl:scale-[1.56]"
          />
        </motion.div>

        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black/70 z-[1]" />

        {/* CONTENT */}
        <div className="relative z-[2] h-full container flex flex-col lg:flex-row lg:justify-between items-center">
          {/* Logo */}
          <div className="overflow-hidden">
            <motion.div
              variants={moveUp(0.4)}
              initial="hidden"
              whileInView="show"
              viewport={{ amount: 0.2, once: true }}
              exit="exit"
            >
              <Image
                src={footerV2Data.top.logo}
                alt="logo"
                width={270}
                height={80}
                className="w-auto max-w-[270px] h-[50px] xl:h-[80px]"
              />
            </motion.div>
          </div>

          {/* Stay Updated */}
          <div className="flex flex-col mt-12 lg:mt-0 lg:flex-row gap-5 xl:gap-10 items-center">
            <motion.div
              variants={moveUp(0.7)}
              initial="hidden"
              whileInView="show"
              viewport={{ amount: 0.2, once: true }}
              exit="exit"
            >
              <p className="uppercase text-[19px] font-[avenirBook] text-white">
                STAY UPDATED
              </p>
            </motion.div>

            <div className="overflow-hidden">
              <motion.div
                variants={moveUp(0.9)}
                initial="hidden"
                whileInView="show"
                viewport={{ amount: 0.2, once: true }}
                exit="exit"
                className="flex items-center gap-8 xl:gap-15 rounded-[50px] p-[6px] border border-white"
              >
                <input
                  type="email"
                  placeholder={footerV2Data.top.placeholderEmail}
                  className="bg-transparent flex-1 pl-5 xl:pl-9 py-[19px] font-[avenirRoman] text-[17px] text-white placeholder-white/60 focus:outline-none"
                />
                <button className="bg-white/25 cursor-pointer backdrop-blur-[30px] px-7 xl:px-10 py-[19.5px] rounded-[50px] font-[avenirRoman] text-[17px]">
                  {footerV2Data.top.sendText}
                </button>
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      {/* ================= MENU COLUMNS ================= */}
      <div className="bg-primary py-10 md:py-15 xl:py-[80px] 3xl:pt-[114px] 3xl:pb-[120px]">
        <div className="container grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-5 xl:gap-10">
          {footerV2Data.columns.map((col, i) => (
            <motion.div
              variants={moveUp(i * 0.25)}
              initial="hidden"
              whileInView="show"
              viewport={{ amount: 0.2, once: true }}
              exit="exit"
              key={i}
            >
              <h4 className="uppercase text-white text-[17px] md:text-[19px] font-[800] font-[avenirBook] mb-[30px]">
                {col.heading}
              </h4>

              <ul className="space-y-2">
                {col.items.map((item, idx) => (
                  <motion.li
                    variants={moveUp(idx * 0.2)}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ amount: 0.2, once: true }}
                    exit="exit"
                    key={idx}
                    className="text-[#FFD8E1] text-[17px] 3xl:text-[19px] font-[avenirRoman] hover:text-white transition-colors duration-300 cursor-pointer leading-[2.105]"
                  >
                    {item.label}
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>

      {/* ================= BOTTOM FOOTER BAR ================= */}
      <div className="bg-[#842D43] py-[17px]">
        <div className="container grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 items-center gap-7">
          {/* LEFT LINKS */}
          <div className="flex gap-3 xl:gap-7 text-16 font-[avenirRoman] text-white opacity-45 justify-center md:justify-start w-full">
            {footerV2Data.bottom.left.map((item, i) => (
              <motion.span
                variants={moveUp(i * 0.2)}
                initial="hidden"
                whileInView="show"
                viewport={{ amount: 0.2, once: true }}
                key={i}
              >
                <Link
                  href={item.href}
                  className="hover:text-white/70 transition-colors duration-300"
                >
                  {item.label}
                </Link>
              </motion.span>
            ))}
          </div>

          {/* CENTER TEXT */}
          <motion.div
            variants={moveUp(0.3)}
            initial="hidden"
            whileInView="show"
            viewport={{ amount: 0.2, once: true }}
            className="text-white text-[15px] font-[avenirRoman] leading-[2.1] text-center opacity-45 w-full"
          >
            {footerV2Data.bottom.center}
          </motion.div>

          {/* ICONS */}
          <div className="flex gap-2 justify-center md:justify-start xl:justify-end w-full">
            {footerV2Data.bottom.icons.map((icon, i) => (
              <motion.div
                variants={moveUp(i * 0.2)}
                initial="hidden"
                whileInView="show"
                viewport={{ amount: 0.2, once: true }}
                key={i}
                className="cursor-pointer p-[13px] rounded-full bg-primary flex items-center justify-center"
              >
                <Image
                  src={icon.image}
                  alt="icon"
                  width={22}
                  height={22}
                  className="opacity-100 w-[22px] h-[22px] hover:opacity-80 transition-opacity duration-300"
                />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
