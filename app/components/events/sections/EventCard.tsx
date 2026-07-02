import Image from "next/image";
import Link from "next/link";
import { EventItem } from "../data";
import CustomOutlineButton from "../../common/CustomOutlineButton";
import { useParallax } from "@/app/hooks/useParallax";

const EventCard = ({ item }: { item: EventItem }) => {
    const { ref, parallaxY } = useParallax(15);

  return (
    <Link href={`/media-center/events/${item.slug}`} className="group block">
      <div ref={ref} className="relative w-full h-[453px] lg:h-[480px] 3xl:h-[522px] overflow-hidden">
                {/* hover fill overlay */}
        {/* <div className="absolute inset-0 bg-black/10 origin-left scale-x-0 transition-transform duration-500 z-20 ease-out group-hover:scale-x-100 pointer-events-none" /> */}
        <Image
          src={item.image}
          alt={item.title}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover hidden lg:block"
                    style={{
            transform: `scale(${1.15}) translateY(${parallaxY}vh)`,
          }}
        />

        <Image
          src={item.mobileImage ? item.mobileImage : item.image}
          alt={item.title}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover lg:hidden"
                    style={{
            transform: `scale(${1.15}) translateY(${parallaxY}vh)`,
          }}
        />
        <div
          className="absolute inset-0 hidden lg:block"
          style={{ background: "linear-gradient(182.34deg, rgba(0, 0, 0, 0) 29.48%, #000000 98.07%)" }}
        />
        <div
          className="absolute inset-0 lg:hidden"
          style={{ background: "linear-gradient(182.34deg, rgba(0, 0, 0, 0) 15.48%, #000000 98.07%)" }}
        />
        <div className="absolute inset-0 flex flex-col justify-end items-center py-[30px] md:py-40 px-50 z-20">
          <h3 className="text-white uppercase text-[18px] text-25 font-[optima] tracking-[2%] leading-[1.4] mb-5 md:mb-40 text-center line-clamp-2">
            {item.title}
          </h3>
          <CustomOutlineButton text="Read More" px="px-[30px] md:px-[12px] lg:px-[20px] 3xl:px-[36.6px] h-[44px] md:h-[50px]  xl:h-[66px]"/>
        </div>
      </div>
    </Link>
  );
};

export default EventCard;