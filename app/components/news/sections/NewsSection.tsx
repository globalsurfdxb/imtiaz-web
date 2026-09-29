"use client";

import { useMemo, useEffect, useState, useRef, useCallback } from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import {
  // pressItems,
  pressYears,
  pressMonths,
  // pressCategories,
  PressYear,
  PressMonth,
  PressCategory,
  NewsListingResponse,
} from "../data";
import LatestNewsSlider from "./LatestNewsSlider";
import NewsCard from "./NewsCard";
import Pagination from "../../common/Pagination";
import FilterDropdown from "../../common/FilterDropdown";
import { Plus, SearchX } from "lucide-react";
import CustomOutlineButton from "../../common/CustomOutlineButton";
import CustomOutlineButtonV4 from "../../common/CustomOutlineButton-v4";
import { motion } from "framer-motion";
import {
  containerStagger,
  moveUp,
  moveUpV2,
} from "@/app/components/motionVariants";
import Reveal from "../../animations/RevealOneByOneAnimation";
import { useLenis } from "@/app/contexts/LenisContext";

const NEWS_PER_PAGE = 6;

// ── Empty state ──────────────────────────────────────────────────────────────
const EmptyState = () => (
  <div className="col-span-full flex flex-col items-center justify-center gap-6 text-center content-spacing-mobile-padding">
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
        No News found
      </motion.p>
      <motion.p
        variants={moveUp(0.16)}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        animate="show"
        className="text-description text-foreground-light max-w-xs"
      >
        No results match your current filters. Try adjusting or clearing your
        selection.
      </motion.p>
    </div>
  </div>
);

// ── NewsSection ──────────────────────────────────────────────────────────────
const NewsSection = ({data}:{data:NewsListingResponse['data']}) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [filtersOpen, setFiltersOpen] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

  // Always-current ref so callbacks never capture stale searchParams
  const searchParamsRef = useRef(searchParams);
  useEffect(() => {
    searchParamsRef.current = searchParams;
  }, [searchParams]);

  // Saved scroll position while a filter navigation is in flight
  const savedScrollY = useRef<number | null>(null);

  const selectedYear = (searchParams.get("year") as PressYear) || "";
  const selectedMonth = (searchParams.get("month") as PressMonth) || "";
  const selectedCategory =
    (searchParams.get("category") as PressCategory) || "";
  const currentPage = Number(searchParams.get("page") || "1");
  const { scrollTo, lock, unlock } = useLenis();

const pressItems = useMemo(() => {
  return (data?.listing || []).map((item: any, index: number) => ({
    id: index + 1,
    title: item.title,
    image: item.featured_image_desktop,
    category: item.category_name,
    date: item.post_date
      ? item.post_date.split("-").reverse().join("-") // 05-05-2026 -> 2026-05-05
      : "",
    slug: item.slug,
    description: item.description,
    mobileImage: item.featured_image_mobile,
    alt: item.featured_image_alt,
  }));
}, [data]);

const pressCategories = useMemo(() => {
  return [
    ...new Set(
      pressItems
        .map((item) => item.category)
        .filter(Boolean),
    ),
  ];
}, [pressItems]);

  useEffect(() => {
    const params = new URLSearchParams(searchParamsRef.current.toString());
    if (!params.get("page")) {
      params.set("page", "1");
      router.replace(`${pathname}?${params.toString()}`, { scroll: false });
    }
  }, [pathname]);

  // Restore scroll position after URL change, if we saved one
  useEffect(() => {
    if (savedScrollY.current !== null) {
      const y = savedScrollY.current;
      requestAnimationFrame(() => {
        // Use Lenis scrollTo for smooth-scroll pages, with instant duration
        scrollTo(y, { duration: 0 });
      });
      savedScrollY.current = null;
    }
  }, [searchParams, scrollTo]);

  // Clear saved scroll on any manual scroll (user intentionally moved)
  useEffect(() => {
    const onScroll = () => {
      savedScrollY.current = null;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const updateParam = useCallback(
    (key: string, value: string) => {
      const params = new URLSearchParams(searchParamsRef.current.toString());
      if (value) params.set(key, value);
      else params.delete(key);
      params.set("page", "1");

      savedScrollY.current = window.scrollY;
      lock();
      router.push(`${pathname}?${params.toString()}`, { scroll: false });
      setTimeout(() => {
        unlock();
      }, 520);
    },
    [pathname, router, lock, unlock],
  );

  const clearFilters = useCallback(() => {
    savedScrollY.current = window.scrollY;
    router.replace(`${pathname}?page=1`, { scroll: false });
  }, [pathname, router]);

  const hasFilter = selectedYear || selectedMonth || selectedCategory;

  // Only used for the slider — always shows latest "News" items regardless of filters
  const latestNews = useMemo(
    () =>
      [...pressItems]
        .filter((item) => item.category === "News")
        .sort(
          (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
        ),
    [],
  );

  // All items sorted by date — filters applied separately below
  const sorted = useMemo(
    () =>
      [...pressItems].sort(
        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
      ),
    [],
  );

  const filtered = useMemo(() => {
    return sorted.filter((item) => {
      if (selectedCategory && item.category !== selectedCategory) return false;
      if (selectedYear && !item.date.startsWith(selectedYear)) return false;
      if (selectedMonth) {
        const monthIndex = new Date(`${selectedMonth} 1`).getMonth();
        const itemMonth = new Date(item.date).getMonth();
        if (itemMonth !== monthIndex) return false;
      }
      return true;
    });
  }, [selectedCategory, selectedYear, selectedMonth, sorted]);

  const totalPages = useMemo(
    () => Math.ceil(filtered.length / NEWS_PER_PAGE),
    [filtered.length],
  );
  const paginated = useMemo(
    () =>
      filtered.slice(
        (currentPage - 1) * NEWS_PER_PAGE,
        currentPage * NEWS_PER_PAGE,
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
    <section
      className="w-full bg-white pt-[50px] md:pt-70 pb-120 3xl:pb-160"
      data-header="dark"
    >
      <div className="container">
        {/* Filters Row */}
        {/* ── Desktop (lg+) ── */}
        <motion.div
          variants={containerStagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="hidden lg:flex items-center justify-between mb-70"
        >
          <motion.div
            className="flex items-center gap-30"
            variants={containerStagger}
          >
            <motion.div variants={moveUp(0)} className="w-auto">
              <FilterDropdown
                placeholder="Topics"
                options={pressCategories}
                value={selectedCategory}
                onChange={(val) => updateParam("category", val)}
              />
            </motion.div>

            <motion.div variants={moveUp(0.1)} className="w-auto">
              <FilterDropdown
                placeholder="Year"
                options={pressYears}
                value={selectedYear}
                onChange={(val) => updateParam("year", val)}
              />
            </motion.div>

            <motion.div variants={moveUp(0.15)} className="w-auto">
              <FilterDropdown
                placeholder="Month"
                options={pressMonths}
                value={selectedMonth}
                onChange={(val) => updateParam("month", val)}
              />
            </motion.div>
          </motion.div>

          {hasFilter && (
            <motion.div
              className="w-full md:w-auto"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 50 }}
              transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
            >
              <CustomOutlineButton
                text="Clear Filter"
                onClick={clearFilters}
                variant="dark"
                px="px-60"
                borderColor="border-primary-2"
                textColor="text-primary-2"
                className="w-full md:w-auto !py-[17px] md:!py-5 h-[44px] lg:h-[50px]  xl:h-[66px] uppercase"
              />
            </motion.div>
          )}
        </motion.div>

        {/* ── Mobile (below lg) ── */}
        <motion.div
          variants={moveUp(0.12)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="lg:hidden mb-5 md:mb-[30px]"
        >
          {/* Toggle button */}
          <button
            onClick={() => setFiltersOpen((prev) => !prev)}
            className="flex text-[12px] md:text-16 items-center justify-between w-full px-6 py-4 max-md:h-[32px] max-md:py-0 max-md:px-[16px] rounded-full border border-primary-2 text-foreground-light text-description uppercase cursor-pointer"
          >
            <span>Filters</span>
            <span
              className="transition-transform duration-300 ease-in-out"
              style={{
                transform: filtersOpen ? "rotate(45deg)" : "rotate(0deg)",
              }}
            >
              <Plus size={20} className="max-md:w-[18px] max-md:h-[18px]" />
            </span>
          </button>

          {/* Collapsible content */}
          <div
            ref={contentRef}
            className="transition-all duration-400 ease-in-out"
            style={{
              maxHeight: filtersOpen ? "500px" : "0px",
              opacity: filtersOpen ? 1 : 0,
            }}
          >
            <div className="flex flex-col gap-3 pt-4">
              <FilterDropdown
                compactMobile
                placeholder="Topics"
                options={pressCategories}
                value={selectedCategory}
                onChange={(val) => updateParam("category", val)}
              />
              <FilterDropdown
                compactMobile
                placeholder="Year"
                options={pressYears}
                value={selectedYear}
                onChange={(val) => updateParam("year", val)}
              />
              <FilterDropdown
                compactMobile
                placeholder="Month"
                options={pressMonths}
                value={selectedMonth}
                onChange={(val) => updateParam("month", val)}
              />

              {hasFilter && (
                <CustomOutlineButtonV4
                  text="Clear Filter"
                  onClick={clearFilters}
                  variant="dark"
                  px="px-60"
                  borderColor="border-primary-2"
                  textColor="text-primary-2"
                  className="w-full md:w-auto md:!py-5 h-[44px] lg:h-[50px] xl:h-[66px] uppercase"
                />
              )}
            </div>
          </div>
        </motion.div>

        <div className="w-full mb-5 md:mb-50">
          <div className="relative w-full h-px overflow-hidden">
            <motion.div
              className="absolute inset-0 bg-black/10 origin-center"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, ease: "easeInOut" }}
            />
          </div>
        </div>

        {/* Slider — top 3 latest News items, unaffected by filters */}
        <div
          className="transition-all duration-500 ease-in-out"
          style={{
            maxHeight: hasFilter ? "0px" : "1000px",
            opacity: hasFilter ? 0 : 1,
            overflow: "hidden",
            marginBottom: hasFilter ? "0px" : undefined,
            willChange: "max-height",
          }}
        >
          <motion.div
            variants={moveUp(0.15)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
          >
            <LatestNewsSlider news={latestNews.slice(0, 3)} />
          </motion.div>
          <div className="w-full mt-[50px] mb-5 md:my-50">
            <div className="relative w-full h-px overflow-hidden">
              <motion.div
                className="absolute inset-0 bg-black/10 origin-center"
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1.2, ease: "easeInOut" }}
              />
            </div>
          </div>
        </div>

        <div id="news-list" className="scroll-mt-20">
          {paginated.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-25 gap-y-5 md:gap-y-40">
              {paginated.map((item) => (
                <Reveal variants={moveUpV2} key={item.id}>
                  <NewsCard item={item} />
                </Reveal>
              ))}
            </div>
          ) : (
            <EmptyState />
          )}
        </div>

        {/* Pagination */}
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
              scrollToId="news-list"
            />
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default NewsSection;
