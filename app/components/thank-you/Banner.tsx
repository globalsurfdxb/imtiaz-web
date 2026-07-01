"use client";

import { useCallback, useRef, useState, useEffect } from "react";
import Image from "next/image";
import gsap from "gsap";
// import Breadcrumb from "./Breadcrumb";
import { AnimatedHeading } from "../animations/AnimateHeading";
import { usePathname } from "next/navigation";

interface InnerHeroProps {
  image: string;
  title: string;
  description?: string;
  maxW?: string;
  maxTitle?: string;
}

const ZOOM_OUT_DURATION = 2.2;
const ZOOM_IN_DURATION = 10;
const ZOOM_OUT_START = 1.45;
const ZOOM_OUT_END = 1.0;
const ZOOM_IN_END = 1.06;

const HEADING_DELAY = ZOOM_OUT_DURATION - 1.6;
const DESC_DELAY = HEADING_DELAY + 0.55;
const BREADCRUMB_DELAY = DESC_DELAY + 0.35;
const BTN_DELAY = DESC_DELAY + 0.15;

const Banner = ({
  image,
  title,
  description,
  maxW,
  maxTitle,
}: InnerHeroProps) => {
  const imageWrapperRef = useRef<HTMLDivElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const breadcrumbRef = useRef<HTMLDivElement>(null);
  const regbtnRef = useRef<HTMLDivElement>(null);
  const hasAnimated = useRef(false);
  const pathname = usePathname();

  const showBreadcrumb = pathname !== "/pay-now";


  const handleImageLoad = useCallback(() => {
    if (hasAnimated.current) return;
    hasAnimated.current = true;

    gsap.context(() => {
      // Zoom-out → slow Ken-Burns creep
      // 👉 First: run intro ONCE
      gsap.fromTo(
        imageWrapperRef.current,
        { scale: ZOOM_OUT_START, transformOrigin: "center center" },
        {
          scale: ZOOM_OUT_END,
          duration: ZOOM_OUT_DURATION,
          ease: "expo.out",
          onComplete: () => {
            // 👉 Then start infinite subtle loop
            gsap
              .timeline({ repeat: -1 })
              .to(imageWrapperRef.current, {
                scale: ZOOM_IN_END,
                duration: ZOOM_IN_DURATION,
                ease: "sine.inOut",
              })
              .to(imageWrapperRef.current, {
                scale: ZOOM_OUT_END,
                duration: ZOOM_IN_DURATION,
                ease: "sine.inOut",
              });
          },
        },
      );

      // Description
      if (descRef.current) {
        gsap.fromTo(
          descRef.current,
          { opacity: 0, y: 16, filter: "blur(4px)" },
          {
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
            duration: 1.0,
            ease: "power3.out",
            delay: DESC_DELAY,
          },
        );
      }

      // Breadcrumb — subtle slide up
      if (breadcrumbRef.current) {
        gsap.fromTo(
          breadcrumbRef.current,
          { opacity: 0, y: 10 },
          {
            opacity: 1,
            y: 0,
            duration: 0.65,
            ease: "power3.out",
            delay: BREADCRUMB_DELAY,
          },
        );
      }

      if (regbtnRef.current) {
        gsap.fromTo(
          regbtnRef.current,
          { y: 100 },
          {
            y: 0,
            duration: 0.65,
            ease: "power3.out",
            delay: BTN_DELAY,
          },
        );
      }

    });
  }, []);

  return (
    <section
      className="relative w-full h-[82vh] 2xl:h-[59.5dvh] overflow-hidden"
      data-header="light"
    >
      <div
        ref={imageWrapperRef}
        className="absolute inset-0 will-change-transform"
        style={{ transformOrigin: "center center" }}
      >
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover object-center 2xl:object-bottom"
          priority
          onLoad={handleImageLoad}
        />
      </div>

      {/* Static overlay */}
      <div className="absolute inset-0 bg-black/54" />

      <div className="container absolute inset-0 flex items-center justify-center">
        <div className="w-full text-center">
          {/* delay prop fires blade animation after zoom-out nearly finishes */}
          {/* <div className={`${maxTitle} mx-auto`}>
            <AnimatedHeading
              title={title}
              className="mb-[8px] md:mb-20 text-white"
              mode="blade"
              delay={HEADING_DELAY}
            />
          </div> */}
          {description && (
            <p
              ref={descRef}
              style={{ opacity: 0 }}
              className={`text-white/80 text-description ${maxW} mx-auto text-center flex items-center justify-center px-[13px] md:px-30 xl:px-0 whitespace-pre-line`}
            >
              {description}
            </p>
          )}
        </div>
      </div>

      {/* {showBreadcrumb && <div
        ref={breadcrumbRef}
        style={{ opacity: 0 }}
        className="absolute flex flex-col justify-center   items-center gap-5 bottom-[60px] 3xl:bottom-[63px] left-0 right-0 flex justify-center"
      >
        <Breadcrumb />
        
      </div>} */}

    </section>
  );
};

export default Banner;
