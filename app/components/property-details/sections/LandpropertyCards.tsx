"use client";
import { LandpropertyData } from "../data";
import ProjectCard from "../../common/ProjectCard";
import CustomOutlineButton from "../../common/CustomOutlineButton-v4";
import { SectionHeading } from "../../animations/SectionHeading";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import { moveUp, moveUpV2 } from "../../motionVariants";
import { motion } from "framer-motion";
import Reveal from "../../animations/RevealOneByOneAnimation";
import SliderArrowButton from "../../common/SliderNavigationButton-v4";
import { useRef, useState } from "react";
import type { Swiper as SwiperType } from "swiper";
import { PropertiesPageData } from "../../property/data";

const LandpropertyCards = ({data,community,property}:{data:PropertiesPageData['listing'],community:string,property:string}) => {
  const swiperRef = useRef<SwiperType | null>(null);
  const [slidesPerView, setSlidesPerView] = useState(1);

  const totalSlides = data.slice(-4).length;
  const showNav = totalSlides > slidesPerView;
  return (
    <section className="w-full"
      data-header="dark">
      <div className="container flex flex-col justify-center md:pt-100 pb-120 3xl:pb-130 md:border-t md:border-black/10">
        <div className="text-center">
          <SectionHeading
            title={LandpropertyData.title}
            className="text-heading mb-6 md:mb-50"
          />

          <motion.div
            variants={moveUp(0.1)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
          >
            <Swiper
              modules={[Autoplay]}
              spaceBetween={28}
              slidesPerView={1}
              breakpoints={{
                640: { slidesPerView: 2 },
                1140: { slidesPerView: 3 },
                1700: { slidesPerView: 4 },
              }}
              loop={true}
              autoplay={{ delay: 3000, disableOnInteraction: false }}
              onSwiper={(s) => {
                swiperRef.current = s;
                setSlidesPerView(
                  Math.round(s.params.slidesPerView as number) || 1,
                );
              }}
              onBreakpoint={(s) =>
                setSlidesPerView(
                  Math.round(s.params.slidesPerView as number) || 1,
                )
              }
            >
              {data.filter((item)=>item.property_community == community && item.title !== property).slice(-4).map((project, i) => (
                <SwiperSlide key={i}>
                  <Reveal variants={moveUpV2} delayRange={i * 0.12}>
                    <ProjectCard 
                    
                    image={project?.featured_image_desktop}
                    hoverImage={project?.brand_logo}
                    startingFrom={project?.icon1_text}
                    units={project?.icon2_text}
                    location={project?.property_location}
                    {...project} />
                  </Reveal>
                </SwiperSlide>
              ))}
            </Swiper>
          </motion.div>

          {/* BOTTOM BUTTONS */}
          <div className="flex items-center justify-between md:justify-center mt-[20px] sm:mt-50">
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
                />
              </Link>
            </motion.div>
            {showNav && (
              <div className="flex gap-[15px] ml-[30px]">
                <motion.div
                  variants={moveUp(0.16)}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true }}
                >
                  <SliderArrowButton
                    onClick={() => swiperRef.current?.slidePrev()}
                    direction="prev"
                    variant="dark"
                  />
                </motion.div>
                <motion.div
                  variants={moveUp(0.22)}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true }}
                >
                  <SliderArrowButton
                    onClick={() => swiperRef.current?.slideNext()}
                    direction="next"
                    variant="dark"
                  />
                </motion.div>
              </div>
            )}
          </div>
        </div>
        <div></div>
      </div>
    </section>
  );
};

export default LandpropertyCards;
