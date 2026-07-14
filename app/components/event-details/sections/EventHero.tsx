"use client";

import Image from "next/image";
import Breadcrumb from "../../common/Breadcrumb";
import { EventDetail, EventDetailData } from "../data";
import { SectionHeading } from "../../animations/SectionHeading";
import { motion } from "framer-motion";
import { moveDown, moveUp } from "../../motionVariants";
import { useParallax } from "@/app/hooks/useParallax";

interface Props {
  event: EventDetailData;
}

const EventHero = ({ event }: Props) => {
  const { ref, parallaxY } = useParallax(15);
  const formattedDate = event.post_date?.replace(/-/g, " - ");

  return (
    <section className="w-full pt-[174px] md:pt-200" data-header="dark">
      <div className="container flex flex-col items-center container-spacing-details-page">
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
          title={event.page_banner_title}
          className="max-w-[50ch] text-foreground text-center uppercase mt-[40px] md:mt-100"
        />

        {/* Image with overlay and meta bar */}
        <div
          ref={ref}
          className="w-full h-[300px] md:h-[500px] lg:h-[500px] 2xl:h-[560px] 3xl:h-[722px] mt-[40px] md:mt-50 relative overflow-hidden"
        >
          <Image
            src={event.page_banner_desktop}
            alt={event.page_banner_title}
            fill
            priority
            sizes="100vw"
            style={{
              transform: `scale(${1.15}) translateY(${parallaxY}vh)`,
            }}
            className="hidden lg:block object-cover"
          />

          <Image
            src={event.page_banner_mobile ? event.page_banner_mobile : event.page_banner_desktop}
            alt={event.page_banner_title}
            fill
            priority
            sizes="100vw"
            style={{
              transform: `scale(${1.15}) translateY(${parallaxY}vh)`,
            }}
            className="lg:hidden object-cover"
          />

          {/* Gradient overlay */}
          <div
            className="hidden lg:block absolute inset-0"
            style={{
              background:
                "linear-gradient(180deg, rgba(0, 0, 0, 0) 75.44%, #000000 100%)",
            }}
          />

          <div
            className="lg:hidden absolute inset-0"
            style={{
              background:
                "linear-gradient(180deg, rgba(0, 0, 0, 0) 60.44%, #000000 100%)",
            }}
          />

          {/* Meta bar */}
          <div className="absolute bottom-0 left-0 right-0 flex py-[25px] md:py-20 items-end justify-center bg-white/20 backdrop-blur-[30px]">
            <div className="flex items-center lg:gap-x-50 gap-x-2  sm:gap-x-10 md:gap-x-50">
              {/* Date */}
              <motion.div
                variants={moveUp(0)}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                className="flex flex-col items-center gap-1 lg:gap-[6px]"
              >
                <div className="flex items-center gap-[10px]">
                  <Image
                    src="/images/icons/date.svg"
                    alt="calendar"
                    width={26}
                    height={26}
                    className="h-[15px] w-auto "
                  />
                  <span className="text-white text-description leading-[1.54] uppercase">
                    Date
                  </span>
                </div>
                <span className="text-white/80  text-description leading-[1.54]  max-md:text-center">
                  {formattedDate}
                </span>
              </motion.div>

              <div className="relative w-px h-[50px] lg:h-[72px] overflow-hidden">
                <motion.div
                  className="absolute inset-0 origin-center"
                  style={{
                    background:
                      "linear-gradient(180deg, rgba(255,255,255,0) 0%, #FFFFFF 50%, rgba(255,255,255,0) 100%)",
                  }}
                  initial={{ scaleY: 0, opacity: 0 }}
                  whileInView={{ scaleY: 1, opacity: 1 }}
                  viewport={{ once: true, margin: "-20% 0px" }}
                  transition={{ duration: 0.8, ease: "easeInOut" }}
                />
              </div>
              {/* Location */}
              <motion.div
                variants={moveUp(0.12)}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                className="flex flex-col items-center gap-[1px] md:gap-1 lg:gap-[6px]"
              >
                <div className="flex items-center gap-[10px]">
                  <Image
                    src="/images/icons/map.svg"
                    alt="map"
                    width={26}
                    height={26}
                    className="h-[15px] w-auto  "
                  />
                  <span className="text-white text-description leading-[1.54] uppercase">
                    Location
                  </span>
                </div>
                <span className="text-white/80 text-description leading-[1.54] max-md:text-center">
                  {event.event_location}
                </span>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EventHero;
