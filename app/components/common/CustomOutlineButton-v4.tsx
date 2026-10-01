"use client";
import Image from "next/image";
import { useState } from "react";

interface OutlineButtonProps {
  text: string;
  borderColor?: string;
  px?: string;
  textColor?: string;
  onClick?: () => void;
  variant?: "light" | "dark";
  className?: string;
  readMore?:boolean;

}

const CustomOutlineButton = ({

  className,
  text,
  borderColor = "border-white/90",
  textColor = "text-white",
  px = "",
  onClick,
  variant = "light",
  readMore
}: OutlineButtonProps) => {
  const fillColor = variant === "dark" ? "bg-primary-2" : "bg-white/10";
  const [pressed, setPressed] = useState(false);

  const handlePress = () => {
    setPressed(true);
    setTimeout(() => setPressed(false), 200); // hold scale for 200ms even on quick tap
  };

  return (
    <button
      onClick={onClick}
      onMouseDown={handlePress}
      onTouchStart={handlePress}
      // v4: height is locked (32px below `md`, 50px from `md` up) so it always
      // matches SliderNavigationButton-v4; `!` wins over heights passed via `px`.
      className={`cursor-pointer flex items-center justify-center group relative transition-all duration-300 overflow-hidden !py-0 !h-[32px] md:!h-[50px] px-[16px] md:px-[30px] ${px} rounded-full border ${borderColor} ${textColor} font-[avenirBook] leading-[100%] ${className} ${readMore ? "text-[12px] md:text-[16px]" : "text-[12px] md:text-[16px] md:text-[19px]" }`}
      style={{ transform: pressed ? "scale(0.95)" : "scale(1)" }}
    >
      {/* Left fill */}
      <div className="flex items-center gap-[10px] 2xl:gap-[10px]">

        <span
          className={`absolute inset-y-0 left-0 w-[50%] ${fillColor} transform scale-x-0 origin-left transition-transform duration-300 ease-out group-hover:scale-x-100`}
        />
        {/* Right fill */}
        <span
          className={`absolute inset-y-0 right-0 w-[50%] ${fillColor} transform scale-x-0 origin-right transition-transform duration-300 ease-out group-hover:scale-x-100`}
        />
        <span
          className={`shrink-0 relative z-10 transition-colors duration-300 font-normal inline-block text-center ${variant === "dark" ? "group-hover:text-white" : ""}`}
        >
          {text}
        </span>
      </div>
    </button>
  );
};

export default CustomOutlineButton;
