"use client";

import Image from "next/image";
import { Dispatch, SetStateAction, useState, useEffect } from "react";
import { menuItems, subMenuItems, contactInfo, socialLinks } from "./data";
import { motion } from "framer-motion";
import { moveRight, moveUp } from "../motionVariants";
import InfiniteSlider from "./InfiniteSlider";

export default function MegaMenu({
  setIsMenuOpen,
}: {
  setIsMenuOpen?: Dispatch<SetStateAction<boolean>>;
}) {
  const [activeMenu, setActiveMenu] = useState(menuItems[0]);
  const currentSubmenu = subMenuItems[activeMenu.id as keyof typeof subMenuItems];
  const [prevImage, setPrevImage] = useState(menuItems[0].bgImage);

  useEffect(() => {
    const timer = setTimeout(() => {
      setPrevImage(activeMenu.bgImage);
    }, 300);
    return () => clearTimeout(timer);
  }, [activeMenu]);

  return (
    <div className="relative w-full h-screen overflow-hidden z-1000 bg-white flex flex-col">
      {/* ---------------- TOP SECTION (as a separate row) ---------------- */}
      <div className="w-full">
        {/* Place any top content here if needed (logo/header etc.) */}
      </div>

      {/* ---------------- BOTTOM SECTION (fills remaining height) ---------------- */}
      <div className="relative flex-1 flex overflow-hidden">
        {/* BG previous */}
        <Image
          key={`prev-${prevImage}`}
          src={prevImage}
          alt="background-prev"
          fill
          className="object-cover absolute inset-0 z-0"
          priority
        />

        {/* BG fade-in new */}
        <motion.div
          key={`active-${activeMenu.bgImage}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="absolute inset-0 z-0"
        >
          <Image
            src={activeMenu.bgImage}
            alt="background-active"
            fill
            className="object-cover"
            priority
          />
        </motion.div>

        {/* BLACK OVERLAY */}
        <div className="absolute inset-0 bg-black/75" />

        {/* LEFT EDGE OVERLAY */}
        <div
          className="absolute inset-0 z-10 w-full"
          style={{
            background:
              "linear-gradient(90deg, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 2%, rgba(0,0,0,0) 50%, rgba(0,0,0,1) 100%, rgba(0,0,0,1) 100%)",
          }}
        />

        {/* ---------------- CONTENT WRAPPER ---------------- */}
        <div className="relative z-20 flex h-full w-full container pb-35 2xl:pb-[218px] pt-24 2xl:pt-30">
          {/* LEFT MENU */}
          <div className="w-1/2 lg:w-1/4 flex items-end pb-12 2xl:pb-[92px]">
            <div className="flex flex-col justify-center gap-[22px] w-full text-white relative">
              {menuItems.map((item, index) => {
                const isActive = activeMenu.id === item.id;

                return (
                  <motion.div
                    variants={moveRight(index * 0.13)}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true }}
                    key={item.id}
                    className="relative flex items-center cursor-pointer"
                    onMouseEnter={() => setActiveMenu(item)}
                  >
                    {/* ARROW */}
                    <motion.div
                      initial={false}
                      animate={
                        isActive ? { opacity: 1, x: 0 } : { opacity: 0, x: -10 }
                      }
                      transition={{ duration: 0.35, ease: "easeOut" }}
                      className="absolute left-0 top-1/2 -translate-y-1/2"
                    >
                      <Image
                        src="/icons/arrow_nav.svg"
                        alt={item.label}
                        width={28}
                        height={21}
                        className="w-[28px] h-[21px] invert brightness-0"
                      />
                    </motion.div>

                    {/* TITLE */}
                    <motion.div
                      initial={false}
                      animate={isActive ? { x: 40 } : { x: 0 }}
                      transition={{ duration: 0.25, ease: "easeOut" }}
                      className="relative inline-block"
                    >
                      {/* white text */}
                      <motion.span
                        initial={false}
                        animate={isActive ? { opacity: 0 } : { opacity: 1 }}
                        transition={{ duration: 0.25, ease: "easeOut" }}
                        className="text-17 lg:text-[25px] 2xl:text-30 font-[optima] uppercase text-white"
                      >
                        {item.label}
                      </motion.span>

                      {/* gradient text */}
                      <motion.span
                        aria-hidden="true"
                        initial={{ opacity: 0 }}
                        animate={isActive ? { opacity: 1 } : { opacity: 0 }}
                        transition={{ duration: 0.25, ease: "easeOut" }}
                        className="absolute left-0 top-0 text-17 lg:text-[25px] 2xl:text-30 font-[optima] uppercase bg-gradient-to-r from-[#7A253A] to-white bg-clip-text text-transparent"
                      >
                        {item.label}
                      </motion.span>
                    </motion.div>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* MIDDLE DIVIDER */}
          <div className="relative w-[1px] mr-10 lg:mr-[70px] z-30">
            <div
              className="absolute left-0 top-0 h-full w-[1px] z-30"
              style={{
                background:
                  "linear-gradient(180deg, rgba(255,255,255,0) 0%, #FFFFFF 50%, rgba(255,255,255,0.8) 100%)",
              }}
            />
          </div>

          {/* RIGHT SUBMENU */}
          <div className="flex flex-col gap-2 lg:gap-4 text-white w-1/3 justify-center overflow-hidden pb-12 2xl:pb-[92px]">
            {currentSubmenu.map((item, idx) => (
              <motion.div
                key={`menu-${item.id}-${idx}`}
                variants={moveRight(idx * 0.16)}
                initial="hidden"
                animate="show"
                viewport={{ once: true }}
              >
                <div className="text-17 font-[avenirRoman] leading-[2.2] uppercase cursor-pointer hover:translate-x-2 transition-all duration-300">
                  {item.label}
                </div>
              </motion.div>
            ))}
          </div>

          {/* CLOSE BTN */}
          <button
            className="absolute top-8 2xl:top-14 left-[49.5%] lg:left-[25.6%] 2xl:left-[25.3%] -translate-x-1/2 
            bg-white/25 text-white rounded-full h-[60px] w-[60px] flex items-center justify-center cursor-pointer"
            onClick={() => (setIsMenuOpen ? setIsMenuOpen(false) : null)}
          >
            <Image
              src="/icons/close_nav.svg"
              alt="close"
              width={21}
              height={19}
              className="w-[21px] h-[19px] hover:scale-[1.2] transition-all duration-300"
            />
          </button>

          {/* RIGHT SIDE CONTACT */}
          <motion.div
            variants={moveUp(0.2)}
            initial="hidden"
            animate="show"
            className="flex flex-col ml-auto text-white text-sm w-1/3 self-end pb-14 2xl:pb-[95px] items-end hidden lg:block"
          >
            <div>
              <motion.div
                variants={moveUp(0.2)}
                initial="hidden"
                animate="show"
                className="mb-4 font-[avenir] font-[900] text-[20px] opacity-70"
              >
                CONTACT US
              </motion.div>

              <div className="flex items-center font-[avenirRoman] gap-4 text-white opacity-70">
                <motion.div
                  variants={moveUp(0.25)}
                  initial="hidden"
                  animate="show"
                  className="text-[18px] leading-[2.2]"
                >
                  {contactInfo.emailSales}
                </motion.div>

                <div className="w-[1px] h-[13px] bg-white" />

                <motion.div
                  variants={moveUp(0.2)}
                  initial="hidden"
                  animate="show"
                  className="text-[18px] leading-[2.2]"
                >
                  {contactInfo.phone}
                </motion.div>
              </div>

              <div className="flex gap-[5px] w-full mt-[46px]">
                {socialLinks.map((icon, i) => (
                  <motion.div
                    variants={moveUp(i * 0.2)}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ amount: 0.2, once: true }}
                    key={i}
                    className="cursor-pointer rounded-full w-[33px] h-[33px] bg-white/25 backdrop-blur-[30px] flex items-center justify-center"
                  >
                    <Image
                      src={icon.image}
                      alt="icon"
                      width={22}
                      height={22}
                      className="opacity-100 w-[16px] h-[16px] hover:opacity-70 transition-opacity duration-300"
                    />
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* BOTTOM DIVIDER */}
        <div
          className="absolute left-0 bottom-35  2xl:bottom-[218px] w-full h-[1px] z-20"
          style={{
            background:
              "linear-gradient(90deg, rgba(255,255,255,0) 0%, #FFFFFF 50%, rgba(255,255,255,0) 100%)",
          }}
        />

        {/* INFINITE SLIDER */}
        <InfiniteSlider />
      </div>
    </div>
  );
}
