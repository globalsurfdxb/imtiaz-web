"use client";

import { useRef, useState } from "react";
import Reveal from "../../animations/RevealOneByOneAnimation";
import { SectionHeading } from "../../animations/SectionHeading";
import { BlogListingData, blogs } from "../../blogs/data";
import BlogCard from "../../blogs/sections/BlogCard";
import CustomOutlineButton from "../../common/CustomOutlineButton";
import { moveUp, moveUpV2 } from "../../motionVariants";
import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import "swiper/css";
import { useParallax } from "@/app/hooks/useParallax";
import SliderArrowButton from "../../common/SliderNavigationButton";
import Link from "next/link";

const RelatedBlogs = ({ data, currentBlog }: { data: BlogListingData['listing'], currentBlog:string }) => {

  const swiperRef = useRef<SwiperType | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const { ref, parallaxY } = useParallax(15);
  return (
    <section className="pb-120 3xl:pb-160 container" data-header="dark">
      <div className="border-t border-black/10 pt-[40px] md:pt-50">
        <SectionHeading
          title="Related Blogs"
          className="text-center uppercase"
        />
        <div className="hidden md:block">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-40 mt-5 md:mt-50">
            {data.filter((item)=>item.title !== currentBlog).map((item: any, index: number) => {
              const formattedItem = {
                id: index + 1,
                title: item.title,
                image: item.featured_image_desktop,
                category: item.category_name,
                date: item.post_date
                  ? item.post_date.split("-").reverse().join("-")
                  : "",
                slug: item.slug,
                description: item.description,
                mobileImage: item.featured_image_mobile,
                alt: item.featured_image_alt,
              };

              return (
                <Reveal variants={moveUpV2} key={formattedItem.id}>
                  <BlogCard blog={formattedItem} />
                </Reveal>
              );
            })}
          </div>
          <motion.div
            variants={moveUp(0.2)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="flex justify-center mt-50"
          >   <Link href='/media-center/blog'>
              <CustomOutlineButton
                variant="dark"
                text="View All"
                borderColor="border-primary-2"
                textColor="text-primary-2"
                px="px-[12px] lg:px-[20px] 3xl:px-[36.6px]"
              /> </Link>
          </motion.div>
        </div>
        <div
          ref={ref}
          className="relative w-full  md:hidden mt-5  "
        >
          <Swiper
            modules={[Autoplay]}
            speed={800}
            spaceBetween={15}
            autoplay={{ delay: 5000, disableOnInteraction: false }}
            loop
            onSwiper={(swiper) => (swiperRef.current = swiper)}
            onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
            className="w-full h-full"
          >
            {data.filter((item)=>item.title !== currentBlog).map((item: any, index: number) => {
              const formattedItem = {
                id: index + 1,
                title: item.title,
                image: item.featured_image_desktop,
                category: item.category_name,
                date: item.post_date
                  ? item.post_date.split("-").reverse().join("-")
                  : "",
                slug: item.slug,
                description: item.description,
                mobileImage: item.featured_image_mobile,
                alt: item.featured_image_alt,
              };

              return (
                <SwiperSlide
                  key={formattedItem.id}
                  className="relative w-full h-full"
                >
                  <Reveal variants={moveUpV2}>
                    <BlogCard blog={formattedItem} />
                  </Reveal>
                </SwiperSlide>
              );
            })}
          </Swiper>
          <div className="flex justify-between md:justify-center gap-30 w-full mt-5">
            <Link href='/media-center/blog'>
              <CustomOutlineButton
                variant="dark"
                text="View All"
                borderColor="border-primary-2"
                textColor="text-primary-2"
                px="px-[12px] sm:px-[26px]"
                className="min-w-[139px] md:w-full"
              /></Link>

            <div className="flex items-center gap-[15px]">
              <SliderArrowButton
                direction="prev"
                variant="dark"
                onClick={() => swiperRef.current?.slidePrev()}
              />
              <SliderArrowButton
                direction="next"
                variant="dark"
                onClick={() => swiperRef.current?.slideNext()}
              />
            </div>
          </div>
        </div>


      </div>
    </section>
  );
};

export default RelatedBlogs;
