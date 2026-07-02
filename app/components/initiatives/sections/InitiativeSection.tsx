"use client";

import { useState } from "react";
import { motion } from "framer-motion";
// import { initiatives } from "../data";
import InitiativeCard from "./InitiativeCard";
import Pagination from "@/app/components/common/Pagination";
import { moveUp } from "@/app/components/motionVariants";

type Initiative = {
  title: string;
  link: string;
  image: string;
  mobileImage:string;
}

const ITEMS_PER_PAGE = 4;

export default function InitiativeSection({ data }: { data: Initiative[] }) {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(data.length / ITEMS_PER_PAGE);
  const paginated = data.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <section data-header="dark" id="initiative-list" className="w-full container pt-[40px] md:pt-60 2xl:pt-100 pb-120 2xl:pb-130">
      <div className="flex flex-col gap-50">
        {paginated.map((item, i) => (
          <InitiativeCard key={i} {...item} />
        ))}
      </div>

      {totalPages > 1 && (
        <motion.div
          variants={moveUp(0.15)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="w-full flex justify-center"
        >
          <Pagination
            totalPages={totalPages}
            currentPage={currentPage}
            onPageChange={handlePageChange}
            scrollToId="initiative-list"
          />
        </motion.div>
      )}
    </section>
  );
}