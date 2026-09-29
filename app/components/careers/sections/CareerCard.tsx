"use client";

import Image from "next/image";
import CustomOutlineButton from "../../common/CustomOutlineButton-v4";
// import type { Career } from "../data";
import Link from "next/link";
interface CareerCardProps {
  career: {
    location:string;
    jobType:string;
    title:string;
    description:string;
    slug:string;
  };
}

export default function CareerCard({ career }: CareerCardProps) {
  return (
    <div className="bg-white p-20 sm:p-30 flex flex-col hover:scale-[1.03] transition-all duration-500">
      {/* Top row — location + job type */}
      <div className="flex items-center justify-between mb-6 md:mb-[30px]">
        <div className="flex items-center gap-[10px]">
          <Image
            src="/images/careers/location.svg"
            alt="location"
            width={30}
            height={30}
            className="w-auto 3xl:w-[15x] h-[20px] object-contain mb-1"
          />
          <span className="text-description text-foreground-light">
            {career.location}
          </span>
        </div>
        <span className="text-[14px] sm:text-description text-foreground-light">
          {career.jobType}
        </span>
      </div>

      {/* Title */}
      <h3 className="font-[optima] text-25 leading-[1.4] uppercase text-foreground mb-5 md:mb-[10px] text-trim">
        {career.title}
      </h3>

      {/* Description */}
      <p className="text-foreground-light text-[14px] sm:text-description mb-20 text-trim">
        {career.description}
      </p>

      {/* CTA */}
      <div>
        <Link href={`careers/${career.slug}`}>
          <CustomOutlineButton
            className="w-fit px-[20px] lg:px-[25px] 2xl:px-[30px] 3xl:px-[46px] h-[44px] md:h-[50px]  xl:h-[66px] 3xl:w-[204.11px] uppercase"
            text="Apply Now"
            borderColor="border-primary"
            textColor="text-foreground-light"
            variant="dark"
          />
        </Link>
      </div>
    </div>
  );
}
