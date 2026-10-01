"use client";

import Image from "next/image";
import { useState, useEffect, useId } from "react";

import type { ProjectCardType } from "@/types/cardtype";
import { useParallax } from "@/app/hooks/useParallax";
import CustomOutlineButton from "./CustomOutlineButton-v4";
import CustomIconButton from "./CustomIconButton";
import Link from "next/link";

export default function Cardconstruction({
  image,
  status,
  location,
  title,
  button360,
  subtitle,
  startingFrom,
  units,
  hoverImage,
}: ProjectCardType) {
  const { ref, parallaxY } = useParallax(2);
  const [isHovered, setIsHovered] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const cardId = useId(); // unique ID for each card instance

  const show = isHovered || isActive;
  const breakWord = "by Imtiaz";

  const parts = title.split(new RegExp(`(${breakWord})`, "i"));
  useEffect(() => {
    // When another card broadcasts its activation, deactivate this one
    const handleOtherCardActive = (e: Event) => {
      const { id } = (e as CustomEvent).detail;
      if (id !== cardId) setIsActive(false);
    };

    window.addEventListener("card:activated", handleOtherCardActive);
    return () =>
      window.removeEventListener("card:activated", handleOtherCardActive);
  }, [cardId]);

  const handleCardClick = () => {
    if (!window.matchMedia("(hover: none)").matches) return;

    const next = !isActive;
    setIsActive(next);

    if (next) {
      window.dispatchEvent(
        new CustomEvent("card:activated", { detail: { id: cardId } }),
      );
    }
  };

  return (
    <div
      className="block w-full"
      ref={ref}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleCardClick}
    >
      <div className="relative w-full aspect-[10.72/13] md:aspect-[9/13] xl:aspect-[8.5/13] 3xl:aspect-[8.48/13] overflow-hidden">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover"
          style={{
            transform: `scale(${1.02}) translateY(${parallaxY}vh)`,
          }}
        />

        {/* Default overlay */}
        <div
          className="absolute inset-0 z-10 transition-opacity"
          style={{
            background:
              "linear-gradient(180deg, rgba(0, 0, 0, 0) 35.69%, rgba(0, 0, 0, 0.8) 84.83%), linear-gradient(0deg, rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2))",
          }}
        />

        {/* Hover overlay */}
        <div
          className={`absolute inset-0 z-10 transition-opacity duration-500  `}
          style={{
            background:
              "linear-gradient(180deg, rgba(0, 0, 0, 0) 36.05%, rgba(0, 0, 0, 0.) 83.74%),linear-gradient(0deg, rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2))",
          }}
        />

        {/* ── DEFAULT STATE ── */}
        <div>
          <div
            className={`absolute z-20 bottom-[30px] xl:bottom-10 left-0 right-0 px-5 transition-opacity duration-500  `}
          >
            {/* <h3
              className={`font-[optima] text-white text-25 leading-[1.4] uppercase text-center mb-[10px] transition-transform duration-900 ${show ? "translate-y-0" : "translate-y-2"}`}
              dangerouslySetInnerHTML={{ __html: title }}
            /> */}
            <h3
              className={`text-trim font-[optima] text-white max-w-[201px] md:max-w-full mx-auto text-25 leading-[1.4] uppercase text-center  transition-transform duration-900 `}
            >
              {parts.length > 1 ? (
                <>
                  {parts[0]}
                  <br className="hidden sm:block" />
                  {breakWord}
                </>
              ) : (
                title
              )}
            </h3>
            <div
              className={`w-full h-px my-[20px] transition-transform duration-900  `}
              style={{
                background:
                  "linear-gradient(90deg, rgba(255,255,255,0) 0%, #FFFFFF 50%, rgba(255,255,255,0) 100%)",
              }}
            />
            <p
              className={`text-white/80 text-description text-center transition-transform duration-900  `}
            >
              {subtitle}
            </p>
            <div
              onClick={(e) => e.stopPropagation()}
              className="mx-auto w-fit mt-20"
            >
              {button360 ? (
                <CustomIconButton
                  text="SEE 360 VIEW"
                  icon360={true}
                  px="!py-[9px] 3xl:!py-[17.5px] 3xl:py-[16px] px-[29.4px] sm:px-[20px] lg:px-[25px] 2xl:px-[30px] 3xl:px-10 cursor-pointer"
                  className="h-[44px] md:h-[50px] xl:h-[66px] max-md:h-[32px] max-md:!py-0 max-md:!px-[16px] max-md:text-[12px] max-md:[&_img]:h-[16px] max-md:[&_img]:w-auto"
                />
              ) : (
                <Link
                  href={`/construction-progress-listing/${title
                    .replace(/<br\s*\/?>/gi, "")
                    .toLowerCase()
                    .replace(/\s+/g, "-")}`}
                >
                  <CustomOutlineButton
                    text="View Progress"
                  />
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
