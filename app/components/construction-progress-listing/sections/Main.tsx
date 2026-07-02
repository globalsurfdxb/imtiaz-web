"use client";

import { useMemo, useEffect, useState, useRef, useCallback, Suspense } from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation"; 
// import { offPlanProperties } from "../data"; 
import Cardconstruction from "../../common/Cardconstruction";
import { motion } from "framer-motion"; 
import { moveUp, moveUpV2 } from "../../motionVariants";
import Pagination from "../../common/Pagination";  
import Reveal from "../../animations/RevealOneByOneAnimation";
import { useLenis } from "@/app/contexts/LenisContext";
import { Property } from "../data";

// Derive itemsPerPage from window width — no state, no spurious re-renders
const getItemsPerPage = () =>
  typeof window !== "undefined" && window.innerWidth >= 1600 ? 8 : 6;

// ── Main Content Component ─────────────────────────────────────────────────
const MainContent = ({data}:any) => {
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

  const { scrollTo, lock, unlock } = useLenis();
  
  const currentPage = Number(searchParams.get("page") || "1");
  const [view, setView] = useState<"list" | "map">("list");

  const itemsPerPageRef = useRef(6); // always 6 on server to match SSR
  const [, forceUpdate] = useState(0);

  useEffect(() => {
    // Correct value after hydration (server always renders with 6)
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
  }, [pathname, router]);

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

  const sorted = useMemo(
    () =>
      [...data].sort(
        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
      ),
    [],
  );

  const itemsPerPage = itemsPerPageRef.current;

  const totalPages = useMemo(
    () => Math.ceil(sorted.length / itemsPerPage),
    [sorted.length, itemsPerPage],
  );

  const paginated = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return sorted.slice(start, start + itemsPerPage);
  }, [sorted, currentPage, itemsPerPage]);

  return (
    <section className="w-full bg-white" data-header="dark" id="properties-list"> 
      {/* ── Cards / Map ── */}
      <div className="flex flex-col justify-center container">
        <div className="text-center"> 
          <div className="project-card-grid">
            {paginated.map((project, i) => (
              <Reveal variants={moveUpV2} key={i} delayRange={i * 0.11}>
                <Cardconstruction image={project.featured_image_desktop} mobileImage={project.featured_image_mobile} {...project} />
              </Reveal>
            ))}
          </div> 
        </div>
      </div>

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
  );
};

// ── Loading Fallback ───────────────────────────────────────────────────────
const LoadingFallback = () => (
  <section className="w-full bg-white" data-header="dark" id="properties-list">
    <div className="flex flex-col justify-center container">
      <div className="text-center">
        <div className="project-card-grid">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="h-[300px] bg-gray-200 rounded-lg animate-pulse" />
          ))}
        </div>
      </div>
    </div>
  </section>
);

// ── Main Component with Suspense ───────────────────────────────────────────
const Main = ({data}:{data:Property[]}) => {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <MainContent data={data}/>
    </Suspense>
  );
};

export default Main;