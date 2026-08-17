"use client";
import Image from "next/image";
import Link from "next/link";
import { useParallax } from "@/app/hooks/useParallax";
import CustomOutlineButton from "../../common/CustomOutlineButton";

type Blog = {
  id: number;
  title: string;
  image: string;
  category: string;
  date: string;
  slug: string;
  mobileImage:string;
};

interface BlogCardProps {
  blog: Blog;
}

const BlogCard = ({ blog }: BlogCardProps) => {
  const { ref, parallaxY } = useParallax(15);
  const formatted = (date: string) => {
    const d = new Date(date);

    const day = String(d.getDate()).padStart(2, "0");
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const year = d.getFullYear();

    return `${month}-${day}-${year}`;
  };

  return (
    <Link href={`/media-center/blog/${blog.slug}`} className="group block">
      <div
        ref={ref}
        className="relative w-full h-[495px] lg:h-[480px] 3xl:h-[522px] overflow-hidden"
      >
        {/* hover fill overlay */}
        <div className="absolute inset-0 bg-black/10 origin-left scale-x-0 transition-transform duration-500 z-20 ease-out group-hover:scale-x-100 pointer-events-none" />
        <Image
          src={blog.image}
          alt={blog.title}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          className=" hidden lg:block"
          style={{
            transform: `scale(${1.15}) translateY(${parallaxY}vh)`,
          }}
        />

        <Image
          src={blog.mobileImage ? blog.mobileImage : blog.image}
          alt={blog.title}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover lg:hidden"
          style={{
            transform: `scale(${1.15}) translateY(${parallaxY}vh)`,
          }}
        />

        {/* Overlay */}
        <div
          className="hidden md:block absolute inset-0"
          style={{
            background:
              "linear-gradient(182.34deg, rgba(0, 0, 0, 0) 29.48%, #000000 98.07%)",
          }}
        />

        <div
          className="md:hidden absolute inset-0"
          style={{
            background:
              "linear-gradient(182.34deg, rgba(0, 0, 0, 0) 15.48%, #000000 98.07%)",
          }}
        />

        {/* Content */}
        <div className="absolute inset-0 flex flex-col justify-end items-center py-[30px] md:py-40 px-50 z-30">
          <p className="text-white/80 font-[avenirBook] text-[14px] md:text-16 mb-20 leading-[1.54] capitalize">
            {blog.category} <span className={`${blog.category?.length > 0  ?  'block' : 'hidden'}`}>-</span> {formatted(blog.date)}
          </p>
          <h3 className="text-white uppercase text-[18px] md:text-25 leading-[1.5] md:leading-[1.4] mb-5 md:mb-40 text-center">
            {blog.title}
          </h3>
          {/* <span className="text-white font-[avenirBook] text-19 leading-[100%] underline underline-offset-3">
            Read More
          </span> */}
          <span className="text-white font-[avenirBook] text-19 leading-[100%]">
            <CustomOutlineButton
                    text="Read More"
                    borderColor="border-white/90"
                    px="h-[50px] md:h-[57px] px-[29px] md:px-[12px] lg:px-[18px] 3xl:px-[36.6px]"
                  readMore
                  />
          </span>
        </div>
      </div>
    </Link>
  );
};

export default BlogCard;
