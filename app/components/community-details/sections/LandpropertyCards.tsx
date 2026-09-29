"use client";

import { LandpropertyData, RelatedProperty } from "../data";
import ProjectCard from "../../common/ProjectCard";
import { SectionHeading } from "../../animations/SectionHeading";
import type { Swiper as SwiperType } from "swiper";
import { useRef, useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { motion } from "framer-motion";
import { moveUp, moveUpV2 } from "@/app/components/motionVariants";
import CustomOutlineButton from "../../common/CustomOutlineButton";
import SliderArrowButton from "../../common/SliderNavigationButton-v4";
import Reveal from "../../animations/RevealOneByOneAnimation";

const LandpropertyCards = ({title,items}:{title:string,items:RelatedProperty[]}) => {
  const prevRef = useRef<HTMLButtonElement | null>(null);
  const nextRef = useRef<HTMLButtonElement | null>(null);
  const swiperRef = useRef<SwiperType | null>(null);
  const [showAll, setShowAll] = useState(false);
  const [initialCount, setInitialCount] = useState(6);
  const [activeIndex, setActiveIndex] = useState(0);
  const [totalSlides, setTotalSlides] = useState(0);

  useEffect(() => {
    const getCount = () => (window.innerWidth >= 1700 ? 8 : 6);
    setInitialCount(getCount());

    const handleResize = () => setInitialCount(getCount());
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const cards = items || [];
  const hasMore = cards?.length > initialCount;
  const visibleCards = showAll ? cards : cards?.slice(0, initialCount);

  return (
    <section data-header="dark" className="w-full">
      <div className="container flex flex-col justify-center">
        <div className="text-center">
          {title && <SectionHeading
            title={title}
            className="text-heading mb-6 md:mb-20 lg:mb-50 content-spacing-mobile-padding"
          />}

          {/* 📱 MOBILE to 1140: SWIPER */}
          <div className="block min-[1140px]:hidden relative">
            <Swiper
              modules={[Autoplay, Navigation]}
              spaceBetween={28}
              slidesPerView={1}
              loop
              onSwiper={(swiper) => {
                swiperRef.current = swiper;
                setTotalSlides(swiper.slides.length);

                setTimeout(() => {
                  if (
                    swiper.params.navigation &&
                    typeof swiper.params.navigation === "object"
                  ) {
                    (swiper.params.navigation as any).prevEl = prevRef.current;
                    (swiper.params.navigation as any).nextEl = nextRef.current;
                  }
                  swiper.navigation.destroy();
                  swiper.navigation.init();
                  swiper.navigation.update();
                }, 0);
              }}
              onSlideChange={(swiper) => {
                setActiveIndex(swiper.realIndex);
              }}
              navigation={{
                prevEl: prevRef.current,
                nextEl: nextRef.current,
              }}
              breakpoints={{
                640: { slidesPerView: 2 },
              }}
            >
              {(items || [])?.map((project,index) => (
                <SwiperSlide key={index}>
                  <ProjectCard 
                  id={index.toString()}
                  title={project?.property_name} 
                  image={project?.featured_image_desktop}
                  status={project?.property_status}
                   startingFrom={project?.icon1_text}
                   units={project?.icon2_text}
                   hoverImage={project?.brand_logo}
                  {...project} 
                  isCommunity/>
                </SwiperSlide>
              ))}
            </Swiper>

            {/* Nav buttons */}
            <div className="flex items-center justify-center gap-[15px] mt-5 md:mt-30">
              <motion.div
                variants={moveUp(0.1)}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
              >
                <SliderArrowButton ref={prevRef} direction="prev" variant="dark" />
              </motion.div>
              <motion.div
                variants={moveUp(0.16)}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
              >
                <SliderArrowButton ref={nextRef} direction="next" variant="dark" />
              </motion.div>
            </div>

            <motion.div
              variants={moveUp(0.22)}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              className="w-full flex justify-center mt-20"
            >
              <div className="relative w-full h-[1px] bg-foreground-light/50 overflow-visible">
                {/* Active segment */}
                <div
                  className="absolute left-0 top-1/2 -translate-y-1/2 h-[2px] bg-primary transition-all duration-300"
                  style={{
                    width: `${((activeIndex + 1) / totalSlides) * 100}%`,
                    transform: "translateY(-50%)",
                  }}
                />
              </div>
            </motion.div>
          </div>

          {/* 💻 DESKTOP 1140+: GRID */}
          <div className="hidden min-[1140px]:grid min-[1140px]:grid-cols-3 min-[1700px]:grid-cols-4 3xl:gap-y-50 gap-y-40 gap-x-30 xl:gap-x-[28px]">
            {(visibleCards || [])?.map((project, index) => (
              <Reveal
                variants={moveUpV2}
                key={index}
                delayRange={index * 0.1}
              >
                <ProjectCard 
                id={index.toString()}
                title={project?.property_name} 
                  image={project?.featured_image_desktop}
                  status={project?.property_status}
                   startingFrom={project?.icon1_text}
                   units={project?.icon2_text}
                   hoverImage={project?.brand_logo}
                 {...project} 
                 isCommunity/>
              </Reveal>
            ))}
          </div>

          {/* View More — desktop only, only if remaining cards exist */}
          {hasMore && !showAll && (
            <div className="hidden min-[1140px]:flex justify-center mt-50">
              <motion.div
                variants={moveUp(0.1)}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
              >
                <CustomOutlineButton
                  text="View More"
                  variant="dark"
                  borderColor="border-primary"
                  textColor="text-primary"
                  px="px-[12px] sm:px-[26px] xl:px-[37px]"
                  onClick={() => setShowAll(true)}
                />
              </motion.div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default LandpropertyCards;
