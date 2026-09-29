"use client";

import Image from "next/image";
import { SectionHeading } from "../../animations/SectionHeading";
import { SectionDescription } from "../../animations/SectionDescription";
import { useGsapStagger } from "../../../hooks/useGsapStagger";
import { useEffect, useState } from "react";
// ── Types ──────────────────────────────────────────────
type EverythingWithinData = {
  title: string;
  specs: {
    key: string;
    value: string;
  }[];
};

type Props = {
  jobSpecs: EverythingWithinData;
};

// ── Component ──────────────────────────────────────────
export default function JobSpecifications({ jobSpecs }: Props) {
  const [isXL, setIsXL] = useState(false);

  useEffect(() => {
    const check = () => setIsXL(window.innerWidth >= 1280);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);
  const gridRef = useGsapStagger({
    selector: ".location-card",
    from: { opacity: 0, y: 40 },
    to: { opacity: 1, y: 0, duration: 0.7, ease: "power3.out" },
    stagger: 0.15,
    start: "top 80%",
  });

  return (
    <section data-header="dark" className={`w-full py-120 3xl:py-130 bg-gray `}>
      <div className="container ">
        <div className="flex flex-col items-start 2xl:!max-w-[1322px] mx-auto content-spacing-mobile-padding">
          {/* Header */}
          <div className="text-center">
            <SectionHeading
              title={jobSpecs.title}
              className="text-heading mb-[50px]"
            />
          </div>

          {/* Cards */}
          <div
            ref={gridRef}
            className="grid grid-cols-2 lg:grid-cols-4 w-full gap-y-6 md:gap-y-[46px] gap-x-[30px] lg:gap-[80px] 2xl:gap-[104px]"
          >
            {jobSpecs.specs.map((loc, i) => (
              <div key={i} className="flex justify-between">
                <div className="location-card relative flex flex-col justify-start gap-20 md:py-3 xl:py-[18px]">
                  {/* Label */}
                  <p
                    className="text-foreground font-[optima] text-25 leading-[1.4] uppercase text-trim"
                    dangerouslySetInnerHTML={{ __html: loc.key }}
                  />

                  {/* Minutes */}
                  <p className="text-description text-foreground-light text-trim">
                    {loc.value}
                  </p>
                </div>

                {/* Hide divider for last item */}
                {i !== jobSpecs.specs.length - 1 && (
                  <div
                    className={`left-0 top-0 w-px h-full ${i === 1 ? "hidden lg:block" : ""}`}
                    style={{
                      background:
                        "linear-gradient(rgba(73, 9, 5, 0) 0%, rgb(73 9 5 / 70%) 50%, rgba(73, 9, 5, 0) 100%)",
                    }}
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
