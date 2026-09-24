"use client";

import { useState } from "react";
import { SectionHeading } from "../../animations/SectionHeading";
import { SectionDescription } from "../../animations/SectionDescription";
import Reveal from "../../animations/RevealOneByOneAnimation";
import { moveUpV2 } from "../../motionVariants";

type FaqItem = {
  title: string;
  caption: string | null;
};

function AccordionItem({
  item,
  isOpen,
  onToggle,
  isLast,
}: {
  item: FaqItem;
  isOpen: boolean;
  onToggle: () => void;
  isLast: boolean;
}) {
  if (!item.caption) return null;

  return (
    <div>
      {/* Question Row */}
      <button
        onClick={onToggle}
        className={`${isOpen ? "pb-[10px] md:pb-20" : ""} w-full flex items-start sm:items-center justify-between cursor-pointer gap-20 ${isLast ? `pt-5 md:pt-40` : "py-5 md:py-40"} text-left group focus:outline-none`}
        aria-expanded={isOpen}
      >
        <h3 className="text-[18px] md:text-25 uppercase text-foreground pr-2 leading-[1.4] font-[optima] font-[400]">
          {item.title}
        </h3>
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

      {/* Answer — grid 0fr→1fr animates to the real content height, no JS measuring */}
      <div
        style={{
          display: "grid",
          gridTemplateRows: isOpen ? "1fr" : "0fr",
          transition: "grid-template-rows 0.4s ease, opacity 0.4s ease",
          opacity: isOpen ? 1 : 0,
        }}
        aria-hidden={!isOpen}
      >
        <div className="min-h-0 overflow-hidden">
          <p
            className={`text-description text-foreground-light max-w-[846px] ${!isLast ? "pb-30" : ""}`}
            dangerouslySetInnerHTML={{ __html: item.caption }}
            />
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

export default function StudioFaq({ data }: any) {
  // only faq entries with a real caption are shown/openable
  const faqItems: FaqItem[] = (data?.faq ?? []).filter(
    (item: FaqItem) => !!item.caption
  );

  const [openIndex, setOpenIndex] = useState<number | null>(
    faqItems.length > 0 ? 0 : null
  );

  const toggle = (index: number) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  if (faqItems.length === 0) return null;

  return (
    <section className="w-full bg-white py-120 3xl:py-160" data-header="dark">
      <div className="container">
        {/* Header */}
        <div className="w-full flex flex-col items-center text-center  mb-[20px] md:mb-[10px]">
          <SectionHeading
            title={data?.faq_title}
            className="mb-20 text-foreground"
          />
          <SectionDescription
            text={data?.faq_caption}
            className="shrink-0 max-w-[407px] text-foreground-light"
          />
        </div>

        {/* Accordion */}
        <div className="max-w-[973px] mx-auto">
          {faqItems.map((item, index) => (
            <Reveal variants={moveUpV2} key={item.title}>
              <AccordionItem
                item={item}
                isOpen={openIndex === index}
                onToggle={() => toggle(index)}
                isLast={index === faqItems.length - 1}
              />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}