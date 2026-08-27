"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect, useId } from "react";
import { CommunityCard as CommunityCardType } from "../data";
import CustomOutlineButton from "@/app/components/common/CustomOutlineButton";

type IconUrlKey = `icon${1 | 2 | 3}_url`;
type IconTextKey = `icon${1 | 2 | 3}_text`;

const CommunityCard = ({ card }: { card: CommunityCardType }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const cardId = useId();

  const active = isHovered || isActive;

  const tags = [];

  for (let i = 1; i <= 3; i++) {
    const icon = card[`icon${i}_url` as IconUrlKey];
    const label = card[`icon${i}_text` as IconTextKey];

    if (icon && label) {
      tags.push({
        icon,
        label,
      });
    }
  }

  useEffect(() => {
    const handleOtherCardActive = (e: Event) => {
      const { id } = (e as CustomEvent).detail;
      if (id !== cardId) setIsActive(false);
    };

    window.addEventListener("card:activated", handleOtherCardActive);
    return () =>
      window.removeEventListener("card:activated", handleOtherCardActive);
  }, [cardId]);

  const handleCardClick = () => {
    if (!window.matchMedia("(hover: none)").matches) return;

    const next = !isActive;
    setIsActive(next);

    if (next) {
      window.dispatchEvent(
        new CustomEvent("card:activated", { detail: { id: cardId } }),
      );
    }
  };

  return (
    <div className="grid lg:grid-cols-[60%_1fr] xl:grid-cols-[70%_1fr] 2xl:grid-cols-[64%_1fr] min-[1900px]:grid-cols-[58.6517%_1fr]">
      <div
        className="relative w-full h-[370px] md:h-[400px] lg:h-[520px] 3xl:h-[579px] overflow-hidden  select-none"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={handleCardClick}
      >
        {/* Background Image */}
        <Image
          src={card.featured_image_desktop}
          alt={card.featured_image_alt}
          fill
          className="object-cover object-center hidden lg:block"
        />

        {/* Background Image */}
        <Image
          src={
            card.featured_image_mobile
              ? card.featured_image_mobile
              : card.featured_image_desktop
          }
          alt={card.featured_image_alt}
          fill
          className="object-cover object-center lg:hidden"
        />
      </div>

      {/* BELOW LG — always-visible state matching the image */}
      <div className="pt-4 lg:pt-10 bg-gray flex flex-col items-center justify-center pointer-events-none">
        {/* Title at top */}

        {/* Bottom section: pill + divider + CTA */}
        <div className="w-full flex flex-col items-center justify-center gap-6 md:gap-[50px]">
          <h3
            className="text-foreground font-[optima] text-24 leading-[35px] text-center px-10 md:px-4 uppercase"
            style={{
              transition: active
                ? "opacity 0.2s ease-in-out"
                : "opacity 0.4s ease-in-out 0.2s",
            }}
          >
            {card.title}
          </h3>

          {/* Tags pill — full width, flex wrap, centered */}
          <div className="flex flex-wrap items-center justify-center gap-x-[50px] gap-y-3 md:gap-y-[20px] w-[80%] px-[1px] pb-6 lg:pb-10">
            {tags.reverse().map((tag, i) => (
              <div key={i} className="flex items-center gap-[10px]">
                <Image
                  src={tag.icon}
                  alt={tag.label}
                  width={25}
                  height={25}
                  className="h-[18px] w-auto brightness-100 invert"
                />
                <span className="pt-1 text-foreground font-[avenirBook] text-[12px] md:text-16 uppercase leading-[1.72]">
                  {tag.label}
                </span>
              </div>
            ))}

            {/* CTA button */}
            <div className="min-w-full mt-2 lg:mt-[30px]">
              <Link
                href={`/communities/${card.slug}`}
                className="pointer-events-auto"
                onClick={(e) => e.stopPropagation()}
              >
                <CustomOutlineButton
                  text="View Community"
                  px="px-[30px] h-[44px] md:h-[50px]  xl:h-[66px] w-fit mx-auto"
                  borderColor="border-primary-2"
                  textColor="text-foreground-light"
                  variant="dark"
                />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommunityCard;
