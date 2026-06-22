"use client";

import { useState, useRef, useEffect } from "react";
import { faqData, FAQItem } from "../data";
import { SectionHeading } from "../../animations/SectionHeading";
import { SectionDescription } from "../../animations/SectionDescription";
import Reveal from "../../animations/RevealOneByOneAnimation";
import { moveUpV2 } from "../../motionVariants";

function AccordionItem({
  item,
  isOpen,
  onToggle,
  isLast,
}: {
  item: FAQItem;
  isOpen: boolean;
  onToggle: () => void;
  isLast: boolean;
}) {
  const contentRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);

useEffect(() => {
  if (!contentRef.current) return;
  if (!isOpen) return;

  const raf = requestAnimationFrame(() => {
    if (contentRef.current) {
      // Temporarily remove transition to get accurate measurement
      contentRef.current.style.transition = "none";
      contentRef.current.style.paddingBottom = isLast ? "10px" : "30px";
      contentRef.current.style.paddingTop = isLast ? "20px" : "";
      contentRef.current.style.paddingTop = isOpen ? "0px" : "20px";
      setHeight(contentRef.current.scrollHeight);
      // Restore transition
      contentRef.current.style.transition = "padding-bottom 0.4s ease";
    }
  });
  return () => cancelAnimationFrame(raf);
}, [isOpen, item.caption, isLast]);

  return (
    <div>
<button
  onClick={onToggle}
  style={{
    paddingBottom: isOpen ? "20px" : undefined,
    transition: "padding-bottom 0.4s ease",
  }}
  className={`w-full flex items-start sm:items-center justify-between cursor-pointer gap-20 ${
    isLast ? "pt-20 md:pt-40" : "py-20 md:py-40"
  } text-left group focus:outline-none`}
  aria-expanded={isOpen}
>
        <span className="text-25 uppercase text-foreground pr-2 leading-[1.4] font-[optima] font-[400]">
          {item.title}
        </span>
        <span className="flex-shrink-0 select-none">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 18 18" fill="none">
            <path d="M0.720703 8.71997H16.7207" stroke="#490905" strokeWidth="1.44" strokeLinecap="round" strokeLinejoin="round" />
            <path
              d="M8.7207 16.72V0.719971"
              stroke="#490905"
              strokeWidth="1.44"
              strokeLinecap="round"
              strokeLinejoin="round"
              style={{
                transform: isOpen ? "scaleY(0)" : "scaleY(1)",
                transformOrigin: "center",
                transition: "transform 0.3s ease",
              }}
            />
          </svg>
        </span>
      </button>

      {/* Outer wrapper animates height + opacity */}
      <div
        style={{
          height: isOpen ? height : 0,
          overflow: "hidden",
          opacity: isOpen ? 1 : 0,
          transition: "height 0.4s ease, opacity 0.4s ease",
        }}
      >
        {/* Inner div — padding animates via transition too */}
        <div
          ref={contentRef}
          style={{
            paddingBottom: isOpen ? (isLast ? "10px" : "30px") : "0px",
            transition: "padding-bottom 0.4s ease",
          }}
        >
          <p className="text-description text-foreground-light max-w-[846px]">
            {item.caption}
          </p>
        </div>
      </div>

      {!isLast && (
        <div className="relative h-px w-full bg-black/10">
          <div
            className={`absolute inset-y-0 left-0 bg-primary-2 transition-all duration-500 ease-in-out ${
              isOpen ? "w-full" : "w-0"
            }`}
          />
        </div>
      )}
    </div>
  );
}

export default function Faq({title,description,data}:{title:string,description:string,data:FAQItem[]}) {
  const [openId, setOpenId] = useState<number | null>(0);

  const toggle = (id: number) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <section
      className="w-full py-[70px] lg:py-120 3xl:py-160 "
      data-header="dark"
    >
      <div className="container">
        {/* Header */}
        <div className="w-full flex flex-col items-center text-center mb-[10px]">
          {title && <SectionHeading title={title} className="mb-20 text-foreground" />}
          {description && <SectionDescription text={description} className="shrink-0 max-w-[407px] text-foreground-light" />}
        </div>

        {/* Accordion */}
        <div className="max-w-[973px] mx-auto">
          {(data || []).map((item, index) => (
            <Reveal variants={moveUpV2} key={index} >

            <AccordionItem
              item={item}
              isOpen={openId === index}
              onToggle={() => toggle(index)}
              isLast={index === data.length - 1}
              />
              </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
