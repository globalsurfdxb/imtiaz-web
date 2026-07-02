"use client";

import Image from "next/image";
import Link from "next/link";
import { PressItem } from "../data";
import { useParallax } from "@/app/hooks/useParallax";
import CustomOutlineButton from "../../common/CustomOutlineButton";

const EventCard = ({ item }: { item: PressItem }) => {
  const { ref, parallaxY } = useParallax(15);
  const formatted = new Date(item.date)
    .toLocaleDateString("en-US", {
      month: "2-digit",
      day: "2-digit",
      year: "numeric",
    })
    .replace(/\//g, "-");

  return (
    <Link href={`/media-center/news/${item.slug}`} className="group block">
      {/* Image + Category Bar */}
      <div
        ref={ref}
        className="relative w-full h-[207px] md:h-[250px] xl:h-[333px] overflow-hidden"
        style={{ willChange: "transform" }} // 👈 promote to GPU layer early
      >
        <Image
          src={item.image}
          alt={item.title}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover hidden lg:block"
          style={{
            transform: `scale(1.15) translateY(${parallaxY}vh)`,
            willChange: "transform", // 👈 tell Safari to prep this layer
          }}
        />

        <Image
          src={item.mobileImage}
          alt={item.title}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover lg:hidden"
          style={{
            transform: `scale(1.15) translateY(${parallaxY}vh)`,
            willChange: "transform", // 👈 tell Safari to prep this layer
          }}
        />

        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, rgba(0, 0, 0, 0) 61.41%, #000000 100%)",
          }}
        />

        {/* Category & Date Bar */}
        <div
          className="absolute bottom-0 left-0 right-0 py-[10px] md:py-[12px] flex items-center justify-center"
          style={{
            backdropFilter: "blur(30px)",
            WebkitBackdropFilter: "blur(20px)", // 👈 Safari needs this explicitly
            backgroundColor: "rgba(255,255,255,0.3)",
            transform: "translateZ(0)", // 👈 force own compositing layer
            isolation: "isolate", // 👈 prevents bleed from parent transform
          }}
        >
          <span className="text-white/80 font-[avenirBook] text-[14px] md:text-16 leading-[1.54]">
            {item.category} - {formatted}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="relative bg-[#EBEBEC] py-[30px] p-40 flex flex-col items-center gap-[20px] md:gap-20 overflow-hidden group">
        {/* white/30 fill animation */}
        <div className="absolute inset-0 bg-white/30 origin-left scale-x-0 transition-transform duration-500 ease-out group-hover:scale-x-100" />

        {/* content */}
        <h3 className="relative text-[18px] md:text-25 leading-[1.4] font-[optima] font-[400] text-foreground text-center uppercase line-clamp-2">
          {item.title}
        </h3>

        <span className="relative text-primary-2 font-[avenirBook] font-[800] leading-[100%] text-[16px] md:text-19">
          {/* <span>Read More</span> */}
          <CustomOutlineButton
            variant="dark"
            text="Read More"
            borderColor="border-primary-2"
            textColor="text-primary-2"
            px="px-[12px] lg:px-[20px] 3xl:px-[36.6px] h-[47px]"
            readMore
          />

          {/* base line */}
          {/* <span className="absolute left-0 bottom-0 w-full h-[1px] bg-primary-2/50" /> */}

          {/* animated fill */}
          {/* <span className="absolute left-0 bottom-0 w-full h-[1px] bg-primary-2 origin-left scale-x-0 transition-transform duration-300 ease-out group-hover:scale-x-100" /> */}
        </span>
      </div>
    </Link>
  );
};

export default EventCard;
