"use client";

import { useState, useRef, useEffect } from "react";
import { faqData } from "../data";
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
  item: (typeof faqData.items)[0];
  isOpen: boolean;
  onToggle: () => void;
  isLast: boolean;
}) {
  const contentRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    if (contentRef.current) {
      setHeight(contentRef.current.scrollHeight);
    }
  }, [item.answer]);

  return (
    <div>
      {/* Question Row */}
      <button
        onClick={onToggle}
        // className={`${isOpen ? "2xl:pb-20" : ""} w-full flex items-start sm:items-center justify-between cursor-pointer gap-20 ${isLast ? `pt-40 ${!isOpen ? "pb-30" : ""}` : "py-40"} text-left group focus:outline-none`}
        className={`${isOpen ? "pb-[10px] md:pb-20" : ""} w-full flex items-start sm:items-center justify-between cursor-pointer gap-20 ${isLast ? `pt-5 md:pt-40` : "py-5 md:py-40"} text-left group focus:outline-none`}
        aria-expanded={isOpen}
      >
        <span className="text-[18px] md:text-25 uppercase text-foreground pr-2 leading-[1.4] font-[optima] font-[400]">
          {item.question}
        </span>
        <span className="flex-shrink-0 select-none">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 18 18"
            fill="none"
          >
            <path
              d="M0.720703 8.71997H16.7207"
              stroke="#490905"
              strokeWidth="1.44"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
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

      {/* Answer — animates to exact height */}
      <div
        style={{
          height: isOpen ? height : 0,
          overflow: "hidden",
          transition: "height 0.4s ease, opacity 0.4s ease",
          opacity: isOpen ? 1 : 0,
        }}
      >
        <div ref={contentRef}>
          <p className={`text-description text-foreground-light max-w-[846px] ${!isLast ? "pb-30" : ""}`}>
            {item.answer}
          </p>
        </div>
      </div>

      {/* Divider */}
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

export default function StudioFaq() {
  const [openId, setOpenId] = useState<string | null>(faqData.items[0].id);

  const toggle = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <section
      className="w-full bg-white py-120 3xl:py-160"
      data-header="dark"
    >
      <div className="container">
        {/* Header */}
        <div className="w-full flex flex-col items-center text-center  mb-[20px] md:mb-[10px]">
          <SectionHeading title={faqData.title} className="mb-20 text-foreground" />
          <SectionDescription text={faqData.subtitle} className="shrink-0 max-w-[407px] text-foreground-light" />
        </div>

        {/* Accordion */}
        <div className="max-w-[973px] mx-auto">
          {faqData.items.map((item, index) => (
            <Reveal variants={moveUpV2} key={item.id} >

            <AccordionItem
              item={item}
              isOpen={openId === item.id}
              onToggle={() => toggle(item.id)}
              isLast={index === faqData.items.length - 1}
              />
              </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
