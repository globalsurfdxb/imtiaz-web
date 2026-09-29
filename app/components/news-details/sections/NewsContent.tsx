"use client"

import { motion } from "framer-motion";
import { moveUp } from "../../motionVariants";

const decodeHtml = (html: string) => {
  const txt = document.createElement("textarea");
  txt.innerHTML = html;
  return txt.value;
};

const NewsContent = ({ content }: { content: string }) => {
  return (
    <section className="w-full bg-white pt-20 pb-[40px] md:pb-50" data-header="dark">
      <div className="container container-spacing-details-page">
        <motion.div
          variants={moveUp(0.1)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="blog-content content-spacing-mobile-padding"
          dangerouslySetInnerHTML={{
            __html: decodeHtml(content),
          }}
        />
      </div>
    </section>
  );
};

export default NewsContent;
