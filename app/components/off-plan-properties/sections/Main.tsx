// "use client";

// import { useMemo, useEffect, useState, useRef, useCallback } from "react";
// import { useRouter, useSearchParams, usePathname } from "next/navigation";
// import FilterDropdown from "../../common/FilterDropdown";
// import CustomOutlineButton from "../../common/CustomOutlineButton";
// import { offPlanProperties } from "../data";
// import ListMapToggle from "../../common/ListMapToggle";
// import ProjectCard from "../../common/ProjectCard";
// import { motion } from "framer-motion";
// import { APIProvider } from "@vis.gl/react-google-maps";
// import { SectionHeading } from "../../animations/SectionHeading";
// import { SectionDescription } from "../../animations/SectionDescription";
// import { containerStagger, moveUp, moveUpV2 } from "../../motionVariants";
// import Pagination from "../../common/Pagination";
// import Image from "next/image";
// import { Plus, SearchX } from "lucide-react";
// import Reveal from "../../animations/RevealOneByOneAnimation";
// import { useLenis } from "@/app/contexts/LenisContext";

// type PropertyType =
//   | "Villa"
//   | "Apartment"
//   | "Townhouse"
//   | "Penthouse"
//   | "Studio"
//   | "";
// type PriceRange =
//   | "Under AED 1M"
//   | "AED 1M - 3M"
//   | "AED 3M - 5M"
//   | "Above AED 5M"
//   | "";
// type Bedroom = "1" | "2" | "3" | "4" | "5+" | "";

// const propertyTypes: PropertyType[] = [
//   "Villa",
//   "Apartment",
//   "Townhouse",
//   "Penthouse",
//   "Studio",
// ];
// const priceRanges: PriceRange[] = [
//   "Under AED 1M",
//   "AED 1M - 3M",
//   "AED 3M - 5M",
//   "Above AED 5M",
// ];
// const bedrooms: Bedroom[] = ["1", "2", "3", "4", "5+"];

// const parsePrice = (raw: string): number => {
//   const cleaned = raw?.replace(/,/g, "").match(/[\d.]+/);
//   if (!cleaned) return 0;
//   const num = parseFloat(cleaned[0]);
//   return num > 1000 ? num / 1_000_000 : num;
// };

// const priceInRange = (raw: string, range: PriceRange): boolean => {
//   const price = parsePrice(raw);
//   if (range === "Under AED 1M") return price < 1;
//   if (range === "AED 1M - 3M") return price >= 1 && price <= 3;
//   if (range === "AED 3M - 5M") return price > 3 && price <= 5;
//   if (range === "Above AED 5M") return price > 5;
//   return true;
// };

// // Derive itemsPerPage from window width — no state, no spurious re-renders
// const getItemsPerPage = () =>
//   typeof window !== "undefined" && window.innerWidth >= 1600 ? 8 : 6;

// // ── Empty state ──────────────────────────────────────────────────────────────
// const EmptyState = () => (
//   <div className="col-span-full flex flex-col items-center justify-center gap-6 text-center">
//     <motion.div
//       variants={moveUp(0)}
//       initial="hidden"
//       whileInView="show"
//       viewport={{ once: true }}
//       className="flex items-center justify-center w-18 h-18 rounded-full bg-gray"
//     >
//       <SearchX size={32} className="text-primary" />
//     </motion.div>
//     <div className="flex flex-col gap-2 font-[avenirBook]">
//       <motion.p
//         variants={moveUp(0.1)}
//         initial="hidden"
//         whileInView="show"
//         viewport={{ once: true }}
//         className="text-25 text-foreground"
//       >
//         No Properties found
//       </motion.p>
//       <motion.p
//         variants={moveUp(0.16)}
//         initial="hidden"
//         whileInView="show"
//         viewport={{ once: true }}
//         animate="show"
//         className="text-description text-foreground-light max-w-xs"
//       >
//         No results match your current filters. Try adjusting or clearing your
//         selection.
//       </motion.p>
//     </div>
//   </div>
// );

// // ── Main ─────────────────────────────────────────────────────────────────────
// const Main = ({data}:any) => {
//   const router = useRouter();
//   const pathname = usePathname();
//   const searchParams = useSearchParams();
//   const [filtersOpen, setFiltersOpen] = useState(false);
//   const contentRef = useRef<HTMLDivElement>(null);

//   // Always-current ref so callbacks never capture stale searchParams
//   const searchParamsRef = useRef(searchParams);
//   useEffect(() => {
//     searchParamsRef.current = searchParams;
//   }, [searchParams]);

//   // Saved scroll position while a filter navigation is in flight
//   const savedScrollY = useRef<number | null>(null);

//   const { scrollTo, lock, unlock } = useLenis();

//   const selectedPropertyType =
//     (searchParams.get("propertyType") as PropertyType) || "";
//   const selectedPriceRange =
//     (searchParams.get("priceRange") as PriceRange) || "";
//   const selectedBedroom = (searchParams.get("bedroom") as Bedroom) || "";
//   const currentPage = Number(searchParams.get("page") || "1");
//   const [view, setView] = useState<"list" | "map">("list");

//   const itemsPerPageRef = useRef(6); // always 6 on server to match SSR
//   const [, forceUpdate] = useState(0);

//   useEffect(() => {
//     // Correct value after hydration (server always renders with 6)
//     const initial = getItemsPerPage();
//     if (initial !== itemsPerPageRef.current) {
//       itemsPerPageRef.current = initial;
//       forceUpdate((n) => n + 1);
//     }

//     const update = () => {
//       const next = getItemsPerPage();
//       if (next !== itemsPerPageRef.current) {
//         itemsPerPageRef.current = next;
//         forceUpdate((n) => n + 1);
//       }
//     };
//     window.addEventListener("resize", update);
//     return () => window.removeEventListener("resize", update);
//   }, []);

//   useEffect(() => {
//     const params = new URLSearchParams(searchParamsRef.current.toString());
//     if (!params.get("page")) {
//       params.set("page", "1");
//       router.replace(`${pathname}?${params.toString()}`, { scroll: false });
//     }
//   }, [pathname]);

//   // Restore scroll position after URL change, if we saved one
//   useEffect(() => {
//     if (savedScrollY.current !== null) {
//       const y = savedScrollY.current;
//       requestAnimationFrame(() => {
//         scrollTo(y, { duration: 0 });
//       });
//       savedScrollY.current = null;
//     }
//   }, [searchParams, scrollTo]);

//   // Clear saved scroll on any manual scroll (user intentionally moved)
//   useEffect(() => {
//     const onScroll = () => {
//       savedScrollY.current = null;
//     };
//     window.addEventListener("scroll", onScroll, { passive: true });
//     return () => window.removeEventListener("scroll", onScroll);
//   }, []);

//   const updateParam = useCallback(
//     (key: string, value: string) => {
//       const params = new URLSearchParams(searchParamsRef.current.toString());
//       if (value) params.set(key, value);
//       else params.delete(key);
//       params.set("page", "1");

//       savedScrollY.current = window.scrollY;

//       lock();
//       router.push(`${pathname}?${params.toString()}`, { scroll: false });
//       setTimeout(() => {
//         unlock();
//       }, 520);
//     },
//     [pathname, router, lock, unlock],
//   );

//   const clearFilters = useCallback(() => {
//     savedScrollY.current = window.scrollY;
//     router.replace(`${pathname}?page=1`, { scroll: false });
//   }, [pathname, router]);

//   const handlePageChange = useCallback(
//     (page: number) => {
//       const params = new URLSearchParams(searchParamsRef.current.toString());
//       params.set("page", String(page));
//       router.push(`${pathname}?${params.toString()}`, { scroll: false });
//     },
//     [pathname, router],
//   );

//   const hasFilter =
//     selectedPropertyType || selectedPriceRange || selectedBedroom;

//   const sorted = useMemo(
//     () =>
//       [...offPlanProperties].sort(
//         (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
//       ),
//     [],
//   );

//   const filtered = useMemo(() => {
//     return sorted.filter((item) => {
//       if (selectedPropertyType && item.propertyType !== selectedPropertyType)
//         return false;
//       if (
//         selectedPriceRange &&
//         !priceInRange(item.startingFrom, selectedPriceRange)
//       )
//         return false;
//       if (selectedBedroom) {
//         const match = item.units?.match(/(\d+)BR\s*-\s*(\d+)BR/i);
//         if (!match) return false;
//         const min = parseInt(match[1]);
//         const max = parseInt(match[2]);
//         const bed = selectedBedroom === "5+" ? 5 : parseInt(selectedBedroom);
//         if (bed < min || bed > max) return false;
//       }
//       return true;
//     });
//   }, [selectedPropertyType, selectedPriceRange, selectedBedroom, sorted]);

//   const itemsPerPage = itemsPerPageRef.current;

//   const totalPages = useMemo(
//     () => Math.ceil(filtered.length / itemsPerPage),
//     [filtered.length, itemsPerPage],
//   );

//   const paginated = useMemo(() => {
//     const start = (currentPage - 1) * itemsPerPage;
//     return filtered.slice(start, start + itemsPerPage);
//   }, [filtered, currentPage, itemsPerPage]);

//   return (
//     <section className="w-full bg-white pt-5 md:pt-70" data-header="dark">
//       <div className="w-full container">
//         {/* ── Mobile: collapsible filter (below lg) ── */}
//         <div className="lg:hidden mb-[23px] md:mb-70">
//           <motion.div
//             variants={moveUp(0.12)}
//             initial="hidden"
//             whileInView="show"
//             viewport={{ once: true }}
//           >
//             <button
//               onClick={() => setFiltersOpen((prev) => !prev)}
//               className="flex items-center justify-between w-full px-6 py-3 md:py-4 rounded-full border border-primary-2 text-foreground-light text-description uppercase cursor-pointer"
//             >
//               <span>Filters</span>
//               <span
//                 className="transition-transform duration-300 ease-in-out"
//                 style={{
//                   transform: filtersOpen ? "rotate(45deg)" : "rotate(0deg)",
//                 }}
//               >
//                 <Plus size={20} />
//               </span>
//             </button>
//             <div
//               ref={contentRef}
//               className="transition-all duration-400 ease-in-out"
//               style={{
//                 maxHeight: filtersOpen ? "500px" : "0px",
//                 opacity: filtersOpen ? 1 : 0,
//               }}
//             >
//               <div className="flex flex-col gap-3 pt-4">
//                 <FilterDropdown
//                   placeholder="All Bedrooms"
//                   options={bedrooms}
//                   value={selectedBedroom}
//                   onChange={(val) => updateParam("bedroom", val)}
//                 />
//                 <FilterDropdown
//                   placeholder="Price Range"
//                   options={priceRanges}
//                   value={selectedPriceRange}
//                   onChange={(val) => updateParam("priceRange", val)}
//                 />
//                 <FilterDropdown
//                   placeholder="Property Type"
//                   options={propertyTypes}
//                   value={selectedPropertyType}
//                   onChange={(val) => updateParam("propertyType", val)}
//                 />
//                 {hasFilter && (
//                   <CustomOutlineButton
//                     text="Clear Filter"
//                     onClick={clearFilters}
//                     variant="dark"
//                     px="px-60"
//                     borderColor="border-primary-2"
//                     textColor="text-foreground-light"
//                     className="w-full md:w-auto !py-[17px] md:!py-5 h-[44px] md:h-[50px]  xl:h-[66px] uppercase"
//                   />
//                 )}
//               </div>
//             </div>
//           </motion.div>
//           <motion.div
//             variants={moveUp(0.17)}
//             initial="hidden"
//             whileInView="show"
//             viewport={{ once: true }}
//             className={`flex lg:hidden justify-center mt-[23px] md:mt-40`}
//           >
//             <ListMapToggle view={view} setView={setView} />
//           </motion.div>
//         </div>

//         {/* ── Desktop: filter bar (lg+) ── */}
//         <div className="hidden lg:block mb-70">
//           <motion.div
//             variants={containerStagger}
//             initial="hidden"
//             whileInView="show"
//             viewport={{ once: true }}
//             className="flex flex-col xl:flex-row xl:items-center justify-between gap-40"
//           >
//             {/* Left: filter dropdowns */}
//             <motion.div
//               variants={containerStagger}
//               className="flex items-center gap-20 3xl:gap-40"
//             >
//               <motion.div variants={moveUp(0)} className="w-full">
//                 <FilterDropdown
//                   placeholder="All Bedrooms"
//                   options={bedrooms}
//                   value={selectedBedroom}
//                   onChange={(val) => updateParam("bedroom", val)}
//                 />
//               </motion.div>

//               <motion.div variants={moveUp(0.1)} className="w-full">
//                 <FilterDropdown
//                   placeholder="Price Range"
//                   options={priceRanges}
//                   value={selectedPriceRange}
//                   onChange={(val) => updateParam("priceRange", val)}
//                 />
//               </motion.div>

//               <motion.div variants={moveUp(0.15)} className="w-full">
//                 <FilterDropdown
//                   placeholder="Property Type"
//                   options={propertyTypes}
//                   value={selectedPropertyType}
//                   onChange={(val) => updateParam("propertyType", val)}
//                 />
//               </motion.div>

//               {/* More Filters — dummy */}
//               <motion.div variants={moveUp(0.2)} className="w-full">
//                 <button className="w-full min-w-[220px] 3xl:w-[253px] h-[50px] lg:h-[66px] flex items-center justify-between px-[26.5px] rounded-full bg-[#EBEBEC] font-[avenirBook] text-16 text-foreground-light">
//                   <span>More Filters</span>
//                   <Image
//                     src="/icons/filter.svg"
//                     alt="filter"
//                     width={30}
//                     height={30}
//                     className="h-[20px] w-auto"
//                   />
//                 </button>
//               </motion.div>
//             </motion.div>

//             {/* Right: Clear Filter + inline toggle (non-xl) */}
//             <div className="flex items-center justify-end xl:justify-between gap-20 3xl:gap-50">
//               {hasFilter && (
//                 <motion.div
//                   className="w-full md:w-auto"
//                   initial={{ opacity: 0, y: 50 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   exit={{ opacity: 0, y: 50 }}
//                   transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
//                 >
//                   <CustomOutlineButton
//                     text="Clear Filter"
//                     onClick={clearFilters}
//                     variant="dark"
//                     px="px-60"
//                     borderColor="border-primary-2"
//                     textColor="text-foreground-light"
//                     className="w-full md:w-auto !py-[17px] md:!py-5 h-[44px] md:h-[50px]  xl:h-[66px] uppercase"
//                   />
//                 </motion.div>
//               )}
//               <motion.div
//                 initial="hidden"
//                 whileInView="show"
//                 viewport={{ once: true }}
//                 variants={moveUp(0.15)}
//                 className={`flex ${hasFilter ? "xl:hidden 2xl:block" : ""}`}
//               >
//                 <ListMapToggle view={view} setView={setView} />
//               </motion.div>
//             </div>
//           </motion.div>

//           {/* List/Map toggle — only between xl and 2xl when filter active */}
//           <motion.div
//             initial="hidden"
//             whileInView="show"
//             viewport={{ once: true }}
//             variants={moveUp(0.15)}
//             className={`hidden ${hasFilter ? "xl:flex 2xl:hidden" : ""} justify-end mt-20`}
//           >
//             <ListMapToggle view={view} setView={setView} />
//           </motion.div>
//         </div>

//         <div className="w-full mb-[70px] md:mb-50">
//           <div className="relative w-full h-px overflow-hidden">
//             <motion.div
//               className="absolute inset-0 bg-black/10 origin-center"
//               initial={{ scaleX: 0 }}
//               whileInView={{ scaleX: 1 }}
//               viewport={{ once: true }}
//               transition={{ duration: 1.2, ease: "easeInOut" }}
//             />
//           </div>
//         </div>
//       </div>

//       {/* ── Heading ── */}
//       <div className="container mb-50 text-center" id="properties-list">
//         <SectionHeading
//           title="Available Off Plan Properties"
//           className="mb-20 text-foreground"
//         />
//         <SectionDescription
//           className="text-description text-foreground-light"
//           text={
//             filtered.length !== 0
//               ? `Showing ${(currentPage - 1) * itemsPerPage + 1}–${Math.min(currentPage * itemsPerPage, filtered.length)} of ${filtered.length} premium developments`
//               : ""
//           }
//         />
//       </div>

//       {/* ── Cards / Map ── */}
//       <section className="w-full pb-120 3xl:pb-160">
//         {view === "list" ? (
//           <div className="flex flex-col justify-center container">
//             <div className="text-center">
//               <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 3xl:grid-cols-4 gap-y-5 md:gap-y-50 gap-x-30 xl:gap-x-[28px]">
//                 {paginated.length > 0 ? (
//                   paginated.map((project, i) => (
//                     <Reveal variants={moveUpV2} key={i} delayRange={i * 0.11}>
//                       <ProjectCard {...project} />
//                     </Reveal>
//                   ))
//                 ) : (
//                   <EmptyState />
//                 )}
//               </div>
//             </div>
//           </div>
//         ) : (
//           <motion.div
//             initial="hidden"
//             whileInView="show"
//             viewport={{ once: true }}
//             variants={moveUp(0.1)}
//             className="w-full h-full"
//           >
//             <APIProvider
//               apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API as string}
//             >
//               {/* <ProjectList projects={filtered} /> */}
//             </APIProvider>
//           </motion.div>
//         )}

//         {/* ── Pagination ── */}
//         {view === "list" && totalPages > 1 && (
//           <motion.div
//             variants={moveUp(0.15)}
//             initial="hidden"
//             whileInView="show"
//             viewport={{ once: true }}
//             className="w-full flex justify-center"
//           >
//             <Pagination
//               totalPages={totalPages}
//               currentPage={currentPage}
//               onPageChange={handlePageChange}
//               scrollToId="properties-list"
//             />
//           </motion.div>
//         )}
//       </section>
//     </section>
//   );
// };

// export default Main;

"use client";

import { useMemo, useEffect, useState, useRef, useCallback } from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import FilterDropdown from "../../common/FilterDropdown";
import CustomOutlineButton from "../../common/CustomOutlineButton";
import ListMapToggle from "../../common/ListMapToggle";
import ProjectCard from "../../common/ProjectCard";
import { motion } from "framer-motion";
import { APIProvider } from "@vis.gl/react-google-maps";
import { SectionHeading } from "../../animations/SectionHeading";
import { SectionDescription } from "../../animations/SectionDescription";
import { containerStagger, moveUp, moveUpV2 } from "../../motionVariants";
import Pagination from "../../common/Pagination";
import Image from "next/image";
import { Plus, SearchX } from "lucide-react";
import Reveal from "../../animations/RevealOneByOneAnimation";
import { useLenis } from "@/app/contexts/LenisContext";
import CustomSearch from "../../common/CustomSearch";
import ProjectList from "../../property/sections/ProjectList";
import type { OffPlanPageData, OffPlanListing } from "../type";

type PropertyType = string;
type Community = string;

const getItemsPerPage = () =>
  typeof window !== "undefined" && window.innerWidth >= 1600 ? 8 : 6;

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

const Main = ({ data }: { data: OffPlanPageData }) => {
  // Pre-filter to Off Plan only
  const offPlanListings = useMemo(
    () =>
      (data?.properties ?? []).filter(
        (item: OffPlanListing) => item.property_status === "Off Plan",
      ),
    [data],
  );

  const propertyTypes = useMemo(
    () => [
      ...new Set(
        offPlanListings
          .map((item: OffPlanListing) => item.property_type)
          .filter(Boolean),
      ),
    ],
    [offPlanListings],
  );

  const communities = useMemo(
    () => [
      ...new Set(
        offPlanListings
          .map((item: OffPlanListing) => item.property_community)
          .filter(Boolean),
      ),
    ],
    [offPlanListings],
  );

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [filtersOpen, setFiltersOpen] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

  const searchParamsRef = useRef(searchParams);
  useEffect(() => {
    searchParamsRef.current = searchParams;
  }, [searchParams]);

  const savedScrollY = useRef<number | null>(null);
  const { scrollTo, lock, unlock } = useLenis();

  const selectedPropertyType =
    (searchParams.get("propertyType") as PropertyType) || "";
  const selectedCommunity = (searchParams.get("community") as Community) || "";
  const currentPage = Number(searchParams.get("page") || "1");
  const [searchQuery, setSearchQuery] = useState("");
  const [view, setView] = useState<"list" | "map">("list");

  const itemsPerPageRef = useRef(6);
  const [, forceUpdate] = useState(0);

  useEffect(() => {
    const initial = getItemsPerPage();
    if (initial !== itemsPerPageRef.current) {
      itemsPerPageRef.current = initial;
      forceUpdate((n) => n + 1);
    }
    const update = () => {
      const next = getItemsPerPage();
      if (next !== itemsPerPageRef.current) {
        itemsPerPageRef.current = next;
        forceUpdate((n) => n + 1);
      }
    };
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  useEffect(() => {
    const params = new URLSearchParams(searchParamsRef.current.toString());
    if (!params.get("page")) {
      params.set("page", "1");
      router.replace(`${pathname}?${params.toString()}`, { scroll: false });
    }
  }, [pathname]);

  useEffect(() => {
    if (savedScrollY.current !== null) {
      const y = savedScrollY.current;
      requestAnimationFrame(() => {
        scrollTo(y, { duration: 0 });
      });
      savedScrollY.current = null;
    }
  }, [searchParams, scrollTo]);

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
      setTimeout(() => unlock(), 520);
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

  const hasFilter = selectedPropertyType || selectedCommunity || searchQuery;

  const filtered = useMemo(() => {
    return offPlanListings.filter((item: OffPlanListing) => {
      if (selectedPropertyType && item.property_type !== selectedPropertyType)
        return false;
      if (selectedCommunity && item.property_community !== selectedCommunity)
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
  }, [selectedPropertyType, selectedCommunity, searchQuery, offPlanListings]);

  const itemsPerPage = itemsPerPageRef.current;

  const totalPages = useMemo(
    () => Math.ceil(filtered.length / itemsPerPage),
    [filtered.length, itemsPerPage],
  );

  const paginated = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filtered.slice(start, start + itemsPerPage);
  }, [filtered, currentPage, itemsPerPage]);

  console.log("offPlanListings", offPlanListings);

  return (
    <section className="w-full bg-white pt-5 md:pt-70" data-header="dark">
      <div className="w-full container">
        {/* ── Mobile: collapsible filter (below lg) ── */}
        <div className="lg:hidden mb-[23px] md:mb-70">
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
                    className="w-full md:w-auto !py-[17px] md:!py-5 h-[44px] md:h-[50px] xl:h-[66px] uppercase"
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
            className={`flex lg:hidden justify-center mt-[23px] md:mt-40`}
          >
            <ListMapToggle view={view} setView={setView} />
          </motion.div>
        </div>

        {/* ── Desktop: filter bar (lg+) ── */}
        <div className="hidden lg:block mb-70">
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
              <motion.div variants={moveUp(0)} className="w-full">
                <CustomSearch
                  className="!py-[17px] md:!py-5 h-[44px] md:h-[50px] xl:h-[66px]"
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
                    className="w-full md:w-auto !py-[17px] md:!py-5 h-[44px] md:h-[50px] xl:h-[66px] uppercase"
                  />
                </motion.div>
              )}
              <motion.div
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                variants={moveUp(0.15)}
                className={`flex ${hasFilter ? "xl:hidden 2xl:block" : ""}`}
              >
                <ListMapToggle view={view} setView={setView} />
              </motion.div>
            </div>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={moveUp(0.15)}
            className={`hidden ${hasFilter ? "xl:flex 2xl:hidden" : ""} justify-end mt-20`}
          >
            <ListMapToggle view={view} setView={setView} />
          </motion.div>
        </div>

        <div className="w-full mb-[70px] md:mb-50">
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

      {/* ── Heading ── */}
      <div className="container mb-50 text-center" id="properties-list">
        <SectionHeading
          title="Available Off Plan Properties"
          className="mb-20 text-foreground"
        />
        <SectionDescription
          className="text-description text-foreground-light"
          text={
            filtered.length !== 0
              ? `Showing ${(currentPage - 1) * itemsPerPage + 1}–${Math.min(currentPage * itemsPerPage, filtered.length)} of ${filtered.length} premium developments`
              : ""
          }
        />
      </div>

      {/* ── Cards / Map ── */}
      <section className="w-full pb-120 3xl:pb-160">
        {view === "list" ? (
          <div className="flex flex-col justify-center container">
            <div className="text-center">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 3xl:grid-cols-4 gap-y-5 md:gap-y-50 gap-x-30 xl:gap-x-[28px]">
                {paginated.length > 0 ? (
                  paginated.map((project: OffPlanListing, i: number) => (
                    <Reveal variants={moveUpV2} key={i} delayRange={i * 0.11}>
                      <ProjectCard
                        image={project.featured_image_desktop}
                        mobileImage={project.featured_image_mobile}
                        hoverImage={project.brand_logo}
                        subtitle={project.property_caption}
                        status={project.property_status}
                        location={project.property_location}
                        startingFrom={project.icon1_text}
                        units={project.icon2_text}
                        {...project}
                      />
                    </Reveal>
                  ))
                ) : (
                  <EmptyState />
                )}
              </div>
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
              <ProjectList projects={filtered} />
            </APIProvider>
          </motion.div>
        )}

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
