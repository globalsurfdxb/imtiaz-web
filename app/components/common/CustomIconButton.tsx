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
  icondownload?: boolean;
  iconColor?: string;
  icon360?: boolean;
}

const CustomIconButton = ({
  icondownload = false,
  icon360 = false,
  iconColor,
  className,
  text,
  borderColor = "border-white/90",
  textColor = "text-white",
  px = "px-10",
  onClick,
  variant = "light",
  minWidth = true,
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
      className={`cursor-pointer flex items-center justify-center group relative transition-all duration-300 ${className} overflow-hidden ${px} py-[14px] lg:py-4 2xl:py-[19px] 3xl:py-[20.62px] rounded-full border ${borderColor} ${textColor} font-[avenirBook] text-19 leading-[100%]`}
      style={{ transform: pressed ? "scale(0.95)" : "scale(1)" }}
    >
      {/* Left fill */}
      <div className="flex items-center gap-[10px] 2xl:gap-[10px]">
        {icondownload && (
          <Image
            src="/icons/download.svg"
            alt="download"
            width={24}
            height={24}
            className={`relative z-20 ${
              iconColor === "dark"
                ? "brightness-100 invert-0 group-hover:brightness-0 group-hover:invert"
                : "brightness-0 invert "
            }`}
          />
        )}
        {icon360 && (
          <Image
            src="/images/icons/icon360.svg"
            alt="download"
            width={30}
            height={30}
            className={`relative z-20 ${
              iconColor === "dark"
                ? "brightness-100 invert-0 group-hover:brightness-0 group-hover:invert"
                : "brightness-0 invert "
            }`}
          />
        )}
        <span
          className={`absolute inset-y-0 left-0 w-[50%] ${fillColor} transform scale-x-0 origin-left transition-transform duration-300 ease-out group-hover:scale-x-100`}
        />
        {/* Right fill */}
        <span
          className={`absolute inset-y-0 right-0 w-[50%] ${fillColor} transform scale-x-0 origin-right transition-transform duration-300 ease-out group-hover:scale-x-100`}
        />
        <span
          className={`relative z-10 max-md:mt-1 transition-colors duration-300 uppercase inline-block text-center ${variant === "dark" ? "group-hover:text-white" : ""}`}
        >
          {text}
        </span>
      </div>
    </button>
  );
};

export default CustomIconButton;
