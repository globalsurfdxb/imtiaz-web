"use client";

import { useState, useMemo, useEffect, useRef, useCallback } from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { SectionHeading } from "../../animations/SectionHeading";
import { SectionDescription } from "../../animations/SectionDescription";
import FilterDropdown from "../../common/FilterDropdown";
import CustomOutlineButton from "../../common/CustomOutlineButton";
import CareerCard from "./CareerCard";
// import { careersData, vacanciesConfig } from "../data";
import Reveal from "../../animations/RevealOneByOneAnimation";
import { moveUp, moveUpV2 } from "../../motionVariants";
import { motion } from "framer-motion";
import Pagination from "../../common/Pagination";
import { SearchX } from "lucide-react";

type Career = {
  id: string;

  title: string;

  description: string;

  location: string;

  jobType: string;

  department: string;

  slug: string;
};

type VacanciesConfig = {
  section: {
    title: string;
    description: string;
  };

  filters: {
    department: string[];
    jobType: string[];
  };
};

const CAREERS_PER_PAGE = 6;

// ── Empty state ──────────────────────────────────────────────────────────────
const EmptyState = () => (
  <div className="col-span-full flex flex-col items-center justify-center gap-6 text-center">
    <motion.div
      variants={moveUp(0)}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true }}
      className="flex items-center justify-center w-18 h-18 rounded-full bg-gray"
    >
      <SearchX size={32} className="text-primary" />
    </motion.div>
    <div className="flex flex-col gap-2 font-[avenirBook]">
      <motion.p
        variants={moveUp(0.1)}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        className="text-25 text-foreground"
      >
        No Vacancies found
      </motion.p>
      <motion.p
        variants={moveUp(0.16)}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        className="text-description text-foreground-light max-w-xs"
      >
        No results match your current filters. Try adjusting or clearing your
        selection.
      </motion.p>
    </div>
  </div>
);

export default function VacanciesSection({careersData, vacanciesConfig}:{careersData:Career[], vacanciesConfig:VacanciesConfig}) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const searchParamsRef = useRef(searchParams);
  useEffect(() => {
    searchParamsRef.current = searchParams;
  }, [searchParams]);

  const selectedDepartment = searchParams.get("department") || "";
  const selectedJobType = searchParams.get("jobType") || "";
  const currentPage = Number(searchParams.get("page") || "1");

  useEffect(() => {
    const params = new URLSearchParams(searchParamsRef.current.toString());
    if (!params.get("page")) {
      params.set("page", "1");
      router.replace(`${pathname}?${params.toString()}`, { scroll: false });
    }
  }, [pathname]);

  const updateParam = useCallback(
    (key: string, value: string) => {
      const params = new URLSearchParams(searchParamsRef.current.toString());
      if (value) params.set(key, value);
      else params.delete(key);
      params.set("page", "1");
      router.push(`${pathname}?${params.toString()}`, { scroll: false });
    },
    [pathname, router],
  );

  const hasFilter = Boolean(selectedDepartment || selectedJobType);

  const clearFilters = useCallback(() => {
    router.replace(`${pathname}?page=1`, { scroll: false });
  }, [pathname, router]);

  const filtered = useMemo(() => {
    return careersData.filter((career) => {
      const matchDept =
        !selectedDepartment || career.department === selectedDepartment;
      const matchType = !selectedJobType || career.jobType === selectedJobType;
      return matchDept && matchType;
    });
  }, [selectedDepartment, selectedJobType]);

  const totalPages = useMemo(
    () => Math.ceil(filtered.length / CAREERS_PER_PAGE),
    [filtered.length],
  );

  const paginated = useMemo(
    () =>
      filtered.slice(
        (currentPage - 1) * CAREERS_PER_PAGE,
        currentPage * CAREERS_PER_PAGE,
      ),
    [filtered, currentPage],
  );

  const handlePageChange = useCallback(
    (page: number) => {
      const params = new URLSearchParams(searchParamsRef.current.toString());
      params.set("page", String(page));
      router.push(`${pathname}?${params.toString()}`, { scroll: false });
    },
    [pathname, router],
  );

  return (
    <section data-header="dark" className="bg-gray py-120 2xl:py-130">
      {/* Heading + Description */}
      <div className="container text-center mb-50">
        <SectionHeading
          title={vacanciesConfig.section.title}
          className="mb-20 text-foreground"
        />
        <SectionDescription
          text={vacanciesConfig.section.description}
          className="max-w-[623px] mx-auto text-foreground-light mb-20"
        />

        {/* Filters */}
        <div className="flex flex-wrap items-center justify-center gap-[10px]">
          <motion.div
            className="w-[170px] sm:w-auto"
            variants={moveUp(0)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
          >
            <FilterDropdown
              variant="secondary"
              placeholder="Department"
              options={vacanciesConfig.filters.department}
              value={selectedDepartment}
              onChange={(val) => updateParam("department", val)}
            />
          </motion.div>
          <motion.div
            className="w-[170px] sm:w-auto"
            variants={moveUp(0.12)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
          >
            <FilterDropdown
              variant="secondary"
              placeholder="Job Type"
              options={vacanciesConfig.filters.jobType}
              value={selectedJobType}
              onChange={(val) => updateParam("jobType", val)}
            />
          </motion.div>
          {hasFilter && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
            >
              <CustomOutlineButton
                text="Clear Filter"
                onClick={clearFilters}
                variant="dark"
                px="px-60"
                borderColor="border-primary-2"
                textColor="text-foreground-light"
                className="w-full md:w-auto !py-[17px] md:!py-5 h-[50px] lg:h-[66px] uppercase"
              />
            </motion.div>
          )}
        </div>
      </div>

      {/* Cards Grid */}
      <div id="vacancies-list" className="container scroll-mt-20">
        {paginated.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-30 gap-y-20 md:gap-y-40">
            {paginated.map((career, i) => (
              <Reveal key={career.id} variants={moveUpV2} delayRange={0.11 * i}>
                <CareerCard career={career} />
              </Reveal>
            ))}
          </div>
        ) : (
          <EmptyState />
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <motion.div
            variants={moveUp(0.15)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="w-full flex justify-center mt-60"
          >
            <Pagination
              totalPages={totalPages}
              currentPage={currentPage}
              onPageChange={handlePageChange}
              scrollToId="vacancies-list"
            />
          </motion.div>
        )}
      </div>
    </section>
  );
}
