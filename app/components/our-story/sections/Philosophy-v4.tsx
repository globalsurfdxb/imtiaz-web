"use client";

import { useEffect, useRef } from "react";
import { SectionDescription } from "../../animations/SectionDescription";
import { SectionHeading } from "../../animations/SectionHeading";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Philosophy = ({title,description}:{title:string,description:string}) => {
  const sectionRef = useRef<HTMLElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const overlay = overlayRef.current;
    if (!section || !overlay) return;

    gsap.set(overlay, { clipPath: "inset(0 0% 0 0)" });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: "top 90%",   // starts when section top hits 80% down viewport
        end: "top 50%",     // finishes when section top hits 20% down viewport
        scrub: 1.2,         // lag for buttery smoothness — increase for more drift
      },
    });

    tl.to(overlay, {
      clipPath: "inset(0 100% 0 0)",
      ease: "none",         // scrub handles easing via lag; keep ease linear here
    });

    return () => {
      tl.kill();
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      data-header="dark"
      style={{
        background:
          "radial-gradient(50% 50% at 50% 50%, #61120D 0%, #490905 100%)",
      }}
      className="relative w-full py-[50px] lg:py-120 3xl:py-130 overflow-hidden"
    >
      {/* White/30 wipe overlay — clips away right→left on scroll */}
      <div
        ref={overlayRef}
        className="absolute inset-0 z-10 pointer-events-none bg-white/5"
      />

      <div className="relative z-20 container mx-auto">
        <div className="flex flex-col items-center content-spacing-mobile-padding">
          <SectionHeading
            title={title}
            className="text-white mb-20 text-center"
          />
          <SectionDescription
            text={description}
            className="text-white/80 max-w-[82ch] lg:max-w-[102ch] 3xl:max-w-[140ch] text-center lg:whitespace-pre-line"
          />
        </div>
      </div>
    </section>
  );
};

export default Philosophy;