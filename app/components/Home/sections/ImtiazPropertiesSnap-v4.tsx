

"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import CustomOutlineButton from "../../common/CustomOutlineButton-v4";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import ProjectCard from "../../common/ProjectCard-v4";
import "swiper/css";
import "swiper/css/navigation";
import type { Swiper as SwiperType } from "swiper";
import { motion } from "framer-motion";
import { moveUp } from "../../motionVariants";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";

gsap.registerPlugin(ScrollTrigger);

type ImtiazPropertiesData = {
  data: {
    sectionTitle: string;
    properties: {
      id: string;
      title: string;
      image: string;
      mobileImage: string;
      link: string;
      hoverImage: string;
    }[];
  };
  title: string;
  className?: string;
};

const ImtiazProperties = ({ data, title, className }: ImtiazPropertiesData) => {
  const swiperRef = useRef<SwiperType | null>(null);
  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(false);

  const handlePrev = () => {
    const swiper = swiperRef.current;
    if (!swiper || swiper.animating) return;
    swiper.slidePrev();
  };

  const handleNext = () => {
    const swiper = swiperRef.current;
    if (!swiper || swiper.animating) return;
    swiper.slideNext();
  };

  const properties = data?.properties ?? [];

  if (properties.length === 0) return null;

  return (
    <section
      data-header="dark"
      className={`make-header-black w-full h-[100svh] bg-white z-10 relative flex items-center justify-center`}
    >
      <div className="container">
        <div className="overflow-hidden">
          <motion.h2
            variants={moveUp(0.2)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="text-center text-heading mb-5 sm:mb-50"
          >
            {title}
          </motion.h2>
        </div>

        <div className="relative">
          <Swiper
            modules={[Navigation]}
            spaceBetween={28}
            slidesPerView={1}
            speed={600}
            onSwiper={(swiper) => {
              swiperRef.current = swiper;
              setIsBeginning(swiper.isBeginning);
              setIsEnd(swiper.isEnd);
            }}
            onSlideChange={(swiper) => {
              setIsBeginning(swiper.isBeginning);
              setIsEnd(swiper.isEnd);
            }}
            breakpoints={{
              640: { slidesPerView: 2 },
              1140: { slidesPerView: 3 },
              1700: { slidesPerView: 4 },
            }}
          >
            {properties.slice(0, 16).map((project) => {
              return (
                <SwiperSlide key={project.id}>
                  <ProjectCard {...project} enableParallax={false} />
                </SwiperSlide>
              );
            })}
          </Swiper>
        </div>

        <div className="flex items-center justify-between md:justify-center mt-5 sm:mt-50">
          <motion.div
            variants={moveUp(0.1)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
          >
            <Link href="/properties">
              <CustomOutlineButton
                text="View All"
                variant="dark"
                borderColor="border-primary"
                textColor="text-primary"
                px="px-10 xl:px-[37px] h-[44px] md:h-[50px]  xl:h-[66px]"
              />
            </Link>
          </motion.div>
          <div className="flex gap-[15px] ml-[30px]">
            <motion.div
              variants={moveUp(0.16)}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
            >
              <button
                onClick={handlePrev}
                disabled={isBeginning}
                className="relative cursor-pointer w-[50px] h-[50px] max-md:w-[32px] max-md:h-[32px] 3xl:w-[62px] 3xl:h-[62px] group border border-primary-2 rounded-[50px] flex items-center justify-center overflow-hidden disabled:opacity-30 disabled:cursor-not-allowed"
              >
                <span className="absolute right-0 top-0 h-full w-0 bg-primary transition-all duration-300 group-hover:w-full z-0" />
                <Image
                  src="/icons/left_arrow_slider_primary.svg"
                  alt="Arrow Right"
                  width={28}
                  height={28}
                  className="relative z-10 object-contain 3xl:w-[28px] 3xl:h-[28px] lg:w-[22px] lg:h-[22px] max-md:w-[14px] max-md:h-[14px] w-[21px] h-[21px] group-hover:invert group-hover:brightness-0 transition-colors duration-300"
                />
              </button>
            </motion.div>
            <motion.div
              variants={moveUp(0.22)}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
            >
              <button
                onClick={handleNext}
                disabled={isEnd}
                className="relative cursor-pointer w-[50px] h-[50px] max-md:w-[32px] max-md:h-[32px] 3xl:w-[62px] 3xl:h-[62px] group border border-[#404040] rounded-[50px] flex items-center justify-center overflow-hidden disabled:opacity-30 disabled:cursor-not-allowed"
              >
                <span className="absolute left-0 top-0 h-full w-0 bg-primary transition-all duration-300 group-hover:w-full z-0" />
                <Image
                  src="/icons/left_arrow_slider_primary.svg"
                  alt="Arrow Right"
                  width={28}
                  height={28}
                  className="relative z-10 rotate-180 object-contain 3xl:w-[28px] 3xl:h-[28px] lg:w-[22px] lg:h-[22px] max-md:w-[14px] max-md:h-[14px] w-[20px] h-[20px] group-hover:invert group-hover:brightness-0 transition-colors duration-300"
                />
              </button>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ImtiazProperties;
