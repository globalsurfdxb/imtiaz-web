"use client";

import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import CustomOutlineButton from "../../common/CustomOutlineButton";
import Link from "next/link";

gsap.registerPlugin(ScrollTrigger);

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
  const videoRef = useRef<HTMLVideoElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  const initGSAP = () => {
    const video = videoRef.current;
    const section = sectionRef.current;
    const textBox = textRef.current;

    if (!video || !section || !textBox) return;

    // Select only animatable items
    const items = textBox.querySelectorAll(".anim-item");

    const ctx = gsap.context(() => {
      /* --- PARALLAX VIDEO --- */
      gsap.fromTo(
        video,
        { y: "25vh" },
        {
          y: "-25vh",
          ease: "none",
          scrollTrigger: {
            trigger: section,
            scrub: true,
            start: "top bottom",
            end: "bottom top",
          },
        },
      );

      /* --- TEXT FADE IN --- */
      gsap.fromTo(
        items,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.2,
          stagger: 0.65,
          ease: "power3.out",
          scrollTrigger: {
            trigger: section,
            start: "top center",
            toggleActions: "play none none reverse",
            markers: false,
          },
        },
      );
    });

    ScrollTrigger.refresh();
    return () => ctx.revert();
  };

  /* -----------------------------
     WAIT FOR main page READY event
  ----------------------------- */
  useEffect(() => {
    const listener = () => initGSAP();
    window.addEventListener("homeAnimationsReady", listener);

    return () => window.removeEventListener("homeAnimationsReady", listener);
  }, []);

  return (
    <section
      ref={sectionRef}
      // className="relative w-full overflow-hidden flex justify-center items-center h-[82vh] md:h-[70vh] lg:h-[75vh] xl:h-screen"
      className="relative w-full overflow-hidden flex justify-center items-center h-screen bg-black"
    >
      {/* ---------------- BACKGROUND VIDEO ---------------- */}
      <video
        ref={videoRef}
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
        ref={textRef}
        className="relative z-[5] text-center px-6 max-w-[900px]"
      >
        <div className="overflow-hidden">
          <h2 className="anim-item text-white   text-heading mb-5 max-w-[20ch] uppercase mx-auto">
            {title}
          </h2>
        </div>
        <div className="overflow-hidden">
          <p className="anim-item text-white  text-description max-w-[60ch] mx-auto mb-[50px]">
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
