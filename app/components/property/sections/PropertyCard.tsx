// components/PropertyCard.tsx
import React from "react";
import Link from "next/link";
import CustomOutlineButton from "@/app/components/common/CustomOutlineButton";

import type { ProjectCardType } from "@/types/cardtype";
import Image from "next/image";

export default function PropertyCard({
  id,
  image,
  status,
  location,
  title,
  subtitle,
  startingFrom,
  units,
  hoverImage,
  setActiveProject,
}: ProjectCardType) {
  const breakWord = "by Imtiaz";

  const parts = title.split(new RegExp(`(${breakWord})`, "i"));
  return (
    <div className="grid grid-cols-1 xl:grid-cols-[252px_auto] 2xl:grid-cols-[292px_auto]      ">
      {/* Image Section */}
      <div className="relative h-[198px] md:h-[400px] xl:h-full w-full bg-gray-200">
        <Image
          src={image}
          alt="Beach Walk Grand 2 by Imtiaz"
          fill
          className="object-cover"
        />
        {/* "OFF PLAN" Badge */}
      </div>

      {/* Content Section  */}
      <div className="p-5 md:p-[30px] xl:p-[15px] 2xl:p-20 bg-gray">
        <div className="m-auto mb-5 lg:mb-30  bg-foreground-light/10 backdrop-blur-[30px] text-foreground text-description uppercase  px-[15px] py-[1.5] rounded-full w-fit">
          {status}
        </div>
        {/* Title */}
        <h3 className="text-25 2xl:text-[24px] font-[optima] tracking-[2%] text-center pb-1 md:pb-4 uppercase">
          {parts.length > 1 ? (
            <>
              {parts[0]}
              <br className="" />
              {breakWord}
            </>
          ) : (
            title
          )}
        </h3>

        {/* Location */}
        <div className="flex items-center gap-3 justify-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="19"
            height="22"
            viewBox="0 0 19 22"
            fill="none"
          >
            <path
              d="M9.34539 12.149C11.0689 12.149 12.4662 10.7518 12.4662 9.02825C12.4662 7.30469 11.0689 5.90747 9.34539 5.90747C7.62183 5.90747 6.22461 7.30469 6.22461 9.02825C6.22461 10.7518 7.62183 12.149 9.34539 12.149Z"
              stroke="#404040"
              strokeWidth="1.44"
            />
            <path
              d="M0.96352 7.2116C2.93401 -1.45057 15.7672 -1.44057 17.7277 7.2216C18.878 12.3029 15.7172 16.6039 12.9465 19.2646C10.936 21.2051 7.75522 21.2051 5.73471 19.2646C2.97402 16.6039 -0.186768 12.2929 0.96352 7.2116Z"
              stroke="#404040"
              strokeWidth="1.44"
            />
          </svg>
          <span className="text-16 leading-[1.563] uppercase">{location}</span>
        </div>

        <div
          className={`my-5 md:my-30 flex   lg:flex-row items-center sm:items-start md:items-center justify-between gap-30 lg:gap-5 xl:gap-3 2xl:gap-5 3xl:gap-40 w-full py-[2.32px] transition-transform duration-500 delay-100 `}
        >
          <div className="flex items-center gap-[10px]">
            <div className="xl:w-[49px] xl:h-[49px] w-[44px] h-[44px] rounded-full bg-foreground/10 backdrop-blur-[18px] will-change-transform transform-gpu flex items-center justify-center shrink-0">
              <svg
                className="w-[22px] h-[15px] md:w-[25px] md:h-[18px]"
                viewBox="0 0 25 18"
                fill="none"
              >
                <path
                  d="M8.72021 8.72022C8.72021 6.51022 10.5102 4.72021 12.7202 4.72021C14.9302 4.72021 16.7202 6.51022 16.7202 8.72022C16.7202 10.9302 14.9302 12.7202 12.7202 12.7202C10.5102 12.7202 8.72021 10.9302 8.72021 8.72022Z"
                  stroke="#404040"
                  strokeWidth="1.44"
                />
                <path
                  d="M23.7202 16.7202H0.720215V0.720215H23.7202V16.7202Z"
                  stroke="#404040"
                  strokeWidth="1.44"
                />
              </svg>
            </div>
            <div className="flex flex-col items-baseline gap-1">
              <span className="text-foreground text-description min-[1280px]:max-[1340px]:text-[14px] text-left">
                Starting From
              </span>
              <span className="text-foreground text-description min-[1280px]:max-[1340px]:text-[14px] text-left">
                {startingFrom}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-[10px]">
            <div className="xl:w-[49px] xl:h-[49px] w-[44px] h-[44px] rounded-full bg-foreground/10 backdrop-blur-[18px] will-change-transform transform-gpu flex items-center justify-center shrink-0">
              <svg
                className="w-[19px] h-[16px] md:w-[22px] md:h-[19px]"
                viewBox="0 0 22 19"
                fill="none"
              >
                <path
                  d="M17.7058 8.91778V2.33544C17.7058 1.44478 17.5743 0.720215 16.8603 0.720215H4.27831C3.56435 0.720215 2.98352 1.44484 2.98352 2.33544L2.85947 8.91778M19.0473 14.7982H20.009C20.3926 14.7982 20.7047 14.4088 20.7047 13.9303V11.0997C20.7048 10.2045 21.0277 8.91778 18.7251 8.91778H3.052H1.38263C0.719653 8.91778 0.720215 10.4744 0.720215 11.3229V13.9303C0.720215 14.1871 0.887648 14.396 1.09354 14.396H20.0091M2.85947 17.7202V14.8341M18.1551 17.7202L18.1551 14.8341H18.7251"
                  stroke="#404040"
                  strokeWidth="1.44"
                  strokeLinecap="round"
                />
              </svg>
            </div>
            <div className="flex flex-col items-baseline gap-1">
              <span className="text-foreground text-description min-[1280px]:max-[1340px]:text-[14px] text-left">
                Units
              </span>
              <span className="text-foreground text-description min-[1280px]:max-[1340px]:text-[14px] text-left">
                {units}
              </span>
            </div>
          </div>
        </div>

        <Link
          href={`/properties/${title
            .replace(/<br\s*\/?>/gi, "")
            .toLowerCase()
            .replace(/\s+/g, "-")}`}
        >
          <CustomOutlineButton
            className="w-fit mx-auto h-[44px] md:h-[50px] xl:h-[58px]"
            text="View Property"
            px="py-[16px] px-[29.4px] sm:px-[20px] lg:px-[25px] 2xl:px-[30px] 3xl:px-10 "
            borderColor="border-primary-2"
            textColor="text-primary-2"
            variant="dark"
          />
        </Link>
      </div>
    </div>
  );
}
