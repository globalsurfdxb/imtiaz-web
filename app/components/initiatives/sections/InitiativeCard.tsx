import Image from "next/image";
import Link from "next/link";
import CustomOutlineButton from "../../common/CustomOutlineButton";
import { useParallax } from "@/app/hooks/useParallax";

interface Initiative {
  title: string;
  link: string;
  image: string;
  mobileImage:string;
}

export default function InitiativeCard({ title, link, image, mobileImage }: Initiative) {
  const { ref, parallaxY } = useParallax(10);
  return (
    <div
      className="relative block w-full h-[495px] md:h-[540px] lg:h-[600px] 2xl:h-[650px] 3xl:h-[763px] overflow-hidden group"
      ref={ref}
    >
      <Link href={`/media-center/initiatives/${link}`}>
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover hidden lg:block"
          style={{
            transform: `scale(${1.10}) translateY(${parallaxY}vh)`,
          }}
        />
        <Image
          src={mobileImage ? mobileImage : image}
          alt={title}
          fill
          className="object-cover lg:hidden"
          style={{
            transform: `scale(${1.10}) translateY(${parallaxY}vh)`,
          }}
        />
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black" />
        {/* Bottom content */}
        <div className="absolute bottom-0 left-0 right-0 px-70 pb-50 flex flex-col gap-20">
          <h3 className="text-[18px]  md:text-50 text-heading text-white line-clamp-2 text-center">
            {title}
          </h3>
          <div className="flex justify-center">
            <CustomOutlineButton
              text="Read More"
              className="w-full md:w-auto !py-[17px] md:!py-5 h-[44px] md:h-[50px]  xl:h-[66px] uppercase"
            />
          </div>
        </div>
      </Link>
    </div>
  );
}
