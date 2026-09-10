"use client";

import { useState, useEffect, useRef } from "react";

type Props = {
  titleRef: React.RefObject<HTMLHeadingElement | null>;
  desktopVideo: string;
  mobileVideo: string;
  title: string;
  posterDesktop: string;
  posterMobile: string;
};

export default function HeroSection({
  titleRef,
  desktopVideo,
  mobileVideo,
  title,
  posterDesktop,
  posterMobile,
}: Props) {
  const [isVisible, setIsVisible] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setIsVisible(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);
  return (
    <>
      <section
        id="sec1"
        className="h-[100svh] bg-black text-white flex items-center justify-center relative text-center sticky top-0 z-0"
      >
        <div className="relative w-full h-screen overflow-hidden flex items-center justify-center text-center">
          {/* Portrait video — mobile only */}
          <video
            className="absolute top-0 left-0 w-full object-cover h-[99.9%] block md:hidden"
            src={mobileVideo}
            poster={posterMobile}
            autoPlay
            loop
            muted
            playsInline
          />
          {/* Landscape video — tablet and above */}
          <video
            className="absolute top-0 left-0 w-full object-cover h-[99.9%] hidden md:block"
            src={desktopVideo}
            poster={posterDesktop}
            autoPlay
            loop
            muted
            playsInline
          />

          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.3)_1.12%,rgba(0,0,0,0.15)_40.24%,rgba(0,0,0,0.75)_100%)] pointer-events-none" />
          <div className="absolute w-full">
            <div className="relative overflow-hidden">
              <h1
                ref={titleRef}
                className="text-heading uppercase text-white opacity-0 max-w-[25ch] sm:max-w-[135ch] container"
              >
                {title.split(/(?<=\.)/).map((item, index) => (
                  <span key={index}>
                    {item.trim()}
                    <br />
                  </span>
                ))}
              </h1>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
