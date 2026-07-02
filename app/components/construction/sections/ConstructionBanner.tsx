"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import Breadcrumb from "../../common/Breadcrumb";
import { AnimatedHeading } from "../../animations/AnimateHeading";
import FeatureSlider from "./FeatureSlider";

// ─── Types ───────────────────────────────────────────────────────────────────
interface Feature {
  key: string;
  value: string | number;
}

interface ContactBannerProps {
  video: string;
  title: string;
  description?: string;
  features?: Feature[];
  mobileVideo?:string;
}

// ─── Animation constants ─────────────────────────────────────────────────────
const CONTENT_DELAY = 0.6;
const FEATURES_DELAY = CONTENT_DELAY + 0.3;

// ─── Separator ───────────────────────────────────────────────────────────────
const GradientSeparator = () => (
  <div
    className="w-px self-stretch"
    style={{
      border: "none",
      background:
        "linear-gradient(180deg, rgba(255,255,255,0) 0%, #FFFFFF 50%, rgba(255,255,255,0) 100%)",
      width: "1px",
      minHeight: "60px",
    }}
  />
);

// ─── Component ───────────────────────────────────────────────────────────────
const ConstructionBanner = ({
  video,
  title,
  description,
  features,
  mobileVideo
}: ContactBannerProps) => {
  const breadcrumbRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const featuresRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Breadcrumb slide up
      if (breadcrumbRef.current) {
        gsap.fromTo(
          breadcrumbRef.current,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.65,
            ease: "power3.out",
            delay: CONTENT_DELAY - 0.2,
          },
        );
      }

      // Title + description fade up
      if (contentRef.current) {
        gsap.fromTo(
          contentRef.current,
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            duration: 0.9,
            ease: "power3.out",
            delay: CONTENT_DELAY,
          },
        );
      }

      // Features slide up from bottom
      if (featuresRef.current) {
        gsap.fromTo(
          featuresRef.current,
          { y: 120, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1,
            ease: "power3.out",
            delay: FEATURES_DELAY,
          },
        );
      }
    });

    return () => ctx.revert();
  }, []);

  return (
    <section
      className="relative w-full h-[100dvh] overflow-hidden"
      data-header="light"
    >
      <div className="container">
        {/* ── Video Background ── */}
        <div className="absolute inset-0 will-change-transform">
          <video
            src={video}
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover object-center 2xl:object-bottom hidden lg:block"
          />

          <video
            src={mobileVideo ? mobileVideo : video}
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover object-center 2xl:object-bottom lg:hidden"
          />

        </div>
        {/* ── Dark Overlay ── */}
        <div className="absolute inset-0 bg-black/50" />
        {/* ── Main Content (title + description + breadcrumb) ── */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
          <div>
            <AnimatedHeading
              title={title}
              className="mb-[8px] md:mb-20 text-white"
              mode="blade"
            />
            {description && (
              <p className="text-white/80 text-description mx-auto text-center flex items-center justify-center max-w-[760px] whitespace-pre-line">
                {description}
              </p>
            )}
          </div>
        </div>

        {/* ── Breadcrumb + Features pinned to bottom ── */}
        <div className="absolute bottom-0 left-0 right-0">
          <div
            ref={breadcrumbRef}
            className="opacity-0 flex justify-center mb-60 3xl:mb-[64px]"
          >
            <Breadcrumb />
          </div>
          {features && features.length > 0 && (
            <div ref={featuresRef} className="opacity-0">
              <FeatureSlider features={features} />
            </div>
          )}
        </div>
      </div>

      {features && features.length > 0 && (
        <div className="absolute bottom-0 left-0 right-0">
          <div ref={featuresRef} className="opacity-0">
            <FeatureSlider features={features} />
          </div>
        </div>
      )}
    </section>
  );
};

export default ConstructionBanner;
