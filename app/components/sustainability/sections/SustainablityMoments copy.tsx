"use client";

import { useRef, useEffect, useState } from "react";
import Image from "next/image";
import { momentsOfSustainability } from "../data";
import { SectionHeading } from "../../animations/SectionHeading";
import { SectionDescription } from "../../animations/SectionDescription";

const DESIGN_WIDTH = 1920;
const TRACK_HEIGHT = 615;

function useTrackScale() {
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const update = () => {
      setScale(Math.max(0.5, Math.min(1, window.innerWidth / DESIGN_WIDTH)));
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  return scale;
}

export default function SustainablityMoments() {
  const slides = momentsOfSustainability.slides;
  const colRefs = useRef<(HTMLDivElement | null)[]>([]);
  const sectionRef = useRef<HTMLElement>(null);
  const rafId = useRef<number>(0);
  const isVisible = useRef(false);
  const frameCount = useRef(0);
  const scale = useTrackScale();
  const hoveredCol = useRef<number | null>(null);
const isMobile = typeof window !== "undefined" && window.innerWidth < 768;
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisible.current = entry.isIntersecting;
        if (entry.isIntersecting) {
          frameCount.current = 0;
          scheduleUpdate();
        } else {
          cancelAnimationFrame(rafId.current);
          colRefs.current.forEach((col) => {
            if (col) col.style.filter = "grayscale(1)";
          });
        }
      },
      { threshold: 0 },
    );

    if (sectionRef.current) observer.observe(sectionRef.current);

    function scheduleUpdate() {
      rafId.current = requestAnimationFrame(update);
    }

    function update() {
      if (!isVisible.current) return;

      // Only recalculate every 3 frames (~20fps) — grayscale transition is 0.5s so imperceptible
      frameCount.current++;
      if (frameCount.current % 3 !== 0) {
        scheduleUpdate();
        return;
      }

      const viewportCenter = window.innerWidth / 2;
      const threshold = window.innerWidth * 0.25;

      const values = colRefs.current.map((col) => {
        if (!col) return null;
        const rect = col.getBoundingClientRect();
        const colCenter = rect.left + rect.width / 2;
        const distance = Math.abs(colCenter - viewportCenter);
        return Math.min(distance / threshold, 1);
      });

      values.forEach((grayscale, i) => {
        if (grayscale === null) return;
        if (hoveredCol.current === i) return;
        const col = colRefs.current[i];
        if (col) col.style.filter = `grayscale(${grayscale})`;
      });

      scheduleUpdate();
    }

    return () => {
      observer.disconnect();
      cancelAnimationFrame(rafId.current);
    };
  }, []);

  const setColRef = (index: number) => (el: HTMLDivElement | null) => {
    colRefs.current[index] = el;
  };

  return (
    <section
      ref={sectionRef}
      className="w-full py-120 3xl:py-130 overflow-hidden"
      data-header="dark"
    >
      <div className="container text-center mb-[40px] md:mb-60">
        <SectionHeading
          title={momentsOfSustainability.title}
          className="uppercase text-foreground mb-20"
        />
        <SectionDescription
          text={momentsOfSustainability.description}
          className="text-description text-foreground-light max-w-[86ch] mx-auto whitespace-pre-line"
        />
      </div>

      <div
        className="relative overflow-hidden"
        style={{ height: `${TRACK_HEIGHT * scale}px` }}
      >
        <div
          style={{
            transform: `scale(${scale})`,
            transformOrigin: "top left",
            width: `${100 / scale}%`,
            willChange: "transform",
          }}
        >
          <div className="flex w-max marquee-track-sustainability">
            
            {/* Replaced 8 stacked backdropFilter divs with a single CSS gradient blur approximation */}
            {/* <div
              className="left-0 bottom-0 absolute w-full h-[60%] z-10 pointer-events-none"
              style={{
                backdropFilter: "blur(6px)",
                WebkitBackdropFilter: "blur(6px)",
                maskImage:
                  "linear-gradient(to bottom, transparent 38%, black 75%, black 100%)",
                WebkitMaskImage:
                  "linear-gradient(to bottom, transparent 38%, black 75%, black 100%)",
                background:
                  "linear-gradient(180deg, rgba(255,255,255,0) 28.62%, rgba(255,255,255,0.19) 130.19%)",
              }}
            /> */}

            {[...slides, ...slides].map((slide, idx) => (
              <div
                key={`${slide.id}-${idx}`}
                className="flex items-end h-[615px] gap-40 pr-40 flex-shrink-0"
              >
                {/* Col A */}
                <div
                  ref={setColRef(idx * 4 + 0)}
                  className="flex flex-col flex-shrink-0 gap-40 h-[615px]"
                  style={{ transition: "filter 0.5s ease" }}
                  onMouseEnter={() => {
                    hoveredCol.current = idx * 4 + 0;
                    const col = colRefs.current[idx * 4 + 0];
                    if (col) col.style.filter = "grayscale(0)";
                  }}
                  onMouseLeave={() => {
                    hoveredCol.current = null;
                  }}
                >
                  {slide.cols[0].images.map((img) => (
                    <div
                      key={img.src}
                      className="relative flex-shrink-0 overflow-hidden"
                      style={{
                        width: `${img.width}px`,
                        height: `${img.height}px`,
                      }}
                    >
                      <Image
                        src={img.src}
                        alt={img.alt}
                        fill
                        className="object-cover object-center pointer-events-none"
                      />
                    </div>
                  ))}
                </div>

                {/* Col B */}
                <div
                  ref={setColRef(idx * 4 + 1)}
                  className="flex flex-col justify-end flex-shrink-0 h-[615px]"
                  style={{ transition: "filter 0.5s ease" }}
                  onMouseEnter={() => {
                    hoveredCol.current = idx * 4 + 1;
                    const col = colRefs.current[idx * 4 + 1];
                    if (col) col.style.filter = "grayscale(0)";
                  }} // 👈
                  onMouseLeave={() => {
                    hoveredCol.current = null;
                  }}
                >
                  {slide.cols[1].images.map((img) => (
                    <div
                      key={img.src}
                      className="relative flex-shrink-0 overflow-hidden"
                      style={{
                        width: `${img.width}px`,
                       height: isMobile ? "100%" : `${img.height}px`,
                      }}
                    >
                      <Image
                        src={img.src}
                        alt={img.alt}
                        fill
                        className="object-cover object-center pointer-events-none"
                      />
                    </div>
                  ))}
                </div>

                {/* Col C */}
                <div
                  ref={setColRef(idx * 4 + 2)}
                  className="flex flex-col flex-shrink-0 gap-40 h-[615px]"
                  style={{ transition: "filter 0.5s ease" }}
                  onMouseEnter={() => {
                    hoveredCol.current = idx * 4 + 2;
                    const col = colRefs.current[idx * 4 + 2];
                    if (col) col.style.filter = "grayscale(0)";
                  }} // 👈
                  onMouseLeave={() => {
                    hoveredCol.current = null;
                  }}
                >
                  {slide.cols[2].images.map((img) => (
                    <div
                      key={img.src}
                      className="relative flex-shrink-0 overflow-hidden"
                      style={{
                        width: `${img.width}px`,
                        height: `${img.height}px`,
                      }}
                    >
                      <Image
                        src={img.src}
                        alt={img.alt}
                        fill
                        className="object-cover object-center pointer-events-none"
                      />
                    </div>
                  ))}
                </div>

                {/* Col D */}
                <div
                  ref={setColRef(idx * 4 + 3)}
                  className="flex flex-col justify-center flex-shrink-0 h-[615px]"
                  style={{ transition: "filter 0.5s ease" }}
                  onMouseEnter={() => {
                    hoveredCol.current = idx * 4 + 3;
                    const col = colRefs.current[idx * 4 + 3];
                    if (col) col.style.filter = "grayscale(0)";
                  }} // 👈
                  onMouseLeave={() => {
                    hoveredCol.current = null;
                  }}
                >
                  <div
                    className="relative overflow-hidden"
                    style={{
                      width: `${slide.peekImage.width}px`,
                      height: slide.peekImage.width < 768 ? "100%" : `${slide.peekImage.height}px`,
                    }}
                  >
                    <Image
                      src={slide.peekImage.src}
                      alt={slide.peekImage.alt}
                      fill
                      className="object-cover object-center pointer-events-none"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
