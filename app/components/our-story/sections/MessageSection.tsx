"use client";

import Image from "next/image";
import type { messageData } from "../data";
import { SectionHeading } from "../../animations/SectionHeading";
import { SectionDescription } from "../../animations/SectionDescription";
import { motion } from "framer-motion";
import { moveUp } from "../../motionVariants";
import { useParallax } from "@/app/hooks/useParallax";

type Props = {
  data: messageData;
};

export default function MessageSection({ data }: Props) {
  const { ref, parallaxY } = useParallax(15);

  const { ref: mobileRef, parallaxY: parallaxYMobile } = useParallax(15);

  return (
    <>
      <section
        data-header="dark"
        className="relative h-auto lg:min-h-screen w-full overflow-hidden flex flex-col"
      >
        {/* Background Image */}
        <div ref={ref} className="hidden sm:block absolute inset-0 z-0 overflow-hidden">
          <Image
            src={data.bgImage}
            alt="background"
            fill
            className={`object-cover`}
            style={{
              transform: `scale(${1.15}) translateY(${parallaxY}vh)`,
            }}
          />
        </div>

        <div ref={mobileRef} className="sm:hidden absolute inset-0 z-0 overflow-hidden">
          <Image
            src={data.bgImageMobile}
            alt="background"
            fill
            className={`object-cover`}
            style={{
              transform: `scale(${1.15}) translateY(${parallaxYMobile}vh)`,
            }}
          />
        </div>

        {/* Title */}
        <div className="relative z-10 w-fit mx-auto">
          <div className="w-full text-center px-5 md:px-0 pt-120 3xl:pt-130 mb-20">
            <SectionHeading title={data.title} className="uppercase" />
          </div>
          <div className="mx-5 md:mx-0">
            <div
              className="relative w-full max-w-[527px] mx-auto overflow-hidden "
              style={{ height: "1px" }}
            >
              {/* Left half — draws leftward from center */}
              <motion.div
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="absolute right-1/2 top-0 w-1/2 h-full origin-right"
                style={{
                  background:
                    "linear-gradient(90deg, rgba(23, 23, 23, 0) 0%, #171717 100%)",
                }}
              />
              {/* Right half — draws rightward from center */}
              <motion.div
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="absolute left-1/2 top-0 w-1/2 h-full origin-left"
                style={{
                  background:
                    "linear-gradient(90deg, #171717 0%, rgba(23, 23, 23, 0) 100%)",
                }}
              />
            </div>
          </div>
        </div>

        {/* Main content area */}
        <div className="relative z-10 flex flex-1 items-end">
          <div className="w-full container">
            {/* ── DESKTOP (lg+): original 3-col grid, unchanged ── */}
            <div
              className={`hidden lg:grid grid-cols-[1fr_auto_1fr] ${data.id === "chairman" ? "mt-[66px]" : "mt-[68px]"}`}
            >
              {/* Col 1 — Left Content */}
              <div className="h-full flex flex-col justify-between pb-130">
                <div className="pt-90 3xl:pt-[96px]">
                  <motion.div
                    variants={moveUp(0)}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true }}
                    className="mb-20 flex justify-start"
                  >
                    <Image
                      src="/icons/quote.svg"
                      alt="quote"
                      width={68}
                      height={52}
                      className="object-contain w-auto h-[45px] 3xl:w-[68px] 3xl:h-[52px] scale-x-[-1]"
                      priority
                    />
                  </motion.div>
                  <div>
                  <motion.p
                    variants={moveUp(0.12)}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true }}
                    className="text-25 font-[optima] uppercase tracking-[2%] text-primary  text-start"
                  >
                    {data.quote}
                  </motion.p>
                  </div>
                </div>

                {/* <div>
                  <motion.p
                    variants={moveUp(0)}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true }}
                    className="text-25 font-[optima] leading-[1.4] uppercase tracking-[2%] text-primary mb-[10px]"
                  >
                    {data.name}
                  </motion.p>
                  <motion.p
                    variants={moveUp(0.12)}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true }}
                    className="text-description text-foreground-light"
                  >
                    {data.designation}
                  </motion.p>
                </div> */}
              </div>

              {/* Col 2 — Person Image */}
              <motion.div
                variants={moveUp(0.12)}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                className="flex items-end justify-center relative"
              >
                {data.id === "chairman" && (
                  <div
                    style={{
                      background:
                        "linear-gradient(180deg, rgba(234, 234, 234, 0) 79.19%, rgba(234, 234, 234, 0.7) 106.87%)",
                    }}
                    className="absolute bottom-0 left-0 right-0 h-full"
                  />
                )}
                <Image
                  src={data.personImage}
                  alt={data.name}
                  width={1500}
                  height={1500}
                  className="w-auto object-contain object-bottom h-[500px] 3xl:h-[694px]"
                  priority
                />
              </motion.div>

              {/* Col 3 — Right Content */}
              <div className="pb-130 pt-90 3xl:pt-[96px] justify-self-end">
                <SectionDescription
                  text={data.description}
                  className="text-description text-foreground-light xl:max-w-[561px] whitespace-pre-line mb-[190px]"
                />

                <div>
                  <motion.p
                    variants={moveUp(0)}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true }}
                    className="text-25 font-[optima] leading-[1.4] uppercase tracking-[2%] text-primary mb-[10px]"
                  >
                    {data.name}
                  </motion.p>
                  <motion.p
                    variants={moveUp(0.12)}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true }}
                    className="text-description text-foreground-light"
                  >
                    {data.designation}
                  </motion.p>
                </div>

              </div>
            </div>

            {/* ── MOBILE/TABLET (below lg): stacked layout ── */}
            <div className="lg:hidden flex  mt-5 md:mt-80 flex-col-reverse sm:flex-col">
              <div className="max-[640]:hidden min-[820]:hidden">
                <SectionDescription
                  text={data.description}
                  className="text-description text-foreground-light whitespace-pre-line mb-20 sm:mb-50 mt-20 sm:mt-0"
                />
              </div>

              <div
                className={`${data?.id === "chairman" ? "max-[640px]:flex-col flex-row" : "max-[640px]:flex-col flex-row-reverse"} flex justify-between max-[640px]:items-center min-[820px]:items-end`}
              >
                <div className="flex min-[640px]:w-[40%] flex-col h-hull justify-between">
                  <div className="flex flex-col max-[640px]:mb-[40px] max-[640px]:gap-[10px] gap-20 max-[640px]:items-center">
                    <motion.div
                      variants={moveUp(0)}
                      initial="hidden"
                      whileInView="show"
                      viewport={{ once: true }}
                    >
                      <Image
                        src="/icons/quote.svg"
                        alt="quote"
                        width={50}
                        height={38}
                        className="object-contain w-auto h-[32px] scale-x-[-1]"
                        priority
                      />
                    </motion.div>
                    <motion.p
                      variants={moveUp(0.12)}
                      initial="hidden"
                      whileInView="show"
                      viewport={{ once: true }}
                      className="font-[optima] uppercase tracking-[2%] text-primary text-[18px] min-[640px]:text-sm text-center min-[640px]:text-left leading-snug"
                    >
                      {data.quote}
                    </motion.p>
                  </div>

                  <div className="hidden min-[820px]:block mt-20">
                    <SectionDescription
                      text={data.description}
                      className="text-description text-foreground-light whitespace-pre-line mb-20 md:mb-50"
                    />
                  </div>

                  <div className="hidden sm:block lg:hidden mb-6">
                    <motion.p
                      variants={moveUp(0)}
                      initial="hidden"
                      whileInView="show"
                      viewport={{ once: true }}
                      className="font-[optima] leading-[1.4] uppercase tracking-[2%] text-primary text-xl mb-[6px]"
                    >
                      {data.name}
                    </motion.p>
                    <motion.p
                      variants={moveUp(0.12)}
                      initial="hidden"
                      whileInView="show"
                      viewport={{ once: true }}
                      className="text-description text-foreground-light"
                    >
                      {data.designation}
                    </motion.p>
                  </div>
                </div>
                {/* <div className="min-[640px]:hidden mb-50 text-center">
                  <motion.p
                    variants={moveUp(0)}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true }}
                    className="font-[optima] leading-[1.4] uppercase tracking-[2%] text-primary text-[18px] mb-1"
                  >
                    {data.name}
                  </motion.p>
                  <motion.p
                    variants={moveUp(0.12)}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true }}
                    className="  text-description text-foreground-light"
                  >
                    {data.designation}
                  </motion.p>
                </div> */}
                {/* Right: person image, bottom-aligned */}
                <motion.div
                  variants={moveUp(0.12)}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true }}
                  className="flex items-end justify-center h-full max-[640px]:w-[74%] w-[60%]"
                >
                  <Image
                    src={data.personImageMobile ? data.personImageMobile : data.personImage}
                    alt={data.name}
                    width={1200}
                    height={1000}
                    className="w-full h-auto max-h-[400px] md:max-h-[500px] object-contain object-bottom"
                    priority
                  />
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="min-[640]:hidden container">
        <SectionDescription
          text={data.description}
          className="text-description text-foreground-light whitespace-pre-line mb-[30px] sm:mb-50 mt-20 sm:mt-0"
        />
        <div className="min-[640px]:hidden mb-50 text-center">
          <motion.p
            variants={moveUp(0)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="font-[optima] leading-[1.4] uppercase tracking-[2%] text-primary text-[18px] mb-1"
          >
            {data.name}
          </motion.p>
          <motion.p
            variants={moveUp(0.12)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="  text-description text-foreground-light"
          >
            {data.designation}
          </motion.p>
        </div>
      </div>
    </>
  );
}
