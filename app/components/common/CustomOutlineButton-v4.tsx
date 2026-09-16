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
  minWidth?: boolean;
  readMore?:boolean;

}

const CustomOutlineButton = ({

  className,
  text,
  borderColor = "border-white/90",
  textColor = "text-white",
  px = "px-10",
  onClick,
  variant = "light",
  minWidth = true,
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
      // v4: below `md` the button is locked to 32px height / 16px horizontal
      // padding via `max-md:` overrides. `md` and up stay identical to the
      // original CustomOutlineButton.
      className={`cursor-pointer flex items-center justify-center group relative transition-all duration-300 overflow-hidden ${px} py-[14px] lg:py-4 2xl:py-[19px] 3xl:py-[20.62px] max-md:h-[32px] max-md:py-0 max-md:px-[16px] rounded-full border ${borderColor} ${textColor} font-[avenirBook] leading-[100%] ${className} ${readMore ? "text-[12px] md:text-[16px]" : "text-[12px] md:text-[16px] md:text-[19px]" }`}
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
          className={`relative z-10 transition-colors duration-300 font-normal ${minWidth ? "md:min-w-[98px]" : ""} inline-block text-center ${variant === "dark" ? "group-hover:text-white" : ""}`}
        >
          {text}
        </span>
      </div>
    </button>
  );
};

export default CustomOutlineButton;
