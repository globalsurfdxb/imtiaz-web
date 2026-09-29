"use client";

import { motion } from "framer-motion";
import { moveUp } from "../motionVariants";
import { SectionHeading } from "../animations/SectionHeading";

const processContent = (html: string) => {
  if (typeof document === "undefined") return html;
  const txt = document.createElement("textarea");
  txt.innerHTML = html;
  const decoded = txt.value;
  return decoded
    .replace(/<table/g, '<div class="table-wrapper"><table')
    .replace(/<\/table>/g, "</table></div>");
};

const FooterContent = ({
  content,
  title,
}: {
  content: string;
  title: string;
}) => {
  return (
    <section
      className="w-full bg-white pt-[50px] pb-[50px] md:pb-70 overflow-hidden"
      data-header="dark"
    >
      <div className="container container-spacing-details-page">
        <SectionHeading
          className="text-center pb-6 md:pb-[50px]"
          title={title}
        />
        <motion.div
          variants={moveUp(0.1)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="blog-content dynamicmn content-spacing-mobile-padding"
          dangerouslySetInnerHTML={{
            __html: processContent(content),
          }}
        />
      </div>
    </section>
  );
};

export default FooterContent;
