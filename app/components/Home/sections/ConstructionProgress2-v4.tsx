"use client";

import React from "react";
import CustomOutlineButton from "../../common/CustomOutlineButton-v4";
import Link from "next/link";

interface ConstructionProgressProps {
  data: {
    title: string;
    videoSrc: string;
    posterSrc: string;
    description: string;
    button: {
      label: string;
      link: string;
    };
  };
  video: string;
  title: string;
  description: string;
  buttonText: string;
  url: string;
  poster: string;
}

const ConstructionProgress: React.FC<ConstructionProgressProps> = ({
  data,
  video,
  title,
  description,
  buttonText,
  url,
  poster,
}) => {

  return (
    <section
      // className="relative w-full overflow-hidden flex justify-center items-center h-[82vh] md:h-[70vh] lg:h-[75vh] xl:h-screen"
      className="relative w-full overflow-hidden flex justify-center items-center h-[100svh] bg-black"
    >
      {/* ---------------- BACKGROUND VIDEO ---------------- */}
      <video
        src={video}
        poster={poster}
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover z-[1] scale-[1.5]"
      />

      {/* ---------------- OVERLAY ---------------- */}
      {/* <div className="absolute inset-0 z-[2] bg-black/60" /> */}

      {/* ---------------- TEXT ---------------- */}
      <div
        className="relative z-[5] text-center max-w-[900px] container content-spacing-mobile"
      >
        <div className="overflow-hidden">
          <h2 className="anim-item text-white   text-heading mb-5 max-w-[20ch] uppercase mx-auto">
            {title}
          </h2>
        </div>
        <div className="overflow-hidden">
          <p className="anim-item text-white  text-description max-w-[60ch] mx-auto mb-5 sm:mb-[50px]">
            {description}
          </p>
        </div>
        <div className="overflow-hidden">
          <div className="anim-item">
            <Link href={url}>
              <CustomOutlineButton
                text={buttonText}
                px="px-[30px] 3xl:px-[40.4px] mx-auto h-[44px] md:h-[50px]  xl:h-[66px]"
              />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ConstructionProgress;
