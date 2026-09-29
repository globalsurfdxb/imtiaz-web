"use client";

import { motion } from "framer-motion";
import { moveUp } from "../../motionVariants";
import CustomOutlineButton from "../../common/CustomOutlineButton-v4";
import Link from "next/link";

const decodeHtml = (html: string) => {
  if (typeof document === "undefined") return html;
  const txt = document.createElement("textarea");
  txt.innerHTML = html;
  return txt.value;
};

const Content = ({ content,sourceUrl }: { content: string,sourceUrl:string }) => {
  return (
    <section
      className="w-full bg-white pt-5 md:pt-0 pb-[50px]"
      data-header="dark"
    >
      <div className="container container-spacing-details-page">
        <motion.div
          variants={moveUp(0.1)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="blog-content dynamicmn content-spacing-mobile-padding"
          dangerouslySetInnerHTML={{
            __html: decodeHtml(content),
          }}
        />
      </div>
      <Link href={sourceUrl} className="flex justify-center">
        <CustomOutlineButton
          variant="dark"
          text="Source"
          borderColor="border-primary-2"
          textColor="text-primary-2"
          px="px-[12px] lg:px-[20px] 3xl:px-[36.6px] h-[47px]"
          readMore
        />
      </Link>
    </section>
  );
};

export default Content;
