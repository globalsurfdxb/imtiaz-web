"use client";

import Image from "next/image";
import { forwardRef } from "react";

type SliderArrowButtonProps = {
  onClick?: () => void;
  direction?: "prev" | "next";
  variant?: "dark" | "light";
  disabled?: boolean;
  arrowColor?: "dark" | "light";
};

const SliderArrowButton = forwardRef<HTMLButtonElement, SliderArrowButtonProps>(
  ({ onClick, direction = "prev", variant = "dark", disabled = false, arrowColor = "light" }, ref) => {
    const isNext = direction === "next";
    const isDark = variant === "dark";
const arrowIconClass =
  arrowColor === "dark"
    ? isDark
      ? "brightness-0 sm:brightness-100 sm:group-hover:invert sm:group-hover:brightness-0"
      : "brightness-0 sm:invert sm:group-hover:invert-0 sm:group-hover:brightness-100"
    : isDark
      ? "group-hover:invert group-hover:brightness-0"
      : "invert brightness-0 group-hover:invert-0 group-hover:brightness-100";

    return (
      <button
        ref={ref}
        onClick={onClick}
        disabled={disabled}
        aria-disabled={disabled}
        // v4: 32px below `md`, 50px from `md` up — same height as CustomOutlineButton-v4.
        className={`relative w-[32px] h-[32px] md:w-[50px] md:h-[50px] shrink-0 group rounded-[50px] flex items-center justify-center overflow-hidden transition-opacity duration-300 ${isDark ? "border border-[#404040]" : "border border-white"} ${disabled ? "opacity-30 cursor-not-allowed pointer-events-none" : "cursor-pointer"}`}
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
          className={`relative z-10 object-contain w-[14px] h-[14px] md:w-[21px] md:h-[21px] lg:w-[22px] lg:h-[22px] transition-all duration-300 ${isNext ? "rotate-180" : ""} ${arrowIconClass}`}
        />
      </button>
    );
  }
);

SliderArrowButton.displayName = "SliderArrowButton";

export default SliderArrowButton;