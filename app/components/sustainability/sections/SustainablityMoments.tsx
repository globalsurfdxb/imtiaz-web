"use client";

import { useState } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import "swiper/css";

import { SectionHeading } from "../../animations/SectionHeading";
import { SectionDescription } from "../../animations/SectionDescription";

type ColumnData = {
  title: string;
};

const columnData: ColumnData = {
  title: "Moments of Sustainability",
  // description:
  //   "Explore how thoughtful planning and green solutions come together to build spaces that care for both people and the planet. Discover projects built on sustainable principles that create value \n today while protecting tomorrow.",
  // images: [
  //   [
  //     { src: "/images/sustainability/img1.jpg", alt: "Property 1" },
  //     { src: "/images/sustainability/img2.jpg", alt: "Property 2" },
  //     { src: "/images/sustainability/img3.jpg", alt: "Property 3" },
  //     { src: "/images/sustainability/img4.jpg", alt: "Property 4" },
  //     { src: "/images/sustainability/img1.jpg", alt: "Property 1" },
  //     { src: "/images/sustainability/img2.jpg", alt: "Property 2" },
  //     { src: "/images/sustainability/img3.jpg", alt: "Property 3" },
  //     { src: "/images/sustainability/img4.jpg", alt: "Property 4" },
  //   ],
  // ],
};

function GalleryCard({
  src,
  alt,
  isCenter,
}: {
  src: string;
  alt: string;
  isCenter: boolean;
}) {
  return (
    <div className="relative flex-shrink-0 overflow-hidden w-[300px] h-[300px] lg:w-[500px] lg:h-[515px] 3xl:w-[599px] 3xl:h-[615px]">
      <Image
        src={src}
        alt={alt}
        fill
        className="object-cover object-center pointer-events-none transition-[filter] duration-500 ease-out"
        style={{ filter: isCenter ? "grayscale(0)" : "grayscale(1)" }}
      />
      <div className="absolute inset-0 bg-black/0 hover:bg-black/10 transition-colors duration-300" />
    </div>
  );
}

export default function ScrollingGallery({
  title,
  description,
  data,
}: {
  title: string;
  description: string;
  data: { moment_caption: string; moment_url: string }[];
}) {
  const slides = data;
  const [activeIndex, setActiveIndex] = useState<number>(0);

  const handleSlideChange = (swiper: SwiperType) => {
    setActiveIndex(swiper.realIndex);
  };

  return (
    <section
      className="w-full py-120 3xl:py-160 overflow-hidden"
      data-header="dark"
    >
      <div className="container text-center mb-[50px] md:mb-60">
        <SectionHeading
          title={title}
          className="uppercase text-foreground mb-6 md:mb-20 content-spacing-mobile-padding"
        />
        <SectionDescription
          text={description}
          className="text-description text-foreground-light max-w-[86ch] mx-auto whitespace-pre-line content-spacing-mobile-padding"
        />
      </div>

      <Swiper
        modules={[Autoplay]}
        autoplay={{
          delay: 0,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}
        speed={3000}
        loop={true}
        centeredSlides={true}
        slidesPerView="auto"
        spaceBetween={12}
        breakpoints={{
          1024: { spaceBetween: 38 },
        }}
        allowTouchMove={true}
        onSlideChange={handleSlideChange}
        onSwiper={handleSlideChange}
        className="!overflow-visible w-full"
      >
        {slides.map((img, i) => (
          <SwiperSlide key={i} className="!w-auto">
            <GalleryCard
              src={img.moment_url}
              alt={img.moment_caption}
              isCenter={i === activeIndex}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}
