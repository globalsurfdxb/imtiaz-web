"use client";

import { useMemo, useEffect, useState, useRef, useCallback } from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import FilterDropdown from "../../common/FilterDropdown";
import CustomOutlineButton from "../../common/CustomOutlineButton";
import { properties, PropertiesPageData } from "../data";
import ListMapToggle from "../../common/ListMapToggle";
import ProjectCard from "../../common/ProjectCard";
import { motion } from "framer-motion";
import ProjectList from "./ProjectList";
import { APIProvider } from "@vis.gl/react-google-maps";
import { containerStagger, moveUp, moveUpV2 } from "../../motionVariants";
import Pagination from "../../common/Pagination";
import { Plus, SearchX } from "lucide-react";
import Reveal from "../../animations/RevealOneByOneAnimation";
import CustomSearch from "../../common/CustomSearch";
import { useLenis } from "@/app/contexts/LenisContext";

type PropertyType =
  | "Villa"
  | "Apartment"
  | "Townhouse"
  | "Penthouse"
  | "Studio"
  | "";
type PropertyStatus =
  | "Available"
  | "Off Plan"
  | "Completed"
  | "Under Construction"
  | "";
type Community =
  | "Downtown"
  | "Waterfront"
  | "Suburbs"
  | "Business Bay"
  | "Old Town"
  | "";



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
        No Properties found
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

const Main = ({ data, communitiesData }: {data:PropertiesPageData, communitiesData:any}) => {

  const propertyTypes = useMemo(() => {
    return [
      ...new Set(
        data.listing
          .map((item: { property_type: string }) => item.property_type)
          .filter(Boolean),
      ),
    ];
  }, [data]);

  const propertyStatuses = useMemo(() => {
    return [
      ...new Set(
        data.listing
          .map((item: { property_status: string }) => item.property_status)
          .filter(Boolean),
      ),
    ];
  }, [data]);

const communities = useMemo(() => {
  return communitiesData.listing.map(
    (item: { title: string }) => item.title,
  );
}, [communitiesData]);

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

  const { scrollTo, lock, unlock } = useLenis();

  const selectedPropertyType =
    (searchParams.get("propertyType") as PropertyType) || "";
  const selectedStatus = (searchParams.get("status") as PropertyStatus) || "";
  const selectedCommunity = (searchParams.get("community") as Community) || "";
  const currentPage = Number(searchParams.get("page") || "1");
  const [searchQuery, setSearchQuery] = useState("");
  const [view, setView] = useState<"list" | "map">("list");

const itemsPerPageRef = useRef(4);
const [, forceUpdate] = useState(0);

useEffect(() => {
  const getColumns = () => {
    const w = window.innerWidth;
    if (w >= 1700) return 4;
    if (w >= 1140) return 3;
    if (w >= 640) return 2;
    return 1;
  };

  const applyItemsPerPage = () => {
    const next = getColumns() * 4; // always 4 rows
    if (next !== itemsPerPageRef.current) {
      itemsPerPageRef.current = next;
      forceUpdate((n) => n + 1);
    }
  };

  applyItemsPerPage();
  window.addEventListener("resize", applyItemsPerPage);
  return () => window.removeEventListener("resize", applyItemsPerPage);
}, []);

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
    setSearchQuery("");
    savedScrollY.current = window.scrollY;
    router.replace(`${pathname}?page=1`, { scroll: false });
  }, [pathname, router]);

  const handlePageChange = useCallback(
    (page: number) => {
      const params = new URLSearchParams(searchParamsRef.current.toString());
      params.set("page", String(page));
      router.push(`${pathname}?${params.toString()}`, { scroll: false });
    },
    [pathname, router],
  );

  const hasFilter =
    selectedPropertyType || selectedStatus || selectedCommunity || searchQuery;

  // const sorted = useMemo(
  //   () =>
  //     [...data.listing]
  //   .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()),
  //   [],
  // );

  const sorted = [...data.listing]

  const filtered = useMemo(() => {
    return sorted.filter((item) => {
      if (
        selectedPropertyType &&
        item.property_type !== selectedPropertyType
      )
        return false;
      if (
        selectedStatus &&
        item.property_status !== selectedStatus
      ) return false;

      if (
        selectedCommunity &&
        item.property_community !== selectedCommunity
      )
        return false;
      if (searchQuery) {
        const q = searchQuery.toLowerCase();
        const matches =
          item.title?.toLowerCase().includes(q) ||
          item.property_community?.toLowerCase().includes(q) ||
          item.property_type?.toLowerCase().includes(q);
        if (!matches) return false;
      }
      return true;
    });
  }, [
    selectedPropertyType,
    selectedStatus,
    selectedCommunity,
    searchQuery,
    sorted,
  ]);

  const itemsPerPage = itemsPerPageRef.current;

  const totalPages = useMemo(
    () => Math.ceil(filtered.length / itemsPerPage),
    [filtered.length, itemsPerPage],
  );

  const paginated = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filtered.slice(start, start + itemsPerPage);
  }, [filtered, currentPage, itemsPerPage]);

  return (
    <section className="w-full bg-white pt-[20px] md:pt-70" data-header="dark">
      <div className="w-full container">
        {/* ── Mobile: collapsible filter (below lg) ── */}
        <div className="lg:hidden mb-[20px] lg:mb-70">
          <motion.div
            variants={moveUp(0.12)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
          >
            <button
              onClick={() => setFiltersOpen((prev) => !prev)}
              className="flex text-[12px] md:text-16 items-center justify-between w-full px-6 py-4 rounded-full border border-primary-2 text-foreground-light text-description uppercase cursor-pointer"
            >
              <span>Filters</span>
              <span
                className="transition-transform duration-300 ease-in-out"
                style={{
                  transform: filtersOpen ? "rotate(45deg)" : "rotate(0deg)",
                }}
              >
                <Plus size={20} />
              </span>
            </button>
            <div
              ref={contentRef}
              className="transition-all duration-400 ease-in-out"
              style={{
                maxHeight: filtersOpen ? "600px" : "0px",
                opacity: filtersOpen ? 1 : 0,
              }}
            >
              <div className="flex flex-col gap-3 pt-4">
                {/* Search inside mobile collapsible */}
                <CustomSearch
                  className="!py-[17px] md:!py-5 h-[50px] lg:h-[66px]"
                  borderColor="border-primary-2"
                  textColor="text-foreground-light"
                  value={searchQuery}
                  onChange={setSearchQuery}
                />
                <FilterDropdown
                  placeholder="Properties Type"
                  options={propertyTypes}
                  value={selectedPropertyType}
                  onChange={(val) => updateParam("propertyType", val)}
                />
                <FilterDropdown
                  placeholder="Status"
                  options={propertyStatuses}
                  value={selectedStatus}
                  onChange={(val) => updateParam("status", val)}
                />
                <FilterDropdown
                  placeholder="Community"
                  options={communities}
                  value={selectedCommunity}
                  onChange={(val) => updateParam("community", val)}
                />
                {hasFilter && (
                  <CustomOutlineButton
                    text="Clear Filter"
                    onClick={clearFilters}
                    variant="dark"
                    px="px-60"
                    borderColor="border-primary-2"
                    textColor="text-foreground-light"
                    className="w-full md:w-auto !py-[17px] md:!py-5 h-[44px] md:h-[50px]  xl:h-[66px] uppercase"
                  />
                )}
              </div>
            </div>
          </motion.div>
          <motion.div
            variants={moveUp(0.17)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="flex lg:hidden justify-center mt-40"
          >
            <ListMapToggle view={view} setView={setView} />
          </motion.div>
        </div>

        {/* ── Desktop: filter bar (lg+) ── */}
        <div className="hidden lg:block mb-50 xl:mb-70">
          <motion.div
            variants={containerStagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="flex flex-col xl:flex-row xl:items-center justify-between gap-40"
          >
            {/* Left: search + filter dropdowns */}
            <motion.div
              variants={containerStagger}
              className="flex items-center gap-20 3xl:gap-40"
            >
              {/* Search — replaces first filter slot */}
              <motion.div variants={moveUp(0)} className="w-full">
                <CustomSearch
                  className="!py-[17px] md:!py-5 h-[44px] md:h-[50px]  xl:h-[66px]"
                  borderColor="border-primary-2"
                  textColor="text-foreground-light"
                  value={searchQuery}
                  onChange={setSearchQuery}
                />
              </motion.div>

              <motion.div variants={moveUp(0.1)} className="w-full">
                <FilterDropdown
                  placeholder="Properties Type"
                  options={propertyTypes}
                  value={selectedPropertyType}
                  onChange={(val) => updateParam("propertyType", val)}
                />
              </motion.div>

              <motion.div variants={moveUp(0.15)} className="w-full">
                <FilterDropdown
                  placeholder="Status"
                  options={propertyStatuses}
                  value={selectedStatus}
                  onChange={(val) => updateParam("status", val)}
                />
              </motion.div>

              <motion.div variants={moveUp(0.2)} className="w-full">
                <FilterDropdown
                  placeholder="Community"
                  options={communities}
                  value={selectedCommunity}
                  onChange={(val) => updateParam("community", val)}
                />
              </motion.div>
            </motion.div>

            {/* Right: Clear Filter + toggle */}
            <div className="flex items-center justify-end xl:justify-between gap-20 3xl:gap-50">
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
                    textColor="text-foreground-light"
                    className="w-full md:w-auto !py-[17px] md:!py-5 h-[50px] lg:h-[66px] uppercase"
                  />
                </motion.div>
              )}
              <motion.div
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                variants={moveUp(0.15)}
                className={`flex ${hasFilter ? "xl:hidden min-[1800px]:block" : ""}`}
              >
                <ListMapToggle view={view} setView={setView} />
              </motion.div>
            </div>
          </motion.div>

          {/* List/Map toggle — only between xl and 2xl when filter active */}
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={moveUp(0.15)}
            className={`hidden ${hasFilter ? "xl:flex min-[1800px]:hidden" : ""} justify-end mt-20`}
          >
            <ListMapToggle view={view} setView={setView} />
          </motion.div>
        </div>

        {/* ── Divider ── */}
        <div className="w-full mb-[30px] md:mb-50">
          <div className="relative w-full h-px overflow-hidden">
            <motion.div
              className="absolute inset-0 bg-foreground-light/50 md:bg-black/10 origin-center"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, ease: "easeInOut" }}
            />
          </div>
        </div>
      </div>

      {/* ── Cards / Map ── */}
      <section className="w-full pb-120 3xl:pb-160" id="properties-list">
        {view === "list" ? (
          <div className="flex flex-col justify-center container">
            <div className="text-center">
              {paginated.length === 0 ? (
                <EmptyState />
              ) : (
                <div className="project-card-grid">
                  {paginated.map((project, i) => (
                    <Reveal variants={moveUpV2} key={i} delayRange={i * 0.08}>
                      <ProjectCard
                        
                        image={project.featured_image_desktop}
                        mobileImage={project.featured_image_mobile}
                        hoverImage={project.brand_logo}
                        subtitle={project.property_caption}
                        status={project.property_status}
                        location={project.property_location}
                        startingFrom={project.icon1_text}
                        units={project.icon2_text}
                        {...project} />
                    </Reveal>
                  ))}
                </div>
              )}
            </div>
          </div>
        ) : (
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={moveUp(0.1)}
            className="w-full h-full"
          >
            <APIProvider
              apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API as string}
            >
              <ProjectList 
              projects={filtered} />
            </APIProvider>
          </motion.div>
        )}

        {/* ── Pagination ── */}
        {view === "list" && totalPages > 1 && (
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
              scrollToId="properties-list"
            />
          </motion.div>
        )}
      </section>
    </section>
  );
};

export default Main;
