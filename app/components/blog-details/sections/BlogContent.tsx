"use client"
import { motion } from "framer-motion";
import { useEffect, useRef } from "react";
import { moveUp } from "../../motionVariants";

const decodeHtml = (html: string) => {
  const txt = document.createElement("textarea");
  txt.innerHTML = html;
  return txt.value;
};

const BlogContent = ({ content }: { content: string }) => {
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = contentRef.current;
    if (!container) return;

    const tables = container.querySelectorAll("table");
    tables.forEach((table) => {

      table.removeAttribute("width");
      table.style.width = "max-content";
      table.style.minWidth = "100%";
      table.style.tableLayout = "auto";

      if (table.parentElement?.classList.contains("table-scroll-wrap")) return;

      const wrapper = document.createElement("div");
      wrapper.className = "table-scroll-wrap";
      wrapper.style.width = "100%";
      wrapper.style.overflowX = "auto";
      wrapper.style.setProperty("-webkit-overflow-scrolling", "touch");

      table.parentNode?.insertBefore(wrapper, table);
      wrapper.appendChild(table);
    });
  }, [content]);

  return (
    <section className="w-full bg-white pt-20 pb-[40px] md:pb-50 overflow-hidden" data-header="dark">
      <div className="container container-spacing-details-page">
        <motion.div
          ref={contentRef}
          variants={moveUp(0.1)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="blog-content dynamicmn"
          dangerouslySetInnerHTML={{
            __html: decodeHtml(content),
          }}
        />
      </div>
    </section>
  );
};

export default BlogContent;