"use client";

import { useRef, useState } from "react";
import Image from "next/image";

const VideoSection = ({
  image,
  mobileImage,
  video,
  mobileVideo,
}: {
  image: string;
  mobileImage: string;
  video: string;
  mobileVideo: string;
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const desktopVideoRef = useRef<HTMLVideoElement>(null);
  const mobileVideoRef = useRef<HTMLVideoElement>(null);
  const [hasStarted, setHasStarted] = useState(false);

  const handlePlay = () => {
    setHasStarted(true);
    desktopVideoRef.current?.play();
    mobileVideoRef.current?.play();
  };

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
              opacity: hasStarted ? 0 : 1,
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
              opacity: hasStarted ? 0 : 1,
            }}
          />
        </div>

        {/* Video */}
        <div className="absolute inset-0 z-10">
          <video
            ref={desktopVideoRef}
            src={video}
            playsInline
            controls={hasStarted}
            className="hidden lg:block w-full h-full object-cover"
            style={{
              opacity: hasStarted ? 1 : 0,
              pointerEvents: hasStarted ? "auto" : "none",
            }}
          />
          <video
            ref={mobileVideoRef}
            src={mobileVideo}
            playsInline
            controls={hasStarted}
            className="lg:hidden w-full h-full object-cover"
            style={{
              opacity: hasStarted ? 1 : 0,
              pointerEvents: hasStarted ? "auto" : "none",
            }}
          />
        </div>

        {/* Overlay */}
        {!hasStarted && (
          <div className="absolute inset-0 z-20 bg-black/70 pointer-events-none" />
        )}

        {/* Play Button */}
        {!hasStarted && (
          <div
            className="absolute inset-0 z-[1000] flex items-center justify-center cursor-pointer"
            onClick={handlePlay}
          >
            <Image
              src="/images/initiative-details/play-video.svg"
              alt="play-video"
              width={100}
              height={100}
              className="w-[60px] h-[60px] md:w-[100px] md:h-[100px]"
            />
          </div>
        )}
      </div>
    </section>
  );
};

export default VideoSection;