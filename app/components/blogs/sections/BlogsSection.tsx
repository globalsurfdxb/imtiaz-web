"use client";

import { useMemo, useEffect, useRef, useCallback } from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import {
  // blogs,
  // blogTopics,
  // blogCategories,
  BlogTopic,
  BlogCategory,
  BlogListingData,
} from "../data";
import LatestBlogSlider from "./LatestBlogSlider";
import BlogCard from "./BlogCard";
import Pagination from "../../common/Pagination";
import FilterDropdown from "../../common/FilterDropdown";
import CustomOutlineButton from "../../common/CustomOutlineButton-v4";
import { motion } from "framer-motion";
import {
  containerStagger,
  moveUp,
  moveUpV2,
} from "@/app/components/motionVariants";
import Reveal from "../../animations/RevealOneByOneAnimation";
import { useLenis } from "@/app/contexts/LenisContext";
import { SearchX } from "lucide-react";

const BLOGS_PER_PAGE = 4;

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
        No Blog found
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

// ── BlogsSection ─────────────────────────────────────────────────────────────
const BlogsSection = ({data}:{data:BlogListingData}) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Always-current ref so callbacks never capture stale searchParams
  const searchParamsRef = useRef(searchParams);
  useEffect(() => {
    searchParamsRef.current = searchParams;
  }, [searchParams]);

  // Saved scroll position while a filter navigation is in flight
  const savedScrollY = useRef<number | null>(null);

  const selectedTopic = (searchParams.get("topic") as BlogTopic) || "";
  const selectedCategory = (searchParams.get("category") as BlogCategory) || "";
  const currentPage = Number(searchParams.get("page") || "1");
  const { scrollTo, lock, unlock } = useLenis();

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
      // Read from ref — always latest, never stale
      const params = new URLSearchParams(searchParamsRef.current.toString());
      if (value) params.set(key, value);
      else params.delete(key);
      params.set("page", "1");

      // Save scroll before navigation so the layout-shrink jump is masked
      savedScrollY.current = window.scrollY;

      lock();
      router.push(`${pathname}?${params.toString()}`, { scroll: false });
      setTimeout(() => {
        unlock();
      }, 520);
    },
    [pathname, router, lock, unlock],
  );

  const blogs = useMemo(() => {
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
    topic:item.topic_name,
  }));
}, [data]);

const blogCategories = useMemo(() => {
  return [
    ...new Set(
      blogs
        .map((item) => item.category)
        .filter(Boolean),
    ),
  ];
}, [blogs]);

const blogTopics = useMemo(() => {
  return [
    ...new Set(
      blogs
        .map((item) => item.topic)
        .filter(Boolean),
    ),
  ];
}, [blogs]);

  const clearFilters = useCallback(() => {
    savedScrollY.current = window.scrollY;
    router.replace(`${pathname}?page=1`, { scroll: false });
  }, [pathname, router]);

  const hasFilter = selectedTopic || selectedCategory;

  const sortedBlogs = useMemo(
    () =>
      [...blogs].sort(
        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
      ),
    [],
  );

  const filtered = useMemo(() => {
    return sortedBlogs.filter((b) => {
      if (selectedTopic && b.topic !== selectedTopic) return false;
      if (selectedCategory && b.category !== selectedCategory) return false;
      return true;
    });
  }, [selectedTopic, selectedCategory, sortedBlogs]);

  const totalPages = useMemo(
    () => Math.ceil(filtered.length / BLOGS_PER_PAGE),
    [filtered.length],
  );
  const paginated = useMemo(
    () =>
      filtered.slice(
        (currentPage - 1) * BLOGS_PER_PAGE,
        currentPage * BLOGS_PER_PAGE,
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
      className="w-full bg-white pt-[50px] md:pt-70 pb-120 3xl:pb-130"
      data-header="dark"
    >
      <div className="container">
        {/* Filters Row */}
        <motion.div
          className="flex flex-col md:flex-row gap-30 items-center justify-between mb-5 md:mb-[30px] md:mb-70"
          variants={containerStagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
        >
          <motion.div
            className="flex flex-col md:flex-row items-center gap-2.5 md:gap-30 w-full md:w-auto"
            variants={containerStagger}
          >
            <motion.div className="w-full md:w-auto" variants={moveUp(0)}>
              <FilterDropdown
                compactMobile
                placeholder="Topic"
                options={blogTopics}
                value={selectedTopic}
                onChange={(val) => updateParam("topic", val)}
              />
            </motion.div>
            <motion.div className="w-full md:w-auto" variants={moveUp(0.15)}>
              <FilterDropdown
                compactMobile
                placeholder="Categories"
                options={blogCategories}
                value={selectedCategory}
                onChange={(val) => updateParam("category", val)}
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
                borderColor="border-primary-2"
                textColor="text-foreground-light"
                className="uppercase"
              />
            </motion.div>
          )}
        </motion.div>

        <div className="w-full mb-5 md:mb-[30px] lg:mb-50">
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

        {/* Hero Slider — hidden when filters active */}
        <div
          className="transition-all duration-500 ease-in-out overflow-hidden"
          style={{
            maxHeight: hasFilter ? "0px" : "1000px",
            opacity: hasFilter ? 0 : 1,
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
            <LatestBlogSlider blogs={sortedBlogs.slice(0, 3)} />
          </motion.div>
          {/* Divider */}
          <div className="w-full mt-[50px] mb-5 md:my-[40px] lg:my-50">
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

        {/* Blog Cards Grid */}
        <div id="blog-list" className="scroll-mt-20">
          {paginated.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-[20px] md:gap-x-40   gap-40">
              {paginated.map((blog) => (
                <Reveal key={blog.id} variants={moveUpV2}>
                  <div>
                    <BlogCard blog={blog} />
                  </div>
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
              scrollToId="blog-list"
            />
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default BlogsSection;
