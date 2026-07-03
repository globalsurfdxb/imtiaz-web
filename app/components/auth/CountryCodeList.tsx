"use client";

import { useState, useRef, useEffect } from "react";
import countryCodes from "country-codes-list";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

const countries = countryCodes.customArray({
  code: "+{countryCallingCode}",
  iso: "{countryCode}",
  name: "{countryNameEn}",
});

const unique = Array.from(new Map(countries.map((c) => [c.code, c])).values());

type Props = {
  value: string;
  onChange: (val: string) => void;
  dropdownWidth?: number;
  variant?: "light" | "dark";
};

export default function CountryCodeSelect({
  value,
  onChange,
  dropdownWidth,
  variant = "dark",
}: Props) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const ref = useRef<HTMLDivElement>(null);

  const selected = unique.find((c) => c.code === value) ?? unique[0];

  const filtered = unique.filter(
    (c) =>
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.code.includes(search),
  );

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
        setSearch("");
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const isLight = variant === "light";

  return (
    <div ref={ref} className="relative flex-shrink-0">
         <style jsx>{`
      @media (max-width: 767px) {
        input {
          font-size: 16px;
        }
      }
    `}</style>
      {/* Trigger */}
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className={`flex items-center relative text-description bg-transparent cursor-pointer ${
          isLight
            ? "text-white border-white"
            : "text-foreground-light border-foreground-light"
        }`}
      >
        <div
          className={`flex items-center gap-[10px] absolute -top-[27px] border-b pr-[15px] ${variant === "light" ? "border-white" : "border-foreground-light"} pb-[2px]`}
        >
          <span
            className={`fi fi-${selected.iso.toLowerCase()} mb-[5px] inline-block shrink-0`}
            style={{ width: "27px", height: "20px" }}
          />
          <span className="-mt-1">{selected.code}</span>
          <Image
            src="/images/icons/down-tip-arrow.svg"
            alt="arrow-down"
            width={10}
            height={10}
            className={`h-[7.4px] w-auto mb-[6px] ${isLight ? "invert brightness-0" : ""}`}
          />
        </div>
      </button>

      {/* Dropdown */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{
              opacity: 0,
              clipPath: "inset(0% 0% 100% 0% round 16px)",
            }}
            animate={{ opacity: 1, clipPath: "inset(0% 0% 0% 0% round 16px)" }}
            exit={{ opacity: 0, clipPath: "inset(0% 0% 100% 0% round 16px)" }}
            transition={{
              duration: 0.5,
              ease: [0.76, 0, 0.24, 1],
              opacity: { duration: 0.3, ease: "easeIn" },
            }}
            style={{ width: dropdownWidth ? `${dropdownWidth}px` : "280px" }}
            className={`absolute top-[calc(100%+8px)] h-[250px] left-0 backdrop-blur-md border rounded-2xl shadow-lg overflow-hidden z-50 ${
              isLight
                ? "bg-white border-white/50"
                : "bg-white/50 border-black/10"
            }`}
            onWheel={(e) => e.stopPropagation()}
          >
            {/* Search */}
            <div
              className={`px-3 py-2 border-b ${isLight ? "border-foreground-light/10" : "border-black/5"}`}
            >
              <input
                type="text"
                placeholder="Search country..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className={`w-full text-description bg-transparent outline-none p-0 ${
                  isLight
                    ? "text-foreground placeholder:text-foreground/30"
                    : "text-foreground-light placeholder:text-foreground-light/30"
                }`}
              />
            </div>

            {/* List */}
            <div className="max-h-[220px] overflow-y-auto scrollbar-hide">
              {filtered.length === 0 && (
                <p
                  className={`px-5 py-3 text-description ${isLight ? "text-foreground/40" : "text-foreground-light/40"}`}
                >
                  No results
                </p>
              )}
              {filtered.map((c, i) => (
                <div key={`${c.code}-${i}`}>
                  {i !== 0 && (
                    <div
                      className={`w-full h-px ${isLight ? "bg-foreground/5" : "bg-black/5"}`}
                    />
                  )}
                  <button
                    type="button"
                    onClick={() => {
                      onChange(c.code);
                      setOpen(false);
                      setSearch("");
                    }}
                    className={`w-full text-left px-5 py-3 text-description transition-colors duration-150 flex items-center gap-2 ${
                      value === c.code
                        ? "text-primary-2 font-[avenirBook]"
                        : isLight
                          ? "text-foreground hover:bg-foreground/5"
                          : "text-foreground-light hover:bg-black/5"
                    }`}
                  >
                    <span
                      className={`fi fi-${c.iso.toLowerCase()} inline-block flex-shrink-0`}
                      style={{ width: "22px", fontSize: "22px" }}
                    />
                    <span>{c.code} - </span>
                    <span
                      className={`text-[13px] ${isLight ? "text-foreground" : "text-foreground-light"}`}
                    >
                      {c.name}
                    </span>
                  </button>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
