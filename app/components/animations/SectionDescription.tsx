"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface SectionDescriptionProps {
  text: string;
  className?: string;
  as?: "p" | "span" | "div";
  delay?: number;
}

export function SectionDescription({
  text,
  className = "",
  as: Tag = "p",
  delay = 0,
}: SectionDescriptionProps) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        {
          opacity: 0,
          y: 60,
          filter: "blur(2px)",
        },
        {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          duration: 1.3,
          ease: "power4.out",
          delay,
          scrollTrigger: {
            trigger: el,
            start: "top 90%",
            once: true,
          },
        },
      );
    }, el);

    return () => ctx.revert();
  }, [text, delay]);  

  return (
    <Tag
      ref={
        ref as React.RefObject<
          HTMLParagraphElement & HTMLSpanElement & HTMLDivElement
        >
      }
      className={`text-description text-trim ${className}`}
    >
      {text}
    </Tag>
  );
}
