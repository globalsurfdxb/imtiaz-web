"use client";

import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import CustomOutlineButton from "../../common/CustomOutlineButton";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { InvestorRelationsPageResponse } from "../data";
import ProjectCard from "../../common/ProjectCard";
import "swiper/css";
import "swiper/css/navigation";
import type { Swiper as SwiperType } from "swiper";
import { motion } from "framer-motion";
import { moveUp, moveUpV2 } from "../../motionVariants";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SectionHeading } from "../../animations/SectionHeading";
import Reveal from "../../animations/RevealOneByOneAnimation";
import Link from "next/link";

gsap.registerPlugin(ScrollTrigger);

const ImtiazProperties = ({ data, title }: { data: InvestorRelationsPageResponse['data']['properties'], title: string }) => {
  const prevRef = useRef<HTMLButtonElement | null>(null);
  const nextRef = useRef<HTMLButtonElement | null>(null);
  const swiperRef = useRef<SwiperType | null>(null);

  // ⭐ No default active item anymore
  const [activeSlide, setActiveSlide] = useState<number | null>(null);

  // ⭐ Track hover on desktop
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);

  const [isMobile, setIsMobile] = useState(false);

  const rootRef = useRef<HTMLDivElement>(null);

  const wrapRefs = useRef<HTMLDivElement[]>([]);
  const imgRefs = useRef<HTMLImageElement[]>([]);

  // ⭐ Detect screen size
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth <= 1024);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  // ⭐ Mobile-only intersection observer
  useEffect(() => {
    if (!isMobile) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const index = Number(entry.target.getAttribute("data-idx"));
          if (entry.isIntersecting) {
            setActiveSlide(index);
          }
        });
      },
      { threshold: 0.5 },
    );

    wrapRefs.current.forEach((el, idx) => {
      if (!el) return;
      el.setAttribute("data-idx", String(idx));
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, [isMobile]);

  const initGSAP = () => {
    const section = rootRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      wrapRefs.current.forEach((wrapper, i) => {
        const img = imgRefs.current[i];
        if (!wrapper || !img) return;

        gsap.fromTo(
          img,
          { y: "-5vh" },
          {
            y: "5vh",
            ease: "none",
            scrollTrigger: {
              trigger: wrapper,
              scrub: true,
              start: "top bottom",
              end: "bottom top",
            },
          },
        );
      });
    });

    ScrollTrigger.refresh();
    return () => ctx.revert();
  };

  useEffect(() => {
    const listener = () => initGSAP();
    window.addEventListener("homeAnimationsReady", listener);
    return () => window.removeEventListener("homeAnimationsReady", listener);
  }, []);

  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(false);

  const updateNavState = (swiper: SwiperType) => {
    setIsBeginning(swiper.isBeginning);
    setIsEnd(swiper.isEnd);
  };

  return (
    <section
      data-header="dark"
      className="make-header-black w-full py-[70px] lg:py-120 3xl:py-160 bg-white z-10 relative"
    >
      <div className="container">
        <SectionHeading
          title={title}
          className="text-foreground text-center mb-[20px] md:mb-50"
        />
        <div className="relative" ref={rootRef}>
          <Swiper
            modules={[Navigation]}
            spaceBetween={28}
            slidesPerView={1}
            loop={false}
            onSwiper={(swiper) => {
              swiperRef.current = swiper;
              updateNavState(swiper);
            }}
            onSlideChange={updateNavState}
            breakpoints={{
              640: { slidesPerView: 2 },
              1140: { slidesPerView: 3 },
              1700: { slidesPerView: 4 },
            }}
          >
            {data.slice(0, 4).map((item: any, index: number) => {
              const formattedProject = {
                id: String(index + 1),

                image: item.featured_image_desktop,

                mobileImage:item.featured_image_mobile,

                hoverImage:
                  item.brand_logo || item.featured_image_mobile,

                status: item.property_status,

                location: "",

                title: item.title,

                subtitle: item.property_type,

                href: item.slug,

                startingFrom: item.icon1_text,

                units: item.icon2_text,
              };

              return (
                <SwiperSlide key={formattedProject.id}>
                  <Reveal variants={moveUpV2}>
                    <ProjectCard {...formattedProject} />
                  </Reveal>
                </SwiperSlide>
              );
            })}
          </Swiper>
        </div>
        {/* BOTTOM BUTTONS */}
        <div className="flex items-center justify-between md:justify-center mt-[20px] md:mt-50">
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
                className="3xl:w-[171.97px] 3xl:h-[66.45px] h-[44px] md:h-[50px]  xl:h-[66px]"
                textColor="text-primary"
                px="px-[30px] 3xl:px-[36.6px]"
              />
            </Link>
          </motion.div>
          <div
            className={`flex gap-[15px] transition-all duration-300 ${isBeginning && isEnd ? "hidden" : "ml-[30px]"}`}
          >
            <motion.div
              variants={moveUp(0.16)}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
            >
              <button
                onClick={() => swiperRef.current?.slidePrev()}
                className={`relative cursor-pointer w-[50px] h-[50px] 3xl:w-[62px] 3xl:h-[62px] group border border-[#404040] rounded-[50px] flex items-center justify-center overflow-hidden transition-opacity duration-300
        ${isBeginning ? "opacity-50 cursor-not-allowed pointer-events-none" : "opacity-100"}`}
              >
                <span className="absolute right-0 top-0 h-full w-0 bg-primary transition-all duration-300 group-hover:w-full z-0" />
                <Image
                  src="/icons/left_arrow_slider_primary.svg"
                  alt="Arrow Left"
                  width={28}
                  height={28}
                  className="relative z-10 object-contain 3xl:w-[28px] 3xl:h-[28px] lg:w-[22px] lg:h-[22px] w-[21px] h-[21px] group-hover:invert group-hover:brightness-0 transition-colors duration-300"
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
                onClick={() => swiperRef.current?.slideNext()}
                className={`relative cursor-pointer w-[50px] h-[50px] 3xl:w-[62px] 3xl:h-[62px] group border border-[#404040] rounded-[50px] flex items-center justify-center overflow-hidden transition-opacity duration-300
        ${isEnd ? "opacity-50 cursor-not-allowed pointer-events-none" : "opacity-100"}`}
              >
                <span className="absolute left-0 top-0 h-full w-0 bg-primary transition-all duration-300 group-hover:w-full z-0" />
                <Image
                  src="/icons/left_arrow_slider_primary.svg"
                  alt="Arrow Right"
                  width={28}
                  height={28}
                  className="relative z-10 rotate-180 object-contain 3xl:w-[28px] 3xl:h-[28px] lg:w-[22px] lg:h-[22px] w-[21px] h-[21px] group-hover:invert group-hover:brightness-0 transition-colors duration-300"
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
