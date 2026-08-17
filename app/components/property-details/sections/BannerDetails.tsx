// "use client";

// import Image from "next/image";
// import { Swiper, SwiperSlide } from "swiper/react";
// import { Autoplay } from "swiper/modules";
// import "swiper/css";

// interface PropertyStatProps {
//   label: string;
//   value: string;
//   icon: string;
// }

// function PropertyStat({ label, value, icon }: PropertyStatProps) {
//   return (
//     <div className="flex flex-col items-center gap-[10px]">
//       <span className="text-white/50 !leading-[1.563] text-description uppercase">
//         {label}
//       </span>
//       <div className="flex items-center gap-20">
//         <Image
//           src={icon}
//           alt={label}
//           width={24}
//           height={24}
//           className="w-4 h-4 md:w-[24px] md:h-[24px]"
//         />
//         <span className="text-white text-25 font-[optima] tracking-[2%] uppercase leading-[1.4] whitespace-nowrap">
//           {value}
//         </span>
//       </div>
//     </div>
//   );
// }

// const stats = [
//   {
//     label: "Location",
//     value: "Dubai Island",
//     icon: "/images/projects/mark1.svg",
//   },
//   {
//     label: "Payment Plan",
//     value: "Flexible Over 5 Years",
//     icon: "/images/projects/mark2.svg",
//   },
//   {
//     label: "Starting At",
//     value: "$150,000",
//     icon: "/images/projects/mark3.svg",
//   },
//   {
//     label: "Delivery Date",
//     value: "Delivery Date",
//     icon: "/images/projects/mark4.svg",
//   },
// ];

// export default function BannerDetails() {
//   return (
//     <div className="w-full bg-white/10 backdrop-blur-[15px] pt-50 pb-40 2xl:pb-[46px]">
//       {/* Desktop — equal gaps, fit width */}
//       <div className="hidden lg:flex justify-between items-center w-full xl:!px-50 3xl:!px-100 container mx-auto">
//         {stats.map((stat, i) => (
//           <div key={i}>
//             <PropertyStat {...stat} />
//           </div>
//         ))}
//       </div>

//       {/* Mobile — swiper */}
//       <div className="lg:hidden container mx-auto">
//         <Swiper
//           modules={[Autoplay]}
//           slidesPerView={1}
//           spaceBetween={20}
//           loop={false}
//           autoplay={{ delay: 3000, disableOnInteraction: false }}
//           breakpoints={{
//             528: { slidesPerView: 2 },
//             800: { slidesPerView: 3 },
//           }}
//         >
//           {stats.map((stat) => (
//             <SwiperSlide key={stat.label} className="flex justify-center">
//               <PropertyStat {...stat} />
//             </SwiperSlide>
//           ))}
//         </Swiper>
//         {/* Pagination (only below 1540px) */}
//         <div className="flex justify-center mt-[25px] md:mt-50 gap-[10px] min-[1540px]:hidden">
//           {stats.map((_, i) => (
//             <button
//               key={i}
//               // onClick={() => swiperRef.current?.slideToLoop(i)}
//               className={`w-[10px] h-[10px] rounded-full border border-white transition-all duration-300 cursor-pointer ${
//                 i === 0 ? "bg-white" : "bg-transparent"
//               }`}
//             />
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }

"use client";

import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import "swiper/css";
import { useState } from "react";

interface Stats {
  location: string;
  payment_plan: string;
  starting_price: string;
  delivery_date: string;
}

interface PropertyStatProps {
  label: string;
  value: string;
  icon: string;
}

function PropertyStat({ label, value, icon }: PropertyStatProps) {
  return (
    <div className="flex flex-col items-center gap-[10px]">
      <span className="text-white md:text-white/50 !leading-[1.563] text-description uppercase">
        {label}
      </span>
      <div className="flex items-center gap-[10px] md:gap-20">
        <Image
          src={icon}
          alt={label}
          width={24}
          height={24}
          className="w-[24px] h-[24px]"
        />
        <span className="text-white text-25 2xl:text-[24px] font-[optima] tracking-[2%] uppercase leading-[1.4] whitespace-nowrap">
          {value}
        </span>
      </div>
    </div>
  );
}

export default function BannerDetails({
  location,
  payment_plan,
  starting_price,
  delivery_date,
}: Stats) {
  const stats = [
    {
      label: "Location",
      value: location,
      icon: "/images/projects/mark1.svg",
    },
    {
      label: "Payment Plan",
      value: payment_plan,
      icon: "/images/projects/mark2.svg",
    },
    {
      label: "Starting At",
      value: starting_price,
      icon: "/images/projects/mark3.svg",
    },
    {
      label: "Delivery Date",
      value: delivery_date,
      icon: "/images/projects/mark4.svg",
    },
  ];

  const [swiper, setSwiper] = useState<SwiperType | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [slidesPerView, setSlidesPerView] = useState(1);

  const showPagination = stats.length > slidesPerView;

  return (
    <div className="w-full bg-white/10 backdrop-blur-[15px] pt-20 md:pt-50 pb-20 md:pb-40 2xl:pb-[46px]">
      {/* Desktop */}
      <div className="hidden lg:flex justify-between items-center w-full xl:!px-50 3xl:!px-100 container mx-auto">
        {stats.map((stat, i) => (
          <div key={i}>
            <PropertyStat {...stat} />
          </div>
        ))}
      </div>

      {/* Mobile — swiper */}
      <div className="lg:hidden container mx-auto">
        <Swiper
          modules={[Autoplay]}
          slidesPerView={1}
          spaceBetween={20}
          loop={true}
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          breakpoints={{
            528: { slidesPerView: 2 },
            800: { slidesPerView: 3 },
          }}
          onSwiper={(s) => {
            setSwiper(s);
            setSlidesPerView(Math.round(s.params.slidesPerView as number) || 1);
          }}
          onSlideChange={(s) => setActiveIndex(s.realIndex)}
          onBreakpoint={(s) =>
            setSlidesPerView(Math.round(s.params.slidesPerView as number) || 1)
          }
        >
          {stats.map((stat) => (
            <SwiperSlide key={stat.label} className="flex justify-center">
              <PropertyStat {...stat} />
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Pagination */}
        {showPagination && (
          <div className="flex justify-center mt-[25px] md:mt-50 gap-[10px] min-[1540px]:hidden">
            {stats.map((_, i) => (
              <button
                key={i}
                onClick={() => swiper?.slideToLoop(i)}
                className={`w-[10px] h-[10px] rounded-full border border-white transition-all duration-300 cursor-pointer ${
                  i === activeIndex ? "bg-white" : "bg-transparent"
                }`}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
