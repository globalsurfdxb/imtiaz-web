"use client";

import { useRef } from "react";
import Image from "next/image";

const VideoSection = ({ image, mobileImage }: { image: string,mobileImage:string }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <section
      className="w-full bg-white md:pb-50 mt-[50px]"
      data-header="dark"
    >
      <div
        ref={containerRef}
        className="relative w-full h-[396px] md:h-[680px] 2xl:h-screen overflow-hidden bg-black"
      >
        {/* Background Image */}
        <div className="absolute inset-0 z-10">
          <Image
            src={image}
            alt="Gallery image"
            fill
            priority
            sizes="100vw"
            className="object-cover hidden lg:block"
            style={{
              transform: "scale(1.15) translateY(0vh)",
              willChange: "transform",
            }}
          />
          <Image
            src={mobileImage}
            alt="Gallery image"
            fill
            priority
            sizes="100vw"
            className="object-cover lg:hidden"
            style={{
              transform: "scale(1.15) translateY(0vh)",
              willChange: "transform",
            }}
          />
        </div>

        {/* Overlay */}
        <div className="absolute inset-0 z-20 bg-black/70 pointer-events-none" />

        {/* Play Button */}
        <div className="absolute inset-0 z-[1000] flex items-center justify-center cursor-pointer">
          <Image
            src="/images/initiative-details/play-video.svg"
            alt="play-video"
            width={100}
            height={100}
            className="w-[60px] h-[60px] md:w-[100px] md:h-[100px]"
          />
        </div>
      </div>
    </section>
  );
};

export default VideoSection;