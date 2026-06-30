"use client";

import { useState, useRef, useEffect } from "react";
import CustomOutlineButton from "../../common/CustomOutlineButton";
import { motion } from "framer-motion";
import { moveUp } from "../../motionVariants";
import Link from "next/link";
// ── Types ─────────────────────────────────────────────────────────────────────
interface FilterOption {
  label: string;
  value: string;
}

interface FilterItem {
  id: string;
  label: string;
  options: FilterOption[];
}

// ── Chevron Icon ──────────────────────────────────────────────────────────────
const ChevronDown = ({ open }: { open: boolean }) => (
  <svg
    width="14"
    height="14"
    viewBox="0 0 14 14"
    fill="none"
    className={`transition-transform duration-200 ${open ? "rotate-180" : ""}`}
  >
    <path
      d="M3 5l4 4 4-4"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

// ── Dropdown ──────────────────────────────────────────────────────────────────
interface DropdownProps {
  filter: FilterItem;
  selected: string;
  onSelect: (value: string) => void;
  isOpen: boolean;
  onToggle: () => void;
  onClose: () => void;
  isLast?: boolean;
}

const Dropdown = ({
  filter,
  selected,
  onSelect,
  isOpen,
  onToggle,
  onClose,
  isLast,
}: DropdownProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const [dropUp, setDropUp] = useState(false);

  const selectedLabel =
    filter.options.find((o) => o.value === selected)?.label || filter.label;

  // Close on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        onClose();
      }
    };
    if (isOpen) document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [isOpen, onClose]);

  const handleToggle = () => {
    if (ref.current) {
      const rect = ref.current.getBoundingClientRect();
      const spaceBelow = window.innerHeight - rect.bottom;
      const spaceNeeded = 260; // approx dropdown height
      setDropUp(spaceBelow < spaceNeeded);
    }
    onToggle();
  };

  return (
    <div ref={ref} className="relative flex-1 pt-[12px] py-0 lg:py-[12px] last:pb-[12px]">
      {/* Trigger */}
      <button
        onClick={handleToggle}
        className="w-full flex items-center justify-center gap-2 px-4 lg:px-10 text-description  tracking-widest text-white whitespace-nowrap  cursor-pointer transition-colors duration-150"
      >
        <span>{selected ? selectedLabel.toUpperCase() : filter.label}</span>
        <ChevronDown open={isOpen} />
      </button>

      {/* Dropdown Panel */}
      {isOpen && (
        <div
          className={`absolute   bg-black/80 backdrop-blur-[30px] rounded-sm shadow-xl  py-2 z-50 min-w-[280px] bottom-[calc(100%+24px)] ${isLast ? "right-0" : "left-1/2 -translate-x-1/2"
            }`}
        >
          {filter.options.map((option) => (
            <button
              key={option.value}
              onClick={() => {
                onSelect(option.value);
                onClose();
              }}
              className={`w-full text-left px-5 py-2.5 text-16 transition-colors capitalize duration-150 rounded-sm cursor-pointer ${selected === option.value
                ? "text-black  bg-gray-50"
                : "text-white hover:bg-gray-50 hover:text-black"
                }`}
            >
              {option.label.toLowerCase().replace(/\b\w/g, (c) => c.toUpperCase())}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

// ── Main Component ────────────────────────────────────────────────────────────
const PropertySearchBar = ({ communitiesData, propertiesData }: any) => {
  // console.log(propertiesData?.listing)
  const communityOptions: FilterOption[] = [
    { label: "All Communities", value: "" },
    ...(communitiesData?.listing ?? []).map((item: any) => ({
      label: item.title,
      value: item.title,
    })),
  ];

  const filters: FilterItem[] = [
    {
      id: "propertyType",
      label: "PROPERTY TYPE",
      // options: [
      //   { label: "Apartment", value: "Apartment" },
      // ],
      options: [
        ...new Set<string>(
          (propertiesData?.listing ?? [])
            .map((item: { property_type: string }) => item.property_type)
            .filter(Boolean),
        ),
      ].map((value) => ({ label: value, value })),
    },
    {
      id: "status",
      label: "STATUS",
      options: [
      ...new Set<string>(
        (propertiesData?.listing ?? [])
          .map((item: { property_status: string }) => item.property_status)
          .filter(Boolean),
      ),
    ].map((value)=>({label:value,value})),
    },
    {
      id: "community",
      label: "COMMUNITY",
      options: communityOptions,
    },
  ];

  const [openId, setOpenId] = useState<string | null>(null);
  const [selected, setSelected] = useState<Record<string, string>>({});

  const handleToggle = (id: string) =>
    setOpenId((prev) => (prev === id ? null : id));

  const handleSelect = (id: string, value: string) =>
    setSelected((prev) => ({ ...prev, [id]: value }));

  const params = new URLSearchParams();

  if (selected.propertyType) {
    params.append("propertyType", selected.propertyType);
  }
  if (selected.status) {
    params.append("status", selected.status);
  }
  if (selected.community) {
    params.append("community", selected.community);
  }

  const href =
    params.toString().length > 0
      ? `/properties?${params.toString()}`
      : "#";

  return (
    <div className="rounded-sm lg:rounded-full shadow-lg bg-white/5 backdrop-blur-[30px]  overflow-visible border border-white/10 px-[15px] py-[11px]"   >
      <div className="flex flex-col lg:flex-row items-center gap-3     ">
        <div className="flex flex-col md:flex-row items-center gap-3     ">
          {filters.map((filter, i) => (
            <div key={filter.id} className="flex items-center flex-1">
              <Dropdown
                filter={filter}
                selected={selected[filter.id] || ""}
                onSelect={(val) => handleSelect(filter.id, val)}
                isOpen={openId === filter.id}
                onToggle={() => handleToggle(filter.id)}
                onClose={() => setOpenId(null)}
              />
              {/* Divider */}
              {i < filters.length - 0 && (
                <div
                  className="w-px self-stretch mx-4 2xl:mx-30 3xl:mx-[97px] hidden lg:block"
                  style={{
                    background: "linear-gradient(to bottom, transparent, #fff, transparent)"
                  }}
                />
              )}
            </div>
          ))}
        </div>
        {/* Search Button */}

        <motion.div
          variants={moveUp(0.01)}
          initial="hidden"
          whileInView="show"
        >
          {/* <button 
        className="ml-2 bg-black text-white text-xs  tracking-widest px-6 py-4 rounded-full hover:bg-gray-900 active:scale-95 transition-all duration-200 whitespace-nowrap flex-shrink-0"
      >
        SEARCH PROPERTIES
      </button>  */}
          <Link href={href}>
            <CustomOutlineButton
              className="w-fit "
              px="!px-4 !py-3 !text-19 xl:!px-[45px] xl:!py-5 h-[44px] md:h-[50px]  xl:h-[66px] mt-5 lg:mt-0"
              text="Search Properties"
              borderColor="white"
              textColor="text-white"
              variant="light"
            />
          </Link>
        </motion.div>
      </div>
    </div>
  );
};

export default PropertySearchBar;
