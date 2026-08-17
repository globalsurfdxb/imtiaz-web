"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

interface BreadcrumbProps {
  variant?: "white" | "black";
}

// Matches a standalone roman numeral word (I, II, III, IV, V, VI, ... up to a few thousand)
const ROMAN_NUMERAL_REGEX =
  /\b(?=[mdclxviMDCLXVI])M{0,4}(CM|CD|D?C{0,3})(XC|XL|L?X{0,3})(IX|IV|V?I{0,3})\b/gi;

const capitalizeRomanNumerals = (label: string) =>
  label
    .split(" ")
    .map((word) => {
      const isRoman =
        /^(?=[mdclxviMDCLXVI])m{0,4}(cm|cd|d?c{0,3})(xc|xl|l?x{0,3})(ix|iv|v?i{0,3})$/i.test(
          word,
        );
      return isRoman && word.length > 0 ? word.toUpperCase() : word;
    })
    .join(" ");

const Breadcrumb = ({ variant = "white" }: BreadcrumbProps) => {
  const pathname = usePathname();

  const segments = pathname.split("/").filter(Boolean);

  const isNewsDetail =
    segments[0] === "media-center" &&
    segments[1] === "news" &&
    segments.length === 3;
  const isBlogDetail =
    segments[0] === "media-center" &&
    segments[1] === "blog" &&
    segments.length === 3;
  const isEventDetail =
    segments[0] === "media-center" &&
    segments[1] === "events" &&
    segments.length === 3;
  const isInitiativeDetail =
    segments[0] === "media-center" &&
    segments[1] === "initiatives" &&
    segments.length === 3;

  const isMediaDetail =
    isNewsDetail || isBlogDetail || isEventDetail || isInitiativeDetail;

  // ✅ ONLY real existing routes
  const VALID_ROUTES = new Set([
    "/",
    "/media-center/blog",
    "/media-center/news",
    "/media-center/events",
    "/media-center/initiatives",
    "/communities",
    "/properties",
    "/pay-now",
    "/construction-progress-listing",
    "/about/careers",
  ]);

  const crumbs = segments
    .filter((seg) => {
      // On detail pages, skip "media-center" segment
      if (isMediaDetail && seg === "media-center") return false;
      return true;
    })
    .map((seg, i, arr) => {
      // Rebuild href from filtered segments
      const segIndex = segments.indexOf(seg);
      const href = "/" + segments.slice(0, segIndex + 1).join("/");

      return {
        label: capitalizeRomanNumerals(
          seg.charAt(0).toUpperCase() + seg.slice(1).replace(/-/g, " "),
        ),
        href,
        isLast: i === arr.length - 1,
        clickable: VALID_ROUTES.has(href),
      };
    });

  const allCrumbs = [
    {
      label: "Home",
      href: "/",
      isLast: crumbs.length === 0,
      clickable: true,
    },
    ...crumbs,
  ];

  const isBlack = variant === "black";

  return (
    <div className="flex items-center gap-[10px] capitalize">
      {allCrumbs.map((crumb, i) => (
        <div key={i} className="flex items-center gap-[10px]">
          {i > 0 && (
            <span
              className={`text-[9px] rounded-full ${
                crumb.isLast
                  ? isBlack
                    ? "bg-foreground-light"
                    : "bg-white"
                  : isBlack
                    ? "bg-foreground-light/30"
                    : "bg-white/50"
              }`}
            >
              <div className="w-[7px] h-[7px] "></div>
            </span>
          )}

          {crumb.isLast || !crumb.clickable ? (
            <span
              className={`text-[14px] md:text-16 text-description whitespace-nowrap overflow-hidden text-ellipsis ${
                crumb.isLast
                  ? isBlack
                    ? "text-foreground-light"
                    : "text-white"
                  : isBlack
                    ? "text-foreground-light/30"
                    : "text-white/50"
              }`}
            >
              {/* mobile */}
              <span className="md:hidden">
                {crumb.label.length > 15
                  ? crumb.label.slice(0, 15) + "..."
                  : crumb.label}
              </span>

              {/* md */}
              <span className="hidden md:inline 2xl:hidden">
                {crumb.label.length > 20
                  ? crumb.label.slice(0, 20) + "..."
                  : crumb.label}
              </span>

              {/* 2xl+ */}
              <span className="hidden 2xl:inline">
                {crumb.label.length > 60
                  ? crumb.label.slice(0, 60) + "..."
                  : crumb.label}
              </span>
            </span>
          ) : (
            <Link
              href={crumb.href}
              className={`text-description whitespace-nowrap overflow-hidden text-ellipsis md:whitespace-normal md:overflow-visible transition-colors duration-300 ${
                isBlack
                  ? "text-foreground-light/30 hover:text-foreground-light/60"
                  : "text-white/50 hover:text-white/75"
              }`}
            >
              {/* mobile only */}
              <span className="sm:hidden">
                {crumb.label.length > 15
                  ? crumb.label.slice(0, 15) + "..."
                  : crumb.label}
              </span>

              {/* md and up: full label */}
              <span className="hidden sm:inline">{crumb.label}</span>
            </Link>
          )}
        </div>
      ))}
    </div>
  );
};

export default Breadcrumb;
