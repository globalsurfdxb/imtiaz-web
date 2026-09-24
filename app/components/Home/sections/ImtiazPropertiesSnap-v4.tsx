

"use client";

import { useRef, useState } from "react";
import CustomOutlineButton from "../../common/CustomOutlineButton-v4";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import ProjectCard from "../../common/ProjectCard-v4";
import SliderArrowButton from "../../common/SliderNavigationButton-v4";
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
            className="text-center text-heading mb-5 sm:mb-50 text-trim"
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
                borderColor="border-foreground sm:border-primary-2"
                textColor="text-foreground sm:text-primary-2"
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
              <SliderArrowButton
                onClick={handlePrev}
                disabled={isBeginning}
                direction="prev"
                arrowColor="dark"
              />
            </motion.div>
            <motion.div
              variants={moveUp(0.22)}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
            >
              <SliderArrowButton
                onClick={handleNext}
                disabled={isEnd}
                direction="next"
                arrowColor="dark"
              />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ImtiazProperties;
