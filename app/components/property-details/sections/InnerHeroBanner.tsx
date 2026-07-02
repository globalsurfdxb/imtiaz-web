"use client";

import { useCallback, useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import Breadcrumb from "../../common/Breadcrumb";
import BannerDetails from "./BannerDetails";

interface InnerHeroProps {
  video?: string;
  image: string;
  title: string;
  description?: string;
  maxW?: string;
  maxTitle?: string;
  location: string;
  payment_plan: string;
  starting_price: string;
  delivery_date: string;
  mobileImage?:string;
  mobileVideo?:string;
}

const ZOOM_OUT_DURATION = 2.2;
const ZOOM_IN_DURATION = 10;
const ZOOM_OUT_START = 1.4;
const ZOOM_OUT_END = 1.0;
const ZOOM_IN_END = 1.06;

const BREADCRUMB_DELAY = ZOOM_OUT_DURATION - 1.6;
const BANNER_DETAILS_DELAY = BREADCRUMB_DELAY + 0.17;

const InnerHeroBanner = ({
  video,
  image,
  location,
  payment_plan,
  starting_price,
  delivery_date,
  mobileImage,
  mobileVideo
}: InnerHeroProps) => {
  console.log(video, image, "video image");
  const imageWrapperRef = useRef<HTMLDivElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const breadcrumbRef = useRef<HTMLDivElement>(null);
  const hasAnimated = useRef(false);
  const bannerDetailsRef = useRef<HTMLDivElement>(null);

  const hasVideo =
    video &&
    video.trim().length > 0 &&
    /\.(mp4|webm|ogg|mov)$/i.test(video.trim());

  const handleImageLoad = useCallback(() => {
    if (hasAnimated.current) return;
    hasAnimated.current = true;

    gsap.context(() => {
      gsap.fromTo(
        imageWrapperRef.current,
        { scale: ZOOM_OUT_START, transformOrigin: "center center" },
        {
          scale: ZOOM_OUT_END,
          duration: ZOOM_OUT_DURATION,
          ease: "expo.out",
          onComplete: () => {
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

      if (breadcrumbRef.current) {
        gsap.fromTo(
          breadcrumbRef.current,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.65,
            ease: "power3.out",
            delay: BREADCRUMB_DELAY,
          },
        );
      }

      if (bannerDetailsRef.current) {
        gsap.fromTo(
          bannerDetailsRef.current,
          { y: 200 },
          {
            y: 0,
            duration: 1,
            ease: "power3.out",
            delay: BANNER_DETAILS_DELAY,
          },
        );
      }
    });
  }, []);

  // when video, trigger the breadcrumb/bannerDetails animations on mount
  useEffect(() => {
    if (!video) return;

    gsap.fromTo(
      breadcrumbRef.current,
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        duration: 0.65,
        ease: "power3.out",
        delay: BREADCRUMB_DELAY,
      },
    );

    gsap.fromTo(
      bannerDetailsRef.current,
      { y: 200 },
      { y: 0, duration: 1, ease: "power3.out", delay: BANNER_DETAILS_DELAY },
    );
  }, [video]);

  return (
    <section
      className="relative w-full h-[100vh] md:h-[82vh] 2xl:h-screen overflow-hidden"
      data-header="light"
    >
      <div
        ref={imageWrapperRef}
        className="absolute inset-0 will-change-transform"
        style={{ transformOrigin: "center center" }}
      >
        {hasVideo ? (
          <>
          <video
            src={video}
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover object-center 2xl:object-bottom hidden lg:block"
          />

          <video
            src={mobileVideo ? mobileVideo : video}
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover object-center 2xl:object-bottom lg:hidden"
          />

          </>
        ) : image && image.trim().length > 0 ? (
          <>
          <Image
            src={image}
            alt="title"
            fill
            sizes="100vw"
            className="object-cover object-center 2xl:object-bottom hidden lg:block"
            priority
            onLoad={handleImageLoad}
          />

          <Image
            src={mobileImage ? mobileImage : image}
            alt="title"
            fill
            sizes="100vw"
            className="object-cover object-center 2xl:object-bottom lg:hidden"
            priority
            onLoad={handleImageLoad}
          />

          </>
        ) : null}
      </div>

      {/* Static overlay */}
      <div className="absolute inset-0 bg-black/54" />
      <div className="absolute bottom-0 left-0 right-0 ">
        <div ref={breadcrumbRef} style={{ opacity: 0 }}>
          <div className="flex justify-center mb-20 lg:mb-60 3xl:mb-[63px] ">
            <Breadcrumb />
          </div>
        </div>

        <div ref={bannerDetailsRef} style={{ transform: "translateY(200px)" }}>
          <BannerDetails
            location={location}
            payment_plan={payment_plan}
            starting_price={starting_price}
            delivery_date={delivery_date}
          />
        </div>
      </div>
    </section>
  );
};

export default InnerHeroBanner;
