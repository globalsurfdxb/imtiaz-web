"use client";

import Image from "next/image";
import { forwardRef } from "react";

type SliderArrowButtonProps = {
  onClick?: () => void;
  direction?: "prev" | "next";
  variant?: "dark" | "light";
  disabled?: boolean;
};

const SliderArrowButton = forwardRef<HTMLButtonElement, SliderArrowButtonProps>(
  ({ onClick, direction = "prev", variant = "dark", disabled = false }, ref) => {
    const isNext = direction === "next";
    const isDark = variant === "dark";

    return (
      <button
        ref={ref}
        onClick={onClick}
        disabled={disabled}
        aria-disabled={disabled}
        // v4: below `md` the round nav button is locked to 32px. `md` and up unchanged.
        className={`relative w-[50px] h-[50px] max-md:w-[32px] max-md:h-[32px] 3xl:w-[62px] 3xl:h-[62px] group rounded-[50px] flex items-center justify-center overflow-hidden transition-opacity duration-300 ${isDark ? "border border-[#404040]" : "border border-white"} ${disabled ? "opacity-30 cursor-not-allowed pointer-events-none" : "cursor-pointer"}`}
      >
        {/* Hover fill */}
        <span
          className={`absolute top-0 h-full w-0 transition-all duration-300 group-hover:w-full z-0 ${isNext ? "left-0" : "right-0"} ${isDark ? "bg-primary" : "bg-white/30"}`}
        />

        <Image
          src="/icons/left_arrow_slider_primary.svg"
          alt={isNext ? "Next" : "Previous"}
          width={28}
          height={28}
          className={`relative z-10 object-contain 3xl:w-[28px] 3xl:h-[28px] lg:w-[22px] lg:h-[22px] w-[21px] h-[21px] max-md:w-[14px] max-md:h-[14px] transition-all duration-300 ${isNext ? "rotate-180" : ""} ${isDark ? "group-hover:invert group-hover:brightness-0" : "invert brightness-0 group-hover:invert-0 group-hover:brightness-100"}`}
        />
      </button>
    );
  }
);

SliderArrowButton.displayName = "SliderArrowButton";

export default SliderArrowButton;